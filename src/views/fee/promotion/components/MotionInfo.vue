<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span
          class="pagespan"
        >{{ $t("fee.promotion.identiferNum") }}:
          {{ motion.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{
            $t("comm.essentialInformation")
          }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("fee.promotion.motionType") }}
              </div>
              <div class="input">
                <el-select
                  v-model="motion.motionType"
                  placeholder="请选择"
                  :disabled="true"
                >
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
                {{ $t("fee.promotion.department") }}
              </div>
              <div class="input">
                <!-- <el-input v-model="motion.department" /> -->
                <!-- <department-select v-model="motion.department" :disabled="true" /> -->
                <el-select
                  v-model="motion.department"
                  placeholder="请选择"
                  :disabled="true"
                >
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
                {{ $t("fee.promotion.user") }}
              </div>
              <div class="input">
                <user-select v-model="motion.user" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("fee.promotion.accountNum") }}
              </div>
              <div class="input">
                <rel-func-select
                  v-model="motion.accountNum"
                  :rel-func="'account'"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("fee.promotion.channel") }}
              </div>
              <div class="input">
                <!-- <el-input v-model="motion.channel" /> -->
                <el-select
                  v-model="motion.channel"
                  placeholder="请选择"
                  :disabled="true"
                  clearable
                >
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
                {{ $t("fee.promotion.brand") }}
              </div>
              <div class="input">
                <el-input v-model="motion.brand" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("fee.promotion.bdmk") }}
              </div>
              <div class="input">
                <dict-radio
                  v-model="motion.bdmk"
                  class="input"
                  dict-type-id="IsContain"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("fee.promotion.startDate") }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="motion.startDate"
                  size="small"
                  :disabled="true"
                  value-format="yyyy-MM-dd"
                  format="yyyy-M-d"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("fee.promotion.endDate") }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="motion.endDate"
                  size="small"
                  :disabled="true"
                  value-format="yyyy-MM-dd"
                  format="yyyy-M-d"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("fee.promotion.theme") }}
              </div>
              <div class="input">
                <el-input v-model="motion.theme" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title" />
              <div class="input">
                {{ $t("fee.promotion.sellinTargetAmount") }}
              </div>
              <div class="input">
                <el-input
                  v-model="motion.sellinTargetAmount"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("fee.promotion.purpose") }}
              </div>
              <div class="input">
                <el-input v-model="motion.purpose" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title" />
              <div class="input">
                {{ $t("fee.promotion.selloutTargetAmount") }}
              </div>
              <div class="input">
                <el-input
                  v-model="motion.selloutTargetAmount"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("fee.promotion.relIdentiferNum") }}
              </div>
              <div class="input">
                <router-link
                  :to="{
                    path: '/fee/promotion/motionDetail',
                    query: { id: motion.relIdentiferNum },
                  }"
                >
                  {{ motion.relIdentiferNum }}
                </router-link>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{
            $t("fee.promotion.detailInfo")
          }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("fee.promotion.content") }}
              </div>
              <div class="input">
                <el-input v-model="motion.content" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("fee.promotion.form") }}
              </div>
              <div class="input">
                <el-input v-model="motion.form" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("fee.promotion.stores") }}
              </div>
              <div class="input">
                <el-input v-model="motion.stores" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("fee.promotion.sumStores") }}
              </div>
              <div class="input">
                <el-input
                  v-model="motion.sumStores"
                  placeholder="TG店数+固定架店数"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex4">
              <div class="title">
                {{ $t("fee.promotion.discountStartDate") }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="motion.discountStartDate"
                  :disabled="true"
                  size="small"
                  value-format="yyyy-MM-dd"
                  format="yyyy-M-d"
                />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                {{ $t("fee.promotion.discountEndDate") }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="motion.discountEndDate"
                  :disabled="true"
                  size="small"
                  value-format="yyyy-MM-dd"
                  format="yyyy-M-d"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          v-if="type === 'shopUpdate' || type === 'detail'"
          name="18"
        >
          <span slot="title" class="collapse-title">门店选择</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                门店
                <span>
                  <a
                    v-if="type === 'shopUpdate'"
                    class="el-icon-circle-plus-outline"
                    @click="shopDialogShow = true"
                  />
                </span>
              </div>
              <div class="input">
                <el-input
                  v-model="shops"
                  readonly
                  :disabled="type === 'detail'"
                  type="textarea"
                  maxlength="256"
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{
            $t("fee.promotion.activityDiscount")
          }}</span>
          <el-table
            ref="table"
            :data="motion.sellinMonthList.percent"
            :style="'margin-bottom: 20px;width:' + width + 'px'"
            :header-cell-style="{ 'text-align': 'center' }"
            border
          >
            <el-table-column
              :label="$t('fee.promotion.sellinIncludeMonth')"
              width="150"
              align="center"
            >
              <template>
                {{ $t("fee.promotion.ratio") }}
              </template>
            </el-table-column>
            <el-table-column
              v-for="item in motion.monthHeader"
              :key="item"
              :label="item + '月'"
              width="150"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row[item] + "%" }}
              </template>
            </el-table-column>
          </el-table>
          <div class="add_table_row">
            <el-button
              class="editbtn"
              size="mini"
              @click.stop="handleDiscountSearch"
            >
              {{ $t("fee.promotion.discountUseStatusSearch") }}
            </el-button>
            <el-button class="editbtn" size="mini">
              Excel导出
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="motion.discountList"
            :header-cell-style="{ 'text-align': 'center' }"
            show-summary
            :summary-method="getSummaries"
            border
            stripe
          >
            <el-table-column
              prop="salesOffice"
              :label="$t('fee.promotion.salesOffice')"
              min-width="130"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="identiferNum"
              :label="$t('fee.promotion.accountGroupSoldToNum')"
              min-width="130"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="name"
              :label="$t('fee.promotion.accountGroupSoldToName')"
              min-width="150"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="materielNum"
              :label="$t('fee.promotion.materielNum')"
              min-width="100"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="relMaterielNum"
              :label="$t('fee.promotion.relMaterielNum')"
              min-width="100"
              align="center"
            />
            <el-table-column
              prop="materielName"
              :label="$t('fee.promotion.materielName')"
              min-width="100"
              align="center"
            />
            <el-table-column
              prop="spec"
              :label="$t('fee.promotion.spec')"
              min-width="100"
              align="center"
            />
            <el-table-column
              :label="$t('fee.promotion.frequencySum')"
              align="center"
            >
              <el-table-column
                prop="firstHalfYearFrequency"
                :label="$t('fee.promotion.firstHalfYearFrequency')"
                width="80"
                align="center"
              />
              <el-table-column
                prop="secondHalfYearFrequency"
                :label="$t('fee.promotion.secondHalfYearFrequency')"
                width="80"
                align="center"
              />
            </el-table-column>
            <el-table-column
              prop="discountRate"
              :label="$t('fee.promotion.discountRate')"
              min-width="80"
              align="right"
            />
            <el-table-column
              prop="planCaseQty"
              :label="$t('fee.promotion.planCaseQty')"
              min-width="80"
              align="right"
            />
            <el-table-column
              prop="planAmount"
              :label="$t('fee.promotion.planAmount')"
              min-width="80"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.planAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column
              v-for="item in motion.monthHeader"
              :key="item"
              :label="item + '月Sell-in计入数'"
              align="right"
              min-width="120"
            >
              <template slot-scope="scope">
                {{
                  isNaN(
                    motion.sellinMonthList.percent[0][item] *
                      scope.row.planCaseQty
                  )
                    ? ""
                    : ((motion.sellinMonthList.percent[0][item] *
                      scope.row.planCaseQty) /
                      100)
                    | numFormat(2)
                }}
              </template>
            </el-table-column>
            <!-- 估计更新填写 -->
            <template
              v-if="
                type === 'estUpdate' ||
                  type === 'detail' ||
                  type === 'payUpdate'
              "
            >
              <el-table-column
                v-for="item1 in motion.monthHeader"
                :key="'est' + item1"
                :label="item1 + '月估计'"
                align="center"
                width="150"
              >
                <el-table-column
                  :prop="'estMonth' + item1 + 'Qty'"
                  :label="$t('fee.promotion.qty')"
                  width="80"
                  align="right"
                >
                  <template slot-scope="scope">
                    <milli-input
                      v-if="
                        type === 'estUpdate' && Number(item1) > currentMonth
                      "
                      v-model="scope.row['estMonth' + item1 + 'Qty']"
                    />
                    <span v-else>
                      {{
                        scope.row["estMonth" + item1 + "Qty"] | numFormat(0)
                      }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :prop="'estMonth' + item1 + 'Amount'"
                  :label="$t('fee.promotion.amount')"
                  width="80"
                  align="right"
                >
                  <template slot-scope="scope">
                    <milli-input
                      v-if="
                        type === 'estUpdate' && Number(item1) > currentMonth
                      "
                      v-model="scope.row['estMonth' + item1 + 'Amount']"
                      to-fixed-num="2"
                    />
                    <span v-else>
                      {{
                        scope.row["estMonth" + item1 + "Amount"] | numFormat(2)
                      }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label="$t('fee.promotion.estSum')"
                align="right"
                width="150"
              >
                <el-table-column
                  prop="estSumQty"
                  :label="$t('fee.promotion.qty')"
                  width="80"
                  align="right"
                >
                  <template slot-scope="scope">
                    {{ scope.row.estSumQty | numFormat(0) }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="estSumAmount"
                  :label="$t('fee.promotion.amount')"
                  width="80"
                  align="right"
                >
                  <template slot-scope="scope">
                    {{ scope.row.estSumAmount | numFormat(2) }}
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
            <!-- 补差更新填写 -->
            <template v-if="type === 'payUpdate' || type === 'detail'">
              <el-table-column
                v-for="item2 in motion.monthHeader"
                :key="'pay' + item2"
                prop="paySumAmount"
                :label="item2 + '月实绩'"
                align="center"
                width="150"
              >
                <!-- <el-table-column :label="$t('fee.promotion.qty')" width="80" align="right">
                  <template slot-scope="scope">
                    <milli-input v-if="type==='payUpdate'" v-model="scope.row['payMonth'+ item2 + 'Qty']" />
                    <span v-else> {{ scope.row['payMonth'+ item2 + 'Qty'] | numFormat(0) }}</span>
                  </template>
                </el-table-column> -->
                <el-table-column
                  :prop="'payMonth' + item2 + 'Amount'"
                  :label="$t('fee.promotion.amount')"
                  width="80"
                  align="right"
                >
                  <template slot-scope="scope">
                    <milli-input
                      v-if="type === 'payUpdate'"
                      v-model="scope.row['payMonth' + item2 + 'Amount']"
                      to-fixed-num="2"
                    />
                    <span v-else>
                      {{
                        scope.row["payMonth" + item2 + "Amount"] | numFormat(2)
                      }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="'实绩合计'" align="right" width="150">
                <!-- <el-table-column :label="$t('fee.promotion.qty')" width="80" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.paySumQty | numFormat(0) }}
                  </template>
                </el-table-column> -->
                <el-table-column
                  prop="paySumAmount"
                  :label="$t('fee.promotion.amount')"
                  width="80"
                  align="right"
                >
                  <template slot-scope="scope">
                    {{ scope.row.paySumAmount | numFormat(2) }}
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
            <el-table-column
              prop="discountPeriod"
              :label="$t('fee.promotion.discountPeriod')"
              min-width="150"
              align="center"
            />
            <el-table-column
              prop="promotionPeriod"
              :label="$t('fee.promotion.promotionPeriod')"
              min-width="150"
              align="center"
            />
            <el-table-column
              prop="modeDMYellowCard"
              :label="$t('fee.promotion.modeDMYellowCard')"
              min-width="100"
              align="center"
            />
            <el-table-column
              prop="purchasePrice"
              :label="$t('fee.promotion.purchasePrice')"
              min-width="100"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.purchasePrice | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="retailPrice"
              :label="$t('fee.promotion.retailPrice')"
              min-width="100"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.retailPrice | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="grossProfit"
              :label="$t('fee.promotion.grossProfit')"
              min-width="100"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.grossProfit }}%
              </template>
            </el-table-column>
            <el-table-column
              prop="retailSalePrice"
              :label="$t('fee.promotion.retailSalePrice')"
              min-width="150"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.retailSalePrice | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="guideRetailPrice"
              :label="$t('fee.promotion.guideRetailPrice')"
              min-width="100"
              align="center"
            >
              <template> GuideLine </template>
            </el-table-column>
          </el-table>
          <div
            v-if="type === 'detail'"
            class="input_box"
            style="margin-top: 10px"
          >
            <div class="flex3">
              <div class="title">
                Saledeal_NO
              </div>
              <div class="input">
                <el-input v-model="motion.saledealNo" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-if="motion.motionType === '1'" name="4">
          <span slot="title" class="collapse-title">{{
            $t("fee.promotion.expense")
          }}</span>
          <div class="add_table_row">
            <el-button
              class="editbtn"
              size="mini"
              @click.stop="handleExpenseSearch"
            >
              {{ $t("fee.promotion.expenseUseStatusSearch") }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="motion.expenseList"
            style="margin-bottom: 20px"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            row-key="id"
            show-summary
            :summary-method="getExpenseSummaries"
            border
            stripe
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              prop="expenseType"
              :label="$t('fee.promotion.expenseType')"
              min-width="100"
              align="rignt"
            />
            <el-table-column
              prop="expenseAccount"
              :label="$t('fee.promotion.expenseAccount')"
              min-width="100"
              align="center"
            />
            <el-table-column
              prop="expenseAccountName"
              :label="$t('fee.promotion.expenseAccountName')"
              min-width="150"
              align="center"
            />
            <el-table-column
              prop="subBrandNum"
              :label="$t('fee.promotion.subBrandNum')"
              min-width="150"
              align="center"
            />
            <el-table-column
              prop="subBrandName"
              :label="$t('fee.promotion.subBrandName')"
              min-width="150"
              align="center"
            />
            <el-table-column
              :label="$t('fee.promotion.motionAmount')"
              align="right"
            >
              <el-table-column
                v-for="item in motion.monthHeader"
                :key="item"
                :prop="'month' + item + 'Amount'"
                :label="item + '月计入金额'"
                min-width="100"
                align="right"
              >
                <template slot-scope="scope">
                  {{ scope.row["month" + item + "Amount"] | numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="sumAmount"
                :label="$t('fee.promotion.sumAmount')"
                min-width="100"
                align="right"
              >
                <template slot-scope="scope">
                  {{ scope.row.sumAmount | numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('fee.promotion.expenseRate')"
                min-width="100"
                align="right"
              >
                <template slot-scope="scope">
                  {{ scope.row.expenseRate ? scope.row.expenseRate + "%" : "" }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="
                type === 'estUpdate' ||
                  type === 'detail' ||
                  type === 'payUpdate'
              "
              :label="$t('fee.promotion.estAmount')"
              align="right"
            >
              <el-table-column
                v-for="item1 in motion.monthHeader"
                :key="'est' + item1"
                :prop="'estMonth' + item1 + 'Amount'"
                :label="item1 + '月计入金额'"
                width="100"
                align="right"
              >
                <template slot-scope="scope">
                  <milli-input
                    v-if="
                      type === 'estUpdate' &&
                        Number(item1) > currentMonth &&
                        !!scope.row.subBrandNum
                    "
                    v-model="scope.row['estMonth' + item1 + 'Amount']"
                    to-fixed-num="2"
                  />
                  <span v-else>
                    {{
                      scope.row["estMonth" + item1 + "Amount"] | numFormat(2)
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="estSumAmount"
                :label="$t('fee.promotion.sumAmount')"
                min-width="100"
                align="right"
              >
                <template slot-scope="scope">
                  {{ scope.row.estSumAmount | numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="estExpenseRate"
                :label="$t('fee.promotion.expenseRate')"
                min-width="100"
                align="right"
              >
                <template slot-scope="scope">
                  {{
                    scope.row.estExpenseRate
                      ? scope.row.estExpenseRate + "%"
                      : ""
                  }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="type === 'payUpdate' || type === 'detail'"
              :label="'支付金额'"
              align="right"
            >
              <el-table-column
                v-for="item2 in motion.monthHeader"
                :key="'pay' + item2"
                :prop="'payMonth' + item2 + 'Amount'"
                :label="item2 + '月支付金额'"
                width="100"
                align="right"
              >
                <template slot-scope="scope">
                  <milli-input
                    v-if="type === 'payUpdate' && !!scope.row.subBrandNum"
                    v-model="scope.row['payMonth' + item2 + 'Amount']"
                    to-fixed-num="2"
                  />
                  <span v-else>
                    {{
                      scope.row["payMonth" + item2 + "Amount"] | numFormat(2)
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="paySumAmount"
                :label="$t('fee.promotion.sumAmount')"
                min-width="100"
                align="right"
              >
                <template slot-scope="scope">
                  {{ scope.row.paySumAmount | numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="payExpenseRate"
                :label="$t('fee.promotion.expenseRate')"
                min-width="100"
                align="right"
              >
                <template slot-scope="scope">
                  {{
                    scope.row.payExpenseRate
                      ? scope.row.payExpenseRate + "%"
                      : ""
                  }}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{
            $t("fee.promotion.discussResult")
          }}</span>
          <div v-if="type === 'discuss'" class="add_table_row">
            <el-button
              class="editbtn"
              size="mini"
              @click.stop="handleAddDetail()"
            >
              {{ $t("comm.addLine") }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="motion.discussResultList"
            style="margin-bottom: 20px"
            width="150px"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            border
            stripe
          >
            <el-table-column
              v-if="type === 'discuss'"
              :label="$t('comm.operation')"
              width="70"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDeleteDetail(scope.$index)"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('fee.promotion.reportDate')"
              width="150"
            >
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.reportDate"
                  :disabled="type !== 'discuss'"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('fee.promotion.isFixWithMotion')"
              width="150"
            >
              <template slot-scope="scope">
                <!-- <dict-select v-model="scope.row.isFixWithMotion" dict-type-id="IsNo" /> -->
                <el-select
                  v-model="scope.row.isFixWithMotion"
                  placeholder="请选择"
                  :disabled="type !== 'discuss'"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in isNoWait"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('fee.promotion.discussContent')"
              min-width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.discussContent"
                  type="textarea"
                  rows="1"
                  :disabled="type !== 'discuss'"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="6">
          <span slot="title" class="collapse-title">{{
            $t("comm.attachmentFile")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("comm.attachmentInfo") }}
              </div>
              <div class="input">
                <attachement v-model="fileList" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <span slot="title" class="collapse-title">{{
            $t("fee.promotion.remark")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("fee.promotion.remark") }}
              </div>
              <div class="input">
                <el-input
                  v-model="motion.remark"
                  type="textarea"
                  :rows="3"
                  height="200px"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-if="$route.query.id === '1'" name="9">
          <span slot="title" class="collapse-title">{{
            $t("admin.org.deleteFlag")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("fee.promotion.cancelReason") }}
              </div>
              <div class="input">
                <el-input
                  v-model="motion.cancelReason"
                  type="textarea"
                  :rows="3"
                  height="200px"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-if="type === 'approve'" name="8">
          <span slot="title" class="collapse-title">SaleDeal填写</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("fee.promotion.saledealNo") }}
              </div>
              <div class="input">
                <el-input v-model="motion.saledealNo1" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div>
      <expenseUseStatus-pop
        :is-show="expenseUseStatusSelectDialog"
        :type="popType"
        @cancel="expenseUseStatusSelectDialog = false"
      />
      <!-- 门店选择弹窗 -->
      <el-dialog
        title="门店选择"
        :visible.sync="shopDialogShow"
        :close-on-click-modal="false"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        center
      >
        <div class="tree_box" style="height: 340px; overflow-x: auto">
          <el-tree
            ref="tree"
            default-expand-all
            :data="dataShop"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span
              class="operation-circle circle-middle-btn btn-light-color bluebg"
            ><i
              class="iconfont iconquxiao"
            /></span>
            <span class="operation-text">{{ $t("comm.cancel") }}</span>
          </li>
          <li class="operation-item" @click="handleClearClick">
            <span
              class="operation-circle circle-middle-btn btn-light-color bluebg"
            ><i
              class="iconfont iconrefresh"
            /></span>
            <span class="operation-text">{{ $t("comm.clear") }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick">
            <span
              class="operation-circle circle-middle-btn btn-light-color bluebg"
            ><i
              class="iconfont iconqueren"
            /></span>
            <span class="operation-text">{{ $t("comm.certain") }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { numFormat } from '@/mixins/num-format'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
import DictRadio from '@/components/DictRadio.vue'
import { dateFormat, numberFormat } from '@/utils/util'
import ExpenseUseStatusPop from '@/views/fee/promotion/components/ExpenseUseStatusPop'
export default {
  name: 'MotionInfo',
  components: { UserSelect, RelFuncSelect, DictRadio, ExpenseUseStatusPop },
  mixins: [names, formValidator, permission, dict, numFormat],
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'detail'
    }
  },
  data() {
    return {
      isLoading: true,
      motionId: this.id,
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '18'],
      currentMonth: Number(dateFormat(new Date(), 'M')),
      shopDialogShow: false,
      popType: '',
      expenseUseStatusSelectDialog: false,
      motionType: [
        {
          value: '1',
          label: '活动提案'
        },
        {
          value: '2',
          label: '长期折扣'
        }
      ],
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
              id: 10,
              label: '闸北路店'
            },
            {
              id: 11,
              label: '高新区店2'
            },
            {
              id: 12,
              label: '离店家嘉兴DC仓-华润物流配送中心'
            },
            {
              id: 13,
              label: '高新区店3'
            }
          ]
        }
      ],
      motion: {
        discountList: [],
        expenseList: [],
        monthHeader: [],
        discussResultList: [{}],
        sellinMonthList: {
          percent: [{}]
        },
        cancelReason: '天气原因',
        attrs: {},
        details: []
      },
      fileList: [],
      shops: '',
      isNoWait: [
        {
          value: '0',
          label: '待定'
        },
        {
          value: '1',
          label: '是'
        },
        {
          value: '2',
          label: '否'
        }
      ],
      channel: [
        {
          value: '1',
          label: 'KA'
        },
        {
          value: '2',
          label: 'DB'
        },
        {
          value: '3',
          label: 'EC'
        }
      ],
      department: [
        {
          value: '2',
          label: 'KA部'
        },
        {
          value: '3',
          label: '日系客户部'
        },
        {
          value: '1',
          label: 'EC&新零售部'
        },
        {
          value: '4',
          label: '华东地区'
        },
        {
          value: '5',
          label: '华南地区'
        },
        {
          value: '6',
          label: '西南地区'
        },
        {
          value: '7',
          label: '华北地区'
        }
      ]
    }
  },
  watch: {
    'motion.discountList': {
      handler(val, oldVal) {
        this.motion.discountList.forEach((item, index) => {
          let estSumQty = 0
          let estSumAmount = 0
          let paySumAmount = 0
          for (const month of this.motion.monthHeader) {
            estSumQty += Number(item['estMonth' + month + 'Qty'])
            estSumAmount += Number(item['estMonth' + month + 'Amount'])
            paySumAmount += Number(item['payMonth' + month + 'Amount'])
          }
          item.estSumQty = estSumQty
          item.estSumAmount = estSumAmount
          item.paySumAmount = paySumAmount
        })
      },
      deep: true
    },
    'motion.expenseList': {
      handler(val, oldVal) {
        this.motion.expenseList.forEach((item, index) => {
          item.children.forEach((item1, index) => {
            item1.children.forEach((item2, index) => {
              let paySum = 0
              let estSum = 0
              for (const month of this.motion.monthHeader) {
                paySum += Number(item2['payMonth' + month + 'Amount'])
                estSum += Number(item2['estMonth' + month + 'Amount'])
              }
              item2['paySumAmount'] = paySum
              item2['estSumAmount'] = estSum
              item2['payExpenseRate'] = paySum > 0 ? '6' : ''
              item2['estExpenseRate'] = estSum > 0 ? '5' : ''
              item2['expenseRate'] = 4
            })
          })
        })
        this.motion.expenseList.forEach((item, index) => {
          item.children.forEach((item1, index) => {
            for (const month of this.motion.monthHeader) {
              let sum = item1.children.map(
                (e) =>
                  !e['estMonth' + month + 'Amount']
                    ? ''
                    : parseFloat(e['estMonth' + month + 'Amount']),
                2
              )
              item1['estMonth' + month + 'Amount'] = sum.reduce(
                (sum, tmp) => sum + tmp
              )
              sum = item1.children.map(
                (e) =>
                  !e['payMonth' + month + 'Amount']
                    ? ''
                    : parseFloat(e['payMonth' + month + 'Amount']),
                2
              )
              item1['payMonth' + month + 'Amount'] = sum.reduce(
                (sum, tmp) => sum + tmp
              )
              sum = item1.children.map(
                (e) =>
                  !e['month' + month + 'Amount']
                    ? ''
                    : parseFloat(e['month' + month + 'Amount']),
                2
              )
              item1['month' + month + 'Amount'] = sum.reduce(
                (sum, tmp) => sum + tmp
              )
            }
            let sum = item1.children.map(
              (e) => (!e['sumAmount'] ? '' : parseFloat(e['sumAmount'])),
              2
            )
            item1['sumAmount'] = sum.reduce((sum, tmp) => sum + tmp)

            sum = item1.children.map(
              (e) => (!e['estSumAmount'] ? '' : parseFloat(e['estSumAmount'])),
              2
            )
            item1['estSumAmount'] = sum.reduce((sum, tmp) => sum + tmp)

            sum = item1.children.map(
              (e) => (!e['paySumAmount'] ? '' : parseFloat(e['paySumAmount'])),
              2
            )
            item1['paySumAmount'] = sum.reduce((sum, tmp) => sum + tmp)

            item1['payExpenseRate'] = item1['paySumAmount'] > 0 ? '6' : ''
            item1['estExpenseRate'] = item1['estSumAmount'] > 0 ? '5' : ''
            item1['expenseRate'] = item1['sumAmount'] > 0 ? '4' : ''
          })
        })
      },
      deep: true
    }
  },
  async created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.shops = ''
      if (this.type === 'detail') {
        this.shops = '门店1，门店2'
      }
      this.motion.workflowProcessInstId = 'test'
      this.motion.motionType = Number(this.id) % 2 === 1 ? '1' : '2'
      this.motion.processInstId = 'test'
      this.motion.identiferNum = 'PRO20120001'
      this.motion.department = 'KA部'
      this.motion.saledealNo = 'SDL000001'
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
      this.motion.purpose =
        '提供符合客户主题活动单品，带动芙丽芳丝全品销售，提升知名度'
      this.motion.yearMonth = '2021-03'
      this.motion.content = '均一价9.9元'
      this.motion.stores = 12
      this.motion.sumStores = 21
      this.motion.form = '线下开展'
      this.motion.remark = '活动展开'
      this.motion.discountStartDate = '2020-03-01'
      this.motion.discountEndDate = '2021-05-31'
      this.motion.relIdentiferNum = 'PRO20120003'

      const startMonth = Number(
        dateFormat(new Date(this.motion.discountStartDate), 'M')
      )
      let endMonth = Number(
        dateFormat(new Date(this.motion.discountEndDate), 'M')
      )
      if (startMonth > endMonth) {
        endMonth = endMonth + 12
      }
      this.motion.monthHeader = []
      for (var m = startMonth; m <= endMonth; m++) {
        this.motion.monthHeader.push(m === 12 ? 12 : m % 12)
      }
      this.width = 150 + this.motion.monthHeader.length * 150
      this.motion.sellinMonthList.percent = [{ 3: 20, 4: 30, 5: 40 }]
      this.motion.discountList = []
      for (var i = 0; i < 6; i++) {
        var tmp = {
          identiferNum: 'ACC2012000' + (i + 1),
          salesOffice: 'Office0' + (i + 1),
          name: '售达方0' + (i + 1),
          materielNum: '99012' + (i + 1),
          relMaterielNum: '99002' + (i + 1),
          materielName: '物料0' + (i + 1),
          spec: '箱/10包',
          firstHalfYearFrequency: i + 1,
          secondHalfYearFrequency: i + 2,
          discountRate: (i + 1) * 10 + '%',
          planCaseQty: (i + 1) * 100,
          discountPeriod: '2021年' + (i + 1) + '月-2021年' + (i + 2) + '月',
          promotionPeriod: '2021年' + (i + 2) + '月-2021年' + (i + 3) + '月',
          modeDMYellowCard: 'DM',
          retailPrice: 5.8 * (i + 1),
          grossProfit: 5.8 * i,
          salePrice: 5.8 * (i + 2),
          purchasePrice: 4 * (i + 2),
          planAmount: 10 * i,
          retailSalePrice: 10 * i,
          estMonth2Amount: 200,
          estMonth3Amount: 300,
          estMonth4Amount: this.type === 'estUpdate' ? '' : 400,
          estMonth5Amount: this.type === 'estUpdate' ? '' : 500,
          estMonth2Qty: 20,
          estMonth3Qty: 30,
          estMonth4Qty: this.type === 'estUpdate' ? '' : 40,
          estMonth5Qty: this.type === 'estUpdate' ? '' : 50,
          payMonth2Amount: this.type === 'payUpdate' ? '' : 200,
          payMonth3Amount: this.type === 'payUpdate' ? '' : 300,
          payMonth4Amount: this.type === 'payUpdate' ? '' : 400,
          payMonth5Amount: this.type === 'payUpdate' ? '' : 500,
          payMonth2Qty: this.type === 'payUpdate' ? '' : 20,
          payMonth3Qty: this.type === 'payUpdate' ? '' : 30,
          payMonth4Qty: this.type === 'payUpdate' ? '' : 40,
          payMonth5Qty: this.type === 'payUpdate' ? '' : 50,
          month2Qty: 20,
          month3Qty: 30,
          month4Qty: 40,
          month5Qty: 50
        }

        this.motion.discountList.push(tmp)
      }

      this.setExpenseList()
      this.$emit('load', this.motion)
      this.isLoading = false
    },
    setExpenseList() {
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
            sumAmount: '',
            expenseRate: '',

            estMonth2Amount: '',
            estMonth3Amount: '',
            estMonth4Amount: '',
            estMonth5Amount: '',
            estSumAmount: '',
            estExpenseRate: '',

            payMonth2Amount: '',
            payMonth3Amount: '',
            payMonth4Amount: '',
            payMonth5Amount: '',
            payExpenseRate: '',
            paySumAmount: '',
            children: []
          }
          children.children = [
            {
              id: i + '0' + j + '1',
              subBrandNum: 'Sub001',
              subBrandName: '乐而雅-Sub001',
              month2Amount: 124,
              month3Amount: 224,
              month4Amount: 324,
              month5Amount: 424,
              sumAmount: 1096,
              expenseRate: 10,
              estMonth2Amount: 1100.45,
              estMonth3Amount: 1100,
              estMonth4Amount: this.type === 'estUpdate' ? '' : 1600.11,
              estMonth5Amount: this.type === 'estUpdate' ? '' : 700,
              estExpenseRate: this.type === 'estUpdate' ? '' : 9,
              payMonth2Amount: this.type === 'payUpdate' ? '' : 200,
              payMonth3Amount: this.type === 'payUpdate' ? '' : 300,
              payMonth4Amount: this.type === 'payUpdate' ? '' : 400,
              payMonth5Amount: this.type === 'payUpdate' ? '' : 500,
              payExpenseRate: this.type === 'payUpdate' ? '' : 14,
              parent: expenseType[i - 1].account[j - 1].code
            },
            {
              id: i + '0' + j + '2',
              subBrandNum: 'Sub002',
              subBrandName: '乐而雅-Sub002',
              month2Amount: 234,
              month3Amount: 444,
              month4Amount: 555,
              month5Amount: 666,
              sumAmount: 1899,
              expenseRate: 15,
              estMonth2Amount: 1000.45,
              estMonth3Amount: 190.98,
              estMonth4Amount: this.type === 'estUpdate' ? '' : 1400.11,
              estMonth5Amount: this.type === 'estUpdate' ? '' : 790,
              estExpenseRate: this.type === 'estUpdate' ? '' : 15,
              payMonth2Amount: this.type === 'payUpdate' ? '' : 200,
              payMonth3Amount: this.type === 'payUpdate' ? '' : 300,
              payMonth4Amount: this.type === 'payUpdate' ? '' : 400,
              payMonth5Amount: this.type === 'payUpdate' ? '' : 500,
              payExpenseRate: this.type === 'payUpdate' ? '' : 14,
              parent: expenseType[i - 1].account[j - 1].code
            }
          ]

          d.children.push(children)
        }
        this.motion.expenseList.push(d)
      }
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
    handleAddDetail(type) {
      this.motion.discussResultList.push({
        reportDate: '',
        isFixWithMotion: '',
        discussContent: ''
      })
    },
    handleDeleteDetail(index) {
      this.motion.discussResultList.splice(index, 1)
      if (this.motion.discussResultList.length === 0) {
        this.motion.discussResultList = [{}]
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 8) {
          sums[index] = '合计'
          return
        }

        if (
          column.property &&
          (column.property.endsWith('Amount') ||
            column.property.endsWith('Qty'))
        ) {
          const values = data.map((item) => Number(item[column.property]))
          sums[index] = numberFormat(
            values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0),
            2
          )
          sums[index]
        } else {
          sums[index] = ''
        }
      })
      let index = 11
      for (const month of this.motion.monthHeader) {
        const sellinSum = this.motion.discountList.map(
          (item) =>
            isNaN(this.motion.sellinMonthList.percent[0][month])
              ? 0
              : (item.planCaseQty *
                  Number(this.motion.sellinMonthList.percent[0][month])) /
                100,
          2
        )
        sums[index] = numberFormat(
          sellinSum.reduce((sum1, item) => sum1 + item),
          2
        )
        index++
      }
      return sums
    },
    getExpenseSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 4) {
          sums[index] = '合计'
          return
        }

        if (column.property && column.property.endsWith('Amount')) {
          let values = []
          data.forEach((item) => {
            values = values.concat(
              item.children.map((item) => Number(item[column.property]))
            )
          })
          sums[index] = numberFormat(
            values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0),
            2
          )
          sums[index]
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleCancelClick() {
      this.shopDialogShow = false
    },
    handleClearClick() {
      this.shops = ''
      this.shopDialogShow = false
    },
    handleOkClick() {
      console.log(this.$refs.tree.getCheckedNodes())
      const names = this.$refs.tree.getCheckedNodes().map((item) => item.label)
      this.shops = names.join(',')
      this.shopDialogShow = false
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
    }
  }
}
</script>
