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
                {{ $t("customerprice.yearMonth") }}
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.yearMonth" size="small" :placeholder="'请选择'" type="month" value-format="yyyy-MM" :picker-options="pickerOptions0" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customerprice.custName") }}
              </el-col>
              <el-col :span="16">
                <rel-func-select v-model="searchParam.params.custCode" :rel-func="'account'" :default-tags="defaultTags" :multiple="true" :is-separate-str="true" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customerprice.terminalName") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.terminalName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customerprice.category") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customerprice.feeInputType") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.feeInputType" clearable />
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
          <span class="operation-text">{{ $t("comm.download") }}</span>
        </li>
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{ $t("comm.upload") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="customerPriceList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column :prop="'custName'" :label="$t('customerprice.custName')" min-width="230" align="center" />
            <el-table-column :prop="'custCodeName2'" :label="$t('customerprice.custName2')" min-width="180" align="center" />
            <el-table-column :prop="'terminalName'" :label="$t('customerprice.terminalName')" min-width="120" align="center" />
            <el-table-column :prop="'terminalNameAlias'" :label="$t('customerprice.terminalNameAlias')" min-width="120" align="center" />
            <el-table-column :prop="'productName'" :label="$t('customerprice.productName')" min-width="280" align="center" />
            <el-table-column :prop="'category'" :label="$t('customerprice.category')" min-width="120" align="center" />
            <el-table-column :prop="'feeInputType'" :label="$t('customerprice.feeInputType')" min-width="120" align="center" />
            <el-table-column :prop="'category1'" :label="$t('customerprice.category1')" min-width="120" align="center" />
            <el-table-column :prop="'category2'" :label="$t('customerprice.category2')" min-width="120" align="center" />
            <el-table-column :prop="'category3'" :label="$t('customerprice.category3')" min-width="120" align="center" />
            <el-table-column :prop="'category4'" :label="$t('customerprice.category4')" min-width="120" align="center" />
            <el-table-column :prop="'channel'" :label="$t('customerprice.channel')" min-width="120" align="center" />
            <el-table-column :prop="'price'" :label="$t('customerprice.price')" min-width="120" align="right">
              <template slot-scope="scope">
                <div v-if="scope.row.feeInputTypePrice!==null">
                  {{ scope.row.feeInputTypePrice | numFormat(2) }}
                </div>
                <div v-else>
                  {{ scope.row.price | numFormat(2) }}
                </div>
              </template>
            </el-table-column>
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
    <upload :is-show="uploadDialog" :action="'/api/customerprice/upload'" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList, downloadFile } from '@/api/mrk/customerprice.js'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import Upload from '@/components/UploadNew'
export default {
  name: 'CustomerPriceList',
  components: { RelFuncSelect, Upload },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      otherParams: null,
      accept: '.xlsx',
      isLoading: false,
      contextPath: process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : '',
      customerPriceList: [],
      defaultTags: [],
      uploadDialog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          yearMonth: '',
          custCode: '',
          custCodeArr: [],
          terminalName: '',
          category: '',
          feeInputType: ''
        }
      },
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'csrfToken']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo
    }
  },
  created() {
    this.$store.dispatch('getDicts', 'Dept')
    this.fetchData()
    console.log(this.customerPriceList)
  },
  methods: {
    handleUploadSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
      // console.log('操作成功！！！！！！！！')
    },
    async fetchData() {
      this.isLoading = true
      if (this.searchParam.params.custCode !== '') {
        this.searchParam.params.custCodeArr = this.searchParam.params.custCode.split(',')
      }
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.customerPriceList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleDownload() {
      downloadFile(this.searchParam)
    },
    handleAvatarSuccess(res, file) {
      this.$message({
        type: 'success',
        message: '上传成功',
        iconClass: 'iconfont iconqueren',
        customClass: 'css-el-message'
      })
      this.$refs.upload.clearFiles()
      this.search()
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

      if (!isJPG) {
        this.$message.error('上传文件只能是 xlsx 格式!')
      }
      return isJPG
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
