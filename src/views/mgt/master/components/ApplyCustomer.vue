<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <span slot="title" class="collapse-title">{{
        $t("comm.essentialInformation")
      }}</span>
      <div class="input_box">
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.use") }}
          </div>
          <div class="input">
            <el-select v-model="form.use" :disabled="disabled">
              <el-option value="1" label="创建" />
              <el-option value="2" label="修改" />
              <el-option value="3" label="冻结" />
              <el-option value="4" label="解冻" />
            </el-select>
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.accountGroup") }}
          </div>
          <div class="input">
            <el-select v-model="form.accountGroup" :disabled="disabled">
              <el-option value="1" label="产品服务" />
              <el-option value="2" label="Sofina" />
              <el-option value="3" label="上海花王" />
            </el-select>
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.salesChannels") }}
          </div>
          <div class="input">
            <el-select v-model="form.salesChannels" :disabled="disabled">
              <el-option value="1" label="国内" />
              <el-option value="2" label="国内关联" />
              <el-option value="3" label="外销关联" />
            </el-select>
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.salesArea") }}
          </div>
          <div class="input">
            <el-input v-model="form.salesArea" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.warehouse") }}
          </div>
          <div class="input">
            <el-select v-model="form.warehouse" :disabled="disabled">
              <el-option value="1" label="上海" />
              <el-option value="2" label="合肥" />
              <el-option value="3" label="武汉" />
            </el-select>
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.creator") }}
          </div>
          <div class="input">
            <el-select v-model="form.creator" :disabled="disabled">
              <el-option value="1" label="售达方/开票方/付款方(ZH01)" />
              <el-option value="2" label="送达方(ZH03" />
            </el-select>
          </div>
        </div>
        <div v-show="form.creator === '1'" class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.payNo") }}
          </div>
          <div class="input">
            <el-input v-model="form.payNo" :disabled="disabled" />
          </div>
        </div>
        <div v-show="form.creator === '2'" class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.sendNo") }}
          </div>
          <div class="input">
            <el-input v-model="form.sendNo" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.customerAbbr") }}
          </div>
          <div class="input">
            <el-input v-model="form.customerAbbr" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.invoiceTitle") }}
          </div>
          <div class="input">
            <el-input v-model="form.invoiceTitle" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.customerEnCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.customerEnCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.customerEnAbbr") }}
          </div>
          <div class="input">
            <el-input v-model="form.customerEnAbbr" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.addrCn") }}
          </div>
          <div class="input">
            <el-input v-model="form.addrCn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.addrEn") }}
          </div>
          <div class="input">
            <el-input v-model="form.addrEn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.tel") }}
          </div>
          <div class="input">
            <el-input v-model="form.tel" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.postcode") }}
          </div>
          <div class="input">
            <el-input v-model="form.postcode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.province") }}
          </div>
          <div class="input">
            <el-input v-model="form.province" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.volumeCity") }}
          </div>
          <div class="input">
            <el-input v-model="form.volumeCity" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.cityGroup") }}
          </div>
          <div class="input">
            <el-input v-model="form.cityGroup" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.distributionRoute") }}
          </div>
          <div class="input">
            <el-input v-model="form.distributionRoute" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.taxpayerNo") }}
          </div>
          <div class="input">
            <el-input v-model="form.taxpayerNo" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.bankName") }}
          </div>
          <div class="input">
            <el-input v-model="form.bankName" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.bankAccount") }}
          </div>
          <div class="input">
            <el-input v-model="form.bankAccount" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.creditLine") }}
          </div>
          <div class="input">
            <el-input v-model="form.creditLine" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.settleMethod") }}
          </div>
          <div class="input">
            <el-input v-model="form.settleMethod" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.contractDis") }}
          </div>
          <div class="input">
            <el-input v-model="form.contractDis" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.contractDisPerid") }}
          </div>
          <div class="input">
            <el-input v-model="form.contractDisPerid" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.staffNo") }}
          </div>
          <div class="input">
            <el-input v-model="form.staffNo" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.staffCnName") }}
          </div>
          <div class="input">
            <el-input v-model="form.staffCnName" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.staffEnName") }}
          </div>
          <div class="input">
            <el-input v-model="form.staffEnName" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.customerGroup") }}
          </div>
          <div class="input">
            <el-input v-model="form.customerGroup" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.localChainCn") }}
          </div>
          <div class="input">
            <el-input v-model="form.localChainCn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.localChainEn") }}
          </div>
          <div class="input">
            <el-input v-model="form.localChainEn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.mailCity") }}
          </div>
          <div class="input">
            <el-input v-model="form.mailCity" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.mailCityPostcode") }}
          </div>
          <div class="input">
            <el-input v-model="form.mailCityPostcode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.customer.billingCustomer") }}
          </div>
          <div class="input">
            <el-input v-model="form.billingCustomer" :disabled="disabled" />
          </div>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <span slot="title" class="collapse-title">备注</span>
      <div class="input_box">
        <div class="flex1">
          <div class="title">
            备注
          </div>
          <div class="input">
            <el-input :disabled="disabled" type="textarea" rows="3" />
          </div>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <span slot="title" class="collapse-title">附件</span>
      <div class="input_box">
        <div class="flex1">
          <div class="title">
            附件信息
          </div>
          <div class="input">
            <attachement func-div="adjust" />
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: 'ApplyCustomer',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeNames: ['1', '2', '3'],
      form: {
        use: '',
        accountGroup: '',
        salesChannels: '',
        salesArea: '',
        warehouse: '',
        creator: '',
        payNo: '',
        sendNo: '',
        customerAbbr: '',
        invoiceTitle: '',
        customerEnCode: '',
        customerEnAbbr: '',
        addrCn: '',
        addrEn: '',
        tel: '',
        postcode: '',
        province: '',
        volumeCity: '',
        cityGroup: '',
        distributionRoute: '',
        taxpayerNo: '',
        bankName: '',
        bankAccount: '',
        creditLine: '',
        settleMethod: '',
        contractDis: '',
        contractDisPerid: '',
        staffNo: '',
        staffCnName: '',
        staffEnName: '',
        customerGroup: '',
        localChainCn: '',
        localChainEn: '',
        mailCity: '',
        mailCityPostcode: '',
        billingCustomer: ''
      }
    }
  }
}
</script>
