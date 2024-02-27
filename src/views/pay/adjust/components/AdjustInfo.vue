<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="adjust.identiferNum" class="pagespan">Monitor NO.: {{ adjust.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                费用类型
              </div>
              <div class="input">
                <el-select v-model="adjust.expenseType" :disabled="true">
                  <el-option
                    v-for="item in expenseType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用发生公司
              </div>
              <div class="input">
                <rel-func-select v-model="adjust.costIncurredCompany" rel-func="account" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                部门
              </div>
              <div class="input">
                <el-input v-model="adjust.department" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                申请人
              </div>
              <div class="input">
                <user-select v-model="adjust.applyUserName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                申请人工号
              </div>
              <div class="input">
                <el-input v-model="adjust.applyUserNum" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                申请日期
              </div>
              <div class="input">
                <el-date-picker v-model="adjust.applyDate" size="small" type="date" value-format="yyyy-MM-dd" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                调整年度
              </div>
              <div class="input">
                <el-date-picker v-model="adjust.adjustYear" size="small" type="year" value-format="yyyy" format="yyyy年" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                调整期间
              </div>
              <div class="input">
                <el-input v-model="adjust.adjustPeriod" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                币种
              </div>
              <div class="input">
                <dict-select v-model="adjust.currency" dict-type-id="Currency" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                用途
              </div>
              <div class="input">
                <el-input v-model="adjust.uses" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">费用调整信息</span>
          <el-table
            v-if="!!adjust.details && adjust.details.length > 0"
            ref="table"
            :data="adjust.details"
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
            <el-table-column label="费用科目" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.expenseAccount }}
              </template>
            </el-table-column>
            <el-table-column label="费目编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.accountNum }}
              </template>
            </el-table-column>
            <el-table-column v-if="!!adjust.expenseType && adjust.expenseType!=='1'" label="预提单编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.withdrawIdentiferNum }}
              </template>
            </el-table-column>
            <el-table-column label="Salesoffice编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.salesofficeNum }}
              </template>
            </el-table-column>
            <el-table-column label="CG4编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.cg4Num }}
              </template>
            </el-table-column>
            <el-table-column label="CG5编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.cg5Num }}
              </template>
            </el-table-column>
            <el-table-column label="SubBrand编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.subBrandNum }}
              </template>
            </el-table-column>
            <el-table-column label="Material编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.materialNum }}
              </template>
            </el-table-column>
            <el-table-column label="PH编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.phNum }}
              </template>
            </el-table-column>
            <el-table-column label="Customer编号" min-width="170" align="center">
              <template slot-scope="scope">
                {{ scope.row.customerNum }}
              </template>
            </el-table-column>
            <el-table-column label="调整金额" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.adjustAmount | numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                调整总金额
              </div>
              <div class="input">
                <milli-input v-model="adjustTotalAmount" to-fixed-num="2" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">备注</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="adjust.remark" type="textarea" rows="3" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">附件</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                附件信息
              </div>
              <div class="input">
                <attachement v-model="fileList" func-div="adjust" :disabled="true" />
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
import { numFormat } from '@/mixins/num-format'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
// import DictRadio from '@/components/DictRadio.vue'
export default {
  name: 'AdjustInfo',
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
      activeNames: ['1', '2', '3', '4'],
      adjust: {
        usesType: [],
        rebateType: [],
        basicTransactionDiscType: [],
        adjustTotalAmount: '',
        attrs: {
        },
        details: [],
        rebateRecord: [],
        basicTransactionDisRecord: []
      },
      fileList: [],
      processDialog: false,
      expenseType: [
        {
          value: '1',
          label: 'BT费用调整'
        }, {
          value: '2',
          label: 'OE费用调整'
        }, {
          value: '3',
          label: 'CD费用调整'
        }, {
          value: '4',
          label: '返利/基本交易折扣维护'
        }
      ],
      channel: [
        {
          value: '1',
          label: '直销'
        }
      ],
      usesType: [{ dictName: '创建', dictId: '01' },
        { dictName: '修改', dictId: '02' },
        { dictName: '删除', dictId: '03' }],
      rebateType: [{ dictName: 'ZHRB(Local rebate)', dictId: '1' },
        { dictName: 'ZHRD(Regional rebate)', dictId: '2' },
        { dictName: 'ZHRF( Quarterly rebate)', dictId: '3' },
        { dictName: 'ZHRM(Monthly rebate)', dictId: '4' },
        { dictName: '不调整', dictId: '5' }],
      basicTransactionDiscType: [{ dictName: 'ZH23(Basic trade discount)', dictId: '1' },
        { dictName: '不调整', dictId: '2' }]
    }
  },
  computed: {
    adjustTotalAmount: function() {
      if (this.adjust.details && this.adjust.details.length > 0) {
        const sum = this.adjust.details.map(item => !item.adjustAmount ? 0 : parseFloat(item.adjustAmount), 2)
        return sum.reduce((sum, item) => sum + item)
      }
      return 0.00
    }

  },
  watch: {
  },
  async created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.adjust.workflowProcessInstId = 'test'

      this.adjust.costIncurredCompany = '花王（上海）产品服务有限公司'
      this.adjust.adjustYear = new Date()
      this.adjust.currency = 'CNY'

      this.adjust.identiferNum = 'ADJ20120001'
      if (this.id) {
        this.adjust.expenseType = this.id
      }
      this.adjust.costIncurredCompany = '花王（上海）产品服务有限公司'
      this.adjust.applyDate = '2021-02-01'
      this.adjust.department = 'KA部'
      this.adjust.applyUserName = '张三'
      this.adjust.applyUserNum = '100000001'
      this.adjust.usesType = ['01']
      this.adjust.adjustPeriod = '1Q'
      this.adjust.uses = 'XXXXXXXX费用调整'
      this.adjust.accountNum = '231212232'
      this.adjust.accountName = '上海信域贸易'
      this.adjust.soldtoNum = '231212777'
      this.adjust.soldtoName = '上海亚科'
      this.adjust.brand = '芙丽芳丝'
      this.adjust.yearRebate = '3'
      this.adjust.internationalRebate = '2.5'
      this.adjust.basicTransactionDis = '8'
      this.adjust.ticketDeduPoints = '1'
      this.adjust.channel = '1'
      this.adjust.spd = '2.4'
      this.adjust.isIncludedTax = '0'

      this.adjust.isRedTicket = '1'
      this.adjust.calculationBasis = '2'
      this.adjust.rebateCalcResult = '3.5'
      this.adjust.rebateType = ['2', '4']
      this.adjust.rebateRate = '2.77'
      this.adjust.effectiveMonth = '2021-09'
      this.adjust.basicTransactionDiscType = ['1']

      this.adjust.baseAdjustDiscRate = '2.8'
      this.adjust.baseEffectiveMonth = '2021-10'
      this.adjust.remark = '备注XXXXXXXXXX-----------------'
      this.adjust.details.push({
        expenseAccount: '集中配送费',
        accountNum: '460-3000S2',
        withdrawIdentiferNum: 'PRE20120001',
        salesofficeNum: 'AV01',
        cg4Num: 'R06',
        cg5Num: 'A00',
        subBrandNum: '1518005',
        materialNum: '998619',
        phNum: '18位',
        customerNum: '11451230',
        adjustAmount: '23423.32'
      })
      this.adjust.details.push({
        expenseAccount: '集中配送费',
        accountNum: '460-3000S2',
        withdrawIdentiferNum: 'PRE20120002',
        salesofficeNum: 'AV02',
        cg4Num: 'R06',
        cg5Num: 'A00',
        subBrandNum: '1518005',
        materialNum: '998628',
        phNum: '18位',
        customerNum: '31002240',
        adjustAmount: '23444.12'
      })
      this.adjust.details.push({
        expenseAccount: '不退货折扣',
        accountNum: '460-3000S1',
        withdrawIdentiferNum: 'PRE20120003',
        salesofficeNum: 'AV01',
        cg4Num: 'R07',
        cg5Num: 'B00',
        subBrandNum: '1518005',
        materialNum: '911882',
        phNum: '18位',
        customerNum: '11452202',
        adjustAmount: '11123'
      })
      this.adjust.details.push({
        expenseAccount: '不退货折扣',
        accountNum: '460-3000S1',
        withdrawIdentiferNum: 'PRE20120004',
        salesofficeNum: 'AV03',
        cg4Num: 'R07',
        cg5Num: 'B00',
        subBrandNum: '1518005',
        materialNum: '74891',
        phNum: '18位',
        customerNum: '5172132',
        adjustAmount: '666.2'
      })
      this.adjust.rebateRecord.push({
        adjustDate: '2020-10-01',
        effectiveDate: '2020-11-01',
        rebateRate: '3'
      })
      this.adjust.rebateRecord.push({
        adjustDate: '2020-12-01',
        effectiveDate: '2020-12-15',
        rebateRate: '4'
      })
      this.adjust.basicTransactionDisRecord.push({
        adjustDate: '2020-10-01',
        effectiveDate: '2020-11-01',
        basicTransactionDisRate: '3.5'
      })
      this.adjust.basicTransactionDisRecord.push({
        adjustDate: '2020-12-01',
        effectiveDate: '2020-12-15',
        basicTransactionDisRate: '4'
      })
      this.$emit('load', this.adjust)
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
