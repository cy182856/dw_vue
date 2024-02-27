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
              <div class="title">
                {{ $t('mgt.generalApply.accountNum') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.accountNum" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.accountName') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.accountName" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.applyDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="applyDisplay.applyDate" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.effectPL') }}</span>
          <div v-for="item in effectPL" :key="item.title">
            <div class="input_box">
              <div class="flex1">
                <div class="input">
                  {{ item.title }}
                </div>
              </div>
            </div>
            <div class="input_box">
              <div class="flex1">
                <div class="title" />
                <div class="input reason_chk">
                  <el-checkbox-group
                    v-model="applyDisplay.effectPL"
                  >
                    <el-checkbox
                      v-for="item1 in item.detail"
                      :key="item1.dictId"
                      size="small"
                      :label="item1.dictId"
                      :disabled="disabled"
                    >
                      <div>
                        <span class="chk_span3">
                          {{ item1.dictName }}
                        </span>
                        <span>{{ $t('mgt.generalApply.remark') }}</span>
                        <el-input v-model="item1.remark" :disabled="disabled || applyDisplay.effectPL.indexOf(item1.dictId) === -1" class="el-input4" />
                        <span>{{ $t('mgt.generalApply.originalAmount') }}</span>
                        <el-input v-model="item1.originalAmount" :disabled="disabled || applyDisplay.effectPL.indexOf(item1.dictId) === -1" class="el-input4" />
                        <span>{{ $t('mgt.generalApply.reissueAmount') }}</span>
                        <el-input v-model="item1.reissueAmount" :disabled="disabled || applyDisplay.effectPL.indexOf(item1.dictId) === -1" class="el-input4" />
                        <span>{{ $t('mgt.generalApply.diffAmount') }}</span>
                        <el-input v-model="item1.diffAmount" :disabled="disabled || applyDisplay.effectPL.indexOf(item1.dictId) === -1" class="el-input4" />
                      </div>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.unEffectPL') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title" />
              <div class="input reason_chk">
                <el-checkbox-group
                  v-model="applyDisplay.unEffectPL"
                >
                  <el-checkbox
                    v-for="item in unEffectPL"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                    :disabled="disabled"
                  >
                    <div>
                      <span class="chk_span3">
                        {{ item.dictName }}
                      </span>
                      <span>{{ $t('mgt.generalApply.remark') }}</span>
                      <el-input v-model="item.remark" class="el-input1" :disabled="disabled || applyDisplay.unEffectPL.indexOf(item.dictId) === -1" />
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.reIssueDetail') }} </span>
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
            <el-table-column prop="invoiceDate" :label="$t('mgt.generalApply.invoiceDate')" min-width="110" align="center">
              <template slot-scope="scope">
                <el-date-picker v-if="!disabled" v-model="scope.row.invoiceDate" type="date" value-format="yyyy-MM-dd" />
                <span v-else>{{ scope.row.invoiceDate }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="originalOrderNo" :label="$t('mgt.generalApply.originalOrderNo')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.originalOrderNo" />
                <span v-else>{{ scope.row.originalOrderNo }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="originalInvoiceNo" :label="$t('mgt.generalApply.originalInvoiceNo')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.originalInvoiceNo" />
                <span v-else>{{ scope.row.originalInvoiceNo }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="materielNo" :label="$t('mgt.generalApply.materielNo')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.materielNo" />
                <span v-else>{{ scope.row.materielNo }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="discountRate" :label="$t('mgt.generalApply.discountRate')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.discountRate" to-fixed-num="2" append="%" />
                <span v-else>{{ scope.row.discountRate }}% </span>
              </template>
            </el-table-column>
            <el-table-column prop="originalInvoiceAmount" :label="$t('mgt.generalApply.originalInvoiceAmount')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.originalInvoiceAmount" to-fixed-num="2" />
                <span v-else>{{ scope.row.originalInvoiceAmount | numFormat(2) }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="modifiedInvoiceAmount" :label="$t('mgt.generalApply.modifiedInvoiceAmount')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.modifiedInvoiceAmount" to-fixed-num="2" />
                <span v-else>{{ scope.row.modifiedInvoiceAmount | numFormat(2) }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="specialRequirements" :label="$t('mgt.generalApply.specialRequirements')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.specialRequirements" />
                <span v-else>{{ scope.row.specialRequirements }} </span>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="5">
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
        <el-collapse-item name="6">
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
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
// import applyPop from '@/views/mgt/apply/components/applyPop'
export default {
  name: 'ReIssueInfo',
  components: { UserSelect },
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
      activeNames: ['1', '2', '3', '4', '5', '6'],
      selectUserDialog: false,
      processDialog: false,
      applySelectDialog: false,
      applyType: [
        { value: '1', label: '1：广告费&调查费申请' },
        { value: '2', label: '2：Promoter费用申请' },
        { value: '3', label: '3：样品/试用品申请' },
        { value: '4', label: '4：促销品申请' },
        { value: '5', label: '5：改票申请' },
        { value: '6', label: '6：退货申请' }],
      effectPL: [
        { title: '409-10（Discount & Returns）',
          detail: [{ dictId: '1', dictName: '费用票折', remark: '备注1', originalAmount: '111', reissueAmount: '100', diffAmount: '11' },
            { dictId: '2', dictName: '促销折扣问题', remark: '备注2', originalAmount: '222', reissueAmount: '200', diffAmount: '22' },
            { dictId: '3', dictName: '合同票折变更', remark: '备注3', originalAmount: '333', reissueAmount: '300', diffAmount: '33' },
            { dictId: '4', dictName: '其他', remark: '备注4', originalAmount: '444', reissueAmount: '400', diffAmount: '44' }] },
        { title: '408-15（Extra trade discount for customers）',
          detail: [{ dictId: '5', dictName: '微调', remark: '备注5', originalAmount: '555', reissueAmount: '500', diffAmount: '55' }] }
      ],
      unEffectPL: [{ dictId: '1', dictName: '开票文字信息变更', remark: 'ZA5' },
        { dictId: '2', dictName: '其他', remark: 'ZA5' }
      ]
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
    this.applyDisplay = JSON.parse(JSON.stringify(this.apply))
  },
  methods: {
    // async fetchData() {
    //   this.isLoading = false
    // }
    handleAddDetail() {
      this.applyDisplay.details.push({
        invoiceDate: '',
        originalOrderNo: '',
        originalInvoiceNo: '',
        materielNo: '',
        discountRate: '',
        originalInvoiceAmount: '',
        modifiedInvoiceAmount: '',
        specialRequirements: ''
      })
    },
    handleDeleteDetail(index) {
      this.applyDisplay.details.splice(index, 1)
    }
  }
}
</script>
