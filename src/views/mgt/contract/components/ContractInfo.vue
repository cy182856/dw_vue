<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('mgt.contract.identiferNum') }}: {{ contract.identiferNum }} {{ $t('comm.version') }}: {{ contract.version }}</span>
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
                      <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="contract.attrs[col.fieldName]" :disabled="col.disabled" :row="contract" :attributes="col" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                      <form-element v-else :ref="col.fieldName" :key="index3" v-model="contract[col.fieldName]" :disabled="col.disabled" :row="contract" :attributes="col" @setValue="setValue(contract,item.fields,col.fieldName)" />
                    </div>
                  </el-col>
                </el-row>
                <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contract.attrs[field.fieldName]" :disabled="field.disabled" :row="contract" :attributes="field" @setValue="setValue(decision,item.fields,field.fieldName)" />
                <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="contract[field.fieldName]" :disabled="field.disabled" :row="contract" :attributes="field" @setValue="setValue(decision,item.fields,field.fieldName)" />
              </template>
            </div>
          </div>
          <!-- <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <div v-if="field.formType === ColumnsLayout" :key="index2">
                <el-row v-for="(f,index3) in field.columns" :key="index3">
                  <el-col :span="f.span" :offset="f.offset">
                    <form-element v-if="f.isAddAttr" :ref="f.fieldName" :key="index3" v-model="contract.attrs[f.fieldName]" :disabled="checkDisabled(f)" :attributes="f" />
                    <form-element v-else :ref="f.fieldName" :key="index3" v-model="contract[f.fieldName]" :disabled="checkDisabled(f)" :attributes="f" />
                  </el-col>
                </el-row>
              </div>
              <div v-else :key="index2">
                <form-element v-if="field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contract.attrs[field.fieldName]" :disabled="checkDisabled(field)" :attributes="field" />
                <form-element v-else :ref="field.fieldName" :key="index2" v-model="contract[field.fieldName]" :disabled="checkDisabled(field)" :attributes="field" />
              </div>
            </template>
          </div> -->
        </el-collapse-item>
        <!-- <el-collapse-item v-for="(item) in detailConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">
            {{ $t(item.catagoryLabelKey) }}
          </span>
          <el-table
            :data="contract.details"
            stripe
            border
          >
            <el-table-column
              v-for="(field,index4) in item.columns"
              :key="index4"
              :label="$t(field.i18nLabelKey)"
              min-width="180"
              width="180"
            >
              <template slot-scope="scope">
                <column-element v-if="field.isAddAttr" :ref="field.fieldName" v-model="scope.row.attrs[field.fieldName]" :disabled="checkDisabled(field)" :attributes="field" />
                <column-element v-else :ref="field.fieldName" v-model="scope.row[field.fieldName]" :disabled="checkDisabled(field)" :attributes="field" />
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item> -->
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/mgt/contract'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
// import ColumnElement from '@/components/ColumnElement.vue'
import { names } from '@/mixins/names.js'
// import ContractPop from '@/views/mgt/contract/components/ContractPop'
export default {
  name: 'ContractEdit',
  //   components: { ContractPop },
  components: { FormElement },
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
      contractId: this.id,
      isLoading: true,
      activeNames: [],
      contractType: '',
      contract: {
        attrs: {},
        details: []
      },
      selectUserDialog: false,
      processDialog: false,
      contractSelectDialog: false,
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: [
            {
              fieldName: 'contractType',
              i18nLabelKey: 'mgt.contract.contractType',
              formType: 'DictSelect',
              dictTypeId: 'ContractType',
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
        this.contractId = newValue
        this.fetchData()
      }
    },
    contract: {
      async handler(newValue, oldValue) {
        // if (this.type === 'approve') {
        //   const instructItem = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'instructItem')[0]
        //   if (instructItem && newValue && newValue.attrs.decision === '1') {
        //     this.$set(instructItem, 'disabled', false)
        //   } else if (instructItem && newValue && newValue.attrs.decision === '0') {
        //     this.contract.instructItem = ''
        //     this.$set(instructItem, 'disabled', true)
        //   }
        // }
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    const res = await getPageConfig('contract', 'detail')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
      }
    }

    this.activeNames = this.pageConfig.map(item => item.catagoryName)

    if (this.contractId) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.contractId)
      if (res && res.success) {
        this.contract = res.datas.contract
        this.$emit('load', this.contract)
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

