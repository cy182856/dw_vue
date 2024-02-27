<template>
  <div style="height:100%">
    <el-row :gutter="10" style="height:100%">
      <el-col :span="5" style="height:100%">
        <Assembly
          :drag2="drag2"
          @addcom="addcom"
          @setcom="setcom"
          @setdrag="setdrag"
          @reset="reset"
        />
      </el-col>
      <el-col :span="14" style="height:100%">
        <Forms
          ref="forms"
          :from-data="data"
          :formsetting="formsetting"
          :drag1="drag1"
          :drag2="drag2"
          :drag4="drag4"
          :com="com"
          @setcom="setcom"
          @setdrag="setdrag"
          @reset="reset"
          @deletecom="deletecom"
          @addcom="addcom"
          @exchange="exchange"
          @setformcom="setformcom"
          @setdialogVisible="setdialogVisible"
          @save="save"
          @compositeData="compositeData"
        />
      </el-col>
      <el-col :span="5" style="height:100%">
        <AttrFrom
          :fields="fields"
          :form="formcom"
          :formsetting="formsetting"
          :index="index"
          :drag2="drag2"
        />
      </el-col>
    </el-row>
    <div>
      <el-dialog
        v-if="dialogVisible"
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag fixed-search-btn-box"
        top="0"
        title="预览"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose"
      >
        <ShowFrom :data="{ formsetting: formsetting, forms: data }" @save="save" @handleClose="handleClose" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Assembly from './assembly'
import Forms from './forms'
import AttrFrom from './attributeform'
import ShowFrom from './ShowForms'
export default {
  name: 'FormDesign',
  components: {
    Assembly,
    Forms,
    AttrFrom,
    ShowFrom
  },
  props: {
    formdata: {
      type: Object,
      default: () => { return {} }
    },
    fields: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 是否正在拖动的组件 1 没有动  2 已经拖动没有进入中间的界面  3拖动进入中间的页面 4 进入设计页面中的组件
      drag1: '1',
      // 是否正在拖动中间的组件 1 没有动  2 已经拖动没有进度其他组件  3 进入其他组件
      drag2: '1',
      // 是否是从左侧拖动的组件 1 中间拖动的 2 左侧拖动的
      drag4: '1',
      // 左边 被操作的组件
      com: {},
      index: 1,
      // 列表
      data: [],
      // 表单设置
      formsetting: {
        labelPosition: 'left',
        labelwidth: 80,
        formsize: 'small'
      },
      // 中间被点击的组件
      formcom: {
        showFrom: [],
        rules: []
      },
      dialogVisible: false
    }
  },
  created() {
    // 当传入props 值时 设置进入当前的data
    if (this.formdata && this.formdata.forms) {
      this.data = this.formdata.forms
    }
  },
  mounted() {},
  methods: {
    // 左边的全部重置 左边的结束拖动时调用
    reset() {
      this.drag1 = '1'
      this.drag2 = '1'
      this.drag4 = '1'
      // 重置中间的横线
      this.$refs.forms.chonzhihxindex()
    },
    // 预览的 对话框
    setdialogVisible() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 设置拖动状态
    setdrag(data) {
      this[data.type] = data.value
    },
    // 设置操作的组件
    setcom(data) {
      this.com = data
    },
    setformcom(data) {
      this.formcom = data
    },

    // 删除
    deletecom(data, index, colindex) {
      // 如果删除的是 被选中的 则把 选中的也清空
      if (data.id === this.formcom.id) {
        this.formcom = {
          showFrom: [],
          formType: ''
        }
      }
      if (data.type) {
        this.data.forEach((com, index2) => {
          if (com.formType === 'ColumnsLayout') {
            com.columns.forEach((item, index3) => {
              if (item.id === data.id && index === index2 && colindex === index3) {
                var column = {
                  span: item.span,
                  offset: item.offset,
                  formType: ''
                }
                this.$set(com.columns, index3, column)
              }
            })
          }
        })
      } else {
        this.data = this.data.filter((item) => item.id !== data.id)
      }
    },
    // 增加一个组件
    addcom(index = -1) {
      if (index === -1) {
        if (this.com.offset !== undefined) {
          this.$delete(this.com, 'offset')
          this.$delete(this.com, 'span')
        }
        if (this.com.formType !== '') {
          this.data.push(this.com)
        }
      } else {
        this.data.splice(index, 0, this.com)
      }
    },
    // 交换位置
    exchange(start, startCol, end, endCol) {
      const arr = this.data
      if (startCol === -1 && endCol === -1) {
        const data = arr[start]
        arr.splice(start, 1)
        arr.splice(end, 0, data)
        this.$set(this.data, arr)
      } else if (startCol === -1 && endCol !== -1) {
        const aa = arr[start]
        aa.offset = arr[end].columns[endCol].offset
        aa.span = arr[end].columns[endCol].span
        arr[start] = arr[end].columns[endCol]
        this.$delete(arr[start], 'offset')
        this.$delete(arr[start], 'span')
        arr[end].columns[endCol] = aa
        this.$set(this.data, arr)
      } else if (startCol !== -1 && endCol === -1) {
        const aa = arr[end]
        aa.offset = arr[start].columns[startCol].offset
        aa.span = arr[start].columns[startCol].span
        arr[end] = arr[start].columns[startCol]
        this.$delete(arr[end], 'offset')
        this.$delete(arr[end], 'span')
        arr[start].columns[startCol] = aa
        this.$set(this.data, arr)
      } else if (startCol !== -1 && endCol !== -1) {
        const endO = arr[end].columns[endCol].offset
        const endS = arr[end].columns[endCol].span
        var endArr = arr[end].columns[endCol]
        endArr.offset = arr[start].columns[startCol].offset
        endArr.span = arr[start].columns[startCol].span

        var startArr = arr[start].columns[startCol]
        startArr.offset = endO
        startArr.span = endS
        arr[start].columns[startCol] = endArr
        arr[end].columns[endCol] = startArr
        this.data = JSON.parse(JSON.stringify(arr))
      }
    },
    save() {
      this.$emit('save', { forms: this.data })
    },
    compositeData() {
      return this.$emit('compositeData', { forms: this.data })
    }
  }
}
</script>

<style lang="scss">
.el-card__body{
  padding: 10px !important;
}
</style>
