<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="identiferNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.contract.identiferNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="contractName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.contract.contractName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.contractName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="contractStatus">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.contract.contractStatus') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.contractStatus" dict-type-id="ContractStatus" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="assignedUser">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.contract.assignedUser') }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.assignedUser" :root-org-id="userInfo.orgSeqNo.split('.')[1]" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="accountNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.contract.accountNum1') }}:
              </el-col>
              <el-col :span="16">
                <account-select v-model="searchParam.params.accountNum" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="releaseNo">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.contract.releaseNo') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.releaseNo" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="noLimit">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.contract.noLimit') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.noLimit" dict-type-id="IsNo" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.contract.contractPeriod') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.contractDateFrom" size="small" :placeholder="$t('comm.from')" type="date" value-format="yyyy-MM-dd" />
                <span style="margin: 0 5px">{{ $t('dashboard.to') }}</span>
                <el-date-picker v-model="searchParam.params.contractDateTo" size="small" :placeholder="$t('comm.to')" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t('comm.reset') }}</p>
          <span class="circle-larger-btn btn-default-color"><i class="iconfont iconrefresh" /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t('comm.query') }}</p>
          <span class="circle-larger-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="handleCreate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">{{ $t('comm.newlyBuild') }}</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.export') }}</span>
        </li>
        <li class="operation-item" @click="handleUpdateHisClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">变更履历</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="contractList"
            border
            stripe
            height="100%"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <!-- <el-table-column
              :label="$t('comm.operation')"
              min-width="120"
              width="120"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row, scope.$index)" />
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row, scope.$index)" />
              </template>
            </el-table-column> -->
            <el-table-column prop="identiferNum" label="管理编号" min-width="130">
              <template slot-scope="scope">
                <router-link :to="{path:'/mgt/contract/detail',query:{id:scope.row.id}}">
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="发行No." min-width="130">
              <template slot-scope="scope">
                {{ JSON.parse(scope.row.variables).releaseNo }}
              </template>
            </el-table-column>
            <el-table-column prop="contractName" label="合同名称" min-width="160" show-overflow-tooltip />
            <el-table-column prop="accountNum" label="对方公司名称" min-width="220" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ JSON.parse(scope.row.variables).accountNum | funcName('account') }}
              </template>
            </el-table-column>
            <el-table-column label="发行日" min-width="120">
              <template slot-scope="scope">
                {{ scope.row.createTime | dateTimeFormat }}
              </template>
            </el-table-column>
            <el-table-column label="发行人" min-width="120">
              <template slot-scope="scope">
                {{ scope.row.assignedUser | userName }}
              </template>
            </el-table-column>
            <el-table-column label="无期限合同" min-width="100">
              <template slot-scope="scope">
                <dict-write dict-type-id="IsNo" :value="JSON.parse(scope.row.variables).noLimit" />
              </template>
            </el-table-column>
            <el-table-column prop="contractStartDate" label="合同起始日期" min-width="120" />
            <el-table-column prop="contractEndDate" label="合同结束日期" min-width="120" />
            <el-table-column label="合同状态" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="ContractStatus" :value="scope.row.contractStatus" />
              </template>
            </el-table-column>
            <el-table-column label="流程状态" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="WorkflowFlag" :value="scope.row.workflowFlag" />
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
          <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
        </el-pagination>
        <el-pagination class="page-right  page-first" layout="slot">
          <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
        </el-pagination>
      </div>
    </div>
    <div class="exportDialog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-resource  fixed-search-btn-box"
        top="0"
        :visible.sync="exportSelectDilog"
        :title="$t('comm.exportFieldsSelect')"
        width="50%"
      >
        <export-fields-select func-div="contract" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
    <div class="historyDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">变更履历</span>
        <update-his :key="identiferNum" func-div="contract" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { getList, deleteContract } from '@/api/mgt/contract.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import AccountSelect from '@/views/mrk/account/components/AccountSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
import { niceScroll } from '@/mixins/nice-scroll.js'

export default {
  name: 'ContractList',
  filters: {
    dateTimeFormat(val) {
      // yyyy-MM-dd HH:mm:ss 转为 yyyy-MM-dd
      return val ? val.substring(0, 10) : val
    }
  },
  components: { UserSelect, AccountSelect },
  mixins: [search, names, permission, niceScroll],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      contractList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          contractName: '',
          contractStatus: '',
          assignedUser: '',
          accountNum: '',
          releaseNo: '',
          contractDateFrom: '',
          contractDateTo: '',
          assignedOrg: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.searchParam.params.assignedOrg = this.userInfo.orgSeqNo.split('.')[1]
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.contractList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    tableRowClassName({ row }) {
      if (row.prompt === '1') {
        return 'warning-row'
      }
      return ''
    },
    handleCreate() {
      this.$router.push('/mgt/contract/edit')
    },
    handleEdit(rowData) {
      //      this.$router.push({ path: '/mgt/contract/edit', query: { id: rowData.id }})
      if (rowData.workflowFlag === '1') {
        this.$message({
          type: 'error',
          message: '流程中，不能编辑'
        })
        return
      }
      this.$router.push({ path: '/mgt/contract/edit', query: { id: rowData.id }})
    },
    handleDelete(rowData) {
      if (rowData.workflowFlag === '1') {
        this.$message({
          type: 'error',
          message: '流程中，不能删除'
        })
        return
      }
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        rowData.submitType = 'submit'
        deleteContract([rowData]).then(() => {
          this.search()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    batchDelete() {
      if (this.multipleSelection.length > 0) {
        let workflowFlag = false
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1' && !workflowFlag) {
            this.$message({
              type: 'error',
              message: '流程中，不能删除'
            })
            workflowFlag = true
          }
          rowData.submitType = 'submit'
        })
        if (workflowFlag) return false
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          deleteContract(this.multipleSelection).then(() => {
            this.search()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleUpdateHisClick() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.identiferNum = this.multipleSelection[0].identiferNum
        this.historyDialog = true
      } else {
        this.$message({
          type: 'info',
          message: '请选择一条记录'
        })
      }
    }

  }
}
</script>
<style lang="scss">
.el-table .warning-row {
  background: rgb(253, 233, 230);
}
</style>
