<template>
  <!-- 明细画面 -->
  <div class="summary">
    <decision-info :id="id" type="approve" @load="handleLoad" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
// import DictSelect from '@/components/DictWrite'
import DecisionInfo from '@/views/mgt/decision/components/DecisionInfo'
import { updateInstructItem } from '@/api/mgt/decision.js'
export default {
  name: 'DecisionApprove',
  components: {
    DecisionInfo
  },
  data() {
    return {
      decision: {}
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
    handleLoad(decision) {
      this.decision = decision
    },
    async beforeAgreeAction() {
      await updateInstructItem(this.decision)
    },
    async beforeRejectAction() {
      await updateInstructItem(this.decision)
    }
  }
}
</script>
<style lang="scss" scoped>
.summary {
  padding: 0px;
}
</style>
