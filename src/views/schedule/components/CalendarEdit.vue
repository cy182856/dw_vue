<template>
  <div class="display: flex;flex-direction: column;height: 100%;">
    <div>
      <el-collapse v-model="activeNames" class="foldScroll" style="height:480px" @change="changeCollapse">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title must">
                {{ $t('calendar.taskName') }}
              </div>
              <div class="input">
                <el-input
                  v-model="eventObj.taskName"
                  size="small"
                  :placeholder="$t('calendar.taskName')"
                  :readonly="!canSave"
                  @blur="validator('taskName')"
                />
                <span ref="taskName" data-roles="required" :data-value="eventObj.taskName" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                {{ $t('calendar.scheduleType') }}
              </div>
              <div class="input">
                <dict-select v-model="eventObj.scheduleType" :disabled="!canSave" dict-type-id="ScheduleType" @change="(value)=>{validator('scheduleType',value)}" />
                <span ref="scheduleType" data-roles="required" :data-value="eventObj.scheduleType" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('calendar.allDayFlag') }}
              </div>
              <div class="input">
                <el-switch
                  v-model="eventObj.allDayFlag"
                  :disabled="!canSave"
                  active-value="1"
                  inactive-value="0"
                />
              </div>
            </div>
            <div class="flex2">
              <div v-if="eventObj.scheduleType==='todo'" class="title">
                {{ $t('calendar.taskCloseFlag') }}
              </div>
              <div v-if="eventObj.scheduleType==='todo'" class="input">
                <el-switch
                  v-model="eventObj.taskCloseFlag"
                  :disabled="!canSave"
                  active-value="1"
                  inactive-value="0"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                {{ $t('calendar.startDate') }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="eventObj.startDate"
                  size="small"
                  :readonly="!canSave"
                  class="input"
                  type="date"
                  value-format="yyyy-MM-dd"
                  @change="(value)=>{validator('startDate',value)}"
                />
                <span ref="startDate" data-roles="required" :data-value="eventObj.startDate" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div v-if="eventObj.allDayFlag&&eventObj.allDayFlag==='0'" class="title must">
                {{ $t('calendar.startTime') }}
              </div>
              <div v-if="eventObj.allDayFlag&&eventObj.allDayFlag==='0'" class="input">
                <el-time-select
                  v-model="eventObj.startTime"
                  size="small"
                  default-value="09:00"
                  :readonly="!canSave"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00'
                  }"
                  @change="(value)=>{validator('startTime',value)}"
                />
                <span ref="startTime" data-roles="required" :data-value="eventObj.startTime" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                {{ $t('calendar.endDate') }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="eventObj.endDate"
                  size="small"
                  class="input"
                  :readonly="!canSave"
                  type="date"
                  value-format="yyyy-MM-dd"
                  @change="(value)=>{validator('endDate',value)}"
                />
                <span ref="endDate" data-roles="required" :data-value="eventObj.endDate" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div v-if="eventObj.allDayFlag&&eventObj.allDayFlag==='0'" class="title must">
                {{ $t('calendar.endTime') }}
              </div>
              <div v-if="eventObj.allDayFlag&&eventObj.allDayFlag==='0'" class="input">
                <el-time-select
                  v-model="eventObj.endTime"
                  size="small"
                  :readonly="!canSave"
                  default-value="18:00"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00'
                  }"
                  @change="(value)=>{validator('endTime',value)}"
                />
                <span ref="endTime" data-roles="required" :data-value="eventObj.endTime" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('calendar.editOption') }}
              </div>
              <div class="input">
                <el-switch
                  v-model="eventObj.editFlag"
                  :disabled="!canGrant"
                  active-value="1"
                  inactive-value="0"
                />
                <span style="margin-left:10px">{{ $t('calendar.editOptionInfo') }}</span>
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('calendar.private') }}
              </div>
              <div class="input">
                <el-switch
                  v-model="eventObj.privateFlag"
                  :disabled="!canGrant"
                  active-value="0"
                  inactive-value="1"
                />
                <span style="margin-left:10px">{{ $t('calendar.privateInfo') }}</span>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">详细信息</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('calendar.address') }}
              </div>
              <div class="input">
                <el-input v-model="eventObj.address" size="small" :readonly="!canSave" maxlength="250" autocomplete="off" />
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                {{ $t('calendar.detail') }}
              </div>
              <div class="input">
                <el-input v-model="eventObj.detail" :readonly="!canSave" type="textarea" maxlength="256" autocomplete="off" show-word-limit />
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                {{ $t('calendar.attendee') }}
                <span>
                  <a v-if="canSave" class="el-icon-circle-plus-outline" :disabled="!canSave" @click="attendeeChoseDialogShow=true" />
                </span>
              </div>
              <div class="input">
                <el-input v-model="attendeeNames" readonly type="textarea" maxlength="256" autocomplete="off" />
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                {{ $t('calendar.attRes') }}
                <span>
                  <a v-if="canSave" class="el-icon-circle-plus-outline" @click="attResChoseDialogShow=true" />
                </span>
              </div>
              <div class="input">
                <el-input v-model="attResNames" readonly type="textarea" maxlength="256" autocomplete="off" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">附加信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                关联业务类型
              </div>
              <div class="input">
                <dict-select v-model="eventObj.relFunc" :disabled="!canSave" dict-type-id="ScheduleRelFuncDiv" @change="handleSelectClear" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('calendar.relFuncName') }}:
              </div>
              <div class="input">
                <rel-func-select v-model="eventObj.relFuncNum" :rel-func="eventObj.relFunc" :disabled="!eventObj.relFunc" />
                <!-- <el-input v-model="eventObj.relFuncName" size="small" class="input" :disabled="!canSave" suffix-icon="el-icon-search" @click.native="handleRelFuncClick(canSave)" /> -->
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                附件
              </div>
              <div class="input">
                <attachement v-model="eventObj.attachmentDetails" :readonly="!canSave" func-div="schedule" />
              </div>
            </div>
            <div class="flex2">
              <div v-if="!isCreate" class="title">
                {{ $t('calendar.createBy') }}
              </div>
              <div v-if="!isCreate" class="input">
                <span>{{ eventObj.owner | userName }}</span>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
      <li class="operation-item" @click="handleCancelClick">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
        <span class="operation-text">{{ $t('comm.cancel') }}</span>
      </li>
      <li v-if="canSave" class="operation-item" @click="handleSaveClick">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
        <span class="operation-text">{{ $t('comm.certain') }}</span>
      </li>
      <li v-if="canDelete" class="operation-item" @click="handleDeleteClick">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
        <span class="operation-text">{{ $t('comm.delete') }}</span>
      </li>
    </ul>
    <!-- <span class="footer">
      <el-button size="small" @click="handleCancelClick">{{ $t('comm.cancel') }}</el-button>
      <el-button v-if="canSave" size="small" type="primary" @click="handleSaveClick">{{ $t('comm.certain') }}</el-button>
      <el-button v-if="canDelete" size="small" type="danger" @click="handleDeleteClick">{{ $t('comm.delete') }}</el-button>
    </span> -->
    <div class="userSelect">
      <el-dialog
        :title="$t('calendar.addUser')"
        :visible.sync="attendeeChoseDialogShow"
        custom-class="content-dialog-userSelect"
        append-to-body
        :close-on-click-modal="false"
        width="25%"
      >
        <user-org-tree
          id="attendeeSelect"
          tree-type="personnel"
          :selected-key="eventObj.attUserIdList"
          @select="handleAttendeeSelect"
          @cancel="attendeeChoseDialogShow = false"
          @clear="handleAttendeeClear"
        />
      </el-dialog>
      <el-dialog
        :title="$t('calendar.addRes')"
        custom-class="content-dialog-userSelect"
        :visible.sync="attResChoseDialogShow"
        append-to-body
        :close-on-click-modal="false"
        width="25%"
      >
        <user-org-tree
          id="attResSelect"
          tree-type="personnel"
          :selected-key="eventObj.attResIdList"
          :root-org-id="assetRootOrgId"
          @select="handleAttResSelect"
          @cancel="attResChoseDialogShow = false"
          @clear="handleAttResClear"
        />
      </el-dialog>
    </div>
    <!-- <div>
      <el-dialog id="relFuncSelectDialog" title="业务数据选择" :visible.sync="relFuncSelectDialog" append-to-body width="80%">
        <account-pop v-if="eventObj.relFunc==='account'" @cancel="relFuncSelectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
        <decision-pop v-else-if="eventObj.relFunc==='decision'" @cancel="relFuncSelectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
        <contract-pop v-else-if="eventObj.relFunc==='contract'" @cancel="relFuncSelectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      </el-dialog>
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { saveSchedule } from '@/api/base.js'
import { getDictName } from '@/utils/util'
// import AccountPop from '@/views/mrk/account/components/AccountPop'
// import DecisionPop from '@/views/mgt/decision/components/DecisionPop'
// import ContractPop from '@/views/mgt/contract/components/ContractPop'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import { niceScroll } from '@/mixins/nice-scroll.js'

