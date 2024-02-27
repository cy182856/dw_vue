<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <approval-edit v-if="id==='1'" :id="id" ref="approvalEditData" :key="id" :deptcode="deptcode" :verifyym="verifyym" @subject="handleLoad" />
    <approval-edit2 v-if="id==='2'" :id="id" ref="approvalEdit2Data" :key="id" :deptcode="deptcode" :verifyym="verifyym" @subject="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li class="operation-item" @click="dialogShow">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">审批</span>
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
    <el-dialog
      v-loading="dialogloading"
      class="content-dialog-box  search-light rules newedit3"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title="'审批操作'"
      :visible.sync="dialogFormVisible"
      width="600"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
      <el-form>
        <el-form-item label="审批意见">
          <el-input v-model="reason" type="textarea" rows="3" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit(1)">
          通 过
        </el-button>
        <el-button type="primary" @click="handleSubmit(2)">
          驳 回
        </el-button>
        <el-button @click="dialogFormVisible=false">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import ApprovalEdit from '@/views/writeoff/components/ApprovalEdit'
import ApprovalEdit2 from '@/views/writeoff/components/ApprovalEdit2'
import { approve, reject } from '@/api/writeoff/approval.js'
export default {
  name: 'WriteoffApprovalEdit',
  components: { ApprovalEdit, ApprovalEdit2 },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      infoType: '',
      disabled: true,
      dialogFormVisible: false,
      dialogloading: false,
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
      reason: '',
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
      return this.$route.query.id
    },
    deptcode: function() {
      return this.$route.query.deptcode
    },
    deptname: function() {
      return this.$route.query.deptname
    },
    verifyym: function() {
      return this.$route.query.verifyym
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
      this.isLoading = false
    },
    handleClose() {
      this.dialogFormVisible = false
    },
    dialogShow() {
      if (this.multipleSelection) {
        this.dialogFormVisible = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleLoad(data) {
      // 子页面传递数据
      this.multipleSelection = data
    },
    handleSubmit(type) {
      this.$nextTick(function() {
        if (this.multipleSelection) {
          this.multipleSelection.forEach((rowData) => {
            rowData.reason = this.reason
          })
          if (type === 1) {
            let message = ''
            if (this.infoType === '1') {
              message = '是否确定审批核销单？'
            } else if (this.infoType === '2') {
              message = '是否确定审批合同返利？'
            }
            this.$confirm(message, this.$t('comm.tips'), {
              confirmButtonText: this.$t('comm.certain'),
              cancelButtonText: this.$t('comm.cancel'),
              type: 'warning'
            }).then(async() => {
              const res = await approve(this.multipleSelection)
              if (res && res.success) {
                // this.$router.push('/writeoff/approval')

                this.$router.replace({
                  path: '/writeoff/approval',
                  query: { fetchDataData: 'fetchDataData' }
                })
                res.messages.message
              }
              this.isLoading = false
            }).catch(err => {
              this.$message({
                type: 'info',
                message: this.$t('comm.msg1')
              })
              console.log(err)
            })
          } else if (type === 2) {
            let message = ''
            if (this.infoType === '1') {
              message = '是否确定驳回核销单？'
            } else if (this.infoType === '2') {
              message = '是否确定驳回合同返利？'
            }
            this.$confirm(message, this.$t('comm.tips'), {
              confirmButtonText: this.$t('comm.certain'),
              cancelButtonText: this.$t('comm.cancel'),
              type: 'warning'
            }).then(async() => {
              const res = await reject(this.multipleSelection)
              if (res && res.success) {
                // this.$router.push('/writeoff/approval')
                this.$router.replace({
                  path: '/writeoff/approval',
                  query: { fetchDataData: 'fetchDataData' }
                })
                res.messages.message
              }
              this.isLoading = false
            }).catch(err => {
              this.$message({
                type: 'info',
                message: this.$t('comm.msg1')
              })
              console.log(err)
            })
          }
        } else {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg3')
          })
        }
      })
    },
    handleBack() {
      // this.$router.go(-1)

      this.$router.replace({
        path: '/writeoff/approval',
        query: { fetchDataData: 'fetchDataData' }
      })
    }
  }
}
</script>
<style>
.newedit3 .el-dialog {
  width: 400px !important;
  height: 300px;
  min-width: 400px !important;
}
.search-light.newedit3 .dialog-drag .el-button.el-button--primary span{
  color:#fff;
}
</style>
