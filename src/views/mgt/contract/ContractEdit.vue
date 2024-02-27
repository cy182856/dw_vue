<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="contract.identiferNum" class="pagespan">{{ $t('mgt.contract.identiferNum') }} : {{ contract.identiferNum }}</span>
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
                      <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="contract.attrs[col.fieldName]" :disabled="col.disabled" :row="contract" :attributes="col" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                      <form-element v-else :ref="col.fieldName" :key="index3" v-model="contract[col.fieldName]" :disabled="col.disabled" :row="contract" :attributes="col" @setValue="setValue(contract,item.fields,col.fieldName)" />
                    </div>
                  </el-col>
                </el-row>
                <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contract.attrs[field.fieldName]" :disabled="field.disabled" :row="contract" :attributes="field" @setValue="setValue(decision,item.fields,field.fieldName)" />
                <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="contract[field.fieldName]" :disabled="field.disabled" :row="contract" :attributes="field" @setValue="setValue(decision,item.fields,field.fieldName)" />
              </template>
            </div>
          </div>
          <!-- <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <form-element v-if="field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contract.attrs[field.fieldName]" :disabled="field.disabled" :attributes="field" />
              <form-element v-else :ref="field.fieldName" :key="index2" v-model="contract[field.fieldName]" :disabled="field.disabled" :attributes="field" />
            </template>
          </div> -->
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li class="operation-item" @click="hasPermission('contractEditBtn')? handleSubmit('editSave'):handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
        </li>
        <li class="operation-item" @click="handleSubmit('submit')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontijiao" /></span>
          <span class="operation-text">{{ $t('comm.submit') }}</span>
        </li>
        <!-- 取消申请 -->
        <li v-if="taskId" class="operation-item" @click="handleCancel">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.processCancel') }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div v-if="processDialog">
      <process-detail :key="processInstId" :title="$t('component.taskApprove.detailedProcess') + processInstId" :is-show="processDialog" :process-inst-id="processInstId" @close="processDialog=false" />
    </div>
    <!-- <div>
      <el-dialog id="contractSelectDialog" title="客户选择" :visible.sync="contractSelectDialog" width="80%">
        <contract-pop @cancel="contractSelectDialog=false" @clear="handleContractSelectClear" @select="handleContractSelected" />
      </el-dialog>
    </div> -->
  </div>
