<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="motion.identiferNum" class="pagespan">{{ $t('fee.promotion.identiferNum') }}: {{ motion.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.motionType') }}
              </div>
              <div class="input">
                <el-select v-model="motion.motionType" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in motionType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.department') }}
              </div>
              <div class="input">
                <!-- <department-select v-model="motion.department" /> -->
                <el-select v-model="motion.department" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in department"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.user') }}
              </div>
              <div class="input">
                <user-select v-model="motion.user" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.accountNum') }}
              </div>
              <div class="input">
                <rel-func-select v-model="motion.accountNum" :rel-func="'account'" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.channel') }}
              </div>
              <div class="input">
                <!-- <el-input v-model="motion.channel" /> -->
                <el-select v-model="motion.channel" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in channel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.brand') }}
              </div>
              <div class="input">
                <el-input v-model="motion.brand" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.bdmk') }}
              </div>
              <div class="input">
                <dict-radio v-model="motion.bdmk" class="input" dict-type-id="IsContain" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.startDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="motion.startDate" size="small" value-format="yyyy-MM-dd" format="yyyy-M-d" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.endDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="motion.endDate" size="small" value-format="yyyy-MM-dd" format="yyyy-M-d" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('fee.promotion.theme') }}
              </div>
              <div class="input">
                <el-input v-model="motion.theme" />
              </div>
            </div>
            <div class="flex2">
              <div class="title" />
              <div class="input">
                {{ $t('fee.promotion.sellinTargetAmount') }}
              </div>
              <div class="input">
                <el-input v-model="motion.sellinTargetAmount" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('fee.promotion.purpose') }}
              </div>
              <div class="input">
                <el-input v-model="motion.purpose" />
              </div>
            </div>
            <div class="flex2">
              <div class="title" />
              <div class="input">
                {{ $t('fee.promotion.selloutTargetAmount') }}
              </div>
              <div class="input">
                <el-input v-model="motion.selloutTargetAmount" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.relIdentiferNum') }}
              </div>
              <div class="input">
                <!-- <router-link :to="{path:'/fee/promotion/motionDetail',query:{id:motion.relIdentiferNum}}">
                  {{ motion.relIdentiferNum }}
                </router-link> -->
                <rel-func-select v-model="motion.relIdentiferNum" rel-func="motion" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t('fee.promotion.detailInfo') }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('fee.promotion.content') }}
              </div>
              <div class="input">
                <el-input v-model="motion.content" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('fee.promotion.form') }}
              </div>
              <div class="input">
                <el-input v-model="motion.form" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('fee.promotion.stores') }}
              </div>
              <div class="input">
                <el-input v-model="motion.stores" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('fee.promotion.sumStores') }}
              </div>
              <div class="input">
                <el-input v-model="motion.sumStores" placeholder="TG店数+固定架店数" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex4">
              <div class="title">
                {{ $t('fee.promotion.discountStartDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="motion.discountStartDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                {{ $t('fee.promotion.discountEndDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="motion.discountEndDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </div>
            </div>
            <!-- <div class="flex3">
              <div class="title">
                {{ $t('fee.promotion.bookDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="motion.bookDate" size="small" type="monthrange" range-separator="-" value-format="yyyy-MM" format="yyyy-MM" placeholder="与折扣期一致" />
              </div>
            </div> -->
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item name="18">
          <span slot="title" class="collapse-title">门店选择</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                门店
                <span>
                  <a
                    class="el-icon-circle-plus-outline"
                    @click="shopDialogShow = true"
                  />
                </span>
              </div>
              <div class="input">
                <el-input
                  readonly
                  type="textarea"
                  maxlength="256"
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
        </el-collapse-item> -->
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{ $t('fee.promotion.activityDiscount') }}</span>
          <div class="add_table_row">
            <el-button class="editbtn" size="mini" @click.stop="handleSellinMonth">
              {{ $t('fee.promotion.sellinIncludeMonth') }}
            </el-button>
            <el-button class="editbtn" size="mini" @click.stop="handleDiscountSearch">
              {{ $t('fee.promotion.discountUseStatusSearch') }}
            </el-button>
            <el-button class="editbtn" size="mini" @click.stop="skuSelectDialog = true">
              {{ $t('fee.promotion.skuSearch') }}
            </el-button>
          </div>
          <el-table
            v-if="sellinMonthTable"
            ref="table"
            :data="motion.sellinMonthList.percent"
            :style="'margin-bottom: 20px;width:'+ width+'px'"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            border
          >
            <el-table-column :label="$t('fee.promotion.sellinIncludeMonth')" width="150">
              <template>
                {{ $t('fee.promotion.ratio') }}
              </template>
            </el-table-column>
            <el-table-column v-for="item in motion.monthHeader" :key="item" :label="item+'月'" align="center" width="150">
              <template slot-scope="scope">
                <milli-input v-model="scope.row[item]" append="%" />
              </template>
            </el-table-column>
          </el-table>
          <el-table
            ref="table"
            :data="motion.discountList"
            :header-cell-style="{'text-align':'center'}"
            show-summary
            :summary-method="getSummaries"
            border
            stripe
          >
            <el-table-column
              :label="$t('comm.operation')"
              align="center"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '1')" />
              </template>
            </el-table-column>
            <el-table-column prop="salesOffice" :label="$t('fee.promotion.salesOffice')" min-width="130" show-overflow-tooltip>
              <template slot-scope="scope">
                <rel-func-select v-model="scope.row.salesOffice" rel-func="account" />
              </template>
            </el-table-column>
            <el-table-column prop="identiferNum" :label="$t('fee.promotion.accountGroupSoldToNum')" min-width="130" show-overflow-tooltip>
              <template slot-scope="scope">
                <rel-func-select v-model="scope.row.identiferNum" rel-func="account" />
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('fee.promotion.accountGroupSoldToName')" min-width="150" align="center" show-overflow-tooltip />
            <el-table-column prop="materielNum" :label="$t('fee.promotion.materielNum')" min-width="100" align="center" show-overflow-tooltip />
            <el-table-column prop="relMaterielNum" :label="$t('fee.promotion.relMaterielNum')" min-width="100" align="center" />
            <el-table-column prop="materielName" :label="$t('fee.promotion.materielName')" min-width="100" align="center" show-overflow-tooltip />
            <el-table-column prop="spec" :label="$t('fee.promotion.spec')" min-width="100" align="center" />

            <el-table-column :label="$t('fee.promotion.frequencySum')" align="center">
              <el-table-column prop="firstHalfYearFrequency" :label="$t('fee.promotion.firstHalfYearFrequency')" width="80" align="center" />
              <el-table-column prop="secondHalfYearFrequency" :label="$t('fee.promotion.secondHalfYearFrequency')" width="80" align="center" />
            </el-table-column>
            <el-table-column prop="discountRate" :label="$t('fee.promotion.discountRate')" min-width="80" align="right" />
            <el-table-column prop="planCaseQty" :label="$t('fee.promotion.planCaseQty')" min-width="80" align="right" />
            <el-table-column prop="planAmount" :label="$t('fee.promotion.planAmount')" min-width="80" align="right">
              <template slot-scope="scope">
                {{ scope.row.planAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-for="item in motion.monthHeader" :key="item" :label="item+'月Sell-in计入数'" align="right" min-width="120">
              <template slot-scope="scope">
                {{ isNaN(motion.sellinMonthList.percent[0][item] * scope.row.planCaseQty)? '':( motion.sellinMonthList.percent[0][item] * scope.row.planCaseQty / 100) | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="discountPeriod" :label="$t('fee.promotion.discountPeriod')" min-width="150" align="center" />
            <el-table-column prop="promotionPeriod" :label="$t('fee.promotion.promotionPeriod')" min-width="150" align="center" />
            <el-table-column prop="modeDMYellowCard" :label="$t('fee.promotion.modeDMYellowCard')" min-width="100" align="center" />
            <el-table-column prop="purchasePrice" :label="$t('fee.promotion.purchasePrice')" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.purchasePrice | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="retailPrice" :label="$t('fee.promotion.retailPrice')" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.retailPrice | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="grossProfit" :label="$t('fee.promotion.grossProfit')" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.grossProfit }}%
              </template>
            </el-table-column>
            <el-table-column prop="retailSalePrice" :label="$t('fee.promotion.retailSalePrice')" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.retailSalePrice | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="guideRetailPrice" :label="$t('fee.promotion.guideRetailPrice')" min-width="100" align="center" />
          </el-table>
        </el-collapse-item>
        <el-collapse-item v-if="motion.motionType==='1'" name="4">
          <span slot="title" class="collapse-title">{{ $t('fee.promotion.expense') }}</span>
          <div class="add_table_row">
            <el-button class="editbtn" size="mini" @click.stop="handleExpenseSearch">
              {{ $t('fee.promotion.expenseUseStatusSearch') }}
            </el-button>
            <el-button class="editbtn" size="mini" @click.stop="expenseAccountSelectDialog=true">
              {{ $t('fee.promotion.expenseAccountSearch') }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="motion.expenseList"
            style="margin-bottom: 20px;"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            row-key="id"
            show-summary
            :summary-method="getExpenseSummaries"
            border
            stripe
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column
              :label="$t('comm.operation')"
              min-width="140"
            >
              <template slot-scope="scope">
                <el-button v-if="!scope.row.subBrandNum" size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '2', scope.row.id)" />
              </template>
            </el-table-column>
            <el-table-column prop="expenseType" :label="$t('fee.promotion.expenseType')" min-width="100" />
            <el-table-column prop="expenseAccount" :label="$t('fee.promotion.expenseAccount')" min-width="100" align="center" />
            <el-table-column prop="expenseAccountName" :label="$t('fee.promotion.expenseAccountName')" min-width="150" align="center" />
            <el-table-column prop="subBrandNum" :label="$t('fee.promotion.subBrandNum')" min-width="150" align="center" />
            <el-table-column prop="subBrandName" :label="$t('fee.promotion.subBrandName')" min-width="150" align="center" />
            <el-table-column :label="$t('fee.promotion.motionAmount')" align="center">
              <el-table-column v-for="item in motion.monthHeader" :key="item" :prop="'month'+ item + 'Amount'" :label="item+'月计入金额'" width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="!!scope.row.subBrandNum" v-model="scope.row['month'+item+'Amount']" to-fixed-num="2" />
                  <span v-else>{{ scope.row['month'+item+'Amount'] | numFormat(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sumAmount" :label="$t('fee.promotion.sumAmount')" min-width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.sumAmount | numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="expenseRate" :label="$t('fee.promotion.expenseRate')" min-width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.expenseRate ? scope.row.expenseRate + '%' : '' }}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <!-- <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{ $t('fee.promotion.discussResult') }}</span>
          <div class="add_table_row">
            <el-button class="editbtn" size="mini" @click.stop="handleAddDetail()">
              {{ $t('comm.addLine') }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="motion.discussResultList"
            style="margin-bottom: 20px;"
            border
            stripe
          >
            <el-table-column :label="$t('fee.promotion.reportDate')" min-width="100">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.reportDate" />
              </template>
            </el-table-column>
            <el-table-column prop="isFixWithMotion" :label="$t('fee.promotion.isFixWithMotion')" min-width="100">
              <template slot-scope="scope">
                <el-select v-model="scope.row.isFixWithMotion" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in isNoWait"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('fee.promotion.discussContent')" min-width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.discussContent" type="textarea" rows="3" />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('comm.operation')"
              min-width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '3')" />
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item> -->
        <el-collapse-item name="6">
          <span slot="title" class="collapse-title">{{ $t('comm.attachmentFile') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('comm.attachmentInfo') }}
              </div>
              <div class="input">
                <attachement v-model="fileList" func-div="motion" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <span slot="title" class="collapse-title">{{ $t('fee.promotion.remark') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('fee.promotion.remark') }}
              </div>
              <div class="input">
                <el-input v-model="motion.remark" type="textarea" :rows="3" height="200px" />
              </div>
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
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
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
    <div>
      <product-pop :is-show="skuSelectDialog" @cancel="skuSelectDialog=false" @select="handleSkuSelect" />
      <expenseAccount-pop :is-show="expenseAccountSelectDialog" @cancel="expenseAccountSelectDialog=false" @select="handleExpenseAccountSelect" />
      <expenseUseStatus-pop :is-show="expenseUseStatusSelectDialog" :type="popType" @cancel="expenseUseStatusSelectDialog=false" />
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
        <update-his :key="motion.identiferNum" func-div="motion" :identifer-num="motion.identiferNum" />
      </el-drawer>
    </div>
    <!-- 门店选择弹窗 -->
    <el-dialog
      title="门店选择"
      :visible.sync="shopDialogShow"
      custom-class="content-dialog-userSelect"
      append-to-body
      width="25%"
      :close-on-click-modal="false"
    >
      <div style="height: 450px">
        <el-tree
          default-expand-all
          :data="dataShop"
          show-checkbox
          node-key="id"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { numFormat } from '@/mixins/num-format'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import ProductPop from '@/views/mdm/product/components/ProductPop'
import ExpenseAccountPop from '@/views/fee/promotion/components/ExpenseAccountPop'
import ExpenseUseStatusPop from '@/views/fee/promotion/components/ExpenseUseStatusPop'
import UserSelect from '@/components/UserSelect.vue'
import { dateFormat, numberFormat } from '@/utils/util'
// import DepartmentSelect from '@/components/DepartmentSelect.vue'
import DictRadio from '@/components/DictRadio.vue'
export default {
  name: 'MotionEdit',
  components: { ProductPop, ExpenseAccountPop, ExpenseUseStatusPop, UserSelect, RelFuncSelect, DictRadio },
  mixins: [names, formValidator, permission, dict, numFormat],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      processDialog: false,
      skuSelectDialog: false,
      expenseAccountSelectDialog: false,
      popType: '',
      expenseUseStatusSelectDialog: false,
      sellinMonthTable: false,
      width: '',
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '18'],
      motion: {
        discountList: [],
        expenseList: [],
        recordDateList: [],
        discussResultList: [{}],
        // discountStartDate: null,
        // discountEndDate: Date(),
        monthHeader: [],
        sellinMonthList: {
          header: [],
          percent: [{}]
        },
        processInstId: '',
        attrs: {
        },
        details: []
      },
      fileList: [],
      approveHisDialog: false,
      isNoWait: [{
        value: '0',
        label: '待定'
      }, {
        value: '1',
        label: '是'
      }, {
        value: '2',
        label: '否'
      }],
      channel: [{
        value: '1',
        label: 'KA'
      }, {
        value: '2',
        label: 'DB'
      }, {
        value: '3',
        label: 'EC'
      }],
      department: [{
        value: '1',
        label: 'EC&新零售部'
      }, {
        value: '2',
        label: 'KA部'
      }, {
        value: '3',
        label: '日系客户部'
      },
      {
        value: '4',
        label: '华东地区'
      }, {
        value: '5',
        label: '华北地区'
      }, {
        value: '6',
        label: '华南地区'
      }, {
        value: '7',
        label: '西南地区'
      }],
      motionType: [{
        value: '1',
        label: '活动提案'
      }, {
        value: '2',
        label: '长期折扣'
      }],
      shopDialogShow: false,
      dataShop: [
        {
          id: 1,
          label: '家乐福',
          children: [
            {
              id: 3,
              label: '浦东路店'
            },
            {
              id: 2,
              label: '黄浦路店'
            }
          ]
        },
        {
          id: 4,
          label: 'CBD',
          children: [
            {
              id: 5,
              label: '离店家嘉兴DC仓-华润物流配送中心'
            },
            {
              id: 6,
              label: '静安区店'
            }
          ]
        },
        {
          id: 7,
          label: '乐购',
          children: [
            {
              id: 8,
              label: '闸北路店'
            },
            {
              id: 9,
              label: '高新区店'
            },
            {
              id: 8,
              label: '闸北路店'
            },
            {
              id: 9,
              label: '高新区店2'
            },
            {
              id: 8,
              label: '离店家嘉兴DC仓-华润物流配送中心'
            },
            {
              id: 9,
              label: '高新区店3'
            }
          ]
        }
      ]
    }
  },
  computed: {
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    }
  },
  watch: {
    'motion.expenseList': {
      handler(val, oldVal) {
        this.motion.expenseList.forEach((item, index) => {
          item.children.forEach((item1, index) => {
            item1.children.forEach((item2, index) => {
              let sum = 0
              for (const month of this.motion.monthHeader) {
                sum += Number(item2['month' + month + 'Amount'])
              }
              item2['sumAmount'] = sum
              if (sum > 0) {
                item2.expenseRate = 4
              }
            })
          })
        })
        this.motion.expenseList.forEach((item, index) => {
          item.children.forEach((item1, index) => {
            for (const month of this.motion.monthHeader) {
              const sum = item1.children.map(e => !e['month' + month + 'Amount'] ? '' : parseFloat(e['month' + month + 'Amount']), 2)
              item1['month' + month + 'Amount'] = sum.reduce((sum, tmp) => sum + tmp)
            }
            const sum = item1.children.map(e => !e['sumAmount'] ? '' : parseFloat(e['sumAmount']), 2)
            item1['sumAmount'] = sum.reduce((sum, tmp) => sum + tmp)
            if (item1['sumAmount']) {
              item1.expenseRate = 4
            }
          })
        })
      },
      deep: true
    }
  },
  async created() {
    if (this.id) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.motion.processInstId = 'test'
      this.motion.identiferNum = 'PRO20120001'
      this.motion.department = 'KA部'
      this.motion.channel = 'KA'
      this.motion.accountNum = '沃尔玛'
      this.motion.user = '张三'
      this.motion.brand = '芙丽芳丝'
      this.motion.startDate = '2020-12-31'
      this.motion.endDate = '2021-12-31'
      this.motion.sellinTargetAmount = '23万元'
      this.motion.selloutTargetAmount = '12万元'
      this.motion.theme = '均一价'
      this.motion.bdmk = '0'
      this.motion.purpose = '提供符合客户主题活动单品，带动芙丽芳丝全品销售，提升知名度'
      this.motion.yearMonth = '2021-03'
      this.motion.content = '均一价9.9元'
      this.motion.stores = 12
      this.motion.sumStores = 21
      this.motion.form = '线下开展'
      this.motion.remark = '活动展开'
      this.motion.discountStartDate = '2020-12-31'
      this.motion.discountEndDate = '2021-12-31'
      this.motion.relIdentiferNum = 'PRO20120003'

      this.motion.recordDateList.push({
        yearMonth: '2021-01',
        salesAmount: '2342.34',
        expenseAmount: '234.5'
      })
      this.motion.recordDateList.push({
        yearMonth: '2021-02',
        salesAmount: '32323',
        expenseAmount: '2222'
      })
      this.motion.recordDateList.push({
        yearMonth: '2021-03',
        salesAmount: '3422',
        expenseAmount: '123.5'
      })
      this.motion.discountList = []
      for (var i = 0; i < 6; i++) {
        this.motion.discountList.push({
          materielNum: '99012' + (i + 1),
          relMaterielNum: '99002' + (i + 1),
          materielName: '物料0' + (i + 1),
          spec: '箱/10包',
          planCaseQty: (i + 1) * 100,
          planAmount: (i + 1) * 4,
          purchasePrice: (100 * Math.random()).toFixed(2),
          retailPrice: (200 * Math.random()).toFixed(2),
          grossProfit: (100 * Math.random()).toFixed(0),
          retailSalePrice: (150 * Math.random()).toFixed(0)
        })
      }
      this.handleTrial()
      this.isLoading = false
    },
    handleSubmit(submitType) {
      // for (const ref in this.$refs) {
      //   if (this.$refs[ref] && this.$refs[ref].length > 0) {
      //     const obj = this.$refs[ref][0]
      //     // 页面嵌套vue组件调用验证方法
      //     if (obj.hasOwnProperty('validatorAll')) {
      //       this.$refs[ref][0].validatorAll()
      //       if (!this.$refs[ref][0].validatorState) return false
      //     } else {
      //       // 本页面调用验证方法
      //       if (!this.validator(ref)) return false
      //     }
      //   }
      // }

    },
    handleBack() {
      this.$router.go(-1)
    },
    // SKU查询
    handleSkuSelect(products) {
      this.motion.discountList = []
      for (var i = 1; i < 6; i++) {
        this.motion.discountList.push({
          materielNum: '99012' + (i + 1),
          relMaterielNum: '99002' + (i + 1),
          materielName: '物料0' + (i + 1),
          spec: '箱/10包',
          planCaseQty: (i + 1) * 100,
          planAmount: (i + 1) * 4,
          purchasePrice: (100 * Math.random()).toFixed(2),
          retailPrice: (200 * Math.random()).toFixed(2),
          grossProfit: (100 * Math.random()).toFixed(0),
          retailSalePrice: (150 * Math.random()).toFixed(0)
        })
        this.skuSelectDialog = false
      }
    },
    handleAddDetail(type) {
      this.motion.discussResultList.push({
        reportDate: '',
        isFixWithMotion: '',
        discussContent: ''
      })
      // if (type === '1') {
      //   this.motion.recordDateList.push({
      //     yearMonth: '',
      //     salesAmount: '',
      //     expenseAmount: ''
      //   })
      // }
    },
    // 费用科目查询
    handleExpenseAccountSelect(accounts) {
      this.motion.expenseList = []
      var expenseType = [
        {
          type: 'BDT',
          account: [
            {
              code: '820-0100S1',
              name: '新品进场费(支付)'
            },
            {
              code: '820-0210S1',
              name: '堆头陈列费(支付)'
            },
            {
              code: '820-0223S1',
              name: '固定货架陈列费(支付)'
            }
          ]
        },
        {
          type: 'BDMK',
          account: [
            {
              code: '820-1363S1',
              name: 'EC代理商运费补贴'
            },
            {
              code: '820-1410',
              name: '活动促销赠品--外部采购'
            },
            {
              code: '820-141001',
              name: '促销活动赠品-产品领用'
            }
          ]
        }
      ]

      this.motion.expenseList = []
      var children = []
      for (var i = 1; i < 3; i++) {
        var d = {
          id: i,
          expenseType: expenseType[i - 1].type,
          month2Amount: '',
          month3Amount: '',
          month4Amount: '',
          month5Amount: '',
          sumAmount: '',
          expenseRate: '',
          children: []
        }
        for (var j = 1; j < 4; j++) {
          children = {
            id: i + '0' + j,
            expenseAccount: expenseType[i - 1].account[j - 1].code,
            expenseAccountName: expenseType[i - 1].account[j - 1].name,
            month2Amount: '',
            month3Amount: '',
            month4Amount: '',
            month5Amount: '',
            sumAmount: 0,
            expenseRate: '',
            children: []
          }
          children.children = [
            { id: i + '0' + j + '1', subBrandNum: 'Sub001', subBrandName: '乐而雅-Sub001', parent: expenseType[i - 1].account[j - 1].code,
              month2Amount: '',
              month3Amount: '',
              month4Amount: '',
              month5Amount: '',
              sumAmount: 0,
              expenseRate: '' },
            { id: i + '0' + j + '2', subBrandNum: 'Sub002', subBrandName: '乐而雅-Sub002', parent: expenseType[i - 1].account[j - 1].code,
              month2Amount: '',
              month3Amount: '',
              month4Amount: '',
              month5Amount: '',
              sumAmount: 0,
              expenseRate: '' }]

          d.children.push(children)
        }
        this.motion.expenseList.push(d)
      }
      this.expenseAccountSelectDialog = false
    },
    // Sell-in计入月
    handleSellinMonth() {
      this.motion.monthHeader = []
      const startMonth = Number(dateFormat(new Date(this.motion.discountStartDate), 'M'))
      let endMonth = Number(dateFormat(new Date(this.motion.discountEndDate), 'M'))
      if (startMonth > endMonth) {
        endMonth = endMonth + 12
      }
      for (var i = startMonth; i <= endMonth; i++) {
        this.motion.monthHeader.push(i === 12 ? 12 : i % 12)
      }
      this.sellinMonthTable = true
      this.motion.sellinMonthList.percent = [{}]
      this.width = 150 + this.motion.monthHeader.length * 150
    },
    // 活动折扣使用状况查询
    handleDiscountSearch() {
      this.popType = '1'
      this.expenseUseStatusSelectDialog = true
    },
    // 活动折扣使用状况查询
    handleExpenseSearch() {
      this.popType = '2'
      this.expenseUseStatusSelectDialog = true
    },
    handleDeleteDetail(index, type, id) {
      if (type === '1') {
        this.motion.discountList.splice(index, 1)
      } else if (type === '2') {
        this.motion.expenseList.some((item1, i) => {
          if (item1.id === id) {
            this.motion.expenseList.splice(i, 1)
            return true
          } else {
            item1.children.some((item2, j) => {
              if (item2.id === id) {
                item1.children.splice(j, 1)
                if (!item1.children || item1.children.length === 0) {
                  this.motion.expenseList.splice(i, 1)
                }
                return
              } else {
                item2.children.some((item3, m) => {
                  if (item3.id === id) {
                    item2.children.splice(m, 1)
                    if (!item2.children || item2.children.length === 0) {
                      item1.children.splice(j, 1)
                    }
                    return
                  }
                })
              }
            })
          }
        })
        // this.motion.expenseList.splice(index, 1)
        // if (this.motion.discussResultList.length === 0) {
        //   this.motion.discussResultList = [{}]
        // }
      }
    },
    getSummaries() {
      const totals = []
      const planCaseQtySum = this.motion.discountList.map(item => isNaN(item.planCaseQty) ? 0 : item.planCaseQty, 2)
      const planAmountSum = this.motion.discountList.map(item => isNaN(item.planAmount) ? 0 : item.planAmount, 2)

      totals[9] = '合计'
      if (planCaseQtySum && planCaseQtySum.length > 0) {
        totals[10] = numberFormat(planCaseQtySum.reduce((sum1, item) => sum1 + item), 0)
      }
      if (planAmountSum && planAmountSum.length > 0) {
        totals[11] = numberFormat(planAmountSum.reduce((sum1, item) => sum1 + item), 3)
      }
      let index = 12
      for (const month of this.motion.monthHeader) {
        const sellinSum = this.motion.discountList.map(item => isNaN(this.motion.sellinMonthList.percent[0][month]) ? 0 : (item.planCaseQty * Number(this.motion.sellinMonthList.percent[0][month]) / 100), 2)
        totals[index] = numberFormat(sellinSum.reduce((sum1, item) => sum1 + item), 2)
        index++
      }
      return totals
    },
    getExpenseSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 5) {
          sums[index] = '合计'
          return
        }

        if (column.property && column.property.endsWith('Amount')) {
          let values = []
          data.forEach((item) => {
            values = values.concat(item.children.map(item => Number(item[column.property])))
          })
          sums[index] = numberFormat(values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0), 2)
          sums[index]
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}
</script>
