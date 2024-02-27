<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="pricebook.identiferNum" class="pagespan">{{ $t('mdm.pricebook.identiferNum') }} : {{ pricebook.identiferNum }}</span>
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
                      <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="pricebook.attrs[col.fieldName]" :disabled="col.disabled" :row="pricebook" :attributes="col" @data="handleData" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                      <form-element v-else :ref="col.fieldName" :key="index3" v-model="pricebook[col.fieldName]" :disabled="col.disabled" :row="pricebook" :attributes="col" @data="handleData" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                    </div>
                  </el-col>
                </el-row>
                <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="pricebook.attrs[field.fieldName]" :disabled="field.disabled" :row="pricebook" :attributes="field" @data="handleData" @setValue="setValue(pricebook,item.fields,field.fieldName)" />
                <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="pricebook[field.fieldName]" :disabled="field.disabled" :row="pricebook" :attributes="field" @data="handleData" @setValue="setValue(pricebook,item.fields,field.fieldName)" />
              </template>
            </div>
          </div>
          <div v-else-if="item.elCollapseItemType === 'detail'" class="vertical">
            <div class="add_row " style="text-align:right;">
              <el-button class="editbtn" style="margin-left:1%" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddDetailLine(item.catagoryName)">
                {{ item.catagoryName===2?$t('comm.addProducts'):$t('comm.addCustomer') }}
              </el-button>
            </div>
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
                  <column-element v-if="field.isAddAttr" :ref="field.fieldName" v-model="scope.row.attrs[field.fieldName]" :attributes="field" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" @data="handleData" />
                  <column-element v-else :ref="field.fieldName" v-model="scope.row[field.fieldName]" :attributes="field" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" @data="handleData" />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('comm.operation')"
                width="70"
              >
                <template slot-scope="scope">
                  <div align="center">
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelDetailLine(scope.$index, item.catagoryName)" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
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
    <div>
      <product-pop :is-show="productSelectDialog" :currency="pricebook.currency" @cancel="productSelectDialog=false" @clear="handleSelectClear" @select="handleProductSelected" />
      <account-pop :is-show="accountSelectDialog" :is-select-all="true" @cancel="accountSelectDialog=false" @clear="handleSelectClear" @select="handleAccountSelected" />
    </div>
  </div>
