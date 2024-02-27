<template>
  <el-checkbox-group
    v-model="myValue"
    :value="value"
    :disabled="disabled"
    @input="handleInput"
    @change="handleChange"
  >
    <el-checkbox
      v-for="item in options"
      :key="item.dictId"
      size="small"
      :label="item.dictId"
    >
      {{ item.dictName }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>
import { dict } from '@/mixins/dict'
export default {
  name: 'IvDictCheckbox',
  mixins: [dict],
  props: {
    dictTypeId: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      default: () => { return [] }
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
