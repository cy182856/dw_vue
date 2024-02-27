<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('promotion.strategyTwo.year') }}2021</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <ul class="operation-box dialog-btn-box dialog-btn-box-detail" style="margin-top:0 !important;padding-bottom:10px !important;">
            <!-- 保存 -->
            <li class="operation-item" @click="addfixed">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
              <span class="operation-text">新增</span>
            </li>
            <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
              <span class="operation-text">删除</span>
            </li>
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
            <!-- <el-table-column prop="fee" :label="$t('promotion.strategyTwo.fee')" min-width="160" /> -->
            <el-table-column :label="$t('promotion.strategyTwo.fee')" min-width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.fee" placeholder="请选择" clearable :disabled="scope.row.edit">
                  <el-option label="导购费（费率）" value="1" />
                  <el-option label="铺货奖励（千元）" value="2" />
                </el-select>
                <!-- <div @dblclick="rateChange(scope.$index)"> -->
                <!-- <el-input v-model="scope.row.fee" clearable :disabled="scope.row.edit" /> -->
                <!-- </div> -->
              </template>
            </el-table-column>
            <el-table-column :label="$t('promotion.strategyTwo.select')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.selectType" placeholder="请选择" clearable>
                  <el-option label="定额" value="1" />
                  <el-option label="定率" value="2" />
                  <el-option label="单价补贴" value="3" />
                </el-select>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="tax" :label="$t('promotion.strategyTwo.rate')" min-width="150" align="center" /> -->
            <el-table-column :label="$t('promotion.strategyTwo.rate')" min-width="170">
              <template slot-scope="scope">
                <!-- <div @dblclick="rateChange(scope.$index)"> -->
                <el-input v-model="scope.row.tax" clearable />
                <!-- </div> -->
              </template>
            </el-table-column>
            <el-table-column prop="account" :label="'代理商'" min-width="250">
              <template slot-scope="scope">
                <rel-func-select v-model="scope.row.account" :rel-func="'account'" />
              </template>
            </el-table-column>
            <el-table-column :label="'系列或SKU'" min-width="220">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku" readonly type="text" @focus="showsSKWPop(scope.$index)" />
              </template>
            </el-table-column>
            <template v-for="item in headerMonth">
              <el-table-column :key="item" :prop="'month_'+item" :label="item + $t('promotion.strategyTwo.month')" min-width="100">
                <template slot-scope="scope">
                  <!-- <div @dblclick="rateChange(scope.$index)"> -->
                  <el-input v-model="scope.row['month_'+item]" clearable />
                <!-- </div> -->
                </template>
              </el-table-column>
              <!-- <el-table-column :key="item" :prop="'month_'+item" :label="item + $t('promotion.strategyTwo.month')" /> -->
            </template>
          </el-table>
        </el-collapse-item>
      </el-collapse>
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
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { numFormat } from '@/mixins/num-format'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'StrategyEdit',
  components: { RelFuncSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
  data() {
    return {
      isLoading: true,
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '18'],
      motion: {
        fixedList: []
      },
      customersDialogShow: false,
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
      multipleSelection: []
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
        fee: '导购费（费率）',
        tax: '6%',
        selectType: '2',
        account: '上海麦田',
        sku: '10R',
        edit: true,
        month_1: '3%',
        month_2: '3%',
        month_3: '3%',
        month_4: '3%',
        month_5: '3%',
        month_6: '3%',
        month_7: '3%',
        month_8: '3%',
        month_9: '3%',
        month_10: '3%',
        month_11: '3%',
        month_12: '3%'

      })
      this.motion.fixedList.push({
        fee: '铺货奖励（千元）',
        tax: '6%',
        selectType: '1',
        account: '南京欣荣',
        sku: '4R',
        edit: true,
        month_1: '11',
        month_2: '12',
        month_3: '13',
        month_4: '14',
        month_5: '15',
        month_6: '16',
        month_7: '17',
        month_8: '18',
        month_9: '19',
        month_10: '20',
        month_11: '21',
        month_12: '22'

      })
      this.isLoading = false
    },
    addfixed() {
      this.motion.fixedList.push({
        fee: '',
        tax: '',
        selectType: '',
        account: '',
        sku: '',
        edit: false,
        month_1: '',
        month_2: '',
        month_3: '',
        month_4: '',
        month_5: '',
        month_6: '',
        month_7: '',
        month_8: '',
        month_9: '',
        month_10: '',
        month_11: '',
        month_12: ''

      })
    },
    handleSubmit(submitType) {
      var jsons = this.motion.fixedList
      var jsona = JSON.stringify(jsons)
      var jsonb = jsona.replace(/false/g, 'true')
      var jsonc = JSON.parse(jsonb)
      console.log(jsonc)
      this.motion.fixedList = jsonc
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
        this.motion.fixedList[this.selectsku].sku = names.join(',    ')
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
    showsSKWPop(index) {
      this.customersDialogShow = true
      this.selectsku = index
    },
    handleSelectionChange(val) {
    // console.log(val)
      this.multipleSelection = val
    }
  }
}
</script>
