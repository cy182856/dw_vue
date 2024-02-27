<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="taskName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('calendar.taskName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.taskName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="scheduleType">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('calendar.scheduleType') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.scheduleType" class="input" dict-type-id="ScheduleType" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="relFuncNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('calendar.relFuncNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.relFuncNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="dateFrom">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('calendar.dateFrom') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.dateFrom" size="small" class="input" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="dateTo">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('calendar.dateTo') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.dateTo" size="small" class="input" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="attendee">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('calendar.attendee') }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.attendee" :root-org-id="userInfo.orgSeqNo.split('.')[1]" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t('comm.reset') }}</p>
          <span class="circle-larger-btn btn-default-color"><i class="iconfont iconrefresh" /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t('comm.query') }}</p>
          <span class="circle-larger-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="handleCreate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">{{ $t('comm.newlyBuild') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="schedules"
            border
            stripe
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="taskName" label="标题" min-width="100">
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleTaskClick(scope.row)">{{ scope.row.taskName }}</a>
              </template>
            </el-table-column>
            <el-table-column label="日程类型" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="ScheduleType" :value="scope.row.scheduleType" />
              </template>
            </el-table-column>
            <el-table-column prop="startDate" label="开始日期" min-width="100" />
            <el-table-column prop="startTime" label="开始时间" min-width="80" />
            <el-table-column prop="endDate" label="结束日期" min-width="100" />
            <el-table-column prop="endTime" label="结束时间" min-width="80" />
            <el-table-column prop="relFuncNum" label="关联业务编号" min-width="120" />
            <el-table-column label="关联业务名称" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.relFuncNum | funcName(scope.row.relFunc) }}
              </template>
            </el-table-column>
            <el-table-column prop="attNames" label="参与者" min-width="200" show-overflow-tooltip />
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <el-pagination
          class="page-right blueDR"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="prev,pager,next,slot,jumper"
          :total="searchParam.totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
        </el-pagination>
        <el-pagination class="page-right  page-first" layout="slot">
          <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
        </el-pagination>
      </div>
    </div>
    <el-dialog
      id="calendarEditDialog"
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag fixed-search-btn-box calendarEdit"
      top="0"
      title="日程制定"
      :visible.sync="dialogCalendarEditVisible"
      width="60%"
      center
    >
      <calendar-edit :key="calendarEditObj.exclusiveKey+calendarEditObj.updateTimeStamp" :calendar-edit-obj="calendarEditObj" @saved="handleCalendarEditSaved" @close="dialogCalendarEditVisible=false" />
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { getScheduleListByParams } from '@/api/base.js'
import { names } from '@/mixins/names.js'
import CalendarEdit from '@/views/schedule/components/CalendarEdit'
import UserSelect from '@/components/UserSelect.vue'
import { dateFormat } from '@/utils/util.js'
import { niceScroll } from '@/mixins/nice-scroll.js'

export default {
  name: 'ScheduleList',
  components: {
    CalendarEdit,
    UserSelect
  },
  mixins: [search, names, niceScroll],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      dialogCalendarEditVisible: false,
      schedules: [],
      calendarEditObj: {},
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          taskName: '',
          scheduleType: '',
          relFuncNum: '',
          dateFrom: '',
          dateTo: '',
          attendee: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.searchParam.params.attendee = this.userInfo.userId
    if (this.$route.query.relFuncNum) {
      this.searchParam.params.relFuncNum = this.$route.query.relFuncNum
    }
    if (this.$route.query.undo) {
      this.searchParam.params.undo = this.$route.query.undo
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getScheduleListByParams(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        if (results) {
          results.forEach(schedule => {
            if (schedule.attendeeList) {
              schedule.attNames = schedule.attendeeList.map(item => item.nickName).join('，')
            }
          })
        }
        this.schedules = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleCreate() {
      this.calendarEditObj =
      {
        startDate: dateFormat(new Date(), 'yyyy-MM-dd'),
        endDate: dateFormat(new Date(), 'yyyy-MM-dd'),
        attendeeList: [
          { attendee: this.userInfo.userId, nickName: this.userInfo.nickName, attType: '0' }
        ],
        relFunc: '',
        relFuncNum: ''
      }
      this.dialogCalendarEditVisible = true
    },
    handleTaskClick(row) {
      this.calendarEditObj = row
      this.dialogCalendarEditVisible = true
    },
    handleCalendarEditSaved() {
      this.dialogCalendarEditVisible = false
      this.fetchData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
