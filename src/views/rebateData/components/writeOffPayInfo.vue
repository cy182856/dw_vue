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
                <el-input v-model="writeoff.verificationCode" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                代理商名称
              </div>
              <div class="input">
                <el-input v-model="writeoff.custName" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                预定支付日
              </div>
              <div class="input">
                <el-date-picker v-model="writeoff.datePrePay" type="date" :clearable="false" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                年月
              </div>
              <div class="input">
                <el-date-picker v-model="writeoff.ym" type="month" :clearable="false" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用类型
              </div>
              <div class="input">
                <el-input v-model="writeoff.feeType" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">费用信息</span>

          <el-table
            ref="table"
            :data="writeoff.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column label="单包管理手续费" prop="SX" min-width="170" align="right">
              <template v-if="!!writeoff.details[0]['SX']" slot-scope="scope">
                {{ scope.row.SX |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="月度" min-width="70">
              <el-table-column prop="TQ" label="提前下单货补" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['TQ']" slot-scope="scope">
                  {{ scope.row.TQ |numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="YG" label="预估准确性" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['YG']" slot-scope="scope">
                  {{ scope.row.YG |numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="季度" min-width="170" align="center">
              <el-table-column prop="JD" label="销售目标达成" min-width="220" align="right">
                <template v-if="!!writeoff.details[0]['JD']" slot-scope="scope">
                  {{ scope.row.JD |numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="半年" min-width="70">
              <el-table-column prop="BN" label="销售目标达成" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['BN']" slot-scope="scope">
                  {{ scope.row.BN |numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="WL" label="物流破损补贴" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['WL']" slot-scope="scope">
                  {{ scope.row.WL |numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="年度" min-width="170" align="right">
              <el-table-column prop="ND" label="销售目标达成" min-width="170" align="right">
                <template v-if="!!writeoff.details[0]['ND']" slot-scope="scope">
                  {{ scope.row.ND |numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="订单返利" min-width="170" prop="QT" lign="right">
              <template v-if="!!writeoff.details[0]['QT']" slot-scope="scope">
                {{ scope.row.QT |numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>

          <el-table
            ref="table"
            :data="writeoff.details2"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column label="销售实际" min-width="170" align="right">
              <template v-if="scope.row.salesPerfomance!==0" slot-scope="scope">
                {{ scope.row.salesPerfomance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="合同费差异" min-width="170" prop="contractCostVariance" align="right">
              <template v-if="scope.row.contractCostVariance!==0" slot-scope="scope">
                {{ scope.row.contractCostVariance |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="前月结转" min-width="170" prop="forwardInAmount" align="right">
              <template v-if="scope.row.forwardInAmount!==0" slot-scope="scope">
                {{ scope.row.forwardInAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="本月应付" min-width="170" prop="perfomance" align="right">
              <template v-if="scope.row.rebateAmount!==0" slot-scope="scope">
                {{ scope.row.rebateAmount |numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column label="本月结转" min-width="170" prop="forwardOutAmount" align="right">
              <template v-if="scope.row.forwardOutAmount!==0" slot-scope="scope">
                {{ scope.row.forwardOutAmount |numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">其他信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                创建时间
              </div>
              <el-date-picker
                v-model="writeoff.createTime"
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
                  v-model="writeoff.createBy"
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
                v-model="writeoff.updateTime"
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
                  v-model="writeoff.updateBy"
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
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
import { getDetail } from '@/api/rebaterules/writeoff.js'
export default {
  name: 'TerminalInfo',
  components: { UserSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
  props: {
    ym: {
      type: String,
      required: true
    },
    custcode: {
      type: String,
      required: true
    },
    contractCost: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      actSumAmount: null,
      disabled: false,
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        checked: true,
        radio: '1',
        attrs: {
        },
        details: [{}],
        details2: []
      },
      fileList: [],
      processDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  watch: {
  },
  async created() {
    console.log(this.ym, this.custcode, 111)
    if (this.custcode && this.ym) {
      this.disabled = true
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      this.searchList()
    },
    async searchList() {
      const res = await getDetail({ 'custCode': this.custcode, 'ym': this.ym })
      if (res && res.success) {
        const detailData = res.datas.resultMap
        this.writeoff.details = detailData.yueRuleDataList
        this.writeoff.details2 = [detailData.rebateBook]
        this.writeoff.feeType = '合同返利'
        this.writeoff.verificationCode = detailData.rebateBook.verificationCode
        this.writeoff.verificationStatus = detailData.rebateBook.verificationStatus
        this.writeoff.datePreRebate = detailData.rebateBook.datePreRebate
        this.writeoff.id = detailData.rebateBook.id
        this.writeoff.identiferNum = detailData.rebateBook.identiferNum
        this.writeoff.custName = detailData.rebateBook.custName
        this.writeoff.datePrePay = detailData.rebateBook.datePreRebate
        this.writeoff.ym = detailData.rebateBook.ym
        this.writeoff.createTime = detailData.rebateBook.createTime
        this.writeoff.updateTime = detailData.rebateBook.updateTime
        this.writeoff.createBy = detailData.rebateBook.createBy
        this.writeoff.updateBy = detailData.rebateBook.updateBy
        this.actSumAmount = detailData.actSumAmount
        this.writeoff.details2[0]['contractCostVariance'] = this.contractCost
        // console.log(678, this.contractCost)
        const sendData = {
          verificationStatus: this.writeoff.verificationStatus,
          sendEmail: {
            'id': this.writeoff.id,
            'custCode': this.custcode,
            'ym': this.writeoff.ym,
            'custName': this.writeoff.custName,
            'verificationCode': this.writeoff.verificationCode
          },
          comeBack: {
            'id': this.writeoff.id,
            'custCode': this.custcode,
            'ym': this.writeoff.ym,
            'verificationCode': this.writeoff.verificationCode
          },
          calculation: {
            'ym': this.writeoff.ym,
            'custName': this.writeoff.custName
          },
          // submitData: {
          //   'id': this.writeoff.id,
          //   'custName': this.writeoff.custName,
          //   'ym': this.writeoff.ym,
          //   'identiferNum': this.writeoff.identiferNum,
          //   'datePreRebate': this.writeoff.datePreRebate
          // }
          submitData: detailData.rebateBook
        }
        console.log(detailData.rebateBook)
        console.log(sendData)
        // console.log(sendData, 'sendData')
        this.$emit('sendData', sendData)
      }
    },
    handleAddInvoice() {
      var curr_time = new Date()
      var strDate = curr_time.getYear() + 1900 + '/'
      strDate += curr_time.getMonth() + 1 + '/'
      strDate += curr_time.getDate() + ' '
      strDate += curr_time.getHours() + ':'
      strDate += curr_time.getMinutes() + ':'
      strDate += curr_time.getSeconds()
      this.writeoff.details.push({
        name: '',
        price: '',
        people: 'admin',
        time: strDate
      })
    },
    handleDeleteDetail(index, type) {
      this.writeoff.details.splice(index, 1)
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
        if (index === 3 || index === 4 || index === 5 || index === 7) {
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
