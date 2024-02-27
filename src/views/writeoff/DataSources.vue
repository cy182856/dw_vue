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
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.month" size="small" type="month" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                活动名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.name" clearable />
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
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">删除</span>
        </li>
        <li class="operation-item" @click="editChange">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">特别设定</span>
        </li>
        <li class="operation-item" @click="downloadFile">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">下载</span>
        </li>
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">上传</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable inputborder">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="strategyList"
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
            <!-- <el-table-column label="年度" min-width="120">
              <template slot-scope="scope">
                <div>
                  <el-date-picker v-model="scope.row.year" size="small" type="month" :clearable="false" :disabled="scope.row.yeardis" />
                </div>
              </template>
            </el-table-column> -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="input_box">
                  <div class="flex4">
                    <div class="title">
                      代理商
                    </div>
                    <div class="input">
                      <rel-func-select v-model="scope.row.account2" :rel-func="'account'" />
                    </div>
                  </div>
                  <div class="flex4">
                    <div class="title">
                      活动期间
                    </div>
                    <div class="input">
                      <el-input v-model="scope.row.dates2" clearable />
                    </div>
                  </div>
                  <div class="flex4">
                    <div class="title">
                      数据来源
                    </div>
                    <div class="input">
                      <el-select v-model="scope.row.source2" placeholder="请选择">
                        <el-option
                          v-for="item in sources"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </div>
                  <div class="flex4">
                    <el-button type="primary" size="small">
                      保存
                    </el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :prop="'year'" :label="'年月'" min-width="120" align="center" />
            <el-table-column :prop="'name'" :label="'活动名称'" min-width="240" align="center" />
            <el-table-column :prop="'account'" :label="'代理商'" min-width="140" align="center" />
            <el-table-column :prop="'dates'" :label="'活动期间'" min-width="140" align="center" />
            <el-table-column :prop="'source'" :label="'数据来源'" min-width="140" align="center" />
            <!-- <el-table-column label="代理商" min-width="170">
              <template slot-scope="scope">
                <div @dblclick="nameChange(scope.$index)">
                  <rel-func-select v-model="scope.row.dname" :rel-func="'account'" :disabled="scope.row.namedis" />
                </div>
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="费率上限" min-width="170">
              <template slot-scope="scope">
                <div @dblclick="rateChange(scope.$index)">
                  <el-input v-model="scope.row.rate" clearable :disabled="scope.row.ratedis" />
                </div>
              </template>
            </el-table-column> -->
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
  name: 'DataSources',
  components: { RelFuncSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      strategyList: [],
      sources: [
        { value: '订单数据', lable: '1' },
        { value: '经销商出库数据', lable: '2' },
        { value: 'POS数据', lable: '3' }
      ],
      multipleSelection: [],
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
        'id': 1,
        'year': '2020-04',
        'name': '精灵买三赠一',
        'account': 'BS',
        'dates': '1-15',
        'source': '订单数据',
        'account2': 'BS',
        'dates2': '1-15',
        'source2': '订单数据'
      },
      {
        'id': 2,
        'year': '2020-04',
        'name': '精灵买三赠一',
        'account': 'KA',
        'dates': '1-15',
        'source': '订单数据',
        'account2': 'KA',
        'dates2': '1-15',
        'source2': '订单数据'
      },
      {
        'id': 3,
        'year': '2020-04',
        'name': '光羽买三赠一',
        'account': 'BS',
        'dates': '20-30',
        'source': '经销商出库数据',
        'account2': 'KA',
        'dates2': '1-15',
        'source2': '经销商出库数据'
      },
      {
        'id': 4,
        'year': '2020-04',
        'name': '光羽买三赠一',
        'account': 'KA',
        'dates': '20-30',
        'source': '经销商出库数据',
        'account2': 'KA',
        'dates2': '20-30',
        'source2': '经销商出库数据'
      },
      {
        'id': 5,
        'year': '2020-04',
        'name': '天使买三赠一',
        'account': 'BS',
        'dates': '1-15',
        'source': 'POS数据',
        'account2': 'KA',
        'dates2': '20-30',
        'source2': 'POS数据'
      },
      {
        'id': 6,
        'year': '2020-04',
        'name': '天使买三赠一',
        'account': 'KA',
        'dates': '1-15',
        'source': 'POS数据',
        'account2': 'KA',
        'dates2': '1-15',
        'source2': 'POS数据'
      },
      {
        'id': 7,
        'year': '2020-04',
        'name': '天使买三赠一',
        'account': '北京一商',
        'dates': '1-20',
        'source': '订单数据',
        'account2': 'KA',
        'dates2': '1-15',
        'source2': '订单数据'
      }
      ]
    },
    rateChange(index) {
      this.strategyList[index]['ratedis'] = false
    },
    nameChange(index) {
      this.strategyList[index]['namedis'] = false
    },
    preservation() {
      var jsons = this.strategyList
      var jsona = JSON.stringify(jsons)
      var jsonb = jsona.replace(/false/g, 'true')
      var jsonc = JSON.parse(jsonb)
      console.log(jsonc)
      this.strategyList = jsonc
    },
    newlyBuild() {
      this.strategyList.push(
        {
          'year': '',
          'dname': '',
          'rate': '',
          'yeardis': false,
          'namedis': false,
          'ratedis': false
        }
      )
    },
    editChange() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          console.log(rowData)
          // this.$router.push({
          //   path: '/writeoff/edit',
          //   query: { id: rowData.id }
          // })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
      // this.$router.push('/promotion/strategytwo/detail')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    downloadFile() {
      const a = document.createElement('a')
      a.download = '活动实际设定.xlsx'
      a.style.display = 'none'
      a.href = process.env.VUE_APP_CAS_CLIENT_URL + '/static/活动实际设定.xlsx'
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
.inputborder td input[disabled="disabled"]{
  border:none;
}
/* .l-table__expand-column{
  display: none !important;
} */
</style>
