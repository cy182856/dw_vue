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
                年度:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.bgtYear" size="small" type="year" value-format="yyyy" :clearable="false" :picker-options="pickerOptions0" @change="bgtYearChange()" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.custName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t("comm.reset") }}</p>
          <span class="circle-larger-btn btn-default-color"><i class="iconfont iconrefresh" /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t("comm.query") }}</p>
          <span class="circle-larger-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="addTable">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">新建</span>
        </li>
        <li class="operation-item" @click="handleSubmit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">保存</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable inputborder">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="rateLimitList"
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column label="年度" min-width="120">
              <template slot-scope="scope">
                <div>
                  <el-date-picker v-model="scope.row.bgtYear" size="small" type="year" value-format="yyyy" :clearable="false" :disabled="true" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="代理商" min-width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.custCode" filterable placeholder="请选择" @change="custCodeChange(scope.$index)">
                  <el-option
                    v-for="item in customerList"
                    :key="item.custCode"
                    :label="item.custName"
                    :value="item.custCode"
                  />
                </el-select>
                <span :ref="'custCode'+scope.$index" data-roles="required" :data-value="scope.row.custCode" class="message" />
              </template>
            </el-table-column>
            <el-table-column prop="category" :label="'品类'" min-width="150" align="center">
              <template slot-scope="scope">
                <dict-select v-model="scope.row.category" dict-type-id="Category" @change="(value)=>validator('category'+scope.$index,value)" />
                <span :ref="'category'+scope.$index" data-roles="required" :data-value="scope.row.category" class="message" />
              </template>
            </el-table-column>
            <el-table-column prop="finAccountType" :label="'费用类型'" min-width="150" align="center">
              <template slot-scope="scope">
                <dict-select v-model="scope.row.finAccountType" dict-type-id="AccountTypeView" @change="(value)=>validator('finAccountType'+scope.$index,value)" />
                <span :ref="'finAccountType'+scope.$index" data-roles="required" :data-value="scope.row.finAccountType" class="message" />
              </template>
            </el-table-column>
            <el-table-column label="费率上限" min-width="150" align="right">
              <template slot-scope="scope">
                <milli-input v-model="scope.row.rateLimit" clearable style="width:80%;display:inline-block;" to-fixed-num="2" @blur="(value)=>validator('rateLimit'+scope.$index,value)" /><span>%</span>
                <span :ref="'rateLimit'+scope.$index" data-roles="required" :data-value="scope.row.rateLimit" class="message" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format.js'
import { getList, getCustList, save } from '@/api/bgt/ratelimit.js'
export default {
  name: 'RateLimit',
  mixins: [search, names, permission, numFormat, formValidator],
  data() {
    return {
      isLoading: false,
      rateLimitList: [],
      customerList: [],
      // 分页插件数据
      searchParam: {
        bgtYear: String(new Date().getFullYear()),
        custName: ''
      },
      orgId: '',
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo
    },
    disabled() {
      let isSelect = true
      let isFlag = false
      if (this.userInfo.roleList.includes('ROLE_WF_MARKET') || this.userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY')) {
        return false
      }
      if (this.$store.getters.dictList.TARGETORG) {
        const targetList = this.$store.getters.dictList.TARGETORG
        if (targetList) {
          for (let s = 0; s < targetList.length; s++) {
            if (this.userInfo.orgSeqNo.indexOf(targetList[s].dictId) !== -1) {
              isFlag = true
              break
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
  created() {
    this.orgId = this.orgIdCom
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      this.getCustomerList()
      const res = await getList(this.searchParam)
      if (res && res.success) {
        this.rateLimitList = res.datas.list
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleSubmit() {
      if (!this.validatorAll()) {
        return false
      }
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await save(this.rateLimitList)
        if (res && res.success) {
          this.search()
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
        this.isLoading = false
      })
    },
    async getCustomerList() {
      const orgId = this.orgId
      if (orgId) {
        const res = await getCustList(orgId)
        if (res && res.success) {
          this.customerList = res.datas.list
        }
      }
    },
    custCodeChange(index) {
      for (let i = 0; i < this.customerList.length; i++) {
        if (this.customerList[i].custCode === this.rateLimitList[index]['custCode']) {
          this.rateLimitList[index]['custName'] = this.customerList[i].custName
          break
        }
      }
    },
    bgtYearChange() {
      this.getCustomerList()
      this.fetchData()
    },
    addTable() {
      if (!this.searchParam.bgtYear) {
        this.$message({
          type: 'error',
          message: '年月不能为空！'
        })
        return false
      }
      this.rateLimitList.push(
        {
          'bgtYear': this.searchParam.bgtYear,
          'custCode': '',
          'custName': '',
          'category': '',
          'finAccountType': '',
          'rateLimit': ''
        }
      )
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
.inputborder td input[disabled="disabled"]{
  border:none;
}
</style>
