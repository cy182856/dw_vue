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
          <el-form-item prop="channel">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                渠道:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.channel" placeholder="请选择">
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
          <el-form-item prop="dealer">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                客户:
              </el-col>
              <el-col :span="16">
                <rel-func-select v-model="searchParam.params.dealer" rel-func="account" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="salesOfficeValue">
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
          <!-- <el-form-item prop="AAAAA">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                AAAAA:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.AAAAA" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="BBBBB">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                BBBBB:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.BBBBB" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="CCCCC">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                CCCCC:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.CCCCC" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="DDDDD">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                DDDDD:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.DDDDD" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="EEEEE">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                EEEEE:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.EEEEE" clearable />
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
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">本部预算</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">地区预算</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.export') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
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
            <el-table-column prop="salesOffice" :label="'Sales Office'" min-width="100" align="center" />
            <el-table-column prop="person" :label="'担当'" width="70" align="center" show-overflow-tooltip />
            <el-table-column prop="dealer" :label="'客户'" width="70" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <router-link :to="{path:'/bd/customer',query:{id:scope.row.id}}">
                  {{ scope.row.dealer }}
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
    <div class="exportDialog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-resource  fixed-search-btn-box"
        top="0"
        :visible.sync="exportSelectDilog"
        :title="$t('comm.exportFieldsSelect')"
        width="50%"
      >
        <export-fields-select func-div="account" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
    <div class="historyDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his :key="identiferNum" func-div="account" :identifer-num="identiferNum" />
      </el-drawer>
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
import { numberFormat } from '@/utils/util'
export default {
  name: 'BdList',
  components: { RelFuncSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      bdList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          budgetYear: new Date(),
          channel: '',
          salesOfficeValue: '',
          department: '',
          dealer: '',
          AAAAA: '',
          BBBBB: '',
          CCCCC: '',
          DDDDD: '',
          EEEEE: ''
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
      }],
      salesOffice: [{
        value: '1',
        label: 'EC&新零售部'
      }, {
        value: '2',
        label: '华东地区'
      }, {
        value: '3',
        label: '华南地区'
      }, {
        value: '4',
        label: '西南地区'
      }, {
        value: '5',
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
    this.fetchData()
  },
  methods: {
    async fetchData() {
      var salesOffices = ['EC&新零售部',
        '华北地区',
        '华东地区',
        '华南地区',
        '西南地区'
      ]
      var persons = ['张三',
        '李四',
        '王五',
        '赵六']
      var children = {}
      for (var i = 0; i < 10; i++) {
        var obj = {
          id: i,
          children: [],
          'salesOffice': salesOffices[i % 5],
          'person': persons[i % 4],
          'dealer': '客户' + (i + 1),
          'netsales_1': (10000 * Math.random()).toFixed(2),
          'spd_1': (10000 * Math.random()).toFixed(2),
          'spmk_1': (10000 * Math.random()).toFixed(2),
          'netsales_2': (10000 * Math.random()).toFixed(2),
          'spd_2': (10000 * Math.random()).toFixed(2),
          'spmk_2': (10000 * Math.random()).toFixed(2),
          'netsales_3': (10000 * Math.random()).toFixed(2),
          'spd_3': (10000 * Math.random()).toFixed(2),
          'spmk_3': (10000 * Math.random()).toFixed(2),
          'netsales_4': (10000 * Math.random()).toFixed(2),
          'spd_4': (10000 * Math.random()).toFixed(2),
          'spmk_4': (10000 * Math.random()).toFixed(2),
          'netsales_5': (10000 * Math.random()).toFixed(2),
          'spd_5': (10000 * Math.random()).toFixed(2),
          'spmk_5': (10000 * Math.random()).toFixed(2),
          'netsales_6': (10000 * Math.random()).toFixed(2),
          'spd_6': (10000 * Math.random()).toFixed(2),
          'spmk_6': (10000 * Math.random()).toFixed(2),
          'netsales_7': (10000 * Math.random()).toFixed(2),
          'spd_7': (10000 * Math.random()).toFixed(2),
          'spmk_7': (10000 * Math.random()).toFixed(2),
          'netsales_8': (10000 * Math.random()).toFixed(2),
          'spd_8': (10000 * Math.random()).toFixed(2),
          'spmk_8': (10000 * Math.random()).toFixed(2),
          'netsales_9': (10000 * Math.random()).toFixed(2),
          'spd_9': (10000 * Math.random()).toFixed(2),
          'spmk_9': (10000 * Math.random()).toFixed(2),
          'netsales_10': (10000 * Math.random()).toFixed(2),
          'spd_10': (10000 * Math.random()).toFixed(2),
          'spmk_10': (10000 * Math.random()).toFixed(2),
          'netsales_11': (10000 * Math.random()).toFixed(2),
          'spd_11': (10000 * Math.random()).toFixed(2),
          'spmk_11': (10000 * Math.random()).toFixed(2),
          'netsales_12': (10000 * Math.random()).toFixed(2),
          'spd_12': (10000 * Math.random()).toFixed(2),
          'spmk_12': (10000 * Math.random()).toFixed(2)
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

          obj.children.push(children)
        }
        obj.children[0].category1 = 'Gross Sales'
        obj.children[1].category1 = 'Discount'
        obj.children[2].category1 = 'Trade Disc'
        obj.children[3].category1 = 'Promo Disc'
        obj.children[4].category1 = 'Return'
        obj.children[5].category1 = 'Rebate'
        obj.children[6].category1 = 'Net Sales'
        obj.children[7].category1 = 'Sp-MK'
        obj.children[8].category1 = 'SP-TMK'
        obj.children[9].category1 = 'EC Ad.'
        obj.children[10].category1 = 'Net net Sales'
        obj.children[11].category1 = '加重平均'
        this.bdList.push(obj)
      }
    },
    handleCreate() {
      this.$router.push('/bd/edit')
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/bd/edit', query: { id: rowData.id, copy: true }})
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
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({ path: '/bd/edit', query: { id: rowData.id }})
        })
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
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (index > 4) {
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
