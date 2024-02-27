<template>
  <div class="userSelect">
    <el-input v-show="isGet" :value="myValue | userName" :disabled="disabled" :placeholder="placeholder" size="small" @input="handleText" @click.native="disabled?false:canText?false:selectUserDialog=true">
      <i slot="suffix" class="el-input__icon el-icon-user-solid i-tree" @click="canText?selectUserDialog=true:false" />
    </el-input>
    <el-input v-show="!isGet" v-model="myValue" :disabled="disabled" :placeholder="placeholder" size="small" @input="handleText" @click.native="disabled?false:canText?false:selectUserDialog=true">
      <i slot="suffix" class="el-input__icon el-icon-user-solid i-tree" @click="canText?selectUserDialog=true:false" />
    </el-input>
    <el-dialog
      :title="$t('comm.userSelect')"
      :visible.sync="selectUserDialog"
      custom-class="content-dialog-userSelect"
      append-to-body
      width="33%"
    >
      <div class="select_box">
        <user-org-tree
          tree-type="personnel"
          :multiple="multiple"
          :root-org-id="rootOrgId"
          :clearable="clearable"
          @select="handleTreeSelect"
          @cancel="selectUserDialog=false"
          @clear="handleTreeClear"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
export default {
  name: 'UserSelect',
  mixins: [names, formValidator],
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rootOrgId: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    canText: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myValue: this.value,
      selectUserDialog: false,
      isGet: true
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    }
  },
  methods: {
    handleTreeSelect(data) {
      if (this.multiple) {
        const item = data.find(ele => { ele.type !== 'user' })
        if (item) {
          this.$message({
            type: 'error',
            message: this.$t('comm.msg4')
          })
          return false
        }
        data.id = data.map(ele => ele.id).toString()
      } else {
        if (data.type !== 'user') {
          this.$message({
            type: 'error',
            message: this.$t('comm.msg4')
          })
          return false
        }
      }
      this.isGet = true
      this.$emit('change', data.id)
      this.$emit('input', data.id)
      this.$emit('data', data)
      this.myValue = data.id
      this.selectUserDialog = false
    },
    handleTreeClear() {
      this.$emit('change', '')
      this.$emit('input', '')
      this.myValue = ''
      this.selectUserDialog = false
    },
    handleText(val) {
      if (!this.canText) return
      this.isGet = false
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.userSelect {
  width: 100%;
  .i-tree {
    margin-top: 0px
  }
}
</style>
