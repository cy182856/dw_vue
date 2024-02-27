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
                {{ $t('mgt.generalApply.applyDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="applyDisplay.applyDate" size="small" type="date" value-format="yyyy-MM-dd" :disabled="disabled" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.expenseOwner') }}
              </div>
              <div class="input">
                <user-select v-model="applyDisplay.expenseOwner" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title sub_title2">
                {{ $t('mgt.generalApply.outsourceCompany') }}
                <p>{{ $t('mgt.generalApply.mkWrite') }}</p>
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.outsourceCompany" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.motion') }}
              </div>
              <div class="input">
                <rel-func-select v-model="applyDisplay.motion" rel-func="motion" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.applyKind') }}
              </div>
              <div class="input">
                <dict-checkbox v-model="applyDisplay.applyKind" dict-type-id="PromoterApplyKind" :disabled="disabled" />
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
          <span slot="title" class="collapse-title">{{ $t('comm.lineDetail') }}</span>
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
            <el-table-column label="No." min-width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('mgt.generalApply.applicantWrite')" align="center">
              <el-table-column :label="$t('mgt.generalApply.oldConf')" align="center">
                <el-table-column :label="$t('mgt.generalApply.brand')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.oldBrand" />
                    <span v-else>{{ scope.row.oldBrand }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.region')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.oldRegion" />
                    <span v-else>{{ scope.row.oldRegion }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.dealer')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.oldDealer" />
                    <span v-else>{{ scope.row.oldDealer }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.account')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <rel-func-select v-if="!disabled" v-model="scope.row.oldAccount" rel-func="account" />
                    <span v-else>{{ scope.row.oldAccount }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.city')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.oldCity" />
                    <span v-else>{{ scope.row.oldCity }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.shopName')" min-width="120" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.oldShopName" />
                    <span v-else>{{ scope.row.oldShopName }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.saleUndertaker')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <user-select v-if="!disabled" v-model="scope.row.oldSaleUndertaker" />
                    <span v-else>{{ scope.row.oldSaleUndertaker }} </span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column v-if="applyDisplay.applyKind.indexOf('03')>-1" key="1" :label="$t('mgt.generalApply.newConf')" align="center">
                <el-table-column :label="$t('mgt.generalApply.brand')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.newBrand" />
                    <span v-else>{{ scope.row.newBrand }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.region')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.newRegion" />
                    <span v-else>{{ scope.row.newRegion }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.dealer')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.newDealer" />
                    <span v-else>{{ scope.row.newDealer }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.account')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <rel-func-select v-if="!disabled" v-model="scope.row.newAccount" rel-func="account" />
                    <span v-else>{{ scope.row.newAccount }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.city')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.newCity" />
                    <span v-else>{{ scope.row.newCity }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.shopName')" min-width="120" align="center">
                  <template slot-scope="scope">
                    <el-input v-if="!disabled" v-model="scope.row.newShopName" />
                    <span v-else>{{ scope.row.newShopName }} </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mgt.generalApply.saleUndertaker')" min-width="100" align="center">
                  <template slot-scope="scope">
                    <user-select v-if="!disabled" v-model="scope.row.newSaleUndertaker" />
                    <span v-else>{{ scope.row.newSaleUndertaker }} </span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column v-if="applyDisplay.applyKind.indexOf('04')>-1" key="2" :label="$t('mgt.generalApply.activityName')" min-width="100" align="center">
                <template slot-scope="scope">
                  <el-input v-if="!disabled" v-model="scope.row.activityName" />
                  <span v-else>{{ scope.row.activityName }} </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mgt.generalApply.applyUserNumber')" min-width="70" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="!disabled" v-model="scope.row.applyUserNumber" />
                  <span v-else>{{ scope.row.applyUserNumber | numFormat(0) }} </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mgt.generalApply.confPeriod')" min-width="220" align="center">
                <template slot-scope="scope">
                  <el-date-picker v-if="!disabled" v-model="scope.row.confPeriod" type="daterange" size="small" value-format="yyyy-MM-dd" />
                  <span v-else-if="scope.row.confPeriod && scope.row.confPeriod.length>0">{{ scope.row.confPeriod[0] + ' 至 ' + scope.row.confPeriod[1] }} </span>
                </template>
              </el-table-column>
              <el-table-column v-if="applyDisplay.applyKind.indexOf('02')>-1" key="3" :label="$t('mgt.generalApply.cancelUserNumber')" min-width="70" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="!disabled" v-model="scope.row.cancelUserNumber" />
                  <span v-else>{{ scope.row.cancelUserNumber | numFormat(0) }} </span>
                </template>
              </el-table-column>
              <el-table-column v-if="applyDisplay.applyKind.indexOf('02')>-1" key="4" :label="$t('mgt.generalApply.cancelDate')" min-width="130" align="center">
                <template slot-scope="scope">
                  <el-date-picker v-if="!disabled" v-model="scope.row.cancelDate" type="date" size="small" value-format="yyyy-MM-dd" />
                  <span v-else>{{ scope.row.cancelDate }} </span>
                </template>
              </el-table-column>
              <el-table-column v-if="applyDisplay.applyKind.indexOf('04')>-1" key="5" :label="$t('mgt.generalApply.workDay')" min-width="90" align="center">
                <template slot-scope="scope">
                  <el-input v-if="!disabled" v-model="scope.row.workDay" />
                  <span v-else>{{ scope.row.workDay }} </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mgt.generalApply.saleTargetStore')" min-width="140" align="center">
                <template slot-scope="scope">
                  <el-input v-if="!disabled" v-model="scope.row.saleTargetStore" />
                  <span v-else>{{ scope.row.saleTargetStore }} </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mgt.generalApply.storeManageExpense')" min-width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="!disabled" v-model="scope.row.storeManageExpense" to-fixed-num="2" />
                  <span v-else>{{ scope.row.storeManageExpense | numFormat(2) }} </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mgt.generalApply.remark')" min-width="120" align="center">
                <template slot-scope="scope">
                  <el-input v-if="!disabled" v-model="scope.row.remark" />
                  <span v-else>{{ scope.row.remark }} </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('mgt.generalApply.mdWritePromotionExpense')" min-width="100" align="right">
              <el-table-column :label="$t('mgt.generalApply.basicServiceExpenseDay')" min-width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="!disabled" v-model="scope.row.basicServiceExpenseDay" to-fixed-num="2" />
                  <span v-else>{{ scope.row.basicServiceExpenseDay | numFormat(2) }} </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mgt.generalApply.achievementServiceExpense')" min-width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="!disabled" v-model="scope.row.achievementServiceExpense" to-fixed-num="2" />
                  <span v-else>{{ scope.row.achievementServiceExpense | numFormat(2) }} </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mgt.generalApply.otherExpense')" min-width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="!disabled" v-model="scope.row.otherExpense" to-fixed-num="2" />
                  <span v-else>{{ scope.row.otherExpense | numFormat(2) }} </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mgt.generalApply.outsourceExpenseSum')" min-width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="!disabled" v-model="scope.row.outsourceExpenseSum" to-fixed-num="2" />
                  <span v-else>{{ scope.row.outsourceExpenseSum | numFormat(2) }} </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('mgt.generalApply.outsourceAndStoreExpenseSum')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.expenseSum" to-fixed-num="2" />
                <span v-else>{{ scope.row.expenseSum | numFormat(2) }} </span>
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
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'PromoterInfo',
  components: { UserSelect, RelFuncSelect },
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
      processDialog: false
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
    // async fetchData() {
    //   this.isLoading = false
    // },
    handleAddDetail() {
      this.applyDisplay.details.push({
        month: '',
        amount: ''
      })
    },
    handleDeleteDetail(index) {
      this.applyDisplay.details.splice(index, 1)
    }
  }
}
</script>
