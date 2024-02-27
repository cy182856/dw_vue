<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
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
                        v-model="rebateledger.attrs[col.fieldName]"
                        :disabled="col.disabled"
                        :row="rebateledger"
                        :attributes="col"
                        :filter="rebateledger.attrs[col.fieldName]"
                        @data="handleData"
                        @setValue="setValue(rebateledger,item.fields,col.fieldName)"
                      />
                      <form-element
                        v-else
                        :ref="col.fieldName"
                        :key="index3"
                        v-model="rebateledger[col.fieldName]"
                        :disabled="col.disabled"
                        :row="rebateledger"
                        :attributes="col"
                        :filter="rebateledger[col.fieldName]"
                        @data="handleData"
                        @setValue="setValue(rebateledger,item.fields,col.fieldName)"
                      />
                    </div>
                  </el-col>
                </el-row>
                <form-element
                  v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="rebateledger.attrs[field.fieldName]"
                  :disabled="field.disabled"
                  :row="rebateledger"
                  :attributes="field"
                  :filter="rebateledger.attrs[field.fieldName]"
                  @data="handleData"
                  @setValue="setValue(rebateledger,item.fields,field.fieldName)"
                />
                <form-element
                  v-else-if="field.formType !== 'ColumnsLayout'"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="rebateledger[field.fieldName]"
                  :disabled="field.disabled"
                  :row="rebateledger"
                  :attributes="field"
                  :filter="rebateledger[field.fieldName]"
                  @data="handleData"
                  @setValue="setValue(rebateledger,item.fields,field.fieldName)"
                />
              </template>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ rebateledger.ledgerType === '1'?$t('rebate.rebateledger.ledgerType1'):(rebateledger.ledgerType === '2'?$t('rebate.rebateledger.ledgerType2'):$t('rebate.rebateledger.store')) }}</span>
          <div v-if="rebateledger.ledgerType === '3'" class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('rebate.rebateledger.product') }}
              </div>
              <div class="input">
                <el-select v-model="selectProduct" size="small" filterable :clearable="true">
                  <el-option
                    v-for="item in rebateledger.products"
                    :key="item.id"
                    :label="item.productName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('rebate.rebateledger.store') }}
              </div>
              <div class="input">
                <el-input
                  v-model="whCnt"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="search-list-table defaultScroll-table">
            <div ref="tables" style="height: 100%;">
              <el-table
                ref="table"
                v-loading="isLoading"
                :data="detailList"
                stripe
                height="440"
                border
                :header-cell-style="{'text-align':'left'}"
              >
                <el-table-column v-if="rebateledger.ledgerType==='3'" prop="identiferNum" :label="$t('rebate.rebateledger.productNum')" min-width="110" />
                <el-table-column v-if="rebateledger.ledgerType==='3'" prop="productName" :label="$t('rebate.rebateledger.productName')" min-width="130" show-overflow-tooltip />
                <el-table-column :label="$t('rebate.rebateledger.recordTime')" min-width="140">
                  <template slot-scope="scope">
                    {{ scope.row.recordTime }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('rebate.rebateledger.income')">
                  <el-table-column :label="$t('rebate.rebateledger.recordType')" min-width="80">
                    <template slot-scope="scope">
                      {{ (scope.row.ioFlag==='1'?scope.row.recordType:'')|dictName('LedgerRecodeType') }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('rebate.rebateledger.amount')" min-width="100" align="right">
                    <template slot-scope="scope">
                      {{ (scope.row.ioFlag==='1'?scope.row.recordAmt:'')|numFormat(2) }}
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('rebate.rebateledger.payout')">
                  <el-table-column :label="$t('rebate.rebateledger.recordType')" min-width="80">
                    <template slot-scope="scope">
                      {{ (scope.row.ioFlag==='2'?scope.row.recordType:'')|dictName('LedgerRecodeType') }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('rebate.rebateledger.amount')" min-width="100" align="right">
                    <template slot-scope="scope">
                      {{ (scope.row.ioFlag==='2'?scope.row.recordAmt:'')|numFormat(2) }}
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('rebate.rebateledger.accountBalance')" min-width="100" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.accountBalance|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="remark" :label="$t('rebate.rebateledger.remark')" min-width="120" show-overflow-tooltip />
                <el-table-column :label="$t('rebate.rebateledger.userName')" min-width="100">
                  <template slot-scope="scope">
                    {{ scope.row.createBy | userName }}
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
              <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
            </el-pagination>
            <el-pagination class="page-right  page-first" layout="slot">
              <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
            </el-pagination>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 手工记账 -->
        <li class="operation-item" @click="handleManualRecordPopUp">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('rebate.rebateledger.manualRecord') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div class="apply">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag  dialog-drag-heightAuto fixed-search-btn-box"
        top="0"
        :title=" $t('rebate.rebateledger.ledgerPeriod')"
        :visible.sync="ledgerPeriodDialog"
        width="40%"
        height="40%"
      >
        <div style="display: flex;flex-direction: column;height: 50%;">
          <div class="middle-box">
            <div class="input_box">
              <div class="flex2">
                <div class="title must">
                  {{ $t('rebate.rebateledger.startDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="startDate" size="small" type="date" value-format="yyyy-MM-dd" @blur="validator('periodStartDate')" />
                  <span ref="periodStartDate" data-roles="required" :data-value="startDate" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">
                  {{ $t('rebate.rebateledger.endDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="endDate" size="small" type="date" value-format="yyyy-MM-dd" @blur="validator('periodEndDate')" />
                  <span ref="periodEndDate" data-roles="required" :data-value="endDate" class="message" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handlePeriodCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handlePeriodOkClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
        top="0"
        :title="rebateledger.ledgerType==='3'?$t('rebate.rebateledger.manualRecord3'):(rebateledger.ledgerType==='1'?$t('rebate.rebateledger.manualRecord1'):$t('rebate.rebateledger.manualRecord2'))"
        :visible.sync="manualRecordDialog"
        width="40%"
      >
        <div style="display: flex;flex-direction: column;height: 70%;">
          <div class="middle-box">
            <div class="input_box">
              <div class="flex2">
                <div class="title">
                  {{ $t('rebate.rebateledger.ioFlag') }}
                </div>
                <div class="input">
                  <dict-select v-model="rebateStatisticalMoneyDetail.ioFlag" class="input" dict-type-id="IOFlag" :clearable="false" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('rebate.rebateledger.recordType') }}
                </div>
                <div class="input">
                  <dict-select v-model="rebateStatisticalMoneyDetail.recordType" class="input" dict-type-id="LedgerRecodeType" :clearable="false" />
                </div>
              </div>
              <div v-if="rebateledger.ledgerType==='3'" class="flex2">
                <div class="title">
                  {{ $t('rebate.rebateledger.productName') }}
                </div>
                <div class="input">
                  <el-input v-model="rebateStatisticalMoneyDetail.productName" class="input" :disabled="true" />
                </div>
              </div>
              <div v-if="rebateledger.ledgerType==='3'" class="flex2">
                <div class="title">
                  {{ $t('rebate.rebateledger.productId') }}
                </div>
                <div class="input">
                  <el-input v-model="rebateStatisticalMoneyDetail.productId" class="input" :disabled="true" />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">
                  {{ rebateledger.ledgerType==='3'?$t('rebate.rebateledger.ledgerNum'):$t('rebate.rebateledger.ledgerAmount') }}
                </div>
                <div class="input">
                  <milli-input v-model="rebateStatisticalMoneyDetail.recordAmt" :to-fixed-num="rebateledger.ledgerType==='3'?0:2" class="input" clearable @blur="validator('manualRecordAmt')" />
                  <span ref="manualRecordAmt" :data-roles="rebateledger.ledgerType==='3'?'required,positiveInt' : 'required,number'" :data-value="rebateStatisticalMoneyDetail.recordAmt" class="message" />
                </div>
              </div>
              <div class="flex1">
                <div class="title">
                  {{ $t('rebate.rebateledger.remark') }}
                </div>
                <div class="input">
                  <el-input v-model="rebateStatisticalMoneyDetail.remark" type="textarea" class="input" maxlength="1200" show-word-limit clearable />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getDetail, getWhCnt, getMoneylist, getProductlist, manualrecordcash, manualrecordstock } from '@/api/rebate/rebateledger'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { search } from '@/mixins/search-params'
import { numFormat } from '@/mixins/num-format.js'
import { dict } from '@/mixins/dict'
// import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'RebateledgerDetail',
  components: { FormElement },
  mixins: [names, formValidator, permission, search, numFormat, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      manualRecordDialog: false,
      ledgerPeriodDialog: false,
      startDate: '',
      endDate: '',
      rebateledger: {
        attrs: {
        },
        ledgerType: '2'
      },
      selectProduct: '',
      whCnt: '0',
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: []
        }
      ],
      rebateStatisticalMoneyDetail: {
        productId: '',
        ioFlag: '1',
        recordType: '1',
        remark: '',
        recordAmt: ''
      },
      detailList: [],
      currenctProduct: {},
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          id: '',
          ledgerType: '',
          productId: '',
          recordTime: '',
          startDate: '',
          endDate: ''
        }
      },
      recordDate: {}
    }
  },
  computed: {
    id: function() { return this.$route.query.id || this.$route.query.businessKey }
  },
  watch: {
    selectProduct: {
      async handler(newValue, oldValue) {
        if (newValue) {
          const r = await getWhCnt({ statisticalRecordId: this.id, productId: newValue })
          if (r && r.success) {
            this.whCnt = r.datas.whCnt
          }
          const product = this.rebateledger.products.filter(item => item.id === newValue)
          if (product && product[0].id) {
            this.currenctProduct = product[0]
          }
        } else {
          this.whCnt = 0
        }
        this.searchParam.pageNo = 1
        this.fetchData()
      },
      immediate: true,
      deep: true
    },
    'rebateledger.ledgerType': {
      async handler(newValue, oldValue) {
        if (newValue) {
          this.searchParam.pageNo = 1
          this.rebateledger.ledgerPeriod = '1'
          this.fetchData()
        }
      },
      immediate: true,
      deep: true
    },
    'rebateledger.ledgerPeriod': {
      async handler(newValue, oldValue) {
        if (newValue && newValue === '4') {
          this.startDate = ''
          this.endDate = ''
          this.ledgerPeriodDialog = true
        } else {
          this.$set(this.recordDate, 'isHide', true)
          this.searchParam.pageNo = 1
          this.fetchData()
        }
        this.clearErrorMessage()
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    const res = await getPageConfig('ledger', 'detail')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
        this.recordDate = this.pageConfig[0] && this.pageConfig[0].fields[5].columns.filter(item => item.fieldName === 'recordDate')[0]
        this.$set(this.recordDate, 'isHide', true)
      }
    }
    this.activeNames = this.pageConfig.map(item => item.catagoryName)
    this.activeNames.push('2')
    if (this.id) {
      this.getDetail()
    } else {
      this.rebateledger.tenantId = this.$store.getters.userInfo.tenantId
    }
  },
  methods: {
    // 获取详细信息
    async getDetail() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.rebateledger = res.datas.rebateledger
        this.$set(this.rebateledger, 'ledgerType', '2')
        this.$set(this.rebateledger, 'products', res.datas.products)
      }
      this.$set(this.rebateledger, 'ledgerPeriod', '1')
      this.isLoading = false
    },
    // 点击手工记账，弹出操作框
    handleManualRecordPopUp() {
      this.clearErrorMessage()
      // 选择库存的时候，产品必选择
      if (this.rebateledger.ledgerType === '3') {
        if (!this.selectProduct) {
          this.$message({
            type: 'error',
            message: this.$t('rebate.rebateledger.e0003')
          })
          return false
        }
        this.rebateStatisticalMoneyDetail.productName = this.currenctProduct.productName
        this.rebateStatisticalMoneyDetail.productId = this.currenctProduct.id
        this.rebateStatisticalMoneyDetail.identiferNum = this.currenctProduct.identiferNum
      }
      this.rebateStatisticalMoneyDetail.ioFlag = '1'
      this.rebateStatisticalMoneyDetail.recordType = '1'
      this.rebateStatisticalMoneyDetail.recordAmt = ''
      this.rebateStatisticalMoneyDetail.remark = ''
      this.manualRecordDialog = true
    },
    // 获取明细list
    async fetchData() {
      // 明细查询参数设置
      this.searchParam.params.id = this.id
      this.searchParam.params.ledgerType = this.rebateledger.ledgerType
      this.searchParam.params.recordTime = this.rebateledger.ledgerPeriod
      this.searchParam.params.startDate = this.startDate
      this.searchParam.params.endDate = this.endDate
      // 选择库存的时候
      if (this.rebateledger.ledgerType === '3') {
        this.searchParam.params.productId = this.selectProduct
        const r = await getProductlist(this.searchParam)
        if (r && r.success) {
          const { results, pageNo, totalRecord } = r.datas.searchResult
          this.detailList = results
          this.searchParam.pageNo = pageNo
          this.searchParam.totalRecord = totalRecord
        }
        if (this.selectProduct) {
          const r1 = await getWhCnt({ statisticalRecordId: this.id, productId: this.selectProduct })
          if (r1 && r1.success) {
            this.whCnt = r1.datas.whCnt
          }
        }
      } else { // 选择余额的时候
        this.searchParam.params.balanceFlag = this.rebateledger.ledgerType
        const r = await getMoneylist(this.searchParam)
        if (r && r.success) {
          const { results, pageNo, totalRecord } = r.datas.searchResult
          this.detailList = results
          this.searchParam.pageNo = pageNo
          this.searchParam.totalRecord = totalRecord
        }
      }
      this.tableDolayout(this.$refs['table'])
      // this.scroll()
      this.isLoading = false
    },
    // 手工记账取消按钮点击事件
    handleCancelClick() {
      this.manualRecordDialog = false
    },
    // 自定义期间取消按钮点击事件
    handlePeriodCancelClick() {
      this.ledgerPeriodDialog = false
    },
    // 自定义期间确定按钮点击事件
    handlePeriodOkClick() {
      if (!this.validatorAll('period')) {
        return false
      }
      if (this.startDate > this.endDate) {
        this.setValidatorMessage('periodStartDate', this.$t('rebate.rebateledger.e0004'))
        return false
      }
      this.$set(this.recordDate, 'isHide', false)
      this.rebateledger.recordDate = this.startDate + this.$t('rebate.rebateledger.to') + this.endDate
      this.ledgerPeriodDialog = false
      this.fetchData()
    },
    // 手工记账确定按钮点击事件
    async handleOkClick() {
      if (!this.validatorAll('manual')) {
        return false
      }
      if (this.rebateledger.ledgerType === '3') {
        // 记账金额大于库存余额，请重新输入！
        if (this.rebateStatisticalMoneyDetail.ioFlag === '2' && (!this.whCnt || this.whCnt < this.rebateStatisticalMoneyDetail.recordAmt)) {
          this.setValidatorMessage('manualRecordAmt', this.$t('rebate.rebateledger.e0002'))
          return false
        }
      } else {
        if (this.rebateStatisticalMoneyDetail.ioFlag === '2') {
          if (this.rebateledger.ledgerType === '1') {
            // 记账金额大于台账余额，请重新输入！
            if (!this.rebateledger.balanceCash || this.rebateStatisticalMoneyDetail.recordAmt > this.rebateledger.balanceCash) {
              this.setValidatorMessage('manualRecordAmt', this.$t('rebate.rebateledger.e0001'))
              return false
            }
          } else {
            // 记账金额大于台账余额，请重新输入！
            if (!this.rebateledger.balanceDeduct || this.rebateStatisticalMoneyDetail.recordAmt > this.rebateledger.balanceDeduct) {
              this.setValidatorMessage('manualRecordAmt', this.$t('rebate.rebateledger.e0001'))
              return false
            }
          }
        }
      }
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.rebateStatisticalMoneyDetail.statisticalRecordId = this.id
        this.rebateStatisticalMoneyDetail.customerIdentiferNum = this.rebateledger.customerIdentiferNum
        this.rebateStatisticalMoneyDetail.balanceCash = this.rebateledger.balanceCash
        this.rebateStatisticalMoneyDetail.balanceDeduct = this.rebateledger.balanceDeduct
        this.rebateStatisticalMoneyDetail.recordTime = new Date()
        if (this.rebateledger.ledgerType === '3') {
          const res = await manualrecordstock(this.rebateStatisticalMoneyDetail)
          if (res && res.success) {
            console.log(res)
          }
        } else {
          this.rebateStatisticalMoneyDetail.balanceFlag = this.rebateledger.ledgerType
          const res = await manualrecordcash(this.rebateStatisticalMoneyDetail)
          if (res && res.success) {
            console.log(res)
          }
        }
        this.manualRecordDialog = false
        this.getDetail()
        this.fetchData()
      })
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleData(data) {
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
</style>
