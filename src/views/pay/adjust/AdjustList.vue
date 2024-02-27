<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                申请年度:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.applyYear" size="small" type="year" value-format="yyyy" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                申请编号:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                申请日期:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.applyDate" size="small" type="date" value-format="yyyy-MM-dd" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                申请人:
              </el-col>
              <el-col :span="16">
                <user-select v-model="searchParam.params.applyUserNum" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                费用类型:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.expenseType" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in expenseType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                用途:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.uses" clearable />
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
            :data="adjustList"
            stripe
            border
            height="100%"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="55"
            />
            <el-table-column prop="identiferNum" :label="'Monitor No.'" min-width="100" align="center">
              <template slot-scope="scope">
                <router-link :to="{path:'/pay/adjust/detail',query:{id:scope.row.id}}">
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="applyDate" :label="'申请日期'" min-width="90" align="center" />
            <el-table-column prop="applyUser" :label="'申请人'" min-width="90" align="center" />
            <el-table-column prop="expenseType" :label="'费用类型'" min-width="170" align="center" />
            <el-table-column prop="adjustPeriod" :label="'调整期间'" min-width="130" align="center" />
            <el-table-column prop="uses" :label="'用途'" min-width="200" align="center" show-overflow-tooltip />
            <el-table-column :label="'调整金额/比率'" min-width="120" align="right">
              <template slot-scope="scope">
                <span v-if="scope.row.expenseType==='返利/基本交易折扣维护'">
                  {{ scope.row.adjustAmount }}%
                </span>
                <span v-else>
                  {{ scope.row.adjustAmount | numFormat(2) }}
                </span>
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
        <export-fields-select func-div="account" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
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
        <update-his :key="identiferNum" func-div="account" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
// import { getList, deleteAccount } from '@/api/pay/adjust.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'AdjustList',
  components: { UserSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: true,
      multipleSelection: [],
      adjustList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      expenseType: [
        {
          value: '1',
          label: 'BT费用调整'
        }, {
          value: '2',
          label: 'OE费用调整'
        }, {
          value: '3',
          label: 'CD费用调整'
        }
      ],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          applyUserNum: '',
          applyDate: ''
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
      // const res = await getList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.adjustList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.adjustList.push({
        id: '1',
        identiferNum: 'AV000001',
        applyUser: '小莉',
        applyDate: '2021-03-04',
        expenseType: 'BT费用调整',
        adjustPeriod: '第一季度',
        uses: 'BAG 2021年第一季度返利调整',
        adjustAmount: '1234.3'
      })
      this.adjustList.push({
        id: '2',
        identiferNum: 'AV000002',
        applyUser: '李丽',
        applyDate: '2021-09-04',
        expenseType: 'OE费用调整',
        adjustPeriod: '第三季度',
        uses: 'BAG 2021年第三季度返利调整',
        adjustAmount: '5433.31'
      })
      this.adjustList.push({
        id: '3',
        identiferNum: 'AV000005',
        applyUser: '小莉',
        applyDate: '2021-12-04',
        expenseType: 'CD费用调整',
        adjustPeriod: '年末',
        uses: 'BAG 2021年末度返利调整',
        adjustAmount: '231.34'
      })

      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/pay/adjust/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/pay/adjust/edit', query: { id: rowData.id, copy: true }})
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
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({ path: '/pay/adjust/edit', query: { id: rowData.id }})
        })
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
          // deleteadjust(this.multipleSelection).then(() => {
          //   this.search()
          // })
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
    }
  }
}
</script>
