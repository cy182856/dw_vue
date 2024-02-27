<template>
  <el-card class="elcard">
    <div slot="header" class="clearfix">
      <span style="margin-left: 5px; margin-right:10px">页面配置</span>
      <el-button style="float: right; padding: 3px 0; margin-left: 5px" type="text" @click="save">
        保存
      </el-button>
      <el-button style="float: right; padding: 3px 0; margin-left: 5px" type="text" @click="preview">
        预览
      </el-button>
      <el-button style="float: right; padding: 3px 0; margin-left: 5px" type="text" @click="backtrack">
        返回
      </el-button>
    </div>
    <div ref="formscont" class="formscont">
      <div v-if="hxindex === -1 && drag3 !== '2'" class="hxdiv" />
      <div id="form" ref="form">
        <el-form
          :model="from"
          :label-position="formsetting.labelPosition"
          :label-width="formsetting.labelwidth + 'px'"
          :size="formsetting.formsize"
        >
          <el-row class="input_box" :gutter="10">
            <div v-for="(item, index) in fromData" :key="index" :class="item.flexClass">
              <div class="formitem" :style="{background:startindex === index ? 'rgba(255,0,0,0.2)' : endindex === index ? 'rgba(0,0,255,0.2)' : ''}">
                <div
                  class="formitem2"
                  :style="{ ...styleitem, border: actid === item.id ? '2px solid #e6a23c' : ''}"
                  draggable
                  @dragstart="dragstart(index, item)"
                  @dragend="reset(index)"
                  @dragover="dragover2(index,endColIndex)"
                  @dragleave="dragleave2(index)"
                  @drop="dropfun2(index)"
                  @dragover.prevent
                  @click="clickitem(item)"
                >
                  <div
                    v-if="hxindex === index && drag3 !== '2'"
                    class="hxdiv"
                  />
                  <el-form-item
                    v-if=" ['ColumnsLayout'].indexOf(item.formType) === -1"
                    :label="item.showName ? item.showName : item.i18nLabelKey"
                  >
                    <FormItem :item="item" />
                  </el-form-item>
                  <div v-if="actid === item.id" class="form-item-action">
                    <i title="删除" class="el-icon-delete" style="margin: 0 5px; color: #fff;" @click.stop="delCom(index)" />
                  </div>
                  <div v-if="item.formType === 'ColumnsLayout'" style="height:75px" :label="item.fieldName">
                    <div>
                      <ColumnsLayout
                        :com="com"
                        :data="item"
                        :drag1="drag1"
                        :drag2="drag2"
                        :drag3="drag3"
                        :drag4="drag4"
                        :startindex="startindex"
                        :actid="actid"
                        :row-index="index"
                        @setdrag3="setdrag3"
                        @chonzhihxindex="chonzhihxindex"
                        @clickitem="clickitem"
                        @delCol="delCol"
                        @exchange="exchange"
                        @setcom="setcom"
                        @dragover2="dragover2"
                        @dropfun2="dropfun2"
                        @setdrag="setdrag"
                        @reset="reset"
                        @setupOrDe="setupOrDe"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-row>
        </el-form>
      </div>
      <div v-if="hxindex === -2 && drag3 !== '2'" class="hxdiv" />
      <div
        class="addArea"
        :style="styleCard"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="dropfun"
        @dragover.prevent
      />
    </div>
  </el-card>
</template>

