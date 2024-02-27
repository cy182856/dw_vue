<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="attachmentName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.attachment.attachmentName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.attachmentName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="businessNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.attachment.businessNum') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.businessNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="funcDiv">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.attachment.funcDiv') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.funcDiv" dict-type-id="AttachmentRelFuncDiv" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="createBy">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.attachment.createBy') }}:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.createBy" :root-org-id="userInfo.orgSeqNo.split('.')[1]" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('mgt.attachment.updateDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.attachmentDateFrom" size="small" :placeholder="$t('comm.from')" type="date" value-format="yyyy-MM-dd" />
                <span style="margin: 0 5px">{{ $t('dashboard.to') }}</span>
                <el-date-picker v-model="searchParam.params.attachmentDateTo" size="small" :placeholder="$t('comm.to')" type="date" value-format="yyyy-MM-dd" />
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
        <li class="operation-item" @click="downloadAttachment">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.download') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="attachmentList"
            border
            stripe
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="identiferNum" :label="$t('mgt.attachment.identiferNum')" min-width="100" show-overflow-tooltip />
            <el-table-column prop="attachmentName" :label="$t('mgt.attachment.attachmentName')" min-width="170" />
            <el-table-column :label="$t('mgt.attachment.funcDiv')" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.funcDiv | dictName('AttachmentRelFuncDiv') }}
              </template>
            </el-table-column>
            <el-table-column prop="businessNum" :label="$t('mgt.attachment.businessNum')" min-width="100" />
            <el-table-column :label="$t('mgt.attachment.createBy')" min-width="90">
              <template slot-scope="scope">
                {{ scope.row.createBy | userName }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('mgt.attachment.createTime')" min-width="130" />
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
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { getList } from '@/api/mgt/attachment.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
import { download } from '@/utils/request'

export default {
  name: 'AttachmentList',
  components: { UserSelect },
  mixins: [search, names, permission, niceScroll],
  data() {
    return {
      isLoading: true,
      multipleSelection: [],
      attachmentList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          businessNum: '',
          attachmentName: '',
          funcDiv: '',
          createBy: '',
          attachmentDateFrom: '',
          attachmentDateTo: ''
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
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.attachmentList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    downloadAttachment() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        download('POST', `/api/${this.multipleSelection[0].funcDiv}/download/${this.multipleSelection[0].id}`)
      } else {
        this.$message({
          type: 'info',
          message: '请选择一条记录'
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }

  }
}
</script>
