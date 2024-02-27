<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="userName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.user.userName') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.userName" :placeholder="$t('admin.user.userName')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="nickName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.user.nickName') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.nickName" :placeholder="$t('admin.user.nickName')" clearable />
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
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.export') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="userList"
            border
            stripe
            style="width: 100%"
            height="100%"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              :label="$t('comm.operation')"
              min-width="70"
            >
              <template slot-scope="scope">
                <!--<el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row, scope.$index)" />-->
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row, scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column
              label="ID"
              min-width="150"
              prop="id"
            />
            <el-table-column
              prop="userName"
              :label="$t('admin.user.userName')"
              min-width="130"
            />
            <el-table-column
              prop="nickName"
              :label="$t('admin.user.nickName')"
              min-width="80"
            />
            <el-table-column
              prop="mobile"
              :label="$t('admin.user.mobile')"
              min-width="120"
            />
            <el-table-column
              prop="email"
              :label="$t('admin.user.email')"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="deleteFlag"
              :label="$t('admin.user.deleteFlag')"
              min-width="80"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <dict-write dict-type-id="DeleteFlag" :value="scope.row.deleteFlag" />
              </template>
            </el-table-column>
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
    <div class="addUserDilog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag fixed-search-btn-box"
        top="0"
        :title="dialogType==='create'?$t('comm.newlyBuild'):$t('comm.edit')"
        :visible.sync="showDialog"
        width="80%"
        center
        @opened="handleOpenedAddUser"
      >
        <div class="display: flex;flex-direction: column;height: 100%;">
          <div class="dialog-addUserDilog">
            <div class="middle-box">
              <h4>{{ $t('comm.essentialInformation') }}</h4>
              <div class="input_box">
                <div class="flex2">
                  <div class="title must">
                    <!-- 姓名 -->
                    {{ $t('admin.user.nickName') }}
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.nickName"
                      class="input"
                      :placeholder="$t('admin.user.nickName')"
                      @blur="validator('userNickName')"
                    />
                    <span ref="userNickName" data-roles="required" :data-value="dialogObj.nickName" class="message" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 系统登录用户名 -->
                    {{ $t('admin.user.sysName') }}
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.userName"
                      class="input"
                      :placeholder="$t('admin.user.sysName')"
                    />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 密码 -->
                    {{ $t('admin.user.password') }}
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.password"
                      class="input"
                      type="password"
                      :placeholder="$t('admin.user.password')"
                    />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 确认密码 -->
                    {{ $t('admin.user.confirmPassword') }}
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.rePassword"
                      class="input"
                      type="password"
                      :placeholder="$t('admin.user.confirmPassword')"
                      @blur="checkPassword()"
                    />
                    <span ref="userRePassword" class="message" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 企业微信用户名 -->
                    {{ $t('admin.user.corpUserId') }}
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.corpUserId"
                      class="input"
                      :placeholder="$t('admin.user.corpUserId')"
                    />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 手机号码 -->
                    {{ $t('admin.user.mobile') }}
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.mobile"
                      class="input"
                      :placeholder="$t('admin.user.mobile')"
                    />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 密码认证模式 -->
                    {{ $t('admin.user.authMode') }}
                  </div>
                  <div class="input">
                    <dict-select v-model="dialogObj.authMode" dict-type-id="AuthMode" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 语言 -->
                    {{ $t('admin.user.language') }}
                  </div>
                  <div class="input">
                    <dict-select v-model="dialogObj.language" dict-type-id="Language" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- AD账号用户名 -->
                    {{ $t('admin.user.ldapUserId') }}
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.ldapUserId"
                      class="input"
                      :placeholder="$t('admin.user.ldapUserId')"
                    />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 邮箱 -->
                    {{ $t('admin.user.email') }}
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.email"
                      class="input"
                      :placeholder="$t('admin.user.email')"
                    />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 状态 -->
                    {{ $t('admin.user.deleteFlag') }}
                  </div>
                  <div class="input">
                    <div class="input">
                      <dict-select v-model="dialogObj.deleteFlag" dict-type-id="DeleteFlag" />
                    </div>
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 用户锁定 -->
                    {{ $t('admin.user.userLock') }}
                  </div>
                  <div class="input">
                    <dict-select v-model="dialogObj.isLocked" dict-type-id="IsNo" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 密码有效期 -->
                    {{ $t('admin.user.invalidDate') }}
                  </div>
                  <div class="input">
                    <el-date-picker
                      v-model="dialogObj.invalidDate"
                      class="input"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="yyyy-MM-dd HH:mm:ss"
                    />
                  </div>
                </div>
                <div v-if="false" class="flex2">
                  <div class="title">
                    <!-- 职级 -->
                    {{ $t('admin.user.userGrade') }}
                  </div>
                  <div class="input">
                    <dict-select v-model="dialogObj.userGrade" dict-type-id="UserGrade" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    <!-- 首页事项显示 -->
                    {{ $t('admin.user.divSort') }}
                  </div>
                  <div class="input">
                    <dict-select v-model="dialogObj.divSorts" dict-type-id="DivSort" :multiple="true" />
                  </div>
                </div>
                <div v-if="hasTenant" class="flex2">
                  <div class="title">
                    <!-- 租户名 -->
                    {{ $t('admin.user.tenantId') }}
                  </div>
                  <div class="input">
                    <dict-select v-model="dialogObj.tenantIds" dict-type-id="Tenant" :multiple="true" @change="handleTenantChanged" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    OpenId
                  </div>
                  <div class="input">
                    <el-input
                      v-model="dialogObj.openId"
                      class="input"
                      placeholder="OpenId"
                    />
                  </div>
                </div>
                <div v-if="dialogObj.id" class="flex2">
                  <div class="title">
                    个人图章
                  </div>
                  <div class="input">
                    <el-image v-if="imgShow" style="width: 100px;" :src="headImgUrl" />
                    <el-button @click="handleClickCreateHeadImg(dialogObj.nickName)">
                      获取图章
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-box">
              <h4>
                <!-- 所属机构 -->
                {{ $t('admin.user.affiliation') }}
                <div class="add_row iconfont icon-jia" @click.stop="addOrgRows">
                  <!-- 新增所属机构 -->
                  {{ $t('admin.user.addAffiliation') }}
                </div>
              </h4>
              <div class="table">
                <el-table
                  :data="orgList"
                  border
                  stripe
                  style="width: 100%"
                >
                  <el-table-column :label="$t('comm.operation')" width="70" :style="{textAlign: 'center'}">
                    <template slot-scope="scope">
                      <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleOrgDelete(scope.row, scope.$index)" />
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('admin.user.organization')" align="center">
                    <template slot-scope="scope">
                      <el-button type="primary" size="mini" @click="orgChose(scope.$index)">
                        <!-- 选择组织 -->
                        {{ $t('admin.user.sOrganization') }}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('admin.user.aId')" prop="orgId" />
                  <el-table-column :label="$t('admin.user.aName')" prop="orgFullName" min-width="180" show-overflow-tooltip />
                  <el-table-column :label="$t('admin.user.post')">
                    <template slot-scope="scope">
                      <dict-select v-model="scope.row.positionCode" dict-type-id="Position" />
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('admin.user.isMain')">
                    <template slot-scope="scope">
                      <dict-select v-model="scope.row.isMain" dict-type-id="IsNo" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="footer-box">
              <h4>
                <!-- 角色 -->
                {{ $t('admin.user.role') }}
              </h4>
              <el-tabs v-model="roleChoseActiveTenantId" @tab-click="handleClick()">
                <el-tab-pane v-for="tenantRole in dialogObj.tenantRoles" :key="tenantRole.tenantId" :label="tenantRole.tenantId | dictName('Tenant')" :name="tenantRole.tenantId">
                  <h4 style="margin-top: 4px;">
                    <span v-if="hasTenant">
                      <dict-write dict-type-id="Tenant" :value="tenantRole.tenantId" />({{ tenantRole.tenantId }})
                    </span>
                    <div class="add_row iconfont icon-jia" @click.stop="roleChose(tenantRole)">
                      <!-- 编辑角色 -->
                      {{ $t('admin.user.editRole') }}
                    </div>
                  </h4>
                  <div class="table">
                    <el-table
                      :data="tenantRole.roleList"
                      border
                      stripe
                      style="min-height:200px;width: 100%"
                    >
                      <el-table-column :label="$t('comm.operation')" width="70" :style="{textAlign: 'center'}">
                        <template slot-scope="scope">
                          <el-button size="mini" icon="el-icon-delete" type="danger" @click="roleHandleDelete(tenantRole, scope.$index)" />
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('admin.user.roleId')" prop="roleId" />
                      <el-table-column :label="$t('admin.user.roleName')" prop="roleName" />
                    </el-table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
            <li class="operation-item" @click="showDialog = false">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
              <span class="operation-text">{{ $t('comm.cancel') }}</span>
            </li>
            <li class="operation-item" @click="handleSave">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
              <span class="operation-text">{{ $t('comm.save') }}</span>
            </li>
          </ul>
          <!-- <div class="btn">
            <el-button type="primary" size="small" @click="showDialog = false">
              {{ $t('comm.cancel') }}
            </el-button>
            <el-button type="primary" size="small" @click="handleSave">
              {{ $t('comm.save') }}
            </el-button>
          </div> -->
        </div>
      </el-dialog>
    </div>

    <div class="userSelect">
      <el-dialog
        :title="$t('admin.user.sOrganization')"
        :visible.sync="orgChoseDilog"
        custom-class="content-dialog-userSelect"
        width="33%"
        :close-on-click-modal="false"
        center
      >
        <div class="select_box">
          <user-org-tree
            tree-type="department"
            :is-admin="true"
            :multiple="false"
            @select="handleTreeSelect"
            @cancel="orgChoseDilog=false"
            @clear="orgChoseDilog=false"
          />
        </div>
      </el-dialog>
    </div>

    <div class="roleChoseDilog">
      <el-dialog
        :title="$t('admin.user.selectRole')"
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
        top="0"
        :visible.sync="roleChoseDilog"
        width="80%"
        center
        @opened="handleOpened"
      >
        <div style="display: flex;flex-direction: column;height: 100%;">
          <div class="middle-box">
            <div class="dialog-search-box middle-input">
              <el-form label-width="80px" label-position="left">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item :label="$t('admin.org.roleId')" prop="searchId">
                      <el-input v-model="searchId" :placeholder="$t('admin.org.roleId')" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item :label="$t('admin.org.roleName')" prop="searchName">
                      <el-input v-model="searchName" :placeholder="$t('admin.org.roleName')" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item style="margin-bottom:0 !important">
                  <ul class="operation-box dialog-btn-box end-content-flex mcbtn">
                    <li class="operation-item" @click="selectRole">
                      <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                      <span class="operation-text">{{ $t('admin.org.screen') }}</span>
                    </li>
                  </ul>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="footer-box">
            <div class="dialog-table-box">
              <div class="table">
                <el-table
                  ref="roleChoseMultipleTable"
                  :data="roleChoseData"
                  border
                  stripe
                  style="width: 100%"
                  height="310"
                  @select="handleSelect"
                >
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column
                    prop="id"
                    :label="$t('admin.user.roleId')"
                  />
                  <el-table-column
                    prop="roleName"
                    :label="$t('admin.user.roleName')"
                  />
                  <el-table-column
                    prop="roleDesc"
                    :label="$t('admin.user.desc')"
                  />
                </el-table>
              </div>
            </div>
          </div>
          <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
            <li class="operation-item" @click="rolesSelect">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
              <span class="operation-text">{{ $t('comm.certain') }}</span>
            </li>
          </ul>
        </div>
        <!-- <span slot="footer">
          <el-button type="primary" @click="rolesSelect">{{ $t('comm.certain') }}</el-button>
        </span> -->
      </el-dialog>
    </div>
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
        <export-fields-select func-div="user" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { getUserList } from '@/api/admin/user-api.js'
