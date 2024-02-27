<template>
  <div class="DisplayRate">
    <div ref="tables" style="height: 100%">
      <el-table
        ref="table"
        :data="DisplayList"
        stripe
        border
        height="100%"
        :header-cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="rateCode" :label="$t('sale.report.stores.rateCode')" min-width="80" />
        <el-table-column prop="customer2" :label="$t('sale.report.stores.customer2')" min-width="120" />
        <el-table-column prop="region" :label="$t('sale.report.stores.region')" min-width="80" />
        <el-table-column :label="$t('sale.report.stores.product1')">
          <el-table-column prop="totalNum1" :label="$t('sale.report.stores.totalNum')" min-width="100" />
          <el-table-column prop="flowerNum1" :label="$t('sale.report.stores.flowerNum')" min-width="100" />
          <el-table-column prop="share1" :label="$t('sale.report.stores.share')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product2')">
          <el-table-column prop="totalNum2" :label="$t('sale.report.stores.totalNum')" min-width="100" />
          <el-table-column prop="flowerNum2" :label="$t('sale.report.stores.flowerNum')" min-width="100" />
          <el-table-column prop="share2" :label="$t('sale.report.stores.share')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product3')">
          <el-table-column prop="totalNum3" :label="$t('sale.report.stores.totalNum')" min-width="100" />
          <el-table-column prop="flowerNum3" :label="$t('sale.report.stores.flowerNum')" min-width="100" />
          <el-table-column prop="share3" :label="$t('sale.report.stores.share')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product4')">
          <el-table-column prop="totalNum4" :label="$t('sale.report.stores.totalNum')" min-width="100" />
          <el-table-column prop="flowerNum4" :label="$t('sale.report.stores.flowerNum')" min-width="100" />
          <el-table-column prop="share4" :label="$t('sale.report.stores.share')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product5')">
          <el-table-column prop="totalNum5" :label="$t('sale.report.stores.totalNum')" min-width="100" />
          <el-table-column prop="flowerNum5" :label="$t('sale.report.stores.flowerNum')" min-width="100" />
          <el-table-column prop="share5" :label="$t('sale.report.stores.share')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product6')">
          <el-table-column prop="totalNum6" :label="$t('sale.report.stores.totalNum')" min-width="100" />
          <el-table-column prop="flowerNum6" :label="$t('sale.report.stores.flowerNum')" min-width="100" />
          <el-table-column prop="share6" :label="$t('sale.report.stores.share')" />
        </el-table-column>
        <el-table-column prop="times" :label="$t('sale.report.stores.times')" min-width="80" />
      </el-table>
    </div>
  </div>
</template>
<script>
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
export default {
  name: 'DisplayRate',
  mixins: [names, formValidator],
  props: {
    rootOrgId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      DisplayList: [
        {
          id: 1,
          rateCode: 'AV01R01',
          customer2: '大润发（华东）',
          region: '华东地区',
          totalNum1: '6',
          flowerNum1: '4',
          share1: '67.00%',
          totalNum2: '6',
          flowerNum2: '4',
          share2: '67.00%',
          totalNum3: '6',
          flowerNum3: '4',
          share3: '67.00%',
          totalNum4: '6',
          flowerNum4: '4',
          share4: '67.00%',
          totalNum5: '6',
          flowerNum5: '4',
          share5: '67.00%',
          totalNum6: '6',
          flowerNum6: '4',
          share6: '67.00%',
          times: '11'
        },
        {
          id: 2,
          rateCode: 'AV01R02',
          customer2: '大润发（华东）',
          region: '华东地区',
          totalNum1: '6',
          flowerNum1: '4',
          share1: '67.00%',
          totalNum2: '6',
          flowerNum2: '4',
          share2: '67.00%',
          totalNum3: '6',
          flowerNum3: '4',
          share3: '67.00%',
          totalNum4: '6',
          flowerNum4: '4',
          share4: '67.00%',
          totalNum5: '6',
          flowerNum5: '4',
          share5: '67.00%',
          totalNum6: '6',
          flowerNum6: '4',
          share6: '67.00%',
          times: '11'
        }
      ]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    isCheckApproval(row) {
      return row.status === '0'
    }
  }
}
</script>
<style lang="scss" scoped>
.userSelect {
  width: 100%;
  .i-tree {
    margin-top: 0px;
  }
}
</style>
