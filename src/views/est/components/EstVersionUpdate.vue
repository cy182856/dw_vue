<template>
  <div id="supplier" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title="'Est版本更新'"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
      @open="handleOpen"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="dialog-search-box middle-input">
            <el-form ref="searchForm" label-width="80px" label-position="left">
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="'客户'">
                    <rel-func-select v-model="searchParam.params.accountNum" func-div="account" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="'编号'">
                    <rel-func-select v-model="searchParam.params.motionIdentiferNum" func-div="motion" />
                  </el-form-item>
                </el-col>
                <el-col :span="7" />
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
              :data="list"
              border
              stripe
              height="200"
              :header-cell-style="{'text-align':'center'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                :label="'追加操作'"
                min-width="70"
              >
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-plus" :disabled="scope.row.monthlyStatus==='已反映'" @click="handleAddDetail(scope.$index)" />
                </template>
              </el-table-column>
              <el-table-column
                :label="'删除操作'"
                min-width="70"
              >
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" icon="el-icon-delete" :disabled="scope.row.monthlyStatus==='未反映'" @click="handleDeleteDetail(scope.$index)" />
                </template>
              </el-table-column>
              <el-table-column
                :label="'更新操作'"
                min-width="70"
              >
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-refresh" @click="handleUpdateDetail(scope.$index)" />
                </template>
              </el-table-column>
              <el-table-column prop="monthlyStatus" :label="'月次反映状态'" min-width="100" align="center" />
              <el-table-column prop="expenseType" :label="'费用类型'" min-width="160" align="center" show-overflow-tooltip />
              <el-table-column prop="applyNum" :label="'申请编号'" min-width="120" align="center" show-overflow-tooltip />
              <el-table-column prop="department" :label="'部门'" min-width="120" align="center" show-overflow-tooltip />
              <el-table-column prop="channel" :label="'渠道'" min-width="160" align="center" show-overflow-tooltip />
              <el-table-column prop="accountName" :label="'客户'" min-width="120" align="center" show-overflow-tooltip />
              <el-table-column prop="user" :label="'担当'" min-width="120" align="center" show-overflow-tooltip />
              <el-table-column prop="applyDate" :label="'申请日'" min-width="120" align="center" />
              <el-table-column prop="brand" :label="'品牌'" min-width="160" align="center" show-overflow-tooltip />
              <el-table-column prop="item" :label="'主题/名称'" min-width="120" align="center" show-overflow-tooltip />
              <el-table-column :label="'计划金额'" min-width="80" align="right">
                <template slot-scope="scope">
                  {{ scope.row.planAmount| numFormat(2) }}
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
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">关闭</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
// import { getList } from '@/api/mrk/supplier.js'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'VersionUpdate',
  components: { RelFuncSelect },
  mixins: [names, search, formValidator, popSelect, numFormat],
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      list: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          accountNum: '',
          motionIdentiferNum: ''
        }
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // const res = await getList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.list = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.list = []
      this.list.push({
        monthlyStatus: '已反映',
        expenseType: '活动提案',
        applyNum: 'No.000001',
        department: 'KA部',
        channel: '直销',
        accountName: '沃尔玛',
        user: '李丽',
        applyDate: '2020-04-01',
        brand: '乐而雅',
        item: '均一价',
        planAmount: '34234.23'
      })
      this.list.push({
        monthlyStatus: '未反映',
        expenseType: '活动提案',
        applyNum: 'No.000002',
        department: 'KA部',
        channel: '直销',
        accountName: '沃尔玛',
        user: '李丽',
        applyDate: '2020-04-02',
        brand: '乐而雅',
        item: '均一价',
        planAmount: '34234.23'
      })
      this.list.push({
        monthlyStatus: '未反映',
        expenseType: '活动提案',
        applyNum: 'No.000003',
        department: 'KA部',
        channel: '直销',
        accountName: '沃尔玛',
        user: '李丽',
        applyDate: '2020-04-02',
        brand: '乐而雅',
        item: '均一价',
        planAmount: '34234.23'
      })
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleAddDetail(index) {

    },
    handleDeleteDetail(index) {

    },
    handleUpdateDetail(index) {

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
