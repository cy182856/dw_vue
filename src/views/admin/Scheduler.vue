<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="jobGroupName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.scheduler.jobGroupName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.jobGroupName" :placeholder="$t('admin.scheduler.jobGroupName')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="jobName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.scheduler.jobName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.jobName" :placeholder="$t('admin.scheduler.jobName')" clearable />
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
        <li class="operation-item" @click="handleCreateClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">{{ $t('comm.newlyBuild') }}</span>
        </li>
        <li class="operation-item" @click="handleBatchDeleteClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-delete" /></span>
          <span class="operation-text">  {{ $t('comm.batchDeletion') }}</span>
        </li>
        <li class="operation-item" @click="handleBatchPauseClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-video-pause" /></span>
          <span class="operation-text"> {{ $t('comm.suspend') }}</span>
        </li>
        <li class="operation-item" @click="handleBatchResumeClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-video-play" /></span>
          <span class="operation-text"> {{ $t('comm.recovery') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="schedulerList"
            border
            stripe
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column :label="$t('comm.operation')" min-width="120" width="120" align="center">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row, scope.$index)" />
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row, scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column
              prop="jobGroupName"
              :label="$t('admin.scheduler.jobGroupName')"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="jobName"
              :label="$t('admin.scheduler.jobName')"
              min-width="180"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <a class="link" @click.prevent="fetchJobExecLogs(scope.row)">{{ scope.row.jobName }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="triggerState"
              :label="$t('admin.scheduler.triggerState')"
              width="100"
            />
            <el-table-column
              prop="triggerType"
              :label="$t('admin.scheduler.triggerType')"
              width="80"
            />
            <el-table-column
              prop="previousFire"
              :label="$t('admin.scheduler.previousFire')"
              width="180"
              :formatter="(row, column, cellValue, index)=>{return cellValue?cellValue.substring(0, 19):''}"
            />
            <el-table-column
              prop="nextFireTime"
              :label="$t('admin.scheduler.nextFireTime')"
              width="180"
              :formatter="(row, column, cellValue, index)=>{return cellValue?cellValue.substring(0, 19):''}"
            />
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
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      :title="dialogType==='create'?$t('comm.newlyBuild'):$t('comm.edit')"
      :visible.sync="showDialog"
      width="70%"
      top="0"
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="input_box">
            <div class="flex2">
              <div class="title must">
                <!-- 任务组名 -->
                {{ $t('admin.scheduler.jobGroupName') }}
              </div>
              <div class="input">
                <el-input v-model="schedulerInfo.jobGroupName" class="input" :placeholder="$t('admin.scheduler.jobGroupName')" @blur="validator('jobGroupName')" />
                <span ref="jobGroupName" data-roles="required" :data-value="schedulerInfo.jobGroupName" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                <!-- 任务名称 -->
                {{ $t('admin.scheduler.jobName') }}
              </div>
              <div class="input">
                <el-input v-model="schedulerInfo.jobName" class="input" :placeholder="$t('admin.scheduler.jobName')" @blur="validator('jobName')" />
                <span ref="jobName" data-roles="required" :data-value="schedulerInfo.jobName" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                <!-- Class全名 -->
                {{ $t('admin.scheduler.className') }}
              </div>
              <div class="input">
                <el-input v-model="schedulerInfo.className" class="input" :placeholder="$t('admin.scheduler.className')" @blur="validator('className')" />
                <span ref="className" data-roles="required" :data-value="schedulerInfo.className" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                <el-button type="success" size="small" class="el-icon-video-play" @click.stop="handleExecClick">
                  <!-- 手动执行 -->
                  {{ $t('admin.scheduler.manualExecution') }}
                </el-button>
              </div>
              <div class="input" />
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                <!-- 开始时间 -->
                {{ $t('admin.scheduler.startTime') }}
              </div>
              <el-date-picker
                v-model="schedulerInfo.startTime"
                class="input"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :placeholder="$t('admin.scheduler.startTime')"
              />
            </div>
            <div class="flex2">
              <div class="title">
                <!-- 结束时间 -->
                {{ $t('admin.scheduler.endTime') }}
              </div>
              <el-date-picker
                v-model="schedulerInfo.endTime"
                class="input"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :placeholder="$t('admin.scheduler.endTime')"
              />
            </div>
            <div class="flex2">
              <div class="title must">
                <!-- 触发模式 -->
                {{ $t('admin.scheduler.triggerMode') }}
              </div>
              <div class="input">
                <el-radio v-model="schedulerInfo.triggerType" label="Cron" @change="(value)=>{validator('triggerType',value)}">
                  <!-- 日历周期触发 -->
                  {{ $t('admin.scheduler.calendarCycle') }}
                </el-radio>
                <el-radio v-model="schedulerInfo.triggerType" label="Simple" @change="(value)=>{validator('triggerType',value)}">
                  <!-- 固定间隔触发 -->
                  {{ $t('admin.scheduler.fixedInterval') }}
                </el-radio>
                <span ref="triggerType" data-roles="required" :data-value="schedulerInfo.triggerType" class="message" />
              </div>
            </div>
            <div v-if="schedulerInfo.triggerType === 'Simple'" class="flex2">
              <div :class="schedulerInfo.triggerType === 'Simple' ? 'title must':'title'">
                <!-- 间隔时刻(秒) -->
                {{ $t('admin.scheduler.interval') }}
              </div>
              <div class="input">
                <el-input v-model="schedulerInfo.intervalSeconds" class="input" :placeholder="$t('admin.scheduler.interval')" @blur="validator('intervalSeconds')" />
                <span ref="intervalSeconds" data-roles="required,positiveInt" :data-value="schedulerInfo.intervalSeconds" class="message" />
              </div>
            </div>
            <div v-if="schedulerInfo.triggerType === 'Cron'" class="flex2">
              <div class="title">
                {{ $t('admin.scheduler.cronExpression') }}
                <el-tooltip placement="top" class="tip">
                  <div slot="content">
                    Cron表示式 :秒 分 时 日 月 周 年(可选)<br>
                    示例:<br>
                    0 15 10 * * ? *
                    每天10:15运行。<br>
                    0 * 14 * * ?
                    每天14点到15点之间每分钟运行一次，开始于14:00，结束于14:59。<br>
                    0 0/5 14 * * ?
                    每天14点到15点每5分钟运行一次，开始于14:00，结束于14:55。<br>
                    0 0/5 14,18 * * ?
                    每天14点到15点每5分钟运行一次，此外每天18点到19点每5钟也运行一次。<br>
                    0 0-5 14 * * ?
                    每天14:00点到14:05，每分钟运行一次。<br>
                    0 10,44 14 ? 3 WED
                    每年三月的星期三的14:10和14:44分运行。<br>
                    0 15 10 ? * MON-FRI
                    每周一，二，三，四，五的10:15分运行。<br>
                    0 15 10 L * ?
                    每月最后一天10:15分运行。<br>
                    0 15 10 ? * 6L
                    每月最后一个星期五10:15分运行。<br>
                    0 15 10 ? * 6#3
                    每月第三个星期五的10:15分运行。
                  </div>
                  <i class="el-icon-info" />
                </el-tooltip>
              </div>
              <el-input v-model="schedulerInfo.cronExpression" class="input" placeholder="请输入Cron表示式" />
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                <!-- 运行参数 -->
                {{ $t('admin.scheduler.operationParameters') }}
              </div>
              <div class="input">
                <el-button type="primary" size="small" class="el-icon-circle-plus-outline" @click.stop="handleAddVarClick">
                  <!-- 增加 -->
                  {{ $t('admin.scheduler.add') }}
                </el-button>
              </div>
            </div>
          </div>
          <div v-for="(value,key,index) in schedulerInfo.jobPara" :key="index" class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('admin.scheduler.parameterName') }}
              </div>
              <el-input class="input" :value="key" disabled :placeholder="$t('admin.scheduler.parameterName')" />
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('admin.scheduler.parameterValue') }}
              </div>
              <div class="input">
                <el-input class="input" :value="value" :placeholder="$t('admin.scheduler.parameterValue')" @input="handleInput($event,key)" />
                <el-button size="mini" icon="el-icon-delete" style="margin-left:10px" type="danger" @click="handleDeleteVar(key)" />
              </div>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="showDialog = false">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" :disabled="!validatorState" @click="handleSaveClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      title="增加参数"
      :visible.sync="showAddVarDialog"
      width="70%"
      append-to-body
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('admin.scheduler.parameterName') }}
              </div>
              <div class="input">
                <el-input v-model="varObjct.key" :placeholder="$t('admin.scheduler.parameterName')" />
                <span ref="key" data-roles="required" :data-value="varObjct.key" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('admin.scheduler.parameterValue') }}
              </div>
              <div class="input">
                <el-input v-model="varObjct.value" :placeholder="$t('admin.scheduler.parameterValue')" />
                <span ref="value" data-roles="required" :data-value="varObjct.value" class="message" />
              </div>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="showAddVarDialog = false">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleAddVarOKClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="showAddVarDialog = false">{{ $t('comm.cancel') }}</el-button>
        <el-button type="primary" @click="handleAddVarOKClick">{{ $t('comm.certain') }}</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title=" $t('admin.scheduler.jobExecLogs')"
      :visible.sync="showJobExecLogDialog"
      width="60%"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="dialog-search-box middle-input">
            <el-form ref="searchForm" label-width="80px" label-position="left">
              <el-row type="flex" justify="space-between">
                <el-col :span="10">
                  <el-form-item :label="$t('admin.scheduler.startTime')" prop="startTimeFrom">
                    <el-date-picker v-model="historySearchParam.params.startTimeFrom" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :label="$t('admin.scheduler.endTime')" prop="startTimeTo">
                    <el-date-picker v-model="historySearchParam.params.startTimeTo" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
                  </el-form-item>
                </el-col>
                <el-col :span="2" />
              </el-row>
              <el-form-item style="margin-bottom:0 !important">
                <ul class="operation-box dialog-btn-box end-content-flex mcbtn">
                  <li class="operation-item" @click="search">
                    <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
                    <span class="operation-text">{{ $t('comm.query') }}</span>
                  </li>
                  <li class="operation-item" @click="reset">
                    <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                    <span class="operation-text"> {{ $t('comm.reset') }}</span>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="footer-box">
          <div class="dialog-table-box">
            <el-table
              ref="logTable"
              v-loading="isLoading"
              :data="logs"
              border
              stripe
              height="300"
            >
              <el-table-column :label="$t('admin.scheduler.startTime')" width="140">
                <template slot-scope="scope">
                  {{ scope.row.startTime }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('admin.scheduler.endTime')" width="140">
                <template slot-scope="scope">
                  {{ scope.row.endTime }}
                </template>
              </el-table-column>
              <el-table-column prop="result" :label="$t('admin.scheduler.result')" min-width="80">
                <template slot-scope="scope">
                  {{ scope.row.result | dictName('JobExecResult') }}
                </template>
              </el-table-column>
              <el-table-column prop="errMsg" :label="$t('admin.scheduler.errMsg')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="createBy" :label="$t('admin.scheduler.createBy')" min-width="90" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.createBy | userName }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination
              class="page-left"
              :current-page.sync="historySearchParam.pageNo"
              :page-size="historySearchParam.pageSize"
              layout="total,sizes"
              :total="historySearchParam.totalRecord"
              popper-class="blueDL"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
            <el-pagination
              class="page-right"
              :current-page.sync="historySearchParam.pageNo"
              :page-size="historySearchParam.pageSize"
              layout="prev,pager,next,slot,jumper"
              :total="historySearchParam.totalRecord"
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
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { formValidator } from '@/mixins/form-validator.js'
import { getSchedulers, deleteScheduler, pauseScheduler, resumeScheduler, saveScheduler, execScheduler, getJobExecLogs } from '@/api/admin/scheduler-api.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
import { names } from '@/mixins/names.js'
export default {
  mixins: [search, formValidator, niceScroll, names],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      dialogType: 'create',
      showDialog: false,
      showAddVarDialog: false,
      showJobExecLogDialog: false,
      schedulerList: [],
      totalList: [],
      logs: [],
      multipleSelection: [],
      schedulerInfo: {},
      varObjct: { key: '', value: '' },
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          jobGroupName: '',
          jobName: ''
        }
      },
      historySearchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          className: '',
          jobName: '',
          jobGroup: '',
          startTimeFrom: '',
          startTimeTo: ''
        }
      }
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    search() {
      if (this.schedulerList) {
        this.schedulerList = []
      }
      if (this.isLoading === false) {
        if (this.showJobExecLogDialog) {
          this.historySearchParam.pageNo = 1
          this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.historySearchParam })
          this.fetchJobExecLogs()
        } else {
          this.searchParam.pageNo = 1
          this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.searchParam })
          this.fetchData()
        }
      }
    },
    reset() {
      if (this.schedulerList) {
        this.schedulerList = []
      }
      if (this.showJobExecLogDialog) {
        this.historySearchParam.params.startTimeFrom = ''
        this.historySearchParam.params.startTimeTo = ''
      } else {
        for (const item in this.searchParam.params) {
          this.searchParam.params[item] = ''
        }
      }
    },
    async fetchData() {
      const res = await getSchedulers(this.searchParam)
      this.isLoading = true
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.totalList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
        this.schedulerList = this.totalList.slice((pageNo - 1) * this.searchParam.pageSize, pageNo * this.searchParam.pageSize)
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleSizeChange(pageSize) {
      if (this.showJobExecLogDialog) {
        this.historySearchParam.pageNo = 1
        this.historySearchParam.pageSize = pageSize
        this.fetchJobExecLogs()
      } else {
        this.searchParam.pageNo = 1
        this.searchParam.pageSize = pageSize
        this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.searchParam })
        const start = (this.searchParam.pageNo - 1) * this.searchParam.pageSize
        this.schedulerList = this.totalList.slice(start, start + this.searchParam.pageSize)
      }
    },
    handleCurrentChange(currentPage) {
      if (this.showJobExecLogDialog) {
        this.historySearchParam.pageNo = currentPage
        this.fetchJobExecLogs()
      } else {
        this.searchParam.pageNo = currentPage
        this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.searchParam })
        const start = (this.searchParam.pageNo - 1) * this.searchParam.pageSize
        this.schedulerList = this.totalList.slice(start, start + this.searchParam.pageSize)
      }
    },
    toLastPage() {
      if (this.showJobExecLogDialog) {
        this.historySearchParam.pageNo = Math.ceil(this.historySearchParam.totalRecord / this.historySearchParam.pageSize)
        this.handleCurrentChange(this.historySearchParam.pageNo)
      } else {
        this.searchParam.pageNo = Math.ceil(this.searchParam.totalRecord / this.searchParam.pageSize)
        this.handleCurrentChange(this.searchParam.pageNo)
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleExecClick() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        await execScheduler(this.schedulerInfo)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    // 增加参数按钮
    handleAddVarClick() {
      this.varObjct.key = ''
      this.varObjct.value = ''
      this.showAddVarDialog = true
      this.$nextTick(function() {
        this.setValidatorMessage('key', '')
        this.setValidatorMessage('value', '')
      })
    },
    // 增加参数确定按钮
    handleAddVarOKClick() {
      let checkResult = true
      if (!this.varObjct.key) {
        this.setValidatorMessage('key', this.$t('comm.msg24'))
        checkResult = false
      }
      if (!this.varObjct.value) {
        this.setValidatorMessage('value', this.$t('comm.msg24'))
        checkResult = false
      }
      if (!checkResult) {
        return
      }
      this.$set(this.schedulerInfo.jobPara, this.varObjct.key, this.varObjct.value)
      this.showAddVarDialog = false
    },
    handleCreateClick() {
      this.schedulerInfo = { jobPara: {}}
      this.dialogType = 'create'
      this.validatorState = false
      this.showDialog = true
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    handleDelete(val) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await deleteScheduler([val])
        if (res && res.success) {
          this.fetchData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleDeleteVar(val) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.$delete(this.schedulerInfo.jobPara, val)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleEdit(val) {
      this.schedulerInfo = { ...val }
      this.dialogType = 'edit'
      this.validatorState = true
      this.showDialog = true
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    handleInput(val, key) {
      this.$set(this.schedulerInfo.jobPara, key, val)
    },
    handleSaveClick() {
      if (!this.validatorAll()) {
        return false
      }
      this.$confirm(this.$t('comm.tip10'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await saveScheduler(this.schedulerInfo)
        if (res && res.success) {
          this.showDialog = false
          this.fetchData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleBatchDeleteClick() {
      if (!this.multipleSelection || !this.multipleSelection.length) {
        return
      }
      this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await deleteScheduler(this.multipleSelection)
        if (res && res.success) {
          this.fetchData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleBatchPauseClick() {
      if (!this.multipleSelection || !this.multipleSelection.length) {
        return
      }
      this.$confirm(this.$t('comm.tip11'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await pauseScheduler(this.multipleSelection)
        if (res && res.success) {
          this.fetchData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleBatchResumeClick() {
      if (!this.multipleSelection || !this.multipleSelection.length) {
        return
      }
      this.$confirm(this.$t('comm.tip12'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await resumeScheduler(this.multipleSelection)
        if (res && res.success) {
          this.fetchData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    // 出现纵向滚动条时，防止表头行错位
    tableDolayout(refTable) {
      setTimeout(() => {
        if (refTable) refTable.doLayout()
      },
      1000)
    },
    async fetchJobExecLogs(row) {
      if (row) {
        this.historySearchParam.params.className = row.className
        this.historySearchParam.params.jobName = row.jobName
        this.historySearchParam.params.jobGroup = row.jobGroup
        this.historySearchParam.params.jobGroupName = row.jobGroupName
      }
      if (!this.showJobExecLogDialog) {
        this.historySearchParam.pageNo = 1
        this.historySearchParam.params.startTimeFrom = ''
        this.historySearchParam.params.startTimeTo = ''
      }
      const res = await getJobExecLogs(this.historySearchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.historySearchParam.pageNo = pageNo
        this.historySearchParam.totalRecord = totalRecord
        this.logs = results
      }
      this.showJobExecLogDialog = true
      this.tableDolayout(this.$refs['logTable'])

      this.isLoading = false

      const _this = this
      setTimeout(function() {
        _this.scroll()
        _this.handleOpened()
      }, 100)
    }

  }
}
</script>
<style lang="scss" scoped>
  .permissions {
    .createDialog {
      .createBox {
        h5 {
          font-size: 14px;
          padding-left: 10px;
          line-height: 26px;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
</style>
