<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <top-box v-if="type==='detail'" :relation-info-map="relationInfoMap" />
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('sale.quote.identiferNum') }} : {{ quote.identiferNum }} {{ $t('comm.version') }} : {{ quote.version }}</span>
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
                        v-model="quote.attrs[col.fieldName]"
                        :disabled="col.disabled"
                        :row="quote"
                        :attributes="col"
                        :filter="quote.attrs[col.fieldName]"
                        @setValue="setValue(quote,item.fields,col.fieldName)"
                      />
                      <form-element
                        v-else
                        :ref="col.fieldName"
                        :key="index3"
                        v-model="quote[col.fieldName]"
                        :disabled="col.disabled"
                        :row="quote"
                        :attributes="col"
                        :filter="quote[col.fieldName]"
                        @setValue="setValue(quote,item.fields,col.fieldName)"
                      />
                    </div>
                  </el-col>
                </el-row>
                <form-element
                  v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="quote.attrs[field.fieldName]"
                  :disabled="field.disabled"
                  :row="quote"
                  :attributes="field"
                  :filter="quote.attrs[field.fieldName]"
                  @setValue="setValue(quote,item.fields,field.fieldName)"
                />
                <form-element
                  v-else-if="field.formType !== 'ColumnsLayout'"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="quote[field.fieldName]"
                  :disabled="field.disabled"
                  :row="quote"
                  :attributes="field"
                  :filter="quote[field.fieldName]"
                  @setValue="setValue(quote,item.fields,field.fieldName)"
                />
              </template>
            </div>
          </div>
          <div v-else-if="item.elCollapseItemType === 'detail'" class="vertical">
            <el-table
              :show-summary="item.catagoryName===3"
              :summary-method="getSummaries"
              :data="item.catagoryName===3?quote.quoteProducts:quote.quoteOtherCosts"
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
                  <column-element v-if="field.isAddAttr" :ref="field.fieldName" v-model="scope.row.attrs[field.fieldName]" :attributes="field" :disabled="field.disabled" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" :row="scope.row" />
                  <column-element v-else :ref="field.fieldName" v-model="scope.row[field.fieldName]" :attributes="field" :disabled="field.disabled" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" :row="scope.row" />
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
                  <milli-input v-model="productSumTotal" :disabled="true" :to-fixed-num="2" class="input" />
                </div>
              </div>
              <div class="item bg-c2">
                <div class="name">
                  {{ $t('sale.quote.productTax') }}
                </div>
                <div class="center">
                  <milli-input v-model="quote.productTax" :disabled="true" :to-fixed-num="2" class="input" />
                </div>
              </div>
              <div class="item bg-c1">
                <div class="name">
                  {{ $t('sale.quote.adjustmentFee') }}
                </div>
                <div class="center">
                  <milli-input v-model="quote.adjustmentFee" :disabled="true" :to-fixed-num="2" class="input" />
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
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/sale/quote'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import ColumnElement from '@/components/ColumnElement.vue'
import { names } from '@/mixins/names.js'
import TopBox from '@/components/TopBox'
import { dict } from '@/mixins/dict'
export default {
  name: 'QuoteInfo',
  components: { FormElement, ColumnElement, TopBox },
  mixins: [names, formValidator, dict],
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
      quoteId: this.id,
      isLoading: true,
      activeNames: [],
      productSelectDialog: false,
      quote: {
        attrs: {
        },
        currency: 'CNY',
        invoiceFlag: '0',
        quoteProducts: [],
        quoteOtherCosts: []
      },
      productMap: new Map(),
      relationInfoMap: new Map(),
      selectUserDialog: false,
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
    productSumTotal: function() {
      if (this.quote.quoteProducts && this.quote.quoteProducts.length > 0) {
        const sum = this.quote.quoteProducts.map(item => isNaN(item.productNum * item.sellingPrice) ? 0 : item.productNum * item.sellingPrice, 2)
        return sum.reduce((sum, item) => sum + item)
      }
      return 0.00
    },
    otherSumTotal: function() {
      if (this.quote.quoteOtherCosts && this.quote.quoteOtherCosts.length > 0) {
        const sum = this.quote.quoteOtherCosts.map(item => !item.money ? 0 : parseFloat(item.money), 2)
        return sum.reduce((sum, item) => sum + item)
      }
      return 0.00
    },
    otherTax: function() {
      if (this.quote.quoteOtherCosts && this.quote.quoteOtherCosts.length > 0) {
        const sum = this.quote.quoteOtherCosts.map(item => !item.tax ? 0 : parseFloat(item.tax), 2)
        return sum.reduce((sum, item) => sum + item)
      }
      return 0.00
    },
    includingTaxAmount: function() {
      return this.productSumTotal + parseFloat(this.otherSumTotal) + parseFloat(this.otherTax) + (!this.quote.productTax ? 0 : parseFloat(this.quote.productTax)) + (!this.quote.adjustmentFee ? 0 : parseFloat(this.quote.adjustmentFee))
    }
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.quoteId = newValue
        this.fetchData()
      }
    },
    'quote.quoteProducts': {
      async handler(newValue, oldValue) {
        newValue.forEach(product => {
          if (product.productNum && product.sellingPrice) {
            product.amount = product.productNum * product.sellingPrice
          }
        })
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    const res = await getPageConfig('quote', 'detail')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
      }
    }

    this.activeNames = this.pageConfig.map(item => item.catagoryName)

    if (this.quoteId) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.quoteId)
      if (res && res.success) {
        this.relationInfoMap = res.datas.relationNum
        this.quote = res.datas.quote
        if (res.datas.attachmentDetails) {
          this.quote.attachmentDetails = res.datas.attachmentDetails
        }
        if (res.datas.productMap) {
          this.productMap = res.datas.productMap
          this.quote.quoteProducts.forEach((item) => {
            item.productName = this.productMap[item.productId].productName
            item.productIdentiferNum = this.productMap[item.productId].identiferNum
            item.category1 = this.productMap[item.productId].category1
            item.category2 = this.productMap[item.productId].category2
            item.productUnit = this.productMap[item.productId].unit
            item.productPrice = this.productMap[item.productId].unitPrice
          })
          if (this.quote.paymentMethod) {
            this.$set(this.quote, 'paymentMethodArr', this.quote.paymentMethod.split(','))
          } else {
            this.$set(this.quote, 'paymentMethodArr', [])
          }
        }
        this.$emit('load', this.quote)
      }
      this.isLoading = false
    },
    checkDisabled(field) {
      // 审批时，指示事项可以编辑
      if (this.type === 'approve' && (field['disabled'] !== true && field['disabled'] !== 'true')) {
        return false
      } else {
        return true
      }
    },
    getSummaries() {
      const totals = []
      const sum = this.quote.quoteProducts.map(item => isNaN(item.productNum * item.sellingPrice) ? 0 : item.productNum * item.sellingPrice, 2)
      if (sum && sum.length > 0) {
        var total = sum.reduce((sum1, item) => sum1 + item)
        totals[9] = this.numFormat(total, 2)
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
	width: 25%;
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
