<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="agentFrom">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.wfProxy.agentType') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.agentFrom" :placeholder="$t('admin.wfProxy.agentType')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="agentTo">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.wfProxy.agentToName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.agentTo" :placeholder="$t('admin.wfProxy.agentToName')" clearable />
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
        <li class="operation-item" @click="create">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">{{ $t('comm.newlyBuild') }}</span>
        </li>
        <li class="operation-item" @click="batchDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-delete" /></span>
          <span class="operation-text">  {{ $t('comm.batchDeletion') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="tableData"
            border
            stripe
            style="width: 100%"
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              align="center"
              :label="$t('comm.operation')"
              min-width="120"
              width="120"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="editDetail(scope.row, scope.$index)" />
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="remove(scope.row, scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              :label="$t('admin.wfProxy.proxyId')"
              width="100"
            />
            <el-table-column prop="agentType" :label="$t('admin.wfProxy.agentFromName')" width="100">
              <template slot-scope="scope">
                <dict-write dict-type-id="AgentType" :value="scope.row.agentType" />
              </template>
            </el-table-column>
            <el-table-column
              prop="agentFromName"
              :label="$t('admin.wfProxy.agentType')"
              min-width="100"
            />
            <el-table-column
              prop="agentToName"
              :label="$t('admin.wfProxy.agentToName')"
              min-width="100"
            />
            <el-table-column
              prop="startTime"
              :label="$t('admin.wfProxy.startTime')"
              min-width="160"
            />
            <el-table-column
              prop="endTime"
              :label="$t('admin.wfProxy.endTime')"
              min-width="160"
            />
            <el-table-column
              prop="agentReason"
              :label="$t('admin.wfProxy.agentReason')"
              show-overflow-tooltip
              min-width="100"
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
      top="0"
      :title="dialogType==='create'?$t('comm.newlyBuild'):$t('comm.edit')"
      :visible.sync="showDialog"
      width="60%"
      @opened="handleOpened"
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="input_box">
            <div v-show="dialogType === 'edit'" class="flex2">
              <div class="title">
                <!-- 代理ID -->
                {{ $t('admin.wfProxy.proxyId') }}
              </div>
              <el-input v-model="dialogObj.id" class="input" disabled="disabled" />
            </div>
            <div class="flex2">
              <div class="title">
                <!-- 代理类型 -->
                {{ $t('admin.wfProxy.agentFromName') }}
              </div>
              <div class="input">
                <dict-select v-model="dialogObj.agentType" class="input" dict-type-id="AgentType" @change="(value) => {validator('agentType', value)}" />
                <span ref="agentType" data-roles="required" :data-value="dialogObj.agentType" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                <!-- 委托人 -->
                {{ $t('admin.wfProxy.agentType') }}
              </div>
              <div class="input">
                <el-input v-model="assignee.name" class="input" readonly :placeholder="$t('admin.wfProxy.agentType')">
                  <i slot="suffix" class="iconfont icon-zuzhijiagou" @click.stop="openSelect('assignee')" />
                </el-input>
                <span ref="assignee" data-roles="required" :data-value="assignee.name" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                <!-- 代理人 -->
                {{ $t('admin.wfProxy.agentToName') }}
              </div>
              <div class="input">
                <el-input v-model="agent.name" class="input" readonly :placeholder="$t('admin.wfProxy.agentToName')">
                  <i slot="suffix" class="iconfont icon-zuzhijiagou" @click.stop="openSelect('agent')" />
                </el-input>
                <span ref="agent" data-roles="required" :data-value="agent.name" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                <!-- 开始时间 -->
                {{ $t('admin.wfProxy.startTime') }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="dialogObj.startTime"
                  class="input"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :placeholder="$t('admin.wfProxy.startTime')"
                  @blur="validator('startTime')"
                />
                <span ref="startTime" data-roles="required" :data-value="dialogObj.startTime" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                <!-- 结束时间 -->
                {{ $t('admin.wfProxy.endTime') }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="dialogObj.endTime"
                  class="input"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :placeholder="$t('admin.wfProxy.endTime')"
                  @blur="validator('endTime')"
                />
                <span ref="endTime" data-roles="required" :data-value="dialogObj.endTime" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                <!-- 代理理由 -->
                {{ $t('admin.wfProxy.agentReason') }}
              </div>
              <el-input
                v-model="dialogObj.agentReason"
                class="input"
                type="textarea"
                style="padding-right:0px"
                :rows="4"
                :placeholder="$t('admin.wfProxy.agentReason')"
              />
            </div>
          </div>
        </div>
        <div v-show="dialogObj.agentType == 'PART'" class="footer-box">
          <h5>
            {{ $t('admin.wfProxy.processDefinitionSelect') }}
            : <div class="add_row iconfont icon-jia" @click.stop="handleAddTableRows">
              <!-- 增加流程 -->
              {{ $t('admin.wfProxy.addProcess') }}
            </div>
          </h5>
          <div class="table">
            <el-table
              :data="processTable"
              border
              stripe
              height="180"
              style="width: 100%"
            >
              <el-table-column>
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="processChose(scope.$index)">
                    <!-- 流程选择 -->
                    {{ $t('admin.wfProxy.selcetProcess') }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column :label="$t('admin.wfProxy.processDefinitionKey')">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.procDefKey" disabled="disabled" />
                </template>
              </el-table-column>
              <el-table-column :label="$t('admin.wfProxy.processDefinitionName')">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.procDefName" disabled="disabled" />
                </template>
              </el-table-column>
              <!-- <el-table-column v-if="dialogType === 'edit'" :label="$t('admin.wfProxy.proxyId')">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.agentId" disabled="disabled" />
                  </template>
                </el-table-column> -->
              <el-table-column :label="$t('comm.operation')">
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteRow(scope.row, scope.$index)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="showDialog = false">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleSave">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
        <div class="userSelect">
          <el-dialog
            :title="$t('admin.wfProxy.selectUser')"
            :visible.sync="selectUserDialog"
            append-to-body
            custom-class="content-dialog-userSelect"
            :close-on-click-modal="false"
            width="25%"
          >
            <user-org-tree
              :tree-type="treeType"
              :multiple="false"
              @select="handleTreeSelect"
              @cancel="selectUserDialog=false"
              @clear="handleTreeClear"
            />
          </el-dialog>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">{{ $t('comm.cancel') }}</el-button>
        <el-button type="primary" @click="handleSave">{{ $t('comm.certain') }}</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title="$t('admin.wfProxy.selcetProcess')"
      :visible.sync="processChoseDialog"
      width="50%"
      @opened="handleOpened"
    >
      <div class="middle-box">
        <el-table
          ref="singleTable"
          :data="processChoseData"
          highlight-current-row
          stripe
          height="400"
          style="width: 100%;"
          @current-change="processChoseChange"
        >
          <el-table-column
            type="index"
            width="70"
          />
          <el-table-column
            property="key"
            width="200"
            :label="$t('admin.wfProxy.processDefinitionKey')"
          />
          <el-table-column
            property="name"
            width="230"
            :label="$t('admin.wfProxy.processDefinitionName')"
          />
          <el-table-column
            property="description"
            width="350"
            :label="$t('admin.wfProxy.desc')"
          />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { search } from '@/mixins/search-params'
import { getProxyList, getFlowDef, getDefByAgentId, proxyAdd, proxySave, proxyDelete } from '@/api/admin/workflow-api.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  mixins: [search, formValidator, niceScroll],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      dialogType: 'create',
      tableData: [],
      searchParam: {
        paging: true,
        pageNo: 1,
        pageSize: 10,
        totalRecord: null,
        params: {
          agentFrom: '',
          agentTo: ''
        }
      },
      assignee: {
        name: '',
        id: ''
      },
      agent: {
        name: '',
        id: ''
      },
      currentPage: 1,
      showDialog: false,
      dialogObj: {},
      selectUserDialog: false,
      activeInput: '',
      treeType: 'personnel',
      selectData: '',
      processChoseDialog: false,
      processChoseData: [],
      processTable: [],
      processCurrentRow: null,
      index: Number,
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData: async function() {
      const res = await getProxyList(this.searchParam)
      this.isLoading = true
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.tableData = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    resetTable(params) {
      for (var i in params) {
        params[i] = ''
      }
    },
    create() {
      this.clearErrorMessage()
      this.resetTable(this.dialogObj)
      this.resetTable(this.assignee)
      this.resetTable(this.agent)
      this.dialogType = 'create'
      this.processTable = []
      this.showDialog = true
    },
    editDetail(data, index) {
      this.clearErrorMessage()
      getDefByAgentId(data.id).then(res => {
        this.processTable = res.datas.result
        this.dialogObj = { ...data }
        this.assignee.id = data.agentFrom
        this.assignee.name = data.agentFromName
        this.agent.id = data.agentTo
        this.agent.name = data.agentToName
        this.dialogType = 'edit'
        this.showDialog = true
      })
    },
    handleSave() {
      if (!this.validatorAll()) {
        return false
      }
      this.dialogObj.agentFrom = this.assignee.id
      this.dialogObj.agentTo = this.agent.id
      this.dialogObj.actAgentItemList = this.processTable
      if (this.dialogType === 'create') {
        proxyAdd(this.dialogObj).then(res => {
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: this.$t('comm.success')
            })
            this.showDialog = false
            this.fetchData()
          }
        })
      }
      if (this.dialogType === 'edit') {
        proxySave(this.dialogObj).then(res => {
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: this.$t('comm.success')
            })
            this.showDialog = false
            this.fetchData()
          }
        })
      }
    },
    remove(data, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        proxyDelete([{ id: data.id }]).then(res => {
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: this.$t('comm.msg2')
            })
            this.fetchData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    batchDelete() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          proxyDelete(this.multipleSelection).then(res => {
            if (res && res.success) {
              this.$message({
                type: 'success',
                message: this.$t('comm.msg2')
              })
              this.fetchData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleTreeSelect(data) {
      if (data.type !== 'user') {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg4')
        })
        return false
      }
      this[this.activeInput].name = data.text
      this[this.activeInput].id = data.id
      this.selectUserDialog = false
      this.validator(this.activeInput, this[this.activeInput].name)
    },
    handleTreeClear() {
      this[this.activeInput].name = ''
      this[this.activeInput].id = ''
      this.selectUserDialog = false
      this.validator(this.activeInput, this[this.activeInput].name)
    },
    openSelect(activeInput) {
      this.activeInput = activeInput
      this.selectData = this[this.activeInput]
      this.selectUserDialog = true
    },
    // selectNode(data) {
    //   this.selectData = data
    // },
    // addNode() {
    //   const data = this.selectData
    //   if (data.id === '_1') {
    //     this.$message({
    //       type: 'error',
    //       message: this.$t('comm.msg4')
    //     })
    //     return false
    //   }
    //   if (this.treeType === 'personnel') {
    //     // 只要人员，排除部门
    //     if (data.type !== 'user') {
    //       this.$message({
    //         type: 'error',
    //         message: this.$t('comm.msg4')
    //       })
    //       return false
    //     }
    //   }
    //   const id = data.id
    //   const name = data.text || data.name
    //   this[this.activeInput].name = name
    //   this[this.activeInput].id = id
    //   this.selectUserDialog = false
    //   this.validator(this.activeInput, this[this.activeInput].name)
    // },
    handleAddTableRows() {
      const newRow = {
        procDefKey: '',
        proDefName: '',
        agentId: ''
      }
      this.processTable = [...this.processTable, newRow]
      this.scroll()
    },
    handleDeleteRow(data, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.processTable.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
      this.scroll()
    },
    processChose(index) {
      getFlowDef().then(res => {
        this.index = index
        this.processChoseData = res.datas.result
        this.processChoseDialog = true
      })
    },
    processChoseChange(val) {
      if (val != null) {
        let flag = true
        this.processTable.forEach(data => {
          if (data.procDefKey === val.key) {
            flag = false
            return false
          }
        })
        if (flag) {
          this.processTable[this.index].procDefKey = val.key
          this.processTable[this.index].procDefName = val.name
          this.processTable[this.index].agentId = this.dialogObj.id
        }
        this.processChoseDialog = false
      }
      // this.processCurrentRow = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
.agent {
  .create_box {
    .input {
      .iconfont {
        cursor: pointer;
        line-height: 40px;
        color: skyblue;
      }
    }
  }
}
</style>
