<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="supplier.identiferNum" class="pagespan">{{ $t('mrk.supplier.identiferNum') }} : {{ supplier.identiferNum }} {{ $t('comm.version') }} : {{ supplier.version }}</span>
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
                      <form-element
                        v-if="col.isAddAttr"
                        :ref="col.fieldName"
                        :key="index3"
                        v-model="supplier.attrs[col.fieldName]"
                        :disabled="col.disabled"
                        :row="supplier"
                        :attributes="col"
                        :filter="supplier.attrs[col.fieldName]"
                        @input="handleInput"
                        @setValue="setValue(supplier,item.fields,col.fieldName)"
                      />
                      <form-element
                        v-else
                        :ref="col.fieldName"
                        :key="index3"
                        v-model="supplier[col.fieldName]"
                        :disabled="col.disabled"
                        :row="supplier"
                        :attributes="col"
                        :filter="supplier[col.fieldName]"
                        @input="handleInput"
                        @setValue="setValue(supplier,item.fields,col.fieldName)"
                      />
                    </div>
                  </el-col>
                </el-row>
                <form-element
                  v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="supplier.attrs[field.fieldName]"
                  :disabled="field.disabled"
                  :row="supplier"
                  :attributes="field"
                  :filter="supplier.attrs[field.fieldName]"
                  @input="handleInput"
                  @setValue="setValue(supplier,item.fields,field.fieldName)"
                />
                <form-element
                  v-else-if="field.formType !== 'ColumnsLayout'"
                  :ref="field.fieldName"
                  :key="index2"
                  v-model="supplier[field.fieldName]"
                  :disabled="field.disabled"
                  :row="supplier"
                  :attributes="field"
                  :filter="supplier[field.fieldName]"
                  @input="handleInput"
                  @setValue="setValue(supplier,item.fields,field.fieldName)"
                />
              </template>
            </div>
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
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
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
        <update-his :key="supplier.identiferNum" func-div="supplier" :identifer-num="supplier.identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { getDetail, submitSupplier, cancelProcess } from '@/api/mrk/supplier'
import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'SupplierEdit',
  components: { FormElement },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      activeNames: [],
      processDialog: false,
      productSelectDialog: false,
      historyDialog: false,
      supplier: {
        attrs: {
        }
      },
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
  async created() {
    const res = await getPageConfig('supplier', 'edit')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
      }
      if (!this.id) {
        // 新建的时候，删除最后的其他信息
        this.$delete(this.pageConfig, this.pageConfig.length - 1)
      }
    }
    this.activeNames = this.pageConfig.map(item => item.catagoryName)
    if (this.id) {
      this.fetchData()
    } else {
      this.supplier.assignedUser = this.$store.getters.userInfo.userId
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.supplier = res.datas.supplier
        if (res.datas.attachmentDetails) {
          this.supplier.attachmentDetails = res.datas.attachmentDetails
        }
      }
      // 点击复制迁移来的时候，清空属性
      if (this.$route.query.copy) {
        this.supplier.id = ''
        this.supplier.supplierName = ''
        this.supplier.identiferNum = ''
        this.supplier.exclusiveKey = ''
        this.supplier.updateTimeStamp = ''
        // 发行者默认为当前登录者
        this.supplier.assignedUser = this.$store.getters.userInfo.userId
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
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.supplier.taskId = this.taskId
        this.supplier.processInstId = this.processInstId
        this.supplier.submitType = submitType
        const res = await submitSupplier(this.supplier)
        if (res && res.success) {
          this.$router.push('/mrk/supplierList')
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
          this.$router.push('/mrk/supplierList')
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
.total-content .item{
	height: 30px;
	line-height: 30px;
	margin-bottom: 2px;
	font-size: 12px;
}
.total-content .item .name{
	width: 65%;
	float: left;
	text-align: right;
	padding-right: 50px;
}
.total-content .item .center{
	float: right;
	width: 35%;
}
.total-content .item .company{
	float: left;
	width: 125px;
	padding: 0 15px;
}
.total-content .form-box{
	width: 230px;
	padding: 2px 0;
}
.total-content .form-box .form-control{
	height: 26px;
	background: rgba(0,0,0,0);
	font-size: 12px;
}
</style>
<style lang="scss">
</style>
