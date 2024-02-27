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
                代理商:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                状态:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.estStatus" dict-type-id="EstApplyStatus" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                对象年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.targetYm" size="small" :placeholder="'请选择'" type="month" value-format="yyyy-MM" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                大区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                小区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area2" clearable />
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
        <li class="operation-item" @click="handleSubmit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">预估提交</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable rebateledger-table table-two">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="PromotionList"
            :span-method="objectSpanMethod"
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
              :selectable="selectInit"
            />
            <el-table-column :label="'部门'" min-width="120" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.estStatus==='0'">{{ scope.row.submitOrg |dictName('Dept') }}</span>
                <a v-else class="link" @click.prevent="handleProcessInstClick(scope.row.workflowProcessInstId)">{{ scope.row.submitOrg |dictName('Dept') }}</a>
              </template>
            </el-table-column>
            <el-table-column
              label="代理商"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/est/promotionEdit',
                    query: { id: scope.row.id },
                  }"
                >
                  {{ scope.row.custName }}
                </router-link>
              </template>
            </el-table-column>

            <!-- <el-table-column :prop="'data2'" :label="'代理商'" min-width="120" align="center" /> -->
            <el-table-column :prop="'targetYm'" :label="'对象年月'" min-width="120" align="center" />
            <el-table-column :prop="'estStatus'" :label="'状态'" min-width="120" align="center">
              <template slot-scope="scope">
                {{ scope.row.estStatus |dictName('EstApplyStatus') }}
              </template>
            </el-table-column>
            <el-table-column :prop="'estYm'" :label="'发生年月'" min-width="120" align="center" />
            <el-table-column :label="'销售'" align="center">
              <el-table-column :prop="'sale_dawang_cnt'" :label="'数量'" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.sale_dawang_cnt|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column :prop="'sale_dawang_amount'" :label="'金额'" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.sale_dawang_amount|numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'代理商出库'" align="center">
              <el-table-column :prop="'sale_ttms_cnt'" :label="'数量'" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.sale_ttms_cnt|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column :prop="'sale_ttms_amount'" :label="'金额'" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.sale_ttms_amount|numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'促销费'" align="center">
              <el-table-column :prop="'est_amount_fixed'" :label="'固定费'" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.est_amount_fixed|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column :prop="'est_percent_fixed'" :label="'固定费比'" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.est_percent_fixed|numFormat(2) }}</span>
                  <span v-if="scope.row.est_percent_fixed!==null">%</span>
                </template>
              </el-table-column>
              <el-table-column :prop="'est_amount_changed'" :label="'变动费'" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.est_amount_changed|numFormat(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column :prop="'est_percent_changed'" :label="'变动费比'" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.est_percent_changed|numFormat(2) }}</span>
                  <span v-if="scope.row.est_percent_changed!==null">%</span>
                </template>
              </el-table-column>
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

    <div v-if="dialogTableVisible">
      <process-detail :key="processInstId + ':' + new Date()" :is-show="dialogTableVisible" :title="$t('admin.wfInst.processDetail') + processInstId" :process-inst-id="processInstId" @close="dialogTableVisible=false" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList, applyBatchCommit } from '@/api/est/promotion.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'NobarCode',
  // components: { RelFuncSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      dialogTableVisible: false,
      multipleSelection: [],
      PromotionList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          custName: '',
          estStatus: '',
          area1: '',
          area2: '',
          targetYm: String(new Date().getFullYear()) + '-' + this.doHandleMonth()
          // submitOrg: ''
        }
      },
      bigAreas: [],
      smallAreas: []
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    // this.searchParam.params.submitOrg = this.userInfo.orgId
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.searchList()
    },
    async searchList() {
      if (!this.searchParam.params.targetYm) {
        this.$message({
          message: '查询条件中，年月不能为空！'
        })
        return false
      }
      this.isLoading = true
      const res = await getList(this.searchParam)
      if (res && res.success) {
        // this.searchDetailParam.paramMonthlyEstId = results[0].id
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
        this.PromotionList = results
      }
      this.isLoading = false
    },
    handleProcessInstClick: function(processInstId) {
      this.processInstId = processInstId
      this.dialogTableVisible = true
    },
    strategyEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({
            path: '/writeoff/edit',
            query: { id: rowData.id }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
      // this.$router.push('/promotion/strategytwo/detail')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    handleSubmit() {
      // console.log(this.multipleSelection)
      const removeId = []
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((rowData) => {
          removeId.push(rowData.id)
        })
        console.log(this.unique(removeId), 111)
        // return false
        this.$confirm('是否确认提交所选数据？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(async() => {
          this.PromotionList = []
          this.isLoading = true
          const res = await applyBatchCommit({ estExpsIds: String(this.unique(removeId)) })
          if (res && res.success) {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
            this.fetchData()
          }
          this.isLoading = false
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4) {
        if (rowIndex % 5 === 0) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    doHandleMonth() {
      var myDate = new Date()
      var tMonth = myDate.getMonth()

      var m = tMonth + 1
      if (m.toString().length === 1) {
        m = '0' + m
      }
      return m
    },
    selectInit(row, index) {
      if (row.estStatus === '1' || row.estStatus === '2') {
        return false
      } else {
        return true
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
