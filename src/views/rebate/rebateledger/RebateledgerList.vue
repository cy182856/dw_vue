<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="accountName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.rebateledger.accountName') }}:
              </el-col>
              <el-col :span="16">
                <rel-func-select v-model="searchParam.params.accountNum" :rel-func="'account'" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="currency">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.rebateledger.currency') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.currency" dict-type-id="Currency" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="industry">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.rebateledger.industry') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.industry" dict-type-id="Industry" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="balanceCash">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.rebateledger.balanceCash') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.balanceCash" dict-type-id="YesOrNot" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="balanceDeduct">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.rebateledger.balanceDeduct') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.balanceDeduct" dict-type-id="YesOrNot" size="small" class="input" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="whFlag">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('rebate.rebateledger.whFlag') }}:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.whFlag" dict-type-id="YesOrNot" size="small" class="input" clearable />
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
        <li class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.export') }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="rebateledgerList"
            stripe
            border
            height="100%"
            :header-cell-style="{'text-align':'left'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="customerIdentiferNum" :label="$t('rebate.rebateledger.identiferNum')" min-width="150">
              <template slot-scope="scope">
                <router-link :to="{path:'/rebate/rebateledger/detail',query:{id:scope.row.id}}">
                  {{ scope.row.customerIdentiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="accountName" :label="$t('rebate.rebateledger.accountName')" width="180" show-overflow-tooltip />
            <el-table-column :label="$t('rebate.rebateledger.currency')" min-width="120">
              <template slot-scope="scope">
                <dict-write dict-type-id="Currency" :value="scope.row.currency" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('rebate.rebateledger.industry')" min-width="80">
              <template slot-scope="scope">
                <dict-write dict-type-id="Industry" :value="scope.row.industry" />
              </template>
            </el-table-column>
            <el-table-column prop="regArea" :label="$t('rebate.rebateledger.regArea')" width="120">
              <template slot-scope="scope">
                <dict-write dict-type-id="RegArea" :value="scope.row.regArea" />
              </template>
            </el-table-column>
            <el-table-column prop="balanceCash" :label="$t('rebate.rebateledger.balanceCash')" width="120" align="right" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.balanceCash | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="balanceDeduct" :label="$t('rebate.rebateledger.balanceDeduct')" width="130" align="right" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.balanceDeduct | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('rebate.rebateledger.whFlag')" min-width="120">
              <template slot-scope="scope">
                <dict-write dict-type-id="YesOrNot" :value="scope.row.whFlag" />
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
        <export-fields-select func-div="rebateledger" file-type="xlsx" :search-param="searchParam" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import { getList } from '@/api/rebate/rebateledger.js'
import { names } from '@/mixins/names.js'
// import AccountSelect from '@/views/mrk/account/components/AccountSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'RebateledgerList',
  components: { RelFuncSelect },
  mixins: [search, names, permission, numFormat, niceScroll],
  data() {
    return {
      isLoading: true,
      activeNames: ['1'],
      multipleSelection: [],
      rebateledgerList: [],
      exportSelectDilog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          accountNum: '',
          currency: '',
          industry: '',
          balanceCash: '',
          balanceDeduct: '',
          whFlag: ''
        }
      }
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
      const res = await getList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.rebateledgerList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$router.push({ path: '/rebate/rebateledger/edit', query: { id: this.multipleSelection[0].id }})
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }

  }
}
</script>
<style lang="scss">
</style>
