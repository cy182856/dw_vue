<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam.params"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <!-- <el-select v-model="searchParam.params.depart" placeholder="请选择">
                  <el-option
                    v-for="item in departs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
                <dict-select v-model="searchParam.params.deptCode" dict-type-id="Dept" placeholder="请选择" :disabled="disabled" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                费目名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.accountName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                费目类别:
              </el-col>
              <el-col :span="16">
                <!-- <el-select v-model="searchParam.params.category" placeholder="请选择">
                  <el-option
                    v-for="item in categorys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
                <dict-select v-model="searchParam.params.accountType" dict-type-id="AccountType" placeholder="请选择" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                适用期间开始:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.startYear" size="small" :placeholder="'请选择'" type="year" value-format="yyyy" :picker-options="pickerOptions0" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                适用期间结束:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.endYear" size="small" :placeholder="'请选择'" type="year" value-format="yyyy" :picker-options="pickerOptions1" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                有效标志:
              </el-col>
              <el-col :span="16">
                <!-- <el-select v-model="searchParam.params.enable" placeholder="请选择">
                  <el-option
                    v-for="item in enables"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
                <dict-select v-model="searchParam.params.deleteFlag" dict-type-id="DeleteFlag" placeholder="请选择" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t("comm.query") }}</p>
          <span
            class="circle-larger-btn btn-light-color bluebg"
          ><i
            class="iconfont iconsousuo"
          /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="handleCreate">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">新建</span>
        </li>
        <li class="operation-item" @click="handleEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">编辑</span>
        </li>
        <li class="operation-item" @click="categoryChange">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">关联品类</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="WriteoffList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column :prop="'deptCode'" :label="'部门'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="Dept" :value="scope.row.deptCode" />
              </template>
            </el-table-column>
            <el-table-column
              :prop="'accountCode'"
              label="费目编码"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/subject/edit',
                    query: { id: scope.row.id ,type:'info'},
                  }"
                >
                  {{ scope.row.accountCode }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :prop="'accountName'" :label="'费目名称'" width="150" align="left" show-overflow-tooltip />
            <el-table-column :prop="'accountType'" :label="'费目类别'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="AccountType" :value="scope.row.accountType" />
              </template>
            </el-table-column>
            <el-table-column :prop="'date'" :label="'适用期间'" min-width="120" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.startYear != null && scope.row.endYear != null">
                  {{ scope.row.startYear + "~" + scope.row.endYear }}
                </span>
                <span v-else-if="scope.row.startYear != null && scope.row.endYear == null">
                  {{ scope.row.startYear + "~" }}
                </span>
                <span v-else-if="scope.row.startYear == null && scope.row.endYear != null">
                  {{ "~" + scope.row.endYear }}
                </span>
                <span v-else />
              </template>
            </el-table-column>
            <el-table-column :prop="'category'" :label="'关联品类'" width="150" align="left" show-overflow-tooltip />
            <el-table-column :prop="'deleteFlag'" :label="'有效标记'" min-width="120" align="center">
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
          <span
            class="iconfont iconjiantou-youzhi page-last-page"
            @click="toLastPage"
          />
        </el-pagination>
        <el-pagination class="page-right page-first" layout="slot">
          <span
            class="iconfont iconjiantou-zuozhi page-first-page"
            @click="toFirstPage"
          />
        </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog
        title="关联品类"
        :visible.sync="categoryDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="categoyTree"
            default-expand-all
            :data="formatCategorys"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('categorys')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick('categorys')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getFinAccountList, finCateSave } from '@/api/mrk/subject.js'
