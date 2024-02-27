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
                {{ $t("rebateRate.area1") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("rebateRate.area2") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area2" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("rebateRate.custName") }}
              </el-col>
              <el-col :span="16">
                <el-autocomplete v-model="searchParam.params.custName" :fetch-suggestions="handleQuerySearch" :trigger-on-focus="false" :clearable="true" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("rebateRate.bgtYear") }}
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.bgtYear" size="small" type="year" value-format="yyyy" :clearable="false" :picker-options="pickerOptions0" />
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
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t("comm.download") }}</span>
        </li>
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{ $t("rebateRate.upload") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="rebateRateList"
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <!-- <el-table-column :prop="'custCode'" :label="'代理商编号'" min-width="120" align="center" /> -->
            <el-table-column :prop="'custName'" :label="$t('rebateRate.custCode')" min-width="220" align="center" />
            <el-table-column :prop="'custCodeName2'" :label="$t('rebateRate.custCodeName2')" min-width="160" align="center" />
            <!-- <el-table-column :prop="'terminalCode'" :label="'终端编号'" min-width="120" align="center" /> -->
            <el-table-column :prop="'terminalName'" :label="$t('rebateRate.terminalName')" min-width="160" align="center" />
            <el-table-column :prop="'terminalNameAlias'" :label="$t('rebateRate.terminalNameAlias')" min-width="160" align="center" />
            <el-table-column :prop="'monthlyRate'" :label="$t('rebateRate.monthlyRate')" min-width="100" align="right">
              <template slot-scope="scope">
                <div v-if="scope.row.monthlyRate !==null">
                  {{ scope.row.monthlyRate }}%
                </div>
              </template>
            </el-table-column>
            <el-table-column :prop="'yearRate'" :label="$t('rebateRate.yearRate')" min-width="100" align="right">
              <template slot-scope="scope">
                <div v-if="scope.row.yearRate !==null">
                  {{ scope.row.yearRate }}%
                </div>
              </template>
            </el-table-column>
            <el-table-column :prop="'accrual05Rate'" :label="$t('rebateRate.accrual05Rate')" min-width="110" align="right">
              <template slot-scope="scope">
                <div v-if="scope.row.accrual05Rate !==null">
                  {{ scope.row.accrual05Rate }}%
                </div>
              </template>
            </el-table-column>
            <el-table-column :prop="'bgtYear'" :label="$t('rebateRate.bgtYear')" min-width="80" align="center" />
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
    <upload :is-show="uploadDialog" action="/api/rebaterate/upload" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList, downloadFile, getListByCustName } from '@/api/bgt/rebaterate.js'
import Upload from '@/components/UploadNew'
export default {
  name: 'RebateRate',
  components: {
    Upload
  },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      rebateRateList: [],
      uploadDialog: false,
      accept: '.xlsx',
      otherParams: null,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          bgtYear: String(new Date().getFullYear()),
          bigArea: '',
          smallArea: '',
          custName: ''
        }
      },
      bigAreas: [],
      smallAreas: [],
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
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    this.fetchData()
    console.log(this.rebateRateList)
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.rebateRateList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleDownload() {
      downloadFile(this.searchParam.params.bgtYear)
    },
    async handleQuerySearch(queryString, cb) {
      const list = []
      const res = await getListByCustName(this.searchParam.params.custName)
      if (res && res.success) {
        const custList = res.datas.list
        if (custList) {
          custList.forEach(item => {
            list.push({
              value: item.custName,
              id: item.custCode
            })
          })
        }
      }
      var results = queryString ? list.filter(this.createFilter(queryString)) : list
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
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
