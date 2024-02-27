<template>
  <div class="updatehis dialog-his">
    <el-timeline>
      <el-timeline-item v-for="(item, index) in updateHistoryList" :key="index" :timestamp="item.createTimeStr" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p v-for="(detail, index2) in item.historyList" :key="index2">
            {{ detail.fieldName }}:<br>
            <span class="updatespan">{{ detail.oldValue }}</span><br>
            <span class="updatespan">{{ detail.newValue }}</span>
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import { getUpdateHistory, getApproveHistory } from '@/api/base'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'UpdateHis',
  mixins: [niceScroll],
  props: {
    funcDiv: {
      type: String,
      default: ''
    },
    identiferNum: {
      type: String,
      default: ''
    },
    queryId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      updateHistoryList: []
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    async __fetchData() {
      if (!this.identiferNum) { return false }
      let res
      if (this.queryId) {
        res = await getApproveHistory(this.funcDiv, this.identiferNum, this.queryId)
      } else {
        res = await getUpdateHistory(this.funcDiv, this.identiferNum)
      }
      const { success, datas } = res
      if (success && datas) {
        this.updateHistoryList = datas.updateHistoryList
      }
      this.handleOpenedHis()
    }
  }
}
</script>
<style lang="scss" scoped>
.updatespan{
  margin-left:50px;
  overflow-wrap: break-word;
  max-width: 250px;
  display: inline-block;
}
.updatehis{
  overflow: auto;
  .el-transfer{
    font-size: 12px;
    .el-checkbox {
      display: inline-block;
      position: relative;
      white-space: nowrap;
      width: 100%;
    }
  }
  .footer {
    text-align: right;
    padding-top: 20px;
    padding-right: 70px;
  }

}
</style>
