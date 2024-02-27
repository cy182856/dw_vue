<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div v-loading="isisloading" class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t("terminal.terminalInfo") }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                {{ $t("terminal.terminalName") }}
              </div>
              <div class="input">
                <el-input v-model="terminal.terminalName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title must">
                {{ $t("terminal.terminalCode") }}
              </div>
              <div class="input">
                <el-input v-model="terminal.terminalCode" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("terminal.terminalNameAlias") }}
              </div>
              <div class="input">
                <el-input v-model="terminal.terminalNameAlias" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("terminal.custCode") }}
              </div>
              <div class="input">
                <rel-func-select v-model="terminal.custCode" rel-func="customer" item-name="custCode" :is-get-name="true" :is-display-tip="false" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("terminal.custName2") }}
              </div>
              <div class="input">
                <el-input v-model="terminal.custCodeName2" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("terminal.keyFlag") }}
              </div>
              <div class="input">
                <dict-select v-model="terminal.keyFlag" value="terminal.keyFlag" dict-type-id="KeyFlag" placeholder="请选择" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("terminal.channel") }}
              </div>
              <div class="input">
                <dict-select v-model="terminal.channel" value="terminal.channel" dict-type-id="ChannelType" placeholder="请选择" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("terminal.dept") }}
              </div>
              <div class="input">
                <el-input v-model="terminal.dept" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title" />
              <div class="input">
                <el-checkbox v-model="terminal.col01" true-label="1" false-label="0" :disabled="disabled">
                  {{ $t("terminal.col01") }}
                </el-checkbox>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("terminal.deleteFlag") }}
              </div>
              <div class="input">
                <dict-radio v-model="terminal.deleteFlag" dict-type-id="DeleteFlag" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("terminal.remark") }}
              </div>
              <div class="input">
                <el-input
                  v-model="terminal.remark"
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
          <span slot="title" class="collapse-title">{{ $t("terminal.otherinfo") }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("terminal.createTime") }}
              </div>
              <el-date-picker
                v-model="terminal.createTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("terminal.createBy") }}
              </div>
              <div class="input">
                <user-select
                  v-model="terminal.createBy"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("terminal.updateTime") }}
              </div>
              <el-date-picker
                v-model="terminal.updateTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("terminal.updateBy") }}
              </div>
              <div class="input">
                <user-select
                  v-model="terminal.updateBy"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <div v-if="this.$route.query.type=='edit'">
          <li class="operation-item" @click="handleSubmit">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
            <span class="operation-text">{{ $t('comm.save') }}</span>
          </li>
        </div>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { terminalSave, getDetail } from '@/api/mrk/terminal.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import DictSelect from '@/components/DictSelect'
import DictRadio from '@/components/DictRadio'
import RelFuncSelect from '@/components/RelFuncSelect.vue'
export default {
  name: 'TerminalEdit',
  components: { UserSelect, DictSelect, DictRadio, RelFuncSelect },
  mixins: [names, formValidator],
  props: {
  },
  data() {
    return {
      isisloading: false,
      activeNames: ['1', '2'],
      isLoading: true,
      terminal: {
        terminalName: '',
        terminalCode: '',
        custCode: '',
        keyFlag: '',
        channel: '',
        dept: '',
        col01: '',
        deleteFlag: '',
        createTime: '',
        createBy: '',
        updateTime: '',
        updateBy: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  async created() {
    if (this.$route.query.type === 'info') {
      this.disabled = true
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isisloading = true
      const res = await getDetail(this.$route.query.id)
      if (res && res.success) {
        this.terminal = res.datas.terminal
        this.terminal.deleteFlag = this.terminal.deleteFlag.toString()
        this.$emit('load', this.terminal)
      }
      this.isLoading = false
      this.isisloading = false
    },
    handleSubmit(submitType) {
      if (!this.validatorAll()) {
        return false
      }
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await terminalSave(this.terminal)
        if (res && res.success) {
          this.$router.push('/mrk/terminalList')
          this.$emit('handleClose')
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>
