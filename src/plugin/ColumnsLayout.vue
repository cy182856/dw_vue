<template>
  <div class="cont">
    <div
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
      label-width="0"
      class="col-dynamic"
      size="mini"
    >
      <el-row
        :key="tablekey"
        empty-text="拖动左侧的组件到分栏中"
        :data="dynamicValidateForm.domains"
        class="tb-edit"
        style="width: 100%"
        highlight-current-row
      >
        <div
          v-for="(item,index) in data.columns"
          :key="'columns'+index"
          align="center"
          :style="contdivstyle"
          draggable
          @dragstart.stop="dragstart(index, item)"
          @dragend.stop="dragend(index)"
          @dragenter="dragenter"
          @dragleave="dragleave"
          @dragover="dragover(index)"
          @drop="drop(index)"
          @dragover.prevent
          @click.stop="set(item)"
        >
          <el-col :span="item.span" :offset="item.offset" class="el-col-item" :style="{ border: actid === onpickId && onpickId === item.id ? '2px solid #409eff' : ''}">
            <el-form-item :label="item.showName ? item.showName : item.i18nLabelKey">
              <FormItem :item="item" />
            </el-form-item>
            <div v-if="actid === onpickId && onpickId === item.id" class="el-col-action">
              <i title="删除" class="el-icon-delete" style="margin: 0 5px; color: #fff;" @click.stop="delCol(index)" />
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import FormItem from './formitem'
export default {
  components: {
    FormItem
  },
  props: {
    // 被选中的 id值
    drag1: {
      type: String,
      default: () => {
        return '1'
      }
    },
    drag2: {
      type: String,
      default: () => {
        return '1'
      }
    },
    // 1 没有拖动到 表格中  2 已经拖动到表格中
    drag3: {
      type: String,
      default: () => {
        return '1'
      }
    },
    drag4: {
      type: String,
      default: () => {
        return '1'
      }
    },
    // 用来判断是否是中间内容的拖动 为 -1 时 就不是  大于 0 的 都是 (此时不进行处理)
    startindex: {
      type: Number,
      default: () => {
        return -1
      }
    },
    field: {
      type: String,
      default: () => {
        return ''
      }
    },
    // 分栏的对象
    data: {
      type: Object,
      default: () => {
        return {
          columns: []
        }
      }
    },
    // 左侧被拉动的组件 如果在分栏 中放开 则添加到分栏 中
    com: {
      type: Object,
      default: () => {
        return {
          column: []
        }
      }
    },
    actid: {
      type: String,
      default: () => {
        return ''
      }
    },
    rowIndex: {
      type: Number,
      default: () => {
        return -1
      }
    }
  },
  data() {
    return {
      tablekey: 'key' + new Date().getTime(),
      dynamicValidateForm: {
        domains: []
      },
      // 被点击选中的id值
      onpickId: '0'
    }
  },
  computed: {
    column() {
      return this.data.column
    },
    contdivstyle() {
      const obj = {}
      // 左侧或者 中间拖动的时候 要 大等于 10
      obj['z-index'] = this.drag1 !== '1' ? 100 : -1
      return obj
    }
  },
  watch: {
    data: {
      handler() {
        this.tablekey = 'key' + new Date().getTime()
      },
      deep: true
    }
  },
  methods: {
    dragstart(index, data) {
      this.$emit('setcom', this.rowIndex, index, data)
      this.$emit('setdrag', { type: 'drag2', value: '2' })
    },
    dragend(index) {
      this.$emit('reset')
    },
    dragenter() {
    },
    dragover(index) {
      // 当在表格上滑动的时候
      this.$emit('setdrag3', '2')
      this.$emit('dragover2', this.rowIndex, index)
    },
    dragleave() {
      this.$emit('setdrag3', '1')
    },
    drop(index) {
      // todo 进行添加操作 并且 hxindex 置为 -3
      if (['ColumnsLayout', 'ElCollapseItem'].indexOf(this.com.formType) === -1) {
        if (this.data.columns[index].formType === '') {
          this.com.offset = this.data.columns[index].offset
          this.com.span = this.data.columns[index].span
          this.$set(this.data.columns, index, this.com)
          if (this.drag4 === '1') {
            this.$emit('exchange', index)
          }
        }
        this.$emit('setupOrDe', true)
      } else {
        this.$emit('setupOrDe', false)
        this.$message.error('不能在分栏中添加分栏或折叠框')
      }
      this.$emit('chonzhihxindex')
    },
    set(data) {
      if (data.formType !== '') {
        this.onpickId = data.id
      }
      this.$emit('clickitem', data)
    },
    delCol(index) {
      this.$emit('delCol', this.onpickId, this.rowIndex, index)
      this.onpickId = '0'
    },
    del(data) {
      this.data.deletecolumn(data.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.cont {
  width: 100%;
  height: 57px;
}
.icons {
  text-align: right;
  z-index: 10000;
  cursor: pointer;
}
.icons:hover {
  color: red;
}
.col-dynamic{
  .el-row {
    .el-col{
      height: 50px;
      border: 1px dashed #ccc;
      // padding-right: 3px;
    }
  }
}
.el-form-item--small {
    border-bottom: 0px solid #e1e1e1;
    padding-bottom: 0px;
}
.el-col-item{
  position: relative;
}
.el-col-action{
    position: absolute;
    right: 0;
    bottom: 0;
    height: 28px;
    line-height: 28px;
    background: #409eff;
    z-index: 9;
}
</style>