</template>
<script>
import { getDetail, savePricebook } from '@/api/mdm/pricebook'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import ProductPop from '@/views/mdm/product/components/ProductPop'
import AccountPop from '@/views/mrk/account/components/AccountPop'
export default {
  name: 'PricebookEdit',
  components: { FormElement, ProductPop, AccountPop },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      productSelectDialog: false,
      accountSelectDialog: false,
      pricebook: {
        attrs: {
        },
        currency: '',
        enableFlag: '0',
        productPrice: [],
        customers: [],
        applyStartDate: new Date()
      },
      productMap: new Map(),
      accountMap: new Map(),
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
  watch: {
    'pricebook.currency': {
      async handler(newValue, oldValue) {
        if (newValue && oldValue && this.pricebook.productPrice && this.pricebook.productPrice.length > 0) {
          this.pricebook.productPrice = []
        }
      },
      immediate: true
    }
  },
  async created() {
    const res = await getPageConfig('pricebook', 'edit')
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
      this.pricebook.assignedUser = this.$store.getters.userInfo.userId
      this.pricebook.currency = 'cny'
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.pricebook = res.datas.pricebook
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
      }
      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.pricebook.id = ''
        this.pricebook.pricebookName = ''
        this.pricebook.applyEndDate = ''
        this.pricebook.identiferNum = ''
        this.pricebook.exclusiveKey = ''
        this.pricebook.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.pricebook.assignedUser = this.$store.getters.userInfo.userId
        // 租户ID设定为当前登录者的租户ID
        this.pricebook.tenantId = this.$store.getters.userInfo.tenantId
      }
      this.isLoading = false
    },
    handleSubmit() {
      for (const ref in this.$refs) {
        if (this.$refs[ref] && this.$refs[ref].length > 0) {
          const obj = this.$refs[ref][0]
          // 页面嵌套vue组件调用验证方法
          if (obj.hasOwnProperty('validatorAll')) {
            this.$refs[ref][0].validatorAll()
            if (!this.$refs[ref][0].validatorState) {
              return false
            }
          } else {
            // 本页面调用验证方法
            if (!this.validator(ref)) {
              return false
            }
          }
        }
      }
      if (!this.pricebook.productPrice || this.pricebook.productPrice.length === 0) {
        this.$message({
          type: 'error',
          message: this.$t('mdm.pricebook.e0015')
        })
        return false
      }
      if (!this.pricebook.customers || this.pricebook.customers.length === 0) {
        this.$message({
          type: 'error',
          message: this.$t('mdm.pricebook.e0016')
        })
        return false
      }
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await savePricebook(this.pricebook)
        if (res && res.success) {
          this.$router.push('/mdm/pricebookList')
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
    handleData(data) {
      if (data.indexObject) {
        this.$set(this.pricebook.productPrice[Number(data.indexObject.lineIndex)], 'localPrice', data[0].localPrice)
      }
    },
    handleAddDetailLine(index) {
      if (index === 2) {
        this.productSelectDialog = true
      } else {
        this.accountSelectDialog = true
      }
    },
    handleDelDetailLine(index, flg) {
      if (flg === 2) {
        this.pricebook.productPrice.splice(index, 1)
        this.pricebook.productPrice.forEach((v, k) => {
          v.productSort = k + 1
        })
      } else {
        this.pricebook.customers.splice(index, 1)
        this.pricebook.customers.forEach((v, k) => {
          v.customerSort = k + 1
        })
      }
    },
    // 产品popup画面选择事件
    handleProductSelected(products) {
      // 如果第一行时初始化的空白行时，先删除空白行
      if (!this.pricebook.productPrice) {
        this.pricebook.productPrice = []
      }
      products.forEach((rowData) => {
        // 已填加的产品将不再添加
        const index = this.pricebook.productPrice.findIndex((ele) => {
          return ele.productId === rowData.id
        })
        // 产品未添加时
        if (index === -1) {
          // 将选择的产品添加到画面上
          var sort = this.pricebook.productPrice.length + 1
          this.pricebook.productPrice.push({
            productId: rowData.id,
            productName: rowData.productName,
            category1: rowData.category1,
            category2: rowData.category2,
            category3: rowData.category3,
            category4: rowData.category4,
            category5: rowData.category5,
            productIdentiferNum: rowData.identiferNum,
            unitPrice: rowData.unitPrice,
            localPrice: '',
            productSort: sort
          })
        }
      })
      this.productSelectDialog = false
    },
    // 客户popup画面选择事件
    handleAccountSelected(accounts) {
      if (accounts === 'ALL') {
        this.pricebook.customers = []
        this.pricebook.customers.push({
          customerIdentiferNum: 'ALL',
          identiferNum: this.pricebook.identiferNum,
          customerSort: 1
        })
        return
      }
      if (this.pricebook.customers && this.pricebook.customers.length === 1) {
        if (this.pricebook.customers[0].customerIdentiferNum === 'ALL') {
          this.pricebook.customers = []
        }
      }
      accounts.forEach((rowData) => {
        // 已填加的客户将不再添加
        const index = this.pricebook.customers.findIndex((ele) => {
          return ele.customerIdentiferNum === rowData.identiferNum
        })
        // 客户未添加时
        if (index === -1) {
          // 将选择的客户添加到画面上
          var sort = this.pricebook.customers.length + 1
          this.pricebook.customers.push({
            customerIdentiferNum: rowData.identiferNum,
            identiferNum: this.pricebook.identiferNum,
            accountName: rowData.accountName,
            telephone: rowData.telephone,
            accountType: rowData.accountType,
            bizCompanyNature: rowData.bizCompanyNature,
            riskgradeAssess: rowData.riskgradeAssess,
            customerSort: sort
          })
        }
      })
      this.accountSelectDialog = false
    },
    handleSelectClear() {
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
  border: 0px solid #DCDFE6;
}

</style>
<style lang="scss">

</style>