<script>
import FormItem from './formitem'
import ColumnsLayout from './ColumnsLayout'
export default {
  name: 'Forms',
  components: {
    FormItem,
    ColumnsLayout
  },
  // 是否正在拖动组件
  props: {
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
    drag4: {
      type: String,
      default: () => {
        return '1'
      }
    },
    fromData: {
      type: Array,
      default: () => {
        return [{ name: '222' }]
      }
    },
    formsetting: {
      type: Object,
      default: () => {
        return {
          labelPosition: 'left',
          labelwidth: 80,
          formsize: 'small'
        }
      }
    },
    // 正在被拖动的组件
    com: {
      type: Object,
      default: () => {
        return []
      }
    },
    height: {
      type: Number,
      default: () => {
        return 600
      }
    }
  },
  data() {
    return {
      startindex: -1,
      startColIndex: -1,
      endindex: -1,
      endColIndex: -1,
      // 表单的值
      from: {},
      // 拖动到分栏  1 没有  2 有
      drag3: '1',
      // -3 为没有 -2 为大的div的下面 -1 为大的div的上面  其他为 小组件
      hxindex: -3,
      // 分栏 index
      colindex: -1,
      // 能否删除或修改
      upOrDe: true,

      // 被点击选中的id值
      actid: '0',
      addAreaHeight: '200px'

    }
  },
  computed: {
    // 中间的大的div
    styleCard: function() {
      // drag1 是否正在拖动左侧的组件 1 没有动 2 已经拖动没有进入中间的界面  3拖动进入中间的页面 4 进入设计页面中的组件
      // drag2 是否正在拖动中间的组件 1 没有动  2 已经拖动没有进度其他组件  3 进入其他组件
      const sty = {
        background: 'rgb(0,0,0,0)',
        height: '700px'
      }
      sty.height = this.addAreaHeight

      return sty
    },
    styleitem: function() {
      const sty = { 'z-index': 100 }
      // if (this.drag2 == '2') {
      // }
      return sty
    }
  },
  watch: {
    // fromData 变化时初始化表单
    fromData() {
      this.initfrom()
    }
  },
  created() {
    this.initfrom()
    this.upAddAreaHeight()
  },
  methods: {
    // Checkbox 需要提前初始化
    initfrom() {
      const obj = {}
      this.fromData.map((item) => {
        if (item.formType === 'Checkbox') {
          obj[item.key] = []
        }
      })
      this.from = obj
    },
    // 拖动到表格
    setdrag3(data) {
      this.drag3 = data
      this.endColIndex = -1
    },
    chonzhihxindex() {
      this.hxindex = -3
    },
    dragover() {
      if (this.drag2 === '1') {
        this.$emit('setdrag', { type: 'drag1', value: '3' })
        if (this.fromData.length === 0) {
          this.hxindex = -1
        } else {
          this.hxindex = -2
        }
      }
    },
    dragleave() {
      if (this.drag1 === '4' || this.drag2 !== '1') {
        return
      }
      this.$emit('setdrag', { type: 'drag1', value: '1' })
      this.hxindex = -3
    },
    upAddAreaHeight() {
      this.$nextTick(function() {
        const sth = this.$refs.formscont.offsetHeight - this.$refs.form.offsetHeight - 10
        if (sth > 200) {
          this.addAreaHeight = sth + 'px'
        } else {
          this.addAreaHeight = '200px'
        }
      })
    },
    setdrag(data) {
      this.$emit('setdrag', data)
    },
    // 在div 中放下时
    dropfun() {
      if (this.drag2 === '1') {
        this.$emit('addcom')
        this.hxindex = -3
      } else if (this.drag2 !== '1' && this.startindex !== -1 && this.startColIndex !== -1 &&
      this.endindex === -1 && this.endColIndex === -1) {
        this.$emit('deletecom', { type: true, id: this.com.id }, this.startindex, this.startColIndex)
        this.$emit('addcom')
      }
      this.drag3 = '1'
      this.upAddAreaHeight()
    },
    // 在组件中的
    dragstart(index, data) {
      this.$emit('setcom', data)
      this.$emit('setdrag', { type: 'drag2', value: '2' })
      this.startindex = index
      this.upOrDe = true
    },
    setcom(rowIndex, index, data) {
      this.startindex = rowIndex
      this.startColIndex = index
      this.$emit('setcom', data)
    },
    delCom(index) {
      this.$emit('deletecom', { type: false, id: this.actid }, index, -1)
      this.actid = '0'
      this.upAddAreaHeight()
    },
    delCol(id, index, colindex) {
      this.$emit('deletecom', { type: true, id: id }, index, colindex)
    },
    reset() {
      // 重置数据
      this.startindex = -1
      this.startColIndex = -1
      this.endindex = -1
      this.endColIndex = -1
      this.drag3 = '1'
      this.upOrDe = true
      this.$emit('reset')
    },
    setupOrDe(value) {
      this.upOrDe = value
    },
    // 在组件中滑动
    dragover2(index, endColIndex) {
      // 处理 拖动到中间组件的逻辑
      if (this.drag2 === '1' && this.drag1 !== '1') {
        this.$emit('setdrag', { type: 'drag1', value: '4' })
        this.hxindex = index
        // todo 增加横线
      }
      this.endindex = index
      this.endColIndex = endColIndex
      if (this.drag1 === '1' && this.drag2 !== '1') {
        if (index !== this.startindex || (index === this.startindex && endColIndex !== this.startColIndex)) {
          this.$emit('setdrag', { type: 'drag2', value: '3' })
        }
      }
    },
    dragleave2(index) {
      this.endindex = -1
    },
    dropfun2(index) {
      if (this.drag1 === '1') {
        this.$emit('setdrag', { type: 'drag2', value: '1' })
        if (
          (this.startindex !== this.endindex &&
          this.startindex !== -1 &&
          this.endindex !== -1) ||
          (this.startindex === this.endindex && this.startColIndex !== this.endColIndex)
        ) {
          if (this.upOrDe) {
            if (this.colindex === -1) {
            // 互换
              var start = {}
              var end = {}
              if (this.startColIndex !== -1 && this.endColIndex === -1) {
                start = this.fromData[this.startindex].columns[this.startColIndex]
                end = this.fromData[this.endindex]
              }
              if (this.endColIndex !== -1 && this.startColIndex === -1) {
                start = this.fromData[this.startindex]
                end = this.fromData[this.endindex].columns[this.endColIndex]
              }
              if (start === {}) {
                this.$emit('exchange', this.startindex, this.startColIndex, this.endindex, this.endColIndex)
              } else {
                if ((['ColumnsLayout', 'ElCollapseItem'].indexOf(start.formType) === -1) &&
                  (['ColumnsLayout', 'ElCollapseItem'].indexOf(end.formType) === -1)) {
                  this.$emit('exchange', this.startindex, this.startColIndex, this.endindex, this.endColIndex)
                } else {
                  this.$message.error('不能在分栏中添加分栏或折叠框')
                }
              }
            } else {
            // 添加了
              this.colindex = -1
              if (this.startColIndex !== -1) {
                this.$emit('deletecom', { type: true, id: this.fromData[this.startindex].columns[this.startColIndex].id }, this.startindex, this.startColIndex)
              } else {
                this.$emit('deletecom', { type: false, id: this.fromData[this.startindex].id }, this.startindex, this.startColIndex)
              }
            }
          }
        }
      }
      // 从左侧进入到小div中放下  并且没有进入到分栏中时 进行对应位置的添加
      if (this.drag1 === '4' && this.drag3 !== '2') {
        this.$emit('addcom', index)
        this.hxindex = -3
      }
      this.drag3 = '1'
      this.reset()
      this.upAddAreaHeight()
    },
    // 交换
    exchange(index) {
      this.colindex = index
    },
    // 选中中间的组件
    clickitem(data) {
      this.actid = data.id
      this.$emit('setformcom', data)
    },
    // 预览
    preview() {
      this.$emit('setdialogVisible', true)
    },
    // 保存
    save() {
      this.$emit('save')
    },
    // 返回
    backtrack() {
      this.$router.push({ path: '/admin/pageConfig' })
    }
  }
}
</script>
<style lang="scss">
.elcard {
  .el-card__body {
    height: calc(100% - 55px);
  }
}
</style>
<style lang="scss" scoped>
.input_box > div {
    padding: 5px 5px 5px 5px;
    display: block;

}
.elcard {
  position: relative;
  // min-height: 600px;
  // height: 700px !important;
  height:100%;
}

.formscont {
  // min-height: 600px;
  overflow: auto !important;
  // height: 600px;
  height:100%;
}
.formitem {
  position: relative;
  padding: 0px;
  // overflow: hidden;
  border-radius: 3px;
  box-sizing: border-box;
}
.formitem2 {
  position: relative;
  padding: 5px;
  // overflow: hidden;
  border-radius: 3px;
  box-sizing: border-box;
  border: 1px dashed #3a88ed;
  cursor: move;
}
.formitem2:hover {
  border: 1px dashed red;
  transition: 0.5s;
}
.formitemzz {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.hxdiv {
  width: 100%;
  height: 2px;
  background: red;
  border-radius: 2px;
}

.icons1 {
  position: absolute;
  top: 0;
  right: 0;
}
.el-col {
  min-height: 50px;
  .el-col {
    border: 1px dashed #ccc;
  }
}
.form-item-action{
    position: absolute;
    right: 0;
    bottom: 0;
    height: 28px;
    line-height: 28px;
    background: #e6a23c;
    z-index: 9;
}
.addArea {
  position: relative;
  // top: 58px;
  left: 0;
  right: 0;
  bottom: 10px;
  min-height: 200px;
}
</style>
