<template>
  <el-select
    v-model="myValue"
    size="small"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :clearable="clearable"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="handleChange"
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
  name: 'SelectFilterByRemote',
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
      default: ''
    },
    actionUrl: {
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
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      myValue: this.value,
      myParams: {},
      options: [],
      list: [],
      loading: false
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    }
  },
  mounted() {
    if (this.params) {
      this.myParams = JSON.stringify(this.params)
    }
    this.remoteMethod()
  },
  methods: {
    async remoteMethod(query) {
      if (query) {
        this.loading = true
        this.myParams.query = query
        const res = await getSelectOptions(this.method, this.actionUrl, this.myParams)
        this.loading = false
        if (res && res.success) {
          // 返回值格式 [{label:'显示文字', value:'123'},{label:'显示文字2', value:'223'},]
          this.options = res.datas.result
        }
      } else {
        this.options = []
      }
    },
    handleChange(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    }
  }
}
</script>
