<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan" />
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                销售预算合计
              </div>
              <div class="input">
                <el-input v-model="salesBudgetTotal" :disabled="true" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用预算合计
              </div>
              <div class="input">
                <el-input v-model="feesBudgetTotal" :disabled="true" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                调整后销售差异
              </div>
              <div class="input">
                <el-input v-model="adjustSalesBudget" :disabled="true" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                调整后费用差异
              </div>
              <div class="input">
                <el-input v-model="adjustFeesBudget" :disabled="true" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">客户</span>
          <el-tabs v-model="activeTabName">
            <el-tab-pane :key="'first'" label="客户AAA" name="first">
              <div class="input_box">
                <div class="flex3">
                  <div class="title">
                    客户
                  </div>
                  <div class="input">
                    <el-input v-model="dealers[0]" :disabled="true" clearable />
                  </div>
                </div>
              </div>
              <el-table
                ref="table"
                v-loading="isLoading"
                :data="customerSkuList"
                stripe
                border
                show-summary
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                :header-cell-style="{'text-align':'center','background':'#305496'}"
              >
                <el-table-column prop="brand" :label="'品牌'" width="180" align="center" show-overflow-tooltip />
                <el-table-column prop="skuName" :label="'SKU名'" width="180" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <a @click="handleSeleCustomerSku">{{ scope.row.skuName }}</a>
                  </template>
                </el-table-column>
                <el-table-column prop :label="'1月'">
                  <el-table-column prop="sales_1" :label="'销售'" align="right" />
                  <el-table-column prop="fee_1" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'2月'">
                  <el-table-column prop="sales_2" :label="'销售'" align="right" />
                  <el-table-column prop="fee_2" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'3月'">
                  <el-table-column prop="sales_3" :label="'销售'" align="right" />
                  <el-table-column prop="fee_3" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'4月'">
                  <el-table-column prop="sales_4" :label="'销售'" align="right" />
                  <el-table-column prop="fee_4" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'5月'">
                  <el-table-column prop="sales_5" :label="'销售'" align="right" />
                  <el-table-column prop="fee_5" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'6月'">
                  <el-table-column prop="sales_6" :label="'销售'" align="right" />
                  <el-table-column prop="fee_6" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'7月'">
                  <el-table-column prop="sales_7" :label="'销售'" align="right" />
                  <el-table-column prop="fee_7" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'8月'">
                  <el-table-column prop="sales_8" :label="'销售'" align="right" />
                  <el-table-column prop="fee_8" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'9月'">
                  <el-table-column prop="sales_9" :label="'销售'" align="right" />
                  <el-table-column prop="fee_9" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'10月'">
                  <el-table-column prop="sales_10" :label="'销售'" align="right" />
                  <el-table-column prop="fee_10" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'11月'">
                  <el-table-column prop="sales_11" :label="'销售'" align="right" />
                  <el-table-column prop="fee_11" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'12月'">
                  <el-table-column prop="sales_12" :label="'销售'" align="right" />
                  <el-table-column prop="fee_12" :label="'费用'" align="right" />
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :key="'second'" label="客户BBB" name="second">
              <div class="input_box">
                <div class="flex3">
                  <div class="title">
                    客户
                  </div>
                  <div class="input">
                    <el-input v-model="dealers[1]" :disabled="true" clearable />
                  </div>
                </div>
              </div>
              <el-table
                ref="table"
                v-loading="isLoading"
                :data="customerSkuList"
                stripe
                border
                show-summary
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                :header-cell-style="{'text-align':'center','background':'#305496'}"
              >
                <el-table-column prop="brand" :label="'品牌'" width="180" align="center" show-overflow-tooltip />
                <el-table-column prop="skuName" :label="'SKU名'" width="180" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <a @click="handleSeleCustomerSku">{{ scope.row.skuName }}</a>
                  </template>
                </el-table-column>
                <el-table-column prop :label="'1月'">
                  <el-table-column prop="sales_1" :label="'销售'" align="right" />
                  <el-table-column prop="fee_1" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'2月'">
                  <el-table-column prop="sales_2" :label="'销售'" align="right" />
                  <el-table-column prop="fee_2" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'3月'">
                  <el-table-column prop="sales_3" :label="'销售'" align="right" />
                  <el-table-column prop="fee_3" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'4月'">
                  <el-table-column prop="sales_4" :label="'销售'" align="right" />
                  <el-table-column prop="fee_4" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'5月'">
                  <el-table-column prop="sales_5" :label="'销售'" align="right" />
                  <el-table-column prop="fee_5" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'6月'">
                  <el-table-column prop="sales_6" :label="'销售'" align="right" />
                  <el-table-column prop="fee_6" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'7月'">
                  <el-table-column prop="sales_7" :label="'销售'" align="right" />
                  <el-table-column prop="fee_7" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'8月'">
                  <el-table-column prop="sales_8" :label="'销售'" align="right" />
                  <el-table-column prop="fee_8" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'9月'">
                  <el-table-column prop="sales_9" :label="'销售'" align="right" />
                  <el-table-column prop="fee_9" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'10月'">
                  <el-table-column prop="sales_10" :label="'销售'" align="right" />
                  <el-table-column prop="fee_10" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'11月'">
                  <el-table-column prop="sales_11" :label="'销售'" align="right" />
                  <el-table-column prop="fee_11" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'12月'">
                  <el-table-column prop="sales_12" :label="'销售'" align="right" />
                  <el-table-column prop="fee_12" :label="'费用'" align="right" />
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :key="'three'" label="客户CCC" name="three">
              <div class="input_box">
                <div class="flex3">
                  <div class="title">
                    客户
                  </div>
                  <div class="input">
                    <el-input v-model="dealers[2]" :disabled="true" clearable />
                  </div>
                </div>
              </div>
              <el-table
                ref="table"
                v-loading="isLoading"
                :data="customerSkuList"
                stripe
                border
                show-summary
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                :header-cell-style="{'text-align':'center','background':'#305496'}"
              >
                <el-table-column prop="brand" :label="'品牌'" width="180" align="center" show-overflow-tooltip />
                <el-table-column prop="skuName" :label="'SKU名'" width="180" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <a @click="handleSeleCustomerSku">{{ scope.row.skuName }}</a>
                  </template>
                </el-table-column>
                <el-table-column prop :label="'1月'">
                  <el-table-column prop="sales_1" :label="'销售'" align="right" />
                  <el-table-column prop="fee_1" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'2月'">
                  <el-table-column prop="sales_2" :label="'销售'" align="right" />
                  <el-table-column prop="fee_2" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'3月'">
                  <el-table-column prop="sales_3" :label="'销售'" align="right" />
                  <el-table-column prop="fee_3" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'4月'">
                  <el-table-column prop="sales_4" :label="'销售'" align="right" />
                  <el-table-column prop="fee_4" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'5月'">
                  <el-table-column prop="sales_5" :label="'销售'" align="right" />
                  <el-table-column prop="fee_5" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'6月'">
                  <el-table-column prop="sales_6" :label="'销售'" align="right" />
                  <el-table-column prop="fee_6" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'7月'">
                  <el-table-column prop="sales_7" :label="'销售'" align="right" />
                  <el-table-column prop="fee_7" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'8月'">
                  <el-table-column prop="sales_8" :label="'销售'" align="right" />
                  <el-table-column prop="fee_8" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'9月'">
                  <el-table-column prop="sales_9" :label="'销售'" align="right" />
                  <el-table-column prop="fee_9" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'10月'">
                  <el-table-column prop="sales_10" :label="'销售'" align="right" />
                  <el-table-column prop="fee_10" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'11月'">
                  <el-table-column prop="sales_11" :label="'销售'" align="right" />
                  <el-table-column prop="fee_11" :label="'费用'" align="right" />
                </el-table-column>
                <el-table-column prop :label="'12月'">
                  <el-table-column prop="sales_12" :label="'销售'" align="right" />
                  <el-table-column prop="fee_12" :label="'费用'" align="right" />
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">备注</span>
          <div class="input_box">
            <el-input v-model="memo" type="textarea" :rows="3" height="200px" />
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">附件</span>
          <div class="input_box" />
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li class="operation-item" @click="handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">确认</span>
        </li>
      </ul>
    </div>
    <div>
      <customer-pop :is-show="customerSkuSelectDialog" @cancel="customerSkuSelectDialog=false" />
    </div>
  </div>
