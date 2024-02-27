<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">查询条件</span>
          <div class="input_box">
            <div class="flex4">
              <div class="title">
                年度
              </div>
              <div class="input">
                <el-date-picker
                  v-model="searchParam.rebateYm"
                  type="year"
                  placeholder="请选择"
                  value-format="yyyy"
                  :picker-options="pickerOptions0"
                />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                月份From
              </div>
              <div class="input">
                <el-select v-model="searchParam.bookYm1" placeholder="请选择月份From" clearable @change="bookYmChange1">
                  <el-option
                    v-for="item in months1"
                    :key="item.index"
                    :label="item.name"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                月份To
              </div>
              <div class="input">
                <el-select v-model="searchParam.bookYm2" placeholder="请选择月份To" clearable @change="bookYmChange2">
                  <el-option
                    v-for="item in months2"
                    :key="item.index"
                    :label="item.name"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </div>
            </div>
          </div>
          <div style="float:right;margin-bottom:15px">
            <el-button size="nomal" type="primary" @click="downloadFile">
              下载
            </el-button>
            <el-button size="nomal" type="info" style="margin-right:25px" @click="handleResetParams()">
              重置
            </el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>

import { formValidator } from '@/mixins/form-validator.js'
import { searchPopMultiple } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { dict } from '@/mixins/dict'
import { downloadRPT009 } from '@/api/report/promotion.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'ContractTTEMReport1',
  // components: { RelFuncSelect },
  mixins: [names, formValidator, dict, searchPopMultiple],
  data() {
    return {
      months1: [
        { name: '1月', value: '01' },
        { name: '2月', value: '02' },
        { name: '3月', value: '03' },
        { name: '4月', value: '04' },
        { name: '5月', value: '05' },
        { name: '6月', value: '06' },
        { name: '7月', value: '07' },
        { name: '8月', value: '08' },
        { name: '9月', value: '09' },
        { name: '10月', value: '10' },
        { name: '11月', value: '11' },
        { name: '12月', value: '12' }
      ],
      months2: [
        { name: '1月', value: '01' },
        { name: '2月', value: '02' },
        { name: '3月', value: '03' },
        { name: '4月', value: '04' },
        { name: '5月', value: '05' },
        { name: '6月', value: '06' },
        { name: '7月', value: '07' },
        { name: '8月', value: '08' },
        { name: '9月', value: '09' },
        { name: '10月', value: '10' },
        { name: '11月', value: '11' },
        { name: '12月', value: '12' }
      ],
      isLoading: true,
      activeNames: ['1', '2'],
      reportUrl: '',
      searchTableHeight: 0,
      searchTableWidth: 0,
      productDialogShow: false,
      customersDialogShow: false,
      searchParam: {
        rebateYm: String(new Date().getFullYear()),
        bookYm1: '',
        bookYm2: '',
        fileName: 'rpt009.rpx'
      },
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  computed: {
  },
  watch: {

  },
  created() {
  },
  mounted() {
    window.onresize = () => {
      this.widthHeight() // 自适应高宽度
    }
    this.$nextTick(function() {
      this.widthHeight()
    })
  },
  methods: {
    widthHeight() {
      this.searchTableHeight = window.innerHeight - 146
      this.searchTableWidth = window.innerWidth - 280
    },
    search() {
      this.isLoading = true
    },
    bookYmChange1() {
      for (let s = 0; s < this.months2.length; s++) {
        this.months2[s]['disabled'] = false
      }
      if (this.searchParam.bookYm1 !== '') {
        const val = Number(this.searchParam.bookYm1) - 1
        for (let s = 0; s < val; s++) {
          this.months2[s]['disabled'] = true
        }
      }
    },
    bookYmChange2() {
      for (let s = 0; s < this.months1.length; s++) {
        this.months1[s]['disabled'] = false
      }
      if (this.searchParam.bookYm2 !== '') {
        const val = Number(this.searchParam.bookYm2)
        for (let s = val; s < this.months1.length; s++) {
          this.months1[s]['disabled'] = true
        }
      }
    },
    async downloadFile() {
      const searchList = {
        rebateYm: this.searchParam.rebateYm,
        bookYm1: this.searchParam.bookYm1,
        bookYm2: this.searchParam.bookYm2,
        fileName: 'rpt009.rpx'
      }
      if (!searchList.rebateYm) {
        this.$message({
          type: 'error',
          message: '请选择年度'
        })
        return false
      }
      if (!!searchList.bookYm1 || !!searchList.bookYm2) {
        if (!searchList.bookYm1 || !searchList.bookYm2) {
          this.$message({
            type: 'error',
            message: '月份不选或者From、To都要选择'
          })
          return false
        } else {
          searchList.bookYm1 = searchList.rebateYm + '-' + searchList.bookYm1
          searchList.bookYm2 = searchList.rebateYm + '-' + searchList.bookYm2
        }
      }

      console.log(searchList)
      const res = await downloadRPT009(searchList)
      if (res && res.success) {
        // const results = res.datas.list
        console.log(res)
        // this.fees2 = results
      }
    },
    handleResetParams() {
      this.searchParam.rebateYm = String(new Date().getFullYear())
      this.searchParam.bookYm1 = ''
      this.searchParam.bookYm2 = ''
    }

  }
}
</script>
<style lang="scss" scoped>
.col_input_box {
  height: auto;
}
</style>
<style lang="scss" scoped>
.editbtn {
  background-color:rgb(102, 206, 188);
  color: white;
  margin-left: 50%;
  border: 0px solid #DCDFE6;
}
.specialselects .tag-list{
  min-height: 60px !important;
}
</style>
