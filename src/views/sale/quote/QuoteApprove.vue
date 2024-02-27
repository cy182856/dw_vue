<template>
  <!-- 明细画面 -->
  <div class="summary">
    <quote-info :id="id" :key="id" type="approve" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
import QuoteInfo from '@/views/sale/quote/components/QuoteInfo'
export default {
  name: 'QuoteApprove',
  components: {
    QuoteInfo
  },
  data() {
    return {
    }
  },
  computed: {
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
</style>
