<template>
  <!-- 编辑画面 -->
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        查询条件
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custName" placeholder="请输入名称" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                发生年月:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.ym" size="small" type="month" value-format="yyyy-MM" :clearable="false" :picker-options="pickerOptions3" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                预定支付日FROM:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.datePrePayFrom" size="small" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions0" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                预定支付日TO:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.datePrePayTo" size="small" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions1" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                审批状态:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.approveStatus" dict-type-id="FinanceApproveStatus" clearable />
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
          <p>重置</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>查询</p>
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
        <li class="operation-item" @click="submit()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont icontijiao"
          /></span>
          <span class="operation-text">提交</span>
        </li>
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text">上传</span>
        </li>
        <li class="operation-item" @click="downloadFile()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i
              class="el-icon-download"
            /></span>
          <span class="operation-text">下载</span>
        </li>
        <!--<li class="operation-item" @click="send">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-top"
          /></span>
          <span class="operation-text">请款书发送</span>
        </li>-->
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
            :data="assignList"
            border
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
              :selectable="selectInit"
            />
            <el-table-column prop="verificationCode" label="核销单编码" align="center" min-width="100">
              <template slot-scope="scope">
                <router-link :to="{path:'/rebateData/writeOffPayEdit',query:{ym:scope.row.ym,custCode:scope.row.custCode,contractCost:String(scope.row.contractCostVariance!==null?scope.row.contractCostVariance:'')}}">
                  {{ scope.row.verificationCode }}
                </router-link>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="attributes" label="代理商属性" align="center" /> -->
            <el-table-column prop="custName" label="代理商名称" min-width="120" align="left" />
            <el-table-column prop="ym" label="发生年月" align="center" />
            <el-table-column prop="budget" label="预算费用" align="right" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.budget |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="estimate" label="预估费用" align="right" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.estimate |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="accurateEst" label="精准预估费用" align="right" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.accurateEst |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="perfomance" label="实绩核销费用" align="right" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.rebateAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="contractCostVariance" label="合同费差异" align="right" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.contractCostVariance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="salesRelList" label="销售担当" align="center" width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.salesRelList.toString() }}
              </template>
            </el-table-column>
            <el-table-column prop="datePreRebate" label="预定支付日" align="center" min-width="100" />
            <el-table-column prop="verificationStatus" label="核销状态" align="center">
              <template slot-scope="scope">
                {{ scope.row.verificationStatus |dictName('VerifyStatus') }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="当前处理节点" align="center" min-width="100" />
            <el-table-column prop="requestStatus" label="请款书状态" align="center" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.requestStatus |dictName('RequestStatus') }}
              </template>
            </el-table-column>
            <el-table-column prop="payStatus" label="支付状态" align="center">
              <template slot-scope="scope">
                {{ scope.row.payStatus |dictName('PayStatus') }}
              </template>
            </el-table-column>
            <el-table-column prop="pataStorageDept" label="资料保管部门" align="center" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.dataStorageDept |dictName('DataStorageDept') }}
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
    <upload :is-show="uploadDialog" action="/api/rebatebook/uploadTempFile" :other-params="otherParams" :accept="accept" :two="true" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>

<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList, batchSubmit, downloadTempFile, downloadFile, send, reqPayDownload, reqPayDownloadSync } from '@/api/rebaterules/writeoff.js'
import { dateFormat, addMonth, getDictName } from '@/utils/util'
import Upload from '@/components/UploadNew'
export default {
  components: {
    Upload
  },
  mixins: [numFormat, search, names, formValidator],
  data() {
    return {
      isLoading: false,
      isShow: false,
      year: '2021',
      multipleSelection: [],
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          custName: '',
          ym: '',
          datePrePayFrom: '',
          datePrePayTo: ''
        }
      },
      submitData: [],
      assignList: [],
      uploadDialog: false, // 上传文件dialog显示标志位
      uploadSalesDialog: false, // 上传文件dialog显示标志位
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.searchParam.params.datePrePayTo !== '') {
            return time.getTime() > new Date(this.searchParam.params.datePrePayTo).getTime() || time.getTime() < new Date('2021').getTime() - 1 * 24 * 60 * 60 * 1000
          }
          return time.getTime() < new Date('2021').getTime() - 1 * 24 * 60 * 60 * 1000
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.searchParam.params.datePrePayFrom).getTime() - 1 * 24 * 60 * 60 * 1000 || time.getTime() < new Date('2021').getTime() - 1 * 24 * 60 * 60 * 1000
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  created() {
    const day = new Date().getDate()
    if (day <= 15) {
      this.searchParam.params.ym = addMonth(dateFormat(new Date(), 'yyyy-MM'), -2)
    } else {
      this.searchParam.params.ym = addMonth(dateFormat(new Date(), 'yyyy-MM'), -1)
    }
    this.fetchData()
    this.$store.dispatch('getDicts', 'PayDownloadEnclosureNum')
  },
  methods: {
    doHandleMonth() {
      var myDate = new Date()
      var tMonth = myDate.getMonth()

      var m = tMonth - 1
      if (m.toString().length === 1) {
        m = '0' + m
      }
      return m
    },
    async fetchData() {
      this.isLoading = true
      console.log('1a2b')
      this.searchList()
    },
    async searchList() {
      if (!this.searchParam.params.ym) {
        this.$message({
          type: 'error',
          message: '查询条件中，年月不能为空！'
        })
        return false
      }
      const res = await getList(this.searchParam)
      if (res && res.success) {
        // console.log(res)
        const results = res.datas.searchResult.results
        const totalRecord = res.datas.searchResult.totalRecord
        this.searchParam.totalRecord = totalRecord
        this.assignList = results
        this.isLoading = false
      }
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
          const req = { ...this.multipleSelection[i] }
          req.submitOrg = this.multipleSelection[i].showDeptCode
          reqList.push(req)
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
    submit() {
      if (this.submitData.length === 0) {
        this.$message({
          message: '请选择一条数据',
          type: 'info'
        })
        return false
      }
      this.$confirm('确认提交', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const reqList = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          // 只有待核销和已驳回的才可以提交
          if (this.multipleSelection[i].verificationStatus === '0' || this.multipleSelection[i].verificationStatus === '1') {
            this.multipleSelection[i].updateBy = this.userInfo.userName
            this.multipleSelection[i].submitUser = this.userInfo.userId
            this.multipleSelection[i].verificationStatus = '2'
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
          const params = this.submitData
          const res = await batchSubmit(params)
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.fetchData()
          }
        }
        this.isLoading = false
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
    handleSelectionChange(val) {
      console.log(val)
      this.submitData = val
      this.multipleSelection = val
    },
    selectInit(row, index) {
      if (row.verificationStatus === '0' || row.verificationStatus === '1') {
        return true
      } else {
        return true
      }
    },
    async downloadTempFile() {
      this.isLoading = true
      await downloadTempFile()
      this.isLoading = false
    },
    downloadFile() {
      downloadFile(this.searchParam)
    }

  }
}
</script>
