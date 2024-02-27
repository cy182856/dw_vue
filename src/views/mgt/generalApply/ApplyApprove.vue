<template>
  <!-- 明细画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('mgt.generalApply.identiferNum') }}: {{ apply.identiferNum }} {{ $t('comm.version') }}: {{ apply.version }}</span>
      </div>
      <div style="width:100%;background-color:white;border-radius: 11px;padding-top:15px">
        <div class="input_box">
          <div class="flex3">
            <div class="title" style="margin-left:20px;font-weight:bolder;padding-left:10px">
              {{ $t('mgt.generalApply.applyType') }}
            </div>
            <div class="input">
              <el-select v-model="apply.applyType" placeholder="请选择" :disabled="!!id" clearable>
                <el-option
                  v-for="item in applyType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <advertisingSurvey-info v-if="apply.applyType==='1'" :id="id" :key="id" type="approve" :apply="apply" :disabled="true" />
    <promoter-info v-if="apply.applyType==='2'" :id="id" :key="id" type="approve" :apply="apply" :disabled="true" />
    <sampleApply-info v-if="apply.applyType==='3' || apply.applyType==='4'" :id="id" :key="id" type="approve" :apply="apply" :disabled="true" />
    <reIssue-info v-if="apply.applyType==='5'" :id="id" :key="id" type="approve" :apply="apply" :disabled="true" />
    <return-info v-if="apply.applyType==='6'" :id="id" :key="id" type="approve" :apply="apply" :disabled="true" />
    <seal-use-info v-if="apply.applyType==='7'" :id="id" :key="id" type="approve" :apply="apply" :disabled="true" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
