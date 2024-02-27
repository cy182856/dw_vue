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
                客户编号
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
                品牌编号
              </div>
              <div class="input">
                <el-input v-model="brandNum" clearable />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                品牌名称
              </div>
              <div class="input">
                <el-input v-model="brandName" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                Sub品牌编号
              </div>
              <div class="input">
                <el-input v-model="subBrandNum" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                Sub品牌名称
              </div>
              <div class="input">
                <el-input v-model="subBrandName" clearable />
              </div>
            </div>
          </div>
          <div class="search_table_row">
            <el-button icon="el-icon-search" class="editbtn" circle />
            <el-button icon="el-icon-refresh" circle />
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
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column prop="subBrandNum" :label="'Sub品牌编号'" width="180" show-overflow-tooltip />
            <el-table-column prop="subBrandName" :label="'Sub品牌名称'" width="180" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <a @click="handleSeleCustomerBrand">{{ scope.row.subBrandName }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="sku" :label="'SKU编号'" width="180" align="center" show-overflow-tooltip />
            <el-table-column prop="skuName" :label="'SKU名称'" width="180" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <a @click="handleSeleCustomerSku(scope.row.id)">{{ scope.row.skuName }}</a>
              </template>
            </el-table-column>
            <template v-for="item in headerMonth">
              <el-table-column :key="item" prop :label="item + '月'">
                <el-table-column :prop="'netsales_'+item" :label="'Netsales'" align="right">
                  <template slot-scope="scope">
                    {{ scope.row['netsales_'+item] | numFormat(2) }}
                  </template>
                </el-table-column>
                <el-table-column :prop="'spd_1'+item" :label="'SPD'" align="right">
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

        <!-- 下载模板 -->
        <li v-if="type==='edit'" class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">下载模板</span>
        </li>
        <!-- 上传数据 -->
        <li v-if="type==='edit'" class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-upload" /></span>
          <span class="operation-text">上传数据</span>
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
      <customer-pop :is-show="customerSkuSelectDialog" :month="month" :editable="type==='make'" @cancel="customerSkuSelectDialog=false" />
      <customer-brand-pop :is-show="customerBrandSelectDialog" :editable="type==='make'" @cancel="customerBrandSelectDialog=false" />
    </div>
  </div>
</template>
<script>
import CustomerPop from '@/views/est/components/EstCustomerSku'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
import CustomerBrandPop from '@/views/est/components/EstCustomerBrand'
import { dateFormat } from '@/utils/util'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'EstCustomer',
  components: { CustomerPop, CustomerBrandPop },
  mixins: [names, formValidator, numFormat],
  data() {
    return {
      isLoading: false,
      customerSkuList: [],
      customerSkuSelectDialog: false,
      customerBrandSelectDialog: false,
      accountNum: 'CUS20120001',
      accountName: '沃尔玛',
      brandName: '',
      brandNum: '',
      subBrandName: '',
      subBrandNum: '',
      activeNames: ['1', '2', '3', '4'],
      memo: '备注',
      historyDialog: false,
      approveHisDialog: false,
      versionDialog: false,
      fileList: [],
      month: '',
      headerMonth: [],
      id: ''
    }
  },
  computed: {
    type: function() { return this.$route.params.type }
  },
  async created() {
    this.month = Number(dateFormat(new Date(), 'M'))
    this.headerMonth = [
      this.month,
      (this.month + 1) === 12 ? 12 : (this.month + 1) % 12,
      (this.month + 2) === 12 ? 12 : (this.month + 2) % 12,
      (this.month + 3) === 12 ? 12 : (this.month + 3) % 12,
      (this.month + 4) === 12 ? 12 : (this.month + 4) % 12,
      (this.month + 5) === 12 ? 12 : (this.month + 5) % 12,
      (this.month + 6) === 12 ? 12 : (this.month + 6) % 12
    ]
    this.fetchData()
  },
  methods: {
    fetchData() {
      var obj = []
      var children = []
      for (var i = 1; i < 11; i++) {
        obj = {
          id: i,
          subBrandNum: 'SBD000' + i,
          subBrandName: 'MERRIES EXTRA DRY' + i,
          netsales: (10000 * Math.random()).toFixed(2),
          spd: (10000 * Math.random()).toFixed(2),
          spmk: (10000 * Math.random()).toFixed(2),
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
          children: []
        }
        for (var j = 1; j < 4; j++) {
          children = {
            id: i + '&' + j,
            skuName: 'MRS-ED NB 90x2 1809' + j,
            sku: 'SKU0000' + j,
            netsales: (10000 * Math.random()).toFixed(2),
            spd: (10000 * Math.random()).toFixed(2),
            spmk: (10000 * Math.random()).toFixed(2),
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
      }
    },
    handleSeleCustomerSku(month) {
      // this.month = 3
      this.customerSkuSelectDialog = true
    },
    handleSeleCustomerBrand() {
      this.customerBrandSelectDialog = true
    },
    handleBack() {
      this.$router.go(-1)
    }
    // open(row, expanded) {
    //   this.$nextTick(() => {
    //     var obj = document.getElementsByTagName('table')
    //     console.log(obj[0].clientHeight + obj[1].clientHeight + 2 + 'px')
    //     document.getElementById('table').style.height = obj[0].clientHeight + obj[1].clientHeight + 2 + 'px'
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">

</style>
