<template>
  <div id="skuDetail">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title="'金额调整'"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="400px"
      append-to-body
      @open="handleOpen"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div style="height: 50vh; padding:20px;">
          <el-row type="flex" :gutter="5" style="width: 400px; color: #666;margin-bottom:10px;" justify="space-between">
            <el-col :span="6">
              对象年月:
            </el-col>
            <el-col :span="18">
              <el-date-picker v-model="targetYm" size="small" value-format="yyyy-MM" :disabled="true" type="month" :clearable="false" />
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="5" style="width: 400px; color: #666;margin-bottom:10px;" justify="space-between">
            <el-col :span="6">
              二级费目:
            </el-col>
            <el-col :span="18">
              <el-select v-model="inputParams.finAccountCode" placeholder="请选择" clearable @change="(value)=>validator('finAccountCode',value)">
                <el-option
                  v-for="item in fees4"
                  :key="item.accountCode"
                  :label="item.accountName"
                  :value="item.accountCode"
                />
              </el-select>
              <span ref="finAccountCode" data-roles="required" :data-value="inputParams.finAccountCode" class="message" />
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="5" style="width: 400px; color: #666;margin-bottom:5px;" justify="space-between">
            <el-col :span="6">
              代理商:
            </el-col>
            <el-col :span="18">
              <el-input :placeholder="'已选择 '+inputParams.custCode.length+' 个'" />
              <span ref="num" data-roles="required" :data-value="inputParams.num" class="message" />
            </el-col>
          </el-row>
          <div style="margin-bottom:10px;width:400px; padding-left:100px;">
            <agent-tree :csaccount="csaccount" :submit-org="submitOrg" @handleCheckChange="handleCheckChange" />
          </div>
          <el-row type="flex" :gutter="5" style="width: 400px; color: #666;margin-bottom:10px;" justify="space-between">
            <el-col :span="6">
              金额：
            </el-col>
            <el-col :span="18">
              <milli-input v-model="inputParams.amount" to-fixed-num="2" @input="(value)=>validator('amount',value)" />
              <span ref="amount" data-roles="required,number" :data-value="inputParams.amount" class="message" />
            </el-col>
          </el-row>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="$emit('cancel')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">关闭</span>
          </li>
          <li class="operation-item" @click="handleSave">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search, finSubjects } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
import { saveFixdAdjust } from '@/api/writeoff/adjusts.js'
import AgentTree from '@/views/comm/AgentTree'

export default {
  name: 'AmountAdjust',
  components: { AgentTree },
  mixins: [names, search, finSubjects, formValidator, numFormat, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    targetYm: {
      type: String,
      default: ''
    },
    submitOrg: {
      type: String,
      default: ''
    },
    accountType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: false,
      filterText: '',
      csaccount: [],
      fees4: [],
      searchParam: {
        params: {
          submitOrg: ''
        }
      },
      inputParams: {
        targetYm: '',
        submitOrg: '',
        finAccountCode: '',
        amount: '',
        num: '',
        custCode: []
      }
    }
  },
  methods: {
    handleOpen() {
      this.searchParam.params.submitOrg = this.submitOrg
      this.getSecondFinSubjects('1')
    },
    handleSave() {
      if (!this.validatorAll()) return
      this.inputParams.submitOrg = this.submitOrg
      this.inputParams.accountType = this.accountType
      this.inputParams.targetYm = this.targetYm
      console.log(this.inputParams)
      const res = saveFixdAdjust({ jsonList: JSON.stringify(this.inputParams) })
      console.log(res)
      this.$emit('cancel')
    },
    handleCheckChange(data) {
      this.inputParams.custCode = data.custCode
      this.inputParams.num = data.num
      this.validator('num', this.inputParams.num)
    }
  }
}
</script>
