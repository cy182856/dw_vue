<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('mrk.supplier.identiferNum') }} : {{ supplier.identiferNum }} {{ $t('comm.version') }} : {{ supplier.version }}</span>
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
                      <form-element
                        v-if="col.isAddAttr"
                        :ref="col.fieldName"
                        :key="index3"
                        v-model="supplier.attrs[col.fieldName]"
                        :disabled="col.disabled"
                        :row="supplier"
                        :attributes="col"
                        :filter="supplier.attrs[col.fieldName]"
                        @setValue="setValue(supplier,item.fields,col.fieldName)"
                      />
                      <form-element
                        v-else
                        :ref="col.fieldName"
                        :key="index3"
                        v-model="supplier[col.fieldName]"
                        :disabled="col.disabled"
                        :row="supplier"
                        :attributes="col"
                        :filter="supplier[col.fieldName]"
                        @setValue="setValue(supplier,item.fields,col.fieldName)"
                      />
                    </div>
                  </el-col>
                </el-row>
                <form-element
                  v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="supplier.attrs[field.fieldName]"
                  :disabled="field.disabled"
                  :row="supplier"
                  :attributes="field"
                  :filter="supplier.attrs[field.fieldName]"
                  @setValue="setValue(supplier,item.fields,field.fieldName)"
                />
                <form-element
                  v-else-if="field.formType !== 'ColumnsLayout'"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="supplier[field.fieldName]"
                  :disabled="field.disabled"
                  :row="supplier"
                  :attributes="field"
                  :filter="supplier[field.fieldName]"
                  @setValue="setValue(supplier,item.fields,field.fieldName)"
                />
              </template>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/mrk/supplier'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'SupplierInfo',
  components: { FormElement },
  mixins: [names, formValidator, dict],
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
      supplierId: this.id,
      isLoading: true,
      activeNames: [],
      productSelectDialog: false,
      supplier: {
        attrs: {
        }
      },
      productMap: new Map(),
      relationInfoMap: new Map(),
      selectUserDialog: false,
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: []
        }
      ]
    }
  },
  computed: {
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.supplierId = newValue
        this.fetchData()
      }
    }
  },
  async created() {
    const res = await getPageConfig('supplier', 'detail')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
      }
    }

    this.activeNames = this.pageConfig.map(item => item.catagoryName)

    if (this.supplierId) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.supplierId)
      if (res && res.success) {
        this.supplier = res.datas.supplier
        if (res.datas.attachmentDetails) {
          this.supplier.attachmentDetails = res.datas.attachmentDetails
        }

        this.$emit('load', this.supplier)
      }
      this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.input_col {
  padding: 0px 0px 0px 0px;
}
.editbtn {
  background-color:rgb(102, 206, 188);
  color: white;
  margin-left: 50%;
}
.total-content .item{
	height: 30px;
	line-height: 30px;
	margin-bottom: 2px;
	font-size: 12px;
}
.total-content .item .name{
	width: 65%;
	float: left;
	text-align: right;
	padding-right: 50px;
}
.total-content .item .center{
	float: right;
	width: 35%;
}
.total-content .item .company{
	float: left;
	width: 125px;
	padding: 0 15px;
}
.total-content .form-box{
	width: 230px;
	padding: 2px 0;
}
.total-content .form-box .form-control{
	height: 26px;
	background: rgba(0,0,0,0);
	font-size: 12px;
}
</style>
<style lang="scss">
</style>
