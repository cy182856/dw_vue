<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div v-loading="isisloading" class="detail">
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
                <dict-select v-model="withdraw.submitOrg" dict-type-id="Dept" :disabled="true" :filter2="happenYear" />
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
            v-loading="istableloading"
            :data="promotionList"
            max-height="720"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
            row-key="nameCodeid"
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
            <el-table-column prop="status" label="状态" min-width="100" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status===0">未处理</span>
                <span v-if="scope.row.status===1">已处理</span>
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
          <div class="pagination-box">
            <!-- <el-pagination
              class="page-left"
              :current-page.sync="searchParam.pageNo"
              :page-size="searchParam.pageSize"
              layout="total,sizes"
              popper-class="blueDL"
              disabled="disabled"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            /> -->

            <el-pagination
              class="page-right blueDR"
              :current-page.sync="searchParam.pageNo"
              :page-size="searchParam.pageSize"
              layout="prev,pager,next,slot,jumper"
              :total="searchParam.totalRecord"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
              <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
            </el-pagination>
            <el-pagination class="page-right  page-first" layout="slot">
              <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
            </el-pagination>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 审批 -->
        <li v-if="estStatus==='1' && isEditable === '1' && hasPermission('est-approve-button')" class="operation-item" @click="dialogFormVisible=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">审批</span>
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
    <!-- :before-close="handleClose" -->
    <el-dialog
      v-loading="dialogloading"
      class="content-dialog-box  search-light rules newedit3"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title="'审批操作'"
      :visible.sync="dialogFormVisible"
      width="600"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
      <el-form>
        <el-form-item label="审批意见">
          <el-input v-model="reason" type="textarea" rows="3" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit(1)">
          通 过
        </el-button>
        <el-button type="primary" @click="handleSubmit(2)">
          驳 回
        </el-button>
        <el-button @click="dialogFormVisible=false">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { addMonth } from '@/utils/util.js'
