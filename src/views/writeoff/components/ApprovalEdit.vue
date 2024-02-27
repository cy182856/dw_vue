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
                <dict-select dict-type-id="ShowDept" :value="writeoff.submitOrg" :filter2="writeoff.month.substr(0,4)" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                发生年月
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
          <div class="input_box" style="margin-bottom:20px;">
            <!-- <div class="flex2">
              <div class="title">
                品类
              </div>
              <div class="input">
                <el-select v-model="writeoff.sku" multiple placeholder="请选择" @change="skuChange">
                  <el-option
                    v-for="item in skus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div> -->
          </div>
          <el-table
            ref="table"
            v-loading="isexpandisloading"
            max-height="720"
            :data="writeoff.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
            @expand-change="expandChange"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
              :selectable="selectInit"
              fixed
            />
            <el-table-column type="expand" width="40" align="center" fixed>
              <template slot-scope="props">
                <el-table
                  ref="table1"
                  class="table-expand"
                  :data="props.row.children"
                  :header-cell-style="{'text-align':'center'}"
                  border
                >
                  <el-table-column prop="productCategory" label="品类" min-width="170" align="center" />
                  <!-- <el-table-column prop="fee" label="费用" min-width="170" align="center" /> -->
                  <!-- <el-table-column :label="'销售'" align="center">
                    <el-table-column prop="data1" label="预算" min-width="120" align="center" />
                    <el-table-column prop="data2" label="预估" min-width="120" align="center" />
                    <el-table-column prop="data3" label="实际" min-width="120" align="center" />
                  </el-table-column> -->
                  <el-table-column :label="'促销费用'" align="right">
                    <el-table-column prop="realFeeAmount" label="实绩促销费用" min-width="170" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.realFeeAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="realFeeAmountProportion" label="实绩促销费用费比" min-width="170" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.realFeeAmountProportion|numFormat(2) }}</span>
                        <span v-if="scope.row.realFeeAmountProportion!==null">%</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="actAmount" label="实绩支付费用" min-width="170" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.actAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="actAmountProportion" label="实绩支付费用费比" min-width="170" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.actAmountProportion|numFormat(2) }}</span>
                        <span v-if="scope.row.actAmountProportion!==null">%</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="eactFeeAmount" label="精准预估" min-width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.eactFeeAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="eactFeeAmountProportion" label="精准预估费比" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.eactFeeAmountProportion|numFormat(2) }}</span>
                        <span v-if="scope.row.eactFeeAmountProportion!==null">%</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="estFeeAmount" label="预估" min-width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.estFeeAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="estFeeAmountProportion" label="预估费比" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.estFeeAmountProportion|numFormat(2) }}</span>
                        <span v-if="scope.row.estFeeAmountProportion!==null">%</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="bgtFeeAmount" label="预算" min-width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.bgtFeeAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="bgtFeeAmountProportion" label="预算费比" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.bgtFeeAmountProportion|numFormat(2) }}</span>
                        <span v-if="scope.row.bgtFeeAmountProportion!==null">%</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column fixed prop="account" label="代理商" min-width="170" align="center" />
            <el-table-column prop="feeName" label="一级费目" min-width="170" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="AccountTypeView" :value="scope.row.feeName" />
              </template>
            </el-table-column>
            <el-table-column :label="'销售'" align="center">
              <el-table-column prop="exactSalesAmount" label="实际" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.exactSalesAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="estSalesAmount" label="预估" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.estSalesAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="bgtSalesAmount" label="预算" min-width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.bgtSalesAmount|numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'促销费用'" align="right">
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
              <el-table-column prop="actAmount" label="实绩支付费用" min-width="170" align="right">
                <template slot-scope="scope">
                  {{ scope.row.actAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="actAmountProportion" label="实绩支付费用费比" min-width="170" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.actAmountProportion|numFormat(2) }}</span>
                  <span v-if="scope.row.actAmountProportion!==null">%</span>
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
import { getChiefApprovalDetail, getApprovalRebateDetail } from '@/api/writeoff/approval.js'
import { treeListProduct } from '@/api/est/tree.js'
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
      isexpandisloading: false,
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
      processDialog: false,
      skus: []
    }
  },
  computed: {
  },
  watch: {
  },
  async created() {
    this.fetchData()

    this.getCategoryList()
  },
  methods: {
    async getCategoryList() {
      const res = await treeListProduct(this.deptcode)
      if (res && res.success) {
        const results = res.datas.list
        const lastproduct = this.getTreeList(results, 'category')
        this.skus = lastproduct
        // 品类默认选中全部
        if (this.skus.length > 0) {
          for (let i = 0; i < this.skus.length; i++) {
            this.writeoff.sku.push(i + 1)
          }
        }
      }
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    getTreeList(list, name) {
      let area1 = []
      const newList = []
      for (let s = 0; s < list.length; s++) {
        const area1lie = list[s][name]
        area1.push(area1lie)
      }
      area1 = this.unique(area1)
      let area1Id = 0
      for (let s = 0; s < area1.length; s++) {
        area1Id++
        const lie = area1[s]
        const listlie = { 'value': area1Id, 'label': lie }
        newList.push(listlie)
      }
      return newList
    },
    async fetchData() {
      this.isisloading = true
      // this.writeoff.month = '2021-02'
      // this.writeoff.difference = '促销费'
      this.writeoff.remark = ''
      // this.writeoff.sku = ['婴童', '湿巾']
      console.log('id:' + this.id)
      console.log('deptCode:' + this.deptcode)
      console.log('verifyYm:' + this.verifyym)
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
      this.writeoff.submitOrg = this.deptcode
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
            actAmount: item.sumActAmount, // 实际支付
            actAmountProportion: item.actAmountProportion, // 实际支付费比
            custCode: item.custCode,
            verifyYm: item.verifyYm,
            submitOrg: item.submitOrg,
            taskIds: item.taskIds,
            taskId: item.taskId,
            isEditable: item.isEditable,
            children: []
          }
          details.push(detail)
        })
        this.writeoff.details = details
      }
      this.isLoading = false
      this.isisloading = false
    },
    // 展开行效果
    async expandChange(row, expandedRows) {
      console.log('展开行点击')
      console.log(row)
      console.log(expandedRows)
      if (!row.isexpandloading) {
        // this.isisloading = true
        this.isexpandisloading = true
        // 该处是用于判断是展开还是收起行，只有展开的时候做请求，避免多次请求！
        // 展开的时候expandedRows有值，收起的时候为空.
        if (expandedRows.length > 0) {
        // for (let i = 0; i < expandedRows.length; i++) {
        //   if (row.rowId !== expandedRows[i].rowId) {
        //     return false
        //   }
        // }
          const productCategoryList = []
          if (this.writeoff.sku) {
            for (let j = 0; j < this.writeoff.sku.length; j++) {
              for (let k = 0; k < this.skus.length; k++) {
                if (this.writeoff.sku[j] === this.skus[k].value) {
                  productCategoryList.push(this.skus[k].label)
                }
              }
            }
          }
          const params = {
            submitOrg: row.submitOrg,
            custCode: row.custCode,
            verifyYm: row.verifyYm,
            finAccountType: row.feeName
          // productCategoryList: productCategoryList
          }
          const res = await getApprovalRebateDetail(params)
          if (res && res.success) {
            console.log(res)
            this.writeoff.categoryinfo = res.datas.categoryinfo
            this.writeoff.categoryinfo.forEach((item, index) => {
              const category = {
                id: index,
                category: item.productCategory,
                bgtFeeAmount: item.bgtFeeAmount, // 预算
                bgtFeeAmountProportion: item.bgtFeeAmountProportion, // 预算费比
                estFeeAmount: item.estFeeAmount, // 预估
                estFeeAmountProportion: item.estFeeAmountProportion, // 预估费比
                eactFeeAmount: item.eactFeeAmount, // 精准预估
                eactFeeAmountProportion: item.eactFeeAmountProportion, // 精准预估费比
                realFeeAmount: item.realFeeAmount, // 实际支付费用
                realFeeAmountProportion: item.realFeeAmountProportion, // 实际支付费用费比
                actAmount: item.actAmount, // 实际支付费用
                actAmountProportion: item.actAmountProportion // 实际支付费用费比
              }
              // console.log(category)
              row.children = row.children || []
              // console.log(this.writeoff)
              // this.writeoff.details[row].children = category
              row.children.push(category)
            })
            // this.writeoff.details[row.rowId].children = this.writeoff.categoryinfo
            this.$set(this.writeoff.details[row.rowId], 'children', this.writeoff.categoryinfo)
            this.writeoff.approvalinfo[row.rowId].children = this.writeoff.categoryinfo
            // this.skuChange()
          }
        } else {
          row.children = []
        }

        this.isexpandisloading = false
        row.isexpandloading = true
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('subject', this.multipleSelection)
    },
    skuChange() {
      this.writeoff.sku = this.writeoff.sku.sort()
      const lastsku = []
      if (this.writeoff.sku && this.writeoff.sku.length > 0) {
        for (let i = 0; i < this.writeoff.sku.length; i++) {
          lastsku.push(this.skus[this.writeoff.sku[i] - 1].label)
        }
      }
      console.log(this.writeoff.sku, lastsku)
      if (lastsku && lastsku.length > 0) {
        const childList = []
        for (let j = 0; j < this.writeoff.approvalinfo.length; j++) {
          const child = this.writeoff.approvalinfo[j].children
          childList[j] = []
          for (let k = 0; k < lastsku.length; k++) {
            const skulie = lastsku[k]
            if (child && child.length > 0) {
              for (let y = 0; y < child.length; y++) {
                const category = child[y].productCategory
                if (category === skulie) {
                  childList[j].push(child[y])
                }
              }
            }
          }
        }
        console.log(childList, 'childList')
        for (let s = 0; s < this.writeoff.approvalinfo.length; s++) {
          this.writeoff.details[s].children = childList[s]
        }
      } else {
        for (let s = 0; s < this.writeoff.approvalinfo.length; s++) {
          // this.writeoff.details[s].children = this.writeoff.approvalinfo[s].children
          this.writeoff.details[s].children = []
        }
      }
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
      // console.log(row, 'row')
      if (row.isEditable === '0') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
