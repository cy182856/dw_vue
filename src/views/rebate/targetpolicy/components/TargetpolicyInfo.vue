<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('rebate.targetPolicy.identiferNum') }} : {{ targetPolicy.baseInfo.identiferNum }}</span>
      </div>
      <div class="createBox">
        <el-tabs v-model="editableTabsValue" type="card" style="min-height: 480px;">
          <el-tab-pane :label="$t('comm.essentialInformation')" name="1" class="object">
            <h4>{{ $t('rebate.targetPolicy.rebatePolicyInfo') }}</h4>
            <div class="input_box">
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.policyName') }}
                </div>
                <div class="input">
                  <el-input v-model="targetPolicy.baseInfo.policyName" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.strategyType') }}
                </div>
                <div class="input">
                  <dict-select v-model="targetPolicy.baseInfo.strategyType" :disabled="true" class="input" dict-type-id="StrategyType" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.currency') }}
                </div>
                <div class="input">
                  <dict-select v-model="targetPolicy.baseInfo.currency" :disabled="true" class="input" dict-type-id="Currency" />
                </div>
              </div>
              <div class="flex1">
                <div class="title">
                  {{ $t('rebate.targetPolicy.useFlag') }}
                </div>
                <div class="input">
                  <el-switch
                    v-model="targetPolicy.baseInfo.useFlag"
                    :disabled="true"
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
                  <el-input v-model="targetPolicy.baseInfo.remark" :disabled="true" size="small" type="textarea" rows="2" />
                </div>
              </div>
            </div>
            <h4>
              {{ $t('comm.otherinfo') }}
            </h4>
            <div class="input_box">
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.createTime') }}
                </div>
                <div class="input">
                  <el-input v-model="targetPolicy.baseInfo.dataCreateTime" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.createBy') }}
                </div>
                <div class="input">
                  <user-select v-model="targetPolicy.baseInfo.dataCreateBy" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3" />
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.updateTime') }}
                </div>
                <div class="input">
                  <el-input v-model="targetPolicy.baseInfo.updateTime" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.updateBy') }}
                </div>
                <div class="input">
                  <user-select v-model="targetPolicy.baseInfo.updateBy" size="small" :disabled="true" />
                </div>
              </div>
              <div class="flex3" />
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('rebate.targetPolicy.toCountInfo')" name="2" class="object">
            <div class="input_box">
              <div class="flex3">
                <div class="title">
                  {{ $t("rebate.targetPolicy.scopeFlag") }}
                </div>
                <div class="input">
                  <dict-radio v-model="targetPolicy.statisticInfo.scopeFlag" :disabled="true" class="input" dict-type-id="ScopeFlag" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.orderStartDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="targetPolicy.statisticInfo.orderStartDate" :disabled="true" size="small" type="date" value-format="yyyy-MM-dd" />
                </div>
              </div>
              <div class="flex3" />
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.statisticalExcuteDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="targetPolicy.statisticInfo.statisticalExcuteDate" :disabled="true" size="small" type="date" value-format="yyyy-MM-dd" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('rebate.targetPolicy.orderEndDate') }}
                </div>
                <div class="input">
                  <el-date-picker v-model="targetPolicy.statisticInfo.orderEndDate" :disabled="true" size="small" type="date" value-format="yyyy-MM-dd" />
                </div>
              </div>
            </div>
            <h4>{{ $t('rebate.targetPolicy.accountObject') }}</h4>
            <div class="table" style="padding-bottom: 10px;">
              <el-table
                ref="table"
                stripe
                :data="targetPolicy.statisticInfoCus"
              >
                <el-table-column prop="identiferNum" :label="$t('mrk.account.identiferNum')" min-width="160" show-overflow-tooltip />
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
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('rebate.targetPolicy.conditionUnitInfo')" name="3" class="object">
            <h4>{{ $t("rebate.targetPolicy.conditionUnitInfo") }}</h4>
            <div class="input_box">
              <div class="flex2">
                <div class="title">
                  {{ $t("rebate.targetPolicy.agreementMethod") }}
                </div>
                <div class="input">
                  <dict-radio v-model="targetPolicy.conditionInfo.agreementMethod" :disabled="true" class="input" dict-type-id="AgreementMethod" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('rebate.targetPolicy.rebatePlus') }}
                </div>
                <div class="input">
                  <el-switch
                    v-model="targetPolicy.conditionInfo.superpositionFlag"
                    :disabled="true"
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
                  <dict-radio v-model="targetPolicy.conditionInfo.agreementTarget" :disabled="true" class="input" dict-type-id="AgreementTarget" />
                </div>
              </div>
            </div>
            <div v-for="(item, index1) in targetPolicy.reachStages" :key="index1" style="padding-bottom: 10px;">
              <h4>
                {{ $t('rebate.targetPolicy.stage') }}{{ index1 + 1 }}
              </h4>
              <div class="table vertical">
                <el-table
                  ref="table"
                  stripe
                  :data="item.reachStageDetails"
                  :header-cell-style="{'text-align':'left'}"
                >
                  <el-table-column :label="unit" width="150">
                    <template slot-scope="scope">
                      <milli-input v-model="scope.row.conditionPara" :disabled="true" />
                    </template>
                  </el-table-column>
                  <el-table-column v-if="targetPolicy.conditionInfo.agreementTarget==='2'" :label="$t('mdm.product.productName')" width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap[scope.row.productId]">{{ productMap[scope.row.productId].productName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="targetPolicy.conditionInfo.agreementTarget!='1'" prop="category1" :label="$t('mdm.product.category1')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category1" :disabled="true" method="POST" action-url="/api/product/getRange" :params="selectRemoteTopParams" show-overflow-tooltip />
                      <span v-else-if="productMap[scope.row.productId]">{{ productMap[scope.row.productId].category1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="targetPolicy.conditionInfo.agreementTarget!='1'" prop="category2" :label="$t('mdm.product.category2')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category2" :disabled="true" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category1" show-overflow-tooltip />
                      <span v-else-if="productMap[scope.row.productId]">{{ productMap[scope.row.productId].category2 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="targetPolicy.conditionInfo.agreementTarget!='1'" prop="category3" :label="$t('mdm.product.category3')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category3" :disabled="true" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category2" show-overflow-tooltip />
                      <span v-else-if="productMap[scope.row.productId]">{{ productMap[scope.row.productId].category3 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="targetPolicy.conditionInfo.agreementTarget!='1'" prop="category4" :label="$t('mdm.product.category4')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category4" :disabled="true" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category3" show-overflow-tooltip />
                      <span v-else-if="productMap[scope.row.productId]">{{ productMap[scope.row.productId].category4 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="targetPolicy.conditionInfo.agreementTarget!='1'" prop="category5" :label="$t('mdm.product.category5')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="isInput" v-model="scope.row.category5" :disabled="true" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category4" show-overflow-tooltip />
                      <span v-else-if="productMap[scope.row.productId]">{{ productMap[scope.row.productId].category5 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="targetPolicy.conditionInfo.agreementTarget==='2'" prop="unit" :label="$t('mdm.product.unit')" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap[scope.row.productId]">{{ productMap[scope.row.productId].unit | dictName('PUnit') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="targetPolicy.conditionInfo.agreementTarget==='2'" align="right" prop="unitPrice" :label="$t('mdm.product.unitPrice')" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="productMap[scope.row.productId]">{{ productMap[scope.row.productId].unitPrice | numFormat(2) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
          <template v-for="(item, index2) in targetPolicy.reachStages">
            <el-tab-pane v-if="item.rebateRule" :key="index2" :label="$t('rebate.targetPolicy.rebateRuleStage')+ (index2+1)" :name="getName(index2)" class="object">
              <div v-if="targetPolicy.baseInfo.strategyType!=='3'" class="input_box">
                <div class="input_box">
                  <div class="flex2">
                    <div class="title">
                      {{ $t("rebate.targetPolicy.rebateMethod") }}
                    </div>
                    <div class="input">
                      <dict-radio v-model="item.rebateRule.rebateMethod" :disabled="true" class="input" dict-type-id="RebateMethod" />
                    </div>
                  </div>
                  <div class="flex3">
                    <div class="title">
                      {{ $t('rebate.targetPolicy.validPeriodFrom') }}
                    </div>
                    <div class="input">
                      <el-date-picker v-model="item.rebateRule.validPeriodFrom" :disabled="true" size="small" type="date" value-format="yyyy-MM-dd" />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t("rebate.targetPolicy.rebateObject") }}
                    </div>
                    <div class="input">
                      <dict-radio v-model="item.rebateRule.rebateObject" :disabled="true" class="input" dict-type-id="RebateObject" @change="handleChangeObjectTarget(index2)" />
                    </div>
                  </div>
                  <div class="flex3">
                    <div class="title">
                      {{ $t('rebate.targetPolicy.validPeriodTo') }}
                    </div>
                    <div class="input">
                      <el-date-picker v-model="item.rebateRule.validPeriodTo" :disabled="true" size="small" type="date" value-format="yyyy-MM-dd" />
                    </div>
                  </div>
                  <div class="flex3">
                    <div class="title">
                      {{ $t('rebate.targetPolicy.upperLimitMoney') }}
                    </div>
                    <div class="input">
                      <milli-input v-model="item.rebateRule.upperLimitMoney" :disabled="true" class="input" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="targetPolicy.baseInfo.strategyType ==='3'" class="input_box">
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.validPeriodFrom') }}
                  </div>
                  <div class="input">
                    <el-date-picker v-model="item.rebateRule.validPeriodFrom" :disabled="true" size="small" type="date" value-format="yyyy-MM-dd" />
                  </div>
                </div>
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.validPeriodTo') }}
                  </div>
                  <div class="input">
                    <el-date-picker v-model="item.rebateRule.validPeriodTo" :disabled="true" size="small" type="date" value-format="yyyy-MM-dd" />
                  </div>
                </div>
                <div class="flex3">
                  <div class="title">
                    {{ $t('rebate.targetPolicy.upperLimitMoney') }}
                  </div>
                  <div class="input">
                    <milli-input v-model="item.rebateRule.upperLimitMoney" :disabled="true" class="input" @blur="validator('upperLimitMoney'+index2)" />
                  </div>
                </div>
              </div>
              <div class="table vertical" style="margin:15px 0;">
                <el-table
                  ref="table"
                  stripe
                  :data="item.rebateRule.ruleDetails"
                  :header-cell-style="{'text-align':'left'}"
                >
                  <el-table-column :label="ruleUnit[index2]" width="150">
                    <template slot-scope="scope">
                      <milli-input v-model="scope.row.rebatePara" :disabled="true" />
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject==='2' || ruleShowObject[index2]==='2'" prop="productName" :label="$t('mdm.product.productName')" width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="scope.row.productId">{{ productMap[scope.row.productId].productName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category1" :label="$t('mdm.product.category1')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category1" :disabled="true" method="POST" action-url="/api/product/getRange" :params="selectRemoteTopParams" show-overflow-tooltip />
                      <span v-else-if="scope.row.productId">{{ productMap[scope.row.productId].category1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category2" :label="$t('mdm.product.category2')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category2" :disabled="true" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category1" show-overflow-tooltip />
                      <span v-else-if="scope.row.productId">{{ productMap[scope.row.productId].category2 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category3" :label="$t('mdm.product.category3')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category3" :disabled="true" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category2" show-overflow-tooltip />
                      <span v-else-if="scope.row.productId">{{ productMap[scope.row.productId].category3 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category4" :label="$t('mdm.product.category4')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category4" :disabled="true" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category3" show-overflow-tooltip />
                      <span v-else-if="scope.row.productId">{{ productMap[scope.row.productId].category4 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject!=='1' && ruleShowObject[index2]!=='1'" prop="category5" :label="$t('mdm.product.category5')">
                    <template slot-scope="scope">
                      <select-by-remote v-if="ruleShowObject[index2]==='3'" v-model="scope.row.category5" :disabled="true" method="POST" action-url="/api/product/getRange" :parent-value="scope.row.category4" show-overflow-tooltip />
                      <span v-else-if="scope.row.productId">{{ productMap[scope.row.productId].category5 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject==='2' || ruleShowObject[index2]==='2'" prop="unit" :label="$t('mdm.product.unit')" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="scope.row.productId">{{ productMap[scope.row.productId].unit | dictName('PUnit') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="item.rebateRule.rebateObject==='2' || ruleShowObject[index2]==='2'" align="right" prop="unitPrice" :label="$t('mdm.product.unitPrice')" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="scope.row.productId">{{ productMap[scope.row.productId].unitPrice | numFormat(2) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/rebate/targetpolicy'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'TargetpolicyInfo',
  components: { UserSelect },
  mixins: [names, numFormat],
  data() {
    return {
      policyId: this.id,
      isLoading: true,
      targetPolicy: {
        baseInfo: {
          attrs: {
          }
        },
        statisticInfo: [],
        statisticInfoCus: [],
        conditionInfo: [],
        reachStages: []
      },
      productMap: new Map(),
      tabIndex: 1,
      editableTabsValue: '1',
      unit: this.$t('rebate.targetPolicy.conditionUnitYuan'),
      isInput: true,
      ruleUnit: [this.$t('rebate.targetPolicy.rebateContentYuan')],
      selectRemoteTopParams: '{"level":"1"}',
      ruleShowObject: []
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
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.policyId = newValue
        this.fetchData()
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        // 达成对象如果是商品的话，取得商品信息
        if (res.datas.productMap !== null) {
          this.productMap = res.datas.productMap
          this.targetPolicy.productMap = res.datas.productMap
        }
        // 基本信息
        this.targetPolicy.baseInfo = res.datas.baseInfo
        // 统计信息
        this.targetPolicy.statisticInfo = res.datas.statisticInfo
        // 统计信息里的客户信息
        this.targetPolicy.statisticInfoCus = res.datas.statisticInfoCus
        // 达成条件
        this.targetPolicy.conditionInfo = res.datas.conditionInfo
        // 返利规则阶段信息
        this.targetPolicy.reachStages = res.datas.ruleInfoList

        this.tabIndex = 3 + this.targetPolicy.reachStages.length
        this.isInput = this.targetPolicy.conditionInfo.agreementTarget !== '2'
        this.unit = this.targetPolicy.conditionInfo.agreementMethod === '1' ? this.$t('rebate.targetPolicy.conditionUnitYuan') : this.$t('rebate.targetPolicy.conditionUnitJian')
        this.targetPolicy.reachStages.forEach((v, k) => {
          this.$set(this.ruleUnit, k, this.targetPolicy.baseInfo.strategyType === '3' ? this.$t('rebate.targetPolicy.productPayout') : (v.rebateRule.rebateMethod === '1' ? this.$t('rebate.targetPolicy.rebateContentYuan') : this.$t('rebate.targetPolicy.rebateContentP')))
          this.$set(this.ruleShowObject, k, this.targetPolicy.baseInfo.strategyType === '3' ? '2' : v.rebateRule.rebateObject)
        })
        this.$emit('load', this.targetPolicy.baseInfo)
      }
      this.isLoading = false
    },
    getName(index) {
      return (index + 4) + ''
    }
  }
}
</script>
<style lang="scss" scoped>
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
