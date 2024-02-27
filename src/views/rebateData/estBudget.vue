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
                年度:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.year" size="small" type="year" value-format="yyyy" :clearable="false" :picker-options="pickerOptions0" />
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
      <!--<ul class="operation-box">
        <li class="operation-item" @click="downloadFile()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">下载模板</span>
        </li>
        <li class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text">上传</span>
        </li>
        <li class="operation-item-font">
          *上传和下载模板按钮只适用于提前下单货补和直供终端订单返利规则
        </li>
      </ul>-->
      <div class="table-bg-box search-list-table borderTable rebateledger-table table-two ">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="budgettable"
            :data="assignList"
            border
            height="100%"
            @expand-change="expandClick"
          >
            <el-table-column type="expand" width="20" align="center">
              <template slot-scope="props">
                <el-table
                  ref="table1"
                  class="table-expand"
                  :data="props.row.children"
                  border
                >
                  <el-table-column prop="rebateName" label="返利种类" width="170" />
                  <template v-for="(item,index) in headerMonth">
                    <el-table-column :key="index" :label="item.month" min-width="100" align="center">
                      <template>
                        <el-table-column label="预算" width="120" align="right">
                          <template v-if="item.value in scope.row.listData" slot-scope="scope">
                            {{ scope.row.listData[item.value].rebateBookMonthlyDetailTypeAmout.budget |numFormat(2) }}
                          </template>
                        </el-table-column>
                        <el-table-column label="预估" width="120" align="right">
                          <template v-if="item.value in scope.row.listData" slot-scope="scope">
                            {{ scope.row.listData[item.value].rebateBookMonthlyDetailTypeAmout.estimate|numFormat(2) }}
                          </template>
                        </el-table-column>
                        <el-table-column label="精准预估" width="120" align="right">
                          <template v-if="item.value in scope.row.listData" slot-scope="scope">
                            {{ scope.row.listData[item.value].rebateBookMonthlyDetailTypeAmout.accurateEst |numFormat(2) }}
                          </template>
                        </el-table-column>
                        <el-table-column label="实绩" width="120" align="right">
                          <template v-if="item.value in scope.row.listData" slot-scope="scope">
                            {{ scope.row.listData[item.value].rebateBookMonthlyDetailTypeAmout.perfomance |numFormat(2) }}
                          </template>
                        </el-table-column>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="attributes" label="代理商属性" width="100" align="center" /> -->
            <el-table-column prop="custName" label="代理商名称" width="120" align="left" />
            <template v-for="(item,index) in headerMonth">
              <el-table-column :key="index" :label="item.month" min-width="100" align="center">
                <template>
                  <el-table-column label="预算" width="120" align="right">
                    <template v-if="item.value in scope.row.listData" slot-scope="scope">
                      {{ scope.row.listData[item.value].rebateBookMonthlyTypeAmout.budget |numFormat(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="预估" width="120" align="right">
                    <template v-if="item.value in scope.row.listData" slot-scope="scope">
                      {{ scope.row.listData[item.value].rebateBookMonthlyTypeAmout.estimate|numFormat(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="精准预估" width="120" align="right">
                    <template v-if="item.value in scope.row.listData" slot-scope="scope">
                      {{ scope.row.listData[item.value].rebateBookMonthlyTypeAmout.accurateEst |numFormat(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="实绩" width="120" align="right">
                    <template v-if="item.value in scope.row.listData" slot-scope="scope">
                      {{ scope.row.listData[item.value].rebateBookMonthlyTypeAmout.perfomance |numFormat(2) }}
                    </template>
                  </el-table-column>
                </template>
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
    <el-dialog
      class="content-dialog-box  search-light rules down"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      title="下载"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      width="600"
    >
      <div class="pop_top">
        <div class="btn">
          <button class="down">
            下载总表
          </button>
        </div>
      </div>
      <div class="pop_bottom">
        <el-input
          v-model="downsearch"
          placeholder="请输入供应商名称"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <div class="btn">
          <button class="down">
            下载供应商详细表
          </button>
        </div>
      </div>
    </el-dialog>
    <upload :is-show="uploadDialog" action="/api/rebatebook/uploadTemplate" :other-params="otherParams" :accept="accept" :two="true" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>

<script>
import { search } from '@/mixins/search-params'
import { dateFormatFilter } from '@/mixins/date-format'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format'
import { names } from '@/mixins/names.js'
import { getList, getDetail, downloadList } from '@/api/rebaterules/estbudget.js'
import Upload from '@/components/UploadNew'
export default {
  components: {
    Upload
  },
  mixins: [search, dateFormatFilter, names, formValidator, numFormat],
  data() {
    return {
      isLoading: false,
      isShow: false,
      year: '2021',
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          year: String(new Date().getFullYear()),
          custName: ''
        }
      },
      downsearch: '',
      headerMonth: [{
        'month': '1月',
        'value': 's1'
      }, {
        'month': '2月',
        'value': 's2'
      }, {
        'month': '3月',
        'value': 's3'
      }, {
        'month': '4月',
        'value': 's4'
      }, {
        'month': '5月',
        'value': 's5'
      }, {
        'month': '6月',
        'value': 's6'
      }, {
        'month': '7月',
        'value': 's7'
      }, {
        'month': '8月',
        'value': 's8'
      }, {
        'month': '9月',
        'value': 's9'
      }, {
        'month': '10月',
        'value': 's10'
      }, {
        'month': '11月',
        'value': 's11'
      }, {
        'month': '12月',
        'value': 's12'
      }, {
        'month': 'Q1季度',
        'value': 's13'
      }, {
        'month': 'Q2季度',
        'value': 's14'
      }, {
        'month': 'Q3季度',
        'value': 's15'
      }, {
        'month': 'Q4季度',
        'value': 's16'
      }, {
        'month': '上半年',
        'value': 's17'
      }, {
        'month': '下半年',
        'value': 's18'
      }, {
        'month': '全年',
        'value': 's19'
      }],
      assignList: [],
      uploadDialog: false, // 上传文件dialog显示标志位
      uploadSalesDialog: false, // 上传文件dialog显示标志位（月度销售预估）
      accept: '.xlsx',
      otherParams: null,
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  async created() {
    this.fetchData()
  },
  methods: {
    download() {
      this.isShow = true
    },
    async fetchData() {
      this.isLoading = true
      // const res = await findYm(this.searchParam.params.year)
      // if (res && res.success) {
      //   this.headerMonth = res.datas.ymList
      // }
      this.searchList()
    },
    async searchList() {
      if (!this.searchParam.params.year) {
        this.$message({
          type: 'error',
          message: '查询条件中，年度不能为空！'
        })
        return false
      }
      const res = await getList(this.searchParam)
      if (res && res.success) {
        // console.log(res)
        const results = res.datas.searchResult.results
        this.assignList = JSON.parse(JSON.stringify(results))
        if (this.assignList.length > 0) {
          for (let s = 0; s < this.assignList.length; s++) {
            const list = {}
            const rebateBookMonthly = this.assignList[s].rebateBookMonthlyList
            console.log(rebateBookMonthly)
            for (let i = 0; i < rebateBookMonthly.length; i++) {
              // let listlie={}
              const ym = rebateBookMonthly[i].ym
              for (let y = 0; y < this.headerMonth.length; y++) {
                const code = this.headerMonth[y].value
                if (code === ym) {
                  list[ym] = rebateBookMonthly[i]
                }
              }
            }
            this.$set(this.assignList[s], 'listData', list)
            this.$set(this.assignList[s], 'children', [])
            // this.assignList[s]['listData'] = list
          }
        }

        this.searchParam.pageNo = res.datas.searchResult.pageNo
        this.searchParam.totalRecord = res.datas.searchResult.totalRecord
        this.isLoading = false
        console.log(this.assignList, 666)
      }
    },
    async expandClick(row, expandedRows) {
      const params = { 'custCode': row.custCode, 'year': row.year }
      console.log(params, 111)
      if (row.children.length <= 0) {
        this.isLoading = true
        const res = await getDetail(params)
        if (res && res.success) {
          const result = res.datas.searchResult || []

          const dataList = JSON.parse(JSON.stringify(result))
          console.log(dataList, 'specail666')
          if (dataList.length > 0) {
            for (let s = 0; s < dataList.length; s++) {
              const list = {}
              const rebateBookMonthly = dataList[s].rebateBookDetaiMonthlylDto
              console.log(rebateBookMonthly)
              for (let i = 0; i < rebateBookMonthly.length; i++) {
              // let listlie={}
                const ym = rebateBookMonthly[i].ym
                for (let y = 0; y < this.headerMonth.length; y++) {
                  const code = this.headerMonth[y].value
                  if (code === ym) {
                    list[ym] = rebateBookMonthly[i]
                  }
                }
              }
              this.$set(dataList[s], 'listData', list)
            // this.assignList[s]['listData'] = list
            }
          }

          result.length > 0 && result.splice(result.length - 1, 1)
          const i = this.assignList.findIndex(item => item.custCode === row.custCode)
          i > -1 && this.$set(this.assignList[i], 'children', dataList)
        }
        this.isLoading = false
      }

      console.log(this.assignList, '000')
    },
    handleUploadSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
      // console.log('操作成功！！！！！！！！')
    },
    async downloadFile() {
      this.isLoading = true
      await downloadList()
      this.isLoading = false
    }

  }
}
</script>
<style scoped>
</style>
