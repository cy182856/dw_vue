<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="identiferNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.identiferNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="productName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.productName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.productName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="category1">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.category1') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="category2">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.category2') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category2" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="category3">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.category3') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category3" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="category4">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.category4') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category4" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="salesStartDate">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.salesStartDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.salesStartDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="salesEndDate">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.salesEndDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.salesEndDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="productFlag">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mdm.product.productFlag') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.productFlag" dict-type-id="ProductUseFlag" size="small" class="input" clearable />
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
        <li class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <li class="operation-item" @click="batchDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">{{ $t('comm.delete') }}</span>
        </li>
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
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
            :data="productList"
            stripe
            border
            height="100%"
            :header-cell-style="{'text-align':'left'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="identiferNum" :label="$t('mdm.product.identiferNum')" min-width="150">
              <template slot-scope="scope">
                <router-link :to="{path:'/mdm/product/detail',query:{id:scope.row.id}}">
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="productName" :label="$t('mdm.product.productName')" width="200" show-overflow-tooltip />
            <el-table-column prop="category1" :label="$t('mdm.product.category1')" width="120" show-overflow-tooltip />
            <el-table-column prop="category2" :label="$t('mdm.product.category2')" width="120" show-overflow-tooltip />
            <el-table-column prop="category3" :label="$t('mdm.product.category3')" width="120" show-overflow-tooltip />
            <el-table-column prop="category4" :label="$t('mdm.product.category4')" width="120" show-overflow-tooltip />
            <el-table-column prop="category5" :label="$t('mdm.product.category5')" width="120" show-overflow-tooltip />
            <el-table-column prop="cost" :label="$t('mdm.product.costOrder')" width="120" align="right" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.cost | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="unitPrice" :label="$t('mdm.product.unitPrice')" width="120" align="right" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.unitPrice | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="salesStartDate" :label="$t('mdm.product.salesStartDate')" min-width="120" />
            <el-table-column prop="salesEndDate" :label="$t('mdm.product.salesEndDate')" min-width="120" />
            <el-table-column :label="$t('mdm.product.productFlag')" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="ProductUseFlag" :value="scope.row.productFlag" />
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
        <export-fields-select func-div="product" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
    <div class="historyDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his :key="identiferNum" func-div="product" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { getList, deleteProduct } from '@/api/mdm/product.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'ProductList',
  mixins: [search, names, permission, numFormat, niceScroll],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      selectUserDialog: false,
      productList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          productName: '',
          category1: '',
          category2: '',
          category3: '',
          category4: '',
          salesStartDate: '',
          salesEndDate: '',
          productFlag: '',
          assignedOrg: '',
          tenantId: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.searchParam.params.tenantId = this.userInfo.tenantId
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.productList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/mdm/product/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/mdm/product/edit', query: { id: rowData.id, copy: true }})
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$router.push({ path: '/mdm/product/edit', query: { id: this.multipleSelection[0].id }})
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleDelete(rowData) {
      if (rowData.workflowFlag === '1') {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg34')
        })
        return
      }
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        rowData.submitType = 'submit'
        deleteProduct([rowData]).then(() => {
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
        let workflowFlag = false
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1' && !workflowFlag) {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg34')
            })
            workflowFlag = true
          }
          rowData.submitType = 'submit'
        })
        if (workflowFlag) return false
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          deleteProduct(this.multipleSelection).then(() => {
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleUpdateHisClick() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.identiferNum = this.multipleSelection[0].identiferNum
        this.historyDialog = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    }

  }
}
</script>
