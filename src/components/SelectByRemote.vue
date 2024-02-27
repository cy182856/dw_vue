<template>
  <el-select
    v-if="reFresh"
    size="small"
    :value="myValue? myValue + '' : ''"
    :clearable="clearable"
    :placeholder="disabled?'':placeholder"
    :disabled="disabled"
    :multiple="multiple"
    :loading="loading"
    @input="handleInput"
    @change="handleChange"
    @blur="handleBlur"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script>
import { getSelectOptions } from '@/api/base.js'

export default {
  name: 'SelectByRemote',
  props: {
    value: {
      type: null,
      default: ''
    },
    filter: {
      type: String,
      default: ''
    },
    method: {
      type: String,
      default: 'GET'
    },
    actionUrl: {
      type: String,
      default: ''
    },
    parentValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    params: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      myValue: this.value,
      myParentValue: this.parentValue,
      myParams: {},
      options: [],
      list: [],
      reFresh: true,
      loading: false
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal === null ? '' : newVal
    },
    parentValue(newVal, oldVal) {
      this.options = []
      this.myParentValue = newVal
      this.myValue = ''
      this.remoteMethod(newVal)
      this.$nextTick(() => {
        this.$emit('change', '')
        this.$emit('input', '')
      })
    }
  },
  mounted() {
    if (this.params) {
      this.myParams = JSON.parse(this.params)
    }
    this.remoteMethod(this.myParentValue)
  },
  methods: {
    async remoteMethod(parentValue) {
      this.loading = true
      if (this.filter) { this.myParams.filter = this.filter }
      this.myParams.parentValue = parentValue
      const res = await getSelectOptions(this.method, this.actionUrl, this.myParams)
      this.loading = false
      if (res && res.success) {
        this.options = res.datas.result
      } else {
        this.options = []
      }
      this.reFresh = false
      this.$nextTick(() => {
        this.reFresh = true
      })
    },
    handleInput(newValue) {
      this.myValue = newValue
      this.$emit('input', newValue)
    },
    handleChange(newValue) {
      this.myValue = newValue
      this.$emit('change', newValue)
    },
    handleBlur(newValue) {
      this.$emit('blur', newValue)
    }
  }
}
</script>
