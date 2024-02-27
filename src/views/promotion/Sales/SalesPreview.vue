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
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.year" size="small" type="year" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.department" placeholder="请选择">
                  <el-option
                    v-for="item in department"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年月From:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.month1" size="small" :placeholder="'请选择'" type="month" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年月To:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.month2" size="small" :placeholder="'请选择'" type="month" :clearable="false" />
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
        <!-- <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">同步数据</span>
        </li>
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">预算Fix</span>
        </li>
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">预算解锁</span>
        </li> -->
        <!-- <li class="operation-item" @click="handleCreate">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">固定费</span>
        </li>
        <li class="operation-item" @click="strategyEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">变动费</span>
        </li> -->
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
        <!-- <li class="operation-item" @click="handleDownload">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">活动提案下载</span>
        </li> -->
      </ul>
      <div class="table-bg-box search-list-table borderTable specialTable">
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
              <el-table-column :prop="'fee1'" min-width="120" align="center" />
              <el-table-column :prop="'fee2'" min-width="120" align="center" />
            </el-table-column>
            <template v-for="item in headerMonth">
              <el-table-column :key="item" prop :label="item + '月'">
                <el-table-column v-if="tax1" :prop="'untaxed_'+item" :label="'未税'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.monthfee['untaxed_'+item] }}
                  </template>
                </el-table-column>
                <el-table-column v-if="tax2" :prop="'included_'+item" :label="'含税'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.monthfee['included_'+item] }}
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
          </el-table>
        </div>
      </div>
      <div class="pagination-box">
        <el-pagination
          class="page-left"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="total,sizes"
          :total="searchParam.totalRecord"
          popper-class="blueDL"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <el-pagination
          class="page-right blueDR"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="prev,pager,next,slot,jumper"
          :total="searchParam.totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span
            class="iconfont iconjiantou-youzhi page-last-page"
            @click="toLastPage"
          />
        </el-pagination>
        <el-pagination class="page-right page-first" layout="slot">
          <span
            class="iconfont iconjiantou-zuozhi page-first-page"
            @click="toFirstPage"
          />
        </el-pagination>
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
export default {
  name: 'SalesPreview',
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      strategyList: [],
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      cancelDialog: false,
      cancelReason: '',
      checkedTaxs: ['未税', '含税'],
      taxs: ['未税', '含税'],
      tax1: true,
      tax2: true,
      department: [{
        value: '1',
        label: '战略1课'
      }, {
        value: '2',
        label: '战略2课'
      }, {
        value: '3',
        label: '销售推进部'
      }, {
        value: '4',
        label: 'EC部'
      }],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          year: new Date(),
          department: '',
          month1: '',
          month2: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    this.fetchData()
    console.log(this.strategyList)
  },
  methods: {
    async fetchData() {
      this.strategyList = [{
        'category': '纸巾',
        'fee1': '销售预算',
        'fee2': '销售预算',
        'monthfee': this.getMockList(1)
      },
      {
        'category': '纸巾',
        'fee1': '固定',
        'fee2': '固定费用',
        'monthfee': this.getMockList(2)
      },
      {
        'category': '纸巾',
        'fee1': '固定',
        'fee2': '费率%',
        'monthfee': this.getMockList(3)
      },
      {
        'category': '纸巾',
        'fee1': '变动',
        'fee2': '变动费用',
        'monthfee': this.getMockList(2)
      },
      {
        'category': '纸巾',
        'fee1': '变动',
        'fee2': '费率%',
        'monthfee': this.getMockList(3)
      },
      {
        'category': '纸巾',
        'fee1': '合计',
        'fee2': '费用预算',
        'monthfee': this.getMockList(2)
      },
      {
        'category': '纸巾',
        'fee1': '合计',
        'fee2': '费率%',
        'monthfee': this.getMockList(3)
      },
      {
        'category': '湿巾',
        'fee1': '销售预算',
        'fee2': '销售预算',
        'monthfee': this.getMockList(1)
      },
      {
        'category': '湿巾',
        'fee1': '固定',
        'fee2': '固定费用',
        'monthfee': this.getMockList(2)
      },
      {
        'category': '湿巾',
        'fee1': '固定',
        'fee2': '费率%',
        'monthfee': this.getMockList(3)
      },
      {
        'category': '湿巾',
        'fee1': '变动',
        'fee2': '变动费用',
        'monthfee': this.getMockList(2)
      },
      {
        'category': '湿巾',
        'fee1': '变动',
        'fee2': '费率%',
        'monthfee': this.getMockList(3)
      },
      {
        'category': '湿巾',
        'fee1': '合计',
        'fee2': '费用预算',
        'monthfee': this.getMockList(2)
      },
      {
        'category': '湿巾',
        'fee1': '合计',
        'fee2': '费率%',
        'monthfee': this.getMockList(3)
      }
      ]
    },
    getMockList(type) {
      const monthfee = {}
      if (type === 1) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = 100
          monthfee['included_' + i] = 120
        }
      } else if (type === 2) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = 50
          monthfee['included_' + i] = 60
        }
      } else if (type === 3) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = '30%'
          monthfee['included_' + i] = '50%'
        }
      }
      return monthfee
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
        if (rowIndex === 0 || rowIndex === 7) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if ((rowIndex + 1) % 2 === 0 && rowIndex < 7) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex % 2 === 0 && rowIndex > 7) {
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
        if (rowIndex === 0 || rowIndex === 7) {
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
