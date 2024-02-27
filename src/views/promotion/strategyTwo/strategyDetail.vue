<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">年度: 2021</span>
      </div>
      <ul class="operation-box">
        <li class="operation-item" @click="downloadFile()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">下载</span>
        </li>
        <li class="operation-item">
          <el-upload
            class="upload-demo"
            action="#"

            multiple
            :limit="1"
          >
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
            <span class="operation-text" style="display:inline-block;margin-left:10px;">上传</span>
          </el-upload>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">新增</span>
        </li>
        <li class="operation-item" @click="batchDelete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">删除</span>
        </li>
        <!-- <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">修改</span>
        </li> -->
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
      <div class="search-list-table" style="background:#fff;padding:20px;">
        <div ref="tables" style="height: 100%">
          <!-- <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span> -->
          <el-table
            ref="table"
            :data="motion.fixedList"
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
            <el-table-column :label="'系列或SKU'" min-width="220">
              <template slot-scope="scope">
                <el-input v-if="scope.row.id<=12||scope.row.id>=18" v-model="scope.row.sku" readonly type="text" @focus="showsSKWPop(1,scope.$index)" />
                <span v-if="scope.row.id>12&&scope.row.id<18">—</span>
              </template>
            </el-table-column>
            <el-table-column prop="num" :label="'对象代理商'" min-width="350">
              <template slot-scope="scope">
                <rel-func-select rel-func="account" :default-tags="scope.row.accounts" :row-index="scope.$index" :multiple="true" cons-class="pop-multiple" @handleSelectedChange="handleSelectedChange" />
                <!-- <rel-func-select v-model="scope.row.account" :rel-func="'account'" /> -->
              </template>
            </el-table-column>
            <el-table-column prop="num" :label="'预计销售数量占比'" min-width="150">
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.num1 }}</span>
                  <span class="rateleft">{{ scope.row.num2 }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="'方式'" min-width="100" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.selectType" placeholder="请选择" clearable>
                  <el-option label="定额" value="1" />
                  <el-option label="定率" value="2" />
                  <el-option label="单价补贴" value="3" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="'金额or比率or现金折扣'" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="'折扣期间'" min-width="150" align="center">
              <template v-for="(item,index) in headerMonth">
                <el-table-column :key="item" :label="item + '月'">
                  <template>
                    <span v-if="index!==1" class="el-icon-check" />
                  </template>
                </el-table-column>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div ref="tables" style="height: 100%">
          <!-- <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span> -->
          <el-table
            ref="table"
            :data="motion.fixedList2"
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
            <el-table-column :label="'品类/系列/SKU'" min-width="220">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku" readonly type="text" @focus="showsSKWPop(2,scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column prop="num" :label="'对象代理商'" min-width="350">
              <template slot-scope="scope">
                <!-- <rel-func-select v-model="scope.row.num2" :rel-func="'account'" /> -->
                <rel-func-select rel-func="account" :default-tags="scope.row.accounts" :row-index="scope.$index" :multiple="true" cons-class="pop-multiple" @handleSelectedChange="handleSelectedChange2" />
              </template>
            </el-table-column>
            <!-- <el-table-column prop="price" :label="'折扣单价'" min-width="120" /> -->
            <el-table-column :label="'方式'" min-width="100" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.selectType" placeholder="请选择" clearable>
                  <el-option label="定额" value="1" />
                  <el-option label="定率" value="2" />
                  <el-option label="单价补贴" value="3" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="'金额or比率or现金折扣'" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="'折扣期间'" min-width="150" align="center">
              <template v-for="(item,index) in headerMonth">
                <el-table-column :key="item" :label="item + '月'">
                  <template>
                    <span v-if="index!==1" class="el-icon-check" />
                  </template>
                </el-table-column>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
import { formValidator } from '@/mixins/form-validator.js'
import { search, searchPopMultiple } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { numFormat } from '@/mixins/num-format'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
// import ProductPop from '@/views/mdm/product/components/ProductPop'
// import ExpenseAccountPop from '@/views/fee/promotion/components/ExpenseAccountPop'
// import ExpenseUseStatusPop from '@/views/fee/promotion/components/ExpenseUseStatusPop'
// import DepartmentSelect from '@/components/DepartmentSelect.vue'
export default {
  name: 'StrategyDetail',
  components: { RelFuncSelect },
  mixins: [search, searchPopMultiple, names, formValidator, permission, dict, numFormat],
  data() {
    return {
      isLoading: true,
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectsku: '',
      customersDialogShow: false,
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '18'],
      selecttype: '',
      motion: {
        fixedList: [],
        fixedList2: []
      },
      multipleSelection: [],
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
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  async created() {
    // if (this.id) {
    this.fetchData()
    // }
  },
  methods: {
    async fetchData() {
      this.motion.fixedList.push({
        id: 1,
        name: '10R2個目半額（BS7.4元、KA2.9元）',
        sku: '10R',
        num1: 'BS',
        num2: '0.7',
        accounts: [{ 'accountName': '上海麦田' }],
        price: '7.4',
        selectType: '3'
      })
      this.motion.fixedList.push({
        id: 2,
        name: '10R2個目半額（BS7.4元、KA2.9元）',
        sku: '4R',
        num1: 'KA',
        num2: '0.3',
        accounts: [{ 'accountName': '上海麦田' }],
        price: '2.6',
        selectType: '3'
      })
      this.motion.fixedList.push({
        id: 3,
        name: '10Ｒ単品38元（BS15.2元、KA11.8元）',
        sku: '10R',
        num1: 'BS',
        num2: '0.6',
        accounts: [{ 'accountName': '南京欣荣' }],
        price: '15.2',
        selectType: '3'
      })
      this.motion.fixedList.push({
        id: 4,
        name: '10Ｒ単品38元（BS15.2元、KA11.8元）',
        sku: '10R',
        num1: 'KA',
        num2: '0.4',
        accounts: [{ 'accountName': '南京欣荣' }],
        price: '11.8',
        selectType: '3'
      })

      this.motion.fixedList.push({
        id: 8,
        name: '4R2個目半額（BS4.2元、KA3.2元）',
        sku: '4R',
        num1: 'BS',
        num2: '0.7',
        accounts: [{ 'accountName': '无锡纸仙子' }],
        price: '2.6',
        selectType: '3'
      })
      this.motion.fixedList.push({
        id: 9,
        name: '4R2個目半額（BS4.2元、KA3.2元）',
        sku: '4R',
        num1: 'KA',
        num2: '0.3',
        accounts: [{ 'accountName': '无锡纸仙子' }],
        price: '3.2',
        selectType: '3'
      })
      this.motion.fixedList2.push({
        id: 11,
        name: '天使买三送一',
        sku: '4R',
        num1: 'BS',
        accounts: [{ 'accountName': '上海麦田' }],
        price: '2.6',
        selectType: '3'
      })
      this.motion.fixedList2.push({
        id: 12,
        name: '天使买三送一',
        sku: '4R',
        num1: 'BS',
        accounts: [{ 'accountName': '上海麦田' }],
        price: '2.6',
        selectType: '3'
      })
      this.motion.fixedList2.push({
        id: 13,
        name: '试用品',
        sku: '4R',
        num1: 'BS',
        accounts: [{ 'accountName': '南京欣荣' }],
        price: '100',
        selectType: '1'
      })
      this.motion.fixedList2.push({
        id: 14,
        name: '试用品',
        sku: '4R',
        num1: 'BS',
        accounts: [{ 'accountName': '南京欣荣' }],
        price: '200',
        selectType: '1'
      })
      this.motion.fixedList2.push({
        id: 15,
        name: '试用品',
        sku: '4R',
        num1: 'BS',
        accounts: [{ 'accountName': '南京欣荣' }],
        price: '300',
        selectType: '1'
      })
      this.motion.fixedList2.push({
        id: 16,
        name: 'EC回转费',
        sku: '4R',
        num1: 'BS',
        accounts: [{ 'accountName': '无锡纸仙子' }],
        price: '0.1',
        selectType: '2'
      })
      this.motion.fixedList2.push({
        id: 17,
        name: 'EC回转费',
        sku: '4R',
        num1: 'BS',
        accounts: [{ 'accountName': '无锡纸仙子' }],
        price: '0.2',
        selectType: '2'
      })
      this.isLoading = false
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
    handleSelectionChange(val) {
      // console.log(val)
      this.multipleSelection = val
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
          this.motion.fixedList[this.selectsku].sku = names.join(',    ')
        } else {
          // console.log(2)
          this.motion.fixedList2[this.selectsku].sku = names.join(',    ')
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
    },
    batchDelete() {
      // const delectId = []
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
        }).catch(() => {
          console.log(1991)
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
      // if (this.multipleSelection.length > 0) {
      //   let workflowFlag = false
      //   this.multipleSelection.forEach((rowData) => {
      //     delectId.push(rowData.id)
      //     if (rowData.workflowFlag === '1' && !workflowFlag) {
      //       this.$message({
      //         type: 'error',
      //         message: this.$t('comm.msg34')
      //       })
      //       workflowFlag = true
      //     }
      //     rowData.submitType = 'submit'
      //   })
      //   if (workflowFlag) return false

      // this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
      //   confirmButtonText: this.$t('comm.certain'),
      //   cancelButtonText: this.$t('comm.cancel'),
      //   type: 'warning'
      // }).then(() => {
      //   console.log(delectId)
      //   for (let i = 0; i < delectId.length; i++) {
      //     const num = delectId[i]
      //     console.log(num)
      //     this.motion.fixedList.splice(num, 1)
      //   }
      // }).catch(() => {
      //   console.log(1991)
      //   this.$message({
      //     type: 'info',
      //     message: this.$t('comm.msg1')
      //   })
      // })
      // } else {
      //   this.$message({
      //     type: 'info',
      //     message: this.$t('comm.msg3')
      //   })
      // }
    },
    handleCreate() {
      this.$router.push('/promotion/strategytwo/edit')
    },
    strategyEdit() {
      this.$router.push('/promotion/strategytwo/detail')
    },
    downloadFile() {
      const a = document.createElement('a')
      a.download = '变动费设置.xlsx'
      a.style.display = 'none'
      a.href = process.env.VUE_APP_CAS_CLIENT_URL + '/static/变动费设置下载模板2.xlsx'
      document.body.appendChild(a)
      a.click()
    },
    handleSelectedChange(val) {
      console.log(val)
      this.motion.fixedList[val.rowIndex]['accounts'] = val.data
      // this.defaultTags = val.data
      // console.log(val)
    },
    handleSelectedChange2(val) {
      this.motion.fixedList2[val.rowIndex]['accounts'] = val.data
    }
  }
}
</script>
