<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="withdraw.identiferNum" class="pagespan">
          {{ $t("pay.transfer.identiferNum") }}:
          {{ withdraw.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">
            {{ $t("comm.essentialInformation") }}
          </span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.applyUserName") }}
              </div>
              <div class="input">
                <user-select
                  v-model="withdraw.applyUserName"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.applyUserNum") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.applyUserNum" :disabled="true" />
              </div>
            </div>

            <!-- <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.monitorNo") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.monitorNo" />
              </div>
            </div> -->
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.companyName") }}
              </div>
              <div class="input">
                <rel-func-select
                  v-model="withdraw.companyName"
                  :rel-func="'account'"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.department") }}
              </div>
              <div class="input">
                <el-input
                  v-model="withdraw.department"
                  readonly
                  :disabled="true"
                >
                  <i
                    slot="suffix"
                    class="iconfont icon-zuzhijiagou"
                    @click.stop="openSelect"
                  />
                </el-input>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.applyDate") }}
              </div>
              <div class="input">
                <el-date-picker
                  v-model="withdraw.applyDate"
                  size="small"
                  type="date"
                  value-format="yyyy-MM-dd"
                  clearable
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.transfer.baseRemark") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.baseRemark" clearable />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{
            $t("pay.transfer.expenseInfo")
          }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.costIncurredCompany") }}
              </div>
              <div class="input">
                <rel-func-select
                  v-model="withdraw.costIncurredCompany"
                  :rel-func="'account'"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.oriFinancialDocNo") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.oriFinancialDocNo" />
              </div>
            </div>
            <!-- <div class="flex3">
              <div class="title">
                {{ $t('pay.transfer.distributionChannel') }}
              </div>
              <div class="input">
                <el-select v-model="withdraw.distributionChannel" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in distributionChannel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div> -->
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.currency") }}
              </div>
              <div class="input">
                <dict-select
                  v-model="withdraw.currency"
                  dict-type-id="Currency"
                  clearable
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.outSumAmount") }}
              </div>
              <div class="input">
                <milli-input
                  v-model="totalAmountOut"
                  to-fixed-num="2"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.inSumAmount") }}
              </div>
              <div class="input">
                <milli-input
                  v-model="totalAmountIn"
                  to-fixed-num="2"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span
            slot="title"
            class="collapse-title"
          >{{ $t("comm.lineDetail") }}
          </span>

          <div class="add_table_row">
            <div>
              {{ $t("pay.transfer.outExpenseDetail") }}
            </div>
            <!-- <el-button
              class="editbtn"
              size="mini"
              @click.stop="handleDownloadTemplate('out')"
            >
              下载模板
            </el-button>
            <el-button
              class="editbtn"
              size="mini"
              @click.stop="handleUploadTemplate('out')"
            >
              上传数据
            </el-button> -->
            <el-button
              class="editbtn"
              size="mini"
              icon="el-icon-circle-plus-outline"
              @click.stop="handleAddDetail('out')"
            >
              {{ $t("comm.addLine") }}
            </el-button>
          </div>
          <el-table ref="table" :data="withdraw.detailsOut" style="margin-bottom: 20px" :header-cell-style="{ 'text-align': 'center' }" border stripe>
            <el-table-column :label="$t('comm.operation')" align="center" width="70">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail('out',scope.$index, '1')" />
              </template>
            </el-table-column>
            <el-table-column label="No." width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outCostCenterNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outCostCenterNum" clearable />
                <!-- <rel-func-select v-model="scope.row.motionIdentiferNum" :rel-func="'motion'" /> -->
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.outCostCenterName')"
              width="170"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.outCostCenterName" clearable />
                <!-- <rel-func-select v-model="scope.row.motionIdentiferNum" :rel-func="'motion'" /> -->
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outSubjectNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outSubjectNum" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outSubjectName')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outSubjectName" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outTaxRate')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outTaxRate" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outTaxCode')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outTaxCode" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outAccountNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outAccountNum" clearable />
              </template>
            </el-table-column>
            <!-- <el-table-column :label="$t('pay.transfer.localChainNum')" width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.localChainNum" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in localChain"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column> -->
            <el-table-column :label="$t('pay.transfer.outLocalChainNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outLocalChainNum" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outCG5Num')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outCG5Num" clearable />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.outBrandNum')"
              width="170"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.outBrandNum" clearable />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.outMaterielNo')"
              width="170"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.outMaterielNo" clearable />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.outSalesOffice')"
              width="170"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.outSalesOffice"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in outSalesOffice"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outPH2Num')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outPH2Num" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outPH2Name')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.outPH2Name" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.outAmount')" width="170">
              <template slot-scope="scope">
                <milli-input
                  v-model="scope.row.outAmount"
                  to-fixed-num="2"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.outReason')"
              width="170"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.outReason" clearable />
              </template>
            </el-table-column>
          </el-table>

          <div class="add_table_row">
            <div>
              {{ $t("pay.transfer.inExpenseDetail") }}
            </div>
            <!-- <el-button
              class="editbtn"
              size="mini"
              @click.stop="handleDownloadTemplate('in')"
            >
              下载模板
            </el-button>
            <el-button
              class="editbtn"
              size="mini"
              @click.stop="handleUploadTemplate('in')"
            >
              上传数据
            </el-button> -->
            <el-button
              class="editbtn"
              size="mini"
              icon="el-icon-circle-plus-outline"
              @click.stop="handleAddDetail('in')"
            >
              {{ $t("comm.addLine") }}
            </el-button>
          </div>
          <el-table ref="table" :data="withdraw.detailsIn" style="margin-bottom: 20px" :header-cell-style="{ 'text-align': 'center' }" border stripe>
            <el-table-column :label="$t('comm.operation')" align="center" width="70">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail('in',scope.$index, '1')" />
              </template>
            </el-table-column>
            <el-table-column label="No." width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inCostCenterNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inCostCenterNum" clearable />
                <!-- <rel-func-select v-model="scope.row.motionIdentiferNum" :rel-func="'motion'" /> -->
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.inCostCenterName')"
              width="170"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.inCostCenterName" clearable />
                <!-- <rel-func-select v-model="scope.row.motionIdentiferNum" :rel-func="'motion'" /> -->
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inSubjectNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inSubjectNum" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inSubjectName')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inSubjectName" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inTaxRate')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inTaxRate" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inTaxCode')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inTaxCode" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inAccountNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inAccountNum" clearable />
              </template>
            </el-table-column>
            <!-- <el-table-column :label="$t('pay.transfer.localChainNum')" width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.localChainNum" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in localChain"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column> -->
            <el-table-column :label="$t('pay.transfer.inLocalChainNum')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inLocalChainNum" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inCG5Num')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inCG5Num" clearable />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.inBrandNum')"
              width="170"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.inBrandNum" clearable />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.inMaterielNo')"
              width="170"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.inMaterielNo" clearable />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.inSalesOffice')"
              width="170"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.inSalesOffice"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in inSalesOffice"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inPH2Num')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inPH2Num" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inPH2Name')" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inPH2Name" clearable />
              </template>
            </el-table-column>
            <el-table-column :label="$t('pay.transfer.inAmount')" width="170">
              <template slot-scope="scope">
                <milli-input
                  v-model="scope.row.inAmount"
                  to-fixed-num="2"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pay.transfer.inReason')"
              width="170"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.inReason" clearable />
              </template>
            </el-table-column>
          </el-table>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.outSumAmount") }}
              </div>
              <div class="input">
                <milli-input
                  v-model="totalAmountOut"
                  to-fixed-num="2"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("pay.transfer.inSumAmount") }}
              </div>
              <div class="input">
                <milli-input
                  v-model="totalAmountIn"
                  to-fixed-num="2"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{
            $t("pay.transfer.remark")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.transfer.remark") }}
              </div>
              <div class="input">
                <el-input v-model="withdraw.remark" type="textarea" rows="3" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{
            $t("comm.attachmentFile")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("pay.transfer.attachmentInfo") }}
              </div>
              <div class="input">
                <attachement v-model="fileList" func-div="withdraw" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit('save')">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbaocun"
          /></span>
          <span class="operation-text">{{ $t("comm.save") }}</span>
        </li>
        <!-- 提交 -->
        <li class="operation-item" @click="handleSubmit('submit')">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont icontijiao"
          /></span>
          <span class="operation-text">{{ $t("comm.submit") }}</span>
        </li>
        <!-- 审批履历 -->
        <li v-if="taskId" class="operation-item" @click="processDialog = true">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconshenpi"
          /></span>
          <span class="operation-text">{{
            $t("component.taskApprove.approval")
          }}</span>
        </li>
        <!-- 变更履历 -->
        <li
          v-if="id && !$route.query.copy"
          class="operation-item"
          @click="historyDialog = true"
        >
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-notebook-2"
          /></span>
          <span class="operation-text">{{ $t("comm.updateHis") }}</span>
        </li>
        <li class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconquxiao"
          /></span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
    <div v-if="processDialog">
      <process-detail
        :key="processInstId"
        :is-show="processDialog"
        :title="$t('component.taskApprove.detailedProcess') + processInstId"
        :process-inst-id="processInstId"
        @close="processDialog = false"
      />
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
        <span slot="title" style="font-size: 20px">{{
          $t("comm.updateHis")
        }}</span>
        <update-his
          :key="withdraw.identiferNum"
          func-div="prewithdraw"
          :identifer-num="withdraw.identiferNum"
        />
      </el-drawer>
    </div>
    <div class="depSelect">
      <el-dialog
        :title="'部门选择'"
        :visible.sync="selectDepartmentDialog"
        append-to-body
        custom-class="content-dialog-userSelect"
        :close-on-click-modal="false"
        width="25%"
      >
        <user-org-tree
          tree-type="department"
          :multiple="false"
          @select="handleTreeSelect"
          @cancel="selectDepartmentDialog = false"
          @clear="handleTreeClear"
        />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserOrgTree from '@/components/UserOrgTree.vue'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'TransferEdit',
  components: { RelFuncSelect, UserOrgTree, UserSelect },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      processDialog: false,
      selectDepartmentDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      withdraw: {
        totalAmountIn: '',
        totalAmountOut: '',
        workflowProcessInstId: '',
        attrs: {},
        detailsIn: [],
        detailsOut: []
      },
      fileList: [],
      distributionChannel: [
        { value: '渠道 01', lable: '01' },
        { value: '渠道 02', lable: '02' },
        { value: '渠道 03', lable: '03' }
      ],
      uses: [
        { value: '用途 01', lable: '01' },
        { value: '用途 02', lable: '02' },
        { value: '用途 03', lable: '03' }
      ],
      localChain: [
        { value: 'Local Chain 01', lable: '01' },
        { value: 'Local Chain 02', lable: '02' },
        { value: 'Local Chain 03', lable: '03' }
      ],
      inSalesOffice: [
        { value: 'Sales Office 01', lable: '01' },
        { value: 'Sales Office 02', lable: '02' },
        { value: 'Sales Office 03', lable: '03' }
      ],
      outSalesOffice: [
        { value: 'Sales Office 01', lable: '01' },
        { value: 'Sales Office 02', lable: '02' },
        { value: 'Sales Office 03', lable: '03' }
      ],
      prewithdrawType: [
        { value: '1', label: '合同费预提' },
        { value: '2', label: '活动费预提' }
      ],
      relFunc: ''
    }
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    },
    totalAmountIn: function() {
      if (this.withdraw.detailsIn && this.withdraw.detailsIn.length > 0) {
        const sum = this.withdraw.detailsIn.map(
          (item) => (!item.inAmount ? 0 : parseFloat(item.inAmount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    },
    totalAmountOut: function() {
      if (this.withdraw.detailsOut && this.withdraw.detailsOut.length > 0) {
        const sum = this.withdraw.detailsOut.map(
          (item) => (!item.outAmount ? 0 : parseFloat(item.outAmount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    }
  },
  watch: {},
  async created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.withdraw.companyName = '花王（上海）产品服务有限公司'
      this.withdraw.department = '销售本部华北区KA-G西北'
      this.withdraw.applyUserName = '张三'
      this.withdraw.applyUserNum = '010001'
      this.withdraw.applyDate = new Date()
      this.withdraw.currency = 'cny'
    }
  },
  methods: {
    async fetchData() {
      this.withdraw.workflowProcessInstId = 'test'
      this.withdraw.prewithdrawType = '合同费预提'
      this.withdraw.prewithdrawName = '合同费预提申请'
      this.withdraw.relIdentiferNum = 'CON20120001'
      this.withdraw.companyName = '花王（上海）产品服务有限公司'
      this.withdraw.department = '销售本部华北区KA-G西北'
      this.withdraw.applyDate = '2021-02-01'
      this.withdraw.applyUserName = '张三'
      this.withdraw.applyUserNum = '010001'
      this.withdraw.remark = '转入转出备注'
      this.withdraw.costIncurredCompany = '京东'
      this.withdraw.uses = '用途 01'
      this.withdraw.distributionChannel = '渠道 01'
      this.withdraw.paymentRemark = '付款信息备注'
      this.withdraw.baseRemark = '基本信息备注'
      this.withdraw.identiferNum = 'PRE20120001'
      this.withdraw.monitorNo = 'MON0001'
      this.withdraw.currency = 'cny'
      this.withdraw.oriFinancialDocNo = '00000001'
      this.withdraw.detailsIn.push({
        inSubjectNum: '409-1',
        inSubjectName: '销售折扣',
        inAccountNum: '460-300052',
        inPH2Num: 'ph201',
        inPH2Name: 'PH201名称',
        inLocalChainNum: 'Local Chain 01',
        inSalesOffice: 'Sales Office 01',
        inBrandNum: 'MED',
        subBrandName: 'MERRIES EXTRA DAY',
        inCG5Num: 'CG501',
        inAmount: '234.5',
        inReason: '合同费已计提'
      })
      this.withdraw.detailsIn.push({
        inSubjectNum: '409-2',
        inSubjectName: '销售折扣',
        inAccountNum: '460-300052',
        inLocalChainNum: 'Local Chain 02',
        inSalesOffice: 'Sales Office 02',
        inBrandNum: 'UV',
        inAmount: '234'
      })
      this.withdraw.detailsIn.push({
        inSubjectNum: '409-3',
        inSubjectName: '销售折扣',
        inAccountNum: '460-300052',
        inLocalChainNum: 'Local Chain 03',
        inSalesOffice: 'Sales Office 03',
        inBrandNum: 'MED',
        inAmount: '120.51'
      })
      this.withdraw.detailsOut.push({
        outSubjectNum: '409-1',
        outSubjectName: '销售折扣',
        outAccountNum: '460-300052',
        outPH2Num: 'ph201',
        outPH2Name: 'PH201名称',
        outLocalChainNum: 'Local Chain 01',
        outSalesOffice: 'Sales Office 01',
        outBrandNum: 'MED',
        outCG5Num: 'CG501',
        outAmount: '234.5',
        outReason: '合同费已计提'
      })
      this.withdraw.detailsOut.push({
        outSubjectNum: '409-1',
        outSubjectName: '销售折扣',
        outAccountNum: '460-300052',
        outLocalChainNum: 'Local Chain 02',
        outSalesOffice: 'Sales Office 02',
        outBrandNum: 'UV',
        outAmount: '234'
      })
      this.withdraw.detailsOut.push({
        outSubjectNum: '409-1',
        outSubjectName: '销售折扣',
        outAccountNum: '460-300052',
        outLocalChainNum: 'Local Chain 03',
        outSalesOffice: 'Sales Office 03',
        outBrandNum: 'MED',
        outAmount: '120.51'
      })
      this.isLoading = false
    },
    handleSubmit(submitType) {
      // for (const ref in this.$refs) {
      //   if (this.$refs[ref] && this.$refs[ref].length > 0) {
      //     const obj = this.$refs[ref][0]
      //     // 页面嵌套vue组件调用验证方法
      //     if (obj.hasOwnProperty('validatorAll')) {
      //       this.$refs[ref][0].validatorAll()
      //       if (!this.$refs[ref][0].validatorState) return false
      //     } else {
      //       // 本页面调用验证方法
      //       if (!this.validator(ref)) return false
      //     }
      //   }
      // }
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleAddDetail(type) {
      if (type === 'in') {
        this.withdraw.detailsIn.push({
          outSubjectNum: '',
          outSubjectName: '',
          outAccountNum: '',
          outLocalChainNum: '',
          outSalesOffice: '',
          outBrandNum: '',
          outAmount: ''
        })
      } else if (type === 'out') {
        this.withdraw.detailsOut.push({
          outSubjectNum: '',
          outSubjectName: '',
          outAccountNum: '',
          outLocalChainNum: '',
          outSalesOffice: '',
          outBrandNum: '',
          outAmount: ''
        })
      }
    },
    handleDeleteDetail(type, index) {
      if (type === 'in') {
        this.withdraw.detailsIn.splice(index, 1)
      } else if (type === 'out') {
        this.withdraw.detailsOut.splice(index, 1)
      }
    },
    handleTreeSelect(data) {
      // this[this.activeInput].name = data.text
      // this[this.activeInput].id = data.id
      this.withdraw.department = data.text
      this.selectDepartmentDialog = false
    },
    handleTreeClear() {
      // this[this.activeInput].name = ''
      // this[this.activeInput].id = ''
      this.withdraw.department = ''
      this.selectDepartmentDialog = false
    },
    openSelect() {
      // this.activeInput = activeInput
      // this.selectData = this[this.activeInput]
      this.selectDepartmentDialog = true
    },
    handleTypeChange(newValue) {
      this.relFunc = ''
      this.withdraw.relIdentiferNum = ''
      if (newValue === '1') {
        this.relFunc = 'contract'
      } else if (newValue === '2') {
        this.relFunc = 'transfer'
      }
    },
    handleUploadTemplate(type) {
      if (type === 'in') {
        this.withdraw.detailsIn = []
        this.withdraw.detailsIn.push({
          inSubjectNum: '409-1',
          inSubjectName: '销售折扣',
          inAccountNum: '460-300052',
          inPH2Num: 'ph201',
          inPH2Name: 'PH201名称',
          inLocalChainNum: 'Local Chain 01',
          inSalesOffice: 'Sales Office 01',
          inBrandNum: 'MED',
          subBrandName: 'MERRIES EXTRA DAY',
          inCG5Num: 'CG501',
          inAmount: '234.5',
          inReason: '合同费已计提'
        })
        this.withdraw.detailsIn.push({
          inSubjectNum: '409-2',
          inSubjectName: '销售折扣',
          inAccountNum: '460-300052',
          inLocalChainNum: 'Local Chain 02',
          inSalesOffice: 'Sales Office 02',
          inBrandNum: 'UV',
          inAmount: '234'
        })
        this.withdraw.detailsIn.push({
          inSubjectNum: '409-3',
          inSubjectName: '销售折扣',
          inAccountNum: '460-300052',
          inLocalChainNum: 'Local Chain 03',
          inSalesOffice: 'Sales Office 03',
          inBrandNum: 'MED',
          inAmount: '120.51'
        })
      } else if (type === 'out') {
        this.withdraw.detailsOut = []
        this.withdraw.detailsOut.push({
          outSubjectNum: '409-1',
          outSubjectName: '销售折扣',
          outAccountNum: '460-300052',
          outPH2Num: 'ph201',
          outPH2Name: 'PH201名称',
          outLocalChainNum: 'Local Chain 01',
          outSalesOffice: 'Sales Office 01',
          outBrandNum: 'MED',
          outCG5Num: 'CG501',
          outAmount: '234.5',
          outReason: '合同费已计提'
        })
        this.withdraw.detailsOut.push({
          outSubjectNum: '409-1',
          outSubjectName: '销售折扣',
          outAccountNum: '460-300052',
          outLocalChainNum: 'Local Chain 02',
          outSalesOffice: 'Sales Office 02',
          outBrandNum: 'UV',
          outAmount: '234'
        })
        this.withdraw.detailsOut.push({
          outSubjectNum: '409-1',
          outSubjectName: '销售折扣',
          outAccountNum: '460-300052',
          outLocalChainNum: 'Local Chain 03',
          outSalesOffice: 'Sales Office 03',
          outBrandNum: 'MED',
          outAmount: '120.51'
        })
      }
    },
    handleDownloadTemplate(type) {}
  }
}
</script>
