<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <!-- <div class="pagetitle">
        <span class="pagespan">{{ $t('mgt.generalApply.identiferNum') }}: {{ apply.identiferNum }} {{ $t('comm.version') }}: {{ apply.version }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.applyName') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.applyName" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.assignedUser') }}
              </div>
              <div class="input">
                <user-select v-model="applyDisplay.assignedUser" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title sub_title">
                {{ $t('mgt.generalApply.accountNum') }}
                <p>{{ $t('mgt.generalApply.saleAccount') }}</p>
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.accountNum" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title sub_title">
                {{ $t('mgt.generalApply.accountName') }}
                <p>{{ $t('mgt.generalApply.saleAccount') }}</p>
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.accountName" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.returnApplyDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="applyDisplay.returnApplyDate" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title sub_title">
                {{ $t('mgt.generalApply.accountNum') }}
                <p>{{ $t('mgt.generalApply.sendAccount') }}</p>
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.sendAccountNum" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title sub_title">
                {{ $t('mgt.generalApply.accountName') }}
                <p>{{ $t('mgt.generalApply.sendAccount') }}</p>
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.sendAccountName" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.hopeReturnDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="applyDisplay.hopeReturnDate" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title sub_title">
                {{ $t('mgt.generalApply.handleMethod') }}
              </div>
              <div class="input">
                <el-checkbox-group
                  v-model="applyDisplay.handleMethod"
                >
                  <el-checkbox
                    v-for="item in handleMethod"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                    :disabled="disabled"
                  >
                    <div>
                      <span class="chk_span3">
                        {{ item.dictName }}
                      </span>
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div v-if="!!applyDisplay.handleMethod && applyDisplay.handleMethod.indexOf('3') > -1" class="flex3">
              <div class="title sub_title">
                {{ $t('mgt.generalApply.taxReturn') }}
              </div>
              <div class="input">
                <el-radio-group
                  v-model="applyDisplay.taxReturn"
                  :disabled="disabled"
                >
                  <el-radio
                    v-for="item in taxReturn"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                  >
                    {{ item.dictName }}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.receiveWarehouse') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.receiveWarehouse" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3_1">
              <div class="title sub_title">
                {{ $t('mgt.generalApply.returnAddress') }}
                <p>{{ $t('mgt.generalApply.sendAccount') }}</p>
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.returnAddress" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.accountContactUser') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.accountContactUser" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.accountContactTele') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.accountContactTele" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.planProvideEvidenceDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="applyDisplay.planProvideEvidenceDate" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.pcsClearSign') }}
              </div>
              <div class="input">
                <dict-radio v-model="applyDisplay.pcsClearSign" dict-type-id="IsNo" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.csSalesList') }}
              </div>
              <div class="input">
                <dict-radio v-model="applyDisplay.csSalesList" dict-type-id="IsNo" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.arPurchaseInvoice') }}
              </div>
              <div class="input">
                <dict-radio v-model="applyDisplay.arPurchaseInvoice" dict-type-id="IsNo" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.returnReason') }}
              </div>
              <div class="input">
                <el-checkbox-group
                  v-model="applyDisplay.returnReason"
                >
                  <el-checkbox
                    v-for="item in returnReason"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                    :disabled="disabled"
                  >
                    <div>
                      <span class="chk_span3">
                        {{ item.dictName }}
                      </span>
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.situationNote') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.situationNote" type="textarea" rows="3" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.returnDetail') }}</span>
          <div v-if="!disabled" class="add_table_row">
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddDetail">
              {{ $t('comm.addLine') }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="applyDisplay.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            show-summary
            :summary-method="getSummaries"
            border
            stripe
          >
            <el-table-column
              v-if="!disabled"
              :label="$t('comm.operation')"
              align="center"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column label="No." width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="productNum" :label="$t('mgt.generalApply.productNum')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.productNum" />
                <span v-else>{{ scope.row.productNum }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="productNameSpec" :label="$t('mgt.generalApply.productNameSpec')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.productNameSpec" />
                <span v-else>{{ scope.row.productNameSpec }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="qty" :label="$t('mgt.generalApply.qty')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.qty" />
                <span v-else>{{ scope.row.qty }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="unitPCS" :label="$t('mgt.generalApply.unitPCS')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.unitPCS" />
                <span v-else>{{ scope.row.unitPCS }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="excludingTaxTradePrice" :label="$t('mgt.generalApply.excludingTaxTradePrice')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.excludingTaxTradePrice" to-fixed-num="2" />
                <span v-else>{{ scope.row.excludingTaxTradePrice | numFormat(2) }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="netReturnDiscount" :label="$t('mgt.generalApply.netReturnDiscount')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.netReturnDiscount" to-fixed-num="2" append="%" />
                <span v-else>{{ scope.row.netReturnDiscount }}% </span>
              </template>
            </el-table-column>
            <el-table-column prop="excludingTaxNetPrice" :label="$t('mgt.generalApply.excludingTaxNetPrice')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.excludingTaxNetPrice" to-fixed-num="2" />
                <span v-else>{{ scope.row.excludingTaxNetPrice | numFormat(2) }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="excludingTaxAmount" :label="$t('mgt.generalApply.excludingTaxAmount')" min-width="100" align="right">
              <template slot-scope="scope">
                <span>{{ (isNaN(scope.row.qty * scope.row.excludingTaxNetPrice)?'':scope.row.qty * scope.row.excludingTaxNetPrice) | numFormat(2) }} </span>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.remark') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.remark') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.remark" type="textarea" rows="3" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.attachmentFile') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.attachmentInfo') }}
              </div>
              <div class="input">
                <attachement v-model="applyDisplay.fileList" func-div="apply" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
// import { getDetail } from '@/api/mgt/apply'
// import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
// import applyPop from '@/views/mgt/apply/components/applyPop'
import UserSelect from '@/components/UserSelect.vue'
import DictRadio from '@/components/DictRadio.vue'
import { numberFormat } from '@/utils/util'
export default {
  name: 'ReturnInfo',
  components: { UserSelect, DictRadio },
  mixins: [names, formValidator, numFormat],
  props: {
    id: {
      type: String,
      required: false,
      default: '1'
    },
    type: {
      type: String,
      default: 'detail'
    },
    disabled: {
      type: Boolean,
      default: true
    },
    apply: {
      type: Object,
      default: (_) => {}
    }
  },
  data() {
    return {
      applyId: this.id,
      applyDisplay: [],
      isLoading: true,
      activeNames: ['1', '2', '3', '4'],
      selectUserDialog: false,
      processDialog: false,
      applySelectDialog: false,
      taxReturn: [{ dictId: '0', dictName: '先拉货' }, { dictId: '2', dictName: '先开红色发票' }],
      applyType: [
        { value: '1', label: '1：广告费&调查费申请' },
        { value: '2', label: '2：Promoter费用申请' },
        { value: '3', label: '3：样品/试用品申请' },
        { value: '4', label: '4：促销品申请' },
        { value: '5', label: '5：改票申请' },
        { value: '6', label: '6：退货申请' }],
      handleMethod: [
        { dictId: '1', dictName: '换货' },
        { dictId: '2', dictName: '增值税发票（回购）' },
        { dictId: '3', dictName: '退税证明' }],
      returnReason: [
        { dictId: '1', dictName: '品质不良HR0' },
        { dictId: '2', dictName: '产品废止HR1' },
        { dictId: '3', dictName: '送错货物HR3' },
        { dictId: '4', dictName: '运输损坏HR4' },
        { dictId: '5', dictName: '品政策退货HR5' },
        { dictId: '6', dictName: '停止交易HR6' },
        { dictId: '7', dictName: '接近过期HR7' },
        { dictId: '8', dictName: '新品更换HR8' },
        { dictId: '9', dictName: '销售不畅HRF' },
        { dictId: '10', dictName: '其他HR' }]
    }
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.applyId = newValue
        this.fetchData()
      }
    },
    applyDisplay: {
      async handler(newValue, oldValue) {
        this.$emit('update', this.applyDisplay)
      }
    }
  },
  created() {
    // if (this.applyId) {
    //   this.fetchData()
    // }
    this.applyDisplay = JSON.parse(JSON.stringify(this.apply))
  },
  methods: {
    // async fetchData() {
    //   this.isLoading = false
    // },
    handleAddDetail() {
      this.applyDisplay.details.push({
        productNum: '',
        productNameSpec: '',
        qty: '',
        unitPCS: '',
        excludingTaxTradePrice: '',
        netReturnDiscount: '',
        excludingTaxNetPrice: ''
      })
    },
    handleDeleteDetail(index, type) {
      this.applyDisplay.details.splice(index, 1)
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
          return
        }
        if (column.property === 'qty') {
          const values = data.map(item => Number(item['qty']))
          sums[index] = numberFormat(values.reduce((values, item) => values + item), 0)
        } else if (column.property === 'excludingTaxAmount') {
          const values = data.map(item => isNaN(item.qty * item.excludingTaxNetPrice) ? 0 : item.qty * item.excludingTaxNetPrice, 2)
          sums[index] = numberFormat(values.reduce((values, item) => values + item), 2)
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}
</script>
