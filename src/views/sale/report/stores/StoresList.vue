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
                {{ $t("sale.report.stores.type") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.type" clearable @change="tableTypeChange">
                  <el-option value="0" label="铺货占有率（在店时间列）" />
                  <el-option value="1" label="陈列占有率（在店时间列）" />
                  <el-option value="2" label="缺货占有率" />
                  <el-option value="3" label="价格预警" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.stores.storesMonth") }}:
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
                {{ $t("sale.report.stores.province") }}:
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
                {{ $t("sale.report.stores.city") }}:
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
                {{ $t("sale.report.stores.region") }}:
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
                {{ $t("sale.report.stores.organization") }}:
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
                {{ $t("sale.report.stores.customer") }}:
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
                {{ $t("sale.report.stores.store") }}:
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
                {{ $t("sale.report.stores.personnel") }}:
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
        <distribution-rate v-if="tableType===0" />
        <display-rate v-else-if="tableType === 1" />
        <defect-rate v-else-if="tableType === 2" />
        <price-warning v-else-if="tableType === 3" />
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
import DistributionRate from './components/DistributionRate.vue'
import DisplayRate from './components/DisplayRate.vue'
import DefectRate from './components/DefectRate.vue'
import PriceWarning from './components/PriceWarning.vue'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'DistributionList',
  components: { UserSelect, DistributionRate, DisplayRate, DefectRate, PriceWarning },
  mixins: [search, UserSelect, names, permission],
  data() {
    return {
      tableType: 0,
      visitTimeValue: '',
      multipleSelection: [],
      isJobValue: '0',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },

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
          type: '0',
          activityMonth: '',
          province: '',
          city: '',
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
    },
    tableTypeChange(val) {
      this.tableType = Number(val)
    }
  }
}
</script>
