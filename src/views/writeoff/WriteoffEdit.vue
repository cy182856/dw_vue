<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <writeoff-fixed v-if="finAccountType==='1'" :id="id" @fixed="handleLoad" />
    <writeoff-change v-if="finAccountType==='2'" :id="id" @change="handleLoad" />
    <!-- <promotion-change v-if="infoType==='6'" :id="id" :key="id" /> -->
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <!--        <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="handleSave()" v-show="verifyStatus=='0'||verifyStatus=='3'">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">{{ $t("comm.save") }}</span>
        </li>-->
        <li v-show="verifyStatus=='0'||verifyStatus=='1'" class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="handleSubmit()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">提交</span>
        </li>
        <!-- <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="adjuingstLink">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">调整</span>
        </li> -->
        <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="send()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="el-icon-top" />
          </span>
          <span class="operation-text">请款书发送</span>
        </li>
        <li v-show="requestStatus=='01'" class="operation-item" style="min-width: 90px !important;margin-right:16px !important;" @click="comeBack()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="el-icon-bottom" />
          </span>
          <span class="operation-text">请款书回传</span>
        </li>
        <!-- <div v-if="infoType!=='4'">
          <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">驳回</span>
          </li>
          <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">审核</span>
          </li>
          <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">请款资料确认</span>
          </li>
          <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">财务接收</span>
          </li>
          <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">审批履历</span>
          </li>
          <li class="operation-item" style="min-width: 90px !important;margin-right:16px !important;">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">调整</span>
          </li>
        </div> -->
        <!-- 返回 -->
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
import WriteoffFixed from '@/views/writeoff/components/WriteoffFixed'
import WriteoffChange from '@/views/writeoff/components/WriteoffChange'
import { send, comeBack, batchSubmit } from '@/api/writeoff/apply.js'
export default {
  name: 'WriteoffEdit',
  components: { WriteoffFixed, WriteoffChange },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      finAccountType: '',
      verifyStatus: '',
      requestStatus: '',
      taskId: '',
      disabled: true,
      isLoading: true,
      writeoff: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
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
      console.log(this.writeoff, 'this.writeoff')
    },
    handleSubmit() {
      this.$confirm('是否确定提交核销单？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const reqList = []
        // this.writeoff.updateTime = new Date()
        this.writeoff.updateBy = this.userInfo.userName
        this.writeoff.submitUser = this.userInfo.userId
        this.writeoff.verifyStatus = '2'
        this.writeoff.taskId = this.taskId

        reqList.push(this.writeoff)
        this.isLoading = true
        const params = new FormData()
        params.append('jsonList', JSON.stringify(reqList))
        const res = await batchSubmit(params)
        if (res) {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // this.$router.push('/writeoff/list')
            this.$router.replace({
              path: '/writeoff/list',
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
    send() {
      this.$confirm('是否确定发送请款书？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const reqList = []
        this.writeoff.updateBy = this.userInfo.userName
        this.writeoff.requestStatus = '01'
        reqList.push(this.writeoff)
        this.isLoading = true
        const params = new FormData()
        params.append('jsonList', JSON.stringify(reqList))
        const res = await send(params)
        if (res) {
          if (res.success) {
            this.$message({
              type: 'success',
              // 发送成功
              message: this.$t('comm.msg45')
            })
            // this.$router.push('/writeoff/list')
            this.$router.replace({
              path: '/writeoff/list',
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
    comeBack() {
      this.$confirm('是否确定回传请款书？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.writeoff.updateBy = this.userInfo.userName
        this.writeoff.requestStatus = '02'
        const reqList = []
        reqList.push(this.writeoff)
        this.isLoading = true
        const params = new FormData()
        params.append('jsonList', JSON.stringify(reqList))
        const res = await comeBack(params)
        if (res) {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // this.$router.push('/writeoff/list')
            this.$router.replace({
              path: '/writeoff/list',
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
        path: '/writeoff/list',
        query: { fetchDataData: 'fetchDataData' }
      })
    }
  }
}
</script>
