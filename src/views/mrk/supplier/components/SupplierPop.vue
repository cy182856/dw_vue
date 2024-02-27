<template>
  <div id="supplier" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title=" $t('comm.supplierSelect')"
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
                  <el-form-item :label="$t('mrk.supplier.identiferNum')" prop="identiferNum">
                    <el-input v-model="searchParam.params.identiferNum" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.supplier.supplierName')" prop="supplierName">
                    <el-input v-model="searchParam.params.supplierName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.supplier.supplierType')" prop="supplierType">
                    <dict-select v-model="searchParam.params.supplierType" class="input" dict-type-id="VendorType" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.supplier.contactName')" prop="contactName">
                    <el-input v-model="searchParam.params.contactName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.supplier.telephone')" prop="telephone">
                    <el-input v-model="searchParam.params.telephone" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.supplier.mobilephone')" prop="mobilephone">
                    <el-input v-model="searchParam.params.mobilephone" />
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
              :data="supplierList"
              border
              stripe
              height="200"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" fixed width="55" />
              <el-table-column prop="identiferNum" :label="$t('mrk.supplier.identiferNum')" min-width="100" />
              <el-table-column prop="supplierName" :label="$t('mrk.supplier.supplierName')" width="160" show-overflow-tooltip />
              <el-table-column prop="contactName" :label="$t('mrk.supplier.contactName')" width="120" show-overflow-tooltip />
              <el-table-column prop="mobilephone" :label="$t('mrk.supplier.mobilephone')" min-width="120" />
              <el-table-column prop="telephone" :label="$t('mrk.supplier.telephone')" width="160" show-overflow-tooltip />
              <el-table-column prop="supplierType" :label="$t('mrk.supplier.supplierType')" min-width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                  <dict-write dict-type-id="VendorType" :value="scope.row.supplierType" />
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
              class="page-right blueDR"
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
import { getList } from '@/api/mrk/supplier.js'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'SupplierPop',
  mixins: [names, search, formValidator, popSelect],
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
      supplierList: [],
      multipleSelection: [],
      exportSelectDilog: false,
      form: { // 弹窗检索参数
        identiferNum: '',
        supplierName: '',
        contactName: '',
        mobilephone: '',
        telephone: '',
        supplierType: ''
      },
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          supplierName: '',
          contactName: '',
          mobilephone: '',
          telephone: '',
          supplierType: ''
        }
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.supplierList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.supplier {
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
