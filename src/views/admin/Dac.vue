<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="tableName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.dac.tableName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.tableName" :placeholder="$t('admin.dac.tableName')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="accessUrl">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.dac.accessUrl') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.accessUrl" :placeholder="$t('admin.dac.accessUrl')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item v-if="hasTenant" prop="type">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.dac.tenantId') }}
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.tenantId" dict-type-id="Tenant" size="small" class="input" :placeholder="$t('admin.dac.tenantId')" clearable />
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
        <li class="operation-item" @click="handleDeleteBatch">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-delete" /></span>
          <span class="operation-text">  {{ $t('comm.batchDeletion') }}</span>
        </li>
        <li class="operation-item" @click="handleRefreshDac">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-refresh" /></span>
          <span class="operation-text"> {{ $t('comm.refreshCache') }}</span>
        </li>
        <li class="operation-item" @click="handleExport">
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
            :data="dacList"
            border
            stripe
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column :label="$t('comm.operation')" min-width="120" width="120">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)" />
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)" />
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              width="100"
              show-overflow-tooltip
            />
            <el-table-column
              prop="tableName"
              :label="$t('admin.dac.tableName')"
              width="130"
              show-overflow-tooltip
            />
            <el-table-column
              prop="tableColumn"
              :label="$t('admin.dac.tableColumn')"
              min-width="100"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dataValue"
              :label="$t('admin.dac.dataValue')"
              min-width="160"
              show-overflow-tooltip
            />
            <el-table-column
              prop="visitorDataType"
              :label="$t('admin.dac.visitorDataType')"
              min-width="100"
              show-overflow-tooltip
            />
            <el-table-column
              prop="visitorValue"
              :label="$t('admin.dac.visitorValue')"
              min-width="140"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="false"
              prop="rightNo"
              :label="$t('admin.dac.rightNo')"
            />
            <el-table-column
              prop="accessUrl"
              :label="$t('admin.dac.accessUrl')"
              min-width="160"
              show-overflow-tooltip
            />
            <el-table-column v-if="hasTenant" :label="$t('admin.dac.tenantId')" min-width="100">
              <template slot-scope="scope">
                <dict-write dict-type-id="Tenant" :value="scope.row.tenantId" />
              </template>
            </el-table-column>
            <el-table-column
              prop="description"
              :label="$t('admin.dac.description')"
              min-width="160"
              show-overflow-tooltip
            />
            <el-table-column
              prop="updateTime"
              :label="$t('admin.dac.updateTime')"
              width="155"
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
      custom-class="dialog-drag dialog-drag-dac  fixed-search-btn-box"
      top="0"
      :title="dialogType === 'create' ? $t('comm.newlyBuild') : $t('comm.edit')"
      :visible.sync="showDialog"
      width="60%"
      @opened="handleOpened"
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <div class="footer-box">
          <el-tabs v-model="activeName" @tab-click="handleClick()">
            <el-tab-pane :label="$t('comm.essentialInformation')" name="basic" class="basic">
              <div class="input_box">
                <div class="flex2">
                  <div class="title must">
                    {{ $t('admin.dac.tableName') }}
                  </div>
                  <div class="input">
                    <el-input v-model="dialogObj.tableName" :placeholder="$t('comm.msg29')" @blur="validator('tableName')" />
                    <span ref="tableName" data-roles="required,charNumUnderline" :data-value="dialogObj.tableName" class="message" />
                  </div>
                </div>
                <div v-if="hasTenant" class="flex2">
                  <div class="title">
                    {{ $t('admin.dac.tenantId') }}
                  </div>
                  <div class="input">
                    <dict-select v-model="dialogObj.tenantId" dict-type-id="Tenant" size="small" class="input" :placeholder="$t('admin.dac.tenantId')" clearable />
                  </div>
                </div>
                <div v-if="false" class="flex1">
                  <div class="title">
                    {{ $t('admin.dac.permissionLevel') }}
                  </div>
                  <el-checkbox-group v-model="levelList">
                    <el-checkbox :label="$t('admin.dac.read')" />
                    <el-checkbox :label="$t('admin.dac.change')" />
                    <el-checkbox :label="$t('admin.dac.delete')" />
                  </el-checkbox-group>
                </div>
                <div class="flex2">
                  <div class="title">
                    {{ $t('admin.dac.description') }}
                  </div>
                  <div class="input">
                    <el-input v-model="dialogObj.description" :placeholder="$t('comm.msg29')" />
                  </div>
                </div>
              </div>
              <div class="accessUrl">
                <h4>
                  {{ $t('admin.dac.accessUrl') }}
                  <el-tooltip placement="top" class="tip">
                    <div slot="content">
                      {{ $t('admin.dac.addMsg') }}
                    </div>
                    <i class="el-icon-info" />
                  </el-tooltip>
                  <div class="add_row iconfont icon-jia" @click.stop="addAccessUrl('outTableData')">
                    {{ $t('admin.dac.createUrl') }}
                  </div>
                </h4>
                <div class="table">
                  <el-table
                    :data="accessUrlData"
                    border
                    stripe
                    height="240"
                    style="width: 100%"
                  >
                    <el-table-column :label="$t('comm.operation')" width="75" :style="{textAlign: 'center'}">
                      <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteRows('accessUrlData', scope.$index)" />
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('admin.dac.url')" prop="url" />
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('admin.dac.defineDataObject')" name="object" class="object">
              <h4>
                {{ $t('admin.dac.dataObject') }}
                <el-tooltip placement="top" class="tip">
                  <div slot="content">
                    {{ $t('admin.dac.defineMsg') }}：<br>
                    _LOGIN_USER_ID_：{{ $t('admin.dac.loginUserId') }}<br>
                    _LOGIN_USER_ORG_ID_：{{ $t('admin.dac.loginUserOrgM') }}<br>
                    _LOGIN_USER_ORG_IDS_：{{ $t('admin.dac.loginUserOrg') }}<br>
                    _LOGIN_USER_CHILD_ORG_IDS_:{{ $t('admin.dac.loginUserChild') }}<br>
                  </div>
                  <i class="el-icon-info" />
                </el-tooltip>
                <div class="add_field iconfont icon-jia" @click.stop="createObjectDialog = true">
                  <!-- 新增字段 -->
                  {{ this.$t('comm.newlyAdded', {para: $t('admin.dac.field')}) }}
                </div>
                <div v-show="addBtnShow('objectData')" class="add_row iconfont icon-jia" @click.stop="addTableRows('objectData')">
                  <!-- 新增一行 -->
                  {{ this.$t('comm.newlyAdded', {para: $t('admin.dac.oneLine')}) }}
                </div>
              </h4>
              <div class="table">
                <el-table
                  ref="objectTable"
                  :data="objectData.table"
                  border
                  stripe
                  height="280"
                  style="width: 100%"
                >
                  <el-table-column v-if="objectData.header.length" :label="$t('comm.operation')" align="center" width="75" :style="{textAlign: 'center'}">
                    <template slot-scope="scope">
                      <el-button size="mini" :disabled="scope.row._ALL_ === '_ALL_' || scope.row._SQL_ !== undefined" icon="el-icon-delete" type="danger" @click="deleteRows('objectData', scope.$index)" />
                    </template>
                  </el-table-column>
                  <el-table-column v-for="item in objectData.header" :key="item" align="center" :width="item ==='_SQL_' ? '' : '150'">
                    <template slot="header">
                      <span>{{ item }}</span>
                      <i class="el-icon-delete delete_header" @click="deleteColumn('objectData', item)" />
                    </template>
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row[item]" placeholder="请输入内容" size="small"></el-input> -->
                      <span v-if="item ==='_ALL_'">{{ scope.row[item] }}</span>
                      <el-input v-else-if="item ==='_SQL_'" v-model="scope.row[item]" type="textarea" rows="6" />
                      <el-input v-else v-model="scope.row[item]" type="text" :placeholder="$t('comm.msg29')" />
                    <!-- <input type="text" v-model="scope.row[item]" placeholder="请输入内容"> -->
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-dialog
                class="content-dialog-box  search-light"
                :close-on-click-modal="false"
                custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
                top="0"
                width="25%"
                :title="$t('comm.newlyAdded', {para: $t('admin.dac.field')})"
                :visible.sync="createObjectDialog"
                append-to-body
              >
                <div class="display: flex;flex-direction: column;height: 100%;">
                  <div class="middle-box">
                    <div class="input_box">
                      <div class="flex1">
                        <div class="title">
                          <!-- 字段类型 -->
                          {{ $t('admin.dac.fieldType') }}
                        </div>
                        <div class="input">
                          <el-radio v-model="objectRadio" label="COL">
                            <!-- 字段 -->
                            {{ $t('admin.dac.field') }}
                          </el-radio>
                          <el-radio v-model="objectRadio" label="_SQL_">
                            SQL
                          </el-radio>
                          <el-radio v-model="objectRadio" label="_ALL_">
                            <!-- 全部数据 -->
                            {{ $t('admin.dac.allData') }}
                          </el-radio>
                        </div>
                      </div>
                    </div>
                    <div v-show="objectRadio === 'COL'" class="input_box">
                      <div class="flex1">
                        <div class="title">
                          <!-- 字段名 -->
                          {{ $t('admin.dac.tableColumn') }}
                        </div>
                        <el-input v-model="objectInp" class="input" :placeholder="$t('admin.dac.tableColumn')" />
                      </div>
                    </div>
                  </div>
                  <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
                    <li class="operation-item" @click="createObjectDialog = false">
                      <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
                      <span class="operation-text">{{ $t('comm.cancel') }}</span>
                    </li>
                    <li class="operation-item" @click="addObjectColumn">
                      <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
                      <span class="operation-text">{{ $t('comm.certain') }}</span>
                    </li>
                  </ul>
                </div>
                <!-- <span slot="footer" class="dialog-footer">
                  <el-button @click="createObjectDialog = false">{{ $t('comm.cancel') }}</el-button>
                  <el-button type="primary" @click="addObjectColumn">{{ $t('comm.certain') }}</el-button>
                </span> -->
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane :label="$t('admin.dac.defineVisitor')" name="visitor" class="visitor">
              <h4>
                <!-- 访问者 -->
                {{ $t('admin.dac.visitorValue') }}
                <div class="add_field iconfont icon-jia" @click.stop="createVisitorDialog = true">
                  <!-- 新增字段 -->
                  {{ $t('comm.newlyAdded', {para: $t('admin.dac.field')}) }}
                </div>
                <div v-show="addBtnShow('visitorData')" class="add_row iconfont icon-jia" @click.stop="addTableRows('visitorData')">
                  <!-- 新增一行 -->
                  {{ $t('comm.newlyAdded', {para: $t('admin.dac.oneLine')}) }}
                </div>
              </h4>
              <div class="table">
                <el-table
                  :data="visitorData.table"
                  border
                  stripe
                  height="280"
                  style="width: 100%"
                >
                  <el-table-column v-if="visitorData.header.length" :label="$t('comm.operation')" align="center" width="75" :style="{textAlign: 'center'}">
                    <template slot-scope="scope">
                      <el-button size="mini" :disabled="scope.row._ALL_ === '_ALL_'" icon="el-icon-delete" type="danger" @click="deleteRows('visitorData', scope.$index)" />
                    </template>
                  </el-table-column>
                  <el-table-column v-for="item in visitorData.header" :key="item" align="center" width="150">
                    <template slot="header">
                      <span>{{ item }}</span>
                      <i class="el-icon-delete delete_header" @click="deleteColumn('visitorData', item)" />
                    <!-- <el-button size="mini" class="iconfont icon-jia" type="text"></el-button> -->
                    </template>
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row[item]" placeholder="请输入内容" size="small"></el-input> -->
                      <!-- <span v-if="item==='_ALL_'">{{scope.row[item]}}</span> -->
                      <span v-if="item ==='_ALL_'">{{ scope.row[item] }}</span>
                      <el-input v-else v-model="scope.row[item]" type="text" :placeholder="$t('comm.msg29')" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-dialog
                class="content-dialog-box  search-light"
                :close-on-click-modal="false"
                custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
                top="0"
                width="60%"
                :title="$t('admin.dac.addTableColumn')"
                :visible.sync="createVisitorDialog"
                append-to-body
              >
                <div class="display: flex;flex-direction: column;height: 100%;">
                  <div class="middle-box">
                    <div class="input_box">
                      <div class="flex1">
                        <div class="title">
                          <!-- 字段类型 -->
                          {{ $t('admin.dac.fieldType') }}
                        </div>
                        <div class="input">
                          <el-radio v-model="visitorRadio" label="USER">
                            <!-- 用户 -->
                            {{ $t('admin.dac.user') }}
                          </el-radio>
                          <el-radio v-model="visitorRadio" label="ROLE">
                            <!-- 角色 -->
                            {{ $t('admin.dac.role') }}
                          </el-radio>
                          <el-radio v-model="visitorRadio" label="ORG">
                            <!-- 组织 -->
                            {{ $t('admin.dac.organization') }}
                          </el-radio>
                          <el-radio v-model="visitorRadio" label="ORGROOT">
                            <!--  根组织 -->
                            {{ $t('admin.dac.rootorganization') }}
                          </el-radio>
                          <el-radio v-model="visitorRadio" label="_ALL_">
                            <!-- 全部用户 -->
                            {{ $t('admin.dac.allUsers') }}
                          </el-radio>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
                    <li class="operation-item" @click="createVisitorDialog = false">
                      <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
                      <span class="operation-text">{{ $t('comm.cancel') }}</span>
                    </li>
                    <li class="operation-item" @click="addVisitorColumn">
                      <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
                      <span class="operation-text">{{ $t('comm.certain') }}</span>
                    </li>
                  </ul>
                </div>
                <!-- <span slot="footer" class="dialog-footer">
                  <el-button @click="createVisitorDialog = false">{{ $t('comm.cancel') }}</el-button>
                  <el-button type="primary" @click="addVisitorColumn">{{ $t('comm.certain') }}</el-button>
                </span> -->
              </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" :disabled="!validatorState" @click="handleSave">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="!validatorState" @click="handleSave">{{ $t('comm.certain') }}</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      :title="$t('comm.import')"
      :visible.sync="uploadDialog"
      append-to-body
      custom-class="content-dialog-upload dialog-drag-heightAuto"
      width="400px"
      :close-on-click-modal="false"
      class="upload_zip"
    >
      <div class="display: flex;flex-direction: column;height: 100%;">
        <el-button type="primary" size="mini" @click="handleTemplateDownload">
          <!-- 模板下载 -->
          {{ $t('admin.dac.templateDownload') }}
        </el-button>
        <div class="box">
          <div slot="tip" class="el-upload__tip">
            <!-- 请用模板格式的xlsx文件进行上传 -->
            {{ $t('admin.dac.uploadMsg') }}
          </div>
          <upload action="/api/dac/import" :on-success="handleUploadSuccess" :on-error="handleUploadError" :multiple="false" @finish="uploadDialog=false" />
          <!-- <upload action="/api/workflow/upload" :on-success="handleUploadSuccess" :on-error="handleUploadError" @finish="uploadDialog=false" /> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { getDacList, deleteDac, saveDac, refreshDac, exportDac, downloadDacTemplate } from '@/api/admin/dac-api.js'
