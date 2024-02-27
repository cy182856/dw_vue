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
                预算年度
              </div>
              <div class="input">
                <el-date-picker v-model="bdCreate.budgetYear" size="small" type="year" value-format="yyyy" :clearable="false" />
              </div>
            </div>
            <div class="flex3" />
            <!-- <div class="flex3">
              <div class="title">
                预算类型
              </div>
              <div class="input">
                <el-select v-model="bdCreate.budgetType" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in budgetType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div> -->
            <div class="flex3">
              <el-button class="editbtn" style="margin-left:70%" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleCreate">
                客户选择
              </el-button>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-for="(item, index) in agentList" :key="item.agent" :name="(index + 1) +''">
          <span slot="title" class="collapse-title">{{ item.agent }}
          </span>
          <div class="input_box">
            <div class="flex3">
              <div>
                sub品牌（勾选Sub-品牌后展开下载其包含的SKU）
              </div>
            </div>
            <div class="flex3" />
            <div class="flex3">
              <el-button class="editbtn" style="margin-left:70%" icon="el-icon-remove-outline" size="mini" @click.stop="handleDeleteAccount">
                删除客户
              </el-button>
            </div>
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
            <el-table-column prop="subBrandCode" label="Sub-品牌编码" min-width="100" />
            <el-table-column prop="subBrandName" label="Sub-品牌名称" min-width="100" />
            <el-table-column prop="code" label="CODE" min-width="100" />
            <el-table-column prop="item" label="品目" min-width="100" />
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
        <li class="operation-item" @click="exportSelectDilog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">下载当前版本</span>
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
      isLoading: false,
      isShow: false,
      activeNames: ['1'],
      bdCreate: {
        budgetYear: new Date(),
        attrs: {
        },
        details: []
      },
      agentList: [],
      multipleSelection: [],
      selectUserDialog: false,
      processDialog: false,
      budgetType: [
        { value: '1', label: '预算设计' },
        { value: '2', label: '预算申请' }
      ]
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
    if (this.id) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      // for (var i = 0; i < 2; i++) {
      //   var a = {
      //     agent: '客户' + (i + 1),
      //     isChecked: [],
      //     subList: []
      //   }
      //   for (var m = 0; m < 7; m++) {
      //     var sku = {
      //       subBrandCode: 'UV',
      //       subBrandName: '防晒',
      //       code: '100' + (m + 1),
      //       item: ''
      //     }
      //     a.subList.push(sku)
      //   }
      //   this.agentList.push(a)
      //   this.activeNames.push((1 + this.agentList.length) + '')
      // }
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
          for (var m = 0; m < 7; m++) {
            var sku = {
              // brand: 'MERRIES',
              subBrandCode: 'UV',
              subBrandName: '防晒',
              code: '100' + (m + 1),
              item: ''
              // brandName: 'MRS-ED NB 90x2 1809',
              // category1: 2
            }
            a.subList.push(sku)
          }
          this.agentList.push(a)
          this.activeNames.push((1 + this.agentList.length) + '')
        }
      })
      this.isShow = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDeleteAccount(index) {
      this.agentList.splice(index, 1)
      this.activeNames.slice(0, -1)
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
