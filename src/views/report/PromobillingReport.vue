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
                  v-model="searchParam.estYm"
                  type="year"
                  placeholder="请选择"
                  value-format="yyyy"
                />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                月份From
              </div>
              <div class="input">
                <el-date-picker
                  v-model="searchParam.bookYm1"
                  type="month"
                  placeholder="请选择"
                  value-format="yyyy-MM"
                  :picker-options="pickerOptions0"
                />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                月份To
              </div>
              <div class="input">
                <el-date-picker
                  v-model="searchParam.bookYm2"
                  type="month"
                  placeholder="请选择"
                  value-format="yyyy-MM"
                  :picker-options="pickerOptions1"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex4">
              <div class="title">
                大区
              </div>
              <div class="input">
                <el-input v-model="searchParam.custArea1" clearable />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                小区
              </div>
              <div class="input">
                <el-input v-model="searchParam.custArea2" clearable />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                代理商名称
              </div>
              <div class="input">
                <el-input v-model="searchParam.custName" placeholder="请输入名称" />
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
import { getArea1List, getArea2ListByArea1 } from '@/api/mrk/customer'
import { downloadRPT006 } from '@/api/report/promotion.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'ContractTTEMReport1',
  // components: { RelFuncSelect },
  mixins: [names, formValidator, dict, searchPopMultiple],
  data() {
    return {
      isLoading: true,
      activeNames: ['1', '2'],
      reportUrl: '',
      searchTableHeight: 0,
      searchTableWidth: 0,
      productDialogShow: false,
      customersDialogShow: false,
      area1List: [],
      area2List: [],
      searchParam: {
        estYm: String(new Date().getFullYear()),
        bookYm1: '',
        bookYm2: '',
        custArea1: '',
        custArea2: '',
        custName: '',
        fileName: 'rpt006.rpx'
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.searchParam.bookYm2 !== '') {
            return time.getTime() > new Date(this.searchParam.bookYm2).getTime()
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.searchParam.bookYm1).getTime() - 8.64e7
        }
      }
    }
  },
  computed: {
  },
  watch: {

  },
  created() {
    // this.loadArea1Data()
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
    async loadArea1Data() {
      const res = await getArea1List()
      if (res && res.success) {
        this.area1List = res.datas.list
      }
    },
    async loadArea2List() {
      if (!this.searchParam.custArea1) {
        this.area2List = []
      } else {
        const res = await getArea2ListByArea1(this.searchParam.custArea1)
        if (res && res.success) {
          this.area2List = res.datas.list
        }
      }
    },
    async downloadFile() {
      console.log(this.searchParam)
      this.searchParam.bookYm1 = this.searchParam.estYm
      const res = await downloadRPT006(this.searchParam)
      if (res && res.success) {
        // const results = res.datas.list
        console.log(res)
        // this.fees2 = results
      }
    },
    handleResetParams() {
      this.searchParam.estYm = String(new Date().getFullYear())
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
