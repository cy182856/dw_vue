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
                年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.targetYm" size="small" :placeholder="'请选择'" type="month" :clearable="false" value-format="yyyy-MM" :picker-options="pickerOptions0" />
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
        <li class="operation-item" @click="edit()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">编辑</span>
        </li>
        <li class="operation-item" @click="add">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">新建</span>
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
            <el-table-column :prop="'targetYm'" :label="'年月'" min-width="120" align="center" />
            <el-table-column :prop="'payDate'" :label="'支付日'" min-width="120" align="center" />
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
    <el-dialog
      class="content-dialog-box  search-light rules newedit2"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title="isAdd?'新建':'编辑'"
      :visible.sync="isShow"
      width="600"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
      <el-form ref="form" :model="editData" label-width="80px">
        <el-form-item label="年月" style="margin-bottom:26px;">
          <el-col :span="24">
            <el-date-picker v-model="editData.targetYm" type="month" style="width: 100%;" value-format="yyyy-MM" @blur="validator('targetYm')" />
            <span ref="targetYm" data-roles="required" :data-value="editData.targetYm" class="message" style="line-height: 20px;position: absolute;" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定支付日" style="margin-bottom:26px;">
          <el-col :span="24">
            <el-date-picker v-model="editData.payDate" type="date" style="width: 100%;" value-format="yyyy-MM-dd" @blur="validator('payDate')" />
            <span ref="payDate" data-roles="required" :data-value="editData.payDate" class="message" style="line-height: 20px;position: absolute;" />
          </el-col>
        </el-form-item>
      </el-form>
      <div class="btn">
        <button class="cancel" @click="handleClose">
          取消
        </button>
        <button class="save" @click="handleSave">
          保存
        </button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { formValidator } from '@/mixins/form-validator.js'
import { getPaymentDateList, savePaymentDate, updatePaymentDate } from '@/api/finance/paymentdate.js'
export default {
  name: 'PaymentDate',
  mixins: [search, names, permission, numFormat, formValidator],
  data() {
    return {
      isShow: false,
      isAdd: true,
      editData: {},
      isLoading: false,
      multipleSelection: [],
      WriteoffList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          targetYm: ''
        }
      },
      bigAreas: [],
      smallAreas: [],
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
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    this.fetchData()
    console.log(this.WriteoffList)
  },
  methods: {
    handleClose() {
      this.isShow = false
    },
    async handleSave() {
      console.log(this.editData)
      if (!this.validatorAll()) {
        return false
      }
      const payDate = new Date(this.editData.payDate)
      // for (let i = 0; i < this.WriteoffList.length; i++) {
      //   const inputpayDate = new Date(this.WriteoffList[i].payDate)
      //   if (this.editData.targetYm === this.WriteoffList[i].targetYm && payDate.getTime() <= inputpayDate.getTime()) {
      //     this.$message({
      //       type: 'error',
      //       message: '同一年月的预定支付日必须大于已存在的预定支付日'
      //     })
      //     return false
      //   }
      // }
      console.log('payDate:' + this.editData.payDate.substr(0, 7))
      if (this.editData.targetYm !== this.editData.payDate.substr(0, 7)) {
        this.$message({
          type: 'error',
          message: '预定支付日必须与年月为同一年月'
        })
        return false
      }
      console.log('systemdate:' + this.currentDate)
      if (payDate.getTime() <= this.currentDate) {
        this.$message({
          type: 'error',
          message: '预定支付日必须大于系统日期'
        })
        return false
      } else {
        if (this.isAdd) {
          const res = await savePaymentDate(this.editData)
          if (res && res.success) {
            res.messages.message
            this.search()
            this.isShow = false
          }
        } else {
          const res = await updatePaymentDate(this.editData.id, this.editData)
          if (res && res.success) {
            res.messages.message
            this.search()
            this.isShow = false
          }
        }
      }
    },
    add() {
      this.clearErrorMessage()
      this.isAdd = true
      this.editData = {
      }
      this.isShow = true
    },
    edit() {
      this.clearErrorMessage()
      this.isAdd = false
      if (this.multipleSelection.length === 1) {
        this.editData = { ...this.multipleSelection[0] }
        this.isShow = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    async fetchData() {
      this.isLoading = true
      const res = await getPaymentDateList(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.WriteoffList = results
        this.currentDate = res.datas.currentDate
      }
      this.isLoading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
.apply .newedit2 .el-dialog {
    width: 400px !important;
    height: 260px;
    min-width: 400px !important;
}
</style>
