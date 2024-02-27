<template>
  <div>
    <div>
      <div class="input_box">
        <div class="flex2">
          <div class="title">
            {{ $t("sale.salesandshops.goodsGroupName") }}
          </div>
          <div class="input">
            <el-input v-model="name" :disabled="true" />
          </div>
        </div>
        <div class="flex2" />
      </div>
      <div>
        <el-transfer
          v-model="selectedFields"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入"
          :titles="[$t('comm.unselectShop'), $t('comm.selectShop')]"
          target-order="push"
          :data="fields"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedFields: [2],
      fields: [
        {
          key: 1,
          label: '门店1'
        },
        {
          key: 2,
          label: '门店2'
        },
        {
          key: 3,
          label: '门店3'
        },
        {
          key: 4,
          label: '门店4'
        }
      ]
    }
  },
  methods: {
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1
    }
  }
}
</script>
