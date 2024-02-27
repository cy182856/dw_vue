<template>
  <!-- 详细画面 -->
  <div class="summary">
    <adjust-info :id="id" :key="id" :type="action?action:'detail'" @load="handleLoad" />
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
        <li v-if="adjust.workflowFlag === '0' && adjust.lastFlag === 1" class="operation-item" @click="handleEdit()">
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
          <span class="operation-text">复制</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="adjust.workflowProcessInstId" class="operation-item" @click="approveHisDialog=true">
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
        <!-- PDF下载 -->
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">PDF下载</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div v-if="approveHisDialog" class="approveHis">
      <process-detail :key="adjust.workflowProcessInstId" :is-show="approveHisDialog" :title="$t('component.taskApprove.detailedProcess') + adjust.workflowProcessInstId" :process-inst-id="adjust.workflowProcessInstId" @close="approveHisDialog=false" />
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
        <version-his :key="adjust.identiferNum" func-div="adjust" :identifer-num="adjust.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
// import { deleteadjust, cancelProcess, deleteApply } from '@/api/mrk/account.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import AdjustInfo from './components/AdjustInfo'
export default {
  name: 'AdjustDetail',
  components: { AdjustInfo },
  mixins: [names, permission],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      versionDialog: false,
      approveHisDialog: false,
      adjust: {
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
    handleLoad(adjust) {
      this.adjust = adjust
    },
    handleCopy() {
      this.$router.push({ path: '/pay/adjust/edit', query: { id: this.id, copy: true }})
    },
    handleEdit() {
      this.$router.push({ path: '/pay/adjust/edit', query: { id: this.id }})
    },
    handleDelete() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.adjust.submitType = 'submit'
        // const res = await deletPadjust([this.adjust])
        // if (res && res.success) {
        //   this.$router.push('/pay/adjust/list')
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
        //   this.$router.push('/pay/adjust/list')
        // }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleSubmit() {
      this.adjust.submitType = 'deleteReSubmit'
      this.adjust.taskId = this.taskId
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        // deleteApply(this.adjust).then(() => {
        //   this.$router.push('/pay/adjust/list')
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
