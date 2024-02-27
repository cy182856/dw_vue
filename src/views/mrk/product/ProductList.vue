<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam.params"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                JAN CODE:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.janCode" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                产品名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.productName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                品类:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                类目:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                系列:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category2" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                类型:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category3" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                规格:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category4" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                渠道分类:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category5" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <!-- <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                类目:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.model" placeholder="请选择">
                  <el-option
                    v-for="item in models"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                系列:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.serie" placeholder="请选择">
                  <el-option
                    v-for="item in series"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item> -->
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                有效标志:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.productFlag" dict-type-id="ProductUseFlag" placeholder="请选择" />
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                关联部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.deptCode" dict-type-id="Dept" placeholder="请选择" />
                <!--  -->
              </el-col>
            </el-row>
          </el-form-item>

          <dict-select v-show="false" dict-type-id="EanFlag" />
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t("comm.query") }}</p>
          <span
            class="circle-larger-btn btn-light-color bluebg"
          ><i
            class="iconfont iconsousuo"
          /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="handleDownload">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">导出</span>
        </li>
        <li class="operation-item" @click="customersChange">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">排除费目</span>
        </li>
        <li class="operation-item" @click="deparsChange">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">关联部门</span>
        </li>
        <li class="operation-item" @click="codeChange">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">有无条码</span>
        </li>
        <li class="operation-item" @click="bagchargeChange">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">单包手续费</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="WriteoffList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column
              :prop="'janCode'"
              label="JAN CODE"
              width="120"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/product/edit',
                    query: { id: scope.row.id ,type:'info'},
                  }"
                >
                  {{ scope.row.janCode }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :prop="'productName'" :label="'产品名称'" width="150" align="left" show-overflow-tooltip />
            <el-table-column :prop="'category'" :label="'品类'" min-width="120" align="left" />
            <el-table-column :prop="'category1'" :label="'类目'" min-width="120" align="left" />
            <el-table-column :prop="'category2'" :label="'系列'" min-width="120" align="left" />
            <el-table-column :prop="'category3'" :label="'类型'" min-width="120" align="left" />
            <el-table-column :prop="'category4'" :label="'规格'" min-width="120" align="left" />
            <el-table-column :prop="'category5'" :label="'渠道分类'" min-width="120" align="left" />
            <el-table-column :prop="'deptName'" :label="'关联部门'" min-width="120" align="center" />
            <el-table-column :prop="'productFlag'" :label="'有效标志'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-write dict-type-id="ProductUseFlag" :value="scope.row.productFlag" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagination-box">
        <el-pagination
          class="page-left"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="total,sizes"
          :total="searchParam.totalRecord"
          popper-class="blueDL"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <el-pagination
          class="page-right blueDR"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="prev,pager,next,slot,jumper"
          :total="searchParam.totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span
            class="iconfont iconjiantou-youzhi page-last-page"
            @click="toLastPage"
          />
        </el-pagination>
        <el-pagination class="page-right page-first" layout="slot">
          <span
            class="iconfont iconjiantou-zuozhi page-first-page"
            @click="toFirstPage"
          />
        </el-pagination>
      </div>
    </div>

    <div>
      <el-dialog
        title="费目选择"
        :visible.sync="customersDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="customerTree"
            default-expand-all
            :data="customers"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('customers')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick('customers')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="关联部门"
        :visible.sync="deparsDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="deparTree"
            default-expand-all
            :data="formatDepts"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('depars')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick('depars')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="有无条码"
        :visible.sync="codesDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="codeTree"
            default-expand-all
            :data="codes"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('codes')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick('codes')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="设置单包手续费"
        :visible.sync="bagchargeDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="flex3">
          <div class="input" style="background-color:white;padding:5px 10px 10px 5px;">
            <el-row type="flex" :gutter="5" justify="space-between" style="color:black">
              <el-col :span="6">
                单包手续费
              </el-col>
              <el-col :span="16">
                <milli-input v-model="bagChargeParam.bagcharge" class="input" to-fixed-num="2" maxlength="25" />
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :offset="6">
                <span ref="bagcharge" data-roles="number" :data-value="bagChargeParam.bagcharge" class="message" />
              </el-col>
            </el-row>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('bagcharge')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick('bagcharge')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getAccountList, saveProductAccountRel, getWriteoffList, saveProductDeptRel, saveProductEanFlag, saveProductBagCharge, downloadFile } from '@/api/mrk/productaccountrel.js'
