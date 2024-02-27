<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="clear.identiferNum" class="pagespan">清账编号: {{ clear.identiferNum }}</span>
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
                <el-select v-model="clear.paymentType" placeholder="请选择" clearable>
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
                <rel-func-select v-model="clear.supplierIdentiferNum" rel-func="supplier" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                供应商名称
              </div>
              <div class="input">
                <el-input v-model="clear.supplierName" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                公司
              </div>
              <div class="input">
                <rel-func-select v-model="clear.accountNum" rel-func="account" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                申请担当部门
              </div>
              <div class="input">
                <el-input v-model="clear.department" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                申请日期
              </div>
              <div class="input">
                <el-date-picker v-model="clear.applyDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                申请担当
              </div>
              <div class="input">
                <user-select v-model="clear.applyUserName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                申请担当工号
              </div>
              <div class="input">
                <el-input v-model="clear.applyUserNum" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="clear.baseRemark" clearable />
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
                <rel-func-select v-model="clear.costIncurredCompany" rel-func="account" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用方编号
              </div>
              <div class="input">
                <!-- <rel-func-select v-model="clear.expenseAccountNum" rel-func="account" /> -->
                <el-select v-model="clear.expenseAccountNum" placeholder="请选择" clearable>
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
                <el-input v-model="clear.expenseAccountName" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                用途
              </div>
              <div class="input">
                <!-- <el-input v-model="clear.uses" /> -->
                <el-select v-model="clear.uses" placeholder="请选择" clearable>
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
                <!-- <el-input v-model="clear.paymentMethod" /> -->
                <el-select v-model="clear.paymentMethod" placeholder="请选择" clearable>
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
                <el-select v-model="clear.attachmentAddStatus" placeholder="请选择" clearable>
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
                <el-input v-model="clear.payRemark" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">行明细
          </span>
          <div v-if="clear.attachmentAddStatus==='有发票'" class="add_table_row">
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleInvoiceUpload">
              上传发票
            </el-button>
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddInvoice">
              增加发票
            </el-button>
          </div>
          <el-table
            v-if="clear.attachmentAddStatus==='有发票'"
            ref="table"
            :data="clear.invoiceDetails"
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
            :data="clear.details"
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
            <el-table-column label="费目编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.accountNum" clearable />
              </template>
            </el-table-column>
            <el-table-column label="费目名称" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.accountName" clearable />
              </template>
            </el-table-column>
            <el-table-column label="支付金额" min-width="170">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.paymentAmount" to-fixed-num="2" clearable />
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
            <el-table-column label="清账" min-width="70">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.clear" />
              </template>
            </el-table-column>
            <el-table-column label="清账金额" min-width="170">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.clearAmount" to-fixed-num="2" clearable />
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
                <el-input v-model="clear.remark" type="textarea" rows="3" />
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
                <attachement v-model="fileList" func-div="clear" />
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
        <update-his :key="clear.identiferNum" func-div="clear" :identifer-num="clear.identiferNum" />
      </el-drawer>
    </div>
    <!-- <div class="depSelect">
      <el-dialog
        :title="'部门选择'"
        :visible.sync="selectDepartmentDialog"
        append-to-body
        custom-class="content-dialog-userSelect"
        width="25%"
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
  name: 'ClearEdit',
  components: { UserSelect, RelFuncSelect },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      selectDepartmentDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      clear: {
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
    'clear.expenseAccountNum': {
      async handler(newValue, oldValue) {
        if (!newValue) {
          this.clear.expenseAccountName = ''
        } else if (newValue === '066901') {
          this.clear.expenseAccountName = '上海信域'
        } else if (newValue === '066902') {
          this.clear.expenseAccountName = '上海一科'
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
      this.clear.accountNum = '上海信域'
      this.clear.department = 'KA部'
      this.clear.applyUserName = '张三'
      this.clear.applyUserNum = '100000001'
      this.clear.applyDate = new Date()
    }
  },
  methods: {
    async fetchData() {
      this.clear.workflowProcessInstId = 'test'
      this.clear.identiferNum = 'PAY20120001'
      this.clear.paymentType = '合同费支付'
      this.clear.applyDate = '2021-02-01'
      this.clear.accountNum = '上海信域'
      this.clear.department = 'KA部'
      this.clear.applyUserName = '张三'
      this.clear.applyUserNum = '100000001'
      this.clear.supplierIdentiferNum = 'SUP20120001'
      this.clear.supplierName = '京东'
      this.clear.baseRemark = '基本信息备注开始'
      this.clear.costIncurredCompany = '花王（上海）产品服务有限公司'
      this.clear.uses = '用途 01'
      this.clear.expenseAccountNum = '066901'
      this.clear.expenseAccountName = '上海信域'
      this.clear.paymentMethod = '银行转账'
      this.clear.attachmentAddStatus = '有发票'
      this.clear.payRemark = '付款信息备注开始啦'
      this.clear.remark = '备注XXXXXXXXXX-----------------'
      this.clear.details.push({
        contractIdentiferNum: 'CON20120001',
        accountNum: '840-123',
        accountName: '费目1',
        paymentAmount: '2322.43',
        withdrawIdentiferNum: 'PRE20120001',
        localchainNum: 'R01',
        salesofficeNum: 'AV01',
        uses: '促销费',
        rebateYear: '2021',
        rebateMonth: '01',
        clear: true,
        clearAmount: '222.43'
      })
      this.clear.details.push({
        contractIdentiferNum: 'CON20120002',
        accountNum: '840-123',
        accountName: '费目2',
        paymentAmount: '112322.43',
        withdrawIdentiferNum: 'PRE20120002',
        localchainNum: 'R01',
        salesofficeNum: 'AV02',
        uses: '放置费',
        rebateYear: '2021',
        rebateMonth: '02',
        clear: false,
        clearAmount: '44322.43'
      })
      this.clear.details.push({
        contractIdentiferNum: 'CON20120003',
        accountNum: '840-123',
        accountName: '费目3',
        paymentAmount: '25322.43',
        withdrawIdentiferNum: 'PRE20120003',
        localchainNum: 'R01',
        salesofficeNum: 'AV03',
        uses: '促销费',
        rebateYear: '2021',
        rebateMonth: '03',
        clearAmount: '4522.43'
      })
      this.clear.invoiceDetails.push({
        invoiceType: '普通发票',
        invoiceNum: 'VAT0001',
        excludingTaxAmount: '95',
        taxRate: '5',
        taxAmount: '5',
        totalAmount: '100'
      })
      this.clear.invoiceDetails.push({
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
      this.clear.details.push({
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
        this.clear.invoiceDetails.splice(index, 1)
      } else if (type === '2') {
        this.clear.details.splice(index, 1)
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
      this.clear.department = data.text
      this.selectDepartmentDialog = false
    },
    handleTreeClear() {
      // this[this.activeInput].name = ''
      // this[this.activeInput].id = ''
      this.clear.department = ''
      this.selectDepartmentDialog = false
    },
    openSelect() {
      // this.activeInput = activeInput
      // this.selectData = this[this.activeInput]
      this.selectDepartmentDialog = true
    },
    handleInvoiceUpload() {
      this.clear.invoiceDetails = []
      this.clear.invoiceDetails.push({
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
