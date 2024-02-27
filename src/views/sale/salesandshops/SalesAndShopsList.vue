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
                {{ $t("sale.salesandshops.goodsGroup") }}:
              </el-col>
              <el-col :span="16">
                <el-input
                  clearable
                  :placeholder="$t('sale.salesandshops.goodsGroupName')"
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
        <li class="operation-item" @click="toAdd">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">{{ $t("comm.newlyBuild") }}</span>
        </li>
        <li class="operation-item" @click="toEdit('铺货组1')">
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
          <span class="operation-text"> {{ $t("comm.export") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            :data="SalesAndShopsList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'left' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              prop="goodsGroupNo"
              :label="$t('sale.salesandshops.goodsGroupNo')"
              width="120px"
            />
            <el-table-column
              prop="goodsGroupName"
              :label="$t('sale.salesandshops.goodsGroupName')"
            />
            <el-table-column
              prop="productNo"
              :label="$t('sale.salesandshops.productNo')"
            />
            <el-table-column
              prop="shopNo"
              :label="$t('sale.salesandshops.shopNo')"
            />
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
    <!--铺货弹窗  -->
    <el-dialog
      :title="$t('comm.distribution')"
      class="content-dialog-box search-light"
      custom-class="dialog-drag dialog-drag-resource  fixed-search-btn-box"
      :visible.sync="distributionDialogVisible"
      width="620px"
      :close-on-click-modal="false"
    >
      <distribution :name="name" :mode="mode" />
      <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
        <li class="operation-item" @click="distributionDialogVisible = false">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconquxiao"
          /></span>
          <span class="operation-text">{{ $t("comm.cancel") }}</span>
        </li>
        <li class="operation-item" @click="handleSave">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconqueren"
          /></span>
          <span class="operation-text">{{ $t("comm.certain") }}</span>
        </li>
      </ul>
    </el-dialog>
    <!--关联门店弹窗  -->
    <el-dialog
      :title="$t('comm.distribution')"
      class="content-dialog-box search-light"
      custom-class="dialog-drag dialog-drag-resource  fixed-search-btn-box"
      :visible.sync="shopsDistributionDialogVisible"
      width="620px"
      :close-on-click-modal="false"
    >
      <shops-distribution :name="name" />
      <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
        <li
          class="operation-item"
          @click="shopsDistributionDialogVisible = false"
        >
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconquxiao"
          /></span>
          <span class="operation-text">{{ $t("comm.cancel") }}</span>
        </li>
        <li class="operation-item" @click="handleSaveShops">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconqueren"
          /></span>
          <span class="operation-text">{{ $t("comm.certain") }}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import Distribution from './components/Distribution.vue'
import ShopsDistribution from './components/ShopsDistribution.vue'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'SalesAndShopsList',
  components: { Distribution, ShopsDistribution },
  mixins: [search, names, permission],
  data() {
    return {
      name: '',
      mode: 'edit',
      shopTypeValue: '0',
      multipleSelection: [],
      distributionDialogVisible: false,
      shopsDistributionDialogVisible: false,
      SalesAndShopsList: [
        {
          id: 1,
          goodsGroupNo: '1',
          goodsGroupName: '铺货组1',
          productNo: '13',
          shopNo: '16'
        },
        {
          id: 1,
          goodsGroupNo: '2',
          goodsGroupName: '铺货组2',
          productNo: '14',
          shopNo: '17'
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
  },
  methods: {
    toAdd() {
      this.name = ''
      this.mode = 'edit'
      this.distributionDialogVisible = true
    },
    toEdit(name) {
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
        this.name = name
        this.mode = 'edit'
        this.distributionDialogVisible = true
      }
    },
    linkShop(name) {
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
        this.name = name
        this.shopsDistributionDialogVisible = true
      }
    },
    distribution(name) {
      this.name = name
      this.mode = 'dis'
      this.distributionDialogVisible = true
    },
    handleSave() {
      this.$message({
        type: 'success',
        message: this.$t('comm.sucess')
      })
      this.distributionDialogVisible = false
    },
    handleSaveShops() {
      this.$message({
        type: 'success',
        message: this.$t('comm.sucess')
      })
      this.shopsDistributionDialogVisible = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
