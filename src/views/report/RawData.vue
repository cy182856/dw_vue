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
                月份
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
            <div class="flex4">
              <div class="title">
                代理商名称
              </div>
              <div class="input">
                <el-input v-model="searchParam.custName" placeholder="请输入名称" />
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                部门
              </div>
              <div class="input">
                <dict-select v-model="searchParam.submitOrg" dict-type-id="Dept" :filter2="happenYear" :disabled="disabled" :filter1="ST" />
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

import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { search, searchPopMultiple } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { dict } from '@/mixins/dict'
import { getArea1List, getArea2ListByArea1 } from '@/api/mrk/customer'
import { downloadRawData } from '@/api/report/promotion.js'
// import { downloadList, downloadRawData } from '@/api/report/promotion.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'ContractTTEMReport1',
  // components: { RelFuncSelect },
  mixins: [names, formValidator, dict, search, searchPopMultiple],
  data() {
    return {
      isLoading: true,
      activeNames: ['1', '2'],
      reportUrl: '',
      ST: '',
      searchTableHeight: 0,
      searchTableWidth: 0,
      productDialogShow: false,
      customersDialogShow: false,
      area1List: [],
      area2List: [],
      searchParam: {
        estYm: '',
        custArea1: '',
        custArea2: '',
        custName: '',
        submitOrg: '',
        fileName: 'rpt006.rpx'
      },
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
    },
    happenYear() {
      return this.searchParam.estYm.substr(0, 4)
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
                // console.log(this.userInfo.orgSeqNo.indexOf(orgId), orgId, this.userInfo.orgSeqNo, 1090)
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
    },
    isGetDataList() {
      return this.$store.getters.dictList.Dept && this.$store.getters.dictList.Dept.length > 0 ? this.disabled ? 'yes' : 'no' : 'false'
    }
  },
  watch: {
    orgIdCom: {
      handler(newValue, oldValue) {
        this.searchParam.submitOrg = newValue
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    if (this.userInfo.roleList.some(todo => todo === 'ROLE_WF_MARKET' || todo === 'ROLE_STRATEGY_SECTION_APPLY')) {
      this.ST = 'ST'
    } else {
      this.ST = ''
    }
    this.searchParam.submitOrg = this.orgIdCom
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
      if (this.searchParam.estYm === '' || this.searchParam.estYm == null) {
        this.$message({
          type: 'warning',
          message: '月份不能为空'
        })
        return
      }
      const res = await downloadRawData(this.searchParam)
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
