<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                客户
              </div>
              <div class="input">
                <account-select v-model="bdDesign.bdUser" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">销售设计</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                试算年月
              </div>
              <div class="input">
                <el-date-picker v-model="bdDesign.budgetMonth" size="small" type="month" :clearable="false" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                品牌
              </div>
              <div class="input">
                <el-input v-model="bdDesign.brand" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                Sub品牌
              </div>
              <div class="input">
                <el-input v-model="bdDesign.SubBrand" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                SKU
              </div>
              <div class="input">
                <rel-func-select v-model="bdDesign.sku" :rel-func="'product'" />
              </div>
              <!-- <div class="title">
                CODE
              </div>
              <div class="input">
                <el-input v-model="bdDesign.code" />
              </div> -->
            </div>
            <div class="flex3">
              <div class="title">
                品名
              </div>
              <div class="input">
                <el-input v-model="bdDesign.brandName" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                箱规
              </div>
              <div class="input">
                <el-input v-model="bdDesign.category1" />
              </div>
            </div>
            <div class="flex1 add_row">
              <el-button class="editbtn" style="margin-left:90%" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleTrial()">
                试算
              </el-button>
            </div>
          </div>
          <el-table
            v-if="isTrial"
            ref="table"
            v-loading="isLoading"
            :data="designList"
            height="100%"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            :cell-class-name="CellStyle"
          >
            <el-table-column prop="category2" label="科目" min-width="150" />
            <el-table-column :label="month +'月预算'" align="center">
              <el-table-column prop="price1" label="单价" width="100" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.price1 | numFormat(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="ratio1" label="比率" width="100" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.ratio1 }}%</span>
                </template>
              </el-table-column>
              <el-table-column prop="number1" label="数量" width="100" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.number1 | numFormat(0) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="money1" label="金额" width="100" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.money1 | numFormat(2) }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="month +'月预估'" align="center">
              <el-table-column prop="price2" label="单价" width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-model="scope.row.price2" to-fixed-num="2" />
                </template>
              </el-table-column>
              <el-table-column prop="ratio2" label="比率" width="130" align="right">
                <template slot-scope="scope">
                  <milli-input v-model="scope.row.ratio2" append="%" />
                </template>
              </el-table-column>
              <el-table-column prop="number2" label="数量" width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-model="scope.row.number2" />
                </template>
              </el-table-column>
              <el-table-column prop="money2" label="金额" width="100" align="right">
                <template slot-scope="scope">
                  <milli-input v-model="scope.row.money2" to-fixed-num="2" />
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit('save')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
        </li>
        <!-- 提交 -->
        <li class="operation-item" @click="handleSubmit('submit')">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontijiao" /></span>
          <span class="operation-text">{{ $t('comm.submit') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <!-- <div>
      <product-pop :is-show="productSelectDialog"  @cancel="productSelectDialog=false" @clear="handleSelectClear" @select="handleProductSelected" />
    </div> -->
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import AccountSelect from '@/views/mrk/account/components/AccountSelect.vue'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
import { dateFormat } from '@/utils/util'
export default {
  name: 'BdEdit',
  components: { AccountSelect, RelFuncSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      productSelectDialog: false,
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      isTrial: false,
      bdDesign: {
        // brand: 'MERRIES',
        // SubBrand: 'MERRIES EXTRA DRY',
        // code: '722862',
        // brandName: 'MRS-ED NB 90x2 1809',
        budgetMonth: new Date(),
        brand: '',
        SubBrand: '',
        code: '',
        brandName: '',
        category1: '',
        designList: [],
        attrs: {
        },
        details: []
      },
      designList: [],
      mergeData: '',
      provinceArr: [],
      selectUserDialog: false,
      processDialog: false
    }
  },
  computed: {
    // id: function() { return this.$route.query.id || this.$route.query.businessKey }
    month: function() {
      if (this.bdDesign.budgetMonth) {
        return dateFormat(this.bdDesign.budgetMonth, 'M')
      }
      return ''
    }
  },
  watch: {
  },
  async created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      var list = []
      for (var i = 1; i < 13; i++) {
        var d = {
          category2: i,
          price1: 3 + i,
          ratio1: i * 10,
          number1: 4 + i,
          money1: 40 + i,
          price2: 3 + i,
          ratio2: (i + 1) * 10,
          number2: 4 + i,
          money2: 40 + i
        }
        list.push(d)
      }
      list[0].category2 = 'Gross Sales'
      list[1].category2 = 'Discount'
      list[2].category2 = 'Trade Disc'
      list[3].category2 = 'Promo Disc'
      list[4].category2 = 'Return'
      list[5].category2 = 'Rebate'
      list[6].category2 = 'Net Sales'
      list[7].category2 = 'Sp-MK'
      list[8].category2 = 'SP-TMK'
      list[9].category2 = 'EC Ad.'
      list[10].category2 = 'Net net Sales'
      list[11].category2 = '加重平均'
      this.designList = list
      // this.merage() // 合并的方法
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
    CellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && (rowIndex === 1 || rowIndex === 7 || rowIndex === 8 || rowIndex === 4 || rowIndex === 5 || rowIndex === 9
      )) {
        return 'account-text-indent1'
      } else if (columnIndex === 0 && (rowIndex === 2 || rowIndex === 3)) {
        return 'account-text-indent2'
      }
    },
    // merageInit() {
    //   this.provinceArr = []
    //   this.provincePos = 0
    // },
    // merage() { // 要合并的数组的方法
    //   this.merageInit()
    //   for (var i = 0; i < this.designList.length; i++) {
    //     if (i === 0) {
    //       // 第一行必须存在
    //       this.provinceArr.push(1)
    //       this.provincePos = i
    //     } else {
    //       // 判断当前元素与上一个元素是否相同 this.provincePos是provinceArr内容的序号
    //       // 省
    //       if (this.designList[i].type === this.designList[i - 1].type) {
    //         this.provinceArr[this.provincePos] += 1
    //         this.provinceArr.push(0)
    //       } else {
    //         this.provinceArr.push(1)
    //         this.provincePos = i
    //       }
    //     }
    //   }
    // },
    handleBack() {
      this.$router.go(-1)
    },
    handleProductSelected(products) {
      console.log(products)
    },
    handleTrial() {
      if (!this.bdDesign.budgetMonth) {
        this.$message({
          type: 'error',
          message: '请选择试算年月'
        })
        return false
      }
      this.isTrial = true
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if ((columnIndex === 0)) {
        const _row_1 = this.provinceArr[rowIndex]
        const _col_1 = _row_1 > 0 ? 1 : 0 // 如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        }
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.input_col {
  padding: 0px 0px 0px 0px;
}
</style>
<style lang="scss">
.aligh-top{
  vertical-align: top !important;
}

</style>
