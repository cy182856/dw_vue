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
          <!--          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                费用类型:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.finAccountType" dict-type-id="AccountTypeView" />
              </el-col>
            </el-row>
          </el-form-item>-->
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
                <!--                <dict-select v-model="searchParam.params.verifyStatus" dict-type-id="VerifyStatus" clearable/>-->
                <el-select v-model="searchParam.params.verifyStatus" size="small" clearable placeholder="请选择">
                  <el-option
                    v-for="item in verifyStatusList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId"
                  />
                </el-select>
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
                开票状态:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.invStatus" dict-type-id="InvStatus" clearable />
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
                预定支付日为空:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.isNo" dict-type-id="IsNo" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                一级费目:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.accountTypeView" dict-type-id="AccountTypeView" clearable />
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
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                支付费用大于0:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.isNoPayAmount" dict-type-id="IsNo" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.showDeptCode" dict-type-id="ShowDeptView" clearable />
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
        <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="batchApproval()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconqinggoudanshenpi" />
          </span>
          <span class="operation-text">批量审批</span>
        </li>
        <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="batchSave()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">预定支付日批量修改</span>
        </li>
        <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="dataStorageDeptBatchSave()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">资料保管部门批量修改</span>
        </li>
        <li class="operation-item" @click="downloadFile">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">开票明细下载</span>
        </li>
        <li class="operation-item" @click="invTempDownloadFixFee">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">开票数据下载</span>
        </li>
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text">开票上传</span>
        </li>
        <!--<li class="operation-item" @click="billingDownloadFixFee">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">开票履历下载</span>
        </li>-->
        <li class="operation-item" @click="billingDownloadFixFeeShow">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">开票履历下载</span>
        </li>
        <!--<li class="operation-item" @click="isShow=true">-->
        <li class="operation-item" @click="downloadFileCsv">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">CSV下载</span>
        </li>
        <li class="operation-item" @click="downloadFixFee">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">支付明细下载</span>
        </li>
        <li class="operation-item" @click="reqPayDownload">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">付款申请下载</span>
        </li>
        <li class="operation-item" @click.stop="handleExecClick">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbaocun"
          /></span>
          <span class="operation-text">支付数据生成</span>
        </li>
        <li class="operation-item" @click.prevent="invJobDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbaocun"
          /></span>
          <span class="operation-text">支付生成履历</span>
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
              fixed
            />
            <el-table-column fixed prop="'custName'" :label="'代理商名称'" min-width="120" align="center">
              <template slot-scope="scope">
                <router-link :to="{path: '/finance/edit',query: { id: scope.row.id,finAccountType:scope.row.finAccountType,verifyStatus:scope.row.verifyStatus,requestStatus:scope.row.requestStatus,taskId:scope.row.taskId,verifyYm:scope.row.verifyYm},}">
                  {{ scope.row.custName }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :prop="'distinguish'" :label="'区分'" min-width="120" align="center" />
            <el-table-column :prop="'area1'" :label="'大区'" min-width="120" align="center" />
            <el-table-column :prop="'area2'" :label="'小区'" min-width="120" align="center" />
            <el-table-column :prop="'verifyYm'" :label="'发生年月'" min-width="120" align="center" />
            <el-table-column :prop="'finAccountType'" :label="'一级费目'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="AccountTypeView" :value="scope.row.finAccountType" />
              </template>
            </el-table-column>
            <el-table-column :prop="'actPay'" :label="'实绩支付费用'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.actPay|numFormat(2) }}
              </template>
            </el-table-column>
            <!--<el-table-column :prop="'bgtAmount'" :label="'预算费用'" min-width="120" align="right">
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
            </el-table-column>-->
            <el-table-column :prop="'submitOrg'" :label="'部门'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="Dept" :value="scope.row.submitOrg" />
              </template>
            </el-table-column>
            <el-table-column :prop="'dataStorageDept'" :label="'资料保管部门'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="DataStorageDept" :value="scope.row.dataStorageDept" />
              </template>
            </el-table-column>
            <!--            <el-table-column :prop="'nickName'" :label="'提交担当'" min-width="120" align="center" />-->
            <el-table-column :prop="'datePrePay'" :label="'预定支付日'" min-width="120" align="center" />
            <el-table-column :prop="'name'" :label="'当前处理节点'" min-width="120" align="center" />
            <el-table-column :prop="'verifyStatus'" :label="'核销状态'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="VerifyStatus" :value="scope.row.verifyStatus" />
              </template>
            </el-table-column>
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
            <el-table-column :prop="'invStatus'" :label="'开票状态'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="InvStatus" :value="scope.row.invStatus" />
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
    <upload :is-show="uploadDialog" action="/api/writeoff/finance/import" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
    <el-dialog
      class="content-dialog-box  search-light rules newedit2"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      title="CSV下载"
      :visible.sync="isShow"
      width="600"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
     <!-- <el-form ref="form" :model="csvLoad" label-width="80px">
        <el-form-item label="区分">
          <el-col :span="24">
            <el-select v-model="csvLoad.distinguish" placeholder="请选择" clearable @change="distinguishChange">
              <el-option
                v-for="item in distinguishList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="部门">
          <el-col :span="24">
            <dict-select v-model="csvLoad.submitOrg" dict-type-id="Dept" :filter2="searchParam.params.verifyYm.substr(0, 4)" :disabled="submitOrgDisabled" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定支付日">
          <el-col :span="24">
            <el-date-picker v-model="csvLoad.datePrePay" type="date" style="width: 100%;" value-format="yyyy-MM-dd" />
          </el-col>
        </el-form-item>
      </el-form>
      <div class="btn">
        <button class="cancel" @click="handleClose">
          取消
        </button>
        <button class="save" @click="handleSave">
          CSV下载
        </button>
      </div>-->
    </el-dialog>
    <el-dialog
      class="content-dialog-box  search-light rules newedit3"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      title="预定支付日批量修改"
      :visible.sync="saveShow"
      width="600"
      :before-close="toClose"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
      <el-form ref="form" :model="saveData" label-width="80px">
        <el-form-item label="预定支付日">
          <el-col :span="24">
            <el-date-picker v-model="saveData.datePrePay" type="date" style="width: 100%;" value-format="yyyy-MM-dd" />
          </el-col>
        </el-form-item>
      </el-form>
      <div class="btn">
        <button class="cancel" @click="toClose">
          取消
        </button>
        <button class="save" @click="toSave">
          确定
        </button>
      </div>
    </el-dialog>

    <el-dialog
      class="content-dialog-box  search-light rules newedit3"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      title="资料保管部门批量修改"
      :visible.sync="dataStorageDeptSaveShow"
      width="600"
      :before-close="dataStorageDeptToClose"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
      <el-form ref="form" :model="saveData" label-width="85px">
        <el-form-item label="资料保管部门">
            <el-col :span="24">
              <dict-select v-model="saveData.dataStorageDept" dict-type-id="DataStorageDept" clearable />
            </el-col>
        </el-form-item>
      </el-form>
      <div class="btn">
        <button class="cancel" @click="dataStorageDeptToClose">
          取消
        </button>
        <button class="save" @click="dataStorageDeptToSave">
          确定
        </button>
      </div>
    </el-dialog>

    <el-dialog
      class="content-dialog-box  search-light rules newedit3"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      title="开票履历下载"
      :visible.sync="billingDownloadFixFeeSelectShow"
      width="600"
      :before-close="billingDownloadFixFeeToClose"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
      <el-form ref="form" :model="saveData" label-width="85px">
        <el-form-item label="开票年月">
            <el-col :span="24">
              <el-date-picker v-model="searchParam.params.invYm" size="small" :placeholder="'请选择'" format="yyyy-MM" value-format="yyyy-MM" type="month" clearable />
            </el-col>
        </el-form-item>
      </el-form>
      <div class="btn">
        <button class="cancel" @click="billingDownloadFixFeeToClose">
          取消
        </button>
        <button class="save" @click="billingDownloadFixFeeToSelect">
          确定
        </button>
      </div>
    </el-dialog> 
    <inv-job :is-show="invJobDialog" @cancel="invJobDialog=false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getArea1AllList, getArea2AllListByArea1 } from '@/api/mrk/customer'
import { handleSave, handleApproval, getFinaceList, downloadFileCsv, downloadFixFee, reqPayDownload, reqPayDownloadSync, dataStorageDeptSave, billingDownloadFixFee, invTempDownloadFixFee } from '@/api/writeoff/finance.js'
import { downloadRPT006 } from '@/api/report/promotion'
import Upload from '@/components/UploadNew'
import { dateFormat, addMonth, getDictName } from '@/utils/util'
import { execScheduler } from '@/api/admin/scheduler-api.js'
import InvJob from '@/views/writeoff/components/InvJob'
export default {
  name: 'FinanceList',
  components: {
    Upload,
    InvJob
  },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      csvLoad: {
        distinguish: '',
        submitOrg: '',
        datePrePay: ''
      },
      saveData: {
        datePrePay: ''
      },
      distinguishList: [
        {
          name: '促销费'
        },
        {
          name: '合同返利'
        }
      ],
      checked: true,
      submitOrgDisabled: false,
      isShow: false,
      saveShow: false,
      dataStorageDeptSaveShow: false,
      billingDownloadFixFeeSelectShow: false,
      uploadDialog: false,
      accept: '.xlsx',
      otherParams: null,
      isLoading: false,
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
          date1: '',
          date2: '',
          verifyStatus: '2',
          payStatus: '',
          approveStatus: '',
          invStatus: '',
          userId: ''
        }
      },
      contextPath: process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : '',
      verifyStatusList: [
        {
          dictId: '2',
          dictName: '流程中'
        },
        {
          dictId: '3',
          dictName: '财务已接收'
        }
      ],
      payStatusList: [],
      requestStatusList: [],
      area1List: [],
      area2List: [],
      invJobDialog:false
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'csrfToken']),
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
    // console.log(this.writeoffList)
  },
  methods: {
    search() {
      if (this.isLoading === false) {
        console.log(this.$route.path, this.searchParam)
        //if (this.searchParam.params.verifyYm) {
          this.searchParam.pageNo = 1
          this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.searchParam })
          this.fetchData()
       // } 
        /*else {
          this.$message({
            type: 'error',
            message: '请选择发生年月'
          })
        }*/
      }
    },
    async loadArea1Data() {
      const res = await getArea1AllList()
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
        const res = await getArea2AllListByArea1(this.searchParam.params.area1)
        if (res && res.success) {
          this.area2List = res.datas.list
        }
      }
    },
    async distinguishChange() {
      if (this.csvLoad.distinguish === '合同返利') {
        this.csvLoad.submitOrg = 'SALE-DEPT'
        this.submitOrgDisabled = true
      } else {
        this.csvLoad.submitOrg = ''
        this.submitOrgDisabled = false
      }
    },
    async fetchData() {
      this.isLoading = true
      this.searchParam.params.userId = this.userInfo.userId
      const res = await getFinaceList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.writeoffList = results
        console.log(results, 'results')
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      // this.scroll()
      this.isLoading = false
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose() {
      this.isShow = false
    },
     downloadFileCsv() {
      downloadFileCsv(this.searchParam)
    },
    handleSave() {
      if (this.csvLoad.distinguish === '' || this.csvLoad.distinguish == null) {
        this.$message({
          type: 'warning',
          message: '区分不能为空'
        })
        return
      }
      if (this.csvLoad.submitOrg === '' || this.csvLoad.submitOrg == null) {
        this.$message({
          type: 'warning',
          message: '部门不能为空'
        })
        return
      }
      if (this.csvLoad.datePrePay === '' || this.csvLoad.datePrePay == null) {
        this.$message({
          type: 'warning',
          message: '预定支付日不能为空'
        })
        return
      }
      this.isLoading = true
      downloadFileCsv(this.csvLoad)
      this.isLoading = false
      this.csvLoad = {
        distinguish: '',
        submitOrg: '',
        datePrePay: ''
      }
      this.isShow = false
    },
    batchApproval() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
        return
      }
      let message = ''
      this.multipleSelection.forEach((rowData) => {
        if (rowData.datePrePay === '' || rowData.datePrePay == null) {
          message = rowData.custName + ' 该代理商数据的预定支付日不能为空'
          return
        }
      })
      if (message.length > 0) {
        this.$message({
          type: 'warning',
          message: this.$t(message)
        })
        return
      }
      const selectData = {
        actVerifyDtoList: []
      }
      this.$confirm('同一代理商的市场部数据会一起审批，是否继续？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        this.multipleSelection.forEach((rowData) => {
          if (rowData.verifyStatus === '2') {
            rowData.updateBy = this.userInfo.userName
            // 只有变动费和合同返利时才更新开票状态
            if (rowData.finAccountType !== '2') {
              rowData.invStatus = '0'
            }
            selectData.actVerifyDtoList.push(rowData)
          }
        })
        if (selectData.actVerifyDtoList.length > 0) {
          const res = await handleApproval(selectData)
          if (res) {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            }
            this.fetchData()
          }
        } else {
          this.$message({
            type: 'info',
            message: '选中数据不需要审批'
          })
        }
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    batchSave() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
        return
      }
      this.saveShow = true
    },
    dataStorageDeptBatchSave() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
        return
      }
      this.dataStorageDeptSaveShow = true
    },
    toClose() {
      this.saveShow = false
    },
    dataStorageDeptToClose() {
      this.dataStorageDeptSaveShow = false
    },
    toSave() {
      /* if (this.saveData.datePrePay === '' || this.saveData.datePrePay == null) {
        this.$message({
          type: 'warning',
          message: '预定支付日不能为空'
        })
        return
      }*/
      const selectData = {
        actVerifyDtoList: []
      }
      this.$confirm('是否确定修改选中数据的预定支付日？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        this.multipleSelection.forEach((rowData) => {
          rowData.updateBy = this.userInfo.userName
          rowData.datePrePay = this.saveData.datePrePay
          selectData.actVerifyDtoList.push(rowData)
        })
        const res = await handleSave(selectData)
        if (res) {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          }
          this.fetchData()
        }
        this.isLoading = false
        this.saveShow = false
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    dataStorageDeptToSave() {
      console.log(this.saveData.dataStorageDept,'9999999999999999999999')
        if (this.saveData.dataStorageDept === '' || this.saveData.dataStorageDept == null) {
        this.$message({
          type: 'warning',
          message: '资料保管部门不能为空'
        })
        return
      }
      const selectData = {
        actVerifyDtoList: []
      }
      this.$confirm('是否确定修改选中数据的资料保管部门？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        this.multipleSelection.forEach((rowData) => {
          rowData.updateBy = this.userInfo.userName
          rowData.dataStorageDept = this.saveData.dataStorageDept
          selectData.actVerifyDtoList.push(rowData)
        })
        const res = await dataStorageDeptSave(selectData)
        if (res) {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          }
          this.fetchData()
        }
        this.isLoading = false
        this.dataStorageDeptSaveShow = false
        this.saveData.dataStorageDept = ''
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
     billingDownloadFixFeeShow() {
      this.billingDownloadFixFeeSelectShow = true
    },
     billingDownloadFixFeeToClose() {
      this.billingDownloadFixFeeSelectShow = false
    },
    billingDownloadFixFeeToSelect() {
      if (this.searchParam.params.invYm === '' || this.searchParam.params.invYm == null) {
        this.$message({
          type: 'warning',
          message: '开票年月不能为空'
        })
        return
      }
      const downloadParam = {
        invYm: this.searchParam.params.invYm
      }
      billingDownloadFixFee(downloadParam)
      this.isLoading = false
      this.billingDownloadFixFeeSelectShow = false
    },
    downloadFile() {
      if (this.searchParam.params.verifyYm === '' || this.searchParam.params.verifyYm == null) {
        this.$message({
          type: 'warning',
          message: '发生年月不能为空'
        })
        return
      }
      const bookYm1 = (this.searchParam.params.verifyYm).substring(0, 4)
      const downloadParam = {
        bookYm1: bookYm1,
        bookYm2: this.searchParam.params.verifyYm,
        fileName: 'rpt006.rpx',
        custArea1: this.searchParam.params.area1,
        custArea2: this.searchParam.params.area2,
        custName: this.searchParam.params.custName,
        date1: this.searchParam.params.date1,
        date2: this.searchParam.params.date2
      }
      downloadRPT006(downloadParam)
    },
    downloadFixFee() {
      /**if (this.searchParam.params.verifyYm === '' || this.searchParam.params.verifyYm == null) {
        this.$message({
          type: 'warning',
          message: '发生年月不能为空'
        })
        return
      }*/
      if (this.searchParam.params.date1 === '' || this.searchParam.params.date1 == null) {
        this.$message({
          type: 'warning',
          message: '预定支付日FROM不能为空'
        })
        return
      }
      if (this.searchParam.params.date2 === '' || this.searchParam.params.date2 == null) {
        this.$message({
          type: 'warning',
          message: '预定支付日TO不能为空'
        })
        return
      }
      //const bookYm1 = (this.searchParam.params.verifyYm).substring(0, 4)
      const downloadParam = {
       // bookYm1: bookYm1,
        bookYm2: this.searchParam.params.verifyYm,
        fileName: 'rpt006.rpx',
        custArea1: this.searchParam.params.area1,
        custArea2: this.searchParam.params.area2,
        custName: this.searchParam.params.custName,
        date1: this.searchParam.params.date1,
        date2: this.searchParam.params.date2
      }
      downloadFixFee(downloadParam)
    },
    billingDownloadFixFee() {
      if (this.searchParam.params.verifyYm === '' || this.searchParam.params.verifyYm == null) {
        this.$message({
          type: 'warning',
          message: '发生年月不能为空'
        })
        return
      }
      const bookYm1 = (this.searchParam.params.verifyYm).substring(0, 4)
      const downloadParam = {
        bookYm1: bookYm1,
        bookYm2: this.searchParam.params.verifyYm,
        fileName: 'rpt006.rpx',
        custArea1: this.searchParam.params.area1,
        custArea2: this.searchParam.params.area2,
        custName: this.searchParam.params.custName,
        date1: this.searchParam.params.date1,
        date2: this.searchParam.params.date2
      }
      billingDownloadFixFee(downloadParam)
    },
     handleExecClick() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const schedulerInfo = {
        'jobGroupName':'ETL-开票台账生成',
        'jobName': 'estInvAccountTask',
        'className': 'com.iv.crm.etl.inv.EstInvAccountTask',
        'jobPara': {}
      }
        await execScheduler(schedulerInfo)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    invTempDownloadFixFee() {
      if (this.searchParam.params.verifyYm === '' || this.searchParam.params.verifyYm == null) {
        this.$message({
          type: 'warning',
          message: '发生年月不能为空'
        })
        return
      }
      const bookYm1 = (this.searchParam.params.verifyYm).substring(0, 4)
      const downloadParam = {
        bookYm1: bookYm1,
        bookYm2: this.searchParam.params.verifyYm,
        custArea1: this.searchParam.params.area1,
        custArea2: this.searchParam.params.area2,
        custName: this.searchParam.params.custName,
        date1: this.searchParam.params.date1,
        date2: this.searchParam.params.date2
      }
      invTempDownloadFixFee(downloadParam)
    },
    upload() {
      this.uploadDialog = true
    },
    handleUploadSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
      // console.log('操作成功！！！！！！！！')
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
.apply .newedit2 .el-dialog {
    width: 400px !important;
    height: 320px;
    min-width: 400px !important;
}
.apply .newedit3 .el-dialog {
  width: 400px !important;
  height: 200px;
  min-width: 400px !important;
}
</style>