import { getDetail, getDetailList, getDetailDetail, applyApprove, rejectApprove } from '@/api/est/approve.js'
import { numFormat } from '@/mixins/num-format.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
// import UserOrgTree from '@/components/UserOrgTree.vue'
// import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'EstClassifiedEdit',
  mixins: [search, names, formValidator, permission, dict, numFormat],
  data() {
    return {
      expand: [],
      dialogloading: false,
      istableloading: false,
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
      dialogFormVisible: false,
      reason: '',
      taskIds: '',
      searchParam: {
        pageNo: 1,
        pageSize: 2,
        totalRecord: null,
        params: {
          targetYm: '',
          submitOrg: ''
        }
      }
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
    targetYm: function() {
      return this.$route.query.targetYm
    },
    happenYear: function() {
      return addMonth(this.searchParam.params.targetYm, -1).substr(0, 4)
    },
    submitOrg: function() {
      return this.$route.query.submitOrg
    },
    estStatus: function() {
      return this.$route.query.estStatus
    },
    isEditable: function() {
      return this.$route.query.isEditable
    }
  },
  watch: {},
  async created() {
    if (this.targetYm && this.submitOrg && this.estStatus) {
      this.fetchData()
    } else {
      this.disabled = false
    }
    if (this.type === 'info') {
      this.disabled = true
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.searchParam.pageNo = currentPage
      this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.searchParam })
      this.fetchData1()
    },
    async fetchData1() {
      this.istableloading = true
      this.searchParam.params.targetYm = this.targetYm
      this.searchParam.params.submitOrg = this.submitOrg
      const ress = await getDetailList(this.searchParam)
      if (ress && ress.success) {
        for (let i = 0; ress.datas.searchResult.results[i]; i++) {
          if (ress.datas.searchResult.results[i]) {
            ress.datas.searchResult.results[i].nameCodeid = ress.datas.searchResult.results[i].custName + ress.datas.searchResult.results[i].estYm
          }
        }
        this.searchParam = ress.datas.searchResult
        this.resDataList = ress.datas.searchResult.results
        this.promotionList = ress.datas.searchResult.results
      }
      this.istableloading = false
    },

    async fetchData() {
      this.isisloading = true
      const params = { 'targetYm': this.targetYm, 'submitOrg': this.submitOrg, 'estStatus': this.estStatus, 'isEditable': this.isEditable }
      const res = await getDetail(params)
      this.searchParam.params.targetYm = this.targetYm
      this.searchParam.params.submitOrg = this.submitOrg
      const ress = await getDetailList(this.searchParam)
      if (res && res.success) {
        // console.log(res)
        this.withdraw.submitOrg = res.datas.estExps.submitOrg
        this.withdraw.targetYm = res.datas.estExps.targetYm
        this.taskIds = res.datas.estExps.taskIds
        const categoryList = res.datas.categoryList
        const monthList = res.datas.monthList

        for (let i = 0; ress.datas.searchResult.results[i]; i++) {
          if (ress.datas.searchResult.results[i]) {
            ress.datas.searchResult.results[i].nameCodeid = ress.datas.searchResult.results[i].custName + ress.datas.searchResult.results[i].estYm
            ress.datas.searchResult.results[i].childrens = null
          }
        }
        this.searchParam = ress.datas.searchResult
        this.resDataList = ress.datas.searchResult.results
        this.promotionList = ress.datas.searchResult.results
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
      this.isLoading = false
      this.isisloading = false
    },
    toPercent(num, total) {
      return (Math.round(num / total * 10000) / 100.00)// 小数点后两位百分比
    },
    async expandChange(row, expanded) {
      // console.log(row)
      // console.log(expanded)
      if (!row.isexpandloading) {
        this.istableloading = true
        row.childrens = []
        const params = { 'targetYm': this.targetYm, 'targetOrg': this.submitOrg, 'estYm': row.estYm, 'custCode': row.custCode }
        const res = await getDetailDetail(params)
        if (res && res.success) {
          // console.log(res)
          // for (let i = 0; res.datas.resultList[i]; i++) {
          //   res.datas.resultList[i].nameCodeid = Math.random()
          //   // res.datas.resultList[i].nameCodeid = 1
          //   if (res.datas.resultList[i].bgt_amount && row.bgt_amount) { res.datas.resultList[i].bgt_percent = this.toPercent(res.datas.resultList[i].bgt_amount, row.bgt_amount) }
          //   if (res.datas.resultList[i].est_amount && row.est_amount) { res.datas.resultList[i].est_percent = this.toPercent(res.datas.resultList[i].bgt_amount, row.est_amount) }
          //   if (res.datas.resultList[i].act_amount && row.act_amount) { res.datas.resultList[i].act_percent = this.toPercent(res.datas.resultList[i].bgt_amount, row.act_amount) }
          // }
          row.childrens = res.datas.resultList
          // console.log(this.promotionList)
          /* for (let j = 0; this.promotionList[j]; j++) {
            if (this.promotionList[j].childrens || this.promotionList[j].childrens === []) {
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
          // console.log(this.skuselect, lastsku)
          const childList = []
          const child = row.childrens
          if (row.childrens) {
            for (let i = 0; i < lastsku.length; i++) {
              const skulie = lastsku[i]
              // console.log(skulie, 'skulie')
              for (let y = 0; y < child.length; y++) {
                // console.log(child[y].category)
                const category = child[y].category
                if (category === skulie) {
                  childList.push(child[y])
                }
              }
            }
          } */
          // row.childrens = childList
        }
        row.isexpandloading = true
        this.istableloading = false
      }
    },
    handleSubmit(type) {
      const params = { 'taskIds': this.taskIds, 'comments': this.reason }
      if (type === 1) {
        this.$confirm('是否确认审批通过当前数据？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(async() => {
          this.dialogloading = true
          const res = await applyApprove(params)

          if (res && res.success) {
            console.log(res, 111)
            this.$router.push('/est/approve')
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
      } else {
        /**if (!params.comments) {
          this.$message({
            type: 'info',
            message: '请填写审批意见！'
          })
          return false
        }**/
        this.$confirm('是否确认驳回当前数据？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(async() => {
          this.dialogloading = true
          const res = await rejectApprove(params)

          if (res && res.success) {
            console.log(res, 111)
            // this.$router.push('/est/approve')
            this.$router.replace({
              path: '/est/approve',
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
      }
    },
    handleBack() {
      // this.$router.go(-1)
      this.$router.replace({
        path: '/est/approve',
        query: { fetchDataData: 'fetchDataData' }
      })
    },
    skuChange() {
      this.skuselect = this.skuselect.sort()
      this.monselect = this.monselect.sort()
      console.log(this.skuselect, this.monselect)
      const resDataList = JSON.parse(JSON.stringify(this.resDataList))
      this.promotionList = []
      const lastsku = []
      if (this.monselect.length > 0) {
        const lastmonth = []
        for (let s = 0; s < this.monselect.length; s++) {
          lastmonth.push(this.months[this.monselect[s]].label)
        }
        console.log(lastmonth, '010101')
        for (let s = 0; s < lastmonth.length; s++) {
          for (let i = 0; i < resDataList.length; i++) {
            const resid = resDataList[i].estYm
            // console.log(resid, lastmonth[s])
            if (resid === lastmonth[s]) {
              this.promotionList.push(resDataList[i])
            }
          }
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
<style>
 .newedit3 .el-dialog {
    width: 400px !important;
    height: 300px;
    min-width: 400px !important;
}
.search-light.newedit3 .dialog-drag .el-button.el-button--primary span{
  color:#fff;
}
</style>
