<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}
      </div>
      <el-scrollbar>
        <el-form
          class="search-form default-input"
          label-position="left"
          :model="searchParam.params"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("terminal.terminalCode") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.terminalCode" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("terminal.terminalName") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.terminalName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("terminal.terminalNameAlias") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.terminalNameAlias" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("terminal.custCode") }}
              </el-col>
              <el-col :span="16">
                <rel-func-select v-model="searchParam.params.custCode" :rel-func="'account'" :default-tags="defaultTags" :multiple="true" :is-separate-str="true" :cleardata="true" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("terminal.keyFlag") }}
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.keyFlag" dict-type-id="KeyFlag" placeholder="请选择" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("terminal.deleteFlag") }}
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.deleteFlag" dict-type-id="DeleteFlag" placeholder="请选择" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                关联部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.deptCode" dict-type-id="Dept" placeholder="请选择" />
                <!--  -->
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
        <li class="operation-item" @click="terminalEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{ $t("comm.edit") }}</span>
        </li>
        <li class="operation-item" @click="deparsChange">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{ $t("customer.dept") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="terminalList"
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
            <el-table-column :prop="'custName'" :label="$t('terminal.custName')" min-width="120" align="left" />
            <el-table-column :prop="'custCodeName2'" :label="$t('terminal.custName2')" min-width="120" align="left" />
            <el-table-column
              :prop="'terminalCode'"
              :label="$t('terminal.terminalCode')"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/terminal/edit',
                    query: { id: scope.row.id ,type:'info'},
                  }"
                >
                  {{ scope.row.terminalCode }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :prop="'terminalName'" :label="$t('terminal.terminalName')" min-width="120" align="left" />
            <el-table-column :prop="'terminalNameAlias'" :label="$t('terminal.terminalNameAlias')" min-width="120" align="left" />
            <el-table-column :prop="'keyFlag'" :label="$t('terminal.keyFlag')" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="KeyFlag" :value="scope.row.keyFlag" />
              </template>
            </el-table-column>
            <el-table-column :prop="'channel'" :label="$t('terminal.channel')" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="ChannelType" :value="scope.row.channel" />
              </template>
            </el-table-column>
            <el-table-column :prop="'deptName'" :label="$t('customer.dept')" min-width="120" align="center" />
            <el-table-column :prop="'deleteFlag'" :label="$t('terminal.deleteFlag')" min-width="120" align="center">
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
        title="关联部门"
        :visible.sync="deparsDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="deparTree"
            default-expand-all
            :data="formatDepts"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('depars')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick('depars')">
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
import DictSelect from '@/components/DictSelect'
import DictWrite from '@/components/DictWrite'
import { getList, terminalDeptSave } from '@/api/mrk/terminal.js'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'TerminalList',
  components: { RelFuncSelect, DictSelect, DictWrite },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      defaultTags: [],
      multipleSelection: [],
      terminalList: [],
      deparsDialogShow: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          terminalCode: '',
          terminalName: '',
          terminalNameAlias: '',
          custCode: '',
          custCodeArr: [],
          keyFlag: '',
          deptCode: '',
          deleteFlag: ''
        }
      },
      submitObject: {
        depts: [],
        list: []
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo
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
                // console.log(this.userInfo.orgSeqNo.indexOf(orgId), orgId, this.userInfo.orgSeqNo, 1090)
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
    },
    isGetDataList() {
      return this.$store.getters.dictList.Dept && this.$store.getters.dictList.Dept.length > 0 ? this.disabled ? 'yes' : 'no' : 'false'
    },
    formatDepts: function() {
      let isFlag = false
      const depars = this.$store.getters.dictList['Dept']
      for (let i = 0; i < depars.length; i++) {
        if (this.userDept() === depars[i].dictId) {
          isFlag = true
          break
        }
      }
      if (isFlag) {
        const children = []
        for (let i = 0; i < depars.length; i++) {
          if (this.userDept() === depars[i].dictId) {
            children.push({
              id: depars[i].dictId,
              label: depars[i].dictName
            })
          }
        }
        const obj = [
          {
            id: 'ALL',
            label: '全选',
            children: children
          }
        ]
        return obj
      } else {
        const children = []
        depars.forEach(item => {
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
      }
    }
  },
  created() {
    this.$store.dispatch('getDicts', 'Dept')
    this.searchParam.params.deptCode = this.orgIdCom
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      if (this.searchParam.params.custCode !== '') {
        this.searchParam.params.custCodeArr = this.searchParam.params.custCode.split(',')
      }
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.terminalList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    userDept() {
      const deptList = this.$store.getters.dictList.Dept
      const targetList = this.$store.getters.dictList.TARGETORG
      let orgId = ''
      if (deptList && targetList) {
        for (let i = 0; i < deptList.length; i++) {
          for (let s = 0; s < targetList.length; s++) {
            if (targetList[s].dictName === deptList[i].dictId) {
              if (this.userInfo.orgSeqNo.indexOf(targetList[s].dictId) !== -1) {
                orgId = targetList[s].dictName
              }
            }
          }
        }
      }
      console.log(orgId, 'orgId')
      return orgId
    },
    terminalEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({
            path: '/terminal/edit',
            query: { id: rowData.id, type: 'edit' }
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
    handleOkClick(type) {
      const depts = []
      let index = 0
      this.$refs.deparTree.getCheckedKeys().forEach((item) => {
        if (item !== 'ALL') {
          depts[index] = item
          index++
        }
      })
      this.$confirm(depts.length > 0 ? this.$t('comm.tip9') : this.$t('comm.tip18'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.submitObject.depts = depts
        this.submitObject.list = this.multipleSelection
        const res = await terminalDeptSave(this.submitObject)
        if (res && res.success) {
          this.search()
        }
        this.deparsDialogShow = false
        this.$refs.deparTree.setCheckedKeys([])
      }).catch(err => {
        this.$message({
          type: 'edit',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    handleCancelClick(type) {
      if (type === 'depars') {
        this.deparsDialogShow = false
        this.$refs.deparTree.setCheckedKeys([])
      }
    },
    deparsChange() {
      if (this.multipleSelection && this.multipleSelection.length >= 1) {
        this.deparsDialogShow = true
        // 设置关联部门勾选值
        if (this.multipleSelection[0].deptCode) {
          const deptRel = this.multipleSelection[0].deptCode.split(',')
          const checkKeys = []
          deptRel.forEach((item, index) => {
            checkKeys.push(item)
          })
          this.$nextTick(() => {
            // this.$refs.deparTree.setCheckedKeys(checkKeys)
          })
        }
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
<style >
.bi-table .el-table__body{
      border-bottom: 1px solid #ddd;
}
.bi-table tbody tr:last-child td{
  border-bottom: 0 !important;
}
</style>
