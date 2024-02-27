<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="procInstId">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('workflow.processId') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.procInstId" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="procDefName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('workflow.processDefinitionName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.procDefName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="procInstName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('workflow.processName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.procInstName" clearable />
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
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table ref="table" v-loading="isLoading" :data="taskList" border stripe height="100%" @selection-change="handleSelectionChange">
            <el-table-column :label="$t('comm.operation')" width="80">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="handleBtnExec(scope.row)">
                  <!-- 处理 -->
                  {{ $t('workflow.handle') }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('workflow.nodeName')" />
            <el-table-column :label="$t('workflow.processId')">
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleProcessInstClick(scope.row.processInstId)">{{ scope.row.processInstId }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="processDefinitionName" :label="$t('workflow.processDefinitionName')" />
            <el-table-column prop="processName" :label="$t('workflow.processName')" />
            <el-table-column prop="startUserNickName" :label="$t('workflow.startUserNickName')" />
            <el-table-column prop="startTime" :label="$t('workflow.startTime')" align="center" />
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
    <div v-if="dialogTableVisible">
      <process-detail :key="processInstId" :title="$t('workflow.detailedProcess') + processInstId" :is-show="dialogTableVisible" :process-inst-id="processInstId" @close="dialogTableVisible=false" />
    </div>
  </div>
</template>

<script>
import { search } from '@/mixins/search-params'
import { getTasks, agreeTasks } from '@/api/base'
import { niceScroll } from '@/mixins/nice-scroll.js'

export default {
  name: 'TaskList',
  mixins: [search, niceScroll],
  data: function() {
    return {
      isLoading: false,
      activeNames: ['1'],
      taskList: [],
      processInstId: '',
      dialogTableVisible: false,
      multipleSelection: [],
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          procInstId: '',
          procDefName: '',
          procInstName: ''
        }
      }
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      const res = await getTasks(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.taskList = results
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleBtnExec(row) {
      this.$router.push({
        path: row.formKey,
        query: {
          taskId: row.id,
          processInstId: row.processInstId,
          businessKey: row.businessKey
        }
      })
    },
    batchAgree() {
      if (!this.multipleSelection || !this.multipleSelection.length) {
        return
      }
      this.$confirm(this.$t('comm.tip13'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const tasks = this.multipleSelection.map(item => item.id)
        console.log(tasks)
        const res = await agreeTasks(tasks)
        console.log(res)
        if (res && res.success) {
          this.fetchData()
        }
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
    handleProcessInstClick: function(processInstId) {
      this.processInstId = processInstId
      this.dialogTableVisible = true
    },
    // 出现纵向滚动条时，防止表头行错位
    tableDolayout(refTable) {
      setTimeout(() => {
        if (refTable) refTable.doLayout()
      },
      1000)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
