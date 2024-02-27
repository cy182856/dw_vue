<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="salesorder.identiferNum" class="pagespan">{{ $t('sale.salesorder.identiferNum') }} : {{ salesorder.identiferNum }} {{ $t('comm.version') }} : {{ salesorder.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div v-if="item.elCollapseItemType === 'config'">
            <div class="input_box">
              <template v-for="(field,index2) in item.fields">
                <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                  <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                    <div :class="index3===0?'input_col1':'input_col2'">
                      <form-element
                        v-if="col.isAddAttr"
                        :ref="col.fieldName"
                        :key="index3"
                        v-model="salesorder.attrs[col.fieldName]"
                        :disabled="col.disabled"
                        :row="salesorder"
                        :attributes="col"
                        :filter="salesorder.attrs[col.fieldName]"
                        @data="handleData"
                        @input="handleInput"
                        @setValue="setValue(salesorder,item.fields,col.fieldName)"
                      />
                      <form-element
                        v-else
                        :ref="col.fieldName"
                        :key="index3"
                        v-model="salesorder[col.fieldName]"
                        :disabled="col.disabled"
                        :row="salesorder"
                        :attributes="col"
                        :filter="salesorder[col.fieldName]"
                        @data="handleData"
                        @input="handleInput"
                        @setValue="setValue(salesorder,item.fields,col.fieldName)"
                      />
                    </div>
                  </el-col>
                </el-row>
                <form-element
                  v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="salesorder.attrs[field.fieldName]"
                  :disabled="field.disabled"
                  :row="salesorder"
                  :attributes="field"
                  :filter="salesorder.attrs[field.fieldName]"
                  @data="handleData"
                  @input="handleInput"
                  @setValue="setValue(salesorder,item.fields,field.fieldName)"
                />
                <form-element
                  v-else-if="field.formType !== 'ColumnsLayout'"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="salesorder[field.fieldName]"
                  :disabled="field.disabled"
                  :row="salesorder"
                  :attributes="field"
                  :filter="salesorder[field.fieldName]"
                  @data="handleData"
                  @input="handleInput"
                  @setValue="setValue(salesorder,item.fields,field.fieldName)"
                />
              </template>
            </div>
          </div>
          <div v-else-if="item.elCollapseItemType === 'detail'" class="vertical">
            <div class="add_row " style="text-align:right;">
              <el-button class="editbtn" style="margin-left:1%" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddDetailLine(item.catagoryName)">
                {{ item.catagoryName===3?$t('comm.addProducts'):$t('comm.addCosts') }}
              </el-button>
            </div>
            <el-table
              :show-summary="item.catagoryName===3"
              :summary-method="getSummaries"
              :data="item.catagoryName===3?salesorder.salesorderProducts:salesorder.salesorderOtherCosts"
              stripe
              size="small"
              border
              :header-cell-style="{'text-align':'left'}"
            >
              <el-table-column label="No" width="50px">
                <template slot-scope="scope">
                  {{ scope.row.sequenceNum }}
                </template>
              </el-table-column>
              <el-table-column
                v-for="(field,index2) in item.fields"
                :key="index2"
                :label="$t(field.i18nLabelKey? field.i18nLabelKey : field.showName)"
                :min-width="field.minWidth"
                :width="field.width"
                :align="field.formType==='MilliInput'?'right':'left'"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <column-element v-if="field.isAddAttr" :ref="field.fieldName+scope.$index" v-model="scope.row.attrs[field.fieldName]" :attributes="field" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" :row="scope.row" @data="handleData" />
                  <column-element v-else :ref="field.fieldName+scope.$index" v-model="scope.row[field.fieldName]" :attributes="field" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" :row="scope.row" @data="handleData" />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('comm.operation')"
                width="70"
              >
                <template slot-scope="scope">
                  <div align="center">
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelDetailLine(scope.$index, item.catagoryName)" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="item.elCollapseItemType === 'customize'">
            <div class="total-content">
              <div class="item bg-c1">
                <div class="name">
                  {{ $t('sale.quote.productSumTotal') }}
                </div>
                <div class="center">
                  <milli-input v-model="productSumTotal" :value="productSumTotal" :disabled="true" :to-fixed-num="2" class="input" />
                </div>
              </div>
              <div class="item bg-c2 col_input_box">
                <div class="name">
                  {{ $t('sale.quote.productTax') }}
                </div>
                <div class="center input">
                  <milli-input v-model="salesorder.productTax" :to-fixed-num="2" class="input" @blur="validator('productTax')" />
                  <span ref="productTax" data-roles="number" :data-value="salesorder.productTax" class="message" />
                </div>
              </div>
              <div class="item bg-c1 col_input_box">
                <div class="name">
                  {{ $t('sale.quote.adjustmentFee') }}
                </div>
                <div class="center input">
                  <milli-input v-model="salesorder.adjustmentFee" :to-fixed-num="2" class="input" @blur="validator('adjustmentFee')" />
                  <span ref="adjustmentFee" data-roles="negativeNumber" :data-value="salesorder.adjustmentFee" class="message" />
                </div>
              </div>
              <div class="item bg-c2">
                <div class="name">
                  {{ $t('sale.quote.otherSumTotal') }}
                </div>
                <div class="center">
                  <milli-input v-model="otherSumTotal" :disabled="true" :to-fixed-num="2" class="input" />
                </div>
              </div>
              <div class="item bg-c1">
                <div class="name">
                  {{ $t('sale.quote.otherTax') }}
                </div>
                <div class="center">
                  <milli-input v-model="otherTax" :disabled="true" :to-fixed-num="2" class="input" />
                </div>
              </div>
              <div class="item bg-c3">
                <div class="name">
                  {{ $t('sale.quote.includingTaxAmount') }}
                </div>
                <div class="center">
                  <milli-input v-model="includingTaxAmount" :disabled="true" :to-fixed-num="2" class="input" />
                </div>
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
        <!-- 流程取消 -->
        <li v-if="taskId" class="operation-item" @click="handleCancel">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.processCancel') }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('comm.approval') }}</span>
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
    <div>
      <product-pop :is-show="productSelectDialog" :currency="salesorder.salesorderCurrency" @cancel="productSelectDialog=false" @clear="handleSelectClear" @select="handleProductSelected" />
    </div>
    <div v-if="processDialog">
      <process-detail :key="processInstId" :title="$t('component.taskApprove.detailedProcess') + processInstId" :is-show="processDialog" :process-inst-id="processInstId" @close="processDialog=false" />
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
        <update-his :key="salesorder.identiferNum" func-div="salesorder" :identifer-num="salesorder.identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { getDetail, getDetailByQuote, submitSalesorder, cancelProcess } from '@/api/sale/salesorder'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import ProductPop from '@/views/mdm/product/components/ProductPop'
import MilliInput from '@/components/MilliInput.vue'
import { dict } from '@/mixins/dict'
export default {
  name: 'SalesorderEdit',
  components: { FormElement, ProductPop, MilliInput },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      processDialog: false,
      productSelectDialog: false,
      historyDialog: false,
      salesorder: {
        attrs: {
        },
        invoiceFlag: '0',
        salesorderProducts: [],
        salesorderOtherCosts: []
      },
      productMap: new Map(),
      fileList: [],
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: []
        }
      ]
    }
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    oppNum: function() { return this.$route.query.oppNum },
    oppId: function() { return this.$route.query.oppId },
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    quoteId: function() { return this.$route.query.quoteId },
    productSumTotal: function() {
      if (this.salesorder.salesorderProducts && this.salesorder.salesorderProducts.length > 0) {
        const sum = this.salesorder.salesorderProducts.map(item => isNaN(item.productNum * item.sellingPrice) ? 0 : item.productNum * item.sellingPrice, 2)
        return sum.reduce((sum, item) => sum + item)
      }
      return 0.00
    },
    otherSumTotal: function() {
      if (this.salesorder.salesorderOtherCosts && this.salesorder.salesorderOtherCosts.length > 0) {
        const sum = this.salesorder.salesorderOtherCosts.map(item => !item.money ? 0 : parseFloat(item.money), 2)
        return sum.reduce((sum, item) => sum + item)
      }
      return 0.00
    },
    otherTax: function() {
      if (this.salesorder.salesorderOtherCosts && this.salesorder.salesorderOtherCosts.length > 0) {
        const sum = this.salesorder.salesorderOtherCosts.map(item => !item.tax ? 0 : parseFloat(item.tax), 2)
        return sum.reduce((sum, item) => sum + item)
      }
      return 0.00
    },
    includingTaxAmount: function() {
      return this.productSumTotal + parseFloat(this.otherSumTotal) + parseFloat(this.otherTax) + (!this.salesorder.productTax ? 0 : parseFloat(this.salesorder.productTax)) + (!this.salesorder.adjustmentFee ? 0 : parseFloat(this.salesorder.adjustmentFee))
    }
  },
  watch: {
    'salesorder.salesorderProducts': {
      async handler(newValue, oldValue) {
        newValue.forEach(product => {
          if (!product.productNum || !product.sellingPrice) {
            return false
          }
          product.amount = product.productNum * product.sellingPrice
        })
      },
      immediate: true,
      deep: true
    },
    'salesorder.invoiceFlag': {
      async handler(newValue, oldValue) {
        var invoiceType = {}
        if (this.pageConfig.length > 1) {
          this.pageConfig[1].fields.forEach(function(item) {
            item.columns.forEach(function(item1) {
              if (item1.fieldName === 'invoiceType') {
                invoiceType = item1
              }
            })
          })
        }
        if (invoiceType && newValue) {
          this.$set(invoiceType, 'disabled', String(newValue) === '0')
        }
        if (invoiceType && newValue === '0') {
          this.$set(this.salesorder, 'invoiceType', '')
        }
      },
      immediate: true,
      deep: true
    },
    'salesorder.salesorderCurrency': {
      immediate: true,
      async handler(newValue, oldValue) {
        if (newValue && oldValue) {
          if (this.salesorder.salesorderProducts && this.salesorder.salesorderProducts[0]) {
            this.salesorder.salesorderProducts = []
          }
          if (this.salesorder.salesorderOtherCosts && this.salesorder.salesorderOtherCosts[0]) {
            this.salesorder.salesorderOtherCosts = []
          }
        }
      }
    }
  },
  async created() {
    const res = await getPageConfig('salesorder', 'edit')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
      }
      if (!this.id) {
        // 新建的时候，删除最后的其他信息
        this.$delete(this.pageConfig, this.pageConfig.length - 1)
        // 设置币种默认值（不要在data里设置默认值，避免页面初始化时执行监听）
        this.$set(this.salesorder, 'salesorderCurrency', 'cny')
      }
    }
    this.activeNames = this.pageConfig.map(item => item.catagoryName)
    if (this.id || this.quoteId) {
      this.fetchData()
    } else {
      if (this.oppNum && this.oppId) {
        this.salesorder.opportunityId = this.oppId
        this.salesorder.opportunityNum = this.oppNum
      }
      this.salesorder.assignedUser = this.$store.getters.userInfo.userId
      this.salesorder.paymentMethodArr = []
    }
  },
  methods: {
    async fetchData() {
      let res
      if (this.quoteId) {
        res = await getDetailByQuote(this.quoteId)
      } else {
        res = await getDetail(this.id)
      }

      if (res && res.success) {
        this.salesorder = res.datas.salesorder
        if (res.datas.attachmentDetails) {
          this.salesorder.attachmentDetails = res.datas.attachmentDetails
        }
        if (res.datas.productMap) {
          this.productMap = res.datas.productMap
          this.salesorder.salesorderProducts.forEach((item) => {
            item.productName = this.productMap[item.productId].productName
            item.productIdentiferNum = this.productMap[item.productId].identiferNum
            item.category1 = this.productMap[item.productId].category1
            item.category2 = this.productMap[item.productId].category2
            item.productUnit = this.productMap[item.productId].unit
            item.productPrice = this.productMap[item.productId].unitPrice
            item.currency = this.salesorder.salesorderCurrency
          })
          if (this.salesorder.paymentMethod) {
            this.$set(this.salesorder, 'paymentMethodArr', this.salesorder.paymentMethod.split(','))
          } else {
            this.$set(this.salesorder, 'paymentMethodArr', [])
          }
        }
      }
      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.salesorder.id = ''
        this.salesorder.salesorderName = ''
        this.salesorder.orderDate = ''
        this.salesorder.shopDate = ''
        this.salesorder.identiferNum = ''
        this.salesorder.exclusiveKey = ''
        this.salesorder.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.salesorder.assignedUser = this.$store.getters.userInfo.userId
      }
      this.isLoading = false
    },
    handleSubmit(submitType) {
      for (const ref in this.$refs) {
        if (this.$refs[ref] && this.$refs[ref].length > 0) {
          const obj = this.$refs[ref][0]
          // 页面嵌套vue组件调用验证方法
          if (obj.hasOwnProperty('validatorAll')) {
            this.$refs[ref][0].validatorAll()
            if (!this.$refs[ref][0].validatorState) return false
          } else {
            // 本页面调用验证方法
            if (!this.validator(ref)) return false
          }
        }
      }
      if (!this.salesorder.salesorderProducts || this.salesorder.salesorderProducts.length === 0) {
        this.$message({
          type: 'error',
          message: this.$t('sale.salesorder.e0001')
        })
        return false
      }
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.salesorder.taskId = this.taskId
        this.salesorder.processInstId = this.processInstId
        this.salesorder.submitType = submitType
        this.salesorder.productTaxStr = this.salesorder.productTax
        this.salesorder.adjustmentFeeStr = this.salesorder.adjustmentFee
        this.salesorder.includingTaxAmountStr = this.includingTaxAmount
        if (this.salesorder.paymentMethodArr) {
          this.salesorder.paymentMethod = this.salesorder.paymentMethodArr.join(',')
        } else {
          this.salesorder.paymentMethod = ''
        }
        const res = await submitSalesorder(this.salesorder)
        if (res && res.success) {
          this.$router.push('/sale/salesorderList')
        }
        this.isLoading = false
      }).catch(_ => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleCancel() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await cancelProcess(this.taskId)
        if (res && res.success) {
          this.$router.push('/sale/salesorderList')
        }
        this.isLoading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleData(data) {
      if (data.indexObject) {
        if (data.indexObject.catagoryName === 3) {
          this.$set(this.salesorder.salesorderProducts[Number(data.indexObject.lineIndex)], 'sellingPrice', data[0].localPrice)
        }
      } else if (data.refFunc === 'contact') {
        this.salesorder.contactId = data[0].id
      } else if (data.refFunc === 'lead') {
        this.salesorder.leadId = data[0].id
      } else if (data.refFunc === 'account') {
        this.salesorder.accountId = data[0].id
      } else if (data.refFunc === 'salesopportunity') {
        this.salesorder.opportunityId = data[0].id
      } else if (data.refFunc === 'quote') {
        this.salesorder.quoteId = data[0].id
      }
    },
    handleAddDetailLine(index) {
      if (index === 3) {
        this.productSelectDialog = true
      } else {
        if (!this.salesorder.salesorderOtherCosts) this.salesorder.salesorderOtherCosts = []
        this.salesorder.salesorderOtherCosts.push({ salesorderId: '', productId: '', sequenceNum: 1 })
        this.salesorder.salesorderOtherCosts.forEach((v, k) => {
          v.sequenceNum = k + 1
        })
      }
    },
    handleDelDetailLine(index, flg) {
      if (flg === 3) {
        this.salesorder.salesorderProducts.splice(index, 1)
        this.salesorder.salesorderProducts.forEach((v, k) => {
          v.sequenceNum = k + 1
        })
      } else {
        this.salesorder.salesorderOtherCosts.splice(index, 1)
        this.salesorder.salesorderOtherCosts.forEach((v, k) => {
          v.sequenceNum = k + 1
        })
      }
    },
    // 产品popup画面选择事件
    handleProductSelected(products) {
      products.forEach((rowData) => {
        // 已填加的产品将不再添加
        const index = this.salesorder.salesorderProducts.findIndex((ele) => {
          return ele.productIdentiferNum === rowData.identiferNum
        })
        // 产品未添加时
        if (index === -1) {
          var sequenceNum = this.salesorder.salesorderProducts.length + 1
          // 将选择的产品添加到画面上
          this.salesorder.salesorderProducts.push({
            productId: rowData.id,
            productName: rowData.productName,
            category1: rowData.category1,
            category2: rowData.category2,
            productIdentiferNum: rowData.identiferNum,
            productPrice: rowData.unitPrice,
            productUnit: rowData.unit,
            productNum: '',
            sequenceNum: sequenceNum,
            amount: '',
            attrs: {},
            currency: this.salesorder.salesorderCurrency
          })
        }
      })
      this.productSelectDialog = false
    },
    handleSelectClear() {
    },
    getSummaries() {
      const totals = []
      const sum = this.salesorder.salesorderProducts.map(item => isNaN(item.productNum * item.sellingPrice) ? 0 : item.productNum * item.sellingPrice, 2)
      if (sum && sum.length > 0) {
        var total = sum.reduce((sum1, item) => sum1 + item)
        totals[10] = this.numFormat(total, 2)
        totals[0] = '合计'
      }
      return totals
    },
    numFormat(num, fixNum) {
      let reg = null
      if (!num) {
        return num
      }
      var toFixedNum = Number(num).toFixed(fixNum)
      if (toFixedNum.indexOf('.') > -1) {
        reg = /(\d)(?=(\d{3})+\.)/g
        return (toFixedNum).replace(reg, '$1,')
      } else {
        reg = /\d{1,3}(?=(\d{3})+$)/g
        return (toFixedNum).replace(reg, '$&,')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.input_col {
  padding: 0px 0px 0px 0px;
}
.editbtn {
  background-color:rgb(102, 206, 188);
  color: white;
  margin-left: 50%;
  border: 0px solid #DCDFE6;
}
.total-content .item{
	height: 30px;
	line-height: 30px;
	margin-bottom: 2px;
	font-size: 12px;
}
.total-content .item .name{
	width: 55%;
	float: left;
	text-align: right;
	padding-right: 30px;
}
.total-content .item .center{
  float: left;
  width: 30%;
  .input{
    width:66.7% !important;
    float:left;
  }
  .message{
    color: red;
    float:right;
    width: 30.3% !important;
  }
}
.total-content .item .company{
	float: left;
	width: 125px;
	padding: 0 15px;
}
.total-content .form-box{
	width: 230px;
	padding: 2px 0;
}
.total-content .form-box .form-control{
	height: 26px;
	background: rgba(0,0,0,0);
	font-size: 12px;
}
</style>
<style lang="scss">
</style>
