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
                年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.month" size="small" :placeholder="'请选择'" type="month" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                费目:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.feeType" placeholder="请选择">
                  <el-option
                    v-for="item in feeTypes"
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
                大区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.bigArea" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                小区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.smallArea" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                品类:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.category" placeholder="请选择">
                  <el-option
                    v-for="item in categorys"
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
                代理商:
              </el-col>
              <el-col :span="16">
                <rel-func-select v-model="searchParam.params.account" :rel-func="'account'" />
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
        <li class="operation-item" @click="downloadFile">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">下载</span>
        </li>
        <!-- <li class="operation-item" @click="downloadFileNum">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">下载(数量调整)</span>
        </li> -->
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">上传</span>
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
            <el-table-column :prop="'name'" :label="'费目'" min-width="120" align="center" />
            <el-table-column :prop="'bigArea'" :label="'大区'" min-width="120" align="center" />
            <el-table-column :prop="'smallArea'" :label="'小区'" min-width="120" align="center" />
            <el-table-column :prop="'category'" :label="'品类'" min-width="120" align="center" />
            <el-table-column :prop="'agent'" :label="'代理商'" min-width="120" align="center" />
            <el-table-column :label="'2021年2月'" min-width="120" align="center">
              <el-table-column :prop="'ysfee'" :label="'预算'" align="center" />
              <el-table-column :prop="'ysfee'" :label="'预估'" align="center" />
              <el-table-column :prop="'ysfee'" :label="'精准预估'" align="center" />
              <el-table-column :prop="'ysfee2'" :label="'实际'" align="center" />
            </el-table-column>
            <el-table-column :label="'所在季度（2021年1-3月）'" min-width="120" align="center">
              <el-table-column :prop="'ygfee'" :label="'预算'" align="center" />
              <el-table-column :prop="'ygfee'" :label="'预估'" align="center" />
              <el-table-column :prop="'ygfee'" :label="'预实绩'" align="center" />
            </el-table-column>
            <el-table-column :label="'所在年度'" min-width="120" align="center">
              <el-table-column :prop="'tofee'" :label="'预算'" align="center" />
              <el-table-column :prop="'tofee'" :label="'预估'" align="center" />
              <el-table-column :prop="'tofee'" :label="'预实绩'" align="center" />
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
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'WriteoffAdjusts',
  components: { RelFuncSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      feeTypes: [{ value: '固定费', lable: '1' }, { value: '变动费', lable: '2' }],
      bigAreas: [
        { value: '华北', lable: '1' },
        { value: '华南', lable: '2' },
        { value: 'KA', lable: '3' },
        { value: '江苏', lable: '4' },
        { value: '山东', lable: '5' },
        { value: '华东', lable: '6' },
        { value: 'EC', lable: '7' },
        { value: '成人护理', lable: '8' }
      ],
      smallAreas: [{ value: 'KA', lable: '1' }],
      categorys: [{ value: '纸巾', lable: '1' }],
      multipleSelection: [],
      strategyList: [],
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      exportSelectDilog: false,
      // selectDepartmentDialog: false,
      historyDialog: false,
      cancelDialog: false,
      cancelReason: '',
      tax1: true,
      tax2: true,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          month: '',
          feeType: '',
          bigArea: '',
          smallArea: '',
          category: '',
          account: ''
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
    async fetchData() {
      this.strategyList = [{
        'id': 1,
        'name': '固定费（导购）',
        'bigArea': 'KA',
        'smallArea': 'KA',
        'category': '纸巾',
        'agent': '上海麦田',
        'ysfee': '1000',
        'ysfee2': '1200',
        'ygfee': '2000',
        'tofee': '3000',
        'cyfee': '200'
      },
      {
        'id': 2,
        'name': '固定费（导购）',
        'bigArea': 'KA',
        'smallArea': 'KA',
        'category': '纸巾',
        'agent': '上海麦田',
        'ysfee': '3000',
        'ysfee2': '2800',
        'ygfee': '4000',
        'tofee': '5000',
        'cyfee': '-200'
      },
      {
        'id': 3,
        'name': '固定费（导购）',
        'bigArea': 'KA',
        'smallArea': 'KA',
        'category': '纸巾',
        'agent': '南京欣荣',
        'ysfee': '1400',
        'ysfee2': '1500',
        'ygfee': '2400',
        'tofee': '3400',
        'cyfee': '100'
      },
      {
        'id': 4,
        'name': '固定费（导购）',
        'bigArea': 'KA',
        'smallArea': 'KA',
        'category': '纸巾',
        'agent': '南京市侠客',
        'ysfee': '3000',
        'ysfee2': '2900',
        'ygfee': '4000',
        'tofee': '5000',
        'cyfee': '-100'
      }
      // {
      //   'id': 5,
      //   'name': '变动费（导购）',
      //   'bigArea': 'KA',
      //   'smallArea': 'KA',
      //   'category': '纸巾',
      //   'agent': '南京欣荣',
      //   'ysfee': '1400',
      //   'ysfee2': '1500',
      //   'ygfee': '2400',
      //   'tofee': '3400',
      //   'cyfee': '100'
      // },
      // {
      //   'id': 6,
      //   'name': '变动费（导购）',
      //   'bigArea': 'KA',
      //   'smallArea': 'KA',
      //   'category': '纸巾',
      //   'agent': '南京市侠客',
      //   'ysfee': '3000',
      //   'ysfee2': '2900',
      //   'ygfee': '4000',
      //   'tofee': '5000',
      //   'cyfee': '-100'
      // }
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
    handleCreate() {
      this.$router.push('/promotion/estClassified/edit')
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
            path: '/fee/promotion/motionEdit',
            query: { id: rowData.id }
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
    handleBack() {
      this.$router.go(-1)
    },
    downloadFile() {
      const a = document.createElement('a')
      a.download = '定额调整(核销).xlsx'
      a.style.display = 'none'
      a.href = process.env.VUE_APP_CAS_CLIENT_URL + '/static/定额调整(核销).xlsx'
      document.body.appendChild(a)
      a.click()
    },
    downloadFileNum() {
      const a = document.createElement('a')
      a.download = '费用数量调整.xlsx'
      a.style.display = 'none'
      a.href = process.env.VUE_APP_CAS_CLIENT_URL + '/static/费用数量调整.xlsx'
      document.body.appendChild(a)
      a.click()
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
