<template>
  <!-- 详细画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('mdm.pricebook.identiferNum') }} : {{ pricebook.identiferNum }}</span>
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
                      <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="pricebook.attrs[col.fieldName]" :disabled="col.disabled" :row="pricebook" :attributes="col" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                      <form-element v-else :ref="col.fieldName" :key="index3" v-model="pricebook[col.fieldName]" :disabled="col.disabled" :row="pricebook" :attributes="col" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                    </div>
                  </el-col>
                </el-row>
                <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="pricebook.attrs[field.fieldName]" :disabled="field.disabled" :row="pricebook" :attributes="field" @setValue="setValue(pricebook,item.fields,field.fieldName)" />
                <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="pricebook[field.fieldName]" :disabled="field.disabled" :row="pricebook" :attributes="field" @setValue="setValue(pricebook,item.fields,field.fieldName)" />
              </template>
            </div>
          </div>
          <div v-else-if="item.elCollapseItemType === 'detail'" class="vertical">
            <el-table
              :data="item.catagoryName===2?pricebook.productPrice:pricebook.customers"
              stripe
              size="small"
              border
              :header-cell-style="{'text-align':'left'}"
            >
              <el-table-column label="No" width="50px">
                <template slot-scope="scope">
                  {{ item.catagoryName===2?scope.row.productSort:scope.row.customerSort }}
                </template>
              </el-table-column>
              <el-table-column
                v-for="(field,index2) in item.fields"
                :key="index2"
                :label="$t(field.i18nLabelKey? field.i18nLabelKey : field.showName)"
                :min-width="field.minWidth"
                :width="field.width"
                :align="field.formType==='MilliInput'?'right':'left'"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <column-element v-if="field.isAddAttr" :ref="field.fieldName" v-model="scope.row.attrs[field.fieldName]" :attributes="field" :disabled="field.disabled" />
                  <column-element v-else :ref="field.fieldName" v-model="scope.row[field.fieldName]" :attributes="field" :disabled="field.disabled" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 编辑 -->
        <li class="operation-item" @click="handleEdit()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <!-- 删除 -->
        <li class="operation-item" @click="handleDelete()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">{{ $t('comm.delete') }}</span>
        </li>
        <!-- 复制 -->
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getDetail, deletePricebook } from '@/api/mdm/pricebook'
import { getPageConfig } from '@/api/base.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { formValidator } from '@/mixins/form-validator.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'PricebookEdit',
  components: { FormElement },
  mixins: [names, permission, formValidator, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      productSelectDialog: false,
      pricebook: {
        attrs: {
        },
        productPrice: [],
        customers: []
      },
      productMap: new Map(),
      relationInfoMap: new Map(),
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
    id: function() { return this.$route.query.id }
  },
  async created() {
    const res = await getPageConfig('pricebook', 'detail')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
      }
    }
    this.activeNames = this.pageConfig.map(item => item.catagoryName)
    if (this.id) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.pricebook = res.datas.pricebook
        this.relationInfoMap = res.datas.relationNum
        this.pricebook.productPrice = res.datas.productPrices
        this.pricebook.customers = res.datas.customers
        if (res.datas.productMap) {
          this.productMap = res.datas.productMap
          this.pricebook.productPrice.forEach((item) => {
            item.productName = this.productMap[item.productId].productName
            item.productIdentiferNum = this.productMap[item.productId].identiferNum
            item.category1 = this.productMap[item.productId].category1
            item.category2 = this.productMap[item.productId].category2
            item.category3 = this.productMap[item.productId].category3
            item.category4 = this.productMap[item.productId].category4
            item.category5 = this.productMap[item.productId].category5
            item.unitPrice = this.productMap[item.productId].unitPrice
          })
        }
        if (res.datas.accountMap) {
          this.accountMap = res.datas.accountMap
          this.pricebook.customers.forEach((item) => {
            item.accountName = this.accountMap[item.customerIdentiferNum].accountName
            item.telephone = this.accountMap[item.customerIdentiferNum].telephone
            item.accountType = this.accountMap[item.customerIdentiferNum].accountType
            item.bizCompanyNature = this.accountMap[item.customerIdentiferNum].bizCompanyNature
            item.riskgradeAssess = this.accountMap[item.customerIdentiferNum].riskgradeAssess
          })
        }
        this.$emit('load', this.pricebook)
      }
      this.isLoading = false
    },
    handleCopy() {
      this.$router.push({ path: '/mdm/pricebook/edit', query: { id: this.id, copy: true }})
    },
    handleEdit() {
      this.$router.push({ path: '/mdm/pricebook/edit', query: { id: this.id }})
    },
    handleDelete() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await deletePricebook([this.pricebook])
        if (res && res.success) {
          this.$router.push('/mdm/pricebookList')
        }
        this.isLoading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleCancelClick() {
      this.transferDialog = false
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.input_col {
  padding: 0px 0px 0px 0px;
}

</style>
<style lang="scss">

</style>
