<template>
  <!-- 明细画面 -->
  <div class="summary">
    <targetpolicy-info :id="id" :key="id" @load="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 编辑 -->
        <li v-if="targetPolicy.workflowFlag === '0' && targetPolicy.lastFlag===1 && targetPolicy.targetPolicyIsExecute ==='0'" class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <!-- 删除 -->
        <li v-if="targetPolicy.workflowFlag === '0' && targetPolicy.lastFlag===1" class="operation-item" @click="handleDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">{{ $t('comm.delete') }}</span>
        </li>
        <!-- 复制 -->
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="targetPolicy.workflowProcessInstId" class="operation-item" @click="approveHisDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
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
        <update-his :key="targetPolicy.identiferNum" func-div="targetpolicy" :identifer-num="targetPolicy.identiferNum" />
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
        <version-his :key="targetPolicy.identiferNum" func-div="targetpolicy" :identifer-num="targetPolicy.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
    <div v-if="approveHisDialog" class="approveHis">
      <process-detail :key="targetPolicy.workflowProcessInstId" :title="$t('component.taskApprove.detailedProcess') + targetPolicy.workflowProcessInstId" :is-show="approveHisDialog" :process-inst-id="targetPolicy.workflowProcessInstId" @close="approveHisDialog=false" />
    </div>
  </div>
</template>
<script>
import { deleteTargetpolicy } from '@/api/rebate/targetpolicy.js'
import TargetpolicyInfo from '@/views/rebate/targetpolicy/components/TargetpolicyInfo'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'

export default {
  name: 'TargetpolicyDetail',
  components: {
    TargetpolicyInfo
  },
  mixins: [permission, dict],
  data() {
    return {
      historyDialog: false,
      approveHisDialog: false,
      versionDialog: false,
      targetPolicy: {}
    }
  },
  computed: {
    id: function() { return this.$route.query.id }
  },
  created() {
  },
  methods: {
    handleLoad(targetPolicy) {
      this.targetPolicy = targetPolicy
    },
    handleEdit() {
      this.$router.push({ path: '/rebate/targetpolicy/edit', query: { id: this.id }})
    },
    handleCopy() {
      this.$router.push({ path: '/rebate/targetpolicy/edit', query: { id: this.id, copy: true }})
    },
    handleDelete() {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.targetPolicy.submitType = 'submit'
        deleteTargetpolicy([this.targetPolicy]).then(() => {
          this.$router.push('/rebate/targetPolicyList')
        })
      }).catch(() => {
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
<style lang="scss" scoped>

</style>
<style lang="scss">

</style>
