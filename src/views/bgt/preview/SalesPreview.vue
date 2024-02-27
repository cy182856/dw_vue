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
                <el-date-picker v-model="searchParam.year" size="small" type="year" value-format="yyyy" :clearable="false" />
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
      </ul>
      <div class="table-bg-box search-list-table borderTable specialTable rebateledger-table table-two">
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
            <el-table-column :prop="'category'" :label="'品类'" min-width="120" align="center" />
            <el-table-column :label="'费目'" min-width="120" align="center">
              <el-table-column :prop="'finAccountTypeName'" min-width="120" align="center" />
              <el-table-column min-width="120" align="center">
                <template slot-scope="scope">
                  {{ scope.row.typeName }}
                  <span v-if="scope.row.typeName==='费率'">%</span>
                </template>
              </el-table-column>
            </el-table-column>
            <template v-for="item in headerMonth">
              <el-table-column :key="item" prop :label="item + '月'">
                <el-table-column v-if="tax1" :prop="'untaxed_'+item" :label="'未税'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row['month_'+item] |numFormat(2) }}
                    <span v-if="scope.row['month_tax_'+item]&&scope.row.typeName==='费率'">%</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="tax2" :prop="'included_'+item" :label="'含税'" min-width="120" align="right">
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { getList } from '@/api/bgt/bgtpreview.js'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'SalesPreview',
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      ST: '',
      isLoading: false,
      strategyList: [],
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      checkedTaxs: ['未税', '含税'],
      taxs: ['未税', '含税'],
      tax1: true,
      tax2: true,
      searchParam: {
        year: String(new Date().getFullYear()),
        targetOrg: ''
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
      console.log(this.userInfo)
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
        const results = res.datas.list
        this.strategyList = results
        this.isLoading = false
      }
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 7 === 0) {
          return {
            rowspan: 7,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 1) {
        if (rowIndex % 7 === 0) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if (rowIndex % 7 === 1 || rowIndex % 7 === 3 || rowIndex % 7 === 5) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 2) {
        if (rowIndex % 7 === 0) {
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
.specialTable thead tr:first-child th:nth-child(2){
  border-bottom:none !important;
  position: relative;
  overflow: inherit;
}
.specialTable thead tr:first-child th:nth-child(2) div{
  position: absolute !important;
  top: 28px;
  left: 0;
  z-index: 999;
}
.specialTable thead tr:nth-child(2) th:nth-child(1){
  border-right:none !important;
}
</style>
