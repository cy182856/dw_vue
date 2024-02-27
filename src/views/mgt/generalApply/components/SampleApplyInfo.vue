<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <!-- <div class="pagetitle">
        <span class="pagespan">{{ $t('mgt.generalApply.identiferNum') }}: {{ apply.identiferNum }} {{ $t('comm.version') }}: {{ apply.version }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.applyName') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.applyName" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.assignedUser') }}
              </div>
              <div class="input">
                <user-select v-model="applyDisplay.assignedUser" :disabled="disabled" />
              </div>
            </div>
          </div>

          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.accountNum') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.accountNum" :disabled="disabled" clearable />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.accountName') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.accountName" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.applyDate') }}
              </div>
              <div class="input">
                <el-date-picker v-model="applyDisplay.applyDate" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.useDetail') }}
              </div>
              <div class="input">
                <dict-radio v-model="applyDisplay.useDetail" :disabled="disabled" dict-type-id="HasNo" />
              </div>
            </div>
            <div class="flex3">
              <div class="title sub_title">
                {{ $t('mgt.generalApply.displayLabel') }}
                <p>{{ $t('mgt.generalApply.displayLabelComment') }}</p>
              </div>
              <div class="input">
                <dict-radio v-model="applyDisplay.displayLabel" :disabled="disabled" dict-type-id="HasNo" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.reciveReason') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.baseReciveReason" type="textarea" rows="3" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.salesOffice') }}<br>
                {{ $t('mgt.generalApply.dividePer') }}
              </div>
              <div class="input per">
                <el-checkbox-group
                  v-model="applyDisplay.expensePercent"
                >
                  <el-checkbox
                    v-for="item in expensePercent"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                    :disabled="disabled"
                  >
                    {{ item.dictName }}
                    <milli-input v-model="applyDisplay.expensePercentRatio[item.dictId]" :disabled="disabled || applyDisplay.expensePercent.indexOf(item.dictId) === -1" append="%" style="width:80px;text-align:right;line-height:15px!important" />
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.warehouse') }}
              </div>
              <div class="input per">
                <el-checkbox-group
                  v-model="applyDisplay.warehouse"
                >
                  <el-checkbox
                    v-for="item in warehouse"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                    :disabled="disabled"
                  >
                    {{ item.dictName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.deliveryAddress') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.deliveryAddress" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.deliveryReciver') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.deliveryReciver" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('mgt.generalApply.deliveryReciverTele') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.deliveryReciverTele" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.salesDepart') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.reciveReason') }}
              </div>
              <div class="input reason_chk">
                <el-checkbox-group
                  v-model="applyDisplay.reciveReason1"
                >
                  <el-checkbox
                    v-for="item in reciveReason1"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                    :disabled="disabled"
                  >
                    <div>
                      <span style="display: inline-block;width: 250px !important;margin-right:20px">{{ item.dictName }}</span>
                      <span>{{ $t('mgt.generalApply.moveType') }}</span>
                      <el-input v-model="applyDisplay.reciveReason1Input[item.dictId].moveType" class="el-input3" :disabled="true" />
                      <span>{{ $t('mgt.generalApply.financialAccount') }}</span>
                      <el-input v-model="applyDisplay.reciveReason1Input[item.dictId].financialAccount" class="el-input3" :disabled="true" />
                      <span v-if="applyDisplay.reciveReason1Input[item.dictId].moveType==='ZA5'">{{ $t('mgt.generalApply.costCenter') }}</span>
                      <el-input v-if="applyDisplay.reciveReason1Input[item.dictId].moveType==='ZA5'" v-model="applyDisplay.reciveReason1Input[item.dictId].costCenter" class="el-input3" :disabled="disabled || applyDisplay.reciveReason1.indexOf(item.dictId) === -1" />
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.marketDepart') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.reciveReason') }}
              </div>
              <div class="input reason_chk">
                <el-checkbox-group
                  v-model="applyDisplay.reciveReason2"
                >
                  <el-checkbox
                    v-for="item in reciveReason2"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                    :disabled="disabled"
                  >
                    <div>
                      <span style="display: inline-block;width: 250px !important;margin-right:20px">{{ item.dictName }}</span>
                      <span>{{ $t('mgt.generalApply.moveType') }}</span>
                      <el-input v-model="item.moveType" class="el-input3" :disabled="true" />
                      <span>{{ $t('mgt.generalApply.financialAccount') }}</span>
                      <el-input v-model="item.financialAccount" class="el-input3" :disabled="true" />
                      <span v-if="item.moveType==='ZA5'">{{ $t('mgt.generalApply.costCenter') }}</span>
                      <el-input v-if="item.moveType==='ZA5'" v-model="item.costCenter" class="el-input3" :disabled="disabled|| applyDisplay.reciveReason2.indexOf(item.dictId) === -1" />
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.managerPublicRelations') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.reciveReason') }}
              </div>
              <div class="input reason_chk">
                <el-checkbox-group
                  v-model="applyDisplay.reciveReason3"
                >
                  <el-checkbox
                    v-for="item in reciveReason3"
                    :key="item.dictId"
                    size="small"
                    :label="item.dictId"
                    :disabled="disabled"
                  >
                    <div>
                      <span class="chk_span3">
                        {{ item.dictName }}
                      </span>
                      <span>{{ $t('mgt.generalApply.department') }}</span>
                      <el-input v-model="item.department" class="el-input4" :disabled="true" />
                      <span>{{ $t('mgt.generalApply.moveType') }}</span>
                      <el-input v-model="item.moveType" class="el-input4" :disabled="true" />
                      <span>{{ $t('mgt.generalApply.financialAccount') }}</span>
                      <el-input v-model="item.financialAccount" class="el-input4" :disabled="true" />
                      <span v-if="item.moveType==='ZA5'">{{ $t('mgt.generalApply.costCenter') }}</span>
                      <el-input v-if="item.moveType==='ZA5'" v-model="item.costCenter" class="el-input4" :disabled="disabled|| applyDisplay.reciveReason3.indexOf(item.dictId) === -1" />
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.reciveDetail') }}</span>
          <div v-if="!disabled" class="add_table_row">
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddDetail">
              {{ $t('comm.addLine') }}
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="applyDisplay.details"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column
              v-if="!disabled"
              :label="$t('comm.operation')"
              align="center"
              width="70"
            >
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index)" />
              </template>
            </el-table-column>
            <el-table-column label="No." width="50" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="productNum" :label="$t('mgt.generalApply.productNum')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.productNum" />
                <span v-else>{{ scope.row.productNum }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="productName" :label="$t('mgt.generalApply.productName')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.productName" />
                <span v-else>{{ scope.row.productName }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="boxSpec" :label="$t('mgt.generalApply.boxSpec')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.boxSpec" />
                <span v-else>{{ scope.row.boxSpec }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="qty" :label="$t('mgt.generalApply.qty')" min-width="100" align="right">
              <template slot-scope="scope">
                <milli-input v-if="!disabled" v-model="scope.row.qty" />
                <span v-else>{{ scope.row.qty }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="unit" :label="$t('mgt.generalApply.unit')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-if="!disabled" v-model="scope.row.unit" />
                <span v-else>{{ scope.row.unit }} </span>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="6">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.remark') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.remark') }}
              </div>
              <div class="input">
                <el-input v-model="applyDisplay.remark" type="textarea" rows="3" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <span slot="title" class="collapse-title">{{ $t('mgt.generalApply.attachmentFile') }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t('mgt.generalApply.attachmentInfo') }}
              </div>
              <div class="input">
                <attachement v-model="applyDisplay.fileList" func-div="apply" :disabled="disabled" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
