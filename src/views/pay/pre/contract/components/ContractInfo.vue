<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="withdraw.identiferNum" class="pagespan">{{ $t('pay.pre.contract.identiferNum') }}: {{ withdraw.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <!-- <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.prewithdrawType') }}
              </div>
              <div class="input">
                <el-select v-model="withdraw.prewithdrawType" :disabled="true">
                  <el-option
                    v-for="item in prewithdrawType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.prewithdrawName') }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.prewithdrawName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.relIdentiferNum') }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.relIdentiferNum" :disabled="true" />
              </div>
            </div>
          </div> -->
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.companyName') }}
              </div>
              <div class="input">
                <rel-func-select v-model="withdraw.companyName" :rel-func="'account'" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.department') }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.department" readonly :disabled="true">
                  <i slot="suffix" class="iconfont icon-zuzhijiagou" @click.stop="openSelect" />
                </el-input>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.applyDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="withdraw.applyDate" size="small" type="date" value-format="yyyy-MM-dd" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.applyUserName') }}
              </div>
              <div class="input">
                <user-select v-model="withdraw.applyUserName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.applyUserNum') }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.applyUserNum" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                财务处理完成
              </div>
              <div class="input">
                <el-date-picker v-model="withdraw.financialDate" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('pay.pre.contract.baseRemark') }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.baseRemark" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t('pay.pre.contract.paymentInfo') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.costIncurredCompany') }}
              </div>
              <div class="input">
                <rel-func-select v-model="withdraw.costIncurredCompany" :rel-func="'account'" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.uses') }}
              </div>
              <div class="input">
                <el-select v-model="withdraw.uses" :disabled="true">
                  <el-option
                    v-for="item in uses"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.contract.distributionChannel') }}
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
            </div>
          </div>
          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('pay.pre.contract.paymentRemark') }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.paymentRemark" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('pay.pre.motion.currency') }}
              </div>
              <div class="input">
                <dict-select v-model="withdraw.currency" dict-type-id="Currency" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{ $t('pay.pre.contract.lineDetail') }}</span>
          <el-table
            ref="table"
            :data="withdraw.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column label="No." min-width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="contractIdentiferNum" :label="$t('pay.pre.contract.contractIdentiferNum')" min-width="170" align="center" />
            <el-table-column prop="accountNum" :label="$t('pay.pre.contract.subjectNum')" min-width="170" align="center" />
            <el-table-column prop="accountName" :label="$t('pay.pre.contract.subjectName')" min-width="170" align="center" />
            <el-table-column prop="localChainNum" :label="$t('pay.pre.contract.localChainNum')" min-width="170" align="center" />
            <el-table-column prop="localChainName" :label="$t('pay.pre.contract.localChainName')" min-width="170" align="center" />
            <el-table-column prop="salesOfficeNum" :label="$t('pay.pre.contract.salesOfficeNum')" min-width="170" align="center" />
            <el-table-column prop="subBrandNum" :label="$t('pay.pre.contract.subBrandNum')" min-width="170" align="center" />
            <el-table-column prop="subBrandName" :label="$t('pay.pre.contract.subBrandName')" min-width="170" align="center" />
            <el-table-column :label="$t('pay.pre.contract.amount')" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.amount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="planUseDate" :label="$t('pay.pre.contract.planUseDate')" min-width="170" align="center" />
          </el-table>
          <div class="input_box">
            <div class="flex3" />
            <div class="flex3" />
            <div class="flex3">
              <div class="title">
                总金额
              </div>
              <div class="input">
                <milli-input v-model="totalAmount" to-fixed-num="2" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{ $t('pay.pre.contract.remark') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('pay.pre.contract.remark') }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.remark" type="textarea" rows="3" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{ $t('pay.pre.contract.attachmentFile') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('pay.pre.contract.attachmentInfo') }}
              </div>
              <div class="input">
                <attachement v-model="fileList" func-div="withdraw" :disabled="true" />
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
  name: 'ContractInfo',
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
        attrs: {
        },
        details: []
      },
      fileList: [],
      processDialog: false,
      distributionChannel: [{ value: '渠道 01', lable: '01' }, { value: '渠道 02', lable: '02' }, { value: '渠道 03', lable: '03' }],
      uses: [{ value: '202009-CD计提', lable: '01' }, { value: '用途 02', lable: '02' }, { value: '用途 03', lable: '03' }]
    }
  },
  computed: { totalAmount: function() {
    if (this.withdraw.details && this.withdraw.details.length > 0) {
      const sum = this.withdraw.details.map(item => !item.amount ? 0 : parseFloat(item.amount), 2)
      return sum.reduce((sum, item) => sum + item)
    }
    return ''
  }
  },
  watch: {
  },
  async created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.withdraw.workflowProcessInstId = 'test'
      this.withdraw.workflowFlag = '0'
      this.withdraw.lastFlag = 1
      this.withdraw.companyName = '花王（上海）产品服务有限公司'
      this.withdraw.department = 'KA部'
      this.withdraw.applyDate = '2021-02-01'
      this.withdraw.applyUserName = '张三'
      this.withdraw.applyUserNum = '010001'
      this.withdraw.financialDate = new Date()
      this.withdraw.remark = '预提备注'
      this.withdraw.costIncurredCompany = '京东'
      this.withdraw.uses = '202009-CD计提'
      this.withdraw.distributionChannel = '渠道 01'
      this.withdraw.paymentRemark = '付款信息备注'
      this.withdraw.baseRemark = '基本信息备注'
      this.withdraw.identiferNum = 'AV0001'
      this.withdraw.currency = 'cny'
      this.withdraw.details.push({
        contractIdentiferNum: 'CON20120001',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'R01',
        localChainName: 'Carrefour',
        salesOfficeNum: 'AV01',
        // subBrandNum: 'MED',
        // subBrandName: 'MERRIES EXTRA DAY',
        amount: '234.5',
        planUseDate: '2021-10-01'
      })
      this.withdraw.details.push({
        contractIdentiferNum: 'CON20120002',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'R04',
        localChainName: 'Lotus',
        salesOfficeNum: 'AV01',
        // subBrandNum: 'UV',
        // subBrandName: 'Biro UV',
        amount: '234',
        planUseDate: '2021-10-01'
      })
      this.withdraw.details.push({
        contractIdentiferNum: 'CON20120003',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'R05',
        localChainName: 'Metro',
        salesOfficeNum: 'AV03',
        // subBrandNum: 'MED',
        // subBrandName: 'MERRIES EXTRA DAY',
        amount: '120.51',
        planUseDate: '2021-10-01'
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
