<template>
  <div class="user apply">
    <!-- <div class="user"> -->
    <div class="left">
      <span class="zuzhijiagou iconfont icon-zuzhijiagou" style="margin-left:25px">机构人员树</span>
      <el-tree
        ref="orgTree"
        :data="data"
        class="tree-croll"
        node-key="id"
        show-checkbox
        :expand-on-click-node="false"
        :default-expanded-keys="expandedKeys"
        @check-change="handleCheckChange"
        @node-expand="updateScroll"
        @node-collapse="updateScroll"
      >
        <template slot-scope="scope">
          <div class="tree_content">
            <div class="tree_item">
              <span v-if="scope.data.id !== 50" class="iconfont" :class="scope.data.children || scope.data.type === 'org' ? 'icon-bumenguanli_h' : 'icon-Avatar'" />
              <span v-else class="iconfont icon-zuzhijiagou" />
              <span>{{ scope.data.text }}</span>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="content content-light">
      <h2> {{ $t('dashboard.calendar') + "（"+ selectedUser.name +"）" }}</h2>
      <full-calendar
        ref="fullCalendar"
        class="app-calendar"
        default-view="timeGridWeek"
        :header="{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }"
        :locale="locale"
        nav-links="true"
        event-limit="true"
        editable="true"
        droppable="true"
        selectable="true"
        select-helper="false"
        :plugins="calendarPlugins"
        :events="calendearLoad"
        @dateClick="handleDateClick"
        @eventClick="handleEventClick"
        @eventDrop="handleEventDrop"
        @eventResize="handleEventResize"
      />
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
    >
      <calendar-edit :key="calendarEditObj.exclusiveKey+calendarEditObj.updateTimeStamp" :calendar-edit-obj="calendarEditObj" @saved="handleCalendarEditSaved" @close="dialogCalendarEditVisible=false" />
    </el-dialog>
    <!-- </div> -->
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import { getScheduleList, eventDrop, eventResize } from '@/api/base'
import { getOrgTree } from '@/api/admin/org-api'
import CalendarEdit from '@/views/schedule/components/CalendarEdit'
import { getScheduleTypeColor } from '@/utils/util'
import { niceScroll } from '@/mixins/nice-scroll.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    FullCalendar,
    CalendarEdit
  },
  mixins: [niceScroll],
  data() {
    return {
      data: [],
      expandedKeys: [],
      selectedUser: { id: '', name: '' },
      calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarEditObj: {},
      dialogCalendarEditVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
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
  },
  methods: {
    async searchTree() {
      const res = await getOrgTree(this.userInfo.orgSeqNo.split('.')[1], 'personnel', false)
      if (res && res.success) {
        this.data = res.datas.result
        // 默认展开第一级
        if (this.data) {
          this.expandedKeys = this.data.map(item => item.id)
        }
      }
      this.handleOpenedTree()
    },
    async calendearLoad(fetchInfo, successCallback) {
      // 只显示本页数据
      // const fstart = fetchInfo.start
      // const fend = fetchInfo.end
      const params = {
        startDate: fetchInfo.start,
        endDate: fetchInfo.end,
        userId: this.selectedUser.id
      }

      const res = await getScheduleList(params)
      const { calendarList } = res.datas
      if (calendarList) {
        successCallback(calendarList.map(schedule => {
          let startDateTime
          let endDateTime
          if (schedule.allDayFlag === '1') {
            startDateTime = schedule.startDate
            endDateTime = schedule.endDate + 'T' + '24:00:00'
          } else {
            startDateTime = schedule.startDate + 'T' + schedule.startTime + ':00'
            endDateTime = schedule.endDate + 'T' + schedule.endTime + ':00'
          }
          const userNames = schedule.attendeeList.map(att => { return att.nickName }).join(',')
          const item =
            {
              id: schedule.id,
              title: schedule.taskName + '(' + userNames + ')',
              start: startDateTime,
              end: endDateTime,
              allDay: schedule.allDayFlag === '1',
              color: getScheduleTypeColor(schedule.scheduleType),
              schedule: schedule
            }
          return item
        }))
      }
    },
    handleDateClick(dayInfo) {
      console.log(dayInfo)
      this.calendarEditObj =
      {
        startDate: dayInfo.dateStr.substring(0, 10),
        endDate: dayInfo.dateStr.substring(0, 10),
        attendeeList: [
          { attendee: this.userInfo.userId, nickName: this.userInfo.nickName, attType: '0' }
        ]
      }
      this.dialogCalendarEditVisible = true
    },
    handleEventClick(eventInfo) {
      console.log(eventInfo)
      this.calendarEditObj = { ...eventInfo.event.extendedProps.schedule }
      console.log(this.calendarEditObj)
      this.dialogCalendarEditVisible = true
    },
    handleCalendarEditSaved() {
      this.$refs.fullCalendar.$options.calendar.refetchEvents()
      this.dialogCalendarEditVisible = false
    },
    async handleEventResize(eventResizeInfo) {
      console.log('eventResizeInfo')
      console.log(eventResizeInfo)
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
      console.log('eventDropInfo')
      console.log(eventDropInfo)
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
        if (eventObj.attendeeList.some(item => item.attendee === this.userInfo.userId)) {
          return true
        }
      }
      return false
    },
    handleCheckChange(data, checked, indeterminate) {
      // 取出被选中的叶子节点
      const checkNodes = this.$refs['orgTree'].getCheckedNodes(true)
      console.log(checkNodes)
      const users = checkNodes.filter(item => item.type === 'user')
      console.log(users)
      if (users && users.length > 0) {
        this.selectedUser.id = users.map(user => { return user.id }).join(',')
        this.selectedUser.name = users.map(user => { return user.text }).join(',')
        this.$refs.fullCalendar.$options.calendar.refetchEvents()
      }
    },
    updateScroll() {
      const _this = this
      setTimeout(function() {
        _this.handleOpenedTree()
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
    .left {
      width: 235px;
      height: 100%;
      float: left;
      overflow: auto;
      box-sizing: border-box;
      padding: 0 5px;
      background-color: #eee;
      // border-right: 5px solid #eef2f6;
      // background-color: skyblue;
      // .zuzhijiagou{
      //   color: #606266;
      // }
      .tree_content {
        position: relative;
        .tree_item {
          .iconfont {
            font-size: 16px;
          }
          .icon-bumenguanli_h {
            color: rgb(180, 87, 6);
            font-size: 18px;
          }
          .icon-Avatar {
            color: rgb(64, 179, 224);
            font-size: 14px;
          }
          .icon-zuzhijiagou {
            color: cadetblue;
            font-size: 16px;
            position: relative;
            left: -12px;
          }
        }
        .tree_down {
          position: absolute;
          top: 20px;
          left: 15px;
          z-index: 999;
          background-color: #fff;
          padding: 3px;
          // height: 300px;
          display: none;
          p {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #000;
            &:hover {
              background-color: #ccc;
            }
          }
        }
      }
    }
    .content {
      // overflow: auto;
      height: 100%;
      box-sizing: border-box;
      margin: 0 6px;
      padding: 20px;
      background-color: #fff;
      // background-color: #43464d;
      h2 {
        margin-bottom: 20px;
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
      .el-tree-node>.el-tree-node__children {
        overflow: visible;
      }
    }
  }
}
.tree-croll{
  height: calc(100% - 21px);
}
</style>

