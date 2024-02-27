<template>
  <el-radio-group
    v-model="myValue"
    :disabled="disabled"
    @change="handleChange"
    @input="handleInput"
    @blur="handleBlur"
  >
    <el-radio
      v-for="item in options"
      :key="item.dictId"
      size="small"
      :label="item.dictId"
    >
      {{ item.dictName }}
    </el-radio>
  </el-radio-group>
</template>
<script>
import { dict } from '@/mixins/dict'
export default {
  name: 'IvDictRadio',
  mixins: [dict],
  props: {
    dictTypeId: {
      type: String,
      required: true
    },
    value: {
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
      myValue: this.value
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    }
  }
}
</script>
