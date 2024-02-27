<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="department">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                对象年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.targetYm" size="small" type="month" :clearable="false" value-format="yyyy-MM" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="department">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.submitOrg" dict-type-id="Dept" :disabled="disabled" :filter1="ST" :filter2="happenYear" />
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
        <li v-if="hasPermission('est-approve-button')" class="operation-item" @click="dialogShow">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
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
      <div class="table-bg-box search-list-table borderTable rebateledger-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="dataList"
            stripe
            height="100%"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="55"
              :selectable="selectInit"
            />
            <el-table-column
              :prop="'name'"
              label="部门名称"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/est/approveEdit',
                    query: { targetYm: scope.row.targetYm,submitOrg: scope.row.submitOrg,estStatus: scope.row.estStatus, isEditable: scope.row.isEditable },
                  }"
                >
                  {{ scope.row.submitOrg|dictName('Dept') }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="targetYm" label="对象年月" min-width="160" align="center" />
            <el-table-column prop="estStatus" label="流程状态" min-width="120" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.estStatus==='1'">申请中</span>
                <span v-if="scope.row.estStatus==='2'">已通过</span>
                <span v-if="scope.row.estStatus==='3'">已驳回</span>
              </template>
            </el-table-column>
            <template v-for="(item,index) in headerMonth">
              <el-table-column :key="item" :label="item">
                <el-table-column :label="'销售预算'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].sale_bgt_amount|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="data2" :label="'销售预估'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].sale_est_amount|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column v-if="index===0" prop="data3" :label="'销售实绩'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].sale_act_amount|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="data4" :label="'固定费预算'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].bgt_amount_fixed|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="data5" :label="'固定费预估'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].est_amount_fixed|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column v-if="index===0" prop="data6" :label="'固定费精准预估'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].act_amount_fixed|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="data7" :label="'固定费预算费比'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].bgt_percent_fixed|numFormat(2) }}
                    <span v-if="scope.row.children[index].bgt_percent_fixed!==null">%</span>
                  </template>
                </el-table-column>
                <el-table-column prop="data8" :label="'固定费预估费比'" min-width="120" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].est_percent_fixed|numFormat(2) }}
                    <span v-if="scope.row.children[index].est_percent_fixed!==null">%</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="index===0" prop="data9" :label="'固定费预精准估费比'" min-width="160" align="right">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].act_percent_fixed|numFormat(2) }}
                    <span v-if="scope.row.children[index].act_percent_fixed!==null">%</span>
                  </template>
                </el-table-column>
                <el-table-column prop="data10" :label="'变动费预算'" min-width="120" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].bgt_amount_changed |numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="data11" :label="'变动费预估'" min-width="120" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].est_amount_changed|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column v-if="index===0" prop="data12" :label="'变动费精准预估'" min-width="120" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].act_amount_changed|numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="data13" :label="'变动费预算费比'" min-width="120" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].bgt_percent_changed |numFormat(2) }}
                    <span v-if="scope.row.children[index].bgt_percent_changed!==null">%</span>
                  </template>
                </el-table-column>
                <el-table-column prop="data14" :label="'变动费预估费比'" min-width="120" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].est_percent_changed|numFormat(2) }}
                    <span v-if="scope.row.children[index].est_percent_changed!==null">%</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="index===0" prop="data15" :label="'变动费精准预估费比'" min-width="160" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.children[index].act_percent_changed|numFormat(2) }}
                    <span v-if="scope.row.children[index].act_percent_changed!==null">%</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
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
          <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
        </el-pagination>
        <el-pagination class="page-right  page-first" layout="slot">
          <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
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
    <writeoff-sum :is-show="writeoffSumDialog" adjust-type="1" :target-org="submitOrg" :est-ym="estYm" @cancel="writeoffSumDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search, progressLoading } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { dateFormat, addMonth } from '@/utils/util.js'
import { getList, applyBatchApprove, rejectBatchApprove } from '@/api/est/approve.js'
import WriteoffSum from '@/views/writeoff/components/WriteoffSumDialog'

