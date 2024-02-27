<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam.params"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商编码:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.code" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商名称:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.name" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                大区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.bigArea" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                小区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.smallArea" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                营业担当:
              </el-col>
              <el-col :span="16">
                <user-select
                  v-model="searchParam.params.user"
                  :root-org-id="orgRootId"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                有效标志:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.sign" placeholder="请选择">
                  <el-option
                    v-for="item in signs"
                    :key="item.value"
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
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t("comm.query") }}</p>
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
        <li class="operation-item" @click="strategyEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">编辑</span>
        </li>
        <li class="operation-item" @click="deparsChange">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">关联部门</span>
        </li>
        <li class="operation-item" @click="strategyEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">导出</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="WriteoffList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column
              :prop="'code'"
              label="代理商编号"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/agent/edit',
                    query: { id: scope.row.id ,type:'info'},
                  }"
                >
                  {{ scope.row.code }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :prop="'name'" :label="'代理商名称'" min-width="220" align="center" />
            <!-- <el-table-column :prop="'namejc'" :label="'代理商简称'" min-width="120" align="center" /> -->
            <el-table-column :prop="'bidArea'" :label="'大区'" min-width="120" align="center" />
            <el-table-column :prop="'smallArea'" :label="'小区'" min-width="120" align="center" />
            <el-table-column :prop="'user'" :label="'营业担当'" min-width="120" align="center" />
            <el-table-column :prop="'agentxn'" :label="'是否虚拟代理商'" min-width="120" align="center" />
            <el-table-column :prop="'agentzy'" :label="'是否直营代理商'" min-width="120" align="center" />
            <el-table-column :prop="'data1'" :label="'渠道'" min-width="120" align="center" />
            <el-table-column :prop="'data2'" :label="'线上/线下'" min-width="120" align="center" />
            <el-table-column :prop="'data3'" :label="'关联部门'" min-width="120" align="center" />
            <el-table-column :prop="'sign'" :label="'有效标志'" min-width="120" align="center" />
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
    <div>
      <el-dialog
        title="关联部门"
        :visible.sync="deparsDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="deparTree"
            default-expand-all
            :data="depars"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick('depars')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <!-- <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li> -->
          <li class="operation-item" @click="handleOkClick('depars')">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'AgentList',
  components: { UserSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      deparsDialogShow: false,
      WriteoffList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          code: '',
          name: '',
          bigArea: '',
          smallArea: '',
          user: '',
          sign: ''
        }
      },
      signs: [{ value: '有效', lable: '01' }, { value: '无效', lable: '02' }],
      depars: [{
        id: 1,
        label: '全选',
        children: [
          {
            id: 11,
            label: '推进部'
          },
          {
            id: 12,
            label: '战略一科'
          },
          {
            id: 13,
            label: '战略二科'
          },
          {
            id: 14,
            label: 'EC'
          }
        ]
      }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    this.fetchData()
    console.log(this.WriteoffList)
  },
  methods: {
    async fetchData() {
      this.WriteoffList = [{
        'id': 1,
        'code': '217304',
        'name': '上海麦田天然食品销售有限公司',
        'namejc': '上海麦田',
        'bidArea': 'KA',
        'smallArea': 'KA',
        'user': '担当甲',
        'agentxn': '否',
        'agentzy': '否',
        'sign': '有效',
        'data1': '渠道1',
        'data2': '线上',
        'data3': '战略1科'
      },
      {
        'id': 2,
        'code': '999999',
        'name': '战略2科',
        'namejc': '战略2科',
        'bidArea': '无',
        'smallArea': '无',
        'user': '-',
        'agentxn': '是',
        'agentzy': '否',
        'sign': '有效',
        'data1': '渠道2',
        'data2': '线上',
        'data3': '战略2科'
      },
      {
        'id': 3,
        'code': '217394',
        'name': '山东省潍坊百货有限公司',
        'namejc': '潍坊百货',
        'bidArea': '华北',
        'smallArea': '山东',
        'user': '担当乙',
        'agentxn': '否',
        'agentzy': '是',
        'sign': '有效',
        'data1': '渠道1',
        'data2': '线上',
        'data3': '战略1科'
      },
      {
        'id': 4,
        'code': '999990',
        'name': '金币社',
        'namejc': '金币社',
        'bidArea': '无',
        'smallArea': '无',
        'user': '-',
        'agentxn': '是',
        'agentzy': '否',
        'sign': '有效',
        'data1': '渠道2',
        'data2': '线上',
        'data3': '战略2科'
      }
      ]
    },
    strategyEdit() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          if (rowData.workflowFlag === '1') {
            this.$message({
              type: 'error',
              message: this.$t('comm.msg33')
            })
            return
          }
          this.$router.push({
            path: '/agent/edit',
            query: { id: rowData.id, type: 'edit' }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
      // this.$router.push('/promotion/strategytwo/detail')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleOkClick(type) {
      const names = []
      let index = 0
      if (type === 'depars') {
        this.$refs.deparTree.getCheckedNodes().forEach((item) => {
          console.log(item)
          // if (!item.children) {
          names[index] = item.label
          index++
        // }
        })
        // this.withdraw.sku = names.join(',    ')
        this.deparsDialogShow = false
        this.$refs.deparTree.setCheckedKecodesys([])
      }
    },
    handleCancelClick(type) {
      if (type === 'depars') {
        this.deparsDialogShow = false
        this.$refs.deparTree.setCheckedKeys([])
      }
    },
    deparsChange() {
      if (this.multipleSelection.length > 0) {
        this.deparsDialogShow = true
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    }
  }
}
</script>
<style >
.bi-table .el-table__body{
      border-bottom: 1px solid #ddd;
}
.bi-table tbody tr:last-child td{
  border-bottom: 0 !important;
}
</style>
