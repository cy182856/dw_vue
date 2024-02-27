<template>
  <!-- 详细画面 -->
  <div class="summary">
    <motion-info :id="id" :key="id" :type="type" @load="handleLoad" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
import MotionInfo from '@/views/fee/promotion/components/MotionInfo'

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
    type: function() {
      // return this.$route.query.action
      return 'approve'
    },
    id: function() { return this.$route.query.id || this.$route.query.businessKey }
  },
  created() {
  },
  methods: {
  }
}
</script>