export default {
  name: 'ProductList',
  mixins: [formValidator, search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      customersDialogShow: false,
      deparsDialogShow: false,
      codesDialogShow: false,
      bagchargeDialogShow: false,
      multipleSelection: [],
      WriteoffList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          janCode: '',
          productName: '',
          category: '',
          category1: '',
          category2: '',
          category3: '',
          category4: '',
          category5: '',
          productFlag: ''
        }
      },
      categorys: [],
      series: [],
      models: [],
      customers: [
      ],
      codes: [{
        id: 0,
        label: '有条码'
      },
      {
        id: 1,
        label: '无条码'
      }
      ],
      fixedFee: [], // 变动费子项目
      variableFee: [], // 固定费子项目
      bagChargeParam: { // 单包手续费参数
        bagcharge: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    formatDepts: function() {
      const deptList = this.$store.getters.dictList.Dept
      const targetList = this.$store.getters.dictList.TARGETORG
      let orgId = ''
      if (deptList && targetList) {
        for (let i = 0; i < deptList.length; i++) {
          for (let s = 0; s < targetList.length; s++) {
            if (targetList[s].dictName === deptList[i].dictId) {
              if (this.userInfo.orgSeqNo.indexOf(targetList[s].dictId) !== -1) {
                orgId = targetList[s].dictName
              }
            }
          }
        }
      }
      if (orgId) {
        const children = []
        for (let i = 0; i < deptList.length; i++) {
          if (orgId === deptList[i].dictId) {
            children.push({
              id: deptList[i].dictId,
              label: deptList[i].dictName
            })
          }
        }
        const obj = [
          {
            id: 'ALL',
            label: '全选',
            children: children
          }
        ]
        return obj
      } else {
        const children = []
        deptList.forEach(item => {
          children.push({
            id: item.dictId,
            label: item.dictName
          })
        })
        const obj = [
          {
            id: 'ALL',
            label: '全选',
            children: children
          }
        ]
        return obj
      }
    }
  },
  created() {
    this.$store.dispatch('getDicts', 'Dept')
    this.fetchData()
    console.log(this.WriteoffList)
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // 查询产品主数据(JAN)一览信息
      const res = await getWriteoffList(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.WriteoffList = results
      }
      this.isLoading = false
    },
    strategyEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({
            path: '/product/edit',
            query: { id: rowData.id, type: 'info' }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async handleOkClick(type) {
      const names = []
      let index = 0
      if (type === 'depars') {
        this.$refs.deparTree.getCheckedNodes().forEach((item) => {
          console.log(item)
          if (item.id !== 'ALL') {
            // 保存选中的部门编号
            names[index] = item.id
            index++
          }
        })
      }
      this.$confirm(type === 'depars' && names.length === 0 ? this.$t('comm.tip18') : this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        if (type === 'customers') {
          this.$refs.customerTree.getCheckedNodes().forEach((item) => {
            console.log(item)
            if (!item.children) {
            // 保存选中的费目编号
              names[index] = item.id
              index++
            }
          })
        } else if (type === 'codes') {
          if (this.$refs.codeTree.getCheckedNodes().length > 1) {
            this.$message({
              type: 'info',
              message: this.$t('comm.msg3')
            })
            return false
          }
          this.$refs.codeTree.getCheckedNodes().forEach((item) => {
            console.log(item)
            names[index] = item.id
            index++
          })
        }
        // 调用insert关联费目接口
        // 产品主数据(JAN)
        const janCodeList = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          for (let k = 0; k < this.WriteoffList.length; k++) {
            if (this.multipleSelection[i].id === this.WriteoffList[k].id) {
              janCodeList.push(JSON.parse(JSON.stringify(this.WriteoffList[k])))
            }
          }
        }
        if (type === 'customers') {
        // 费目主数据
          const finAccountCodeList = []
          for (let j = 0; j < names.length; j++) {
            const finAccountCodeItem = {
              accountCode: names[j]
            }
            finAccountCodeList.push(finAccountCodeItem)
          }
          const params = {
            janCodeList: janCodeList,
            finAccountCodeList: finAccountCodeList
          }
          const res = await saveProductAccountRel(params)
          if (res && res.success) {
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg43')
            })
          }
          this.customersDialogShow = false
          this.$refs.customerTree.setCheckedKeys([])
        } else if (type === 'depars') {
          const params = {
            janCodeList: janCodeList,
            deptCodeList: names
          }
          const res = await saveProductDeptRel(params)
          if (res && res.success) {
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg43')
            })
          }
          this.deparsDialogShow = false
          this.$refs.deparTree.setCheckedKeys([])
        } else if (type === 'codes') {
          janCodeList.forEach((rowData) => {
            rowData.eanFlag = names[0]
          })
          const res = await saveProductEanFlag(janCodeList)
          if (res && res.success) {
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg43')
            })
          }
          this.codesDialogShow = false
          this.$refs.codeTree.setCheckedKeys([])
        }
        // 保存单包手续费
        if (type === 'bagcharge') {
          janCodeList.forEach((rowData) => {
            rowData.bagCharge = this.bagChargeParam.bagcharge
          })
          const res = await saveProductBagCharge(janCodeList)
          this.bagchargeDialogShow = false
          this.bagChargeParam.bagcharge = ''
          if (res && res.success) {
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg43')
            })
          }
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    handleCancelClick(type) {
      if (type === 'customers') {
        this.customersDialogShow = false
        this.$refs.customerTree.setCheckedKeys([])
      } else if (type === 'depars') {
        this.deparsDialogShow = false
        this.$refs.deparTree.setCheckedKeys([])
      } else if (type === 'codes') {
        this.codesDialogShow = false
        this.$refs.codeTree.setCheckedKeys([])
      } else if (type === 'bagcharge') {
        this.bagchargeDialogShow = false
        this.bagChargeParam.bagcharge = ''
        this.clearErrorMessage()
      }
    },
    async customersChange() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.fixedFee = []
        this.variableFee = []
        const targetList = this.$store.getters.dictList.TARGETORG
        let targetorg = ''
        if (targetList) {
          for (let s = 0; s < targetList.length; s++) {
            if (this.userInfo.orgSeqNo.indexOf(targetList[s].dictId) !== -1) {
              targetorg = targetList[s].dictName
            }
          }
        }
        if (targetorg) {
          this.isLoading = true
          // 调用查询全部费目主数据接口
          const res = await getAccountList(targetorg)
          if (res && res.success) {
            if (res.datas.list) {
              const customers = [{
                id: 0,
                label: '全选',
                children: [
                  {
                    id: 1,
                    label: '固定费',
                    children: []
                  },
                  {
                    id: 2,
                    label: '变动费',
                    children: []
                  }
                ]
              }
              ]
              for (var index = 0; index < res.datas.list.length; index++) {
                if (res.datas.list[index].accountType === '1') {
                  const fixedFeeItem = {
                    id: res.datas.list[index].accountCode,
                    label: res.datas.list[index].accountName,
                    type: res.datas.list[index].accountType
                  }
                  this.fixedFee.push(fixedFeeItem)
                } else if (res.datas.list[index].accountType === '2') {
                  const variableFeeItem = {
                    id: res.datas.list[index].accountCode,
                    label: res.datas.list[index].accountName,
                    type: res.datas.list[index].accountType
                  }
                  this.variableFee.push(variableFeeItem)
                }
                customers[0].children[0].children = this.fixedFee
                customers[0].children[1].children = this.variableFee
                this.customers = customers
              }
              // 设置关联费目勾选值
              if (this.multipleSelection[0].accountRel) {
                const accountRel = this.multipleSelection[0].accountRel.split(',')
                const checkKeys = []
                accountRel.forEach((item, index) => {
                  checkKeys.push(item)
                })
                this.$nextTick(() => {
                  this.$refs.customerTree.setCheckedKeys(checkKeys)
                })
              }
            }
          }
          this.isLoading = false
        }
        this.customersDialogShow = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    deparsChange() {
      if (this.multipleSelection && this.multipleSelection.length >= 1) {
        this.deparsDialogShow = true
        // 设置关联部门勾选值
        if (this.multipleSelection[0].deptRel) {
          const deptRel = this.multipleSelection[0].deptRel.split(',')
          const checkKeys = []
          deptRel.forEach((item, index) => {
            checkKeys.push(item)
          })
          this.$nextTick(() => {
            // this.$refs.deparTree.setCheckedKeys(checkKeys)
          })
        }
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    codeChange() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.codesDialogShow = true
        const checkKeys = []
        checkKeys.push(this.multipleSelection[0].eanFlag)
        this.$nextTick(() => {
          this.$refs.codeTree.setCheckedKeys(checkKeys)
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    bagchargeChange() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.bagchargeDialogShow = true
        this.bagChargeParam.bagcharge = this.multipleSelection[0].bagCharge
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleDownload() {
      this.isLoading = true
      downloadFile(this.searchParam)
      this.isLoading = false
    }
  }

}
</script>
<style >
.bi-table .el-table__body{
      border-bottom: 1px solid #ddd;
}
.bi-table tbody tr:last-child td{
  border-bottom: 0 !important;
}
</style>
