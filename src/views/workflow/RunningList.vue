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
          <el-form-item prop="procStartUserName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('workflow.startUserName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.procStartUserName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <div class="el-form-item">
            <div class="el-form-item__content">
              <el-row type="flex" :gutter="5" justify="space-between">
                <el-col :span="8">
                  {{ $t('workflow.processStartTime') }}:
                </el-col>
                <el-col :span="16">
                  <el-date-picker v-model="searchParam.params.procStartTimeFrom" :placeholder="$t('comm.from')" type="date" value-format="yyyy-MM-dd" />
                  <span style="margin: 0 5px">{{ $t('dashboard.to') }}</span>
                  <el-date-picker v-model="searchParam.params.procStartTimeTo" :placeholder="$t('comm.to')" type="date" value-format="yyyy-MM-dd" />
                </el-col>
              </el-row>
            </div>
          </div>
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
          <el-table ref="table" v-loading="isLoading" :data="runningList" border stripe style="width: 100%;" height="100%">
            <el-table-column :label="$t('workflow.processId')">
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleProcessInstClick(scope.row.id)">{{ scope.row.id }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="processDefinitionName" :label="$t('workflow.processDefinitionName')" />
            <el-table-column :label="$t('workflow.processName')">
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleDetailClick(scope.row)">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="currentTaskName" :label="$t('workflow.nowNode')" />
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
      <process-detail :key="processInstId" :title="$t('workflow.detailedProcess') + processInstId" :is-show="dialogTableVisible" :process-inst-id="processInstId" :can-withdraw="true" @close="dialogTableVisible=false" />
    </div>
  </div>
</template>

<script>
import { search } from '@/mixins/search-params'
import { getRunnings } from '@/api/base'
import { getDictName } from '@/utils/util'
import { niceScroll } from '@/mixins/nice-scroll.js'

export default {
  name: 'RunningList',
  mixins: [search, niceScroll],
  data: function() {
    return {
      isLoading: true,
      activeNames: ['1'],
      runningList: [],
      processInstId: '',
      dialogTableVisible: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          procInstId: '',
          procDefName: '',
          procInstName: '',
          procStartUserName: '',
          procStartTimeFrom: '',
          procStartTimeTo: ''
        }
      }
    }
  },
  created: function() {
    this.$store.dispatch('getDicts', 'WorkflowDetailPage')
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getRunnings(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.runningList = results
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleDetailClick(row) {
      const path = getDictName('WorkflowDetailPage', row.processDefinitionKey)
      this.$router.push({ path: path, query: { id: row.businessKey }})
    },
    handleProcessInstClick(processInstId) {
      this.processInstId = processInstId
      this.dialogTableVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
