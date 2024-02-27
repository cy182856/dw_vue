<template>
  <div>
    <div>
      <div class="input_box">
        <div class="flex2">
          <div class="title">
            {{ $t("sale.salesandshops.goodsGroupName") }}
          </div>
          <div class="input">
            <el-input v-model="name" :disabled="mode === 'edit' ? false : true" />
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
          :titles="[$t('comm.unselectProuduct'), $t('comm.selectProuduct')]"
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
    },
    mode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fields: [
        {
          key: 1,
          label: '洁霸'
        },
        {
          key: 2,
          label: '碧柔'
        },
        {
          key: 3,
          label: '产品3'
        },
        {
          key: 4,
          label: '产品4'
        }
      ]
    }
  },
  computed: {
    selectedFields() {
      return this.name === '' ? [] : [2]
    }
  },
  methods: {
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1
    }
  }
}
</script>
