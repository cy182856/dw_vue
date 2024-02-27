<template>
  <div id="pricebook" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title=" $t('comm.pricebookSelect')"
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
                  <el-form-item :label="$t('mdm.pricebook.identiferNum')" prop="identiferNum">
                    <el-input v-model="searchParam.params.identiferNum" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.pricebook.pricebookNm')" prop="pricebookName">
                    <el-input v-model="searchParam.params.pricebookName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.pricebook.pricebookTp')" prop="pricebookType">
                    <dict-select v-model="searchParam.params.pricebookType" class="input" dict-type-id="PricebookType" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.pricebook.currency')" prop="currency">
                    <span class="constspan">
                      {{ currencyParam | dictName('Currency') }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.pricebook.product')" prop="product">
                    <span class="constspan">
                      {{ row.productIdentiferNum | funcName('product') }}
                    </span>
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
              :data="pricebookList"
              border
              stripe
              height="200"
              :header-cell-style="{'text-align':'left'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" fixed width="55" />
              <el-table-column prop="identiferNum" :label="$t('mdm.pricebook.identiferNum')" min-width="120" />
              <el-table-column prop="pricebookName" :label="$t('mdm.pricebook.pricebookNm')" min-width="160" show-overflow-tooltip />
              <el-table-column prop="pricebookType" :label="$t('mdm.pricebook.pricebookTp')" min-width="80">
                <template slot-scope="scope">
                  <dict-write dict-type-id="PricebookType" :value="scope.row.pricebookType" />
                </template>
              </el-table-column>
              <el-table-column prop="applyStartDate" :label="$t('mdm.pricebook.applyStartDate')" width="120" show-overflow-tooltip />
              <el-table-column prop="applyEndDate" :label="$t('mdm.pricebook.applyEndDate')" width="120" show-overflow-tooltip />
              <el-table-column prop="localPrice" :label="$t('mdm.pricebook.localPrice')" width="120" align="right" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.localPrice | numFormat(2) }}
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
import { getPopList } from '@/api/mdm/pricebook.js'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'PricebookPop',
  mixins: [names, search, formValidator, numFormat, niceScroll, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    currency: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      selectUserDialog: false,
      pricebookList: [],
      multipleSelection: [],
      exportSelectDilog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          pricebookName: '',
          pricebookType: '',
          currency: '',
          productId: ''

        }
      },
      form: { // 弹窗检索参数
        identiferNum: '',
        pricebookName: '',
        pricebookType: ''
      }
    }
  },
  computed: {
    currencyParam: function() {
      return this.currency ? this.currency : this.row.currency
    }
  },
  methods: {
    async fetchData() {
      this.searchParam.params.currency = this.currencyParam
      this.searchParam.params.productId = this.row.productId
      this.isLoading = true
      const res = await getPopList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.pricebookList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    reset() {
      for (const item in this.searchParam.params) {
        this.searchParam.params[item] = ''
      }
      this.searchParam.params.currency = this.currencyParam
      this.searchParam.params.productId = this.row.productId
    }
  }
}
</script>
<style lang="scss" scoped>
.pricebook {
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
.constspan {
  white-space: nowrap;
  display: inline-block;
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
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
