<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <finance-fixed-or-change v-if="finAccountType==='1'||finAccountType==='2'" :id="id" :key="id" @fixedOrChange="handleLoad" />
    <finance-rebate v-if="finAccountType==='变动费'" :id="id" :key="id" @rebate="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <div>
          <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="handleSave()">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">{{ $t("comm.save") }}</span>
          </li>
          <li v-show="verifyStatus!=='3' && writeoff.isEditable" class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="handleApproval()">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconqinggoudanshenpi" />
            </span>
            <span class="operation-text">审批</span>
          </li>
          <!--          <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="handleRejected()">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">驳回</span>
          </li>-->
        </div>

        <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="handleBack">
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
import FinanceRebate from '@/views/writeoff/components/FinanceRebate'
import FinanceFixedOrChange from '@/views/writeoff/components/FinanceFixedOrChange'
import { handleSave, handleApproval, handleRejected } from '@/api/writeoff/finance'
export default {
  name: 'FinanceEdit',
  components: { FinanceFixedOrChange, FinanceRebate },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      finAccountType: '',
      verifyStatus: '',
      requestStatus: '',
      taskId: '',
      disabled: true,
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5', '6'],
      writeoff: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    }
  },
  watch: {},
  async created() {
    this.finAccountType = this.$route.query.finAccountType
    this.verifyStatus = this.$route.query.verifyStatus
    this.requestStatus = this.$route.query.requestStatus
    this.taskId = this.$route.query.taskId
  },
  methods: {
    async fetchData() {
      this.isLoading = false
    },
    handleLoad(data) {
      // 子页面传递数据
      this.writeoff = data
      // console.log(this.writeoff.datePrePay, 'datePrePay')
    },
    handleSave() {
      /*if (this.writeoff.datePrePay == null || this.writeoff.datePrePay === '') {
        this.$message({
          type: 'warning',
          message: this.$t('预定支付日不能为空')
        })
        return
      }*/
      const selectData = {
        actVerifyDtoList: []
      }
      this.$confirm(((this.finAccountType === '1' || this.finAccountType === '2') ? '是否确定保存核销单？' : '是否确定保存当前合同返利？'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        this.writeoff.updateBy = this.userInfo.userName
        selectData.actVerifyDtoList.push(this.writeoff)
        const res = await handleSave(selectData)
        if (res) {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // this.$router.push('/finance/list')
            this.$router.replace({
              path: '/finance/list',
              query: { fetchDataData: 'fetchDataData' }
            })
          }
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
    handleApproval() {
      if (this.writeoff.datePrePay == null || this.writeoff.datePrePay === '') {
        this.$message({
          type: 'warning',
          message: this.$t('预定支付日不能为空')
        })
        return
      }
      const selectData = {
        actVerifyDtoList: []
      }
      this.$confirm('同一代理商的市场部数据会一起审批，是否继续？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        this.writeoff.updateBy = this.userInfo.userName
        // 只有变动费和合同返利时才更新开票状态
        if (this.writeoff.finAccountType !== '2') {
          this.writeoff.invStatus = '0'
        }
        selectData.actVerifyDtoList.push(this.writeoff)
        const res = await handleApproval(selectData)
        if (res) {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // this.$router.push('/finance/list')

            this.$router.replace({
              path: '/finance/list',
              query: { fetchDataData: 'fetchDataData' }
            })
          }
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
    handleRejected() {
      if (this.writeoff.datePrePay == null || this.writeoff.datePrePay === '') {
        this.$message({
          type: 'warning',
          message: this.$t('预定支付日不能为空')
        })
        return
      }
      this.writeoff.datePrePay = this.writeoff.oldDatePrePay
      this.$confirm(((this.finAccountType === '1' || this.finAccountType === '2') ? '是否确定驳回核销单？' : '是否确定驳回当前合同返利？'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        // this.writeoff.updateTime = new Date()
        this.writeoff.updateBy = this.userInfo.userName
        this.writeoff.verifyStatus = '1'
        const res = await handleRejected(this.writeoff)
        if (res) {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // this.$router.push('/finance/list')
            this.$router.replace({
              path: '/finance/list',
              query: { fetchDataData: 'fetchDataData' }
            })
          }
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
        path: '/finance/list',
        query: { fetchDataData: 'fetchDataData' }
      })
    }
  }
}
</script>
