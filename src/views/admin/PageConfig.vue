<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="configId">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.config.configId') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.configId" :placeholder="$t('admin.config.configId')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="value1">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.config.value1') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.value1" :placeholder="$t('admin.config.value1')" clearable />
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
              prop="configId"
              min-width="120"
              :label="$t('admin.config.configId')"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="120"
              prop="value1"
              :label="$t('admin.config.value1')"
              show-overflow-tooltip
            />
            <el-table-column
              prop="value10"
              min-width="200"
              :label="$t('admin.config.value10')"
              show-overflow-tooltip
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
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { getPageConfigList, PageConfigRemove } from '@/api/admin/pageConfig-api'
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
          configId: '',
          value1: '',
          type: 'PageConfig'
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
    async fetchData() {
      const res = await getPageConfigList(this.searchParam)
      this.isLoading = true
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.pageConfigResult
        this.tableData = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    batchDelete() {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          PageConfigRemove(this.multipleSelection).then(() => {
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
    async handleCreate() {
      this.$router.push({ path: '/admin/PageConfigEdit' })
      this.showDialog = true
    },
    handleEdit(row) {
      this.$router.push({ path: '/admin/PageConfigEdit', query: { pageData: row }})
    },
    handleDelete(index, rowData) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        PageConfigRemove([rowData]).then(() => {
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
