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
                {{ $t("fee.promotion.department") }}:
              </el-col>
              <el-col :span="16">
                <!-- <department-select v-model="searchParam.params.department" /> -->
                <el-select
                  v-model="searchParam.params.department"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in department"
                    :key="item.value"
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
                {{ $t("fee.promotion.channel") }}:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchParam.params.channel"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in channel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="salesOffice">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                Sales Office:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchParam.params.salesOffice"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in salesOffice"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="status">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                状态:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchParam.params.status"
                  placeholder="请选择"
                >
                  <el-option
                    label="全部"
                    value=""
                  />
                  <el-option
                    label="无效"
                    :value="0"
                  />
                  <el-option
                    label="有效"
                    :value="1"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("fee.promotion.accountNum") }}:
              </el-col>
              <el-col :span="16">
                <rel-func-select
                  v-model="searchParam.params.accountNum"
                  rel-func="account"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("fee.promotion.user") }}:
              </el-col>
              <el-col :span="16">
                <user-select
                  v-model="searchParam.params.user"
                  :root-org-id="orgRootId"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="AAAAA">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("fee.promotion.brand") }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.brand" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("fee.promotion.periodStart") }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="searchParam.params.startDate"
                  size="small"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("fee.promotion.periodEnd") }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="searchParam.params.endDate"
                  size="small"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
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
        <li class="operation-item" @click="handleCreate">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">{{ $t("comm.newlyBuild") }}</span>
        </li>
        <li class="operation-item" @click="handleCopy">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconfuzhi"
          /></span>
          <span class="operation-text">{{ $t("comm.copy") }}</span>
        </li>
        <li class="operation-item" @click="handleCancel">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconshanchu"
          /></span>
          <span class="operation-text">{{ $t("comm.cancel") }}</span>
        </li>
        <li class="operation-item" @click="handleDiscuss">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{
            $t("fee.promotion.discussResult")
          }}</span>
        </li>
        <li class="operation-item" @click="handleEstUpdate">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{
            $t("fee.promotion.estUpdate")
          }}</span>
        </li>
        <li class="operation-item" @click="handlePaymentUpdate">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">补差更新</span>
        </li>
        <li class="operation-item" @click="handleShopSelect">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">店铺选择</span>
        </li>
        <li class="operation-item" @click="handleSellinSearch">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{
            $t("fee.promotion.sellinIncludeSearch")
          }}</span>
        </li>
        <!-- <li class="operation-item" @click="handleEdit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li> -->

        <li class="operation-item" @click="exportSelectDilog = true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">{{ $t("comm.export") }}</span>
        </li>
        <!-- <li class="operation-item" @click="handleDownload">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">活动提案下载</span>
        </li> -->
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="motionList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              :label="$t('fee.promotion.identiferNum')"
              min-width="120"
              align="center"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/fee/promotion/motionDetail',
                    query: { id: scope.row.id },
                  }"
                >
                  {{ scope.row.identiferNum }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="salesOffice"
              :label="'Sales Office'"
              min-width="100"
              align="center"
            />
            <el-table-column
              prop="channel"
              :label="$t('fee.promotion.channel')"
              width="70"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="accountNum"
              :label="$t('fee.promotion.accountNum')"
              min-width="70"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="department"
              :label="$t('fee.promotion.department')"
              min-width="70"
              align="center"
            />
            <el-table-column
              prop="user"
              :label="$t('fee.promotion.user')"
              min-width="70"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="applyDate"
              :label="$t('fee.promotion.applyDate')"
              min-width="100"
              align="center"
            />
            <el-table-column
              prop="brand"
              :label="$t('fee.promotion.brand')"
              min-width="100"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="theme"
              :label="$t('fee.promotion.theme')"
              min-width="150"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="startDate"
              :label="$t('fee.promotion.periodStart')"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="endDate"
              :label="$t('fee.promotion.periodEnd')"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="spdPlanAmount"
              :label="$t('fee.promotion.spdPlanAmount')"
              min-width="120"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.spdPlanAmount | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="expense"
              :label="$t('fee.promotion.expense')"
              min-width="120"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.expense | numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="isFixWithDiscuss"
              :label="$t('fee.promotion.isFixWithDiscuss')"
              min-width="130"
              align="center"
            />
            <el-table-column
              prop="intervalDays"
              :label="$t('fee.promotion.intervalDays')"
              min-width="160"
              align="center"
            />
            <el-table-column
              prop="motionStores"
              :label="'活动店铺数'"
              min-width="100"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.motionStores | numFormat(0) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="reachStores"
              :label="'达成店铺数'"
              min-width="100"
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.reachStores | numFormat(0) }}
              </template>
            </el-table-column>
            <el-table-column :label="'达成率'" min-width="100" align="right">
              <template slot-scope="scope">
                {{
                  ((Number(scope.row.reachStores) * 100) /
                    Number(scope.row.motionStores))
                    | numFormat(1)
                }}%
              </template>
            </el-table-column>
            <el-table-column :label="'活动反馈'" min-width="70">
              <template>
                <el-button class="editbtn" size="mini">
                  报表
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              :label="$t('admin.org.deleteFlag')"
              min-width="80"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0" class="no-apply">无效</span>
                <span v-if="scope.row.status == 1" class="apply">有效</span>
              </template>
            </el-table-column>
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
    <div class="exportDialog">
      <el-dialog
        class="content-dialog-box search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-resource  fixed-search-btn-box"
        top="0"
        :visible.sync="exportSelectDilog"
        :title="$t('comm.exportFieldsSelect')"
        width="50%"
      >
        <export-fields-select
          func-div="account"
          file-type="xlsx"
          :search-param="searchParam"
        />
      </el-dialog>
    </div>
    <!-- 取消意见 -->
    <div v-if="cancelDialog">
      <el-dialog
        title="取消理由"
        :visible.sync="cancelDialog"
        :close-on-click-modal="false"
        class="content-dialog-box search-light"
        custom-class="dialog-drag dialog-drag-heightAuto content-dialog-upload  fixed-search-btn-box"
        width="35%"
      >
        <div style="display: flex; flex-direction: column; height: 100%">
          <div>
            <div class="dialog-search-box middle-input">
              <el-form
                ref="searchForm"
                label-width="80px"
                label-position="left"
              >
                <el-row type="flex" justify="space-between">
                  <el-col>
                    <el-form-item :label="$t('fee.promotion.cancelReason')">
                      <el-input
                        v-model="cancelReason"
                        type="textarea"
                        rows="3"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelSubmit">
            <span
              class="operation-circle circle-middle-btn btn-light-color bluebg"
            ><i
              class="iconfont iconqueren"
            /></span>
            <span class="operation-text">{{ $t("comm.confirm") }}</span>
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
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'MotionList',
  components: { UserSelect, RelFuncSelect },
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      motionList: [],
      exportSelectDilog: false,
      // selectDepartmentDialog: false,
      historyDialog: false,
      cancelDialog: false,
      cancelReason: '',
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          department: '',
          channel: '',
          accountNum: '',
          salesOffice: '',
          status: '',
          user: '',
          brand: '',
          startDate: '',
          endDate: ''
        }
      },
      channel: [
        {
          value: '1',
          label: 'KA'
        },
        {
          value: '2',
          label: 'DB'
        },
        {
          value: '3',
          label: 'EC'
        }
      ],
      department: [
        {
          value: '2',
          label: 'KA部'
        },
        {
          value: '3',
          label: '日系客户部'
        },
        {
          value: '1',
          label: 'EC&新零售部'
        },
        {
          value: '4',
          label: '华东地区'
        },
        {
          value: '5',
          label: '华南地区'
        },
        {
          value: '6',
          label: '西南地区'
        },
        {
          value: '7',
          label: '华北地区'
        }
      ],
      salesOffice: [
        {
          value: '1',
          label: 'EC&新零售部'
        },
        {
          value: '2',
          label: '华东地区'
        },
        {
          value: '3',
          label: '华南地区'
        },
        {
          value: '4',
          label: '西南地区'
        },
        {
          value: '5',
          label: '华北地区'
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
  },
  methods: {
    async fetchData() {
      var departments = ['财务', '销售', '管理']
      var persons = ['张三', '李四', '王五', '赵六']
      var channels = ['KA', 'DB', 'EC']
      var brand = ['乐而雅', '美舒律', '碧柔', '芙丽芳丝']
      var salesOffices = ['EC', '华北地区', '华东地区', '华南地区', '西南地区']
      for (var i = 0; i < 9; i++) {
        var obj = {
          id: i + 1 + '',
          salesOffice: salesOffices[i % 5],
          department: departments[i % 3],
          user: persons[i % 4],
          accountNum: '客户' + (i + 1),
          channel: channels[i % 3],
          identiferNum: 'PRO2012000' + i,
          brand: brand[i % 4],
          applyDate: '2021-01-0' + (i + 1),
          isFixWithDiscuss: '一致',
          startDate: '2021年' + (i + 1) + '月',
          endDate: '2021年' + (i + 2) + '月',
          intervalDays: i + 6 + '天',
          theme: ((i + 1) % 2 === 0 ? '长期折扣' : '活动提案') + (i + 1),
          spdPlanAmount: (10000 * Math.random()).toFixed(2),
          expense: (10000 * Math.random()).toFixed(2),
          motionStores: (i + 1) * 10,
          reachStores: (i + 1) * 9,
          status: i === 0 ? 0 : parseInt(Math.random() * 10) % 2
        }
        this.motionList.push(obj)
      }
    },
    handleCreate() {
      this.$router.push('/fee/promotion/motionEdit')
    },
    handleEdit() {
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
            path: '/fee/promotion/motionEdit',
            query: { id: rowData.id }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleCancel() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg40')
        })
      } else {
        if (this.multipleSelection[0].status === 1) {
          this.cancelDialog = true
        } else {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg41')
          })
        }
      }
    },
    handleCancelSubmit() {
      this.cancelDialog = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      console.log(11)
    },
    handleDiscuss() {
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
            path: '/fee/promotion/motionDetail',
            query: { id: rowData.id, action: 'discuss' }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleEstUpdate() {
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
            path: '/fee/promotion/motionDetail',
            query: { id: rowData.id, action: 'estUpdate' }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleSellinSearch() {},
    handlePaymentUpdate() {
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
            path: '/fee/promotion/motionDetail',
            query: { id: rowData.id, action: 'payUpdate' }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleShopSelect() {
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
            path: '/fee/promotion/motionDetail',
            query: { id: rowData.id, action: 'shopUpdate' }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleCopy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.multipleSelection.forEach((rowData) => {
          this.$router.push({
            path: '/fee/promotion/motionEdit',
            query: { id: rowData.id, copy: true }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    }
    // checkSelectable(row) {
    //   return row.status === 1;
    // },
    // handleTreeSelect(data) {
    //   this.searchParam.params.department = data.text
    //   this.selectDepartmentDialog = false
    // },
    // handleTreeClear() {
    //   this.searchParam.params.department = ''
    //   this.selectDepartmentDialog = false
    // },
    // openSelect() {
    //   this.selectDepartmentDialog = true
    // }
  }
}
</script>