export default {
  name: 'SubjectList',
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      categoryDialogShow: false,
      WriteoffList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          deptCode: '',
          accountName: '',
          accountType: '',
          startYear: '',
          endYear: '',
          deleteFlag: ''
        }
      },
      submitObject: {
        categorys: [],
        list: []
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (!this.searchParam.params.endYear) { return time.getTime() < new Date('2021').getTime() }
          return time.getTime() > new Date(this.searchParam.params.endYear.replace(/-/g, '/')).getTime() || time.getTime() < new Date('2021').getTime()
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          if (!this.searchParam.params.startYear) { return time.getTime() < new Date('2021').getTime() }
          return time.getTime() < new Date(this.searchParam.params.startYear.replace(/-/g, '/')).getTime() || time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    formatCategorys: function() {
      const categorys = this.$store.getters.dictList['Category']
      const children = []
      categorys.forEach(item => {
        children.push({
          id: item.dictId,
          label: item.dictName
        })
      })
      const obj = [
        {
          id: 'ALL',
          label: '全选',
          children: children
        }
      ]
      return obj
    },
    disabled() {
      let isSelect = true
      let isFlag = false
      if (this.userInfo.roleList.includes('ROLE_WF_MARKET') || this.userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY')) {
        return false
      }
      if (this.$store.getters.dictList.Dept) {
        const deptList = this.$store.getters.dictList.Dept
        const targetList = this.$store.getters.dictList.TARGETORG
        let orgId = ''
        if (deptList && targetList) {
          for (let i = 0; i < deptList.length; i++) {
            for (let s = 0; s < targetList.length; s++) {
              if (targetList[s].dictName === deptList[i].dictId) {
                orgId = targetList[s].dictId
                console.log(this.userInfo.orgSeqNo.indexOf(orgId), orgId, this.userInfo.orgSeqNo, 1090)
                if (this.userInfo.orgSeqNo.indexOf(orgId) !== -1) {
                  isFlag = true
                  break
                }
              }
            }
          }
        }
        if (!isFlag) {
          isSelect = false
        }
      }
      return isSelect
    }
  },
  created() {
    this.submitOrg2 = this.orgIdCom
    this.searchParam.params.deptCode = this.orgIdCom
    this.$store.dispatch('getDicts', 'Category')
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // 查询费目主数据一览信息
      const res = await getFinAccountList(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.WriteoffList = results
        this.WriteoffList.forEach(item => {
          item.deleteFlag = String(item.deleteFlag)
        })
      }
      this.isLoading = false
    },
    handleEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$router.push({
          path: '/subject/edit',
          query: { id: this.multipleSelection[0].id, type: 'edit' }
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleCreate() {
      this.$router.push({
        path: '/subject/edit',
        query: { type: 'add' }
      })
    },
    handleOkClick(type) {
      const categorys = []
      let index = 0
      this.$refs.categoyTree.getCheckedKeys().forEach((item) => {
        if (item !== 'ALL') {
          categorys[index] = item
          index++
        }
      })
      this.$confirm(categorys.length > 0 ? this.$t('comm.tip9') : this.$t('comm.tip18'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.submitObject.categorys = categorys
        this.submitObject.list = this.multipleSelection
        const res = await finCateSave(this.submitObject)
        if (res && res.success) {
          this.search()
        }
        this.categoryDialogShow = false
        this.$refs.categoyTree.setCheckedKeys([])
      }).catch(err => {
        this.$message({
          type: 'edit',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    handleCancelClick(type) {
      if (type === 'categorys') {
        this.categoryDialogShow = false
        this.$refs.categoyTree.setCheckedKeys([])
      }
    },
    categoryChange() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.categoryDialogShow = true
        // 设置关联部门勾选值
        if (this.multipleSelection[0].category) {
          const cateRel = this.multipleSelection[0].category.split(',')
          const checkKeys = []
          cateRel.forEach((item, index) => {
            checkKeys.push(item)
          })
          this.$nextTick(() => {
            this.$refs.categoyTree.setCheckedKeys(checkKeys)
          })
        }
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style >
.bi-table .el-table__body{
      border-bottom: 1px solid #ddd;
}
.bi-table tbody tr:last-child td{
  border-bottom: 0 !important;
}
</style>
