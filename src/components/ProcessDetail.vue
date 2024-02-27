<template>
  <div class="display: flex;flex-direction: column;height: 100%;">
    <el-dialog
      id="processDialog"
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag fixed-search-btn-box"
      :before-close="handleCancelClick"
      top="0"
      :title="title"
      :visible.sync="isShow"
      width="80%"
    >
      <div class="footer-box">
        <div class="table">
          <el-table
            v-loading="isLoading"
            :data="approveHis"
            border
            stripe
            height="300"
            style="width: 100%"
          >
            <el-table-column prop="approveTime" :label="$t('component.process.approveTime')" />
            <el-table-column prop="taskName" :label="$t('component.process.taskName')" />
            <el-table-column prop="nickName" :label="$t('component.process.nickName')" />
            <el-table-column prop="approveResult" :label="$t('component.process.approveResult')">
              <template slot-scope="scope">
                <dict-write dict-type-id="ApproveResult" :value="scope.row.approveResult" />
              </template>
            </el-table-column>
            <el-table-column prop="comment" :label="$t('component.process.comment')" />
            <el-table-column v-if="canWithdraw" :label="$t('component.process.approve')">
              <!-- 撤回 -->
              <!-- <template slot-scope="scope">
                <el-button v-if="scope.row.withdrawTaskId" type="primary" class="iconfont icon-withdraw" size="mini" @click.prevent="handleWithdrawClick(scope.row)">

                  {{ $t('comm.withdraw') }}
                </el-button>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div id="workflowTrace">
        <div style="position:relative">
          <img id="pic" :src="picUrl" style="">
          <div id="processImageBorder">
            <el-tooltip v-for="(item, index) in activityInfos" :key="index" effect="light" placement="bottom" popper-class="tips">
              <!-- <table slot="content" class="tipTable">
              <tr v-for="(value, key) in item.vars" :key="key" v-show="value">
                <td class='tipLabel'>{{key}}</td>
                <td class='tipText'>{{value}}</td>
              </tr>
            </table> -->
              <div slot="content" class="tipTable">
                <div v-for="(value, key) in item.vars" v-show="value" :key="key" class="item">
                  <span>{{ key }}:</span>
                  <span>{{ value }}</span>
                </div>
              </div>
              <div class="activity-attr" :style="item.style" />
            </el-tooltip>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import DictWrite from '@/components/DictWrite'
import { getProcessTrace, withdrawTask } from '@/api/base'
import { niceScroll } from '@/mixins/nice-scroll.js'

export default {
  name: 'IvProcessDetail',
  components: {
    DictWrite
  },
  mixins: [niceScroll],
  props: {
    processInstId: {
      type: String,
      required: true
    },
    canWithdraw: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      isLoading: true,
      approveHis: [],
      activityInfos: [],
      picUrl: ''
    }
  },
  watch: {
    processInstId: 'fetchData'
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: async function() {
      const pid = this.processInstId
      const contextPath = process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : ''
      this.picUrl = contextPath + '/api/workflow/user/showPic/' + pid + '?' + new Date().getTime()
      const res = await getProcessTrace(pid)
      if (res && res.success) {
        const { approveHis, activityInfos } = res.datas
        this.approveHis = approveHis
        this.activityInfos = activityInfos
        this.activityInfos.forEach((item) => {
          Vue.set(item, 'style', `position: absolute; left: ${item.x}px; top: ${item.y}px; width: ${item.width}px; height: ${item.height}px; background-color: black; opacity: 0; z-index: 14999;`)
        })
      }
      this.isLoading = false
      this.handleOpened()
      this.scroll()
    },
    handleWithdrawClick: function(row) {
      this.$confirm(this.$t('comm.tip16'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const param = { taskId: row.withdrawTaskId, destActivityId: row.taskDefKey }
        const res = await withdrawTask(param)
        if (res && res.success) {
          this.fetchData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleCancelClick() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
table tr{
  line-height: 20px;
}

td.tipText {
  text-align: left;
  padding-left: 10px;
}

td.tipLabel {
  text-align: right;
  font-weight: bold;
  width: 60px;
}
.tips {
  padding:0 !important;
}

.tipTable {
  border:1px solid #F1D031;
  background-color:#FFFFA3;
  color:#555
}
#workflowTrace{
  margin-bottom: 70px;
}
</style>
