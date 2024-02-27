<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="resId">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.resource.resourceId') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.resId" :placeholder="$t('admin.resource.resourceId')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="type">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.resource.resType') }}
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.type" dict-type-id="ResourceType" size="small" class="input" :placeholder="$t('admin.resource.resType')" clearable />
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
          <span class="operation-text"> {{ $t('comm.batchDeletion') }}</span>
        </li>
        <li class="operation-item" @click="refreshResource">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-refresh" /></span>
          <span class="operation-text">{{ $t('comm.refreshCache') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="resourcesList"
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
            <el-table-column :label="$t('comm.operation')" min-width="120" width="120">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row, scope.$index)" />
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row, scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('admin.resource.resourceId')"
              min-width="160"
              prop="id"
            />
            <el-table-column
              prop="resName"
              :label="$t('admin.resource.resName')"
              min-width="160"
            />
            <el-table-column
              prop="parentId"
              :label="$t('admin.resource.parentId')"
              min-width="150"
            />
            <el-table-column prop="type" :label="$t('admin.resource.resType')" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="ResourceType" :value="scope.row.type" />
              </template>
            </el-table-column>
            <el-table-column
              prop="resUrl"
              :label="$t('admin.resource.resUrl')"
              min-width="150"
            />
            <el-table-column
              prop="resLevel"
              :label="$t('admin.resource.resLevel')"
              min-width="80"
            />
            <el-table-column
              prop="displayOrder"
              :label="$t('admin.resource.displayOrder')"
              min-width="80"
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
        :title="dialogType==='create'? $t('comm.newlyBuild') : $t('comm.edit')"
        :visible.sync="showDialog"
        width="80%"
        top="0"
        center
      >
        <div class="display: flex;flex-direction: column;height: 100%;">
          <div class="middle-box">
            <div class="input_box">
              <div class="flex2">
                <div class="title must">
                  {{ $t('admin.resource.resourceId') }}
                </div>
                <div class="input">
                  <el-input v-model="dialogObj.id" :placeholder="$t('admin.resource.resourceId')" class="input" @blur="validator('resId')" />
                  <span ref="resId" data-roles="required" :data-value="dialogObj.id" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">
                  {{ $t('admin.resource.resName') }}
                </div>
                <div class="input">
                  <el-input v-model="dialogObj.resName" :placeholder="$t('admin.resource.resName')" class="input" @blur="validator('resName')" />
                  <span ref="resName" data-roles="required" :data-value="dialogObj.resName" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">
                  {{ $t('admin.resource.resType') }}
                </div>
                <div class="input">
                  <dict-select v-model="dialogObj.type" :clearable="false" class="input" dict-type-id="ResourceType" @change="(value)=>{validator('resType',value)}" />
                  <span ref="resType" data-roles="required" :data-value="dialogObj.type" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.resource.parentId') }}
                </div>
                <el-input v-model="dialogObj.parentId" :placeholder="$t('admin.resource.parentId')" class="input" />
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.resource.resKey') }}
                </div>
                <el-input v-model="dialogObj.resKey" :placeholder="$t('admin.resource.resKey')" class="input" />
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.resource.resUrl') }}
                </div>
                <el-input v-model="dialogObj.resUrl" :placeholder="$t('admin.resource.resUrl')" class="input" />
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.resource.resFile') }}
                </div>
                <el-input v-model="dialogObj.resFile" :placeholder="$t('admin.resource.resFile')" class="input" />
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.resource.resLevel') }}
                </div>
                <div class="input">
                  <el-input v-model="dialogObj.resLevel" :placeholder="$t('admin.resource.resLevel')" class="input" @blur="validator('resLevel')" />
                  <span ref="resLevel" data-roles="positiveIntAnd0" :data-value="dialogObj.resLevel" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  <!-- 是否叶子节点 -->
                  {{ $t('admin.resource.isLeaf') }}
                </div>
                <dict-select v-model="dialogObj.isLeaf" class="input" dict-type-id="IsNo" />
              </div>
              <div class="flex2">
                <div class="title">
                  {{ $t('admin.resource.displayOrder') }}
                </div>
                <div class="input">
                  <el-input v-model="dialogObj.displayOrder" :placeholder="$t('admin.resource.displayOrder')" class="input" @blur="validator('resOrder')" />
                  <span ref="resOrder" data-roles="positiveIntAnd0" :data-value="dialogObj.displayOrder" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  <!-- 图标Class -->
                  {{ $t('admin.resource.iconClass') }}
                </div>
                <el-input v-model="dialogObj.icon" :placeholder="$t('admin.resource.iconClass')" class="input" />
              </div>
              <div class="flex2">
                <div class="title">
                  <!-- 描述 -->
                  {{ $t('admin.resource.desc') }}
                </div>
                <el-input v-model="dialogObj.description" :placeholder="$t('admin.resource.desc')" class="input" />
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
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { getResList, deleteRes, resSave, refreshRes } from '@/api/admin/resource-api.js'
import { formValidator } from '@/mixins/form-validator.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  mixins: [search, formValidator, niceScroll],
  data: function() {
    return {
      isLoading: false,
      activeNames: ['1'],
      multipleSelection: [],
      showDialog: false,
      dialogObj: {},
      dialogType: 'create',
      resourcesList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          resId: '',
          type: ''
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getResList(this.searchParam)
      this.isLoading = true
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.resourcesList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    batchDelete() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          deleteRes(this.multipleSelection).then(() => {
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
    refreshResource() {
      this.$confirm(this.$t('comm.tip3'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        await refreshRes()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
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
    handleDelete(rowData) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        deleteRes([rowData]).then(() => {
          this.search()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleEdit(rowData) {
      this.dialogType = 'edit'
      this.dialogObj = { ...rowData }
      this.dialogObj.isLeaf = rowData.isLeaf + ''
      this.validatorState = true
      this.showDialog = true
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    handleSave() {
      if (!this.validatorAll()) {
        return false
      }
      resSave(this.dialogObj).then(() => {
        this.showDialog = false
        this.fetchData()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
  .activity {
    width: 100%;
    padding: 20px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #fff;
    box-sizing: border-box;
    .search {
      .btns {
        // padding: 10px 0;
        text-align: right;
      }
    }
    .content {
      .pagination {
        padding: 5px 0;
        text-align: right;
      }
    }
    .res_add {
      .message {
        font-size: 12px;
        padding-left: 15px;
        color: red;
      }
    }
  }
</style>
