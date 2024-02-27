<template>
  <div id="quote" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title=" $t('comm.quoteSelect')"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
      @open="handleOpen"
      @opened="handleOpened"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="dialog-search-box middle-input">
            <el-form ref="searchForm" :model="form" label-width="80px" label-position="left">
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('sale.quote.identiferNum')" prop="identiferNum">
                    <el-input v-model="searchParam.params.identiferNum" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('sale.quote.quoteName')" prop="quoteName">
                    <el-input v-model="searchParam.params.quoteName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('sale.quote.accountNum')" prop="accountNum">
                    <el-input v-model="searchParam.params.accountNum" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('sale.quote.accountName')" prop="accountName">
                    <el-input v-model="searchParam.params.accountName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('sale.quote.contactFullName')" prop="contactName">
                    <el-input v-model="searchParam.params.contactName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('sale.quote.quoteTerm')" prop="quoteTerm">
                    <el-input v-model="searchParam.params.quoteTerm" />
                  </el-form-item>
                </el-col>
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
              :data="quoteList"
              border
              stripe
              height="200"
              :header-cell-style="{'text-align':'left'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" fixed width="55" />
              <el-table-column prop="identiferNum" :label="$t('sale.quote.identiferNum')" min-width="150" />
              <el-table-column prop="quoteName" :label="$t('sale.quote.quoteName')" width="200" show-overflow-tooltip />
              <el-table-column prop="accountNum" :label="$t('sale.quote.accountNum')" min-width="120" />
              <el-table-column :label="$t('sale.quote.accountName')" width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.accountNum | funcName('account') }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('sale.quote.contactFullName')" width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.contactNum | funcName('contact') }}
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('sale.quote.createTime')" min-width="140" />
              <el-table-column prop="quoteTerm" :label="$t('sale.quote.quoteTerm')" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.quoteTerm | numFormat(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="includingTaxAmount" :label="$t('sale.quote.includingTaxAmount')" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.includingTaxAmount | numFormat(2) }}
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
import { getPopList } from '@/api/sale/quote.js'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'QuotePop',
  mixins: [names, search, formValidator, numFormat, niceScroll, popSelect],
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
      quoteList: [],
      multipleSelection: [],
      exportSelectDilog: false,
      form: { // 弹窗检索参数
        identiferNum: '',
        quoteName: '',
        accountNum: '',
        accountName: '',
        contactName: '',
        quoteTerm: ''
      },
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          quoteName: '',
          accountNum: '',
          accountName: '',
          contactName: '',
          quoteTerm: '',
          assignedUser: ''
        }
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      const res = await getPopList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.quoteList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.quote {
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
<style lang="scss">
</style>
