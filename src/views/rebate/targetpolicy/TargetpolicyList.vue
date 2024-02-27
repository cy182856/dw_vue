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
                {{ $t('rebate.targetPolicy.identiferNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="policyName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.targetPolicy.policyName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.policyName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="strategyType">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.targetPolicy.strategyType') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.strategyType" dict-type-id="StrategyType" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="agreementMethod">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.targetPolicy.agreementMethod') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.agreementMethod" dict-type-id="AgreementMethod" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="agreementTarget">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.targetPolicy.agreementTarget') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.agreementTarget" dict-type-id="AgreementTarget" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="orderStartDate">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.targetPolicy.orderStartDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.orderStartDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="orderEndDate">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.targetPolicy.orderEndDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.orderEndDate" size="small" type="date" value-format="yyyy-MM-dd" />
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
        <li class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <li class="operation-item" @click="batchDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">{{ $t('comm.delete') }}</span>
        </li>
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <!-- 返利执行 -->
        <li class="operation-item" @click="startBatch">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('rebate.targetPolicy.rebateBatch') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="targetpolicyList"
            stripe
            border
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="identiferNum" :label="$t('rebate.targetPolicy.identiferNum')" min-width="150">
              <template slot-scope="scope">
                <router-link :to="{path:'/rebate/targetpolicy/detail',query:{id:scope.row.id}}">
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="policyName" :label="$t('rebate.targetPolicy.policyName')" width="200" show-overflow-tooltip />
            <el-table-column :label="$t('rebate.targetPolicy.strategyType')" min-width="100">
              <template slot-scope="scope">
                <dict-write dict-type-id="StrategyType" :value="scope.row.strategyType" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('rebate.targetPolicy.agreementMethod')" min-width="100">
              <template slot-scope="scope">
                <dict-write dict-type-id="AgreementMethod" :value="scope.row.agreementMethod" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('rebate.targetPolicy.agreementTarget')" min-width="100">
              <template slot-scope="scope">
                <dict-write dict-type-id="AgreementTarget" :value="scope.row.agreementTarget" />
              </template>
            </el-table-column>
            <el-table-column prop="orderStartDate" :label="$t('rebate.targetPolicy.orderStartDate')" min-width="120" />
            <el-table-column prop="orderEndDate" :label="$t('rebate.targetPolicy.orderEndDate')" min-width="120" />
            <el-table-column :label="$t('rebate.targetPolicy.useFlag')" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="IsNo" :value="scope.row.useFlag" />
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
        <export-fields-select func-div="targetpolicy" file-type="xlsx" :search-param="searchParam" />
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
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his :key="identiferNum" func-div="targetpolicy" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { getList, deleteTargetpolicy, startBatch } from '@/api/rebate/targetpolicy.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'TargetpolicyList',
  mixins: [search, names, permission, niceScroll],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      selectUserDialog: false,
      targetpolicyList: [],
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
          policyName: '',
          strategyType: '',
          agreementMethod: '',
          agreementTarget: '',
          orderStartDate: '',
          orderEndDate: '',
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
    if (this.$route.query.relSalesorderId) {
      this.searchParam.params.relSalesorderId = this.$route.query.relSalesorderId
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.targetpolicyList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/rebate/targetpolicy/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/rebate/targetpolicy/edit', query: { id: rowData.id, copy: true }})
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        if (this.multipleSelection[0].workflowFlag === '1') {
          this.$message({
            type: 'error',
            message: this.$t('comm.msg33')
          })
          return
        } else if (this.multipleSelection[0].targetPolicyIsExecute === '1') {
          this.$message({
            type: 'error',
            message: this.$t('rebate.targetPolicy.e0007')
          })
          return
        }

        this.$router.push({ path: '/rebate/targetpolicy/edit', query: { id: this.multipleSelection[0].id }})
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    batchDelete() {
      if (this.multipleSelection.length > 0) {
        let workflowFlag = false
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1' && !workflowFlag) {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg34')
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
          deleteTargetpolicy(this.multipleSelection).then(() => {
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
          message: this.$t('comm.msg3')
        })
      }
    },
    startBatch() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        if (this.multipleSelection[0].workflowFlag === '1') {
          this.$message({
            type: 'error',
            message: this.$t('comm.msg39')
          })
          return
        } else if (this.multipleSelection[0].rebateStrategyFlag !== '2') {
          this.$message({
            type: 'error',
            message: this.$t('rebate.targetPolicy.e0006')
          })
          return
        } else if (this.multipleSelection[0].useFlag === '0') {
          this.$message({
            type: 'error',
            message: this.$t('rebate.targetPolicy.e0004')
          })
          return
        } else if (this.multipleSelection[0].targetPolicyIsExecute === '1') {
          this.$message({
            type: 'error',
            message: this.$t('rebate.targetPolicy.e0005')
          })
          return
        }
        this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          startBatch(this.multipleSelection[0].id).then(() => {
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
    }

  }
}
</script>

