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
                      <!-- <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="quote.attrs[col.fieldName]" :row="quote" :disabled="col.disabled" :attributes="col" @data="handleData" @setValue="setValue(quote,field,col.fieldName)" />
                      <form-element v-else :ref="col.fieldName" :key="index3" v-model="quote[col.fieldName]" :disabled="col.disabled" :attributes="col" @data="handleData" @setValue="setValue(quote,field,col.fieldName)" /> -->
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
                <!-- <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index1" v-model="quote.attrs[field.fieldName]" :row="quote" :disabled="field.disabled" :attributes="field" @data="handleData" @setValue="setValue(quote,field,field.fieldName)" />
                <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index1" v-model="quote[field.fieldName]" :row="quote" :disabled="field.disabled" :attributes="field" @data="handleData" @setValue="setValue(quote,field,field.fieldName)" /> -->
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
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
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
        custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
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
                  <el-date-picker v-model="startDate" size="small" type="date" value-format="yyyy-MM-dd" @blur="validator('startDate')" />
                  <span ref="startDate" data-roles="required" :data-value="startDate" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">
                  {{ $t('rebate.rebateledger.endDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="endDate" size="small" type="date" value-format="yyyy-MM-dd" @blur="validator('endDate')" />
                  <span ref="endDate" data-roles="required" :data-value="endDate" class="message" />
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
    </div>
  </div>
</template>
<script>
import { getDetail, getWhCnt, getMoneylist, getProductlist, saveRebateledger } from '@/api/rebate/rebateledger'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { search } from '@/mixins/search-params'
import { dict } from '@/mixins/dict'
// import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'RebateledgerEdit',
  components: { FormElement },
  mixins: [names, formValidator, permission, numFormat, search, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      rebateledger: {
        attrs: {
        },
        ledgerType: '2'
      },
      selectProduct: '',
      whCnt: '0',
      startDate: '',
      endDate: '',
      ledgerPeriodDialog: false,
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: []
        }
      ],
      detailList: [],
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
      recordDate: {},
      lockFlag: ''
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
    const res = await getPageConfig('ledger', 'edit')
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
    }
  },
  methods: {
    async getDetail() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.rebateledger = res.datas.rebateledger
        this.$set(this.rebateledger, 'ledgerType', '2')
        this.$set(this.rebateledger, 'products', res.datas.products)
        this.lockFlag = this.rebateledger.lockFlag
      }
      this.$set(this.rebateledger, 'ledgerPeriod', '1')
      this.isLoading = false
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
    // 自定义期间取消按钮点击事件
    handlePeriodCancelClick() {
      this.ledgerPeriodDialog = false
    },
    // 自定义期间确定按钮点击事件
    handlePeriodOkClick() {
      if (!this.validatorAll()) {
        return false
      }
      if (this.startDate > this.endDate) {
        this.setValidatorMessage('startDate', this.$t('rebate.rebateledger.e0004'))
        return false
      }
      this.$set(this.recordDate, 'isHide', false)
      this.rebateledger.recordDate = this.startDate + this.$t('rebate.rebateledger.to') + this.endDate
      this.ledgerPeriodDialog = false
      this.fetchData()
    },
    async handleSubmit() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await saveRebateledger(this.rebateledger)
        if (res && res.success) {
          this.$router.push('/rebate/rebateledgerList')
          res.messages.message
        }
        this.isLoading = false
      }).catch(_ => {
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
	width: 65%;
	float: left;
	text-align: right;
	padding-right: 50px;
}
.total-content .item .center{
	float: right;
	width: 35%;
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
