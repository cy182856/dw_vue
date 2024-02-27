<template>
  <!-- 明细画面 -->
  <div class="summary">
    <contract-info :id="id" type="approve" @load="handleLoad" />
    <task-approve :task-id="taskId" :process-inst-id="processInstId" />
  </div>
</template>
<script>
// import DictSelect from '@/components/DictWrite'
import ContractInfo from '@/views/mgt/contract/components/ContractInfo'
import { updateInstructItem } from '@/api/mgt/contract.js'

export default {
  name: 'ContractApprove',
  components: {
    ContractInfo
  },
  data() {
    return {
      contract: {}
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
    handleLoad(contract) {
      this.contract = contract
    },
    async beforeAgreeAction() {
      await updateInstructItem(this.contract)
    },
    async beforeRejectAction() {
      await updateInstructItem(this.contract)
    }
  }
}
</script>

