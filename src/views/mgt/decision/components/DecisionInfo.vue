<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('mgt.decision.identiferNum') }}: {{ decision.identiferNum }} {{ $t('comm.version') }}: {{ decision.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div v-if="item.elCollapseItemType === 'config'">
            <div class="input_box">
              <template v-for="(field,index2) in item.fields">
                <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                  <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                    <div :class="index3===0?'input_col1':'input_col2'">
                      <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="decision.attrs[col.fieldName]" :disabled="col.disabled" :row="decision" :attributes="col" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                      <form-element v-else :ref="col.fieldName" :key="index3" v-model="decision[col.fieldName]" :disabled="col.disabled" :row="decision" :attributes="col" @setValue="setValue(decision,item.fields,col.fieldName)" />
                    </div>
                  </el-col>
                </el-row>
                <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="decision.attrs[field.fieldName]" :disabled="field.disabled" :row="decision" :attributes="field" @setValue="setValue(decision,item.fields,field.fieldName)" />
                <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="decision[field.fieldName]" :disabled="field.disabled" :row="decision" :attributes="field" @setValue="setValue(decision,item.fields,field.fieldName)" />
              </template>
            </div>
          </div>
          <div v-else-if="item.elCollapseItemType === 'detail'" class="vertical">
            <div class="add_row " style="text-align:right;">
              <el-button class="editbtn" style="margin-left:1%" size="mini" icon="el-icon-circle-plus-outline">
                {{ $t('comm.addLine') }}
              </el-button>
            </div>
            <div class="defaultScroll-table">
              <el-table
                stripe
                :data="decision.details"
                size="small"
                border
                :header-cell-style="{'text-align':'left'}"
              >
                <el-table-column label="No" width="50px">
                  <template slot-scope="scope">
                    {{ scope.row.sequenceNum }}
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="(field,index2) in item.fields"
                  :key="index2"
                  :label="$t(field.i18nLabelKey? field.i18nLabelKey : field.showName)"

                  :min-width="field.minWidth"
                  :width="field.width"
                  :align="field.formType==='MilliInput'?'right':'left'"
                >
                  <template slot-scope="scope">
                    <column-element v-if="field.isAddAttr" :ref="field.fieldName+scope.$index" v-model="scope.row.attrs[field.fieldName]" :attributes="field" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" :row="scope.row" />
                    <column-element v-else :ref="field.fieldName+scope.$index" v-model="scope.row[field.fieldName]" :attributes="field" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" :row="scope.row" />
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('comm.operation')"
                  min-width="70"
                >
                  <template slot-scope="scope">
                    <div align="center">
                      <el-button v-if="scope.row.col02!=='approved'" size="mini" icon="el-icon-delete" type="danger" @click="handleDelDetailLine(scope.row, scope.$index, item.catagoryName)" />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item v-for="(item) in detailConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">
            {{ $t(item.catagoryLabelKey) }}
          </span>
          <el-table
            :data="decision.details"
            stripe
            border
          >
            <el-table-column
              v-for="(field,index4) in item.columns"
              :key="index4"
              :label="$t(field.i18nLabelKey)"
              :min-width="field.minWidth"
              :width="field.width"
            >
              <template slot-scope="scope">
                <column-element v-if="field.isAddAttr" :ref="field.fieldName" v-model="scope.row.attrs[field.fieldName]" :disabled="scope.row.col02==='approved' || checkDisabled(field)" :attributes="field" />
                <column-element v-else :ref="field.fieldName" v-model="scope.row[field.fieldName]" :disabled="scope.row.col02==='approved' || checkDisabled(field)" :attributes="field" />
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item> -->
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/mgt/decision'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import ColumnElement from '@/components/ColumnElement.vue'
import { names } from '@/mixins/names.js'
// import DecisionPop from '@/views/mgt/decision/components/DecisionPop'
export default {
  name: 'DecisionEdit',
  //   components: { DecisionPop },
  components: { FormElement, ColumnElement },
  mixins: [names, formValidator],
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'detail'
    }
  },
  data() {
    return {
      decisionId: this.id,
      isLoading: true,
      activeNames: [],
      decisionType: '',
      decision: {
        attrs: {},
        details: []
      },
      selectUserDialog: false,
      processDialog: false,
      decisionSelectDialog: false,
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          elCollapseItemType: 'config',
          fields: [
            {
              fieldName: 'decisionType',
              i18nLabelKey: 'mgt.decision.decisionType',
              formType: 'DictSelect',
              dictTypeId: 'DecisionType',
              dataRoles: 'required'
            }
          ]
        }
      ],
      detailConfig: []
    }
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.decisionId = newValue
        this.fetchData()
      }
    },
    decision: {
      async handler(newValue, oldValue) {
        if (newValue.decisionType && newValue.decisionType !== this.decisionType) {
          this.decisionType = newValue.decisionType
          const r = await getPageConfig('decision', this.decisionType + 'detail')
          if (r && r.success) {
            if (r.datas.pageConfig) {
              this.pageConfig = JSON.parse(r.datas.pageConfig)
            }
            const shanghaiArea = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'shanghaiArea')[0]
            if (shanghaiArea && this.decision.attrs.tripType === 'N') {
              this.$set(shanghaiArea, 'isHide', false)
            } else if (shanghaiArea && this.decision.attrs.tripType === 'W') {
              this.$set(shanghaiArea, 'isHide', true)
            }
            if (r.datas.detailConfig) {
              this.detailConfig = JSON.parse(r.datas.detailConfig)
            }
            this.activeNames = this.pageConfig.map(item => item.catagoryName).concat(this.detailConfig.map(item => item.catagoryName))
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.activeNames = this.pageConfig.map(item => item.catagoryName).concat(this.detailConfig.map(item => item.catagoryName))
    if (this.decisionId) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.decisionId)
      if (res && res.success) {
        this.decision = res.datas.decision
        this.$emit('load', this.decision)
      }
      this.isLoading = false
    },
    checkDisabled(field) {
      // 审批时，指示事项可以编辑
      if (this.type === 'approve' && (field['disabled'] !== true && field['disabled'] !== 'true')) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.col_input_box {
  height: auto;
}
</style>
<style lang="scss" scoped>
.editbtn {
  background-color:rgb(102, 206, 188);
  color: white;
  margin-left: 50%;
  border: 0px solid #DCDFE6;
}
</style>
