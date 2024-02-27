<template>
  <div class="DefectRate">
    <div ref="tables" style="height: 100%">
      <el-table
        ref="table"
        :data="DefectRateList"
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
          <el-table-column prop="visitNum1" :label="$t('sale.report.stores.visitNum')" min-width="100" />
          <el-table-column prop="defectNum1" :label="$t('sale.report.stores.defectNum')" min-width="100" />
          <el-table-column prop="defectRate1" :label="$t('sale.report.stores.defectRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product2')">
          <el-table-column prop="visitNum2" :label="$t('sale.report.stores.visitNum')" min-width="100" />
          <el-table-column prop="defectNum2" :label="$t('sale.report.stores.defectNum')" min-width="100" />
          <el-table-column prop="defectRate2" :label="$t('sale.report.stores.defectRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product3')">
          <el-table-column prop="visitNum3" :label="$t('sale.report.stores.visitNum')" min-width="100" />
          <el-table-column prop="defectNum3" :label="$t('sale.report.stores.defectNum')" min-width="100" />
          <el-table-column prop="defectRate3" :label="$t('sale.report.stores.defectRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product4')">
          <el-table-column prop="visitNum4" :label="$t('sale.report.stores.visitNum')" min-width="100" />
          <el-table-column prop="defectNum4" :label="$t('sale.report.stores.defectNum')" min-width="100" />
          <el-table-column prop="defectRate4" :label="$t('sale.report.stores.defectRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product5')">
          <el-table-column prop="visitNum5" :label="$t('sale.report.stores.visitNum')" min-width="100" />
          <el-table-column prop="defectNum5" :label="$t('sale.report.stores.defectNum')" min-width="100" />
          <el-table-column prop="defectRate5" :label="$t('sale.report.stores.defectRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product6')">
          <el-table-column prop="visitNum6" :label="$t('sale.report.stores.visitNum')" min-width="100" />
          <el-table-column prop="defectNum6" :label="$t('sale.report.stores.defectNum')" min-width="100" />
          <el-table-column prop="defectRate6" :label="$t('sale.report.stores.defectRate')" />
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
  name: 'DefectRate',
  mixins: [names, formValidator],
  props: {
    rootOrgId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      DefectRateList: [
        {
          id: 1,
          rateCode: 'AV01R01',
          customer2: '大润发（华东）',
          region: '华东地区',
          visitNum1: '6',
          defectNum1: '4',
          defectRate1: '67.00%',
          visitNum2: '6',
          defectNum2: '4',
          defectRate2: '67.00%',
          visitNum3: '6',
          defectNum3: '4',
          defectRate3: '67.00%',
          visitNum4: '6',
          defectNum4: '4',
          defectRate4: '67.00%',
          visitNum5: '6',
          defectNum5: '4',
          defectRate5: '67.00%',
          visitNum6: '6',
          defectNum6: '4',
          defectRate6: '67.00%',
          times: '11'
        },
        {
          id: 2,
          rateCode: 'AV01R02',
          customer2: '大润发（华东）',
          region: '华东地区',
          visitNum1: '6',
          defectNum1: '4',
          defectRate1: '67.00%',
          visitNum2: '6',
          defectNum2: '4',
          defectRate2: '67.00%',
          visitNum3: '6',
          defectNum3: '4',
          defectRate3: '67.00%',
          visitNum4: '6',
          defectNum4: '4',
          defectRate4: '67.00%',
          visitNum5: '6',
          defectNum5: '4',
          defectRate5: '67.00%',
          visitNum6: '6',
          defectNum6: '4',
          defectRate6: '67.00%',
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
