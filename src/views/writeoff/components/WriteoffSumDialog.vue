<template>
  <el-dialog
    title="汇总查看"
    class="content-dialog-box  search-light sum"
    custom-class="dialog-drag fixed-search-btn-box"
    width="80vw"
    top="0"
    :visible.sync="isShow"
    append-to-body
    :before-close="handleCancelClick"
    @open="handleOpen"
  >
    <div style="display: flex;flex-direction: column;height: 100%;">
      <el-table v-loading="isLoading" :data="dataList" row-key="id" stripe height="100%" lazy :load="fetchData" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="sum" label="" width="100px" />
        <el-table-column prop="area1" label="销售部" width="110px" />
        <el-table-column prop="custName" label="代理商" width="80px" />
        <el-table-column prop="finAccountTypeName" label="一级费目" width="70px" />
        <el-table-column prop="productCategory" label="品类" width="100px" />
        <el-table-column prop="finAccountName" label="二级费目" width="90px" />
        <el-table-column prop="salesAmount" label="销售金额" align="right">
          <template slot-scope="scope">
            {{ scope.row.salesAmount | numFormat(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="促销费金额" align="right">
          <template slot-scope="scope">
            {{ scope.row.amount | numFormat(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="percent" label="费比" align="right" width="90px">
          <template slot-scope="scope">
            {{ scope.row.percent }}%
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { popSelect } from '@/mixins/pop-select.js'
import { getWriteoffSum } from '@/api/writeoff/approval.js'
import { numFormat } from '@/mixins/num-format.js'

export default {
  name: 'WriteoffSum',
  mixins: [popSelect, numFormat],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    adjustType: {
      type: String,
      default: '1'
    },
    targetOrg: {
      type: String,
      default: ''
    },
    estYm: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: true,
      dataList: [
        // {
        //   id: Math.random(),
        //   level: 0,
        //   sum: 'test',
        //   targetOrg: '',//传值过来 对象部门
        //   estYm: '',//传值过来 检索条件年月
        //   adjustType: '',//传值过来 1:精准预估 2：核销
        //   area1: '',
        //   custCode: '',
        //   custName: '',
        //   finAccountTypeName: '',
        //   productCategory: '',
        //   finAccountCode: '',
        //   finAccountName: '',
        //   salesAmount: 'xxxxxx',
        //   amount: 'xx',
        //   percent: 'xxxxxx',
        //   bgtSalesAmount: 'xx',
        //   bgtAmount: 'xxxxxx',
        //   bgtPercent: 'xx',
        //   estSalesAmount: 'xx',
        //   estAmount: 'xxxxxx',
        //   estPercent: 'xx',
        //   children: [],
        //   hasChildren: true
        // }
      ]

    }
  },
  watch: {
    estYm() {
      this.dataList = []
    },
    targetOrg() {
      this.dataList = []
    },
    isShow() {
      this.dataList = []
    }
  },
  methods: {
    async fetchData(tree, treeNode, resolve) {
      this.isLoading = true
      if (!tree) tree = { level: 0, adjustType: this.adjustType, targetOrg: this.targetOrg, estYm: this.estYm }
      const res = await getWriteoffSum(tree)
      if (res && res.success) {
        if (resolve) {
          resolve(res.datas.results)
        } else {
          this.dataList = res.datas.results
        }
      }
      this.isLoading = false
    }
  }
}
</script>
<style>
.search-light.sum .el-dialog__body{
  height: calc(100% - 50px);
}
</style>
