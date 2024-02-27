<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div v-loading="isisloading" class="detail">
      <!-- <div class="pagetitle">
        <span v-if="writeoff.identiferNum" class="pagespan">清账编号: {{ writeoff.identiferNum }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">费用信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                部门
              </div>
              <div class="input">
                <dict-select dict-type-id="ShowDept" :value="writeoff.deptcode" :filter2="writeoff.month.substr(0,4)" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                核销年月
              </div>
              <div class="input">
                <el-input v-model="writeoff.month" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                区分
              </div>
              <div class="input">
                <el-input v-model="writeoff.difference" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">核销费用信息</span>
          <el-table
            ref="table"
            max-height="720"
            :data="writeoff.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
              :selectable="selectInit"
            />
            <el-table-column prop="account" label="代理商" min-width="170" align="center" />
            <!-- <el-table-column prop="feeName" label="一级费目" min-width="170" align="center" /> -->
            <el-table-column :label="'销售'" align="center">
              <el-table-column prop="bgtSalesAmount" label="预算" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.bgtSalesAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="estSalesAmount" label="预估" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.estSalesAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="exactSalesAmount" label="实际" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.exactSalesAmount|numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'合同返利费用'" align="center">
              <el-table-column prop="bgtAmount" label="预算" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.bgtAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="bgtFeeAmountProportion" label="预算费比" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.bgtFeeAmountProportion|numFormat(2) }}</span>
                  <span v-if="scope.row.bgtFeeAmountProportion!==null">%</span>
                </template>
              </el-table-column>
              <el-table-column prop="estAmount" label="预估" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.estAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="estFeeAmountProportion" label="预估费比" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.estFeeAmountProportion|numFormat(2) }}</span>
                  <span v-if="scope.row.estFeeAmountProportion!==null">%</span>
                </template>
              </el-table-column>
              <el-table-column prop="exactAmount" label="精准预估" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.exactAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="eactFeeAmountProportion" label="精准预估费比" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.eactFeeAmountProportion|numFormat(2) }}</span>
                  <span v-if="scope.row.eactFeeAmountProportion!==null">%</span>
                </template>
              </el-table-column>
              <el-table-column prop="estPayAmountWithoutFee" label="实绩促销费用" min-width="170" align="right">
                <template slot-scope="scope">
                  {{ scope.row.estPayAmountWithoutFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="realFeeAmountProportion" label="实绩促销费用费比" min-width="170" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.realFeeAmountProportion|numFormat(2) }}</span>
                  <span v-if="scope.row.realFeeAmountProportion!==null">%</span>
                </template>
              </el-table-column>
            </el-table-column>
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
          </el-table>
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
import { getChiefApprovalDetail } from '@/api/writeoff/approval.js'
export default {
  name: 'ApprovalEdit',
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
    },
    deptcode: {
      type: String,
      required: true
    },
    deptname: {
      type: String,
      default: ''
    },
    verifyym: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isisloading: false,
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        sku: [],
        attrs: {
        },
        details: []
      },
      fileList: [],
      processDialog: false
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
      this.isisloading = true
      this.writeoff.remark = ''

      console.log('ApprovalEdit2--->id:' + this.id)
      console.log('ApprovalEdit2--->deptCode:' + this.deptcode)
      console.log('ApprovalEdit2--->verifyYm:' + this.verifyym)
      console.log(this.writeoff)

      // 发生年月
      this.writeoff.month = this.verifyym
      // 区分
      if (this.id === '1') {
        this.writeoff.difference = '促销费'
      } else if (this.id === '2') {
        this.writeoff.difference = '合同返利'
      }
      // 部门
      // this.writeoff.department = this.deptname
      this.writeoff.deptcode = this.deptcode

      const params = {
        approvalDivId: this.id,
        submitOrg: this.deptcode,
        verifyYm: this.verifyym
      }
      const res = await getChiefApprovalDetail(params)
      if (res && res.success) {
        this.writeoff.approvalinfo = res.datas.approvalinfo
        const details = []
        this.writeoff.approvalinfo.forEach((item, index) => {
          const detail = {
            rowId: index,
            id: item.id,
            feeName: item.finAccountType,
            account: item.custName,
            bgtSalesAmount: item.sumBgtSalesAmount, // 销售预算
            estSalesAmount: item.sumEstSalesAmount, // 销售预估
            exactSalesAmount: item.sumExactSalesAmount, // 销售实际
            bgtAmount: item.sumBgtFeeAmount, // 促销费用预算
            bgtFeeAmountProportion: item.bgtFeeAmountProportion, // 促销费用预算费比
            estAmount: item.sumEstFeeAmount, // 促销费用预估
            estFeeAmountProportion: item.estFeeAmountProportion, // 促销费用预估费比
            exactAmount: item.sumExactFeeAmount, // 促销费用精准预估
            eactFeeAmountProportion: item.eactFeeAmountProportion, // 促销费用精准预估费比
            estPayAmountWithoutFee: item.sumRealFeeAmount, // 促销费用实际支付
            realFeeAmountProportion: item.realFeeAmountProportion, // 促销费用实际支付费比
            custCode: item.custCode,
            verifyYm: item.verifyYm,
            submitOrg: item.submitOrg,
            isEditable: item.isEditable,
            taskIds: item.taskIds,
            taskId: item.taskId
          }
          details.push(detail)
        })
        this.writeoff.details = details
      }
      this.isLoading = false
      this.isisloading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('subject', this.multipleSelection)
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
    selectInit(row, index) {
      console.log(row, 'row')
      if (row.isEditable === '0') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
