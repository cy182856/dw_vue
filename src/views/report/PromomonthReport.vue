<template>
  <!-- 编辑画面 -->
  <div class="apply">
    <div class="detail" style="padding-left:50px !important;padding-right:28px !important;">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">查询条件</span>
          <div class="input_box">
            <div class="flex4">
              <div class="title">
                年月
              </div>
              <div class="input">
                <el-date-picker
                  v-model="searchParam.estYm"
                  type="month"
                  placeholder="请选择"
                  value-format="yyyy-MM"
                  :picker-options="pickerOptions0"
                />
              </div>
            </div>
            <li class="operation-item" @click="promotionTempDownloadFixFee">
              <span
                class="operation-circle circle-middle-btn btn-light-color bluebg"
              ><i
                class="el-icon-download"
              /></span>
              <span class="operation-text">其他费用下载</span>
            </li>
            <li class="operation-item" @click="uploadDialog=true">
              <span
                class="operation-circle circle-middle-btn btn-light-color bluebg"
              ><i
                class="el-icon-upload2"
              /></span>
              <span class="operation-text">其他费用上传</span>
            </li>
          </div>
          <div style="float:right;margin-bottom:15px">
            <el-button size="nomal" type="primary" @click="downloadFile">
              报表下载
            </el-button>
            <el-button size="nomal" type="info" style="margin-right:25px" @click="handleResetParams()">
              重置
            </el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <upload :is-show="uploadDialog" action="/api/rpt/import" accept=".xlsx" @onSuccess="handleUploadSuccess" @onClose="uploadDialog=false" />
  </div>
</template>
<script>

import { formValidator } from '@/mixins/form-validator.js'
import { searchPopMultiple } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { downloadRPT005, promotionTempDownloadFixFee } from '@/api/report/promotion.js'
import Upload from '@/components/UploadNew'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'ContractTTEMReport1',
  components: {
    Upload
  },
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
      uploadDialog: false,
      searchParam: {
        estYm: String(new Date().getFullYear()) + '-' + this.doHandleMonth(),
        fileName: 'rpt005.rpx'
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
      if (!this.searchParam.estYm) {
        this.$message({
          type: 'error',
          message: '年月为必选项'
        })
        return false
      }
      const res = await downloadRPT005(this.searchParam)
      if (res && res.success) {
        // const results = res.datas.list
        console.log(res)
        // this.fees2 = results
      }
    },
    handleResetParams() {
      this.searchParam.estYm = String(new Date().getFullYear()) + '-' + this.doHandleMonth()
    },
    promotionTempDownloadFixFee() {
      if (this.searchParam.estYm === '' || this.searchParam.estYm == null) {
        this.$message({
          type: 'warning',
          message: '年月为必选'
        })
        return
      }
      const downloadParam = {
        estYm: this.searchParam.estYm
      }
      promotionTempDownloadFixFee(downloadParam)
    },
    upload() {
      this.uploadDialog = true
    },
    doHandleMonth() {
      var myDate = new Date()
      var tMonth = myDate.getMonth()

      var m = tMonth + 1
      if (m.toString().length === 1) {
        m = '0' + m
      }
      return m
    },
    handleUploadSuccess() {
      // console.log('操作成功！！！！！！！！')
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
