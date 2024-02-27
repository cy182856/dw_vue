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
                <el-date-picker
                  v-model="searchParam.params.salesYm"
                  size="small"
                  :placeholder="'请选择'"
                  type="month"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  :clearable="false"
                  :picker-options="pickerOptions0"
                />
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
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custName" clearable maxlength="80" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                终端:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.terminalName" clearable maxlength="80" />
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
        <div class="search-box" @click="fetchData">
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
        <li class="operation-item" @click="downloadExcel()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">下载</span>
        </li>
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">上传</span>
        </li>
      </ul>
      <div
        class="table-bg-box search-list-table borderTable"
      >
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="dataList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <el-table-column
              :prop="'custName'"
              :label="'一级代理商'"
              min-width="120"
              align="left"
            />
            <el-table-column
              :prop="'terminalName'"
              :label="'终端'"
              min-width="120"
              align="left"
            />
            <el-table-column
              :prop="'productCategory'"
              :label="'品类'"
              min-width="120"
              align="left"
            />
            <el-table-column
              :prop="'productName'"
              :label="'SKU'"
              min-width="240"
              align="left"
            />
            <el-table-column
              :prop="'salesYm'"
              :label="'年月'"
              min-width="120"
              align="center"
            />
            <el-table-column
              :prop="'salesQty'"
              :label="'出货数量'"
              min-width="120"
              align="right"
            />
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
    <upload :is-show="uploadDialog" action="/api/nbc/upload" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getNBCProductList, downloadExcel } from '@/api/est/nbc-api'
import { getArea1List, getArea2ListByArea1 } from '@/api/mrk/customer'
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
      isLoading: false,
      // multipleSelection: [],
      dataList: [], // 列表数据
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          salesYm: '',
          area1: '',
          area2: '',
          custName: '',
          terminalName: ''
        }
      },
      area1List: [], // 大区列表
      area2List: [], // 小区列表，按大区级联
      uploadDialog: false, // 上传文件dialog显示标志位
      accept: '.xlsx',
      otherParams: null,
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
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
    // this.loadArea1Data()
    this.fetchData()
  },
  methods: {
    async loadArea1Data() {
      const res = await getArea1List()
      if (res && res.success) {
        this.area1List = res.datas.list
      }
    },
    async downloadExcel() {
      this.isLoading = true
      await downloadExcel()
      this.isLoading = false
    },
    async loadArea2List() {
      if (!this.searchParam.params.area1) {
        this.area2List = []
        this.searchParam.params.area2 = ''
      } else {
        const res = await getArea2ListByArea1(this.searchParam.params.area1)
        if (res && res.success) {
          this.area2List = res.datas.list
        }
      }
    },
    async fetchData() {
      this.isLoading = true
      const res = await getNBCProductList(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.dataList = results
      }
      this.isLoading = false
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
    /* handleSelectionChange(val) {
      this.multipleSelection = val
    }, */
  }
}
</script>
<style >
.bi-table .el-table__body {
  border-bottom: 1px solid #ddd;
}
.bi-table tbody tr:last-child td {
  border-bottom: 0 !important;
}
</style>
