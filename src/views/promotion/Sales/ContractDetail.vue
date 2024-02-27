<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="motion.identiferNum" class="pagespan">{{ $t('fee.promotion.identiferNum') }}: {{ motion.identiferNum }}</span>
      </div>
      <ul class="operation-box">
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
            v-loading="isLoading"
            :data="motion.fixedList"
            class="bi-table"
            border
            stripe
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div ref="tables">
                  <el-table
                    ref="table"
                    :data="scope.row.monthfee2"
                    stripe
                    border
                    show-summary
                    :summary-method="getSummaries"
                    height="100%"
                    :header-cell-style="{ 'text-align': 'center' }"
                  >
                    <el-table-column prop="namelie" :label="'返利种类'" min-width="120" />
                    <template v-for="item in headerMonth">
                      <el-table-column :key="item" :label="item + '月'">
                        <template slot-scope="scope2">
                          {{ scope2.row.monthfeelie[item-1] }}
                        </template>
                      </el-table-column>
                    </template>
                  </el-table>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="'代理商'" min-width="300" />
            <template v-for="item in headerMonth">
              <el-table-column :key="item" :label="item + '月'">
                <template slot-scope="scope">
                  {{ scope.row.monthfee[item-1] }}
                </template>
              </el-table-column>
            </template>
          </el-table>
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
  name: 'ContractDetail',
  // components: { ProductPop, ExpenseAccountPop, ExpenseUseStatusPop },
  mixins: [names, formValidator, permission, dict, numFormat],
  data() {
    return {
      isLoading: true,
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectsku: '',
      popType: '',
      motion: {
        fixedList: [{
          name: '北京一商',
          monthfee: [950, 1050, 1000, 800, 1100, 1200, 1000, 800, 1100, 800, 1100, 1100],
          monthfee2: [{
            namelie: '预估准确性返利',
            monthfeelie: [200, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '提前下单货补',
            monthfeelie: [300, 600, 300, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '季度返利',
            monthfeelie: [300, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '半年返利',
            monthfeelie: [100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '年度返利',
            monthfeelie: [50, 50, 300, 400, 700, 800, 600, 400, 700, 400, 700, 700]
          },
          {
            namelie: '物流破损补贴',
            monthfeelie: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          ]
        },
        {
          name: '陕西景铄',
          monthfee: [111950, 1050, 1000, 800, 1100, 1200, 1000, 800, 1100, 800, 1100, 1100],
          monthfee2: [{
            namelie: '预估准确性返利',
            monthfeelie: [111200, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '提前下单货补',
            monthfeelie: [300, 600, 300, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '季度返利',
            monthfeelie: [300, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '半年返利',
            monthfeelie: [100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '年度返利',
            monthfeelie: [50, 50, 300, 400, 700, 800, 600, 400, 700, 400, 700, 700]
          },
          {
            namelie: '物流破损补贴',
            monthfeelie: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          ]
        },
        {
          name: '陕西兴耀隆',
          monthfee: [950, 1050, 1000, 800, 1100, 1200, 1000, 800, 1100, 800, 1100, 1100],
          monthfee2: [{
            namelie: '预估准确性返利',
            monthfeelie: [200, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '提前下单货补',
            monthfeelie: [300, 600, 300, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '季度返利',
            monthfeelie: [300, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '半年返利',
            monthfeelie: [100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '年度返利',
            monthfeelie: [50, 50, 300, 400, 700, 800, 600, 400, 700, 400, 700, 700]
          },
          {
            namelie: '物流破损补贴',
            monthfeelie: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          ]
        },
        {
          name: '陕西英瀚',
          monthfee: [111950, 1050, 1000, 800, 1100, 1200, 1000, 800, 1100, 800, 1100, 1100],
          monthfee2: [{
            namelie: '预估准确性返利',
            monthfeelie: [111200, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '提前下单货补',
            monthfeelie: [300, 600, 300, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '季度返利',
            monthfeelie: [300, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '半年返利',
            monthfeelie: [100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '年度返利',
            monthfeelie: [50, 50, 300, 400, 700, 800, 600, 400, 700, 400, 700, 700]
          },
          {
            namelie: '物流破损补贴',
            monthfeelie: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          ]
        },
        {
          name: '天津生亿源',
          monthfee: [950, 1050, 1000, 800, 1100, 1200, 1000, 800, 1100, 800, 1100, 1100],
          monthfee2: [{
            namelie: '预估准确性返利',
            monthfeelie: [200, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '提前下单货补',
            monthfeelie: [300, 600, 300, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '季度返利',
            monthfeelie: [300, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '半年返利',
            monthfeelie: [100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '年度返利',
            monthfeelie: [50, 50, 300, 400, 700, 800, 600, 400, 700, 400, 700, 700]
          },
          {
            namelie: '物流破损补贴',
            monthfeelie: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          ]
        },
        {
          name: '北京得欣',
          monthfee: [111950, 1050, 1000, 800, 1100, 1200, 1000, 800, 1100, 800, 1100, 1100],
          monthfee2: [{
            namelie: '预估准确性返利',
            monthfeelie: [111200, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '提前下单货补',
            monthfeelie: [300, 600, 300, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '季度返利',
            monthfeelie: [300, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '半年返利',
            monthfeelie: [100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            namelie: '年度返利',
            monthfeelie: [50, 50, 300, 400, 700, 800, 600, 400, 700, 400, 700, 700]
          },
          {
            namelie: '物流破损补贴',
            monthfeelie: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          ]
        }
        ]
      }
    }
  },
  computed: {
    id: function() { return this.$route.query.id || this.$route.query.businessKey },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    }
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
      // this.motion.fixedList = [{
      //   name: '北京一商',
      //   monthfee: [950, 1050, 1000, 800, 1100, 1200, 1000, 800, 1100, 800, 1100, 1100],
      //   monthfee2: [{
      //     namelie: '预估准确性返利',
      //     monthfeelie: [200, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100]
      //   },
      //   {
      //     namelie: '提前下单货补',
      //     monthfeelie: [300, 600, 300, 100, 100, 100, 100, 100, 100, 100, 100, 100]
      //   },
      //   {
      //     namelie: '季度返利',
      //     monthfeelie: [300, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
      //   },
      //   {
      //     namelie: '半年返利',
      //     monthfeelie: [100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
      //   },
      //   {
      //     namelie: '年度返利',
      //     monthfeelie: [50, 50, 300, 400, 700, 800, 600, 400, 700, 400, 700, 700]
      //   },
      //   {
      //     namelie: '物流破损补贴',
      //     monthfeelie: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      //   }
      //   ]
      // }]
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
    handleAddDetail(type) {
      this.motion.discussResultList.push({
        reportDate: '',
        isFixWithMotion: '',
        discussContent: ''
      })
      // if (type === '1') {
      //   this.motion.recordDateList.push({
      //     yearMonth: '',
      //     salesAmount: '',
      //     expenseAmount: ''
      //   })
      // }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      console.log(columns)
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item['monthfeelie'][index - 1]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    }
  }
}
</script>
