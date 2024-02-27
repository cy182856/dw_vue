<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span
          v-if="withdraw.identiferNum"
          class="pagespan"
        >{{ $t("pay.transfer.identiferNum") }}:
          {{ withdraw.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{
            $t("comm.essentialInformation")
          }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.applyUserName") }}
              </div>
              <div class="input">
                <user-select
                  v-model="withdraw.applyUserName"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.applyUserNum") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.applyUserNum" :disabled="true" />
              </div>
            </div>
            <!-- <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.monitorNo") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.monitorNo" :disabled="true" />
              </div>
            </div> -->
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.companyName") }}
              </div>
              <div class="input">
                <rel-func-select
                  v-model="withdraw.companyName"
                  :rel-func="'account'"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.department") }}
              </div>
              <div class="input">
                <el-input
                  v-model="withdraw.department"
                  readonly
                  :disabled="true"
                >
                  <i
                    slot="suffix"
                    class="iconfont icon-zuzhijiagou"
                    @click.stop="openSelect"
                  />
                </el-input>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.applyDate") }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="withdraw.applyDate"
                  size="small"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.transfer.baseRemark") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.baseRemark" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{
            $t("pay.transfer.expenseInfo")
          }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.costIncurredCompany") }}
              </div>
              <div class="input">
                <rel-func-select
                  v-model="withdraw.costIncurredCompany"
                  :rel-func="'account'"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.oriFinancialDocNo") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.oriFinancialDocNo" :disabled="true" />
              </div>
            </div>
            <!-- <div class="flex3">
              <div class="title">
                {{ $t('pay.transfer.distributionChannel') }}
              </div>
              <div class="input">
                <el-select v-model="withdraw.distributionChannel" :disabled="true">
                  <el-option
                    v-for="item in distributionChannel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div> -->
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.currency") }}
              </div>
              <div class="input">
                <dict-select
                  v-model="withdraw.currency"
                  dict-type-id="Currency"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.outSumAmount") }}
              </div>
              <div class="input">
                <milli-input
                  v-model="totalAmountOut"
                  to-fixed-num="2"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.inSumAmount") }}
              </div>
              <div class="input">
                <milli-input
                  v-model="totalAmountIn"
                  to-fixed-num="2"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{
            $t("comm.lineDetail")
          }}</span>
          <div class="flex3">
            <div class="title">
              {{ $t("pay.transfer.outExpenseDetail") }}
            </div>
          </div>
          <el-table
            ref="table"
            :data="withdraw.detailsOut"
            style="margin-bottom: 20px"
            :header-cell-style="{ 'text-align': 'center' }"
            border
            stripe
          >
            <el-table-column label="No." min-width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="outCostCenterNum"
              :label="$t('pay.transfer.outCostCenterNum')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outCostCenterName"
              :label="$t('pay.transfer.outCostCenterName')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outSubjectNum"
              :label="$t('pay.transfer.outSubjectNum')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outSubjectName"
              :label="$t('pay.transfer.outSubjectName')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outTaxRate"
              :label="$t('pay.transfer.outTaxRate')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outTaxCode"
              :label="$t('pay.transfer.outTaxCode')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outAccountNum"
              :label="$t('pay.transfer.outAccountNum')"
              min-width="170"
              align="center"
            />
            <el-table-column prop="localChainNum" :label="$t('pay.transfer.outLocalChainNum')" min-width="170" align="center" />
            <!-- <el-table-column prop="localChainName" :label="$t('pay.transfer.localChainName')" min-width="170" align="center" /> -->
            <el-table-column
              prop="outCG5Num"
              :label="$t('pay.transfer.outCG5Num')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outBrandNum"
              :label="$t('pay.transfer.outBrandNum')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outMaterielNo"
              :label="$t('pay.transfer.outMaterielNo')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outSalesOffice"
              :label="$t('pay.transfer.outSalesOffice')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outPH2Num"
              :label="$t('pay.transfer.outPH2Num')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="outPH2Name"
              :label="$t('pay.transfer.outPH2Name')"
              min-width="170"
              align="center"
            />
            <el-table-column
              :label="$t('pay.transfer.outAmount')"
              min-width="170"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.outAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="outReason"
              :label="$t('pay.transfer.outReason')"
              min-width="170"
              align="center"
            />
          </el-table>
          <div class="flex3">
            <div class="title">
              {{ $t("pay.transfer.inExpenseDetail") }}
            </div>
          </div>
          <el-table
            ref="table"
            :data="withdraw.detailsIn"
            style="margin-bottom: 20px"
            :header-cell-style="{ 'text-align': 'center' }"
            border
            stripe
          >
            <el-table-column label="No." min-width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="inCostCenterNum"
              :label="$t('pay.transfer.inCostCenterNum')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inCostCenterName"
              :label="$t('pay.transfer.inCostCenterName')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inSubjectNum"
              :label="$t('pay.transfer.inSubjectNum')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inSubjectName"
              :label="$t('pay.transfer.inSubjectName')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inTaxRate"
              :label="$t('pay.transfer.inTaxRate')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inTaxCode"
              :label="$t('pay.transfer.inTaxCode')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inAccountNum"
              :label="$t('pay.transfer.inAccountNum')"
              min-width="170"
              align="center"
            />
            <el-table-column prop="inLocalChainNum" :label="$t('pay.transfer.inLocalChainNum')" min-width="170" align="center" />
            <!-- <el-table-column prop="localChainName" :label="$t('pay.transfer.localChainName')" min-width="170" align="center" /> -->
            <el-table-column
              prop="inCG5Num"
              :label="$t('pay.transfer.inCG5Num')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inBrandNum"
              :label="$t('pay.transfer.inBrandNum')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inMaterielNo"
              :label="$t('pay.transfer.inMaterielNo')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inSalesOffice"
              :label="$t('pay.transfer.inSalesOffice')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inPH2Num"
              :label="$t('pay.transfer.inPH2Num')"
              min-width="170"
              align="center"
            />
            <el-table-column
              prop="inPH2Name"
              :label="$t('pay.transfer.inPH2Name')"
              min-width="170"
              align="center"
            />
            <el-table-column
              :label="$t('pay.transfer.inAmount')"
              min-width="170"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.inAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="inReason"
              :label="$t('pay.transfer.inReason')"
              min-width="170"
              align="center"
            />
          </el-table>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.outSumAmount") }}
              </div>
              <div class="input">
                <milli-input
                  v-model="totalAmountOut"
                  to-fixed-num="2"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.inSumAmount") }}
              </div>
              <div class="input">
                <milli-input
                  v-model="totalAmountIn"
                  to-fixed-num="2"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{
            $t("pay.transfer.remark")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.transfer.remark") }}
              </div>
              <div class="input">
                <el-input
                  v-model="withdraw.remark"
                  type="textarea"
                  rows="3"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{
            $t("comm.attachmentFile")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.transfer.attachmentInfo") }}
              </div>
              <div class="input">
                <attachement
                  v-model="fileList"
                  func-div="withdraw"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { numFormat } from '@/mixins/num-format.js'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'TransferInfo',
  components: { RelFuncSelect, UserSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
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
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      isTrial: false,
      withdraw: {
        totalAmount: '',
        attrs: {},
        detailsIn: [],
        detailsOut: []
      },
      fileList: [],
      processDialog: false,
      distributionChannel: [
        { value: '渠道 01', lable: '01' },
        { value: '渠道 02', lable: '02' },
        { value: '渠道 03', lable: '03' }
      ],
      uses: [
        { value: '用途 01', lable: '01' },
        { value: '用途 02', lable: '02' },
        { value: '用途 03', lable: '03' }
      ],
      prewithdrawType: [
        { value: '1', label: '合同费预提' },
        { value: '2', label: '活动费预提' }
      ]
    }
  },
  computed: {
    totalAmountIn: function() {
      if (this.withdraw.detailsIn && this.withdraw.detailsIn.length > 0) {
        const sum = this.withdraw.detailsIn.map(
          (item) => (!item.inAmount ? 0 : parseFloat(item.inAmount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    },
    totalAmountOut: function() {
      if (this.withdraw.detailsOut && this.withdraw.detailsOut.length > 0) {
        const sum = this.withdraw.detailsOut.map(
          (item) => (!item.outAmount ? 0 : parseFloat(item.outAmount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    }
  },
  watch: {},
  async created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.withdraw.workflowProcessInstId = 'test'
      this.withdraw.prewithdrawType = '合同费预提'
      this.withdraw.prewithdrawName = '合同费预提申请'
      this.withdraw.relIdentiferNum = 'CON20120001'
      this.withdraw.companyName = '花王（上海）产品服务有限公司'
      this.withdraw.department = '销售本部华北区KA-G西北'
      this.withdraw.applyDate = '2021-02-01'
      this.withdraw.applyUserName = '张三'
      this.withdraw.applyUserNum = '010001'
      this.withdraw.remark = '转入转出备注'
      this.withdraw.costIncurredCompany = '京东'
      this.withdraw.uses = '用途 01'
      this.withdraw.distributionChannel = '渠道 01'
      this.withdraw.paymentRemark = '付款信息备注'
      this.withdraw.baseRemark = '基本信息备注'
      this.withdraw.identiferNum = 'PRE20120001'
      this.withdraw.monitorNo = 'MON0001'
      this.withdraw.currency = 'cny'
      this.withdraw.oriFinancialDocNo = '00000001'
      this.withdraw.detailsIn.push({
        inSubjectNum: '409-1',
        inSubjectName: '销售折扣',
        inAccountNum: '460-300052',
        inPH2Num: 'ph201',
        inPH2Name: 'PH201名称',
        inLocalChainNum: 'Local Chain 01',
        inSalesOffice: 'Sales Office 01',
        inBrandNum: 'MED',
        subBrandName: 'MERRIES EXTRA DAY',
        inCG5Num: 'CG501',
        inAmount: '234.5',
        inReason: '合同费已计提'
      })
      this.withdraw.detailsIn.push({
        inSubjectNum: '409-2',
        inSubjectName: '销售折扣',
        inAccountNum: '460-300052',
        inLocalChainNum: 'Local Chain 02',
        inSalesOffice: 'Sales Office 02',
        inBrandNum: 'UV',
        inAmount: '234'
      })
      this.withdraw.detailsIn.push({
        inSubjectNum: '409-3',
        inSubjectName: '销售折扣',
        inAccountNum: '460-300052',
        inLocalChainNum: 'Local Chain 03',
        inSalesOffice: 'Sales Office 03',
        inBrandNum: 'MED',
        inAmount: '120.51'
      })
      this.withdraw.detailsOut.push({
        outSubjectNum: '409-1',
        outSubjectName: '销售折扣',
        outAccountNum: '460-300052',
        outPH2Num: 'ph201',
        outPH2Name: 'PH201名称',
        outLocalChainNum: 'Local Chain 01',
        outSalesOffice: 'Sales Office 01',
        outBrandNum: 'MED',
        outCG5Num: 'CG501',
        outAmount: '234.5',
        outReason: '合同费已计提'
      })
      this.withdraw.detailsOut.push({
        outSubjectNum: '409-1',
        outSubjectName: '销售折扣',
        outAccountNum: '460-300052',
        outLocalChainNum: 'Local Chain 02',
        outSalesOffice: 'Sales Office 02',
        outBrandNum: 'UV',
        outAmount: '234'
      })
      this.withdraw.detailsOut.push({
        outSubjectNum: '409-1',
        outSubjectName: '销售折扣',
        outAccountNum: '460-300052',
        outLocalChainNum: 'Local Chain 03',
        outSalesOffice: 'Sales Office 03',
        outBrandNum: 'MED',
        outAmount: '120.51'
      })
      this.$emit('load', this.withdraw)
      this.isLoading = false
    },
    handleSubmit(submitType) {
      // for (const ref in this.$refs) {
      //   if (this.$refs[ref] && this.$refs[ref].length > 0) {
      //     const obj = this.$refs[ref][0]
      //     // 页面嵌套vue组件调用验证方法
      //     if (obj.hasOwnProperty('validatorAll')) {
      //       this.$refs[ref][0].validatorAll()
      //       if (!this.$refs[ref][0].validatorState) return false
      //     } else {
      //       // 本页面调用验证方法
      //       if (!this.validator(ref)) return false
      //     }
      //   }
      // }
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>
