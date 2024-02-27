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
                {{ $t("sale.report.activity.activityMonth") }}:
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
                {{ $t("sale.report.activity.province") }}:
              </el-col>
              <el-col :span="16">
                <dict-select
                  v-model="searchParam.params.province"
                  dict-type-id="Province"
                  parent-id="153"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.activity.city") }}:
              </el-col>
              <el-col :span="16">
                <dict-select
                  v-model="searchParam.params.city"
                  dict-type-id="City"
                  :parent-id="searchParam.params.province"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.activity.region") }}:
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
                {{ $t("sale.report.activity.organization") }}:
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
                {{ $t("sale.report.activity.customer") }}:
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
                {{ $t("sale.report.activity.store") }}:
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
                {{ $t("sale.report.activity.personnel") }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.personnel" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.activity.brand") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.brand" placeholder="请选择">
                  <el-option
                    v-for="item in brandList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
            <el-table-column prop="region2" :label="$t('sale.report.activity.region2')" min-width="80" />
            <el-table-column prop="organization" :label="$t('sale.report.activity.organization')" min-width="80" />
            <el-table-column prop="customer" :label="$t('sale.report.activity.customer')" min-width="100" />
            <el-table-column prop="actions" :label="$t('sale.report.activity.actions')" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">
                  {{ scope.row.actions }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="reports" :label="$t('sale.report.activity.reports')" width="90">
              <template slot-scope="scope">
                <el-button type="text" size="small">
                  {{ scope.row.reports }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="completeRate" :label="$t('sale.report.activity.completeRate')" width="90">
              <template slot-scope="scope">
                <el-button type="text" size="small">
                  {{ scope.row.completeRate }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="skuPlans" :label="$t('sale.report.activity.skuPlans')" min-width="100" />
            <el-table-column prop="skuActions" :label="$t('sale.report.activity.skuActions')" width="100" />
            <el-table-column prop="skuCompleteRate" :label="$t('sale.report.activity.skuCompleteRate')" min-width="100" />
            <el-table-column prop="skuInferiors" :label="$t('sale.report.activity.skuInferiors')" min-width="100" />
            <el-table-column prop="visitReport" :label="$t('sale.report.activity.visitReport')" width="100">
              <template slot-scope="scope">
                <router-link to="/sale/workreport/detail">
                  {{ scope.row.visitReport }}
                </router-link>
              </template>
            </el-table-column>
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
// import UserDistribution from '@/components/UserDistribution.vue'
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
          region2: '地域1',
          organization: '组织1',
          customer: '大润发',
          actions: '54',
          reports: '18',
          completeRate: '0.2778',
          skuPlans: '22',
          skuActions: '11',
          skuCompleteRate: '0.5',
          skuInferiors: '8',
          visitReport: '拜访报告'
        },
        {
          id: 2,
          region2: '地域2',
          organization: '组织3',
          customer: '大润发',
          actions: '54',
          reports: '18',
          completeRate: '0.2778',
          skuPlans: '22',
          skuActions: '11',
          skuCompleteRate: '0.5',
          skuInferiors: '8',
          visitReport: '拜访报告'
        },
        {
          id: 3,
          region2: '地域3',
          organization: '组织2',
          customer: '大润发',
          actions: '54',
          reports: '18',
          completeRate: '0.2778',
          skuPlans: '22',
          skuActions: '11',
          skuCompleteRate: '0.5',
          skuInferiors: '8',
          visitReport: '拜访报告'
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
      brandList: [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '品牌1',
          value: '0'
        },
        {
          label: '品牌2',
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
          activityMonth: '',
          province: '',
          city: '',
          region: '',
          organization: '',
          customer: '',
          store: '',
          personnel: '',
          brand: ''
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
