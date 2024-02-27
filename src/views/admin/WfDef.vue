<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="defId">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.wfDef.processDefinitionId') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.defId" :placeholder="$t('admin.wfDef.processDefinitionId')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="key">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.wfDef.processDefinitionKey') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.key" :placeholder="$t('admin.wfDef.processDefinitionKey')" clearable />
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
        <li class="operation-item" @click="uploadZipDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshangchuan1" /></span>
          <span class="operation-text">{{ $t('admin.wfDef.zipRelease') }}</span>
        </li>
        <li class="operation-item" @click="uploadOneDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshangchuan1" /></span>
          <span class="operation-text">{{ $t('admin.wfDef.oneRelease') }}</span>
        </li>
        <li class="operation-item" @click="handleCreate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">{{ $t('comm.newlyBuild') }}</span>
        </li>
        <li class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <li class="operation-item" @click="handleExportBpmn">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('admin.wfDef.exportBpmn') }}</span>
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
            height="100%"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              align="center"
              :label="$t('comm.operation')"
              width="80"
            >
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="handleStart(scope.row, scope.$index)">
                  <!-- 启动 -->
                  {{ $t('admin.wfDef.startUp') }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              :label="$t('admin.wfDef.processDefinitionId')"
              min-width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleShowPic(scope.row.id)">{{ scope.row.id }}</a>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="category"
              label="种类"
            /> -->
            <el-table-column
              prop="name"
              :label="$t('admin.wfDef.name')"
              min-width="100"
            />
            <el-table-column
              prop="key"
              :label="$t('admin.wfDef.processDefinitionKey')"
              min-width="100"
            />
            <el-table-column :label="$t('admin.wfDef.startDate')" min-width="120">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.startDate" value-format="yyyy-MM-dd" size="small" @change="handleStartDateChange(scope.row)" />
              </template>
            </el-table-column>
            <el-table-column
              prop="description"
              :label="$t('admin.wfDef.des')"
              show-overflow-tooltip
              min-width="50"
            />
            <el-table-column
              prop="version"
              :label="$t('admin.wfDef.version')"
              width="50"
            />
            <el-table-column
              prop="deploymentId"
              :label="$t('admin.wfDef.deploymentId')"
              width="100"
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
      <div class="editDilog">
        <el-dialog
          class="content-dialog-box  search-light"
          :close-on-click-modal="false"
          custom-class="dialog-drag dialog-drag-heightAuto  fixed-search-btn-box"
          top="0"
          :title="$t('comm.newlyBuild')"
          :visible.sync="activitiDialog"
          width="50%"
          center
        >
          <div class="display: flex;flex-direction: column;height: 100%;">
            <div class="middle-box">
              <h5>{{ $t('comm.essentialInformation') }}</h5>
              <div class="input_box">
                <div class="flex2">
                  <div class="title must">
                    {{ $t('workflow.modelName') }}
                  </div>
                  <div class="input">
                    <el-input v-model="dialogObj.name" class="input" clearable @blur="validator('name')" />
                    <span ref="name" data-roles="required" :data-value="dialogObj.name" class="message" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title must">
                    {{ $t('workflow.modelKey') }}
                  </div>
                  <div class="input">
                    <el-input v-model="dialogObj.key" class="input" clearable @blur="validator('key')" />
                    <span ref="key" data-roles="required" :data-value="dialogObj.key" class="message" />
                  </div>
                </div>
                <div class="flex1">
                  <div class="title">
                    {{ $t('workflow.modelDesc') }}
                  </div>
                  <div class="input">
                    <el-input v-model="dialogObj.desc" class="input" :rows="2" clearable />
                  </div>
                </div>
              </div>
            </div>
            <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
              <li class="operation-item" @click="handleActivitiSave()">
                <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
                <span class="operation-text">{{ $t('comm.certain') }}</span>
              </li>
            </ul>
          </div>
          <!-- <span slot="footer">
            <el-button type="primary" :disabled="!validatorState" @click="handleActivitiSave()">{{ $t('comm.certain') }}</el-button>
          </span> -->
        </el-dialog>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      custom-class="dialog-drag-heightAuto content-dialog-upload "
      append-to-body
      :title="$t('admin.wfDef.zipRelease')"
      :visible.sync="uploadZipDialog"
      width="400px"
      center
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <div slot="tip" class="el-upload__tip">
          {{ $t('admin.wfDef.tip1') }}
        </div>
        <upload action="/api/workflow/admin/uploadZip" :on-success="handleUploadSuccess" :on-error="handleUploadError" :multiple="false" @finish="uploadOneDialog=false" />
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      custom-class="dialog-drag-heightAuto content-dialog-upload"
      append-to-body
      :title="$t('admin.wfDef.oneRelease')"
      :visible.sync="uploadOneDialog"
      width="400px"
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <div slot="tip" class="el-upload__tip">
          <!-- 请将流程定义文件和图片一起上传 -->
          {{ $t('admin.wfDef.tip2') }}
        </div>
        <upload action="/api/workflow/admin/upload" :on-success="handleUploadSuccess" :on-error="handleUploadError" :multiple="true" @finish="uploadOneDialog=false" />
      </div>
    </el-dialog>
    <div class="startDialog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-heightAuto  fixed-search-btn-box"
        top="0"
        :title="$t('admin.wfDef.startUp')"
        :visible.sync="startDialog"
        width="80%"
      >
        <div class="display: flex;flex-direction: column;height: 100%;">
          <div class="middle-box">
            <h5>{{ $t('admin.wfDef.processStartValue') }}</h5>
            <div class="input_box">
              <div class="flex3">
                <div class="title">
                  <!-- 流程Key -->
                  {{ $t('admin.wfDef.processKey') }}
                </div>
                <div class="input">
                  <el-input v-model="processData.processKey" class="input" readonly="readonly" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  <!-- 业务Key -->
                  {{ $t('admin.wfDef.businessKey') }}
                </div>
                <div class="input">
                  <el-input v-model="processData.businessKey" class="input" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  <!-- 流程名称 -->
                  {{ $t('admin.wfDef.processName') }}
                </div>
                <el-input v-model="processData.processName" class="input" />
              </div>
            </div>
          </div>
          <div class="middle-box">
            <h5>
              <!-- 流程变量一览  -->
              {{ $t('admin.wfDef.processVariable') }}
              <div class="add_row iconfont icon-jia" @click.stop="handleAddTableRows">
                <!-- 增加变量 -->
                {{ $t('admin.wfDef.addVariable') }}
              </div>
            </h5>
            <div class="table">
              <el-table
                :data="variableTable"
                border
                stripe
                height="230"
                style="width: 100%"
              >
                <el-table-column width="61">
                  <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteRow(scope.row, scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('admin.wfDef.variableName')" width="467">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.key" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('admin.wfDef.variableValue')" width="467">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
            <li class="operation-item" @click="startDialog = false">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
              <span class="operation-text">{{ $t('comm.cancel') }}</span>
            </li>
            <li class="operation-item" @click="startInst">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
              <span class="operation-text">{{ $t('comm.submit') }}</span>
            </li>
          </ul>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="startDialog = false">{{ $t('comm.cancel') }}</el-button>
          <el-button type="primary" @click="startInst">{{ $t('comm.submit') }}</el-button>
        </span> -->
      </el-dialog>
    </div>
    <el-dialog
      :title="$t('admin.wfDef.processPhoto') + defId"
      :visible.sync="defPicDialog"
      :close-on-click-modal="false"
    >
      <div>
        <img id="pic" :src="picUrl" width="100%">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { formValidator } from '@/mixins/form-validator.js'
import { getDefList, setProcStartDate, createProcessInst, saveModel, getModelId, exportBpmn } from '@/api/admin/workflow-api.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
// import Upload from '@/components/Upload'
export default {
  // components: {
  //   Upload
  // },
  mixins: [search, formValidator, niceScroll],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      tableData: [],
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          defId: '',
          key: ''
        }
      },
      processData: {},
      variableTable: [],
      uploadZipDialog: false,
      uploadOneDialog: false,
      startDialog: false,
      defPicDialog: false,
      activitiDialog: false,
      defId: '',
      picUrl: '',
      activeName: 'first',
      multipleSelection: [],
      dialogObj: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getDefList(this.searchParam)
      this.isLoading = true
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.result
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
    handleStart(data, index) {
      this.resetTable(this.processData)
      this.variableTable = []
      this.processData.processKey = data.key
      this.startDialog = true
    },
    startInst() {
      this.processData.variables = this.variableTable
      createProcessInst(this.processData).then(res => {
        if (res && res.success) {
          this.startDialog = false
        }
      })
    },
    handleAddTableRows() {
      const newRow = {
        key: '',
        value: ''
      }
      this.variableTable = [...this.variableTable, newRow]
      this.handleOpened()
      this.scroll()
    },
    handleDeleteRow(data, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.variableTable.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
      this.scroll()
    },
    handleShowPic(id) {
      const dateTime = new Date().getTime()
      this.defId = id
      const contextPath = process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : ''
      this.picUrl = contextPath + `/api/workflow/admin/showPic/${id}.png?${dateTime}`
      this.defPicDialog = true
    },
    handleExportBpmn(defId) {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        exportBpmn(this.multipleSelection[0].id)
      } else {
        this.$message({
          type: 'info',
          message: '请选择一条记录'
        })
      }
    },
    handleStartDateChange(row) {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        await setProcStartDate({ procDefId: row.id, startDate: row.startDate, key: row.key })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleUploadSuccess(res, file, fileList) {
      this.uploadZipDialog = false
      this.uploadOneDialog = false
    },
    handleUploadError(res, file, fileList) {
    },
    handleCreate() {
      this.dialogObj = {}
      this.activitiDialog = true
      this.validatorState = false
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    async handleActivitiSave() {
      if (!this.validatorAll()) {
        return false
      }
      const res = await saveModel(this.dialogObj)
      if (res && res.success) {
        this.activitiDialog = false
        this.$router.push({ path: '/admin/wfCreate', query: { id: res.datas.id }})
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async handleEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        const res = await getModelId(this.multipleSelection[0].id)
        if (res && res.success) {
          this.$router.push({ path: '/admin/wfCreate', query: { id: res.datas.id }})
        }
      } else {
        this.$message({
          type: 'info',
          message: '请选择一条记录'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.definition {
  .upload_zip {
    .content {
      width: 350px;
      margin: 0 auto;
    }
  }
  .el-date-editor.el-input {
    width: 100%;
  }

}
.add_row {
  position: absolute;
  right: 25px;
  bottom: 300px;
  border-radius: 6px;
  // border: 1px solid #ccc;
  cursor: pointer;
  font-size: 12px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
  color: #fff;
  &:hover {
    background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
  }
}
</style>