import { formValidator } from '@/mixins/form-validator.js'
import { objectKeyIsEmpty } from '@/utils/util.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  mixins: [search, formValidator, niceScroll],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      dacList: [],
      multipleSelection: [],
      showDialog: false,
      dialogObj: {},
      activeName: 'basic',
      dialogType: 'create',
      levelList: [],
      accessUrlData: [],
      createObjectDialog: false,
      objectRadio: 'COL',
      objectInp: '',
      objectData: {
        header: [],
        table: []
      },
      visitorRadio: 'USER',
      createVisitorDialog: false,
      visitorData: {
        header: [],
        table: []
      },
      uploadDialog: false,
      // headers: {
      //   'X-CSRF-TOKEN': csrfToken,
      //   'pageNo': pageNo
      // },
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          tableName: '',
          accessUrl: ''
        }
      }
    }
  },
  computed: {
    hasTenant: function() {
      if (this.$store.getters.dictList.Tenant && this.$store.getters.dictList.Tenant.length && this.$store.getters.dictList.Tenant.length >= 1) {
        return true
      } else {
        return false
      }
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    handleClick() {
      this.handleOpened()
      this.scroll()
    },
    async fetchData() {
      const res = await getDacList(this.searchParam)
      this.isLoading = true
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.dacList = results
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleDelete(rowData) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        await deleteDac([rowData.id])
        this.search()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDeleteBatch() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          const ids = this.multipleSelection.map(item => item.id)
          deleteDac(ids).then(() => {
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
    handleRefreshDac() {
      this.$confirm(this.$t('comm.tip3'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        await refreshDac()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleExport() {
      exportDac('xlsx', this.searchParam.params)
    },
    handleCreate() {
      this.dialogObj = {}
      this.dialogType = 'create'
      this.activeName = 'basic'
      this.accessUrlData = []
      this.validatorState = false
      this.objectData = {
        header: [],
        table: []
      }
      this.visitorData = {
        header: [],
        table: []
      }
      this.showDialog = true
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    handleEdit(val) {
      this.dialogObj = { ...val }
      this.dialogType = 'edit'
      this.activeName = 'basic'
      this.validatorState = !!val.tableName
      this.accessUrlData = val.accessUrl.split(',').map(url => { return { url } })
      const objectDataHeaders = val.tableColumn.split('&&')
      this.objectData.header = objectDataHeaders
      this.objectData.table = val.dataValue.split('##').map(item => {
        let obj = {}
        for (let i = 0; i < objectDataHeaders.length; i++) {
          obj = { ...obj, [objectDataHeaders[i]]: item.split('&&')[i] }
        }
        return obj
      })
      const visitorDataHeaders = val.visitorDataType.split('&&')
      this.visitorData.header = visitorDataHeaders
      this.visitorData.table = val.visitorValue.split('##').map(item => {
        let obj = {}
        for (let i = 0; i < visitorDataHeaders.length; i++) {
          obj = { ...obj, [visitorDataHeaders[i]]: item.split('&&')[i] }
        }
        return obj
      })
      this.showDialog = true
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    handleUploadSuccess(res, file, fileList) {

    },
    handleUploadError(res, file, fileList) {

    },
    // 数据对象
    addObjectColumn() {
      const type = this.objectRadio
      const value = this.objectInp.trim()
      this.objectInp = ''
      if (this.objectData.header.find(item => item === '_ALL_' || item === '_SQL_')) {
        this.$message({
          type: 'warning',
          message: this.$t('comm.msg12')
        })
        return false
      }
      if (type === '_ALL_') {
        this.addItem('objectData', '_ALL_')
      } else if (type === '_SQL_') {
        this.addItem('objectData', '_SQL_')
      } else {
        if (value) {
          if (this.objectData.header.find(item => item === value)) {
            this.$message({
              type: 'warning',
              message: this.$t('comm.msg11')
            })
            return false
          } else {
            this.addItem('objectData', value)
            if (!this.objectData.table.length) {
              this.addTableRows('objectData')
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: this.$t('comm.msg13')
          })
          return false
        }
      }
      this.createObjectDialog = false
      this.scroll()
    },
    // 访问者
    addVisitorColumn() {
      const type = this.visitorRadio
      if (this.visitorData.header.find(item => item === '_ALL_')) {
        this.$message({
          type: 'warning',
          message: this.$t('comm.msg12')
        })
        return false
      }
      if (type === 'USER') {
        this.addItem('visitorData', 'USER')
      } else if (type === 'ROLE') {
        this.addItem('visitorData', 'ROLE')
      } else if (type === 'ORG') {
        this.addItem('visitorData', 'ORG')
      } else if (type === 'ORGROOT') {
        this.addItem('visitorData', 'ORGROOT')
      } else {
        this.addItem('visitorData', '_ALL_')
      }
      if (!this.visitorData.table.length) {
        this.addTableRows('visitorData')
      }

      this.createVisitorDialog = false
      this.scroll()
    },
    addTableRows(tableName) {
      const newRows = { ...this[tableName].table[0] }
      for (const k in newRows) {
        newRows[k] = ''
      }
      this[tableName].table = [...this[tableName].table, newRows]
      this.handleOpened()
      this.scroll()
    },
    deleteColumn(tableName, columnValue) {
      this.$confirm(this.$t('comm.tip5'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this[tableName].header = this[tableName].header.filter(item => item !== columnValue)
        this[tableName].table.forEach(item => {
          for (const k in item) {
            if (k === columnValue) {
              delete item[k]
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
      this.scroll()
    },
    deleteRows(tableName, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        if (tableName === 'accessUrlData') {
          this[tableName].splice(index, 1)
        } else {
          this[tableName].table.splice(index, 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
      this.scroll()
    },
    addAccessUrl() {
      this.$prompt(this.$t('comm.msg14'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel')
        // inputPattern: /^\/[\w-]+\/(([\w-][\w-\s]*[\w-]+[$$]?$)|([\w-][$$]?$))/,
        // inputErrorMessage: 'url格式不正确'
      }).then(({ value }) => {
        if (this.accessUrlData.find(item => item.url === '**')) {
          this.$message({
            type: 'warning',
            message: this.$t('comm.msg15')
          })
          return false
        } else if (this.accessUrlData.find(item => item.url === value)) {
          this.$message({
            type: 'warning',
            message: this.$t('comm.msg16')
          })
          return false
        } else {
          const newObj = {
            url: value
          }
          this.accessUrlData = value === '**' ? [newObj] : [...this.accessUrlData, newObj]
          this.handleOpened()
          this.scroll()
        }
      })
    },
    addItem(tableName, value) {
      if (this[tableName].header.find(item => item === value)) {
        this.$message({
          type: 'warning',
          message: this.$t('comm.msg17')
        })
        return false
      }
      const newObjectData = {}
      if (value === '_ALL_' || value === '_SQL_') {
        newObjectData.header = [value]
        newObjectData.table = [{
          [value]: value === '_ALL_' ? '_ALL_' : ''
        }]
      } else {
        newObjectData.header = [...this[tableName].header, value]
        newObjectData.table = this[tableName].table.map(item => {
          if (value === '_ALL_') {
            item[value] = '_ALL_'
          } else {
            item[value] = ''
          }
          return item
        })
      }
      this[tableName] = newObjectData
    },
    addBtnShow(tableName) {
      return this[tableName].header.length && !this[tableName].header.find(item => item === '_ALL_' || item === '_SQL_')
    },
    handleSave() {
      if (!this.validatorAll()) {
        return false
      }
      if (!this.accessUrlData.length || this.accessUrlData.find(item => item.url === '')) {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg19')
        })
        return
      }
      const datas = []
      this.objectData.table.map(item => {
        for (const key in item) {
          datas.push(item[key])
        }
      })
      if (!this.objectData.table.length ||
        datas.length !== this.objectData.table.length * this.objectData.header.length ||
        this.objectData.table.find(item => objectKeyIsEmpty(item))) {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg18')
        })
        return
      }
      const visitors = []
      this.visitorData.table.map(item => {
        for (const key in item) {
          visitors.push(item[key])
        }
      })
      if (!this.visitorData.table.length ||
        visitors.length !== this.visitorData.table.length * this.visitorData.header.length ||
        this.visitorData.table.find(item => objectKeyIsEmpty(item))) {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg20')
        })
        return
      }

      this.$confirm(this.$t('comm.tip4'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.dialogObj.accessUrl = this.accessUrlData.map(item => item['url']).join(',')
        const objectDataHeader = this.objectData.header
        this.dialogObj.tableColumn = objectDataHeader.join('&&')
        this.dialogObj.dataValue = this.objectData.table.map(item => {
          const vals = []
          objectDataHeader.forEach(key => {
            vals.push(item[key])
          })
          return vals.join('&&')
        }).join('##')
        const visitorDataHeader = this.visitorData.header
        this.dialogObj.visitorDataType = visitorDataHeader.join('&&')
        this.dialogObj.visitorValue = this.visitorData.table.map(item => {
          const vals = []
          visitorDataHeader.forEach(key => {
            vals.push(item[key])
          })
          return vals.join('&&')
        }).join('##')
        await saveDac(this.dialogObj)
        this.showDialog = false
        this.search()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleTemplateDownload() {
      downloadDacTemplate()
    }
  }
}
</script>

<style lang="scss" scoped>
  .delete_header{
    color:#fff !important;
    margin-left:3px
  }
  .permissions {
    .dialog {
      .createBox {
        // height: 460px;
        overflow: auto;
        h4 {
          height: 40px;
          line-height: 30px;
          font-size: 16px;
          border-bottom: 1px dashed #ccc;
          color: rgb(50, 50, 50);
          margin-bottom: 10px;
          // padding: 10px 0;
          position: relative;
          .tip {
            position: relative;
            // top: -5px;
            left: 0;
          }
        }
        .object {
          .iconfont {
            font-size: 12px;
          }
          .table {
            input {
              height: 35px;
              width: 100%;
              box-sizing: border-box;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              padding: 0 10px;
              &:focus {
                outline: none;
                border-color: #409eff;
              }
            }
            textarea {
              width: 100%;
              padding: 0 10px;
              box-sizing: border-box;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              &:focus {
                outline: none;
                border-color: #409eff;
              }
            }
          }
        }
        .visitor {
          .iconfont {
            font-size: 12px;
          }
          .table {
            input {
              height: 35px;
              width: 100%;
              box-sizing: border-box;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              padding: 0 10px;
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              &:focus {
                outline: none;
                border-color: #409eff;
              }
            }
          }
        }
      }
    }
  }
</style>
