<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="withdraw.identiferNum" class="pagespan">{{ $t("pay.pre.motion.identiferNum") }}:    {{ withdraw.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">预估信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                部门
              </div>
              <div class="input">
                <dict-select v-model="withdraw.submitOrg" dict-type-id="Dept" :disabled="true" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                对象年月
              </div>
              <div class="input">
                <el-date-picker v-model="withdraw.targetYm" size="small" type="month" value-format="yyyy-MM" :clearable="false" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">预估详细</span>
          <div class="input_box" style="margin-bottom:20px;">
            <!-- <div class="flex2">
              <div class="title">
                品类
              </div>
              <div class="input">
                <el-select v-model="skuselect" multiple placeholder="请选择" @change="skuChange">
                  <el-option
                    v-for="item in skus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div> -->
            <!-- <div class="flex2">
              <div class="title">
                发生年月
              </div>
              <div class="input">
                <el-select v-model="monselect" multiple placeholder="请选择" @change="skuChange">
                  <el-option
                    v-for="item in months"
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
            v-loading="isisloading"
            :data="promotionList"
            max-height="720"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
            row-key="nameCodeid1"
            :expand-row-keys="expand"
            @expand-change="expandChange"
          >
            <el-table-column type="expand" width="40" align="center">
              <template slot-scope="props">
                <el-table
                  ref="table1"
                  class="table-expand"
                  :data="props.row.childrens"
                  :header-cell-style="{'text-align':'center'}"
                  border
                >
                  <el-table-column prop="category" label="品类" min-width="170" align="center" />
                  <el-table-column prop="feeName" label="费用" min-width="170" align="center" />
                  <!-- <el-table-column :label="'销售'" align="center">
                    <el-table-column prop="data1" label="预算" min-width="120" align="center" />
                    <el-table-column prop="data2" label="预估" min-width="120" align="center" />
                    <el-table-column prop="data3" label="实际" min-width="120" align="center" />
                  </el-table-column> -->
                  <el-table-column :label="'促销费用'" align="center">
                    <el-table-column prop="bgt_amount" label="预算" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.bgt_amount|numFormat(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="bgt_percent" label="预算费比" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.bgt_percent|numFormat(2) }}</span>
                        <span v-if="scope.row.bgt_percent!==null">%</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="est_amount" label="预估" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.est_amount|numFormat(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="est_percent" label="预估费比" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.est_percent|numFormat(2) }}</span>
                        <span v-if="scope.row.est_percent!==null">%</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="act_amount" label="精准预估" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.act_amount|numFormat(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="act_percent" label="精准预估费比" min-width="120" align="right">
                      <template slot-scope="scope">
                        <span>{{ scope.row.act_percent|numFormat(2) }}</span>
                        <span v-if="scope.row.act_percent!==null">%</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="custName" label="代理商" min-width="170" align="center" />
            <el-table-column prop="estYm" label="发生年月" min-width="170" align="center" />
            <el-table-column :label="'销售'" align="center">
              <el-table-column prop="sale_bgt_dawang_amount" label="预算" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.sale_bgt_dawang_amount|numFormat(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sale_est_dawang_amount" label="预估" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.sale_est_dawang_amount|numFormat(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sale_act_dawang_amount" label="实绩" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.sale_act_dawang_amount|numFormat(2) }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="'促销费用'" align="center">
              <el-table-column prop="bgt_amount" label="预算" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.bgt_amount|numFormat(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bgt_percent" label="预算费比" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.bgt_percent|numFormat(2) }}</span>
                  <span v-if="scope.row.bgt_percent!==null">%</span>
                </template>
              </el-table-column>
              <el-table-column prop="est_amount" label="预估" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.est_amount|numFormat(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="est_percent" label="预估费比" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.est_percent|numFormat(2) }}</span>
                  <span v-if="scope.row.est_percent!==null">%</span>
                </template>
              </el-table-column>
              <el-table-column prop="act_amount" label="精准预估" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.act_amount|numFormat(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="act_percent" label="精准预估费比" min-width="120" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.act_percent|numFormat(2) }}</span>
                  <span v-if="scope.row.act_percent!==null">%</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li v-if="withdraw.estStatus==='0'||withdraw.estStatus==='3'" class="operation-item" @click="handleSubmit()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">申请</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconquxiao" />
          </span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { getDetail, applyCommit } from '@/api/est/promotion.js'