</template>
<script>
import { getDetail, submitContract, editSaveContract, cancelProcess } from '@/api/mgt/contract'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
// import ContractPop from '@/views/mgt/contract/components/ContractPop'
export default {
  name: 'ContractEdit',
  //   components: { ContractPop },
  components: { FormElement },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      contract: {
        contractStatus: '01',
        // automaticUpdate: '0',
        attrs: {
          // decision: '0',
          // effectSecurity: '0'
        },
        details: []
      },
      selectUserDialog: false,
      processDialog: false,
      contractSelectDialog: false,
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
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    isRoleHrManager: function() { if (this.$store.getters.userInfo.roleList.indexOf('ROLE_HR_MANAGER') < 0) { return false } return true },
    isRoleSalary: function() { if (this.$store.getters.userInfo.roleList.indexOf('ROLE_SALARY') < 0) { return false } return true },
    companyOrgId: function() { return this.$store.getters.userInfo.orgSeqNo.split('.')[1] }
  },
  watch: {
    contract: {
      handler(newValue, oldValue) {
        const noLimitConfig = this.pageConfig[0] && this.pageConfig[0].fields[3] && this.pageConfig[0].fields[3].columns.filter(item => item.fieldName === 'noLimit')[0]
        const contractEndDateConfig = this.pageConfig[0] && this.pageConfig[0].fields[3] && this.pageConfig[0].fields[3].columns.filter(item => item.fieldName === 'contractEndDate')[0]
        if (noLimitConfig && newValue && newValue.attrs.noLimit === '1') {
          this.$set(contractEndDateConfig, 'disabled', true)
          this.$set(this.contract, 'contractEndDate', '2999-12-31')
        } else if (noLimitConfig && newValue && newValue.attrs.noLimit === '0') {
          this.$set(contractEndDateConfig, 'disabled', false)
          if (this.contract.contractEndDate === '2999-12-31') {
            this.$set(this.contract, 'contractEndDate', null)
          }
        }
        const _this = this
        if (this.pageConfig[0].fields.length > 1) {
          this.pageConfig[0].fields.forEach(function(item) {
            item.columns.forEach(function(item1) {
              if (item1.fieldName === 'extendLimit' && newValue && newValue.automaticUpdate === '1') {
                _this.$set(item1, 'disabled', false)
                _this.$set(item1, 'dataRoles', 'positiveInt,required')
              } else if (item1.fieldName === 'extendLimit' && newValue && newValue.automaticUpdate === '0') {
                _this.contract.attrs.extendLimit = ''
                _this.$set(item1, 'disabled', true)
                _this.$set(item1, 'dataRoles', 'positiveInt')
              }
              if (item1.fieldName === 'instructItem' && newValue && newValue.attrs.decision === '1') {
                _this.$set(item1, 'disabled', false)
              } else if (item1.fieldName === 'instructItem' && newValue && newValue.attrs.decision === '0') {
                _this.contract.instructItem = ''
                _this.$set(item1, 'disabled', true)
              }
              if (item1.fieldName === 'effectSecurityLimit' && newValue && newValue.attrs.effectSecurity === '1') {
                _this.$set(item1, 'disabled', false)
                _this.$set(item1, 'dataRoles', 'positiveInt,required')
              } else if (item1.fieldName === 'effectSecurityLimit' && newValue && newValue.attrs.effectSecurity === '0') {
                _this.contract.attrs.effectSecurityLimit = ''
                _this.$set(item1, 'disabled', true)
                _this.$set(item1, 'dataRoles', 'positiveInt')
              }
            })
          })
        }
        // const effectSecurityLimit = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'effectSecurityLimit')[0]
        // if (effectSecurityLimit && newValue && newValue.attrs.effectSecurity === '1') {
        //   this.$set(effectSecurityLimit, 'disabled', false)
        //   this.$set(effectSecurityLimit, 'dataRoles', 'positiveInt,required')
        // } else if (effectSecurityLimit && newValue && newValue.attrs.effectSecurity === '0') {
        //   this.contract.attrs.effectSecurityLimit = ''
        //   this.$set(effectSecurityLimit, 'disabled', true)
        //   this.$set(effectSecurityLimit, 'dataRoles', 'positiveInt')
        // }
        // const extendLimit = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'extendLimit')[0]
        // if (extendLimit && newValue && newValue.automaticUpdate === '1') {
        //   this.$set(extendLimit, 'disabled', false)
        //   this.$set(extendLimit, 'dataRoles', 'positiveInt,required')
        // } else if (extendLimit && newValue && newValue.automaticUpdate === '0') {
        //   this.contract.attrs.extendLimit = ''
        //   this.$set(extendLimit, 'disabled', true)
        //   this.$set(extendLimit, 'dataRoles', 'positiveInt')
        // }
        // const instructItem = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'instructItem')[0]
        // if (instructItem && newValue && newValue.attrs.decision === '1') {
        //   this.$set(instructItem, 'disabled', false)
        // } else if (instructItem && newValue && newValue.attrs.decision === '0') {
        //   this.contract.instructItem = ''
        //   this.$set(instructItem, 'disabled', true)
        // }
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    const res = await getPageConfig('contract', 'edit')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
        const _this = this
        this.pageConfig[0] && this.pageConfig[0].fields.forEach(function(item) {
          item.columns.forEach(function(item1) {
            if (item1.fieldName === 'col01') {
              if (_this.isRoleSalary) { // 薪资角色：非人事、一般人事、薪资评定
                _this.$set(item1, 'filter', '3')
              } else if (_this.isRoleHrManager && !_this.isRoleSalary) { // 人事经理角色：非人事、一般人事
                _this.$set(item1, 'filter', '2')
              } else { // 担当：非人事
                _this.$set(item1, 'filter', '1')
              }
            }
            if (item1.fieldName === 'decContactPerson') {
              _this.$set(item1, 'rootOrgId', _this.$store.getters.userInfo.orgSeqNo.split('.')[1])
            }
          })
        })
        // const col01 = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'col01')[0]

        // const decContactPersonConfig = this.pageConfig[0] && this.pageConfig[0].fields.filter(item => item.fieldName === 'decContactPerson')[0]
        // if (decContactPersonConfig) {
        //   this.$set(decContactPersonConfig, 'rootOrgId', this.$store.getters.userInfo.orgSeqNo.split('.')[1])
        // }
      }
    }

    this.activeNames = this.pageConfig.map(item => item.catagoryName)
    if (this.id) {
      this.fetchData()
    } else {
      this.contract.assignedUser = this.$store.getters.userInfo.userId
      this.contract.assignedOrg = this.companyOrgId
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.contract = res.datas.contract
      }
      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.contract.id = ''
        this.contract.identiferNum = ''
        this.contract.exclusiveKey = ''
        this.contract.updateTimeStamp = ''
        this.contract.prompt = '0'
        this.contract.attrs.linkReleaseNo = this.contract.attrs.releaseNo
        // 发行者默认为当前登录者
        this.contract.assignedUser = this.$store.getters.userInfo.userId
      }
      this.isLoading = false
    },
    handleSubmit(submitType) {
      for (const ref in this.$refs) {
        if (this.$refs[ref] && this.$refs[ref].length > 0) {
          this.$refs[ref][0].validatorAll()
          if (!this.$refs[ref][0].validatorState) return false
        }
      }
      let tipmsg = ''
      if (this.companyOrgId !== this.contract.assignedOrg) {
        tipmsg = this.$t('comm.tip17')
      } else {
        tipmsg = this.$t('comm.tip9')
      }
      this.$confirm(tipmsg, this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.contract.taskId = this.taskId
        this.contract.processInstId = this.processInstId
        this.contract.submitType = submitType
        this.contract.assignedOrg = this.companyOrgId
        let res
        if (submitType === 'editSave') {
          res = await editSaveContract(this.contract)
        } else {
          res = await submitContract(this.contract)
        }
        if (res && res.success) {
          this.$router.push('/mgt/contractList')
        }
        this.isLoading = false
      }).catch(_ => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
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
          this.$router.push('/mgt/contractList')
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
    handleContractSelectClear() {
      this.superContract.contractLevel = ''
      this.superContract.contractName = ''
      this.superContract.identiferNum = ''
      this.contractSelectDialog = false
    },
    handleContractSelected(contracts) {
      if (!contracts || contracts.length !== 1) {
        this.$message({
          type: 'error',
          message: '请选择一条记录'
        })
        return
      }
      this.superContract.contractLevel = contracts[0].contractLevel
      this.superContract.contractName = contracts[0].contractName
      this.superContract.identiferNum = contracts[0].identiferNum
      this.contractSelectDialog = false
    }
  }
}
</script>
