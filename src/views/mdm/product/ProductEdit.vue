<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="product.identiferNum" class="pagespan">{{ $t('mdm.product.identiferNum') }} : {{ product.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                  <div :class="index3===0?'input_col1':'input_col2'">
                    <form-element
                      v-if="col.isAddAttr"
                      :ref="col.fieldName"
                      :key="index3"
                      v-model="product.attrs[col.fieldName]"
                      :disabled="col.disabled"
                      :row="product"
                      :attributes="col"
                      :filter="product.attrs[col.fieldName]"
                      @data="handleData"
                      @input="handleInput"
                      @setValue="setValue(product,item.fields,col.fieldName)"
                    />
                    <form-element
                      v-else
                      :ref="col.fieldName"
                      :key="index3"
                      v-model="product[col.fieldName]"
                      :disabled="col.disabled"
                      :row="product"
                      :attributes="col"
                      :filter="product[col.fieldName]"
                      @data="handleData"
                      @input="handleInput"
                      @setValue="setValue(product,item.fields,col.fieldName)"
                    />
                  </div>
                </el-col>
              </el-row>
              <form-element
                v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr"
                :ref="field.fieldName"
                :key="index2"
                v-model="product.attrs[field.fieldName]"
                :disabled="field.disabled"
                :row="product"
                :attributes="field"
                :filter="product.attrs[field.fieldName]"
                @data="handleData"
                @input="handleInput"
                @setValue="setValue(product,item.fields,field.fieldName)"
              />
              <form-element
                v-else-if="field.formType !== 'ColumnsLayout'"
                :ref="field.fieldName"
                :key="index2"
                v-model="product[field.fieldName]"
                :disabled="field.disabled"
                :row="product"
                :attributes="field"
                :filter="product[field.fieldName]"
                @data="handleData"
                @input="handleInput"
                @setValue="setValue(product,item.fields,field.fieldName)"
              />
            </template>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
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
import { getDetail, saveProduct } from '@/api/mdm/product'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'ProductEdit',
  components: { FormElement },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      product: {
        attrs: {
        },
        productFlag: '0',
        currencyCost: 'cny',
        currencyUnitPrice: 'cny',
        details: []
      },
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
    id: function() { return this.$route.query.id }
  },
  async created() {
    const res = await getPageConfig('product', 'edit')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
        if (!this.id) {
          // 新建的时候，删除最后的其他信息
          this.$delete(this.pageConfig, this.pageConfig.length - 1)
        }
      }
    }

    this.activeNames = this.pageConfig.map(item => item.catagoryName)
    if (this.id) {
      this.fetchData()
    } else {
      this.product.assignedUser = this.$store.getters.userInfo.userId
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        // 级联远程检索下拉框，需要按顺序赋值
        this.product = { ...res.datas.product }
        setTimeout(() => {
          this.product.category2 = res.datas.product.category2
          setTimeout(() => {
            this.product.category3 = res.datas.product.category3
            setTimeout(() => {
              this.product.category4 = res.datas.product.category4
              setTimeout(() => {
                this.product.category5 = res.datas.product.category5
              }, 20)
            }, 20)
          }, 20)
        }, 20)
        if (res.datas.attachmentDetails && !this.$route.query.copy) {
          this.product.attachmentDetails = res.datas.attachmentDetails
        }
      }
      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.product.id = ''
        this.product.productName = ''
        this.product.identiferNum = ''
        this.product.exclusiveKey = ''
        this.product.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.product.assignedUser = this.$store.getters.userInfo.userId
      }
      this.isLoading = false
    },
    handleSubmit() {
      for (const ref in this.$refs) {
        if (this.$refs[ref] && this.$refs[ref].length > 0) {
          this.$refs[ref][0].validatorAll()
          if (!this.$refs[ref][0].validatorState) return false
        }
      }
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await saveProduct(this.product)
        if (res && res.success) {
          this.$router.push('/mdm/productList')
          res.messages.message
        }
        this.isLoading = false
      }).catch(_ => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleInput(value) {

    },
    handleData(data) {
      if (data.refFunc === 'supplier') {
        this.product.supplierId = data[0].id
      }
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
