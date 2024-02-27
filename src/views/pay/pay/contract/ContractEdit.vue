<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="payment.identiferNum" class="pagespan">支付编号: {{ payment.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                支付类型
              </div>
              <div class="input">
                <el-select v-model="payment.paymentType" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in paymentType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                供应商编号
              </div>
              <div class="input">
                <rel-func-select v-model="payment.supplierIdentiferNum" rel-func="supplier" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                供应商名称
              </div>
              <div class="input">
                <el-input v-model="payment.supplierName" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                公司
              </div>
              <div class="input">
                <rel-func-select v-model="payment.accountNum" rel-func="account" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                申请担当部门
              </div>
              <div class="input">
                <el-input v-model="payment.department" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                申请日期
              </div>
              <div class="input">
                <el-date-picker v-model="payment.applyDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                申请担当
              </div>
              <div class="input">
                <user-select v-model="payment.applyUserName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                申请担当工号
              </div>
              <div class="input">
                <el-input v-model="payment.applyUserNum" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="payment.baseRemark" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">付款信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                费用发生公司
              </div>
              <div class="input">
                <rel-func-select v-model="payment.costIncurredCompany" rel-func="account" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用方编号
              </div>
              <div class="input">
                <!-- <rel-func-select v-model="payment.expenseAccountNum" rel-func="account" /> -->
                <el-select v-model="payment.expenseAccountNum" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in expenseAccountNum"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用方名称
              </div>
              <div class="input">
                <el-input v-model="payment.expenseAccountName" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                用途
              </div>
              <div class="input">
                <!-- <el-input v-model="payment.uses" /> -->
                <el-select v-model="payment.uses" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in uses"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                支付方式
              </div>
              <div class="input">
                <!-- <el-input v-model="payment.paymentMethod" /> -->
                <el-select v-model="payment.paymentMethod" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in paymentMethod"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                附件添付情况
              </div>
              <div class="input">
                <el-select v-model="payment.attachmentAddStatus" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in attachmentAddStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="payment.payRemark" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">行明细
          </span>
          <div v-if="payment.attachmentAddStatus==='有发票'" class="add_table_row">
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleInvoiceUpload">
              上传发票
            </el-button>
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddInvoice">
              增加发票
            </el-button>
          </div>
          <el-table
            v-if="payment.attachmentAddStatus==='有发票'"
            ref="table"
            :data="payment.invoiceDetails"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column
              :label="$t('comm.operation')"
              align="center"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '1')" />
              </template>
            </el-table-column>
            <el-table-column label="No." min-width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="发票类型" min-width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.invoiceType" clearable />
              </template>
            </el-table-column>
            <el-table-column label="发票号码" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.invoiceNum" clearable />
              </template>
            </el-table-column>
            <el-table-column label="不含税金额" min-width="180">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.excludingTaxAmount" to-fixed-num="2" clearable />
              </template>
            </el-table-column>
            <el-table-column label="税率" min-width="120">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.taxRate" to-fixed-num="2" append="%" clearable />
              </template>
            </el-table-column>
            <el-table-column label="税额" min-width="178">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.taxAmount" to-fixed-num="2" clearable />
              </template>
            </el-table-column>
            <el-table-column label="发票总金额" min-width="180">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.totalAmount" to-fixed-num="2" clearable />
              </template>
            </el-table-column>
          </el-table>
          <div class="add_table_row">
            <el-button class="editbtn" size="mini" @click.stop="handleAddDetail">
              新增
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="payment.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column
              :label="$t('comm.operation')"
              align="center"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '2')" />
              </template>
            </el-table-column>
            <el-table-column label="No." min-width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="合同编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.contractIdentiferNum" clearable />
              </template>
            </el-table-column>
            <el-table-column label="科目编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.accountNum" clearable />
              </template>
            </el-table-column>
            <el-table-column label="科目名称" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.accountName" clearable />
              </template>
            </el-table-column>
            <el-table-column label="支付金额" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.paymentAmount" clearable />
              </template>
            </el-table-column>
            <el-table-column label="预提编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.withdrawIdentiferNum" clearable />
              </template>
            </el-table-column>
            <el-table-column label="Localchain编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.localchainNum" clearable />
              </template>
            </el-table-column>
            <el-table-column label="Salesoffice编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.salesofficeNum" clearable />
              </template>
            </el-table-column>
            <el-table-column label="预提用途" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.uses" clearable />
              </template>
            </el-table-column>
            <el-table-column label="返利年度" min-width="170">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.rebateYear" size="small" type="year" value-format="yyyy" clearable />
              </template>
            </el-table-column>
            <el-table-column label="返利月份" min-width="170">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.rebateMonth" size="small" type="month" value-format="yyyy-MM" clearable />
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">备注</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="payment.remark" type="textarea" rows="3" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">附件</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                附件信息
              </div>
              <div class="input">
                <attachement v-model="fileList" func-div="payment" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
        </li>
        <!-- 提交 -->
        <li class="operation-item" @click="handleSubmit('submit')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontijiao" /></span>
          <span class="operation-text">{{ $t('comm.submit') }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <!-- 变更履历 -->
        <li v-if="id && !$route.query.copy" class="operation-item" @click="historyDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div v-if="processDialog">
      <process-detail :key="processInstId" :is-show="processDialog" :title="$t('component.taskApprove.detailedProcess') + processInstId" :process-inst-id="processInstId" @close="processDialog=false" />
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
        <update-his :key="payment.identiferNum" func-div="payment" :identifer-num="payment.identiferNum" />
      </el-drawer>
    </div>
    <!-- <div class="depSelect">
      <el-dialog
        :title="'部门选择'"
        :visible.sync="selectDepartmentDialog"
        append-to-body
        custom-class="content-dialog-userSelect"
        min-width="25%"
      >
        <user-org-tree
          tree-type="department"
          :multiple="false"
          @select="handleTreeSelect"
          @cancel="selectDepartmentDialog=false"
          @clear="handleTreeClear"
        />
      </el-dialog>
    </div> -->
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'ContractEdit',
  components: { UserSelect, RelFuncSelect },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      selectDepartmentDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      payment: {
        workflowProcessInstId: '',
        expenseAccountNum: '',
        uses: '',
        paymentMethod: '',
        attachmentAddStatus: '',
        attrs: {
        },
        details: [],
        invoiceDetails: []
      },
      fileList: [],
      processDialog: false,
      paymentType: [{ value: '合同费支付', lable: '01' }, { value: '活动费支付', lable: '02' }],
      paymentMethod: [{ value: '银行转账', lable: '01' }, { value: '支付宝', lable: '02' }],
      attachmentAddStatus: [{ value: '有发票', lable: '01' }, { value: '无发票', lable: '02' }],
      expenseAccountNum: [{ value: '066901', lable: '01' }, { value: '066902', lable: '02' }],
      uses: [{ value: '用途 01', lable: '01' }, { value: '用途 02', lable: '02' }, { value: '用途 03', lable: '03' }]
    }
  },
  computed: {
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    }
  },
  watch: {
    'payment.expenseAccountNum': {
      async handler(newValue, oldValue) {
        if (!newValue) {
          this.payment.expenseAccountName = ''
        } else if (newValue === '066901') {
          this.payment.expenseAccountName = '上海信域'
        } else if (newValue === '066902') {
          this.payment.expenseAccountName = '上海一科'
        }
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.payment.accountNum = '上海信域'
      this.payment.department = 'KA部'
      this.payment.applyUserName = '张三'
      this.payment.applyUserNum = '100000001'
      this.payment.applyDate = new Date()
    }
  },
  methods: {
    async fetchData() {
      this.payment.workflowProcessInstId = 'test'
      this.payment.identiferNum = 'PAY20120001'
      this.payment.paymentType = '合同费支付'
      this.payment.applyDate = '2021-02-01'
      this.payment.accountNum = '上海信域'
      this.payment.department = 'KA部'
      this.payment.applyUserName = '张三'
      this.payment.applyUserNum = '100000001'
      this.payment.supplierIdentiferNum = 'SUP20120001'
      this.payment.supplierName = '京东'
      this.payment.baseRemark = '基本信息备注开始'
      this.payment.costIncurredCompany = '花王（上海）产品服务有限公司'
      this.payment.uses = '用途 01'
      this.payment.expenseAccountNum = '066901'
      this.payment.expenseAccountName = '上海信域'
      this.payment.paymentMethod = '银行转账'
      this.payment.attachmentAddStatus = '有发票'
      this.payment.payRemark = '付款信息备注开始啦'
      this.payment.remark = '备注XXXXXXXXXX-----------------'
      this.payment.details.push({
        contractIdentiferNum: 'CON20120001',
        accountNum: '840-123',
        accountName: '科目1',
        paymentAmount: '2322.43',
        withdrawIdentiferNum: 'PRE20120001',
        localchainNum: 'R01',
        salesofficeNum: 'AV01',
        uses: '促销费',
        rebateYear: '2021',
        rebateMonth: '01'
      })
      this.payment.details.push({
        contractIdentiferNum: 'CON20120002',
        accountNum: '840-123',
        accountName: '科目2',
        paymentAmount: '112322.43',
        withdrawIdentiferNum: 'PRE20120002',
        localchainNum: 'R01',
        salesofficeNum: 'AV02',
        uses: '放置费',
        rebateYear: '2021',
        rebateMonth: '02'
      })
      this.payment.details.push({
        contractIdentiferNum: 'CON20120003',
        accountNum: '840-123',
        accountName: '科目3',
        paymentAmount: '25322.43',
        withdrawIdentiferNum: 'PRE20120003',
        localchainNum: 'R01',
        salesofficeNum: 'AV03',
        uses: '促销费',
        rebateYear: '2021',
        rebateMonth: '03'
      })
      this.payment.invoiceDetails.push({
        invoiceType: '普通发票',
        invoiceNum: 'VAT0001',
        excludingTaxAmount: '95',
        taxRate: '5',
        taxAmount: '5',
        totalAmount: '100'
      })
      this.payment.invoiceDetails.push({
        invoiceType: '增值税发票',
        invoiceNum: 'VAT0002',
        excludingTaxAmount: '291',
        taxRate: '3',
        taxAmount: '9',
        totalAmount: '300'
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
      this.payment.details.push({
        invoiceNo: '',
        invoiceCode: '',
        excludingTaxAmount: '',
        taxRate: '',
        taxAmount: '',
        totalAmount: '',
        originalTotalAmount: '',
        clearPreTotalAmount: '',
        withHoldingUses: ''
      })
    },
    handleDeleteDetail(index, type) {
      if (type === '1') {
        this.payment.invoiceDetails.splice(index, 1)
      } else if (type === '2') {
        this.payment.details.splice(index, 1)
      }
    },
    handleUploadInvoice() {
      alert('上传发票')
    },
    handleSearchWithholding() {
      alert('预提查询')
    },
    handleTreeSelect(data) {
      // this[this.activeInput].name = data.text
      // this[this.activeInput].id = data.id
      this.payment.department = data.text
      this.selectDepartmentDialog = false
    },
    handleTreeClear() {
      // this[this.activeInput].name = ''
      // this[this.activeInput].id = ''
      this.payment.department = ''
      this.selectDepartmentDialog = false
    },
    openSelect() {
      // this.activeInput = activeInput
      // this.selectData = this[this.activeInput]
      this.selectDepartmentDialog = true
    },
    handleInvoiceUpload() {
      this.payment.invoiceDetails = []
      this.payment.invoiceDetails.push({
        invoiceType: '普通发票',
        invoiceNum: 'VAT1',
        excludingTaxAmount: '1111',
        taxRate: '4',
        taxAmount: '44',
        totalAmount: '1155'
      },
      {
        invoiceType: '增值税发票',
        invoiceNum: 'VAT2',
        excludingTaxAmount: '1000',
        taxRate: '5',
        taxAmount: '50',
        totalAmount: '1050'
      })
    },
    handleAddInvoice() {
      this.payment.invoiceDetails.push({
        invoiceType: '',
        invoiceNum: '',
        excludingTaxAmount: '',
        taxRate: '',
        taxAmount: '',
        totalAmount: ''
      })
    }
  }
}
</script>
