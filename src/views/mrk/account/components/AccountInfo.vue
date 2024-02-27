<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <top-box v-if="type==='detail'" :relation-info-map="relationInfoMap" />
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('mrk.account.identiferNum') }} : {{ account.identiferNum }} {{ $t('comm.version') }} : {{ account.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                  <div :class="index3===0?'input_col1':'input_col2'">
                    <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="account.attrs[col.fieldName]" :disabled="col.disabled" :row="account" :attributes="col" @setValue="setValue(account,item.fields,col.fieldName)" />
                    <form-element v-else :ref="col.fieldName" :key="index3" v-model="account[col.fieldName]" :disabled="col.disabled" :row="account" :attributes="col" @setValue="setValue(account,item.fields,col.fieldName)" />
                  </div>
                </el-col>
              </el-row>
              <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="account.attrs[field.fieldName]" :disabled="field.disabled" :row="account" :attributes="field" @setValue="setValue(account,item.fields,field.fieldName)" />
              <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="account[field.fieldName]" :disabled="field.disabled" :row="account" :attributes="field" @setValue="setValue(account,item.fields,field.fieldName)" />
            </template>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { getDetail, getSuperiorAccount } from '@/api/mrk/account'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import TopBox from '@/components/TopBox'
export default {
  name: 'AccountEdit',
  components: { FormElement, TopBox },
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
      accountId: this.id,
      isLoading: true,
      activeNames: [],
      accountType: '',
      account: {
        attrs: {},
        details: []
      },
      selectUserDialog: false,
      processDialog: false,
      accountSelectDialog: false,
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: [
            {
              fieldName: 'accountType',
              i18nLabelKey: 'mrk.account.accountType',
              formType: 'DictSelect',
              dictTypeId: 'AccountType',
              dataRoles: 'required'
            }
          ]
        }
      ],
      detailConfig: [],
      relationInfoMap: new Map()
    }
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.accountId = newValue
        this.fetchData()
      }
    }
  },
  async created() {
    const res = await getPageConfig('account', 'detail')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
      }
    }

    this.activeNames = this.pageConfig.map(item => item.catagoryName)

    if (this.accountId) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      let res = await getDetail(this.accountId)
      if (res && res.success) {
        this.account = res.datas.account
        this.relationInfoMap = res.datas.relationNum
        if (res.datas.attachmentDetails) {
          this.account.attachmentDetails = res.datas.attachmentDetails
        }
        if (this.account.superiorAccountNum) {
          res = await getSuperiorAccount(this.account.superiorAccountNum)
          this.superAccount = res.datas.superiorAccount
          this.$set(this.account, 'superiorAccountLevel', this.superAccount.accountLevel)
        }
        this.$emit('load', this.account)
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

</style>
<style lang="scss">

</style>
