<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam.params"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年度:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.year" size="small" type="year" value-format="yyyy" :clearable="false" :picker-options="pickerOptions0" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.targetOrg" dict-type-id="Dept" :disabled="disabled" :filter1="ST" :filter2="searchParam.year" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.custName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                大区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.area1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                小区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.area2" clearable />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>

      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t("comm.query") }}</p>
          <span
            class="circle-larger-btn btn-light-color bluebg"
          ><i
            class="iconfont iconsousuo"
          /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li style="margin: 0 30px 10px;">
          <template>
            <el-checkbox-group
              v-model="checkedTaxs"
              :min="1"
              :max="2"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="tax in taxs" :key="tax" :label="tax">
                {{ tax }}
              </el-checkbox>
            </el-checkbox-group>
          </template>
        </li>

        <li style="margin: 0 30px 10px;">
          <dict-radio v-model="viewType" dict-type-id="PromotionViewType" @change="handleChange" />
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable rebateledger-table table-two  specialTable2">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="strategyList"
            :span-method="objectSpanMethod"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column :prop="'ecFlagName'" :label="'渠道'" min-width="120" align="left" />
            <el-table-column :prop="'category'" :label="'品类'" min-width="120" align="left" />
            <el-table-column :label="'费目'" min-width="120" align="left">
              <el-table-column :prop="'finAccountTypeName'" min-width="120" align="left" />
              <el-table-column min-width="120" align="left">
                <template slot-scope="scope">
                  {{ scope.row.typeName }}
                  <span v-if="scope.row.typeName==='费率'">%</span>
                </template>
              </el-table-column>
              <el-table-column :prop="'estTypeName'" min-width="120" align="left" />
            </el-table-column>
            <template v-for="item in headerMonth">
              <el-table-column :key="item" prop :label="item + '月'">
                <el-table-column v-if="tax1" :prop="'untaxed_'+item" :label="'未税'" align="right" min-width="120">
                  <template slot-scope="scope">
                    {{ scope.row['month_'+item] |numFormat(2) }}
                    <span v-if="scope.row['month_tax_'+item]&&scope.row.typeName==='费率'">%</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="tax2" :prop="'included_'+item" :label="'含税'" align="right" min-width="120">
                  <template slot-scope="scope">
                    {{ scope.row['month_tax_'+item] |numFormat(2) }}
                    <span v-if="scope.row['month_tax_'+item]&&scope.row.typeName==='费率'">%</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 取消意见 -->
    <div v-if="cancelDialog">
      <el-dialog
        title="取消理由"
        :visible.sync="cancelDialog"
        :close-on-click-modal="false"
        class="content-dialog-box search-light"
        custom-class="dialog-drag dialog-drag-heightAuto content-dialog-upload  fixed-search-btn-box"
        width="35%"
      >
        <div style="display: flex; flex-direction: column; height: 100%">
          <div>
            <div class="dialog-search-box middle-input">
              <el-form
                ref="searchForm"
                label-width="80px"
                label-position="left"
              >
                <el-row type="flex" justify="space-between">
                  <el-col>
                    <el-form-item :label="$t('fee.promotion.cancelReason')">
                      <el-input
                        v-model="cancelReason"
                        type="textarea"
                        rows="3"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelSubmit">
            <span
              class="operation-circle circle-middle-btn btn-light-color bluebg"
            ><i
              class="iconfont iconqueren"
            /></span>
            <span class="operation-text">{{ $t("comm.confirm") }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList } from '@/api/est/preview.js'
