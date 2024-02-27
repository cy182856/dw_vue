<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">明细调整</span>
          <el-table
            ref="table"
            :data="writeoff.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <!-- <el-table-column
              :label="$t('comm.operation')"
              align="center"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '1')" />
              </template>
            </el-table-column> -->
            <el-table-column prop="month" label="年月" min-width="170" align="center" />
            <el-table-column prop="account" label="代理商" min-width="170" align="center" />
            <el-table-column prop="fee2" label="二级费目" min-width="170" align="center" />
            <el-table-column prop="category" label="品类" min-width="170" align="center" />
            <el-table-column prop="data1" label="促销费预算金额" min-width="170" align="center" />
            <el-table-column prop="data2" label="预算费比" min-width="170" align="center" />
            <el-table-column prop="data3" label="促销费预估金额" min-width="170" align="center" />
            <el-table-column prop="data4" label="费比" min-width="170" align="center" />
            <el-table-column prop="data5" label="促销费精准预估金额" min-width="170" align="center" />
            <el-table-column prop="data6" label="精准预估费比" min-width="170" align="center" />
            <el-table-column prop="data7" label="调整后金额" min-width="170" align="center" />
            <el-table-column prop="data8" label="费比" min-width="170" align="center" />
          </el-table>

          <div v-if="id==='7'||id==='8'||id==='9'" style="margin-bottom:60px;">
            <div class="input_box">
              <div class="flex3">
                <div class="title">
                  活动名称
                </div>
                <div class="input">
                  <el-input v-model="writeoff.name" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  选择产品
                </div>
                <div class="input">
                  <el-input v-model="writeoff.product" @focus="customersDialogShow=true" />
                </div>
              </div>
            </div>
            <div class="input_box">
              <div class="flex4">
                <el-radio v-model="writeoff.radio1" label="1">
                  定率
                </el-radio>
                <el-radio v-model="writeoff.radio1" label="2">
                  现金补贴
                </el-radio>
              </div>
              <div class="flex4">
                <el-radio v-model="writeoff.radio2" label="1">
                  按月
                </el-radio>
                <el-radio v-model="writeoff.radio2" label="2">
                  按日
                </el-radio>
              </div>
              <div class="flex4">
                <el-radio v-model="writeoff.radio3" label="1">
                  大王销售
                </el-radio>
                <el-radio v-model="writeoff.radio3" label="2">
                  代理商销售
                </el-radio>
              </div>
              <div class="flex4">
                <el-radio v-model="writeoff.radio8" label="3">
                  POS
                </el-radio>
              </div>
            </div>
            <div class="add_table_row titlemin">
              <el-button class="editbtn" size="mini">
                保存
              </el-button>
            </div>
            <div ref="tables" style="height: 100%;overflow-x: auto;">
              <!-- <hot-table ref="detailHot" class="table_info" :settings="detailSettings" /> -->
              <HotTable ref="testHot" :root="root1" :settings="hotSettings" />
            </div>
          </div>

          <div v-if="id==='12'" style="margin-bottom:60px;">
            <div class="input_box">
              <div class="flex3">
                <div class="title">
                  活动名称
                </div>
                <div class="input">
                  <el-input v-model="writeoff.name" />
                </div>
              </div>
              <div class="flex3">
                <div class="title">
                  选择产品
                </div>
                <div class="input">
                  <el-input v-model="writeoff.product" @focus="customersDialogShow=true" />
                </div>
              </div>
            </div>
            <div class="input_box">
              <div class="flex4">
                <el-radio v-model="writeoff.radio4" label="1">
                  定率
                </el-radio>
                <el-radio v-model="writeoff.radio4" label="2">
                  现金补贴
                </el-radio>
              </div>
              <div class="flex4">
                <el-radio v-model="writeoff.radio5" label="1">
                  KA/BS
                </el-radio>
              </div>
              <div class="flex4">
                <el-radio v-model="writeoff.radio6" label="1">
                  大王销售
                </el-radio>
                <el-radio v-model="writeoff.radio6" label="2">
                  代理商销售
                </el-radio>
              </div>
              <div class="flex4">
                <el-radio v-model="writeoff.radio7" label="3">
                  POS
                </el-radio>
              </div>
            </div>
            <div class="add_table_row titlemin">
              <el-button class="editbtn" size="mini">
                保存
              </el-button>
            </div>
            <div ref="tables" style="height: 100%;overflow-x: auto;">
              <!-- <hot-table ref="detailHot" class="table_info" :settings="detailSettings" /> -->
              <HotTable ref="testHot" :root="root2" :settings="hotSettings2" />
            </div>
          </div>

          <div class="add_table_row titlemin">
            <el-button class="editbtn" size="mini">
              删除行
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="writeoff.details2"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <!-- <el-table-column
              :label="$t('comm.operation')"
              align="center"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '1')" />
              </template>
            </el-table-column> -->
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column prop="name" label="活动名称" min-width="170" align="center" />
            <el-table-column prop="sku" label="产品" min-width="170" align="center" />
            <el-table-column prop="rate" label="定率" min-width="170" align="center" />
            <el-table-column prop="data0" label="现金补贴" min-width="170" align="center" />
            <el-table-column prop="data1" label="销售数量" min-width="170" align="center" />
            <el-table-column prop="data2" label="销售金额" min-width="170" align="center" />
            <el-table-column prop="data3" label="代理商销售数量" min-width="170" align="center" />
            <el-table-column prop="data4" label="代理商销售金额" min-width="170" align="center" />
            <el-table-column prop="data5" label="POS相关促销费金额" min-width="170" align="center" />
            <el-table-column prop="data6" label="促销费金额" min-width="170" align="center" />
            <el-table-column prop="data7" label="费比" min-width="170" align="center" />
          </el-table>
        </el-collapse-item>
        <!-- <el-collapse-item name="2">

        </el-collapse-item> -->
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <!-- <li class="operation-item" @click="handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">保存</span>
        </li> -->
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconquxiao" />
          </span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
    <div>
      <el-dialog
        title="系列或SKU选择"
        :visible.sync="customersDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="customerTree"
            default-expand-all
            :data="customers"
            show-checkbox
            node-key="id"
            :check-strictly="true"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('customers')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <!-- <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li> -->
          <li class="operation-item" @click="handleOkClick('customers')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
