<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="roleId">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.role.roleId') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.roleId" :placeholder="$t('admin.role.roleId')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="roleName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.role.roleName') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.roleName" :placeholder="$t('admin.role.roleName')" clearable />
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
          <span class="operation-text"> {{ $t('comm.newlyBuild') }}</span>
        </li>
        <li class="operation-item" @click="batchDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-delete" /></span>
          <span class="operation-text">{{ $t('comm.batchDeletion') }}</span>
        </li>
        <li class="operation-item" @click="refreshRole">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-refresh" /></span>
          <span class="operation-text">{{ $t('comm.refreshCache') }}</span>
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
            <el-table-column :label="$t('comm.operation')" min-width="120" width="120" align="center">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)" />
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)" />
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              min-width="160"
              :label="$t('admin.role.roleId')"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="160"
              prop="roleName"
              :label="$t('admin.role.roleName')"
              show-overflow-tooltip
            />
            <el-table-column
              prop="roleDesc"
              min-width="160"
              :label="$t('admin.role.roleDesc')"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="145"
              prop="updateTime"
              :label="$t('admin.role.updateTime')"
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
    <div class="editDilog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag fixed-search-btn-box role-menu"
        top="0"
        :title="dialogType==='create' ? $t('comm.newlyBuild') : $t('comm.edit')"
        :visible.sync="showDialog"
        width="80%"
        center
      >
        <div class="display: flex;flex-direction: column;height: 100%;">
          <div class="middle-box">
            <h4>{{ $t('comm.essentialInformation') }}</h4>
            <div class="input_box">
              <div class="flex3">
                <div class="title must">
                  <!-- 角色ID -->
                  {{ $t('admin.role.roleId') }}
                </div>
                <div class="input">
                  <el-input v-model="basicInfo.id" :placeholder="$t('admin.role.roleId')" @blur="validator('roleId')" />
                  <span ref="roleId" data-roles="required" :data-value="basicInfo.id" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title must">
                  {{ $t('admin.role.roleName') }}
                  <!-- 角色名称 -->
                </div>
                <div class="input">
                  <el-input v-model="basicInfo.roleName" :placeholder="$t('admin.role.roleName')" @blur="validator('roleName')" />
                  <span ref="roleName" data-roles="required" :data-value="basicInfo.roleName" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  {{ $t('admin.role.roleDesc') }}
                  <!-- 角色描述 -->
                </div>
                <el-input v-model="basicInfo.roleDesc" :placeholder="$t('admin.role.roleDesc')" />
              </div>
            </div>
          </div>
          <div class="footer-box">
            <h5>{{ $t('admin.role.accessConfig') }}</h5>
            <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
              <el-tab-pane :label="$t('admin.role.menuAccess')" name="menu">
                <div class="roleList">
                  <el-tree
                    :key="dialogKey"
                    ref="addTree"
                    class="el-tabPane"
                    :data="createTree"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="checkedKeys"
                    :props="defaultProps"
                    @node-click="nodeClick"
                    @node-expand="nodeClick"
                    @node-collapse="nodeClick"
                  />
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('admin.role.urlAccess')" name="url">
                <el-table
                  ref="resUrlMultipleTable"
                  class="el-tabPane"
                  :data="allUrl"
                  tooltip-effect="dark"
                  style="width: 100%"
                  stripe
                  @selection-change="urlHandleSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column
                    prop="id"
                    label="ID"
                    min-width="150"
                  />
                  <el-table-column
                    prop="resName"
                    :label="$t('admin.role.name')"
                    min-width="160"
                  />
                  <el-table-column
                    prop="resUrl"
                    :label="$t('admin.role.url')"
                    min-width="150"
                  />
                  <el-table-column
                    prop="description"
                    :label="$t('admin.role.desc')"
                    min-width="160"
                    show-overflow-tooltip
                  />
                </el-table>
              </el-tab-pane>
              <el-tab-pane :label="$t('admin.role.elementAccess')" name="element">
                <el-table
                  ref="pageMultipleTable"
                  class="el-tabPane"
                  :data="allPageRes"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  stripe
                  @selection-change="pageHandleSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column
                    prop="id"
                    label="ID"
                    min-width="150"
                  />
                  <el-table-column
                    prop="resName"
                    :label="$t('admin.role.name')"
                    min-width="160"
                  />
                  <el-table-column
                    prop="resKey"
                    :label="$t('admin.role.elementKey')"
                    min-width="120"
                  />
                  <el-table-column
                    prop="description"
                    :label="$t('admin.role.desc')"
                    min-width="160"
                    show-overflow-tooltip
                  />
                </el-table>
              </el-tab-pane>
              <el-tab-pane :label="$t('admin.role.routeAccess')" name="route">
                <el-table
                  ref="resRouteMultipleTable"
                  :data="allRoutes"
                  class="el-tabPane"
                  tooltip-effect="dark"
                  style="width: 100%"
                  stripe
                  @selection-change="routeHandleSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column
                    prop="id"
                    label="ID"
                    min-width="150"
                  />
                  <el-table-column
                    prop="resName"
                    :label="$t('admin.role.name')"
                    min-width="160"
                  />
                  <el-table-column
                    prop="resUrl"
                    :label="$t('admin.role.url')"
                    min-width="150"
                  />
                  <el-table-column
                    prop="resFile"
                    :label="$t('admin.role.pageFile')"
                    min-width="150"
                  />
                  <el-table-column
                    prop="description"
                    :label="$t('admin.role.desc')"
                    min-width="160"
                    show-overflow-tooltip
                  />
                </el-table>
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
    </div>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { getRoleList, editDetail, getAllResourceList, roleSave, deleteRole, refreshRole } from '@/api/admin/role-api.js'
