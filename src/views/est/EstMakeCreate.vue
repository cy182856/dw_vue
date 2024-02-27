<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                月次起始年月
              </div>
              <div class="input">
                <el-date-picker v-model="bdCreate.budgetYearMonth" size="small" type="month" :clearable="false" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                模板类型
              </div>
              <div class="input">
                <el-select v-model="bdCreate.templateType">
                  <el-option
                    v-for="item in templateType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title" />
              <div class="input">
                <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleCreate">
                  客户选择
                </el-button>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-for="(item, index) in agentList" :key="item.agent" :name="(index + 1) +''">
          <span slot="title" class="collapse-title">{{ item.agent }}</span>
          <div class="input_box">
            <div class="flex3">
              <div>
                SKU
              </div>
            </div>
            <div class="flex3" />
            <div class="flex3">
              <el-button class="editbtn" style="margin-left:70%" icon="el-icon-remove-outline" size="mini" @click.stop="handleDeleteAccount">
                删除客户
              </el-button>
            </div>
            <!-- <div class="flex3" />
            <div class="flex3">
              <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline">
                SKU选择
              </el-button>
            </div> -->
          </div>
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="item.subList"
            height="250"
            min-height="250"
            border
            stripe
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column prop="brandNum" label="品牌编号" min-width="90" />
            <el-table-column prop="brandName" label="品牌名称" min-width="90" />
            <el-table-column prop="subBrandNum" label="Sub品牌编号" min-width="100" />
            <el-table-column prop="subBrand" label="Sub品牌名称" min-width="110" />
            <el-table-column prop="skuNum" label="SKU编号" min-width="100" />
            <el-table-column prop="sku" label="SKU名称" min-width="110" />
            <el-table-column prop="category1" label="箱规" min-width="100" />
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">下载模板</span>
        </li>
        <li class="operation-item" @click="uploadDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-upload2" /></span>
          <span class="operation-text"> 上传</span>
        </li>
      </ul>
    </div>
    <div>
      <!-- <account-pop :is-show="isShow" @cancel="isShow=false" @select="handleAccountSelected" /> -->
      <account-pop :is-show="isShow" @cancel="isShow=false" @select="handleAccountSelected" />
    </div>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import AccountPop from '@/views/mrk/account/components/AccountPop'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'

export default {
  name: 'BdEdit',
  components: { AccountPop },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      isShow: false,
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      bdCreate: {
        attrs: {
        },
        details: []
      },
      agentList: [],
      multipleSelection: [],
      selectUserDialog: false,
      processDialog: false,
      templateType: [{
        value: '1',
        label: '3个月'
      }, {
        value: '2',
        label: '6个月'
      }]
    }
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() { return this.$route.query.id || this.$route.query.businessKey }
  },
  watch: {
  },
  async created() {
    // for (var i = 0; i < 10; i++) {
    //   var obj = {
    //   }
    //   var subList = []
    //   for (var m = 0; m < 10; m++) {
    //     var sku = {
    //       brand : 'MERRIES',
    //       subBrand : 'MERRIES EXTRA DRY',
    //       code : '722862',
    //       brandName : 'MRS-ED NB 90x2 1809',
    //       category1 : 2
    //       }
    //     subList.push(sku)
    //   }
    //   obj.subList = subList
    //   this.agentList.push(obj)
    // }
    this.bdCreate.templateType = '1'
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isLoading = false
    },
    handleCreate() {
      this.isShow = true
    },
    handleAccountSelected(accounts) {
      accounts.forEach((rowData) => {
        const index = this.agentList.findIndex((ele) => {
          return ele.agent === rowData.accountName
        })
        if (index === -1) {
          var a = {
            agent: rowData.accountName,
            isChecked: [],
            subList: []
          }
          for (var m = 0; m < 10; m++) {
            var sku = {
              brandNum: 'BRD001',
              brandName: 'MERRIES',
              subBrandNum: 'SBD' + (m + 1),
              subBrand: 'MERRIES EXTRA DRY' + (m + 1),
              skuNum: '722862' + (m + 1),
              sku: 'MRS-ED NB 90x2 180' + (m + 1),
              category1: 2
            }
            a.subList.push(sku)
          }
          this.agentList.push(a)
          this.activeNames.push((1 + this.agentList.length) + '')
        }
      })
      this.isShow = false
    },
    handleDeleteAccount(index) {
      this.agentList.splice(index, 1)
      this.activeNames.slice(0, -1)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
.input_col {
  padding: 0px 0px 0px 0px;
}
</style>
<style lang="scss">
</style>
