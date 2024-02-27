<template>
  <!-- 详细画面 -->
  <div class="summary">
    <transfer-info :id="id" :key="id" :type="action?action:'detail'" @load="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 提交 -->
        <!-- <li v-if="action==='delete'" class="operation-item" @click="handleSubmit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontijiao" /></span>
          <span class="operation-text">{{ $t('comm.submit') }}</span>
        </li> -->
        <!-- 流程取消 -->
        <!-- <li v-if="action==='delete' && taskId" class="operation-item" @click="handleCancel">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.processCancel') }}</span>
        </li> -->
        <!-- 编辑 -->
        <!-- v-if="withdraw.workflowFlag === '0' && withdraw.lastFlag === 1" -->
        <li class="operation-item" @click="handleEdit()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <!-- 删除 -->
        <!-- <li v-if="account.workflowFlag === '0' && account.lastFlag === 1" class="operation-item" @click="handleDelete()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">{{ $t('comm.delete') }}</span>
        </li> -->
        <!-- 复制 -->
        <li v-if="!action" class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="withdraw.workflowProcessInstId" class="operation-item" @click="approveHisDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <!-- 变更履历 -->
        <li class="operation-item" @click="historyDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <!-- 历史版本 -->
        <!-- <li v-if="!action" class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li> -->
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div v-if="approveHisDialog" class="approveHis">
      <process-detail :key="withdraw.workflowProcessInstId" :is-show="approveHisDialog" :title="$t('component.taskApprove.detailedProcess') + withdraw.workflowProcessInstId" :process-inst-id="withdraw.workflowProcessInstId" @close="approveHisDialog=false" />
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
        <update-his :key="withdraw.identiferNum" func-div="withdraw" :identifer-num="withdraw.identiferNum" />
      </el-drawer>
    </div>
    <div class="versionDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="versionDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.versionHis') }}</span>
        <version-his :key="withdraw.identiferNum" func-div="withdraw" :identifer-num="withdraw.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
// import { deleteAccount, cancelProcess, deleteApply } from '@/api/mrk/account.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import TransferInfo from './components/TransferInfo'
export default {
  name: 'PreDetail',
  components: { TransferInfo },
  mixins: [names, permission],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      versionDialog: false,
      approveHisDialog: false,
      withdraw: {
      },
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: []
        }
      ]
    }
  },
  computed: {
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    taskId: function() {
      return this.$route.query.taskId
    },
    action: function() {
      return this.$route.query.action
    }
  },
  created() {
  },
  methods: {
    handleLoad(withdraw) {
      this.withdraw = withdraw
    },
    handleCopy() {
      this.$router.push({ path: '/pay/transfer/edit', query: { id: this.id, copy: true }})
    },
    handleEdit() {
      this.$router.push({ path: '/pay/transfer/edit', query: { id: this.id }})
    },
    handleDelete() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.withdraw.submitType = 'submit'
        // const res = await deletePrewithdraw([this.withdraw])
        // if (res && res.success) {
        //   this.$router.push('/pay/pre/motion/list')
        // }
        this.isLoading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleCancel() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        // const res = await cancelProcess(this.taskId)
        // if (res && res.success) {
        //   this.$router.push('/pay/pre/motion/list')
        // }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleSubmit() {
      this.withdraw.submitType = 'deleteReSubmit'
      this.withdraw.taskId = this.taskId
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        // deleteApply(this.withdraw).then(() => {
        //   this.$router.push('/pay/pre/motion/list')
        // })
      }).catch(_ => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleUpdateHis() {
      this.historyDialog = true
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>