export default {
  name: 'CalendarEdit',
  components: { RelFuncSelect },
  mixins: [formValidator, names, niceScroll],
  props: {
    calendarEditObj: {
      type: Object,
      default() {
      }
    }
  },
  data() {
    return {
      activeNames: ['1', '2', '3'],
      attendeeChoseDialogShow: false,
      attResChoseDialogShow: false,
      relFuncSelectDialog: false,
      attendeeNames: '',
      attResNames: '',
      eventObj: { ... this.calendarEditObj },
      fileList: [],
      isCreate: false,
      canSave: false,
      canGrant: false,
      canDelete: false
    }
  },
  computed: {
    companyOrgId: function() { return this.$store.getters.userInfo.orgSeqNo.split('.')[1] },
    assetRootOrgId: () => getDictName('SysConfig', 'AssetRootOrgId'),
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.$store.dispatch('getDicts', 'SysConfig')
    if (this.eventObj.attendeeList) {
      this.eventObj.attUserIdList = this.eventObj.attendeeList.filter(att => att.attType === '0').map(item => item.attendee)
      this.attendeeNames = this.eventObj.attendeeList.filter(att => att.attType === '0').map(item => item.nickName).join('，')
      this.eventObj.attResIdList = this.eventObj.attendeeList.filter(att => att.attType === '1').map(item => item.attendee)
      this.attResNames = this.eventObj.attendeeList.filter(att => att.attType === '1').map(item => item.nickName).join('，')
    } else {
      this.eventObj.attUserIdList = []
      this.attendeeNames = ''
      this.eventObj.attResIdList = []
      this.attResNames = ''
    }

    if (!this.eventObj.id) {
      // ID不存在时，是新建
      this.isCreate = true
      this.canGrant = true
      this.canSave = true
    }
    // 日程拥有者可以删除
    if (this.eventObj.owner && this.eventObj.owner === this.userInfo.userId) {
      this.canDelete = true
      this.canSave = true
      this.canGrant = true
    }
    if (this.eventObj.editFlag === '1') {
      if (this.eventObj.attUserIdList.some(id => id === this.userInfo.userId)) {
        this.canSave = true
      }
    }
    console.log(this.eventObj)
    const _this = this
    setTimeout(function() {
      _this.handleOpenedFold()
      _this.scrollFild()
    }, 100)
  },
  methods: {
    changeCollapse() {
      const _this = this
      setTimeout(function() {
        _this.handleOpenedFold()
        _this.scrollFild()
      }, 300)
    },
    handleAttendeeSelect(nodes) {
      this.eventObj.attUserIdList = nodes.map(item => item.id)
      this.attendeeNames = nodes.map(item => item.text).join('，')
      this.attendeeChoseDialogShow = false
    },
    handleAttendeeClear() {
      this.eventObj.attendeeList = []
      this.attendeeNames = ''
      this.attendeeChoseDialogShow = false
    },
    handleAttResSelect(nodes) {
      this.eventObj.attResIdList = nodes.map(item => item.id)
      this.attResNames = nodes.map(item => item.text).join('，')
      this.attResChoseDialogShow = false
    },
    handleAttResClear() {
      this.eventObj.attResIdList = []
      this.attResNames = ''
      this.attResChoseDialogShow = false
    },
    handleCancelClick() {
      this.$emit('close')
    },
    async handleSaveClick() {
      if (!this.validatorAll()) {
        return false
      }
      const res = await saveSchedule(this.eventObj)
      if (res && res.success) {
        this.$emit('saved')
      }
    },
    handleDeleteClick() {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.eventObj.deleteFlag = 1
        const res = await saveSchedule(this.eventObj)
        if (res && res.success) {
          this.$emit('saved')
        }
      })
    },
    handleSelectClear() {
      this.eventObj.relFuncNum = ''
      this.eventObj.relFuncName = ''
      this.relFuncSelectDialog = false
    },
    handleRelFuncClick(canSave) {
      if (!this.eventObj.relFunc) {
        this.$message({
          type: 'error',
          message: '请选择业务类型'
        })
        return
      }
      if (canSave) {
        this.relFuncSelectDialog = true
      }
    },
    handleSelected(objs) {
      if (!objs || objs.length !== 1) {
        this.$message({
          type: 'error',
          message: '请选择一条记录'
        })
        return
      }
      this.eventObj.relFuncNum = objs[0].identiferNum
      this.eventObj.relFuncName = objs[0][this.eventObj.relFunc + 'Name']
      this.relFuncSelectDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .upload {
    .file_list {
      .item {
        width: 300px;
        display: flex;
        height: 25px;
        align-items: center;
        justify-content: space-between;
        line-height: 25px;
        margin: 5px 0;
        padding: 0 5px;
        box-sizing: border-box;
        cursor: pointer;
        .file_name {
          i {
            margin-right: 5px;
          }
        }
        &:hover {
          background-color: #eee;
          border-radius: 6px;
        }
        &:hover .file_name > i {
          color: red;
        }
        &:hover .file_name > span {
          color: #409EFF;
        }
      }
    }
    .content {
      // text-align: center;
      margin: 0 auto;
      width: 360px;
    }
  }
  .footer{
    text-align: right;
  }
 .foldScroll{
   overflow: hidden;
   .el-textarea{
    padding-right: 0px;
   }
   .el-select {
     width: 100%;
   }
 }
</style>
