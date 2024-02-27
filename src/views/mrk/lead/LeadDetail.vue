<template>
  <!-- 详细画面 -->
  <div class="summary">
    <top-box :relation-info-map="relationInfoMap" />
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('mrk.lead.identiferNum') }} : {{ lead.identiferNum }} {{ $t('comm.version') }} : {{ lead.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                  <div :class="index3===0?'input_col1':'input_col2'">
                    <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="lead.attrs[col.fieldName]" :disabled="col.disabled" :row="lead" :attributes="col" @setValue="setValue(lead,item.fields,col.fieldName)" />
                    <form-element v-else :ref="col.fieldName" :key="index3" v-model="lead[col.fieldName]" :disabled="col.disabled" :row="lead" :attributes="col" @setValue="setValue(lead,item.fields,col.fieldName)" />
                  </div>
                </el-col>
              </el-row>
              <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="lead.attrs[field.fieldName]" :disabled="field.disabled" :row="lead" :attributes="field" @setValue="setValue(lead,item.fields,field.fieldName)" />
              <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="lead[field.fieldName]" :disabled="field.disabled" :row="lead" :attributes="field" @setValue="setValue(lead,item.fields,field.fieldName)" />
            </template>
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
        <!-- 变更履历 -->
        <li class="operation-item" @click="handleUpdateHis">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <!-- 历史版本 -->
        <li class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li>
        <!-- 转换 -->
        <li class="operation-item" @click="handleSetTransferInfo">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.transfer') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div class="historyDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his :key="lead.identiferNum" func-div="lead" :identifer-num="lead.identiferNum" />
      </el-drawer>
    </div>
    <div class="versionDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="versionDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.versionHis') }}</span>
        <version-his :key="lead.identiferNum" func-div="lead" :identifer-num="lead.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
    <div class="apply">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
        :visible.sync="transferDialog"
        :before-close="handleCancelClick"
        :title=" $t('comm.transfer')"
        top="0"
        width="60%"
      >
        <div style="display: flex;flex-direction: column;height: 100%;">
          <div class="middle-box">
            <h3 style="border-bottom:1px dashed #ccc;margin:15px;">
              <el-checkbox v-model="transferInfo.customerCheck">
                {{ $t('mrk.lead.account') }}
              </el-checkbox>
            </h3>
            <div style="margin-left:15px">
              <div class="input_box">
                <div class="flex2">
                  <div class="title">
                    {{ $t('mrk.lead.accountName') }}
                  </div>
                  <div class="input">
                    <el-input v-model="transferInfo.companyName" size="small" :disabled="!transferInfo.customerCheck" @blur="validator('companyName')" />
                    <span ref="companyName" data-roles="required" :data-value="transferInfo.companyName" class="message" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    {{ $t('mrk.lead.telephone') }}
                  </div>
                  <div class="input">
                    <el-input v-model="transferInfo.telephone" size="small" :disabled="!transferInfo.customerCheck" />
                  </div>
                </div>
              </div>
            </div>
            <h3 style="border-bottom:1px dashed #ccc;margin:15px;">
              <el-checkbox v-model="transferInfo.contactsCheck">
                {{ $t('mrk.lead.contactName') }}
              </el-checkbox>
            </h3>
            <div style="margin-left:15px">
              <div class="input_box">
                <div class="flex2">
                  <div class="title">
                    {{ $t('mrk.lead.leadName') }}
                  </div>
                  <div class="input">
                    <el-input v-model="transferInfo.leadName" size="small" :disabled="!transferInfo.contactsCheck" @blur="validator('leadName')" />
                    <span ref="leadName" data-roles="required" :data-value="transferInfo.leadName" class="message" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    {{ $t('mrk.lead.mobilephone') }}
                  </div>
                  <div class="input">
                    <el-input v-model="transferInfo.mobilephone" size="small" :disabled="!transferInfo.contactsCheck" />
                  </div>
                </div>
              </div>
            </div>
            <h3 style="border-bottom:1px dashed #ccc;margin:15px;" />
            <div style="margin-left:15px">
              <div class="input_box">
                <div class="flex2">
                  <div class="title must">
                    {{ $t('mrk.lead.assignedUser') }}
                  </div>
                  <div class="input">
                    <user-select v-model="transferInfo.assignedUser" size="small" @change="(value) => {validator('transferAssignedUser', value)}" />
                    <span ref="transferAssignedUser" data-roles="required" :data-value="transferInfo.assignedUser" class="message" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
            <li class="operation-item" @click="transferDialog = false">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
              <span class="operation-text">{{ $t('comm.cancel') }}</span>
            </li>
            <li class="operation-item" @click="handleTransferClick">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
              <span class="operation-text">{{ $t('comm.certain') }}</span>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getDetail, deleteLead, transfer } from '@/api/mrk/lead'
import { getPageConfig } from '@/api/base.js'
import FormElement from '@/components/FormElement.vue'
import UserSelect from '@/components/UserSelect.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { formValidator } from '@/mixins/form-validator.js'
import TopBox from '@/components/TopBox'
import { dict } from '@/mixins/dict'
export default {
  name: 'LeadEdit',
  components: { FormElement, TopBox, UserSelect },
  mixins: [names, permission, formValidator, dict],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      versionDialog: false,
      transferDialog: false,
      transferInfo: { customerCheck: false, contactsCheck: false },
      activeNames: [],
      lead: {
        attrs: {
        }
      },
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
  watch: {
    'transferInfo.customerCheck': {
      async handler(newValue, oldValue) {
        if (!newValue && oldValue) {
          this.clearErrorMessage()
        }
      },
      immediate: true
    },
    'transferInfo.contactsCheck': {
      async handler(newValue, oldValue) {
        if (!newValue && oldValue) {
          this.clearErrorMessage()
        }
      },
      immediate: true
    },
    id: function(newValue) {
      if (newValue) {
        this.fetchData()
      }
    }
  },
  async created() {
    const res = await getPageConfig('lead', 'detail')
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
        this.lead = res.datas.lead
        if (res.datas.attachmentDetails) {
          this.lead.attachmentDetails = res.datas.attachmentDetails
        }
        this.relationInfoMap = res.datas.relationNum
      }
    },
    handleCopy() {
      this.$router.push({ path: '/mrk/lead/edit', query: { id: this.id, copy: true }})
    },
    handleEdit() {
      this.$router.push({ path: '/mrk/lead/edit', query: { id: this.id }})
    },
    handleDelete() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await deleteLead([this.lead])
        if (res && res.success) {
          this.$router.push('/mrk/leadList')
        }
        this.isLoading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleTransferClick() {
      if (!this.validatorAll('transfer')) {
        return false
      }
      if (!this.transferInfo.customerCheck && !this.transferInfo.contactsCheck) {
        this.$message({
          type: 'error',
          message: this.$t('mrk.lead.e0004')
        })
        return false
      }
      if (this.transferInfo.customerCheck) {
        this.validatorAll('companyName')
        if (!this.validatorState) return false
      }
      if (this.transferInfo.contactsCheck) {
        this.validatorAll('leadName')
        if (!this.validatorState) return false
      }

      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.$delete(this.transferInfo, 'attachmentDetails')
        this.$delete(this.transferInfo, 'attrs')
        const res = await transfer(this.transferInfo)
        if (res && res.success) {
          this.$router.push('/mrk/leadList')
        }
        this.isLoading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleUpdateHis() {
      this.historyDialog = true
    },
    handleSetTransferInfo() {
      this.clearErrorMessage()
      this.transferInfo = {}
      this.transferInfo = JSON.parse(JSON.stringify(this.lead))
      this.transferInfo.assignedUser = this.$store.getters.userInfo.userId
      this.$set(this.transferInfo, 'customerCheck', false)
      this.$set(this.transferInfo, 'contactsCheck', false)
      this.transferDialog = true
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
