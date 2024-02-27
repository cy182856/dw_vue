<template>
  <el-select
    size="small"
    :value="value? value :''"
    :clearable="clearable"
    :placeholder="disabled?'':placeholder"
    :disabled="disabled"
    :multiple="multiple"
    collapse-tags
    @input="handleInput"
    @change="handleChange"
    @blur="handleBlur"
  >
    <el-option
      v-for="item in options"
      :key="item.dictId"
      :label="item.dictName"
      :value="item.dictId"
    />
  </el-select>
</template>
<script>
import { dict } from '@/mixins/dict'
export default {
  name: 'IvDictSelect',
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
    filter1: {
      type: String,
      default: ''
    },
    filter2: {
      type: String,
      default: ''
    },
    parentId: {
      type: null,
      default: ''
    },
    parent: {
      type: null,
      default: ''
    },
    relParent: {
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
    },
    smallc: {
      type: Boolean,
      default: false
    }
  }
}
</script>
