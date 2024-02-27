<template>
  <div v-if="!attributes['isHide']" :class="attributes['flexClass'] || 'flex3'">
    <div :class="titleClass">
      {{ attributes['i18nLabelKey'] ? $t(attributes['i18nLabelKey']) : attributes['showName'] }}
    </div>
    <div class="input">
      <el-input v-if="attributes['formType']==='Input'" size="small" :value="myValue" :maxlength="attributes['maxlength']" :clearable="attributes['clearable']" :disabled="disabled" @blur="validator(attributes['fieldName'])" @input="handleInput">
        <template v-if="attributes['append'] !==''" slot="append">
          {{ $t(attributes['append']) }}
        </template>
      </el-input>
      <dict-select v-else-if="attributes['formType']==='DictSelect'" :value="myValue" class="input" :filter="attributes['filter']" :clearable="attributes['clearable']" :dict-type-id="attributes['dictTypeId']" :disabled="disabled" :parent="row[attributes['relParent']] ? row[attributes['relParent']] : ''" :rel-parent="attributes['relParent']" @change="handleChange" />
      <select-by-remote v-else-if="attributes['formType']==='SelectByRemote'" :value="myValue" :filter="attributes['filter']" :parent-value="myParentValue" :method="attributes['method']" :action-url="attributes['actionUrl']" :params="attributes['params']" :clearable="attributes['clearable']" :disabled="disabled" @change="handleChange" />
      <dict-auto-complete v-else-if="attributes['formType']==='DictAutoComplete'" :value="myValue" :filter="attributes['filter']" :dict-type-id="attributes['dictTypeId']" :disabled="disabled" @change="handleChange" />
      <select-auto-complete v-else-if="attributes['formType']==='SelectAutoComplete'" :value="myValue" :filter="attributes['filter']" :method="attributes['method']" :action-url="attributes['actionUrl']" :disabled="disabled" @change="handleChange" />
      <dict-checkbox v-else-if="attributes['formType']==='DictCheckbox'" :value="myValue" :filter="attributes['filter']" :dict-type-id="attributes['dictTypeId']" :disabled="disabled" @change="handleChange" />
      <dict-radio v-else-if="attributes['formType']==='DictRadio'" :value="myValue" :filter="attributes['filter']" :dict-type-id="attributes['dictTypeId']" :disabled="disabled" @change="handleChange" />
      <attachement v-else-if="attributes['formType']==='Attachment'" :value="myValue" :func-div="attributes['funcDiv']" :disabled="disabled" @change="handleChange" />
      <el-date-picker v-else-if="attributes['formType']==='DatePicker'" size="small" :value="myValue" :type="attributes['dateType'] || 'date'" :value-format="attributes['dateFormat'] || 'yyyy-MM-dd'" :disabled="disabled" @blur="validator(attributes['fieldName'])" @input="handleInput" />
      <el-input v-else-if="attributes['formType']==='Textarea'" type="textarea" show-word-limit :maxlength="attributes['maxlength']" :rows="attributes['rows']" :autosize="autosize" :value="myValue" :disabled="disabled" @blur="validator(attributes['fieldName'])" @input="handleInput" />
      <user-select v-else-if="attributes['formType']==='UserSelect'" :value="myValue" :root-org-id="attributes['rootOrgId']" :disabled="disabled" @change="handleChange" />
      <account-select v-else-if="attributes['formType']==='AccountSelect'" :value="myValue" :disabled="disabled" @blur="validator(attributes['fieldName'])" @input="handleChange" />
      <rel-func-select v-else-if="attributes['formType']==='RelFuncSelect'" :value="myValue" :row="row" :rel-func="attributes['relFunc']" :disabled="disabled" @blur="validator(attributes['fieldName'])" @input="handleChange" @data="handleData" />
      <milli-input v-else-if="attributes['formType']==='MilliInput'" :to-fixed-num="attributes['toFixedNum']" :value="myValue" :disabled="disabled" :append="attributes['append']" @blur="validator(attributes['fieldName'])" @input="handleInput" />
      <decision-select v-else-if="attributes['formType']==='DecisionSelect'" :value="myValue" :disabled="disabled" @blur="validator(attributes['fieldName'])" @input="handleChange" />
      <span :ref="attributes['fieldName']" :data-roles="attributes['dataRoles']" :data-value="myValue" class="message" />
    </div>
  </div>
</template>
<script>
import { dict } from '@/mixins/dict'
import { formValidator } from '@/mixins/form-validator.js'
import UserSelect from '@/components/UserSelect.vue'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import AccountSelect from '@/views/mrk/account/components/AccountSelect.vue'
import DecisionSelect from '@/views/mgt/decision/components/DecisionSelect.vue'
export default {
  name: 'IvFormElement',
  components: { UserSelect, DecisionSelect, AccountSelect, RelFuncSelect },
  mixins: [dict, formValidator],
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
      default: _ => {}
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // titleClass: '',
      myValue: this.value,
      myParentValue: ''
    }
  },
  computed: {
    titleClass() {
      if (this.attributes['dataRoles'] && this.attributes['dataRoles'].indexOf('required') >= 0) {
        return 'title must'
      } else {
        return 'title'
      }
    },
    autosize() {
      var autosize = this.attributes['autosize']
      console.log(autosize)
      console.log(typeof autosize)
      if (autosize && autosize !== '') {
        if (autosize === 'true') {
          autosize = true
        } else if (autosize === 'false') {
          autosize = false
        } else if (autosize.substr(0, 1) === '{') {
          autosize = JSON.parse(autosize)
        }
      }
      console.log(typeof autosize)
      return autosize
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.myValue = newVal
    },
    row: {
      handler(newVal, oldVal) {
        const objectPath = require('object-path')
        if (this.attributes['relParent']) {
          this.myParentValue = objectPath.get(newVal, this.attributes['relParent'])
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  methods: {
    handleChange(selectValue) {
      this.validator(this.attributes['fieldName'], selectValue)
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
      this.$set(data, 'refFunc', this.attributes['relFunc'])
      this.$emit('data', data)
    }
  }
}
</script>
