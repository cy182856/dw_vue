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
                类别:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.name" placeholder="请选择">
                  <el-option
                    v-for="item in className"
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
                调整年月:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.month" size="small" :placeholder="'请选择'" type="month" :clearable="false" />
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
          <span class="operation-text">固定费调整</span>
        </li>
        <li class="operation-item" @click="strategyEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">变动费调整</span>
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
          >
            <el-table-column :prop="'date'" :label="'调整日'" min-width="320" align="center" />
            <el-table-column :prop="'depart'" :label="'部门'" min-width="320" align="center" />
            <el-table-column :prop="'people'" :label="'调整人'" min-width="120" align="center" />
            <el-table-column :prop="'type'" :label="'类别'" min-width="120" align="center" />
            <el-table-column :prop="'month'" :label="'生效年月'" min-width="120" align="center" />
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
export default {
  name: 'EstAdjust',
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      className: [{
        value: '1',
        label: '固定费'
      }, {
        value: '2',
        label: '变动费'
      }],
      multipleSelection: [],
      strategyList: [],
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      exportSelectDilog: false,
      // selectDepartmentDialog: false,
      historyDialog: false,
      cancelDialog: false,
      cancelReason: '',
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          name: '',
          month: ''
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
      this.strategyList = [{
        'id': 1,
        'date': '18/3/2021',
        'depart': '战略1科',
        'people': '管理员',
        'type': '固定费',
        'month': '202103'
      },
      {
        'id': 2,
        'date': '17/3/2021',
        'depart': '战略2科',
        'people': '管理员',
        'type': '固定费',
        'month': '202103'
      },
      {
        'id': 3,
        'date': '16/3/2021',
        'depart': '战略2科',
        'people': '管理员',
        'type': '变动费',
        'month': '202103'
      },
      {
        'id': 4,
        'date': '15/3/2021',
        'depart': '战略1科',
        'people': '管理员',
        'type': '变动费',
        'month': '202103'
      }
      ]
    },
    getMockList(type) {
      const monthfee = {}
      if (type === 1) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = 100
          monthfee['included_' + i] = 120
        }
      } else if (type === 2) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = 50
          monthfee['included_' + i] = 60
        }
      } else if (type === 3) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = '30%'
          monthfee['included_' + i] = '50%'
        }
      }
      return monthfee
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
          // deletePayment(this.multipleSelection).then(() => {
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
    handleCreate() {
      this.$router.push('/promotion/strategytwo/edit')
    },
    strategyEdit() {
      this.$router.push('/promotion/strategytwo/detail')
    },
    handleCancelSubmit() {
      this.cancelDialog = false
    },
    handleDownload() {
      console.log(11)
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 9 === 0) {
          return {
            rowspan: 9,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 1) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
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