</template>
<script>
import CustomerPop from '@/views/bd/components/BdCustomerSku'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
export default {
  name: 'BdCustomer',
  components: { CustomerPop },
  mixins: [names, formValidator],
  data() {
    return {
      customerSkuList: [],
      activeNames: ['1', '2', '211', '212', '221', '222', '231', '232'],
      dealers: ['客户AAA', '客户BBB', '客户CCC'],
      activeTabName: 'first',
      salesBudgetTotal: 999999,
      feesBudgetTotal: 888888888,
      adjustSalesBudget: 77777777,
      adjustFeesBudget: 77777777,
      customerSkuSelectDialog: false,
      memo: '备注'
    }
  },
  async created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var obj = []
      var children = []
      for (var i = 1; i < 4; i++) {
        obj = {
          'id': i,
          'brand': 'MERRIES EXTRA DRY' + i,
          'sales_1': (1000 * Math.random()).toFixed(2),
          'fee_1': (1000 * Math.random()).toFixed(2),
          'sales_2': (1000 * Math.random()).toFixed(2),
          'fee_2': (1000 * Math.random()).toFixed(2),
          'sales_3': (1000 * Math.random()).toFixed(2),
          'fee_3': (1000 * Math.random()).toFixed(2),
          'sales_4': (1000 * Math.random()).toFixed(2),
          'fee_4': (1000 * Math.random()).toFixed(2),
          'sales_5': (1000 * Math.random()).toFixed(2),
          'fee_5': (1000 * Math.random()).toFixed(2),
          'sales_6': (1000 * Math.random()).toFixed(2),
          'fee_6': (1000 * Math.random()).toFixed(2),
          'sales_7': (1000 * Math.random()).toFixed(2),
          'fee_7': (1000 * Math.random()).toFixed(2),
          'sales_8': (1000 * Math.random()).toFixed(2),
          'fee_8': (1000 * Math.random()).toFixed(2),
          'sales_9': (1000 * Math.random()).toFixed(2),
          'fee_9': (1000 * Math.random()).toFixed(2),
          'sales_10': (1000 * Math.random()).toFixed(2),
          'fee_10': (1000 * Math.random()).toFixed(2),
          'sales_11': (1000 * Math.random()).toFixed(2),
          'fee_11': (1000 * Math.random()).toFixed(2),
          'sales_12': (1000 * Math.random()).toFixed(2),
          'fee_12': (1000 * Math.random()).toFixed(2),
          'children': []
        }
        for (var j = 1; j < 4; j++) {
          children = {
            'id': i + '' + j,
            'skuName': 'MRS-ED NB 90x2 1809' + j,
            'sales_1': (300 * Math.random()).toFixed(2),
            'fee_1': (300 * Math.random()).toFixed(2),
            'sales_2': (300 * Math.random()).toFixed(2),
            'fee_2': (300 * Math.random()).toFixed(2),
            'sales_3': (300 * Math.random()).toFixed(2),
            'fee_3': (300 * Math.random()).toFixed(2),
            'sales_4': (300 * Math.random()).toFixed(2),
            'fee_4': (300 * Math.random()).toFixed(2),
            'sales_5': (300 * Math.random()).toFixed(2),
            'fee_5': (300 * Math.random()).toFixed(2),
            'sales_6': (300 * Math.random()).toFixed(2),
            'fee_6': (300 * Math.random()).toFixed(2),
            'sales_7': (300 * Math.random()).toFixed(2),
            'fee_7': (300 * Math.random()).toFixed(2),
            'sales_8': (300 * Math.random()).toFixed(2),
            'fee_8': (300 * Math.random()).toFixed(2),
            'sales_9': (300 * Math.random()).toFixed(2),
            'fee_9': (300 * Math.random()).toFixed(2),
            'sales_10': (300 * Math.random()).toFixed(2),
            'fee_10': (300 * Math.random()).toFixed(2),
            'sales_11': (300 * Math.random()).toFixed(2),
            'fee_11': (300 * Math.random()).toFixed(2),
            'sales_12': (300 * Math.random()).toFixed(2),
            'fee_12': (300 * Math.random()).toFixed(2)
          }
          obj.children.push(children)
        }
        this.customerSkuList.push(obj)
      }
    },
    handleSeleCustomerSku() {
      this.customerSkuSelectDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">

</style>
