<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="instId">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.wfInst.processInstanceId') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.instId" :placeholder="$t('admin.wfInst.processInstanceId')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="def">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.wfInst.processDefinitionName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.def" :placeholder="$t('admin.wfInst.processDefinitionName')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="instName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.wfInst.exampleName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.instName" :placeholder="$t('admin.wfInst.exampleName')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="startedBy">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.wfInst.startedBy') }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.startedBy" :placeholder="$t('admin.wfInst.startedBy')" class="input" />
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
          >
            <el-table-column
              align="center"
              :label="$t('comm.operation')"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="editDetail(scope.row, scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('admin.wfInst.processInstanceId')" width="120">
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleProcessInstClick(scope.row.id)">{{ scope.row.id }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="businessKey"
              :label="$t('admin.wfInst.businessKey')"
              min-width="100"
            />
            <el-table-column
              prop="processDefinitionId"
              :label="$t('admin.wfInst.processDefinitionId')"
              min-width="140"
              show-overflow-tooltip
            />
            <el-table-column
              prop="processDefinitionName"
              :label="$t('admin.wfInst.processDefinitionName')"
              min-width="120"
            />
            <el-table-column :label="$t('admin.wfInst.exampleName')" min-width="120">
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleDetailClick(scope.row)">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
            <el-table-column :label="$t('admin.wfInst.startedBy')" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.startUserId | userName }}
              </template>
            </el-table-column>
            <el-table-column
              prop="startTime"
              :label="$t('admin.wfInst.startTime')"
              min-width="140"
            />
            <el-table-column
              prop="endTime"
              min-width="140"
              :label="$t('admin.wfInst.endTime')"
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
      custom-class="dialog-drag dialog-drag-heightAuto  fixed-search-btn-box"
      top="0"
      title="详情修改"
      :visible.sync="aditDialog"
      width="80%"
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <el-tabs v-model="activeName" @tab-click="handleClick()">
            <el-tab-pane :label="$t('admin.wfInst.taskDetails')" name="first">
              <el-table
                :data="detailData"
                height="390"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  :label="$t('admin.wfInst.taskId')"
                >
                  <template slot-scope="scope">
                    <router-link v-if="scope.row.endTime == null" :to="{path: scope.row.formKey, query: {taskId: scope.row.id, processInstId: scope.row.processInstId, businessKey: scope.row.businessKey}}">
                      {{ scope.row.id }}
                    </router-link>
                    <div v-else>
                      {{ scope.row.id }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  :label="$t('admin.wfInst.taskName')"
                />
                <el-table-column
                  prop="assigneeName"
                  :label="$t('admin.wfInst.assignee')"
                />
                <el-table-column
                  prop="processInstId"
                  :label="$t('admin.wfInst.processInstanceId')"
                />
                <el-table-column
                  prop="executionId"
                  :label="$t('admin.wfInst.implementId')"
                />
                <el-table-column
                  prop="processDefinitionId"
                  :label="$t('admin.wfInst.processDefinitionId')"
                />
                <el-table-column
                  prop="endTime"
                  :label="$t('admin.wfInst.endTime')"
                />
                <el-table-column
                  align="center"
                  :label="$t('comm.operation')"
                  width="300"
                >
                  <template slot-scope="scope">
                    <div v-show="scope.row.endTime == null">
                      <el-button size="mini" type="success" @click="taskComplete(scope.row, scope.$index)">
                        <!-- 完成 -->
                        {{ $t('admin.wfInst.complete') }}
                      </el-button>
                      <el-button size="mini" type="danger" @click="taskReject(scope.row, scope.$index)">
                        <!-- 驳回 -->
                        {{ $t('admin.wfInst.reject') }}
                      </el-button>
                      <el-button size="mini" type="primary" @click="changeDeliver(scope.row, scope.$index)">
                        <!-- 改派 -->
                        {{ $t('admin.wfInst.reform') }}
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="isEnd" :label="$t('admin.wfInst.processVariable')" name="second">
              <el-table
                :data="varList"
                height="390"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  :label="$t('admin.wfInst.processInstanceId')"
                >
                  <el-input v-model="instId" disabled="disabled" />
                </el-table-column>
                <el-table-column
                  :label="$t('admin.wfInst.variableName')"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.key" disabled="disabled" />
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('admin.wfInst.variableValue')"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" disabled="disabled" />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-else :label="$t('admin.wfInst.processVariable')" name="second">
              <h4>
                <el-button type="primary" size="mini" class="el-icon-circle-plus-outline" @click="addVariable">
                  <!-- 增加变量 -->
                  {{ $t('admin.wfInst.addVariable') }}
                </el-button>
              </h4>
              <el-table
                :data="varList"
                height="359"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  :label="$t('admin.wfInst.processInstanceId')"
                >
                  <el-input v-model="instId" disabled="disabled" />
                </el-table-column>
                <el-table-column
                  :label="$t('admin.wfInst.variableName')"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.key" :disabled="scope.$index < length" />
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('admin.wfInst.variableValue')"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" />
                  </template>
                </el-table-column>
              <!-- <el-table-column
                align="center"
                :label="$t('comm.operation')"
                min-width="60"
                width="60"
              >
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="deleteVarRow(scope.row, scope.$index)">
                    {{ $t('comm.delete') }}
                  </el-button>
                </template>
              </el-table-column> -->
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="aditDialog = false">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li v-if="!isEnd" class="operation-item" @click="addVars">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto  fixed-search-btn-box"
      top="0"
      :title="$t('admin.wfInst.reject')"
      :visible.sync="rejectDialog"
      width="50%"
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                <!-- 驳回理由： -->
                {{ $t('admin.wfInst.rejectReason') }}
              </div>
              <div class="input">
                <el-input v-model="taskBackData.comment" :placeholder="$t('admin.wfInst.rejectReason')" class="input" />
              </div>
            </div>
          </div>
        </div>
        <div class="footer-box">
          <div class="dialog-table-box">
            <el-table
              :data="activityList"
              stripe
              highlight-current-row
              height="200"
              @current-change="rejectCurrentChange"
            >
              <el-table-column
                type="index"
                width="50"
              />
              <el-table-column
                property="id"
                :label="$t('admin.wfInst.nodeId')"
              />
              <el-table-column
                property="name"
                :label="$t('admin.wfInst.nodeName')"
              />
            </el-table>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="toTaskBack">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('admin.wfInst.reject') }}</span>
          </li>
          <li class="operation-item" @click="rejectDialog = false">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('admin.wfInst.close') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>

    <div v-if="dialogTableVisible">
      <process-detail :key="processInstId + ':' + new Date()" :is-show="dialogTableVisible" :title="$t('admin.wfInst.processDetail') + processInstId" :process-inst-id="processInstId" @close="dialogTableVisible=false" />
    </div>
    <div class="userSelect">
      <el-dialog
        custom-class="content-dialog-userSelect"
        :title="$t('admin.wfInst.reform')"
        :visible.sync="selectUserDialog"
        :close-on-click-modal="false"
        center
        width="33%"
      >
        <div class="select_box">
          <user-org-tree
            :tree-type="treeType"
            :multiple="false"
            @select="handleTreeSelect"
            @clear="selectUserDialog=false"
            @cancel="selectUserDialog=false"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { formValidator } from '@/mixins/form-validator.js'
