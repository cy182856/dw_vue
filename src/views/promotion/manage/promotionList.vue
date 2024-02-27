<template>
  <!-- 编辑画面 -->
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        查询条件
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <!-- <el-select v-model="searchParam.params.department" placeholder="请选择">
                  <el-option
                    v-for="item in department"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
                <dict-select v-model="searchParam.params.targetOrg" dict-type-id="Dept" :disabled="disabled" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.month" size="small" type="month" :clearable="false" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商
              </el-col>
              <el-col :span="16">
                <rel-func-select v-model="searchParam.params.accounts" rel-func="account" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>重置</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
          <p>查询</p>
          <span
            class="circle-larger-btn btn-light-color bluebg"
          ><i
            class="iconfont iconsousuo"
          /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <!-- <ul class="operation-box">
        <li class="operation-item" @click="update()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text">上传</span>
        </li>
        <li class="operation-item" @click="download()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">下载</span>
        </li>
      </ul> -->
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="budgettable"
            :header-cell-style="{'text-align':'center'}"
            :data="dataList"
            border
            height="100%"
          >
            <el-table-column prop="department" label="部门" min-width="100" align="center" />
            <el-table-column prop="month" label="年月" min-width="90" align="center" />
            <el-table-column prop="agent" label="代理商" min-width="120" align="center">
              <!-- <template slot-scope="scope">
                {{ scope.row.agent }}
              </template> -->
            </el-table-column>
            <el-table-column type="expand" width="20" align="center">
              <template slot-scope="props">
                <el-table
                  ref="table1"
                  class="table-expand"
                  :data="props.row.children"
                  :header-cell-style="{'text-align':'center'}"
                  border
                >
                  <el-table-column prop="product" label="产品" width="100" align="center" />
                  <el-table-column label="预算" align="center">
                    <el-table-column prop="budQty" label="销售数量" width="90" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.budQty|numFormat(0) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="budAmount" label="销售金额" width="90" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.budAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="budFixedFee" label="固定费" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.budFixedFee|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="budFixedFeePer" label="固定费比" width="100" align="right" />
                    <el-table-column prop="budVariableFee" label="变动费" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.budVariableFee|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="budVariableFeePer" label="变动费比" width="100" align="right" />
                    <el-table-column prop="budContractRebate" label="合同返利" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.budContractRebate|numFormat(2) }}
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="最新预估（N+1～N+3）" align="center">
                    <el-table-column prop="lastEstQty" label="销售数量" width="90" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.lastEstQty|numFormat(0) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastEstAmount" label="销售金额" width="90" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.lastEstAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastEstAgentDeliveryQty" label="代理商出库数量" width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.lastEstAgentDeliveryQty|numFormat(0) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastEstAgentDeliveryAmount" label="代理商出库金额" width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.lastEstAgentDeliveryAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastEstFixedFee" label="固定费" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.lastEstFixedFee|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastEstFixedFeePer" label="固定费比" width="100" align="right" />
                    <el-table-column prop="lastEstVariableFee" label="变动费" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.lastEstVariableFee|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastEstVariableFeePer" label="变动费比" width="100" align="right" />
                    <el-table-column prop="lastEstContractRebate" label="合同返利" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.lastEstContractRebate|numFormat(2) }}
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="精准预估" align="center">
                    <el-table-column prop="accurateEstQty" label="销售数量" width="90" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.accurateEstQty|numFormat(0) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="accurateEstAmount" label="销售金额" width="90" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.accurateEstAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="accurateEstAgentDeliveryQty" label="代理商出库数量" width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.accurateEstAgentDeliveryQty|numFormat(0) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="accurateEstAgentDeliveryAmount" label="代理商出库金额" width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.accurateEstAgentDeliveryAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="accurateEstFixedFee" label="固定费" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.accurateEstFixedFee|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="accurateEstFixedFeePer" label="固定费比" width="100" align="right" />
                    <el-table-column prop="accurateEstVariableFee" label="变动费" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.accurateEstVariableFee|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="accurateEstVariableFeePer" label="变动费比" width="100" align="right" />
                    <el-table-column prop="accurateEstContractRebate" label="合同返利" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.accurateEstContractRebate|numFormat(2) }}
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="核销/支付" align="center">
                    <el-table-column prop="cancelPayQty" label="销售数量" width="90" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.cancelPayQty|numFormat(0) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="cancelPayAmount" label="销售金额" width="90" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.cancelPayAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="cancelPayAgentDeliveryQty" label="代理商出库数量" width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.cancelPayAgentDeliveryQty|numFormat(0) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="cancelPayAgentDeliveryAmount" label="代理商出库金额" width="120" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.cancelPayAgentDeliveryAmount|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="cancelPayFixedFee" label="固定费" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.cancelPayFixedFee|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="cancelPayFixedFeePer" label="固定费比" width="100" align="right" />
                    <el-table-column prop="cancelPayVariableFee" label="变动费" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.cancelPayVariableFee|numFormat(2) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="cancelPayVariableFeePer" label="变动费比" width="100" align="right" />
                    <el-table-column prop="cancelPayContractRebate" label="合同返利" width="100" align="right">
                      <template slot-scope="scope">
                        {{ scope.row.cancelPayContractRebate|numFormat(2) }}
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="预算" align="center">
              <el-table-column prop="budQty" label="销售数量" width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.budQty|numFormat(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="budAmount" label="销售金额" width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.budAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="budFixedFee" label="固定费" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.budFixedFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="budFixedFeePer" label="固定费比" width="100" align="right" />
              <el-table-column prop="budVariableFee" label="变动费" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.budVariableFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="budVariableFeePer" label="变动费比" width="100" align="right" />
              <el-table-column prop="budContractRebate" label="合同返利" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.budContractRebate|numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="最新预估（N+1～N+3）" align="center">
              <el-table-column prop="lastEstQty" label="销售数量" width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.lastEstQty|numFormat(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="lastEstAmount" label="销售金额" width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.lastEstAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="lastEstAgentDeliveryQty" label="代理商出库数量" width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.lastEstAgentDeliveryQty|numFormat(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="lastEstAgentDeliveryAmount" label="代理商出库金额" width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.lastEstAgentDeliveryAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="lastEstFixedFee" label="固定费" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.lastEstFixedFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="lastEstFixedFeePer" label="固定费比" width="100" align="right" />
              <el-table-column prop="lastEstVariableFee" label="变动费" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.lastEstVariableFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="lastEstVariableFeePer" label="变动费比" width="100" align="right" />
              <el-table-column prop="lastEstContractRebate" label="合同返利" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.lastEstContractRebate|numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="精准预估" align="center">
              <el-table-column prop="accurateEstQty" label="销售数量" width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.accurateEstQty|numFormat(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="accurateEstAmount" label="销售金额" width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.accurateEstAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="accurateEstAgentDeliveryQty" label="代理商出库数量" width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.accurateEstAgentDeliveryQty|numFormat(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="accurateEstAgentDeliveryAmount" label="代理商出库金额" width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.accurateEstAgentDeliveryAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="accurateEstFixedFee" label="固定费" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.accurateEstFixedFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="accurateEstFixedFeePer" label="固定费比" width="100" align="right" />
              <el-table-column prop="accurateEstVariableFee" label="变动费" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.accurateEstVariableFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="accurateEstVariableFeePer" label="变动费比" width="100" align="right" />
              <el-table-column prop="accurateEstContractRebate" label="合同返利" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.accurateEstContractRebate|numFormat(2) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="核销/支付" align="center">
              <el-table-column prop="cancelPayQty" label="销售数量" width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.cancelPayQty|numFormat(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="cancelPayAmount" label="销售金额" width="90" align="right">
                <template slot-scope="scope">
                  {{ scope.row.cancelPayAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="cancelPayAgentDeliveryQty" label="代理商出库数量" width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.cancelPayAgentDeliveryQty|numFormat(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="cancelPayAgentDeliveryAmount" label="代理商出库金额" width="120" align="right">
                <template slot-scope="scope">
                  {{ scope.row.cancelPayAgentDeliveryAmount|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="cancelPayFixedFee" label="固定费" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.cancelPayFixedFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="cancelPayFixedFeePer" label="固定费比" width="100" align="right" />
              <el-table-column prop="cancelPayVariableFee" label="变动费" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.cancelPayVariableFee|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="cancelPayVariableFeePer" label="变动费比" width="100" align="right" />
              <el-table-column prop="cancelPayContractRebate" label="合同返利" width="100" align="right">
                <template slot-scope="scope">
                  {{ scope.row.cancelPayContractRebate|numFormat(2) }}
                </template>
              </el-table-column>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import { numFormat } from '@/mixins/num-format'
// import { getList } from '@/api/bgt/bgtpreview.js'
export default {
  components: { RelFuncSelect },
  mixins: [search, numFormat],
  data() {
    return {
      isLoading: false,
      // department: [{
      //   value: '1',
      //   label: '战略1课'
      // }, {
      //   value: '2',
      //   label: '战略2课'
      // }, {
      //   value: '3',
      //   label: '销售推进部'
      // }, {
      //   value: '4',
      //   label: 'EC部'
      // }],
      year: '2021',
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: 400, // 总条数
        params: {
          targetOrg: '',
          month: new Date(),
          // department: '',
          agent: '请输入名称'
        }
      },
      dataList: [
        {
          id: '1', department: '战略1课', month: '2021-04', agent: '深圳弘道',
          budQty: 100,	budAmount: 5000.23,	budFixedFee: 1000.11,	budFixedFeePer: '15.2%',	budVariableFee: 1200.11, 	budVariableFeePer: '17.2%', 	budContractRebate: 2500.33,
          lastEstQty: 110,	lastEstAmount: 6000,	lastEstAgentDeliveryQty: 90,	lastEstAgentDeliveryAmount: 3000,	lastEstFixedFee: 1500,	lastEstFixedFeePer: '16.7%',	lastEstVariableFee: 1500.76, 	lastEstVariableFeePer: '20.3%', 	lastEstContractRebate: 3000.65,
          accurateEstQty: 110,	accurateEstAmount: 6000,	accurateEstAgentDeliveryQty: 90,	accurateEstAgentDeliveryAmount: 3000,	accurateEstFixedFee: 1500,	accurateEstFixedFeePer: '16.7%',	accurateEstVariableFee: 1500.76, 	accurateEstVariableFeePer: '20.3%', 	accurateEstContractRebate: 3000.65,
          cancelPayQty: 110,	cancelPayAmount: 6000,	cancelPayAgentDeliveryQty: 90,	cancelPayAgentDeliveryAmount: 3000,	cancelPayFixedFee: 1500,	cancelPayFixedFeePer: '16.7%',	cancelPayVariableFee: 1500.76, 	cancelPayVariableFeePer: '20.3%', 	cancelPayContractRebate: 3000.65,
          children: [
            { id: '1-1', product: '环贴式纸尿裤',
              budQty: 100 / 2,	budAmount: 5000.23 / 2,	budFixedFee: 1000.11 / 2,	budFixedFeePer: '15.2%',	budVariableFee: 1200.11 / 2, 	budVariableFeePer: '17.2%', 	budContractRebate: 2500.33 / 2,
              lastEstQty: 110,	lastEstAmount: 6000 / 2,	lastEstAgentDeliveryQty: 90 / 2,	lastEstAgentDeliveryAmount: 3000 / 2,	lastEstFixedFee: 1500 / 2,	lastEstFixedFeePer: '17.7%',	lastEstVariableFee: 1500.76 / 2, 	lastEstVariableFeePer: '20.3%', 	lastEstContractRebate: 3000.65 / 2,
              accurateEstQty: 110 / 2,	accurateEstAmount: 6000 / 2,	accurateEstAgentDeliveryQty: 90 / 2,	accurateEstAgentDeliveryAmount: 3000 / 2,	accurateEstFixedFee: 1500 / 2,	accurateEstFixedFeePer: '19.7%',	accurateEstVariableFee: 1500.76 / 2, 	accurateEstVariableFeePer: '20.3%', 	accurateEstContractRebate: 3000.65 / 2,
              cancelPayQty: 110 / 2,	cancelPayAmount: 6000 / 2,	cancelPayAgentDeliveryQty: 90 / 2,	cancelPayAgentDeliveryAmount: 3000 / 2,	cancelPayFixedFee: 1500 / 2,	cancelPayFixedFeePer: '16.3%',	cancelPayVariableFee: 1500.76 / 2, 	cancelPayVariableFeePer: '20.3%', 	cancelPayContractRebate: 3000.65 / 2 },
            { id: '1-2', product: '柔婴儿纸尿裤',
              budQty: 100 / 2,	budAmount: 5000.23 / 2,	budFixedFee: 1000.11 / 2,	budFixedFeePer: '15.2%',	budVariableFee: 1200.11 / 2, 	budVariableFeePer: '17.2%', 	budContractRebate: 2500.33 / 2,
              lastEstQty: 110,	lastEstAmount: 6000 / 2,	lastEstAgentDeliveryQty: 90 / 2,	lastEstAgentDeliveryAmount: 3000 / 2,	lastEstFixedFee: 1500 / 2,	lastEstFixedFeePer: '33.7%',	lastEstVariableFee: 1500.76 / 2, 	lastEstVariableFeePer: '20.3%', 	lastEstContractRebate: 3000.65 / 2,
              accurateEstQty: 110 / 2,	accurateEstAmount: 6000 / 2,	accurateEstAgentDeliveryQty: 90 / 2,	accurateEstAgentDeliveryAmount: 3000 / 2,	accurateEstFixedFee: 1500 / 2,	accurateEstFixedFeePer: '26.5%',	accurateEstVariableFee: 1500.76 / 2, 	accurateEstVariableFeePer: '20.3%', 	accurateEstContractRebate: 3000.65 / 2,
              cancelPayQty: 110 / 2,	cancelPayAmount: 6000 / 2,	cancelPayAgentDeliveryQty: 90 / 2,	cancelPayAgentDeliveryAmount: 3000 / 2,	cancelPayFixedFee: 1500 / 2,	cancelPayFixedFeePer: '26.4%',	cancelPayVariableFee: 1500.76 / 2, 	cancelPayVariableFeePer: '20.3%', 	cancelPayContractRebate: 3000.65 / 2 }
          ]
        },
        {
          id: '2', department: '战略2课', month: '2021-04', agent: '深圳弘道',
          budQty: 100 * 2,	budAmount: 5000.23 * 2,	budFixedFee: 1000.11 * 2,	budFixedFeePer: '15.2%',	budVariableFee: 1200.11 * 2, 	budVariableFeePer: '17.2%', 	budContractRebate: 2500.33,
          lastEstQty: 110 * 2,	lastEstAmount: 6000 * 2,	lastEstAgentDeliveryQty: 90 * 2,	lastEstAgentDeliveryAmount: 3000 * 2,	lastEstFixedFee: 1500 * 2,	lastEstFixedFeePer: '16.7%',	lastEstVariableFee: 1500.76 * 2, 	lastEstVariableFeePer: '20.3%', 	lastEstContractRebate: 3000.65 * 2,
          accurateEstQty: 110 * 2,	accurateEstAmount: 6000 * 2,	accurateEstAgentDeliveryQty: 90 * 2,	accurateEstAgentDeliveryAmount: 3000 * 2,	accurateEstFixedFee: 1500 * 2,	accurateEstFixedFeePer: '16.7%',	accurateEstVariableFee: 1500.76, 	accurateEstVariableFeePer: '20.3%', 	accurateEstContractRebate: 3000.65 * 2,
          cancelPayQty: 110 * 2,	cancelPayAmount: 6000 * 2,	cancelPayAgentDeliveryQty: 90 * 2,	cancelPayAgentDeliveryAmount: 3000 * 2,	cancelPayFixedFee: 1500 * 2,	cancelPayFixedFeePer: '16.7%',	cancelPayVariableFee: 1500.76 * 2, 	cancelPayVariableFeePer: '20.3%', 	cancelPayContractRebate: 3000.65 * 2,
          children: [
            { id: '2-1', product: '环贴式纸尿裤',
              budQty: 100 * 2 / 2,	budAmount: 5000.23 * 2 / 2,	budFixedFee: 1000.11 * 2 / 2,	budFixedFeePer: '15.2%',	budVariableFee: 1200.11 * 2 / 2, 	budVariableFeePer: '17.2%', 	budContractRebate: 2500.33 * 2 / 2,
              lastEstQty: 110,	lastEstAmount: 6000 * 2 / 2,	lastEstAgentDeliveryQty: 90 * 2 / 2,	lastEstAgentDeliveryAmount: 3000 * 2 / 2,	lastEstFixedFee: 1500 * 2 / 2,	lastEstFixedFeePer: '15.7%',	lastEstVariableFee: 1500.76 * 2 / 2, 	lastEstVariableFeePer: '20.3%', 	lastEstContractRebate: 3000.65 * 2 / 2,
              accurateEstQty: 110 * 2 / 2,	accurateEstAmount: 6000 * 2 / 2,	accurateEstAgentDeliveryQty: 90 * 2 / 2,	accurateEstAgentDeliveryAmount: 3000 * 2 / 2,	accurateEstFixedFee: 1500 * 2 / 2,	accurateEstFixedFeePer: '36.7%',	accurateEstVariableFee: 1500.76 * 2 / 2, 	accurateEstVariableFeePer: '20.3%', 	accurateEstContractRebate: 3000.65 * 2 / 2,
              cancelPayQty: 110 * 2 / 2,	cancelPayAmount: 6000 * 2 / 2,	cancelPayAgentDeliveryQty: 90 * 2 / 2,	cancelPayAgentDeliveryAmount: 3000 * 2 / 2,	cancelPayFixedFee: 1500 * 2 / 2,	cancelPayFixedFeePer: '26.7%',	cancelPayVariableFee: 1500.76 * 2 / 2, 	cancelPayVariableFeePer: '20.3%', 	cancelPayContractRebate: 3000.65 * 2 / 2 },
            { id: '2-2', product: '柔婴儿纸尿裤',
              budQty: 100 * 2 / 2,	budAmount: 5000.23 * 2 / 2,	budFixedFee: 1000.11 * 2 / 2,	budFixedFeePer: '15.2%',	budVariableFee: 1200.11 * 2 / 2, 	budVariableFeePer: '17.2%', 	budContractRebate: 2500.33 * 2 / 2,
              lastEstQty: 110,	lastEstAmount: 6000 * 2 / 2,	lastEstAgentDeliveryQty: 90 * 2 / 2,	lastEstAgentDeliveryAmount: 3000 * 2 / 2,	lastEstFixedFee: 1500 * 2 / 2,	lastEstFixedFeePer: '16.9%',	lastEstVariableFee: 1500.76 * 2 / 2, 	lastEstVariableFeePer: '20.3%', 	lastEstContractRebate: 3000.65 * 2 / 2,
              accurateEstQty: 110 * 2 / 2,	accurateEstAmount: 6000 * 2 / 2,	accurateEstAgentDeliveryQty: 90 * 2 / 2,	accurateEstAgentDeliveryAmount: 3000 * 2 / 2,	accurateEstFixedFee: 1500 * 2 / 2,	accurateEstFixedFeePer: '16.7%',	accurateEstVariableFee: 1500.76 * 2 / 2, 	accurateEstVariableFeePer: '20.3%', 	accurateEstContractRebate: 3000.65 * 2 / 2,
              cancelPayQty: 110 * 2 / 2,	cancelPayAmount: 6000 * 2 / 2,	cancelPayAgentDeliveryQty: 90 * 2 / 2,	cancelPayAgentDeliveryAmount: 3000 * 2 / 2,	cancelPayFixedFee: 1500 * 2 / 2,	cancelPayFixedFeePer: '26.7%',	cancelPayVariableFee: 1500.76 * 2 / 2, 	cancelPayVariableFeePer: '20.3%', 	cancelPayContractRebate: 3000.65 * 2 / 2 }
          ]
        }, {
          id: '3', department: '销售推进部', month: '2021-04', agent: '深圳弘道',
          budQty: 100 * 3,	budAmount: 5000.23 * 3,	budFixedFee: 1000.11 * 3,	budFixedFeePer: '15.2%',	budVariableFee: 1200.11 * 3, 	budVariableFeePer: '17.2%', 	budContractRebate: 2500.33,
          lastEstQty: 110 * 3,	lastEstAmount: 6000 * 3,	lastEstAgentDeliveryQty: 90 * 3,	lastEstAgentDeliveryAmount: 3000 * 3,	lastEstFixedFee: 1500 * 3,	lastEstFixedFeePer: '14.7%',	lastEstVariableFee: 1500.76 * 3, 	lastEstVariableFeePer: '20.3%', 	lastEstContractRebate: 3000.65 * 3,
          accurateEstQty: 110 * 3,	accurateEstAmount: 6000 * 3,	accurateEstAgentDeliveryQty: 90 * 3,	accurateEstAgentDeliveryAmount: 3000 * 3,	accurateEstFixedFee: 1500 * 3,	accurateEstFixedFeePer: '31.7%',	accurateEstVariableFee: 1500.76, 	accurateEstVariableFeePer: '20.3%', 	accurateEstContractRebate: 3000.65 * 3,
          cancelPayQty: 110 * 3,	cancelPayAmount: 6000 * 3,	cancelPayAgentDeliveryQty: 90 * 3,	cancelPayAgentDeliveryAmount: 3000 * 3,	cancelPayFixedFee: 1500 * 3,	cancelPayFixedFeePer: '16.9%',	cancelPayVariableFee: 1500.76 * 3, 	cancelPayVariableFeePer: '20.3%', 	cancelPayContractRebate: 3000.65 * 3,
          children: [
            { id: '3-1', product: '环贴式纸尿裤',
              budQty: 100 * 3,	budAmount: 5000.23 * 3,	budFixedFee: 1000.11 * 3,	budFixedFeePer: '15.2%',	budVariableFee: 1200.11 * 3, 	budVariableFeePer: '17.2%', 	budContractRebate: 2500.33 * 3,
              lastEstQty: 110,	lastEstAmount: 6000 * 3,	lastEstAgentDeliveryQty: 90 * 3,	lastEstAgentDeliveryAmount: 3000 * 3,	lastEstFixedFee: 1500 * 3,	lastEstFixedFeePer: '15.7%',	lastEstVariableFee: 1500.76 * 3, 	lastEstVariableFeePer: '20.3%', 	lastEstContractRebate: 3000.65 * 3,
              accurateEstQty: 110 * 3,	accurateEstAmount: 6000 * 3,	accurateEstAgentDeliveryQty: 90 * 3,	accurateEstAgentDeliveryAmount: 3000 * 3,	accurateEstFixedFee: 1500 * 3,	accurateEstFixedFeePer: '19.7%',	accurateEstVariableFee: 1500.76 * 3, 	accurateEstVariableFeePer: '20.3%', 	accurateEstContractRebate: 3000.65 * 3,
              cancelPayQty: 110 * 3,	cancelPayAmount: 6000 * 3,	cancelPayAgentDeliveryQty: 90 * 3,	cancelPayAgentDeliveryAmount: 3000 * 3,	cancelPayFixedFee: 1500 * 3,	cancelPayFixedFeePer: '15.7%',	cancelPayVariableFee: 1500.76 * 3, 	cancelPayVariableFeePer: '20.3%', 	cancelPayContractRebate: 3000.65 * 3 }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    disabled() {
      let isSelect = true
      let isFlag = false
      if (this.userInfo.roleList.includes('ROLE_WF_MARKET') || this.userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY')) {
        return false
      }
      if (this.$store.getters.dictList.Dept) {
        const deptList = this.$store.getters.dictList.Dept
        const targetList = this.$store.getters.dictList.TARGETORG
        let orgId = ''
        if (deptList && targetList) {
          for (let i = 0; i < deptList.length; i++) {
            for (let s = 0; s < targetList.length; s++) {
              if (targetList[s].dictName === deptList[i].dictId) {
                orgId = targetList[s].dictId
                // console.log(this.userInfo.orgSeqNo.indexOf(orgId), orgId, this.userInfo.orgSeqNo, 1090)
                if (this.userInfo.orgSeqNo.indexOf(orgId) !== -1) {
                  isFlag = true
                  break
                }
              }
            }
          }
        }

        if (!isFlag) {
          isSelect = false
        }
      }
      return isSelect
    }
  },
  created() {
    this.searchParam.params.targetOrg = this.orgIdCom
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.searchList()
    },
    async searchList() {
      // console.log(this.searchParam.params.month)
      // if (!this.searchParam.params.month) {
      //   this.$message({
      //     type: 'error',
      //     message: '查询条件中，月度不能为空！'
      //   })
      //   return false
      // }
      // this.isLoading = true
      // const res = await getList(this.searchParam.params)
      // if (res && res.success) {
      //   const results = res.datas.list
      //   this.strategyList = results
      //   this.isLoading = false
      // }
    },
    reset() { },
    search() { },
    toLastPage() { },
    toFirstPage() { },
    update() {
    }

  }
}
</script>
