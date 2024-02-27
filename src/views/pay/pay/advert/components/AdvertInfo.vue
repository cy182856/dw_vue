<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">Monitor No: {{ payment.identiferNum }}</span>
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
            <div class="flex3">
              <div class="title">
                申请分类
              </div>
              <div class="input">
                <el-select v-model="payment.applyType" placeholder="请选择" :disabled="true">
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
                <el-input v-model="payment.baseRemark" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                财务处理完成
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
            <div class="flex3_1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="payment.payRemark" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                币种
              </div>
              <div class="input">
                <dict-select v-model="payment.currency" dict-type-id="Currency" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">行明细
          </span>
          <div v-if="payment.attachmentAddStatus==='有发票'" class="add_table_row">
            <div>
              发票及税金信息
            </div>
            <div class="input">
              <el-date-picker v-model="payment.invoiceDate" size="small" type="date" :disabled="true" placeholder="开票日期" />
            </div>
          </div>
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
          </div>
          <el-table
            ref="table"
            :data="payment.divideDetails"
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
            <el-table-column prop="subBrandNum" label="Sub品牌编号" min-width="170" align="center" />
            <el-table-column prop="subBrandName" label="Sub品牌名称" min-width="170" align="center" />
            <el-table-column prop="salesofficeNum" label="Sales Office编号" min-width="170" align="center" />
            <el-table-column prop="salesofficeName" label="Sales Office名称" min-width="170" align="center" />
            <el-table-column prop="salesGroupNum" label="Sales Group编号" min-width="170" align="center" />
            <el-table-column prop="salesGroupName" label="Sales Group名称" min-width="170" align="center" />
            <el-table-column label="金额" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.amount | numFormat(2) }}
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
  name: 'AdvertInfo',
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
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.payment.workflowProcessInstId = 'test'
      this.payment.identiferNum = 'AV0001'
      this.payment.paymentType = '市场费支付'
      this.payment.applyType = '1'
      this.payment.currency = 'cny'
      this.payment.invoiceDate = new Date()
      this.payment.financialDate = new Date()
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
