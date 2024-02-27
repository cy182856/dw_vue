<template>
  <el-autocomplete
    v-model="myValue"
    size="small"
    class="inline-input"
    :clearable="clearable"
    :fetch-suggestions="querySearch"
    :placeholder="disabled?'':placeholder"
    :hide-loading="hideLoading"
    @select="handleSelect"
  />
</template>
<script>
import { getSelectOptions } from '@/api/base.js'
export default {
  name: 'AutoCompleteByRemote',
  props: {
    value: {
      type: null,
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
      hideLoading: true
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    }
  },
  mounted() {
    if (this.params) {
      this.myParams = JSON.parse(this.params)
    }
  },
  // mounted() {
  //   this.restaurants = this.loadAll()
  // },
  methods: {
    async querySearch(queryString, cb) {
      console.log(queryString)
      this.hideLoading = false
      this.myParams.query = queryString
      const res = await getSelectOptions(this.method, this.actionUrl, this.myParams)
      this.hideLoading = true
      if (res && res.success) {
        // 返回值格式 [{value:'123'},{value:'223'},]
        // 调用 callback 返回建议列表的数据
        cb(res.datas.result)
      }
    },
    // loadAll() {

    // },
    handleSelect(item) {
      this.$emit('change', item.value)
    }
  }
}
</script>
