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
                {{ $t("est.salesorder.orderid") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.orderCode" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("est.salesorder.salesorderName") }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("est.salesorder.datastart") }}
              </el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="searchParam.params.startDate"
                  size="small"
                  :placeholder="$t('comm.pleaseselect')"
                  type="date"
                  :clearable="false"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions0"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("est.salesorder.dataend") }}
              </el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="searchParam.params.endDate"
                  size="small"
                  :placeholder="$t('comm.pleaseselect')"
                  type="date"
                  :clearable="false"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("est.salesorder.ordersalestype") }}
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.salesFlag" dict-type-id="SalesFlag" :filter1="ST" />
                <!-- <span ref="salesFlag" data-roles="required" :data-value="searchParam.params.salesFlag" class="message" /> -->
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
        <li class="operation-item" @click="save">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">保存</span>
        </li>
        <li class="operation-item" @click="salesOrderDown">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">销售订单下载</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="dataList"
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
            <el-table-column :prop="'orderCode'" :label="$t('est.salesorder.orderid')" min-width="120" align="center" />
            <el-table-column :prop="'custName'" :label="$t('est.salesorder.salesorderNametable')" min-width="120" align="left" show-overflow-tooltip />
            <el-table-column :prop="'salesFlag'" :label="$t('est.salesorder.ordertype')" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="SalesFlag" :value="scope.row.salesFlag" />
              </template>
            </el-table-column>
            <el-table-column :prop="'orderYmd'" :label="$t('est.salesorder.orderdata')" width="160" align="center" />
            <el-table-column :prop="'actYmd'" :label="$t('est.salesorder.actualdata')" width="160" align="center">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.actYmd"
                  :placeholder="$t('comm.pleaseselect')"
                  type="date"
                  :clearable="false"
                  :disabled="scope.row.disabled"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions2"
                  @focus="pickerClick(dataList2[scope.$index].actYmd)"
                />
              </template>
            </el-table-column>
            <el-table-column :prop="'amountWithTax'" :label="$t('订单金额(含税)')" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.amountWithTax|numFormat(2) }}
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getSalesOrderList, save, salesOrderDown } from '@/api/sale/salesorder-api'
import { formValidator } from '@/mixins/form-validator.js'

// import RelFuncSelect from '@/components/RelFuncSelect.vue'
var that = {}
export default {
  name: 'SalesOrder',
  // components: { RelFuncSelect },
  mixins: [search, names, permission, numFormat, formValidator],
  data() {
    return {
      isLoading: false,
      ST: 'ST',
      multipleSelection: [],
      dataList: [],
      dataList2: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          orderCode: '',
          custName: '',
          startDate: '',
          endDate: '',
          salesFlag: ''
        }
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.searchParam.params.endDate !== '') {
            return time.getTime() > new Date(this.searchParam.params.endDate).getTime()
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.searchParam.params.startDate).getTime() - 1 * 24 * 60 * 60 * 1000// 减去一天的时间代表可以选择同一天;
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() < new Date(that.time)
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
  },
  methods: {
    search() {
      this.clear()
      if (!this.validatorAll()) return
      if (this.isLoading === false) {
        this.searchParam.pageNo = 1
        this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: JSON.parse(JSON.stringify(this.searchParam)) })
        this.fetchData()
      }
    },
    selectInit(row, index) {
      if (row.isEditable === 1) {
        return false
      } else {
        return true
      }
    },
    async fetchData() {
      this.isLoading = true
      const res = await getSalesOrderList(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.dataList = results
        this.dataList2 = JSON.parse(JSON.stringify(results))
        if (this.dataList.length > 0) {
          for (let s = 0; s < this.dataList.length; s++) {
            this.dataList[s]['disabled'] = true
          }
        }
      }
      this.isLoading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      const list = this.dataList
      for (let s = 0; s < list.length; s++) {
        this.dataList[s]['disabled'] = true
      }
      for (let index = 0; index < val.length; index++) {
        const selectId = val[index].id
        for (let s = 0; s < list.length; s++) {
          const listId = list[s].id
          if (listId === selectId) {
            this.dataList[s]['disabled'] = false
          }
        }
      }
    },
    salesOrderDown() {
      salesOrderDown(this.searchParam)
    },
    async save() {
      const searchJson = this.$store.getters.searchParams.get(this.$route.path)
      console.log(searchJson)
      if (!searchJson || (searchJson.params && !searchJson.params.salesFlag)) {
        this.$message({
          type: 'error',
          message: '请先选择 订单销售类型 并点击【查询】按钮后再使用此功能'
        })
        return
      }
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
        return
      }
      const reqList = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        reqList.push({
          id: this.multipleSelection[i].id,
          actYmd: this.multipleSelection[i].actYmd
        })
      }
      this.isLoading = true
      const params = new FormData()
      params.append('jsonList', JSON.stringify(reqList))
      params.append('type', searchJson.params.salesFlag)
      const res = await save(params)
      if (res) {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        }
      }
      this.isLoading = false
      // console.log('调用保存方法！！！', JSON.stringify(reqList))
    },
    pickerClick(val) {
      that['time'] = val
    },
    checkDate() {
      // const self = this
      /* return {
        disabledDate: (date) => {
          console.log('aaaaaaaaaa', date)
          return date.getTime() > new Date(date).getTime() - 24 * 60 * 60 * 1000
        }
      } */
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
