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
                Sub品牌编号
              </div>
              <div class="input">
                <el-input v-model="subBrandNum" :disabled="true" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                Sub品牌名称
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
            <template v-for="item in headerMonth">
              <el-table-column :key="item" :label="item+'月'">
                <el-table-column :label="'单价'" align="right" min-width="120">
                  <template slot-scope="scope">
                    <milli-input v-if="scope.row.type==='当月月次' && editable" v-model="scope.row['price_'+item]" to-fixed-num="2" />
                    <span v-else>{{ scope.row['price_'+item] | numFormat(2) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column :label="'比率'" align="right" min-width="120">
                  <template slot-scope="scope">
                    <milli-input v-if="scope.row.type==='当月月次' && editable" v-model="scope.row['rate_'+item]" append="%" />
                    <span v-else>{{ scope.row['rate_'+item] | numFormat(1) }}%
                    </span>
                  </template>
                </el-table-column>
                <el-table-column :label="'数量'" align="right" min-width="120">
                  <template slot-scope="scope">
                    <milli-input v-if="scope.row.type==='当月月次' && editable" v-model="scope.row['number_'+item]" />
                    <span v-else>{{ scope.row['number_'+item] | numFormat(0) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column :label="'金额'" align="right" min-width="120">
                  <template slot-scope="scope">
                    <milli-input v-if="scope.row.type==='当月月次' && editable" v-model="scope.row['money_'+item]" to-fixed-num="2" />
                    <span v-else>{{ scope.row['money_'+item] | numFormat(2) }}
                    </span>
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
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
import { dateFormat } from '@/utils/util'
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
      accountNum: 'CUS20120001',
      accountName: '沃尔玛',
      subBrandNum: 'SBD00001',
      subBrandName: 'MERRIES',
      activeNames: ['1', '2'],
      customerSubBrandList: [],
      month: '',
      headerMonth: []
    }
  },
  async created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.customerSubBrandList = []
      this.month = Number(dateFormat(new Date(), 'M'))
      this.headerMonth = [
        this.month,
        (this.month + 1) === 12 ? 12 : (this.month + 1) % 12,
        (this.month + 2) === 12 ? 12 : (this.month + 2) % 12,
        (this.month + 3) === 12 ? 12 : (this.month + 3) % 12,
        (this.month + 4) === 12 ? 12 : (this.month + 4) % 12,
        (this.month + 5) === 12 ? 12 : (this.month + 5) % 12,
        (this.month + 6) === 12 ? 12 : (this.month + 6) % 12
      ]
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
          type = '当月预算'
        } else {
          type = '当月月次'
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
