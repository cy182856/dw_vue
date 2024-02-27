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
                {{ $t('sale.opportunity.identiferNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="salesopportunityName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('sale.opportunity.salesOppName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.salesopportunityName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="contactName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('sale.opportunity.contactFullName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.contactName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="businessType">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('sale.opportunity.businessType') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.businessType" dict-type-id="BusinessType" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="clueSource">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('sale.opportunity.clueSource') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.clueSource" dict-type-id="ClueSource" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="accountNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('sale.opportunity.accountName') }}:
              </el-col>
              <el-col :span="16">
                <account-select v-model="searchParam.params.accountNum" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="transactionProbability">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('sale.opportunity.probability') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.transactionProbability" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="salesPhase">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('sale.opportunity.salesPhase') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.salesPhase" dict-type-id="SalesPhase" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="assignedUser">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('sale.opportunity.assignedUser') }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.assignedUser" :root-org-id="userInfo.orgSeqNo.split('.')[1]" />
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
        <li class="operation-item" @click="handleDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">{{ $t('comm.delete') }}</span>
        </li>
        <li class="operation-item" @click="handleMergeClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.merge') }}</span>
        </li>
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.export') }}</span>
        </li>
        <li class="operation-item" @click="handleUpdateHisClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="salesopportunityList"
            stripe
            border
            height="100%"
            :header-cell-style="{'text-align':'left'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="identiferNum" :label="$t('sale.opportunity.identiferNum')" min-width="150">
              <template slot-scope="scope">
                <router-link :to="{path:'/sale/salesopportunity/detail',query:{id:scope.row.id}}">
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="salesopportunityName" :label="$t('sale.opportunity.salesOppName')" width="200" show-overflow-tooltip />
            <el-table-column :label="$t('sale.opportunity.contactFullName')" min-width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.contactNum | funcName('contact') }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('sale.opportunity.businessType')" min-width="150">
              <template slot-scope="scope">
                <dict-write dict-type-id="BusinessType" :value="scope.row.businessType" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('sale.opportunity.clueSource')" min-width="100">
              <template slot-scope="scope">
                <dict-write dict-type-id="ClueSource" :value="scope.row.clueSource" />
              </template>
            </el-table-column>
            <el-table-column prop="accountNum" :label="$t('sale.opportunity.accountName')" min-width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.accountNum | funcName('account') }}
              </template>
            </el-table-column>
            <el-table-column prop="transactionProbability" :label="$t('sale.opportunity.probability')" width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.transactionProbability ? scope.row.transactionProbability + '%' : '' }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('sale.opportunity.salesPhase')" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <dict-write dict-type-id="SalesPhase" :value="scope.row.salesPhase" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('sale.opportunity.assignedUser')" min-width="130" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.assignedUser | userName }}
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
        <export-fields-select func-div="salesopportunity" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
    <div>
      <merge-dialog :is-show="mergeDialog" func-div="salesopportunity" :search-param="mergeMap" @saved="handleMergeSaved" @close="mergeDialog=false" />
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
        <update-his :key="identiferNum" func-div="salesopportunity" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { getList, deleteSalesopportunity } from '@/api/sale/salesopportunity.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import AccountSelect from '@/views/mrk/account/components/AccountSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'SalesopportunityList',
  components: { UserSelect, AccountSelect },
  mixins: [search, names, permission, niceScroll],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      selectUserDialog: false,
      salesopportunityList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      mergeDialog: false,
      mergeMap: new Map(),
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          salesopportunityName: '',
          contactName: '',
          businessType: '',
          clueSource: '',
          accountNum: '',
          transactionProbability: '',
          salesPhase: '',
          assignedUser: '',
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
    if (this.$route.query.relFuncNum) {
      this.searchParam.params.relFuncNum = this.$route.query.relFuncNum
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.salesopportunityList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/sale/salesopportunity/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/sale/salesopportunity/edit', query: { id: rowData.id, copy: true }})
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
        this.$router.push({ path: '/sale/salesopportunity/edit', query: { id: this.multipleSelection[0].id }})
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleDelete() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          deleteSalesopportunity(this.multipleSelection).then(() => {
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
    handleMergeClick() {
      if (this.multipleSelection && this.multipleSelection.length === 2) {
        this.$set(this.mergeMap, 'left', this.multipleSelection[0].id)
        this.$set(this.mergeMap, 'right', this.multipleSelection[1].id)
        this.$set(this.mergeMap, 'accountNum', 'accountId')
        this.$set(this.mergeMap, 'leadNum', 'leadId')
        this.$set(this.mergeMap, 'contactNum', 'contactId')
        this.mergeDialog = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg35')
        })
      }
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
    handleMergeSaved() {
      this.mergeDialog = false
      this.fetchData()
    }

  }
}
</script>
