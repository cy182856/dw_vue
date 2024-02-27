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
                {{ $t("promotion.strategyTwo.year") }}
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.configYear" size="small" type="year" value-format="yyyy" :clearable="false" :picker-options="pickerOptions0" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.submitOrg" dict-type-id="Dept" :filter2="searchParam.params.configYear" :disabled="disabled" @change="submitChange" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                一级费目:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.finAccountType" dict-type-id="AccountTypeView" @change="accountChange" />
                <!-- <el-select v-model="searchParam.params.finAccountType" placeholder="请选择" @change="accountChange">
                  <el-option
                    v-for="item in fees1"
                    :key="item.accountCode"
                    :label="item.accountName"
                    :value="item.accountCode"
                  />
                </el-select> -->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                二级费目:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.finAccountCode" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in fees2"
                    :key="item.accountCode"
                    :label="item.accountName"
                    :value="item.accountCode"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                活动名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.discPromName" />
              </el-col>
            </el-row>
          </el-form-item>
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
        <li v-if="btnShow" class="operation-item" @click="downloadFile()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">下载模板</span>
        </li>
        <li v-if="btnShow" class="operation-item" @click="uploadDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">上传</span>
        </li>
        <li v-if="btnShow" class="operation-item" @click="addTable">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">新增</span>
        </li>
        <li v-if="btnShow" class="operation-item" @click="removeList">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">删除</span>
        </li>
        <!-- 保存 -->
        <li v-if="btnShow" class="operation-item" @click="saveList">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
          <span class="operation-text">{{ $t('comm.save') }}</span>
        </li>
        <li class="operation-item" @click="downloadSalesFile()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">月度销售预估下载</span>
        </li>
        <li class="operation-item" @click="uploadSalesDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">月度销售预估上传</span>
        </li>
        <!-- 返回 -->
        <!-- <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li> -->
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="fixedList"
            stripe
            border
            height="100%"
            :header-cell-style="{'text-align':'left'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column v-if="btnShow" type="selection" width="55" align="center" />
            <el-table-column prop="submitOrg" :label="'部门'" min-width="150">
              <template slot-scope="scope">
                <dict-select v-model="scope.row.submitOrg" dict-type-id="Dept" :filter2="searchParam.params.configYear" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column :label="'二级费目'" min-width="300">
              <template slot-scope="scope">
                <el-select v-model="scope.row.finAccountCode" placeholder="请选择" :disabled="scope.row.disabled" @change="accountSelect(scope.$index)">
                  <el-option
                    v-for="item in fees1"
                    :key="item.accountCode"
                    :label="item.accountName"
                    :value="item.accountCode"
                  />
                </el-select>
                <span :ref="'finAccountCode'+scope.$index" data-roles="required" :data-value="scope.row.finAccountCode" class="message" />
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="'折扣活动名称'" min-width="300">
              <template slot-scope="scope">
                <!-- <el-input v-model="scope.row.discPromName" type="text" :disabled="scope.row.disabled" @blur="validator('discPromName'+scope.$index)" />
                <span :ref="'discPromName'+scope.$index" data-roles="required" :data-value="scope.row.discPromName" class="message" /> -->
                <el-input v-model="scope.row.discPromName" type="text" :disabled="scope.row.disabled" />
                <span :ref="'discPromName'+scope.$index" :data-value="scope.row.discPromName" class="message" />
              </template>
            </el-table-column>
            <el-table-column prop="accounts" :label="'代理商'" min-width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.accounts" type="text" :disabled="scope.row.disabled" @click.native="showsSKWPop2(scope.row.submitOrg,scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column :label="'产品'" min-width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku" type="text" :disabled="scope.row.disabled" @click.native="showsSKWPop(scope.row.submitOrg,scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column prop="num1" :label="'BS/KA'" min-width="120" align="center">
              <template slot-scope="scope">
                <dict-select v-if="scope.row.submitOrg==='STRATEGY-SECTION-2'" v-model="scope.row.channel" dict-type-id="ChannelType" :disabled="scope.row.disabled" />
              </template>
            </el-table-column>
            <el-table-column :label="'预计销售数量占比'" min-width="120" align="right">
              <template slot-scope="scope">
                <milli-input v-if="scope.row.submitOrg==='STRATEGY-SECTION-2'" v-model="scope.row.estSalesRate" to-fixed-num="2" clearable :disabled="scope.row.disabled" style="width:80%;display:inline-block;" />
                <span>%</span>
              </template>
            </el-table-column>
            <el-table-column :label="'方式'" min-width="150" align="center">
              <template slot-scope="scope">
                <dict-select v-model="scope.row.expsType" dict-type-id="PromotionType" :disabled="scope.row.disabled" @change="(value)=>validator('expsType'+scope.$index,value)" />
                <span :ref="'expsType'+scope.$index" data-roles="required" :data-value="scope.row.expsType" class="message" />
              </template>
            </el-table-column>
            <el-table-column :label="'税率'" min-width="130" align="right">
              <template slot-scope="scope">
                <dict-select v-model="scope.row.finAccountType" dict-type-id="PromotionRate" :disabled="true" style="width:80%;" />
                <span>%</span>
              </template>
            </el-table-column>
            <template v-for="(item,index) in headerMonth">
              <el-table-column :key="index" :label="item + '月'" min-width="180" align="right">
                <template slot-scope="scope">
                  <milli-input v-if="(item<10)&&(scope.row.expsType!=='ratio')" v-model="scope.row['month0'+item]" to-fixed-num="2" clearable :disabled="scope.row.disabled" @blur="validator('month0'+item+scope.$index)" />
                  <milli-input v-if="(item>=10)&&(scope.row.expsType!=='ratio')" v-model="scope.row['month'+item]" to-fixed-num="2" clearable :disabled="scope.row.disabled" @blur="validator('month'+item+scope.$index)" />
                  <!-- <span v-if="scope.row.expsType==='ratio'">%</span> -->
                  <milli-input v-if="(item<10)&&(scope.row.expsType==='ratio')" v-model="scope.row['month0'+item]" append="%" :append-in="true" to-fixed-num="2" clearable :disabled="scope.row.disabled" @blur="validator('month0'+item+scope.$index)" />
                  <milli-input v-if="(item>=10&&(scope.row.expsType==='ratio'))" v-model="scope.row['month'+item]" append="%" :append-in="true" to-fixed-num="2" clearable :disabled="scope.row.disabled" @blur="validator('month'+item+scope.$index)" />
                  <span v-if="item<10" :ref="'month0'+item+scope.$index" data-roles="number" :data-value="scope.row['month0'+item]" class="message" />
                  <span v-if="item>=10" :ref="'month'+item+scope.$index" data-roles="number" :data-value="scope.row['month'+item]" class="message" />
                </template>
              </el-table-column>
            </template>
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
        title="系列或SKU选择"
        :visible.sync="customersDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
        @open="handleOpenSKU"
        @close="handleCancelClick('customers')"
      >
        <div class="filter-tree-input">
          <el-input v-model="filterText2" placeholder="输入关键字进行过滤" clearable />
        </div>
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="customerTree"
            default-expand-all
            :data="customers"
            show-checkbox
            node-key="id"
            :default-checked-keys="cssku"
            :filter-node-method="filterNode"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('customers')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <!-- <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li> -->
          <li class="operation-item" @click="handleOkClick('customers')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="代理商选择"
        :visible.sync="accountDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
        @open="handleOpen"
        @close="handleCancelClick('account')"
      >
        <div class="filter-tree-input">
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
        </div>
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="accountTree"
            default-expand-all
            :data="accounts"
            show-checkbox
            node-key="id"
            :default-checked-keys="csaccount"
            :filter-node-method="filterNode"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('account')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <!-- <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li> -->
          <li class="operation-item" @click="handleOkClick('account')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
    <upload :is-show="uploadDialog" action="/api/est/setting/upload" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
    <upload :is-show="uploadSalesDialog" action="/api/est/setting/sales/upload" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadSalesSuccess" @onClose="uploadSalesDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format.js'
import { treeListCustomer, treeListProduct } from '@/api/est/tree.js'
import { available, finAccountType, getList, finAccount, saveListApi, deleteList, downloadExcel, downloadSalesExcel } from '@/api/est/strategy.js'
import Upload from '@/components/UploadNew'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'treeList
export default {
  name: 'StrategyTwoList',
  components: {
    Upload
  },
  mixins: [search, names, permission, numFormat, formValidator],
  data() {
    return {
      isLoading: false,
      customersDialogShow: false,
      accountDialogShow: false,
      filterText: '',
      filterText2: '',
      strategyList: [],
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      skuList: [],
      accountList: [],
      selectsku: '',
      cssku: [],
      csaccount: [],
      csskuList: [],
      csaccountList: [],
      checkedTaxs: ['未税', '含税'],
      multipleSelection: [],
      taxs: ['未税', '含税'],
      fixedList: [],
      fees1: [],
      fees2: [],
      tax1: true,
      tax2: true,
      contextPath: process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : '',
      customers: [{
        id: 0,
        label: '全选',
        children: []
      }],
      accounts: [{
        id: 0,
        label: '全选',
        children: []
      }
      ],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          configYear: String(new Date().getFullYear()),
          configTarget: '2',
          submitOrg: '',
          finAccountType: '',
          finAccountCode: '',
          discPromName: ''
        }
      },
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      },
      uploadDialog: false, // 上传文件dialog显示标志位
      uploadSalesDialog: false, // 上传文件dialog显示标志位（月度销售预估）
      accept: '.xlsx',
      otherParams: null,
      btnShow: true
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'csrfToken']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo
    },
    happenYear: function() {
      return this.searchParam.params.configYear
    },
    disabled() {
      let isSelect = true
      let isFlag = false
      if (this.userInfo.roleList.includes('ROLE_WF_MARKET') || this.userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY')) {
        return false
      }
      if (this.$store.getters.dictList.Dept) {
        const deptList = this.$store.getters.dictList.Dept
        const targetList = this.$store.getters.dictList.TARGETORG
        let orgId = ''
        if (deptList && targetList) {
          for (let i = 0; i < deptList.length; i++) {
            for (let s = 0; s < targetList.length; s++) {
              if (targetList[s].dictName === deptList[i].dictId) {
                orgId = targetList[s].dictId
                if (this.userInfo.orgSeqNo.indexOf(orgId) !== -1) {
                  isFlag = true
                  break
                }
              }
            }
          }
        }

        if (!isFlag) {
          isSelect = false
        }
      }
      return isSelect
    }
  },
  watch: {
    filterText(val) {
      this.$refs.accountTree.filter(val)
    },
    filterText2(val) {
      this.$refs.customerTree.filter(val)
    },
    orgIdCom: {
      handler(newValue, oldValue) {
        this.searchParam.params.submitOrg = newValue
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.searchParam.params.submitOrg = this.orgIdCom
    this.fetchData()
  },
  methods: {
    submitChange() {
      this.searchParam.params.finAccountType = ''
      this.searchParam.params.finAccountCode = ''
      this.fees2 = []
    },
    async fetchData() {
      if (!this.searchParam.params.configYear || !this.searchParam.params.submitOrg) {
        this.$message({
          type: 'error',
          message: '查询条件中，年或部门不能为空！'
        })
        return false
      }
      this.getAvailable(this.searchParam.params.configYear)
      this.getFixedList(this.searchParam)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    async getAvailable(id) {
      const res = await available(String(id))
      if (res && res.success) {
        if (res.datas.flag === 0) {
          this.btnShow = false
        } else if (res.datas.flag === 1) {
          this.btnShow = true
        }
      }
    },
    async accountLoading(id) {
      if (!id) {
        // this.$message({
        //   type: 'error',
        //   message: '请先选择部门'
        // })
        return false
      }
      this.fees1 = []
      const res = await finAccount(id)
      if (res && res.success) {
        // this.searchDetailParam.paramMonthlyEstId = results[0].id
        const results = res.datas.list
        if (results.length > 0) {
          this.fees1 = results
        }
      }
    },
    async getFixedList(param) {
      this.isLoading = true
      const res = await getList(param)
      if (res && res.success) {
        this.accountLoading(this.searchParam.params.submitOrg)
        this.accountList = []
        this.skuList = []
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.fixedList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
        if (this.fixedList.length > 0) {
          for (let s = 0; s < this.fixedList.length; s++) {
            this.fixedList[s]['disabled'] = true
            const custInfolist = this.fixedList[s]['custInfo']
            const productInfolist = this.fixedList[s]['productInfo']
            if (custInfolist) {
              this.fixedList[s]['accounts'] = '已选择' + custInfolist.custList.length + '个代理商'
              this.accountList[s] = []
              for (let i = 0; i < custInfolist.custList.length; i++) {
                const id = custInfolist.custList[i].custCode
                this.accountList[s].push(id)
              }
            } else {
              this.fixedList[s]['accounts'] = '已选择0个代理商'
            }
            if (productInfolist) {
              this.fixedList[s]['sku'] = '已选择' + productInfolist.productList.length + '个产品'
              this.skuList[s] = []
              for (let i = 0; i < productInfolist.productList.length; i++) {
                const id = productInfolist.productList[i].janCode
                this.skuList[s].push(id)
              }
            } else {
              this.fixedList[s]['sku'] = '已选择0产品'
            }
          }
        }
        this.isLoading = false
      }
    },
    async customerList1(id) {
      // const params = new FormData()
      // params.append('deptCode', id)
      // const res = await treeListCustomer(params)
      const res = await treeListCustomer(id)
      if (res && res.success) {
        // this.searchDetailParam.paramMonthlyEstId = results[0].id
        const results = res.datas.list
        this.csaccountList = results
        if (results.length > 0) {
          const lastcust = this.getTreeList(results, 'area1', 'area2', 'custName', 'custCode')
          this.accounts[0].children = lastcust
        }
      }
    },
    async productList(id) {
      // const params = new FormData()
      // params.append('deptCode', id)
      // const res = await treeListCustomer(params)
      const res = await treeListProduct(id)
      if (res && res.success) {
        const results = res.datas.list
        this.csskuList = results
        const lastproduct = this.getTreeList(results, 'category', 'feeInputType', 'productName', 'janCode')
        this.customers[0].children = lastproduct
      }
    },
    async accountChange(val) {
      if (!this.searchParam.params.submitOrg) {
        return false
      }
      this.searchParam.params.finAccountCode = ''
      this.fees2 = []
      if (val) {
        const res = await finAccountType(this.searchParam.params.submitOrg, val)
        if (res && res.success) {
          const results = res.datas.list
          this.fees2 = results
        }
      }
    },
    async removeList() {
      if (this.multipleSelection.length > 0) {
        const delectList = this.multipleSelection
        const idList = []
        const idList2 = []
        for (let s = 0; s < delectList.length; s++) {
          // delete arr[1]
          // const idlie = delectList[s].id
          // idList2.push(idlie)
          if (delectList[s].configId !== undefined) {
            const delectid = delectList[s].configId
            idList.push(delectid)
          } else {
            const delectid = delectList[s].id
            idList2.push(delectid)
          }
        }
        if (idList.length > 0) {
          this.$confirm('是否确认删除？', this.$t('comm.tips'), {
            confirmButtonText: this.$t('comm.certain'),
            cancelButtonText: this.$t('comm.cancel'),
            type: 'warning'
          }).then(async() => {
            this.isLoading = true
            const params = new FormData()
            params.append('detailIds', String(idList))
            const res = await deleteList(params)
            if (res && res.success) {
              if (idList2.length > 0) {
                for (let y = 0; y < idList2.length; y++) {
                  const removeId = idList2[y]
                  for (let i = 0; i < this.fixedList.length; i++) {
                    const listId = this.fixedList[i].id

                    if (removeId === listId) {
                      // delete this.fixedList[i]
                      this.$set(this.fixedList, this.fixedList.splice(i, 1))
                      this.$set(this.accountList, this.accountList.splice(i, 1))
                      this.$set(this.skuList, this.skuList.splice(i, 1))
                    }
                  }
                }
              }
              if (idList.length > 0) {
                for (let y = 0; y < idList.length; y++) {
                  const removeId = idList[y]
                  for (let i = 0; i < this.fixedList.length; i++) {
                    const listId = this.fixedList[i].configId

                    if (removeId === listId) {
                      this.$set(this.fixedList, this.fixedList.splice(i, 1))
                      this.$set(this.accountList, this.accountList.splice(i, 1))
                      this.$set(this.skuList, this.skuList.splice(i, 1))
                    }
                  }
                }
              }
              this.selectsku = ''
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
          if (idList2.length > 0) {
            for (let y = 0; y < idList2.length; y++) {
              const removeId = idList2[y]
              for (let i = 0; i < this.fixedList.length; i++) {
                const listId = this.fixedList[i].id
                if (removeId === listId) {
                  // delete this.fixedList[i]
                  this.$set(this.fixedList, this.fixedList.splice(i, 1))
                  this.$set(this.accountList, this.accountList.splice(i, 1))
                  this.$set(this.skuList, this.skuList.splice(i, 1))
                }
              }
            }
          }
        }
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    getMockList(type) {
      const monthfee = {}
      if (type === 1) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = 100
          monthfee['included_' + i] = 120
        }
      } else if (type === 2) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = 50
          monthfee['included_' + i] = 60
        }
      } else if (type === 3) {
        for (let i = 1; i < 13; i++) {
          monthfee['untaxed_' + i] = '30%'
          monthfee['included_' + i] = '50%'
        }
      }
      return monthfee
    },
    handleCreate() {
      this.$router.push('/promotion/strategytwo/edit')
    },
    strategyEdit() {
      this.$router.push('/promotion/strategytwo/detail')
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 7 === 0) {
          return {
            rowspan: 7,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 1) {
        if (rowIndex === 0 || rowIndex === 7) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if ((rowIndex + 1) % 2 === 0 && rowIndex < 7) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex % 2 === 0 && rowIndex > 7) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 2) {
        if (rowIndex === 0 || rowIndex === 7) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleCheckedCitiesChange(value) {
      this.tax1 = value.includes('未税')
      this.tax2 = value.includes('含税')
    },
    async downloadFile() {
      this.isLoading = true
      await downloadExcel()
      this.isLoading = false
    },
    async downloadSalesFile() {
      this.isLoading = true
      await downloadSalesExcel()
      this.isLoading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val

      const list = this.fixedList
      for (let s = 0; s < list.length; s++) {
        this.fixedList[s]['disabled'] = true
      }
      for (let index = 0; index < val.length; index++) {
        // if(val[index].id)
        if (val[index].configId === undefined) {
          const selectId = val[index].id
          for (let s = 0; s < list.length; s++) {
            const listId = list[s].id
            if (listId === selectId) {
              this.fixedList[s]['disabled'] = false
            }
          }
        } else {
          const selectId = val[index].configId
          for (let s = 0; s < list.length; s++) {
            const listId = list[s].configId
            if (listId === selectId) {
              this.fixedList[s]['disabled'] = false
            }
          }
        }
      }
    },
    handleOkClick(type) {
      const names = []
      // let index = 0
      let skuNum = 0
      if (type === 'customers') {
        this.$refs.customerTree.getCheckedNodes().forEach((item) => {
          if (!item.children) {
            if (item.id) {
              skuNum++
              names.push(item.id)
            }
          }
        })
        this.fixedList[this.selectsku].sku = '选择' + skuNum + '个产品'
        this.$set(this.fixedList, this.selectsku, this.fixedList[this.selectsku])
        this.skuList[this.selectsku] = names
        this.fixedList[this.selectsku].productInfo = { 'productList': [] }
        for (let s = 0; s < names.length; s++) {
          const id = names[s]
          for (let i = 0; i < this.csskuList.length; i++) {
            const newid = this.csskuList[i].janCode
            if (newid === id) {
              const custListlie = {
                category: this.csskuList[i].category,
                productName: this.csskuList[i].productName,
                janCode: this.csskuList[i].janCode
              }
              this.fixedList[this.selectsku].productInfo.productList.push(custListlie)
            }
          }
        }
        this.customersDialogShow = false
        this.$refs.customerTree.setCheckedKeys([])
      } else if (type === 'account') {
        this.$refs.accountTree.getCheckedNodes().forEach((item) => {
          if (!item.children) {
            if (item.id) {
              skuNum++
              names.push(item.id)
            }
          }
        })
        this.fixedList[this.selectsku].accounts = '选择' + skuNum + '个代理商'
        this.$set(this.fixedList, this.selectsku, this.fixedList[this.selectsku])
        // this.fixedList[this.selectsku]['accounts'] = '选择' + skuNum + '个代理商'
        this.accountList[this.selectsku] = names
        this.fixedList[this.selectsku].custInfo = { 'custList': [] }
        for (let s = 0; s < names.length; s++) {
          const id = names[s]
          for (let i = 0; i < this.csaccountList.length; i++) {
            const newid = this.csaccountList[i].custCode
            if (newid === id) {
              const custListlie = {
                area1: this.csaccountList[i].area1,
                area2: this.csaccountList[i].area2,
                custCode: this.csaccountList[i].custCode,
                custName: this.csaccountList[i].custName
              }
              this.fixedList[this.selectsku].custInfo.custList.push(custListlie)
            }
          }
        }
        this.accountDialogShow = false
        this.$refs.accountTree.setCheckedKeys([])
      }
    },
    handleCancelClick(type) {
      if (type === 'customers') {
        this.customersDialogShow = false
        this.$refs.customerTree.setCheckedKeys([])
      }
      if (type === 'account') {
        this.accountDialogShow = false
        this.$refs.accountTree.setCheckedKeys([])
      }
    },
    showsSKWPop(id, index) {
      if (!id) {
        this.$message({
          type: 'error',
          message: '请先选择部门'
        })
        return false
      }
      if (!this.multipleSelection.find((item) => item.id === this.fixedList[index].id)) return
      // this.customerList(id)
      this.productList(id).then(() => {
        this.cssku = []
        this.customersDialogShow = true
        this.selectsku = index
        // this.$set(this.cssku, 1, this.skuList[index])
        this.cssku = this.skuList[index]
      })
    },
    showsSKWPop2(id, index) {
      if (!id) {
        this.$message({
          type: 'error',
          message: '请先选择部门'
        })
        return false
      }
      if (!this.multipleSelection.find((item) => item.id === this.fixedList[index].id)) return
      this.customerList1(id).then(() => {
        this.csaccount = []

        this.accountDialogShow = true
        this.selectsku = index
        this.csaccount = this.accountList[index]
      })
    },
    handleOpen() {
      try {
        this.$refs.accountTree.setCheckedKeys(this.csaccount)
      } catch (error) {
        // console.log('')
      }
    },
    handleOpenSKU() {
      try {
        this.$refs.customerTree.setCheckedKeys(this.cssku)
      } catch (error) {
        // console.log('')
      }
    },
    saveList() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      } else {
        if (!this.validatorAll()) {
          return false
        }

        const saveList = this.multipleSelection
        const newSaveList = []
        for (let s = 0; s < saveList.length; s++) {
          const saveListlie = this.multipleSelection[s]
          const newsavelie = {}
          newsavelie['id'] = saveListlie.configId
          newsavelie['discPromName'] = saveListlie.discPromName
          newsavelie['finAccountType'] = saveListlie.finAccountType
          newsavelie['finAccountCode'] = saveListlie.finAccountCode
          newsavelie['finAccountName'] = saveListlie.finAccountName
          newsavelie['channel'] = saveListlie.channel
          newsavelie['estSalesRate'] = saveListlie.estSalesRate
          newsavelie['expsType'] = saveListlie.expsType
          newsavelie['exchangeRate'] = saveListlie.exchangeRate
          newsavelie['custInfo'] = saveListlie.custInfo
          newsavelie['productInfo'] = saveListlie.productInfo
          newsavelie['month01'] = saveListlie.month01
          newsavelie['month02'] = saveListlie.month02
          newsavelie['month03'] = saveListlie.month03
          newsavelie['month04'] = saveListlie.month04
          newsavelie['month05'] = saveListlie.month05
          newsavelie['month06'] = saveListlie.month06
          newsavelie['month07'] = saveListlie.month07
          newsavelie['month08'] = saveListlie.month08
          newsavelie['month09'] = saveListlie.month09
          newsavelie['month10'] = saveListlie.month10
          newsavelie['month11'] = saveListlie.month11
          newsavelie['month12'] = saveListlie.month12
          newSaveList.push(newsavelie)
        }
        this.$confirm('当前选中项将被保存，是否确认？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'info'
        }).then(async() => {
          this.isLoading = true
          const res = await saveListApi({ jsonList: JSON.stringify(newSaveList) })
          if (res) {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getFixedList(this.searchParam)
            }
          }
          this.isLoading = false
        }).catch(err => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
          console.log(err)
          this.isLoading = false
        })
      }
    },
    addTable() {
      // var id = 'a' + Math.ceil(Math.random() * 10)
      const addTable = {
        'submitOrg': this.searchParam.params.submitOrg,
        'channel': '',
        'custInfo': null,
        'productInfo': null,
        'discPromName': '',
        'estSalesRate': '',
        'exchangeRate': '',
        'expsType': '',
        'finAccountCode': '',
        'finAccountName': '',
        'finAccountType': '',
        'id': String(Math.floor(Math.random() * (9999 - 1000)) + 1000),
        'month01': null,
        'month02': null,
        'month03': null,
        'month04': null,
        'month05': null,
        'month06': null,
        'month07': null,
        'month08': null,
        'month09': null,
        'month10': null,
        'month11': null,
        'month12': null,
        'accounts': '已选择0个代理商',
        'sku': '已选择0个产品',
        'disabled': false
      }
      this.fixedList.push(addTable)
      this.$refs.table.toggleRowSelection(addTable, true)
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    getTreeList(list, name1, name2, name3, code3) {
      let area1 = []
      const newList = []
      for (let s = 0; s < list.length; s++) {
        const area1lie = list[s][name1]
        area1.push(area1lie)
      }
      area1 = this.unique(area1)
      let area1Id = 0
      let area2Id = 10
      for (let s = 0; s < area1.length; s++) {
        area1Id++
        const lie = area1[s]
        const listlie = { 'id': area1Id, 'label': lie, 'children': [] }
        newList.push(listlie)
        const attr = []
        for (let i = 0; i < list.length; i++) {
          const parent = list[i][name1]

          if (parent === lie) {
            area2Id++
            const lietwo = list[i][name2]
            const listlietwo = { 'id': area2Id, 'label': lietwo, 'children': [] }
            if (attr.indexOf(lietwo) === -1) {
              listlie['children'].push(listlietwo)
              attr.push(lietwo)
            }
            // for (let z = 0; z < listlie['children'].length; z++) {
            //   // const labellie = listlie['children'][z]['label']

            // }

            for (let y = 0; y < list.length; y++) {
              const lastchild = list[y][name2]
              if (lastchild === lietwo && parent === list[y][name1]) {
                const liethree = list[y][name3]
                const liethreecode = list[y][code3]
                const listliethree = { 'id': liethreecode, 'label': liethree }
                listlietwo['children'].push(listliethree)
              }
            }
          }
        }
      }
      return newList
    },
    accountSelect(index) {
      const accountid = this.fixedList[index].finAccountCode
      const finname = this.fees1.filter(function(x) {
        return x.accountCode === accountid
      })
      this.fixedList[index].finAccountName = finname[0].accountName
      this.fixedList[index].finAccountType = finname[0].accountType
      /* if (accountid === 'f001' || accountid === 'f002') {
        this.fixedList[index].finAccountType = '1'
      } else {
        this.fixedList[index].finAccountType = '2'
      } */
      this.validator('finAccountCode' + index, accountid)
    },
    /* upload() {
      this.uploadDialog = true
    }, */
    handleUploadSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
    },
    handleUploadSalesSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
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
