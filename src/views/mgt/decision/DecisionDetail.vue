<template>
  <!-- 明细画面 -->
  <div class="summary">
    <decision-info :id="id" :key="id" @load="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li v-if="hasPermission('applyBtn')" class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <li class="operation-item" @click="historyDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <li class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li>
        <li v-if="decision.workflowProcessInstId" class="operation-item" @click="approveHisDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <li class="operation-item" @click="downloadDialog">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">PDF下载</span>
        </li>
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
      <!-- <el-button v-if="decision.workflowFlag === '0' && decision.lastFlag === 1" type="success" class="iconfont icon-save" size="small" @click="handleEdit">
        编辑
      </el-button> -->
      <!-- <el-button v-if="decision.workflowFlag === '0' && decision.lastFlag === 1" type="danger" class="iconfont icon-del" size="small" @click="handleDelete">
      {{ $t('comm.delete') }}
      </el-button> -->

      <!-- <el-button v-if="hasPermission('applyBtn')" type="primary" class="iconfont icon-copy" size="small" @click="handleCopy">
        复制
      </el-button>
      <el-button type="primary" class="iconfont icon-lvli" size="small" @click="historyDialog = true">
        变更履历
      </el-button>
      <el-button type="primary" class="iconfont icon-lvli" size="small" @click="versionDialog=true">
        历史版本
      </el-button>
      <el-button v-if="decision.workflowProcessInstId" type="primary" class="iconfont icon-shenpi" size="small" @click="approveHisDialog=true">
        {{ $t('component.taskApprove.approval') }}
      </el-button>
      <el-button type="primary" class="iconfont" size="small" @click="downloadDialog">
        PDF下载
      </el-button>
      <el-button type="info" class="iconfont icon-fanhui" size="small" @click="handleBack">
        返回
      </el-button> -->
    </div>
    <div class="historyDialog">
      <el-drawer
        rf="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his :key="decision.identiferNum" func-div="decision" :identifer-num="decision.identiferNum" />
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
        <version-his :key="decision.identiferNum" func-div="decision" :identifer-num="decision.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
    <div v-if="approveHisDialog" class="approveHis">
      <process-detail :key="decision.workflowProcessInstId" :title="$t('component.taskApprove.detailedProcess') + decision.workflowProcessInstId" :is-show="approveHisDialog" :process-inst-id="decision.workflowProcessInstId" @close="approveHisDialog=false" />
    </div>
  </div>
</template>
<script>
import { deleteDecision, downloadPDF } from '@/api/mgt/decision.js'
import DecisionInfo from '@/views/mgt/decision/components/DecisionInfo'
import { permission } from '@/mixins/permission-mixin.js'

export default {
  name: 'DecisionDetail',
  components: {
    DecisionInfo
  },
  mixins: [permission],
  data() {
    return {
      historyDialog: false,
      approveHisDialog: false,
      versionDialog: false,
      decision: {}
    }
  },
  computed: {
    id: function() { return this.$route.query.id }
  },
  created() {
  },
  methods: {
    handleLoad(decision) {
      this.decision = decision
    },
    handleEdit() {
      this.$router.push({ path: '/mgt/decision/edit', query: { id: this.id }})
    },
    handleCopy() {
      this.$router.push({ path: '/mgt/decision/edit', query: { id: this.id, copy: true }})
    },
    downloadDialog() {
      downloadPDF(this.id)
    },
    handleDelete() {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.decision.submitType = 'submit'
        deleteDecision([this.decision]).then(() => {
          this.$router.go(-1)
        })
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
