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
                年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.actYm" size="small" format="yyyy-MM" value-format="yyyy-MM" :placeholder="'请选择'" type="month" clearable />
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
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text">上传</span>
        </li>
        <li class="operation-item" @click="isShow=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t("comm.download") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="costFinanceList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column :prop="'actYm'" :label="'年月'" min-width="120" align="center" />
            <el-table-column :prop="'productQty'" :label="'产品数量'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.productQty|numFormat(0) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'productQtyWithCost'" :label="'已上传数量'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.productQtyWithCost|numFormat(0) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'productQtyWithoutCost'" :label="'未上传数量'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.productQtyWithoutCost|numFormat(0) }}
              </template>
            </el-table-column>
            <el-table-column :label="'完成情况'" min-width="120" align="center">
              <template slot-scope="scope">
                {{ toFix(scope.row.productQtyWithCost/(scope.row.productQty)) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'uploadTime'" :label="'最后更新日'" min-width="150" align="center" />
            <el-table-column :prop="'updateBy'" :label="'更新人'" min-width="120" align="center" />
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
    <el-dialog
      class="content-dialog-box  search-light rules newedit3"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title="'下载'"
      :visible.sync="isShow"
      width="600"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
      <el-form ref="form" :model="editData" label-width="80px">
        <el-form-item label="年月">
          <el-col :span="24">
            <el-date-picker v-model="editData.actYm" type="month" style="width: 100%;" value-format="yyyy-MM" />
          </el-col>
        </el-form-item>
      </el-form>
      <div class="btn">
        <button class="cancel" @click="handleClose">
          取消
        </button>
        <button class="save" @click="downloadFile">
          确定
        </button>
      </div>
    </el-dialog>
    <upload :is-show="uploadDialog" action="/api/finance/upload/import" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList, downloadFile } from '@/api/cost/finance.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
import Upload from '@/components/UploadNew'
export default {
  name: 'NobarCode',
  components: {
    Upload
  },
  // components: { RelFuncSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isShow: false,
      isAdd: true,
      uploadDialog: false, // 上传文件dialog显示标志位
      accept: '.xlsx',
      otherParams: null,
      editData: {
        actYm: ''
      },
      contextPath: process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : '',
      isLoading: false,
      multipleSelection: [],
      costFinanceList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          actYm: ''
        }
      },
      bigAreas: [],
      smallAreas: []
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'csrfToken']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    this.fetchData()
    console.log(this.orgRootId, 666)
  },
  methods: {
    toFix(num) {
      return (((num * 10000)) / 100.00).toFixed(2) + '%'
    },
    handleClose() {
      this.isShow = false
    },
    add() {
      this.isAdd = true
      this.editData = {}
      this.isShow = true
    },
    edit() {
      this.isAdd = false
      if (this.multipleSelection.length === 1) {
        this.editData = { ...this.multipleSelection[0] }
        this.isShow = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    async fetchData() {
      this.isLoading = true
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.costFinanceList = results
        // console.log(results, 'results')
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      // this.scroll()
      this.isLoading = false
    },
    downloadFile() {
      downloadFile(this.editData.actYm)
      this.isShow = false
    },
    upload() {
      this.uploadDialog = true
    },
    handleUploadSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
      // console.log('操作成功！！！！！！！！')
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
.apply .newedit3 .el-dialog {
    width: 400px !important;
    height: 180px;
    min-width: 400px !important;
}
</style>
