<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="contact.identiferNum" class="pagespan">{{ $t('mrk.contact.identiferNum') }} : {{ contact.identiferNum }} {{ $t('comm.version') }} : {{ contact.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                  <div :class="index3===0?'input_col1':'input_col2'">
                    <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="contact.attrs[col.fieldName]" :disabled="col.disabled" :row="contact" :attributes="col" @data="handleData" @setValue="setValue(contact,item.fields,col.fieldName)" />
                    <form-element v-else :ref="col.fieldName" :key="index3" v-model="contact[col.fieldName]" :disabled="col.disabled" :row="contact" :attributes="col" @data="handleData" @setValue="setValue(contact,item.fields,col.fieldName)" />
                  </div>
                </el-col>
              </el-row>
              <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contact.attrs[field.fieldName]" :disabled="field.disabled" :row="contact" :attributes="field" @data="handleData" @setValue="setValue(contact,item.fields,field.fieldName)" />
              <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="contact[field.fieldName]" :disabled="field.disabled" :row="contact" :attributes="field" @data="handleData" @setValue="setValue(contact,item.fields,field.fieldName)" />
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
import { getDetail, saveContact } from '@/api/mrk/contact'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'ContactEdit',
  components: { FormElement },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      contact: {
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
    const res = await getPageConfig('contact', 'edit')
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
      this.contact.assignedUser = this.$store.getters.userInfo.userId
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.contact = res.datas.contact
        if (res.datas.attachmentDetails) {
          this.contact.attachmentDetails = res.datas.attachmentDetails
        }
      }
      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.contact.id = ''
        this.contact.contactName = ''
        this.contact.telephone = ''
        this.contact.identiferNum = ''
        this.contact.exclusiveKey = ''
        this.contact.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.contact.assignedUser = this.$store.getters.userInfo.userId
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
        const res = await saveContact(this.contact)
        if (res && res.success) {
          this.$router.push('/mrk/contactList')
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
      if (data[0].accountName) {
        this.contact.country = data[0].country
        this.contact.province = data[0].province
        this.contact.city = data[0].city
        this.contact.address = data[0].address
        this.contact.zip = data[0].zip
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
