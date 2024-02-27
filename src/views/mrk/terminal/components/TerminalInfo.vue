<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <!-- <div class="pagetitle">
        <span v-if="writeoff.identiferNum" class="pagespan">清账编号: {{ writeoff.identiferNum }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">终端详情</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                终端名称
              </div>
              <div class="input">
                <el-input v-model="writeoff.name" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title must">
                终端编码
              </div>
              <div class="input">
                <el-input v-model="writeoff.code" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                关联代理商
              </div>
              <div class="input">
                <rel-func-select v-model="writeoff.account" :rel-func="'account'" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                是否重点
              </div>
              <div class="input">
                <el-select v-model="writeoff.category" placeholder="请选择" :disabled="disabled">
                  <el-option
                    v-for="item in categorys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <!-- <div class="flex3">
              <div class="title">
                担当
              </div>
              <div class="input">
                <user-select v-model="writeoff.bear" :root-org-id="userInfo.orgSeqNo.split('.')[1]" :disabled="disabled" />
              </div>
            </div> -->
            <div class="flex3">
              <div class="title">
                渠道
              </div>
              <div class="input">
                <el-input v-model="writeoff.channel" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                部门
              </div>
              <div class="input">
                <el-input v-model="writeoff.departs" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title" />
              <div class="input">
                <el-checkbox v-model="writeoff.checked" :disabled="disabled">
                  特殊
                </el-checkbox>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                有效标志
              </div>
              <div class="input">
                <el-radio v-model="writeoff.radio" label="1" :disabled="disabled">
                  无效
                </el-radio>
                <el-radio v-model="writeoff.radio" label="2" :disabled="disabled">
                  有效
                </el-radio>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("fee.promotion.remark") }}
              </div>
              <div class="input">
                <el-input
                  v-model="writeoff.remark"
                  type="textarea"
                  :rows="3"
                  height="200px"
                  :disabled="disabled"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item name="2">
          <span slot="title" class="collapse-title">终端价格</span>
          <div v-if="!disabled" class="add_table_row titlemin">
            <el-button class="editbtn" size="mini" icon="el-icon-circle-plus-outline" @click.stop="handleAddInvoice">
              增加一行
            </el-button>
          </div>
          <el-table
            ref="table"
            :data="writeoff.details"
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
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDetail(scope.$index, '1')" />
              </template>
            </el-table-column>
            <el-table-column label="系别" min-width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" clearable :disabled="disabled" />
              </template>
            </el-table-column>
            <el-table-column label="价格详情" min-width="70">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" clearable :disabled="disabled" />
              </template>
            </el-table-column>
            <el-table-column prop="people" label="更新人" min-width="170" align="center" />
            <el-table-column prop="time" label="更新时间" min-width="170" align="center" />
          </el-table>
        </el-collapse-item> -->
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">其他信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                创建时间
              </div>
              <el-date-picker
                v-model="writeoff.time1"
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
                  v-model="writeoff.user"
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
                v-model="writeoff.time2"
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
                  v-model="writeoff.user2"
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
import RelFuncSelect from '@/components/RelFuncSelect.vue'
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'TerminalInfo',
  components: { UserSelect, RelFuncSelect },
  mixins: [names, formValidator, permission, dict, numFormat],
  props: {
    // id: {
    //   type: String,
    //   required: true
    // },
    type: {
      type: String,
      default: 'detail'
    }
  },
  data() {
    return {
      categorys: [{ value: '是', lable: '01' }, { value: '否', lable: '02' }],
      disabled: false,
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        checked: true,
        radio: '1',
        attrs: {
        },
        details: []
      },
      fileList: [],
      processDialog: false,
      paymentType: [{ value: '合同费支付', lable: '01' }, { value: '活动费支付', lable: '02' }],
      paymentMethod: [{ value: '银行转账', lable: '01' }, { value: '支付宝', lable: '02' }],
      attachmentAddStatus: [{ value: '有发票', lable: '01' }, { value: '无发票', lable: '02' }],
      expenseAccountNum: [{ value: '066901', lable: '01' }, { value: '066902', lable: '02' }],
      uses: [{ value: '用途 01', lable: '01' }, { value: '用途 02', lable: '02' }, { value: '用途 03', lable: '03' }]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  watch: {
  },
  async created() {
    if (this.type === 'info') {
      this.disabled = true
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.writeoff.code = '217304'
      this.writeoff.name = '苏宁红孩子'
      this.writeoff.account = '南京维福'
      this.writeoff.category = '是'
      this.writeoff.bear = '担当甲'
      this.writeoff.channel = 'BS'
      this.writeoff.remark = '备注1'
      this.writeoff.time1 = '2020-12-31 10:37:16'
      this.writeoff.time2 = '2020-12-31 10:37:16'
      this.writeoff.user = '系统管理员'
      this.writeoff.user2 = '系统管理员'
      this.writeoff.departs = '战略一课'

      this.writeoff.details.push({
        name: '天使',
        price: '100',
        people: 'admin',
        time: '2021/3/28 18:42:00'
      })
      this.writeoff.details.push({
        name: '光羽',
        price: '100',
        people: 'admin',
        time: '2021/3/28 18:42:00'
      })
      this.writeoff.details.push({
        name: '鎏金',
        price: '90',
        people: 'admin',
        time: '2021/3/28 18:42:00'
      })
      this.writeoff.details.push({
        name: '维E',
        price: '90',
        people: 'admin',
        time: '2021/3/28 18:42:00'
      })
      // this.$emit('load', this.writeoff)
      this.isLoading = false
    },
    handleAddInvoice() {
      var curr_time = new Date()
      var strDate = curr_time.getYear() + 1900 + '/'
      strDate += curr_time.getMonth() + 1 + '/'
      strDate += curr_time.getDate() + ' '
      strDate += curr_time.getHours() + ':'
      strDate += curr_time.getMinutes() + ':'
      strDate += curr_time.getSeconds()
      this.writeoff.details.push({
        name: '',
        price: '',
        people: 'admin',
        time: strDate
      })
    },
    handleDeleteDetail(index, type) {
      this.writeoff.details.splice(index, 1)
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
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      console.log(columns)
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 3 || index === 4 || index === 5 || index === 7) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index]
          } else {
            sums[index] = 'N/A'
          }
        }
      })
      return sums
    }

  }
}
</script>
