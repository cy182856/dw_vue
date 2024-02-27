<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <agent-info :id="id" :key="id" :type="type" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <div v-if="type=='edit'">
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">保存</span>
          </li>
        </div>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconquxiao" />
          </span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import AgentInfo from '@/views/mrk/agent/components/AgentInfo'
export default {
  name: 'AgentEdit',
  components: { AgentInfo },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      infoType: '',
      disabled: true,
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5'],
      withdraw: {
        name: '',
        sku: '',
        top: '',
        date: '',
        time1: '',
        user: '',
        time2: '',
        user2: ''
      },
      fileList: [],
      relFunc: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    },
    type: function() {
      return this.$route.query.type
    },
    totalAmount: function() {
      if (this.withdraw.details && this.withdraw.details.length > 0) {
        const sum = this.withdraw.details.map(
          (item) => (!item.amount ? 0 : parseFloat(item.amount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    }
  },
  watch: {},
  async created() {
    if (this.id) {
      this.infoType = this.id
    } else {
      this.disabled = false
    }
  },
  methods: {
    async fetchData() {
      this.withdraw.name = '2020年9月【最大王牌】纸制品促销企画'
      this.withdraw.sku = '卷纸10R. 卷纸4R. 婴儿纸面巾'
      this.withdraw.top = '1.4'
      this.withdraw.date = ['2020/6', '2020/9']
      this.withdraw.time1 = '2021/3/18 18:43:00'
      this.withdraw.user = '系统管理员'
      this.withdraw.time2 = '2021/3/18 18:43:00'
      this.withdraw.user2 = '系统管理员'
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
    handleAddDetail() {
      this.withdraw.details.push({
        motionIdentiferNum: '',
        accountNum: '',
        accountName: '',
        localChainNum: '',
        salesOfficeNum: '',
        subBrandNum: '',
        subBrandName: '',
        amount: '',
        planUseDate: ''
      })
    },
    handleDeleteDetail(index) {
      this.withdraw.details.splice(index, 1)
    },
    handleTypeChange(newValue) {
      this.relFunc = ''
      this.withdraw.relIdentiferNum = ''
      if (newValue === '1') {
        this.relFunc = 'contract'
      } else if (newValue === '2') {
        this.relFunc = 'motion'
      }
    },
    handleUploadTemplate() {
      this.withdraw.details = []
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120001',
        accountNum: '460-300052',
        accountName: '集中配货费',
        ph2Num: 'ph201',
        ph2Name: 'PH201名称',
        localChainNum: 'Local Chain 01',
        localChainName: 'Local Chain 01名称',
        salesOfficeNum: 'Sales Office 01',
        subBrandNum: 'MED',
        subBrandName: 'MERRIES EXTRA DAY',
        cg5Num: 'CG501',
        expenseSideNum: 'N000001',
        expenseSideName: '费用方',
        amount: '234.5',
        costCenterNum: 'AV01',
        prewithdrawUses: '合同费',
        planUseDate: '2021-10-01'
      })
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120002',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'Local Chain 02',
        salesOfficeNum: 'Sales Office 02',
        subBrandNum: 'UV',
        subBrandName: 'Biro UV',
        amount: '234',
        planUseDate: '2021-10-01'
      })
      this.withdraw.details.push({
        motionIdentiferNum: 'PRO20120003',
        accountNum: '460-300052',
        accountName: '集中配货费',
        localChainNum: 'Local Chain 03',
        salesOfficeNum: 'Sales Office 03',
        subBrandNum: 'MED',
        subBrandName: 'MERRIES EXTRA DAY',
        amount: '120.51',
        planUseDate: '2021-10-01'
      })
    }
  }
}
</script>
