<template>
  <span>{{ text }}</span>
</template>
<script>
import { dict } from '@/mixins/dict'
export default {
  name: 'IvDictWrite',
  mixins: [dict],
  props: {
    dictTypeId: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, null],
      default: ''
    }
  },
  computed: {
    text: function() {
      if (!this.value) {
        return ''
      }
      if (this.options && this.options.length > 0) {
        const dictEntry = this.options.find(item => item.dictId === this.value || '')
        if (dictEntry) {
          return dictEntry.dictName
        } else {
          return this.value
        }
      } else {
        return this.value
      }
    }
  }

}
</script>
