<template>
  <div id="product" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title=" $t('comm.productSelect')"
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
                  <el-form-item :label="$t('mdm.product.brandNum')" prop="brandNum">
                    <el-input v-model="searchParam.params.brandNum" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.product.brandName')" prop="brandName">
                    <el-input v-model="searchParam.params.brandName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.product.subBrandNum')" prop="subBrandNum">
                    <el-input v-model="searchParam.params.subBrandNum" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.product.subBrandName')" prop="subBrandName">
                    <el-input v-model="searchParam.params.subBrandName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.product.skuNum')" prop="skuNum">
                    <el-input v-model="searchParam.params.skuNum" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mdm.product.skuName')" prop="skuName">
                    <el-input v-model="searchParam.params.skuName" />
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
              :data="productList"
              border
              stripe
              height="200"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" fixed width="55" />
              <!-- <el-table-column prop="identiferNum" :label="$t('mdm.product.identiferNum')" min-width="120" />
              <el-table-column prop="productName" :label="$t('mdm.product.productName')" width="160" show-overflow-tooltip /> -->
              <el-table-column prop="brandNum" :label="$t('mdm.product.brandNum')" min-width="100" show-overflow-tooltip />
              <el-table-column prop="brandName" :label="$t('mdm.product.brandName')" min-width="100" show-overflow-tooltip />
              <el-table-column prop="subBrandNum" :label="$t('mdm.product.subBrandNum')" min-width="120" show-overflow-tooltip />
              <el-table-column prop="subBrandName" :label="$t('mdm.product.subBrandName')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="skuNum" :label="$t('mdm.product.skuNum')" min-width="120" show-overflow-tooltip />
              <el-table-column prop="skuName" :label="$t('mdm.product.skuName')" min-width="140" show-overflow-tooltip />
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
// import { getPopList } from '@/api/mdm/product.js'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'ProductPop',
  mixins: [names, search, formValidator, numFormat, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    currency: {
      type: String,
      default: 'cny'
    }
  },
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      selectUserDialog: false,
      productList: [],
      multipleSelection: [],
      exportSelectDilog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          // identiferNum: '',
          // productName: '',
          brandNum: '',
          brandName: '',
          subBrandNum: '',
          subBrandName: '',
          skuNum: '',
          skuName: ''
        }
      },
      form: { // 弹窗检索参数
        // identiferNum: '',
        // productName: '',
        brandNum: '',
        brandName: '',
        subBrandNum: '',
        subBrandName: '',
        skuNum: '',
        skuName: ''
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // const res = await getPopList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.productList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.productList.push({
        brandNum: 'BIORE',
        brandName: '碧柔',
        subBrandNum: 'BIORE-SUB-1',
        subBrandName: '碧柔XX01',
        skuNum: 'BIORE-SUB-1-SKU-1',
        skuName: '碧柔XX01SKU01'
      }, {
        brandNum: 'BIORE',
        brandName: '碧柔',
        subBrandNum: 'BIORE-SUB-2',
        subBrandName: '碧柔XX02',
        skuNum: 'BIORE-SUB-2-SKU-1',
        skuName: '碧柔XX02SKU01'
      }, {
        brandNum: 'BIORE',
        brandName: '碧柔',
        subBrandNum: 'BIORE-SUB-3',
        subBrandName: '碧柔XX03',
        skuNum: 'BIORE-SUB-3-SKU-1',
        skuName: '碧柔XX03SKU01'
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
.product {
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
