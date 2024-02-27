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
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                渠道:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.channel" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in channel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="department">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.department" placeholder="请选择">
                  <el-option
                    v-for="item in department"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="agent">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                客户:
              </el-col>
              <el-col :span="16">
                <account-select v-model="searchParam.params.agent" />
              </el-col>
            </el-row>
          </el-form-item>
          <!-- <el-form-item prop="agent">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                客户:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.agent" clearable />
              </el-col>
            </el-row>
          </el-form-item> -->
          <!-- <el-form-item prop="aaaa">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                AAAA:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.aaaa" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="bbbb">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                BBBB:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.bbbb" clearable />
              </el-col>
            </el-row>
          </el-form-item> -->
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
        <li class="operation-item" @click="handleSalesDesign">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">销售设计</span>
        </li>
        <div v-if="!!currentBudgetType" style="position: absolute; right: 40px; color: #f00;">
          当前系统属于：
          {{ currentBudgetType | dictName('BudgetType') }}
        </div>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            v-if="currentBudgetType==='1'"
            ref="table"
            v-loading="isLoading"
            :data="bdList"
            show-summary
            :summary-method="getSummaries"
            stripe
            height="100%"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="55"
              :selectable="selectable"
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
                  <el-table-column prop="account" label="科目" min-width="150" />
                  <el-table-column label="上半年" align="center">
                    <el-table-column prop="price1" label="单价" min-width="60" align="right" />
                    <el-table-column prop="ratio1" label="比率" min-width="60" align="right" />
                    <el-table-column prop="number1" label="数量" min-width="60" align="right" />
                    <el-table-column prop="money1" label="金额" min-width="60" align="right" />
                  </el-table-column>
                  <el-table-column label="下半年" align="center">
                    <el-table-column prop="price1" label="单价" min-width="60" align="right" />
                    <el-table-column prop="ratio1" label="比率" min-width="60" align="right" />
                    <el-table-column prop="number1" label="数量" min-width="60" align="right" />
                    <el-table-column prop="money1" label="金额" min-width="60" align="right" />
                  </el-table-column>
                  <el-table-column label="全年" align="center">
                    <el-table-column prop="price1" label="单价" min-width="60" align="right" />
                    <el-table-column prop="ratio1" label="比率" min-width="60" align="right" />
                    <el-table-column prop="number1" label="数量" min-width="60" align="right" />
                    <el-table-column prop="money1" label="金额" min-width="60" align="right" />
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="salesOffice" :label="'Sales Office'" min-width="100" align="center" />
            <el-table-column prop="agent" :label="'客户'" min-width="90" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <router-link :to="{path:'/bd/customer'}">
                  {{ scope.row.agent }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="上半年" align="center">
              <el-table-column prop="firstHalfYearNetsales" label="Netsales" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.firstHalfYearNetsales| numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="firstHalfYearSpd" label="SPD" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.firstHalfYearSpd| numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="firstHalfYearSpmk" label="SP-MK" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.firstHalfYearSpmk| numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="下半年" align="center">
              <el-table-column prop="secondHalfYearNetsales" label="Netsales" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.secondHalfYearNetsales| numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="secondHalfYearSpd" label="SPD" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.secondHalfYearSpd| numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="secondHalfYearSpmk" label="SP-MK" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.secondHalfYearSpmk| numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="全年" align="center">
              <el-table-column prop="wholeYearNetsales" label="Netsales" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.wholeYearNetsales| numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="wholeYearSpd" label="SPD" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.wholeYearSpd| numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="wholeYearSpmk" label="SP-MK" min-width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.wholeYearSpmk| numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-table
            v-if="currentBudgetType==='2'"
            ref="table"
            v-loading="isLoading"
            :data="bdList"
            stripe
            border
            height="100%"
            show-summary
            :summary-method="getSummaries"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
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
                  <el-table-column prop="account" label="科目" min-width="150" />
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
            <el-table-column prop="salesOffice" :label="'Sales Office'" min-width="100" align="center" />
            <el-table-column prop="agent" :label="'客户'" min-width="70" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <router-link :to="{path:'/bd/customer'}">
                  {{ scope.row.agent }}
                </router-link>
              </template>
            </el-table-column>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import AccountSelect from '@/views/mrk/account/components/AccountSelect.vue'
import { numberFormat } from '@/utils/util'
import { getEntryList } from '@/api/admin/dict-api.js'
export default {
  name: 'BdList',
  components: { AccountSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      selectUserDialog: false,
      bdList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      currentBudgetType: '',
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          // identiferNum: '',
          // quoteName: '',
          // accountNum: '',
          // accountName: '',
          // contactName: '',
          // quoteTerm: '',
          // assignedUser: '',
          // assignedOrg: '',
          budgetYear: new Date()
        }
      },
      channel: [{
        value: '1',
        label: '直销'
      }, {
        value: '2',
        label: 'DB'
      }, {
        value: '3',
        label: 'EC'
      }],
      department: [{
        value: '2',
        label: 'KA部'
      }, {
        value: '3',
        label: '日系客户部'
      }, {
        value: '1',
        label: 'EC&新零售部'
      }, {
        value: '4',
        label: '华东地区'
      }, {
        value: '5',
        label: '华南地区'
      }, {
        value: '6',
        label: '西南地区'
      }, {
        value: '7',
        label: '华北地区'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    // this.currentBudgetType = getDictName('CurrentBudgetType', 'type')

    this.fetchData()
  },
  methods: {
    async fetchData() {
      // const res = await getList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.quoteList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      getEntryList({ dictTypeId: 'CurrentBudgetType' }).then(res => {
        this.currentBudgetType = res.datas.entryList[0].dictName
      })
      var list = []
      var children = []
      var salesOffice = ['EC&新零售部', '华东地区', '华南地区', '华北地区', '西南地区']
      var accounts = ['Gross Sales',
        'Discount',
        'Trade Disc',
        'promo Disc',
        'Return',
        'Rebate',
        'Net Sales',
        'SP-MK',
        'SP-TMK',
        'EC Ad.',
        'Net net Sales',
        '加重平均']
      // d.children[0].category1 = 'Gross Sales'
      // d.children[1].category1 = 'Discount'
      // d.children[2].category1 = 'Trade Disc'
      // d.children[3].category1 = 'Promo Disc'
      // d.children[4].category1 = 'Return'
      // d.children[5].category1 = 'Rebate'
      // d.children[6].category1 = 'Net Sales'
      // d.children[7].category1 = 'Sp-MK'
      // d.children[8].category1 = 'SP-TMK'
      // d.children[9].category1 = 'EC Ad.'
      // d.children[10].category1 = 'Net net Sales'
      // d.children[11].category1 = '加重平均'
      for (var i = 1; i < 11; i++) {
        var d = {
          'id': i,
          salesOffice: salesOffice[i % 5],
          agent: '客户' + i,
          firstHalfYearNetsales: (10000 * Math.random()).toFixed(2),
          firstHalfYearSpd: (10000 * Math.random()).toFixed(2),
          firstHalfYearSpmk: (10000 * Math.random()).toFixed(2),
          secondHalfYearNetsales: (10000 * Math.random()).toFixed(2),
          secondHalfYearSpd: (10000 * Math.random()).toFixed(2),
          secondHalfYearSpmk: (10000 * Math.random()).toFixed(2),
          wholeYearNetsales: (10000 * Math.random()).toFixed(2),
          wholeYearSpd: (10000 * Math.random()).toFixed(2),
          wholeYearSpmk: (10000 * Math.random()).toFixed(2),
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
          spmk_12: (10000 * Math.random()).toFixed(2),
          children: []
        }
        for (var j = 1; j < 13; j++) {
          if (j === 1) {
            children = {
              account: accounts[j - 1],
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
              account: accounts[j - 1],
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
              account: accounts[j - 1],
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
              account: accounts[j - 1],
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
              account: accounts[j - 1],
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
        list.push(d)
      }
      this.bdList = list
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/bd/makeCreate')
    },
    handleSalesDesign() {
      this.$router.push('/bd/design')
    },
    handleCopy() {
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
          this.$router.push({ path: '/bd/customer', query: { id: rowData.id }})
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    batchDelete() {

    },
    selectable(row, index) {
      if (row.agent) {
        return true
      } else {
        return false
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
          return
        }

        const values = data.map(item => Number(item[column.property]))
        if (index > 3) {
          sums[index] = numberFormat(values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0), 2)
          sums[index]
        } else {
          sums[index] = '--'
        }
      })
      return sums
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
