
<template>
  <div>
    <!-- 预览 -->
    <div class="detail footer-box" style="height:490px;">
      <div class="dialog-table-box foldScroll" style="overflow: auto;">
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
            <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
            <div v-if="item.elCollapseItemType === 'config'">
              <!-- 详情 -->
              <div class="input_box">
                <template v-for="(field,index2) in item.fields">
                  <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                    <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                      <div v-if="index3===0" class="input_col1">
                        <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="showData.attrs[col.fieldName]" :row="showData" :disabled="col.disabled" :attributes="col" @setValue="setValue(showData,item.fields,col.fieldName)" />
                        <form-element v-else :ref="col.fieldName" :key="index3" v-model="showData[col.fieldName]" :disabled="col.disabled" :row="showData" :attributes="col" @setValue="setValue(showData,item.fields,col.fieldName)" />
                      </div>
                      <div v-else class="input_col2">
                        <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="showData.attrs[col.fieldName]" :row="showData" :disabled="col.disabled" :attributes="col" @setValue="setValue(showData,item.fields,col.fieldName)" />
                        <form-element v-else :ref="col.fieldName" :key="index3" v-model="showData[col.fieldName]" :row="showData" :disabled="col.disabled" :attributes="col" @setValue="setValue(showData,item.fields,col.fieldName)" />
                      </div>
                    </el-col>
                  </el-row>
                  <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="showData.attrs[field.fieldName]" :row="showData" :disabled="field.disabled" :attributes="field" @setValue="setValue(showData,item.fields,field.fieldName)" />
                  <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="showData[field.fieldName]" :row="showData" :disabled="field.disabled" :attributes="field" @setValue="setValue(showData,item.fields,field.fieldName)" />
                </template>
              </div>
            </div>
            <div v-if="item.elCollapseItemType === 'detail'">
              <!-- 明细 -->
              <span slot="title" class="collapse-title">
                <div class="add_row" style="float: right; padding: 0px 20px; margin-left: 5px" @click.stop="handleAddDetailLine()">
                  {{ $t('comm.addLine') }}
                </div>
              </span>
              <el-table
                :data="showData.details"
                stripe
                size="small"
                border
              >
                <el-table-column
                  :label="$t('comm.operation')"
                  min-width="70"
                >
                  <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelDetailLine(scope.row, scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="(field,index4) in item.fields"
                  :key="index4"
                  :label="$t(field.i18nLabelKey? field.i18nLabelKey : field.showName)"
                  :min-width="field.minWidth"
                  :width="field.width"
                >
                  <template slot-scope="scope">
                    <column-element v-if="field.isAddAttr" :ref="field.fieldName" v-model="scope.row.attrs[field.fieldName]" :row="scope.row" :attributes="field" :disabled="field.disabled" @input="handleInput" @setValue="setValue(scope.row,item.fields,field.fieldName)" />
                    <column-element v-else :ref="field.fieldName" v-model="scope.row[field.fieldName]" :row="scope.row" :attributes="field" :disabled="field.disabled" @input="handleInput" @setValue="setValue(scope.row,item.fields,field.fieldName)" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="item.elCollapseItemType === 'customize'">
            <!-- 自定义 -->
            </div>
          </el-collapse-item>
        <!-- <el-collapse-item v-for="(item) in detailConfig" :key="item.catagoryName" :name="item.catagoryName"/> -->
        </el-collapse>
      </div>
    </div>
    <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex forms-box" style="position: relative; padding-top: 10px !important;">
      <li class="operation-item" @click="handleClose">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
        <span class="operation-text">{{ $t('comm.cancel') }}</span>
      </li>
      <li class="operation-item" @click="save">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
        <span class="operation-text">{{ $t('comm.certain') }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import FormElement from '@/components/FormElement.vue'
import ColumnElement from '@/components/ColumnElement.vue'
import { dict } from '@/mixins/dict'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'ShowForms',
  components: {
    FormElement,
    ColumnElement
  },
  mixins: [dict, niceScroll],
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          formsetting: {
            labelPosition: 'left',
            labelwidth: 80,
            formsize: 'small'
          },
          activeNames: [],
          forms: [],
          type: ''
        }
      }
    }
  },
  data() {
    return {
      formkey: 'formkey',
      form: {},
      pageConfig: [],
      showData: {
        attrs: {},
        details: []
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.formkey = 'formkey' + new Date().getTime()
      },
      deep: true
    }
  },
  created() {
    this.compositeData()
  },
  methods: {
    compositeData() {
      var values = []
      var index = 0
      this.data.forms.forEach(item => {
        if (item.formType === 'ElCollapseItem') {
          item.catagoryName = index + 1
          item.catagoryLabelKey = item.i18nLabelKey ? item.i18nLabelKey : item.showName
          item.fields = []
          index = index + 1
          values.push(item)
        } else {
          var field = item
          // Object.keys(field).map((item) => {
          //   if (field[item] === '') {
          //     delete field[item]
          //   }
          //   return true
          // })
          // field.formType = item.formType
          // field.fieldName = item.fieldName
          // field.i18nLabelKey = item.i18nLabelKey
          // field.id = item.id
          // field.showFrom = item.showFrom
          // field.name = item.name
          values[(index - 1)].fields.push(field)
        }
      })
      this.pageConfig = values
      this.activeNames = this.pageConfig.map(item => item.catagoryName)
      const _this = this
      setTimeout(function() {
        _this.handleOpenedFold()
        _this.scrollFild()
      }, 200)
    },
    save() {
      this.$emit('save')
      this.$emit('handleClose')
    },
    handleClose() {
      this.$emit('handleClose')
    },
    handleAddDetailLine() {
      if (!this.showData.details) this.showData.details = []
      this.showData.details.push({ attrs: {}})
    },
    handleDelDetailLine(row, index) {
      this.showData.details.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.foldScroll{
    height:400px;
    overflow: auto;
  }
</style>