// import DictSelect from '@/components/DictWrite'
// import applyInfo from '@/views/mgt/apply/components/applyInfo'
import AdvertisingSurveyInfo from '@/views/mgt/generalApply/components/AdvertisingSurveyInfo'
import SampleApplyInfo from '@/views/mgt/generalApply/components/SampleApplyInfo'
import ReIssueInfo from '@/views/mgt/generalApply/components/ReIssueInfo'
import ReturnInfo from '@/views/mgt/generalApply/components/ReturnInfo'
export default {
  name: 'ApplyApprove',
  components: { AdvertisingSurveyInfo, SampleApplyInfo, ReIssueInfo, ReturnInfo },
  data() {
    return {
      applyType: [
        { value: '1', label: '1：广告费&调查费申请' },
        { value: '2', label: '2：Promoter费用申请' },
        { value: '3', label: '3：样品/试用品申请' },
        { value: '4', label: '4：促销品申请' },
        { value: '5', label: '5：改票申请' },
        { value: '6', label: '6：退货申请' }],
      apply: {
        monthExpenseList: [],
        reciveList: []
      }
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
    }
  },
  methods: {
    fetchData(apply) {
      if (this.id === '1') {
        // -------------------1：广告费&调查费申请------------------------
        this.apply.applyType = '1'
        this.apply.applyName = '广告费&调查费申请'
        this.apply.assignedUser = '西西'
        this.apply.content = '2021 广告费'
        this.apply.period = ['2021-04-01', '2021-05-01']
        this.apply.busInvitationCondition = '需要满足几个要求'
        this.apply.expense = 21898.32
        this.apply.details.push({
          month: '2021-03',
          amount: 234
        }, {
          month: '2021-04',
          amount: 234.76
        }, {
          month: '2021-05',
          amount: 1234
        })
      } else if (this.id === '2') {
        // -------------------2:Promoter费用申请------------------------
        this.apply.applyType = '2'
        this.apply.applyName = 'Promoter费用申请'
        this.apply.applyDate = new Date()
        this.apply.expenseOwner = 'TMK 业务推进G'
        this.apply.outsourceCompany = 'XXXXX外包公司'
        this.apply.motion = '均一价'
        this.apply.applyKind = ['01', '03']
        for (var i = 0; i < 3; i++) {
          this.apply.details.push({
            oldBrand: '原品牌X',
            oldRegion: '华北地区',
            oldDealer: '利达',
            oldAccount: '拼多多',
            oldCity: '北京',
            oldShopName: '海淀区门店',
            oldSaleUndertaker: '张敏',
            newBrand: '现品牌X',
            newRegion: '华东区',
            newDealer: '信域',
            newAccount: '一号店',
            newCity: '上海',
            newShopName: '天山路店',
            newSaleUndertaker: '李丽',
            activityName: '新品促销',
            applyUserNumber: '100',
            confPeriod: ['2021-05-01', '2021-10-01'],
            cancelUserNumber: '6',
            cancelDate: new Date(),
            workDay: 'XXXXX',
            saleTargetStore: '销售目标每店XXX',
            storeManageExpense: 2345.32,
            remark: '备注0' + (i + 1),
            basicServiceExpenseDay: 213.4,
            achievementServiceExpense: 231.32,
            otherExpense: 3434,
            outsourceExpenseSum: 5432,
            expenseSum: 8767
          })
        }
      } else if (this.id === '3') {
        // -------------------3：样品/试用品申请------------------------
        this.apply.applyType = '3'
        this.apply.applyName = '样品/试用品申请'
        this.apply.assignedUser = '西西'
        this.apply.accountNum = 'CUS20120028'
        this.apply.accountName = '湖北亚科分部'
        this.apply.applyDate = '2021-03-23'
        this.apply.useDetail = '1'
        this.apply.displayLabel = '1'
        this.apply.baseReciveReason = '领用原因：样品领用'
        this.apply.expensePercent = ['1', '3']
        this.apply.expensePercentRatio = { '1': '5', '2': '10' }
        this.apply.warehouse = ['1', '3', '5']
        this.apply.deliveryAddress = '上海长宁'
        this.apply.deliveryReciver = '张鑫'
        this.apply.deliveryReciverTele = '13289876574'
        this.apply.reciveReason1 = ['2']
        this.apply.reciveReason1Input = { '1': { moveType: 'ZA5', financialAccount: '610-6162', costCenter: '23' },
          '2': { moveType: 'ZA3', financialAccount: '820-141001', costCenter: '23' }}
        this.apply.reciveReason2 = ['4', '6', '7']
        this.apply.reciveReason3 = ['1', '3']
        this.apply.details.push({
          productNum: 'PRO0001',
          productName: '暖宝宝',
          boxSpec: '5个/箱',
          qty: '5',
          unit: '个'
        }, {
          productNum: 'PRO0002',
          productName: '暖宝宝',
          boxSpec: '15个/箱',
          qty: '15',
          unit: '个'
        })
      } else if (this.id === '4') {
        // -------------------4:促销品申请------------------------
        this.apply.applyType = '4'
        this.apply.applyName = '促销品申请'
        this.apply.assignedUser = '西西'
        this.apply.accountNum = 'CUS20120028'
        this.apply.accountName = '湖北亚科分部'
        this.apply.applyDate = '2021-03-23'
        this.apply.useDetail = '1'
        this.apply.displayLabel = '1'
        this.apply.baseReciveReason = '领用原因：样品领用'
        this.apply.expensePercent = ['1', '3']
        this.apply.warehouse = ['1', '3', '5']
        this.apply.deliveryAddress = '上海长宁'
        this.apply.deliveryReciver = '张鑫'
        this.apply.deliveryReciverTele = '13289876574'
        this.apply.reciveReason1 = ['2']
        this.apply.reciveReason1Input = { '1': { moveType: 'ZA5', financialAccount: '610-6162', costCenter: '23' },
          '2': { moveType: 'ZA3', financialAccount: '820-141001', costCenter: '23' }}
        this.apply.reciveReason2 = ['4', '6', '7']
        this.apply.reciveReason3 = ['1', '3']
        this.apply.details.push({
          productNum: 'PRO0001',
          productName: '暖宝宝',
          boxSpec: '5个/箱',
          qty: '5',
          unit: '个'
        }, {
          productNum: 'PRO0002',
          productName: '暖宝宝',
          boxSpec: '15个/箱',
          qty: '15',
          unit: '个'
        })
      } else if (this.id === '5') {
      // -------------------5：改票申请------------------------
        this.apply.applyType = '5'
        this.apply.applyName = '改票申请'
        this.apply.assignedUser = '西西'
        this.apply.accountNum = 'CUS20120028'
        this.apply.accountName = '湖北亚科分部'
        this.apply.applyDate = '2021-03-23'
        this.apply.effectPL = ['1', '2']
        this.apply.unEffectPL = ['2']
        this.apply.details.push({
          invoiceDate: '2021-01-01',
          originalOrderNo: 'ORD00001',
          originalInvoiceNo: 'VAT00001',
          materielNo: '93423-43',
          discountRate: '5',
          originalInvoiceAmount: '23424.87',
          modifiedInvoiceAmount: '34543.76',
          specialRequirements: '没有特殊要求'
        },
        {
          invoiceDate: '2021-02-01',
          originalOrderNo: 'ORD00002',
          originalInvoiceNo: 'VAT00002',
          materielNo: '93423-55',
          discountRate: '4',
          originalInvoiceAmount: '66424.87',
          modifiedInvoiceAmount: '77543.76',
          specialRequirements: '没有特殊要求XXX'
        })
      } else if (this.id === '6') {
      // -------------------6：退货申请------------------------
        this.apply.applyType = '6'
        this.apply.applyName = '退货申请'
        this.apply.assignedUser = '西西'
        this.apply.accountNum = 'CUS20120028'
        this.apply.accountName = '湖北亚科分部'
        this.apply.returnApplyDate = '2021-03-23'
        this.apply.sendAccountNum = 'CUS20120027'
        this.apply.sendAccountName = '欣欣'
        this.apply.hopeReturnDate = '2021-04-23'
        this.apply.handleMethod = ['1', '3']
        this.apply.receiveWarehouse = '武汉仓'
        this.apply.returnAddress = '湖北武汉'
        this.apply.accountContactUser = '李丽'
        this.apply.accountContactTele = '14354332345'
        this.apply.planProvideEvidenceDate = '2021-03-23'
        this.apply.pcsClearSign = '0'
        this.apply.csSalesList = '1'
        this.apply.arPurchaseInvoice = '0'
        this.apply.returnReason = ['1', '3']
        this.apply.situationNote = '状况说明良好'
        this.apply.details.push({
          productNum: 'PRO0001',
          productNameSpec: '暖宝宝',
          qty: 5,
          unitPCS: '个',
          excludingTaxTradePrice: 12,
          netReturnDiscount: 4,
          excludingTaxNetPrice: 5
        },
        {
          productNum: 'PRO0002',
          productNameSpec: '暖宝宝',
          qty: 10,
          unitPCS: '个',
          excludingTaxTradePrice: 12,
          netReturnDiscount: 4,
          excludingTaxNetPrice: 6
        })
      } else {
        // -------------------7：公章使用申请------------------------
        this.apply.applyType = '7'
        this.apply.applyName = '公章使用申请'
        this.apply.applyDate = '2021-03-01'
        this.apply.applyDepartment = 'TMK-业务推进G'
        this.apply.applyUser = '李丽'
        this.apply.applyUnit = ['1', '3', '6']
        this.apply.fileName = '审批书'
        this.apply.uses = '签合同'
        this.apply.number = '3'
        this.apply.oppositeSideUnit = '上海花果山'
        this.apply.sealType = '合同类'
      }
      this.apply.remark = '要高大上'
    }
  }
}
</script>
<style lang="scss" scoped>
.summary {
  padding: 0px;
}
</style>
