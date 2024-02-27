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
                所属科室
              </div>
              <div class="input">
                <el-input v-model="writeoff.department" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">活动提示信息</span>
          <div class="input_box">
            <div class="flex1">
              <div class="input">
                推进部相关促销费信息提示
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">核销费用信息</span>
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
            <el-table-column prop="name" label="活动名称" min-width="320" align="center" />
            <el-table-column prop="rate" label="税率" min-width="120" align="center" />
            <el-table-column prop="ysfee" label="预算费用（含税）" min-width="120" align="center" />
            <el-table-column prop="ygfee" label="预估费用（含税）" min-width="120" align="center" />
            <el-table-column prop="tofee" label="待核销费用（含税）" min-width="170" align="center" />
            <el-table-column prop="cumfee" label="上月为止累计结转费用（含税）" min-width="320" align="center" />
            <el-table-column prop="dedfee" label="扣减费用" min-width="120" align="center" />
            <el-table-column prop="addfee" label="结转费用" min-width="120" align="center" />
            <el-table-column prop="actfee" label="实际核销费用" min-width="120" align="center" />
            <el-table-column
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
            </el-table-column>
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
// import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'PromotionChange',
  // components: { RelFuncSelect },
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
      fileList: []
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
      this.writeoff.date = new Date()
      this.writeoff.month = '2021-02'
      this.writeoff.feeType = '变动费'
      this.writeoff.department = '销售推进部'
      this.writeoff.remark = ''
      this.writeoff.time1 = '2020-12-31 10:37:16'
      this.writeoff.time2 = '2020-12-31 10:37:16'
      this.writeoff.people1 = '系统管理员'
      this.writeoff.people2 = '系统管理员'
      this.writeoff.details.push({
        name: '回转费_变动',
        rate: '13%',
        ysfee: '7400',
        ygfee: '7400',
        tofee: '7400',
        cumfee: '200',
        dedfee: '100',
        addfee: '100',
        actfee: '7100'
      })
      this.writeoff.details.push({
        name: '合同费（变动）',
        rate: '13%',
        ysfee: '19800',
        ygfee: '19700',
        tofee: '19700',
        cumfee: '0',
        dedfee: '0',
        addfee: '0',
        actfee: '19700'
      })
      this.writeoff.details.push({
        name: '变动费',
        rate: '13%',
        ysfee: '19800',
        ygfee: '19700',
        tofee: '19700',
        cumfee: '0',
        dedfee: '0',
        addfee: '0',
        actfee: '19700'
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
        if (index === 2 || index === 3 || index === 4) {
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
