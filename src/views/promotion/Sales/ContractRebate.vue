<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="motion.identiferNum" class="pagespan">{{ $t('fee.promotion.identiferNum') }}: {{ motion.identiferNum }}</span>
      </div>
      <ul class="operation-box">
        <li class="operation-item">
          <el-upload
            class="upload-demo"
            action="#"

            multiple
            :limit="1"
          >
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
            <span class="operation-text" style="display:inline-block;margin-left:10px;">上传MAX返利率</span>
          </el-upload>
        </li>
        <li class="operation-item" @click="contractDetail">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">合同返利预算</span>
        </li>
        <li class="operation-item" @click="contractDetail">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">合同返利预估</span>
        </li>
        <li class="operation-item" @click="contractDetail">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">合同返利实际</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">合同返利规则</span>
        </li>
      </ul>
      <div class="search-list-table borderTable" style="background:#fff;padding:20px;">
        <div ref="tables" style="height: 100%;width:60%;display:inline-block;">
          <!-- <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span> -->
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="motion.fixedList"
            :span-method="objectSpanMethod"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column :prop="'agent'" :label="'代理商'" min-width="120" align="center" />
            <el-table-column :prop="'rate1'" :label="'MAX返利率'" min-width="120" align="center" />
            <el-table-column :prop="'subject'" :label="'返利费目'" min-width="120" align="center" />
            <el-table-column :prop="'rate2'" :label="'MAX返利率'" min-width="160" align="center" />
          </el-table>
        </div>
        <div style="width:30%;display:inline-block;vertical-align: top;margin-left:30px;">
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                起效年
              </div>
              <div class="input">
                <el-date-picker v-model="rateYear" size="small" type="year" :clearable="false" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { numFormat } from '@/mixins/num-format'
// import ProductPop from '@/views/mdm/product/components/ProductPop'
// import ExpenseAccountPop from '@/views/fee/promotion/components/ExpenseAccountPop'
// import ExpenseUseStatusPop from '@/views/fee/promotion/components/ExpenseUseStatusPop'
// import DepartmentSelect from '@/components/DepartmentSelect.vue'
export default {
  name: 'ContractRebate',
  // components: { ProductPop, ExpenseAccountPop, ExpenseUseStatusPop },
  mixins: [names, formValidator, permission, dict, numFormat],
  data() {
    return {
      isLoading: true,
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      motion: {
        fixedList: []
      },
      rateYear: new Date()
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
      this.motion.fixedList = [{
        agent: '北京一商',
        rate1: '4.30%',
        subject: '预估准确性返利',
        rate2: '0.10%'
      },
      {
        agent: '北京一商',
        rate1: '4.30%',
        subject: '提前下单货补',
        rate2: '1.00%'
      },
      {
        agent: '北京一商',
        rate1: '4.30%',
        subject: '季度返利',
        rate2: '1.00%'
      },
      {
        agent: '北京一商',
        rate1: '4.30%',
        subject: '半年返利',
        rate2: '1.00%'
      },
      {
        agent: '北京一商',
        rate1: '4.30%',
        subject: '年度返利',
        rate2: '1.00%'
      },
      {
        agent: '北京一商',
        rate1: '4.30%',
        subject: '物流破损补贴',
        rate2: '0.20%'
      },
      {
        agent: '天津生亿源',
        rate1: '4.30%',
        subject: '预估准确性返利',
        rate2: '0.10%'
      },
      {
        agent: '天津生亿源',
        rate1: '4.30%',
        subject: '提前下单货补',
        rate2: '1.00%'
      },
      {
        agent: '天津生亿源',
        rate1: '4.30%',
        subject: '季度返利',
        rate2: '1.00%'
      },
      {
        agent: '天津生亿源',
        rate1: '4.30%',
        subject: '半年返利',
        rate2: '1.00%'
      },
      {
        agent: '天津生亿源',
        rate1: '4.30%',
        subject: '年度返利',
        rate2: '1.00%'
      },
      {
        agent: '天津生亿源',
        rate1: '4.30%',
        subject: '物流破损补贴',
        rate2: '0.20%'
      }
      ]
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
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex % 6 === 0) {
          return {
            rowspan: 6,
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
    contractDetail() {
      this.$router.push('/promotion/contractDetail')
    }
  }
}
</script>