import { formValidator } from '@/mixins/form-validator.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  mixins: [search, formValidator, niceScroll],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      // 表格数据
      tableData: [],
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          roleId: '',
          roleName: ''
        }
      },
      dialogKey: 0,
      dialogType: 'add',
      // tab控件
      activeName: 'menu',
      // 修改角色数据
      showDialog: false,
      basicInfo: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      vTree: false,
      // 菜单显示
      createTree: [],
      checkedKeys: [],
      allUrl: [],
      urlMultipleSelection: [],
      allPageRes: [],
      pageMultipleSelection: [],
      allRoutes: [],
      routeMultipleSelection: [],
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    nodeClick() {
      const _this = this
      setTimeout(function() {
        _this.$nextTick(() => {
          _this.handleOpenedTabPane()
        })
        _this.scrollTabPane()
      }, 300)
    },
    handleClick(activeName) {
      console.log(activeName)
      if (activeName === 'menu') {
        // this.handleOpenedTabPane()
        this.scrollTabPane()
      } else {
        this.handleOpened()
      }
    },
    async fetchData() {
      const res = await getRoleList(this.searchParam)
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
    async getTreeAndList(callback) {
      if (this.createTree.length === 0 && this.allUrl.length === 0 && this.allPageRes.length === 0 && this.allRoutes.length === 0) {
        const res = await getAllResourceList()
        this.createTree = res.datas.allMenu
        this.allUrl = res.datas.allUrl
        this.allPageRes = res.datas.allPageRes
        this.allRoutes = res.datas.allRoutes
      }
      callback && callback()
    },
    handleEdit(val) {
      this.basicInfo = { ...val }
      this.dialogType = 'edit'
      this.activeName = 'menu'
      this.getTreeAndList(() => {
        editDetail(val.id).then((res) => {
          this.dialogKey++
          this.validatorState = true
          this.showDialog = true
          // this.checkedKeys = res.datas.menuCheckedKeys
          // console.log(this.menuTreeFilter(this.createTree, res.datas.menuCheckedKeys))
          this.checkedKeys = this.menuTreeFilter(this.createTree, res.datas.menuCheckedKeys)
          this.$nextTick(function() {
            this.clearErrorMessage()
            this.$refs.resUrlMultipleTable.clearSelection()
            this.$refs.pageMultipleTable.clearSelection()
            this.$refs.resRouteMultipleTable.clearSelection()
            res.datas.urlCheckedKeys.forEach(i => {
              this.$refs.resUrlMultipleTable.toggleRowSelection(this.allUrl.find(item => item.id === i), true)
            })
            res.datas.pageCheckedKeys.forEach(i => {
              this.$refs.pageMultipleTable.toggleRowSelection(this.allPageRes.find(item => item.id === i), true)
            })
            res.datas.routeCheckedKeys.forEach(i => {
              this.$refs.resRouteMultipleTable.toggleRowSelection(this.allRoutes.find(item => item.id === i), true)
            })
          })
        })
      })
    },
    handleSave() {
      if (!this.validatorAll()) {
        return false
      }
      this.basicInfo.menuList = this.$refs.addTree.getCheckedKeys()
      this.basicInfo.urlList = this.urlMultipleSelection
      this.basicInfo.pageList = this.pageMultipleSelection
      this.basicInfo.routeList = this.routeMultipleSelection
      const params = { ...this.basicInfo }
      roleSave(params).then(() => {
        this.showDialog = false
        this.search()
      })
    },
    batchDelete() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          deleteRole(this.multipleSelection).then(() => {
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
    refreshRole() {
      this.$confirm(this.$t('comm.tip3'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        await refreshRole()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    async handleCreate() {
      this.basicInfo = {}
      this.dialogType = 'create'
      this.activeName = 'menu'
      this.validatorState = false
      this.dialogKey++
      this.checkedKeys = []
      this.urlMultipleSelection = []
      this.pageMultipleSelection = []
      this.routeMultipleSelection = []
      this.getTreeAndList()
      this.showDialog = true
    },
    handleDelete(index, rowData) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        deleteRole([rowData]).then(() => {
          this.search()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    urlHandleSelectionChange(val) {
      this.urlMultipleSelection = val
    },
    pageHandleSelectionChange(val) {
      this.pageMultipleSelection = val
    },
    routeHandleSelectionChange(val) {
      this.routeMultipleSelection = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    menuTreeFilter(allMenu = [], selectIds = []) {
      console.log(allMenu)
      const bassicsNodes = []
      getBasicsNode(allMenu)
      // console.log(bassicsNodes)
      return bassicsNodes.filter(item => selectIds.indexOf(item) > -1)
      function getBasicsNode(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children) {
            getBasicsNode(arr[i].children)
          } else {
            bassicsNodes.push(arr[i].id)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .role {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 6px;
    background-color: #fff;
    .search {
      .btns {
        padding: 10px 0;
        text-align: right;
      }
    }
    .content {
      .pagination {
        text-align: right;
        padding: 10px 0;
      }
      .roleDialog {
        .main {
          h4 {
            height: 30px;
            line-height: 30px;
            margin: 15px 0;
            border-bottom: 1px dashed #ccc;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
