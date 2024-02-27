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
                {{ $t('pay.pay.advert.payIdentiferNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('pay.pay.advert.applyUserNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.applyUserNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('pay.pay.advert.applyDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.applyDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="bizCompanyNature">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                XXXX:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.bizCompanyNature" dict-type-id="BizCompanyNature" size="small" class="input" clearable />
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
            :data="paymentList"
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
            <el-table-column prop="monitorNo" :label="$t('pay.pay.advert.monitorNo')" min-width="120" align="center">
              <template slot-scope="scope">
                <router-link :to="{path:'/pay/pay/advert/detail',query:{id:scope.row.id}}">
                  {{ scope.row.monitorNo }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="preIdentiferNum" :label="$t('pay.pay.advert.preIdentiferNum')" min-width="150" align="center" />
            <el-table-column prop="subjectNum" :label="$t('pay.pay.advert.motionIdentiferNum')" min-width="150" align="center" />
            <el-table-column prop="subjectName" :label="$t('pay.pay.advert.subjectNum')" align="center" min-width="150" show-overflow-tooltip />
            <el-table-column prop="subjectName" :label="$t('pay.pay.advert.subjectName')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="subBrandNum" :label="$t('pay.pay.advert.subBrandNum')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="subBrandName" :label="$t('pay.pay.advert.subBrandName')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="cg5Num" :label="$t('pay.pay.advert.cg5Num')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="expenseSideNum" :label="$t('pay.pay.advert.expenseSideNum')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="expenseSideName" :label="$t('pay.pay.advert.expenseSideName')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="costCenterNum" :label="$t('pay.pay.advert.costCenterNum')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column :label="$t('pay.pay.advert.amount')" min-width="110" align="right">
              <template slot-scope="scope">
                {{ scope.row.amount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pay.advert.clearedAmount')" min-width="110" align="right">
              <template slot-scope="scope">
                {{ scope.row.clearedAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pay.advert.diffAmount')" min-width="110" align="right">
              <template slot-scope="scope">
                {{ scope.row.diffAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="clearingDate" :label="$t('pay.pay.advert.clearingDate')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="financialCompleDate" :label="$t('pay.pay.advert.financialCompleDate')" min-width="150" align="center" show-overflow-tooltip />
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
        <export-fields-select func-div="account" file-type="xlsx" :search-param="searchParam" />
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
        <update-his :key="identiferNum" func-div="account" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
// import { getList, deleteAccount } from '@/api/pay/pay.js'
import { names } from '@/mixins/names.js'
// import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'AdvertList',
  // components: { UserSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: true,
      multipleSelection: [],
      paymentList: [],
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
          applyUserNum: '',
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
      //   this.paymentList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.paymentList.push({
        id: '1',
        monitorNo: 'PAY20120001',
        preIdentiferNum: 'PRE20120001',
        motionIdentiferNum: 'Mot20120001',
        subjectNum: '820-020051',
        subjectName: '特别堆头陈列费',
        subBrandNum: 'Sub0000001',
        subBrandName: '拼多多',
        cg5Num: 'CG501',
        expenseSideNum: 'N000001',
        expenseSideName: '费用方1',
        costCenterNum: '成本中心编码',
        amount: '1234.5',
        clearedAmount: '1000',
        diffAmount: '234.5',
        clearingDate: '2021-03-04',
        financialCompleDate: '2021-03-04'
      })
      this.paymentList.push({
        id: '2',
        monitorNo: 'PAY20120002',
        preIdentiferNum: 'PRE20120002',
        motionIdentiferNum: 'Mot20120002',
        subjectNum: '820-020052',
        subjectName: '特别堆头陈列费',
        subBrandNum: 'Sub0000002',
        subBrandName: '一号店',
        cg5Num: 'CG502',
        expenseSideNum: 'N000002',
        expenseSideName: '费用方2',
        costCenterNum: '成本中心编码',
        amount: '22234.22',
        clearedAmount: '1234',
        diffAmount: '21000.22',
        clearingDate: '2021-03-05',
        financialCompleDate: '2021-03-05'
      })
      this.paymentList.push({
        id: '3',
        monitorNo: 'PAY20120003',
        preIdentiferNum: 'PRE20120003',
        motionIdentiferNum: 'Mot20120003',
        subjectNum: '820-020053',
        subjectName: '特别堆头陈列费',
        subBrandNum: 'Sub0000003',
        subBrandName: '京东',
        cg5Num: 'CG503',
        expenseSideNum: 'N000003',
        expenseSideName: '费用方3',
        costCenterNum: '成本中心编码',
        amount: '11134.44',
        clearedAmount: '1134.4',
        diffAmount: '10000.04',
        clearingDate: '2021-03-06',
        financialCompleDate: '2021-03-06'
      })

      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/pay/pay/advert/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/pay/pay/advert/edit', query: { id: rowData.id, copy: true }})
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
          this.$router.push({ path: '/pay/pay/advert/edit', query: { id: rowData.id }})
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
          // deletePayment(this.multipleSelection).then(() => {
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
