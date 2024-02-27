<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan" />
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                客户编码
              </div>
              <div class="input">
                <el-input v-model="accountNum" :disabled="true" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                客户名称
              </div>
              <div class="input">
                <el-input v-model="accountName" :disabled="true" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                Sales Office
              </div>
              <div class="input">
                <el-input v-model="salesOffice" :disabled="true" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">行明细</span>
          <el-table
            id="table"
            ref="table"
            v-loading="isLoading"
            :data="customerSkuList"
            stripe
            row-key="id"
            border
            show-summary
            :summary-method="getSummaries"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column prop="subBrandNum" :label="'Sub-Brand编号'" width="180" show-overflow-tooltip />
            <el-table-column prop="subBrandName" :label="'Sub-Brand名称'" width="180" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <a @click="handleSeleCustomerBrand">{{ scope.row.subBrandName }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="sku" :label="'SKU编号'" width="180" align="center" show-overflow-tooltip />
            <el-table-column prop="skuName" :label="'SKU名称'" width="180" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <a @click="handleSeleCustomerSku">{{ scope.row.skuName }}</a>
              </template>
            </el-table-column>
            <template v-for="item in 12">
              <el-table-column :key="item" :label="item+'月'">
                <el-table-column :prop="'netsales_'+item" :label="'Netsales'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row['netsales_'+item] | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column :prop="'spd_'+item" :label="'SPD'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row['spd_'+item] | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column :prop="'spmk_'+item" :label="'SP-MK'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row['spmk_'+item] | numFormat(2) }}
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">备注</span>
          <div class="input_box">
            <el-input v-model="memo" type="textarea" :rows="3" height="200px" :disabled="true" />
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">附件</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                附件信息
              </div>
              <div class="input">
                <attachement v-model="fileList" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 变更履历 -->
        <li class="operation-item" @click="historyDialog = true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <!-- 历史版本 -->
        <li class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li>
        <!-- 审批履历 -->
        <li class="operation-item" @click="approveHisDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">{{ $t('component.taskApprove.approval') }}</span>
        </li>
        <!-- 确认 -->
        <li v-if="type==='approve'" class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">确认</span>
        </li>
        <!-- 取消确认 -->
        <li v-if="type==='approve'" class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshenpi" /></span>
          <span class="operation-text">取消确认</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div class="historyDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his />
      </el-drawer>
    </div>
    <div class="versionDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="versionDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.versionHis') }}</span>
        <version-his @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
    <div v-if="approveHisDialog" class="approveHis">
      <process-detail :title="$t('component.taskApprove.detailedProcess')" :is-show="approveHisDialog" @close="approveHisDialog=false" />
    </div>
    <div>
      <customer-pop :is-show="customerSkuSelectDialog" :editable="!!id" @cancel="customerSkuSelectDialog=false" />
    </div>
    <div>
      <customer-brand-pop :is-show="customerBrandSelectDialog" :editable="!!id" @cancel="customerBrandSelectDialog=false" />
    </div>
  </div>
</template>
<script>
import CustomerPop from '@/views/bd/components/BdCustomerSku'
import CustomerBrandPop from '@/views/bd/components/BdCustomerBrand'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import { numberFormat } from '@/utils/util'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'BdCustomer',
  components: { CustomerPop, CustomerBrandPop },
  mixins: [names, formValidator, numFormat, popSelect],
  data() {
    return {
      isLoading: false,
      customerSkuList: [],
      customerSkuSelectDialog: false,
      customerBrandSelectDialog: false,
      accountNum: 'CUS20210001',
      accountName: '上海一科',
      salesOffice: '华东区',
      activeNames: ['1', '2', '3', '4'],
      memo: '备注',
      historyDialog: false,
      approveHisDialog: false,
      versionDialog: false,
      fileList: []
    }
  },
  computed: {
    id: function() { return this.$route.query.id },
    type: function() { return this.$route.params.type }
  },
  async created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var obj = []
      var children = []
      for (var i = 1; i < 11; i++) {
        obj = {
          'id': i,
          subBrandNum: 'SBD000' + i,
          subBrandName: 'MERRIES EXTRA DRY' + i,
          netsales_1: (10000 * Math.random()).toFixed(2),
          spd_1: (10000 * Math.random()).toFixed(2),
          spmk_1: (10000 * Math.random()).toFixed(2),
          netsales_2: (10000 * Math.random()).toFixed(2),
          spd_2: (10000 * Math.random()).toFixed(2),
          spmk_2: (10000 * Math.random()).toFixed(2),
          netsales_3: (10000 * Math.random()).toFixed(2),
          spd_3: (10000 * Math.random()).toFixed(2),
          spmk_3: (10000 * Math.random()).toFixed(2),
          netsales_4: (10000 * Math.random()).toFixed(2),
          spd_4: (10000 * Math.random()).toFixed(2),
          spmk_4: (10000 * Math.random()).toFixed(2),
          netsales_5: (10000 * Math.random()).toFixed(2),
          spd_5: (10000 * Math.random()).toFixed(2),
          spmk_5: (10000 * Math.random()).toFixed(2),
          netsales_6: (10000 * Math.random()).toFixed(2),
          spd_6: (10000 * Math.random()).toFixed(2),
          spmk_6: (10000 * Math.random()).toFixed(2),
          netsales_7: (10000 * Math.random()).toFixed(2),
          spd_7: (10000 * Math.random()).toFixed(2),
          spmk_7: (10000 * Math.random()).toFixed(2),
          netsales_8: (10000 * Math.random()).toFixed(2),
          spd_8: (10000 * Math.random()).toFixed(2),
          spmk_8: (10000 * Math.random()).toFixed(2),
          netsales_9: (10000 * Math.random()).toFixed(2),
          spd_9: (10000 * Math.random()).toFixed(2),
          spmk_9: (10000 * Math.random()).toFixed(2),
          netsales_10: (10000 * Math.random()).toFixed(2),
          spd_10: (10000 * Math.random()).toFixed(2),
          spmk_10: (10000 * Math.random()).toFixed(2),
          netsales_11: (10000 * Math.random()).toFixed(2),
          spd_11: (10000 * Math.random()).toFixed(2),
          spmk_11: (10000 * Math.random()).toFixed(2),
          netsales_12: (10000 * Math.random()).toFixed(2),
          spd_12: (10000 * Math.random()).toFixed(2),
          spmk_12: (10000 * Math.random()).toFixed(2),
          'children': []
        }
        for (var j = 1; j < 4; j++) {
          children = {
            'id': i + '00' + j,
            skuName: 'MRS-ED NB 90x2 1809' + j,
            sku: 'SKU0000' + j,
            netsales_1: (10000 * Math.random()).toFixed(2),
            spd_1: (10000 * Math.random()).toFixed(2),
            spmk_1: (10000 * Math.random()).toFixed(2),
            netsales_2: (10000 * Math.random()).toFixed(2),
            spd_2: (10000 * Math.random()).toFixed(2),
            spmk_2: (10000 * Math.random()).toFixed(2),
            netsales_3: (10000 * Math.random()).toFixed(2),
            spd_3: (10000 * Math.random()).toFixed(2),
            spmk_3: (10000 * Math.random()).toFixed(2),
            netsales_4: (10000 * Math.random()).toFixed(2),
            spd_4: (10000 * Math.random()).toFixed(2),
            spmk_4: (10000 * Math.random()).toFixed(2),
            netsales_5: (10000 * Math.random()).toFixed(2),
            spd_5: (10000 * Math.random()).toFixed(2),
            spmk_5: (10000 * Math.random()).toFixed(2),
            netsales_6: (10000 * Math.random()).toFixed(2),
            spd_6: (10000 * Math.random()).toFixed(2),
            spmk_6: (10000 * Math.random()).toFixed(2),
            netsales_7: (10000 * Math.random()).toFixed(2),
            spd_7: (10000 * Math.random()).toFixed(2),
            spmk_7: (10000 * Math.random()).toFixed(2),
            netsales_8: (10000 * Math.random()).toFixed(2),
            spd_8: (10000 * Math.random()).toFixed(2),
            spmk_8: (10000 * Math.random()).toFixed(2),
            netsales_9: (10000 * Math.random()).toFixed(2),
            spd_9: (10000 * Math.random()).toFixed(2),
            spmk_9: (10000 * Math.random()).toFixed(2),
            netsales_10: (10000 * Math.random()).toFixed(2),
            spd_10: (10000 * Math.random()).toFixed(2),
            spmk_10: (10000 * Math.random()).toFixed(2),
            netsales_11: (10000 * Math.random()).toFixed(2),
            spd_11: (10000 * Math.random()).toFixed(2),
            spmk_11: (10000 * Math.random()).toFixed(2),
            netsales_12: (10000 * Math.random()).toFixed(2),
            spd_12: (10000 * Math.random()).toFixed(2),
            spmk_12: (10000 * Math.random()).toFixed(2)
          }
          obj.children.push(children)
        }
        this.customerSkuList.push(obj)
        this.tableDolayout(this.$refs['table'])
      }
    },
    handleSeleCustomerSku() {
      this.customerSkuSelectDialog = true
    },
    handleSeleCustomerBrand() {
      this.customerBrandSelectDialog = true
    },
    handleBack() {
      this.$router.go(-1)
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (index > 3) {
          sums[index] = numberFormat(values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0), 2)
          sums[index]
        } else {
          sums[index] = '--'
        }
      })
      return sums
    }
    // open(row, expanded) {
    //   this.$nextTick(() => {
    //     var obj = document.getElementsByTagName('table')
    //     document.getElementById('table').style.height = obj[0].clientHeight + obj[1].clientHeight + obj[2].clientHeight + 2 + 'px'
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">

</style>
