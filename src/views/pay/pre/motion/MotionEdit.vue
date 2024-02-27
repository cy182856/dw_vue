<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="withdraw.identiferNum" class="pagespan">{{ $t("pay.pre.motion.identiferNum") }}:    {{ withdraw.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t("comm.essentialInformation") }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.pre.motion.companyName") }}
              </div>
              <div class="input">
                <rel-func-select v-model="withdraw.companyName" :rel-func="'account'" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.pre.motion.department") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.department" readonly :disabled="true">
                  <i slot="suffix" class="iconfont icon-zuzhijiagou" @click.stop="openSelect" />
                </el-input>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.pre.motion.applyDate") }}
              </div>
              <div class="input">
                <el-date-picker v-model="withdraw.applyDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.pre.motion.applyUserName") }}
              </div>
              <div class="input">
                <user-select v-model="withdraw.applyUserName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.pre.motion.applyUserNum") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.applyUserNum" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                <el-button class="editbtn" size="mini" @click.stop="handleSetFinancialDate">
                  财务处理完成
                </el-button>
              </div>
              <div class="input">
                <el-date-picker v-model="withdraw.financialDate" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.pre.motion.baseRemark") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.baseRemark" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t("pay.pre.motion.paymentInfo") }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.pre.motion.costIncurredCompany") }}
              </div>
              <div class="input">
                <rel-func-select v-model="withdraw.costIncurredCompany" :rel-func="'account'" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.pre.motion.uses") }}
              </div>
              <div class="input">
                <el-select v-model="withdraw.uses" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in uses"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <!-- <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.motion.distributionChannel') }}
              </div>
              <div class="input">
                <el-select v-model="withdraw.distributionChannel" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in distributionChannel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div> -->
            <div class="flex3">
              <div class="title">
                {{ $t("pay.pre.motion.currency") }}
              </div>
              <div class="input">
                <dict-select v-model="withdraw.currency" dict-type-id="Currency" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.pre.motion.paymentRemark") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.paymentRemark" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{ $t("pay.pre.motion.lineDetail") }}  </span>
          <div class="add_table_row">
            <el-button class="editbtn" size="mini" @click.stop="handleDownloadTemplate">
              下载模板
            </el-button>
            <el-button class="editbtn" size="mini" @click.stop="handleUploadTemplate">
              上传数据
            </el-button>
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddDetail">
              {{ $t("comm.addLine") }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="withdraw.details"
            style="margin-bottom: 20px"
            :header-cell-style="{ 'text-align': 'center' }"
            border
            stripe
          >
            <el-table-column :label="$t('comm.operation')" align="center" width="70">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '1')" />
              </template>
            </el-table-column>
            <el-table-column label="No." width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.motionIdentiferNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.motionIdentiferNum" clearable />
                <!-- <rel-func-select v-model="scope.row.motionIdentiferNum" :rel-func="'motion'" /> -->
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.subjectNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.accountNum" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.subjectName')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.accountName" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.ph2Num')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ph2Num" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.ph2Name')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ph2Name" clearable />
              </template>
            </el-table-column>
            <!-- <el-table-column :label="$t('pay.pre.motion.localChainNum')" width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.localChainNum" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in localChain"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.localChainName')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.localChainName" clearable />
              </template>
            </el-table-column> -->
            <el-table-column :label="$t('pay.pre.motion.subBrandNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.subBrandNum" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.subBrandName')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.subBrandName" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.salesOfficeNum')" width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.salesOfficeNum" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in salesOffice"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.cg5Num')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cg5Num" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.expenseSideNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.expenseSideNum" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.expenseSideName')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.expenseSideName" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.amount')" width="170">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.amount" to-fixed-num="2" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.costCenterNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.costCenterNum" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.prewithdrawUses')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.prewithdrawUses" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.pre.motion.planUseDate')" width="170">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.planUseDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </template>
            </el-table-column>
          </el-table>
          <div class="input_box">
            <div class="flex3" />
            <div class="flex3" />
            <div class="flex3">
              <div class="title">
                总金额
              </div>
              <div class="input">
                <milli-input v-model="totalAmount" to-fixed-num="2" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{ $t("pay.pre.motion.remark") }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.pre.motion.remark") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.remark" type="textarea" rows="3" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{ $t("pay.pre.motion.attachmentFile") }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.pre.motion.attachmentInfo") }}
              </div>
              <div class="input">
                <attachement v-model="fileList" func-div="withdraw" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">{{ $t("comm.save") }}</span>
        </li>
        <!-- 提交 -->
        <li class="operation-item" @click="handleSubmit('submit')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont icontijiao" />
          </span>
          <span class="operation-text">{{ $t("comm.submit") }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconshenpi" />
          </span>
          <span class="operation-text">{{ $t("component.taskApprove.approval") }}</span>
        </li>
        <!-- 变更履历 -->
        <li v-if="id && !$route.query.copy" class="operation-item" @click="historyDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="el-icon-notebook-2" />
          </span>
          <span class="operation-text">{{ $t("comm.updateHis") }}</span>
        </li>
        <li class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">PDF下载</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">冲销</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconquxiao" />
          </span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
    <div v-if="processDialog">
      <process-detail
        :key="processInstId"
        :is-show="processDialog"
        :title="$t('component.taskApprove.detailedProcess') + processInstId"
        :process-inst-id="processInstId"
        @close="processDialog = false"
      />
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
        <update-his :key="withdraw.identiferNum" func-div="prewithdraw" :identifer-num="withdraw.identiferNum" />
      </el-drawer>
    </div>
    <div class="depSelect">
      <el-dialog
        :title="'部门选择'"
        :visible.sync="selectDepartmentDialog"
        append-to-body
        custom-class="content-dialog-userSelect"
        :close-on-click-modal="false"
        width="25%"
      >
        <user-org-tree
          tree-type="department"
          :multiple="false"
          @select="handleTreeSelect"
          @cancel="selectDepartmentDialog = false"
          @clear="handleTreeClear"
        />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserOrgTree from '@/components/UserOrgTree.vue'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'MotionEdit',
  components: { RelFuncSelect, UserOrgTree, UserSelect },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      processDialog: false,
      selectDepartmentDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      withdraw: {
        totalAmount: '',
        workflowProcessInstId: '',
        financialDate: '',
        attrs: {},
        details: []
      },
      fileList: [],
      distributionChannel: [
        { value: '渠道 01', lable: '01' },
        { value: '渠道 02', lable: '02' },
        { value: '渠道 03', lable: '03' }
      ],
      uses: [
        { value: '用途 01', lable: '01' },
        { value: '用途 02', lable: '02' },
        { value: '用途 03', lable: '03' }
      ],
      localChain: [
        { value: 'Local Chain 01', lable: '01' },
        { value: 'Local Chain 02', lable: '02' },
        { value: 'Local Chain 03', lable: '03' }
      ],
      salesOffice: [
        { value: 'Sales Office 01', lable: '01' },
        { value: 'Sales Office 02', lable: '02' },
        { value: 'Sales Office 03', lable: '03' }
      ],
      prewithdrawType: [
        { value: '1', label: '合同费预提' },
        { value: '2', label: '活动费预提' }
      ],
      relFunc: ''
    }
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    },
    totalAmount: function() {
      if (this.withdraw.details && this.withdraw.details.length > 0) {
        const sum = this.withdraw.details.map(
          (item) => (!item.amount ? 0 : parseFloat(item.amount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    }
  },
  watch: {},
  async created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.withdraw.companyName = '花王（上海）产品服务有限公司'
      this.withdraw.department = 'KA部'
      this.withdraw.applyUserName = '张三'
      this.withdraw.applyUserNum = '010001'
      this.withdraw.applyDate = new Date()
      this.withdraw.currency = 'cny'
    }
  },
  methods: {
    async fetchData() {
      this.withdraw.workflowProcessInstId = 'test'
      this.withdraw.prewithdrawType = '合同费预提'
      this.withdraw.prewithdrawName = '合同费预提申请'
      this.withdraw.relIdentiferNum = 'CON20120001'
      this.withdraw.companyName = '花王（上海）产品服务有限公司'
      this.withdraw.department = 'KA部'
      this.withdraw.applyDate = '2021-02-01'
      this.withdraw.applyUserName = '张三'
      this.withdraw.applyUserNum = '010001'
      this.withdraw.remark = '预提备注'
      this.withdraw.costIncurredCompany = '京东'
      this.withdraw.uses = '用途 01'
      this.withdraw.distributionChannel = '渠道 01'
      this.withdraw.paymentRemark = '付款信息备注'
      this.withdraw.baseRemark = '基本信息备注'
      this.withdraw.identiferNum = 'AV0001'
      this.withdraw.monitorNo = 'AV0001'
      this.withdraw.currency = 'cny'
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120001',
        accountNum: '460-300052',
        accountName: '集中配货费',
        ph2Num: 'ph201',
        ph2Name: 'PH201名称',
        localChainNum: 'Local Chain 01',
        localChainName: 'Local Chain 01名称',
        salesOfficeNum: 'Sales Office 01',
        subBrandNum: 'MED',
        subBrandName: 'MERRIES EXTRA DAY',
        cg5Num: 'CG501',
        expenseSideNum: 'N000001',
        expenseSideName: '费用方',
        amount: '234.5',
        costCenterNum: 'AV01',
        prewithdrawUses: '合同费',
        planUseDate: '2021-10-01'
      })
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120002',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'Local Chain 02',
        salesOfficeNum: 'Sales Office 02',
        subBrandNum: 'UV',
        subBrandName: 'Biro UV',
        amount: '234',
        planUseDate: '2021-10-01'
      })
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120003',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'Local Chain 03',
        salesOfficeNum: 'Sales Office 03',
        subBrandNum: 'MED',
        subBrandName: 'MERRIES EXTRA DAY',
        amount: '120.51',
        planUseDate: '2021-10-01'
      })
      this.isLoading = false
    },
    handleSubmit(submitType) {
      // for (const ref in this.$refs) {
      //   if (this.$refs[ref] && this.$refs[ref].length > 0) {
      //     const obj = this.$refs[ref][0]
      //     // 页面嵌套vue组件调用验证方法
      //     if (obj.hasOwnProperty('validatorAll')) {
      //       this.$refs[ref][0].validatorAll()
      //       if (!this.$refs[ref][0].validatorState) return false
      //     } else {
      //       // 本页面调用验证方法
      //       if (!this.validator(ref)) return false
      //     }
      //   }
      // }
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleAddDetail() {
      this.withdraw.details.push({
        motionIdentiferNum: '',
        accountNum: '',
        accountName: '',
        localChainNum: '',
        salesOfficeNum: '',
        subBrandNum: '',
        subBrandName: '',
        amount: '',
        planUseDate: ''
      })
    },
    handleDeleteDetail(index) {
      this.withdraw.details.splice(index, 1)
    },
    handleTreeSelect(data) {
      // this[this.activeInput].name = data.text
      // this[this.activeInput].id = data.id
      this.withdraw.department = data.text
      this.selectDepartmentDialog = false
    },
    handleTreeClear() {
      // this[this.activeInput].name = ''
      // this[this.activeInput].id = ''
      this.withdraw.department = ''
      this.selectDepartmentDialog = false
    },
    openSelect() {
      // this.activeInput = activeInput
      // this.selectData = this[this.activeInput]
      this.selectDepartmentDialog = true
    },
    handleTypeChange(newValue) {
      this.relFunc = ''
      this.withdraw.relIdentiferNum = ''
      if (newValue === '1') {
        this.relFunc = 'contract'
      } else if (newValue === '2') {
        this.relFunc = 'motion'
      }
    },
    handleUploadTemplate() {
      this.withdraw.details = []
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120001',
        accountNum: '460-300052',
        accountName: '集中配货费',
        ph2Num: 'ph201',
        ph2Name: 'PH201名称',
        localChainNum: 'Local Chain 01',
        localChainName: 'Local Chain 01名称',
        salesOfficeNum: 'Sales Office 01',
        subBrandNum: 'MED',
        subBrandName: 'MERRIES EXTRA DAY',
        cg5Num: 'CG501',
        expenseSideNum: 'N000001',
        expenseSideName: '费用方',
        amount: '234.5',
        costCenterNum: 'AV01',
        prewithdrawUses: '合同费',
        planUseDate: '2021-10-01'
      })
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120002',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'Local Chain 02',
        salesOfficeNum: 'Sales Office 02',
        subBrandNum: 'UV',
        subBrandName: 'Biro UV',
        amount: '234',
        planUseDate: '2021-10-01'
      })
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120003',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'Local Chain 03',
        salesOfficeNum: 'Sales Office 03',
        subBrandNum: 'MED',
        subBrandName: 'MERRIES EXTRA DAY',
        amount: '120.51',
        planUseDate: '2021-10-01'
      })
    },
    handleDownloadTemplate() {},
    handleSetFinancialDate() {
      this.withdraw.financialDate = new Date()
    }
  }
}
</script>