import { userSave, orgUserEdit, createHeadImg } from '@/api/admin/org-api.js'
import { getAllRole } from '@/api/admin/role-api.js'
import { formValidator } from '@/mixins/form-validator.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
import { names } from '@/mixins/names.js'
import { setLang } from '@/utils/storage'
import { getLanguageType } from '@/utils/lang.js'
export default {
  mixins: [search, formValidator, niceScroll, names],
  data() {
    return {
      value1: [],
      isLoading: false,
      activeNames: ['1'],
      roleChoseActiveTenantId: '',
      dialogType: 'create',
      showDialog: false,
      orgChoseDilog: false,
      exportSelectDilog: false,
      userList: [],
      roleChoseDilog: false,
      roleChoseData: [],
      roleChoseTenant: {},
      allRoleList: [],
      searchId: '',
      searchName: '',
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          userName: '',
          nickName: ''
        }
      },
      dialogObj: {
        divSorts: [],
        tenantIds: [],
        tenantRoles: []
      },
      orgList: [],
      // roleList: [],
      orgChoseData: [],
      orgChoseIndex: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      searchRoleList: [],
      multipleSelection: [],
      imgShow: true
    }
  },
  computed: {
    hasTenant: function() {
      if (this.$store.getters.dictList.Tenant && this.$store.getters.dictList.Tenant.length && this.$store.getters.dictList.Tenant.length >= 1) {
        return true
      } else {
        return false
      }
    },
    headImgUrl: {
      get() {
        return process.env.VUE_APP_CONTEXT_PATH + '/api/org/user/showHeadImg/' + this.dialogObj.id + '?' + new Date().getTime()
      },
      set(url) {
        return url
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.$store.dispatch('getDicts', 'Tenant')
    this.fetchData()
  },

  methods: {
    handleClick() {
      this.scrollUser()
    },
    handleOpenedAddUser() {
      this.$nextTick(() => {
        this.handleOpenedUser()
        this.scrollUser()
      })
    },
    async fetchData() {
      const res = await getUserList(this.searchParam)
      this.isLoading = true
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.userList = results
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
    handleCreate() {
      this.clearErrorMessage('user')
      this.dialogObj = { divSorts: [], tenantIds: [], tenantRoles: [{ tenantId: '', roleList: [{ tenantId: '', roleId: 'ROLE_USER', roleName: '普通用户角色' }] }] }
      this.roleChoseActiveTenantId = ''
      this.orgList = []
      this.dialogType = 'create'
      this.showDialog = true
    },
    handleEdit(data, index) {
      this.clearErrorMessage('user')
      this.resetTable(this.dialogObj)
      this.orgList = []
      // this.roleList = []
      this.dialogType = 'edit'
      orgUserEdit(data.id).then(res => {
        const user = res.datas.user
        const userOrgs = res.datas.userOrgs
        const userRoles = res.datas.userRoles
        this.dialogObj = { ...user }
        this.dialogObj.tenantRoles = []
        if (this.dialogObj.divSort) {
          this.$set(this.dialogObj, 'divSorts', user.divSort.split(','))
        } else {
          this.$set(this.dialogObj, 'divSorts', [])
        }
        if (this.dialogObj.tenantId) {
          this.$set(this.dialogObj, 'tenantIds', user.tenantId.split(','))
        } else {
          this.$set(this.dialogObj, 'tenantIds', [])
        }
        userOrgs.forEach(data => {
          this.orgList.push({
            orgId: data.org_id,
            orgName: data.org_name,
            orgFullName: data.full_name,
            positionCode: data.position_code,
            isMain: data.is_main + ''
          })
        })
        if (this.hasTenant) {
          this.dialogObj.tenantIds.forEach(tenantId => {
            const roleList = userRoles.filter(item => item.tenant_id === tenantId || !item.tenant_id)
              .map(data => {
                return {
                  tenantId: tenantId,
                  roleId: data.role_id,
                  roleName: data.role_name
                }
              })
            this.dialogObj.tenantRoles.push({ tenantId, roleList })
          })
          this.roleChoseActiveTenantId = this.dialogObj.tenantRoles && this.dialogObj.tenantRoles.length > 0 ? this.dialogObj.tenantRoles[0].tenantId : ''
        } else {
          const roleList = userRoles.map(data => {
            return {
              tenantId: '',
              roleId: data.role_id,
              roleName: data.role_name
            }
          })
          this.dialogObj.tenantRoles.push({ tenantId: '', roleList })
        }
        this.showDialog = true
      })
    },
    checkPassword() {
      if (!this.dialogObj.password) {
        return true
      }
      if (this.dialogObj.password === this.dialogObj.rePassword) {
        this.clearErrorMessage('userRePassword')
        return true
      } else {
        this.setValidatorMessage('userRePassword', this.$t('comm.msg6'))
        return false
      }
    },
    handleSave() {
      if (!this.validatorAll('user') | !this.checkPassword()) {
        return false
      }
      const item = this.orgList
      const userAllRole = []
      const isLoginUser = this.userInfo.userId === this.dialogObj.id
      const lang = getLanguageType(this.dialogObj.language)
      this.dialogObj.tenantRoles.forEach(tenantRole => {
        tenantRole.roleList && tenantRole.roleList.forEach(role => {
          userAllRole.push({
            roleId: role.roleId,
            roleName: role.roleName,
            tenantId: role.tenantId
          })
        })
      })

      if (!item || item.length === 0) {
        const roleItem = userAllRole
        if (!roleItem || roleItem.length === 0) {
          this.$message({
            type: 'error',
            message: this.$t('comm.msg7')
          })
        } else {
          this.dialogObj.userOrgs = this.orgList
          this.dialogObj.userRoles = userAllRole
          this.dialogObj.divSorts.sort().reverse()
          this.dialogObj.divSort = this.dialogObj.divSorts.join(',')
          this.dialogObj.tenantIds.sort().reverse()
          this.dialogObj.tenantId = this.dialogObj.tenantIds.join(',')

          userSave(this.dialogObj).then(res => {
            if (res && res.success) {
              this.showDialog = false
              this.search()
              if (isLoginUser) {
                setLang(lang)
              }
            }
          })
        }
      } else {
        let checkFlag = true
        let mainPostionCnt = 0
        for (var i = 0; i < item.length; i++) {
          if (!item[i].orgId || !item[i].orgName) {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg8')
            })
            checkFlag = false
            break
          }
          if (!item[i].positionCode) {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg9')
            })
            checkFlag = false
            break
          }
          if (!item[i].isMain) {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg25')
            })
            checkFlag = false
            break
          }
          if (item[i].isMain === '1') {
            mainPostionCnt++
          }
        }
        if (checkFlag) {
          if (mainPostionCnt !== 1) {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg10')
            })
          } else {
            const roleItem = userAllRole
            if (!roleItem || roleItem.length === 0) {
              this.$message({
                type: 'error',
                message: this.$t('comm.msg7')
              })
            } else {
              this.dialogObj.userOrgs = this.orgList
              this.dialogObj.userRoles = userAllRole
              this.dialogObj.divSorts.sort().reverse()
              this.dialogObj.divSort = this.dialogObj.divSorts.join(',')
              this.dialogObj.tenantIds.sort().reverse()
              this.dialogObj.tenantId = this.dialogObj.tenantIds.join(',')
              userSave(this.dialogObj).then(res => {
                if (res && res.success) {
                  this.showDialog = false
                  this.search()
                  if (isLoginUser) {
                    setLang(lang)
                  }
                }
              })
            }
          }
        }
      }
    },
    addOrgRows() {
      const newRow = {
        orgId: '',
        orgFullName: '',
        positionCode: '',
        isMain: ''
      }
      this.orgList = [...this.orgList, newRow]
      // this.handleOpened()
      this.scrollUser()
    },
    handleOrgDelete(row, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.orgList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    orgChose(index) {
      this.orgChoseIndex = index
      this.orgChoseDilog = true
    },
    handleTenantChanged() {
      const tenantRoles = []
      if (this.dialogObj.tenantIds && this.dialogObj.tenantIds.length > 0) {
        this.dialogObj.tenantIds.forEach((tenantId) => {
          let isExits = false
          this.dialogObj.tenantRoles.forEach((tenantRole) => {
            if (tenantId === tenantRole.tenantId) {
              tenantRoles.push(tenantRole)
              isExits = true
            }
          })
          if (!isExits) tenantRoles.push({ tenantId, roleList: [{ tenantId, roleId: 'ROLE_USER', roleName: '普通用户角色' }] })
        })
      }
      this.dialogObj.tenantRoles = tenantRoles
      if (this.dialogObj.tenantRoles.length > 0 && !this.dialogObj.tenantRoles.map(obj => obj.tenantId).some(tenantId => tenantId === this.roleChoseActiveTenantId)) {
        this.roleChoseActiveTenantId = this.dialogObj.tenantRoles && this.dialogObj.tenantRoles.length > 0 ? this.dialogObj.tenantRoles[0].tenantId : ''
      }
      const _this = this
      setTimeout(function() {
        _this.scrollUser()
      }, 100)
    },
    handleTreeSelect(data) {
      const repeat = this.orgList.filter(item => item.orgId === data.id)
      if (repeat.length > 0) {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg23')
        })
        return false
      }
      this.orgList[this.orgChoseIndex].orgId = data.id
      this.orgList[this.orgChoseIndex].orgName = data.text
      this.orgList[this.orgChoseIndex].orgFullName = data.fullName
      this.orgChoseDilog = false
    },
    async roleChose(tenantRole) {
      if (this.allRoleList.length === 0) {
        const res = await getAllRole()
        this.allRoleList = res.datas.allRole
      }
      this.allRoleList.forEach((item) => { item.checkFlag = false })
      this.searchId = ''
      this.searchName = ''
      this.roleChoseData = [...this.allRoleList]
      this.$nextTick(function() {
        if (tenantRole.roleList) {
          tenantRole.roleList.forEach(obj => {
            const roles = this.roleChoseData.filter(item => item.id === obj.roleId)
            if (roles.length > 0) {
              this.$refs.roleChoseMultipleTable.toggleRowSelection(roles[0], true)
              roles[0].checkFlag = true
            }
          })
        }
      })
      this.roleChoseTenant = tenantRole
      this.roleChoseDilog = true
      this.scroll()
      this.scrollUser()
    },
    roleHandlePageChange(currentPage) {
      this.roleSearchParam.pageNo = currentPage
      this.roleChose()
    },
    roleHandleSizeChange(val) {
      this.roleSearchParam.pageSize = val
      this.roleSearchParam.pageNo = 1
      this.roleChose()
    },
    rolesSelect() {
      const role = []
      this.allRoleList.forEach(obj => {
        if (obj.checkFlag) {
          role.push({ tenantId: this.roleChoseTenant.tenantId, roleId: obj.id, roleName: obj.roleName })
        }
      })
      this.roleChoseTenant.roleList = role
      this.roleChoseDilog = false
      this.scrollUser()
    },
    roleHandleDelete(tenantRole, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        tenantRole.roleList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    selectRole() {
      this.roleChoseData = this.allRoleList.filter(item => {
        // 筛选条件都为空
        if (!this.searchId && !this.searchName) {
          return true
        } else {
          let flag = true
          if (this.searchId && item.id.toLowerCase().indexOf(this.searchId.toLowerCase()) < 0) {
            flag = false
          }
          if (this.searchName && item.roleName.toLowerCase().indexOf(this.searchName.toLowerCase()) < 0) {
            flag = false
          }
          return flag
        }
      })
      this.$nextTick(function() {
        this.roleChoseData.forEach(obj => {
          if (obj.checkFlag) {
            this.$refs.roleChoseMultipleTable.toggleRowSelection(obj, true)
          }
        })
      })
      // this.scroll()
    },
    handleSelect(selection, row) {
      const role = selection.find(item => item.id === row.id)
      if (role) {
        row.checkFlag = true
      } else {
        row.checkFlag = false
      }
    },
    sortList(lists) { // lists传的是数组
      return lists.sort((a, b) => {
        return a['grapheme'].localeCompare(b['grapheme']) // grapheme为字母对应的属性名
      })
    },
    async handleClickCreateHeadImg(nickName) {
      if (nickName.length < 2 || nickName.length > 4) {
        this.$message({
          type: 'warning',
          message: '用户姓名必须2-4个字'
        })
        return
      }
      const userId = this.dialogObj.id
      this.imgShow = false
      const res = await createHeadImg(userId)
      if (res && res.success) {
        this.$nextTick(() => {
          this.headImgUrl = process.env.VUE_APP_CONTEXT_PATH + '/api/org/user/showHeadImg/' + this.dialogObj.id + '?' + new Date().getTime()
          this.imgShow = true
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .personnel {
    .info {
      display: flex;
      flex-wrap: wrap;
      &>div {
        width: 50%;
        display: flex;
        box-sizing: border-box;
        padding: 10px 0;
        padding-right: 50px;
        align-items: center;
        .title {
          width: 120px;
          font-size: 14px;
          font-weight: 700;
        }
        .input {
          flex: 1;
        }
      }
    }
    h4 {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      border-bottom: 1px dashed #ccc;
      color: rgb(50, 50, 50);
      margin-bottom: 10px;
      padding: 10px 0;
      position: relative;
      // color: #000;
      .add_row {
        position: absolute;
        right: 0;
        bottom: 10px;
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
    .affiliation,.role {
      width: 80%;
    }
    .btn {
      width: 80%;
      box-sizing: border-box;
      padding-left: 30px;
      margin-top: 10px;
    }
  }
    //   .orgChoseDilog {
    //   .box {
    //     height: 360px;
    //     overflow: auto;
    //     background-color: #fff;
    //   }
    // }
</style>
