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
                年月From
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
                年月To
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
import { downloadList } from '@/api/report/promotion.js'
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
      searchParam: {
        bookYm1: '',
        bookYm2: '',
        custName: '',
        fileName: 'rpt008.rpx'
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.searchParam.bookYm2 !== '') {
            return time.getTime() > new Date(this.searchParam.bookYm2).getTime() || time.getTime() < new Date('2021').getTime()
          } else {
            return time.getTime() < new Date('2021').getTime()
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.searchParam.bookYm1).getTime() - 8.64e7 || time.getTime() < new Date('2021').getTime()
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
    async downloadFile() {
      console.log(this.searchParam)
      if (!this.searchParam.bookYm1 || !this.searchParam.bookYm2) {
        this.$message({
          type: 'error',
          message: '请填写年月'
        })
        return false
      }
      const res = await downloadList(this.searchParam)
      if (res && res.success) {
        // const results = res.datas.list
        console.log(res)
        // this.fees2 = results
      }
    },
    handleResetParams() {
      this.searchParam.custName = ''
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