import UserSelect from '@/components/UserSelect'
import { getDictName } from '@/utils/util'
import { names } from '@/mixins/names.js'
import { getInstList, getTaskList, getVarsList, getActivityList, taskBack, taskFinish, taskChange, saveVariables } from '@/api/admin/workflow-api.js'
export default {
  filters: {
    dateTimeFormat(val) {
      // yyyy-MM-dd HH:mm:ss 转为 yyyy-MM-dd
      return val ? val.substring(0, 10) : val
    }
  },
  components: {
    UserSelect
  },
  mixins: [search, formValidator, names],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      processInstId: '',
      dialogTableVisible: false,
      tableData: [],
      searchParam: {
        paging: true,
        pageNo: 1,
        pageSize: 10,
        totalRecord: null,
        params: {
          instId: '',
          def: '',
          instName: '',
          startedBy: ''
        }
      },
      aditDialog: false,
      activeName: 'first',
      detailData: [],
      instId: String,
      isEnd: Boolean,
      varList: [],
      length: Number,
      rejectDialog: false,
      rejectCurrentRow: null,
      activityList: [],
      taskBackData: {
        taskId: '',
        backId: '',
        comment: ''
      },
      orgChoseDialog: false,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      orgChoseData: [],
      taskChangeParam: {
        taskId: '',
        changeTo: ''
      },
      treeType: 'personnel',
      selectUserDialog: false,
      selectData: ''
    }
  },
  created() {
    this.fetchData()
    this.$store.dispatch('getDicts', 'WorkflowDetailPage')
  },
  methods: {
    handleClick() {
    },
    async fetchData() {
      const res = await getInstList(this.searchParam)
      this.isLoading = true
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.result
        this.tableData = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    editDetail(data, index) {
      getTaskList(data.id).then(res => {
        if (res && res.success) {
          this.detailData = res.datas.result
        }
        getVarsList(data.id).then(res => {
          if (res && res.success) {
            this.instId = data.id
            this.isEnd = res.datas.isEnd
            this.varList = res.datas.varList
            this.length = res.datas.varList.length
            this.aditDialog = true
          }
        })
      })
    },
    resetTable(params) {
      for (var i in params) {
        params[i] = ''
      }
    },
    taskComplete(data, index) {
      this.$confirm(this.$t('admin.wfInst.finishTask'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        taskFinish(data.id).then(res => {
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: this.$t('comm.success')
            })
            this.aditDialog = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    taskReject(data, index) {
      this.resetTable(this.taskBackData)
      getActivityList(data.id).then(res => {
        this.activityList = res.datas.activityList
        this.taskBackData.taskId = data.id
        this.rejectDialog = true
      })
    },
    toTaskBack() {
      if (this.rejectCurrentRow != null) {
        this.taskBackData.backId = this.rejectCurrentRow.id
      }
      taskBack(this.taskBackData).then(res => {
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: this.$t('comm.msg26')
          })
          this.rejectDialog = false
          this.aditDialog = false
          // this.editDetail({ id: this.instId }, '')
        }
      })
    },
    addVariable() {
      const newVariable = {
        key: '',
        value: ''
      }
      this.varList = [...this.varList, newVariable]
    },
    deleteVarRow(data, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.varList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleTreeSelect(data) {
      console.log(data)
      if (data.type !== 'user') {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg4')
        })
        return false
      }
      this.taskChangeParam.changeTo = data.id
      taskChange(this.taskChangeParam).then(res => {
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: this.$t('comm.msg27')
          })
          this.orgChoseDialog = false
          this.aditDialog = false
        }
      })
      this.selectUserDialog = false
    },
    changeDeliver(data, index) {
      this.resetTable(this.taskChangeParam)
      this.taskChangeParam.taskId = data.id
      this.selectUserDialog = true
    },
    handleNodeClick(data) {
      if (data.type === 'user') {
        this.taskChangeParam.changeTo = data.id
        taskChange(this.taskChangeParam).then(res => {
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: this.$t('comm.msg27')
            })
            this.orgChoseDialog = false
            this.aditDialog = false
          }
        })
      }
    },
    addVars() {
      saveVariables({ instId: this.instId, variables: this.varList }).then(res => {
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: this.$t('comm.success')
          })
        }
      })
    },
    handleProcessInstClick: function(processInstId) {
      this.processInstId = processInstId
      this.dialogTableVisible = true
    },
    rejectCurrentChange(val) {
      this.rejectCurrentRow = val
    },
    handleDetailClick(row) {
      const path = getDictName('WorkflowDetailPage', row.processDefinitionKey)
      this.$router.push({ path: path, query: { id: row.businessKey }})
    }
  }
}
</script>
<style lang="scss" scoped>
.definition {
  .edit_dialog {
    .adit_content {
      height: 400px;
      h4 {
        text-align: right;
        border-bottom: 1px dashed #ccc;
        padding: 5px 20px;
      }
    }
  }
}

</style>
