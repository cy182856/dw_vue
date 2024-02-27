<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <!-- <div class="pagetitle">
        <span v-if="writeoff.identiferNum" class="pagespan">清账编号: {{ writeoff.identiferNum }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">代理商</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                代理商名称
              </div>
              <div class="input">
                <el-input v-model="writeoff.name" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title must">
                代理商编码
              </div>
              <div class="input">
                <el-input v-model="writeoff.code" :disabled="true" />
              </div>
            </div>
            <!-- <div class="flex3">
              <div class="title">
                代理商简称
              </div>
              <div class="input">
                <el-input v-model="writeoff.namejc" :disabled="true" />
              </div>
            </div> -->
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                所在大区
              </div>
              <div class="input">
                <el-input v-model="writeoff.bigArea" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                所在小区
              </div>
              <div class="input">
                <el-input v-model="writeoff.smallArea" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                是否虚拟代理商
              </div>
              <div class="input">
                <el-select v-model="writeoff.agentxn" placeholder="请选择" :disabled="true">
                  <el-option
                    v-for="item in agentxns"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                是否直营代理商
              </div>
              <div class="input">
                <el-select v-model="writeoff.agentzy" placeholder="请选择" :disabled="disabled">
                  <el-option
                    v-for="item in agentzys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                营业担当
              </div>
              <div class="input">
                <user-select v-model="writeoff.toBear" :root-org-id="userInfo.orgSeqNo.split('.')[1]" :disabled="disabled" />
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
            <div class="flex3">
              <div class="title">
                渠道
              </div>
              <div class="input">
                <el-input v-model="writeoff.channel" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                线上/线下
              </div>
              <div class="input">
                <el-radio v-model="writeoff.radio2" label="1" :disabled="disabled">
                  线上
                </el-radio>
                <el-radio v-model="writeoff.radio2" label="2" :disabled="disabled">
                  线上
                </el-radio>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                关联部门
              </div>
              <div class="input">
                <el-input
                  v-model="writeoff.depart"
                  type="textarea"
                  :rows="3"
                  height="200px"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
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
import UserSelect from '@/components/UserSelect.vue'
import { numFormat } from '@/mixins/num-format.js'
export default {
  name: 'AgentInfo',
  components: { UserSelect },
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
      agentxns: [{ value: '是', lable: '01' }, { value: '否', lable: '02' }],
      agentzys: [{ value: '是', lable: '01' }, { value: '否', lable: '02' }],
      disabled: false,
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        radio: '2',
        radio2: '1'
      }
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
      this.writeoff.depart = '推进部,战略一科,战略二科,EC'
      this.writeoff.agentxn = '否'
      if (this.id === '1') {
        this.writeoff.code = '217304'
        this.writeoff.name = '上海麦田天然食品销售有限公司'
        this.writeoff.namejc = '上海麦田'
        this.writeoff.bigArea = 'KA'
        this.writeoff.smallArea = 'KA'
        this.writeoff.agentxn = '02'
        this.writeoff.mainProduct = ''
        this.writeoff.secondProduct = ''
        this.writeoff.agentzy = '否'
        this.writeoff.rate = '13%'
        this.writeoff.toBear = '担当甲'
        this.writeoff.channel = '实体店'
      }
      if (this.id === '2') {
        this.writeoff.code = '999999'
        this.writeoff.name = '战略1科'
        this.writeoff.namejc = '战略1科'
        this.writeoff.bigArea = '无'
        this.writeoff.smallArea = '无'
        this.writeoff.agentxn = '是'
        this.writeoff.mainProduct = ''
        this.writeoff.secondProduct = ''
        this.writeoff.agentzy = '否'
        this.writeoff.rate = ''
        this.writeoff.toBear = ''
        this.writeoff.channel = '无'
      }
      if (this.id === '3') {
        this.writeoff.code = '217394'
        this.writeoff.name = '山东省潍坊百货有限公司'
        this.writeoff.namejc = '潍坊百货'
        this.writeoff.bigArea = '华北'
        this.writeoff.smallArea = '山东'
        this.writeoff.agentxn = '否'
        this.writeoff.mainProduct = ''
        this.writeoff.secondProduct = ''
        this.writeoff.agentzy = '是'
        this.writeoff.rate = '13%'
        this.writeoff.toBear = '担当乙'
        this.writeoff.channel = '实体店'
      }
      if (this.id === '4') {
        this.writeoff.code = '999990'
        this.writeoff.name = '金币社'
        this.writeoff.namejc = '金币社'
        this.writeoff.bigArea = '无'
        this.writeoff.smallArea = '无'
        this.writeoff.agentxn = '是'
        this.writeoff.mainProduct = ''
        this.writeoff.secondProduct = ''
        this.writeoff.agentzy = '否'
        this.writeoff.rate = ''
        this.writeoff.toBear = ''
        this.writeoff.channel = '无'
      }
      this.writeoff.time1 = '2020-12-31 10:37:16'
      this.writeoff.time2 = '2020-12-31 10:37:16'
      this.writeoff.user = '系统管理员'
      this.writeoff.user2 = '系统管理员'

      // this.$emit('load', this.writeoff)
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
