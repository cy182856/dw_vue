<template>
  <!-- 编辑画面 -->

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
    <advertisingSurvey-info v-if="apply.applyType==='1'" :id="id" :key="id" type="edit" :apply="apply" :disabled="false" @update="update" />
    <promoter-info v-if="apply.applyType==='2'" :id="id" :key="id" type="edit" :apply="apply" :disabled="false" @update="update" />
    <sampleApply-info v-if="apply.applyType==='3' || apply.applyType==='4'" :id="id" :key="id" type="edit" :apply="apply" :disabled="false" @update="update" />
    <reIssue-info v-if="apply.applyType==='5'" :id="id" :key="id" type="edit" :apply="apply" :disabled="false" @update="update" />
    <return-info v-if="apply.applyType==='6'" :id="id" :key="id" type="edit" :apply="apply" :disabled="false" @update="update" />
    <sealUse-info v-if="apply.applyType==='7'" :id="id" :key="id" type="edit" :apply="apply" :disabled="false" @update="update" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li class="operation-item" @click="handleSubmit('save')">
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
import { mapGetters } from 'vuex'
// import { getDetail, submitapply, cancelProcess } from '@/api/mgt/apply'
// import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
// import FormElement from '@/components/FormElement.vue'
// import ColumnElement from '@/components/ColumnElement.vue'
import { names } from '@/mixins/names.js'
import { dict } from '@/mixins/dict'
// import UserSelect from '@/components/UserSelect.vue'
// import applyPop from '@/views/mgt/apply/components/applyPop'
import AdvertisingSurveyInfo from '@/views/mgt/generalApply/components/AdvertisingSurveyInfo'
import PromoterInfo from '@/views/mgt/generalApply/components/PromoterInfo'
import SampleApplyInfo from '@/views/mgt/generalApply/components/SampleApplyInfo'
import ReIssueInfo from '@/views/mgt/generalApply/components/ReIssueInfo'
import ReturnInfo from '@/views/mgt/generalApply/components/ReturnInfo'
import SealUseInfo from '@/views/mgt/generalApply/components/SealUseInfo'
export default {
  name: 'ApplyEdit',
  components: { AdvertisingSurveyInfo, PromoterInfo, SampleApplyInfo, ReIssueInfo, ReturnInfo, SealUseInfo },
  // components: { UserSelect },
  mixins: [names, formValidator, dict],
  data() {
    return {
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5', '6'],
      applyType: [
        { value: '1', label: '1：广告费&调查费申请' },
        { value: '2', label: '2：Promoter费用申请' },
        { value: '3', label: '3：样品/试用品申请' },
        { value: '4', label: '4：促销品申请' },
        { value: '5', label: '5：改票申请' },
        { value: '6', label: '6：退货申请' },
        { value: '7', label: '7：公章使用申请' }],
      // expensePercent: [{ dictId: '1', dictName: '华东AV01', percent: '' },
      //   { dictId: '2', dictName: '华南AV02', percent: '' },
      //   { dictId: '3', dictName: '华西AV03', percent: '' },
      //   { dictId: '4', dictName: '华北AV04', percent: '' },
      //   { dictId: '6', dictName: '华东DB AVD1', percent: '' },
      //   { dictId: '7', dictName: '华南DB AVD2', percent: '' },
      //   { dictId: '8', dictName: '华西DB AVD3', percent: '' },
      //   { dictId: '9', dictName: '华北DB AVD4', percent: '' },
      //   { dictId: '5', dictName: 'ECAVE0', percent: '' }],
      reciveReason1: [{ dictId: '1', dictName: '赠品（交际用）', moveType: 'ZA5', financialAccount: '610-6162', costCenter: 'AV' },
        { dictId: '2', dictName: '活动促销赠品-产品领用（仅限TMK填写使用）', moveType: 'ZA3', financialAccount: '820-141001', costCenter: '' }],
      reciveReason2: [{ dictId: '1', dictName: '赠品（交际用）', moveType: 'ZA5', financialAccount: '630-61', costCenter: 'AV' },
        { dictId: '2', dictName: '其他（消费者投诉）', moveType: 'ZA5', financialAccount: '630-98', costCenter: 'AV' },
        { dictId: '3', dictName: '产品检验（政府关联）', moveType: 'ZA5', financialAccount: '630-71', costCenter: 'AV' },
        { dictId: '4', dictName: '产品测试', moveType: 'ZA5', financialAccount: '630-80', costCenter: 'AV' },
        { dictId: '5', dictName: '商谈/市场活动使用', moveType: 'ZA3', financialAccount: '820-1201', costCenter: '' },
        { dictId: '6', dictName: '使用装派发', moveType: 'ZA3', financialAccount: '820-12', costCenter: '' },
        { dictId: '7', dictName: 'UNBW', moveType: 'ZA3', financialAccount: '820-12', costCenter: '' }
      ],
      reciveReason3: [{ dictId: '1', dictName: '赠品（交际用）', department: '公关室（AV103020）', moveType: 'ZA5', financialAccount: '630-61', costCenter: 'AV' },
        { dictId: '2', dictName: '赠品（交际用）', department: '总经理室（AV103022）', moveType: 'ZA5', financialAccount: '630-98', costCenter: 'AV' },
        { dictId: '3', dictName: '产品检验（政府关联）阿三发射点犯得上', department: '', moveType: 'ZA5', financialAccount: '630-71', costCenter: 'AV' }
      ],
      // effectPL: [
      //   { title: '409-10（Discount & Returns）',
      //     detail: [{ dictId: '1', dictName: '费用票折', remark: '备注1', originalAmount: '111', reissueAmount: '100', diffAmount: '11' },
      //       { dictId: '2', dictName: '促销折扣问题', remark: '备注2', originalAmount: '222', reissueAmount: '200', diffAmount: '22' },
      //       { dictId: '3', dictName: '合同票折变更', remark: '备注3', originalAmount: '333', reissueAmount: '300', diffAmount: '33' },
      //       { dictId: '4', dictName: '其他', remark: '备注4', originalAmount: '444', reissueAmount: '400', diffAmount: '44' }] },
      //   { title: '408-15（Extra trade discount for customers）',
      //     detail: [{ dictId: '5', dictName: '微调', remark: '备注5', originalAmount: '555', reissueAmount: '500', diffAmount: '55' }] }
      // ],
      // unEffectPL: [{ dictId: '1', dictName: '开票文字信息变更', remark: 'ZA5' },
      //   { dictId: '2', dictName: '其他', remark: 'ZA5' }
      // ],
      // warehouse: [
      //   { dictId: '1', dictName: '上海仓(AV20Z001)' },
      //   { dictId: '2', dictName: '总部小库(AV20Z001)' },
      //   { dictId: '3', dictName: '珂润仓库(AV20Z001)' },
      //   { dictId: '4', dictName: '合肥仓库(AV20Z001)' },
      //   { dictId: '5', dictName: '武汉仓(AV20Z001)' },
      //   { dictId: '6', dictName: '济南仓(AV20Z001)' },
      //   { dictId: '7', dictName: '广州仓(AV20Z001)' },
      //   { dictId: '8', dictName: '成都仓(AV20Z001)' },
      //   { dictId: '9', dictName: '天津仓(AV20Z001)' },
      //   { dictId: '10', dictName: '沈阳仓(AV20Z001)' },
      //   { dictId: '11', dictName: '西安仓(AV20Z001)' }],
      apply: {
        applyType: '',
        applyKind: [],
        expensePercent: [],
        expensePercentRatio: {},
        warehouse: [],
        reciveReason1: [],
        handleMethod: [],
        reciveReason1Input: { '1': { moveType: 'ZA5', financialAccount: '610-6162', costCenter: '23' },
          '2': { moveType: 'ZA3', financialAccount: '820-141001', costCenter: '23' }},
        reciveReason2: [],
        reciveReason2Input: {},
        reciveReason3: [],
        reciveReason3Input: {},
        monthExpenseList: [],
        reciveList: [],
        reissueList: [],
        effectPL: [],
        unEffectPL: [],
        returnReason: [],
        applyUnit: [],
        attrs: {},
        details: [],
        fileList: []
      },
      processDialog: false,
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
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
  },
  created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.apply.assignedUser = this.$store.getters.userInfo.userId
      this.apply.assignedOrg = this.companyOrgId
      this.apply.apply = '0'

      // 公章申请
      this.apply.applyDate = new Date()
      this.apply.applyDepartment = 'TMK-业务推进G'
      this.apply.applyUser = this.$store.getters.userInfo.userId
    }
  },
  methods: {
    update(apply) {
      this.apply = apply
    },
    async fetchData() {
      // const res = await getDetail(this.id)
      // if (res && res.success) {
      //   this.apply = res.datas.apply
      // }
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
            remark: '备注01',
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
        this.apply.reciveReason1 = ['1']
        // this.reciveReason1.forEach((rowData) => {
        //   this.$set(this.apply.reciveReason1Input, rowData.dictId, { moveType: 'ZA5', financialAccount: '610-6162', costCenter: '23' })
        // })
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

      // 点击复制迁移来的时候，清空
      if (this.$route.query.copy) {
        this.apply.id = ''
        this.apply.identiferNum = ''
        this.apply.exclusiveKey = ''
        this.apply.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.apply.assignedUser = this.$store.getters.userInfo.userId
      }
      this.isLoading = false
    },
    handleSubmit(submitType) {
      console.log(this.apply)
      // for (const ref in this.$refs) {
      //   if (this.$refs[ref] && this.$refs[ref].length > 0) {
      //     this.$refs[ref][0].validatorAll()
      //     if (!this.$refs[ref][0].validatorState) return false
      //   }
      // }
      // let tipmsg = ''
      // if (this.companyOrgId !== this.apply.assignedOrg) {
      //   tipmsg = this.$t('comm.tip17')
      // } else {
      //   tipmsg = this.$t('comm.tip9')
      // }
      // this.$confirm(tipmsg, this.$t('comm.tips'), {
      //   confirmButtonText: this.$t('comm.certain'),
      //   cancelButtonText: this.$t('comm.cancel'),
      //   type: 'warning'
      // }).then(async() => {
      //   this.apply.taskId = this.taskId
      //   this.apply.processInstId = this.processInstId
      //   this.apply.submitType = submitType
      //   this.apply.assignedOrg = this.companyOrgId
      //   const res = await submitapply(this.apply)
      //   if (res && res.success) {
      //     this.$router.push('/mgt/applyList')
      //   }
      //   this.isLoading = false
      // }).catch(err => {
      //   this.$message({
      //     type: 'info',
      //     message: this.$t('comm.msg1')
      //   })
      //   console.log(err)
      // })
    },
    handleCancel() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        // const res = await cancelProcess(this.taskId)
        // if (res && res.success) {
        //   this.$router.push('/mgt/applyList')
        // }
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
    }
  }
}
</script>
