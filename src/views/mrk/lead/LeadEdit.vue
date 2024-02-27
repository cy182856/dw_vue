<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="lead.identiferNum" class="pagespan">{{ $t('mrk.lead.identiferNum') }} : {{ lead.identiferNum }} {{ $t('comm.version') }} : {{ lead.version }}</span>
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
                      v-model="lead.attrs[col.fieldName]"
                      :disabled="col.disabled"
                      :row="lead"
                      :attributes="col"
                      :filter="lead.attrs[col.fieldName]"
                      @data="handleData"
                      @input="handleInput"
                      @setValue="setValue(lead,item.fields,col.fieldName)"
                    />
                    <form-element
                      v-else
                      :ref="col.fieldName"
                      :key="index3"
                      v-model="lead[col.fieldName]"
                      :disabled="col.disabled"
                      :row="lead"
                      :attributes="col"
                      :filter="lead[col.fieldName]"
                      @data="handleData"
                      @input="handleInput"
                      @setValue="setValue(lead,item.fields,col.fieldName)"
                    />
                  </div>
                </el-col>
              </el-row>
              <form-element
                v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr"
                :ref="field.fieldName"
                :key="index2"
                v-model="lead.attrs[field.fieldName]"
                :disabled="field.disabled"
                :row="lead"
                :attributes="field"
                :filter="lead.attrs[field.fieldName]"
                @data="handleData"
                @input="handleInput"
                @setValue="setValue(lead,item.fields,field.fieldName)"
              />
              <form-element
                v-else-if="field.formType !== 'ColumnsLayout'"
                :ref="field.fieldName"
                :key="index2"
                v-model="lead[field.fieldName]"
                :disabled="field.disabled"
                :row="lead"
                :attributes="field"
                :filter="lead[field.fieldName]"
                @data="handleData"
                @input="handleInput"
                @setValue="setValue(lead,item.fields,field.fieldName)"
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
import { getDetail, saveLead } from '@/api/mrk/lead'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'LeadEdit',
  components: { FormElement },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      lead: {
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
  watch: {
    'lead.contactType': {
      immediate: true,
      async handler(newValue, oldValue) {
        if (!newValue && oldValue) {
          this.lead.contactResult = ''
        }
      }
    }
  },
  async created() {
    const res = await getPageConfig('lead', 'edit')
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
      this.lead.assignedUser = this.$store.getters.userInfo.userId
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.lead = res.datas.lead
        if (res.datas.attachmentDetails) {
          this.lead.attachmentDetails = res.datas.attachmentDetails
        }
      }
      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.lead.id = ''
        this.lead.leadName = ''
        this.lead.mobilephone = ''
        this.lead.identiferNum = ''
        this.lead.exclusiveKey = ''
        this.lead.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.lead.assignedUser = this.$store.getters.userInfo.userId
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
      if (!this.lead.contactType && this.lead.contactResult) {
        this.setValidatorMessage('contactType', this.$t('mrk.lead.e0005'))
        return false
      } else if (this.lead.contactType === '02' && !this.lead.contactResult) {
        this.setValidatorMessage('contactResult', this.$t('mrk.lead.e0006'))
        return false
      }
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await saveLead(this.lead)
        if (res && res.success) {
          this.$router.push('/mrk/leadList')
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
