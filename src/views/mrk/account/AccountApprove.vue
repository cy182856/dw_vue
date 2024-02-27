<template>
  <!-- 明细画面 -->
  <div class="summary">
    <account-info :id="id" :key="id" type="approve" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
import AccountInfo from '@/views/mrk/account/components/AccountInfo'

export default {
  name: 'AccountApprove',
  components: {
    AccountInfo
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
