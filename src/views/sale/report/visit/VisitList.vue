<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
        >
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.visit.visitMonth") }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="searchParam.params.visitTimeValue"
                  type="month"
                  :picker-options="pickerOptions"
                  placeholder="请选择"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.visit.region") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.region" placeholder="请选择">
                  <el-option
                    v-for="item in regionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.visit.organization") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.organization" placeholder="请选择">
                  <el-option
                    v-for="item in organizationList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.visit.customer") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.customer" placeholder="请选择">
                  <el-option
                    v-for="item in customerList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.visit.store") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.store" placeholder="请选择">
                  <el-option
                    v-for="item in storeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.visit.personnel") }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.personnel" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t("comm.query") }}</p>
          <span
            class="circle-larger-btn btn-light-color bluebg"
          ><i
            class="iconfont iconsousuo"
          /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">{{ $t("comm.export") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            :data="VisitList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'left' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              :selectable="isCheckApproval"
              width="55"
            />
            <el-table-column prop="total" :label="$t('sale.report.visit.total')" min-width="110" />
            <el-table-column prop="plans" :label="$t('sale.report.visit.plans')" min-width="100" />
            <el-table-column prop="planRate" :label="$t('sale.report.visit.planRate')" min-width="100" />
            <el-table-column prop="actuals" :label="$t('sale.report.visit.actuals')" width="100" />
            <el-table-column prop="actualsRate" :label="$t('sale.report.visit.actualsRate')" width="90" />
            <el-table-column prop="planVisits" :label="$t('sale.report.visit.planVisits')" width="90" />
            <el-table-column prop="planVisitsIn" :label="$t('sale.report.visit.planVisitsIn')" min-width="100" />
            <el-table-column prop="planVisitsOut" :label="$t('sale.report.visit.planVisitsOut')" width="100" />
            <el-table-column prop="planVisitsTotal" :label="$t('sale.report.visit.planVisitsTotal')" width="60" />
            <el-table-column prop="visitRateIn" :label="$t('sale.report.visit.visitRateIn')" width="100" />
            <el-table-column prop="visitRateOut" :label="$t('sale.report.visit.visitRateOut')" min-width="110" />
            <el-table-column prop="visitRateTotal" :label="$t('sale.report.visit.visitRateTotal')" width="80" />
            <el-table-column prop="frequency" :label="$t('sale.report.visit.frequency')" min-width="100" />
            <el-table-column prop="changes" :label="$t('sale.report.visit.changes')" min-width="100" />
            <el-table-column prop="accuracy" :label="$t('sale.report.visit.accuracy')" width="100" />
          </el-table>
        </div>
      </div>
      <div class="pagination-box">
        <el-pagination
          class="page-left"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="total,sizes"
          :total="searchParam.totalRecord"
          popper-class="blueDL"
        />

        <el-pagination
          class="page-right blueDR"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="prev,pager,next,slot,jumper"
          :total="searchParam.totalRecord"
        >
          <span
            class="iconfont iconjiantou-youzhi page-last-page"
            @click="toLastPage"
          />
        </el-pagination>
        <el-pagination class="page-right page-first" layout="slot">
          <span
            class="iconfont iconjiantou-zuozhi page-first-page"
            @click="toFirstPage"
          />
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'VisitList',
  components: { UserSelect },
  mixins: [search, UserSelect, names, permission],
  data() {
    return {
      visitTimeValue: '',
      multipleSelection: [],
      isJobValue: '0',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      VisitList: [
        {
          id: 1,
          total: '54',
          plans: '39',
          planRate: '0.7222',
          actuals: '15',
          actualsRate: '0.2778',
          planVisits: '161',
          planVisitsIn: '15',
          planVisitsOut: '0',
          planVisitsTotal: '15',
          visitRateIn: '0.0932',
          visitRateOut: '0',
          visitRateTotal: '0.0932',
          frequency: '1',
          changes: '0',
          accuracy: '1'
        },
        {
          id: 2,
          total: '46',
          plans: '27',
          planRate: '0.587',
          actuals: '11',
          actualsRate: '0.2391',
          planVisits: '101',
          planVisitsIn: '15',
          planVisitsOut: '0',
          planVisitsTotal: '15',
          visitRateIn: '0.0932',
          visitRateOut: '0',
          visitRateTotal: '0.0932',
          frequency: '1',
          changes: '0',
          accuracy: '1'
        },
        {
          id: 3,
          total: '34',
          plans: '6',
          planRate: '0.1765',
          actuals: '3',
          actualsRate: '0.0882',
          planVisits: '14',
          planVisitsIn: '15',
          planVisitsOut: '0',
          planVisitsTotal: '15',
          visitRateIn: '0.0932',
          visitRateOut: '0',
          visitRateTotal: '0.0932',
          frequency: '1',
          changes: '0',
          accuracy: '1'
        },
        {
          id: 4,
          total: '41',
          plans: '36',
          planRate: '0.878',
          actuals: '11',
          actualsRate: '0.2683',
          planVisits: '162',
          planVisitsIn: '15',
          planVisitsOut: '0',
          planVisitsTotal: '15',
          visitRateIn: '0.0932',
          visitRateOut: '0',
          visitRateTotal: '0.0932',
          frequency: '1',
          changes: '0',
          accuracy: '1'
        },
        {
          id: 4,
          total: '41',
          plans: '36',
          planRate: '0.878',
          actuals: '11',
          actualsRate: '0.2683',
          planVisits: '162',
          planVisitsIn: '15',
          planVisitsOut: '0',
          planVisitsTotal: '15',
          visitRateIn: '0.0932',
          visitRateOut: '0',
          visitRateTotal: '0.0932',
          frequency: '1',
          changes: '0',
          accuracy: '1'
        },
        {
          id: 4,
          total: '41',
          plans: '36',
          planRate: '0.878',
          actuals: '11',
          actualsRate: '0.2683',
          planVisits: '162',
          planVisitsIn: '15',
          planVisitsOut: '0',
          planVisitsTotal: '15',
          visitRateIn: '0.0932',
          visitRateOut: '0',
          visitRateTotal: '0.0932',
          frequency: '1',
          changes: '0',
          accuracy: '1'
        }
      ],
      districtKeys: {
        status: '-1'
      },
      regionList: [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '大区1',
          value: '0'
        },
        {
          label: '大区2',
          value: '1'
        }
      ],
      postKeys: {
        status: '-1'
      },
      organizationList: [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '组织1',
          value: '0'
        },
        {
          label: '组织2',
          value: '1'
        }
      ],
      customerList: [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '客户1',
          value: '0'
        },
        {
          label: '客户2',
          value: '1'
        }
      ],
      storeList: [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '门店1',
          value: '0'
        },
        {
          label: '门店2',
          value: '1'
        }
      ],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: 98, // 总条数
        params: {
          visitTimeValue: '',
          region: '',
          organization: '',
          customer: '',
          store: '',
          personnel: ''
        }
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    isCheckApproval(row) {
      return row.status === '0'
    }
  }
}
</script>
