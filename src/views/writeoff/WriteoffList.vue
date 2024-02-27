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
                代理商名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                发生年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.verifyYm" size="small" :placeholder="'请选择'" format="yyyy-MM" value-format="yyyy-MM" type="month" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                一级费目:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.finAccountType" dict-type-id="AccountTypeView" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                预定支付日FROM:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.date1" value-format="yyyy-MM-dd" size="small" :placeholder="'请选择'" type="date" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                预定支付日TO:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.date2" value-format="yyyy-MM-dd" size="small" :placeholder="'请选择'" type="date" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                核销状态:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.verifyStatus" dict-type-id="VerifyStatus" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                支付状态:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.payStatus" dict-type-id="PayStatus" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                请款书状态:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.requestStatus" dict-type-id="RequestStatus" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                资料保管部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.dataStorageDept" dict-type-id="DataStorageDept" clearable />
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
        <!-- <li class="operation-item" @click="strategyEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">编辑</span>
        </li> -->
        <li class="operation-item" @click="batchSubmit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbaocun"
          /></span>
          <span class="operation-text">批量提交</span>
        </li>
        <li class="operation-item" @click="send">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-top"
          /></span>
          <span class="operation-text">请款书发送</span>
        </li>
        <li class="operation-item" @click="comeBack">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-bottom"
          /></span>
          <span class="operation-text">请款书回传</span>
        </li>
        <li class="operation-item" @click="csvDownload">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">CSV下载</span>
        </li>
        <li v-if="userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY')" class="operation-item" @click="csvDownloadDept">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">CSV下载(部门别)</span>
        </li>
        <!-- <li class="speciallist">
          <el-checkbox v-model="checked">
            纸品和非纸品分别提交
          </el-checkbox>
        </li> -->
        <li class="operation-item" @click="reqPayDownload">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">付款申请下载</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="writeoffList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column
              label="提示警告"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-popover
                  v-if="scope.row.errorMsg"
                  placement="top-start"
                  trigger="hover"
                >
                  <p v-for="(warning,index3) in getWarningArr(scope.row.errorMsg)" :key="index3" style="line-height:22px;margin-bottom:5px;">
                    {{ warning }}
                  </p>
                  <div slot="reference">
                    <span class="el-icon-warning" style="font-size:20px;color:orange;" />
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column :prop="'custName'" :label="'代理商名称'" width="150" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <router-link :to="{path: '/writeoff/edit',query: { id: scope.row.id,finAccountType:scope.row.finAccountType,verifyStatus:scope.row.verifyStatus,requestStatus:scope.row.requestStatus,taskId:scope.row.taskId,verifyYm:scope.row.verifyYm},}">
                  {{ scope.row.custName }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :prop="'area1'" :label="'大区'" min-width="120" align="center" />
            <el-table-column :prop="'area2'" :label="'小区'" min-width="120" align="center" />
            <el-table-column :prop="'verifyYm'" :label="'发生年月'" min-width="120" align="center" />
            <el-table-column :prop="'finAccountType'" :label="'一级费目'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="AccountTypeView" :value="scope.row.finAccountType" />
              </template>
            </el-table-column>
            <el-table-column :prop="'bgtAmount'" :label="'预算费用'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.bgtAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'estAmount'" :label="'预估费用'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.estAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'exactAmount'" :label="'精准预估费用'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.exactAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'actPromotion'" :label="'实绩促销费用'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.actPromotion|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'actPay'" :label="'实绩支付费用'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.actPay|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'submitOrg'" :label="'部门'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="ShowDept" :value="scope.row.submitOrg" />
              </template>
            </el-table-column>
            <el-table-column :prop="'nickName'" :label="'提交担当'" min-width="120" align="center" />
            <el-table-column :prop="'datePrePay'" :label="'预定支付日'" min-width="120" align="center" />
            <el-table-column :prop="'verifyStatus'" :label="'核销状态'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="VerifyStatus" :value="scope.row.verifyStatus" />
              </template>
            </el-table-column>
            <el-table-column :prop="'name'" :label="'当前处理节点'" min-width="120" align="center" />
            <el-table-column :prop="'requestStatus'" :label="'请款书状态'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="RequestStatus" :value="scope.row.requestStatus" />
              </template>
            </el-table-column>
            <el-table-column :prop="'payStatus'" :label="'支付状态'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="PayStatus" :value="scope.row.payStatus" />
              </template>
            </el-table-column>
             <el-table-column :prop="'dataStorageDept'" :label="'资料保管部门'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="DataStorageDept" :value="scope.row.dataStorageDept" />
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList, batchSubmit, send, comeBack, csvDownload, csvDownloadDept, reqPayDownload, reqPayDownloadSync } from '@/api/writeoff/apply.js'
import { getArea1List, getArea2ListByArea1 } from '@/api/mrk/customer'
import { dateFormat, addMonth, getDictName } from '@/utils/util'
export default {
  name: 'WriteoffList',
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      checked: true,
      isLoading: false,
      dialogFormVisible: false,
      finAccountTypeList: [],
      multipleSelection: [],
      writeoffList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          area1: '',
          area2: '',
          custName: '',
          verifyYm: '',
          finAccountType: '',
          date1: '',
          date2: '',
          verifyStatus: '',
          payStatus: '',
          submitOrg: ''
        }
      },
      verifyStatusList: [],
      payStatusList: [],
      requestStatusList: [],
      area1List: [],
      area2List: []
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    const day = new Date().getDate()
    if (day <= 15) {
      this.searchParam.params.verifyYm = addMonth(dateFormat(new Date(), 'yyyy-MM'), -2)
    } else {
      this.searchParam.params.verifyYm = addMonth(dateFormat(new Date(), 'yyyy-MM'), -1)
    }
    // this.loadArea1Data()
    this.fetchData()
    this.$store.dispatch('getDicts', 'PayDownloadEnclosureNum')
  },
  methods: {
    async loadArea1Data() {
      const res = await getArea1List()
      if (res && res.success) {
        this.area1List = res.datas.list
      }
    },
    async loadArea2List() {
      if (this.searchParam.params.area1 === '') {
        this.searchParam.params.area2 = ''
        this.area2List = []
      } else {
        this.searchParam.params.area2 = ''
        const res = await getArea2ListByArea1(this.searchParam.params.area1)
        if (res && res.success) {
          this.area2List = res.datas.list
        }
      }
    },
    async fetchData() {
      if (!this.searchParam.params.verifyYm) {
        this.$message({
          type: 'error',
          message: '查询条件中，发生年月不能为空！'
        })
        return false
      }
      this.isLoading = true
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.writeoffList = results
        // console.log(results, 'results')
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      // this.scroll()
      this.isLoading = false
    },
    async batchSubmit() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
        return
      }
      this.$confirm('是否确定批量提交核销单？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const reqList = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          // 只有待核销和已驳回的才可以提交
          if (this.multipleSelection[i].verifyStatus === '0' || this.multipleSelection[i].verifyStatus === '1') {
            this.multipleSelection[i].updateBy = this.userInfo.userName
            this.multipleSelection[i].submitUser = this.userInfo.userId
            this.multipleSelection[i].verifyStatus = '2'
            reqList.push(this.multipleSelection[i])
          }
        }
        if (reqList.length === 0) {
          this.$message({
            type: 'warning',
            message: '选中数据不需要提交更新!'
          })
          return
        } else {
          this.isLoading = true
          const params = new FormData()
          params.append('jsonList', JSON.stringify(reqList))
          const res = await batchSubmit(params)
          if (res) {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.fetchData()
            }
          }
          this.isLoading = false
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    async send() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
        return
      }
      this.$confirm(' 是否确定发送请款书？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const reqList = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          // 只有未发送和已发送的才可以发送
          if (!(this.multipleSelection[i].requestStatus === '02')) {
            this.multipleSelection[i].updateBy = this.userInfo.userName
            this.multipleSelection[i].requestStatus = '01'
            reqList.push(this.multipleSelection[i])
          }
        }
        if (reqList.length === 0) {
          this.$message({
            type: 'warning',
            message: '选中数据不需要发送请款书!'
          })
          return
        } else {
          this.isLoading = true
          const params = new FormData()
          params.append('jsonList', JSON.stringify(reqList))
          const res = await send(params)
          if (res) {
            if (res.success) {
              this.$message({
                type: 'success',
                // 处理成功
                message: this.$t('comm.msg44')
              })
              this.fetchData()
            }
          }
          this.isLoading = false
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    async comeBack() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
        return
      }
      this.$confirm('是否确定回传请款书？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const reqList = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          // 只有已发送的才可以回传
          if (this.multipleSelection[i].requestStatus === '01') {
            this.multipleSelection[i].updateBy = this.userInfo.userName
            this.multipleSelection[i].requestStatus = '02'
            reqList.push(this.multipleSelection[i])
          }
        }
        if (reqList.length === 0) {
          this.$message({
            type: 'warning',
            message: '选中数据不需要回传请款书!'
          })
          return
        } else {
          this.isLoading = true
          const params = new FormData()
          params.append('jsonList', JSON.stringify(reqList))
          const res = await comeBack(params)
          if (res) {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.fetchData()
            }
          }
          this.isLoading = false
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    csvDownload() {
      csvDownload(this.searchParam)
    },
     csvDownloadDept() {
      csvDownloadDept(this.searchParam)
    },
    async reqPayDownload() {
      const enclosureNum = getDictName('PayDownloadEnclosureNum', 'EnclosureNum')
      console.log(enclosureNum, '付款申请附件下载数量限制')
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
        return
      }
      this.$confirm(' 是否确定下载付款申请书？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const reqList = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          reqList.push(this.multipleSelection[i])
        }
        if (reqList.length === 0) {
          this.$message({
            type: 'warning',
            message: '选中数据不需要发送付款申请书!'
          })
          return
        }
        if (this.multipleSelection.length <= enclosureNum) {
          const params = new FormData()
          params.append('jsonList', JSON.stringify(reqList))
          reqPayDownloadSync(params)
        } else {
          this.isLoading = true
          const params = new FormData()
          params.append('jsonList', JSON.stringify(reqList))
          const res = await reqPayDownload(params)
          if (res) {
            if (res.success) {
              this.$message({
                type: 'success',
                // 处理成功
                message: this.$t('comm.msg44')
              })
              this.fetchData()
            }
          }
          this.isLoading = false
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    strategyEdit() {
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
            path: '/writeoff/edit',
            query: { id: rowData.id }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
      // this.$router.push('/promotion/strategytwo/detail')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
.speciallist{
  flex: 1;
  text-align: right;
  margin-right: 50px;
  font-size: 16px;
}
</style>
