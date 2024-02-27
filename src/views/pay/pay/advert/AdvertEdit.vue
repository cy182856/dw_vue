<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="payment.identiferNum" class="pagespan">Monitor No: {{ payment.identiferNum }}</span>
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
                <el-select v-model="payment.paymentType" placeholder="请选择" :disabled="true">
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
            <div class="flex3">
              <div class="title">
                申请分类
              </div>
              <div class="input">
                <el-select v-model="payment.applyType" placeholder="请选择">
                  <el-option label="1：广告费-最终报价" value="1" />
                  <el-option label="2：广告费-媒介价单" value="2" />
                  <el-option label="3：广告费-框架协议" value="3" />
                  <el-option label="4：调查费-市场部" value="4" />
                  <el-option label="5：调查费-开发部" value="5" />
                  <el-option label="6：调查费-DMP" value="6" />
                </el-select>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="payment.baseRemark" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                <el-button class="editbtn" size="mini" @click.stop="handleSetFinancialDate">
                  财务处理完成
                </el-button>
              </div>
              <div class="input">
                <el-date-picker v-model="payment.financialDate" :disabled="true" />
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
            <div class="flex3_1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="payment.payRemark" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                币种
              </div>
              <div class="input">
                <dict-select v-model="payment.currency" dict-type-id="Currency" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">行明细</span>
          <div v-if="payment.attachmentAddStatus==='有发票'" class="add_table_row">
            <div>
              发票及税金信息
            </div>
            <div class="input">
              <el-date-picker v-model="payment.invoiceDate" size="small" type="date" :clearable="false" placeholder="开票日期" />
            </div>
            <el-button size="mini" class="editbtn" icon="el-icon-circle-plus-outline" @click.stop="handleInvoiceUpload">
              上传发票
            </el-button>
            <el-button size="mini" class="editbtn" icon="el-icon-circle-plus-outline" @click.stop="handleAddInvoice">
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
          <div v-if="payment.attachmentAddStatus==='有发票'" class="input_box">
            <div class="flex3">
              <div class="title">
                不含税金额合计
              </div>
              <div class="input">
                <milli-input v-model="excludingTaxAmountSum" to-fixed-num="2" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                税额合计
              </div>
              <div class="input">
                <milli-input v-model="taxAmountSum" to-fixed-num="2" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                总金额合计
              </div>
              <div class="input">
                <milli-input v-model="amountSum" to-fixed-num="2" :disabled="true" />
              </div>
            </div>
          </div>
          <div style="font-size:12px">
            <div>品牌别汇总</div>
          </div>
          <el-table
            ref="table"
            :data="payment.brandSummaryDetails"
            style="margin-bottom: 20px;width:560px;"
            :header-cell-style="{'text-align':'center'}"
            width="560"
            border
            stripe
          >
            <el-table-column label="No." width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="Sub品牌编号" width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.subBrandNum }}
              </template>
            </el-table-column>
            <el-table-column label="Sub品牌名称" width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.subBrandName }}
              </template>
            </el-table-column>
            <el-table-column label="总金额" width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.totalAmount | numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>
          <div class="add_table_row">
            <div>费用分摊明细</div>
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddDivide">
              新增一行
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="payment.divideDetails"
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
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '3')" />
              </template>
            </el-table-column>
            <el-table-column label="No." min-width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="Sub品牌编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.subBrandNum" clearable />
              </template>
            </el-table-column>
            <el-table-column label="Sub品牌名称" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.subBrandName" />
              </template>
            </el-table-column>
            <el-table-column label="Sales Office编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.salesofficeNum" />
              </template>
            </el-table-column>
            <el-table-column label="Sales Office名称" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.salesofficeName" />
              </template>
            </el-table-column>
            <el-table-column label="Sales Group编号" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.salesGroupNum" />
              </template>
            </el-table-column>
            <el-table-column label="Sales Group名称" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.salesGroupName" />
              </template>
            </el-table-column>
            <el-table-column label="金额" min-width="170">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.amount" to-fixed-num="2" />
              </template>
            </el-table-column>
          </el-table>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                分摊总金额
              </div>
              <div class="input">
                <milli-input v-model="divideAmountSum" to-fixed-num="2" :disabled="true" />
              </div>
            </div>
          </div>
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
        <li class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">PDF下载</span>
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
import { numFormat } from '@/mixins/num-format.js'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'AdvertEdit',
  components: { UserSelect, RelFuncSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
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
        financialDate: '',
        attrs: {
        },
        details: [],
        invoiceDetails: [],
        divideDetails: [],
        brandSummaryDetails: []
      },
      fileList: [],
      processDialog: false,
      paymentType: [{ value: '市场费支付', lable: '01' }],
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
    },
    excludingTaxAmountSum: function() {
      if (this.payment.invoiceDetails && this.payment.invoiceDetails.length > 0) {
        const sum = this.payment.invoiceDetails.map(
          (item) => (!item.excludingTaxAmount ? 0 : parseFloat(item.excludingTaxAmount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    },
    taxAmountSum: function() {
      if (this.payment.invoiceDetails && this.payment.invoiceDetails.length > 0) {
        const sum = this.payment.invoiceDetails.map(
          (item) => (!item.taxAmount ? 0 : parseFloat(item.taxAmount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    },
    amountSum: function() {
      if (this.payment.invoiceDetails && this.payment.invoiceDetails.length > 0) {
        const sum = this.payment.invoiceDetails.map(
          (item) => (!item.totalAmount ? 0 : parseFloat(item.totalAmount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    },
    divideAmountSum: function() {
      if (this.payment.divideDetails && this.payment.divideDetails.length > 0) {
        const sum = this.payment.divideDetails.map(
          (item) => (!item.amount ? 0 : parseFloat(item.amount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
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
    },
    'payment.divideDetails': {
      async handler(newValue, oldValue) {
        const list = this.groupBy(newValue, function(item) {
          return [item.subBrandNum]
        })
        this.payment.brandSummaryDetails = []
        list.forEach((item) => {
          const sum = item.map(
            (item) => (!item.amount ? 0 : parseFloat(item.amount)),
            2
          )
          if (item[0] && item[0].subBrandNum) {
            this.payment.brandSummaryDetails.push({
              subBrandNum: item[0].subBrandNum,
              subBrandName: item[0].subBrandName,
              totalAmount: sum.reduce((sum, item) => sum + item)
            })
          }
        })
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.payment.accountNum = '花王（上海）产品服务有限公司'
      this.payment.department = '市场部'
      this.payment.applyUserName = '张三'
      this.payment.applyUserNum = '100000001'
      this.payment.currency = 'cny'
      this.payment.applyDate = new Date()
      this.payment.costIncurredCompany = '花王（上海）产品服务有限公司'
      this.payment.paymentType = '市场费支付'
    }
  },
  methods: {
    async fetchData() {
      this.payment.workflowProcessInstId = 'test'
      this.payment.identiferNum = 'AV0001'
      this.payment.paymentType = '广告费支付'
      this.payment.applyType = '1'
      this.payment.currency = 'cny'
      this.payment.invoiceDate = new Date()
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
      this.payment.divideDetails.push({
        subBrandNum: '1538204',
        subBrandName: '妙而舒纸尿裤（进口）',
        salesofficeNum: 'AVD04',
        salesofficeName: 'Beijing DB',
        salesGroupNum: 'AG01',
        salesGroupName: 'salesGroup 01',
        amount: 1234.43
      },
      {
        subBrandNum: '1538204',
        subBrandName: '妙而舒纸尿裤（进口）',
        salesofficeNum: 'AVD04',
        salesofficeName: 'Beijing DB',
        salesGroupNum: 'AG02',
        salesGroupName: 'salesGroup 02',
        amount: 3333.43
      }, {
        subBrandNum: '1538204',
        subBrandName: '妙而舒纸尿裤（进口）',
        salesofficeNum: 'AVD03',
        salesofficeName: 'Xian DB',
        salesGroupNum: 'AG01',
        salesGroupName: 'salesGroup 01',
        amount: 122.43
      }, {
        subBrandNum: '1538202',
        subBrandName: '妙而舒学步裤（进口）',
        salesofficeNum: 'AVD04',
        salesofficeName: 'Beijing DB',
        salesGroupNum: 'AG01',
        salesGroupName: 'salesGroup 01',
        amount: 1234.43
      }, {
        subBrandNum: '1538202',
        subBrandName: '妙而舒学步裤（进口）',
        salesofficeNum: 'AVD03',
        salesofficeName: 'Xian DB',
        salesGroupNum: 'AG01',
        salesGroupName: 'salesGroup 01',
        amount: 1234.43
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
    handleAddDivide() {
      this.payment.divideDetails.push({
        subBrandNum: '',
        subBrandName: '',
        salesofficeNum: '',
        salesofficeName: '',
        salesGroupNum: '',
        salesGroupName: '',
        amount: ''
      })
    },
    handleDeleteDetail(index, type) {
      if (type === '1') {
        this.payment.invoiceDetails.splice(index, 1)
      } else if (type === '2') {
        this.payment.brandSummaryDetails.splice(index, 1)
      } else if (type === '3') {
        this.payment.divideDetails.splice(index, 1)
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
    },
    groupBy: function(array, f) {
      const groups = {}
      array.forEach(function(o) {
        const group = JSON.stringify(f(o))
        groups[group] = groups[group] || []
        groups[group].push(o)
      })
      return Object.keys(groups).map(function(group) {
        return groups[group]
      })
    },
    handleSetFinancialDate() {
      this.payment.financialDate = new Date()
    }
  }
}
</script>
