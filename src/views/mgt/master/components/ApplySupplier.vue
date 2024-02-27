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
              <el-option value="3" label="删除" />
              <el-option value="4" label="取消删除" />
              <el-option value="5" label="冻结" />
              <el-option value="6" label="解冻" />
            </el-select>
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.type") }}
          </div>
          <div class="input">
            <el-input v-model="form.type" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.code") }}
          </div>
          <div class="input">
            <el-input v-model="form.code" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.companyCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.companyCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.purchaseOrg") }}
          </div>
          <div class="input">
            <el-input v-model="form.purchaseOrg" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.accountGroup") }}
          </div>
          <div class="input">
            <el-input v-model="form.accountGroup" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.nameEn") }}
          </div>
          <div class="input">
            <el-input v-model="form.nameEn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.nameCn") }}
          </div>
          <div class="input">
            <el-input v-model="form.nameCn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.keyWord1En") }}
          </div>
          <div class="input">
            <el-input v-model="form.keyWord1En" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.keyWord1Cn") }}
          </div>
          <div class="input">
            <el-input v-model="form.keyWord1Cn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.keyWord2En") }}
          </div>
          <div class="input">
            <el-input v-model="form.keyWord2En" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.keyWord2Cn") }}
          </div>
          <div class="input">
            <el-input v-model="form.keyWord2Cn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.addr1En") }}
          </div>
          <div class="input">
            <el-input v-model="form.addr1En" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.addr2En") }}
          </div>
          <div class="input">
            <el-input v-model="form.addr2En" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.cityEn") }}
          </div>
          <div class="input">
            <el-input v-model="form.cityEn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.addr1Cn") }}
          </div>
          <div class="input">
            <el-input v-model="form.addr1Cn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.addr2Cn") }}
          </div>
          <div class="input">
            <el-input v-model="form.addr2Cn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.cityCn") }}
          </div>
          <div class="input">
            <el-input v-model="form.cityCn" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.postcode") }}
          </div>
          <div class="input">
            <el-input v-model="form.postcode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.countryCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.countryCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.countyCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.countyCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.tel1") }}
          </div>
          <div class="input">
            <el-input v-model="form.tel1" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.fax1") }}
          </div>
          <div class="input">
            <el-input v-model="form.fax1" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.tel2") }}
          </div>
          <div class="input">
            <el-input v-model="form.tel2" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.fax2") }}
          </div>
          <div class="input">
            <el-input v-model="form.fax2" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.linkman") }}
          </div>
          <div class="input">
            <el-input v-model="form.linkman" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.linkdepa") }}
          </div>
          <div class="input">
            <el-input v-model="form.linkdepa" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.email") }}
          </div>
          <div class="input">
            <el-input v-model="form.email" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.language") }}
          </div>
          <div class="input">
            <el-input v-model="form.language" :disabled="disabled" />
          </div>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <span slot="title" class="collapse-title">{{
        $t("comm.subjectControl")
      }}</span>
      <div class="input_box">
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.customerCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.customerCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.tradePart") }}
          </div>
          <div class="input">
            <el-input v-model="form.tradePart" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.groupCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.groupCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.industryType") }}
          </div>
          <div class="input">
            <el-input v-model="form.industryType" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.serAgnProcGrp") }}
          </div>
          <div class="input">
            <el-input v-model="form.serAgnProcGrp" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.paymentTrans") }}
          </div>
          <div class="input">
            <el-input v-model="form.paymentTrans" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.reason") }}
          </div>
          <div class="input">
            <el-input v-model="form.reason" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.bankCountryCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.bankCountryCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.bankName") }}
          </div>
          <div class="input">
            <el-input v-model="form.bankName" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.bankAccount") }}
          </div>
          <div class="input">
            <el-input v-model="form.bankAccount" :disabled="disabled" />
          </div>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <span slot="title" class="collapse-title">{{
        $t("comm.accountingInformation")
      }}</span>
      <div class="input_box">
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.reconciliation") }}
          </div>
          <div class="input">
            <el-input v-model="form.reconciliation" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.sort") }}
          </div>
          <div class="input">
            <el-input v-model="form.sort" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.cashGroup") }}
          </div>
          <div class="input">
            <el-input v-model="form.cashGroup" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.paymentProvision") }}
          </div>
          <div class="input">
            <el-input v-model="form.paymentProvision" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.paymentCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.paymentCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.checkDoubleCode") }}
          </div>
          <div class="input">
            <el-input v-model="form.checkDoubleCode" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.paymentType") }}
          </div>
          <div class="input">
            <el-input v-model="form.paymentType" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.acct") }}
          </div>
          <div class="input">
            <el-input v-model="form.acct" :disabled="disabled" />
          </div>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item name="4">
      <span slot="title" class="collapse-title">{{
        $t("comm.purchasingInformation")
      }}</span>
      <div class="input_box">
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.orderCurrency") }}
          </div>
          <div class="input">
            <el-input v-model="form.orderCurrency" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.paymentProvisionDay") }}
          </div>
          <div class="input">
            <el-input v-model="form.paymentProvisionDay" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.internationalTerm") }}
          </div>
          <div class="input">
            <el-input v-model="form.internationalTerm" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.text") }}
          </div>
          <div class="input">
            <el-input v-model="form.text" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.programmeGroup") }}
          </div>
          <div class="input">
            <el-input v-model="form.programmeGroup" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.priceDateCategory") }}
          </div>
          <div class="input">
            <el-input v-model="form.priceDateCategory" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.abcTag") }}
          </div>
          <div class="input">
            <el-input v-model="form.abcTag" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.createAutoOrder") }}
          </div>
          <div class="input">
            <el-input v-model="form.createAutoOrder" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.invoiceCheck") }}
          </div>
          <div class="input">
            <el-input v-model="form.invoiceCheck" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.patnerFunctionOA") }}
          </div>
          <div class="input">
            <el-input v-model="form.patnerFunctionOA" :disabled="disabled" />
          </div>
        </div>
        <div class="flex3">
          <div class="title">
            {{ $t("mgt.apply.supplier.patnerFunctionY5") }}
          </div>
          <div class="input">
            <el-input v-model="form.patnerFunctionY5" :disabled="disabled" />
          </div>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item name="5">
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
    <el-collapse-item name="6">
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
  name: 'ApplySupplier',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeNames: ['1', '2', '3', '4', '5', '6'],
      form: {
        use: '',
        type: '',
        code: '',
        companyCode: '',
        purchaseOrg: '',
        accountGroup: '',
        nameEn: '',
        nameCn: '',
        keyWord1En: '',
        keyWord1Cn: '',
        keyWord2En: '',
        keyWord2Cn: '',
        addr1En: '',
        addr2En: '',
        cityEn: '',
        addr1Cn: '',
        addr2Cn: '',
        cityCn: '',
        postcode: '',
        countryCode: '',
        countyCode: '',
        tel1: '',
        fax1: '',
        tel2: '',
        fax2: '',
        linkman: '',
        linkdepa: '',
        email: '',
        language: '',
        customerCode: '',
        tradePart: '',
        groupCode: '',
        industryType: '',
        serAgnProcGrp: '',
        paymentTrans: '',
        reason: '',
        bankCountryCode: '',
        bankName: '',
        bankAccount: '',
        reconciliation: '',
        sort: '',
        cashGroup: '',
        paymentProvision: '',
        paymentCode: '',
        checkDoubleCode: '',
        paymentType: '',
        acct: '',
        orderCurrency: '',
        paymentProvisionDay: '',
        internationalTerm: '',
        text: '',
        programmeGroup: '',
        priceDateCategory: '',
        abcTag: '',
        createAutoOrder: '',
        invoiceCheck: '',
        patnerFunctionOA: '',
        patnerFunctionY5: ''
      }
    }
  }
}
</script>
