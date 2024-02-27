<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.contractNo') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.contractType') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.contractType" dict-type-id="ContractType" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.accountType') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.accountType" dict-type-id="AccountType" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.contractName') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.contractName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.channel') }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.channel" placeholder="请选择">
                  <el-option
                    v-for="item in channel"
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
                {{ $t('contract.apply.department') }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.department" placeholder="请选择">
                  <el-option
                    v-for="item in department"
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
                {{ $t('contract.apply.salesOffice') }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.salesOffice" placeholder="请选择">
                  <el-option
                    v-for="item in salesOffice"
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
                {{ $t('contract.apply.localChain') }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.localChain" placeholder="请选择">
                  <el-option
                    v-for="item in localChain"
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
                {{ $t('contract.apply.soldto') }}:
              </el-col>
              <el-col :span="16">
                <rel-func-select v-model="searchParam.params.soldTo" rel-func="account" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.brand') }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.brand" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.stampStatus') }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.stampStatus" placeholder="请选择">
                  <el-option
                    v-for="item in stampStatus"
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
                {{ $t('contract.apply.contractStatus') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.contractStatus" dict-type-id="ContractStatus" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="year">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.contractStartDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.contractStartDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="year">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('contract.apply.contractEndDate') }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.contractEndDate" size="small" type="date" value-format="yyyy-MM-dd" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t('comm.reset') }}</p>
          <span class="circle-larger-btn btn-default-color"><i class="iconfont iconrefresh" /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t('comm.query') }}</p>
          <span class="circle-larger-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="handleCreate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">{{ $t('comm.newlyBuild') }}</span>
        </li>
        <li class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.export') }}</span>
        </li>
        <li class="operation-item" @click="handleUpdateHisClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="contractList"
            border
            stripe
            height="100%"
            :row-class-name="tableRowClassName"
            :header-cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="55"
            />
            <el-table-column prop="identiferNum" :label="$t('contract.apply.contractNo')" min-width="110" align="center">
              <template slot-scope="scope">
                <router-link :to="{path:'/contract/apply/detail',query:{id:scope.row.id}}">
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="contractType" :label="$t('contract.apply.contractType')" min-width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.contractType | dictName('ContractType') }}
              </template>
            </el-table-column>
            <el-table-column prop="accountType" :label="$t('contract.apply.accountType')" min-width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.accountType | dictName('AccountType') }}
              </template>
            </el-table-column>
            <el-table-column prop="contractName" :label="$t('contract.apply.contractName')" min-width="160" align="center" show-overflow-tooltip />
            <el-table-column prop="channel" :label="$t('contract.apply.channel')" align="center" min-width="90" />
            <el-table-column prop="department" :label="$t('contract.apply.department')" align="center" min-width="90" />
            <el-table-column prop="salesOffice" :label="$t('contract.apply.salesOffice')" align="center" min-width="90" />
            <el-table-column prop="localChain" :label="$t('contract.apply.localChain')" align="center" min-width="90" />
            <el-table-column prop="soldTo" :label="$t('contract.apply.soldto')" align="center" min-width="120" />
            <el-table-column prop="brand" :label="$t('contract.apply.brand')" align="center" min-width="120" />
            <el-table-column prop="stampStatus" :label="$t('contract.apply.stampStatus')" align="center" min-width="90" />
            <el-table-column prop="contractStatus" :label="$t('contract.apply.contractStatus')" align="center" min-width="90">
              <template slot-scope="scope">
                {{ scope.row.contractStatus | dictName('ContractStatus') }}
              </template>
            </el-table-column>
            <el-table-column prop="contractStartDate" :label="$t('contract.apply.contractStartDate')" align="center" min-width="100" />
            <el-table-column prop="contractEndDate" :label="$t('contract.apply.contractEndDate')" align="center" min-width="100" />
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
          <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
        </el-pagination>
        <el-pagination class="page-right  page-first" layout="slot">
          <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
        </el-pagination>
      </div>
    </div>
    <div class="exportDialog">
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-resource  fixed-search-btn-box"
        top="0"
        :visible.sync="exportSelectDilog"
        :title="$t('comm.exportFieldsSelect')"
        width="50%"
      >
        <export-fields-select func-div="contract" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
    <div class="historyDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his :key="identiferNum" func-div="contract" :identifer-num="identiferNum" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
// import { getList, deleteContract } from '@/api/contract/apply.js'
import { names } from '@/mixins/names.js'
// import UserSelect from '@/components/UserSelect.vue'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'

