<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t("customer.customerInfo") }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                {{ $t("customer.custFullName") }}
              </div>
              <div class="input">
                <el-input v-model="customer.custFullName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title must">
                {{ $t("customer.custCode") }}
              </div>
              <div class="input">
                <el-input v-model="customer.custCode" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title must">
                {{ $t("customer.custName") }}
              </div>
              <div class="input">
                <el-input v-model="customer.custName" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("customer.area1") }}
              </div>
              <div class="input">
                <el-input v-model="customer.area1" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("customer.area2") }}
              </div>
              <div class="input">
                <el-input v-model="customer.area2" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("customer.virtualFlag") }}
              </div>
              <div class="input">
                <dict-select v-model="customer.virtualFlag" value="customer.virtualFlag" dict-type-id="IsNo" placeholder="请选择" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("customer.directFlag") }}
              </div>
              <div class="input">
                <dict-select v-model="customer.directFlag" value="customer.directFlag" dict-type-id="IsNo" placeholder="请选择" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("customer.salesUser") }}
              </div>
              <div class="input">
                <user-select v-model="customer.salesUserId" :root-org-id="userInfo.orgSeqNo.split('.')[1]" :disabled="disabled" multiple />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("customer.deleteFlag") }}
              </div>
              <div class="input">
                <dict-radio v-model="customer.deleteFlag" dict-type-id="DeleteFlag" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("customer.col02") }}
              </div>
              <div class="input">
                <el-input v-model="customer.col02" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("customer.col03") }}
              </div>
              <div class="input">
                <el-input v-model="customer.col03" :disabled="disabled" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t("customer.col04") }}
              </div>
              <div class="input">
                <el-input v-model="customer.col04" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t("customer.ecFlag") }}
              </div>
              <div class="input">
                <dict-radio v-model="customer.ecFlag" dict-type-id="EcFlag" :disabled="disabled" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("customer.dept") }}
              </div>
              <div class="input">
                <el-input
                  v-model="customer.deptName"
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
          <span slot="title" class="collapse-title">{{ $t("customer.otherInfo") }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("customer.createTime") }}
              </div>
              <el-date-picker
                v-model="customer.createTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("customer.createBy") }}
              </div>
              <div class="input">
                <user-select
                  v-model="customer.createBy"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("customer.updateTime") }}
              </div>
              <el-date-picker
                v-model="customer.updateTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("customer.updateBy") }}
              </div>
              <div class="input">
                <user-select
                  v-model="customer.updateBy"
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
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">{{ $t("comm.save") }}</span>
          </li>
        </div>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconquxiao" />
          </span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { getDetail, customerSave } from '@/api/mrk/customer.js'
import { names } from '@/mixins/names.js'
import DictSelect from '@/components/DictSelect'
import DictRadio from '@/components/DictRadio'
import UserSelect from '@/components/UserSelect.vue'
export default {
  name: 'CustomerEdit',
  components: { UserSelect, DictSelect, DictRadio },
  mixins: [names, formValidator],
  data() {
    return {
      isLoading: true,
      activeNames: ['1', '2'],
      customer: {
        custCode: '',
        custName: '',
        area1: '',
        area2: '',
        salesUserId: '',
        virtualFlag: '',
        directFlag: '',
        deleteFlag: '',
        ecFlag: '',
        deptCode: '',
        createTime: '',
        createBy: '',
        updateTime: '',
        updateBy: ''
      },
      fileList: [],
      relFunc: ''
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
      const res = await getDetail(this.$route.query.id)
      if (res && res.success) {
        this.customer = res.datas.customer
        this.customer.deleteFlag = this.customer.deleteFlag.toString()
      }
      this.isLoading = false
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
        const res = await customerSave(this.customer)
        if (res && res.success) {
          this.$router.push('/mrk/customerList')
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
