<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="salesopportunity.identiferNum" class="pagespan">{{ $t('sale.opportunity.identiferNum') }} : {{ salesopportunity.identiferNum }} {{ $t('comm.version') }} : {{ salesopportunity.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                  <div :class="index3===0?'input_col1':'input_col2'">
                    <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="salesopportunity.attrs[col.fieldName]" :disabled="col.disabled" :row="salesopportunity" :attributes="col" @data="handleData" @setValue="setValue(salesopportunity,item.fields,col.fieldName)" />
                    <form-element v-else :ref="col.fieldName" :key="index3" v-model="salesopportunity[col.fieldName]" :disabled="col.disabled" :row="salesopportunity" :attributes="col" @data="handleData" @setValue="setValue(salesopportunity,item.fields,col.fieldName)" />
                  </div>
                </el-col>
              </el-row>
              <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="salesopportunity.attrs[field.fieldName]" :disabled="field.disabled" :row="salesopportunity" :attributes="field" @data="handleData" @setValue="setValue(salesopportunity,item.fields,field.fieldName)" />
              <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="salesopportunity[field.fieldName]" :disabled="field.disabled" :row="salesopportunity" :attributes="field" @data="handleData" @setValue="setValue(salesopportunity,item.fields,field.fieldName)" />
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
import { getDetail, saveSalesopportunity } from '@/api/sale/salesopportunity'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'SalesopportunityEdit',
  components: { FormElement },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      salesopportunity: {
        attrs: {
        },
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
    const res = await getPageConfig('salesopportunity', 'edit')
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
      this.salesopportunity.assignedUser = this.$store.getters.userInfo.userId
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.salesopportunity = res.datas.salesopportunity
      }
      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.salesopportunity.id = ''
        this.salesopportunity.salesopportunityName = ''
        this.salesopportunity.identiferNum = ''
        this.salesopportunity.exclusiveKey = ''
        this.salesopportunity.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.salesopportunity.assignedUser = this.$store.getters.userInfo.userId
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
        const res = await saveSalesopportunity(this.salesopportunity)
        if (res && res.success) {
          this.$router.push('/sale/salesopportunityList')
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
      if (data[0].contactName) {
        this.salesopportunity.contactId = data[0].id
      } else if (data[0].leadName) {
        this.salesopportunity.leadId = data[0].id
      } else if (data[0].accountName) {
        this.salesopportunity.accountId = data[0].id
      }
      console.log(this.salesopportunity)
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
