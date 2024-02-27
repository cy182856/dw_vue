<template>
  <!-- 明细画面 -->
  <div class="summary">
    <salesorder-info :id="id" :key="id" type="approve" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
import SalesorderInfo from '@/views/sale/salesorder/components/SalesorderInfo'
export default {
  name: 'QuoteApprove',
  components: {
    SalesorderInfo
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
