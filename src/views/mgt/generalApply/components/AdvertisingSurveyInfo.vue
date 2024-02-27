<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <!-- <div class="pagetitle">
        <span class="pagespan">{{ $t('mgt.generalApply.identiferNum') }}: {{ apply.identiferNum }} {{ $t('comm.version') }}: {{ apply.version }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                {{ $t('mgt.generalApply.applyName') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.applyName" :disabled="disabled" clearable @blur="validator('applyName')" />
                <span ref="applyName" data-roles="required" :data-value="applyDisplay.applyName" class="message" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.assignedUser') }}
              </div>
              <div class="input">
                <user-select v-model="applyDisplay.assignedUser" :disabled="disabled" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3_1">
              <div class="title">
                {{ $t('mgt.generalApply.content') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.content" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.period') }}
              </div>
              <div class="input">
                <el-date-picker v-model="applyDisplay.period" size="small" type="daterange" value-format="yyyy-MM-dd" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.busInvitationCondition') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.busInvitationCondition" type="textarea" rows="3" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.expense') }}
              </div>
              <div class="input">
                <milli-input v-model="applyDisplay.expense" to-fixed-num="2" :disabled="disabled" />
                <span ref="expense" data-roles="required" :data-value="applyDisplay.expense" class="message" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.remark') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.remark" type="textarea" rows="3" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.monthExpense') }}</span>
          <div v-if="!disabled" class="add_table_row">
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddDetail">
              {{ $t('comm.addLine') }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="applyDisplay.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column
              v-if="!disabled"
              :label="$t('comm.operation')"
              align="center"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column label="No." width="70" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="month" :label="$t('mgt.generalApply.month')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-date-picker v-if="!disabled" v-model="scope.row.month" type="month" value-format="yyyy-MM" />
                <span v-else>{{ scope.row.month }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" :label="$t('mgt.generalApply.amount')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.amount" to-fixed-num="2" />
                <span v-else>{{ scope.row.amount | numFormat(2) }} </span>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.attachmentFile') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.attachmentInfo') }}
              </div>
              <div class="input">
                <attachement v-model="applyDisplay.fileList" func-div="apply" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
// import { getDetail } from '@/api/mgt/apply'
// import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import UserSelect from '@/components/UserSelect.vue'
// import applyPop from '@/views/mgt/apply/components/applyPop'
export default {
  name: 'AdvertisingSurveyInfo',
  components: { UserSelect },
  mixins: [names, formValidator, numFormat],
  props: {
    id: {
      type: String,
      required: false,
      default: '1'
    },
    type: {
      type: String,
      default: 'detail'
    },
    disabled: {
      type: Boolean,
      default: true
    },
    apply: {
      type: Object,
      default: (_) => {}
    }
  },
  data() {
    return {
      applyId: this.id,
      isLoading: true,
      activeNames: ['1', '2', '3'],
      applyDisplay: {},
      selectUserDialog: false,
      processDialog: false,
      applySelectDialog: false,
      applyType: [
        { value: '1', label: '1：广告费&调查费申请' },
        { value: '2', label: '2：Promoter费用申请' },
        { value: '3', label: '3：样品/试用品申请' },
        { value: '4', label: '4：促销品申请' },
        { value: '5', label: '5：改票申请' },
        { value: '6', label: '6：退货申请' }]
    }
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.applyId = newValue
        this.fetchData()
      }
    },
    applyDisplay: {
      async handler(newValue, oldValue) {
        this.$emit('update', this.applyDisplay)
      }
    }
  },
  created() {
    this.applyDisplay = JSON.parse(JSON.stringify(this.apply))
  },
  methods: {
    async fetchData() {
      this.isLoading = false
    },
    handleAddDetail() {
      this.apply.details.push({
        month: '',
        amount: ''
      })
    },
    handleDeleteDetail(index) {
      this.apply.details.splice(index, 1)
    }
  }
}
</script>
