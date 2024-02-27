<template>
  <!-- 编辑画面 -->
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        查询条件
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年月:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.ym" size="small" type="month" :clearable="false" :picker-options="pickerOptions0" value-format="yyyy-MM" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custName" placeholder="请输入名称" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>重置</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>查询</p>
          <span
            class="circle-larger-btn btn-light-color bluebg"
          ><i
            class="iconfont iconsousuo"
          /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <div class="operation-box pertop">
        <span>单位：元 &nbsp;&nbsp;*计算返利用实绩</span>
        <span>* 合同费差异 = 合同费上月结转 + 合同费计提 - 当月实绩小计 - 结转至下月</span>
      </div>
      <ul class="operation-box">
        <li class="operation-item" @click="preActualDownload">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">合同返利预实绩下载</span>
        </li>
        <li class="operation-item" @click="preActualUpload=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text">合同返利预实绩上传</span>
        </li>
      </ul> 
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="per-table"
            :data="assignList"
            border
            height="100%"
          >
            <!--<el-table-column prop="custName" label="代理商名称" min-width="100" align="left" />
            <el-table-column prop="jtAmoutDto.actSumAmount" label="订单实绩" align="right">
              <template slot-scope="scope">
                {{ scope.row.jtAmoutDto.actSumAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="forwardInAmount" label="合同费上月转结" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.forwardInAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="actService" label="手续费实绩" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.actService |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="serviceRate" label="手续费费率" min-width="100" align="right">
              <template v-if="scope.row.serviceRate!==null" slot-scope="scope">
                {{ scope.row.serviceRate |numFormat(2) }} %
              </template>
            </el-table-column>
            <el-table-column prop="contractFeeJt" label="合同费计提" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.contractFeeJt |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="contractFeeJtRate" label="合同计提率" min-width="100" align="right">
              <template v-if="scope.row.contractFeeJtRate!==null" slot-scope="scope">
                {{ scope.row.contractFeeJtRate |numFormat(2) }} %
              </template>
            </el-table-column>
            <el-table-column prop="ruleAmoutDto.ygPerfomance" label="预估准确性（实绩）" min-width="160" align="right">
              <template slot-scope="scope">
                {{ scope.row.ruleAmoutDto.ygPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="ruleAmoutDto.tqPerfomance" label="提前下单货补（实绩）" min-width="160" align="right">
              <template slot-scope="scope">
                {{ scope.row.ruleAmoutDto.tqPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="ruleAmoutDto.qtPerfomance" label="订单返利（实绩）" min-width="140" align="right">
              <template slot-scope="scope">
                {{ scope.row.ruleAmoutDto.qtPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="show1" key="1" prop="ruleAmoutDto.jsPerfomance" label="季度返利（实绩）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.ruleAmoutDto.jsPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="show2" key="2" prop="ruleAmoutDto.bnPerfomance" label="半年返利（实绩）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.ruleAmoutDto.bnPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="show3" key="3" prop="ruleAmoutDto.ndPerfomance" label="年度返利（实绩）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.ruleAmoutDto.ndPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="show4" key="4" prop="ruleAmoutDto.wlPerfomance" label="物流返利（实绩）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.ruleAmoutDto.wlPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="rebateAmount" label="当月实绩小计" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.rebateAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="!show1" key="5" prop="jtAmoutDto.jdJtAmount" label="季度返利（当月计提）" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.jtAmoutDto.jdJtAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="!show2" key="6" prop="jtAmoutDto.bnJtAmount" label="半年返利（当月计提）" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.jtAmoutDto.bnJtAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="!show3" key="7" prop="jtAmoutDto.ndJtAmount" label="年度返利（当月计提）" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.jtAmoutDto.ndJtAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="!show4" key="8" prop="jtAmoutDto.wlJtAmount" label="物流补贴返利（当月计提）" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.jtAmoutDto.wlJtAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column v-if="show5" key="9" prop="monthJtSum" label="当月计提（小计）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.monthJtSum |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="contractCostVariance" label="合同费差异" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.contractCostVariance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="forwardOutAmount" label="转结至下月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.forwardOutAmount |numFormat(2) }}
              </template>
            </el-table-column>
            -->
            <el-table-column prop="custName" label="代理商名称" min-width="100" align="left" />
            <el-table-column prop="orderAmount" label="订单实绩" align="right">
              <template slot-scope="scope">
                {{ scope.row.orderAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="contractLastMonthCarryOver" label="合同费上月转结" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.contractLastMonthCarryOver |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="sxAmount" label="手续费实绩" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.sxAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="serviceRate" label="手续费费率" min-width="100" align="right">
              <template v-if="scope.row.serviceRate!==null" slot-scope="scope">
                {{ scope.row.serviceRate |numFormat(2) }} %
              </template>
            </el-table-column>
            <el-table-column prop="contractJt" label="合同费计提" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.contractJt |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="contractFeeJtRate" label="合同计提率" min-width="100" align="right">
              <template v-if="scope.row.contractFeeJtRate!==null" slot-scope="scope">
                {{ scope.row.contractFeeJtRate |numFormat(2) }} %
              </template>
            </el-table-column>
            <el-table-column prop="ygAmount" label="预估准确性（实绩）" min-width="160" align="right">
              <template slot-scope="scope">
                {{ scope.row.ygAmount |numFormat(2) }}
              </template>
            </el-table-column>          
            <el-table-column prop="tqAmount" label="提前下单货补（实绩）" min-width="160" align="right">
              <template slot-scope="scope">
                {{ scope.row.tqAmount |numFormat(2) }}
              </template>
            </el-table-column>          
            <el-table-column prop="qtAmount" label="订单返利（实绩）" min-width="140" align="right">
              <template slot-scope="scope">
                {{ scope.row.qtAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="jdAmount" label="季度返利（实绩）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.jdAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="bnAmount" label="半年返利（实绩）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.bnAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="ndAmount" label="年度返利（实绩）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.ndAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="wlAmount" label="物流返利（实绩）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.wlAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="rebateAmount" label="当月实绩小计" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.rebateAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="jdJt" label="季度返利（当月计提）" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.jdJt |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="bnJt" label="半年返利（当月计提）" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.bnJt |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="ndJt" label="年度返利（当月计提）" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.ndJt |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="wlJt" label="物流补贴返利（当月计提）" min-width="170" align="right">
              <template slot-scope="scope">
                {{ scope.row.wlJt |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="monthJtSum" label="当月计提（小计）" min-width="150" align="right">
              <template slot-scope="scope">
                {{ scope.row.monthJtSum |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="contractCostVariance" label="合同费差异" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.contractCostVariance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="nextMonthCarryOver" label="转结至下月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.nextMonthCarryOver |numFormat(2) }}
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
      <upload :is-show="preActualUpload" action="/api/rebatebook/import" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="preActualUpload=false" />
  </div>
</template>

<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList, preActualDownload } from '@/api/rebaterules/perper.js'
import Upload from '@/components/UploadNew'
export default {
  components: {
    Upload
  },
  mixins: [numFormat, search, names, formValidator],
  data() {
    return {
      isLoading: false,
      isShow: false,
      year: '2021',
      preActualUpload: false,
      multipleSelection: [],
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          ym: String(new Date().getFullYear()) + '-' + this.doHandleMonth(),
          custName: ''
        }
      },
      assignList: [],
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      },
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      console.log('1a2b')
      this.searchList()
    },
    async searchList() {
      if (this.searchParam.params.ym === '') {
        this.$message({
          type: 'error',
          message: '查询条件中，年月不能为空！'
        })
        return false
      }
      this.isLoading = true
      this.show1 = false
      this.show2 = false
      this.show3 = false
      this.show4 = false
      this.show5 = true
      const lmonth = Number(this.searchParam.params.ym.split('-')[1])

      if (lmonth === 3) {
        this.show1 = true
      } else if (lmonth === 6) {
        this.show1 = true
        this.show2 = true
        this.show4 = true
      } else if (lmonth === 9) {
        this.show1 = true
      } else if (lmonth === 12) {
        this.show1 = true
        this.show2 = true
        this.show3 = true
        this.show4 = true
        this.show5 = false
      }

      console.log(lmonth)
      const res = await getList(this.searchParam)
      if (res && res.success) {
        // console.log(res)
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.assignList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
        this.isLoading = false
      }
      this.tableDolayout(this.$refs['table'])
    }, 
    preActualDownload() {
      const ym = this.searchParam.params.ym
      const downloadParam = {
        ym : ym
      }
      preActualDownload(downloadParam)
    },
     upload() {
      this.preActualUpload = true
    },
     handleUploadSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
      // console.log('操作成功！！！！！！！！')
    },
    doHandleMonth() {
      var myDate = new Date()
      var tMonth = myDate.getMonth()

      var m = tMonth
      if (m.toString().length === 1) {
        m = '0' + m
      }
      return m
    }

  }
}
</script>
