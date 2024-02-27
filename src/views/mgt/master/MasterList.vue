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
          <el-form-item prop="identiferNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                申请编号:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="decisionType">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                申请类型:
              </el-col>
              <el-col :span="16">
                <dict-select
                  v-model="searchParam.params.masterDataType"
                  dict-type-id="MasterDataType"
                  clearble
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="assignedUser">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                申请担当:
              </el-col>
              <el-col :span="16">
                <!-- <user-select v-model="searchParam.params.assignedUser" :root-org-id="userInfo.orgSeqNo.split('.')[1]" /> -->
                <user-select
                  v-model="searchParam.params.assignedUser"
                  :root-org-id="userInfo.orgSeqNo.split('.')[1]"
                />
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
        <li class="operation-item" @click="handleCreate">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">{{ $t("comm.newlyBuild") }}</span>
        </li>
        <li class="operation-item" @click="handleEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">{{ $t("comm.edit") }}</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog = true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">{{ $t("comm.export") }}</span>
        </li>
        <li class="operation-item" @click="handleUpdateHisClick">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-notebook-2"
          /></span>
          <span class="operation-text">变更履历</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="decisionList"
            border
            stripe
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="55" />
            <el-table-column
              prop="identiferNum"
              label="申请编号"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/mgt/master/detail',
                    query: { id: scope.row.id },
                  }"
                >
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="申请类型" min-width="80" align="center">
              <template slot-scope="scope">
                <dict-write
                  dict-type-id="MasterDataType"
                  :value="scope.row.masterType"
                />
              </template>
            </el-table-column>
            <el-table-column label="申请担当" min-width="80" align="center">
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
      <!-- <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, ->"
          :page-size="searchParam.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :current-page.sync="searchParam.pageNo"
          :total="searchParam.totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div> -->
    </div>
    <div class="exportDialog">
      <el-dialog
        class="content-dialog-box search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-resource  fixed-search-btn-box"
        top="0"
        :visible.sync="exportSelectDilog"
        :title="$t('comm.exportFieldsSelect')"
        width="50%"
      >
        <export-fields-select
          func-div="decision"
          file-type="xlsx"
          :search-param="searchParam"
        />
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
        <span slot="title" style="font-size: 20px">变更履历</span>
        <update-his
          :key="identiferNum"
          func-div="decision"
          :identifer-num="identiferNum"
        />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
// import { getList, deleteDecision } from '@/api/mgt/decision.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
import { niceScroll } from '@/mixins/nice-scroll.js'

export default {
  name: 'MasterList',
  components: {
    UserSelect
  },
  mixins: [search, names, permission, niceScroll],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      decisionList: [],
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
          masterDataType: '',
          assignedUser: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    companyOrgId: function() {
      return this.$store.getters.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.searchParam.params.assignedOrg = this.userInfo.orgSeqNo.split(
        '.'
      )[1]
      // const res = await getList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.decisionList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.decisionList.push({
        id: '1',
        identiferNum: 'DEC20120001',
        masterType: '客户申请',
        assignedUser: '李丽'
      })
      this.decisionList.push({
        id: '2',
        identiferNum: 'DEC20120002',
        masterType: '供应商申请',
        assignedUser: '李丽'
      })

      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/mgt/master/edit')
    },
    handleEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({
            path: '/mgt/decision/edit',
            query: { id: rowData.id }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
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
      })
        .then(() => {
          rowData.submitType = 'submit'
          // deleteDecision([rowData]).then(() => {
          //   this.search()
          // })
        })
        .catch(() => {
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
        })
          .then(() => {
            // deleteDecision(this.multipleSelection).then(() => {
            //   this.search()
            // })
          })
          .catch(() => {
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
