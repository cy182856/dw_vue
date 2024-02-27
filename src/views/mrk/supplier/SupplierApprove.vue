<template>
  <!-- 明细画面 -->
  <div class="summary">
    <supplier-info :id="id" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
import SupplierInfo from '@/views/mrk/supplier/components/SupplierInfo'
export default {
  name: 'SupplierApprove',
  components: {
    SupplierInfo
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
<style lang="scss" scoped>

</style>
<style lang="scss">

</style>
