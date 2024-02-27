<template>
  <div class="PriceWarning">
    <div ref="tables" style="height: 100%">
      <el-table
        ref="table"
        :data="PriceWarningList"
        stripe
        border
        height="100%"
        :header-cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="region3" :label="$t('sale.report.stores.region3')" min-width="80" />
        <el-table-column prop="rateCode" :label="$t('sale.report.stores.rateCode')" min-width="80" />
        <el-table-column prop="customer2" :label="$t('sale.report.stores.customer2')" min-width="120" />
        <el-table-column prop="store" :label="$t('sale.report.stores.store')" min-width="200" />
        <el-table-column prop="saleName" :label="$t('sale.report.stores.saleName')" min-width="80" />
        <el-table-column prop="superior" :label="$t('sale.report.stores.superior')" min-width="80" />
        <el-table-column prop="date" :label="$t('sale.report.stores.date')" min-width="80" />
        <el-table-column prop="productName" :label="$t('sale.report.stores.productName')" min-width="500" />
        <el-table-column prop="highest" :label="$t('sale.report.stores.highest')" min-width="80" />
        <el-table-column prop="minimum" :label="$t('sale.report.stores.minimum')" min-width="80" />
        <el-table-column prop="retail" :label="$t('sale.report.stores.retail')" min-width="80" />
      </el-table>
    </div>
  </div>
</template>
<script>
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
export default {
  name: 'PriceWarning',
  mixins: [names, formValidator],
  props: {
    rootOrgId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      PriceWarningList: [
        {
          id: 1,
          region3: '华东地区',
          rateCode: 'AV01R01',
          customer2: '大润发（华东）',
          store: '家乐福宁波江东店',
          saleName: '鲍文亭',
          superior: '丁华',
          date: '3/1/2021',
          productName: '花王秒而舒瞬爽透气腰贴式婴儿纸尿裤 彩箱装 大号（L）128片',
          highest: '139.80',
          minimum: '119.60',
          retail: '107.00'
        },
        {
          id: 2,
          region3: '华东地区',
          rateCode: 'AV01R02',
          customer2: '大润发（华东）',
          store: '家乐福宁波江东店',
          saleName: '鲍文亭',
          superior: '丁华',
          date: '3/1/2021',
          productName: '花王秒而舒瞬爽透气腰贴式婴儿纸尿裤 彩箱装 大号（L）128片',
          highest: '139.80',
          minimum: '119.60',
          retail: '107.00'
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
