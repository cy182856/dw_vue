<template>
  <div class="versionhis dialog-his">
    <el-timeline>
      <el-timeline-item v-for="(item, index) in versionHistoryList" :key="index" :timestamp="item.createTime" placement="top">
        <el-card>
          <ul @click="handleVersionClick(item.id)">
            <li>{{ $t('comm.createBy') }}:{{ item.createBy | userName }}</li>
            <li>{{ $t('comm.version') }}:{{ item.version }}</li>
          </ul>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import { getVersionHistory } from '@/api/base'
import { names } from '@/mixins/names.js'
import { getDictName } from '@/utils/util'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'VersionHis',
  mixins: [names, niceScroll],
  props: {
    funcDiv: {
      type: String,
      default: ''
    },
    identiferNum: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      versionHistoryList: []
    }
  },
  created() {
    this.$store.dispatch('getDicts', 'FuncDivDetailPage')
    this.__fetchData()
  },
  methods: {
    async __fetchData() {
      if (!this.identiferNum) { return false }
      const res = await getVersionHistory(this.funcDiv, this.identiferNum)
      // console.log(res)
      const { success, datas } = res
      if (success && datas) {
        this.versionHistoryList = datas.versionHistoryList
      }
      this.handleOpenedHis()
    },
    handleVersionClick(id) {
      const path = getDictName('FuncDivDetailPage', this.funcDiv)
      // const baseUrl = window.location.href.split('#')[0]
      // window.open(baseUrl + '#' + path + '?id=' + id)
      console.log(path, id)
      this.$emit('versionClick')
      this.$router.push({ path: path, query: { id }})
    }
  }
}
</script>
<style lang="scss" scoped>
.versionhis{
  overflow: auto;
  .el-transfer{
    font-size: 12px;
  }
  ul {
    cursor: pointer;
  }
}
</style>
