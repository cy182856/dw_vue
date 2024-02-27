<template>
  <div class="summary">
    <div class="detail">
      <el-collapse value="1">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('component.taskApprove.approval') }}</span>
          <div class="input_box">
            <el-row class="flex1">
              <el-col :span="8">
                <div class="input_col1">
                  <div class="flex1">
                    <div class="title">
                      <!-- 驳回至 -->
                      {{ $t('component.taskApprove.dismissTo') }}
                    </div>
                    <el-select
                      v-model="destActivityId"
                      clearable
                      class="input el-input--small"
                    >
                      <el-option
                        v-for="item in destActivityList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="flex1">
              <div class="title">
                <!-- 备注 -->
                {{ $t('component.taskApprove.remarks') }}
              </div>
              <el-input
                v-model="comment"
                class="input"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                :placeholder="$t('component.taskApprove.remarks')"
              />
            </div>
          </div>
          <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
            <!-- 保存 -->
            <li class="operation-item" @click="handleAgreeClick">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
              <span class="operation-text">{{ $t('component.taskApprove.agree') }}</span>
            </li>
            <!-- 驳回 -->
            <li class="operation-item" @click="handleRejectClick">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
              <span class="operation-text">{{ $t('component.taskApprove.reject') }}</span>
            </li>
            <!-- 审批履历 -->
            <li class="operation-item" @click="handleApproveHisClick">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
              <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
            </li>
            <!-- 变更履历 -->
            <li class="operation-item" @click="historyDialog = true">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
              <span class="operation-text">{{ $t('comm.updateHis') }}</span>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-if="dialogTableVisible">
      <process-detail :key="processInstId" :is-show="dialogTableVisible" :title="$t('component.taskApprove.detailedProcess') + processInstId" :process-inst-id="processInstId" @close="dialogTableVisible=false" />
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
        <update-his :key="identiferNum" :query-id="queryId" :func-div="funcDiv" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>

<script>
import ProcessDetail from '@/components/ProcessDetail'
import { agreeTask, rejectTask, getBackActivity } from '@/api/base'

export default {
  name: 'IvTaskApprove',
  components: {
    ProcessDetail
  },
  props: {
    processInstId: {
      type: String,
      required: true
    },
    taskId: {
      type: String,
      required: true
    },
    identiferNum: {
      type: String,
      default: ''
    },
    funcDiv: {
      type: String,
      default: ''
    },
    queryId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      dialogTableVisible: false,
      historyDialog: false,
      destActivityId: '',
      comment: '',
      destActivityList: []
    }
  },
  watch: {
    taskId: 'fetchData'
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: async function() {
      const params = { taskId: this.taskId }
      const res = await getBackActivity(params)
      if (res && res.success) {
        this.destActivityList = res.datas.backToList
      }
    },
    handleApproveHisClick: function() {
      this.dialogTableVisible = true
    },
    handleAgreeClick: function() {
      this.$confirm(this.$t('comm.tip14'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        if (this.$parent.beforeAgreeAction) {
          await this.$parent.beforeAgreeAction()
        }
        const param = { taskId: this.taskId, comment: this.comment }
        const res = await agreeTask(param)
        if (res && res.success) {
          if (window.history.length <= 1) {
            this.$router.push({ path: '/' })
            return false
          } else {
            this.$router.go(-1)
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleRejectClick: function() {
      if (!this.destActivityId) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg30')
        })
        return
      }
      if (!this.comment) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg31')
        })
        return
      }
      this.$confirm(this.$t('comm.tip15'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        if (this.$parent.beforeRejectAction) {
          await this.$parent.beforeRejectAction()
        }
        const param = { taskId: this.taskId, destActivityId: this.destActivityId, comment: this.comment }
        const res = await rejectTask(param)
        if (res && res.success) {
          if (window.history.length <= 1) {
            this.$router.push({ path: '/' })
            return false
          } else {
            this.$router.go(-1)
          }
        }
      }).catch(() => {
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
// .el-select {
//   .el-input--small {
//     padding-right: 10px;
//   }
// }
</style>
