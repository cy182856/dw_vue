<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('pay.transfer.applyDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.applyDate" size="small" type="date" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('pay.transfer.adjustType') }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.adjustType" clearable>
                  <el-option key="1" value="1" label="转入" />
                  <el-option key="2" value="2" label="转出" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('pay.transfer.monitorNo') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.monitorNo" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="applyUserName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('pay.transfer.applyUserName') }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.applyUser" :root-org-id="userInfo.orgSeqNo.split('.')[1]" />
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
            :data="transferList"
            stripe
            border
            height="100%"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="55"
            />
            <el-table-column prop="monitorNo" :label="$t('pay.transfer.monitorNo')" min-width="100" align="center">
              <template slot-scope="scope">
                <router-link :to="{path:'/pay/transfer/detail',query:{id:scope.row.id}}">
                  {{ scope.row.monitorNo }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="applyUserName" :label="$t('pay.transfer.applyUserName')" min-width="90" align="center" />
            <el-table-column prop="applyDate" :label="$t('pay.transfer.applyDate')" min-width="100" align="center" />
            <el-table-column prop="subjectNum" :label="$t('pay.transfer.subjectNum')" min-width="100" align="center" />
            <el-table-column prop="subjectName" :label="$t('pay.transfer.subjectName')" min-width="120" align="center" />
            <el-table-column prop="transferType" :label="$t('pay.transfer.transferType')" min-width="70" align="center" />
            <el-table-column prop="accountNum" :label="$t('pay.transfer.accountNum')" min-width="100" align="center" />
            <el-table-column prop="brandNum" :label="$t('pay.transfer.brandNum')" min-width="100" align="center" />
            <el-table-column :label="$t('pay.transfer.amount')" min-width="90" align="right">
              <template slot-scope="scope">
                {{ scope.row.amount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="reason" :label="$t('pay.transfer.reason')" min-width="120" align="center" />
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
        <export-fields-select func-div="transfer" file-type="xlsx" :search-param="searchParam" />
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
        <update-his :key="identiferNum" func-div="transfer" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'TransferList',
  components: { UserSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: true,
      multipleSelection: [],
      transferList: [],
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
          monitorNo: '',
          adjustType: '',
          applyUser: '',
          applyDate: ''
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
      // const res = await getList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.transferList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.transferList.push({
        id: '1',
        monitorNo: 'AV00001',
        applyUserName: '张鑫',
        applyDate: '2021-03-03',
        subjectNum: '409-10',
        subjectName: '销售折扣',
        transferType: '转入',
        accountNum: '11452728',
        brandNum: '1538204',
        amount: 67809.32,
        reason: '合同费计提'
      }, {
        id: '2',
        monitorNo: 'AV00002',
        applyUserName: '李丽',
        applyDate: '2021-03-03',
        subjectNum: '409-10',
        subjectName: '销售折扣',
        transferType: '转入',
        accountNum: '11452728',
        brandNum: '1538204',
        amount: 67809.32,
        reason: '合同费计提'
      }, {
        id: '3',
        monitorNo: 'AV00003',
        applyUserName: '李丽',
        applyDate: '2021-03-03',
        subjectNum: '330-9102',
        subjectName: '合同费预提',
        transferType: '转出',
        accountNum: '11452670',
        brandNum: '1538202',
        amount: 2132.12,
        reason: '合同费计提'
      }, {
        id: '4',
        monitorNo: 'AV00004',
        applyUserName: '李丽',
        applyDate: '2021-03-13',
        subjectNum: '330-9103',
        subjectName: '合同费预提',
        transferType: '转出',
        accountNum: '11452670',
        brandNum: '1538202',
        amount: 3211.31,
        reason: '合同费计提'
      })

      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/pay/transfer/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/pay/transfer/edit', query: { id: rowData.id, copy: true }})
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
          this.$router.push({ path: '/pay/transfer/edit', query: { id: rowData.id }})
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
        }).then(() => {
          // deletePrewithdraw(this.multipleSelection).then(() => {
          //   this.search()
          // })
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
    }

  }
}
</script>
