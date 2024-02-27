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
          :model="searchParam.params"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                对象年月:
              </el-col>
              <el-col :span="16">
                <el-date-picker v-model="searchParam.params.targetYm" size="small" value-format="yyyy-MM" :placeholder="'请选择'" type="month" :clearable="false" :picker-options="pickerOptions0" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                代理商:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.custName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.submitOrg" dict-type-id="Dept" :filter2="happenYear" :clearable="false" :disabled="disabled" @change="submitChange" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                一级费目:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.accountType" dict-type-id="AccountTypeView" @change="accountChange" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                二级费目:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.finAccountCode" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in fees2"
                    :key="item.accountCode"
                    :label="item.accountName"
                    :value="item.accountCode"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                大区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                小区:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.area2" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("customerprice.category") }}:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.productCategory" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                不合作代理商:
              </el-col>
              <el-col :span="16">
                <dict-select v-model="searchParam.params.collaborateCustomer" dict-type-id="IsNo" placeholder="请选择" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
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
        <li class="operation-item" @click="addTable">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">新建</span>
        </li>
        <li class="operation-item" @click="saveList">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">保存</span>
        </li>
        <li class="operation-item" @click="amountAdjustDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">固定费调整</span>
        </li>
        <li v-show="submitOrg2==='STRATEGY-SECTION-1'||submitOrg2==='STRATEGY-SECTION-1W'||submitOrg2==='STRATEGY-SECTION-1B'" class="operation-item" @click="downloadAct('date')">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">日别活动调整</span>
        </li>
        <li v-show="submitOrg2==='STRATEGY-SECTION-1'||submitOrg2==='STRATEGY-SECTION-1W'||submitOrg2==='STRATEGY-SECTION-1B'" class="operation-item" @click="uploadDayDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">日别活动上传</span>
        </li>
        <li v-show="submitOrg2==='STRATEGY-SECTION-1'||submitOrg2==='STRATEGY-SECTION-1W'||submitOrg2==='STRATEGY-SECTION-1B'||submitOrg2==='STRATEGY-SECTION-2'||submitOrg2==='STRATEGY-SECTION-2F'||submitOrg2==='EC-DEPT'" class="operation-item" @click="downloadAct('month')">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">月别活动调整</span>
        </li>
        <li v-show="submitOrg2==='STRATEGY-SECTION-1'||submitOrg2==='STRATEGY-SECTION-1W'||submitOrg2==='STRATEGY-SECTION-1B'||submitOrg2==='STRATEGY-SECTION-2'||submitOrg2==='STRATEGY-SECTION-2F'||submitOrg2==='EC-DEPT'" class="operation-item" @click="uploadMonthDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">月别活动上传</span>
        </li>
        <li class="operation-item" @click="downloadFix()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">品类别下载</span>
        </li>
        <li v-if="searchParam.params.submitOrg==='STRATEGY-SECTION-2' || searchParam.params.submitOrg==='STRATEGY-SECTION-2F'" class="operation-item" @click="downloadChange()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">SKU别下载</span>
        </li>
        <li class="operation-item" @click="downloadSerail()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">系列别下载</span>
        </li>
        <li class="operation-item" @click="uploadAdjustDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text">精准预估上传</span>
        </li>
        <li class="operation-item" @click="downloadNoCust()">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">费目别下载</span>
        </li>
        <li class="operation-item" @click="uploadNoCustAdjustDialog=true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text">费目别上传</span>
        </li>
        <li class="operation-item operation-item-reverse" @click="handleSumDialog">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-info"
          /></span>
          <span class="operation-text">汇总查看</span>
        </li>
        <li class="operation-item" @click="deleteList">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">删除</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="strategyList"
            class="specaitable"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
            row-key="id"
            :expand-row-keys="expand"
            @selection-change="handleSelectionChange"
            @expand-change="expandChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
              :selectable="selectInit"
            />
            <el-table-column
              label="提示警告"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-popover
                  v-if="(scope.row.ECicon===true)&&(searchParam.params.submitOrg==='EC-DEPT')"
                  placement="top-start"
                  trigger="hover"
                  :content="'精准预估金额超过月度比例，月度基准比例为：'+scope.row.ECiconNum"
                >
                  <div slot="reference">
                    <span class="el-icon-warning" style="font-size:20px;color:orange;" />
                  </div>
                </el-popover>
                <el-popover
                  v-if="(scope.row.ECicon2===true)&&(searchParam.params.submitOrg==='EC-DEPT')"
                  placement="top-start"
                  trigger="hover"
                  :content="'精准预估金额超过月度比例，累计基准比例为：'+scope.row.ECicon2Num"
                >
                  <div slot="reference">
                    <span class="el-icon-warning" style="font-size:20px;color:orange;" />
                  </div>
                </el-popover>
                <el-popover
                  v-if="(scope.row.icon===true)&&(searchParam.params.submitOrg!=='EC-DEPT')"
                  placement="top-start"
                  trigger="hover"
                  :content="'精准预估金额超过月度比例，月度基准金额为：'+scope.row.tips1"
                >
                  <div slot="reference">
                    <span class="el-icon-warning" style="font-size:20px;color:orange;" />
                  </div>
                </el-popover>
                <el-popover
                  v-if="(scope.row.icon2===true)&&(searchParam.params.submitOrg!=='EC-DEPT')"
                  placement="top-start"
                  trigger="hover"
                  :content="'精准预估金额超过年度累计比例，累计基准金额为：'+scope.row.tips2"
                >
                  <div slot="reference">
                    <span class="el-icon-warning" style="font-size:20px;color:orange;" />
                  </div>
                </el-popover>
                <el-popover
                  v-if="(scope.row.icon3===true)&&(searchParam.params.submitOrg!=='EC-DEPT')"
                  placement="top-start"
                  trigger="hover"
                >
                  <p v-for="(warning,index3) in getWarningArr(scope.row.msg)" :key="index3" style="line-height:22px;margin-bottom:5px;">
                    {{ warning }}
                  </p>
                  <div slot="reference">
                    <span class="el-icon-warning" style="font-size:20px;color:orange;" />
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column :prop="'expsHappenYm'" :label="'发生年月'" min-width="120" align="center" />
            <el-table-column :prop="'custName'" :label="'代理商'" min-width="120" align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.addTableDis">
                  <el-select v-model="scope.row.custName" filterable placeholder="请选择" @change="custCodeChange(scope.$index)">
                    <el-option
                      v-for="item in customerList"
                      :key="item.custCode"
                      :label="item.custName"
                      :value="item.custName"
                    />
                  </el-select>
                  <span :ref="'custName'+scope.$index" data-roles="required" :data-value="scope.row.custName" class="message" />
                </template>
                <template v-else>
                  {{ scope.row.custName }}
                </template>
              </template>
            </el-table-column>
            <el-table-column type="expand" width="20" align="center">
              <template slot-scope="props">
                <el-table
                  v-if="props.row.submitOrg==='EC-DEPT'"
                  ref="table1"
                  class="table-expand"
                  :data="props.row.custDetailList"
                  :header-cell-style="{'text-align':'center'}"
                  border
                  :span-method="objectSpanMethod"
                  style="margin-bottom:20px;"
                >
                  <el-table-column prop="type" label="粒度" min-width="100" align="left" />
                  <el-table-column prop="item" label="项目" min-width="150" align="left" />
                  <template v-for="item in headerMonth">
                    <el-table-column :key="item" prop :label="item + '月'" align="right" min-width="150">
                      <template slot-scope="scope">
                        <milli-input v-if="props.row.submitOrg==='EC-DEPT'&&scope.$index===3&&item>=Number(searchParam.params.targetYm.split('-')[1])" v-model="scope.row['month_'+item]" class="input" to-fixed-num="2" :disabled="props.row.disabled" @focus="amountPreview2(props.$index,item,scope.row['month_'+item])" @blur="amountChange2(props.$index,item,scope.row['month_'+item])" />
                        <!-- <milli-input v-model="bagChargeParam.bagcharge" class="input" to-fixed-num="2" maxlength="25" /> -->
                        <!-- item>=Number(props.row.expsHappenYm.split('-')[1]) -->
                        <span v-else-if="scope.$index===6||scope.$index===5||scope.$index===4">{{ scope.row['month_'+item] }}</span>
                        <span v-else>{{ scope.row['month_'+item]|numFormat(2) }}</span>
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column prop="data3" label="全年合计" min-width="150" align="right">
                    <template slot-scope="scope">
                      <span v-if="scope.$index===6||scope.$index===5||scope.$index===4">{{ scope.row.month_total }}</span>
                      <span v-else>{{ scope.row.month_total |numFormat(2) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-if="props.row.submitOrg!=='EC-DEPT'">
                  <!-- <div v-loading="!props.row.isexpandloading"> -->
                  <el-table
                    v-if="props.row.submitOrg!=='EC-DEPT'"
                    ref="table1"
                    class="table-expand"
                    :data="props.row.custDetailList"
                    :header-cell-style="{'text-align':'center'}"
                    border
                    :span-method="objectSpanMethod"
                    style="margin-bottom:20px;"
                  >
                    <el-table-column prop="type" label="粒度" min-width="100" align="left" />
                    <el-table-column prop="item" label="项目" min-width="150" align="left" />
                    <template v-for="item in headerMonth">
                      <el-table-column :key="item" prop :label="item + '月'" align="right" min-width="150">
                        <template slot-scope="scope">
                          <milli-input v-if="props.row.submitOrg==='EC-DEPT'&&scope.$index===3&&item>=Number(props.row.expsHappenYm.split('-')[1])" v-model="scope.row['month_'+item]" class="input" to-fixed-num="2" :disabled="props.row.disabled" @focus="amountPreview2(props.$index,item,scope.row['month_'+item])" @blur="amountChange2(props.$index,item,scope.row['month_'+item])" />
                          <!-- <milli-input v-model="bagChargeParam.bagcharge" class="input" to-fixed-num="2" maxlength="25" /> -->
                          <span v-else-if="scope.$index===6||scope.$index===5||scope.$index===4">{{ scope.row['month_'+item] }}</span>
                          <span v-else>{{ scope.row['month_'+item]|numFormat(2) }}</span>
                        </template>
                      </el-table-column>
                    </template>
                    <el-table-column prop="data3" label="全年合计" min-width="150" align="right">
                      <template slot-scope="scope">
                        <span v-if="scope.$index===6||scope.$index===5||scope.$index===4">{{ scope.row.month_total }}</span>
                        <span v-else>{{ scope.row.month_total |numFormat(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table>

                  <el-table
                    v-if="props.row.submitOrg!=='EC-DEPT'"
                    ref="table1"
                    class="table-expand"
                    :data="props.row.area1DetailList"
                    :header-cell-style="{'text-align':'center'}"
                    border
                    :span-method="objectSpanMethod"
                    style="margin-bottom:20px;"
                  >
                    <el-table-column prop="type" label="粒度" min-width="100" align="left" />
                    <el-table-column prop="item" label="项目" min-width="150" align="left" />
                    <template v-for="item in headerMonth">
                      <el-table-column :key="item" prop :label="item + '月'" align="right" min-width="150">
                        <template slot-scope="scope">
                          <span v-if="scope.$index===6||scope.$index===5||scope.$index===4">{{ scope.row['month_'+item] }}</span>
                          <span v-else>{{ scope.row['month_'+item]|numFormat(2) }}</span>
                        </template>
                      </el-table-column>
                    </template>
                    <el-table-column prop="data3" label="全年合计" min-width="150" align="right">
                      <template slot-scope="scope">
                        <span v-if="scope.$index===6||scope.$index===5||scope.$index===4">{{ scope.row.month_total }}</span>
                        <span v-else>{{ scope.row.month_total |numFormat(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table>

                  <el-table
                    v-if="props.row.submitOrg!=='EC-DEPT'"
                    ref="table1"
                    class="table-expand"
                    :data="props.row.area2DetailList"
                    :header-cell-style="{'text-align':'center'}"
                    border
                    :span-method="objectSpanMethod"
                    style="margin-bottom:20px;"
                  >
                    <el-table-column prop="type" label="粒度" min-width="100" align="left" />
                    <el-table-column prop="item" label="项目" min-width="150" align="left" />
                    <template v-for="item in headerMonth">
                      <el-table-column :key="item" prop :label="item + '月'" align="right" min-width="150">
                        <template slot-scope="scope">
                          <span v-if="scope.$index===6||scope.$index===5||scope.$index===4">{{ scope.row['month_'+item] }}</span>
                          <span v-else>{{ scope.row['month_'+item]|numFormat(2) }}</span>
                        </template>
                      </el-table-column>
                    </template>
                    <el-table-column prop="data3" label="全年合计" min-width="150" align="right">
                      <template slot-scope="scope">
                        <span v-if="scope.$index===6||scope.$index===5||scope.$index===4">{{ scope.row.month_total }}</span>
                        <span v-else>{{ scope.row.month_total |numFormat(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- </div> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column :prop="'finAccountName'" :label="'二级费目'" min-width="120" align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.addTableDis">
                  <el-select v-model="scope.row.finAccountName" placeholder="请选择" @change="accountSelect(scope.$index)">
                    <el-option
                      v-for="item in fees1"
                      :key="item.accountCode"
                      :label="item.accountName"
                      :value="item.accountCode"
                    />
                  </el-select>
                  <span :ref="'finAccountName'+scope.$index" data-roles="required" :data-value="scope.row.finAccountName" class="message" />
                </template>
                <template v-else>
                  {{ scope.row.finAccountName }}
                </template>
              </template>
            </el-table-column>
            <el-table-column :prop="'productCategory'" :label="'品类'" min-width="120" align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.addTableDis">
                  <dict-select v-model="scope.row.productCategory" dict-type-id="Category" @change="(value)=>validator('category'+scope.$index,value)" />
                  <span :ref="'category'+scope.$index" data-roles="required" :data-value="scope.row.productCategory" class="message" />
                </template>
                <template v-else>
                  {{ scope.row.productCategory }}
                </template>
              </template>
            </el-table-column>
            <el-table-column v-if="searchParam.params.submitOrg==='STRATEGY-SECTION-1'||searchParam.params.submitOrg==='STRATEGY-SECTION-1W'||searchParam.params.submitOrg==='STRATEGY-SECTION-1B'||searchParam.params.submitOrg==='STRATEGY-SECTION-2'||searchParam.params.submitOrg==='STRATEGY-SECTION-2F'" :prop="'feeInputType'" :label="'费用输入分类'" min-width="120" align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.addTableDis&&(!scope.row.disabled)">
                  <el-input v-model="scope.row.feeInputType" @input="(value)=>validator('feeInputType'+scope.$index,value)" />
                  <span :ref="'feeInputType'+scope.$index" data-roles="required" :data-value="scope.row.feeInputType" class="message" />
                </template>
                <template v-else>
                  {{ scope.row.feeInputType }}
                </template>
              </template>
            </el-table-column>
            <el-table-column :prop="'bgt_amount'" :label="'促销费预算金额'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.bgt_amount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'bgt_percent'" :label="'预算费比'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.bgt_percent|numFormat(2) }}
                <span v-if="scope.row.bgt_percent">%</span>
              </template>
            </el-table-column>
            <el-table-column :prop="'est_amount'" :label="'促销费预估金额'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.est_amount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column :prop="'est_percent'" :label="'预估费比'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.est_percent|numFormat(2) }}
                <span v-if="scope.row.est_percent">%</span>
              </template>
            </el-table-column>
            <el-table-column :prop="'act_amount'" :label="'促销费精准预估金额'" min-width="160" align="right">
              <template slot-scope="scope">
                <!-- <milli-input v-model="bagChargeParam.bagcharge" class="input" to-fixed-num="2" maxlength="25" /> -->
                <milli-input v-model="scope.row.act_amount" :disabled="scope.row.disabled" class="input" to-fixed-num="2" @focus="amountPreview(scope.$index,scope.row.act_amount)" @blur="amountChange(scope.$index,scope.row.act_amount)" />
                <span :ref="'act_amount'+scope.$index" data-roles="negativeNumber" :data-value="scope.row.act_amount" class="message" />
                <!-- {{ scope.row.data1|numFormat(0) }} -->
              </template>
            </el-table-column>
            <el-table-column :prop="'act_percent'" :label="'精准预估费比'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.act_percent|numFormat(2) }}
                <span v-if="scope.row.act_percent">%</span>
              </template>
            </el-table-column>
            <!-- <el-table-column :prop="'data7'" :label="'调整后金额'" min-width="120" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.data7" clearable />
              </template>
            </el-table-column>
            <el-table-column :prop="'data8'" :label="'费比'" min-width="120" align="center" /> -->
            <!-- <template slot-scope="scope">
                <el-input v-model="scope.row.data8" clearable />
              </template>
            </el-table-column> -->
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
    <el-dialog
      class="content-dialog-box  search-light rules newedit3"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title="'下载'"
      :visible.sync="isShow"
      width="600"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="pop_content" />
      <el-form ref="form" :model="editData" label-width="80px">
        <el-form-item label="二级费目">
          <el-col :span="24">
            <el-select v-model="editData.finAccountCode" placeholder="请选择" clearable>
              <el-option
                v-for="item in fees3"
                :key="item.accountCode"
                :label="item.accountName"
                :value="item.accountCode"
              />
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="btn">
        <button class="cancel" @click="handleClose">
          取消
        </button>
        <button class="save" @click="downloadOk">
          确定
        </button>
      </div>
    </el-dialog>
    <upload :is-show="uploadDayDialog" action="/api/est/adjust/day/upload" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadDaySuccess" @onClose="uploadDayDialog=false" />
    <upload :is-show="uploadMonthDialog" action="/api/est/adjust/month/upload" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadMonthSuccess" @onClose="uploadMonthDialog=false" />
    <upload :is-show="uploadAdjustDialog" action="/api/est/adjust/adjust/upload" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadAdjustSuccess" @onClose="uploadAdjustDialog=false" />
    <upload :is-show="uploadNoCustAdjustDialog" action="/api/est/adjust/nocust/adjust/upload" :other-params="otherParams" :accept="accept" @onSuccess="handleUploadNoCustAdjustSuccess" @onClose="uploadNoCustAdjustDialog=false" />
    <amount-adjust :is-show="amountAdjustDialog" :target-ym="searchParam.params.targetYm" :account-type="searchParam.params.accountType" :submit-org="searchParam.params.submitOrg" @cancel="amountAdjustDialog=false" />
    <!-- 汇总弹窗 -->
    <writeoff-sum :is-show="writeoffSumDialog" adjust-type="1" :target-org="submitOrg" :est-ym="estYm" @cancel="writeoffSumDialog=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search, finSubjects } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { numberFormat, dateFormat, addMonth } from '@/utils/util'
import { getDetailDetail, getList, saveListApi, downloadMonthExcel, downloadDayExcel, downloadFixExcel, downloadChangeExcel, downloadSerailExcel,
  downloadNoCustExcel, deleteListApi } from '@/api/writeoff/adjusts.js'
import { getCustList } from '@/api/bgt/ratelimit.js'
import AmountAdjust from './components/AmountAdjust'
import WriteoffSum from '@/views/writeoff/components/WriteoffSumDialog'
import Upload from '@/components/UploadNew'
import { formValidator } from '@/mixins/form-validator.js'

export default {
  name: 'WriteoffAdjusts',
  components: {
    AmountAdjust,
    WriteoffSum,
    Upload
  },
  mixins: [search, names, permission, numFormat, finSubjects, formValidator],
  data() {
    return {
      expand: [],
      adddddata: [],
      k: '',
      headerMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      isLoading: false,
      multipleSelection: [],
      strategyList: [],
      customerList: [],
      editData: {
        finAccountCode: '',
        targetYm: ''
      },
      exportSelectDilog: false,
      amountAdjustDialog: false,
      writeoffSumDialog: false,
      isShow: false,
      downType: '',
      historyDialog: false,
      cancelDialog: false,
      cancelReason: '',
      tax1: true,
      tax2: true,
      fees1: [],
      fees2: [],
      fees3: [],
      iptdata: [],
      estYm: null,
      submitOrg: null,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          targetYm: String(new Date().getFullYear()) + '-' + this.doHandleMonth(),
          custName: '',
          submitOrg: '',
          accountType: '',
          finAccountCode: '',
          area2: '',
          area1: '',
          collaborateCustomer: ''
        }
      },
      uploadDayDialog: false, // 上传文件dialog显示标志位,日别
      uploadMonthDialog: false, // 上传文件dialog显示标志位,月别
      uploadAdjustDialog: false, // 上传文件dialog显示标志位,精准预估调整
      uploadNoCustAdjustDialog: false, // 上传文件dialog显示标志位,无代理商调整
      accept: '.xlsx',
      otherParams: null,
      submitOrg2: '',
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    happenYear: function() {
      return addMonth(this.searchParam.params.targetYm, -1).substr(0, 4)
    },
    orgIdCom() {
      const d = new Date()
      let filterYear = d.getFullYear()
      if (this.happenYear) {
        filterYear = this.happenYear
      }
      const deptList = this.$store.getters.dictList.Dept.filter(item => item.filter2.indexOf(filterYear) >= 0)
      const targetList = this.$store.getters.dictList.TARGETORG.filter(item => item.filter1.indexOf(filterYear) >= 0)
      let item
      let list = []
      if (deptList && targetList) {
        list = targetList.filter((target) => deptList.filter((dept) => target.dictName === dept.dictId))
        item = list.find((ele) => this.userInfo.orgSeqNo.indexOf(ele.dictId) !== -1)
      }
      return this.userInfo.roleList.includes('ROLE_WF_MARKET') ? '' : item ? item.dictName : ''
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
  watch: {
    orgIdCom: {
      handler(newValue, oldValue) {
        this.searchParam.params.submitOrg = newValue
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.submitOrg2 = this.orgIdCom
    this.searchParam.params.submitOrg = this.orgIdCom
    this.getSecondFinSubjects(2)
    this.getHoldFinSubjects()
    this.getCustomerList()
    this.fetchData()
  },
  methods: {
    async expandChange(row, expanded) {
      if (row.addTableDis) return
      if (row.submitOrg === 'EC-DEPT') {
        row.isexpandloading = false
      } else {
        if ((row.submitOrg === 'STRATEGY-SECTION-1') || (row.submitOrg === 'STRATEGY-SECTION-1W') || (row.submitOrg === 'STRATEGY-SECTION-1B') || (row.submitOrg === 'STRATEGY-SECTION-2') || (row.submitOrg === 'STRATEGY-SECTION-2F')) {
          this.k = '1'
        } else {
          this.k = '2'
        }
        if (!row.isexpandloading || row.isexpandloading === 'undefined') {
          // row.isexpandloading = true
          this.isLoading = true
          const res = await getDetailDetail(this.k, row.id)
          for (let i = 0; this.strategyList[i].id; i++) {
            if (this.strategyList[i].id === row.id) {
              const month = Number(this.iptdata[i].expsHappenYm.split('-')[1])
              const cynum = Number(row.act_amount) - Number(this.iptdata[i].act_amount)
              res.datas.custList[3]['month_' + month] = Number(cynum) + Number(res.datas.custList[3]['month_' + month])
              if (this.searchParam.params.submitOrg !== 'EC-DEPT') {
                res.datas.area1List[3]['month_' + month] = Number(cynum) + Number(res.datas.area1List[3]['month_' + month])
                res.datas.area2List[3]['month_' + month] = Number(cynum) + Number(res.datas.area2List[3]['month_' + month])
              }
              this.iptdata[i].act_amount = row.act_amount
              this.strategyList[i].act_amount = row.act_amount
              if (this.iptdata[i].sales_act_amount) {
                this.strategyList[i].act_percent = this.toPercent2(row.act_amount, this.iptdata[i].sales_act_amount)
              }
              break
            }
          }
          if (res) {
            row.area1DetailList = res.datas.area1List
            row.area2DetailList = res.datas.area2List
            row.custDetailList = res.datas.custList

            if (row.custDetailList) {
              let budgetData = {}
              let actualData = {}
              let actualTotalData = {}
              let budgetData2 = {}
              let actualData2 = {}
              let actualTotalData2 = {}
              let budgetData3 = {}
              let actualData3 = {}
              let actualTotalData3 = {}
              const custData = row.custDetailList
              if (this.searchParam.params.submitOrg !== 'EC-DEPT') {
                const area1Data = row.area1DetailList
                const area2Data = row.area2DetailList
                if (!!area1Data && !!area2Data) {
                  budgetData2 = this.budgetRate(area1Data[0], area1Data[2])
                  actualData2 = this.actualRate(area1Data[1], area1Data[3])
                  actualTotalData2 = this.actualTotal(area1Data[1], area1Data[3])

                  budgetData3 = this.budgetRate(area2Data[0], area2Data[2])
                  actualData3 = this.actualRate(area2Data[1], area2Data[3])
                  actualTotalData3 = this.actualTotal(area2Data[1], area2Data[3])

                  row.area1DetailList.splice(4, 3)
                  row.area2DetailList.splice(4, 3)

                  row.area1DetailList.push(budgetData2)
                  row.area1DetailList.push(actualData2)
                  row.area1DetailList.push(actualTotalData2)

                  row.area2DetailList.push(budgetData3)
                  row.area2DetailList.push(actualData3)
                  row.area2DetailList.push(actualTotalData3)
                }
              }
              budgetData = this.budgetRate(custData[0], custData[2])
              actualData = this.actualRate(custData[1], custData[3])
              actualTotalData = this.actualTotal(custData[1], custData[3])

              row.custDetailList.splice(4, 3)

              row.custDetailList.push(budgetData)
              row.custDetailList.push(actualData)
              row.custDetailList.push(actualTotalData)

              row.isexpandloading = true
            }
          }
          this.monthBace()
          this.tableDolayout(this.$refs['table'])
          row.isexpandloading = true
          this.isLoading = false
        }
      }
    },
    doHandleMonth() {
      var myDate = new Date()
      var tMonth = myDate.getMonth()

      var m = tMonth + 1
      if (m.toString().length === 1) {
        m = '0' + m
      }
      return m
    },
    handleClose() {
      this.isShow = false
    },
    downloadAct(type) {
      // SALE-DEPT
      if (this.submitOrg2 === 'EC-DEPT') {
        this.downloadMonthExcel('ECDEPT', this.searchParam.params.targetYm, this.searchParam)
      } else {
        this.isShow = true
        this.editData.finAccountCode = null
        this.downType = type
      }
    },
    downloadOk() {
      if (!this.editData.finAccountCode) {
        this.$message({
          type: 'error',
          message: '请选择二级费目！'
        })
        return false
      }
      if (this.downType === 'date') {
        this.downloadDayExcel(this.editData.finAccountCode, this.searchParam.params.targetYm, this.searchParam)
      } else if (this.downType === 'month') {
        this.downloadMonthExcel(this.editData.finAccountCode, this.searchParam.params.targetYm, this.searchParam)
      }
      this.isLoading = false
      this.isShow = false
    },
    handleUploadDaySuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
    },
    handleUploadMonthSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
    },
    handleUploadAdjustSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
    },
    handleUploadNoCustAdjustSuccess() {
      this.$nextTick(function() {
        this.fetchData()
      })
    },
    async fetchData() {
      if (!this.searchParam.params.targetYm || !this.searchParam.params.submitOrg) {
        this.$message({
          type: 'error',
          message: '查询条件中，年月或部门不能为空！'
        })
        return false
      }
      this.getHoldFinSubjects()
      this.getCustomerList()
      this.searchList()
    },
    async searchList() {
      if (this.searchParam.params.targetYm) {
        const date = new Date(this.searchParam.params.targetYm)
        date.setMonth(date.getMonth() - 1)
        this.estYm = dateFormat(date, 'yyyy-MM')
        this.submitOrg = this.searchParam.params.submitOrg
        this.isLoading = true
        const res = await getList(this.searchParam)
        if (res && res.success) {
          // this.searchDetailParam.paramMonthlyEstId = results[0].id
          const results = res.datas.searchResult.results
          this.searchParam.totalRecord = res.datas.searchResult.totalRecord
          this.strategyList = results

          if (this.strategyList.length > 0) {
            for (let s = 0; s < this.strategyList.length; s++) {
              // this.strategyList[s]['disabled'] = true
              this.$set(this.strategyList[s], 'disabled', true)
            }
          }
          this.iptdata = JSON.parse(JSON.stringify(this.strategyList))
          this.calculation()
          this.monthBace()
        }
        this.isLoading = false
      }
    },
    async accountChange(val) {
      this.searchParam.params.finAccountCode = ''
      this.getSecondFinSubjects(val)
    },
    submitChange() {
      this.searchParam.params.accountType = ''
      this.searchParam.params.finAccountCode = ''
      this.getSecondFinSubjects(2)
      this.fees1.length === 0 && this.getHoldFinSubjects()
      this.customerList.length === 0 && this.getCustomerList()
    },
    monthBace() {
      const dataList = JSON.parse(JSON.stringify(this.strategyList))
      if (dataList.length > 0) {
        for (let s = 0; s < dataList.length; s++) {
          const baceData = Number(dataList[s].month_base_amount)
          const act_amount = Number(dataList[s].act_amount)
          const submitOrg = dataList[s].submitOrg
          const sum_base_amount = Number(dataList[s].sum_base_amount)
          const sum_last_amount = Number(dataList[s].sum_last_amount)
          this.strategyList[s]['icon'] = false
          this.strategyList[s]['icon2'] = false
          this.strategyList[s]['icon3'] = false

          if (submitOrg === 'SALE-DEPT' || submitOrg === 'EC-DEPT') {
            if (baceData) {
              if (act_amount > baceData) {
                this.$set(this.strategyList[s], 'icon', true)

              // this.strategyList[s]['icon'] = true
              } else {
                if (sum_base_amount && sum_last_amount) {
                  if ((act_amount + sum_last_amount) > sum_base_amount) {
                    this.$set(this.strategyList[s], 'icon2', true)
                  // this.strategyList[s]['icon2'] = true
                  }
                }
              }
            } else {
              if (sum_base_amount && sum_last_amount) {
                if ((act_amount + sum_last_amount) > sum_base_amount) {
                // this.strategyList[s]['icon2'] = true
                  this.$set(this.strategyList[s], 'icon2', true)
                }
              }
            }
          } else if (submitOrg === 'STRATEGY-SECTION-1' || submitOrg === 'STRATEGY-SECTION-1W' || submitOrg === 'STRATEGY-SECTION-1B' || submitOrg === 'STRATEGY-SECTION-2' || submitOrg === 'STRATEGY-SECTION-2F') {
            if (dataList[s].msg) {
              this.$set(this.strategyList[s], 'icon3', true)
            }
          }
          if (this.strategyList[s]['month_base_amount'] !== null) {
            this.strategyList[s]['tips1'] = numberFormat(this.strategyList[s]['month_base_amount'], 2)
          }
          if (this.strategyList[s]['sum_base_amount'] !== null) {
            this.strategyList[s]['tips2'] = numberFormat(this.strategyList[s]['sum_base_amount'], 2)
          }

          this.$set(this.strategyList, s, this.strategyList[s])
        }
      }
      this.tableDolayout(this.$refs['table'])
      // 判断是否警告
      if (this.strategyList.length > 0) {
        const index2 = this.strategyList[0].expsHappenYm.substr(6, 8)
        for (let s = 0; s < this.strategyList.length; s++) {
          if (this.searchParam.params.submitOrg === 'EC-DEPT') {
            if ((this.todel(this.strategyList[s].custDetailList[5]['month_' + index2]) > this.strategyList[s].month_base_amount * 10000) && (this.strategyList[s].month_base_amount !== null)) {
              this.strategyList[s].ECicon = true
              // if (this.strategyList[s].ECiconNum) {
              this.strategyList[s].ECiconNum = this.toPercent1(this.strategyList[s].month_base_amount)
              // }
              this.strategyList[s].ECicon2 = false
            } else {
              this.strategyList[s].ECicon = false
              if (((this.todel(this.strategyList[s].custDetailList[6].month_12)) > (this.strategyList[s].sum_base_amount * 10000)) && (this.strategyList[s].sum_base_amount !== null)) {
                this.strategyList[s].ECicon2 = true
                this.strategyList[s].ECicon2Num = this.toPercent1(this.strategyList[s].sum_base_amount)
              } else {
                this.strategyList[s].ECicon2 = false
              }
            }
          }
        }
      }
    },
    calculation() {
      const dataList = JSON.parse(JSON.stringify(this.strategyList))
      if (dataList.length > 0) {
        for (let s = 0; s < dataList.length; s++) {
          if (dataList[s].custDetailList) {
            let budgetData = {}
            let actualData = {}
            let actualTotalData = {}
            let budgetData2 = {}
            let actualData2 = {}
            let actualTotalData2 = {}
            let budgetData3 = {}
            let actualData3 = {}
            let actualTotalData3 = {}
            const custData = dataList[s].custDetailList
            if ((this.searchParam.params.submitOrg !== 'EC-DEPT') && dataList[s].area1DetailList && dataList[s].area2DetailList) {
              const area1Data = dataList[s].area1DetailList
              const area2Data = dataList[s].area2DetailList
              if (!!area1Data && !!area2Data) {
                budgetData2 = this.budgetRate(area1Data[0], area1Data[2])
                actualData2 = this.actualRate(area1Data[1], area1Data[3])
                actualTotalData2 = this.actualTotal(area1Data[1], area1Data[3])

                budgetData3 = this.budgetRate(area2Data[0], area2Data[2])
                actualData3 = this.actualRate(area2Data[1], area2Data[3])
                actualTotalData3 = this.actualTotal(area2Data[1], area2Data[3])

                this.strategyList[s].area1DetailList.splice(4, 3)
                this.strategyList[s].area2DetailList.splice(4, 3)

                this.strategyList[s].area1DetailList.push(budgetData2)
                this.strategyList[s].area1DetailList.push(actualData2)
                this.strategyList[s].area1DetailList.push(actualTotalData2)

                this.strategyList[s].area2DetailList.push(budgetData3)
                this.strategyList[s].area2DetailList.push(actualData3)
                this.strategyList[s].area2DetailList.push(actualTotalData3)
              }
            }
            budgetData = this.budgetRate(custData[0], custData[2])
            actualData = this.actualRate(custData[1], custData[3])
            actualTotalData = this.actualTotal(custData[1], custData[3])

            this.strategyList[s].custDetailList.splice(4, 3)

            this.strategyList[s].custDetailList.push(budgetData)
            this.strategyList[s].custDetailList.push(actualData)
            this.strategyList[s].custDetailList.push(actualTotalData)
          }
        }
      }
    },
    budgetRate(attr1, attr2) {
      const budgetData = {}
      budgetData['type'] = attr1.type
      budgetData['item'] = '单月费率(预算)'
      // budgetData['month_total'] = ''
      for (let s = 1; s < 13; s++) {
        if (!!attr2['month_' + s] && !!attr1['month_' + s]) {
          budgetData['month_' + s] = this.toPercent(attr2['month_' + s], attr1['month_' + s])
        } else {
          budgetData['month_' + s] = ''
        }
      }
      budgetData['month_total'] = this.toPercent(attr2['month_total'], attr1['month_total'])
      return budgetData
    },
    actualRate(attr1, attr2) {
      const actualData = {}
      actualData['type'] = attr1.type
      actualData['item'] = '单月费率(预实绩)'
      actualData['month_total'] = ''
      for (let s = 1; s < 13; s++) {
        if (!!attr2['month_' + s] && !!attr1['month_' + s]) {
          actualData['month_' + s] = this.toPercent(attr2['month_' + s], attr1['month_' + s])
        } else {
          actualData['month_' + s] = ''
        }
      }
      actualData['month_total'] = this.toPercent(attr2['month_total'], attr1['month_total'])
      return actualData
    },
    actualTotal(attr1, attr2) {
      const actualTotalData = {}
      actualTotalData['type'] = attr1.type
      actualTotalData['item'] = '累计费率(预实绩)'
      actualTotalData['month_total'] = ''
      let total1 = 0
      let total2 = 0
      for (let s = 1; s < 13; s++) {
        total1 = Number(total1) + Number(attr1['month_' + s])
        total2 = Number(total2) + Number(attr2['month_' + s])
        if (total1 !== 0 && total2 !== 0) {
          actualTotalData['month_' + s] = this.toPercent(total2, total1)
        } else {
          actualTotalData['month_' + s] = '0.00%'
        }
      }
      actualTotalData['month_total'] = this.toPercent(attr2['month_total'], attr1['month_total'])
      return actualTotalData
    },
    toPercent(num, total) {
      num = num || 0
      return (Math.round(num / total * 10000) / 100.00 + '%')// 小数点后两位百分比
    },
    toPercent2(num, total) {
      num = num || 0
      return (Math.round(num / total * 10000) / 100.00)// 小数点后两位百分比
    },
    toPercent1(num) {
      num = num || 0
      return (Math.round(num * 10000) / 100.00 + '%')// 小数点后两位百分比
    },
    todel(num) {
      num = num || 0
      return parseInt(Number(num) * 100)
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 7 === 0) {
          return {
            rowspan: 7,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      const list = this.strategyList
      for (let s = 0; s < list.length; s++) {
        this.strategyList[s]['disabled'] = true
        // this.strategyList[s].custDetailList[3]['disabled'] = true
        // this.$set(this.strategyList[s], 'disabled', true)
      }
      for (let index = 0; index < val.length; index++) {
        const selectId = val[index].id
        for (let s = 0; s < list.length; s++) {
          const listId = list[s].id
          if (listId === selectId) {
            this.strategyList[s]['disabled'] = false
            // this.strategyList[s].custDetailList[3]['disabled'] = false
            // this.$set(this.strategyList[s], 'disabled', false)
          }
        }
      }
    },
    selectInit(row, index) {
      if (row.isEditable === 1) {
        return false
      } else {
        return true
      }
    },
    handleBack() {
      this.$router.go(-1)
    },
    async downloadMonthExcel(type, targetYm, params) {
      this.isLoading = true
      await downloadMonthExcel(type, targetYm, params)
      this.isLoading = false
    },
    async downloadDayExcel(type, targetYm, params) {
      this.isLoading = true
      await downloadDayExcel(type, targetYm, params)
      this.isLoading = false
    },
    amountPreview(index, val) {
      this.iptdata[index].act_amount = val
    },
    amountPreview2(index1, index2, val) {
      this.iptdata[index1].custDetailList[3]['month_' + index2] = val
    },
    amountChange(index, val) {
      this.validator('act_amount' + index, val)
      if (this.strategyList[index].isexpandloading || (this.searchParam.params.submitOrg === 'EC-DEPT')) {
        const month = Number(this.iptdata[index].expsHappenYm.split('-')[1])
        const cynum = Number(val) - Number(this.iptdata[index].act_amount)
        if (/^\d+(?=\.{0,1}\d+$|$)/.test(val)) {
          this.strategyList[index].custDetailList[3]['month_' + month] = Number(cynum) + Number(this.strategyList[index].custDetailList[3]['month_' + month])
          this.totalmonth(index)
          if (this.searchParam.params.submitOrg === 'EC-DEPT') {
            this.handleEcUpdateExpand(index)
          } else if (this.searchParam.params.submitOrg !== 'EC-DEPT') {
            this.strategyList[index].area1DetailList[3]['month_' + month] = Number(cynum) + Number(this.strategyList[index].area1DetailList[3]['month_' + month])
            this.strategyList[index].area2DetailList[3]['month_' + month] = Number(cynum) + Number(this.strategyList[index].area2DetailList[3]['month_' + month])
          }
          this.iptdata[index].act_amount = val
          this.strategyList[index].act_amount = val
          if (this.iptdata[index].sales_act_amount) {
            this.strategyList[index].act_percent = this.toPercent2(val, this.iptdata[index].sales_act_amount)
          }
          this.calculation()
        } else {
          this.strategyList[index].act_amount = this.iptdata[index].act_amount
        }
        this.monthBace()
        this.tableDolayout(this.$refs['table'])
      }
      if (this.iptdata[index].sales_act_amount) {
        this.strategyList[index].act_percent = this.toPercent2(val, this.iptdata[index].sales_act_amount)
      }
    },
    amountChange2(index1, index2, val) {
      if (/^\d+(?=\.{0,1}\d+$|$)/.test(val)) {
        if (this.searchParam.params.submitOrg === 'EC-DEPT') {
          for (let s = 0; s < this.strategyList.length; s++) {
            if ((this.strategyList[index1].rowKey) === this.strategyList[s].rowKey) {
              this.strategyList[s].custDetailList[3]['month_' + index2] = val
            }
          }
        }
        this.strategyList[index1].custDetailList[3]['month_' + index2] = val
        this.totalmonth(index1)
        this.calculation(index2)

        if (this.strategyList.length > 0) {
          for (let s = 0; s < this.strategyList.length; s++) {
            if (this.searchParam.params.submitOrg === 'EC-DEPT') {
              if (((this.todel(this.strategyList[s].custDetailList[5]['month_' + index2])) > (this.strategyList[s].month_base_amount * 10000)) && (this.strategyList[s].month_base_amount !== null)) {
                this.strategyList[s].ECicon = true
                // if (this.strategyList[s].ECiconNum) {
                this.strategyList[s].ECiconNum = this.toPercent1(this.strategyList[s].month_base_amount)
                // }
                this.strategyList[s].ECicon2 = false
              } else {
                this.strategyList[s].ECicon = false
                if (((this.todel(this.strategyList[s].custDetailList[6].month_12)) > (this.strategyList[s].sum_base_amount * 10000)) && (this.strategyList[s].sum_base_amount !== null)) {
                  this.strategyList[s].ECicon2 = true
                  this.strategyList[s].ECicon2Num = this.toPercent1(this.strategyList[s].sum_base_amount)
                } else {
                  this.strategyList[s].ECicon2 = false
                }
              }
            }
          }
        }
        // if()
      } else {
        this.strategyList[index1].custDetailList[3]['month_' + index2] = this.iptdata[index1].custDetailList[3]['month_' + index2]
      }
    },
    totalmonth(index) {
      if (this.strategyList[index].isexpandloading || this.searchParam.params.submitOrg === 'EC-DEPT') {
        const dataList = JSON.parse(JSON.stringify(this.strategyList))[index]

        let total1 = 0
        let total2 = 0
        let total3 = 0
        for (let s = 1; s < 13; s++) {
          total1 = Number(total1) + Number(dataList.custDetailList[3]['month_' + s])
          if (this.searchParam.params.submitOrg !== 'EC-DEPT') {
            total2 = Number(total2) + Number(dataList.area1DetailList[3]['month_' + s])
            total3 = Number(total3) + Number(dataList.area2DetailList[3]['month_' + s])
          }
        }
        if (this.searchParam.params.submitOrg !== 'EC-DEPT') {
          this.strategyList[index].area1DetailList[3].month_total = total2
          this.strategyList[index].area2DetailList[3].month_total = total3
        }
        this.strategyList[index].custDetailList[3].month_total = total1
      }
    },
    // 更新 EC部门 同代理商 同品类 同一级费目 子表格数据
    handleEcUpdateExpand(index) {
      this.strategyList.forEach((item, index2) => {
        if (item.rowKey === this.strategyList[index].rowKey && index2 !== index) {
          this.strategyList[index2].custDetailList[3] = this.strategyList[index].custDetailList[3]
        }
      })
    },
    saveList() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      } else {
        if (!this.validatorAll()) return
        this.isLoading = true
        const saveList = this.multipleSelection
        for (let s = 0; s < saveList.length; s++) {
          const saveListlie = this.multipleSelection[s]
          this.multipleSelection[s]['id'] = saveListlie.addTableDis ? '' : saveListlie.id
          this.multipleSelection[s]['amount'] = saveListlie.act_amount
        }
        this.$confirm('是否确认保存所选数据？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(async() => {
          const res = await saveListApi({ jsonList: JSON.stringify(this.multipleSelection) })

          if (res && res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.strategyList = []
            this.fetchData()
          }
          this.isLoading = false
        }).catch(err => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
          this.isLoading = false
          console.log(err)
        })
      }
    },
    deleteList() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      } else {
        if (!this.validatorAll()) return
        this.isLoading = true
        const saveList = this.multipleSelection
        for (let s = 0; s < saveList.length; s++) {
          const saveListlie = this.multipleSelection[s]
          this.multipleSelection[s]['id'] = saveListlie.addTableDis ? '' : saveListlie.id
          this.multipleSelection[s]['amount'] = saveListlie.act_amount
        }
        this.$confirm('是否确认删除所选数据？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(async() => {
          const res = await deleteListApi({ jsonList: JSON.stringify(this.multipleSelection) })

          if (res && res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.strategyList = []
            this.fetchData()
          }
          this.isLoading = false
        }).catch(err => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
          this.isLoading = false
          console.log(err)
        })
      }
    },
    async getCustomerList() {
      if (this.searchParam.params.submitOrg) {
        const res = await getCustList(this.searchParam.params.submitOrg)
        if (res && res.success) {
          this.customerList = res.datas.list
        }
      }
    },
    // 新建
    addTable() {
      if ((!this.searchParam.params.targetYm) || (!this.searchParam.params.submitOrg)) {
        this.$message({
          type: 'error',
          message: '对象年月和部门不能为空！'
        })
        return false
      }
      var data = this.searchParam.params.targetYm
      if ((data.split('-')[1] === '01')) {
        data = (data.split('-')[0] - 1) + '-' + '12'
      } else if (data.split('-')[1] === '11' || data.split('-')[1] === '12') {
        data = (data.split('-')[0]) + '-' + (data.split('-')[1] - 1)
      } else {
        data = (data.split('-')[0]) + '-0' + (data.split('-')[1] - 1)
      }
      const tableRow = {
        'id': Math.random() * 10,
        'idid': '1',
        'expsHappenYm': data,
        'submitOrg': this.searchParam.params.submitOrg,
        'custName': '',
        'custCode': '',
        'custDetailList': [],
        'area1DetailList': [],
        'area2DetailList': [],
        'finAccountName': '',
        'finAccountCode': '',
        'productCategory': '',
        'feeInputType': '',
        'bgt_amount': '',
        'bgt_percent': '',
        'est_amount': '',
        'est_percent': '',
        'act_amount': '',
        'act_percent': '',
        'verify_amount': '',
        'verify_percent': '',
        'forwardInAmount': '',
        'forwardOutAmount': '',
        'payDeductAmount': '',
        'payAmount': '',
        'payPercent': '',
        'realPayDeductAmount': '',
        'realPayAmount': '',
        'addTableDis': true

      }
      this.$refs.table.toggleRowSelection(tableRow, true)
      // if (this.searchParam.params.submitOrg === 'STRATEGY-SECTION-1' || this.searchParam.params.submitOrg === 'STRATEGY-SECTION-2') {
      this.strategyList.push(tableRow)
    },
    // 选择代理商
    custCodeChange(index) {
      for (let i = 0; i < this.customerList.length; i++) {
        if (this.customerList[i].custName === this.strategyList[index].custName) {
          this.strategyList[index].custName = this.customerList[i].custName
          this.strategyList[index].custCode = this.customerList[i].custCode
          break
        }
      }
      this.validator('custName' + index, this.strategyList[index].custName)
    },
    // 选择二级费目
    accountSelect(index) {
      const accountid = this.strategyList[index].finAccountName
      const finname = this.fees1.filter(function(x) {
        return x.accountCode === accountid
      })
      this.strategyList[index].finAccountName = finname[0].accountName
      this.strategyList[index].finAccountType = finname[0].accountType
      this.strategyList[index].finAccountCode = finname[0].accountType
      this.validator('finAccountName' + index, accountid)
    },
    downloadFix() {
      this.isLoading = true
      downloadFixExcel(this.searchParam)
      this.isLoading = false
    },
    downloadChange() {
      this.isLoading = true
      downloadChangeExcel(this.searchParam)
      this.isLoading = false
    },
    downloadSerail() {
      this.isLoading = true
      downloadSerailExcel(this.searchParam)
      this.isLoading = false
    },
    downloadNoCust() {
      this.isLoading = true
      downloadNoCustExcel(this.searchParam)
      this.isLoading = false
    },
    handleSumDialog() {
      if (!this.searchParam.params.submitOrg) {
        this.$message({
          type: 'error',
          message: '部门不能为空'
        })
        return
      }
      if (!this.searchParam.params.targetYm) {
        this.$message({
          type: 'error',
          message: '年月不能为空'
        })
        return
      }
      this.writeoffSumDialog = true
    }
  }
}
</script>
<style >
.specaitable .el-table__body{
      border-bottom: 1px solid #ddd;
}
.specaitable tbody tr:last-child td{
  border-bottom: 1px solid #dddddd !important;
}
.apply .newedit3 .el-dialog {
    width: 400px !important;
    height: 200px;
    min-width: 400px !important;
}
</style>