// import { getDetail } from '@/api/mgt/apply'
// import { getPageConfig } from '@/api/base.js'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import DictRadio from '@/components/DictRadio.vue'
// import applyPop from '@/views/mgt/apply/components/applyPop'
export default {
  name: 'SampleApplyInfo',
  components: { UserSelect, DictRadio },
  mixins: [names, formValidator],
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      default: 'detail'
    },
    disabled: {
      type: Boolean,
      default: true
    },
    apply: {
      type: Object,
      default: (_) => {}
    }
  },
  data() {
    return {
      applyId: this.id,
      applyDisplay: [],
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      selectUserDialog: false,
      processDialog: false,
      applyType: [
        { value: '1', label: '1：广告费&调查费申请' },
        { value: '2', label: '2：Promoter费用申请' },
        { value: '3', label: '3：样品/试用品申请' },
        { value: '4', label: '4：促销品申请' },
        { value: '5', label: '5：改票申请' },
        { value: '6', label: '6：退货申请' }],
      expensePercent: [
        { dictId: '1', dictName: '华东AV01' },
        { dictId: '2', dictName: '华南AV02' },
        { dictId: '3', dictName: '华西AV03' },
        { dictId: '4', dictName: '华北AV04' },
        { dictId: '5', dictName: '华东DB AVD1' },
        { dictId: '6', dictName: '华南DB AVD2' },
        { dictId: '7', dictName: '华西DB AVD3' },
        { dictId: '8', dictName: '华北DB AVD4' },
        { dictId: '9', dictName: 'ECAVE0' }],
      // reciveReason1: [{ dictId: '1', dictName: '赠品（交际用）', moveType: 'ZA5', financialAccount: '610-6162', costCenter: 'AV' },
      //   { dictId: '2', dictName: '活动促销赠品-产品领用（仅限TMK填写使用）', moveType: 'ZA3', financialAccount: '820-141001', costCenter: '' }],
      // reciveReason2: [{ dictId: '1', dictName: '赠品（交际用）', moveType: 'ZA5', financialAccount: '630-61', costCenter: 'AV' },
      //   { dictId: '2', dictName: '其他（消费者投诉）', moveType: 'ZA5', financialAccount: '630-98', costCenter: 'AV' },
      //   { dictId: '3', dictName: '产品检验（政府关联）', moveType: 'ZA5', financialAccount: '630-71', costCenter: 'AV' },
      //   { dictId: '4', dictName: '产品测试', moveType: 'ZA5', financialAccount: '630-80', costCenter: 'AV' },
      //   { dictId: '5', dictName: '商谈/市场活动使用', moveType: 'ZA3', financialAccount: '820-1201', costCenter: '' },
      //   { dictId: '6', dictName: '使用装派发', moveType: 'ZA3', financialAccount: '820-12', costCenter: '' },
      //   { dictId: '7', dictName: 'UNBW', moveType: 'ZA3', financialAccount: '820-12', costCenter: '' }
      // ],
      // reciveReason3: [{ dictId: '1', dictName: '赠品（交际用）', department: '公关室（AV103020）', moveType: 'ZA5', financialAccount: '630-61', costCenter: 'AV' },
      //   { dictId: '2', dictName: '赠品（交际用）', department: '总经理室（AV103022）', moveType: 'ZA5', financialAccount: '630-98', costCenter: 'AV' },
      //   { dictId: '3', dictName: '产品检验（政府关联）阿三发射点犯得上', department: '', moveType: 'ZA5', financialAccount: '630-71', costCenter: 'AV' }
      // ],
      reciveReason1: [
        { dictId: '1', dictName: '赠品（交际用）' },
        { dictId: '2', dictName: '活动促销赠品-产品领用（仅限TMK填写使用）' }],
      reciveReason2: [{ dictId: '1', dictName: '赠品（交际用）', moveType: 'ZA5', financialAccount: '630-61', costCenter: 'AV' },
        { dictId: '2', dictName: '其他（消费者投诉）', moveType: 'ZA5', financialAccount: '630-98', costCenter: 'AV' },
        { dictId: '3', dictName: '产品检验（政府关联）', moveType: 'ZA5', financialAccount: '630-71', costCenter: 'AV' },
        { dictId: '4', dictName: '产品测试', moveType: 'ZA5', financialAccount: '630-80', costCenter: 'AV' },
        { dictId: '5', dictName: '商谈/市场活动使用', moveType: 'ZA3', financialAccount: '820-1201', costCenter: '' },
        { dictId: '6', dictName: '使用装派发', moveType: 'ZA3', financialAccount: '820-12', costCenter: '' },
        { dictId: '7', dictName: 'UNBW', moveType: 'ZA3', financialAccount: '820-12', costCenter: '' }
      ],
      reciveReason3: [{ dictId: '1', dictName: '赠品（交际用）', department: '公关室（AV103020）', moveType: 'ZA5', financialAccount: '630-61', costCenter: 'AV' },
        { dictId: '2', dictName: '赠品（交际用）', department: '总经理室（AV103022）', moveType: 'ZA5', financialAccount: '630-98', costCenter: 'AV' },
        { dictId: '3', dictName: '产品检验（政府关联）', department: '', moveType: 'ZA5', financialAccount: '630-71', costCenter: 'AV' }
      ],
      warehouse: [
        { dictId: '1', dictName: '上海仓(AV20Z001)' },
        { dictId: '2', dictName: '总部小库(AV20Z001)' },
        { dictId: '3', dictName: '珂润仓库(AV20Z001)' },
        { dictId: '4', dictName: '合肥仓库(AV20Z001)' },
        { dictId: '5', dictName: '武汉仓(AV20Z001)' },
        { dictId: '6', dictName: '济南仓(AV20Z001)' },
        { dictId: '7', dictName: '广州仓(AV20Z001)' },
        { dictId: '8', dictName: '成都仓(AV20Z001)' },
        { dictId: '9', dictName: '天津仓(AV20Z001)' },
        { dictId: '10', dictName: '沈阳仓(AV20Z001)' },
        { dictId: '11', dictName: '西安仓(AV20Z001)' }]
    }
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.applyId = newValue
        this.fetchData()
      }
    },
    applyDisplay: {
      async handler(newValue, oldValue) {
        this.$emit('update', this.applyDisplay)
      }
    }
  },
  created() {
    this.applyDisplay = JSON.parse(JSON.stringify(this.apply))
  },
  methods: {
    async fetchData() {
      this.isLoading = false
    },
    handleAddDetail() {
      this.applyDisplay.details.push({
        productNum: '',
        productName: '',
        boxSpec: '',
        qty: '',
        unit: ''
      })
    },
    handleDeleteDetail(index) {
      this.applyDisplay.details.splice(index, 1)
    }
  }
}
</script>
