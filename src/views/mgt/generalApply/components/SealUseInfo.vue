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
                <el-input v-model="applyDisplay.applyName" :disabled="disabled" @blur="validator('applyName')" />
                <span ref="applyName" data-roles="required" :data-value="applyDisplay.applyName" class="message" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.applyDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="applyDisplay.applyDate" size="small" type="date" value-format="yyyy-MM-dd" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                {{ $t('mgt.generalApply.applyDepartment') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.applyDepartment" :disabled="true" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.applyUser') }}
              </div>
              <div class="input">
                <user-select v-model="applyDisplay.applyUser" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.applyUnit') }}
              </div>
              <div class="input">
                <el-checkbox-group
                  v-model="applyDisplay.applyUnit"
                  :disabled="disabled"
                >
                  <el-checkbox
                    v-for="item in applyUnit"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                  >
                    {{ item.dictName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.fileName') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.fileName" :disabled="disabled" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.uses') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.uses" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.number') }}
              </div>
              <div class="input">
                <milli-input v-model="applyDisplay.number" :disabled="disabled" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.oppositeSideUnit') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.oppositeSideUnit" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.sealType') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.sealType" :disabled="disabled" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.remark') }}</span>
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
import UserSelect from '@/components/UserSelect.vue'
// import applyPop from '@/views/mgt/apply/components/applyPop'
export default {
  name: 'SealUseInfo',
  components: { UserSelect },
  mixins: [names, formValidator],
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
        { value: '6', label: '6：退货申请' },
        { value: '7', label: '7：公章使用申请' }],
      applyUnit: [
        { dictId: '1', dictName: '花王（中国）' },
        { dictId: '2', dictName: '上海花王' },
        { dictId: '3', dictName: '花王（上海）产品服务' },
        { dictId: '4', dictName: '研发中心' },
        { dictId: '5', dictName: '花王（合肥）' },
        { dictId: '6', dictName: '佳宝丽（中国）' },
        { dictId: '7', dictName: '商务咨询' }

      ]
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
    }
  }
}
</script>