export default {
  name: 'ApplyList',
  components: { RelFuncSelect },
  mixins: [search, names, permission],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      contractList: [],
      exportSelectDilog: false,
      identiferNum: '',
      historyDialog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          identiferNum: '',
          contractType: '',
          accountType: '',
          contractName: '',
          channel: '',
          department: '',
          salesOffice: '',
          localChain: '',
          soldTo: '',
          brand: '',
          stampStatus: '',
          contractStatus: '',
          contractStartDate: '',
          contractEndDate: ''
          // assignedUser: '',
          // assignedOrg: ''
        }
      },
      channel: [{
        value: '1',
        label: 'KA'
      }, {
        value: '2',
        label: 'DB'
      }, {
        value: '3',
        label: 'EC'
      }],
      department: [{
        value: '2',
        label: 'KA部'
      }, {
        value: '3',
        label: '日系客户部'
      }, {
        value: '1',
        label: 'EC&新零售部'
      }, {
        value: '4',
        label: '华东地区'
      }, {
        value: '5',
        label: '华南地区'
      }, {
        value: '6',
        label: '西南地区'
      }, {
        value: '7',
        label: '华北地区'
      }],
      salesOffice: [{
        value: '1',
        label: 'AV01'
      }, {
        value: '2',
        label: 'AV02'
      }, {
        value: '3',
        label: 'AV03'
      }],
      localChain: [{
        value: '1',
        label: 'R01'
      }, {
        value: '2',
        label: 'R02'
      }, {
        value: '3',
        label: 'R03'
      }],
      stampStatus: [{
        value: '1',
        label: '已盖章'
      }, {
        value: '2',
        label: '未盖章'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // this.searchParam.params.assignedOrg = this.userInfo.orgSeqNo.split('.')[1]
      // const res = await getList(this.searchParam)
      // if (res && res.success) {
      //   const { results, pageNo, totalRecord } = res.datas.searchResult
      //   this.contractList = results
      //   this.searchParam.pageNo = pageNo
      //   this.searchParam.totalRecord = totalRecord
      // }
      this.contractList.push({
        id: '1',
        identiferNum: 'CON20120001',
        contractType: '01',
        accountType: '01',
        contractName: '采购合同01',
        channel: 'KA',
        department: '采购部1',
        salesOffice: 'AV01',
        localChain: 'R01',
        soldTo: '售达方1',
        brand: '碧柔',
        stampStatus: '已盖章',
        contractStatus: '01',
        contractStartDate: '2021-03-01',
        contractEndDate: '2021-11-30'
      })
      this.contractList.push({
        id: '2',
        identiferNum: 'CON20120002',
        contractType: '02',
        accountType: '02',
        contractName: '销售合同02',
        channel: 'KA',
        department: '采购部2',
        salesOffice: 'AV02',
        localChain: 'R02',
        soldTo: '售达方2',
        brand: '碧柔',
        stampStatus: '未盖章',
        contractStatus: '02',
        contractStartDate: '2021-04-01',
        contractEndDate: '2021-10-30'
      })
      this.contractList.push({
        id: '3',
        identiferNum: 'CON20120003',
        contractType: '02',
        accountType: '03',
        contractName: '销售合同03',
        channel: 'KA',
        department: '采购部3',
        salesOffice: 'AV03',
        localChain: 'R02',
        soldTo: '售达方3',
        brand: '碧柔',
        stampStatus: '已盖章',
        contractStatus: '03',
        contractStartDate: '2021-03-01',
        contractEndDate: '2021-12-31'
      })
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    tableRowClassName({ row }) {
      if (row.prompt === '1') {
        return 'warning-row'
      }
      return ''
    },
    handleCreate() {
      this.$router.push('/contract/apply/edit')
    },
    handleEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({ path: '/contract/apply/edit', query: { id: rowData.id }})
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleDelete(rowData) {
      if (rowData.workflowFlag === '1') {
        this.$message({
          type: 'error',
          message: '流程中，不能删除'
        })
        return
      }
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        rowData.submitType = 'submit'
        // deleteContract([rowData]).then(() => {
        //   this.search()
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    batchDelete() {
      if (this.multipleSelection.length > 0) {
        let workflowFlag = false
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1' && !workflowFlag) {
            this.$message({
              type: 'error',
              message: '流程中，不能删除'
            })
            workflowFlag = true
          }
          rowData.submitType = 'submit'
        })
        if (workflowFlag) return false
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          // deleteContract(this.multipleSelection).then(() => {
          //   this.search()
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
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
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({ path: '/contract/apply/edit', query: { id: rowData.id, copy: true }})
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleUpdateHisClick() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.identiferNum = this.multipleSelection[0].identiferNum
        this.historyDialog = true
      } else {
        this.$message({
          type: 'info',
          message: '请选择一条记录'
        })
      }
    }

  }
}
</script>
<style lang="scss">
.el-table .warning-row {
  background: rgb(253, 233, 230);
}
</style>
