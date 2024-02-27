<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div v-loading="isisloading" class="detail">
      <!-- <div class="pagetitle">
        <span v-if="writeoff.identiferNum" class="pagespan">清账编号: {{ writeoff.identiferNum }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item v-show="writeoff.errorMsg!=null&&writeoff.errorMsg!=''" name="1">
          <span slot="title" class="collapse-title">警告信息</span>
          <div class="input_box">
            <div class="flex1">
              <span class="el-icon-warning" style="font-size:20px;color:orange;margin-right:20px;" />
              <div class="input">
                {{ writeoff.errorMsg }}
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                代理商名称
              </div>
              <div class="input">
                <el-input v-model="writeoff.custName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                提交部门
              </div>
              <div class="input">
                <!--                <el-input v-model="writeoff.submitOrg" :disabled="true" />-->
                <dict-select dict-type-id="ShowDept" :value="writeoff.submitOrg" :filter2="verifyYm.substr(0,4)" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                一级费目
              </div>
              <div class="input">
                <!--                <el-input v-model="writeoff.finAccountType" :disabled="true" />-->
                <dict-select dict-type-id="AccountTypeView" :value="writeoff.finAccountType" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                预定支付日
              </div>
              <div class="input">
                <el-date-picker v-model="writeoff.datePrePay" type="date" :writeoffable="false" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                发生年月
              </div>
              <div class="input">
                <el-input v-model="writeoff.verifyYm" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                对象年月
              </div>
              <div class="input">
                <el-input v-model="writeoff.objVerifyYm" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                实绩促销费用
              </div>
              <div class="input">
                <milli-input v-model="writeoff.actPromotion" class="input" to-fixed-num="2" maxlength="25" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                实绩支付费用
              </div>
              <div class="input">
                <milli-input v-model="writeoff.actPay" class="input" to-fixed-num="2" maxlength="25" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">费用信息</span>
          <el-table
            ref="table"
            v-loading="isLoading"
            max-height="720"
            :data="writeoff.detailList"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column prop="category" label="品类" min-width="100" align="center" />
            <el-table-column prop="accountName" label="二级费目" min-width="100" align="center" />
            <!--            <el-table-column prop="type" label="折扣方式" min-width="100" align="center" />-->
            <el-table-column prop="rate" label="税率" min-width="100" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.rate | numFormat(2) }}</span>
                <span v-if="scope.row.rate!==null">%</span>
              </template>
            </el-table-column>
            <el-table-column prop="bgtAmount" label="预算费用" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.bgtAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="estAmount" label="预估费用" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.estAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="exactAmount" label="精准预估费用" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.exactAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="estPayAmount" label="本月应付费用" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.estPayAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="forwardInAmount" label="结转进金额" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.forwardInAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="forwardOutAmount" label="结转出金额" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.forwardOutAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="forwardPayAmount" label="结转后应付金额" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.forwardPayAmount|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="col01" label="备注" min-width="100" align="center" />
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">其他费用</span>
          <el-table
            ref="table"
            v-loading="isLoading"
            max-height="720"
            :data="writeoff.deductList"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column prop="category" label="品类" min-width="100" align="center" />
            <template v-for="(item,index) in tableHead">
              <el-table-column :key="index" :label="item.accountName" align="right">
                <template v-if="item.accountCode in scope.row" slot-scope="scope">
                  {{ scope.row[item.accountCode]|numFormat(2) }}
                </template>
              </el-table-column>
            </template>
          </el-table>
        </el-collapse-item>
        <el-collapse-item v-if="quarterList!=null&&quarterList.length>0" name="5">
          <span slot="title" class="collapse-title">季度结转费用</span>
          <el-table
            ref="table"
            v-loading="isLoading"
            max-height="720"
            :data="quarterList"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column prop="accountName" label="费用类型" min-width="100" align="center" />
            <el-table-column prop="category" label="品类" min-width="100" align="center" />
            <!--            <el-table-column prop="firstMonth" label="1月" min-width="100" align="center" />
                        <el-table-column prop="secondMonth" label="2月" min-width="100" align="center" />
                        <el-table-column prop="thirdMonth" label="3月" min-width="100" align="center" />-->
            <template v-for="item in quarterHead">
              <el-table-column v-if="(item%3===1)" :key="item" :label="item+'月'" align="right">
                <template slot-scope="scope">
                  {{ scope.row.firstMonth|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column v-else-if="(item%3===2)" :key="item" :label="item+'月'" align="right">
                <template slot-scope="scope">
                  {{ scope.row.secondMonth|numFormat(2) }}
                </template>
              </el-table-column>
              <el-table-column v-else-if="(item%3===0)" :key="item" :label="item+'月'" align="right">
                <template slot-scope="scope">
                  {{ scope.row.thirdMonth|numFormat(2) }}
                </template>
              </el-table-column>
            </template>
            <el-table-column prop="quarterSum" label="合计" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.quarterSum|numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item v-if="yearList!=null&&yearList.length>0" name="6">
          <span slot="title" class="collapse-title">年度结转费用</span>
          <el-table
            ref="table"
            v-loading="isLoading"
            max-height="720"
            :data="yearList"
            style="margin-bottom: 20px;"
            :header-cell-style="{'text-align':'center'}"
            border
            stripe
          >
            <el-table-column prop="accountName" label="费用类型" min-width="100" align="center" />
            <el-table-column prop="category" label="品类" min-width="100" align="center" />
            <el-table-column prop="firstMonth" label="1月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.firstMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="secondMonth" label="2月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.secondMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="thirdMonth" label="3月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.thirdMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="fourthMonth" label="4月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.fourthMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="fifthMonth" label="5月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.fifthMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="sixthMonth" label="6月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.sixthMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="seventhMonth" label="7月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.seventhMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="eighthMonth" label="8月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.eighthMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="ninthMonth" label="9月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.ninthMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="tenthMonth" label="10月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.tenthMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="eleventhMonth" label="11月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.eleventhMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="twelfthMonth" label="12月" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.twelfthMonth|numFormat(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="yearSum" label="合计" min-width="100" align="right">
              <template slot-scope="scope">
                {{ scope.row.yearSum|numFormat(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="7">
          <span slot="title" class="collapse-title">其他信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                创建时间
              </div>
              <el-date-picker
                v-model="writeoff.createTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                创建者
              </div>
              <div class="input">
                <user-select
                  v-model="writeoff.createBy"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                最后修改时间
              </div>
              <el-date-picker
                v-model="writeoff.updateTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                最后修改者
              </div>
              <div class="input">
                <user-select
                  v-model="writeoff.updateBy"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
import { getDetailById } from '@/api/writeoff/apply.js'
export default {
  name: 'WriteoffFixed',
  components: { UserSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'detail'
    }
  },
  data() {
    return {
      isisloading: false,
      isLoading: false,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      writeoff: {},
      tableHead: [],
      quarterHead: [],
      fileList: [],
      quarterList: [],
      yearList: [],
      processDialog: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    verifyYm: function() {
      return this.$route.query.verifyYm
    }
  },
  watch: {
  },
  async created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isisloading = true
      // console.log(this.$route.query.id, 'this.$route.query.id111')
      const res = await getDetailById(this.$route.query.id)
      if (res && res.success) {
        this.writeoff = res.datas.data
        this.tableHead = this.writeoff.finList
        this.quarterList = this.writeoff.quarterList
        this.yearList = this.writeoff.yearList
        this.quarterHead = this.writeoff.quarterHeadList
        this.$emit('fixed', this.writeoff)
      }
      this.isisloading = false
    },
    datePrePayChange() {
      this.$emit('fixed', this.writeoff)
    }
  }
}
</script>
