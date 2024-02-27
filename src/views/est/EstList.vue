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
        <!-- <li class="operation-item" @click="downloadFile">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
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
        </li> -->
        <li class="operation-item" @click="Preservation">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">保存</span>
        </li>
      </ul>
      <div class="table-bg-box">
        <div ref="tables" style="height: 100%;overflow-x: auto;">
          <!-- <hot-table ref="detailHot" class="table_info" :settings="detailSettings" /> -->
          <HotTable ref="testHot" :root="root" :settings="hotSettings" />
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
// import { HotTable } from '@handsontable/vue'
// import Handsontable from 'handsontable'
import { HotTable } from '@handsontable/vue'
import '../../../node_modules/handsontable/dist/handsontable.full.css'
import Handsontable from 'handsontable'
export default {
  name: 'OtherExpenses',
  components: { RelFuncSelect, HotTable },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      bigAreas: [{ value: 'KA', lable: '01' }],
      smallAreas: [{ value: 'KA', lable: '01' }],
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
      department: [{
        value: '1',
        label: '战略1课'
      }, {
        value: '2',
        label: '战略2课'
      }, {
        value: '3',
        label: '销售推进部'
      }, {
        value: '4',
        label: 'EC部'
      }],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          month: '',
          bigArea: '',
          smallArea: '',
          account: '',
          department: ''
        }
      },
      root: 'test-hot',
      hotSettings: {
        // data: [['sample', 'data']],
        data: [ // 数据可以是二维数组，也可以是数组对象
          // { 'accont': 'shimu' }
          // [false, '20080101', 10, 11, 12, 13, true, 1],

          // [false, '20090101', 20, 11, 14, 13, true],

          // [false, '20010101', 30, 15, 12, 13, true],

          // [false, '20010101', 32, 213, 21, 312, true],

          // [false, '20010201', 32, 213, 21, 312, true],

          // [false, '20010301', 32, 213, 21, 312, true],

          // [false, '20010401', 32, 213, 21, 312, true],

          // [false, '20010501', 32, 213, 21, 312, true],

          // [false, '20010601', 32, 213, 21, 312, true]

        ],
        // colHeaders: true,
        startRows: 11, // 行列范围

        startCols: 18,

        minRows: 5, // 最小行列

        minCols: 5,

        maxRows: 200, // 最大行列

        maxCols: 20,
        rowHeaders: true, // 行表头，可以使布尔值（行序号），可以使字符串（左侧行表头相同显示内容，可以解析html），也可以是数组（左侧行表头单独显示内容）。

        colHeaders: ['代理商名称', '年月', '0.5计提(固定)', '0.5计提(变动)', '季返', '年返', '不支付(固定)', '不支付(变动)', '第三方导购(固定)', '第三方导购(变动)', '试用装(固定)', '试用装(变动)', '窜货(固定)', '窜货(变动)', '赠品(固定)', '赠品(变动)', '货补(固定)', '货补(变动)'], // 自定义列表头or 布尔值
        minSpareCols: 2, // 列留白

        minSpareRows: 2, // 行留白
        // currentRowClassName: 'currentRow', //为选中行添加类名，可以更改样式
        // currentColClassName: 'currentCol',//为选中列添加类名
        autoWrapRow: true, // 自动换行
        contextMenu: {
          items: {
            'row_above': {
              name: '上方插入一行'
            },
            'row_below': {
              name: '下方插入一行'
            },
            'col_left': {
              name: '左方插入列'
            },
            'col_right': {
              name: '右方插入列'
            },
            'hsep1': '---------', // 提供分隔线
            'remove_row': {
              name: '删除行'
            },
            'remove_col': {
              name: '删除列'
            },
            'make_read_only': {
              name: '只读'
            },
            'borders': {
              name: '表格线'
            },
            'copy': {
              name: '复制'
            },
            'cut': {
              name: '剪切'
            },
            'commentsAddEdit': {
              name: '添加备注'
            },
            'commentsRemove': {
              name: '取消备注'
            },
            'freeze_column': {
              name: '固定列'
            },
            'unfreeze_column': {
              name: '取消列固定'
            },
            'hsep2': '---------'
          }
        },
        manualColumnFreeze: true, // 手动固定列  ?
        manualColumnMove: true, // 手动移动列
        manualRowMove: true, // 手动移动行
        manualColumnResize: true, // 手工更改列距
        manualRowResize: true, // 手动更改行距
        comments: true, // 添加注释  ?
        cell: [ // ???
          // { row: 1, col: 1, comment: { value: 'this is test' }}
        ],
        customBorders: [], // 添加边框
        columnSorting: true, // 排序
        stretchH: 'all', // 根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        fillHandle: true, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 2, // 固定左边列数
        fixedRowsTop: 2, // 固定上边列数
        mergeCells: [ // 合并
          // {row: 1, col: 1, rowspan: 3, colspan: 3},  //指定合并，从（1,1）开始行3列3合并成一格
          // {row: 3, col: 4, rowspan: 2, colspan: 2}
        ],
        columns: [ // 添加每一列的数据类型和一些配置
          // { type: 'checkbox' }, // 多选框
          {
            type: 'dropdown', // 下拉选择
            source: ['北京一商', '北京得欣', '天津生亿源', '陕西英瀚', '陕西兴耀隆', '长春佳业'],
            strict: false // 是否严格匹配
          },
          // {
          //   type: 'date', // 时间格式
          //   dateFormat: 'YYYY-MM',
          //   correctFormat: true,
          //   defaultDate: '19000101'
          // },
          {
            type: 'numeric',
            renderer: function(instance, td, row, col, prop, value, cellProperties) {
              var dateFormat = /^(\d{4})-(\d{2})$/
              Handsontable.dom.empty(td)
              var result = null
              if (value) {
                if (dateFormat.test(value)) {
                  Handsontable.dom.addClass(td, 'htRight')
                } else {
                  Handsontable.dom.addClass(td, 'htInvalid')
                }
                result = value
              }
              td.innerText = result
              // Handsontable.dom.addClass(td, 'htMiddle htCenter notread')
              return td
            }
          }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' } // 数值

        ]
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
    console.log(this.strategyList)
  },
  methods: {
    async fetchData() {
      this.strategyList = [{
        'id': 1,
        'name': '北京一商',
        'month': '2022-02',
        'jtyg': '16.0',
        'jtyb': '',
        'jfyg': '16.0',
        'nfyb': '',
        'bzfyg': '16.0',
        'bzfyb': '',
        'dgyg': '16.0',
        'dgyb': '',
        'syyg': '16.0',
        'syyb': '',
        'chyg': '16.0',
        'cyhb': '',
        'zpyg': '16.0',
        'zpyb': '',
        'hbyg': '16.0',
        'hbyb': ''
      },
      {
        'id': 2,
        'name': '北京得欣',
        'month': '2022-02',
        'jtyg': '16.0',
        'jtyb': '',
        'jfyg': '16.0',
        'nfyb': '',
        'bzfyg': '16.0',
        'bzfyb': '',
        'dgyg': '16.0',
        'dgyb': '',
        'syyg': '16.0',
        'syyb': '',
        'chyg': '16.0',
        'cyhb': '',
        'zpyg': '16.0',
        'zpyb': '',
        'hbyg': '16.0',
        'hbyb': ''
      },
      {
        'id': 3,
        'name': '天津生亿源',
        'month': '2022-02',
        'jtyg': '16.0',
        'jtyb': '',
        'jfyg': '16.0',
        'nfyb': '',
        'bzfyg': '16.0',
        'bzfyb': '',
        'dgyg': '16.0',
        'dgyb': '',
        'syyg': '16.0',
        'syyb': '',
        'chyg': '16.0',
        'cyhb': '',
        'zpyg': '16.0',
        'zpyb': '',
        'hbyg': '16.0',
        'hbyb': ''
      },
      {
        'id': 4,
        'name': '陕西英瀚',
        'month': '2022-02',
        'jtyg': '16.0',
        'jtyb': '',
        'jfyg': '16.0',
        'nfyb': '',
        'bzfyg': '16.0',
        'bzfyb': '',
        'dgyg': '16.0',
        'dgyb': '',
        'syyg': '16.0',
        'syyb': '',
        'chyg': '16.0',
        'cyhb': '',
        'zpyg': '16.0',
        'zpyb': '',
        'hbyg': '16.0',
        'hbyb': ''
      },
      {
        'id': 5,
        'name': '西安林卓一',
        'month': '2022-02',
        'jtyg': '16.0',
        'jtyb': '',
        'jfyg': '16.0',
        'nfyb': '',
        'bzfyg': '16.0',
        'bzfyb': '',
        'dgyg': '16.0',
        'dgyb': '',
        'syyg': '16.0',
        'syyb': '',
        'chyg': '16.0',
        'cyhb': '',
        'zpyg': '16.0',
        'zpyb': '',
        'hbyg': '16.0',
        'hbyb': ''
      },
      {
        'id': 6,
        'name': '山西恩可',
        'month': '2022-02',
        'jtyg': '16.0',
        'jtyb': '',
        'jfyg': '16.0',
        'nfyb': '',
        'bzfyg': '16.0',
        'bzfyb': '',
        'dgyg': '16.0',
        'dgyb': '',
        'syyg': '16.0',
        'syyb': '',
        'chyg': '16.0',
        'cyhb': '',
        'zpyg': '16.0',
        'zpyb': '',
        'hbyg': '16.0',
        'hbyb': ''
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
      a.download = '扣减费用.xlsx'
      a.style.display = 'none'
      a.href = process.env.VUE_APP_CAS_CLIENT_URL + '/static/其他费用.xlsx'
      document.body.appendChild(a)
      a.click()
    },
    Preservation() {
      console.log(this.hotSettings.data)
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
