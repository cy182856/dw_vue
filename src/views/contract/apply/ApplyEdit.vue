<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="contract.identiferNum" class="pagespan">{{ $t('contract.apply.identiferNum') }} : {{ contract.identiferNum }}</span>
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
              <form-element v-if="field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contract.attrs[field.fieldName]" :disabled="field.disabled" :attributes="field" />
              <form-element v-else :ref="field.fieldName" :key="index2" v-model="contract[field.fieldName]" :disabled="field.disabled" :attributes="field" />
            </template>
          </div> -->
        <!-- </el-collapse-item> -->
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.contractType') }}
              </div>
              <div class="input">
                <dict-select v-model="contract.contractType" dict-type-id="ContractType" clearable />
              </div>
            </div>
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.contractName') }}
              </div>
              <div class="input">
                <el-input v-model="contract.contractName" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.kaoSafekeepNum') }}
              </div>
              <div class="input">
                <el-input v-model="contract.kaoSafekeepNum" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.contractStartDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="contract.contractStartDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.contractEndDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="contract.contractEndDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.discussUser') }}
              </div>
              <div class="input">
                <user-select v-model="contract.discussUser" @data="handleDiscussUser" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.discussUserDepart') }}
              </div>
              <div class="input">
                <el-input v-model="contract.discussUserDepart" :disabled="true" />
                <!-- <el-select v-model="contract.discussUserDepart" placeholder="请选择">
                  <el-option
                    v-for="item in department"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
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
                <user-select v-model="contract.monitorUser" @data="handleMonitorUser" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.monitorUserDepart') }}
              </div>
              <div class="input">
                <el-input v-model="contract.monitorUserDepart" :disabled="true" />
                <!-- <el-select v-model="contract.monitorUserDepart" placeholder="请选择">
                  <el-option
                    v-for="item in department"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
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
                <el-input v-model="contract.contractContent" type="textarea" :rows="5" />
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
                <dict-select v-model="contract.accountType" dict-type-id="AccountType" clearable />
              </div>
            </div>
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.accountName') }}
              </div>
              <div class="input">
                <rel-func-select v-model="contract.accountName" rel-func="account" @data="handleAccountSelected" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.businessLicence') }}
              </div>
              <div class="input">
                <el-input v-model="contract.businessLicence" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.financialPayerNum') }}
              </div>
              <div class="input">
                <el-input v-model="contract.financialPayerNum" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.orgCodeCertificate') }}
              </div>
              <div class="input">
                <el-input v-model="contract.orgCodeCertificate" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.sapSoldToNum') }}
              </div>
              <div class="input">
                <el-input v-model="contract.sapSoldToNum" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.regAdDetail') }}
              </div>
              <div class="input">
                <el-input v-model="contract.regAdDetail" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.legalPerson') }}
              </div>
              <div class="input">
                <el-input v-model="contract.legalPerson" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('contract.apply.officeAdDetail') }}
              </div>
              <div class="input">
                <el-input v-model="contract.officeAdDetail" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.legalPersonCertificate') }}
              </div>
              <div class="input">
                <el-input v-model="contract.legalPersonCertificate" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.officeTelephone') }}
              </div>
              <div class="input">
                <el-input v-model="contract.officeTelephone" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.fax') }}
              </div>
              <div class="input">
                <el-input v-model="contract.fax" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.zip') }}
              </div>
              <div class="input">
                <el-input v-model="contract.zip" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('contract.apply.remark') }}
              </div>
              <div class="input">
                <el-input v-model="contract.accountRemark" type="textarea" rows="3" />
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
                <el-select v-model="contract.businessScope" placeholder="请选择">
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
                <el-select v-model="contract.tradeItem" placeholder="请选择">
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
                <el-input v-model="contract.priceComparisonConclusion" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.settlementCondition') }}
              </div>
              <div class="input">
                <el-select v-model="contract.settlementCondition" placeholder="请选择">
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
                <el-select v-model="contract.settlementMethod" placeholder="请选择">
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
                <el-select v-model="contract.settlementAgreement" placeholder="请选择">
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
                <el-input v-model="contract.majorAgreement" type="textarea" rows="3" />
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
                <milli-input v-model="contract.tradeDis" append="%" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('contract.apply.noReturnDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.noReturnDis" append="%" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('contract.apply.paymentDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.paymentDis" append="%" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('contract.apply.concentrateDistributeDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.concentrateDistributeDis" append="%" />
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
                <milli-input v-model="contract.domesticSaleRebate" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.spd') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.spd" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.ticketDeduPoints') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.ticketDeduPoints" append="%" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.isIncludedTax') }}
              </div>
              <div class="input">
                <dict-radio v-model="contract.isIncludedTax" class="input" dict-type-id="IsNo" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.isRedTicket') }}
              </div>
              <div class="input">
                <dict-radio v-model="contract.isRedTicket" class="input" dict-type-id="IsNo" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.calcRebate') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.calcRebate" append="%" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.internationalRebate') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.internationalRebate" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.basicTransactionDis') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.basicTransactionDis" append="%" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <span slot="title" class="collapse-title">{{ $t('contract.apply.contractFeeCD') }}</span>
          <div class="add_table_row">
            <el-button class="editbtn" size="mini" @click.stop="handleAddDetail()">
              {{ $t('comm.addLine') }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="contract.feeCDList"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column
              :label="$t('comm.operation')"
              min-width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('contract.apply.no')" width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="feeName" :label="$t('contract.apply.feeName')" min-width="180" />
            <el-table-column prop="feeCode" :label="$t('contract.apply.feeCode')" min-width="150" />
            <el-table-column prop="ratio" :label="$t('contract.apply.ratio')" min-width="150" />
            <el-table-column prop="amount" :label="$t('contract.apply.amount')" min-width="150" />
            <el-table-column prop="remark" :label="$t('contract.apply.remark')" min-width="250" /> -->
            <el-table-column prop="feeCode" :label="$t('contract.apply.feeCode')" min-width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.feeCode" />
              </template>
            </el-table-column>
            <el-table-column prop="feeName" :label="$t('contract.apply.feeName')" min-width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.feeName" />
              </template>
            </el-table-column>
            <el-table-column prop="ratio" :label="$t('contract.apply.ratio')" min-width="150">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.ratio" append="%" />
              </template>
            </el-table-column>
            <el-table-column prop="amount" :label="$t('contract.apply.amount')" min-width="150">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.amount" to-fixed-num="2" />
              </template>
            </el-table-column>
            <el-table-column prop="remark" :label="$t('contract.apply.remark')" min-width="250">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" />
              </template>
            </el-table-column>
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
                <milli-input v-model="contract.concentrateDistributeOE" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('contract.apply.noReturnDisOE') }}
              </div>
              <div class="input">
                <milli-input v-model="contract.noReturnDisOE" append="%" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('contract.apply.lackDeliveryFineRemark') }}
              </div>
              <div class="input">
                <el-input v-model="contract.lackDeliveryFineRemark" type="textarea" rows="3" />
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
                <el-input v-model="contract.remark" type="textarea" :rows="3" height="200px" />
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
                <attachement v-model="fileList" func-div="contract" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li class="operation-item" @click="hasPermission('contractEditBtn')? handleSubmit('editSave'):handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
        </li>
        <li class="operation-item" @click="handleSubmit('submit')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontijiao" /></span>
          <span class="operation-text">{{ $t('comm.submit') }}</span>
        </li>
        <!-- 取消申请 -->
        <li v-if="taskId" class="operation-item" @click="handleCancel">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.processCancel') }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div v-if="processDialog">
      <process-detail :key="processInstId" :title="$t('component.taskApprove.detailedProcess') + processInstId" :is-show="processDialog" :process-inst-id="processInstId" @close="processDialog=false" />
    </div>
  </div>
