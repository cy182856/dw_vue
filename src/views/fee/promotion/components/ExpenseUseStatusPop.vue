<template>
  <div id="expenseUseStatus" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title="type==='1'?'活动折扣使用状况':'活动费用使用状况'"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
      @open="handleOpen"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="footer-box">
          <div class="dialog-table-box">
            <el-table
              ref="table"
              v-loading="isLoading"
              :data="expenseUseStatusList"
              border
              stripe
              height="400"
              :header-cell-style="{'text-align':'center'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column v-if="type==='1'" prop="spd" :label="'Sub品牌(SPD)'" min-width="100" show-overflow-tooltip align="center" />
              <el-table-column v-if="type==='2'" prop="spmk" :label="'Sub品牌(SP-MK)'" min-width="100" show-overflow-tooltip align="center" />
              <el-table-column :label="'当月'" min-width="100">
                <el-table-column prop="budgetAmount1" :label="'预算'" min-width="100" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.budgetAmount1 | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="usedAmount1" :label="'累计已使用'" min-width="100" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.usedAmount1 | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="approveAmount1" :label="'包含审批中'" min-width="100" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.approveAmount1 | numFormat(2) }}
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="'1月~当月（累计当前月累计）'" min-width="120">
                <el-table-column prop="budgetAmount2" :label="'预算'" min-width="100" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.budgetAmount2 | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="usedAmount2" :label="'累计已使用'" min-width="100" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.usedAmount2 | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="approveAmount2" :label="'包含审批中'" min-width="100" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.approveAmount2 | numFormat(2) }}
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="wholeYear" :label="'全年预算'" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.wholeYear | numFormat(2) }}
                </template>
              </el-table-column>
            </el-table>
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
              class="page-right"
              :current-page.sync="searchParam.pageNo"
              :page-size="searchParam.pageSize"
              layout="prev,pager,next,slot,jumper"
              :total="searchParam.totalRecord"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
              <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
            </el-pagination>
            <el-pagination class="page-right  page-first" layout="slot">
              <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
            </el-pagination>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">关闭</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
// import { getPopList } from '@/api/mdm/expenseUseStatus.js'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'ExpenseUseStatusPop',
  mixins: [names, search, formValidator, numFormat, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      selectUserDialog: false,
      expenseUseStatusList: [],
      multipleSelection: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
        }
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // const res = await getPopList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.expenseUseStatusList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.expenseUseStatusList = []
      this.expenseUseStatusList.push({
        spd: 'Sub品牌001',
        spmk: 'Sub品牌001',
        budgetAmount1: 4000,
        usedAmount1: 1000,
        approveAmount1: 3000,
        budgetAmount2: 9000,
        usedAmount2: 4000,
        approveAmount2: 5000,
        wholeYear: 10000
      }, {
        spd: 'Sub品牌002',
        spmk: 'Sub品牌002',
        budgetAmount1: 4000,
        usedAmount1: 1000,
        approveAmount1: 3000,
        budgetAmount2: 9000,
        usedAmount2: 4000,
        approveAmount2: 5000,
        wholeYear: 10000
      }, {
        spd: 'Sub品牌003',
        spmk: 'Sub品牌003',
        budgetAmount1: 4000,
        usedAmount1: 1000,
        approveAmount1: 3000,
        budgetAmount2: 9000,
        usedAmount2: 4000,
        approveAmount2: 5000,
        wholeYear: 10000
      },
      {
        spd: 'Sub品牌004',
        spmk: 'Sub品牌004',
        budgetAmount1: 4000,
        usedAmount1: 1000,
        approveAmount1: 3000,
        budgetAmount2: 9000,
        usedAmount2: 4000,
        approveAmount2: 5000,
        wholeYear: 10000
      })
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    reset() {
      for (const item in this.searchParam.params) {
        this.searchParam.params[item] = ''
      }
      this.searchParam.params.currencyUnitPrice = this.currency
    }
  }
}
</script>
<style lang="scss" scoped>
.expenseUseStatus {
  .editDilog {
    h5 {
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      .add_row {
        position: absolute;
        right: 25px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
        color: #fff;
        &:hover {
          background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
        }
      }
    }
  }
}
.pagination {
  position: relative;
  .select_header {
    position: absolute;
    top: 26px;
    left: 0;
  }
  .el-icon-menu {
    color: skyblue;
    font-size: 18px;
    cursor: pointer;
  }
  .check_box_item {
    padding-top: 15px;
    border-top: 1px solid #666;
  }
}
</style>
