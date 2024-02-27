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
                {{ $t('mrk.contact.identiferNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="contactName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mrk.contact.contactName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.contactName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="title">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mrk.contact.title') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.title" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="department">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mrk.contact.department') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.department" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="telephone">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mrk.contact.telephone') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.telephone" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="mobilephone">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mrk.contact.mobilephone') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.mobilephone" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="companyName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mrk.contact.companyName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.companyName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="assignedUser">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mrk.contact.assignedUser') }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.assignedUser" :root-org-id="userInfo.orgSeqNo.split('.')[1]" />
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
        <li class="operation-item" @click="handleMergeClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.merge') }}</span>
        </li>
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.export') }}</span>
        </li>
        <li class="operation-item" @click="handleUpdateHisClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="contactList"
            stripe
            border
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="identiferNum" :label="$t('mrk.contact.identiferNum')" min-width="150">
              <template slot-scope="scope">
                <router-link :to="{path:'/mrk/contact/detail',query:{id:scope.row.id}}">
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="contactName" :label="$t('mrk.contact.contactName')" width="200" show-overflow-tooltip />
            <el-table-column prop="title" :label="$t('mrk.contact.title')" width="120" show-overflow-tooltip />
            <el-table-column prop="department" :label="$t('mrk.contact.department')" width="120" show-overflow-tooltip />
            <el-table-column prop="telephone" :label="$t('mrk.contact.telephone')" width="130" show-overflow-tooltip />
            <el-table-column prop="mobilephone" :label="$t('mrk.contact.mobilephone')" width="130" show-overflow-tooltip />
            <el-table-column :label="$t('mrk.contact.companyName')" width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.accountNum | funcName('account') }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('mrk.contact.assignedUser')" min-width="130">
              <template slot-scope="scope">
                {{ scope.row.assignedUser | userName }}
              </template>
            </el-table-column>
            <el-table-column prop="address" :label="$t('mrk.contact.address')" min-width="220" show-overflow-tooltip />
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
        <export-fields-select func-div="contact" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
    <div>
      <merge-dialog :is-show="mergeDialog" func-div="contact" :search-param="mergeMap" :un-select-item="['country', 'province', 'city', 'zip', 'address']" @saved="handleMergeSaved" @close="mergeDialog=false" />
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
        <update-his :key="identiferNum" func-div="contact" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { getList, deleteContact } from '@/api/mrk/contact.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'ContactList',
  components: { UserSelect },
  mixins: [search, names, permission, niceScroll],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      selectUserDialog: false,
      contactList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      mergeDialog: false,
      mergeMap: new Map(),
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          contactName: '',
          title: '',
          department: '',
          telephone: '',
          mobilephone: '',
          companyName: '',
          contactType: '',
          assignedUser: '',
          assignedOrg: ''
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
    if (this.$route.query.relFuncNum) {
      this.searchParam.params.relFuncNum = this.$route.query.relFuncNum
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.contactList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/mrk/contact/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/mrk/contact/edit', query: { id: rowData.id, copy: true }})
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
        this.$router.push({ path: '/mrk/contact/edit', query: { id: this.multipleSelection[0].id }})
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
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
          deleteContact(this.multipleSelection).then(() => {
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
    handleMergeClick() {
      if (this.multipleSelection && this.multipleSelection.length === 2) {
        this.$set(this.mergeMap, 'left', this.multipleSelection[0].id)
        this.$set(this.mergeMap, 'right', this.multipleSelection[1].id)
        this.mergeDialog = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg35')
        })
      }
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
    },
    handleMergeSaved() {
      this.mergeDialog = false
      this.fetchData()
    }

  }
}
</script>
