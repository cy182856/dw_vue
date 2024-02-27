<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("pay.pre.promoter.applyDate") }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.applyDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="identiferNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("pay.pre.promoter.identiferNum") }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="accountName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("pay.pre.promoter.applyUser") }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.applyUser" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t("comm.reset") }}</p>
          <span class="circle-larger-btn btn-default-color">
            <i class="iconfont iconrefresh" />
          </span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t("comm.query") }}</p>
          <span class="circle-larger-btn btn-light-color bluebg">
            <i class="iconfont iconsousuo" />
          </span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="handleCreate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconxinjian" />
          </span>
          <span class="operation-text">{{ $t("comm.newlyBuild") }}</span>
        </li>
        <li class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbianji" />
          </span>
          <span class="operation-text">{{ $t("comm.edit") }}</span>
        </li>
        <li class="operation-item" @click="batchDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconshanchu" />
          </span>
          <span class="operation-text">{{ $t("comm.delete") }}</span>
        </li>
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconfuzhi" />
          </span>
          <span class="operation-text">{{ $t("comm.copy") }}</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="el-icon-download" />
          </span>
          <span class="operation-text">{{ $t("comm.export") }}</span>
        </li>
        <li class="operation-item" @click="handleUpdateHisClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="el-icon-notebook-2" />
          </span>
          <span class="operation-text">{{ $t("comm.updateHis") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="withdrawList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="55" />
            <el-table-column prop="identiferNum" :label="$t('pay.pre.promoter.identiferNum')" min-width="100" align="center">
              <template slot-scope="scope">
                <router-link :to="{ path: '/pay/pre/promoter/detail', query: { id: scope.row.id }, }">
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="prewithdrawType" :label="$t('pay.pre.promoter.prewithdrawType')" min-width="110" align="center" /> -->
            <el-table-column prop="motionIdentiferNum" :label="$t('pay.pre.promoter.motionIdentiferNum')" min-width="120" align="center" />
            <el-table-column prop="subjectNum" :label="$t('pay.pre.promoter.subjectNum')" min-width="110" align="center" />
            <el-table-column prop="subjectName" :label="$t('pay.pre.promoter.subjectName')" min-width="150" align="center" show-overflow-tooltip />
            <!-- <el-table-column prop="localChainNum" :label="$t('pay.pre.promoter.localChainNum')" min-width="120" align="center" />
            <el-table-column prop="localChainName" :label="$t('pay.pre.promoter.localChainName')" min-width="150" align="center" show-overflow-tooltip /> -->
            <el-table-column prop="salesOfficeNum" :label="$t('pay.pre.promoter.salesOfficeNum')" min-width="120" align="center" />
            <el-table-column prop="subBrandNum" :label="$t('pay.pre.promoter.subBrandNum')" min-width="120" align="center" />
            <el-table-column prop="subBrandName" :label="$t('pay.pre.promoter.subBrandName')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="prewithdrawUses" :label="$t('pay.pre.promoter.prewithdrawUses')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column :label="$t('pay.pre.promoter.prewithdrawAmount')" min-width="110" align="right">
              <template slot-scope="scope">
                {{ scope.row.prewithdrawAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.promoter.clearedAmount')" min-width="110" align="right">
              <template slot-scope="scope">
                {{ scope.row.clearedAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.promoter.diffAmount')" min-width="110" align="right">
              <template slot-scope="scope">
                {{ scope.row.diffAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="planUseDate" :label="$t('pay.pre.promoter.planUseDate')" min-width="110" align="center" />
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
        <el-pagination class="page-right page-first" layout="slot">
          <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
        </el-pagination>
      </div>
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
        <export-fields-select func-div="withholding" file-type="xlsx" :search-param="searchParam" />
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
        <span slot="title" style="font-size: 20px">{{ $t("comm.updateHis") }}</span>
        <update-his :key="identiferNum" func-div="withholding" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
// import { getList, deleteAccount } from '@/api/mrk/account.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'PromoterList',
  components: { UserSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: true,
      multipleSelection: [],
      withdrawList: [],
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
          accountNum: '',
          applyDate: ''
        }
      },
      prewithdrawType: [
        { value: '1', label: '合同费预提' },
        { value: '2', label: '活动费预提' }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // const res = await getList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.withdrawList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.withdrawList.push({
        id: '1',
        identiferNum: 'AV0001',
        prewithdrawType: '合同费预提',
        motionIdentiferNum: 'CON20120001',
        subjectNum: '820-020051',
        subjectName: '特别堆头陈列费',
        localChainNum: 'R01',
        localChainName: '家乐福',
        salesOfficeNum: 'AV01',
        subBrandNum: '151805',
        subBrandName: '乐而雅零触感',
        prewithdrawUses: '202009-CD计提',
        prewithdrawAmount: '3459.43',
        planUseDate: '2021-03-03',
        clearedAmount: 1000,
        diffAmount: 2459.43
      })
      this.withdrawList.push({
        id: '2',
        identiferNum: 'AV0002',
        prewithdrawType: '活动费预提',
        motionIdentiferNum: 'CON20120002',
        subjectNum: '820-020051',
        subjectName: '特别堆头陈列费',
        localChainNum: 'R01',
        localChainName: '家乐福',
        salesOfficeNum: 'AV01',
        subBrandNum: '151805',
        subBrandName: '乐而雅零触感',
        prewithdrawUses: '202009-CD计提',
        prewithdrawAmount: '432.43',
        planUseDate: '2021-04-03',
        clearedAmount: 200,
        diffAmount: 232.43
      })
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/pay/pre/promoter/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({
            path: '/pay/pre/promoter/edit',
            query: { id: rowData.id, copy: true }
          })
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
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({
            path: '/pay/pre/promoter/edit',
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
        })
          .then(() => {
            // deletePrewithdraw(this.multipleSelection).then(() => {
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
          message: this.$t('comm.msg3')
        })
      }
    }
  }
}
</script>
