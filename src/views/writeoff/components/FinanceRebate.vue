<template>
  <!-- 编辑画面 -->
  <div v-loading="isisloading" class="summary">
    <div class="detail">
      <!-- <div class="pagetitle">
        <span v-if="writeoff.identiferNum" class="pagespan">清账编号: {{ writeoff.identiferNum }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                核销单号
              </div>
              <div class="input">
                <dict-select dict-type-id="Dept" :value="writeoff.verificationCode" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                代理商名称
              </div>
              <div class="input">
                <el-input v-model="writeoff.custName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                预定支付日
              </div>
              <div class="input">
                <el-date-picker v-model="writeoff.datePrePay" type="date" value-format="yyyy-MM-dd" clearable @change="datePrePayChange()" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                发生年月
              </div>
              <div class="input">
                <el-input v-model="writeoff.verifyYm" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                一级费目
              </div>
              <div class="input">
                <dict-select dict-type-id="AccountTypeView" :value="writeoff.finAccountType" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">开票信息</span>
          <el-table
            ref="table"
            max-height="720"
            :data="writeoff.invBookHisList"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column prop="productCategory" label="品类" min-width="170" align="center" />
            <el-table-column prop="payAmount" label="支付金额" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.payAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="invAmount" label="已开票金额" min-width="170" align="right">
              <template slot-scope="scope">
                <span style="color:#18baf4;cursor:pointer;" @click="getInvList(scope.row)">{{ scope.row.invAmountWithTax|numFormat(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="noInvAmount" label="未开票金额" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.noInvAmount|numFormat(2) }}
              </template>
            </el-table-column>>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">费用信息</span>

          <el-table
            ref="table"
            max-height="720"
            :data="writeoff.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column label="单包管理手续费" prop="SX" min-width="170" align="right">
              <template v-if="!!writeoff.details[0]['SX']" slot-scope="scope">
                {{ scope.row.SX |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="月度" min-width="70">
              <el-table-column prop="TQ" label="提前下单货补" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['TQ']" slot-scope="scope">
                  {{ scope.row.TQ |numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="YG" label="预估准确性" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['YG']" slot-scope="scope">
                  {{ scope.row.YG |numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="季度" min-width="170" align="center">
              <el-table-column prop="JD" label="销售目标达成" min-width="220" align="right">
                <template v-if="!!writeoff.details[0]['JD']" slot-scope="scope">
                  {{ scope.row.JD |numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="半年" min-width="70">
              <el-table-column prop="BN" label="销售目标达成" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['BN']" slot-scope="scope">
                  {{ scope.row.BN |numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="WL" label="物流破损补贴" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['WL']" slot-scope="scope">
                  {{ scope.row.WL |numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="年度" min-width="170" align="right">
              <el-table-column prop="ND" label="销售目标达成" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['ND']" slot-scope="scope">
                  {{ scope.row.ND |numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="直供终端订单" min-width="170" prop="QT" lign="right">
              <template v-if="!!writeoff.details[0]['QT']" slot-scope="scope">
                {{ scope.row.QT |numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>

          <el-table
            ref="table"
            max-height="720"
            :data="writeoff.details2"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column label="销售实际" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.salesPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="合同费差异" min-width="170" prop="contractCostVariance" align="right">
              <template slot-scope="scope">
                {{ scope.row.contractCostVariance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="前月结转" min-width="170" prop="forwardInAmount" align="right">
              <template slot-scope="scope">
                {{ scope.row.forwardInAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="本月应付" min-width="170" prop="perfomance" align="right">
              <template slot-scope="scope">
                {{ scope.row.rebateAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="本月结转" min-width="170" prop="forwardOutAmount" align="right">
              <template slot-scope="scope">
                {{ scope.row.forwardOutAmount |numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">其他信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                创建时间
              </div>
              <el-date-picker
                v-model="writeoff.createTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                创建者
              </div>
              <div class="input">
                <user-select
                  v-model="writeoff.createBy"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                最后修改时间
              </div>
              <el-date-picker
                v-model="writeoff.updateTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                最后修改者
              </div>
              <div class="input">
                <user-select
                  v-model="writeoff.updateBy"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog
      class="content-dialog-box  search-light rules rulesEdit"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      title="开票详情"
      :visible.sync="invDetailDialog"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="pop_title" style="text-align:left;" />
      <div class="pop_content">
        <div class="titlemain">
          <el-table
            ref="table"
            :data="invList"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column prop="invDate" label="开票日期" min-width="170" align="right" />
            <el-table-column prop="invAmount" label="开票金额" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.invAmount|numFormat(2) }}
              </template>
            </el-table-column>>
          </el-table>
        </div>
      </div>
      <div class="btn">
        <button class="cancel" @click="handleClose">
          关闭
        </button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
import { getInvList, getFinanceDetailById } from '@/api/writeoff/finance'
export default {
  name: 'FinanceRebate',
  components: { UserSelect },
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
      isisloading: false,
      isLoading: true,
      historyDialog: false,
      taskId: '',
      activeNames: ['1', '2', '3', '4'],
      writeoff: {
        details: [{}],
        details2: []
      },
      fileList: [],
      invList: [],
      invDetailDialog: false,
      actSumAmount: '',
      contractCostVariance: ''
    }
  },
  computed: {
  },
  watch: {
  },
  async created() {
    this.fetchData()
    this.taskId = this.$route.query.taskId
  },
  methods: {
    async fetchData() {
      this.isisloading = true
      // console.log(this.$route.query.id, 'this.$route.query.id111')
      const res = await getFinanceDetailById(this.$route.query.id)
      if (res && res.success) {
        this.writeoff = res.datas.data
        this.writeoff.taskId = this.taskId
        const detailData = this.writeoff.resultMap
        this.writeoff.details = detailData.yueRuleDataList
        this.writeoff.details2 = [detailData.rebateBook]
        this.actSumAmount = detailData.actSumAmount
        this.contractCostVariance = this.writeoff.contractCostVariance
        this.$emit('rebate', this.writeoff)
      }
      this.isisloading = false
    },
    async getInvList(row) {
      const res = await getInvList(row)
      this.invList = res.datas.data
      this.invDetailDialog = true
    },
    handleClose() {
      this.invDetailDialog = false
    },
    datePrePayChange() {
      this.$emit('rebate', this.writeoff)
    }
  }
}
</script>
