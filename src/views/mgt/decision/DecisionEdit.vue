<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="decision.identiferNum" class="pagespan">{{ $t('mgt.decision.identiferNum') }} : {{ decision.identiferNum }}</span>
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
                      <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="decision.attrs[col.fieldName]" :disabled="col.disabled" :row="decision" :attributes="col" @data="handleData" @setValue="setValue(pricebook,item.fields,col.fieldName)" />
                      <form-element v-else :ref="col.fieldName" :key="index3" v-model="decision[col.fieldName]" :disabled="col.disabled" :row="decision" :attributes="col" @data="handleData" @setValue="setValue(decision,item.fields,col.fieldName)" />
                    </div>
                  </el-col>
                </el-row>
                <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="decision.attrs[field.fieldName]" :disabled="field.disabled" :row="decision" :attributes="field" @data="handleData" @setValue="setValue(decision,item.fields,field.fieldName)" />
                <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="decision[field.fieldName]" :disabled="field.disabled" :row="decision" :attributes="field" @data="handleData" @setValue="setValue(decision,item.fields,field.fieldName)" />
              <!-- <form-element v-if="field.isAddAttr && !!!field.isHide" :ref="field.fieldName" :key="index2" v-model="decision.attrs[field.fieldName]" :obj="decision" :disabled="field.disabled" :attributes="field" />
              <form-element v-else-if="!!!field.isHide" :ref="field.fieldName" :key="index2" v-model="decision[field.fieldName]" :obj="decision" :disabled="field.disabled" :attributes="field" /> -->
              </template>
            </div>
          </div>
          <div v-else-if="item.elCollapseItemType === 'detail'" class="vertical">
            <div class="add_row " style="text-align:right;">
              <el-button class="editbtn" style="margin-left:1%" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddDetailLine()">
                {{ $t('comm.addLine') }}
              </el-button>
            </div>
            <div class="defaultScroll-table">
              <el-table
                stripe
                :data="decision.details"
                size="small"
                border
                :header-cell-style="{'text-align':'left'}"
              >
                <el-table-column label="No" width="50px">
                  <template slot-scope="scope">
                    {{ scope.row.sequenceNum }}
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="(field,index2) in item.fields"
                  :key="index2"
                  :label="$t(field.i18nLabelKey? field.i18nLabelKey : field.showName)"

                  :min-width="field.minWidth"
                  :width="field.width"
                  :align="field.formType==='MilliInput'?'right':'left'"
                >
                  <template slot-scope="scope">
                    <column-element v-if="field.isAddAttr" :ref="field.fieldName+scope.$index" v-model="scope.row.attrs[field.fieldName]" :attributes="field" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" :row="scope.row" @data="handleData" />
                    <column-element v-else :ref="field.fieldName+scope.$index" v-model="scope.row[field.fieldName]" :attributes="field" :index-object="{catagoryName: item.catagoryName, lineIndex:scope.$index}" :row="scope.row" @data="handleData" />
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('comm.operation')"
                  width="70"
                >
                  <template slot-scope="scope">
                    <div align="center">
                      <el-button v-if="scope.row.col02!=='approved'" size="mini" icon="el-icon-delete" type="danger" @click="handleDelDetailLine(scope.row, scope.$index, item.catagoryName)" />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li class="operation-item" @click="handleSubmit('save')">
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getDetail, submitDecision, cancelProcess } from '@/api/mgt/decision'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import ColumnElement from '@/components/ColumnElement.vue'
import { names } from '@/mixins/names.js'
import { dict } from '@/mixins/dict'
// import DecisionPop from '@/views/mgt/decision/components/DecisionPop'
export default {
  name: 'DecisionEdit',
  //   components: { DecisionPop },
  components: { FormElement, ColumnElement },
  mixins: [names, formValidator, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      decisionType: '',
      decision: {
        attrs: {},
        details: []
      },
      processDialog: false,
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          elCollapseItemType: 'config',
          fields: [
            {
              fieldName: 'decisionType',
              i18nLabelKey: 'mgt.decision.decisionType',
              formType: 'DictSelect',
              dictTypeId: 'DecisionType',
              dataRoles: 'required'
            }
          ]
        }
      ],
      detailConfig: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
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
    decision: {
      async handler(newValue, oldValue) {
        const _this = this
        if (newValue.decisionType && newValue.decisionType !== this.decisionType) {
          this.decisionType = newValue.decisionType
          const r = await getPageConfig('decision', this.decisionType + 'edit')
          if (r && r.success) {
            if (r.datas.pageConfig) {
              this.pageConfig = JSON.parse(r.datas.pageConfig)
              this.pageConfig[0] && this.pageConfig[0].fields.forEach(function(item) {
                item.columns.forEach(function(item1) {
                  if (item1.fieldName === 'decContactPerson') {
                    _this.$set(item1, 'rootOrgId', _this.$store.getters.userInfo.orgSeqNo.split('.')[1])
                  }
                })
              })
            }
          }
        }
        if (this.pageConfig[0].fields.length > 1) {
          this.pageConfig[0].fields.forEach(function(item) {
            item.columns.forEach(function(item1) {
              if (item1.fieldName === 'shanghaiArea') {
                if (item1 && newValue && newValue.attrs.tripType === 'N') {
                  _this.$set(item1, 'isHide', false)
                } else if (item1 && newValue && newValue.attrs.tripType === 'W') {
                  _this.$set(item1, 'isHide', true)
                }
              }
              if (item1.fieldName === 'decisionType') {
                _this.$set(item1, 'filter', _this.$store.getters.userInfo.orgSeqNo.split('.')[1])
              }
              if (_this.decisionType === '04' && item1.fieldName === 'col01') {
                if (_this.isRoleSalary) { // 薪资角色：非人事、一般人事、薪资评定
                  _this.$set(item1, 'filter', '3')
                } else if (_this.isRoleHrManager && !_this.isRoleSalary) { // 人事经理角色：非人事、一般人事
                  _this.$set(item1, 'filter', '2')
                } else { // 担当：非人事
                  _this.$set(item1, 'filter', '1')
                }
              }
              if (_this.decisionType === '06' && item1.fieldName === 'col01') {
                if (_this.isRoleHrManager || _this.isRoleSalary) { // 人事经理角色：非人事、一般人事
                  _this.$set(item1, 'filter', '2')
                } else { // 担当：非人事
                  _this.$set(item1, 'filter', '1')
                }
              }
            })
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.activeNames = this.pageConfig.map(item => item.catagoryName).concat(this.detailConfig.map(item => item.catagoryName))
    if (this.id) {
      this.fetchData()
    } else {
      this.decision.assignedUser = this.$store.getters.userInfo.userId
      this.decision.assignedOrg = this.companyOrgId
      this.decision.decision = '0'
    }
  },
  methods: {
    handleData(data) {

    },
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.decision = res.datas.decision
      }
      // 点击复制迁移来的时候，清空
      if (this.$route.query.copy) {
        this.decision.id = ''
        this.decision.identiferNum = ''
        this.decision.exclusiveKey = ''
        this.decision.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.decision.assignedUser = this.$store.getters.userInfo.userId
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
      if (this.companyOrgId !== this.decision.assignedOrg) {
        tipmsg = this.$t('comm.tip17')
      } else {
        tipmsg = this.$t('comm.tip9')
      }
      this.$confirm(tipmsg, this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.decision.taskId = this.taskId
        this.decision.processInstId = this.processInstId
        this.decision.submitType = submitType
        this.decision.assignedOrg = this.companyOrgId
        const res = await submitDecision(this.decision)
        if (res && res.success) {
          this.$router.push('/mgt/decisionList')
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
          this.$router.push('/mgt/decisionList')
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
    handleAddDetailLine() {
      if (!this.decision.details) this.decision.details = []
      this.decision.details.push({ attrs: {}})
    },
    handleDelDetailLine(row, index) {
      this.decision.details.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.col_input_box {
  height: auto;
}
</style>
<style lang="scss" scoped>
.editbtn {
  background-color:rgb(102, 206, 188);
  color: white;
  margin-left: 50%;
  border: 0px solid #DCDFE6;
}
</style>
