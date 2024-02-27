<template>
  <div id="localchain" v-show="isShow" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="true"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      title="支付生成履历"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
      @open="handleOpen"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="app-pop-wrapper">
          <div class="app-pop-cons app-pop-table">
            <div class="middle-box">
              <div class="dialog-search-box middle-input">
                <el-form ref="searchForm" :model="form" label-width="120px" label-position="left">
                  <el-row type="flex" justify="space-between">
                <el-col :span="10">
                  <el-form-item :label="$t('admin.scheduler.startTime')" prop="startTimeFrom">
                    <el-date-picker v-model="searchParam.params.startTimeFrom" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :label="$t('admin.scheduler.endTime')" prop="startTimeTo">
                    <el-date-picker v-model="searchParam.params.startTimeTo" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
                  </el-form-item>
                </el-col>
                <el-col :span="2" />
              </el-row>
                  <el-form-item style="margin-bottom:0 !important">
                    <ul class="operation-box dialog-btn-box end-content-flex mcbtn">
                      <li class="operation-item" @click="search">
                        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                        <span class="operation-text">{{ $t('comm.query') }}</span>
                      </li>
                      <li class="operation-item" @click="reset">
                        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
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
                  :data="dataList"
                  border
                  stripe
                  height="300"
                >
                 <el-table-column :label="$t('admin.scheduler.startTime')" width="140">
                <template slot-scope="scope">
                  {{ scope.row.startTime }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('admin.scheduler.endTime')" width="140">
                <template slot-scope="scope">
                  {{ scope.row.endTime }}
                </template>
              </el-table-column>
              <el-table-column prop="result" :label="$t('admin.scheduler.result')" min-width="80">
                <template slot-scope="scope">
                  {{ scope.row.result | dictName('JobExecResult') }}
                </template>
              </el-table-column>
              <el-table-column prop="errMsg" :label="$t('admin.scheduler.errMsg')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="createBy" :label="$t('admin.scheduler.createBy')" min-width="90" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.createBy | userName }}
                </template>
              </el-table-column>
            </el-table>
              </div>
              <div class="pagination-box">
                <el-pagination
                  class="page-left"
                  :current-page.sync="searchParam.pageNo"
                  :page-sizes="[10, 20, 30, 50,100,200]"
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
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
import { getJobExecLogs } from '@/api/admin/scheduler-api.js'

export default {
  name: 'InvJob',
  mixins: [names, search, formValidator, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    
  },
  data() {
    return {
      isLoading: false,
      dataList: [],
      form: { // 弹窗检索参数
        startTimeFrom: '',
        startTimeTo: ''
      },
      multipleSelection: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          className: 'com.iv.crm.etl.inv.EstInvAccountTask',
          jobName: 'estInvAccountTask',
          jobGroup: 'ETL-开票台账生成',
          startTimeFrom: '',
          startTimeTo: ''
        }
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      const res = await getJobExecLogs(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.dataList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
        
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    reset() {
      this.searchParam.params.className='com.iv.crm.etl.inv.EstInvAccountTask',
      this.searchParam.params.jobName='estInvAccountTask',
      this.searchParam.params.jobGroup='ETL-开票台账生成',
      this.searchParam.params.startTimeFrom= '',
      this.searchParam.params.startTimeTo=''
    }
  }
}
</script>
<style lang="scss" scoped>
.supplier {
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
