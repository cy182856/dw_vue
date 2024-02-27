<template>
  <el-autocomplete
    v-model="myValue"
    size="small"
    class="inline-input"
    :clearable="clearable"
    :fetch-suggestions="querySearch"
    :placeholder="disabled?'':placeholder"
    @select="handleSelect"
    @input="handleInput"
    @change="handleChange"
    @blur="handleBlur"
  />
</template>
<script>
import { dict } from '@/mixins/dict'
export default {
  name: 'IvDictAutoComplete',
  mixins: [dict],
  props: {
    dictTypeId: {
      type: String,
      required: true
    },
    value: {
      type: null,
      default: ''
    },
    filter: {
      type: String,
      default: ''
    },
    parentId: {
      type: null,
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
      myValue: this.value
    }
  },
  computed: {
    opts() {
      return this.options.map(item => {
        return {
          value: item.dictName
        }
      })
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    }
  },
  // mounted() {
  //   this.restaurants = this.loadAll()
  // },
  methods: {
    querySearch(queryString, cb) {
      console.log(queryString)
      var opt = this.opts
      var results = queryString ? opt.filter(this.createFilter(queryString)) : opt
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (opt) => {
        return (opt.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
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
<style lang="scss" scoped>
.el-autocomplete{
  width: 100%;
}
</style>
