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
                月份
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
                代理商
              </el-col>
              <el-col :span="16">
                <rel-func-select v-model="searchParam.params.accounts" rel-func="account" />
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
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">下载</span>
        </li>
        <li class="operation-item" @click="strategyEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">上传</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable" style="overflow-y:auto;">
        <div ref="tables">
          <!-- <div ref="tables" style="height: 100%"> -->
          <!-- <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span> -->
          <el-table
            ref="table"
            :data="fixedList"
            style="margin-bottom: 20px;"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            row-key="id"
            border
            stripe
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="name" :label="'折扣活动名称'" min-width="300" />
            <el-table-column prop="sku" :label="'系列或SKU'" min-width="120" align="center" />
            <!-- <template slot-scope="scope">
                <el-input v-if="scope.row.id<=12||scope.row.id>=18" v-model="scope.row.sku" readonly type="text" @focus="showsSKWPop(scope.$index)" />
                <span v-if="scope.row.id>12&&scope.row.id<18">—</span>
              </template>
            </el-table-column> -->
            <el-table-column prop="account" :label="'对象代理商'" min-width="150" align="center" />
            <el-table-column prop="num" :label="'预计销售数量占比'" min-width="120">
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.num1 }}</span>
                  <span class="rateleft">{{ scope.row.num2 }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="selectType" :label="'方式'" min-width="100" align="center" />
            <!-- <template slot-scope="scope">
                <el-select v-model="scope.row.selectType" placeholder="请选择" clearable>
                  <el-option label="定额" value="1" />
                  <el-option label="定率" value="2" />
                  <el-option label="单价补贴" value="3" />
                </el-select>
              </template>
            </el-table-column> -->
            <el-table-column prop="price" :label="'金额or比率or现金折扣'" min-width="100" align="center" />
            <!-- <template slot-scope="scope">
                <el-input v-model="scope.row.price" clearable />
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <div ref="tables">
          <!-- <div ref="tables" style="height: 100%"> -->
          <!-- <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span> -->
          <el-table
            ref="table"
            :data="fixedList2"
            style="margin-bottom: 20px;"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            row-key="id"
            border
            stripe
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="name" :label="'折扣活动名称'" min-width="300" align="center" />
            <el-table-column prop="sku" :label="'品类/系列/SKU'" min-width="220" align="center" />
            <!-- <template slot-scope="scope">
                <el-input v-model="scope.row.sku" readonly type="text" @focus="showsSKWPop(scope.$index)" />
              </template> -->
            <!-- </el-table-column> -->
            <el-table-column prop="num2" :label="'对象代理商'" min-width="150" align="center" />
            <!-- <template slot-scope="scope">
                <rel-func-select v-model="scope.row.num2" :rel-func="'account'" />
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="price" :label="'折扣单价'" min-width="120" /> -->
            <el-table-column prop="selectType" :label="'方式'" min-width="100" align="center" />
            <!-- <template slot-scope="scope">
                <el-select v-model="scope.row.selectType" placeholder="请选择" clearable>
                  <el-option label="定额" value="1" />
                  <el-option label="定率" value="2" />
                  <el-option label="单价补贴" value="3" />
                </el-select>
              </template>
            </el-table-column> -->
            <el-table-column prop="price" :label="'金额or比率or现金折扣'" min-width="100" align="center" />
            <!-- <template slot-scope="scope">
                <el-input v-model="scope.row.price" clearable />
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
          <li class="operation-item" @click="handleOkClick('customersdj')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">单价补贴</span>
          </li>
          <li class="operation-item" @click="handleOkClick('customersfl')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">返利率</span>
          </li>
        </ul>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="下载"
        :visible.sync="loadPop"
        custom-class="content-dialog-userSelect"
        width="43%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:300px;overflow-x:auto;border:1px solid #ddd;">
          <el-tree
            ref="customerTree"
            default-expand-all
            :data="customers"
            show-checkbox
            node-key="id"
            :check-strictly="true"
          />
        </div>
        <div class="btngrounp">
          <el-button type="primary" :disabled="btnOk">
            <span class="el-icon-arrow-down" />
          </el-button>
          <el-button type="primary" :disabled="btnOk">
            <span class="el-icon-arrow-down" />
          </el-button>
        </div>
        <div class="conten" style="height:200px;">
          <div class="contenleft">
            <p v-for="item in selectList1" :key="item">
              {{ item }}
            </p>
          </div>
          <div class="contenright">
            <p v-for="item in selectList2" :key="item">
              {{ item }}
            </p>
          </div>
        </div>
        <div class="title">
          <div class="titleleft">
            单价补贴
          </div>
          <div class="titleleft">
            返利率
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('loadPop')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <!-- <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li> -->
          <li class="operation-item" @click="handleOkClick('loadPop')">
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
import { search, searchPopMultiple } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'StrategyTwoList',
  components: { RelFuncSelect },
  mixins: [search, searchPopMultiple, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      loadPop: false,
      customersDialogShow: false,
      tax1: true,
      tax2: true,
      btnOk: true,
      fixedList: [],
      fixedList2: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          month: new Date(),
          accounts: ''
        }
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
      selectList1: ['光羽', '天使'],
      selectList2: ['光羽', '鎏金']
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
      this.fixedList.push({
        id: 1,
        name: '10R2個目半額（BS7.4元、KA2.9元）',
        sku: '10R',
        num1: 'BS',
        num2: '0.7',
        account: '上海麦田',
        price: '7.4',
        selectType: '3'
      })
      this.fixedList.push({
        id: 2,
        name: '10R2個目半額（BS7.4元、KA2.9元）',
        sku: '4R',
        num1: 'KA',
        num2: '0.3',
        account: '上海麦田',
        price: '2.6',
        selectType: '3'
      })
      this.fixedList.push({
        id: 3,
        name: '10Ｒ単品38元（BS15.2元、KA11.8元）',
        sku: '10R',
        num1: 'BS',
        num2: '0.6',
        account: '南京欣荣',
        price: '15.2',
        selectType: '3'
      })
      this.fixedList.push({
        id: 4,
        name: '10Ｒ単品38元（BS15.2元、KA11.8元）',
        sku: '10R',
        num1: 'KA',
        num2: '0.4',
        account: '南京欣荣',
        price: '11.8',
        selectType: '3'
      })

      this.fixedList.push({
        id: 8,
        name: '4R2個目半額（BS4.2元、KA3.2元）',
        sku: '4R',
        num1: 'BS',
        num2: '0.7',
        account: '无锡纸仙子',
        price: '2.6',
        selectType: '3'
      })
      this.fixedList.push({
        id: 9,
        name: '4R2個目半額（BS4.2元、KA3.2元）',
        sku: '4R',
        num1: 'KA',
        num2: '0.3',
        account: '无锡纸仙子',
        price: '3.2',
        selectType: '3'
      })
      this.fixedList2.push({
        id: 11,
        name: '天使买三送一',
        sku: '4R',
        num1: 'BS',
        num2: '上海麦田',
        price: '2.6',
        selectType: '3'
      })
      this.fixedList2.push({
        id: 12,
        name: '天使买三送一',
        sku: '4R',
        num1: 'BS',
        num2: '上海麦田',
        price: '2.6',
        selectType: '3'
      })
      this.fixedList2.push({
        id: 13,
        name: '试用品',
        sku: '4R',
        num1: 'BS',
        num2: '南京欣荣',
        price: '100',
        selectType: '1'
      })
      this.fixedList2.push({
        id: 14,
        name: '试用品',
        sku: '4R',
        num1: 'BS',
        num2: '南京欣荣',
        price: '200',
        selectType: '1'
      })
      this.fixedList2.push({
        id: 15,
        name: '试用品',
        sku: '4R',
        num1: 'BS',
        num2: '南京欣荣',
        price: '300',
        selectType: '1'
      })
      this.fixedList2.push({
        id: 16,
        name: 'EC回转费',
        sku: '4R',
        num1: 'BS',
        num2: '无锡纸仙子',
        price: '0.1',
        selectType: '2'
      })
      this.fixedList2.push({
        id: 17,
        name: 'EC回转费',
        sku: '4R',
        num1: 'BS',
        num2: '无锡纸仙子',
        price: '0.2',
        selectType: '2'
      })
      this.isLoading = false
    },
    handleCreate() {
      this.$router.push('/promotion/strategytwo/edit')
    },
    strategyEdit() {
      this.$router.push('/promotion/strategytwo/detail')
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 7 === 0) {
          return {
            rowspan: 7,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 1) {
        if (rowIndex === 0 || rowIndex === 7) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if ((rowIndex + 1) % 2 === 0 && rowIndex < 7) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex % 2 === 0 && rowIndex > 7) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 2) {
        if (rowIndex === 0 || rowIndex === 7) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      this.tax1 = value.includes('未税')
      this.tax2 = value.includes('含税')
    },
    handleSelectionChange(val) {
    // console.log(val)
      this.multipleSelection = val
    },
    downloadFile() {
      const a = document.createElement('a')
      a.download = '变动费-活动实际填写表.xlsx'
      a.style.display = 'none'
      a.href = process.env.VUE_APP_CAS_CLIENT_URL + '/static/变动费-活动实际填写表(1).xlsx'
      document.body.appendChild(a)
      a.click()
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
      if (type === 'customersdj') {
        this.$refs.customerTree.getCheckedNodes().forEach((item) => {
          console.log(item)
          // if (!item.children) {
          names[index] = item.label
          index++
          // }
        })
        this.selectList1 = names
        this.customersDialogShow = false
        // this.$refs.customerTree.setCheckedKeys([])
      } else if (type === 'customersfl') {
        this.$refs.customerTree.getCheckedNodes().forEach((item) => {
          console.log(item)
          // if (!item.children) {
          names[index] = item.label
          index++
          // }
        })
        this.selectList2 = names
        this.customersDialogShow = false
        // this.$refs.customerTree.setCheckedKeys([])
      } else if (type === 'loadPop') {
        this.loadPop = false
        this.downloadFile()
      }
    },
    handleCancelClick(type) {
      if (type === 'customers') {
        this.customersDialogShow = false
        // this.$refs.customerTree.setCheckedKeys([])
      } else if (type === 'loadPop') {
        this.loadPop = false
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
.contenleft{
  width:48%;
  float:left;
  border:1px solid #ddd;
  height: 100%;
  overflow-y: auto;
  background: #fff;
}
.contenright{
  width:48%;
  float:right;
  border:1px solid #ddd;
  height: 100%;
  overflow-y: auto;
  background: #fff;
}
.title div{
  display: inline-block;
  width: 50%;
  text-align: center;
  line-height: 30px;
}
.conten P{
  line-height: 24px;
  padding:0 6px;
}
.btngrounp {
  position: relative;
  height: 40px;
}
.btngrounp button{
  position: absolute;
  left: 20%;
  text-align: center;
}
.btngrounp button:last-child{
  left: 70%;
}
</style>
