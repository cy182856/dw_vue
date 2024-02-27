<template>
  <div class="user apply">
    <!-- <div class="user"> -->
    <div class="content content-light">
      <div class="calendar">
        <p class="user-title">
          销售担当：张三
        </p>
        <div class="full-calendar">
          <full-calendar
            ref="fullCalendar"
            class="app-calendar"
            default-view="dayGridMonth"
            :locale="locale"
            nav-links="true"
            event-limit="true"
            editable="true"
            droppable="false"
            selectable="true"
            select-helper="false"
            :plugins="calendarPlugins"
            :events="calendearLoad"
            @dateClick="handleDateClick"
            @eventClick="handleEventClick"
            @eventResize="handleEventResize"
          />
        </div>
        <div class="input_box">
          <div class="flex1">
            <div class="title">
              审批意见：
            </div>
            <div class="input">
              <el-input
                type="textarea"
                maxlength="256"
                autocomplete="off"
                show-word-limit
              />
            </div>
          </div>
        </div>
        <ul class="operation-box">
          <li class="operation-item">
            <span
              class="operation-circle circle-middle-btn btn-light-color bluebg"
            ><i
              class="el-icon-check"
            /></span>
            <span class="operation-text">{{ $t('component.taskApprove.agree') }}</span>
          </li>
          <li class="operation-item">
            <span
              class="operation-circle circle-middle-btn btn-light-color bluebg"
            ><i
              class="el-icon-close"
            /></span>
            <span class="operation-text">{{ $t('component.taskApprove.reject') }}</span>
          </li>
          <li class="operation-item" @click="$router.go(-1)">
            <span
              class="operation-circle circle-middle-btn btn-light-color bluebg"
            ><i
              class="el-icon-close"
            /></span>
            <span class="operation-text">{{ $t('comm.return') }}</span>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      id="calendarEditDialog"
      class="content-dialog-box search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag fixed-search-btn-box calendarEdit"
      top="0"
      title="计划申请"
      :visible.sync="dialogCalendarEditVisible"
      width="60%"
    >
      <apply
        :key="calendarEditObj.exclusiveKey + calendarEditObj.updateTimeStamp"
        :calendar-edit-obj="calendarEditObj"
        @saved="handleCalendarEditSaved"
        @close="dialogCalendarEditVisible = false"
      />
    </el-dialog>
    <!-- </div> -->
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import { eventDrop, eventResize } from '@/api/base'
import { getOrgTree } from '@/api/admin/org-api'
import Apply from '@/views/sale/workplan/components/Apply'
import { getScheduleTypeColor } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
  components: {
    FullCalendar,
    Apply
  },
  data() {
    return {
      data: [],
      expandedKeys: [],
      selectedUser: { id: '', name: '' },
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        // timeGridPlugin,
        // listPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarEditObj: {},
      dialogCalendarEditVisible: false,
      messageId: '',
      planList: [
        {
          id: '1',
          shopNo: 'Sgrt-23432-dsf',
          shopName: '家乐福——黄浦路店巡店',
          startDate: '2021-02-11',
          startTime: '00:00',
          endDate: '2021-02-11',
          endTime: '23:59',
          allday: true,
          scheduleType: 'todo',
          visitType: '1',
          desc: '在活动期内巡店'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    locale() {
      let lang = ''
      if (this.userInfo.locale.indexOf('zh') >= 0) {
        lang = 'zh-cn'
      } else if (this.userInfo.locale.indexOf('ja') >= 0) {
        lang = 'ja'
      }
      return lang
    }
  },
  created() {
    this.selectedUser.name = this.userInfo.nickName
    this.searchTree()
    if (this.$route.query.mn === 'true') {
      this.messageId = this.$message({
        showClose: true,
        duration: 0,
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$route.query.mn === 'true') {
      this.messageId.close()
    }
    next()
  },
  methods: {
    async searchTree() {
      const res = await getOrgTree(
        this.userInfo.orgSeqNo.split('.')[1],
        'personnel',
        false
      )
      if (res && res.success) {
        this.data = res.datas.result
        // 默认展开第一级
        if (this.data) {
          this.expandedKeys = this.data.map((item) => item.id)
        }
      }
    },
    async calendearLoad(fetchInfo, successCallback) {
      // 只显示本页数据
      // const fstart = fetchInfo.start
      // const fend = fetchInfo.end
      // const params = {
      //   startDate: fetchInfo.start,
      //   endDate: fetchInfo.end,
      //   userId: this.selectedUser.id
      // }

      const calendarList = this.planList
      if (calendarList) {
        successCallback(
          calendarList.map((schedule) => {
            let startDateTime
            let endDateTime
            if (schedule.allDayFlag === '1') {
              startDateTime = schedule.startDate
              endDateTime = schedule.endDate + 'T' + '24:00:00'
            } else {
              startDateTime =
                schedule.startDate + 'T' + schedule.startTime + ':00'
              endDateTime = schedule.endDate + 'T' + schedule.endTime + ':00'
            }
            const item = {
              id: schedule.id,
              title: schedule.shopNo + '(' + schedule.shopName + ')',
              start: startDateTime,
              end: endDateTime,
              allDay: schedule.allDayFlag === '1',
              color: getScheduleTypeColor(schedule.scheduleType),
              schedule: schedule
            }
            return item
          })
        )
      }
    },
    handleDateClick(dayInfo) {
      console.log(dayInfo)
      this.calendarEditObj = {
        startDate: dayInfo.dateStr.substring(0, 10),
        endDate: dayInfo.dateStr.substring(0, 10),
        attendeeList: [
          {
            attendee: this.userInfo.userId,
            nickName: this.userInfo.nickName,
            attType: '0'
          }
        ]
      }
      this.dialogCalendarEditVisible = true
    },
    handleEventClick(eventInfo) {
      this.calendarEditObj = { ...eventInfo.event.extendedProps.schedule }
      this.dialogCalendarEditVisible = true
    },
    handleCalendarEditSaved() {
      this.$refs.fullCalendar.$options.calendar.refetchEvents()
      this.dialogCalendarEditVisible = false
    },
    async handleEventResize(eventResizeInfo) {
      if (!this.isCanEdit(eventResizeInfo.event.extendedProps.schedule)) {
        eventResizeInfo.revert()
        this.$message({
          type: 'warning',
          dangerouslyUseHTMLString: true,
          message: this.$t('calendar.e0001')
        })
        return
      }
      const params = {
        startDelta: eventResizeInfo.startDelta,
        endDelta: eventResizeInfo.endDelta,
        eventId: eventResizeInfo.event.id,
        allDay: eventResizeInfo.event.allDay
      }
      const res = await eventResize(params)
      if (res && res.success) {
        this.$refs.fullCalendar.$options.calendar.refetchEvents()
      }
    },
    async handleEventDrop(eventDropInfo) {
      if (!this.isCanEdit(eventDropInfo.event.extendedProps.schedule)) {
        eventDropInfo.revert()
        this.$message({
          type: 'warning',
          dangerouslyUseHTMLString: true,
          message: this.$t('calendar.e0001')
        })
        return
      }
      const params = {
        delta: eventDropInfo.delta,
        eventId: eventDropInfo.event.id,
        allDay: eventDropInfo.event.allDay
      }
      const res = await eventDrop(params)
      if (res && res.success) {
        this.$refs.fullCalendar.$options.calendar.refetchEvents()
      }
    },
    isCanEdit(eventObj) {
      // 日程拥有者可以编辑
      if (eventObj.owner && eventObj.owner === this.userInfo.userId) {
        return true
      }

      if (eventObj.editFlag === '1') {
        if (
          eventObj.attendeeList.some(
            (item) => item.attendee === this.userInfo.userId
          )
        ) {
          return true
        }
      }
      return false
    },
    handleCheckChange(data, checked, indeterminate) {
      // 取出被选中的叶子节点
      const checkNodes = this.$refs['orgTree'].getCheckedNodes(true)
      const users = checkNodes.filter((item) => item.type === 'user')
      if (users && users.length > 0) {
        this.selectedUser.id = users
          .map((user) => {
            return user.id
          })
          .join(',')
        this.selectedUser.name = users
          .map((user) => {
            return user.text
          })
          .join(',')
        this.$refs.fullCalendar.$options.calendar.refetchEvents()
      }
    },
    updateScroll() {
      const _this = this
      setTimeout(function() {
        _this.scrollTree()
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  // height: 100%;
  // width: 100%;

  // border-radius: 6px;
  // overflow: hidden;
  // padding: 0 !important;
  // margin-left: 20px;
  .user-title {
    font-size: 16px;
    color: #000;
    margin-bottom: 10px;
    span {
      margin-left: 50px;
    }
  }
  .content {
    // overflow: auto;
    height: 100%;
    box-sizing: border-box;
    padding-left: 40px;
    width: calc(100% - 20px) !important;
    h2 {
      margin-bottom: 20px;
    }
    .calendar {
      padding: 20px;
      background-color: #fff;
      height: calc(100% - 20px);
      border-radius: 16px;
      .full-calendar {
        height: calc(100% - 140px);
      }
      .operation-box {
        padding: 0;
      }
      .input_box > div {
        padding: 10px;
      }
    }
    .date {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      border: 1px solid #ccc;
      .app-calendar {
        margin: 0 auto;
        // max-width: 900px;
      }
    }
  }
}
.user {
  .left {
    .el-tree {
      padding-left: 20px;
      background-color: #eee;
      color: #000;
      font-size: 12px;
      .el-tree-node > .el-tree-node__children {
        overflow: visible;
      }
    }
  }
}
.tree-croll {
  height: calc(100% - 21px);
}
</style>

