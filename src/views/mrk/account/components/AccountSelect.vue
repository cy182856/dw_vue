<template>
  <div class="accountSelect">
    <el-tooltip class="item" effect="dark" :disabled="!myValue" :content="myValue" placement="top">
      <el-input :value="myValue | funcName('account')" :disabled="disabled" :placeholder="placeholder" size="small" suffix-icon="el-icon-search" @click.native="accountSelectDialog=true" />
    </el-tooltip>
    <account-pop :is-show="accountSelectDialog" @cancel="accountSelectDialog=false" @clear="handleAccountSelectClear" @select="handleAccountSelected" />
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import AccountPop from '@/views/mrk/account/components/AccountPop.vue'
export default {
  name: 'AccountSelect',
  components: {
    AccountPop
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
      accountSelectDialog: false
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    }
  },
  methods: {
    handleAccountSelectClear() {
      this.myValue = ''
      this.$emit('input', '')
      this.$emit('change', '')
    },
    handleAccountSelected(accounts) {
      if (!accounts || accounts.length !== 1) {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg3')
        })
        return
      }
      this.myValue = accounts[0].identiferNum
      this.accountSelectDialog = false
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
      console.log(accounts[0])
    }
  }
}
</script>
<style lang="scss" scoped>
  .accountSelect {
    width: 100%;
  }
</style>

