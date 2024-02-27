<template>
  <div class="col_input_box">
    <div v-if="attributes['isText'] && attributes['formType'] === 'MilliInput'">
      {{ myValue | numFormat(attributes['toFixedNum']) }}
    </div>
    <div v-else-if="attributes['isText'] && attributes['formType'] === 'DictSelect'">
      {{ myValue | dictName(attributes['dictTypeId']) }}
    </div>
    <div v-else-if="attributes['isText']">
      {{ myValue }}
    </div>
    <div v-else class="input">
      <el-input
        v-if="attributes['formType'] === 'Input'"
        size="small"
        :value="myValue"
        :maxlength="attributes['maxlength']"
        :placeholder="$t(attributes['i18nLabelKey'])"
        :disabled="!!attributes['disabled']"
        :clearable="attributes['clearable']"
        @blur="validator(attributes['fieldName']+indexObject.lineIndex)"
        @input="handleInput"
      />
      <dict-select
        v-else-if="attributes['formType'] === 'DictSelect'"
        size="small"
        :value="myValue"
        :clearable="attributes['clearable']"
        :filter="attributes['filter']"
        :dict-type-id="attributes['dictTypeId']"
        :disabled="!!attributes['disabled']"
        :parent="row[attributes['relParent']] ? row[attributes['relParent']] : ''"
        :rel-parent="attributes['relParent']"
        @change="handleChange"
      />
      <dict-checkbox
        v-else-if="attributes['formType'] === 'DictCheckbox'"
        :value="myValue"
        :filter="attributes['filter']"
        :dict-type-id="attributes['dictTypeId']"
        :disabled="!!attributes['disabled']"
        @change="handleChange"
      />
      <attachement
        v-else-if="attributes['formType'] === 'Attachment'"
        :value="myValue"
        :func-div="attributes['funcDiv']"
        :disabled="!!attributes['disabled']"
        @change="handleChange"
      />
      <user-select
        v-else-if="attributes['formType'] === 'UserSelect'"
        :value="myValue"
        :placeholder="$t(attributes['i18nLabelKey'])"
        :disabled="!!attributes['disabled']"
        @change="handleChange"
      />
      <el-input
        v-else-if="attributes['formType'] === 'Textarea'"
        type="textarea"
        :rows="attributes['rows']"
        :autosize="autosize"
        :maxlength="attributes['maxlength']"
        :value="myValue"
        :placeholder="disabled ? '' : $t(attributes['i18nLabelKey'])"
        :disabled="!!attributes['disabled']"
        @blur="validator(attributes['fieldName']+indexObject.lineIndex)"
        @input="handleInput"
      />
      <el-date-picker
        v-else-if="attributes['formType'] === 'DatePicker'"
        size="small"
        :value="myValue"
        :placeholder="$t(attributes['i18nLabelKey'])"
        type="date"
        value-format="yyyy-MM-dd"
        :disabled="!!attributes['disabled']"
        @blur="validator(attributes['fieldName']+indexObject.lineIndex)"
        @input="handleInput"
      />
      <milli-input
        v-else-if="attributes['formType'] === 'MilliInput'"
        :to-fixed-num="attributes['toFixedNum']"
        :value="myValue"
        :placeholder="$t(attributes['i18nLabelKey'])"
        :disabled="!!attributes['disabled']"
        @blur="validator(attributes['fieldName']+indexObject.lineIndex)"
        @input="handleInput"
      />
      <rel-func-select
        v-else-if="attributes['formType'] === 'RelFuncSelect'"
        :value="myValue"
        :rel-func="attributes['relFunc']"
        :placeholder="!!attributes['disabled'] ? '' : $t(attributes['i18nLabelKey'])"
        :disabled="!!attributes['disabled']"
        :row="row"
        :rel-func-style="attributes['relFuncStyle']"
        @blur="validator(attributes['fieldName']+indexObject.lineIndex)"
        @input="handleInput"
        @data="handleData"
      />
      <span
        :ref="attributes['fieldName']+indexObject.lineIndex"
        :data-roles="attributes['dataRoles']"
        :data-value="myValue"
        class="message"
        style="display: none"
      />
    </div>
  </div>
</template>
<script>
import { dict } from '@/mixins/dict'
import { formValidator } from '@/mixins/form-validator.js'
import UserSelect from '@/components/UserSelect.vue'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
import { names } from '@/mixins/names.js'
export default {
  name: 'IvColumnElement',
  components: { UserSelect, RelFuncSelect },
  mixins: [dict, formValidator, numFormat, names],
  props: {
    value: {
      type: null,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    attributes: {
      type: Object,
      default: (_) => {}
    },
    row: {
      type: Object,
      default: () => {}
    },
    indexObject: {
      type: Object,
      default: () => { return { lineIndex: '' } }
    }
  },
  data() {
    return {
      myValue: this.value
    }
  },
  computed: {
    autosize() {
      var autosize = this.attributes['autosize']
      if (autosize && autosize !== '') {
        if (autosize === 'true') {
          autosize = true
        } else if (autosize === 'false') {
          autosize = false
        } else if (autosize.substr(0, 1) === '{') {
          autosize = JSON.parse(autosize)
        }
      }
      return autosize
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    }
  },
  created() {
    console.log(this.attributes['formType'] + ' created')
  },
  methods: {
    handleChange(selectValue) {
      this.validator(this.attributes['fieldName'] + this.indexObject.lineIndex, selectValue)
      this.$emit('input', selectValue)
      this.$emit('change', selectValue)
      if (this.attributes.formType === 'DictSelect') {
        this.$emit('setValue')
      }
    },
    handleInput(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
    handleData(data) {
      this.$set(data, 'indexObject', this.indexObject)
      this.$emit('data', data)
    }
  }
}
</script>
<style scoped>
</style>
