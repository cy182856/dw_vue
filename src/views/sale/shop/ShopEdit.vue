<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">基本信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.shopNo") }}
              </div>
              <div class="input">
                <el-input v-model="form.number" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.district") }}
              </div>
              <div class="input">
                <el-select
                  v-model="form.district"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="华东大区" />
                  <el-option value="2" label="华中大区" />
                </el-select>
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.shopName") }}
              </div>
              <div class="input">
                <el-input v-model="form.name" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.shopAbbr") }}
              </div>
              <div class="input">
                <el-input v-model="form.nameabbr" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.shopStatus") }}
              </div>
              <div class="input">
                <el-select
                  v-model="form.shopStatus"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="正常" />
                  <el-option value="2" label="暂停营业" />
                </el-select>
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.shopLevel") }}
              </div>
              <div class="input">
                <el-select
                  v-model="form.shopLevel"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="A" />
                  <el-option value="2" label="B" />
                </el-select>
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.belongCustomer") }}
              </div>
              <div class="input">
                <el-select
                  v-model="form.belongCustomerValue"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="沃尔玛" />
                  <el-option value="2" label="家乐福" />
                </el-select>
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.customerNo") }}
              </div>
              <div class="input">
                <el-input v-model="form.customerNo" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.businessPre") }}
              </div>
              <div class="input">
                <user-select />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.salesandshops.goodsGroup") }}
              </div>
              <div class="input">
                <el-select
                  v-model="form.goodsGroup"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="铺货组1" />
                  <el-option value="2" label="铺货组2" />
                  <el-option value="3" label="铺货组3" />
                  <el-option value="4" label="特别铺货组1" />
                </el-select>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{
            $t("sale.shop.linkInfo")
          }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.province") }}
              </div>
              <div class="input">
                <dict-select
                  v-model="form.province"
                  dict-type-id="Province"
                  parent-id="153"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.city") }}
              </div>
              <div class="input">
                <dict-select
                  v-model="form.city"
                  dict-type-id="City"
                  :parent-id="form.province"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.county") }}
              </div>
              <div class="input">
                <el-input v-model="form.county" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.address") }}
              </div>
              <div class="input">
                <el-input v-model="form.address" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.tel") }}
              </div>
              <div class="input">
                <el-input v-model="form.tel" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.fax") }}
              </div>
              <div class="input">
                <el-input v-model="form.fax" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.code") }}
              </div>
              <div class="input">
                <el-input v-model="form.code" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t("sale.shop.linkPeople") }}
              </div>
              <div class="input">
                <el-input v-model="form.linkPeople" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit('save')">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbaocun"
          /></span>
          <span class="operation-text">{{ $t("comm.save") }}</span>
        </li>
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
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'RectificationEdit',
  components: { UserSelect },
  mixins: [names, UserSelect, formValidator, permission],
  data() {
    return {
      activeNames: ['1', '2'],
      form: {
        number: '',
        district: '',
        name: '',
        nameabbr: '',
        belongCustomerValue: '',
        customerNo: '',
        shopLevel: '',
        goodsGroup: '',
        province: '',
        city: '',
        county: '',
        address: '',
        shipAddress: '',
        tel: '',
        fax: '',
        code: '',
        linkPeople: ''
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.form.number = 'SFG-34-DS'
      this.form.district = '1'
      this.form.name = '孩子王1店'
      this.form.nameabbr = '孩子王'
      this.form.belongCustomerValue = '1'
      this.form.customerNo = 'OPD-2423'
      this.form.shopLevel = '1'
      this.form.goodsGroup = '1'
      this.form.province = '51008'
      this.form.city = ''
      this.form.address = '上海市'
      this.form.shipAddress = '上海市'
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    handleSubmit() {}
  }
}
</script>
