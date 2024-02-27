<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <!-- <div class="pagetitle">
        <span v-if="writeoff.identiferNum" class="pagespan">清账编号: {{ writeoff.identiferNum }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                核销单号
              </div>
              <div class="input">
                <el-input v-model="writeoff.code" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                代理商名称
              </div>
              <div class="input">
                <el-input v-model="writeoff.name" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                所属科室
              </div>
              <div class="input">
                <el-input v-model="writeoff.department" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                核销年月
              </div>
              <div class="input">
                <el-input v-model="writeoff.month" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用类型
              </div>
              <div class="input">
                <el-input v-model="writeoff.feeType" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                预定支付日
              </div>
              <div class="input">
                <el-date-picker v-model="writeoff.date" type="date" :writeoffable="false" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                本月待核销费用
              </div>
              <div class="input">
                <el-input v-model="writeoff.feeing" :disabled="true" />
              </div>
            </div>
            <!-- <div class="flex3">
              <div class="title">
                上月结转费用
              </div>
              <div class="input">
                <el-input v-model="writeoff.feeed" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                本月支付费用
              </div>
              <div class="input">
                <el-input v-model="writeoff.paying" />
              </div>
            </div> -->
          </div>
          <!-- <div class="input_box">
            <div class="flex3">
              <div class="title">
                结转费用
              </div>
              <div class="input">
                <el-input v-model="writeoff.forward" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                结转费用预定支付日
              </div>
              <div class="input">
                <el-date-picker v-model="writeoff.date2" type="date" :writeoffable="false" />
              </div>
            </div>
          </div> -->
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">费用明细信息</span>
          <el-table
            ref="table"
            :data="writeoff.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            show-summary
            :summary-method="getSummaries"
            border
            stripe
            height="100%"
          >
            <el-table-column prop="category" label="品类" min-width="170" align="center" />
            <el-table-column prop="name" label="费用名称" min-width="170" align="center" />
            <el-table-column prop="type" label="费用类别" min-width="170" align="center" />
            <el-table-column prop="rate" label="税率" min-width="170" align="center" />
            <el-table-column prop="ysfee" label="预算费用（含税）" min-width="170" align="center" />
            <el-table-column prop="ygfee" label="预估费用（含税）" min-width="170" align="center" />
            <el-table-column prop="tofee" label="精准预估费用（含税）" min-width="170" align="center" />
            <el-table-column prop="actfee" label="实际支付费用" min-width="170" align="center" />
            <!-- <el-table-column
              :prop="'code'"
              label="操作"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/writeoff/adjust',
                    query: { id: scope.row.id },
                  }"
                >
                  调整
                </router-link>
              </template>
            </el-table-column> -->
          </el-table>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("fee.promotion.remark") }}
              </div>
              <div class="input">
                <el-input
                  v-model="writeoff.remark"
                  type="textarea"
                  :rows="3"
                  height="200px"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">其他信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                创建时间
              </div>
              <el-date-picker
                v-model="writeoff.time1"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                创建者
              </div>
              <div class="input">
                <user-select
                  v-model="writeoff.user"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                最后修改时间
              </div>
              <el-date-picker
                v-model="writeoff.time2"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                最后修改者
              </div>
              <div class="input">
                <user-select
                  v-model="writeoff.user2"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'FinanceFixed',
  components: { UserSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'detail'
    }
  },
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        attrs: {
        },
        details: []
      },
      fileList: [],
      processDialog: false,
      paymentType: [{ value: '合同费支付', lable: '01' }, { value: '活动费支付', lable: '02' }],
      paymentMethod: [{ value: '银行转账', lable: '01' }, { value: '支付宝', lable: '02' }],
      attachmentAddStatus: [{ value: '有发票', lable: '01' }, { value: '无发票', lable: '02' }],
      expenseAccountNum: [{ value: '066901', lable: '01' }, { value: '066902', lable: '02' }],
      uses: [{ value: '用途 01', lable: '01' }, { value: '用途 02', lable: '02' }, { value: '用途 03', lable: '03' }]
    }
  },
  computed: {
  },
  watch: {
  },
  async created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.writeoff.code = '4246214'
      this.writeoff.name = '上海麦田'
      this.writeoff.date = '2021-03-10'
      this.writeoff.month = '2021-02'
      this.writeoff.feeType = '固定费'
      this.writeoff.department = '战略推进部'
      this.writeoff.feeing = '2385'
      this.writeoff.feeed = '30'
      this.writeoff.paying = '2395'
      this.writeoff.forward = '20'
      this.writeoff.date2 = '2021-04-10'
      this.writeoff.remark = ''
      this.writeoff.time1 = '2020-12-31 10:37:16'
      this.writeoff.time2 = '2020-12-31 10:37:16'
      this.writeoff.user = '系统管理员'
      this.writeoff.user2 = '系统管理员'
      this.writeoff.details.push({
        category: '纸品',
        name: '活动费',
        rate: '6%',
        ysfee: '1000',
        ygfee: '1000',
        tofee: '1000',
        cumfee: '5',
        dedfee: '0',
        addfee: '20',
        actfee: '985',
        remarks: '备注1',
        type: '定额'
      })
      this.writeoff.details.push({
        category: '纸品',
        name: '陈列费',
        rate: '6%',
        ysfee: '600',
        ygfee: '600',
        tofee: '600',
        cumfee: '0',
        dedfee: '',
        addfee: '',
        actfee: '600',
        remarks: '备注2',
        type: '定额'
      })
      this.writeoff.details.push({
        category: '纸品',
        name: '进场费',
        rate: '6%',
        ysfee: '800',
        ygfee: '800',
        tofee: '800',
        cumfee: '0',
        dedfee: '',
        addfee: '',
        actfee: '800',
        remarks: '备注2',
        type: '定率'
      })
      this.writeoff.details.push({
        category: '婴童',
        name: '活动费',
        rate: '6%',
        ysfee: '1000',
        ygfee: '1000',
        tofee: '1000',
        cumfee: '5',
        dedfee: '0',
        addfee: '20',
        actfee: '985',
        remarks: '备注1',
        type: '定额'
      })
      this.writeoff.details.push({
        category: '婴童',
        name: '陈列费',
        rate: '6%',
        ysfee: '600',
        ygfee: '600',
        tofee: '600',
        cumfee: '0',
        dedfee: '',
        addfee: '',
        actfee: '600',
        remarks: '备注2',
        type: '定额'
      })
      this.writeoff.details.push({
        category: '婴童',
        name: '进场费',
        rate: '6%',
        ysfee: '800',
        ygfee: '800',
        tofee: '800',
        cumfee: '0',
        dedfee: '',
        addfee: '',
        actfee: '800',
        remarks: '备注2',
        type: '定率'
      })
      // this.$emit('load', this.writeoff)
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
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      console.log(columns)
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 4 || index === 5 || index === 6 || index === 7) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index]
          } else {
            sums[index] = 'N/A'
          }
        }
      })
      return sums
    }

  }
}
</script>