import { getDetailDetail } from '@/api/est/approve.js'
import { numFormat } from '@/mixins/num-format.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
// import UserOrgTree from '@/components/UserOrgTree.vue'
// import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'EstClassifiedEdit',
  mixins: [names, formValidator, permission, dict, numFormat],
  data() {
    return {
      expand: [],
      isisloading: false,
      disabled: false,
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5'],
      withdraw: {
        submitOrg: '',
        targetYm: ''
      },
      fileList: [],
      skus: [],
      skuselect: [],
      months: [],
      monselect: [],
      resDataList: [],
      promotionList: [],
      estStatus: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    }
  },
  watch: {},
  async created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.disabled = false
    }
    if (this.type === 'info') {
      this.disabled = true
    }
  },
  methods: {
    async fetchData() {
      this.isisloading = true
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.withdraw.submitOrg = res.datas.estExps.submitOrg
        this.withdraw.targetYm = res.datas.estExps.targetYm
        this.withdraw.estStatus = res.datas.estExps.estStatus
        const categoryList = res.datas.categoryList
        const monthList = res.datas.monthList
        for (let i = 0; res.datas.results[i]; i++) {
          if (res.datas.results[i]) {
            res.datas.results[i].nameCodeid1 = res.datas.results[i].custName + res.datas.results[i].estYm
            res.datas.results[i].childrens = null
          }
        }
        console.log(res.datas.results)
        this.resDataList = res.datas.results
        this.promotionList = res.datas.results
        if (categoryList.length > 0) {
          for (let i = 0; i < categoryList.length; i++) {
            this.skus.push({ 'value': i, 'label': categoryList[i] })
            this.skuselect.push(i)
          }
        }
        if (monthList.length > 0) {
          for (let i = 0; i < monthList.length; i++) {
            this.months.push({ 'value': i, 'label': monthList[i] })
            this.monselect.push(i)
          }
        }
        console.log(res, 666)
      }
      this.isisloading = false
      this.isLoading = false
    },
    async expandChange(row) {
      console.log(row)
      if ((!row.isexpandloading) || (row.isexpandloading === 'undefined')) {
        this.isisloading = true
        row.childrens = []
        console.log(row.isexpandloading)
        const params = { 'targetYm': this.withdraw.targetYm, 'targetOrg': this.withdraw.submitOrg, 'estYm': row.estYm, 'custCode': row.custCode }
        const res = await getDetailDetail(params)
        if (res && res.success) {
          console.log(res)
          // for (let i = 0; res.datas.resultList[i]; i++) {
          //   if (res.datas.resultList[i].bgt_amount && row.bgt_amount) { res.datas.resultList[i].bgt_percent = this.toPercent(res.datas.resultList[i].bgt_amount, row.bgt_amount) }
          //   if (res.datas.resultList[i].est_amount && row.est_amount) { res.datas.resultList[i].est_percent = this.toPercent(res.datas.resultList[i].est_amount, row.est_amount) }
          //   if (res.datas.resultList[i].act_amount && row.act_amount) { res.datas.resultList[i].act_percent = this.toPercent(res.datas.resultList[i].act_amount, row.act_amount) }
          // }
          row.childrens = res.datas.resultList
          console.log(this.promotionList)
          for (let j = 0; this.promotionList[j]; j++) {
            if (this.promotionList[j].childrens) {
              if (!this.resDataList[j].childrens) {
                this.resDataList[j].childrens = this.promotionList[j].childrens
              }
            }
          }
          // this.resDataList = this.promotionList

          const lastsku = []
          if (this.skuselect.length > 0) {
            for (let s = 0; s < this.skuselect.length; s++) {
              lastsku.push(this.skus[this.skuselect[s]].label)
            }
          }
          console.log(this.skuselect, lastsku)
          const childList = []
          const child = row.childrens
          if (row.childrens) {
            for (let i = 0; i < lastsku.length; i++) {
              const skulie = lastsku[i]
              console.log(skulie, 'skulie')
              for (let y = 0; y < child.length; y++) {
                console.log(child[y].category)
                const category = child[y].category
                if (category === skulie) {
                  childList.push(child[y])
                }
              }
            }
          }
          row.childrens = childList
        }
        row.isexpandloading = true
        this.isisloading = false
      }
    },
    async handleSelectionChange() {
      this.isexpandloading = true
    },
    handleSubmit() {
      console.log(this.id, this.withdraw.estStatus)
      this.$confirm('是否确认提交当前数据？', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await applyCommit({ id: String(this.id) })

        if (res && res.success) {
          console.log(res, 111)
          // this.$router.push('/est/promotion')
          this.$router.replace({
            path: '/est/promotion',
            query: { fetchDataData: 'fetchDataData' }
          })
          // this.getFixedList(this.searchParam)
        }
        this.isLoading = false
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    toPercent(num, total) {
      console.log(num, total, Math.round(num / total * 10000) / 100.00)
      return (Math.round(num / total * 10000) / 100.00)// 小数点后两位百分比
    },
    handleBack() {
      // this.$router.go(-1)
      this.$router.replace({
        path: '/est/promotion',
        query: { fetchDataData: 'fetchDataData' }
      })
    },
    // monthChange() {
    //   this.monselect = this.monselect.sort()
    //   console.log(this.monselect)
    //   const resDataList = this.resDataList
    //   this.promotionList = []
    //   if (this.monselect.length > 0) {
    //     for (let s = 0; s < this.monselect.length; s++) {
    //       this.promotionList.push(resDataList[this.monselect[s]])
    //     }
    //   }
    // },
    skuChange() {
      // console.log(this.$refs.table1.store.states.lazyTreeNodeMap)
      this.skuselect = this.skuselect.sort()
      this.monselect = this.monselect.sort()
      console.log(this.skuselect, this.monselect)
      const resDataList = JSON.parse(JSON.stringify(this.resDataList))
      this.promotionList = []
      const lastsku = []
      if (this.monselect.length > 0) {
        for (let s = 0; s < this.monselect.length; s++) {
          this.promotionList.push(resDataList[this.monselect[s]])
        }
      }
      if (this.skuselect.length > 0) {
        for (let s = 0; s < this.skuselect.length; s++) {
          lastsku.push(this.skus[this.skuselect[s]].label)
        }
      }
      console.log(this.skuselect, lastsku)
      const childList = []
      for (let s = 0; s < this.promotionList.length; s++) {
        const child = this.promotionList[s].childrens
        if (this.promotionList[s].childrens) {
          childList[s] = []
          for (let i = 0; i < lastsku.length; i++) {
            const skulie = lastsku[i]
            console.log(skulie, 'skulie')
            if (child.length > 0) {
              for (let y = 0; y < child.length; y++) {
                const category = child[y].category
                if (category === skulie) {
                  childList[s].push(child[y])
                }
              }
            }
          }
        }
      }
      for (let s = 0; s < this.promotionList.length; s++) {
        this.promotionList[s].childrens = childList[s]
      }
    }
  }
}
</script>
<style scoped>
.height {
  max-height: 700px;
}
</style>
