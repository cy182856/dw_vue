<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="budgetYear">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年度:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.budgetYear" size="small" type="year" value-format="yyyy" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="salesOffice">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                Sales Office:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.salesOfficeValue" placeholder="请选择">
                  <el-option
                    v-for="item in salesOffice"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="aaaa">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                XXXX:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.aaaa" clearable />
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
        <li class="operation-item" @click="handleApprove('agree')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">同意</span>
        </li>
        <li class="operation-item" @click="handleApprove('disagree')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">驳回</span>
        </li>
        <li class="operation-item" @click="handleAccountSummary">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">客户别汇总</span>
        </li>
        <li class="operation-item" @click="handleBrandSummary">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">品牌别汇总</span>
        </li>
        <div style="position: absolute; right: 40px; color: #f00;">
          已提交/客户总数: 80/130
        </div>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="bdList"
            stripe
            height="100%"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="55"
            />
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  ref="table1"
                  height="100%"
                  class="table-expand"
                  :data="props.row.children"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-class-name="CellStyle"
                  stripe
                >
                  <el-table-column prop="category1" label="科目" min-width="150" />
                  <template v-for="item in 12">
                    <el-table-column :key="item" prop :label="item + '月'">
                      <el-table-column :prop="'price'+item" :label="'单价'" align="right">
                        <template slot-scope="scope">
                          {{ scope.row['price'+item] | numFormat(2) }}
                        </template>
                      </el-table-column>
                      <el-table-column :prop="'ratio'+item" :label="'比率'" align="right">
                        <template slot-scope="scope">
                          <span v-if="!!scope.row['ratio'+item]">{{ scope.row['ratio'+item] | numFormat(1) }}%</span>
                        </template>
                      </el-table-column>
                      <el-table-column :prop="'number'+item" :label="'数量'" align="right">
                        <template slot-scope="scope">
                          {{ scope.row['number'+item] | numFormat(0) }}
                        </template>
                      </el-table-column>
                      <el-table-column :prop="'money1'+item" :label="'金额'" align="right">
                        <template slot-scope="scope">
                          {{ scope.row['money'+item] | numFormat(2) }}
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </template>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="salesOffice" label="Sales Office" min-width="100" align="center" />
            <el-table-column prop="bdUser" label="担当" min-width="70" align="center" />
            <el-table-column prop="agent" label="客户" min-width="70" align="center">
              <template slot-scope="scope">
                <router-link :to="{name: 'BdCustomer',params:{type:'approve'}}">
                  {{ scope.row.agent }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" min-width="70" align="center" />
            <template v-for="item in 12">
              <el-table-column :key="item" :label="item+'月'">
                <el-table-column :prop="'netsales_'+item" :label="'Netsales'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row['netsales_'+item] | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column :prop="'spd_'+item" :label="'SPD'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row['spd_'+item] | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column :prop="'spmk_'+item" :label="'SP-MK'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row['spmk_'+item] | numFormat(2) }}
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
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
    <div v-if="approveDialog">
      <el-dialog
        title="审批意见"
        :visible.sync="approveDialog"
        :close-on-click-modal="false"
        class="content-dialog-box  search-light"
        custom-class="dialog-drag dialog-drag-heightAuto content-dialog-upload  fixed-search-btn-box"
        width="35%"
      >
        <div style="display: flex;flex-direction: column;height: 100%;">
          <div>
            <div class="dialog-search-box middle-input">
              <el-form ref="searchForm" label-width="80px" label-position="left">
                <el-row v-if="dismissToVisible" type="flex" justify="space-between">
                  <el-col :span="18">
                    <el-form-item :label="$t('component.taskApprove.dismissTo')">
                      <el-select v-model="destActivityId" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in destActivityList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                  <el-col>
                    <el-form-item :label="'审批意见'">
                      <el-input v-model="comment" type="textarea" rows="3" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleSubmit">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.confirm') }}</span>
          </li>
        </ul>
      </el-dialog>
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
  name: 'BdList',
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      multipleSelection: [],
      selectUserDialog: false,
      bdList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      salesOffice: [{
        value: '2',
        label: '华北地区'
      }, {
        value: '3',
        label: '华东地区'
      }, {
        value: '4',
        label: '华南地区'
      }, {
        value: '5',
        label: '西南地区'
      }, {
        value: '1',
        label: 'EC&新零售部'
      }],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          quoteName: '',
          accountNum: '',
          // accountName: '',
          contactName: '',
          quoteTerm: '',
          assignedUser: '',
          assignedOrg: '',
          salesOfficeValue: '华北地区',
          salesOffice: '',
          budgetYear: '2021'
        }
      },
      approveDialog: false,
      dismissToVisible: false,
      comment: '',
      destActivityId: '',
      destActivityList: [{
        id: '1',
        name: '担当申请'
      }, {
        id: '2',
        name: '课长审批'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    if (this.$route.query.relFuncNum) {
      this.searchParam.params.relFuncNum = this.$route.query.relFuncNum
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      var list = []
      var children = {}
      for (var i = 1; i < 6; i++) {
        var d = {
          id: i,
          state: '已确认',
          sales1: 1 + i,
          children: [],
          salesOffice: '华北地区',
          bdUser: '担当' + i,
          agent: '客户' + i,
          netsales_1: (10000 * Math.random()).toFixed(2),
          spd_1: (10000 * Math.random()).toFixed(2),
          spmk_1: (10000 * Math.random()).toFixed(2),
          netsales_2: (10000 * Math.random()).toFixed(2),
          spd_2: (10000 * Math.random()).toFixed(2),
          spmk_2: (10000 * Math.random()).toFixed(2),
          netsales_3: (10000 * Math.random()).toFixed(2),
          spd_3: (10000 * Math.random()).toFixed(2),
          spmk_3: (10000 * Math.random()).toFixed(2),
          netsales_4: (10000 * Math.random()).toFixed(2),
          spd_4: (10000 * Math.random()).toFixed(2),
          spmk_4: (10000 * Math.random()).toFixed(2),
          netsales_5: (10000 * Math.random()).toFixed(2),
          spd_5: (10000 * Math.random()).toFixed(2),
          spmk_5: (10000 * Math.random()).toFixed(2),
          netsales_6: (10000 * Math.random()).toFixed(2),
          spd_6: (10000 * Math.random()).toFixed(2),
          spmk_6: (10000 * Math.random()).toFixed(2),
          netsales_7: (10000 * Math.random()).toFixed(2),
          spd_7: (10000 * Math.random()).toFixed(2),
          spmk_7: (10000 * Math.random()).toFixed(2),
          netsales_8: (10000 * Math.random()).toFixed(2),
          spd_8: (10000 * Math.random()).toFixed(2),
          spmk_8: (10000 * Math.random()).toFixed(2),
          netsales_9: (10000 * Math.random()).toFixed(2),
          spd_9: (10000 * Math.random()).toFixed(2),
          spmk_9: (10000 * Math.random()).toFixed(2),
          netsales_10: (10000 * Math.random()).toFixed(2),
          spd_10: (10000 * Math.random()).toFixed(2),
          spmk_10: (10000 * Math.random()).toFixed(2),
          netsales_11: (10000 * Math.random()).toFixed(2),
          spd_11: (10000 * Math.random()).toFixed(2),
          spmk_11: (10000 * Math.random()).toFixed(2),
          netsales_12: (10000 * Math.random()).toFixed(2),
          spd_12: (10000 * Math.random()).toFixed(2),
          spmk_12: (10000 * Math.random()).toFixed(2)
        }
        for (var j = 1; j < 13; j++) {
          if (j === 1) {
            children = {
              id: i + '00' + j,
              price1: (100 * Math.random()).toFixed(2),
              number1: (100 * Math.random()).toFixed(0),
              price2: (100 * Math.random()).toFixed(2),
              number2: (100 * Math.random()).toFixed(0),
              price3: (100 * Math.random()).toFixed(2),
              number3: (100 * Math.random()).toFixed(0),
              price4: (100 * Math.random()).toFixed(2),
              number4: (100 * Math.random()).toFixed(0),
              price5: (100 * Math.random()).toFixed(2),
              number5: (100 * Math.random()).toFixed(0),
              price6: (100 * Math.random()).toFixed(2),
              number6: (100 * Math.random()).toFixed(0),
              price7: (100 * Math.random()).toFixed(2),
              number7: (100 * Math.random()).toFixed(0),
              price8: (100 * Math.random()).toFixed(2),
              number8: (100 * Math.random()).toFixed(0),
              price9: (100 * Math.random()).toFixed(2),
              number9: (100 * Math.random()).toFixed(0),
              price10: (100 * Math.random()).toFixed(2),
              number10: (100 * Math.random()).toFixed(0),
              price11: (100 * Math.random()).toFixed(2),
              number11: (100 * Math.random()).toFixed(0),
              price12: (100 * Math.random()).toFixed(2),
              number12: (100 * Math.random()).toFixed(0)
            }
          } else if (j === 2) {
            children = {
              id: i + '00' + j,
              money1: (100 * Math.random()).toFixed(2),
              money2: (100 * Math.random()).toFixed(2),
              money3: (100 * Math.random()).toFixed(2),
              money4: (100 * Math.random()).toFixed(2),
              money5: (100 * Math.random()).toFixed(2),
              money6: (100 * Math.random()).toFixed(2),
              money7: (100 * Math.random()).toFixed(2),
              money8: (100 * Math.random()).toFixed(2),
              money9: (100 * Math.random()).toFixed(2),
              money10: (100 * Math.random()).toFixed(2),
              money11: (100 * Math.random()).toFixed(2),
              money12: (100 * Math.random()).toFixed(2)
            }
          } else if (j === 3 || j === 4 || j === 5 || j === 6 || j === 8 || j === 9 || j === 10) {
            children = {
              id: i + '00' + j,
              money1: (100 * Math.random()).toFixed(2),
              money2: (100 * Math.random()).toFixed(2),
              money3: (100 * Math.random()).toFixed(2),
              money4: (100 * Math.random()).toFixed(2),
              money5: (100 * Math.random()).toFixed(2),
              money6: (100 * Math.random()).toFixed(2),
              money7: (100 * Math.random()).toFixed(2),
              money8: (100 * Math.random()).toFixed(2),
              money9: (100 * Math.random()).toFixed(2),
              money10: (100 * Math.random()).toFixed(2),
              money11: (100 * Math.random()).toFixed(2),
              money12: (100 * Math.random()).toFixed(2),
              ratio1: j * 6,
              ratio2: j * 6,
              ratio3: j * 6,
              ratio4: j * 6,
              ratio5: j * 6,
              ratio6: j * 6,
              ratio7: j * 6,
              ratio8: j * 6,
              ratio9: j * 6,
              ratio10: j * 6,
              ratio11: j * 6,
              ratio12: j * 6
            }
          } else if (j === 7 || j === 11) {
            children = {
              id: i + '00' + j,
              price1: (100 * Math.random()).toFixed(2),
              money1: (100 * Math.random()).toFixed(0),
              price2: (100 * Math.random()).toFixed(2),
              money2: (100 * Math.random()).toFixed(0),
              price3: (100 * Math.random()).toFixed(2),
              money3: (100 * Math.random()).toFixed(0),
              price4: (100 * Math.random()).toFixed(2),
              money4: (100 * Math.random()).toFixed(0),
              price5: (100 * Math.random()).toFixed(2),
              money5: (100 * Math.random()).toFixed(0),
              price6: (100 * Math.random()).toFixed(2),
              money6: (100 * Math.random()).toFixed(0),
              price7: (100 * Math.random()).toFixed(2),
              money7: (100 * Math.random()).toFixed(0),
              price8: (100 * Math.random()).toFixed(2),
              money8: (100 * Math.random()).toFixed(0),
              price9: (100 * Math.random()).toFixed(2),
              money9: (100 * Math.random()).toFixed(0),
              price10: (100 * Math.random()).toFixed(2),
              money10: (100 * Math.random()).toFixed(0),
              price11: (100 * Math.random()).toFixed(2),
              money11: (100 * Math.random()).toFixed(0),
              price12: (100 * Math.random()).toFixed(2),
              money12: (100 * Math.random()).toFixed(0)
            }
          } else if (j === 12) {
            children = {
              id: i + '00' + j,
              price1: (100 * Math.random()).toFixed(2),
              price2: (100 * Math.random()).toFixed(2),
              price3: (100 * Math.random()).toFixed(2),
              price4: (100 * Math.random()).toFixed(2),
              price5: (100 * Math.random()).toFixed(2),
              price6: (100 * Math.random()).toFixed(2),
              price7: (100 * Math.random()).toFixed(2),
              price8: (100 * Math.random()).toFixed(2),
              price9: (100 * Math.random()).toFixed(2),
              price10: (100 * Math.random()).toFixed(2),
              price11: (100 * Math.random()).toFixed(2),
              price12: (100 * Math.random()).toFixed(2)
            }
          }
          d.children.push(children)
        }
        d.children[0].category1 = 'Gross Sales'
        d.children[1].category1 = 'Discount'
        d.children[2].category1 = 'Trade Disc'
        d.children[3].category1 = 'Promo Disc'
        d.children[4].category1 = 'Return'
        d.children[5].category1 = 'Rebate'
        d.children[6].category1 = 'Net Sales'
        d.children[7].category1 = 'Sp-MK'
        d.children[8].category1 = 'SP-TMK'
        d.children[9].category1 = 'EC Ad.'
        d.children[10].category1 = 'Net net Sales'
        d.children[11].category1 = '加重平均'
        list.push(d)
      }
      list[1].state = '待确认'
      list[2].state = '待确认'
      list[3].state = '待确认'
      this.bdList = list
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getSummaries() {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
      return ['所有页合计']
    },
    handleCreate() {
      this.$router.push('/bd/makeCreate')
    },
    handleSalesDesign() {
      this.$router.push('/bd/design')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/sale/quote/edit', query: { id: rowData.id, copy: true }})
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
        if (this.multipleSelection[0].workflowFlag === '1') {
          this.$message({
            type: 'error',
            message: this.$t('comm.msg33')
          })
          return
        }
        this.$router.push({ path: '/sale/quote/edit', query: { id: this.multipleSelection[0].id }})
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
          // deleteQuote(this.multipleSelection).then(() => {
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
    handleSubmit() {

    },
    handleApprove(type) {
      this.approveDialog = true
      if (type === 'agree') {
        this.dismissToVisible = false
      } else {
        this.dismissToVisible = true
      }
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
    },
    handleAccountSummary() {
      window.open(process.env.VUE_APP_BI_URL + '/decision/v10/entry/access/9e5ee366-7663-48ef-9634-cac7da2b03d8?preview=true', '_blank')
    },
    handleBrandSummary() {
      window.open(process.env.VUE_APP_BI_URL + '/decision/v10/entry/access/f102da5a-cd23-40ba-a737-ffe896a99db1?preview=true', '_blank')
    },
    CellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && (rowIndex === 1 || rowIndex === 7 || rowIndex === 8 || rowIndex === 4 || rowIndex === 5 || rowIndex === 9)) {
        return 'account-text-indent1'
      } else if (columnIndex === 0 && (rowIndex === 2 || rowIndex === 3)) {
        return 'account-text-indent2'
      }
    }

  }
}
</script>
