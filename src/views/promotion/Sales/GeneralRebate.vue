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
                大区:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.bigArea" placeholder="请选择">
                  <el-option
                    v-for="item in bigAreas"
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
                小区:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.smallArea" placeholder="请选择">
                  <el-option
                    v-for="item in smallAreas"
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
                <el-input v-model="searchParam.params.account" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年度:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.year" size="small" type="year" :clearable="false" />
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
        <li class="operation-item">
          <el-upload
            class="upload-demo"
            action="#"

            multiple
            :limit="1"
          >
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
            <span class="operation-text" style="display:inline-block;">上传返利系数</span>
          </el-upload>
        </li>
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">下载</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="strategyList"
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <!-- <el-table-column :prop="'dcode'" :label="'代理商编号'" min-width="120" align="center" /> -->
            <el-table-column :prop="'dname'" :label="'代理商名称'" min-width="120" align="center" />
            <!-- <el-table-column :prop="'zcode'" :label="'终端编号'" min-width="120" align="center" /> -->
            <el-table-column :prop="'zname'" :label="'终端名称'" min-width="160" align="center" />
            <el-table-column :prop="'monthcoe'" :label="'月度返利系数'" min-width="120" align="center" />
            <el-table-column :prop="'yearcoe'" :label="'年度返利系数'" min-width="120" align="center" />
            <el-table-column :prop="'from'" :label="'年度'" min-width="160" align="center" />
            <!-- <el-table-column :prop="'to'" :label="'返利系数有效期间To'" min-width="160" align="center" /> -->
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
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'GeneralRebate',
  // components: { RelFuncSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      strategyList: [],
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          year: new Date(),
          bigArea: '',
          smallArea: '',
          account: ''
        }
      },
      bigAreas: [],
      smallAreas: []
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
        'dcode': '0001-1',
        'dname': '南京维福',
        'zcode': '0001-1-1',
        'zname': '苏宁红孩子',
        'monthcoe': '13.0%',
        'yearcoe': '4.0%',
        'from': '2021',
        'to': '2021/12/30'
      },
      {
        'dcode': '0001-2',
        'dname': '南京维福',
        'zcode': '0001-1-2',
        'zname': '苏果',
        'monthcoe': '13.0%',
        'yearcoe': '4.0%',
        'from': '2021',
        'to': '2021/12/30'
      },
      {
        'dcode': '0001-3',
        'dname': '南通万芳',
        'zcode': '0001-1-3',
        'zname': '金晶',
        'monthcoe': '13.0%',
        'yearcoe': '4.0%',
        'from': '2021',
        'to': '2021/12/30'
      },
      {
        'dcode': '0001-4',
        'dname': '南通万芳',
        'zcode': '0001-1-4',
        'zname': '点点母婴',
        'monthcoe': '13.0%',
        'yearcoe': '4.0%',
        'from': '2021',
        'to': '2021/12/30'
      },
      {
        'dcode': '0001-5',
        'dname': '南通万芳',
        'zcode': '0001-1-6',
        'zname': '盐城市宜婴坊母婴店',
        'monthcoe': '13.0%',
        'yearcoe': '4.0%',
        'from': '2021',
        'to': '2021/12/30'
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
    handleCreate() {
      this.$router.push('/promotion/strategytwo/edit')
    },
    strategyEdit() {
      this.$router.push('/promotion/strategytwo/detail')
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
