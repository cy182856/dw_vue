<template>
  <!-- 编辑画面 -->
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        查询条件
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年度:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-date-picker v-model="searchParam.params.createTime" size="small" type="year" value-format="yyyy" :clearable="false" :picker-options="pickerOptions3" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商属性:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.custType" placeholder="请选择属性" :clearable="true">
                  <el-option
                    v-for="item in attributesType"
                    :key="item.index"
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
                代理商名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.searchCustName" placeholder="请输入名称" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>重置</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>查询</p>
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
        <li class="operation-item" @click="add()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">新建</span>
        </li>
        <li class="operation-item" @click="edit()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">编辑</span>
        </li>
        <li class="operation-item" @click="deleted()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-delete"
          /></span>
          <span class="operation-text">删除</span>
        </li>
        <li class="operation-item" @click="downloadFile()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="el-icon-download"/>
          </span>
          <span class="operation-text">下载</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="assignList"
            border
            height="100%"
            @expand-change="expandClick"
            @selection-change="handleSelectionChange"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="custTypeName" label="代理商属性" align="center" />
            <el-table-column prop="custName" label="代理商名称" align="center" />
            <el-table-column prop="maxRate" label="Max返利率" align="left" >
              <template slot-scope="scope">
                <span style="white-space:pre-wrap;">{{ scope.row.maxRateConcat }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rebateType" label="返利方式" align="center">
              <template slot-scope="scope">
                {{ scope.row.rebateType |dictName('RebateType') }}
              </template>
            </el-table-column>
            <el-table-column prop="rebateType" label="返利规则" align="left" width="130" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.rebateName }}</span>
                <!--<span style="color:#18baf4;cursor:pointer;" @click="handleEdit(scope.row.rebateName,scope.row.rebateCode)">{{ scope.row.rebateName }}</span>-->
              </template>
            </el-table-column>
            <!-- <el-table-column prop="rebateName" label="返利名称" align="center" /> -->
            <el-table-column prop="startTime" label="适用开始月" align="center">
              <template slot-scope="scope">
                {{ scope.row.beginDate }}
              </template>
            </el-table-column>
            <el-table-column prop="endTime" label="适用截止月" align="center">
              <template slot-scope="scope">
                {{ scope.row.endDate }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" />
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

    <div v-if="isShow">
      <el-dialog
        class="content-dialog-box  search-light rules newedit"
        custom-class="dialog-drag fixed-search-btn-box"
        :close-on-click-modal="false"
        top="0"
        :title="isAdd?'新建':'编辑'"
        :visible.sync="isShow"
        width="600"
        :before-close="handleClose"
      >
        <div class="pop_content" />
        <el-form ref="form" :model="editData" label-width="80px">
          <el-form-item label="适用开始月">
            <el-col :span="10">
              <el-date-picker v-model="editData.beginDate" type="month" style="width: 100%;" value-format="yyyy-MM" :picker-options="pickerOptions0" @blur="validator('beginDate')" />
              <span :ref="'beginDate'" data-roles="required" :data-value="editData.beginDate" class="message" />
            </el-col>
            <el-col :span="4" style="padding-left:5px;">
              适用截止月
            </el-col>
            <el-col :span="10">
              <el-date-picker v-model="editData.endDate" type="month" style="width: 100%;" value-format="yyyy-MM" :picker-options="pickerOptions1" @blur="validator('endDate')" />
              <span :ref="'endDate'" data-roles="required" :data-value="editData.endDate" class="message" />
            </el-col>
          </el-form-item>
          <el-form-item label="代理商属性">
            <el-input v-model="editData.custTypeName" :disabled="true" />
          </el-form-item>
          <el-form-item label="代理商名称">
            <el-input v-if="!isAdd" v-model="editData.custName" :disabled="true" />
            <!-- <rel-func-select v-model="searchParam.params.custCode" :default-tags="defaultTags" :is-separate-str="true" @data="handleSelected" /> -->
            <rel-func-select v-else v-model="editData.custCode" :default-tags="defaultTags" :is-separate-str="true" :is-display-tip="false" @data="handleSelected" />
            <span :ref="'custCode'" data-roles="required" :data-value="editData.custCode" class="message" />
          </el-form-item>
          <el-form-item label="返利率">
            <div class="el-table el-table--fit el-table--border el-table--enable-row-hover">
                <div class="el-table__header-wrapper">
                  <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 452px;">
                    <thead class="has-gutter">
                      <tr class="">
                        <th colspan="1" rowspan="1" class="el-table_22_column_174  is-center   is-leaf"><div class="cell">婴儿纸尿裤</div></th>
                        <th colspan="1" rowspan="1" class="el-table_22_column_175  is-center   is-leaf"><div class="cell">湿巾</div></th>
                        <th colspan="1" rowspan="1" class="el-table_22_column_176  is-center   is-leaf"><div class="cell">成人护理</div></th>
                        <th colspan="1" rowspan="1" class="el-table_22_column_177  is-center   is-leaf"><div class="cell">纸制品</div></th>
                        <th colspan="1" rowspan="1" class="el-table_22_column_178  is-center   is-leaf"><div class="cell">女性护理</div></th>
                        </tr>
                    </thead>
                  </table>
                </div>                        
            </div>
              <tr>
                <td>
                  <milli-input v-model="editData.maxRateYingEr" :disabled="!isAdd" class="input" to-fixed-num="2" style="width:80%;display:inline-block;" @blur="validator('maxRateYingEr')" />
                  <span>%</span>
                  <span :ref="'maxRateYingEr'" data-roles="required" :data-value="editData.maxRateYingEr" class="message" />
                </td>
                <td>
                  <milli-input v-model="editData.maxRateShiJin" :disabled="!isAdd" class="input" to-fixed-num="2" style="width:80%;display:inline-block;" @blur="validator('maxRateShiJin')" />
                  <span>%</span>
                  <span :ref="'maxRateShiJin'" data-roles="required" :data-value="editData.maxRateShiJin" class="message" />
                </td>
                <td>
                  <milli-input v-model="editData.maxRateChengRen" :disabled="!isAdd" class="input" to-fixed-num="2" style="width:80%;display:inline-block;" @blur="validator('maxRateChengRen')" />
                  <span>%</span>
                  <span :ref="'maxRateChengRen'" data-roles="required" :data-value="editData.maxRateChengRen" class="message" />
                </td>
                <td>
                  <milli-input v-model="editData.maxRateZhiZhi" :disabled="!isAdd" class="input" to-fixed-num="2" style="width:80%;display:inline-block;" @blur="validator('maxRateZhiZhi')" />
                  <span>%</span>
                  <span :ref="'maxRateZhiZhi'" data-roles="required" :data-value="editData.maxRateZhiZhi" class="message" />
                </td>
                <td>
                  <milli-input v-model="editData.maxRateNvXing" :disabled="!isAdd" class="input" to-fixed-num="2" style="width:80%;display:inline-block;" @blur="validator('maxRateNvXing')" />
                  <span>%</span>
                  <span :ref="'maxRateNvXing'" data-roles="required" :data-value="editData.maxRateNvXing" class="message" />
                </td>
              </tr>
          </el-form-item>
          <el-form-item label="返利方式">
            <dict-select v-model="editData.rebateType" dict-type-id="RebateType" :disabled="true" />
          </el-form-item>
          <el-form-item label="返利名称">

            <el-select v-if="isAdd"
              v-model="editData.rebateCode"
              placeholder="请选择"
              :disabled="!isAdd"
              :clearable="true"
              @change="rebateCodeChange"
            >
              <el-option
                v-for="item in rebateNewName"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-if="!isAdd"
              v-model="editData.rebateName"
              placeholder="请选择"
              :disabled="!isAdd"
              :clearable="true"
              @change="rebateCodeChange"
            >
            </el-select>
            <span :ref="'rebateCode'" data-roles="required" :data-value="editData.rebateCode" class="message" />
          </el-form-item>
        </el-form>
        <div class="btn">
          <button class="cancel" @click="handleClose">
            取消
          </button>
          <button class="save" @click="saveList">
            保存
          </button>
        </div>
      </el-dialog>
    </div>
    <el-dialog
      class="content-dialog-box  search-light rules rulesEdit"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      title="返利规则"
      :visible.sync="isShow2"
      width="50%"
      :before-close="handleClose2"
      :close-on-click-modal="false"
    >
      <div class="pop_title" style="text-align:left;">
        <div class="titlemain">
          <div class="titlehead">
            {{ rebatetitle }}
          </div>
          <div v-html="rebatecont" />
        </div>
      </div>
      <div class="pop_content" />
      <div class="btn">
        <button class="cancel" @click="handleClose2">
          取消
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { search } from '@/mixins/search-params'
import { dateFormatFilter } from '@/mixins/date-format'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { custName, getList, saveAssign, rebateconfigGet, deleteAssign, downloadFile } from '@/api/rebaterules/assign.js'
import { bateName } from '@/api/rebaterules/ruleslist.js'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
export default {
  components: { RelFuncSelect },
  mixins: [search, dateFormatFilter, names, formValidator, numFormat],
  data() {
    return {
      defaultTags: [],
      isLoading: false,
      isShow: false,
      isShow2: false,
      isAdd: true,
      year: '2021',
      cstime1: '',
      rebateName: [],
      rebateNewName: [],
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          createTime: String(new Date().getFullYear()),
          custType: '',
          searchCustName: ''
        }
      },
      editData: {},
      rebatetitle: '',
      rebatecont: '',
      multipleSelection: [],
      attributesType: [],
      assignList: [],
      pickerOptions0: {
        disabledDate: (time) => {
          const date = new Date()
          const year = date.getFullYear()
          let month = date.getMonth()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          const currentDate = year.toString() + month.toString()
          const timeYear = time.getFullYear()
          let timeMonth = time.getMonth() + 1
          if (timeMonth >= 1 && timeMonth <= 9) {
            timeMonth = '0' + timeMonth
          }
          const timeDate = timeYear.toString() + timeMonth.toString()
          // return currentDate > timeDate
          if (this.editData.endDate !== '') {
            // if (this.cstime1 !== '') {
            //   return time.getTime() < new Date(this.cstime1).getTime() - 8.64e7 || time.getTime() > new Date(this.editData.endDate).getTime()
            // }
            return time.getTime() > new Date(this.editData.endDate).getTime() || currentDate > timeDate
          }

          return currentDate > timeDate
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          const date = new Date()
          const year = date.getFullYear()
          let month = date.getMonth()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          const currentDate = year.toString() + month.toString()
          const timeYear = time.getFullYear()
          let timeMonth = time.getMonth() + 1
          if (timeMonth >= 1 && timeMonth <= 9) {
            timeMonth = '0' + timeMonth
          }
          const timeDate = timeYear.toString() + timeMonth.toString()
          return time.getTime() < new Date(this.editData.beginDate).getTime() - 1 * 24 * 60 * 60 * 1000 || currentDate > timeDate
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }

    }
  },
  async created() {
    const res = await custName()
    if (res && res.success) {
      // this.searchDetailParam.paramMonthlyEstId = results[0].id
      const results = res.datas.list
      if (results.length > 0) {
        for (let s = 0; s < results.length; s++) {
          this.attributesType.push({ 'value': results[s].custType, 'label': results[s].custTypeName })
        }
      }
      // console.log(results)
    }
    this.fetchData()
  },
  methods: {
    handleClose() {
      this.isShow = false
      this.cstime1 = ''
    },
    async fetchData() {
      this.isLoading = true
      const res = await bateName()
      if (res && res.success) {
        // this.searchDetailParam.paramMonthlyEstId = results[0].id
        const results = res.datas.rebateConfigList
        if (results.length > 0) {
          if(this.rebateNewName.length == 0){
            for (let s = 0; s < results.length; s++) {
              if (results[s] !== null) {
                this.rebateName.push({ 'value': results[s].rebateCode, 'label': results[s].rebateName, 'attr': results[s].rebateType })
                if(results[s].rebateCode !== 'JD1' && results[s].rebateCode !== 'JD2' && results[s].rebateCode !== 'JD3' && results[s].rebateCode !== 'JD4' && results[s].rebateCode !== 'JD5' && results[s].rebateCode !== 'JD6' && results[s].rebateCode !== 'SX'){
                  this.rebateNewName.push({ 'value': results[s].rebateCode, 'label': results[s].rebateName, 'attr': results[s].rebateType })
                }
              }
            }
          } 
        }
        // console.log(results)
        this.isLoading = false
      }
      this.searchList()
    },
    async searchList() {
      if (!this.searchParam.params.createTime) {
        this.$message({
          type: 'error',
          message: '查询条件中，年度不能为空！'
        })
        return false
      }
      const res = await getList(this.searchParam)
      if (res && res.success) {
        // console.log(res)
        const results = res.datas.searchResult.results
        this.assignList = results
        if (this.assignList.length > 0) {
          for (let s = 0; s < this.assignList.length; s++) {
            this.assignList[s].beginDate = this.assignList[s].beginDate.substring(0, this.assignList[s].beginDate.length - 3)
            this.assignList[s].endDate = this.assignList[s].endDate.substring(0, this.assignList[s].endDate.length - 3)
          }
        }
        this.searchParam.pageNo = res.datas.searchResult.pageNo
        this.searchParam.totalRecord = res.datas.searchResult.totalRecord
        this.isLoading = false
      }
    },
    add() {
      this.isAdd = true
      this.editData = {}
      this.isShow = true
    },
    edit() {
      this.isAdd = false
      if (this.multipleSelection.length === 1) {
        console.log(this.multipleSelection[0], 'spe688')
        this.editData = { ...this.multipleSelection[0] }
        this.cstime1 = this.editData.beginDate
        this.isShow = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    async deleted() {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        const delectList = this.multipleSelection
        const idList = []
        for (let s = 0; s < delectList.length; s++) {
          const delectid = delectList[s].id
          idList.push(delectid)
        }
        // console.log(String(idList))
        this.$confirm('确认删除', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(async() => {
          this.isLoading = true
          // const params = new FormData()
          // params.append('detailIds', String(idList))
          console.log(idList, '删除id')

          const res = await deleteAssign(idList)
          if (res && res.success) {
            console.log(res, 111)
            this.fetchData()
          }
          this.isLoading = false
        }).catch(err => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
          console.log(err)
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    downloadFile() {
      if (!this.searchParam.params.createTime) {
        this.$message({
          type: 'error',
          message: '查询条件中，年度不能为空！'
        })
        return
      }
      downloadFile(this.searchParam)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleChangeShopObj(shopObj) {
      // this.eventObj.shopCode = shopObj.value
      // this.eventObj.shopName = shopObj.label
      console.log(shopObj, '1111')
    },
    handleSelected(val) {
      // console.log(val)
      this.validator('custCode', val)
      console.log(val, 666)
      this.editData['custTypeName'] = val[0].custTypeName
    },
    rebateCodeChange(val) {
      this.validator('rebateCode', val)
      console.log(val, 666)
      const rebateName = this.rebateName
      for (let s = 0; s < rebateName.length; s++) {
        // const attr = rebateName[s].rebateType
        const code = rebateName[s].value
        console.log(code, 666)
        if (code === val) {
          this.editData['rebateType'] = rebateName[s].attr
        }
      }
    },
    handleClose2() {
      this.isShow2 = false
    },
    saveList() {
      if (!this.validatorAll()) {
        return false
      }
      const subList =
      {
        'beginDate': this.editData.beginDate + '-01',
        'endDate': this.editData.endDate + '-01',
        'custCode': this.editData.custCode,
        'maxRate': this.editData.maxRate,
        'maxRateYingEr': this.editData.maxRateYingEr,
        'maxRateShiJin': this.editData.maxRateShiJin,
        'maxRateChengRen': this.editData.maxRateChengRen,
        'maxRateZhiZhi': this.editData.maxRateZhiZhi,
        'maxRateNvXing': this.editData.maxRateNvXing,
        'rebateCode': this.editData.rebateCode,
        'rebateType': this.editData.rebateType
      }
      if (!this.isAdd) {
        subList['id'] = this.editData.id
      }
      console.log(subList, 111)
      this.$confirm('保存', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        const res = await saveAssign(subList)

        if (res && res.success) {
          // console.log(res, 111)
          this.isShow = false
          this.fetchData()
        }
        // else {
        //   this.$message({
        //     type: 'error',
        //     message: res.message
        //   })
        // }
        this.isLoading = false
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    async handleEdit(name, val) {
      // this.selectindex = val
      // this.isShow2 = true
      console.log(val)
      try {
        const res = await rebateconfigGet(val)
        this.rebatetitle = name
        this.rebatecont = res.datas.rebateName
        this.isShow2 = true
      } catch (e) {
        console.log(e.message)
      }
    },
    expandClick(row, expandedRows) {
      console.log(row, expandedRows, 666)
    }

  }
}
</script>
<style >
.el-form-item{
  margin-bottom: 10px;
}
.titlemain .titlehead{
  text-align: center;
  margin-bottom:30px;
}
.message{
  line-height: 8px;
}
.table-td{
  font-weight:bold; 
  font-size:12px; 
  color:#272727;
}
</style>