import DictRadio from '../../components/DictRadio.vue'
// import { dateFormat } from '@/utils/util'
export default {
  name: 'SalesPreview',
  components: { DictRadio },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      ST: '',
      isLoading: false,
      multipleSelection: [],
      strategyList: [],
      // headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      headerMonth: [],
      headerMonth2: [],
      cancelDialog: false,
      cancelReason: '',
      zjNum: [],
      xsNum: [],
      xxNum: [],
      viewType: 'current',
      checkedTaxs: ['未税', '含税'],
      taxs: ['未税', '含税'],
      tax1: true,
      tax2: true,
      ygtypes: [{
        value: '1',
        label: '当月预估'
      }, {
        value: '2',
        label: '全年预估'
      }],
      // 分页插件数据
      searchParam: {
        year: String(new Date().getFullYear()),
        targetOrg: ''
      },
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    happenYear: function() {
      return this.searchParam.year
    },
    disabled() {
      let isSelect = true
      let isFlag = false
      if (this.userInfo.roleList.includes('ROLE_WF_MARKET') || this.userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY')) {
        return false
      }
      if (this.$store.getters.dictList.Dept) {
        const deptList = this.$store.getters.dictList.Dept
        const targetList = this.$store.getters.dictList.TARGETORG
        let orgId = ''
        if (deptList && targetList) {
          for (let i = 0; i < deptList.length; i++) {
            for (let s = 0; s < targetList.length; s++) {
              if (targetList[s].dictName === deptList[i].dictId) {
                orgId = targetList[s].dictId
                // console.log(this.userInfo.orgSeqNo.indexOf(orgId), orgId, this.userInfo.orgSeqNo, 1090)
                if (this.userInfo.orgSeqNo.indexOf(orgId) !== -1) {
                  isFlag = true
                  break
                }
              }
            }
          }
        }

        if (!isFlag) {
          isSelect = false
        }
      }
      return isSelect
    }
  },
  watch: {
    orgIdCom: {
      handler(newValue, oldValue) {
        this.searchParam.targetOrg = newValue
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    if (this.userInfo.roleList.some(todo => todo === 'ROLE_WF_MARKET' || todo === 'ROLE_STRATEGY_SECTION_APPLY')) {
      this.ST = 'ST'
    } else {
      this.ST = ''
    }
    this.searchParam.targetOrg = this.orgIdCom
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.searchList()
    },
    async searchList() {
      if (!this.searchParam.year) {
        this.$message({
          type: 'error',
          message: '查询条件中，年度不能为空！'
        })
        return false
      }
      this.isLoading = true
      const res = await getList(this.searchParam)
      if (res && res.success) {
        // this.searchDetailParam.paramMonthlyEstId = results[0].id
        const results = res.datas.list
        this.strategyList = results
        if (res.datas.monthList.length > 0) {
          this.headerMonth2 = []
          const monlist = res.datas.monthList
          // console.log(results, 111)
          for (let i = 0; i < monlist.length; i++) {
            const month = Number(monlist[i])
            this.headerMonth2.push(month)
          }
          // this.headerMonth = this.headerMonth2
          if (this.viewType === 'current') {
            this.headerMonth = this.headerMonth2
          } else {
            this.headerMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          }
        }
        this.isLoading = false
        this.zjNum = this.categoryData()
        this.xsNum = this.categoryData2()
        this.xxNum = this.categoryData3()
      }
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    categoryData() {
      const strategyList = this.strategyList
      let list = []
      for (let s = 0; s < strategyList.length; s++) {
        if (strategyList[s].ecFlagName === '总计') {
          list.push(strategyList[s].category)
        }
      }
      list = this.unique(list)
      return list
    },
    categoryData2() {
      const strategyList = this.strategyList
      let list = []
      for (let s = 0; s < strategyList.length; s++) {
        if (strategyList[s].ecFlagName === '线上') {
          list.push(strategyList[s].category)
        }
      }
      list = this.unique(list)
      return list
    },
    categoryData3() {
      const strategyList = this.strategyList
      let list = []
      for (let s = 0; s < strategyList.length; s++) {
        if (strategyList[s].ecFlagName === '线下') {
          list.push(strategyList[s].category)
        }
      }
      list = this.unique(list)
      return list
    },
    handleChange(value) {
      console.log(value)
      if (value === 'current') {
        this.headerMonth = this.headerMonth2
      } else {
        this.headerMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    handleCreate() {
      this.$router.push('/promotion/strategytwo/edit')
    },
    strategyEdit() {
      this.$router.push('/promotion/strategytwo/detail')
    },
    handleEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({
            path: '/fee/promotion/motionEdit',
            query: { id: rowData.id }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleCancelSubmit() {
      this.cancelDialog = false
    },
    handleDownload() {
      console.log(11)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.category === this.xsNum[0] && row.finAccountTypeName === '销售' && row.estTypeName === '预算' && row.ecFlagName === '线上') {
          return {
            rowspan: (this.xsNum.length) * 21,
            colspan: 1
          }
        } else if (row.category === this.zjNum[0] && row.finAccountTypeName === '销售' && row.estTypeName === '预算' && row.ecFlagName === '总计') {
          return {
            rowspan: (this.zjNum.length) * 21,
            colspan: 1
          }
        } else if (row.category === this.xxNum[0] && row.finAccountTypeName === '销售' && row.estTypeName === '预算' && row.ecFlagName === '线下') {
          return {
            rowspan: (this.xxNum.length) * 21,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 1) {
        if (row.finAccountTypeName === '销售' && row.estTypeName === '预算') {
          return {
            rowspan: 21,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 2) {
        if (row.finAccountTypeName === '销售' && row.estTypeName === '预算') {
          return {
            rowspan: 3,
            colspan: 2
          }
        } else if (row.finAccountTypeName === '固定' && row.estTypeName === '预算' && row.typeName === '费用') {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else if (row.finAccountTypeName === '变动' && row.estTypeName === '预算' && row.typeName === '费用') {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else if (row.finAccountTypeName === '合计' && row.estTypeName === '预算' && row.typeName === '费用') {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 3) {
        if (row.estTypeName === '预算' && row.typeName === '费用') {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (row.estTypeName === '预算' && row.typeName === '费率') {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      this.tax1 = value.includes('未税')
      this.tax2 = value.includes('含税')
    }
  }
}
</script>
<style >
.bi-table .el-table__body{
      border-bottom: 1px solid #ddd;
}
.bi-table tbody tr:last-child td{
  border-bottom: 0 !important;
}
.specialTable2 thead tr:first-child th:nth-child(3){
  border-bottom:none !important;
  position: relative;
  overflow: inherit;
}
.specialTable2 thead tr:first-child th:nth-child(3) div{
  position: absolute !important;
  top: 28px;
  left: 0;
  z-index: 999;
}
.specialTable2 thead tr:nth-child(2) th:nth-child(1),
.specialTable2 thead tr:nth-child(2) th:nth-child(2){
  border-right:none !important;
}
</style>