// import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
import { HotTable } from '@handsontable/vue'
import '@/../node_modules/handsontable/dist/handsontable.full.css'
// import Handsontable from 'handsontable'

export default {
  name: 'TerminalInfo',
  components: { HotTable },
  mixins: [names, formValidator, permission, dict, numFormat],
  // props: {
  //   id: {
  //     type: String,
  //     required: true
  //   },
  //   type: {
  //     type: String,
  //     default: 'detail'
  //   }
  // },
  data() {
    return {
      customersDialogShow: false,
      disabled: false,
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        name: '',
        product: '光羽,精灵',
        radio1: '1',
        radio2: '2',
        radio3: '2',
        radio4: '2',
        radio5: '1',
        radio6: '2',
        radio7: '3',
        radio8: '3',
        details: [],
        details2: []
      },
      customers: [{
        id: 1,
        label: '全选',
        children: [
          {
            id: 11,
            label: '婴儿纸尿裤',
            children: [
              {
                id: 111,
                label: '光羽',
                children: [
                  {
                    id: 1111,
                    label: 'GOO.N®大王 环贴式纸尿裤 光羽系列 NB60'
                  },
                  {
                    id: 1112,
                    label: 'GOO.N®大王 环贴式纸尿裤 光羽系列 S56'
                  },
                  {
                    id: 1113,
                    label: 'GOO.N®大王 环贴式纸尿裤 光羽系列 M44'
                  },
                  {
                    id: 1114,
                    label: 'GOO.N®大王 环贴式纸尿裤 光羽系列 L36'
                  },
                  {
                    id: 1115,
                    label: 'GOO.N®大王 环贴式纸尿裤 光羽系列 XL28'
                  }
                ]
              },
              {
                id: 112,
                label: '鎏金',
                children: [
                  {
                    id: 1121,
                    label: 'GOO.N®大王 环贴式纸尿裤 光羽系列 鎏金版 S56片'
                  },
                  {
                    id: 1122,
                    label: 'GOO.N®大王 环贴式纸尿裤 光羽系列 鎏金版 M44片'
                  },
                  {
                    id: 1123,
                    label: 'GOO.N®大王 环贴式纸尿裤 光羽系列 鎏金版 L36片'
                  }
                ]
              },
              {
                id: 113,
                label: '精灵',
                children: [
                  {
                    id: 1131,
                    label: 'GOO.N®大王环贴式纸尿裤 精灵系列 NB56'
                  },
                  {
                    id: 1132,
                    label: 'GOO.N®大王环贴式纸尿裤 精灵系列 S52'
                  },
                  {
                    id: 1133,
                    label: 'GOO.N®大王环贴式纸尿裤 精灵系列 M42'
                  }
                ]
              },
              {
                id: 114,
                label: '天使',
                children: [
                  {
                    id: 1131,
                    label: 'GOO.N®大王 环贴式纸尿裤 天使系列NB62片'
                  },
                  {
                    id: 1132,
                    label: 'GOO.N®大王 环贴式纸尿裤 天使系列S58片'
                  },
                  {
                    id: 1133,
                    label: 'GOO.N®大王 环贴式纸尿裤 天使系列M46片'
                  }
                ]
              }
            ]
          },
          {
            id: 12,
            label: '湿巾',
            children: [
              {
                id: 121,
                label: '小鸭子',
                children: [
                  {
                    id: 1211,
                    label: 'GOO.N®大王 婴儿湿巾替换装70片*3个'
                  },
                  {
                    id: 1212,
                    label: 'GOO.N®大王 婴儿湿巾替换装70片*6个'
                  }
                ]
              },
              {
                id: 122,
                label: '天使',
                children: [
                  {
                    id: 1221,
                    label: 'GOO.N®大王 婴儿柔湿巾 天使系列 60片'
                  },
                  {
                    id: 1222,
                    label: 'GOO.N®大王 婴儿柔湿巾 天使系列 20片'
                  }
                ]
              }
            ]
          },
          {
            id: 13,
            label: '成人护理',
            children: [
              {
                id: 131,
                label: '安心随行',
                children: [
                  {
                    id: 1311,
                    label: '安托 环贴式成人纸尿裤 安心随行系列 M9片'
                  },
                  {
                    id: 1312,
                    label: '安托 环贴式成人纸尿裤 安心随行系列 L8片'
                  }
                ]
              },
              {
                id: 132,
                label: '防漏安心',
                children: [
                  {
                    id: 1321,
                    label: '安托® 短裤式成人纸尿裤 防漏安心系列(薄型) M-L6片'
                  },
                  {
                    id: 1322,
                    label: '安托® 短裤式成人纸尿裤 防漏安心系列(薄型) L-XL5片'
                  }
                ]
              }
            ]
          },
          {
            id: 14,
            label: '纸制品',
            children: [
              {
                id: 141,
                label: '奢华保湿',
                children: [
                  {
                    id: 1411,
                    label: '大王Elleair  奢华保湿系列 便携面纸*4包'
                  },
                  {
                    id: 1412,
                    label: '奢华保湿系列 盒装面纸200抽1P'
                  },
                  {
                    id: 1413,
                    label: '大王Elleair贅沢保湿系列 盒装面纸200抽*3盒'
                  }
                ]
              },
              {
                id: 142,
                label: '奢润',
                children: [
                  {
                    id: 1421,
                    label: 'elleair®奢润保湿纸面巾 40抽×6包'
                  },
                  {
                    id: 1422,
                    label: 'elleair®奢润保湿纸面巾 60抽x30包彩箱'
                  }
                ]
              }
            ]
          },
          {
            id: 15,
            label: '女性护理',
            children: [
              {
                id: 151,
                label: '天使纱织',
                children: [
                  {
                    id: 1511,
                    label: 'elis®大王 夜用卫生巾  天使纱织系列 超薄纯棉290MM'
                  },
                  {
                    id: 1512,
                    label: 'elis®大王 夜用卫生巾  天使纱织系列 超薄纯棉360MM'
                  },
                  {
                    id: 1513,
                    label: 'elis®大王 日用卫生巾  天使纱织系列 超薄绵柔250MM'
                  }
                ]
              },
              {
                id: 152,
                label: '悦芮',
                children: [
                  {
                    id: 1521,
                    label: 'elis®大王 吸水巾 悦芮系列 超薄纯棉205MM'
                  },
                  {
                    id: 1522,
                    label: 'elis®大王 吸水巾 悦芮系列 超薄纯棉240MM'
                  }
                ]
              }
            ]
          }
        ]
      }
      ],
      root1: 'adjust-hot1',
      root2: 'adjust-hot2',
      hotSettings: {
        // data: [['sample', 'data']],
        data: [ // 数据可以是二维数组，也可以是数组对象
          // { 'accont': 'shimu' }
          ['定率', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['代理商销售额', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['POS', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

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

        startCols: 11,

        minRows: 2, // 最小行列

        minCols: 5,

        maxRows: 200, // 最大行列

        maxCols: 200,
        rowHeaders: true, // 行表头，可以使布尔值（行序号），可以使字符串（左侧行表头相同显示内容，可以解析html），也可以是数组（左侧行表头单独显示内容）。
        colWidths: [100], // 单元格宽
        colHeaders: ['类型', '全月', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'], // 自定义列表头or 布尔值
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
          // {
          //   type: 'dropdown', // 下拉选择
          //   source: [],
          //   strict: false // 是否严格匹配
          // },
          // {
          //   type: 'date', // 时间格式
          //   dateFormat: 'YYYY-MM',
          //   correctFormat: true,
          //   defaultDate: '19000101'
          // },
          // {
          //   type: 'numeric',
          //   renderer: function(instance, td, row, col, prop, value, cellProperties) {
          //     var dateFormat = /^(\d{4})-(\d{2})$/
          //     Handsontable.dom.empty(td)
          //     var result = null
          //     if (value) {
          //       if (dateFormat.test(value)) {
          //         Handsontable.dom.addClass(td, 'htRight')
          //       } else {
          //         Handsontable.dom.addClass(td, 'htInvalid')
          //       }
          //       result = value
          //     }
          //     td.innerText = result
          //     // Handsontable.dom.addClass(td, 'htMiddle htCenter notread')
          //     return td
          //   }
          // }, // 数值
          { type: 'text' }, // 数值
          { type: 'numeric', readOnly: true }, // 数值
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
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' } // 数值

        ]
      },
      hotSettings2: {
        // data: [['sample', 'data']],
        data: [ // 数据可以是二维数组，也可以是数组对象
          // { 'accont': 'shimu' }
          ['KA', '光羽', '', '', '', ''],
          ['BS', '光羽', '', '', '', ''],
          ['KA', '精灵', '', '', '', ''],
          ['BS', '精灵', '', '', '', '']
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

        startCols: 11,

        minRows: 6, // 最小行列

        minCols: 5,

        maxRows: 200, // 最大行列

        maxCols: 200,
        rowHeaders: true, // 行表头，可以使布尔值（行序号），可以使字符串（左侧行表头相同显示内容，可以解析html），也可以是数组（左侧行表头单独显示内容）。
        colWidths: [100], // 单元格宽
        colHeaders: ['KA/BS', '产品', '现金补贴', '大王销售', '代理商销售', 'POS相关促销费'], // 自定义列表头or 布尔值
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
          { type: 'text' }, // 数值
          { type: 'text' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' }, // 数值
          { type: 'numeric' } // 数值
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    },
    type: function() {
      return this.$route.query.type
    }
  },
  watch: {
  },
  async created() {
    if (this.type === 'add') {
      this.disabled = false
    } else {
      this.disabled = true
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // for (let index = 1; index < 32; index++) {
      //   this.hotSettings.colHeaders.push(index)
      // }
      console.log(this.id)
      if (this.id) {
        if (this.id === '1') {
          this.writeoff.labelName = '1'
          this.writeoff.dataType = '1'
        } else {
          this.writeoff.labelName = '2'
          this.writeoff.dataType = '2'
        }
      } else {
        this.writeoff.labelName = '1'
        this.writeoff.dataType = '1'
      }

      this.writeoff.details.push({
        month: '2021年5月',
        account: 'B代理商',
        fee2: '现金折扣',
        category: '纸品',
        data1: '10000',
        data2: '5.5%',
        data3: '11000',
        data4: '5.8%',
        data5: '11110',
        data6: '5.9%'
      })
      this.writeoff.details2.push({
        name: 'XX活动',
        sku: '光羽、天湖',
        rate: '',
        data0: '1.5',
        data1: '3000',
        data2: '450000',
        data3: '2700',
        data4: '',
        data5: '5000',
        data6: '9050',
        data7: '2%'
      })
      this.writeoff.details2.push({
        name: 'XX活动',
        sku: '夜1片安心',
        rate: '3.5%',
        data0: '',
        data1: '2500',
        data2: '5000000',
        data3: '',
        data4: '600000',
        data5: '2500',
        data6: '20000',
        data7: '4%'
      })
      this.isLoading = false
    },
    handleAddInvoice() {
      var curr_time = new Date()
      var strDate = curr_time.getYear() + 1900 + '/'
      strDate += curr_time.getMonth() + 1 + '/'
      strDate += curr_time.getDate() + ' '
      strDate += curr_time.getHours() + ':'
      strDate += curr_time.getMinutes() + ':'
      strDate += curr_time.getSeconds()
      this.writeoff.details.push({
        name: '',
        price: '',
        people: 'admin',
        time: strDate
      })
    },
    handleDeleteDetail(index, type) {
      this.writeoff.details.splice(index, 1)
    },
    handleSubmit(submitType) {
      // for (const ref in this.$refs) {
      //   if (this.$refs[ref] && this.$refs[ref].length > 0) {
      //     const obj = this.$refs[ref][0]
      //     // 页面嵌套vue组件调用验证方法
      //     if (obj.hasOwnProperty('validatorAll')) {
      //       this.$refs[ref][0].validatorAll()
      //       if (!this.$refs[ref][0].validatorState) return false
      //     } else {
      //       // 本页面调用验证方法
      //       if (!this.validator(ref)) return false
      //     }
      //   }
      // }
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleClearClick(type) {
      if (type === 'customers') {
        this.searchParam.params.customers = ''
        this.$refs.customerTree.setCheckedKeys([])
        this.customersDialogShow = false
      }
    },
    handleOkClick(type) {
      const names = []
      let index = 0
      if (type === 'customers') {
        this.$refs.customerTree.getCheckedNodes().forEach((item) => {
          console.log(item)
          // if (!item.children) {
          names[index] = item.label
          index++
          // }
        })
        // console.log(this.selecttype)
        if (this.selecttype === 1) {
          // console.log(1)
          this.writeoff.product = names.join(',    ')
        } else {
          // console.log(2)
          this.writeoff.product = names.join(',    ')
        }

        this.customersDialogShow = false
        this.$refs.customerTree.setCheckedKeys([])
      }
    },
    handleCancelClick(type) {
      if (type === 'customers') {
        this.customersDialogShow = false
        this.$refs.customerTree.setCheckedKeys([])
      }
    },
    showsSKWPop(type, index) {
      this.customersDialogShow = true
      this.selectsku = index
      this.selecttype = type
    }

  }
}
</script>
