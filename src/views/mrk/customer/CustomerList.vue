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
                {{ $t("customer.custCode") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custCode" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customer.custFullName") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custFullName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customer.area1") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customer.area2") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area2" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customer.salesUser") }}
              </el-col>
              <el-col :span="16">
                <user-select
                  v-model="searchParam.params.salesUserId"
                  :multiple="true"
                  :root-org-id="orgRootId"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customer.deleteFlag") }}
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
        <li class="operation-item" @click="customerEdit">
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
        <li class="operation-item" @click="handleDownload">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">{{ $t("comm.export") }}</span>
        </li>
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{ $t("comm.upload") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="customerList"
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
            <el-table-column
              :prop="'code'"
              :label="$t('customer.custCode')"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/customer/edit',
                    query: { id: scope.row.id ,type:'info'},
                  }"
                >
                  {{ scope.row.custCode }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :prop="'custFullName'" :label="$t('customer.custFullName')" min-width="220" align="left" />
            <el-table-column :prop="'custName'" :label="$t('customer.custName')" min-width="120" align="left" />
            <el-table-column :prop="'sortNo'" :label="$t('代理商排序')" min-width="120" align="center" />
            <el-table-column :prop="'area1'" :label="$t('customer.area1')" min-width="120" align="center" />
            <el-table-column :prop="'area2'" :label="$t('customer.area2')" min-width="120" align="center" />
            <el-table-column :prop="'salesUserId'" :label="$t('customer.salesUser')" min-width="120" align="center">
              <template slot-scope="scope">
                {{ scope.row.salesUserId|userName }}
              </template>
            </el-table-column>
            <el-table-column :prop="'virtualFlag'" :label="$t('customer.virtualFlag')" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="IsNo" :value="scope.row.virtualFlag" />
              </template>
            </el-table-column>
            <el-table-column :prop="'directFlag'" :label="$t('customer.directFlag')" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="IsNo" :value="scope.row.directFlag" />
              </template>
            </el-table-column>
            <el-table-column :pop="'ecFlag'" :label="$t('customer.ecFlag')" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="EcFlag" :value="scope.row.ecFlag" />
              </template>
            </el-table-column>
            <el-table-column :prop="'deptName'" :label="$t('customer.dept')" min-width="120" align="center" />
            <el-table-column :prop="'deleteFlag'" :label="$t('customer.deleteFlag')" min-width="120" align="center">
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
    <upload :is-show="uploadDialog" :action="'/api/customer/upload'" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import UserSelect from '@/components/UserSelect.vue'
import { getList, customerDeptSave, downloadFile } from '@/api/mrk/customer.js'
import Upload from '@/components/UploadNew'
export default {
  name: 'CustomerList',
  components: { UserSelect, Upload },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      deparsDialogShow: false,
      customerList: [],
      uploadDialog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          custCode: '',
          custFullName: '',
          area1: '',
          area2: '',
          salesUserId: '',
          salesUserIdArr: [],
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
      return this.userInfo.orgSeqNo.split('.')[1]
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
    this.fetchData()
    console.log(this.customerList)
  },
  methods: {
    handleUploadSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
      // console.log('操作成功！！！！！！！！')
    },
    async fetchData() {
      this.isLoading = true
      if (this.searchParam.params.salesUserId !== '') {
        this.searchParam.params.salesUserIdArr = this.searchParam.params.salesUserId.split(',')
      }
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.customerList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    customerEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({
            path: '/customer/edit',
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
        const res = await customerDeptSave(this.submitObject)
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
    },
    handleDownload() {
      downloadFile(this.searchParam)
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
