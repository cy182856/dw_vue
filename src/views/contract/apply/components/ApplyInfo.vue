<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('contract.apply.identiferNum') }}: {{ contract.identiferNum }} {{ $t('comm.version') }}: {{ contract.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <!-- <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div v-if="item.elCollapseItemType === 'config'">
            <div class="input_box">
              <template v-for="(field,index2) in item.fields">
                <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                  <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                    <div :class="index3===0?'input_col1':'input_col2'">
                      <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="contract.attrs[col.fieldName]" :disabled="col.disabled" :row="contract" :attributes="col" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                      <form-element v-else :ref="col.fieldName" :key="index3" v-model="contract[col.fieldName]" :disabled="col.disabled" :row="contract" :attributes="col" @setValue="setValue(contract,item.fields,col.fieldName)" />
                    </div>
                  </el-col>
                </el-row>
                <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contract.attrs[field.fieldName]" :disabled="field.disabled" :row="contract" :attributes="field" @setValue="setValue(decision,item.fields,field.fieldName)" />
                <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="contract[field.fieldName]" :disabled="field.disabled" :row="contract" :attributes="field" @setValue="setValue(decision,item.fields,field.fieldName)" />
              </template>
            </div>
          </div> -->
        <!-- <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <div v-if="field.formType === ColumnsLayout" :key="index2">
                <el-row v-for="(f,index3) in field.columns" :key="index3">
                  <el-col :span="f.span" :offset="f.offset">
                    <form-element v-if="f.isAddAttr" :ref="f.fieldName" :key="index3" v-model="contract.attrs[f.fieldName]" :disabled="checkDisabled(f)" :attributes="f" />
                    <form-element v-else :ref="f.fieldName" :key="index3" v-model="contract[f.fieldName]" :disabled="checkDisabled(f)" :attributes="f" />
                  </el-col>
                </el-row>
              </div>
              <div v-else :key="index2">
                <form-element v-if="field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contract.attrs[field.fieldName]" :disabled="checkDisabled(field)" :attributes="field" />
                <form-element v-else :ref="field.fieldName" :key="index2" v-model="contract[field.fieldName]" :disabled="checkDisabled(field)" :attributes="field" />
              </div>
            </template>
          </div> -->
        <!-- </el-collapse-item> -->
        <!-- <el-collapse-item v-for="(item) in detailConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">
            {{ $t(item.catagoryLabelKey) }}
          </span>
          <el-table
            :data="contract.details"
            stripe
            border
          >
            <el-table-column
              v-for="(field,index4) in item.columns"
              :key="index4"
              :label="$t(field.i18nLabelKey)"
              min-width="180"
              width="180"
            >
              <template slot-scope="scope">
                <column-element v-if="field.isAddAttr" :ref="field.fieldName" v-model="scope.row.attrs[field.fieldName]" :disabled="checkDisabled(field)" :attributes="field" />
                <column-element v-else :ref="field.fieldName" v-model="scope.row[field.fieldName]" :disabled="checkDisabled(field)" :attributes="field" />
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item> -->
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.contractType') }}
              </div>
              <div class="input">
                <dict-select v-model="contract.contractType" dict-type-id="ContractType" :disabled="true" />
              </div>
            </div>
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.contractName') }}
              </div>
              <div class="input">
                <el-input v-model="contract.contractName" :disabled="true" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.kaoSafekeepNum') }}
              </div>
              <div class="input">
                <el-input v-model="contract.kaoSafekeepNum" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.contractStartDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="contract.contractStartDate" size="small" type="date" value-format="yyyy-MM-dd" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.contractEndDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="contract.contractEndDate" size="small" type="date" value-format="yyyy-MM-dd" :disabled="true" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.discussUser') }}
              </div>
              <div class="input">
                <user-select v-model="contract.discussUser" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.discussUserDepart') }}
              </div>
              <div class="input">
                <el-select v-model="contract.discussUserDepart" :disabled="true">
                  <el-option
                    v-for="item in department"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.discussUserNum') }}
              </div>
              <div class="input">
                <el-input v-model="contract.discussUserNum" :disabled="true" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.monitorUser') }}
              </div>
              <div class="input">
                <user-select v-model="contract.monitorUser" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.monitorUserDepart') }}
              </div>
              <div class="input">
                <el-select v-model="contract.monitorUserDepart" :disabled="true">
                  <el-option
                    v-for="item in department"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.monitorUserNum') }}
              </div>
              <div class="input">
                <el-input v-model="contract.monitorUserNum" :disabled="true" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('contract.apply.contractContent') }}
              </div>
              <div class="input">
                <el-input v-model="contract.contractContent" type="textarea" :rows="5" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t('contract.apply.contractSideInfo') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.accountType') }}
              </div>
              <div class="input">
                <dict-select v-model="contract.accountType" dict-type-id="AccountType" :disabled="true" />
              </div>
            </div>
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.accountName') }}
              </div>
              <div class="input">
                <rel-func-select v-model="contract.accountName" rel-func="account" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.businessLicence') }}
              </div>
              <div class="input">
                <el-input v-model="contract.businessLicence" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.financialPayerNum') }}
              </div>
              <div class="input">
                <el-input v-model="contract.financialPayerNum" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.orgCodeCertificate') }}
              </div>
              <div class="input">
                <el-input v-model="contract.orgCodeCertificate" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.sapSoldToNum') }}
              </div>
              <div class="input">
                <el-input v-model="contract.sapSoldToNum" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.regAdDetail') }}
              </div>
              <div class="input">
                <el-input v-model="contract.regAdDetail" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.legalPerson') }}
              </div>
              <div class="input">
                <el-input v-model="contract.legalPerson" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.officeAdDetail') }}
              </div>
              <div class="input">
                <el-input v-model="contract.officeAdDetail" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.legalPersonCertificate') }}
              </div>
              <div class="input">
                <el-input v-model="contract.legalPersonCertificate" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.officeTelephone') }}
              </div>
              <div class="input">
                <el-input v-model="contract.officeTelephone" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.fax') }}
              </div>
              <div class="input">
                <el-input v-model="contract.fax" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.zip') }}
              </div>
              <div class="input">
                <el-input v-model="contract.zip" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('contract.apply.remark') }}
              </div>
              <div class="input">
                <el-input v-model="contract.accountRemark" type="textarea" rows="3" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{ $t('contract.apply.businessAgreement') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.businessScope') }}
              </div>
              <div class="input">
                <el-select v-model="contract.businessScope" :disabled="true">
                  <el-option
                    v-for="item in businessScope"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.tradeItem') }}
              </div>
              <div class="input">
                <el-select v-model="contract.tradeItem" :disabled="true">
                  <el-option
                    v-for="item in tradeItem"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.priceComparisonConclusion') }}
              </div>
              <div class="input">
                <el-input v-model="contract.priceComparisonConclusion" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.settlementCondition') }}
              </div>
              <div class="input">
                <el-select v-model="contract.settlementCondition" :disabled="true">
                  <el-option
                    v-for="item in settlementCondition"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.settlementMethod') }}
              </div>
              <div class="input">
                <el-select v-model="contract.settlementMethod" :disabled="true">
                  <el-option
                    v-for="item in settlementMethod"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.settlementAgreement') }}
              </div>
              <div class="input">
                <el-select v-model="contract.settlementAgreement" :disabled="true">
                  <el-option
                    v-for="item in settlementAgreement"
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
                {{ $t('contract.apply.majorAgreement') }}
              </div>
              <div class="input">
                <el-input v-model="contract.majorAgreement" type="textarea" rows="3" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{ $t('contract.apply.contractFeeTD') }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('contract.apply.tradeDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.tradeDis" append="%" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('contract.apply.noReturnDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.noReturnDis" append="%" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('contract.apply.paymentDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.paymentDis" append="%" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('contract.apply.concentrateDistributeDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.concentrateDistributeDis" append="%" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{ $t('contract.apply.contractFeeBT') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.domesticSaleRebate') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.domesticSaleRebate" append="%" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.spd') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.spd" append="%" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.ticketDeduPoints') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.ticketDeduPoints" append="%" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.isIncludedTax') }}
              </div>
              <div class="input">
                <dict-radio v-model="contract.isIncludedTax" class="input" dict-type-id="IsNo" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.isRedTicket') }}
              </div>
              <div class="input">
                <dict-radio v-model="contract.isRedTicket" class="input" dict-type-id="IsNo" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.calcRebate') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.calcRebate" append="%" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.internationalRebate') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.internationalRebate" append="%" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.basicTransactionDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.basicTransactionDis" append="%" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <span slot="title" class="collapse-title">{{ $t('contract.apply.contractFeeCD') }}</span>
          <el-table
            ref="table"
            :data="contract.feeCDList"
            border
            stripe
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column :label="$t('contract.apply.no')" width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="feeCode" :label="$t('contract.apply.feeCode')" min-width="150" align="center" />
            <el-table-column prop="feeName" :label="$t('contract.apply.feeName')" min-width="180" align="center" />
            <el-table-column prop="ratio" :label="$t('contract.apply.ratio')" align="right" min-width="150">
              <template slot-scope="scope">
                {{ scope.row.ratio + '%' }}
              </template>
            </el-table-column>
            <el-table-column prop="amount" :label="$t('contract.apply.amount')" align="right" min-width="150">
              <template slot-scope="scope">
                {{ scope.row.amount |numFormat(2) }}
              </template>
            </el-table-column>

            <el-table-column prop="remark" :label="$t('contract.apply.remark')" min-width="250" align="center" />
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="7">
          <span slot="title" class="collapse-title">{{ $t('contract.apply.contractFeeOE') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.concentrateDistributeOE') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.concentrateDistributeOE" append="%" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.noReturnDisOE') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.noReturnDisOE" append="%" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('contract.apply.lackDeliveryFineRemark') }}
              </div>
              <div class="input">
                <el-input v-model="contract.lackDeliveryFineRemark" type="textarea" rows="3" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="8">
          <span slot="title" class="collapse-title">{{ $t('contract.apply.remark') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('contract.apply.remark') }}
              </div>
              <div class="input">
                <el-input v-model="contract.remark" type="textarea" :rows="3" height="200px" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="9">
          <span slot="title" class="collapse-title">{{ $t('comm.attachmentFile') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('comm.attachmentInfo') }}
              </div>
              <div class="input">
                <attachement v-model="contract.fileList" func-div="contract" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
// import { getDetail } from '@/api/mgt/contract'
// import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
// import ColumnElement from '@/components/ColumnElement.vue'
import { names } from '@/mixins/names.js'
// import ContractPop from '@/views/mgt/contract/components/ContractPop'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'ApplyEdit',
  components: { UserSelect, RelFuncSelect },
  mixins: [names, formValidator, numFormat],
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
      contractId: this.id,
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      contractType: '',
      contract: {
        attrs: {},
        details: [],
        fileList: [],
        feeCDList: []
      },
      selectUserDialog: false,
      processDialog: false,
      department: [{
        value: '2',
        label: 'KA部'
      }, {
        value: '3',
        label: '日系客户部'
      }, {
        value: '1',
        label: 'EC&新零售部'
      }, {
        value: '4',
        label: '华东地区'
      }, {
        value: '5',
        label: '华南地区'
      }, {
        value: '6',
        label: '西南地区'
      }, {
        value: '7',
        label: '华北地区'
      }],
      businessScope: [{
        value: '1',
        label: '研发'
      }, {
        value: '2',
        label: '测试'
      }],
      tradeItem: [{
        value: '1',
        label: '研发NN项目'
      }, {
        value: '2',
        label: '测试NN项目'
      }],
      settlementCondition: [{
        value: '1',
        label: '产品交付后10天内'
      }, {
        value: '2',
        label: '产品交付后30天内'
      }, {
        value: '3',
        label: '产品交付后30天内'
      }],
      settlementMethod: [{
        value: '1',
        label: '现金'
      }, {
        value: '2',
        label: '转账'
      }],
      settlementAgreement: [{
        value: '1',
        label: '结算约定1'
      }, {
        value: '2',
        label: '结算约定2'
      }]
      // pageConfig: [
      //   {
      //     catagoryName: '1',
      //     catagoryLabelKey: 'comm.essentialInformation',
      //     fields: [
      //       {
      //         fieldName: 'contractType',
      //         i18nLabelKey: 'mgt.contract.contractType',
      //         formType: 'DictSelect',
      //         dictTypeId: 'ContractType',
      //         dataRoles: 'required'
      //       }
      //     ]
      //   }
      // ],
      // detailConfig: []
    }
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.contractId = newValue
        this.fetchData()
      }
    },
    contract: {
      async handler(newValue, oldValue) {
        // if (this.type === 'approve') {
        //   const instructItem = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'instructItem')[0]
        //   if (instructItem && newValue && newValue.attrs.decision === '1') {
        //     this.$set(instructItem, 'disabled', false)
        //   } else if (instructItem && newValue && newValue.attrs.decision === '0') {
        //     this.contract.instructItem = ''
        //     this.$set(instructItem, 'disabled', true)
        //   }
        // }
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    // const res = await getPageConfig('contract', 'detail')
    // if (res && res.success) {
    //   if (res.datas.pageConfig) {
    //     this.pageConfig = JSON.parse(res.datas.pageConfig)
    //   }
    // }

    // this.activeNames = this.pageConfig.map(item => item.catagoryName)

    if (this.contractId) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      // const res = await getDetail(this.contractId)
      // if (res && res.success) {
      //   this.contract = res.datas.contract

      //   this.$emit('load', this.contract)
      // }
      this.contract.workflowFlag = '0'
      this.contract.lastFlag = 1
      this.contract.contractType = '01'
      this.contract.contractName = '采购大件合同'
      this.contract.kaoSafekeepNum = 'KAO0001'
      this.contract.contractStartDate = '2021-05-01'
      this.contract.contractEndDate = '2022-04-30'
      this.contract.discussUser = '小李'
      this.contract.discussUserDepart = '采购部'

      this.contract.discussUserNum = '1000001'
      this.contract.monitorUser = '李丽'
      this.contract.monitorUserDepart = '销售部'
      this.contract.monitorUserNum = '1000002'

      this.contract.contractContent = '采购大件合同，采购物品如下：----------------------------'
      this.contract.accountType = '01'
      this.contract.accountName = '上海大雅'
      this.contract.businessLicence = '23423-sdf-3234345345'
      this.contract.financialPayerNum = 'FP00001'

      this.contract.orgCodeCertificate = 'ORG1000001'
      this.contract.sapSoldToNum = 'CUS20120003'
      this.contract.regAdDetail = '上海浦东新区'
      this.contract.legalPerson = '王武'
      this.contract.officeAdDetail = '上海青浦'

      this.contract.legalPersonCertificate = '1320983928323949299'
      this.contract.officeTelephone = '18798785473'
      this.contract.fax = '021980'
      this.contract.zip = '010232'
      this.contract.accountRemark = '没有特别备注'
      this.contract.businessScope = '2'
      this.contract.tradeItem = '2'
      this.contract.priceComparisonConclusion = 'OK'
      this.contract.settlementCondition = '3'
      this.contract.settlementMethod = '1'
      this.contract.settlementAgreement = '1'
      this.contract.majorAgreement = '没有没有'
      this.contract.tradeDis = '5'
      this.contract.noReturnDis = '4'
      this.contract.paymentDis = '3'
      this.contract.concentrateDistributeDis = '4'
      this.contract.domesticSaleRebate = '2'
      this.contract.spd = '4'
      this.contract.ticketDeduPoints = '3'
      this.contract.isIncludedTax = '1'
      this.contract.isRedTicket = '0'
      this.contract.calcRebate = ''
      this.contract.internationalRebate = '4'
      this.contract.basicTransactionDis = '5'
      this.contract.concentrateDistributeOE = '3'
      this.contract.noReturnDisOE = '4'
      this.contract.lackDeliveryFineRemark = '缺送货罚款百分之3'
      this.contract.remark = '公平、公正'

      this.contract.feeCDList.push({
        feeName: '节庆赞助费',
        feeCode: '820-0500S1',
        ratio: '5',
        amount: '123123',
        remark: '节庆赞助费是否'
      })
      this.contract.feeCDList.push({
        feeName: 'POS数据费',
        feeCode: '820-0800S1',
        ratio: '4',
        amount: '342432',
        remark: 'POS数据费'
      })
      this.contract.feeCDList.push({
        feeName: 'BDF商业发展基金',
        feeCode: '820-2200S1',
        ratio: '1',
        amount: '333',
        remark: 'BDF商业发展基金'
      })
      this.contract.feeCDList.push({
        feeName: '新店开业费',
        feeCode: '820-0400S1',
        ratio: '15',
        amount: '43453',
        remark: '新店开业费'
      })
      this.contract.feeCDList.push({
        feeName: '新设战略费',
        feeCode: '820-0200S1',
        ratio: '25',
        amount: '455343.65',
        remark: '新设战略费'
      })
      this.contract.feeCDList.push({
        feeName: 'EC特别促销战略费',
        feeCode: '820-1100S1',
        ratio: '9',
        amount: '23432.34',
        remark: 'EC特别促销战略费'
      })
      this.$emit('load', this.contract)
      this.isLoading = false
    }
    // checkDisabled(field) {
    //   // 审批时，指示事项可以编辑
    //   if (this.type === 'approve' && (field['disabled'] !== true && field['disabled'] !== 'true')) {
    //     return false
    //   } else {
    //     return true
    //   }
    // }
  }
}
</script>

