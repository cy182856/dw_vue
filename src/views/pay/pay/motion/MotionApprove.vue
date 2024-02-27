<template>
  <!-- 明细画面 -->
  <div class="summary">
    <motion-info :id="id" :key="id" type="approve" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
import MotionInfo from './components/MotionInfo'

export default {
  name: 'MotionApprove',
  components: {
    MotionInfo
  },
  data() {
    return {
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
  }
}
</script>
