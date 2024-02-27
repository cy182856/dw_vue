<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                部门
              </div>
              <div class="input">
                <dict-select v-model="writeoff.deptCode" dict-type-id="Dept" placeholder="请选择" :disabled="true" @change="(value) => {validator('deptCode', value)}" />

                <span ref="deptCode" data-roles="required" :data-value="writeoff.deptCode" class="message" />
              </div>
            </div>
            <div class="flex3">
              <div class="title must">
                费目编码
              </div>
              <div class="input">
                <el-input v-model="writeoff.accountCode" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title must">
                费目名称
              </div>
              <div class="input">
                <el-input v-model="writeoff.accountName" :disabled="editDisabled" maxlength="50" @blur="validator('accountName')" />
                <span ref="accountName" data-roles="required" :data-value="writeoff.accountName" class="message" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                费目类别
              </div>
              <div class="input">
                <dict-select v-model="writeoff.accountType" dict-type-id="AccountType" placeholder="请选择" :disabled="disabled" @change="accountTypeChange();(value) => {validator('accountType', value)}" />
                <span ref="accountType" data-roles="required" :data-value="writeoff.accountType" class="message" />
              </div>
            </div>
            <div v-if="showCountType" class="flex3">
              <div class="title">
                计上方式
              </div>
              <div class="input">
                <dict-select v-model="writeoff.countType" dict-type-id="CountType" placeholder="请选择" :disabled="editDisabled" />
                <span ref="countType" data-roles="required" :data-value="writeoff.countType" class="message" />
              </div>
            </div>
            <div v-if="showCountType" class="flex3">
              <div class="title">
                二级费目
              </div>
              <div class="input">
                <el-select v-model="writeoff.othRelatedAcountCode" placeholder="请选择" :disabled="editDisabled">
                  <el-option
                    v-for="item in childFinAccountCodes"
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
                有效标志
              </div>
              <div class="input">
                <el-radio v-model="writeoff.deleteFlag" label="1" :disabled="editDisabled">
                  不启用
                </el-radio>
                <el-radio v-model="writeoff.deleteFlag" label="0" :disabled="editDisabled">
                  启用
                </el-radio>
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                适用期间
              </div>
              <div class="input">
                <el-date-picker
                  v-model="writeoff.startYear"
                  type="year"
                  placeholder="选择年"
                  value-format="yyyy"
                  :picker-options="pickerOptions0"
                  :disabled="editDisabled"
                  @blur="validator('startYear')"
                />
                <span :ref="'startYear'" data-roles="required" :data-value="writeoff.startYear" class="message" />
              </div>
              <span style="margin:0 20px;">至</span>
              <div class="input">
                <el-date-picker
                  v-model="writeoff.endYear"
                  type="year"
                  placeholder="选择年"
                  value-format="yyyy"
                  :picker-options="pickerOptions1"
                  :disabled="editDisabled"
                  @blur="validator('endYear')"
                />
                <span ref="endYear" data-roles="required" :data-value="writeoff.endYear" class="message" />
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
                  v-model="writeoff.col01"
                  type="textarea"
                  :rows="3"
                  height="200px"
                  maxlength="256"
                  :disabled="disabled"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-show="type != 'add'" name="2">
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
import { numFormat } from '@/mixins/num-format.js'
import { getDetail, getTreeListByDeptCode } from '@/api/mrk/subject.js'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'SubjectInfo',
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
      disabled: false,
      editDisabled: false,
      showCountType: false,
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        deptCode: '',
        accountCode: '',
        accountName: '',
        accountType: '',
        startYear: '',
        endYear: '',
        countType: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        deleteFlag: '',
        attrs: {
        },
        details: []
      },
      fileList: [],
      childFinAccountCodes: [],
      processDialog: false,
      pickerOptions0: {
        disabledDate: (time) => {
          if (!this.writeoff.endYear) { return time.getTime() < new Date('2021').getTime() }
          return time.getTime() > new Date(this.writeoff.endYear.replace(/-/g, '/')).getTime() || time.getTime() < new Date('2021').getTime()
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          if (!this.writeoff.startYear) { return time.getTime() < new Date('2021').getTime() }
          return time.getTime() < new Date(this.writeoff.startYear.replace(/-/g, '/')).getTime() || time.getTime() < new Date('2021').getTime()
        }
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
      this.editDisabled = true
      this.fetchData()
    } else if (this.type === 'edit') {
      this.disabled = true
      this.editDisabled = false
      this.fetchData()
    } else if (this.type === 'add') {
      // this.writeoff.deptCode = this.userInfo.orgId // 默认为当前登录者部门
      const deptList = this.$store.getters.dictList.Dept
      const targetList = this.$store.getters.dictList.TARGETORG
      let orgId = ''
      if (deptList && targetList) {
        for (let i = 0; i < deptList.length; i++) {
          for (let s = 0; s < targetList.length; s++) {
            if (targetList[s].dictName === deptList[i].dictId) {
              if (this.userInfo.orgSeqNo.indexOf(targetList[s].dictId) !== -1) {
                orgId = targetList[s].dictName
              }
            }
          }
        }
      }
      console.log(orgId, '===>orgId')
      this.writeoff.deptCode = orgId
      this.writeoff.deleteFlag = '0' // 有效标志默认有效
      this.$emit('subject', this.writeoff)
    }
  },
  methods: {
    async fetchData() {
      // 编辑和详细画面获取详细数据
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.writeoff = res.datas.finAccountinfo
        this.writeoff.deleteFlag = String(this.writeoff.deleteFlag)
      }
      this.$emit('subject', this.writeoff)
      this.accountTypeChange()
      this.isLoading = false
    },
    async accountTypeChange() {
      // if (this.writeoff.accountType === '') {
      //   this.validator('accountType')
      // } else {
      //   this.clearErrorMessage('accountType')
      // }
      if (this.writeoff.accountType === '3') {
        this.showCountType = true
        if (this.writeoff.deptCode) {
          const res = await getTreeListByDeptCode(this.writeoff.deptCode)
          if (res && res.success) {
            console.log('获取二级费目列表')
            if (res.datas.list) {
              for (let i = 0; i < res.datas.list.length; i++) {
                const childItem = {
                  value: res.datas.list[i].accountCode,
                  label: res.datas.list[i].accountName
                }
                this.childFinAccountCodes.push(childItem)
              }
              console.log(this.childFinAccountCodes)
            }
          }
        }
      } else {
        this.writeoff.countType = ''
        this.showCountType = false
      }
    },
    getChildData() {
      console.log(this.$refs, '父组件调用子组件的方法')
      console.log(this.validatorAll(), '子组件validatorAll值')
      if (this.validatorAll()) {
        return true
      }
      return false
    }
  }
}
</script>
