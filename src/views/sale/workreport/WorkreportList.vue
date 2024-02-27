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
        >
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.shopName") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.workplan.salesBear") }}:
              </el-col>
              <el-col :span="16">
                <user-select />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.workreport.visitType") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="visitTypeValue" clearable>
                  <el-option value="" label="全部" />
                  <el-option value="1" label="普通门店" />
                  <el-option value="2" label="特别合作门店" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.salesandshops.visitTime") }}:
              </el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="visitTimeValue"
                  type="month"
                  :picker-options="pickerOptions"
                  placeholder="请选择"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box">
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
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">{{ $t("comm.export") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            :data="WorkreportList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'left' }"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              prop="shopNo"
              :label="$t('sale.shop.shopNo')"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="shopName"
              :label="$t('sale.shop.shopName')"
              min-width="150"
            >
              <template slot-scope="scope">
                <router-link to="/sale/workreport/detail">
                  {{ scope.row.shopName }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="visitName"
              :label="$t('sale.workplan.salesBear')"
              min-width="100"
            />
            <el-table-column
              prop="date"
              :label="$t('sale.workreport.date')"
              min-width="100"
            />
            <el-table-column
              prop="visitType"
              :label="$t('sale.workreport.visitType')"
              min-width="80"
            />
            <el-table-column
              prop="intoTime"
              :label="$t('sale.workreport.intoTime')"
              min-width="80"
            />
            <el-table-column
              prop="leaveTime"
              :label="$t('sale.workreport.leaveTime')"
              min-width="80"
            />
            <el-table-column
              prop="visitSummary"
              :label="$t('sale.workreport.visitSummary')"
              min-width="100"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="bottom-start"
                  width="250"
                  trigger="hover"
                  popper-class="popper-bg-gradient"
                  :content="scope.row.visitSummary"
                >
                  <p slot="reference" class="workreport-pop-text">
                    {{ scope.row.visitSummary }}
                  </p>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="adviceHeadOffice"
              :label="$t('sale.workreport.adviceHeadOffice')"
              min-width="100"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="bottom-start"
                  width="250"
                  trigger="hover"
                  popper-class="popper-bg-gradient"
                  :content="scope.row.adviceHeadOffice"
                >
                  <p slot="reference" class="workreport-pop-text">
                    {{ scope.row.adviceHeadOffice }}
                  </p>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="adviceLeader"
              :label="$t('sale.workreport.adviceLeader')"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-popover
                  placement="bottom-start"
                  width="250"
                  trigger="hover"
                  popper-class="popper-bg-gradient"
                  :content="scope.row.adviceLeader"
                >
                  <p slot="reference" class="workreport-pop-text">
                    {{ scope.row.adviceLeader }}
                  </p>
                </el-popover>
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
        />

        <el-pagination
          class="page-right blueDR"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="prev,pager,next,slot,jumper"
          :total="searchParam.totalRecord"
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
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'WorkreportList',
  components: { UserSelect },
  mixins: [search, UserSelect, names, permission],
  data() {
    return {
      visitTimeValue: '',
      visitTypeValue: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      WorkreportList: [
        {
          id: 1,
          shopNo: 'ZB-R63-021-010',
          shopName: '7-11上海总部店',
          city: '上海市',
          visitType: '普通门店',
          date: '2021/02/19',
          intoTime: '14:48',
          intoOffsetDistance: '12.7',
          leaveTime: '15:10',
          leaveOffsetDistance: '0',
          visitNo: '38003456',
          visitName: '付雪全',
          visitSummary: '铺货；价格；促销活动；竞品',
          adviceHeadOffice: '总部担当意见',
          adviceLeader: '领导意见'
        },
        {
          id: 1,
          shopNo: 'ZB-R63-021-010',
          shopName: '7-11上海总部店',
          city: '上海市',
          visitType: '普通门店',
          date: '2021/02/19',
          intoTime: '14:48',
          intoOffsetDistance: '12.7',
          leaveTime: '15:10',
          leaveOffsetDistance: '0',
          visitNo: '38003456',
          visitName: '付雪全',
          visitSummary: '铺货；价格；促销活动；竞品',
          adviceHeadOffice: '总部担当意见总部担当意见总部担当意见总部担当意见总部担当意见总部担当意见总部担当意见总部担当意见总部担当意见总部担当意见总部担当意见',
          adviceLeader: '领导意见'
        },
        {
          id: 1,
          shopNo: 'ZB-R63-021-010',
          shopName: '7-11上海总部店',
          city: '上海市',
          visitType: '普通门店',
          date: '2021/02/19',
          intoTime: '14:48',
          intoOffsetDistance: '12.7',
          leaveTime: '15:10',
          leaveOffsetDistance: '0',
          visitNo: '38003456',
          visitName: '付雪全',
          visitSummary: '铺货；价格；促销活动；竞品',
          adviceHeadOffice: '总部担当意见',
          adviceLeader: '领导意见'
        }
      ],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: 98, // 总条数
        params: {}
      }
    }
  }
}
</script>
