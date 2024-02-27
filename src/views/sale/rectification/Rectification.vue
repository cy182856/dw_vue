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
                {{ $t("sale.rect.name") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.rect.status") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="statusValue" clearable>
                  <el-option value="0" label="全部" />
                  <el-option value="1" label="未开始" />
                  <el-option value="2" label="巡店中" />
                  <el-option value="3" label="巡店完成" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.rect.cons") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.shopNo") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
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
        <li class="operation-item" @click="toAdd">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">{{ $t("comm.newlyBuild") }}</span>
        </li>
        <li class="operation-item" @click="toEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{ $t("comm.edit") }}</span>
        </li>
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
            :data="rectList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'left' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              prop="name"
              :label="$t('sale.rect.name')"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="createDate"
              :label="$t('sale.rect.createDate')"
              min-width="150"
            />
            <el-table-column :label="$t('sale.rect.num1')" min-width="90">
              <template slot-scope="scope">
                <router-link to="/sale/rectification/detail">
                  {{ scope.row.num1 }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('sale.rect.num2')" min-width="80">
              <template slot-scope="scope">
                <router-link to="/sale/rectification/detail?st=1">
                  {{ scope.row.num2 }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="numsum"
              :label="$t('sale.rect.numsum')"
              min-width="80"
            />
            <el-table-column
              prop="leaveTime"
              :label="$t('sale.rect.status')"
              min-width="80"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status == 1">未开始</span>
                <span v-else-if="scope.row.status == 2">巡店中</span>
                <span v-else>巡店完成</span>
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
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'Rectification',
  mixins: [search, names, permission],
  data() {
    return {
      multipleSelection: [],
      rectList: [
        {
          id: 1,
          name: '货架清整',
          createDate: '2021/02/19',
          num1: 12,
          num2: 3,
          numsum: 15,
          cons: '货架不够整齐',
          status: 1
        },
        {
          id: 1,
          name: '价格标签数字过小',
          createDate: '2021/02/20',
          num1: 45,
          num2: 1,
          numsum: 46,
          cons: '货品种类不齐',
          status: 1
        }
      ],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: 98, // 总条数
        params: {}
      },
      statusValue: '0'
    }
  },
  methods: {
    toAdd() {
      this.$router.push({ path: '/sale/rectification/edit' })
    },
    toEdit() {
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
        this.$router.push({ path: '/sale/rectification/edit?id=1' })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
