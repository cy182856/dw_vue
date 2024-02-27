<template>
  <div class="display: flex;flex-direction: column;height: 100%;">
    <div>
      <el-collapse
        v-model="activeNames"
        class="foldScroll"
        style="height: 280px"
        @change="changeCollapse"
      >
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{
            $t("comm.essentialInformation")
          }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title must">
                {{ $t("calendar.startDate") }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="eventObj.startDate"
                  size="small"
                  class="input"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
                <span
                  ref="startDate"
                  data-roles="required"
                  :data-value="eventObj.startDate"
                  class="message"
                />
              </div>
            </div>
            <div class="flex2" />
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.shopNo") }}
              </div>
              <div class="input">
                <el-input
                  v-model="eventObj.shopNo"
                  size="small"
                  :placeholder="$t('sale.shop.shopNo')"
                />
                <span
                  ref="taskName"
                  data-roles="required"
                  :data-value="eventObj.taskName"
                  class="message"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.shopName") }}
              </div>
              <div class="input">
                <el-input
                  v-model="eventObj.shopName"
                  size="small"
                  :placeholder="$t('sale.shop.shopName')"
                />
                <span
                  ref="taskName"
                  data-roles="required"
                  :data-value="eventObj.taskName"
                  class="message"
                />
              </div>
            </div>

            <div class="flex2">
              <div class="title">
                {{ $t("sale.workreport.visitType") }}
              </div>
              <div class="input">
                <el-select v-model="eventObj.visitType" placeholder="请选择">
                  <el-option
                    v-for="item in visitTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex2" />
            <div class="flex1">
              <div class="title">
                {{ $t("calendar.detail") }}
              </div>
              <div class="input">
                <el-input
                  v-model="eventObj.desc"
                  type="textarea"
                  maxlength="256"
                  autocomplete="off"
                  show-word-limit
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
      <li class="operation-item" @click="handleCancelClick">
        <span
          class="operation-circle circle-middle-btn btn-light-color bluebg"
        ><i
          class="iconfont iconquxiao"
        /></span>
        <span class="operation-text">{{ $t("comm.cancel") }}</span>
      </li>
      <li class="operation-item" @click="handleSaveClick">
        <span
          class="operation-circle circle-middle-btn btn-light-color bluebg"
        ><i
          class="iconfont iconqueren"
        /></span>
        <span class="operation-text">{{ $t("comm.certain") }}</span>
      </li>
      <li v-if="canDelete" class="operation-item" @click="handleDeleteClick">
        <span
          class="operation-circle circle-middle-btn btn-light-color bluebg"
        ><i
          class="iconfont iconshanchu"
        /></span>
        <span class="operation-text">{{ $t("comm.delete") }}</span>
      </li>
    </ul>
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
import { niceScroll } from '@/mixins/nice-scroll.js'

export default {
  name: 'CalendarEdit',
  mixins: [formValidator, names, niceScroll],
  props: {
    calendarEditObj: {
      type: Object,
      default() {}
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
      eventObj: { ...this.calendarEditObj },
      fileList: [],
      isCreate: false,
      canGrant: false,
      canDelete: false,
      visitTypeList: [
        {
          value: '1',
          label: '普通门店'
        },
        {
          value: '2',
          label: '特别合作门店'
        }
      ]
    }
  },
  computed: {
    companyOrgId: function() {
      return this.$store.getters.userInfo.orgSeqNo.split('.')[1]
    },
    assetRootOrgId: () => getDictName('SysConfig', 'AssetRootOrgId'),
    ...mapGetters(['userInfo'])
  },
  created() {
    this.$store.dispatch('getDicts', 'SysConfig')
    if (this.eventObj.attendeeList) {
      this.eventObj.attUserIdList = this.eventObj.attendeeList
        .filter((att) => att.attType === '0')
        .map((item) => item.attendee)
      this.attendeeNames = this.eventObj.attendeeList
        .filter((att) => att.attType === '0')
        .map((item) => item.nickName)
        .join('，')
      this.eventObj.attResIdList = this.eventObj.attendeeList
        .filter((att) => att.attType === '1')
        .map((item) => item.attendee)
      this.attResNames = this.eventObj.attendeeList
        .filter((att) => att.attType === '1')
        .map((item) => item.nickName)
        .join('，')
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
    }
    // 日程拥有者可以删除
    if (this.eventObj.owner && this.eventObj.owner === this.userInfo.userId) {
      this.canDelete = true
      this.canGrant = true
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
      this.eventObj.attUserIdList = nodes.map((item) => item.id)
      this.attendeeNames = nodes.map((item) => item.text).join('，')
      this.attendeeChoseDialogShow = false
    },
    handleAttendeeClear() {
      this.eventObj.attendeeList = []
      this.attendeeNames = ''
      this.attendeeChoseDialogShow = false
    },
    handleAttResSelect(nodes) {
      this.eventObj.attResIdList = nodes.map((item) => item.id)
      this.attResNames = nodes.map((item) => item.text).join('，')
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
      this.$emit('saved')
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
        color: #409eff;
      }
    }
  }
  .content {
    // text-align: center;
    margin: 0 auto;
    width: 360px;
  }
}
.footer {
  text-align: right;
}
.foldScroll {
  overflow: hidden;
  .el-textarea {
    padding-right: 0px;
  }
  .el-select {
    width: 100%;
  }
}
</style>
