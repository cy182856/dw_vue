<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="keySeqNo">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.i18n.keySeqNo') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.keySeqNo" :placeholder="$t('admin.i18n.keySeqNo')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="dataType">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.i18n.dataType') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.dataType" class="input" dict-type-id="I18nResourceType" :placeholder="$t('admin.i18n.dataType')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="locale">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.i18n.locale') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.locale" class="input" dict-type-id="Language" :placeholder="$t('admin.i18n.locale')" clearable />
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
        <li class="operation-item" @click="batchDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-delete" /></span>
          <span class="operation-text">  {{ $t('comm.batchDeletion') }}</span>
        </li>
        <li class="operation-item" @click="handleRefresh">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-refresh" /></span>
          <span class="operation-text"> {{ $t('comm.refreshCache') }}</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text"> {{ $t('comm.export') }}</span>
        </li>
        <li class="operation-item" @click="uploadDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-upload2" /></span>
          <span class="operation-text"> {{ $t('comm.import') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="i18nList"
            border
            stripe
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              :label="$t('comm.operation')"
              min-width="120"
              width="120"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row, scope.$index)" />
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row, scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column
              v-if="tableHeaderList[0].isShow"
              :label="$t('admin.i18n.keySeqNo')"
              min-width="150"
              prop="keySeqNo"
            />
            <el-table-column v-if="tableHeaderList[1].isShow" prop="dataType" :label="$t('admin.i18n.dataType')" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="I18nResourceType" :value="scope.row.dataType" />
              </template>
            </el-table-column>
            <el-table-column v-if="tableHeaderList[2].isShow" prop="locale" :label="$t('admin.i18n.locale')" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="Language" :value="scope.row.locale" />
              </template>
            </el-table-column>
            <el-table-column
              v-if="tableHeaderList[3].isShow"
              prop="nameI18n"
              :label="$t('admin.i18n.nameI18n')"
              min-width="140"
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
      <!-- <div class="pagination">
        <div class="select_header">
          <el-popover
            width="260"
            trigger="hover"
            placement="top-start"
          >
            <div class="check_box">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                {{ $t('comm.selectAll') }}
              </el-checkbox>
              <div class="check_box_item">
                <el-checkbox v-for="value in tableHeaderList" :key="value.label" v-model="value.isShow" @change="handleItemChange">
                  {{ value.label }}
                </el-checkbox>
              </div>
            </div>
            <i slot="reference" class="el-icon-menu" />
          </el-popover>
        </div>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, ->"
          :page-size="searchParam.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :current-page.sync="searchParam.pageNo"
          :total="searchParam.totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div> -->
    </div>
    <div class="editDilog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
        top="0"
        :title="dialogType==='create'?$t('comm.newlyBuild'):$t('comm.edit')"
        :visible.sync="showDialog"
        width="80%"
        center
      >
        <div class="display: flex;flex-direction: column;height: 100%;">
          <div class="middle-box">
            <h5>{{ $t('comm.essentialInformation') }}</h5>
            <div class="input_box">
              <div class="flex3">
                <div class="title must">
                  {{ $t('admin.i18n.keySeqNo') }}
                </div>
                <div class="input">
                  <el-input v-model="dialogObj.keySeqNo" :placeholder="$t('admin.i18n.keySeqNo')" class="input" @blur="validator('keySeqNo')" />
                  <span ref="keySeqNo" data-roles="required" :data-value="dialogObj.keySeqNo" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title must">
                  {{ $t('admin.i18n.dataType') }}
                </div>
                <div class="input">
                  <dict-select v-model="dialogObj.dataType" :clearable="false" class="input" dict-type-id="I18nResourceType" @change="(value)=>{validator('dataType',value)}" />
                  <span ref="dataType" data-roles="required" :data-value="dialogObj.dataType" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title must">
                  {{ $t('admin.i18n.locale') }}
                </div>
                <div class="input">
                  <dict-select v-model="dialogObj.locale" :clearable="false" class="input" dict-type-id="Language" @change="(value)=>{validator('locale',value)}" />
                  <span ref="locale" data-roles="required" :data-value="dialogObj.locale" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('admin.i18n.nameI18n') }}
                </div>
                <div class="input">
                  <el-input v-model="dialogObj.nameI18n" :placeholder="$t('admin.i18n.nameI18n')" class="input" @blur="validator('nameI18n')" />
                  <span ref="nameI18n" data-roles="required" :data-value="dialogObj.nameI18n" class="message" />
                </div>
              </div>
            </div>
          </div>
          <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
            <li class="operation-item" :disabled="!validatorState" @click="handleSave">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
              <span class="operation-text">{{ $t('comm.certain') }}</span>
            </li>
          </ul>
        </div>
        <!-- <span slot="footer">
          <el-button type="primary" :disabled="!validatorState" @click="handleSave">{{ $t('comm.certain') }}</el-button>
        </span> -->
      </el-dialog>
    </div>
    <el-dialog
      title="导入"
      :close-on-click-modal="false"
      :visible.sync="uploadDialog"
      append-to-body
      custom-class="content-dialog-upload dialog-drag-heightAuto"
      width="400px"
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <el-button type="primary" size="mini" @click="handleTemplateDownload">
          <!-- 模板下载 -->
          {{ $t('admin.dac.templateDownload') }}
        </el-button>
        <div slot="tip" class="el-upload__tip">
          <!-- 请用模板格式的xlsx文件进行上传 -->
          {{ $t('admin.dac.uploadMsg') }}
        </div>
        <!-- <upload action="/api/workflow/upload" :on-success="handleUploadSuccess" :on-error="handleUploadError" @finish="uploadDialog=false" /> -->
        <upload action="/api/i18n/import" :on-success="handleUploadSuccess" :on-error="handleUploadError" :multiple="false" @finish="uploadDialog=false" />
      </div>
    </el-dialog>
    <div class="exportDialog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-resource  fixed-search-btn-box"
        top="0"
        :visible.sync="exportSelectDilog"
        :title="$t('comm.exportFieldsSelect')"
        width="50%"
      >
        <export-fields-select func-div="i18n" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { selectHeader } from '@/mixins/select-header.js'
