<template>
  <div class="DistributionRate">
    <div ref="tables" style="height: 100%">
      <el-table
        ref="table"
        :data="DistributionList"
        stripe
        border
        height="100%"
        :header-cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div ref="tables" style="height: 100%">
              <el-table
                ref="table"
                :data="scope.row.details"
                stripe
                border
                height="100%"
                :header-cell-style="{ 'text-align': 'center' }"
              >
                <el-table-column prop="storeCode" :label="$t('sale.report.stores.storeCode')" min-width="120" />
                <el-table-column prop="storeName" :label="$t('sale.report.stores.storeName')" min-width="100" />
                <el-table-column prop="standard1" :label="$t('sale.report.stores.standard1')" min-width="120" />
                <el-table-column prop="actual1" :label="$t('sale.report.stores.actual1')" min-width="100" />
                <el-table-column prop="distributionRate1" :label="$t('sale.report.stores.distributionRate')" min-width="80" />
                <el-table-column prop="standard2" :label="$t('sale.report.stores.standard2')" min-width="120" />
                <el-table-column prop="actual2" :label="$t('sale.report.stores.actual2')" min-width="100" />
                <el-table-column prop="distributionRate2" :label="$t('sale.report.stores.distributionRate')" min-width="80" />
                <el-table-column prop="standard3" :label="$t('sale.report.stores.standard3')" min-width="120" />
                <el-table-column prop="actual3" :label="$t('sale.report.stores.actual3')" min-width="100" />
                <el-table-column prop="distributionRate3" :label="$t('sale.report.stores.distributionRate')" min-width="80" />
                <el-table-column prop="standard4" :label="$t('sale.report.stores.standard4')" min-width="120" />
                <el-table-column prop="actual4" :label="$t('sale.report.stores.actual4')" min-width="100" />
                <el-table-column prop="distributionRate4" :label="$t('sale.report.stores.distributionRate')" min-width="80" />
                <el-table-column prop="standard5" :label="$t('sale.report.stores.standard5')" min-width="120" />
                <el-table-column prop="actual5" :label="$t('sale.report.stores.actual5')" min-width="100" />
                <el-table-column prop="distributionRate5" :label="$t('sale.report.stores.distributionRate')" min-width="80" />
                <el-table-column prop="standard6" :label="$t('sale.report.stores.standard6')" min-width="120" />
                <el-table-column prop="actual6" :label="$t('sale.report.stores.actual6')" min-width="100" />
                <el-table-column prop="distributionRate6" :label="$t('sale.report.stores.distributionRate')" min-width="80" />
                <el-table-column prop="times" :label="$t('sale.report.stores.times')" min-width="80" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="region2" :label="$t('sale.report.stores.region2')" min-width="80" />
        <el-table-column :label="$t('sale.report.stores.product1')">
          <el-table-column prop="standard1" :label="$t('sale.report.stores.standard')" />
          <el-table-column prop="actual1" :label="$t('sale.report.stores.actual')" />
          <el-table-column prop="distributionRate1" :label="$t('sale.report.stores.distributionRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product2')">
          <el-table-column prop="standard2" :label="$t('sale.report.stores.standard')" />
          <el-table-column prop="actual2" :label="$t('sale.report.stores.actual')" />
          <el-table-column prop="distributionRate2" :label="$t('sale.report.stores.distributionRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product3')">
          <el-table-column prop="standard3" :label="$t('sale.report.stores.standard')" />
          <el-table-column prop="actual3" :label="$t('sale.report.stores.actual')" />
          <el-table-column prop="distributionRate3" :label="$t('sale.report.stores.distributionRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product4')">
          <el-table-column prop="standard4" :label="$t('sale.report.stores.standard')" />
          <el-table-column prop="actual4" :label="$t('sale.report.stores.actual')" />
          <el-table-column prop="distributionRate4" :label="$t('sale.report.stores.distributionRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product5')">
          <el-table-column prop="standard5" :label="$t('sale.report.stores.standard')" />
          <el-table-column prop="actual5" :label="$t('sale.report.stores.actual')" />
          <el-table-column prop="distributionRate5" :label="$t('sale.report.stores.distributionRate')" />
        </el-table-column>
        <el-table-column :label="$t('sale.report.stores.product6')">
          <el-table-column prop="standard6" :label="$t('sale.report.stores.standard')" />
          <el-table-column prop="actual6" :label="$t('sale.report.stores.actual')" />
          <el-table-column prop="distributionRate6" :label="$t('sale.report.stores.distributionRate')" />
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
export default {
  name: 'DistributionRate',
  mixins: [names, formValidator],
  props: {
    rootOrgId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      DistributionList: [
        {
          id: 1,
          region2: '华东地区',
          standard1: '6',
          actual1: '4',
          distributionRate1: '67.00%',
          standard2: '10',
          actual2: '7',
          distributionRate2: '70.00%',
          standard3: '32',
          actual3: '15',
          distributionRate3: '47.00%',
          standard4: '18',
          actual4: '12',
          distributionRate4: '67.00%',
          standard5: '6',
          actual5: '0',
          distributionRate5: '0.00%',
          standard6: '8',
          actual6: '6',
          distributionRate6: '75.00%',
          details: [
            {
              id: 1,
              storeCode: 'R24-025-140',
              storeName: '华联山海荣昌',
              standard1: '10',
              actual1: '4',
              distributionRate1: '40.00%',
              standard2: '10',
              actual2: '7',
              distributionRate2: '70.00%',
              standard3: '32',
              actual3: '15',
              distributionRate3: '47.00%',
              standard4: '18',
              actual4: '12',
              distributionRate4: '67.00%',
              standard5: '6',
              actual5: '0',
              distributionRate5: '0.00%',
              standard6: '8',
              actual6: '6',
              distributionRate6: '75.00%',
              times: '11'
            },
            {
              id: 2,
              storeCode: 'R24-025-142',
              storeName: '华联山海荣昌',
              standard1: '10',
              actual1: '4',
              distributionRate1: '40.00%',
              standard2: '10',
              actual2: '7',
              distributionRate2: '70.00%',
              standard3: '32',
              actual3: '15',
              distributionRate3: '47.00%',
              standard4: '18',
              actual4: '12',
              distributionRate4: '67.00%',
              standard5: '6',
              actual5: '0',
              distributionRate5: '0.00%',
              standard6: '8',
              actual6: '6',
              distributionRate6: '75.00%',
              times: '11'
            }
          ]
        },
        {
          id: 2,
          region2: '华东地区',
          standard1: '10',
          actual1: '4',
          distributionRate1: '40.00%',
          standard2: '10',
          actual2: '7',
          distributionRate2: '70.00%',
          standard3: '32',
          actual3: '15',
          distributionRate3: '47.00%',
          standard4: '18',
          actual4: '12',
          distributionRate4: '67.00%',
          standard5: '6',
          actual5: '0',
          distributionRate5: '0.00%',
          standard6: '8',
          actual6: '6',
          distributionRate6: '75.00%',
          details: [
            {
              id: 1,
              storeCode: 'R24-025-140',
              storeName: '华联山海荣昌',
              standard1: '10',
              actual1: '4',
              distributionRate1: '40.00%',
              standard2: '10',
              actual2: '7',
              distributionRate2: '70.00%',
              standard3: '32',
              actual3: '15',
              distributionRate3: '47.00%',
              standard4: '18',
              actual4: '12',
              distributionRate4: '67.00%',
              standard5: '6',
              actual5: '0',
              distributionRate5: '0.00%',
              standard6: '8',
              actual6: '6',
              distributionRate6: '75.00%',
              times: '11'
            }
          ]
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
