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
                分类名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.promotionName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.applyYm" size="small" :placeholder="'请选择'" type="month" :clearable="false" value-format="yyyy-MM" :picker-options="pickerOptions0" />
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
        <li class="operation-item" @click="handleCreate">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">新建</span>
        </li>
        <li class="operation-item" @click="handleEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">编辑</span>
        </li>
        <li class="operation-item" @click="batchDelete">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-delete"
          /></span>
          <span class="operation-text">删除</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="strategyList"
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
              :prop="'promotionName'"
              label="分类名称"
              min-width="320"
              align="left"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/promotion/estClassified/edit',
                    query: { id: scope.row.id ,type:'info'},
                  }"
                >
                  {{ scope.row.promotionName }}
                </router-link>
              </template>
            </el-table-column>
            <!-- <el-table-column :prop="'name'" :label="'分类名称'" min-width="320" align="center" /> -->
            <el-table-column :prop="'sku'" :label="'对象产品'" min-width="320" align="center" />
            <el-table-column :prop="'maxRate'" :label="'上限'" min-width="120" align="center" />
            <el-table-column :prop="'dateYM'" :label="'适用期间'" min-width="120" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.fromYm == null">~</span>
                <span v-else>{{ scope.row.fromYm + "~" }}</span>
                <span v-if="scope.row.toYm == null" />
                <span v-else>{{ scope.row.toYm }}</span>
              </template>
            </el-table-column>
            <el-table-column :prop="'updateBy'" :label="'更新人'" min-width="120" align="center" />
            <el-table-column :prop="'updateTime'" :label="'更新时间'" min-width="220" align="center" />
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getPromotionMonthList, deletePromotionMonth } from '@/api/est/promotion.js'
export default {
  name: 'EstClassified',
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      className: [],
      multipleSelection: [],
      strategyList: [],
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      exportSelectDilog: false,
      // selectDepartmentDialog: false,
      historyDialog: false,
      cancelDialog: false,
      cancelReason: '',
      checkedTaxs: ['未税', '含税'],
      taxs: ['未税', '含税'],
      tax1: true,
      tax2: true,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          name: '',
          date1: '',
          date2: ''
        }
      },
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    this.fetchData()
    console.log(this.strategyList)
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // 查询月度分类管理一览信息
      const res = await getPromotionMonthList(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.strategyList = results
        this.strategyList.forEach(item => {
          // if (item.skuNames) {
          //   const skuNames = JSON.parse(item.skuNames)
          //   console.log(skuNames)
          //   item.sku = skuNames.join(',    ')
          // }
          item.sku = item.categoryCount + '个品类，' + item.feeInputTypeCount + '个系列，' + item.productNameCount + '个SKU'
        })
      }
      this.isLoading = false
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
          deletePromotionMonth(this.multipleSelection).then(() => {
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
    handleCreate() {
      this.$router.push({
        path: '/promotion/estClassified/edit',
        query: { type: 'add' }
      })
    },
    handleEdit() {
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
            path: '/promotion/estClassified/edit',
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
    handleCancelSubmit() {
      this.cancelDialog = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
