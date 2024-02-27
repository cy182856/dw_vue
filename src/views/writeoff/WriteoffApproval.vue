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
                发生年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.verifyYm" size="small" :placeholder="'请选择'" type="month" clearable value-format="yyyy-MM" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <!-- <el-select v-model="searchParam.params.submitOrg" placeholder="请选择">
                  <el-option
                    v-for="item in departs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
                <dict-select v-model="searchParam.params.submitOrg" dict-type-id="ShowDept" :filter2="happenYear" placeholder="请选择" :disabled="disabled" :filter1="ST" />
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
        <li class="operation-item" @click="dialogShow">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">批量审批</span>
        </li>
        <li class="operation-item operation-item-reverse" @click="handleSumDialog">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-info"
          /></span>
          <span class="operation-text">汇总查看</span>
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
              :selectable="selectInit"
            />
            <!--            <el-table-column
              label="部门"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/writeoff/approvaledit',
                    query: { id: scope.row.approvalDivId, deptcode: scope.row.submitOrg, verifyym: scope.row.verifyYm,deptname: scope.row.deptName },
                  }"
                >
                  {{ scope.row.deptName }}
                </router-link>
              </template>
            </el-table-column>-->
            <el-table-column :prop="'submitOrg'" :label="'部门'" min-width="120" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/writeoff/approvaledit',
                    query: { id: scope.row.approvalDivId, deptcode: scope.row.submitOrg, verifyym: scope.row.verifyYm },
                  }"
                >
                  <dict-write dict-type-id="ShowDept" :value="scope.row.submitOrg" />
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :prop="'approvalDivName'" :label="'区分'" min-width="120" align="center" />
            <el-table-column :prop="'verifyYm'" :label="'发生年月'" min-width="120" align="center" />
            <el-table-column :prop="'sumExactSalesAmount'" :label="'销售实绩'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.sumExactSalesAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'sumEstSalesAmount'" :label="'销售预估'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.sumEstSalesAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'sumBgtSalesAmount'" :label="'销售预算'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.sumBgtSalesAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'sumExactFeeAmount'" :label="'费用实绩'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.sumExactFeeAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'eactFeeAmountProportion'" :label="'费用实绩费比'" min-width="120" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.eactFeeAmountProportion|numFormat(2) }}</span>
                <span v-if="scope.row.eactFeeAmountProportion!==null">%</span>
              </template>
            </el-table-column>
            <el-table-column :prop="'sumActAmount'" :label="'费用实绩支付'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.sumActAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'actAmountProportion'" :label="'费用实绩支付费比'" min-width="120" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.actAmountProportion|numFormat(2) }}</span>
                <span v-if="scope.row.actAmountProportion!==null">%</span>
              </template>
            </el-table-column>
            <el-table-column :prop="'sumRealFeeAmount'" :label="'费用精准预估'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.sumRealFeeAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'realFeeAmountProportion'" :label="'费用精准预估费比'" min-width="120" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.realFeeAmountProportion|numFormat(2) }}</span>
                <span v-if="scope.row.realFeeAmountProportion!==null">%</span>
              </template>
            </el-table-column>
            <el-table-column :prop="'sumEstFeeAmount'" :label="'费用预估'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.sumEstFeeAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'estFeeAmountProportion'" :label="'费用预估费比'" min-width="120" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.estFeeAmountProportion|numFormat(2) }}</span>
                <span v-if="scope.row.estFeeAmountProportion!==null">%</span>
              </template>
            </el-table-column>
            <el-table-column :prop="'sumBgtFeeAmount'" :label="'费用预算'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.sumBgtFeeAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'bgtFeeAmountProportion'" :label="'费用预算费比'" min-width="120" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.bgtFeeAmountProportion|numFormat(2) }}</span>
                <span v-if="scope.row.bgtFeeAmountProportion!==null">%</span>
              </template>
            </el-table-column>
            <!--
            <el-table-column :prop="'data12'" :label="'未提交代理商数'" min-width="120" align="center" />
            <el-table-column :prop="'data13'" :label="'未审批代理商数'" min-width="120" align="center" />
            <el-table-column :prop="'data14'" :label="'已审批代理商数'" min-width="120" align="center" />
            -->
          </el-table>
        </div>
      </div>
      <!-- <div class="pagination-box">
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
      </div> -->
    </div>
    <el-dialog
      class="content-dialog-box  search-light rules newedit3"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title="'审批操作'"
      :visible.sync="dialogFormVisible"
      width="600"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-dialog title="进度条" class="progress-dialog" top="0" width="120" :visible.sync="progressVisible" append-to-body :close-on-click-modal="false">
        <el-progress type="circle" :percentage="percentageNum" />
      </el-dialog>
      <div class="pop_content" />
      <el-form>
        <el-form-item label="审批意见">
          <el-input v-model="reason" type="textarea" rows="3" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit(1)">
          通 过
        </el-button>
        <el-button type="primary" @click="handleSubmit(2)">
          驳 回
        </el-button>
        <el-button @click="dialogFormVisible=false">
          取 消
        </el-button>
      </div>
    </el-dialog>
    <!-- 汇总弹窗 -->
    <writeoff-sum :is-show="writeoffSumDialog" adjust-type="2" :target-org="submitOrg" :est-ym="estYm" @cancel="writeoffSumDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search, progressLoading } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { dateFormat, addMonth } from '@/utils/util.js'
