<template>
  <div id="expenseAccount" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title=" $t('fee.promotion.expenseAccountSelect')"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
      @open="handleOpen"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="dialog-search-box middle-input">
            <el-form ref="searchForm" :model="form" label-width="80px" label-position="left">
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="'费用类型'" prop="expenseType">
                    <el-input v-model="searchParam.params.expenseType" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="'费用科目编号'" prop="expenseAccountNum">
                    <el-input v-model="searchParam.params.expenseAccountNum" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="'费用科目名称'" prop="expenseAccountName">
                    <el-input v-model="searchParam.params.expenseAccountName" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="'Sub品牌编号'" prop="subBrandNum">
                    <el-input v-model="searchParam.params.subBrandNum" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="'Sub品牌名称'" prop="subBrandName">
                    <el-input v-model="searchParam.params.subBrandName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7" />
              </el-row>
              <el-form-item style="margin-bottom:0 !important">
                <ul class="operation-box dialog-btn-box end-content-flex mcbtn">
                  <li class="operation-item" @click="search">
                    <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
                    <span class="operation-text">{{ $t('comm.query') }}</span>
                  </li>
                  <li class="operation-item" @click="reset">
                    <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                    <span class="operation-text"> {{ $t('comm.reset') }}</span>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="footer-box">
          <div class="dialog-table-box">
            <el-table
              ref="table"
              v-loading="isLoading"
              :data="expenseAccountList"
              border
              stripe
              height="200"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" fixed width="55" />
              <el-table-column prop="expenseType" :label="'费用类型'" min-width="100" show-overflow-tooltip />
              <el-table-column prop="expenseAccountNum" :label="'费用科目编号'" min-width="100" show-overflow-tooltip />
              <el-table-column prop="expenseAccountName" :label="'费用科目名称'" min-width="120" show-overflow-tooltip />
              <el-table-column prop="subBrandNum" :label="'Sub品牌编号'" min-width="120" show-overflow-tooltip />
              <el-table-column prop="subBrandName" :label="'Sub品牌名称'" min-width="140" show-overflow-tooltip />
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
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
// import { getPopList } from '@/api/mdm/expenseAccount.js'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'ExpenseAccountPop',
  mixins: [names, search, formValidator, numFormat, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      selectUserDialog: false,
      expenseAccountList: [],
      multipleSelection: [],
      exportSelectDilog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          expenseType: '',
          expenseAccountNum: '',
          expenseAccountName: '',
          subBrandNum: '',
          subBrandName: ''
        }
      },
      form: { // 弹窗检索参数
        expenseType: '',
        expenseAccountNum: '',
        expenseAccountName: '',
        subBrandNum: '',
        subBrandName: ''
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // const res = await getPopList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.expenseAccountList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.expenseAccountList.push({
        expenseType: 'BDT',
        expenseAccountNum: '820-0100S1',
        expenseAccountName: '新品进场费(支付)',
        subBrandNum: 'BIORE-SUB-1',
        subBrandName: '碧柔XX01'
      }, {
        expenseType: 'BDT',
        expenseAccountNum: '820-0100S1',
        expenseAccountName: '新品进场费(支付)',
        subBrandNum: 'BIORE-SUB-2',
        subBrandName: '碧柔XX02'
      }, {
        expenseType: 'BDT',
        expenseAccountNum: '820-0100S1',
        expenseAccountName: '新品进场费(支付)',
        subBrandNum: 'BIORE-SUB-3',
        subBrandName: '碧柔XX03'
      },
      {
        expenseType: 'BDMK',
        expenseAccountNum: '820-1363S11',
        expenseAccountName: 'EC代理商运费补贴',
        subBrandNum: 'BIORE-SUB-1',
        subBrandName: '碧柔XX01'
      }, {
        expenseType: 'BDMK',
        expenseAccountNum: '820-1363S1',
        expenseAccountName: 'EC代理商运费补贴',
        subBrandNum: 'BIORE-SUB-2',
        subBrandName: '碧柔XX02'
      }, {
        expenseType: 'BDMK',
        expenseAccountNum: '820-1363S1',
        expenseAccountName: 'EC代理商运费补贴',
        subBrandNum: 'BIORE-SUB-3',
        subBrandName: '碧柔XX03'
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
.expenseAccount {
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
