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
                  v-model="searchParam.estY"
                  type="year"
                  placeholder="请选择"
                  value-format="yyyy"
                  :picker-options="pickerOptions0"
                />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                品类
              </div>
              <div class="input">
                <select-by-remote v-model="searchParam.category" method="POST" action-url="/api/mrk/product/getRange" :params="selectRemoteTopParams" />
              </div>
            </div>
            <!--<div class="flex4">
              <div class="title">
                系列
              </div>
              <div class="input">
                <select-by-remote v-model="searchParam.feeInputType" method="POST" action-url="/api/mrk/product/getRange" :parent-value="searchParam.category" />
              </div>
            </div>-->
            <!--<div class="flex4">
              <div class="title">
                大区
              </div>
              <div class="input">
                <el-input v-model="searchParam.custArea1" placeholder="请输入大区" />
              </div>
            </div>-->
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
import { downloadList } from '@/api/report/promotion.js'
import { getDacSeq } from '@/api/base'
export default {
  name: 'OperatingProfit',
  // components: { RelFuncSelect },
  mixins: [names, formValidator, searchPopMultiple],
  data() {
    return {
      isLoading: true,
      activeNames: ['1', '2'],
      reportUrl: '',
      searchTableHeight: 0,
      searchTableWidth: 0,
      productDialogShow: false,
      customersDialogShow: false,
      selectRemoteTopParams: '{"level":"1"}',
      searchParam: {
        estY: String(new Date().getFullYear()),
        category: '',
        feeInputType: '',
        custName: '',
        fileName: 'rpt010.rpx'
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
    // this.reportUrl = process.env.VUE_APP_BI_URL + '/decision/v10/entry/access/2e66e27c-5e99-4b36-8580-47fb99f821e3?preview=true'
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
      if (!this.searchParam.estY) {
        this.$message({
          type: 'error',
          message: '年度为必选项'
        })
        return false
      }
      /*if (!this.searchParam.custName) {
        this.$message({
          type: 'error',
          message: '代理商为必选项'
        })
        return false
      }*/
      const res = await getDacSeq('t_m_customer')
      if (res && res.success) {
        this.searchParam.dacSeqNo = res.datas.dacSeqNo
        await downloadList(this.searchParam)
      }
    },
    handleResetParams() {
      this.searchParam.params.estY = String(new Date().getFullYear())
      this.searchParam.custArea1 = ''
      this.searchParam.category = ''
      this.searchParam.feeInputType = ''
      this.searchParam.custName = ''
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