import { getChiefApprovalList, batchApprove, batchReject } from '@/api/writeoff/approval.js'
import WriteoffSum from '@/views/writeoff/components/WriteoffSumDialog'

// import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'WriteoffApproval',
  components: { WriteoffSum },
  mixins: [search, progressLoading, names, permission, numFormat],
  data() {
    return {
      dialogFormVisible: false,
      writeoffSumDialog: false,
      isLoading: false,
      // departs: [
      //   { value: '销售1科', lable: '01' },
      //   { value: '销售2科', lable: '02' },
      //   { value: '销售推进部', lable: '03' },
      //   { value: 'EC部', lable: '04' }
      // ],
      multipleSelection: [],
      reason: '',
      ST: '',
      strategyList: [],
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      exportSelectDilog: false,
      // selectDepartmentDialog: false,
      historyDialog: false,
      cancelDialog: false,
      cancelReason: '',
      tax1: true,
      tax2: true,
      submitOrg: null,
      estYm: null,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          submitOrg: '',
          verifyYm: '',
          userId: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    happenYear: function() {
      if (this.searchParam.params.verifyYm) {
        return this.searchParam.params.verifyYm.substr(0, 4)
      } else {
        return ''
      }
    },
    disabled() {
      // let isSelect = true
      // let isFlag = false
      // if (this.$store.getters.dictList.Dept) {
      //   const deptList = this.$store.getters.dictList.Dept
      //   const targetList = this.$store.getters.dictList.TARGETORG
      //   let orgId = ''
      //   if (deptList && targetList) {
      //     for (let i = 0; i < deptList.length; i++) {
      //       for (let s = 0; s < targetList.length; s++) {
      //         if (targetList[s].dictName === deptList[i].dictId) {
      //           orgId = targetList[s].dictId
      //           console.log(this.userInfo.orgSeqNo.indexOf(orgId), orgId, this.userInfo.orgSeqNo, 1090)
      //           if (this.userInfo.orgSeqNo.indexOf(orgId) !== -1) {
      //             isFlag = true
      //             break
      //           }
      //         }
      //       }
      //     }
      //   }
      //   if (!isFlag) {
      //     isSelect = false
      //   }
      // }
      // return isSelect
      return false
    }
  },
  created() {
    const day = new Date().getDate()
    if (day <= 15) {
      this.searchParam.params.verifyYm = addMonth(dateFormat(new Date(), 'yyyy-MM'), -2)
    } else {
      this.searchParam.params.verifyYm = addMonth(dateFormat(new Date(), 'yyyy-MM'), -1)
    }
    if (this.userInfo.roleList.some(todo => todo === 'ROLE_WF_MARKET' || todo === 'ROLE_STRATEGY_SECTION_APPLY')) {
      this.ST = 'ST'
    } else {
      this.ST = ''
    }
    this.fetchData()
  },
  methods: {
    handleClose() {
      this.dialogFormVisible = false
    },
    dialogShow() {
      if (this.multipleSelection) {
        this.dialogFormVisible = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    doHandleMonth() {
      var myDate = new Date()
      var tMonth = myDate.getMonth()

      var m = tMonth - 1
      if (m.toString().length === 1) {
        m = '0' + m
      }
      return m
    },
    async fetchData() {
      if (!this.searchParam.params.verifyYm) {
        this.$message({
          type: 'error',
          message: '查询条件中，年月不能为空！'
        })
        return false
      }
      this.estYm = this.searchParam.params.verifyYm
      this.submitOrg = this.searchParam.params.submitOrg
      this.isLoading = true
      this.searchParam.params.userId = this.userInfo.userId
      // 查询核销单总监审批一览
      const res = await getChiefApprovalList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo } = res.datas.searchResult
        this.strategyList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = this.strategyList.length
      }
      this.isLoading = false
    },
    batchDelete() {
      if (this.multipleSelection) {
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
    handleSubmit(type) {
      if (this.percentageSetIntervalId) return

      if (type === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$confirm('是否确认审批通过所选数据？', this.$t('comm.tips'), {
            confirmButtonText: this.$t('comm.certain'),
            cancelButtonText: this.$t('comm.cancel'),
            type: 'warning'
          }).then(async() => {
            let num = 0
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.multipleSelection[i].reason = this.reason
              num += this.multipleSelection[i].ids.split(',').length
            }
            this.handleSetInterval(num)
            const res = await batchApprove(this.multipleSelection)
            this.handleClearInterval()

            if (res && res.success) {
              this.$message({
                type: 'success',
                message: this.$t('comm.success')
              })
            }
            this.dialogFormVisible = false
            this.reason = ''
            this.fetchData()
            this.isLoading = false
          }).catch(err => {
            this.$message({
              type: 'info',
              message: this.$t('comm.msg1')
            })
            console.log(err)
          })
        })
      } else {
        /**if (this.reason === null || this.reason === '') {
          this.$message({
            type: 'warning',
            // message: '驳回时，审批意见不能为空'
            message: this.$t('comm.msg46')
          })
          return
        }**/
        this.multipleSelection.forEach((rowData) => {
          this.$confirm('是否确认驳回所选数据？', this.$t('comm.tips'), {
            confirmButtonText: this.$t('comm.certain'),
            cancelButtonText: this.$t('comm.cancel'),
            type: 'warning'
          }).then(async() => {
            let num = 0
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.multipleSelection[i].reason = this.reason
              num += this.multipleSelection[i].ids.split(',').length
            }
            this.handleSetInterval(num)
            const res = await batchReject(this.multipleSelection)
            this.handleClearInterval()

            if (res && res.success) {
              this.$message({
                type: 'success',
                message: this.$t('comm.success')
              })
            }
            this.dialogFormVisible = false
            this.reason = ''
            this.fetchData()
            this.isLoading = false
          }).catch(err => {
            this.$message({
              type: 'info',
              message: this.$t('comm.msg1')
            })
            console.log(err)
          })
        })
      }
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    selectInit(row, index) {
      if (row.isEditable === '0') {
        return false
      } else {
        return true
      }
    },
    handleSumDialog() {
      if (!this.searchParam.params.submitOrg) {
        this.$message({
          type: 'error',
          message: '部门不能为空'
        })
        return
      }
      if (!this.searchParam.params.verifyYm) {
        this.$message({
          type: 'error',
          message: '年月不能为空'
        })
        return
      }
      this.writeoffSumDialog = true
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
.apply .newedit3 .el-dialog {
  width: 400px !important;
  height: 300px;
  min-width: 400px !important;
}
.progress-dialog .el-dialog__header{
  display: none;
}
.progress-dialog .el-dialog{
  height: 120px;
  width: 120px !important;
  background: transparent;
  box-sizing: unset;
  box-shadow: unset;
}
</style>
