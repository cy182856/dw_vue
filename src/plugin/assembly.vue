<template>
  <el-card class="assemblycont">
    <div class="assemblycontzzc" :style="{ 'z-index': zzcindex }" />
    <!-- 组件 -->
    <el-row :gutter="10">
      <el-col v-for="(item, index) in data" :key="index" :span="12">
        <div
          class="assemblycont_item"
          draggable
          @dragstart="dragstart(item)"
          @dragend="dragend"
        >
          {{ item.fieldName }}
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import MInput from './assembly/Input'
import MElCollapseItem from './assembly/ElCollapseItem'
import MDictSelect from './assembly/DictSelect'
import MDictAutoComplete from './assembly/DictAutoComplete'
import MTextarea from './assembly/Textarea'
import MDictRadio from './assembly/DictRadio'
import MAttachment from './assembly/Attachment'
import MUserSelect from './assembly/UserSelect'
import MAccountSelect from './assembly/AccountSelect'
import MDictCheckbox from './assembly/DictCheckbox'
import MDatePicker from './assembly/DatePicker'
import MMilliInput from './assembly/MilliInput'
import MColumnsLayout from './assembly/ColumnsLayout'
import MRelFuncSelect from './assembly/RelFuncSelect'
import MSelectByRemote from './assembly/SelectByRemote'
export default {
  components: {},
  props: {
    drag2: {
      type: String,
      default: () => {
        return '1'
      }
    }
  },
  data() {
    return {
      lj: false,
      data: [
        { formType: 'ElCollapseItem', fieldName: '折叠框' },
        { formType: 'ColumnsLayout', fieldName: '分栏布局' },
        { formType: 'Input', fieldName: '输入框' },
        { formType: 'Textarea', fieldName: '文本框' },
        { formType: 'DictSelect', fieldName: '下拉框' },
        { formType: 'DictAutoComplete', fieldName: '可追加下拉框' },
        { formType: 'DictRadio', fieldName: '单选按钮' },
        { formType: 'Attachment', fieldName: '附件' },
        { formType: 'DatePicker', fieldName: '日期' },
        { formType: 'DictCheckbox', fieldName: '复选框' },
        { formType: 'MilliInput', fieldName: '数字输入' },
        { formType: 'UserSelect', fieldName: '人员选择' },
        { formType: 'AccountSelect', fieldName: '客户选择' },
        { formType: 'RelFuncSelect', fieldName: '关联弹出框' },
        { formType: 'SelectByRemote', fieldName: '远程下拉框' }

      ]
    }
  },
  computed: {
    zzcindex() {
      return this.drag2 === '1' ? -10 : 10
    }
  },
  created() {},
  methods: {
    // click(item) {
    //   this.$emit('setcom', this.getobj(item))
    //   this.$emit('addcom')
    // },
    getobj(data) {
      let obj = {}
      if (data.formType === 'Input') {
        obj = new MInput()
      } else if (data.formType === 'ElCollapseItem') {
        obj = new MElCollapseItem()
      } else if (data.formType === 'DictSelect') {
        obj = new MDictSelect()
      } else if (data.formType === 'DictAutoComplete') {
        obj = new MDictAutoComplete()
      } else if (data.formType === 'Textarea') {
        obj = new MTextarea()
      } else if (data.formType === 'DatePicker') {
        obj = new MDatePicker()
      } else if (data.formType === 'DictRadio') {
        obj = new MDictRadio()
      } else if (data.formType === 'Attachment') {
        obj = new MAttachment()
      } else if (data.formType === 'UserSelect') {
        obj = new MUserSelect()
      } else if (data.formType === 'AccountSelect') {
        obj = new MAccountSelect()
      } else if (data.formType === 'DictCheckbox') {
        obj = new MDictCheckbox()
      } else if (data.formType === 'MilliInput') {
        obj = new MMilliInput()
      } else if (data.formType === 'ColumnsLayout') {
        obj = new MColumnsLayout()
      } else if (data.formType === 'RelFuncSelect') {
        obj = new MRelFuncSelect()
      } else if (data.formType === 'SelectByRemote') {
        obj = new MSelectByRemote()
      }
      return obj
    },
    dragstart(data) {
      this.$emit('setdrag', { type: 'drag1', value: '2' })
      this.$emit('setdrag', { type: 'drag4', value: '2' })
      const obj = this.getobj(data)
      this.$emit('setcom', obj)
    },
    dragend() {
      this.$emit('setdrag', { type: 'drag4', value: '1' })
      this.$emit('reset')
    },
    drop() {
      this.lj = false
      this.$emit('deletecom')
    },
    dragover() {
      this.lj = true
    },
    dragleave() {
      this.lj = false
    }
  }
}
</script>
<style lang="scss" >
.assemblycont {
  .el-card__body {
    overflow: auto;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.assemblycont {
  position: relative;
  // min-height: 700px;
  padding-left: 20px;
  height: 100%;
  .el-card__body {
    overflow: auto;
    height: 100%;
}
}
.assemblycontzzc {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #fff;
}

.assemblycont_item {
  background: #f1f2fd;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 10px;
  box-sizing: border-box;
  transition: 0.3s;
  cursor: pointer;
  cursor: move;
  font-size: 14px;
}
.assemblycont_item:hover {
  border: 1px dashed #579ff8;
  color: #579ff8;
  transition: 0.3s;
}
.imgclass {
  width: 200px;
  height: 200px;
}
</style>
