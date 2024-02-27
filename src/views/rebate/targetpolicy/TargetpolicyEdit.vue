<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail" style="height:100%">
      <div class="pagetitle">
        <span v-if="targetPolicy.identiferNum" class="pagespan">{{ $t('rebate.targetPolicy.identiferNum') }} : {{ targetPolicy.identiferNum }}</span>
      </div>
      <div class="createBox">
        <el-tabs v-model="editableTabsValue" type="card" style="min-height: 480px;">
          <el-tab-pane v-if="tabIndex>=1" :label="$t('comm.essentialInformation')" name="1" class="object">
            <h4>
              {{ $t('rebate.targetPolicy.rebatePolicyInfo') }}
              <el-button :disabled="tabIndex===1" class="editbtn editbtn-margin" size="mini" @click="handleRebateEdit(1, $t('rebate.targetPolicy.tip1'))">
                {{ $t('comm.edit') }}
              </el-button>
            </h4>
            <div class="input_box">
              <div class="flex3">
                <div class="title must">
                  {{ $t('rebate.targetPolicy.policyName') }}
                </div>
                <div class="input">
                  <el-input v-model="targetPolicy.policyName" size="small" maxlength="100" @blur="validator('policyName')" />
                  <span ref="policyName" data-roles="required" :data-value="targetPolicy.policyName" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title must">
                  {{ $t('rebate.targetPolicy.strategyType') }}
                </div>
                <div class="input">
                  <dict-select v-model="targetPolicy.strategyType" :disabled="tabIndex>1" class="input" dict-type-id="StrategyType" @change="(value) => {validator('strategyType', value)}" />
                  <span ref="strategyType" data-roles="required" :data-value="targetPolicy.strategyType" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title must">
                  {{ $t('rebate.targetPolicy.currency') }}
                </div>
                <div class="input">
                  <dict-select v-model="targetPolicy.currency" :disabled="tabIndex>1" class="input" dict-type-id="Currency" @change="(value) => {validator('currency', value)}" />
                  <span ref="currency" data-roles="required" :data-value="targetPolicy.currency" class="message" />
                </div>
              </div>
              <div class="flex1">
                <div class="title">
                  {{ $t('rebate.targetPolicy.useFlag') }}
                </div>
                <div class="input">
                  <el-switch
                    v-model="targetPolicy.useFlag"
                    active-value="1"
                    inactive-value="0"
                  />
                </div>
              </div>
              <div class="flex1">
                <div class="title">
                  {{ $t('rebate.targetPolicy.remark') }}
                </div>
                <div class="input">
                  <el-input v-model="targetPolicy.remark" size="small" type="textarea" rows="3" show-word-limit maxlength="1200" />
                </div>
              </div>
            </div>
            <h4 v-if="id">
              {{ $t('comm.otherinfo') }}
            </h4>
            <div v-if="id" class="input_box">
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.createTime') }}
                </div>
                <div class="input">
                  <el-input v-model="targetPolicy.dataCreateTime" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.createBy') }}
                </div>
                <div class="input">
                  <user-select v-model="targetPolicy.dataCreateBy" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3" />
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.updateTime') }}
                </div>
                <div class="input">
                  <el-input v-model="targetPolicy.updateTime" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.updateBy') }}
                </div>
                <div class="input">
                  <user-select v-model="targetPolicy.updateBy" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3" />
            </div>
            <div class="btns" style="margin-top:10px">
              <el-button class="nextbtn" size="small" @click="handleNext(2)">
                {{ $t('comm.next') }}
              </el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="tabIndex>=2" :label="$t('rebate.targetPolicy.toCountInfo')" name="2" class="object">
            <div class="input_box">
              <div class="flex3">
                <div class="title">
                  {{ $t("rebate.targetPolicy.scopeFlag") }}
                </div>
                <div class="input">
                  <dict-radio v-model="statisticInfo.scopeFlag" class="input" dict-type-id="ScopeFlag" />
                </div>
              </div>
              <div class="flex3">
                <div class="title must">
                  {{ $t('rebate.targetPolicy.orderStartDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="statisticInfo.orderStartDate" size="small" type="date" value-format="yyyy-MM-dd" @blur="validator('orderStartDate')" />
                  <span ref="orderStartDate" data-roles="required" :data-value="statisticInfo.orderStartDate" class="message" />
                </div>
              </div>
              <div class="flex3" />
              <div class="flex3">
                <div class="title must">
                  {{ $t('rebate.targetPolicy.statisticalExcuteDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="statisticInfo.statisticalExcuteDate" size="small" type="date" value-format="yyyy-MM-dd" @blur="validator('statisticalExcuteDate')" />
                  <span ref="statisticalExcuteDate" data-roles="required" :data-value="statisticInfo.statisticalExcuteDate" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title must">
                  {{ $t('rebate.targetPolicy.orderEndDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="statisticInfo.orderEndDate" size="small" type="date" value-format="yyyy-MM-dd" @blur="validator('orderEndDate')" />
                  <span ref="orderEndDate" data-roles="required" :data-value="statisticInfo.orderEndDate" class="message" />
                </div>
              </div>
              <div class="flex3">
                <el-button class="editbtn editbtn-margin" size="mini" :disabled="tabIndex===2" @click="handleRebateEdit(2, $t('rebate.targetPolicy.tip2'))">
                  {{ $t('comm.edit') }}
                </el-button>
              </div>
            </div>
            <h4>{{ $t('rebate.targetPolicy.accountObject') }}</h4>
            <div class="table">
              <el-table
                stripe
                :data="statisticInfoCus"
              >
                <el-table-column prop="customerIdentiferNum" :label="$t('mrk.account.identiferNum')" min-width="160" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{ scope.row.customerIdentiferNum }}
                    <span :ref="'customerIdentiferNum' + scope.$index" data-roles="required" :data-value="scope.row.customerIdentiferNum" class="message" />
                  </template>
                </el-table-column>

                <el-table-column prop="accountName" :label="$t('mrk.account.accountName')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="telephone" :label="$t('mrk.account.telephone')" min-width="160" show-overflow-tooltip />
                <el-table-column :label="$t('mrk.account.accountType')" min-width="100">
                  <template slot-scope="scope">
                    <dict-write dict-type-id="AccountType" :value="scope.row.accountType" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mrk.account.bizCompanyNature')" min-width="100">
                  <template slot-scope="scope">
                    <dict-write dict-type-id="BizCompanyNature" :value="scope.row.bizCompanyNature" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mrk.account.riskgradeAssess')" min-width="100">
                  <template slot-scope="scope">
                    <dict-write dict-type-id="RiskGradeAssess" :value="scope.row.riskgradeAssess" />
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('comm.operation')"
                  min-width="120"
                  width="120"
                >
                  <template v-if="scope.row.identiferNum" slot-scope="scope">
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleAccountDelete(scope.$index)" />
                  </template>
                </el-table-column>
              </el-table>
              <div>
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="accountSelectDialog=true">
                  {{ $t('comm.addTo') }}
                </el-button>
              </div>
            </div>
            <div class="btns" style="margin-top:10px">
              <el-button class="nextbtn" size="small" @click="handleNext(3)">
                {{ $t('comm.next') }}
              </el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="tabIndex>=3" :label="$t('rebate.targetPolicy.conditionUnitInfo')" name="3" class="object">
            <h4>{{ $t("rebate.targetPolicy.conditionUnitInfo") }}</h4>
            <div class="input_box">
              <div class="flex2">
                <div class="title">
                  {{ $t("rebate.targetPolicy.agreementMethod") }}
                </div>
                <div class="input">
                  <dict-radio v-model="conditionInfo.agreementMethod" :disabled="tabIndex>3" class="input" dict-type-id="AgreementMethod" @change="handleChangeMethod" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('rebate.targetPolicy.rebatePlus') }}
                </div>
                <div class="input">
                  <el-switch
                    v-model="conditionInfo.superpositionFlag"
                    :disabled="tabIndex>3"
                    active-value="1"
                    inactive-value="0"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t("rebate.targetPolicy.agreementTarget") }}
                </div>
                <div class="input">
                  <dict-radio v-model="conditionInfo.agreementTarget" :disabled="tabIndex>3" class="input" dict-type-id="AgreementTarget" @change="handleChangeTarget" />
                </div>
              </div>
              <div class="flex2">
                <el-button class="editbtn" style="margin-left:70%" size="mini" :disabled="tabIndex===3" @click="handleRebateEdit(3, $t('rebate.targetPolicy.tip3'))">
                  {{ $t('comm.edit') }}
                </el-button>
                <el-button class="editbtn" style="margin-left:1%" size="mini" icon="el-icon-circle-plus-outline" :disabled="tabIndex>3" @click="handleAddStage">
                  {{ $t('rebate.targetPolicy.addStage') }}
                </el-button>
              </div>
            </div>
            <div v-for="(item, index1) in reachStages" :key="index1">
              <h4 v-if="index1 > 0">
                {{ $t('rebate.targetPolicy.stage') }}{{ index1 + 1 }}
                <el-button size="mini" icon="el-icon-delete" :disabled="tabIndex>3" type="danger" @click="handleDeleteStage(index1)" />
              </h4>
              <h4 v-if="index1===0">
                {{ $t('rebate.targetPolicy.stage') }}{{ index1 + 1 }}
              </h4>
              <div class="table vertical">
                <el-table
                  stripe
                  :data="item.reachStageDetails"
                  :header-cell-style="{'text-align':'left'}"
                >
                  <el-table-column
                    :label="unit"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <milli-input v-if="isInput || !isInput && item.reachStageDetails[0].productId" v-model="scope.row.conditionPara" :disabled="tabIndex>3" @blur="validator('conditionPara' + index1+scope.$index)" />
                      <span :ref="'conditionPara' + index1 + scope.$index" data-roles="required,positiveIntAnd0" :data-value="scope.row.conditionPara" class="message" />
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget==='2'" :label="$t('mdm.product.productName')" width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap && productMap[scope.row.productId]">{{ productMap[scope.row.productId].productName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget!='1'" prop="category1" :label="$t('mdm.product.category1')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category1" :disabled="reachStages.length>1 || tabIndex>3" method="POST" action-url="/api/product/getRange" :params="selectRemoteTopParams" show-overflow-tooltip @change="(value) => {validator('stage_category1'+ index1 + scope.$index, value)}" />
                      <span v-else-if="productMap && productMap[scope.row.productId]">{{ productMap[scope.row.productId].category1 }}</span>
                      <span v-if="isInput" :ref="'stage_category1' + index1 + scope.$index" data-roles="required" :data-value="scope.row.category1" class="message" />
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget!='1'" prop="category2" :label="$t('mdm.product.category2')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category2" :disabled="reachStages.length>1 || tabIndex>3" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category1" show-overflow-tooltip />
                      <span v-else-if="productMap && productMap[scope.row.productId]">{{ productMap[scope.row.productId].category2 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget!='1'" prop="category3" :label="$t('mdm.product.category3')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category3" :disabled="reachStages.length>1 || tabIndex>3" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category2" show-overflow-tooltip />
                      <span v-else-if="productMap && productMap[scope.row.productId]">{{ productMap[scope.row.productId].category3 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget!='1'" prop="category4" :label="$t('mdm.product.category4')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category4" :disabled="reachStages.length>1 || tabIndex>3" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category3" show-overflow-tooltip />
                      <span v-else-if="productMap && productMap[scope.row.productId]">{{ productMap[scope.row.productId].category4 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget!='1'" prop="category5" :label="$t('mdm.product.category5')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category5" :disabled="reachStages.length>1 || tabIndex>3" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category4" show-overflow-tooltip />
                      <span v-else-if="productMap && productMap[scope.row.productId]">{{ productMap[scope.row.productId].category5 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget==='2'" prop="unit" :label="$t('mdm.product.unit')" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap && productMap[scope.row.productId]">{{ productMap[scope.row.productId].unit | dictName('PUnit') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget==='2'" prop="unitPrice" align="right" :label="$t('mdm.product.unitPrice')" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap && productMap[scope.row.productId]">{{ productMap[scope.row.productId].unitPrice | numFormat(2) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="conditionInfo.agreementTarget!=='1'" :label="$t('comm.operation')" min-width="70" width="70">
                    <template slot-scope="scope">
                      <el-button
                        v-if="(conditionInfo.agreementTarget==='3' && reachStages[0].reachStageDetails.length>0 || conditionInfo.agreementTarget==='2' && reachStages[0].reachStageDetails[0].productId) && index1===0"
                        :disabled="tabIndex>3 || reachStages.length>1"
                        size="mini"
                        icon="el-icon-delete"
                        type="danger"
                        @click="handleDeleteStageDetail(scope.$index)"
                      />
                    </template>
                  </el-table-column>
                </el-table>
                <div v-if="conditionInfo.agreementTarget!=='1' && index1===0">
                  <el-button type="text" icon="el-icon-circle-plus-outline" :disabled="tabIndex>3 || reachStages.length>1" @click="handleAddCondition()">
                    {{ $t('rebate.targetPolicy.addConditionUnit') }}
                  </el-button>
                </div>
              </div>
            </div>
            <div class="btns" style="margin-top:10px">
              <el-button class="nextbtn" size="small" @click="handleNext(4)">
                {{ $t('comm.next') }}
              </el-button>
            </div>
          </el-tab-pane>
          <template v-for="(item, index2) in reachStages">
            <el-tab-pane v-if="item.rebateRule" :key="index2" :label="$t('rebate.targetPolicy.rebateRuleStage')+ (index2+1)" :name="getName(index2)" class="object">
              <div v-if="targetPolicy.strategyType!=='3'" class="input_box">
                <div class="flex2">
                  <div class="title">
                    {{ $t("rebate.targetPolicy.rebateMethod") }}
                  </div>
                  <div class="input">
                    <dict-radio v-model="item.rebateRule.rebateMethod" class="input" dict-type-id="RebateMethod" :disabled="conditionInfo.superpositionFlag==='1'" @change="handleChangeRebateMethod(index2)" />
                  </div>
                </div>
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.validPeriodFrom') }}
                  </div>
                  <div class="input">
                    <el-date-picker v-model="item.rebateRule.validPeriodFrom" size="small" type="date" value-format="yyyy-MM-dd" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    {{ $t("rebate.targetPolicy.rebateObject") }}
                  </div>
                  <div class="input">
                    <dict-radio v-model="item.rebateRule.rebateObject" class="input" dict-type-id="RebateObject" @change="handleChangeObjectTarget(index2)" />
                  </div>
                </div>
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.validPeriodTo') }}
                  </div>
                  <div class="input">
                    <el-date-picker v-model="item.rebateRule.validPeriodTo" size="small" type="date" value-format="yyyy-MM-dd" />
                  </div>
                </div>
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.upperLimitMoney') }}
                  </div>
                  <div class="input">
                    <milli-input v-model="item.rebateRule.upperLimitMoney" class="input" @blur="validator('upperLimitMoney'+index2)" />
                    <span :ref="'upperLimitMoney'+index2" data-roles="positiveIntAnd0" :data-value="item.rebateRule.upperLimitMoney" class="message" />
                  </div>
                </div>
              </div>
              <div v-if="targetPolicy.strategyType ==='3'" class="input_box">
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.validPeriodFrom') }}
                  </div>
                  <div class="input">
                    <el-date-picker v-model="item.rebateRule.validPeriodFrom" size="small" type="date" value-format="yyyy-MM-dd" />
                  </div>
                </div>
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.validPeriodTo') }}
                  </div>
                  <div class="input">
                    <el-date-picker v-model="item.rebateRule.validPeriodTo" size="small" type="date" value-format="yyyy-MM-dd" />
                  </div>
                </div>
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.upperLimitMoney') }}
                  </div>
                  <div class="input">
                    <milli-input v-model="item.rebateRule.upperLimitMoney" class="input" @blur="validator('upperLimitMoney'+index2)" />
                    <span :ref="'upperLimitMoney'+index2" data-roles="positiveIntAnd0" :data-value="item.rebateRule.upperLimitMoney" class="message" />
                  </div>
                </div>
              </div>
              <div class="table vertical" style="margin:15px 0;">
                <el-table
                  stripe
                  :data="item.rebateRule.ruleDetails"
                  :header-cell-style="{'text-align':'left'}"
                >
                  <el-table-column :label="ruleUnit[index2]" width="150">
                    <template slot-scope="scope">
                      <milli-input v-if="ruleShowObject[index2]!=='2' || item.rebateRule.rebateObject!=='2' || scope.row.productId" v-model="scope.row.rebatePara" @blur="validator('rebatePara' + index2+scope.$index)" />
                      <span :ref="'rebatePara' + index2 + scope.$index" data-roles="required,positiveIntAnd0" :data-value="scope.row.rebatePara" class="message" />
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject==='2' || ruleShowObject[index2]==='2'" prop="productName" :label="$t('mdm.product.productName')" width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap && scope.row.productId">{{ productMap[scope.row.productId].productName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category1" :label="$t('mdm.product.category1')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category1" method="POST" action-url="/api/product/getRange" :params="selectRemoteTopParams" show-overflow-tooltip @change="(value) => {validator('rule_category1'+ index2 + scope.$index, value)}" />
                      <span v-else-if="productMap && scope.row.productId">{{ productMap[scope.row.productId].category1 }}</span>
                      <span v-if="ruleShowObject[index2]==='3'" :ref="'rule_category1' + index2 + scope.$index" data-roles="required" :data-value="scope.row.category1" class="message" />
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category2" :label="$t('mdm.product.category2')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category2" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category1" show-overflow-tooltip />
                      <span v-else-if="productMap && scope.row.productId">{{ productMap[scope.row.productId].category2 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category3" :label="$t('mdm.product.category3')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category3" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category2" show-overflow-tooltip />
                      <span v-else-if="productMap && scope.row.productId">{{ productMap[scope.row.productId].category3 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category4" :label="$t('mdm.product.category4')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category4" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category3" show-overflow-tooltip />
                      <span v-else-if="productMap && scope.row.productId">{{ productMap[scope.row.productId].category4 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category5" :label="$t('mdm.product.category5')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category5" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category4" show-overflow-tooltip />
                      <span v-else-if="productMap && scope.row.productId">{{ productMap[scope.row.productId].category5 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject==='2' || ruleShowObject[index2]==='2'" prop="unit" :label="$t('mdm.product.unit')" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap && scope.row.productId">{{ productMap[scope.row.productId].unit | dictName('PUnit') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject==='2' || ruleShowObject[index2]==='2'" align="right" prop="unitPrice" :label="$t('mdm.product.unitPrice')" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap && scope.row.productId">{{ productMap[scope.row.productId].unitPrice | numFormat(2) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'"
                    :label="$t('comm.operation')"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <el-button v-if="scope.row.productId || ruleShowObject[index2]==='3'" size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteRuleDetail(index2, scope.$index)" />
                    </template>
                  </el-table-column>
                </el-table>
                <div v-if="item.rebateRule.rebateObject!=='1'">
                  <el-button type="text" icon="el-icon-circle-plus-outline" @click="handleAddRebateObject(index2)">
                    {{ $t('rebate.targetPolicy.addRebateObject') }}
                  </el-button>
                </div>
              </div>
              <div v-if="index2 !== reachStages.length-1" class="btns" style="margin-top:10px">
                <el-button class="nextbtn" size="small" @click="handleNext(index2+5)">
                  {{ $t('comm.next') }}
                </el-button>
              </div>
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
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
        <!-- 取消申请 -->
        <li v-if="taskId" class="operation-item" @click="handleCancel">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.processCancel') }}</span>
        </li>
        <li v-if="taskId" class="operation-item" @click="processDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('comm.approval') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div v-if="processDialog">
      <process-detail :key="processInstId" :title="$t('component.taskApprove.detailedProcess') + processInstId" :is-show="processDialog" :process-inst-id="processInstId" @close="processDialog=false" />
    </div>
    <div>
      <account-pop :is-show="accountSelectDialog" @cancel="accountSelectDialog=false" @select="handleAccountSelected" />
    </div>
    <div>
      <product-pop :is-show="productSelectDialog" :currency="targetPolicy.currency" @cancel="productSelectDialog=false" @select="handleProductSelected" />
    </div>
  </div>
</template>
<script>
import { getDetail, cancelProcess, submitTargetPolicy } from '@/api/rebate/targetpolicy.js'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import AccountPop from '@/views/mrk/account/components/AccountPop'
import ProductPop from '@/views/mdm/product/components/ProductPop'
import UserSelect from '@/components/UserSelect.vue'
import { dict } from '@/mixins/dict'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'TargetPolicyEdit',
  components: { AccountPop, ProductPop, UserSelect },
  mixins: [names, formValidator, dict, numFormat],
  data() {
    return {
      isLoading: true,
      targetPolicy: {
        attrs: {
        },
        useFlag: '1',
        rebateDefTargetStatisticInfo: []
      },
      newApplyFlag: '',
      statisticInfo: {
        scopeFlag: '2',
        orderStartDate: '',
        orderEndDate: ''
      },
      statisticInfoCus: [
        {
          customerIdentiferNum: ''
        }
      ],
      conditionInfo: {
        superpositionFlag: '1'
      },
      reachStages: [
        {
          reachStageDetails: [
            {
              conditionPara: ''
            }
          ]
        }
      ],
      productMap: new Map(),
      processDialog: false,
      accountSelectDialog: false,
      productSelectDialog: false,
      tabIndex: 1,
      editableTabsValue: '1',
      unit: this.$t('rebate.targetPolicy.conditionUnitYuan'),
      isInput: true,
      productPopIndex: 'con', // 默认达成方式的产品pop
      ruleUnit: [this.$t('rebate.targetPolicy.rebateContentYuan')],
      ruleShowObject: [],
      selectRemoteTopParams: '{"level":"1"}',
      conditionTarget: ''
    }
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() { return this.$route.query.id || this.$route.query.businessKey }
  },
  created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.targetPolicy.assignedUser = this.$store.getters.userInfo.userId
      this.$set(this.conditionInfo, 'agreementMethod', '1')
      this.$set(this.conditionInfo, 'agreementTarget', '1')
      this.conditionTarget = this.conditionInfo.agreementTarget
      this.conditionInfo.superpositionFlag = '1'
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        // 基本信息
        this.targetPolicy = res.datas.baseInfo
        // 是否是新建的数据
        this.newApplyFlag = res.datas.newApplyFlag
        // 统计信息
        this.statisticInfo = res.datas.statisticInfo
        // 统计信息里的客户信息
        this.statisticInfoCus = res.datas.statisticInfoCus
        // 达成条件
        this.conditionInfo = res.datas.conditionInfo
        // 返利规则阶段信息
        this.reachStages = res.datas.ruleInfoList
        // 达成对象如果是商品的话，取得商品信息
        if (res.datas.productMap !== null) {
          this.productMap = res.datas.productMap
        }
        // 所有的tab数
        this.tabIndex = 3 + this.reachStages.length
        // 达成条件tab的阶段里，table列是否是输入框判断，当达成目标不是产品时，列内容都是输入框
        this.isInput = this.conditionInfo.agreementTarget !== '2'
        // 达成方式=1时，达成条件（元）；达成方式=2时，达成条件（件）
        this.unit = this.conditionInfo.agreementMethod === '1' ? this.$t('rebate.targetPolicy.conditionUnitYuan') : this.$t('rebate.targetPolicy.conditionUnitJian')
        // 当没有客户时，添加一个空行
        if (!this.statisticInfoCus || this.statisticInfoCus.length === 0) {
          this.statisticInfoCus = [{ customerIdentiferNum: '' }]
        }
        // 返利对象阶段的返利单位设定
        // 返利方式=1时，返利内容（元）；返利方式=2时，返利内容（件）

        this.reachStages.forEach((v, k) => {
          this.$set(this.ruleUnit, k, this.targetPolicy.strategyType === '3' ? this.$t('rebate.targetPolicy.productPayout') : (v.rebateRule.rebateMethod === '1' ? this.$t('rebate.targetPolicy.rebateContentYuan') : this.$t('rebate.targetPolicy.rebateContentP')))
          this.$set(this.ruleShowObject, k, this.targetPolicy.strategyType === '3' ? '2' : v.rebateRule.rebateObject)
        })
        // 达成条件对象切换时，保存切换前的值
        this.conditionTarget = this.conditionInfo.agreementTarget
      }
      // 点击复制迁移来的时候，部分项目重置
      if (this.$route.query.copy) {
        this.targetPolicy.id = ''
        this.targetPolicy.identiferNum = ''
        this.targetPolicy.exclusiveKey = ''
        this.targetPolicy.updateTimeStamp = ''
        this.targetPolicy.policyName = ''
        this.conditionInfo.id = ''
        this.statisticInfo.id = ''
        this.reachStages.forEach((v, k) => {
          v.id = ''
          v.reachStageDetails.forEach((v1, k1) => {
            v1.id = ''
          })
          v.rebateRule.ruleDetails.forEach((v2, k2) => {
            v2.id = ''
          })
          v.rebateRule.id = ''
        })
      }
      this.statisticInfoCus.forEach((v, k) => {
        v.id = ''
        this.$set(v, 'customerIdentiferNum', v.identiferNum)
      })
      this.isLoading = false
    },
    // 下一步按钮事件
    handleNext(index) {
      if (this.tabIndex >= index) {
        this.editableTabsValue = index + ''
        return
      }
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
        } else if (this.$refs[ref] && this.$refs[ref].length === 0 || !this.$refs[ref]) {
          continue
        } else {
          // 本页面调用验证方法
          if (!this.validator(ref)) return false
        }
      }
      if (index === 3) { // 统计信息点击下一步
        if (this.statisticInfo.orderEndDate < this.statisticInfo.orderStartDate) {
          this.setValidatorMessage('orderStartDate', this.$t('rebate.targetPolicy.e0001'))
          return false
        }
        if (this.statisticInfo.orderEndDate >= this.statisticInfo.statisticalExcuteDate) {
          this.setValidatorMessage('statisticalExcuteDate', this.$t('rebate.targetPolicy.e0002'))
          return false
        }
        this.editableTabsValue = index + ''
        this.$set(this.reachStages, 0, {
          reachStageDetails: [
            {
              conditionPara: ''
            }
          ]
        })
        this.tabIndex = index
        this.isInput = true
      } else if (index === 4) { // 达成方式点击下一步
        this.editableTabsValue = index + ''
        this.reachStages.forEach((item, key) => {
          if (!this.id || !item.rebateRule) {
            this.$set(item, 'rebateRule', {
              rebateMethod: '1',
              rebateObject: this.targetPolicy.strategyType === '3' ? '2' : '1',
              validPeriodFrom: '',
              validPeriodTo: '',
              ruleDetails: [
                {
                  rebatePara: ''
                }
              ]
            })
            this.ruleUnit[key] = this.targetPolicy.strategyType === '3' ? this.$t('rebate.targetPolicy.productPayout') : this.$t('rebate.targetPolicy.rebateContentYuan')
            this.ruleShowObject[key] = this.targetPolicy.strategyType === '3' ? '2' : '1'
          }
        })
        // 重新计算tab数
        this.tabIndex = index + this.reachStages.length - 1
      } else {
        this.editableTabsValue = index + ''
        if (index > this.tabIndex) {
          this.tabIndex = index
        }
      }
    },
    // 保存或提交
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
        } else if (this.$refs[ref] && this.$refs[ref].length === 0 || !this.$refs[ref]) {
          continue
        } else {
          // 本页面调用验证方法
          if (!this.validator(ref)) return false
        }
      }

      if (this.tabIndex >= 2) {
        if (this.statisticInfo.orderEndDate < this.statisticInfo.orderStartDate) { // 订单统计开始日不能在订单统计结束日之后
          this.setValidatorMessage('orderStartDate', this.$t('rebate.targetPolicy.e0001'))
          return false
        } else if (this.statisticInfo.orderEndDate >= this.statisticInfo.statisticalExcuteDate) { // 策略执行时间不能在订单统计结束日之前
          this.setValidatorMessage('statisticalExcuteDate', this.$t('rebate.targetPolicy.e0002'))
          return false
        }
      }
      if (this.tabIndex < 4) {
        this.$message({
          type: 'error',
          message: this.$t('rebate.targetPolicy.e0003')
        })
        return false
      }
      this.reachStages.forEach((item, key) => {
        item.stage = key + 1
      })
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.targetPolicy.taskId = this.taskId
        this.targetPolicy.processInstId = this.processInstId
        this.targetPolicy.submitType = submitType
        this.targetPolicy.exclusiveKey = ''
        this.$set(this.targetPolicy, 'agreementCondition', this.conditionInfo)
        this.$set(this.targetPolicy, 'rebateDefTargetStatisticInfo', this.statisticInfo)
        this.$set(this.targetPolicy.agreementCondition, 'reachStages', this.reachStages)
        this.$set(this.targetPolicy.rebateDefTargetStatisticInfo, 'customers', this.statisticInfoCus)
        const res = await submitTargetPolicy(this.targetPolicy)
        if (res && res.success) {
          this.$router.push('/rebate/targetPolicyList')
        }
        this.isLoading = false
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    // 流程取消事件
    handleCancel() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await cancelProcess(this.taskId)
        if (res && res.success) {
          this.$router.push('/rebate/targetPolicyList')
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
    // 达成条件tab的删除阶段详细按钮点击事件
    handleDeleteStageDetail(index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.reachStages[0].reachStageDetails.splice(index, 1)
        // 如果阶段详细为空，则添加一个空行
        if (this.reachStages[0].reachStageDetails.length === 0) {
          this.reachStages[0].reachStageDetails.push({
            productId: ''
          })
        }
      })
    },
    // 返利规则-阶段tab的返利对象删除点击事件
    handleDeleteRuleDetail(stagesIndex, ruleDetailIndex) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.reachStages[stagesIndex].rebateRule.ruleDetails.splice(ruleDetailIndex, 1)
        // 如果详细为空，则添加一个空行
        if (this.reachStages[stagesIndex].rebateRule.ruleDetails.length === 0) {
          this.reachStages[stagesIndex].rebateRule.ruleDetails.push({
            productId: ''
          })
          if (this.reachStages[stagesIndex].rebateRule.rebateObject === '2') {
            this.clearErrorMessage()
          }
        }
      })
    },
    // 达成条件tab的删除阶段按钮点击事件
    handleDeleteStage(index) {
      this.reachStages.splice(index, 1)
    },
    // 达成统计信息tab的客户删除按钮点击事件
    handleAccountDelete(idx) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.statisticInfoCus.splice(idx, 1)
        // 如果客户为空，则添加一个空行
        if (this.statisticInfoCus.length === 0) {
          this.statisticInfoCus.push({
            customerIdentiferNum: ''
          })
        }
      })
    },
    // 达成条件tab的增加阶段按钮点击事件
    handleAddStage() {
      var isError = false
      this.reachStages.forEach((item, index1) => {
        // 添加新的阶段时，判断上一个阶段的内容是否有值
        item.reachStageDetails.forEach((rowData, index2) => {
          if (!this.validator(('conditionPara' + index1) + index2)) {
            isError = true
          }
          if (this.conditionInfo.agreementTarget === '3') {
            if (!this.validator(('stage_category1' + index1) + index2)) {
              isError = true
            }
          }
        })
      })
      if (isError) return false
      // 复制阶段，并清空新的阶段的内容
      var stage = JSON.parse(JSON.stringify(this.reachStages[0]))
      stage.reachStageDetails.forEach((v, index) => {
        v.conditionPara = ''
      })
      this.reachStages.push(stage)
    },
    // tab的编辑按钮点击事件
    handleRebateEdit(index, tips) {
      this.$confirm(tips, this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        if (index === 1) { // 基本信息点击编辑按钮时，清空后面的信息
          this.statisticInfo.scopeFlag = '2'
          this.statisticInfo.orderStartDate = ''
          this.statisticInfo.orderEndDate = ''
          this.statisticInfo.statisticalExcuteDate = ''
          this.statisticInfoCus = [{ customerIdentiferNum: '' }]
          this.conditionInfo.agreementMethod = '1'
          this.conditionInfo.agreementTarget = '1'
          this.conditionTarget = '1'
          this.conditionInfo.superpositionFlag = '1'
          this.reachStages = [{
            reachStageDetails: [{}]
          }]
          this.tabIndex = 1
        } else if (index === 2) { // 统计信息点击编辑按钮时，清空后面的信息
          this.conditionInfo.agreementMethod = '1'
          this.conditionInfo.agreementTarget = '1'
          this.conditionTarget = '1'
          this.conditionInfo.superpositionFlag = '1'
          this.reachStages = [{
            reachStageDetails: [{}]
          }]
          this.tabIndex = 2
        } else if (index === 3) { // 达成方式点击编辑按钮时，清空后面的信息
          this.reachStages.forEach((v, index) => {
            v.rebateRule = null
          })
          this.tabIndex = 3
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    // 达成条件tab的添加阶段按钮点击事件
    handleAddCondition() {
      if (this.conditionInfo.agreementTarget === '2') { // 指定商品
        this.productSelectDialog = true
        this.productPopIndex = 'con'
      } else if (this.conditionInfo.agreementTarget === '3') { // 指定范围
        this.reachStages[0].reachStageDetails.push({ conditionPara: '', category1: '' })
      }
    },
    // 返利规则tab的添加返利对象按钮点击事件
    handleAddRebateObject(index) {
      if (this.reachStages[index].rebateRule.rebateObject === '2') { // 指定商品
        this.productSelectDialog = true
        this.productPopIndex = index
      } else if (this.reachStages[index].rebateRule.rebateObject === '3') { // 指定范围
        this.reachStages[index].rebateRule.ruleDetails.push({ rebatePara: '', category1: '' })
      }
    },
    // 达成目标变更事件
    handleChangeTarget() {
      this.$confirm(this.$t('rebate.targetPolicy.tip4'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.reachStages = []
        this.reachStages.push({
          reachStageDetails: [
            {
              category1: '',
              category2: '',
              category3: '',
              category4: '',
              category5: '',
              conditionPara: '',
              productId: ''
            }
          ]
        })
        this.isInput = this.conditionInfo.agreementTarget !== '2'
        this.conditionTarget = this.conditionInfo.agreementTarget
        this.clearErrorMessage()
      }).catch(() => {
        this.conditionInfo.agreementTarget = this.conditionTarget
      })
    },
    // 返利规则阶段的返利对象变更事件
    handleChangeObjectTarget(index) {
      this.$confirm(this.$t('rebate.targetPolicy.tip5'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.reachStages[index].rebateRule.ruleDetails = []
        // 返利对象变更时，清空之前的返利对象
        this.reachStages[index].rebateRule.ruleDetails.push(
          {
            category1: '',
            category2: '',
            category3: '',
            category4: '',
            category5: '',
            rebatePara: '',
            productId: ''
          }
        )
        this.$set(this.ruleShowObject, index, this.reachStages[index].rebateRule.rebateObject)
        this.clearErrorMessage()
      }).catch(() => {
        this.reachStages[index].rebateRule.rebateObject = this.ruleShowObject[index]
      })
    },
    // 达成方式变更事件
    handleChangeMethod() {
      this.unit = this.conditionInfo.agreementMethod === '1' ? this.$t('rebate.targetPolicy.conditionUnitYuan') : this.$t('rebate.targetPolicy.conditionUnitJian')
    },
    // 返利方式变更事件
    handleChangeRebateMethod(index) {
      this.$set(this.ruleUnit, index, this.reachStages[index].rebateRule.rebateMethod === '1' ? this.$t('rebate.targetPolicy.rebateContentYuan') : this.$t('rebate.targetPolicy.rebateContentP'))
    },
    // 客户popup画面选择事件
    handleAccountSelected(accounts) {
      accounts.forEach((rowData) => {
        this.clearErrorMessage()
        // 已填加的客户将不再添加
        const index = this.statisticInfoCus.findIndex((ele) => {
          return ele.customerIdentiferNum === rowData.identiferNum
        })
        // 客户未添加时
        if (index === -1) {
          // 如果第一行时初始化的空白行时，先删除空白行
          if (!this.statisticInfoCus[0].customerIdentiferNum) {
            this.statisticInfoCus.splice(0, 1)
          }
          // 将选择的客户添加到画面上
          rowData.customerIdentiferNum = rowData.identiferNum
          this.statisticInfoCus.push(rowData)
        }
      })
      this.accountSelectDialog = false
    },
    // 产品popup画面选择事件
    handleProductSelected(products) {
      if (!this.productMap) {
        this.productMap = new Map()
      }
      products.forEach((rowData) => {
        // 将产品添加到产品map中
        this.$set(this.productMap, rowData.id, rowData)
        if (this.productPopIndex === 'con') { // 达成条件tab添加产品时
          // 已填加的产品将不再添加
          const index = this.reachStages[0].reachStageDetails.findIndex((ele) => {
            return ele.productId === rowData.id
          })
          // 产品未添加时
          if (index === -1) {
            // 如果第一行是初始化的空白行时，先删除空白行
            if (!this.reachStages[0].reachStageDetails[0].productId) {
              this.reachStages[0].reachStageDetails.splice(0, 1)
              this.clearErrorMessage()
            }
            // 将选择的产品添加到画面上
            this.reachStages[0].reachStageDetails.push({
              productId: rowData.id
            })
          }
        } else { // 返利规则阶段添加产品时
          // 已添加的产品不再添加
          const index = this.reachStages[parseInt(this.productPopIndex)].rebateRule.ruleDetails.findIndex((ele) => {
            return ele.productId === rowData.id
          })
          // 产品未添加时
          if (index === -1) {
            // 如果第一行是初始化的空白行时，先删除空白行
            if (!this.reachStages[parseInt(this.productPopIndex)].rebateRule.ruleDetails[0].productId) {
              this.reachStages[parseInt(this.productPopIndex)].rebateRule.ruleDetails.splice(0, 1)
              this.clearErrorMessage()
            }
            // 将选择的产品添加到画面上
            this.reachStages[parseInt(this.productPopIndex)].rebateRule.ruleDetails.push({ productId: rowData.id })
          }
        }
      })
      this.productSelectDialog = false
    },
    // 返回返利规则阶段的tabName（tabName必须是字符类型，不能是int型）
    getName(index) {
      return (index + 4) + ''
    }
  }
}
</script>
<style lang="scss" scoped>
.editbtn-margin {
  margin-left: 85% !important;
}
.el-table__row {
  .el-input{
    width: 100%;
  }
  .el-select{
    width: 100%;
  }
}
</style>
<style lang="scss">

</style>
