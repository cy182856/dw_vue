<template>
  <div id="motion" class="apply">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      title="活动提案"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="middle-box">
          <div class="dialog-search-box middle-input">
            <el-form ref="searchForm" label-width="80px" label-position="left">
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('fee.promotion.department')">
                    <el-select v-model="searchParam.params.department" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in department"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('fee.promotion.channel')">
                    <el-select v-model="searchParam.params.channel" placeholder="请选择" clearable>
                      <el-option
                        v-for="item in channel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('fee.promotion.accountNum')">
                    <el-input v-model="searchParam.params.accountNum" />
                    <!-- <rel-func-select v-model="searchParam.params.accountNum" name="account" rel-func="account" /> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('fee.promotion.user')">
                    <user-select v-model="searchParam.params.user" :root-org-id="orgRootId" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('fee.promotion.brand')">
                    <el-input v-model="searchParam.params.brand" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('fee.promotion.periodStart')">
                    <el-date-picker v-model="searchParam.params.startDate" size="small" type="date" value-format="yyyy-MM-dd" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('fee.promotion.periodEnd')">
                    <el-date-picker v-model="searchParam.params.endDate" size="small" type="date" value-format="yyyy-MM-dd" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item style="margin-bottom:0 !important">
                <ul class="operation-box dialog-btn-box end-content-flex mcbtn">
                  <li class="operation-item" @click="search">
                    <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
                    <span class="operation-text">{{ $t('comm.query') }}</span>
                  </li>
                  <li class="operation-item" @click="reset">
                    <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                    <span class="operation-text"> {{ $t('comm.reset') }}</span>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="footer-box">
          <div class="dialog-table-box">
            <el-table
              ref="table"
              v-loading="isLoading"
              :data="motionList"
              border
              stripe
              height="200"
              :header-cell-style="{'text-align':'left'}"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" fixed width="55" />
              <el-table-column prop="identiferNum" :label="$t('fee.promotion.identiferNum')" min-width="120" />
              <el-table-column prop="department" :label="$t('fee.promotion.department')" min-width="120" />
              <el-table-column prop="channel" :label="$t('fee.promotion.channel')" width="120" show-overflow-tooltip />
              <el-table-column prop="accountNum" :label="$t('fee.promotion.accountNum')" width="150" show-overflow-tooltip />
              <el-table-column prop="user" :label="$t('fee.promotion.user')" width="150" show-overflow-tooltip />
              <el-table-column prop="applyDate" :label="$t('fee.promotion.applyDate')" width="150" show-overflow-tooltip />
              <el-table-column prop="brand" :label="$t('fee.promotion.brand')" width="150" show-overflow-tooltip />
              <el-table-column prop="theme" :label="$t('fee.promotion.theme')" width="150" show-overflow-tooltip />
              <el-table-column prop="startDate" :label="$t('fee.promotion.periodStart')" width="150" show-overflow-tooltip />
              <el-table-column prop="endDate" :label="$t('fee.promotion.periodEnd')" width="150" show-overflow-tooltip />
              <el-table-column prop="spdPlanAmount" :label="$t('fee.promotion.spdPlanAmount')" width="150" show-overflow-tooltip />
              <el-table-column prop="expense" :label="$t('fee.promotion.expense')" width="150" show-overflow-tooltip />
              <el-table-column prop="isFixWithDiscuss" :label="$t('fee.promotion.isFixWithDiscuss')" width="150" show-overflow-tooltip />
              <el-table-column prop="intervalDays" :label="$t('fee.promotion.intervalDays')" width="170" show-overflow-tooltip />
            </el-table>
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
              class="page-right"
              :current-page.sync="searchParam.pageNo"
              :page-size="searchParam.pageSize"
              layout="prev,pager,next,slot,jumper"
              :total="searchParam.totalRecord"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
              <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
            </el-pagination>
            <el-pagination class="page-right  page-first" layout="slot">
              <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
            </el-pagination>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
// import { getPopList } from '@/api/sale/motion.js'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format.js'
import { popSelect } from '@/mixins/pop-select.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'MotionPop',
  components: { UserSelect },
  mixins: [names, search, formValidator, numFormat, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      selectUserDialog: false,
      motionList: [],
      multipleSelection: [],
      exportSelectDilog: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          districtValue: '',
          channel: '',
          accountNum: '',
          user: '',
          brand: '',
          startDate: '',
          endDate: ''
        }
      },
      department: [{
        value: '2',
        label: 'KA部'
      }, {
        value: '3',
        label: '日系客户部'
      }, {
        value: '1',
        label: 'EC&新零售部'
      }, {
        value: '4',
        label: '华东地区'
      }, {
        value: '5',
        label: '华南地区'
      }, {
        value: '6',
        label: '西南地区'
      }, {
        value: '7',
        label: '华北地区'
      }],
      channel: [{
        value: '1',
        label: 'KA'
      }, {
        value: '2',
        label: 'DB'
      }, {
        value: '3',
        label: 'EC'
      }],
      district: [{
        value: '1',
        label: '华北地区'
      }, {
        value: '2',
        label: '华东地区'
      }, {
        value: '3',
        label: '华南地区'
      }, {
        value: '4',
        label: '西南地区'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    orgRootId: function() { return this.userInfo.orgSeqNo.split('.')[1] }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      var departments = ['财务',
        '销售',
        '管理']
      var persons = ['张三',
        '李四',
        '王五',
        '赵六']
      var channels = ['KA',
        'DB',
        'EC']
      var brand = ['乐而雅',
        '美舒律',
        '碧柔',
        '芙丽芳丝']
      for (var i = 0; i < 10; i++) {
        var obj = {
          'id': (i + 1) + '',
          'department': departments[i % 3],
          'user': persons[i % 4],
          'accountNum': '客户' + (i + 1),
          'channel': channels[i % 3],
          'identiferNum': 'PRO2012000' + i,
          'brand': brand[i % 4],
          'applyDate': '2021-01-0' + (i + 1),
          'isFixWithDiscuss': '一致',
          'startDate': '2021年' + (i + 1) + '月',
          'endDate': '2021年' + (i + 2) + '月',
          'intervalDays': (i + 6) + '天',
          'theme': '活动主题' + (i + 1),
          'spdPlanAmount': (10000 * Math.random()).toFixed(2),
          'expense': (10000 * Math.random()).toFixed(2)
        }
        this.motionList.push(obj)
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.motion {
  .editDilog {
    h5 {
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      .add_row {
        position: absolute;
        right: 25px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
        color: #fff;
        &:hover {
          background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
        }
      }
    }
  }
}
.pagination {
  position: relative;
  .select_header {
    position: absolute;
    top: 26px;
    left: 0;
  }
  .el-icon-menu {
    color: skyblue;
    font-size: 18px;
    cursor: pointer;
  }
  .check_box_item {
    padding-top: 15px;
    border-top: 1px solid #666;
  }
}
</style>
<style lang="scss">
</style>
