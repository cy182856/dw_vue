<template>
  <div id="subBrandDetail" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title="'客户Sub品牌明细'"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
      @open="handleOpen"
    >
      <el-collapse v-model="activeNames" style="overflow: auto;height: 490px;">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                客户编号
              </div>
              <div class="input">
                <el-input v-model="accountNum" :disabled="true" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                客户名称
              </div>
              <div class="input">
                <el-input v-model="accountName" :disabled="true" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                Sub-Brand编号
              </div>
              <div class="input">
                <el-input v-model="subBrandNum" :disabled="true" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                Sub-Brand名称
              </div>
              <div class="input">
                <el-input v-model="subBrandName" :disabled="true" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">明细</span>
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="customerSubBrandList"
            stripe
            border
            height="100%"
            :span-method="objectSpanMethod"
            :header-cell-style="{'text-align':'center','background':'#305496'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="type" width="100" align="center" show-overflow-tooltip />
            <el-table-column prop="item" :label="'科目'" align="left" width="150" show-overflow-tooltip />
            <el-table-column :label="'1月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_1" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_1 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_1" append="%" />
                  <span v-else>{{ scope.row.rate_1 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_1" />
                  <span v-else>{{ scope.row.number_1 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_1" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_1 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'2月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_2" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_2 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_2" append="%" />
                  <span v-else>{{ scope.row.rate_2 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_2" />
                  <span v-else>{{ scope.row.number_2 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_2" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_2 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'3月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_3" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_3 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_3" append="%" />
                  <span v-else>{{ scope.row.rate_3 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_3" />
                  <span v-else>{{ scope.row.number_3 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_3" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_3 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'4月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_4" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_4 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_4" append="%" />
                  <span v-else>{{ scope.row.rate_4 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_4" />
                  <span v-else>{{ scope.row.number_4 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_4" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_4 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'5月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_5" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_5 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_5" append="%" />
                  <span v-else>{{ scope.row.rate_5 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_5" />
                  <span v-else>{{ scope.row.number_5 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_5" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_5 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'6月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_6" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_6 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_6" append="%" />
                  <span v-else>{{ scope.row.rate_6 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_6" />
                  <span v-else>{{ scope.row.number_6 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_6" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_6 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'7月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_7" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_7 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_7" append="%" />
                  <span v-else>{{ scope.row.rate_7 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_7" />
                  <span v-else>{{ scope.row.number_7 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_7" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_7 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'8月'">
              <el-table-column prop="price_8" :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_8" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_8 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_8" append="%" />
                  <span v-else>{{ scope.row.rate_8 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_8" />
                  <span v-else>{{ scope.row.number_8 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_8" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_8 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'9月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_9" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_9 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_9" append="%" />
                  <span v-else>{{ scope.row.rate_9 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_9" />
                  <span v-else>{{ scope.row.number_9 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_9" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_9 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'10月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_10" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_10 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_10" append="%" />
                  <span v-else>{{ scope.row.rate_10 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_10" />
                  <span v-else>{{ scope.row.number_10 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_10" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_10 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'11月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_11" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_11 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_11" append="%" />
                  <span v-else>{{ scope.row.rate_11 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_11" />
                  <span v-else>{{ scope.row.number_11 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_11" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_11 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'12月'">
              <el-table-column :label="'单价'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.price_12" to-fixed-num="2" />
                  <span v-else>{{ scope.row.price_12 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'比率'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.rate_12" append="%" />
                  <span v-else>{{ scope.row.rate_12 | numFormat(1) }}%
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'数量'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.number_12" />
                  <span v-else>{{ scope.row.number_12 | numFormat(0) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="'金额'" align="right" min-width="120">
                <template slot-scope="scope">
                  <milli-input v-if="scope.row.type==='今年计划' && editable" v-model="scope.row.money_12" to-fixed-num="2" />
                  <span v-else>{{ scope.row.money_12 | numFormat(2) }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <div style="display: flex;flex-direction: column;height: 100%;">
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">关闭</span>
          </li>
          <li v-if="editable" class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'CustomerBrandPop',
  mixins: [names, search, formValidator, numFormat, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      accountNum: 'CUS20210001',
      accountName: '上海一科',
      subBrandNum: 'SBD00001',
      subBrandName: 'MERRIES EXTRA DAY1',
      activeNames: ['1', '2'],
      customerSubBrandList: []
    }
  },
  async created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.customerSubBrandList = []
      var items = ['Gross sales',
        '　　　Return',
        '　　　Rebate',
        'Net sales',
        '　　　SP-MK',
        '　　　SP-TMK',
        '　　　EC Ad.',
        'Net net sales',
        '加重平均',
        'Gross sales',
        '　　　Return',
        '　　　Rebate',
        'Net sales',
        '　　　SP-MK',
        '　　　SP-TMK',
        '　　　EC Ad.',
        'Net net sales',
        '加重平均']
      for (var i = 0; i < 18; i++) {
        var type = ''
        if (i < 9) {
          type = '前年实绩'
        } else {
          type = '今年计划'
        }
        var obj = {
          'type': type,
          'item': items[i],
          'price_1': (10 * Math.random()),
          'rate_1': (100 * Math.random()),
          'number_1': (100 * Math.random()),
          'money_1': (100 * Math.random()),
          'price_2': (10 * Math.random()),
          'rate_2': (100 * Math.random()),
          'number_2': (100 * Math.random()),
          'money_2': (100 * Math.random()),
          'price_3': (10 * Math.random()),
          'rate_3': (100 * Math.random()),
          'number_3': (100 * Math.random()),
          'money_3': (100 * Math.random()),
          'price_4': (10 * Math.random()),
          'rate_4': (100 * Math.random()),
          'number_4': (100 * Math.random()),
          'money_4': (100 * Math.random()),
          'price_5': (10 * Math.random()),
          'rate_5': (100 * Math.random()),
          'number_5': (100 * Math.random()),
          'money_5': (100 * Math.random()),
          'price_6': (10 * Math.random()),
          'rate_6': (100 * Math.random()),
          'number_6': (100 * Math.random()),
          'money_6': (100 * Math.random()),
          'price_7': (10 * Math.random()),
          'rate_7': (100 * Math.random()),
          'number_7': (100 * Math.random()),
          'money_7': (100 * Math.random()),
          'price_8': (10 * Math.random()),
          'rate_8': (100 * Math.random()),
          'number_8': (100 * Math.random()),
          'money_8': (100 * Math.random()),
          'price_9': (10 * Math.random()),
          'rate_9': (100 * Math.random()),
          'number_9': (100 * Math.random()),
          'money_9': (100 * Math.random()),
          'price_10': (10 * Math.random()),
          'rate_10': (100 * Math.random()),
          'number_10': (100 * Math.random()),
          'money_10': (100 * Math.random()),
          'price_11': (10 * Math.random()),
          'rate_11': (100 * Math.random()),
          'number_11': (100 * Math.random()),
          'money_11': (100 * Math.random()),
          'price_12': (10 * Math.random()),
          'rate_12': (100 * Math.random()),
          'number_12': (100 * Math.random()),
          'money_12': (100 * Math.random())
        }
        this.customerSubBrandList.push(obj)
      }
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 9,
            colspan: 1
          }
        } else if (rowIndex === 9) {
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
      } else {
        return
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
