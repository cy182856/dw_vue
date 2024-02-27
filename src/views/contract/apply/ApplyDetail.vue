<template>
  <!-- 明细画面 -->
  <div class="summary">
    <apply-info :id="id" :key="id" @load="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li v-if="contract.workflowFlag === '0' && contract.lastFlag === 1" class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
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
        <li v-if="contract.workflowProcessInstId" class="operation-item" @click="approveHisDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <!-- <li v-if="contract.prompt==='1' && hasPermission('promptBtn')" class="operation-item" @click="cancelPromptDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">提醒取消</span>
        </li>-->
        <li class="operation-item" @click="downloadDialog">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">PDF下载</span>
        </li>
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
        <li class="operation-item" @click="handleTerminate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">合同终止</span>
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
        <span slot="title" style="font-size:20px">变更履历</span>
        <update-his :key="contract.identiferNum" func-div="contract" :identifer-num="contract.identiferNum" />
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
        <span slot="title" style="font-size:20px">历史版本</span>
        <version-his :key="contract.identiferNum" func-div="contract" :identifer-num="contract.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
    <div v-if="approveHisDialog" class="approveHis">
      <process-detail :key="contract.workflowProcessInstId" :title="$t('component.taskApprove.detailedProcess') + contract.workflowProcessInstId" :is-show="approveHisDialog" :process-inst-id="contract.workflowProcessInstId" @close="approveHisDialog=false" />
    </div>
    <div class="approveHis">
      <el-dialog id="processDialog" title="提醒取消" :visible.sync="cancelPromptDialog" width="55%" :close-on-click-modal="false">
        <div class="input_box">
          <div class="flex1">
            <div class="title">
              处理选择：
            </div>
            <div class="input">
              <el-radio-group v-model="cancelPrompt.select">
                <el-radio v-if="contract.automaticUpdate==='1'" label="auto">
                  自动延期
                </el-radio>
                <el-radio label="end">
                  到期无效
                </el-radio>
                <el-radio label="edit">
                  合同变更
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <div v-show="cancelPrompt.select==='auto'" class="flex3" style="margin-top:13px">
            <div class="title">
              是否延期
            </div>
            <div class="input">
              <dict-radio v-model="contract.isAutoUpdate" dict-type-id="IsNo" />
            </div>
          </div>
          <div v-show="cancelPrompt.select==='auto' && contract.isAutoUpdate==='1'" class="flex3_1">
            <div class="title">
              新的合同结束日:
            </div>
            <div class="input" style="length:">
              <el-date-picker v-model="contract.newContractEndDate" value-format="yyyy-MM-dd" size="small" />
            </div>
          </div>
          <div style="width:100%">
            <el-button type="primary" @click="handleCancelPromptOkClick">
              {{ $t('comm.certain') }}
            </el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { deleteContract, cancelPrompt, updateContractEndDate } from '@/api/mgt/contract.js'
import ApplyInfo from './components/ApplyInfo'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'ApplyDetail',
  components: {
    ApplyInfo
  },
  mixins: [permission],
  data() {
    return {
      historyDialog: false,
      approveHisDialog: false,
      versionDialog: false,
      cancelPromptDialog: false,
      cancelPrompt: {
        select: '',
        isAutoUpdate: ''
      },
      contract: {
      },
      data: {
      }
    }
  },
  computed: {
    id: function() { return this.$route.query.id }
  },
  created() {
  },
  methods: {
    handleLoad(contract) {
      this.contract = contract
      this.$set(contract, 'newContractEndDate', this.contract.contractEndDate)
    },
    handleEdit() {
      this.$router.push({ path: '/mgt/contract/edit', query: { id: this.id }})
    },
    handleCopy() {
      this.$router.push({ path: '/mgt/contract/edit', query: { id: this.id, copy: true }})
    },
    downloadDialog() {
      // downloadPDF(this.id)
    },
    handleDelete() {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.contract.submitType = 'submit'
        deleteContract([this.contract]).then(() => {
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
    },
    handleCancelPromptOkClick() {
      if (this.cancelPrompt.select === '') {
        this.$message({
          type: 'info',
          message: '请选择一个选项'
        })
        return
      }
      if (this.cancelPrompt.select === 'auto' && this.contract.isAutoUpdate === '1') {
        this.data.contractEndDate = this.contract.newContractEndDate
      }
      this.data.id = this.contract.id
      this.data.identiferNum = this.contract.identiferNum
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        let res
        if (this.cancelPrompt.select === 'auto' && this.contract.isAutoUpdate === '1') {
          res = await updateContractEndDate(this.data)
        } else {
          res = await cancelPrompt(this.data)
        }
        if (res && res.success) {
          this.$router.push('/mgt/contractList')
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
    handleTerminate() {

    }
  }
}
</script>
