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
                返利方式:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.rebateType" dict-type-id="RebateType" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                返利名称:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchParam.params.rebateCode"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in rebateName"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
      <div
        class="table-bg-box search-list-table borderTable"
      >
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="rulesList"
            border
            :span-method="objectSpanMethod"
            height="100%"
          >
            <el-table-column prop="rebateType" label="返利方式" width="120" align="center">
              <template slot-scope="scope">
                {{ scope.row.rebateType |dictName('RebateType') }}
              </template>
            </el-table-column>
            <el-table-column
              prop="rebateName"
              label="返利名称"
              width="150"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column label="返利规则内容" min-width="200" align="left">
              <template slot-scope="scope">
                <p v-html="scope.row.rebateContent" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                >
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div v-if="isShow">
      <el-dialog
        v-model="editData"
        class="content-dialog-box  search-light rules rulesEdit"
        custom-class="dialog-drag fixed-search-btn-box"
        top="0"
        title="编辑"
        :visible.sync="isShow"
        width="50%"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div class="pop_title">
          {{ editData.rebateName }}
        </div>
        <div class="pop_content">
          <div class="pop_rules">
            <p v-html="editData.rebateContent" />
          </div>
          <div class="pop_settb">
            <div class="input_box">
              <div
                v-for="(item, index) in editData.rebateParams"
                :key="index"
                class="flex3"
              >
                <div class="title" style="width:100px;text-align:right;margin-right:20px;">
                  参数{{ index+1 }}
                </div>
                <div class="input">
                  <el-input v-model="editData.rebateParams[index]['para'+(index+1)]" style="margin-right:10px;" @blur="validator(editData.id+'para'+(index+1))" />
                  <span>%</span>
                  <span :ref="editData.id+'para'+(index+1)" data-roles="required,negativeNumber" :data-value="editData.rebateParams[index]['para'+(index+1)]" class="message" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn">
          <button class="cancel" @click="handleClose">
            取消
          </button>
          <button class="save" @click="saveChange">
            保存
          </button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { bateName, getList, configId, editList } from '@/api/rebaterules/ruleslist.js'
export default {
  mixins: [search, names, formValidator],
  data() {
    return {
      isLoading: false,
      isShow: false,
      isEdit: false,
      year: '2021',
      searchParam: {
        params: {
          rebateType: '',
          rebateCode: ''
        }
      },
      editData: {},
      rebateName: [],
      rulesList: [],
      ruleData: []
    }
  },
  computed: {},
  async created() {
    // this.isLoading = true
    const res = await bateName()
    if (res && res.success) {
      // this.searchDetailParam.paramMonthlyEstId = results[0].id
      const results = res.datas.rebateConfigList
      if (results.length > 0) {
        for (let s = 0; s < results.length; s++) {
          if (results[s] !== null) {
            this.rebateName.push({ 'value': results[s].rebateCode, 'label': results[s].rebateName })
          }
        }
      }
      // console.log(results)
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      console.log('1a2b')
      this.searchList()
    },
    async searchList() {
      const res = await getList(this.searchParam)
      if (res && res.success) {
        // console.log(res)
        const results = res.datas.searchResult.results
        this.rulesList = results
        this.isLoading = false
        this.ruleData = this.rulesNum()
      }
    },
    async handleEdit(index, row) {
      console.log(index, row)
      const res = await configId(row.id)
      if (res && res.success) {
        this.isEdit = true
        this.isShow = true
        this.editData = {}
        this.editData = res.datas.rebateConfig
      }
    },
    handleClose() {
      this.isEdit = false
      this.isShow = false
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    rulesNum() {
      const list = this.rulesList
      const typeList = []
      for (let s = 0; s < list.length; s++) {
        typeList.push(list[s].rebateType)
      }
      const types = this.unique(typeList)
      const re = []
      for (let s = 0; s < types.length; s++) {
        const relie = { 'rebateType': types[s], 'num': 0 }
        for (let i = 0; i < typeList.length; i++) {
          if (typeList[i] === types[s]) {
            relie.num++
          }
        }
        re.push(relie)
      }
      return re
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const rules = this.ruleData
      // const xslist = this.rulesList
      // console.log(xslist, 666)
      let rowNum = 0
      for (let s = 0; s < rules.length; s++) {
        if (columnIndex === 0 && row.rebateType === rules[s].rebateType) {
          if (rowIndex === rowNum) {
            return {
              rowspan: rules[s].num,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
        rowNum = Number(rowNum) + Number(rules[s].num)
      }
      // if (columnIndex === 0 && row.rebateType === '1') {
      //   if (rowIndex === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     }
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     }
      //   }
      // }
      // if (columnIndex === 0 && row.rebateType === '2') {
      //   if (rowIndex === 2) {
      //     return {
      //       rowspan: 6,
      //       colspan: 1
      //     }
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     }
      //   }
      // }
      // if (columnIndex === 0 && row.rebateType === '3') {
      //   if (rowIndex === 8) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     }
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     }
      //   }
      // }
    },
    saveChange() {
      let bool = true
      for (const ref in this.$refs) {
        console.log(ref, 'ref')
        // if (this.$refs[ref] && this.$refs[ref].length > 0) {
        //   this.$refs[ref].validatorAll()
        //   if (!this.$refs[ref].validatorState) return false
        // }
        if (this.$refs[ref] && this.$refs[ref].length > 0) {
          console.log(this.$refs[ref][0])
          if (!this.validator(ref)) {
            bool = false
            break
          }
          // console.log(this.$refs[ref])
          // if (!this.$refs[ref][0].validatorState) return false
        }
      }
      if (!bool) {
        console.log(111, 'sss')
        return false
      }
      const editData = JSON.parse(JSON.stringify(this.editData))
      const saveList = {}
      saveList['id'] = editData.id
      saveList['rebateName'] = editData.rebateName
      saveList['rebateType'] = editData.rebateType
      saveList['rebateCode'] = editData.rebateCode
      saveList['col01'] = editData.col01
      saveList['rebateInfo'] = {}
      if (editData.rebateParams.length > 0) {
        for (let s = 0; s < editData.rebateParams.length; s++) {
          saveList['rebateInfo']['para' + (s + 1)] = editData.rebateParams[s]['para' + (s + 1)] + '%'
        }
      }

      this.$confirm('保存', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        saveList.rebateInfo = JSON.stringify(saveList.rebateInfo)
        console.log(saveList, 111)
        const res = await editList(saveList)

        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.isShow = false
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
    }
  }
}
</script>
<style scoped>
.flex2 .title{
    text-align: center;
    color: #333;
    font-weight: 600;
}
</style>
