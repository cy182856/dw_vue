<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="dictTypeId">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.dict.dictTypeId') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.dictTypeId" :placeholder="$t('admin.dict.dictTypeId')" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="dictTypeName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('admin.dict.dictTypeName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.dictTypeName" :placeholder="$t('admin.dict.dictTypeName')" clearable />
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
        <!-- <li class="operation-item" @click="refreshDict">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-refresh" /></span>
          <span class="operation-text"> {{ $t('comm.refreshCache') }}</span>
        </li> -->
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="dictList"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
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
              width="120"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row, scope.$index)" />
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row, scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('admin.dict.dictTypeId')"
              min-width="150"
              prop="dictTypeId"
            />
            <el-table-column
              prop="dictTypeName"
              :label="$t('admin.dict.dictTypeName')"
              min-width="140"
            />
            <el-table-column
              prop="value"
              :label="'值'"
              min-width="80"
            >
              <template slot-scope="scope">
                <dict-write :dict-type-id="scope.row.relDictTypeId" :value="scope.row.value" />
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
    <div class="editDilog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="true"
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
                  <!-- 类型ID -->
                  {{ $t('admin.dict.dictTypeId') }}
                </div>
                <div class="input">
                  <el-input v-model="dialogObj.dictTypeId" :placeholder="$t('admin.dict.dictTypeId')" class="input" :disabled="dialogType!=='create'" @blur="validator('typeId')" />
                  <span ref="typeId" data-roles="required" :data-value="dialogObj.dictTypeId" class="message" />
                </div>
              </div>
              <div class="flex3">
                <div class="title must">
                  <!-- 类型名称 -->
                  {{ $t('admin.dict.dictTypeName') }}
                </div>
                <div class="input">
                  <el-input v-model="dialogObj.dictTypeName" :placeholder="$t('admin.dict.dictTypeName')" class="input" @blur="validator('typeName')" />
                  <span ref="typeName" data-roles="required" :data-value="dialogObj.dictTypeName" class="message" />
                </div>
              </div>
              <div v-if="dialogType==='create'" class="flex3">
                <div class="title  must">
                  关联字典类型
                </div>
                <el-input v-model="dialogObj.relDictTypeId" class="input" />
              </div>
              <div v-if="!!dialogObj.relDictTypeId" class="flex3">
                <div class="title  must">
                  值
                </div>
                <dict-select v-model="dialogObj.value" :dict-type-id="dialogObj.relDictTypeId" class="input" :clearable="false" />
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
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { getDictInfo, deleteDictById, editDict, getEntryList } from '@/api/admin/dict-api.js'
import { mapActions } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
export default {
  mixins: [search, formValidator],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      dialogType: 'create',
      showDialog: false,
      dictList: [],
      validatorState: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          dictTypeId: '',
          dictTypeName: ''
        }
      },
      dialogObj: {},
      multipleSelection: [],
      detailTable: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleOpen() {
      // const _this = this
      // setTimeout(function() {
      //   _this.handleOpened()
      // }, 100)
    },
    async fetchData() {
      this.searchParam.params.dictTypeId = 'CurrentBudgetType'
      const res = await getDictInfo(this.searchParam)

      this.isLoading = true
      if (res && res.success) {
        // const { results, pageNo, totalRecord } = res.datas.searchResult
        // this.dictList = results
        // this.searchParam.pageNo = pageNo
        // this.searchParam.totalRecord = totalRecord

        getEntryList({ dictTypeId: 'CurrentBudgetType' }).then(res => {
          this.dictList = []
          this.dictList.push({
            relDictTypeId: 'BudgetType',
            value: res.datas.entryList[0].dictName,
            dictTypeId: 'CurrentBudgetType',
            dictTypeName: '当前销售类型'
          })
        })
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleCreate() {
      this.dialogObj = {}
      this.detailTable = []
      this.dialogType = 'create'
      this.showDialog = true
      this.validatorState = false
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
    },
    handleEdit(rowData) {
      getEntryList({ dictTypeId: rowData.dictTypeId }).then(res => {
        this.detailTable = res.datas.entryList
        this.dialogObj = { ...rowData }
        this.dialogType = 'edit'
        this.showDialog = true
        this.validatorState = true
        this.$nextTick(function() {
          this.clearErrorMessage()
        })
      })
      // this.scroll()
    },
    handleDelete(rowData) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        deleteDictById([rowData]).then(() => {
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
      // if (this.multipleSelection.length > 0) {
      //   this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
      //     confirmButtonText: this.$t('comm.certain'),
      //     cancelButtonText: this.$t('comm.cancel'),
      //     type: 'warning'
      //   }).then(() => {
      //     deleteDictById(this.multipleSelection).then(() => {
      //       this.search()
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: this.$t('comm.msg1')
      //     })
      //   })
      // } else {
      //   this.$message({
      //     type: 'info',
      //     message: this.$t('comm.msg3')
      //   })
      // }
    },
    handleSave() {
      if (!this.validatorAll()) {
        return false
      }
      this.dialogObj.dicts = this.detailTable
      this.dialogObj.dicts[0].dictName = this.dialogObj.value
      editDict(this.dialogObj).then(() => {
        this.showDialog = false
        this.fetchData()
      })
    },
    handleAddTableRows() {
      const newRow = {
        dictId: '',
        dictName: '',
        status: '',
        sortNo: '',
        parentId: '',
        filter1: '',
        filter2: ''
      }
      this.detailTable = [...this.detailTable, newRow]
      this.handleOpened()
      this.scroll()
    },
    handleDeleteRow(row, index) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.detailTable.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    refreshDict() {
      this.$confirm(this.$t('comm.tip3'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.refreshDictAndClearStore()
        this.fetchData()
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
    ...mapActions([
      'refreshDictAndClearStore'
    ])
  }
}
</script>
<style lang="scss" scoped>

</style>
