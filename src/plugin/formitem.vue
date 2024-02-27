<template>
  <div>
    <div>
      <el-collapse
        v-if="item.formType === 'ElCollapseItem'"
      />
      <dict-select
        v-if="item.formType === 'DictSelect'"
        v-model="forms[item.i18nLabelKey]"
        :dict-type-id="item.dictTypeId"
        style="float: left;"
      />
      <dict-auto-complete
        v-if="item.formType === 'DictAutoComplete'"
        v-model="forms[item.i18nLabelKey]"
        :dict-type-id="item.dictTypeId"
      />
      <el-input v-if="item.formType === 'Input'" v-model="forms[item.i18nLabelKey]" :disabled="item.disabled">
        <template v-if="item.append !==''" slot="append">
          {{ $t(item.append) }}
        </template>
      </el-input>
      <el-input v-if="item.formType === 'Textarea'" v-model="forms[item.i18nLabelKey]" :disabled="item.disabled" />

      <dict-checkbox
        v-if="item.formType === 'DictCheckbox'"
        v-model="forms[item.i18nLabelKey]"
        :dict-type-id="item.dictTypeId"
        :disabled="item.disabled"
      />
      <attachement
        v-if="item.formType === 'Attachment'"
        v-model="forms[item.i18nLabelKey]"
        :disabled="item.disabled"
      />
      <dict-radio
        v-if="item.formType === 'DictRadio'"
        v-model="forms[item.i18nLabelKey]"
        :dict-type-id="item.dictTypeId"
        :disabled="item.disabled"
      />
      <el-input
        v-if="item.formType === 'UserSelect'"
        v-model="forms[item.i18nLabelKey]"
        :disabled="item.disabled"
      />
      <el-input
        v-if="item.formType==='relFunc'"
        v-model="forms[item.i18nLabelKey]"
        :disabled="item.disabled"
      />
      <el-input
        v-if="item.formType === 'AccountSelect'"
        v-model="forms[item.i18nLabelKey]"
        :disabled="item.disabled"
      />
      <el-date-picker
        v-if="item.formType === 'DatePicker'"
        v-model="forms[item.i18nLabelKey]"
        :disabled="item.disabled"
      />
      <milli-input
        v-if="item.formType === 'MilliInput'"
        v-model="forms[item.i18nLabelKey]"
        :to-fixed-num="item.toFixedNum"
        :disabled="item.disabled"
      />
      <select-by-remote
        v-if="item.formType==='SelectByRemote'"
        :filter="item.filter"
        :method="item.method"
        :action-url="item.actionUrl"
        :params="item.params"
        :clearable="item.clearable"
        :disabled="item.disabled"
      />
    </div>
  </div>
</template>

<script>
import SelectByRemote from './assembly/SelectByRemote'
export default {
  name: 'Formitem',
  components: { SelectByRemote },
  props: {
    // 表单对象
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表单内的组件对象
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    forms() {
      return this.form
    }
  }
}
</script>

<style lang="scss" scoped>
.widget-view-action {
   position: absolute;
    right: 0;
    bottom: 0;
    height: 28px;
    line-height: 28px;
    background: #409eff;
    z-index: 9;
    i {
      font-size: 14px;
      color: #fff;
      margin: 0 5px;
      cursor: pointer;
    }
}
.felx{
  float:left;
  // right: 0;
  height: 30px;
  // width:100%
}
.el-form-item--small.el-form-item {
    margin-bottom: 2px;
    padding-left:10px;
}

</style>
