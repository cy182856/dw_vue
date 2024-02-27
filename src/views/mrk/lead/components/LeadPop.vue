<template>
  <div id="lead" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title=" $t('comm.leadSelect')"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
      @open="handleOpen"
      @opened="handleOpened"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="dialog-search-box middle-input">
            <el-form ref="searchForm" :model="form" label-width="80px" label-position="left">
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.lead.identiferNum')" prop="identiferNum">
                    <el-input v-model="searchParam.params.identiferNum" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.lead.leadName')" prop="leadName">
                    <el-input v-model="searchParam.params.leadName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.lead.title')" prop="title">
                    <el-input v-model="searchParam.params.title" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.lead.mobilephone')" prop="mobilephone">
                    <el-input v-model="searchParam.params.mobilephone" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.lead.companyName')" prop="companyName">
                    <el-input v-model="searchParam.params.companyName" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('mrk.lead.industry')" prop="industry">
                    <dict-select v-model="searchParam.params.industry" class="input" dict-type-id="Industry" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item style="margin-bottom:0 !important">
                <ul class="operation-box dialog-btn-box end-content-flex mcbtn">
                  <li class="operation-item" @click="search">
                    <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
                    <span class="operation-text">{{ $t('comm.query') }}</span>
                  </li>
                  <li class="operation-item" @click="reset">
                    <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                    <span class="operation-text"> {{ $t('comm.reset') }}</span>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="footer-box">
          <div class="dialog-table-box">
            <el-table
              ref="table"
              v-loading="isLoading"
              :data="leadList"
              border
              stripe
              height="200"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" fixed width="55" />
              <el-table-column prop="identiferNum" :label="$t('mrk.lead.identiferNum')" min-width="150" />
              <el-table-column prop="leadName" :label="$t('mrk.lead.leadName')" width="200" show-overflow-tooltip />
              <el-table-column prop="title" :label="$t('mrk.lead.title')" width="120" show-overflow-tooltip />
              <el-table-column prop="mobilephone" :label="$t('mrk.lead.mobilephone')" min-width="130" show-overflow-tooltip />
              <el-table-column prop="companyName" :label="$t('mrk.lead.companyName')" width="200" show-overflow-tooltip />
              <el-table-column prop="industry" :label="$t('mrk.lead.industry')" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <dict-write dict-type-id="Industry" :value="scope.row.industry" />
                </template>
              </el-table-column>
            </el-table>
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
              class="page-right"
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
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { getPopList } from '@/api/mrk/lead.js'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'LeadPop',
  mixins: [names, search, formValidator, niceScroll, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      selectUserDialog: false,
      leadList: [],
      multipleSelection: [],
      exportSelectDilog: false,
      form: { // 弹窗检索参数
        identiferNum: '',
        leadName: '',
        title: '',
        mobilephone: '',
        companyName: '',
        industry: ''
      },
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          leadName: '',
          title: '',
          mobilephone: '',
          companyName: '',
          industry: '',
          assignedUser: ''
        }
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      const res = await getPopList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.leadList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.lead {
  .editDilog {
    h5 {
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      .add_row {
        position: absolute;
        right: 25px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
        color: #fff;
        &:hover {
          background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
        }
      }
    }
  }
}
.pagination {
  position: relative;
  .select_header {
    position: absolute;
    top: 26px;
    left: 0;
  }
  .el-icon-menu {
    color: skyblue;
    font-size: 18px;
    cursor: pointer;
  }
  .check_box_item {
    padding-top: 15px;
    border-top: 1px solid #666;
  }
}
</style>
<style lang="scss">
</style>
