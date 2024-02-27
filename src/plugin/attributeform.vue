<template>
  <el-card class="attrcont">
    <el-tabs v-model="activeName" :class="formclass" type="card">
      <el-tab-pane label="字段设置" name="1">
        <h2>{{ form.name }}</h2>
        <el-form
          v-if="form.formType !== ''"
          :model="form"
          label-width="10px"
          size="small"
        >
          <div v-for="(showFrom, index) in form.showFrom" :key="index">
            <el-form-item v-if="showFrom === 'showName'">
              <div label-width="10px">
                显示名称
              </div>
              <el-input v-model="form.showName" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'i18nLabelKey'">
              <div label-width="10px">
                国际化Key
              </div>
              <el-input v-model="form.i18nLabelKey" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'fieldName'">
              <div label-width="10px">
                数据名称
              </div>
              <el-input v-model="form.fieldName" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'actionUrl'">
              <div label-width="10px">
                路径
              </div>
              <el-input v-model="form.actionUrl" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'params'">
              <div label-width="10px">
                参数
              </div>
              <el-input v-model="form.params" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'method'">
              <div label-width="10px">
                请求方式
              </div>
              <el-input v-model="form.method" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'relParent'">
              <div label-width="10px">
                关联父级
              </div>
              <el-input v-model="form.relParent" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'dateFormat'">
              <div label-width="10px">
                日期格式
              </div>
              <el-input v-model="form.dateFormat" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'dateType'">
              <div label-width="10px">
                日期类型
              </div>
              <template>
                <el-radio
                  v-model="form.dateType"
                  label="date"
                  @change="updateDate(1)"
                >
                  日期
                </el-radio>
                <el-radio
                  v-model="form.dateType"
                  label="datetime"
                  @change="updateDate(2)"
                >
                  日期时间
                </el-radio>
              </template>
            </el-form-item>
            <el-form-item v-if="showFrom === 'relFuncStyle'">
              <div label-width="10px">
                显示样式
              </div>
              <template>
                <el-radio v-model="form.relFuncStyle" label="input">
                  输入框
                </el-radio>
                <el-radio v-model="form.relFuncStyle" label="button">
                  图标
                </el-radio>
              </template>
            </el-form-item>
            <el-form-item v-if="showFrom === 'elCollapseItemType'">
              <div label-width="10px">
                折叠框类型
              </div>
              <template>
                <el-radio v-model="form.elCollapseItemType" label="config">
                  详情
                </el-radio>
                <el-radio v-model="form.elCollapseItemType" label="detail">
                  明细
                </el-radio>
                <el-radio v-model="form.elCollapseItemType" label="customize">
                  自定义
                </el-radio>
              </template>
            </el-form-item>
            <el-form-item v-if="showFrom === 'dictTypeId'">
              <div label-width="10px">
                字典ID
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-input v-model="form.dictTypeId" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'dataRoles'">
              <div label-width="10px">
                数据校验
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-input v-model="form.dataRoles" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'width'">
              <div label-width="10px">
                宽度
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-input v-model="form.width" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'minWidth'">
              <div label-width="10px">
                最小宽度
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-input v-model="form.minWidth" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'append'">
              <div label-width="10px">
                后缀
              </div>
              <el-input v-model="form.append" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'rows'">
              <div label-width="10px">
                行数
              </div>
              <el-input v-model="form.rows" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'maxlength'">
              <div label-width="10px">
                最大长度
              </div>
              <el-input v-model="form.maxlength" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'columns'">
              <div label-width="10px">
                分栏布局
              </div>
              <div v-for="(item, index1) in form.columns" :key="index1">
                <el-row :gutter="5">
                  <el-col :span="10">
                    <el-input-number
                      v-model="item.span"
                      :min="1"
                      :max="24"
                      placeholder="栏格值"
                      size="mini"
                      controls-position="right"
                    />
                  </el-col>
                  <el-col :span="10">
                    <el-input-number
                      v-model="item.offset"
                      :min="0"
                      :max="24"
                      placeholder="偏移值"
                      size="mini"
                      controls-position="right"
                    />
                  </el-col>
                  <el-col :span="4">
                    <button
                      type="button"
                      class="el-button el-button--danger el-button--mini is-plain is-circle"
                      style="padding: 4px; margin-left: 5px"
                      @click="delRow(index1)"
                    >
                      <i class="el-icon-minus" />
                    </button>
                  </el-col>
                </el-row>
              </div>
              <button
                type="button"
                class="el-button el-button--text el-button--small"
                style="padding: 4px; margin-left: 5px"
                @click="addRow"
              >
                <span> 添加列 </span>
              </button>
            </el-form-item>
            <el-form-item v-if="showFrom === 'funcDiv'">
              <div label-width="10px">
                div功能
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-input v-model="form.funcDiv" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'isAddAttr'">
              <div label-width="10px">
                是否variable字段
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-switch
                v-model="form.isAddAttr"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
              />
            </el-form-item>
            <el-form-item v-if="showFrom === 'isText'">
              <div label-width="10px">
                禁用输入框
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-switch
                v-model="form.isText"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
              />
            </el-form-item>
            <el-form-item v-if="showFrom === 'disabled'">
              <div label-width="10px">
                是否禁用
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-switch
                v-model="form.disabled"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
              />
            </el-form-item>
            <el-form-item v-if="showFrom === 'clearable'">
              <div label-width="10px">
                可清除
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-switch
                v-model="form.clearable"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
              />
            </el-form-item>
            <el-form-item v-if="showFrom === 'isHide'">
              <div label-width="10px">
                是否隐藏
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-switch
                v-model="form.isHide"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
              />
            </el-form-item>
            <el-form-item v-if="showFrom === 'autosize'">
              <div label-width="10px">
                自动尺寸适配
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-input v-model="form.autosize" />
            </el-form-item>
            <el-form-item v-if="showFrom === 'relFunc'">
              <div label-width="10px">
                关联相关
              </div>
              <dict-select
                v-model="form.relFunc"
                dict-type-id="AttachmentRelFuncDiv"
                size="small"
                class="input"
                clearable
              />
            </el-form-item>
            <el-form-item v-if="showFrom === 'toFixedNum'">
              <div label-width="10px">
                精确小数点后几位
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  style="float: right"
                  circle
                  @click="delAttribute(index, showFrom)"
                />
              </div>
              <el-input-number
                v-model="form.toFixedNum"
                :min="0"
                :max="5"
                :step="1"
                stepstrictly
              />
            </el-form-item>
          </div>
          <button
            v-if="form.showFrom.length > 0"
            type="button"
            class="el-button el-button--text el-button--small"
            style="padding: 4px; margin-left: 5px"
          >
            <dict-select
              v-model="params.attribute"
              :label="params.value"
              dict-type-id="ComponentAttribute"
              size="small"
              class="input"
              clearable
            />
            <span @click="addAttribute"> 添加属性 </span>
          </button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  components: {},
  props: {
    // 中间是否拖动
    drag2: {
      type: String,
      default: () => {
        return '1'
      }
    },
    // 组件对象
    form: {
      type: Object,
      default: () => {
        return {
          // 展示字段
          showFrom: [],
          // 校验
          rules: []
        }
      }
    },
    formsetting: {
      type: Object,
      default: () => {
        return []
      }
    },
    // 传递过来的可选字段
    fields: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      activeName: '1',
      formclass: '',
      params: {
        attribute: '',
        value: ''
      }
    }
  },
  computed: {
    fieldsdata() {
      var ret = []
      // 是数组
      if (Array.isArray(this.fields)) {
        ret = this.fields
      }
      return ret
    },
    zzcindex() {
      return this.drag2 === '1' ? -10 : 10
    }
  },
  watch: {
    form: function() {
      const thiz = this
      this.formclass = 'animated bounceInRight'
      const timer = setTimeout(function() {
        thiz.formclass = ''
        window.clearTimeout(timer)
      }, 1000)
      console.log(this.form)
    }
  },
  created() {
    console.log(this.form)
  },
  methods: {
    addRow() {
      var columns = {
        offset: 0,
        span: 8,
        formType: ''
      }
      this.form.columns.push(columns)
    },
    addAttribute() {
      console.log(this.params)
      if (this.params.attribute === '') {
        this.$message({
          type: 'info',
          message: '请选中要添加的属性'
        })
        return
      }
      if (this.form.showFrom.indexOf(this.params.attribute) !== -1) {
        this.$message({
          type: 'info',
          message: '已添加过此属性'
        })
        return
      }
      this.form.showFrom.push(this.params.attribute)
      if (
        this.params.attribute === 'isText' ||
        this.params.attribute === 'isAddAttr' ||
        this.params.attribute === 'isHide' ||
        this.params.attribute === 'disabled'
      ) {
        this.$set(this.form, this.params.attribute, true)
      } else {
        this.$set(this.form, this.params.attribute, '')
      }
      this.params.attribute = ''
    },
    delAttribute(index, attributes) {
      this.$delete(this.form, attributes)
      this.form.showFrom.splice(index, 1)
    },
    updateDate(value) {
      if (value === 1) {
        this.form.dateFormat = 'yyyy-MM-dd'
      } else {
        this.form.dateFormat = 'yyyy-MM-dd HH:mm:ss'
      }
      console.log(this.form.dateType)
    },
    delRow(index) {
      this.form.columns.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">
.attrcont {
  .el-card__body{
    height:100%

  }
  .el-tabs{
    height:100%
  }
  .el-tabs__content {
    height: calc(100% - 55px);
    overflow: auto;
  }
}
</style>
<style lang="scss" scoped>
.attrcont {
  position: relative;
  // min-height: 700px;
  // overflow: auto !important;
  height: 100%;
  // .el-tabs__content {
  //   height: calc(100% - 55px);
  //   overflow: auto;
  // }
  .el-select{
    width:120px
  }
}
.el-input-number--mini {
  width: 80px;
  line-height: 26px;
}
.el-form-item--small {
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 10px;
}
.el-input-number.is-controls-right .el-input-number__decrease,
.el-input-number.is-controls-right .el-input-number__increase {
  width: 16px;
}
.el-button--small.is-circle {
  padding: 4px;
  margin-top: 5px;
}
</style>
