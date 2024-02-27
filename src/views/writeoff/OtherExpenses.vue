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
                发生年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.deductYm" size="small" :placeholder="'请选择'" type="month" value-format="yyyy-MM" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custName" clearable />
                <!--                <rel-func-select v-model="searchParam.params.custCode" :rel-func="'account'" :default-tags="defaultTags" :multiple="true" :is-separate-str="true" />-->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                大区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                小区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area2" clearable />
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
        <li class="operation-item" @click="handleDownload()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">费用调整下载(SKU)</span>
        </li>
        <li class="operation-item" @click="handleDownloadSerial()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">费用调整下载(系列)</span>
        </li>
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">费用调整上传</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable rebateledger-table" :class="{'table-two-2':finAccountList.length>0}">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="deductList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="deductYm" :label="'发生年月'" min-width="120" align="center" />
            <el-table-column prop="custName" :label="'代理商名称'" min-width="120" align="center" />
            <el-table-column :prop="'productCategory'" :label="'品类'" min-width="120" align="center" />
            <el-table-column :prop="'finAccountType'" :label="'一级费目'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="AccountTypeView" :value="scope.row.finAccountType" />
              </template>
            </el-table-column>
            <template v-for="(item,index) in finAccountList">
              <el-table-column :key="index" :label="item.accountName" min-width="150" align="right">
                <template slot-scope="scope">
                  <template v-for="(item1,index1) in scope.row.deductDetailList">
                    <div v-if="item.accountCode ===item1.finAccountCode" :key="index1">
                      {{ item1.deductAmount | numFormat(2) }}
                    </div>
                  </template>
                </template>
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
    <upload :is-show="uploadDialog" :action="'/api/deduct/upload'" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getFinAccountList, getList, downloadFile, downloadSerialFile } from '@/api/writeoff/deduct.js'
import Upload from '@/components/UploadNew'
import { dateFormat, addMonth } from '@/utils/util'

export default {
  name: 'OtherExpenses',
  components: { Upload },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      uploadDialog: false, // 上传文件dialog显示标志位
      accept: '.xlsx',
      otherParams: null,
      defaultTags: [],
      deductList: [],
      finAccountList: [],
      contextPath: process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : '',
      exportSelectDilog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          deductYm: '',
          custCodeArr: [],
          custCode: '',
          custName: '',
          area1: '',
          area2: ''
        }
      },
      root: 'test-hot'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'csrfToken']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    const day = new Date().getDate()
    if (day <= 15) {
      this.searchParam.params.deductYm = addMonth(dateFormat(new Date(), 'yyyy-MM'), -2)
    } else {
      this.searchParam.params.deductYm = addMonth(dateFormat(new Date(), 'yyyy-MM'), -1)
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      if (!this.searchParam.params.deductYm) {
        this.$message({
          type: 'error',
          message: '年月不能为空！'
        })
        return false
      }
      if (this.searchParam.params.custCode !== '') {
        this.searchParam.params.custCodeArr = this.searchParam.params.custCode.split(',')
      }
      this.getFinAccount()
      this.getDeduct(this.searchParam)
      this.isLoading = false
    },
    async getFinAccount() {
      const res = await getFinAccountList(this.searchParam.params.deductYm)
      if (res && res.success) {
        const results = res.datas.list
        console.log(results)
        if (results.length > 0) {
          this.finAccountList = results
        }
      }
    },
    async getDeduct(param) {
      const res = await getList(param)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.deductList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
    },
    async handleDownload() {
      const res = await downloadFile(this.searchParam)
      if (res && res.success) {
        console.log(res)
      }
    },
    async handleDownloadSerial() {
      const res = await downloadSerialFile(this.searchParam)
      if (res && res.success) {
        console.log(res)
      }
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
</style>
