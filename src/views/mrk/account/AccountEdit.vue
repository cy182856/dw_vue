<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="account.identiferNum" class="pagespan">{{ $t('mrk.account.identiferNum') }} : {{ account.identiferNum }} {{ $t('comm.version') }} : {{ account.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                  <div v-if="index3===0" class="input_col1">
                    <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="account.attrs[col.fieldName]" :disabled="col.disabled" :row="account" :attributes="col" @data="handleData" @setValue="setValue(account,item.fields,col.fieldName)" />
                    <form-element v-else :ref="col.fieldName" :key="index3" v-model="account[col.fieldName]" :disabled="col.disabled" :row="account" :attributes="col" @data="handleData" @setValue="setValue(account,item.fields,col.fieldName)" />
                  </div>
                  <div v-else class="input_col2">
                    <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="account.attrs[col.fieldName]" :disabled="col.disabled" :row="account" :attributes="col" @data="handleData" @setValue="setValue(account,item.fields,col.fieldName)" />
                    <form-element v-else :ref="col.fieldName" :key="index3" v-model="account[col.fieldName]" :disabled="col.disabled" :row="account" :attributes="col" @data="handleData" @setValue="setValue(account,item.fields,col.fieldName)" />
                  </div>
                </el-col>
              </el-row>
              <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="account.attrs[field.fieldName]" :disabled="field.disabled" :row="account" :attributes="field" @data="handleData" @setValue="setValue(account,item.fields,field.fieldName)" />
              <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="account[field.fieldName]" :disabled="field.disabled" :row="account" :attributes="field" @data="handleData" @setValue="setValue(account,item.fields,field.fieldName)" />
            </template>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
        </li>
        <!-- 提交 -->
        <li class="operation-item" @click="handleSubmit('submit')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontijiao" /></span>
          <span class="operation-text">{{ $t('comm.submit') }}</span>
        </li>
        <!-- 流程取消 -->
        <li v-if="taskId" class="operation-item" @click="handleCancel">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.processCancel') }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('comm.approval') }}</span>
        </li>
        <!-- 变更履历 -->
        <li v-if="id && !$route.query.copy" class="operation-item" @click="historyDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">变更履历</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div v-if="processDialog">
      <process-detail :key="processInstId" :is-show="processDialog" :title="$t('component.taskApprove.detailedProcess') + processInstId" :process-inst-id="processInstId" @close="processDialog=false" />
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
        <update-his :key="account.identiferNum" func-div="account" :identifer-num="account.identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { getDetail, getSuperiorAccount, submitAccount, cancelProcess } from '@/api/mrk/account'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'AccountEdit',
  components: { FormElement },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      account: {
        attrs: {
        },
        details: []
      },
      selectUserDialog: false,
      processDialog: false,
      accountSelectDialog: false,
      hasChild: false,
      superAccount: { accountLevel: '', accountName: '', identiferNum: '' },
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
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() { return this.$route.query.id || this.$route.query.businessKey }
  },
  watch: {
    'account.contactStatus': {
      async handler(newValue, oldValue) {
        if (!newValue && oldValue) {
          this.account.contactResult = ''
        }
      },
      immediate: true,
      deep: true
    },
    'account.superiorAccountNum': {
      async handler(newValue, oldValue) {
        if (!newValue && oldValue) {
          this.account.superiorAccountLevel = ''
        }
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    const res = await getPageConfig('account', 'edit')
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
      this.account.assignedUser = this.$store.getters.userInfo.userId
    }
  },
  methods: {
    async fetchData() {
      let res = await getDetail(this.id)
      if (res && res.success) {
        this.account = res.datas.account
        if (res.datas.attachmentDetails && !this.$route.query.copy) {
          this.account.attachmentDetails = res.datas.attachmentDetails
        }
        if (res.datas.hasChild && this.account.accountLevel && this.account.accountLevel > 0 && !this.$route.query.copy) {
          var superiorAccountNum = {}
          this.pageConfig[1].fields.forEach(function(item) {
            item.columns.forEach(function(item1) {
              if (item1.fieldName === 'superiorAccountNum') {
                superiorAccountNum = item1
              }
            })
          })
          if (superiorAccountNum) {
            this.$set(superiorAccountNum, 'disabled', true)
          }
        }
        if (this.account.superiorAccountNum) {
          res = await getSuperiorAccount(this.account.superiorAccountNum)
          this.superAccount = res.datas.superiorAccount
          this.$set(this.account, 'superiorAccountLevel', this.superAccount.accountLevel)
        }
      }
      // 点击复制迁移来的时候，清空
      if (this.$route.query.copy) {
        this.account.id = ''
        this.account.identiferNum = ''
        this.account.exclusiveKey = ''
        this.account.updateTimeStamp = ''
        this.account.accountName = ''
        this.account.telephone = ''
        // 发行者默认为当前登录者
        this.account.assignedUser = this.$store.getters.userInfo.userId
      }
      this.isLoading = false
    },
    handleSubmit(submitType) {
      for (const ref in this.$refs) {
        if (this.$refs[ref] && this.$refs[ref].length > 0) {
          const obj = this.$refs[ref][0]
          // 页面嵌套vue组件调用验证方法
          if (obj.hasOwnProperty('validatorAll')) {
            this.$refs[ref][0].validatorAll()
            if (!this.$refs[ref][0].validatorState) return false
          } else {
            // 本页面调用验证方法
            if (!this.validator(ref)) return false
          }
        }
      }
      if (!this.account.contactStatus && this.account.contactResult) {
        this.setValidatorMessage('contactStatus', this.$t('mrk.account.e0005'))
        return false
      } else if (this.account.contactStatus === '02' && !this.account.contactResult) {
        this.setValidatorMessage('contactResult', this.$t('mrk.account.e0006'))
        return false
      }
      if (this.account.superiorAccountNum && this.account.identiferNum === this.account.superiorAccountNum) {
        this.setValidatorMessage('superiorAccountNum', this.$t('mrk.account.e0007'))
        return false
      }
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.account.taskId = this.taskId
        this.account.processInstId = this.processInstId
        this.account.submitType = submitType
        const res = await submitAccount(this.account)
        if (res && res.success) {
          this.$router.push('/mrk/accountList')
        }
        this.isLoading = false
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    handleCancel() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await cancelProcess(this.taskId)
        if (res && res.success) {
          this.$router.push('/mrk/accountList')
        }
        this.isLoading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleAccountSelectClear() {
      this.superAccount.accountLevel = ''
      this.superAccount.accountName = ''
      this.superAccount.identiferNum = ''
      this.accountSelectDialog = false
    },
    handleData(data) {
      if (data.refFunc === 'account') {
        this.account.superiorAccountLevel = data[0].accountLevel
        this.account.superiorAccountNum = data[0].identiferNum
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
