<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">支付编号: {{ payment.identiferNum }}</span>
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
                <el-select v-model="payment.paymentType" :disabled="true">
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
                <rel-func-select v-model="payment.supplierIdentiferNum" rel-func="supplier" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                供应商名称
              </div>
              <div class="input">
                <el-input v-model="payment.supplierName" :disabled="true" />
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
                <el-date-picker v-model="payment.applyDate" size="small" type="date" value-format="yyyy-MM-dd" :disabled="true" />
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
                <el-input v-model="payment.baseRemark" :disabled="true" />
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
                <rel-func-select v-model="payment.costIncurredCompany" rel-func="account" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用方编号
              </div>
              <div class="input">
                <!-- <rel-func-select v-model="payment.expenseAccountNum" rel-func="account" /> -->
                <el-select v-model="payment.expenseAccountNum" :disabled="true">
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
                <el-input v-model="payment.expenseAccountName" :disabled="true" />
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
                <el-select v-model="payment.uses" :disabled="true">
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
                <el-select v-model="payment.paymentMethod" :disabled="true">
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
                <!-- <el-input v-model="payment.credentialsAddMethod" /> -->
                <el-select v-model="payment.attachmentAddStatus" :disabled="true">
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
                <el-input v-model="payment.payRemark" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">行明细
          </span>
          <el-table
            v-if="payment.attachmentAddStatus==='有发票'"
            ref="table"
            :data="payment.invoiceDetails"
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
          <el-table
            ref="table"
            :data="payment.details"
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
            <el-table-column prop="uses" label="预提用途" min-width="170" align="center" />
            <el-table-column prop="rebateYear" label="返利年度" min-width="170" align="center" />
            <el-table-column prop="rebateMonth" label="返利月份" min-width="170" align="center" />
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
                <el-input v-model="payment.remark" type="textarea" rows="3" :disabled="true" />
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
                <attachement v-model="fileList" func-div="payment" :disabled="true" />
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
import { numFormat } from '@/mixins/num-format'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
// import DictRadio from '@/components/DictRadio.vue'
export default {
  name: 'ContractInfo',
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
      payment: {
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
        accountName: '费目1',
        paymentAmount: '2322.43',
        withdrawIdentiferNum: 'PRE20120001',
        localchainNum: 'R01',
        salesofficeNum: 'AV01',
        uses: '促销费',
        rebateYear: '2021',
        rebateMonth: '1月'
      })
      this.payment.details.push({
        contractIdentiferNum: 'CON20120002',
        accountNum: '840-123',
        accountName: '费目2',
        paymentAmount: '112322.43',
        withdrawIdentiferNum: 'PRE20120002',
        localchainNum: 'R01',
        salesofficeNum: 'AV02',
        uses: '放置费',
        rebateYear: '2021',
        rebateMonth: '2月'
      })
      this.payment.details.push({
        contractIdentiferNum: 'CON20120003',
        accountNum: '840-123',
        accountName: '费目3',
        paymentAmount: '25322.43',
        withdrawIdentiferNum: 'PRE20120003',
        localchainNum: 'R01',
        salesofficeNum: 'AV03',
        uses: '促销费',
        rebateYear: '2021',
        rebateMonth: '3月'
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
      this.$emit('load', this.payment)
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
<style lang="scss" scoped>
// .input_col {
//   padding: 0px 0px 0px 0px;
// }
// </style>
// <style lang="scss">
// .aligh-top{
//   vertical-align: top !important;
// }
// .text-padding{
//   padding-left: 25px !important;
// }

</style>