export default {
  components: {
    WriteoffSum
  },
  mixins: [search, progressLoading, names, permission, numFormat],
  data() {
    return {
      dialogFormVisible: false,
      writeoffSumDialog: false,
      reason: '',
      ST: '',
      isLoading: false,
      multipleSelection: [],
      dataList: [],
      headerMonth: [],
      estYm: null,
      submitOrg: null,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          submitOrg: '',
          targetYm: String(new Date().getFullYear()) + '-' + this.doHandleMonth()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'csrfToken']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    happenYear: function() {
      return addMonth(this.searchParam.params.targetYm, -1).substr(0, 4)
    },
    disabled() {
      let isSelect = true
      let isFlag = false
      if (this.userInfo.roleList.includes('ROLE_WF_MARKET') || this.userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY') || this.userInfo.roleList.includes('ROLE_MULTIPLE_DEPT')) {
        return false
      }
      if (this.$store.getters.dictList.Dept) {
        const deptList = this.$store.getters.dictList.Dept
        const targetList = this.$store.getters.dictList.TARGETORG
        let orgId = ''
        if (deptList && targetList) {
          for (let i = 0; i < deptList.length; i++) {
            for (let s = 0; s < targetList.length; s++) {
              if (targetList[s].dictName === deptList[i].dictId) {
                orgId = targetList[s].dictId
                // console.log(this.userInfo.orgSeqNo.indexOf(orgId), orgId, this.userInfo.orgSeqNo, 1090)
                if (this.userInfo.orgSeqNo.indexOf(orgId) !== -1) {
                  isFlag = true
                  break
                }
              }
            }
          }
        }

        if (!isFlag) {
          isSelect = false
        }
      }
      return isSelect
    }
  },
  watch: {
    orgIdCom: {
      handler(newValue, oldValue) {
        this.searchParam.params.submitOrg = newValue
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    if (this.userInfo.roleList.some(todo => todo === 'ROLE_WF_MARKET' || todo === 'ROLE_STRATEGY_SECTION_APPLY')) {
      this.ST = 'ST'
    } else {
      this.ST = ''
    }
    this.searchParam.params.submitOrg = this.orgIdCom
    this.fetchData()
  },
  methods: {
    handleClose() {
      // this.isShow = false
      this.dialogFormVisible = false
    },
    async fetchData() {
      this.searchList()
    },
    async searchList() {
      if (!this.searchParam.params.targetYm) {
        this.$message({
          type: 'error',
          message: '查询条件中，年月不能为空！'
        })
        return false
      }
      const date = new Date(this.searchParam.params.targetYm)
      date.setMonth(date.getMonth() - 1)
      this.estYm = dateFormat(date, 'yyyy-MM')
      this.submitOrg = this.searchParam.params.submitOrg
      this.isLoading = true
      const res = await getList(this.searchParam)
      if (res && res.success) {
        this.headerMonth = []
        // this.searchDetailParam.paramMonthlyEstId = results[0].id
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
        // console.log(results, 111)
        this.dataList = results
        // this.dataList = [{ 'id': '1', 'submitOrg': 'EC-DEPT' }]

        if (results.length > 0) {
          const listlie = results[0].children
          if (listlie.length > 0) {
            for (let s = 0; s < listlie.length; s++) {
              const month = listlie[s].estYm
              this.headerMonth.push(month)
            }
          }
          // console.log('headerMonth', this.headerMonth)
        }
      }
      this.isLoading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    dialogShow() {
      if (this.multipleSelection.length > 0) {
        this.dialogFormVisible = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleSubmit(type) {
      if (this.percentageSetIntervalId) return
      // console.log(this.multipleSelection)
      let num = 0
      const removeId = []
      this.multipleSelection.forEach((rowData) => {
        removeId.push({ 'submitOrg': rowData.submitOrg, 'targetYm': rowData.targetYm, 'estStatus': rowData.estStatus })
        num += rowData.custListSize
      })
      // console.log(removeId, 111)
      if (type === 1) {
        this.$confirm('是否确认审批通过所选数据？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(async() => {
          this.handleSetInterval(num)
          const res = await applyBatchApprove({ 'jsonStr': JSON.stringify(removeId), 'comments': this.reason })
          this.handleClearInterval()

          if (res && res.success) {
            console.log(res, 111)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.dialogFormVisible = false
            this.reason = ''
            this.fetchData()
          }
          this.isLoading = false
        }).catch(err => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
          console.log(err)
        })
      } else {
        /**if (!this.reason) {
          this.$message({
            type: 'info',
            message: '请填写审批意见！'
          })
          return false
        }**/
        this.$confirm('是否确认驳回所选数据？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(async() => {
          this.handleSetInterval(num)
          const res = await rejectBatchApprove({ 'jsonStr': JSON.stringify(removeId), 'comments': this.reason })
          this.handleClearInterval()
          if (res && res.success) {
            console.log(res, 111)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.dialogFormVisible = false
            this.reason = ''
            this.fetchData()
          }
          this.isLoading = false
        }).catch(err => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
          console.log(err)
        })
      }
    },
    selectInit(row, index) {
      if ((row.estStatus === '2' || row.estStatus === '3') || row.isEditable === '0') {
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
      if (!this.searchParam.params.targetYm) {
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
<style>
  .apply .newedit3 .el-dialog {
    width: 400px !important;
    height: 300px;
    min-width: 400px !important;
}
.search-light.newedit3 .dialog-drag .el-button.el-button--primary span{
  color:#fff;
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
