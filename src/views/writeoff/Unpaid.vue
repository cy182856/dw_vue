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
          <!--<el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.submitOrg" dict-type-id="Dept" :filter2="searchParam.params.verifyYm.substr(0, 4)" placeholder="请选择" :disabled="disabled" />
              </el-col>
            </el-row>
          </el-form-item>-->
          <el-form-item>
            <el-row t ype="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                发生年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.verifyYm" size="small" :placeholder="'请选择'" type="month" clearable value-format="yyyy-MM" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商:
              </el-col>
              <el-col :span="16">
                <!-- <rel-func-select v-model="searchParam.params.account" :rel-func="'account'" /> -->
                <el-input v-model="searchParam.params.custName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                预定支付日:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.datePrePayFlag" dict-type-id="YesOrNot" placeholder="请选择" />
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
        <li class="operation-item" @click="downloadFile">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">下载</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="WriteoffList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column :prop="'submitOrg'" :label="'部门'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="Dept" :value="scope.row.submitOrg" />
              </template>
            </el-table-column>
            <el-table-column :prop="'verifyYm'" :label="'发生年月'" min-width="120" align="center" />
            <el-table-column :prop="'finAccountType'" :label="'一级费目'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="AccountTypeView" :value="scope.row.finAccountType" />
              </template>
            </el-table-column>
            <el-table-column :prop="'custName'" :label="'代理商'" min-width="120" align="center" />
            <el-table-column :prop="'actAmount'" :label="'待支付金额'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.actAmount| numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'datePrePay'" :label="'预定支付日'" min-width="120" align="center" />
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getUnpaidList, downloadFile } from '@/api/writeoff/unpaid.js'
import { dateFormatFilter } from '@/mixins/date-format'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
import { dateFormat } from '@/utils/util'
export default {
  name: 'Unpaid',
  // components: { RelFuncSelect },
  // filters: {
  //   dateTimeFormat(val) {
  //     // yyyy-MM-dd HH:mm:ss 转为 yyyy-MM-dd
  //     return val ? val.substring(0, 10) : val
  //   }
  // },
  mixins: [search, names, permission, numFormat, dateFormatFilter],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      WriteoffList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          submitOrg: '',
          //verifyYm: dateFormat(new Date(new Date().setMonth(new Date().getMonth() - 2)), 'yyyy-MM'),
          verifyYm: '',
          custName: '',
          datePrePayFlag: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    disabled() {
      let isSelect = true
      let isFlag = false
      if (this.userInfo.roleList.includes('ROLE_WF_MARKET') || this.userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY')) {
        return false
      }
      if (this.$store.getters.dictList.Dept) {
        const deptList = this.$store.getters.dictList.Dept
        const targetList = this.$store.getters.dictList.TARGETORG
        let orgId = ''
        if (deptList && targetList) {
          for (let i = 0; i < deptList.length; i++) {
            for (let s = 0; s < targetList.length; s++) {
              if (targetList[s].dictName === deptList[i].dictId) {
                orgId = targetList[s].dictId
                console.log(this.userInfo.orgSeqNo.indexOf(orgId), orgId, this.userInfo.orgSeqNo, 1090)
                if (this.userInfo.orgSeqNo.indexOf(orgId) !== -1) {
                  isFlag = true
                  break
                }
              }
            }
          }
        }
        if (!isFlag) {
          isSelect = false
        }
      }
      return isSelect
    }
  },
  created() {
    this.searchParam.params.submitOrg = this.orgIdCom
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // 查询未支付管理一览
      const res = await getUnpaidList(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.WriteoffList = results
      }
      this.isLoading = false
    },
    downloadFile() {
      // const a = document.createElement('a')
      // a.download = '未支付一览.xlsx'
      // a.style.display = 'none'
      // a.href = process.env.VUE_APP_CAS_CLIENT_URL + '/static/未支付一览.xlsx'
      // document.body.appendChild(a)
      // a.click()
      downloadFile(this.searchParam)
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
