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
              <div class="title">
                费用发生公司
              </div>
              <div class="input">
                <!-- <rel-func-select v-model="adjust.costIncurredCompany" rel-func="account" :disabled="!!adjust.identiferNum" /> -->
                <el-input v-model="adjust.costIncurredCompany" :disabled="true" />
              </div>
            </div>
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
                部门
              </div>
              <div class="input">
                <el-input v-model="adjust.department" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                调整年度
              </div>
              <div class="input">
                <el-date-picker v-model="adjust.adjustYear" size="small" type="year" value-format="yyyy" format="yyyy年" :disabled="!!adjust.identiferNum" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                用途
              </div>
              <div class="input">
                <el-input v-model="adjust.uses" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                用途类型
              </div>
              <div class="input">
                <el-checkbox-group
                  v-model="adjust.usesType"
                >
                  <el-checkbox
                    v-for="item in usesType"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                  >
                    {{ item.dictName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                客户名称
              </div>
              <div class="input">
                <rel-func-select v-model="adjust.accountName" rel-func="account" @data="handleSetAccountInfo" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                客户Code
              </div>
              <div class="input">
                <el-input v-model="adjust.accountNum" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                Sold-to名称
              </div>
              <div class="input">
                <rel-func-select v-model="adjust.soldtoName" rel-func="account" @data="handleSetSoldtoInfo" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                Sold-to Code
              </div>
              <div class="input">
                <el-input v-model="adjust.soldtoCode" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                渠道
              </div>
              <div class="input">
                <el-select v-model="adjust.channel" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in channel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                合同返利(412-50)
              </div>
              <div class="input">
                <milli-input v-model="adjust.contractRebate" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                国际返利(412-55)
              </div>
              <div class="input">
                <milli-input v-model="adjust.internationalRebate" to-fixed-num="1" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                基本交易折扣(408-1054)
              </div>
              <div class="input">
                <milli-input v-model="adjust.basicTransactionDis" to-fixed-num="1" append="%" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">返利维护信息
          </span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                返利类型
              </div>
              <div class="input">
                <el-checkbox-group
                  v-model="adjust.rebateType"
                >
                  <el-checkbox
                    v-for="item in rebateType"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                  >
                    {{ item.dictName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                SPD
              </div>
              <div class="input">
                <milli-input v-model="adjust.spd" to-fixed-num="1" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                票扣点数
              </div>
              <div class="input">
                <milli-input v-model="adjust.ticketDeduPoints" to-fixed-num="1" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                是否含税
              </div>
              <div class="input">
                <dict-radio v-model="adjust.isIncludedTax" dict-type-id="IsNo" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                是否红票
              </div>
              <div class="input">
                <dict-radio v-model="adjust.isRedTicket" dict-type-id="IsNo" @change="handleClearTaxes" />
              </div>
            </div>
            <div v-if="adjust.isRedTicket==='1'" class="flex3">
              <div class="title">
                税金（红票时填写）
              </div>
              <div class="input">
                <milli-input v-model="adjust.taxes" to-fixed-num="1" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                计算基准
              </div>
              <div class="input">
                <el-radio v-model="adjust.calculationBasis" label="1">
                  Gross Sales
                </el-radio>
                <el-radio v-model="adjust.calculationBasis" label="2">
                  Net sales
                </el-radio>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                返利计算公式
              </div>
              <div class="input">
                <el-input v-model="adjust.rebateCalcFormula" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                返利计算结果
              </div>
              <div class="input">
                <milli-input v-model="adjust.rebateCalcResult" to-fixed-num="1" append="%" :disabled="true" />
                <el-button class="editbtn" size="mini" @click.stop="handleCalcRebateRate">
                  返利率计算
                </el-button>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                调整生效日
              </div>
              <div class="input">
                <el-date-picker v-model="adjust.adjustEffectiveDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                调整截止日
              </div>
              <div class="input">
                <el-date-picker v-model="adjust.adjustEndDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </div>
            </div>
          </div>
          <div
            v-if="!!adjust.rebateRecord && adjust.rebateRecord.length > 0"
            class="input_box"
          >
            <div class="flex1">
              <div class="title" />
              <div class="input">
                <el-table
                  ref="table"
                  :data="adjust.rebateRecord"
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
                  <el-table-column label="调整日期" min-width="170" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.adjustDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="调整起效日期" min-width="170" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.effectiveDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="调整返利比率" min-width="170" align="right">
                    <template slot-scope="scope">
                      {{ scope.row.rebateRate | numFormat(2) }}%
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">基本交易折扣维护信息
          </span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                基本交易折扣类型
              </div>
              <div class="input">
                <el-checkbox-group
                  v-model="adjust.basicTransactionDiscType"
                >
                  <el-checkbox
                    v-for="item in basicTransactionDiscType"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                  >
                    {{ item.dictName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                调整折扣率
              </div>
              <div class="input">
                <milli-input v-model="adjust.baseAdjustDiscRate" to-fixed-num="2" append="%" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                调整生效日
              </div>
              <div class="input">
                <el-date-picker v-model="adjust.baseEffectiveDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                调整截至日
              </div>
              <div class="input">
                <el-date-picker v-model="adjust.baseEndDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </div>
            </div>
          </div>
          <div
            v-if="!!adjust.basicTransactionDisRecord && adjust.basicTransactionDisRecord.length > 0"
            class="input_box"
          >
            <div class="flex1">
              <div class="title" />
              <div class="input">
                <el-table
                  ref="table"
                  :data="adjust.basicTransactionDisRecord"
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
                  <el-table-column label="调整日期" min-width="170" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.adjustDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="调整起效日期" min-width="170" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.effectiveDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="调整返利比率" min-width="170" align="right">
                    <template slot-scope="scope">
                      {{ scope.row.basicTransactionDisRate | numFormat(2) }}%
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">备注</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                备注
              </div>
              <div class="input">
                <el-input v-model="adjust.remark" type="textarea" rows="3" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">附件</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                附件信息
              </div>
              <div class="input">
                <attachement v-model="fileList" func-div="adjust" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
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
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <!-- 变更履历 -->
        <li v-if="id && !$route.query.copy" class="operation-item" @click="historyDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div v-if="processDialog">
      <process-detail :key="processInstId" :is-show="processDialog" :title="$t('component.taskApprove.detailedProcess') + processInstId" :process-inst-id="processInstId" @close="processDialog=false" />
    </div>
    <div class="historyDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his :key="adjust.identiferNum" func-div="adjust" :identifer-num="adjust.identiferNum" />
      </el-drawer>
    </div>
    <!-- <div class="depSelect">
      <el-dialog
        :title="'部门选择'"
        :visible.sync="selectDepartmentDialog"
        append-to-body
        custom-class="content-dialog-userSelect"
        min-width="25%"
      >
        <user-org-tree
          tree-type="department"
          :multiple="false"
          @select="handleTreeSelect"
          @cancel="selectDepartmentDialog=false"
          @clear="handleTreeClear"
        />
      </el-dialog>
    </div> -->
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
export default {
  name: 'AdjustEdit',
  components: { UserSelect, RelFuncSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      selectDepartmentDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      adjust: {
        workflowProcessInstId: '',
        taxes: '',
        isRedTicket: '',
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
        { dictName: 'ZHRM(Monthly rebate)', dictId: '4' }],
      basicTransactionDiscType: [{ dictName: 'ZH23(Basic trade discount)', dictId: '1' }]
    }
  },
  computed: {
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    }
  },
  watch: {

  },
  async created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.adjust.department = 'KA部'
      this.adjust.applyUserName = '张三'
      this.adjust.applyUserNum = '100000001'
      this.adjust.applyDate = new Date()
    }
    this.adjust.costIncurredCompany = '花王（上海）产品服务有限公司'
    this.adjust.adjustYear = new Date()
    this.adjust.currency = 'CNY'
  },
  methods: {
    async fetchData() {
      this.adjust.workflowProcessInstId = 'test'
      this.adjust.identiferNum = 'AV0001'
      this.adjust.costIncurredCompany = '花王（上海）产品服务有限公司'
      this.adjust.applyDate = '2021-02-01'
      this.adjust.department = 'KA部'
      this.adjust.applyUserName = '张三'
      this.adjust.applyUserNum = '100000001'
      this.adjust.uses = '沃尔玛第二季度返利率维护'

      this.adjust.usesType = ['01']
      this.adjust.adjustPeriod = '1Q'

      this.adjust.accountNum = '231212232'
      this.adjust.accountName = '上海信域贸易'
      this.adjust.soldtoCode = '231212777'
      this.adjust.soldtoName = '上海亚科'
      this.adjust.channel = '1'

      this.adjust.brand = '芙丽芳丝'
      this.adjust.contractRebate = '3'

      this.adjust.internationalRebate = '2.5'
      this.adjust.basicTransactionDis = '8'
      this.adjust.rebateType = ['2', '3']
      this.adjust.ticketDeduPoints = '1'

      this.adjust.spd = '2.4'
      this.adjust.isIncludedTax = '0'

      this.adjust.isRedTicket = '1'
      this.adjust.taxes = 7
      this.adjust.calculationBasis = '2'
      this.adjust.rebateCalcFormula = '(Net Sales*1.13/1.13)/0.7637*2%=Net Sales *2.62%）'
      this.adjust.rebateCalcResult = '3.5'

      this.adjust.rebateRate = '2.77'
      this.adjust.adjustEffectiveDate = '2021-09-01'
      this.adjust.adjustEndDate = '2021-09-30'
      this.adjust.basicTransactionDiscType = ['1']

      this.adjust.baseAdjustDiscRate = '2.8'
      this.adjust.baseEffectiveDate = '2021-10-01'
      this.adjust.baseEndDate = '2021-10-31'
      this.adjust.remark = '备注XXXXXXXXXX-----------------'
      this.handleUploadTemplate()
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
    },
    handleDeleteDetail(index) {
      this.adjust.details.splice(index, 1)
    },
    handleUploadTemplate() {
      this.adjust.details = []
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
    },
    handleDownloadTemplate() {

    },
    handleCalcRebateRate() {
      this.$set(this.adjust, 'rebateCalcResult', '3')
    },
    handleSetAccountInfo(data) {
      if (data) {
        this.adjust.accountNum = data[0].id
      }
    },
    handleSetSoldtoInfo(data) {
      if (data && data[0]) {
        this.adjust.soldtoCode = data[0].id
      }
    },
    handleTreeSelect(data) {
      // this[this.activeInput].name = data.text
      // this[this.activeInput].id = data.id
      this.adjust.department = data.text
      this.selectDepartmentDialog = false
    },
    handleTreeClear() {
      // this[this.activeInput].name = ''
      // this[this.activeInput].id = ''
      this.adjust.department = ''
      this.selectDepartmentDialog = false
    },
    openSelect() {
      // this.activeInput = activeInput
      // this.selectData = this[this.activeInput]
      this.selectDepartmentDialog = true
    },
    handleAddDetail() {
      this.adjust.details.push({
        expenseAccount: '',
        accountNum: '',
        withdrawIdentiferNum: '',
        salesofficeNum: '',
        cg4Num: '',
        cg5Num: '',
        subBrandNum: '',
        materialNum: '',
        phNum: '',
        customerNum: '',
        adjustAmount: ''
      })
    },
    handleClearTaxes(selectValue) {
      this.adjust.taxes = ''
    }
  }
}
</script>
