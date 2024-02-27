<template>
  <!-- 明细画面 -->
  <div class="summary">
    <promoter-info :id="id" :key="id" type="approve" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
import PromoterInfo from './components/PromoterInfo'

export default {
  name: 'PrewithdrawApprove',
  components: {
    PromoterInfo
  },
  data() {
    return {}
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    }
  },
  created() {},
  methods: {}
}
</script>
