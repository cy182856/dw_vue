<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="form.id" class="pagespan">Monitor NO.: {{ form.id }}</span>
      </div>
      <div
        style="
          width: 100%;
          background-color: white;
          border-radius: 11px;
          padding-top: 15px;
        "
      >
        <div class="input_box">
          <div class="flex3">
            <div
              class="title"
              style="margin-left: 20px; font-weight: bolder; padding-left: 10px"
            >
              申请类型
            </div>
            <div class="input">
              <dict-select
                v-model="form.masterDataType"
                :disabled="true"
                dict-type-id="MasterDataType"
              />
            </div>
          </div>
        </div>
      </div>
      <apply-customer v-show="form.masterDataType === '01'" :disabled="true" />
      <apply-supplier v-show="form.masterDataType === '02'" :disabled="true" />
    </div>
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
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
  </div>
</template>
<script>
import ApplyCustomer from './components/ApplyCustomer'
import ApplySupplier from './components/ApplySupplier'
export default {
  name: 'MasterDetail',
  components: {
    ApplyCustomer,
    ApplySupplier
  },
  data() {
    return {
      activeNames: ['1', '2', '3'],
      form: {
        id: '',
        masterDataType: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.$route.query.id === '1') {
        this.form.masterDataType = '01'
      } else {
        this.form.masterDataType = '02'
      }
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>
