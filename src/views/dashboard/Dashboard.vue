<template>
  <div ref="index" class="index dashboarddiv">
    <div class="todo-card">
      <h3 class="h3">
        <span class="span">{{ $t('dashboard.matter') }}</span>
        <!-- <div class="select_todo">
          <i slot="reference" class="el-icon-menu" @click="todoListDialog=true" />
        </div> -->
      </h3>
      <div v-for="(todo,index) in todoList" :key="index">
        <el-card v-if="todo==='task'" class="todo_item" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="title">{{ $t('dashboard.pendingDisposal') }}</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="handleTasksBtnOnClick">
              {{ $t('comm.more') }}<i class="iconfont icon-right" />
            </el-button> -->
            <span style="float: right; padding: 3px 0; font-size: 12px; font-weight: 700;">共计：{{ taskSize }} 件</span>
          </div>
          <div class="box">
            <div class="item_text_t">
              <div style="width:20%">
                {{ $t('dashboard.functionName') }}
              </div>
              <div style="width:25%">
                {{ $t('dashboard.currentNode') }}
              </div>
              <div style="width:30%">
                {{ $t('dashboard.businessNumber') }}
              </div>
              <div style="width:25%">
                {{ $t('dashboard.submissionTime') }}
              </div>
            </div>
            <div v-for="item in taskList" :key="item.id" class="item_text">
              <div style="width:20%" :title="item.processDefinitionName">
                {{ item.processDefinitionName }}
              </div>
              <div style="width:22%">
                <a href="javascript:;" :title="item.name" @click.prevent="handleProcessInstClick(item.processInstId)">{{ item.name }}</a>
              </div>
              <div style="width:33%" :title="item.processName">
                <!-- <router-link :to="{path: item.formKey, query: {taskId: item.id, processInstId: item.processInstId, businessKey: item.businessKey}}">
                  {{ item.processNames }}
                </router-link> -->
                {{ item.processNames }}
                <!-- <router-link :to="{path: item.formKey}">
                  {{ item.processNames }}
                </router-link> -->
              </div>
              <div style="width:25%" :title="item.startTime | dateTimeFormat">
                {{ item.startTime | dateTimeFormat }}
              </div>
            </div>
          </div>
        </el-card>
        <el-card v-if="todo==='lead'" class="todo_item" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="title">{{ $t('dashboard.lead') }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleLeadBtnOnClick">
              {{ $t('comm.more') }}<i class="iconfont icon-right" />
            </el-button>
          </div>
          <div class="box">
            <div class="item_text_t">
              <div style="width:30%">
                {{ $t('dashboard.leadName') }}
              </div>
              <div style="width:40%">
                {{ $t('dashboard.companyName') }}
              </div>
              <div style="width:30%">
                {{ $t('dashboard.industry') }}
              </div>
            </div>
            <div v-for="item in leadList" :key="item.id" class="item_text">
              <div style="width:30%">
                <router-link :to="{path:'/mrk/lead/detail',query:{id:item.id}}">
                  {{ item.leadName }}
                </router-link>
              </div>
              <div style="width:40%" :title="item.companyName">
                {{ item.companyName }}
              </div>
              <div style="width:30%" :title="item.industry">
                {{ item.industry | dictName('Industry') }}
              </div>
            </div>
          </div>
        </el-card>
        <el-card v-if="todo==='saleOpportunity'" class="todo_item" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="title">{{ $t('dashboard.saleOpportunity') }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleSaleOppBtnOnClick">
              {{ $t('comm.more') }}<i class="iconfont icon-right" />
            </el-button>
          </div>
          <div class="box">
            <div class="item_text_t">
              <div style="width:30%">
                {{ $t('dashboard.startTime') }}
              </div>
              <div style="width:40%">
                {{ $t('dashboard.saleOpportunityName') }}
              </div>
              <div style="width:30%">
                {{ $t('dashboard.saleStage') }}
              </div>
            </div>
            <div v-for="item in saleOpportunityList" :key="item.id" class="item_text">
              <div style="width:30%">
                {{ item.createTime | dateTimeFormat }}
              </div>
              <div style="width:40%">
                <router-link :to="{path:'/sale/salesopportunity/detail',query:{id:item.id}}">
                  {{ item.salesopportunityName }}
                </router-link>
              </div>
              <div style="width:30%">
                {{ item.salesPhase | dictName('SalesPhase') }}
              </div>
            </div>
          </div>
        </el-card>
        <el-card v-else-if="todo==='running'" class="todo_item" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="title">{{ $t('dashboard.inProcessing') }}</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="handleRunningBtnOnClick">
              {{ $t('comm.more') }}<i class="iconfont icon-right" />
            </el-button> -->
            <span style="float: right; padding: 3px 0; font-size: 12px; font-weight: 700;">共计：{{ runningSize }} 件</span>
          </div>
          <div class="box">
            <div class="item_text_t">
              <div style="width:20%">
                {{ $t('dashboard.functionName') }}
              </div>
              <div style="width:25%">
                {{ $t('dashboard.currentNode') }}
              </div>
              <div style="width:30%">
                {{ $t('dashboard.businessNumber') }}
              </div>
              <div style="width:25%">
                {{ $t('dashboard.submissionTime') }}
              </div>
            </div>
            <div v-for="item in runningList" :key="item.id" class="item_text">
              <div style="width:20%" :title="item.processDefinitionName">
                {{ item.processDefinitionName }}
              </div>
              <div style="width:22%">
                <a href="javascript:;" :title="item.currentTaskName" @click.prevent="handleProcessInstClick(item.id)">{{ item.currentTaskName }}</a>
              </div>
              <div style="width:33%">
                {{ item.names }}
                <!-- <a href="javascript:;" :title="item.name" @click.prevent="handleDetailClick1(item)">{{ item.names }}</a> -->
              </div>
              <div style="width:25%" :title="item.endTime | dateTimeFormat">
                {{ item.startTime | dateTimeFormat }}
              </div>
            </div>
          </div>
        </el-card>
        <el-card v-else-if="todo==='finish'" class="todo_item" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="title">{{ $t('dashboard.completed') }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleFinishedBtnOnClick">
              {{ $t('comm.more') }}<i class="iconfont icon-right" />
            </el-button>
          </div>
          <div class="box">
            <div class="item_text_t">
              <div style="width:20%">
                {{ $t('dashboard.functionName') }}
              </div>
              <div style="width:30%">
                {{ $t('workflow.processId') }}
              </div>
              <div style="width:25%">
                {{ $t('dashboard.businessNumber') }}
              </div>
              <div style="width:25%">
                <!-- 完了时间 -->
                {{ $t('dashboard.endTime') }}
              </div>
            </div>
            <div v-for="item in finishedList" :key="item.id" class="item_text split3">
              <div style="width:20%" :title="item.processDefinitionName">
                {{ item.processDefinitionName }}
              </div>
              <div style="width:25%">
                <a href="javascript:;" :title="item.id" @click.prevent="handleProcessInstClick(item.id)">{{ item.id }}</a>
              </div>
              <div style="width:30%">
                <a href="javascript:;" :title="item.name" @click.prevent="handleDetailClick(item)">{{ item.name }}</a>
              </div>
              <div style="width:25%" :title="item.endTime | dateTimeFormat">
                {{ item.endTime | dateTimeFormat }}
              </div>
            </div>
          </div>
        </el-card>
        <!-- <el-card v-else-if="todo==='contract'" class="todo_item" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="title">合同提醒</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleContractBtnOnClick">
              {{ $t('comm.more') }}<i class="iconfont icon-right" />
            </el-button>
          </div>
          <div class="box">
            <div class="item_text_t">
              <div style="width:30%">
                合同编号
              </div>
              <div style="width:45%">
                合同名称
              </div>
              <div style="width:25%">
                合同到期日
              </div>
            </div>
            <div v-for="item in contractList" :key="item.id" class="item_text split3">
              <div style="width:30%" :title="JSON.parse(item.variables).releaseNo">
                <router-link :to="{path:'/mgt/contract/detail',query:{id:item.id}}">
                  {{ JSON.parse(item.variables).releaseNo }}
                </router-link>
              </div>
              <div style="width:45%">
                {{ item.contractName }}
              </div>
              <div style="width:25%" :title="item.contractEndDate | dateTimeFormat">
                {{ item.contractEndDate | dateTimeFormat }}
              </div>
            </div>
          </div>
        </el-card> -->
      </div>
    </div>
    <!-- <el-col :span="16" class="col-left">
      <div class="todo-card">
        <h3 class="h3">
          <span class="span">
            {{ $t('dashboard.calendar') }}
          </span>
        </h3>
        <full-calendar
          ref="fullCalendar"
          class="app-calendar"
          default-view="dayGridMonth"
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
    </el-col> -->
    <!-- <el-col :span="8" class="col-right">
      <div class="todo-card">
        <el-card class="todo_item" style="width:100% !important;margin-left:0px !important">
          <div slot="header" class="clearfix">
            <span class="title">{{ $t('dashboard.tadayEvent') }}</span>
            <el-button v-if="todayScheduleList && todayScheduleList.length > 0" style="float: right; padding: 3px 0" type="text" @click="handleScheduleBtnOnClick(1)">
              {{ $t('comm.more') }}<i class="iconfont icon-right" />
            </el-button>
          </div>
          <div class="box">
            <div class="item_text_t">
              <div style="width:30%">
                {{ $t('dashboard.startTime') }}
              </div>
              <div style="width:65%">
                {{ $t('dashboard.eventTitle') }}
              </div>
            </div>
            <div v-for="item in todayScheduleList" :key="item.id" class="item_text">
              <div style="width:30%" :title="item.startDate | dateTimeFormat">
                {{ item.startDate | dateTimeFormat }}
              </div>
              <div style="width:45%">
                <a href="javascript:;" :title="item.taskName" @click="handleSchudleEventClick(item)">{{ item.taskName }}</a>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="todo-card">
        <el-card class="todo_item" style="width:100% !important;margin-left:0px !important">
          <div slot="header" class="clearfix">
            <span class="title">{{ $t('dashboard.undoEvent') }}</span>
            <el-button v-if="undoScheduleList && undoScheduleList.length > 0" style="float: right; padding: 3px 0" type="text" @click="handleScheduleBtnOnClick(2)">
              {{ $t('comm.more') }}<i class="iconfont icon-right" />
            </el-button>
          </div>
          <div class="box">
            <div class="item_text_t">
              <div style="width:30%">
                {{ $t('dashboard.startTime') }}
              </div>
              <div style="width:65%">
                {{ $t('dashboard.eventTitle') }}
              </div>
            </div>
            <div v-for="item in undoScheduleList" :key="item.id" class="item_text">
              <div style="width:30%" :title="item.startDate | dateTimeFormat">
                {{ item.startDate | dateTimeFormat }}
              </div>
              <div style="width:45%">
                <a href="javascript:;" :title="item.taskName" @click="handleSchudleEventClick(item)">{{ item.taskName }}</a>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-col> -->
    <template>
      <el-carousel :interval="3000" arrow="always" class="login-banner">
        <el-carousel-item v-for="item in lun" :key="item.id">
          <img :src="item.url" class="el-carousel-item-div">
        </el-carousel-item>
      </el-carousel>
    </template>
    <div v-if="dialogTableVisible">
      <process-detail :is-show="dialogTableVisible" :title="$t('dashboard.detailedProcess') + processInstId" :process-inst-id="processInstId" :can-withdraw="true" @close="dialogTableVisible=false" />
    </div>
    <div class="apply">
      <el-dialog
        id="calendarEditDialog"
        title="日程制定"
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag fixed-search-btn-box calendarEdit"
        top="0"
        :visible.sync="dialogCalendarEditVisible"
        width="60%"
      >
        <calendar-edit :key="calendarEditObj.exclusiveKey+calendarEditObj.updateTimeStamp" :calendar-edit-obj="calendarEditObj" @saved="handleCalendarEditSaved" @close="dialogCalendarEditVisible=false" />
      </el-dialog>
    </div>
    <el-dialog id="bizDetailDialog" :title="$t('dashboard.detailedProcess') + processInstId" :visible.sync="bizDetailDialogVisible" width="90%" append-to-body :close-on-click-modal="false">
      <router-view />
    </el-dialog>
    <el-drawer
      ref="drawer"
      :show-close="false"
      :visible.sync="todoListDialog"
      size="640"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <span slot="title" style="font-size:20px">显示事项选择</span>
      <div class="demo-drawer__content">
        <el-transfer v-model="todoList" :titles="[$t('comm.unSelectFields'),$t('comm.selectedFields')]" target-order="push" :data="allTodoList" />
        <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
          <!-- 保存 -->
          <li class="operation-item" @click="handleTodoSelectClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
            <span class="operation-text">{{ $t('comm.save') }}</span>
          </li>
        </ul>
        <!-- <div style="margin-top:10px">
          <el-button type="primary" @click="handleTodoSelectClick">
            保存
          </el-button>
        </div> -->
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import { getTasks, getRunnings, getFinished, getScheduleList, eventDrop, eventResize, setShowDiv, getSalesopportunity, getLeads, getDashboardEvents } from '@/api/base'
import CalendarEdit from '@/views/schedule/components/CalendarEdit'
import { getList } from '@/api/mgt/contract.js'
// import getSchedulers from '@/api/admin/scheduler-api.js'
import { getDictName, getScheduleTypeColor } from '@/utils/util'
import { names } from '@/mixins/names.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
var elementResizeDetectorMaker = require('element-resize-detector')
export default {
  components: {
    // FullCalendar,
    CalendarEdit
  },
  filters: {
    dateTimeFormat(val) {
      // yyyy-MM-dd HH:mm:ss 转为 yyyy-MM-dd
      return val ? val.substring(0, 10) : val
    }
  },
  mixins: [names, niceScroll],
  data() {
    return {
      calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarEditObj: {},
      dialogCalendarEditVisible: false,
      // calendarEvents: [ // initial event data
      //   // { title: 'Event Now', start: new Date() }

      // ],
      processInstId: '',
      dialogTableVisible: false,
      bizDetailDialogVisible: false,
      todoList: [],
      allTodoList: [],
      todoListDialog: false,
      taskList: [],
      taskSize: 0,
      runningList: [],
      runningSize: 0,
      finishedList: [],
      contractList: [],
      undoScheduleList: [],
      todayScheduleList: [],
      leadList: [],
      saleOpportunityList: [],
      lun: [{
        id: 1,
        url: require('./../../assets/images/lun1.png')
      }, {
        id: 2,
        url: require('./../../assets/images/lun2.png')
      }, {
        id: 3,
        url: require('./../../assets/images/lun3.png')
      }]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    locale() {
      let lang = 'zh-cn'
      if (this.userInfo.locale && this.userInfo.locale.indexOf('zh') >= 0) {
        lang = 'zh-cn'
      } else if (this.userInfo.locale && this.userInfo.locale.indexOf('ja') >= 0) {
        lang = 'ja'
      }
      return lang
    }
  },
  created: function() {
    this.$store.dispatch('getDicts', 'WorkflowDetailPage')
    this.fetchData()
  },
  mounted() {
    var erd = elementResizeDetectorMaker()
    console.log(erd)
  },
  methods: {
    fetchData() {
      const divSortList = (this.userInfo.divSort && this.userInfo.divSort.split(',')) || []
      const closeDivList = (this.userInfo.closeDiv && this.userInfo.closeDiv.split(',')) || []
      this.allTodoList = [...divSortList, ...closeDivList].map(todo => {
        return {
          key: todo,
          label: this.$t('dashboard.' + todo + 'Todo')
        }
      })
      console.log(divSortList)
      this.todoList = divSortList
      if (this.todoList.some(todo => todo === 'task')) {
        console.log(divSortList + '1')
        this.getTasksList()
      }
      if (this.todoList.some(todo => todo === 'running')) {
        console.log(divSortList + '2')
        this.getRunningsList()
      }
      if (this.todoList.some(todo => todo === 'finish')) {
        this.getFinishedList()
      }
      if (this.todoList.some(todo => todo === 'contract')) {
        this.getContractList()
      }
      if (this.todoList.some(todo => todo === 'lead')) {
        this.getLeadList()
      }
      if (this.todoList.some(todo => todo === 'saleOpportunity')) {
        this.getSaleOpportunityList()
      }
      // this.getDashboardEvents()
    },

    async handleTodoSelectClick() {
      const params = {
        divSort: this.todoList.join(','),
        closeDiv: this.allTodoList.filter(todo => {
          return !this.todoList.some(selected => selected === todo.key)
        }).map(close => close.key).join(',')
      }
      await setShowDiv(params)
      this.todoListDialog = false
    },
    async getTasksList() {
      const res = await getTasks({ paging: true, pageNo: 1, pageSize: 4 })
      const { results, totalRecord } = res.datas.searchResult
      this.taskSize = totalRecord
      this.taskList = results
      for (let i = 0; this.taskList[i]; i++) {
        // this.taskList[i].processNames = this.taskList[i].processName.split(',')[3]
        const split = this.taskList[i].processName.split(',')
        const len = split.length - 1
        this.taskList[i].processNames = split[len]
      }
    },
    async getRunningsList() {
      const res = await getRunnings({ paging: true, pageNo: 1, pageSize: 4 })
      const { results, totalRecord } = res.datas.searchResult
      this.runningSize = totalRecord
      this.runningList = results
      for (let i = 0; this.runningList[i]; i++) {
        // this.runningList[i].names = this.runningList[i].name.split(',')[3]
        const split = this.runningList[i].name.split(',')
        const len = split.length - 1
        this.runningList[i].names = split[len]
      }
    },
    async getFinishedList() {
      const res = await getFinished({ paging: true, pageNo: 1, pageSize: 4 })
      const { results } = res.datas.searchResult
      const cut = results.splice(0, 4)
      this.finishedList = cut
    },
    async getContractList() {
      const searchParam = {
        params: {
          tenantId: this.userInfo.tenantId
        }
      }
      const res = await getList(searchParam)
      const { results } = res.datas.searchResult
      if (results) {
        const cut = results.filter(item => item.prompt === '1').splice(0, 4)
        this.contractList = cut
      }
    },
    async getDashboardEvents() {
      const res = await getDashboardEvents()
      this.undoScheduleList = res.datas.undoList.splice(0, 4)
      this.todayScheduleList = res.datas.scheduleList.splice(0, 4)
    },
    async getLeadList() {
      const searchParam = {
        params: {
          tenantId: this.userInfo.tenantId
        }
      }
      const res = await getLeads(searchParam)
      const { results } = res.datas.searchResult
      if (results) {
        const cut = results.splice(0, 4)
        this.leadList = cut
      }
    },
    async getSaleOpportunityList() {
      const searchParam = {
        params: {
          tenantId: this.userInfo.tenantId
        }
      }
      const res = await getSalesopportunity(searchParam)
      const { results } = res.datas.searchResult
      if (results) {
        const cut = results.splice(0, 4)
        this.saleOpportunityList = cut
      }
    },
    handleTasksBtnOnClick() {
      this.$router.push('/workflow/tasks')
    },
    handleDetailClick1(row) {
      // const path = getDictName('WorkflowDetailPage', row.processDefinitionKey)
      let path = ''
      if ((row.processDefinitionKey === 'EstNew') && (row.startUserId === this.userInfo.userId)) {
        path = '/est/promotion'
      } else if ((row.processDefinitionKey === 'EstNew') && (row.startUserId !== this.userInfo.userId)) {
        path = '/est/approve'
      } else if ((row.processDefinitionKey === 'ActVerifyApply') && (row.startUserId === this.userInfo.userId)) {
        path = '/writeoff/list'
      } else if ((row.processDefinitionKey === 'ActVerifyApply') && (row.startUserId !== this.userInfo.userId)) {
        for (let j = 0; this.userInfo.roleList[j]; j++) {
          if ((this.userInfo.roleList[j] === 'ROLE_WF_CASH') && (this.userInfo.roleList[j] === 'ROLE_WF_CASH_CONFIRM')) {
            path = '/finance/list'
            break
          }
        }
        if (path === "'/finance/list'") {
          path = '/writeoff/list'
        }
      }
      this.$router.push({ path: path, query: { id: row.businessKey }})
    },
    handleDetailClick(row) {
      const path = getDictName('WorkflowDetailPage', row.processDefinitionKey)
      this.$router.push({ path: path, query: { id: row.businessKey }})
    },
    handleRunningBtnOnClick() {
      this.$router.push('/workflow/runnings')
    },
    handleFinishedBtnOnClick() {
      this.$router.push('/workflow/finished')
    },
    handleContractBtnOnClick() {
      this.$router.push('/mgt/contractList')
    },
    handleLeadBtnOnClick() {
      this.$router.push('/mrk/leadList')
    },
    handleSaleOppBtnOnClick() {
      this.$router.push('/sale/salesopportunityList')
    },
    handleProcessInstClick(processInstId) {
      this.processInstId = processInstId
      this.dialogTableVisible = true
    },
    handleScheduleBtnOnClick(undo) {
      this.$router.push({ path: '/schedule/list', query: { undo: undo }})
    },
    async calendearLoad(fetchInfo, successCallback) {
      // 只显示本页数据
      // const fstart = fetchInfo.start
      // const fend = fetchInfo.end
      const params = {
        startDate: fetchInfo.start,
        endDate: fetchInfo.end
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
          const item =
            {
              id: schedule.id,
              title: schedule.taskName,
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
      this.calendarEditObj =
      {
        startDate: dayInfo.dateStr,
        endDate: dayInfo.dateStr,
        attendeeList: [
          { attendee: this.userInfo.userId, nickName: this.userInfo.nickName, attType: '0' }
        ],
        relFunc: '',
        relFuncNum: ''
      }
      this.dialogCalendarEditVisible = true
    },
    handleEventClick(eventInfo) {
      console.log(eventInfo)
      this.calendarEditObj = { ...eventInfo.event.extendedProps.schedule }
      console.log(this.calendarEditObj)
      this.dialogCalendarEditVisible = true
    },
    handleSchudleEventClick(dayInfo) {
      this.calendarEditObj = dayInfo
      this.dialogCalendarEditVisible = true
    },
    handleCalendarEditSaved() {
      this.$refs.fullCalendar.$options.calendar.refetchEvents()
      this.dialogCalendarEditVisible = false
      this.getDashboardEvents()
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
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  .index {
    width: 100%;
    padding: 0 20px 0 70px;
    box-sizing: border-box;
    overflow: hidden;
    h3 {
      margin-bottom: 15px;
      // height: 40px;
      // line-height: 40px;
      // font-size: 20px;
      // border-bottom: 1px dashed #ccc;
      // position: relative;
      .select_todo {
        position: absolute;
        top: -1px;
        right: 20px;
      }
    }
    .todo-card {
      width: 100%;
      margin-bottom: 15px;
      overflow: hidden;
      .todo_item {
        width: 49%;
        // box-sizing: border-box;
        // padding: 5px 20px;
        // height: 230px;
        height: 200px;
        margin-left: 10px;

        float: left;
        .title {
          font-size: 16px;
          font-weight: 700;
        }
        i {
          font-size: 12px;
        }
        .box {
          border-radius: 4px;
          padding-bottom: 5px;
          .item_text_t {
            display: flex;
            padding: 5px;
            font-size: 12px;
            font-weight: 700;
          }
          .item_text {
            display: flex;
            padding: 0 5px;
            // border-bottom: 1px solid #eee;
            div {
              // width: 25%;
              line-height: 26px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding-left: 1px;
              padding-right: 1px;
              // &:hover {
              //   text-overflow: inherit;
              //   overflow: visible;
              // }
            }
            // &:nth-child(2n-1) {
            //   background-color: #eee;
            // }
          }
        }
      }
      .schedule_item {
        width: 100%;
        // box-sizing: border-box;
        // padding: 5px 20px;
        margin-left: 10px;

        float: left;
        .title {
          font-size: 16px;
          font-weight: 700;
        }
        i {
          font-size: 12px;
        }
        .box {
          border-radius: 4px;
          padding-bottom: 5px;
          .item_text_t {
            display: flex;
            padding: 5px;
            font-size: 12px;
            font-weight: 700;
          }
          .item_text {
            display: flex;
            padding: 0 5px;
            // border-bottom: 1px solid #eee;
            div {
              // width: 25%;
              line-height: 26px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding-left: 1px;
              padding-right: 1px;
              // &:hover {
              //   text-overflow: inherit;
              //   overflow: visible;
              // }
            }
            // &:nth-child(2n-1) {
            //   background-color: #eee;
            // }
          }
        }
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
    .col-left {
      padding-left:0 !important;
    }
    .col-right {
      padding-right:0 !important;
    }
  }

  .login-banner{
    height: 500px;
  }
  .el-carousel__container {
    height: 500px !important;
  }

  .el-carousel__item {
    background-color:#fff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
  }
</style>
