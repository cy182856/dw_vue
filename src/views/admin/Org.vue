<template>
  <div class="user apply" @click="hideOperation(activeOperation || '')">
    <div class="left search-left-box ">
      <el-tree
        :data="data"
        node-key="id"
        class="tree-croll"
        :expand-on-click-node="false"
        :default-expanded-keys="expandedKeys"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        @node-drop="allowNodeDrop"
        @node-click="selectNode"
        @node-contextmenu="operation"
        @node-expand="updateScroll"
        @node-collapse="updateScroll"
      >
        <template slot-scope="scope">
          <div class="tree_content">
            <div class="tree_item">
              <span v-if="scope.data.id !== 50" class="iconfont" :class="scope.data.children || scope.data.type === 'org' ? 'icon-bumenguanli_h' : 'icon-Avatar'" />
              <span v-else class="iconfont icon-zuzhijiagou" />
              <span>{{ scope.data.text }}</span>
            </div>
            <div :ref="scope.data.id" class="tree_down">
              <template v-if="scope.data.children || scope.data.type === 'org'">
                <p @click.stop="append(scope.data)">
                  <!-- 增加下级机构 -->
                  {{ $t('admin.org.addSubMech') }}
                </p>
                <p @click.stop="insertAfter(scope.node.parent.data)">
                  <!-- 增加本级机构 -->
                  {{ $t('admin.org.addLevelMech') }}
                </p>
                <p @click.stop="appendPersonnel(scope.data)">
                  <!-- 增加机构人员 -->
                  {{ $t('admin.org.addMechUser') }}
                </p>
                <p @click.stop="removeObject(scope)">
                  <!-- 删除本级机构 -->
                  {{ $t('admin.org.deleteLevelMech') }}
                </p>
              </template>
              <template v-else>
                <p @click.stop="removePersonnel(scope.node.parent.data, scope.data)">
                  <!-- 删除该人员 -->
                  {{ $t('admin.org.deleteUser') }}
                </p>
              </template>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="content content-light">
      <div v-show="active === 'list'" style="height:100%">
        <div class="search">
          <h5>{{ $t('admin.org.orgManagement') }}</h5>
          <el-form ref="form" class="search-form" label-position="left" :model="searchParam.params">
            <el-row type="flex" justify="space-between">
              <el-col :span="12">
                <el-form-item :label="$t('admin.org.orgName')" prop="orgName">
                  <el-input v-model="searchParam.params.orgName" class="input" :placeholder="$t('admin.org.orgName')" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('admin.org.orgCode')" prop="orgCode">
                  <el-input v-model="searchParam.params.orgCode" class="input" :placeholder="$t('admin.org.orgCode')" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item style="margin-bottom:0 !important">
              <ul class="operation-box dialog-btn-box end-content-flex mcbtn">
                <li class="operation-item" @click="search">
                  <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                  <span class="operation-text">{{ $t('comm.query') }}</span>
                </li>
                <li class="operation-item" @click="reset">
                  <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
                  <span class="operation-text"> {{ $t('comm.reset') }}</span>
                </li>
              </ul>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-bg-box search-list-table margin-Left-15 width-28">
          <div class="table" style="height:100%">
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
                prop="id"
                :label="$t('admin.org.orgId')"
              />
              <el-table-column
                prop="orgCode"
                :label="$t('admin.org.orgCode')"
              />
              <el-table-column
                prop="orgName"
                :label="$t('admin.org.orgName')"
                min-width="180"
                show-overflow-tooltip
              />
              <el-table-column
                prop="orgLevel"
                :label="$t('admin.org.orgLevel')"
              />
              <el-table-column
                prop="parentId"
                :label="$t('admin.org.parentId')"
              />
              <el-table-column
                prop="deleteFlag"
                :label="$t('admin.org.deleteFlag')"
              >
                <template slot-scope="scope">
                  <dict-write dict-type-id="DeleteFlag" :value="scope.row.deleteFlag" />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('comm.operation')"
                min-width="120"
                width="120"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                  />
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                  />
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
      <div v-show="active === 'department'" class="department" style="height:100%">
        <div class="search" style="height: calc(100% - 90px);">
          <div class="input_box">
            <div v-show="false" class="flex2">
              <div class="title">
                {{ $t('admin.org.orgId') }}
              </div>
              <el-input
                v-model="departmentEdit.id"
                class="input"
                :readonly="true"
              />
            </div>
            <div class="flex2">
              <div class="title must">
                {{ $t('admin.org.orgCode') }}
              </div>
              <div class="input">
                <el-input
                  v-model="departmentEdit.orgCode"
                  class="input"
                  :placeholder="$t('admin.org.orgCode')"
                  @blur="validator('orgEditOrgCode')"
                />
                <span ref="orgEditOrgCode" data-roles="required" :data-value="departmentEdit.orgCode" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                {{ $t('admin.org.orgName') }}
              </div>
              <div class="input">
                <el-input
                  v-model="departmentEdit.orgName"
                  class="input"
                  @blur="validator('orgEditOrgName')"
                />
                <span ref="orgEditOrgName" data-roles="required" :data-value="departmentEdit.orgName" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                <!-- 父机构ID -->
                {{ $t('admin.org.parentId') }}
              </div>
              <el-input
                v-model="departmentEdit.parentId"
                class="input"
              />
            </div>
            <div class="flex2">
              <div class="title must">
                {{ $t('admin.org.deleteFlag') }}
              </div>
              <div class="input">
                <dict-select v-model="departmentEdit.deleteFlag" dict-type-id="DeleteFlag" @change="(value) => {validator('orgEditState', value)}" />
                <span ref="orgEditState" data-roles="required" :data-value="departmentEdit.deleteFlag" class="message" />
              </div>
            </div>
            <div v-if="hasTenant" class="flex2">
              <div class="title">
                <!-- 租户名 -->
                {{ $t('admin.org.tenantId') }}
              </div>
              <div class="input">
                <dict-select v-model="departmentEdit.tenantId" dict-type-id="Tenant" :disabled="!!departmentEdit.parentId" />
              </div>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box end-content-flex mcbtn margin-Left-15" style="justify-content: flex-start;">
          <!-- <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
              <span class="operation-text">{{ $t('comm.cancel') }}</span>
            </li> -->
          <li class="operation-item" style="" @click="orgEdit">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
            <span class="operation-text"> {{ $t('comm.save') }}</span>
          </li>
        </ul>
      </div>
      <div v-show="active === 'personnel' " class="personnel">
        <div class="dialog-addUserDilog" style="height: calc(100% - 62px);">
          <div class="search">
            <h5>{{ $t('comm.essentialInformation') }}</h5>
            <div class="input_box">
              <div class="flex2">
                <div class="title must">
                  {{ $t('admin.org.fullName') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.nickName"
                    class="input"
                    :placeholder="$t('admin.org.fullName')"
                    @blur="validator('userEditNickName')"
                  />
                  <span ref="userEditNickName" data-roles="required" :data-value="personEdit.nickName" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  <!-- 系统登入用户名 -->
                  {{ $t('admin.org.systemLoginUsername') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.userName"
                    class="input"
                    :placeholder="$t('admin.org.systemLoginUsername')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.password') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.password"
                    type="password"
                    class="input"
                    :placeholder="$t('admin.org.password')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.confirmPassword') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.rePassword"
                    class="input"
                    type="password"
                    :placeholder="$t('admin.org.confirmPassword')"
                    @blur="checkPassword('personEdit')"
                  />
                  <span ref="userEditRePassword" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.corpUserId') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.corpUserId"
                    class="input"
                    :placeholder="$t('admin.org.corpUserId')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.mobile') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.mobile"
                    class="input"
                    :placeholder="$t('admin.org.mobile')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.authMode') }}
                </div>
                <div class="input">
                  <dict-select v-model="personEdit.authMode" dict-type-id="AuthMode" class="input" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.language') }}
                </div>
                <div class="input">
                  <dict-select v-model="personEdit.language" dict-type-id="Language" class="input" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.ldapUserId') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.ldapUserId"
                    class="input"
                    :placeholder="$t('admin.org.ldapUserId')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.email') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.email"
                    class="input"
                    :placeholder="$t('admin.org.email')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.deleteFlag') }}
                </div>
                <div class="input">
                  <dict-select v-model="personEdit.deleteFlag" dict-type-id="DeleteFlag" class="input" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.userLock') }}
                </div>
                <div class="input">
                  <dict-select v-model="personEdit.isLocked" dict-type-id="IsNo" class="input" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.invalidDate') }}
                </div>
                <div class="input">
                  <el-date-picker
                    v-model="personEdit.invalidDate"
                    class="input"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="yyyy-MM-dd HH:mm:ss"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  OpenId
                </div>
                <div class="input">
                  <el-input
                    v-model="personEdit.openId"
                    class="input"
                    placeholder="OpenId"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  <!-- 首页事项显示 -->
                  {{ $t('admin.user.divSort') }}
                </div>
                <div class="input">
                  <dict-select v-model="personEdit.divSorts" dict-type-id="DivSort" :multiple="true" class="input" />
                </div>
              </div>
              <div v-if="hasTenant" class="flex2">
                <div class="title">
                  <!-- 租户名 -->
                  {{ $t('admin.org.tenantId') }}
                </div>
                <div class="input">
                  <dict-select v-model="personEdit.tenantIds" dict-type-id="Tenant" :multiple="true" class="input" @change="handleTenantChanged('personEdit')" />
                </div>
              </div>
            </div>
          </div>
          <div class="search">
            <h4>
              {{ $t('admin.org.affiliation') }}
              <div class="add_row iconfont icon-jia" @click.stop="addOrgRows('personEdit')">
                {{ $t('admin.org.addAffiliation') }}
              </div>
            </h4>
            <div class="table">
              <el-table
                :data="personEdit.userOrgs"
                border
                stripe
                style="width: 100%"
              >
                <el-table-column :label="$t('comm.operation')" width="70" :style="{textAlign: 'center'}">
                  <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleOrgDelete('personEdit', scope.row, scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('admin.org.organization')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="orgChose('personEdit', scope.$index)">
                      {{ $t('admin.org.sOrganization') }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('admin.org.orgId')" prop="orgId" />
                <el-table-column :label="$t('admin.org.orgName')" prop="orgFullName" min-width="180" show-overflow-tooltip />
                <el-table-column :label="$t('admin.org.post')">
                  <template slot-scope="scope">
                    <dict-select v-model="scope.row.positionCode" dict-type-id="Position" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('admin.org.isMain')" prop="isMain">
                  <template slot-scope="scope">
                    <dict-select v-model="scope.row.isMain" dict-type-id="IsNo" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="search">
            <h4>
              {{ $t('admin.org.role') }}
            </h4>
            <el-tabs v-model="roleChoseActiveTenantId" @tab-click="handleClick()">
              <el-tab-pane v-for="tenantRole in personEdit.tenantRoles" :key="tenantRole.tenantId" :label="tenantRole.tenantId | dictName('Tenant')" :name="tenantRole.tenantId">
                <h4>
                  <!-- <span v-if="hasTenant"> -->
                  <span v-if="hasTenant">
                    <dict-write dict-type-id="Tenant" :value="tenantRole.tenantId" />({{ tenantRole.tenantId }})
                  </span>
                  <div class="add_row iconfont icon-jia" @click.stop="roleChose('personEdit', tenantRole)">
                    {{ $t('admin.org.editRole') }}
                  </div>
                </h4>
                <div
                  class="table"
                >
                  <el-table
                    :data="tenantRole.roleList"
                    border
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column :label="$t('comm.operation')" width="70" :style="{textAlign: 'center'}">
                      <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-delete" type="danger" @click="roleHandleDelete('personEdit', tenantRole, scope.$index)" />
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('admin.org.roleId')" prop="roleId" />
                    <el-table-column :label="$t('admin.org.roleName')" prop="roleName" />
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex" style="justify-content: flex-start; margin-left:15px">
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="userSave('personEdit')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
            <span class="operation-text"> {{ $t('comm.save') }}</span>
          </li>
        </ul>
        <!-- <div class="btn">
          <el-button type="primary" size="small">
            {{ $t('comm.cancel') }}
          </el-button>
          <el-button type="primary" size="small" @click="userSave('personEdit')">
            {{ $t('comm.save') }}
          </el-button>
        </div> -->
      </div>
      <div class="addOrgDilog">
        <el-dialog
          class="content-dialog-box  search-light"
          :close-on-click-modal="false"
          custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
          top="0"
          :title="$t('admin.org.addInstitutionalInformation')"
          :visible.sync="addOrgDilog"
          width="60%"
          center
        >
          <div class="display: flex;flex-direction: column;height: 100%; overflow: auto;">
            <div class="middle-box">
              <div class="input_box">
                <div v-show="false" class="flex2">
                  <div class="title">
                    {{ $t('admin.org.orgId') }}:
                  </div>
                  <div class="input">
                    <el-input v-model="addOrgData.id" :placeholder="$t('admin.org.orgId')" class="input" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title must">
                    {{ $t('admin.org.orgCode') }}:
                  </div>
                  <div class="input">
                    <el-input v-model="addOrgData.orgCode" :placeholder="$t('admin.org.orgCode')" class="input" @blur="validator('orgAddOrgCode')" />
                    <span ref="orgAddOrgCode" data-roles="required" :data-value="addOrgData.orgCode" class="message" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title must">
                    {{ $t('admin.org.orgName') }}:
                  </div>
                  <div class="input">
                    <el-input v-model="addOrgData.orgName" :placeholder="$t('admin.org.orgName')" class="input" @blur="validator('orgAddOrgName')" />
                    <span ref="orgAddOrgName" data-roles="required" :data-value="addOrgData.orgName" class="message" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title">
                    {{ $t('admin.org.parentId') }}:
                  </div>
                  <div class="input">
                    <el-input v-model="addOrgData.parentId" :placeholder="$t('admin.org.parentId')" class="input" />
                  </div>
                </div>
                <div class="flex2">
                  <div class="title must">
                    {{ $t('admin.org.deleteFlag') }}:
                  </div>
                  <div class="input">
                    <dict-select v-model="addOrgData.deleteFlag" dict-type-id="DeleteFlag" @change="(value) => {validator('orgAddState', value)}" />
                    <span ref="orgAddState" data-roles="required" :data-value="addOrgData.deleteFlag" class="message" />
                  </div>
                </div>
                <div v-if="hasTenant" class="flex2">
                  <div class="title">
                    <!-- 租户名 -->
                    {{ $t('admin.org.tenantId') }}
                  </div>
                  <div class="input">
                    <dict-select v-model="addOrgData.tenantId" dict-type-id="Tenant" :disabled="!!addOrgData.parentId" />
                  </div>
                </div>
              </div>
            </div>
            <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
              <li class="operation-item" @click="addOrg">
                <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
                <span class="operation-text">{{ $t('comm.certain') }}</span>
              </li>
            </ul>
          </div>
        </el-dialog>
      </div>

      <div class="addUserDilog">
        <el-dialog
          class="content-dialog-box  search-light"
          :close-on-click-modal="false"
          custom-class="dialog-drag fixed-search-btn-box"
          top="0"
          :title="$t('admin.org.addUserInformation')"
          :visible.sync="addUserDilog"
          width="80%"
          center
          @opened="handleOpenedUser"
        >
          <div class="display: flex;flex-direction: column;height: 100%;">
            <div class="dialog-addUserDilog">
              <div class="middle-box">
                <h4>{{ $t('comm.essentialInformation') }}</h4>
                <div class="input_box">
                  <div class="flex2">
                    <div class="title must">
                      {{ $t('admin.org.fullName') }}
                    </div>
                    <div class="input">
                      <el-input
                        v-model="addUserData.nickName"
                        class="input"
                        :placeholder="$t('admin.org.fullName')"
                        @blur="validator('userAddNickName')"
                      />
                      <span ref="userAddNickName" data-roles="required" :data-value="addUserData.nickName" class="message" />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.sysName') }}
                    </div>
                    <div class="input">
                      <el-input
                        v-model="addUserData.userName"
                        class="input"
                        :placeholder="$t('admin.org.sysName')"
                      />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.password') }}
                    </div>
                    <div class="input">
                      <el-input
                        v-model="addUserData.password"
                        type="password"
                        class="input"
                        :placeholder="$t('admin.org.password')"
                      />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.confirmPassword') }}
                    </div>
                    <div class="input">
                      <el-input
                        v-model="addUserData.rePassword"
                        type="password"
                        class="input"
                        :placeholder="$t('admin.org.confirmPassword')"
                        @blur="checkPassword('addUserData')"
                      />
                      <span ref="userAddRePassword" class="message" />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.corpUserId') }}
                    </div>
                    <div class="input">
                      <el-input
                        v-model="addUserData.corpUserId"
                        class="input"
                        :placeholder="$t('admin.org.corpUserId')"
                      />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.mobile') }}
                    </div>
                    <div class="input">
                      <el-input
                        v-model="addUserData.mobile"
                        class="input"
                        :placeholder="$t('admin.org.mobile')"
                      />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.authMode') }}
                    </div>
                    <div class="input">
                      <dict-select v-model="addUserData.authMode" dict-type-id="AuthMode" class="input" />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.language') }}
                    </div>
                    <div class="input">
                      <dict-select v-model="addUserData.language" dict-type-id="Language" class="input" />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.ldapUserId') }}
                    </div>
                    <div class="input">
                      <el-input
                        v-model="addUserData.ldapUserId"
                        class="input"
                        :placeholder="$t('admin.org.ldapUserId')"
                      />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.email') }}
                    </div>
                    <div class="input">
                      <el-input
                        v-model="addUserData.email"
                        class="input"
                        :placeholder="$t('admin.org.email')"
                      />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.deleteFlag') }}
                    </div>
                    <div class="input">
                      <dict-select v-model="addUserData.deleteFlag" dict-type-id="DeleteFlag" class="input" />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.userLock') }}
                    </div>
                    <div class="input">
                      <dict-select v-model="addUserData.isLocked" dict-type-id="IsNo" class="input" />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      {{ $t('admin.org.invalidDate') }}
                    </div>
                    <div class="input">
                      <el-date-picker
                        v-model="addUserData.invalidDate"
                        class="input"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="yyyy-MM-dd HH:mm:ss"
                      />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      <!-- 职级 -->
                      {{ $t('admin.org.userGrade') }}
                    </div>
                    <div class="input">
                      <dict-select v-model="addUserData.userGrade" dict-type-id="UserGrade" class="input" />
                    </div>
                  </div>
                  <div class="flex2">
                    <div class="title">
                      <!-- 首页事项显示 -->
                      {{ $t('admin.user.divSort') }}
                    </div>
                    <div class="input">
                      <dict-select v-model="addUserData.divSorts" dict-type-id="DivSort" :multiple="true" class="input" />
                    </div>
                  </div>
                  <div v-if="hasTenant" class="flex2">
                    <div class="title">
                      <!-- 租户名 -->
                      {{ $t('admin.org.tenantId') }}
                    </div>
                    <div class="input">
                      <dict-select v-model="addUserData.tenantIds" :multiple="true" dict-type-id="Tenant" class="input" @change="handleTenantChanged('addUserData')" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer-box">
                <h4>
                  {{ $t('admin.org.affiliation') }}<div class="add_row iconfont icon-jia" @click.stop="addOrgRows('addUserData')">
                    {{ $t('admin.org.addAffiliation') }}
                  </div>
                </h4>
                <div class="table">
                  <el-table
                    :data="addUserData.userOrgs"
                    border
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column :label="$t('comm.operation')" width="70" :style="{textAlign: 'center'}">
                      <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleOrgDelete('addUserData', scope.row, scope.$index)" />
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('admin.org.organization')" width="120" align="center">
                      <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="orgChose('addUserData', scope.$index)">
                          {{ $t('admin.org.sOrganization') }}
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('admin.org.orgId')" prop="orgId" />
                    <el-table-column :label="$t('admin.org.orgName')" prop="orgFullName" min-width="180" show-overflow-tooltip />
                    <el-table-column :label="$t('admin.org.post')">
                      <template slot-scope="scope">
                        <dict-select v-model="scope.row.positionCode" dict-type-id="Position" />
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('admin.org.isMain')">
                      <template slot-scope="scope">
                        <dict-select v-model="scope.row.isMain" dict-type-id="IsNo" />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="footer-box">
                <h4>
                  {{ $t('admin.org.role') }}
                </h4>
                <el-tabs v-model="roleChoseActiveTenantId" @tab-click="handleClick()">
                  <el-tab-pane v-for="tenantRole in addUserData.tenantRoles" :key="tenantRole.tenantId" :label="tenantRole.tenantId | dictName('Tenant')" :name="tenantRole.tenantId">
                    <h4 style="margin-top: 4px;">
                      <span v-if="hasTenant">
                        <dict-write dict-type-id="Tenant" :value="tenantRole.tenantId" />({{ tenantRole.tenantId }})
                      </span>
                      <div class="add_row iconfont icon-jia" @click.stop="roleChose('addUserData', tenantRole)">
                        {{ $t('admin.org.editRole') }}
                      </div>
                    </h4>
                    <div class="table">
                      <el-table
                        :data="tenantRole.roleList"
                        border
                        stripe
                        style="width: 100%"
                      >
                        <el-table-column :label="$t('comm.operation')" width="70" :style="{textAlign: 'center'}">
                          <template slot-scope="scope">
                            <el-button size="mini" icon="el-icon-delete" type="danger" @click="roleHandleDelete('addUserData', tenantRole, scope.$index)" />
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('admin.org.roleId')" prop="roleId" />
                        <el-table-column :label="$t('admin.org.roleName')" prop="roleName" />
                      </el-table>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
              <li class="operation-item" @click="addUserDilog = false">
                <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
                <span class="operation-text">{{ $t('comm.cancel') }}</span>
              </li>
              <li class="operation-item" @click="userSave('addUserData')">
                <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
                <span class="operation-text">{{ $t('comm.save') }}</span>
              </li>
            </ul>
            <!-- <div class="btn">
              <el-button type="primary" size="small" @click="addUserDilog = false">
                {{ $t('comm.cancel') }}
              </el-button>
              <el-button type="primary" size="small" @click="userSave('addUserData')">
                {{ $t('comm.save') }}
              </el-button>
            </div> -->
          </div>
        </el-dialog>
      </div>
      <div class="userSelect">
        <el-dialog
          :title="$t('admin.org.selectOrg')"
          :visible.sync="orgChoseDilog"
          custom-class="content-dialog-userSelect"
          width="33%"
          :close-on-click-modal="false"
          center
        >
          <div class="select_box">
            <user-org-tree
              tree-type="department"
              :multiple="false"
              :is-admin="true"
              @select="handleTreeSelect"
              @cancel="orgChoseDilog=false"
              @clear="orgChoseDilog=false"
            />
          </div>
        </el-dialog>
      </div>

      <div class="roleChoseDilog">
        <el-dialog
          :title="$t('admin.org.selectRole')"
          class="content-dialog-box  search-light"
          :close-on-click-modal="false"
          custom-class="dialog-drag fixed-search-btn-box"
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
                <!-- <div class="flex3">
                  <div class="title">
                    {{ $t('admin.org.roleId') }}
                  </div>
                  <el-input v-model="searchId" :placeholder="$t('admin.org.roleId')" clearable />
                </div>
                <div class="flex3">
                  <div class="title">
                    {{ $t('admin.org.roleName') }}
                  </div>
                  <el-input v-model="searchName" :placeholder="$t('admin.org.roleName')" clearable />
                </div> -->
                <!-- <div class="flex3">
                  <el-button type="success" class="el-icon-search" @click="selectRole">
                    {{ $t('admin.org.screen') }}
                  </el-button>
                </div> -->
              </div>
            </div>
            <div class="footer-box">
              <div class="dialog-table-box">
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
                    :label="$t('admin.org.roleId')"
                  />
                  <el-table-column
                    prop="roleName"
                    :label="$t('admin.org.roleName')"
                  />
                  <el-table-column
                    prop="roleDesc"
                    :label="$t('admin.org.desc')"
                  />
                </el-table>
              </div>
            </div>
            <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
              <li class="operation-item" @click="rolesSelect(addOrEdit)">
                <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
                <span class="operation-text">{{ $t('comm.certain') }}</span>
              </li>
            </ul>
          </div>
          <!-- <span slot="footer">
            <el-button type="primary" @click="rolesSelect(addOrEdit)">{{ $t('comm.certain') }}</el-button>
          </span> -->
        </el-dialog>
      </div>
    </div>
    <div class="editDilog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
        top="0"
        :title="$t('comm.edit')"
        :visible.sync="orgEditDilog"
        width="60%"
        center
      >
        <div class="display: flex;flex-direction: column;height: 100%;">
          <div class="middle-box">
            <!-- <h5>{{ $t('comm.essentialInformation') }}</h5> -->
            <div class="input_box">
              <div v-show="false" class="flex2">
                <div class="title">
                  <!-- 机构ID： -->
                  {{ $t('admin.org.orgId') }}
                </div>
                <el-input v-model="editOrgData.id" :placeholder="$t('admin.org.orgId')" class="input" disabled />
              </div>
              <div class="flex2">
                <div class="title must">
                  <!-- 机构代码： -->
                  {{ $t('admin.org.orgCode') }}
                </div>
                <div class="input">
                  <el-input v-model="editOrgData.orgCode" :placeholder="$t('admin.org.orgCode')" class="input" @blur="validator('editOrgCode')" />
                  <span ref="editOrgCode" data-roles="required" :data-value="editOrgData.orgCode" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">
                  <!-- 机构名称： -->
                  {{ $t('admin.org.orgName') }}
                </div>
                <div class="input">
                  <el-input v-model="editOrgData.orgName" :placeholder="$t('admin.org.orgName')" class="input" @blur="validator('editOrgName')" />
                  <span ref="editOrgName" data-roles="required" :data-value="editOrgData.orgName" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  <!-- 父机构ID： -->
                  {{ $t('admin.org.parentId') }}
                </div>
                <el-input v-model="editOrgData.parentId" :placeholder="$t('admin.org.parentId')" class="input" />
              </div>
              <div class="flex2">
                <div class="title must">
                  <!-- 状态： -->
                  {{ $t('admin.org.deleteFlag') }}
                </div>
                <div class="input">
                  <dict-select v-model="editOrgData.deleteFlag" class="input" dict-type-id="DeleteFlag" @change="(value) => {validator('editState', value)}" />
                  <span ref="editState" data-roles="required" :data-value="editOrgData.deleteFlag" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  <!-- 租户名 -->
                  {{ $t('admin.org.tenantId') }}
                </div>
                <div class="input">
                  <dict-select v-model="editOrgData.tenantId" dict-type-id="Tenant" :disabled="!!editOrgData.parentId" />
                </div>
              </div>
            </div>
          </div>
          <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
            <li class="operation-item" @click="orgEditDetail">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
              <span class="operation-text">{{ $t('comm.certain') }}</span>
            </li>
          </ul>
        </div>
        <!-- <span slot="footer">
          <el-button type="primary" @click="orgEditDetail()">{{ $t('comm.certain') }}</el-button>
        </span> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { formValidator } from '@/mixins/form-validator.js'
import { getOrgList, orgSave, getOrgTree, orgRemove, userSave, userRemove, orgUserEdit, userMove, orgMove } from '@/api/admin/org-api.js'
import { getAllRole } from '@/api/admin/role-api.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
import { names } from '@/mixins/names.js'
import DictWrite from '@/components/DictWrite.vue'
import { setLang } from '@/utils/storage'
import { getLanguageType } from '@/utils/lang.js'
export default {
  components: { DictWrite },
  mixins: [search, formValidator, niceScroll, names],
  data() {
    return {
      roleChoseActiveTenantId: '',
      roleChoseTenant: {},
      selectData: '',
      searchId: '',
      searchName: '',
      orgEditDilog: false,
      addOrgDilog: false,
      addUserDilog: false,
      orgChoseDilog: false,
      roleChoseDilog: false,
      isLoading: false,
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          orgCode: '',
          orgName: ''
        }
      },
      data: [],
      expandedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      activeOperation: '',
      tableData: [],
      active: 'list',
      departmentInfo: {
        radio: '1'
      },
      editOrgData: {
        id: '',
        orgCode: '',
        orgName: '',
        parentId: '',
        deleteFlag: '',
        tenantId: ''
      },
      addOrgData: {
        id: '',
        orgCode: '',
        orgName: '',
        parentId: '',
        deleteFlag: '',
        tenantId: ''
      },
      addUserData: {
        nickName: '',
        userName: '',
        password: '',
        rePassword: '',
        corpUserId: '',
        mobile: '',
        authMode: '',
        language: '',
        ldapUserId: '',
        email: '',
        deleteFlag: '',
        isLocked: '',
        invalidDate: '',
        tenantIds: [],
        userOrgs: [],
        tenantRoles: [],
        divSorts: []
      },
      personEdit: {
        id: '',
        openId: '',
        nickName: '',
        userName: '',
        password: '',
        rePassword: '',
        corpUserId: '',
        mobile: '',
        authMode: '',
        language: '',
        ldapUserId: '',
        email: '',
        deleteFlag: '',
        isLocked: '',
        invalidDate: '',
        tenantIds: [],
        userOrgs: [],
        tenantRoles: [],
        roles: [],
        divSorts: []
      },
      orgChoseData: [],
      roleChoseData: [],
      allRoleList: [],
      orgChoseIndex: '',
      multipleSelection: [],
      departmentEdit: {
        id: '',
        orgCode: '',
        orgName: '',
        parentId: '',
        tenantId: '',
        deleteFlag: ''
      },
      addOrEdit: '',
      orgAddOrEdit: '',
      userMove: {
        userId: '',
        orgId: '',
        targetOrgId: ''
      },
      orgMove: {
        orgId: '',
        targetParentOrgId: ''
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
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.$store.dispatch('getDicts', 'Tenant')
    this.fetchData()
    this.searchTree()
  },
  methods: {
    handleClick() {
      this.scrollUser()
    },
    selectP(data) {
      this.selectData = data
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
    },
    async fetchData() {
      const res = await getOrgList(this.searchParam)
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
    async searchTree() {
      const res = await getOrgTree('', 'personnel', true)
      if (res && res.success) {
        this.data = res.datas.result
        // 默认展开第一级
        if (this.data) {
          this.expandedKeys = this.data.map(item => item.id)
        }
        this.data.unshift({ id: 50, text: '机构人员树' })
      }
      this.handleOpenedTree()
      // const _this = this
      // setTimeout(function() {
      //   _this.handleOpenedTree()
      //   // _this.scrollTree()
      // }, 0)
    },
    operation(event, data, node, target) {
      // 点击右键时触发
      // alert('点击了右键')
      if (!(data.text === '机构人员树')) {
        this.showOperation(data.id)
      }
    },
    selectNode(target) {
      // 点击左键时触发
      if (target.id === 50) {
        this.active = 'list'
      } else {
        if (target.children || target.type === 'org') {
          this.clearErrorMessage('orgEdit')
          this.departmentEdit.id = target.id
          this.departmentEdit.orgCode = target.code
          this.departmentEdit.orgName = target.text
          this.departmentEdit.parentId = target.parentId
          this.departmentEdit.tenantId = target.tenantId
          this.departmentEdit.deleteFlag = '0'
          this.active = 'department'
        } else {
          this.clearErrorMessage('userEdit')
          this.personEdit.password = ''
          this.personEdit.rePassword = ''
          orgUserEdit(target.id).then(res => {
            const user = res.datas.user
            const userOrgs = res.datas.userOrgs
            const userRoles = res.datas.userRoles
            this.personEdit = { ...user }
            this.personEdit.userOrgs = []
            this.personEdit.tenantRoles = []
            if (user.divSort) {
              this.$set(this.personEdit, 'divSorts', user.divSort.split(','))
            } else {
              this.$set(this.personEdit, 'divSorts', [])
            }
            if (user.tenantId) {
              this.$set(this.personEdit, 'tenantIds', user.tenantId.split(','))
            } else {
              this.$set(this.personEdit, 'tenantIds', [])
            }
            userOrgs.forEach(data => {
              this.personEdit.userOrgs.push({
                orgId: data.org_id,
                orgName: data.org_name,
                orgFullName: data.full_name,
                positionCode: data.position_code,
                isMain: data.is_main + ''
              })
            })
            if (this.hasTenant) {
              this.personEdit.tenantIds.forEach(tenantId => {
                const roleList = userRoles.filter(item => item.tenant_id === tenantId || !item.tenant_id)
                  .map(data => {
                    return {
                      tenantId: tenantId,
                      roleId: data.role_id,
                      roleName: data.role_name
                    }
                  })
                this.personEdit.tenantRoles.push({ tenantId, roleList })
              })
              this.roleChoseActiveTenantId = this.personEdit.tenantRoles && this.personEdit.tenantRoles.length > 0 ? this.personEdit.tenantRoles[0].tenantId : ''
            } else {
              const roleList = userRoles.map(data => {
                return {
                  tenantId: '',
                  roleId: data.role_id,
                  roleName: data.role_name
                }
              })
              this.personEdit.tenantRoles.push({ tenantId: 'notenant', roleList })
              this.roleChoseActiveTenantId = 'notenant'
            }
            this.active = 'personnel'
            const _this = this
            setTimeout(function() {
              _this.scrollUser()
            }, 300)
          })
        }
      }
    },
    // 设置节点能否被放置
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.type === 'user') {
        // 不能放置在人员的里面
        return type !== 'inner'
      } else {
        return true
      }
    },
    // 设置节点能否被拖拽
    allowDrag(draggingNode) {
      // 判断是否为第一级，第一级不可拖动
      // console.log(draggingNode)
      if (!draggingNode.parent.data.children) {
        return false
      }
      return true
    },
    //  拖拽完成时触发
    allowNodeDrop(draggingNode, dropNode, dropType, ev) {
      if (draggingNode.data.type === 'user') {
        // 用户拖拽
        this.userMove.userId = draggingNode.data.id
        this.userMove.orgId = draggingNode.data.parentId
        if (dropType !== 'inner') {
          this.userMove.targetOrgId = dropNode.data.parentId
        } else {
          this.userMove.targetOrgId = dropNode.data.id
        }
        userMove(this.userMove).then(res => {
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: this.$t('comm.success')
            })
            this.searchTree()
          }
        })
      }
      if (draggingNode.data.type === 'org') {
        // 组织拖拽
        this.orgMove.orgId = draggingNode.data.id
        if (dropType !== 'inner') {
          this.orgMove.targetParentOrgId = dropNode.data.parentId
        } else {
          this.orgMove.targetParentOrgId = dropNode.data.id
        }
        orgMove(this.orgMove).then(res => {
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: this.$t('comm.success')
            })
            this.searchTree()
          }
        })
      }
    },
    // 增加本级机构
    insertAfter(data) {
      // this.$prompt('请输入机构名称', this.$t('comm.tips') , {
      //  confirmButtonText: this.$t('comm.certain'),
      //  cancelButtonText: '取消'
      // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      // inputErrorMessage: '邮箱格式不正确'
      // }).then(({ value }) => {
      // const newChild = { id: id++, text: value, children: [] }
      // if (!data.children) {
      //   // 当不存在时，说明在最外层
      //   data.push(newChild)
      // } else {
      //   data.children.push(newChild)
      // }
      this.clearErrorMessage('orgAdd')
      this.resetTable(this.addOrgData)
      this.addOrgData.parentId = data.id
      this.addOrgData.tenantId = data.tenantId
      this.addOrgDilog = true
      this.hideOperation(this.activeOperation)
    },
    // 增加下属机构
    append(data) {
      // this.$prompt('请输入机构名称', '提示 ', {
      //  confirmButtonText: this.$t('comm.certain'),
      //  cancelButtonText: '取消'
      // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      // inputErrorMessage: '邮箱格式不正确'
      // }).then(({ value }) => {
      // const newChild = { id: id++, text: value, children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
      this.clearErrorMessage('orgAdd')
      this.resetTable(this.addOrgData)
      this.addOrgData.parentId = data.id
      this.addOrgData.tenantId = data.tenantId
      this.addOrgDilog = true
      this.hideOperation(this.activeOperation)
    },
    resetTable(params) {
      for (var i in params) {
        params[i] = ''
      }
    },
    // 增加下级人员
    appendPersonnel(data) {
      this.clearErrorMessage('userAdd')
      this.resetTable(this.addUserData)
      const roleList = []
      roleList.push({ tenantId: data.tenantId, roleId: 'ROLE_USER', roleName: '普通用户角色' })
      this.addUserData.userOrgs = [{ orgId: data.id, orgName: data.text, orgFullName: data.fullName }]
      this.addUserData.tenantRoles = [{ tenantId: data.tenantId, roleList }]
      this.addUserData.tenantIds = [data.tenantId]
      this.roleChoseActiveTenantId = data.tenantId
      this.addUserData.divSorts = []
      this.hideOperation(this.activeOperation)
      this.addUserDilog = true
    },
    // 删除本级机构
    removeObject(scope) {
      const { node, data } = scope
      const { data: parentData } = node.parent
      // 判断是否在最外层，最外层无法删除
      if (!parentData.children) {
        // console.log('无法删除')
        this.$message({
          type: 'error',
          message: this.$t('comm.msg5')
        })
      } else {
        this.$confirm(this.$t('comm.tip8'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          // console.log(parentData)
          // const { children } = parentData
          // children.splice(children.findIndex(d => d.id === data.id), 1)
          orgRemove([{ id: data.id }]).then(() => {
            this.search()
            this.searchTree()
          })
          this.activeOperation = ''
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
        })
      }
      this.hideOperation(this.activeOperation)
      // console.log(node)
      // console.log(data)
    },
    // 删除人员
    removePersonnel(parent, data) {
      // const children = parent.children || parent
      // const index = children.findIndex(d => d.id === data.id)
      this.$confirm(this.$t('comm.tip7'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        // children.splice(index, 1)
        userRemove({ userId: data.id, orgId: parent.id }).then(res => {
          if (res && res.success) {
            this.activeOperation = ''
            this.hideOperation(this.activeOperation)
            this.searchTree()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    // 显示右键操作菜单
    showOperation(ref) {
      // 判断前一个的操作菜单是否隐藏
      if (this.activeOperation) {
        this.$refs[this.activeOperation].style.display = 'none'
      }
      this.activeOperation = ref
      this.$refs[ref].style.display = 'block'
    },
    // 隐藏右键操作菜单
    hideOperation(ref) {
      if (ref) {
        this.$refs[ref].style.display = 'none'
      }
    },
    handleEdit(index, rowData) {
      this.clearErrorMessage('edit')
      this.editOrgData = { ...rowData }
      this.editOrgData.deleteFlag = rowData.deleteFlag + ''
      this.orgEditDilog = true
    },
    handleDelete(index, rowData) {
      this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        orgRemove([rowData]).then(() => {
          this.search()
          this.searchTree()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleOrgDelete(table, row, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this[table].userOrgs.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    roleHandleDelete(table, tenantRole, index) {
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
    addOrgRows(table) {
      const newRow = {
        orgId: '',
        orgName: '',
        orgFullName: '',
        positionCode: '',
        isMain: ''
      }
      this[table].userOrgs.push(newRow)
      // this.handleOpened()
      // this.scroll()
      this.scrollUser()
      // this.orgChoseName.push('')
    },
    // 123
    orgChose(table, index) {
      // getAllOrgTree().then(res => {
      //   this.orgChoseData = res.datas.result
      this.orgChoseIndex = index
      this.orgAddOrEdit = table
      this.orgChoseDilog = true
      // })
    },
    handleTenantChanged(userObj) {
      const tenantRoles = []
      if (this[userObj].tenantIds && this[userObj].tenantIds.length > 0) {
        this[userObj].tenantIds.forEach((tenantId) => {
          let isExits = false
          this[userObj].tenantRoles.forEach((tenantRole) => {
            if (tenantId === tenantRole.tenantId) {
              tenantRoles.push(tenantRole)
              isExits = true
            }
          })
          if (!isExits) tenantRoles.push({ tenantId, roleList: [{ tenantId, roleId: 'ROLE_USER', roleName: '普通用户角色' }] })
        })
      }
      this[userObj].tenantRoles = tenantRoles
      if (this[userObj].tenantRoles.length > 0 && !this[userObj].tenantRoles.map(obj => obj.tenantId).some(tenantId => tenantId === this.roleChoseActiveTenantId)) {
        this.roleChoseActiveTenantId = this[userObj].tenantRoles && this[userObj].tenantRoles.length > 0 ? this[userObj].tenantRoles[0].tenantId : ''
      }
      const _this = this
      setTimeout(function() {
        _this.scrollUser()
      }, 100)
    },
    async roleChose(table, tenantRole) {
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
            const role = this.roleChoseData.find(item => item.id === obj.roleId)
            if (role) {
              this.$refs.roleChoseMultipleTable.toggleRowSelection(role, true)
              role.checkFlag = true
            }
          })
        }
      })
      this.roleChoseTenant = tenantRole
      this.roleChoseDilog = true
      this.addOrEdit = table
      // this.handleOpened()
      // this.scroll()
      this.scrollUser()
    },
    orgEditDetail() {
      if (!this.validatorAll('edit')) {
        return false
      }
      orgSave(this.editOrgData).then(res => {
        this.orgEditDilog = false
        this.search()
      })
    },
    addOrg() {
      if (!this.validatorAll('orgAdd')) {
        return false
      }
      orgSave(this.addOrgData).then(() => {
        this.addOrgDilog = false
        this.search()
        this.searchTree()
      })
    },
    checkPassword(table) {
      let startStr = ''
      if (table === 'addUserData') {
        startStr = 'userAdd'
      } else if (table === 'personEdit') {
        if (!this[table].password) {
          return true
        }
        startStr = 'userEdit'
      }
      if (this[table].password === this[table].rePassword) {
        this.clearErrorMessage(startStr + 'RePassword')
        return true
      } else {
        this.setValidatorMessage(startStr + 'RePassword', this.$t('comm.msg21'))
        return false
      }
    },
    userSave(table) {
      let startValid = ''
      if (table === 'addUserData') {
        startValid = 'userAdd'
      } else if (table === 'personEdit') {
        startValid = 'userEdit'
      }
      if (!this.validatorAll(startValid) | !this.checkPassword(table)) {
        return false
      }
      const item = this[table].userOrgs
      const userAllRole = []
      this[table].divSorts.sort().reverse()
      this[table].divSort = this[table].divSorts.join(',')
      this[table].tenantIds.sort().reverse()
      this[table].tenantId = this[table].tenantIds.join(',')
      if (this.hasTenant) {
        this[table].tenantRoles.forEach(tenantRole => {
          tenantRole.roleList && tenantRole.roleList.forEach(role => {
            userAllRole.push({
              roleId: role.roleId,
              roleName: role.roleName,
              tenantId: role.tenantId
            })
          })
        })
      } else {
        this[table].tenantRoles.forEach(tenantRole => {
          tenantRole.roleList && tenantRole.roleList.forEach(role => {
            userAllRole.push({
              roleId: role.roleId,
              roleName: role.roleName,
              tenantId: ''
            })
          })
        })
      }
      const isLoginUser = this.userInfo.userId === this[table].id
      const lang = getLanguageType(this[table].language)
      if (!item || item.length === 0) {
        const roleItem = userAllRole
        if (!roleItem || roleItem.length === 0) {
          this.$message({
            type: 'error',
            message: this.$t('comm.msg7')
          })
        } else {
          this[table].userRoles = userAllRole

          userSave(this[table]).then(res => {
            if (res && res.success) {
              this.addUserDilog = false
              this.searchTree()
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
              message: this.$t('comm.msg9')
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
              this[table].userRoles = userAllRole
              userSave(this[table]).then(res => {
                if (res && res.success) {
                  this.addUserDilog = false
                  this.searchTree()
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
    orgEdit() {
      if (!this.validatorAll('orgEdit')) {
        return false
      }
      orgSave(this.departmentEdit).then(() => {
        this.search()
        this.searchTree()
      })
    },
    // 123
    handleTreeSelect(data) {
      const repeat = this[this.orgAddOrEdit].userOrgs.filter(item => item.orgId === data.id)
      if (repeat.length > 0) {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg23')
        })
        return false
      }
      this[this.orgAddOrEdit].userOrgs[this.orgChoseIndex].orgId = data.id
      this[this.orgAddOrEdit].userOrgs[this.orgChoseIndex].orgName = data.text
      this[this.orgAddOrEdit].userOrgs[this.orgChoseIndex].orgFullName = data.fullName
      this[this.orgAddOrEdit].userOrgs[this.orgChoseIndex].tenantId = data.tenantId
      // if (data.id) this.roleChoseActiveTenantId = data.id
      this.orgChoseDilog = false
    },
    rolesSelect(table) {
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
    handleSizeChange(val) {
      this.searchParam.pageSize = val
      this.searchParam.pageNo = 1
      this.search()
    },
    handleSelect(selection, row) {
      const role = selection.find(item => item.id === row.id)
      if (role) {
        row.checkFlag = true
      } else {
        row.checkFlag = false
      }
    },
    updateScroll() {
      const _this = this
      setTimeout(function() {
        _this.handleOpenedTree()
        _this.scrollTree()
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
  // .el-table__body-wrapper {
  //   overflow: auto !important;
  //   height: 300px !important;
  // }

  .user {
    .addUserDilog .search-light .el-dialog__body{
      overflow: auto !important;
    }
    // height: 100%;
    // width: 100%;
    // background-color: #fff;
    // border-radius: 6px;
    // overflow: hidden;
    // padding: 0 !important;
    .el-select{
      width: 100%;
    }
    .left {
      width: 235px;
      // margin-left: 10px !important;
      height: 100%;
      float: left;
      // overflow: auto;
      box-sizing: border-box;
      padding: 0 5px;
      padding-left: 20px !important;
      background-color: #eee;
      padding: 14px 0px 15px 20px !important;
      // border-right: 5px solid #ccc;
      // background-color: skyblue;
      .el-input__inner{
        height: 28px !important;
        line-height: 28px !important;
      }
      .tree_content {
        position: relative;
        .tree_item {
          .iconfont {
            font-size: 12px;
          }
          .icon-bumenguanli_h {
            color: rgb(180, 87, 6);
            font-size: 18px;
          }
          .icon-Avatar {
            color: rgb(64, 179, 224);
            font-size: 12px;
          }
          .icon-zuzhijiagou {
            color: cadetblue;
            font-size: 14px;
            position: relative;
            left: -12px;
          }
        }
        .is-current {
          color: #409eff;
          font-weight: 700;
        }
        .tree_down {
          position: absolute;
          top: 20px;
          left: 15px;
          z-index: 999;
          background-color: #fff;
          padding: 3px;
          // height: 300px;
          display: none;
          p {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #000;
            &:hover {
              background-color: #ccc;
            }
          }
        }
      }
    }
    .content {
      // overflow: auto;
      // height: 100%;
      // box-sizing: border-box;
      // padding: 20pX;
      .list {
        h5 {
          height: 28px;
          line-height: 28px;
          font-size: 16px;
          border-bottom: 1px dashed #ccc;
          margin-bottom: 15px;
          position: relative;
          color: rgb(50, 50, 50);
        }
      }
      .department {
        width: 100%;
        box-sizing: border-box;
        // padding-left: 10%;
        .info {
          width: 50%;
          & > div {
            display: flex;
            padding: 10px 0;
            align-items: center;
            .title {
              width: 130px;
              font-size: 14px;
              font-weight: 700;
            }
            .input {
              flex: 1;
            }
          }
        }
      }
      .personnel {
        height: 100%;
        overflow: hidden;
        // padding: 14px 0 14px 14px;
        // border-radius: 16px;
        // border: 1px solid #ccc;
        .table{
          padding-bottom: 10px;
        }
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
          // height: 30px;
          line-height: 28px;
          font-size: 12px;
          border-bottom: 1px dashed #ccc;
          // color: rgb(50, 50, 50);
          margin-bottom: 10px;
          padding: 10px 0;
          position: relative;
          // color: #000;
          .add_row {
            position: absolute;
            right: 0;
            top: 0;
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
          .select_role {
            display: flex;
            .input {
              margin-right: 15px;
            }
          }
        }
        .btn {
          width: 80%;
          box-sizing: border-box;
          padding-left: 30px;
          margin-top: 10px;
        }
        .role{
          h4 {
            padding:20px 0;
          }
        }
      }
    }
    // .orgChoseDilog {
    //   .box {
    //     height: 300px;
    //     overflow: auto;
    //     background-color: #fff;
    //   }
    // }
  }
  .input1{
    overflow:hidden;
  }
  .search-list-table{
    height: calc(100% - 237px);
  }

  .search{
    padding: 14px 14px 0 14px;
    margin: 15px 15px 15px 0px ;
      // border: 1px solid #ccc;
    border-radius: 16px;
    background: #fff;
    h5{
      margin-bottom: 5px;
    }
    .el-form-item{
      padding: 0 50px;
    }
    // .search-form .el-form-item__label {
    //   width: 70px!important;
    //   color: #000 !important;
    // }
  }
  .pagination-box{
    .page-left{
      margin-left: 20px;
    }
  }
  // .el-form-item__content {
  //   width: 100%;
  // }
.user {
  .left {
    .el-tree {
      padding-left: 15px;
      background-color: #eee;
      color: #000;
      font-size: 12px;
      .el-tree-node>.el-tree-node__children {
        overflow: visible;
      }
    }
  }
}

</style>

