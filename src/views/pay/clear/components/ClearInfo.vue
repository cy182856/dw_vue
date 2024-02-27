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
                <el-select v-model="clear.paymentType" :disabled="true">
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
                <rel-func-select v-model="clear.supplierIdentiferNum" rel-func="supplier" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                供应商名称
              </div>
              <div class="input">
                <el-input v-model="clear.supplierName" :disabled="true" />
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
                <el-date-picker v-model="clear.applyDate" size="small" type="date" value-format="yyyy-MM-dd" :disabled="true" />
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
                <el-input v-model="clear.baseRemark" :disabled="true" />
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
                <rel-func-select v-model="clear.costIncurredCompany" rel-func="account" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用方编号
              </div>
              <div class="input">
                <!-- <rel-func-select v-model="clear.expenseAccountNum" rel-func="account" /> -->
                <el-select v-model="clear.expenseAccountNum" :disabled="true">
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
                <el-input v-model="clear.expenseAccountName" :disabled="true" />
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
                <el-select v-model="clear.uses" :disabled="true">
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
                <el-select v-model="clear.paymentMethod" :disabled="true">
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
                <el-select v-model="clear.attachmentAddStatus" :disabled="true">
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
                <el-input v-model="clear.payRemark" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">行明细</span>
          <el-table
            ref="table"
            :data="clear.invoiceDetails"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column label="No." min-width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="invoiceType" label="发票类型" min-width="170" align="center" />
            <el-table-column prop="invoiceNum" label="发票号码" min-width="170" align="center" />
            <el-table-column label="不含税金额" min-width="180" align="right">
              <template slot-scope="scope">
                {{ scope.row.excludingTaxAmount| numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="税率" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.taxRate| numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="税额" min-width="178" align="right">
              <template slot-scope="scope">
                {{ scope.row.taxAmount + '%' }}
              </template>
            </el-table-column>
            <el-table-column label="发票总金额" min-width="200" align="right">
              <template slot-scope="scope">
                {{ scope.row.totalAmount | numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>
          <div class="add_table_row" />
          <el-table
            ref="table"
            :data="clear.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column label="No." min-width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="contractIdentiferNum" label="合同编号" min-width="170" align="center" />
            <el-table-column prop="accountNum" label="费目编号" min-width="170" align="center" />
            <el-table-column prop="accountName" label="费目名称" min-width="170" align="center" />
            <el-table-column label="支付金额" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.paymentAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="withdrawIdentiferNum" label="预提编号" min-width="170" align="center" />
            <el-table-column prop="localchainNum" label="Localchain编号" min-width="170" align="center" />
            <el-table-column prop="salesofficeNum" label="Salesoffice编号" min-width="170" align="center" />
            <el-table-column prop="uses" label="预提用途" min-width="170" />
            <el-table-column prop="rebateYear" label="返利年度" min-width="170" align="center" />
            <el-table-column prop="rebateMonth" label="返利月份" min-width="170" align="center" />
            <el-table-column label="清账" min-width="70" align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.clear" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column label="清账金额" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.clearAmount | numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>
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
    </div>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'ClearInfo',
  components: { RelFuncSelect, UserSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'detail'
    }
  },
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      clear: {
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
  },
  watch: {
  },
  async created() {
    this.fetchData()
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
        rebateMonth: '1月',
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
        rebateMonth: '2月',
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
        rebateMonth: '3月',
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
      this.$emit('load', this.clear)
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
    }

  }
}
</script>