import { getI18nList, deleteI18n, saveI18n, refreshI18n, downloadI18nTemplate } from '@/api/admin/i18n-api.js'
import { mapActions } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  mixins: [search, formValidator, selectHeader, niceScroll],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      dialogType: 'create',
      showDialog: false,
      i18nList: [],
      tableHeaderList: [
        { label: this.$t('admin.i18n.keySeqNo'), isShow: true },
        { label: this.$t('admin.i18n.dataType'), isShow: true },
        { label: this.$t('admin.i18n.locale'), isShow: true },
        { label: this.$t('admin.i18n.nameI18n'), isShow: true }
      ],
      uploadDialog: false,
      exportSelectDilog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          keySeqNo: '',
          dataType: '',
          locale: ''
        }
      },
      dialogObj: {},
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getI18nList(this.searchParam)

      this.isLoading = true
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.i18nList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    isColunmShow(col) {
      if (this.showColumns.indexOf(col) >= 0) {
        return true
      } else {
        false
      }
    },
    handleCreate() {
      this.dialogObj = {}
      this.dialogType = 'create'
      this.showDialog = true
      this.validatorState = false
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    handleEdit(rowData) {
      this.dialogObj = { ...rowData }
      this.dialogType = 'edit'
      this.showDialog = true
      this.validatorState = true
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    handleDelete(rowData) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        deleteI18n([rowData]).then(() => {
          this.search()
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
          deleteI18n(this.multipleSelection).then(() => {
            this.search()
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
    handleSave() {
      if (!this.validatorAll()) {
        return false
      }
      this.dialogObj.dicts = this.detailTable
      saveI18n(this.dialogObj).then(() => {
        this.showDialog = false
        this.fetchData()
      })
    },
    handleRefresh() {
      this.$confirm(this.$t('comm.tip3'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        await refreshI18n()
        this.loginInfoAction()
        this.refreshDictAndClearStore()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleUploadSuccess(res, file, fileList) {
    },
    handleUploadError(res, file, fileList) {
    },
    handleTemplateDownload() {
      downloadI18nTemplate()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    ...mapActions([
      'loginInfoAction',
      'refreshDictAndClearStore'
    ])
  }
}
</script>
<style lang="scss" scoped>
.dialog-drag{
  height: 300px !important;
}
.dict {
  .editDilog {
    h5 {
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      .add_row {
        position: absolute;
        right: 25px;
        // bottom: 300px;
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
    }
  }
}
.pagination {
  position: relative;
  .select_header {
    position: absolute;
    top: 26px;
    left: 0;
  }
  .el-icon-menu {
    color: skyblue;
    font-size: 50px;
    cursor: pointer;
  }
  .check_box_item {
    padding-top: 15px;
    border-top: 1px solid #666;
  }
}
</style>
