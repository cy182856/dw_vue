<template>
  <!-- 明细画面 -->
  <div class="summary">
    <quote-info :id="id" :key="id" :type="action?action:'detail'" @load="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 提交 -->
        <li v-if="action==='delete'" class="operation-item" @click="handleSubmit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontijiao" /></span>
          <span class="operation-text">{{ $t('comm.submit') }}</span>
        </li>
        <!-- 流程取消 -->
        <li v-if="action==='delete' && taskId" class="operation-item" @click="handleCancel">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.processCancel') }}</span>
        </li>
        <!-- 编辑 -->
        <li v-if="quote.workflowFlag === '0' && quote.lastFlag === 1 " class="operation-item" @click="handleEdit()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <!-- 删除 -->
        <li v-if="quote.workflowFlag === '0' && quote.lastFlag === 1" class="operation-item" @click="handleDelete()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">{{ $t('comm.delete') }}</span>
        </li>
        <!-- 复制 -->
        <li v-if="!action" class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <!-- 变更履历 -->
        <li v-if="!action" class="operation-item" @click="historyDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <!-- 历史版本 -->
        <li v-if="!action" class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="quote.workflowProcessInstId" class="operation-item" @click="approveHisDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <!-- 生成订单 -->
        <li v-if="!action" class="operation-item" @click="handleCreateOrder">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('sale.opportunity.createOrder') }}</span>
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
        <update-his :key="quote.identiferNum" func-div="quote" :identifer-num="quote.identiferNum" />
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
        <version-his :key="quote.identiferNum" func-div="quote" :identifer-num="quote.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
    <div v-if="approveHisDialog" class="approveHis">
      <process-detail :key="quote.workflowProcessInstId" :title="$t('component.taskApprove.detailedProcess') + quote.workflowProcessInstId" :is-show="approveHisDialog" :process-inst-id="quote.workflowProcessInstId" @close="approveHisDialog=false" />
    </div>
  </div>
</template>
<script>
import { deleteQuote, cancelProcess, deleteApply } from '@/api/sale/quote.js'
import QuoteInfo from '@/views/sale/quote/components/QuoteInfo'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'QuoteDetail',
  components: {
    QuoteInfo
  },
  mixins: [permission],
  data() {
    return {
      historyDialog: false,
      approveHisDialog: false,
      versionDialog: false,
      quote: {
      }
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
    handleLoad(quote) {
      this.quote = quote
    },
    handleEdit() {
      this.$router.push({ path: '/sale/quote/edit', query: { id: this.id }})
    },
    handleCopy() {
      this.$router.push({ path: '/sale/quote/edit', query: { id: this.id, copy: true }})
    },
    handleDelete() {
      this.quote.submitType = 'submit'
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await deleteQuote([this.quote])
        if (res && res.success) {
          this.$router.push('/sale/quoteList')
        }
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
        const res = await cancelProcess(this.taskId)
        if (res && res.success) {
          this.$router.push('/sale/quoteList')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleCreateOrder() {
      this.$router.push({ path: '/sale/salesorder/edit', query: { quoteId: this.id, copy: true }})
    },
    handleSubmit() {
      this.quote.submitType = 'deleteReSubmit'
      this.quote.taskId = this.taskId
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        deleteApply(this.quote).then(() => {
          this.$router.push('/sale/quoteList')
        })
      }).catch(_ => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
</style>
