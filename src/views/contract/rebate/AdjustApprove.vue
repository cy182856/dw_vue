<template>
  <!-- 明细画面 -->
  <div class="summary">
    <adjust-info :id="id" type="approve" @load="handleLoad" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
import AdjustInfo from './components/AdjustInfo'

export default {
  name: 'AdjustApprove',
  components: {
    AdjustInfo
  },
  data() {
    return {
      adjust: {}
    }
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() { return this.$route.query.id || this.$route.query.businessKey }
  },
  created() {
  },
  methods: {
    handleLoad(adjust) {
      this.adjust = adjust
    }
    // async beforeAgreeAction() {
    //   await updateInstructItem(this.adjust)
    // },
    // async beforeRejectAction() {
    //   await updateInstructItem(this.adjust)
    // }
  }
}
</script>

