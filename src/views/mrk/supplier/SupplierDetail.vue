<template>
  <!-- 明细画面 -->
  <div class="summary">
    <supplier-info :id="id" :key="id" :type="action?action:'detail'" @load="handleLoad" />
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
        <li v-if="supplier.workflowFlag === '0' && supplier.lastFlag === 1 " class="operation-item" @click="handleEdit()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <!-- 删除 -->
        <li v-if="supplier.workflowFlag === '0' && supplier.lastFlag === 1" class="operation-item" @click="handleDelete()">
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
        <li v-if="supplier.workflowProcessInstId" class="operation-item" @click="approveHisDialog=true">
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
        <update-his :key="supplier.identiferNum" func-div="supplier" :identifer-num="supplier.identiferNum" />
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
        <version-his :key="supplier.identiferNum" func-div="supplier" :identifer-num="supplier.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
    <div v-if="approveHisDialog" class="approveHis">
      <process-detail :key="supplier.workflowProcessInstId" :title="$t('component.taskApprove.detailedProcess') + supplier.workflowProcessInstId" :is-show="approveHisDialog" :process-inst-id="supplier.workflowProcessInstId" @close="approveHisDialog=false" />
    </div>
  </div>
</template>
<script>
import { deleteSupplier, cancelProcess, deleteApply } from '@/api/mrk/supplier.js'
import SupplierInfo from '@/views/mrk/supplier/components/SupplierInfo'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'SupplierDetail',
  components: {
    SupplierInfo
  },
  mixins: [permission],
  data() {
    return {
      historyDialog: false,
      approveHisDialog: false,
      versionDialog: false,
      supplier: {
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
    handleLoad(supplier) {
      this.supplier = supplier
    },
    handleEdit() {
      this.$router.push({ path: '/mrk/supplier/edit', query: { id: this.id }})
    },
    handleCopy() {
      this.$router.push({ path: '/mrk/supplier/edit', query: { id: this.id, copy: true }})
    },
    handleDelete() {
      this.supplier.submitType = 'submit'
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await deleteSupplier([this.supplier])
        if (res && res.success) {
          this.$router.push('/mrk/supplierList')
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
          this.$router.push('/mrk/supplierList')
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
    handleSubmit() {
      this.supplier.submitType = 'deleteReSubmit'
      this.supplier.taskId = this.taskId
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        deleteApply(this.supplier).then(() => {
          this.$router.push('/mrk/supplierList')
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
