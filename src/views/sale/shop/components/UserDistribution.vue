<template>
  <div class="userSelect">
    <div class="select_box">
      <user-org-tree
        tree-type="personnel"
        :multiple="multiple"
        :root-org-id="rootOrgId"
        @select="handleTreeSelect"
        @clear="handleTreeClear"
        @cancel="$emit('cancel')"
      />
    </div>
  </div>
</template>
<script>
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
export default {
  name: 'UserSelect',
  mixins: [names, formValidator],
  props: {
    rootOrgId: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleTreeSelect(data) {
      if (data.type !== 'user') {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg4')
        })
        return false
      }

      console.log(this.multiple)
      this.$emit('change', data.id)
      this.$emit('input', data.id)
      this.$emit('data', data)
    },
    handleTreeClear() {
      this.$emit('change', '')
      this.$emit('input', '')
    }
  }
}
</script>
<style lang="scss" scoped>
.userSelect {
  width: 100%;
  .i-tree {
    margin-top: 0px;
  }
}
</style>
