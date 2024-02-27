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
                {{ $t("sale.report.attendance.attendanceMonth") }}:
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
                {{ $t("sale.report.attendance.personnelCode") }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.code" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.attendance.personnelName") }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.name" />
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.report.attendance.departDistrict") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.district" placeholder="请选择">
                  <el-option
                    v-for="item in districtList"
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
                {{ $t("sale.report.attendance.post") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.post" placeholder="请选择">
                  <el-option
                    v-for="item in postList"
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
                {{ $t("sale.report.attendance.isJob") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.isJob" clearable>
                  <el-option value="0" label="全部" />
                  <el-option value="1" label="是" />
                  <el-option value="2" label="否" />
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
            :data="AttendanceList"
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
            <el-table-column prop="date" :label="$t('sale.report.attendance.attendanceMonth')" />
            <el-table-column prop="code" :label="$t('sale.report.attendance.personnelCode')" />
            <el-table-column prop="name" :label="$t('sale.report.attendance.personnelName')" />
            <el-table-column prop="region" :label="$t('sale.report.attendance.departDistrict')" />
            <el-table-column prop="post" :label="$t('sale.report.attendance.post')" width="160" />
            <el-table-column prop="isJob" :label="$t('sale.report.attendance.isJob')" />
            <el-table-column prop="nums" :label="$t('sale.report.attendance.dates')" />
            <el-table-column prop="time1" :label="$t('sale.report.attendance.time1')" />
            <el-table-column prop="time2" :label="$t('sale.report.attendance.time2')" />
            <el-table-column prop="early" :label="$t('sale.report.attendance.early')" />
            <el-table-column prop="logins" :label="$t('sale.report.attendance.logins')" width="110" />
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
  name: 'AttendanceList',
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
      AttendanceList: [
        {
          id: 1,
          date: '202101',
          code: '38000073',
          name: '毛伟军',
          region: '华东地区',
          post: '总部担当（上海）',
          isJob: '在职',
          nums: '22',
          time1: '08:55',
          time2: '18:12',
          early: '2',
          logins: '23'
        },
        {
          id: 2,
          date: '202101',
          code: '38000073',
          name: '叶飞',
          region: '华东地区',
          post: '总部担当（上海）',
          isJob: '在职',
          nums: '22',
          time1: '08:55',
          time2: '18:12',
          early: '2',
          logins: '23'
        },
        {
          id: 3,
          date: '202101',
          code: '38000073',
          name: '成毅',
          region: '华东地区',
          post: '总部担当（上海）',
          isJob: '在职',
          nums: '22',
          time1: '08:55',
          time2: '18:12',
          early: '2',
          logins: '23'
        },
        {
          id: 4,
          date: '202101',
          code: '38000073',
          name: '王俊',
          region: '华东地区',
          post: '总部担当（上海）',
          isJob: '在职',
          nums: '22',
          time1: '08:55',
          time2: '18:12',
          early: '2',
          logins: '23'
        },
        {
          id: 5,
          date: '202101',
          code: '38000073',
          name: '姚惠强',
          region: '华东地区',
          post: '门店担当（上海G）',
          isJob: '在职',
          nums: '22',
          time1: '08:55',
          time2: '18:12',
          early: '2',
          logins: '23'
        },
        {
          id: 6,
          date: '202101',
          code: '38000073',
          name: '曹晖',
          region: '华东地区',
          post: '总部担当（上海）',
          isJob: '在职',
          nums: '22',
          time1: '08:55',
          time2: '18:12',
          early: '2',
          logins: '23'
        }
      ],
      districtKeys: {
        status: '-1'
      },
      districtList: [
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
      postList: [
        {
          label: '全部',
          value: '-1'
        },
        {
          label: '岗位1',
          value: '0'
        },
        {
          label: '岗位2',
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
          code: '',
          name: '',
          district: '',
          post: '',
          isJob: ''
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
