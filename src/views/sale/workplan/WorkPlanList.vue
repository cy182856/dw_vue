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
                {{ $t("sale.workplan.salesBear") }}:
              </el-col>
              <el-col :span="16">
                <user-select />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.salesandshops.visitTime") }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="visitTimeValue"
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
                {{ $t("sale.workplan.status") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchKeys.status" placeholder="请选择">
                  <el-option
                    v-for="item in statusList"
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
                {{ $t("sale.workplan.isWarning") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="statusValue" clearable>
                  <el-option value="0" label="全部" />
                  <el-option value="1" label="无警告" />
                  <el-option value="2" label="有警告" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box">
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
        <li class="operation-item" @click="batchApproval">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconshenpi"
          /></span>
          <span class="operation-text">{{ $t("comm.batchApproval") }}</span>
        </li>
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
            :data="WorkreportList"
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
            <el-table-column
              :label="$t('sale.workplan.warning')"
              align="center"
              width="50"
            >
              <template slot-scope="scope">
                <el-tooltip
                  v-if="scope.row.warning"
                  class="workplanlist"
                  effect="dark"
                  :content="scope.row.warning"
                  placement="bottom-start"
                >
                  <i class="plan-warning el-icon-warning-outline" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="salesBear"
              :label="$t('sale.workplan.salesBear')"
            >
              <template slot-scope="scope">
                <router-link
                  :to="'/sale/workplan/approval?mn=' + (scope.row.id == 2)"
                >
                  {{ scope.row.salesBear }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="date" :label="$t('sale.workplan.date')" />
            <el-table-column
              prop="visitNum1"
              :label="$t('sale.workplan.visitNum1')"
              min-width="120"
            />
            <el-table-column :label="$t('sale.workplan.status')">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.status == 0"
                  class="no-apply"
                >未审批</span>
                <span v-if="scope.row.status == 1" class="apply">已审批</span>
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
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'WorkreportList',
  components: { UserSelect },
  mixins: [search, UserSelect, names, permission],
  data() {
    return {
      visitTimeValue: '',
      multipleSelection: [],
      statusValue: '0',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      WorkreportList: [
        {
          id: 1,
          warning: '',
          salesBear: '张三',
          date: '202101',
          visitNum1: '56',
          visitNum2: '12',
          visitNum3: '16',
          visitNum4: '52',
          status: '1'
        },
        {
          id: 1,
          warning: '',
          salesBear: '赵二',
          date: '202101',
          visitNum1: '56',
          visitNum2: '12',
          visitNum3: '16',
          visitNum4: '52',
          status: '0'
        },
        {
          id: 2,
          warning: '有更新内容',
          salesBear: '李四',
          date: '202101',
          visitNum1: '34',
          visitNum2: '3',
          visitNum3: '20',
          visitNum4: '17',
          status: '1'
        },
        {
          id: 1,
          warning: '',
          salesBear: '王五',
          date: '202101',
          visitNum1: '56',
          visitNum2: '12',
          visitNum3: '0',
          visitNum4: '68',
          status: '0'
        },
        {
          id: 2,
          warning: '有更新内容',
          salesBear: '李六',
          date: '202102',
          visitNum1: '25',
          visitNum2: '6',
          visitNum3: '0',
          visitNum4: '31',
          status: '0'
        }
      ],
      searchKeys: {
        status: '-1'
      },
      statusList: [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '未审批',
          value: '0'
        },
        {
          label: '已审批',
          value: '1'
        }
      ],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: 98, // 总条数
        params: {}
      }
    }
  },
  methods: {
    batchApproval() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(
          '是否审批通过赵二、王五的工作计划？',
          this.$t('comm.tips'),
          {
            confirmButtonText: this.$t('comm.certain'),
            cancelButtonText: this.$t('comm.cancel'),
            type: 'warning'
          }
        ).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    isCheckApproval(row) {
      return row.status === '0'
    }
  }
}
</script>
