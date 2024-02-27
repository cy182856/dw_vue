<template>
  <div class="decisionSelect">
    <el-tooltip class="item" effect="dark" :disabled="!myValue" :content="myValue | funcName('decision')" placement="top">
      <el-input :value="myValue" :disabled="disabled" :placeholder="placeholder" size="small" suffix-icon="el-icon-search" @click.native="decisionSelectDialog=true" />
    </el-tooltip>
    <el-dialog id="decisionSelectDialog" title="禀议选择" append-to-body :visible.sync="decisionSelectDialog" width="80%" :close-on-click-modal="false">
      <decision-pop @cancel="decisionSelectDialog=false" @clear="handleDecisionSelectClear" @select="handleDecisionSelected" />
    </el-dialog>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import DecisionPop from '@/views/mgt/decision/components/DecisionPop.vue'
export default {
  name: 'DecisionSelect',
  components: {
    DecisionPop
  },
  mixins: [formValidator, names],
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myValue: this.value,
      decisionSelectDialog: false
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    }
  },
  methods: {
    handleDecisionSelectClear() {
      this.myValue = ''
      this.$emit('input', '')
      this.$emit('change', '')
    },
    handleDecisionSelected(decisions) {
      if (!decisions || decisions.length !== 1) {
        this.$message({
          type: 'error',
          message: '请选择一条记录'
        })
        return
      }
      this.myValue = decisions[0].identiferNum
      this.decisionSelectDialog = false
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
    }
  }
}
</script>
<style lang="scss" scoped>
  .decisionSelect {
    width: 100%;
  }
</style>