</template>
<script>
// import { getDetail, submitContract, editSaveContract, cancelProcess } from '@/api/mgt/contract'
// import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import UserSelect from '@/components/UserSelect.vue'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'ApplyEdit',
  components: { UserSelect, RelFuncSelect },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      fileList: [],
      contract: {
        // contractStatus: '01',
        feeCDList: [],
        attrs: {
          // decision: '0',
          // effectSecurity: '0'
        },
        details: []
      },
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
      //     fields: []
      //   }
      // ]
    }
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    companyOrgId: function() { return this.$store.getters.userInfo.orgSeqNo.split('.')[1] }
  },
  watch: {
    contract: {
      handler(newValue, oldValue) {
        // const noLimitConfig = this.pageConfig[0] && this.pageConfig[0].fields[3] && this.pageConfig[0].fields[3].columns.filter(item => item.fieldName === 'noLimit')[0]
        // const contractEndDateConfig = this.pageConfig[0] && this.pageConfig[0].fields[3] && this.pageConfig[0].fields[3].columns.filter(item => item.fieldName === 'contractEndDate')[0]
        // if (noLimitConfig && newValue && newValue.attrs.noLimit === '1') {
        //   this.$set(contractEndDateConfig, 'disabled', true)
        //   this.$set(this.contract, 'contractEndDate', '2999-12-31')
        // } else if (noLimitConfig && newValue && newValue.attrs.noLimit === '0') {
        //   this.$set(contractEndDateConfig, 'disabled', false)
        //   if (this.contract.contractEndDate === '2999-12-31') {
        //     this.$set(this.contract, 'contractEndDate', null)
        //   }
        // }
        // const _this = this
        // if (this.pageConfig[0].fields.length > 1) {
        //   this.pageConfig[0].fields.forEach(function(item) {
        //     item.columns.forEach(function(item1) {
        //       if (item1.fieldName === 'extendLimit' && newValue && newValue.automaticUpdate === '1') {
        //         _this.$set(item1, 'disabled', false)
        //         _this.$set(item1, 'dataRoles', 'positiveInt,required')
        //       } else if (item1.fieldName === 'extendLimit' && newValue && newValue.automaticUpdate === '0') {
        //         _this.contract.attrs.extendLimit = ''
        //         _this.$set(item1, 'disabled', true)
        //         _this.$set(item1, 'dataRoles', 'positiveInt')
        //       }
        //       if (item1.fieldName === 'instructItem' && newValue && newValue.attrs.decision === '1') {
        //         _this.$set(item1, 'disabled', false)
        //       } else if (item1.fieldName === 'instructItem' && newValue && newValue.attrs.decision === '0') {
        //         _this.contract.instructItem = ''
        //         _this.$set(item1, 'disabled', true)
        //       }
        //       if (item1.fieldName === 'effectSecurityLimit' && newValue && newValue.attrs.effectSecurity === '1') {
        //         _this.$set(item1, 'disabled', false)
        //         _this.$set(item1, 'dataRoles', 'positiveInt,required')
        //       } else if (item1.fieldName === 'effectSecurityLimit' && newValue && newValue.attrs.effectSecurity === '0') {
        //         _this.contract.attrs.effectSecurityLimit = ''
        //         _this.$set(item1, 'disabled', true)
        //         _this.$set(item1, 'dataRoles', 'positiveInt')
        //       }
        //     })
        //   })
        // }
        // const effectSecurityLimit = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'effectSecurityLimit')[0]
        // if (effectSecurityLimit && newValue && newValue.attrs.effectSecurity === '1') {
        //   this.$set(effectSecurityLimit, 'disabled', false)
        //   this.$set(effectSecurityLimit, 'dataRoles', 'positiveInt,required')
        // } else if (effectSecurityLimit && newValue && newValue.attrs.effectSecurity === '0') {
        //   this.contract.attrs.effectSecurityLimit = ''
        //   this.$set(effectSecurityLimit, 'disabled', true)
        //   this.$set(effectSecurityLimit, 'dataRoles', 'positiveInt')
        // }
        // const extendLimit = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'extendLimit')[0]
        // if (extendLimit && newValue && newValue.automaticUpdate === '1') {
        //   this.$set(extendLimit, 'disabled', false)
        //   this.$set(extendLimit, 'dataRoles', 'positiveInt,required')
        // } else if (extendLimit && newValue && newValue.automaticUpdate === '0') {
        //   this.contract.attrs.extendLimit = ''
        //   this.$set(extendLimit, 'disabled', true)
        //   this.$set(extendLimit, 'dataRoles', 'positiveInt')
        // }
        // const instructItem = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'instructItem')[0]
        // if (instructItem && newValue && newValue.attrs.decision === '1') {
        //   this.$set(instructItem, 'disabled', false)
        // } else if (instructItem && newValue && newValue.attrs.decision === '0') {
        //   this.contract.instructItem = ''
        //   this.$set(instructItem, 'disabled', true)
        // }
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    // const res = await getPageConfig('contract', 'edit')
    // if (res && res.success) {
    //   if (res.datas.pageConfig) {
    //     this.pageConfig = JSON.parse(res.datas.pageConfig)
    //     const _this = this
    //     this.pageConfig[0] && this.pageConfig[0].fields.forEach(function(item) {
    //       item.columns.forEach(function(item1) {
    //         if (item1.fieldName === 'col01') {
    //           if (_this.isRoleSalary) { // 薪资角色：非人事、一般人事、薪资评定
    //             _this.$set(item1, 'filter', '3')
    //           } else if (_this.isRoleHrManager && !_this.isRoleSalary) { // 人事经理角色：非人事、一般人事
    //             _this.$set(item1, 'filter', '2')
    //           } else { // 担当：非人事
    //             _this.$set(item1, 'filter', '1')
    //           }
    //         }
    //         if (item1.fieldName === 'decContactPerson') {
    //           _this.$set(item1, 'rootOrgId', _this.$store.getters.userInfo.orgSeqNo.split('.')[1])
    //         }
    //       })
    //     })
    //   }
    // }
    // this.activeNames = this.pageConfig.map(item => item.catagoryName)
    if (this.id) {
      this.fetchData()
    } else {
      // this.contract.assignedUser = this.$store.getters.userInfo.userId
      // this.contract.assignedOrg = this.companyOrgId
      this.contract.discussUser = this.$store.getters.userInfo.userId
      this.contract.discussUserNum = this.$store.getters.userInfo.userId
      this.contract.discussUserDepart = '采购部'
    }
  },
  methods: {
    async fetchData() {
      // const res = await getDetail(this.id)
      // if (res && res.success) {
      //   this.contract = res.datas.contract
      // }
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

      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.contract.id = ''
        this.contract.identiferNum = ''
        this.contract.exclusiveKey = ''
        this.contract.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.contract.assignedUser = this.$store.getters.userInfo.userId
      }
      this.isLoading = false
    },
    handleSubmit(submitType) {
      for (const ref in this.$refs) {
        if (this.$refs[ref] && this.$refs[ref].length > 0) {
          this.$refs[ref][0].validatorAll()
          if (!this.$refs[ref][0].validatorState) return false
        }
      }
      let tipmsg = ''
      if (this.companyOrgId !== this.contract.assignedOrg) {
        tipmsg = this.$t('comm.tip17')
      } else {
        tipmsg = this.$t('comm.tip9')
      }
      this.$confirm(tipmsg, this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.contract.taskId = this.taskId
        this.contract.processInstId = this.processInstId
        this.contract.submitType = submitType
        this.contract.assignedOrg = this.companyOrgId
        // let res
        // if (submitType === 'editSave') {
        //   res = await editSaveContract(this.contract)
        // } else {
        //   res = await submitContract(this.contract)
        // }
        // if (res && res.success) {
        //   this.$router.push('/mgt/contractList')
        // }
        this.$router.push('/mgt/contractList')
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
        // const res = await cancelProcess(this.taskId)
        // if (res && res.success) {
        //   this.$router.push('/mgt/contractList')
        // }
        this.$router.push('/mgt/contractList')
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
    handleAddDetail() {
      this.contract.feeCDList.push({})
    },
    handleDeleteDetail(index) {
      this.contract.feeCDList.splice(index, 1)
    },
    handleMonitorUser(data) {
      this.contract.monitorUserNum = data.id
      this.contract.monitorUserDepart = '销售部'
    },
    handleDiscussUser(data) {
      this.contract.discussUserNum = data.id
      this.contract.discussUserDepart = '采购部'
    },
    handleAccountSelected(data) {
      if (data && data.length > 0) {
        this.contract.businessLicence = data[0].regBusinessLicence
        this.contract.financialPayerNum = data[0].financialPayerNum
        this.contract.orgCodeCertificate = data[0].regOrgCodeCertificate
        this.contract.sapSoldToNum = data[0].sapSoldToNum
        this.contract.regAdDetail = data[0].regAdDetail
        this.contract.legalPerson = data[0].regLegalPerson
        this.contract.officeAdDetail = data[0].address
        this.contract.legalPersonCertificate = data[0].legalPersonCertificate
        this.contract.officeTelephone = data[0].telephone
        this.contract.fax = data[0].fax
        this.contract.zip = data[0].zip
      }
    }
  }
}
</script>
