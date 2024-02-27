<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <writeOffPay-info :ym="ym" :custcode="custCode" :contract-cost="contractCost" @sendData="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!--<li class="operation-item" @click="calculation">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">计算过程</span>
        </li>-->
        <li v-if="sendData.verificationStatus==='0'||sendData.verificationStatus==='1'" class="operation-item" @click="handleSubmit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">提交</span>
        </li>
        <li class="operation-item" @click="sendEmail">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">请款书发送</span>
        </li>
        <li class="operation-item" @click="comeBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">请款书回传</span>
        </li>
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
import writeOffPayInfo from '@/views/rebateData/components/writeOffPayInfo'
import { sendDataEmail, comeDataBack, rptDownload, batchSubmit } from '@/api/rebaterules/writeoff.js'
export default {
  name: 'TerminalEdit',
  components: { writeOffPayInfo },
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
      relFunc: '',
      sendData: {}

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
    ym: function() {
      return this.$route.query.ym
    },
    custCode: function() {
      return this.$route.query.custCode
    },
    contractCost: function() {
      return this.$route.query.contractCost
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
    handleLoad(data) {
      console.log(data)
      // 子页面传递数据
      this.sendData = data
    },
    sendEmail() {
      console.log(this.sendData.sendEmail)
      this.$confirm('是否发送请款书？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await sendDataEmail(this.sendData.sendEmail)
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          // this.$router.push('/rebatedata/writeoffpay')
          this.$router.replace({
            path: '/rebatedata/writeoffpay',
            query: { fetchDataData: 'fetchDataData' }
          })
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
    comeBack() {
      console.log(this.sendData.comeBack)
      this.$confirm('是否回传请款书？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await comeDataBack(this.sendData.comeBack)
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          // this.$router.push('/rebatedata/writeoffpay')
          this.$router.replace({
            path: '/rebatedata/writeoffpay',
            query: { fetchDataData: 'fetchDataData' }
          })
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
    calculation() {
      console.log(this.sendData.calculation)
      this.$confirm('是否计算过程？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await rptDownload(this.sendData.calculation)
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
        }
        // this.$router.push('/rebatedata/writeoffpay')
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    handleSubmit() {
      this.$confirm('确认提交', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        var submitDataS = Array(0)
        submitDataS[0] = this.sendData.submitData
        delete submitDataS[0].updateTime
        delete submitDataS[0].createTime
        // submitDataS.push()
        console.log(submitDataS)
        const res = await batchSubmit(submitDataS)
        console.log(res)
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          // this.$router.push('/rebatedata/writeoffpay')
          this.$router.replace({
            path: '/rebatedata/writeoffpay',
            query: { fetchDataData: 'fetchDataData' }
          })
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
    handleBack() {
      // this.$router.go(-1)
      this.$router.replace({
        path: '/rebatedata/writeoffpay',
        query: { fetchDataData: 'fetchDataData' }
      })
    }
  }
}
</script>
