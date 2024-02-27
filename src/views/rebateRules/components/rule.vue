<template>
  <p>
    乙方应于每月第3个工作日向甲方提供次月的销售预估。乙方同时满足下面条件的，甲方将区分产品系列按含税订货金额（不含物流费）的<span :class="isEdit?'edit':''">
      0.5%
    </span>{{ isEdit ? '（参1）' : '' }}作为返利支付给乙方（甲乙双方第一次交易的，第一个月的第3工作日同时还应提供当月的销售预估，与当月的实际销售金额进行比较后确定销售预估返利）：<br>①. 乙方提交的全品类销售预估总金额不低于同期销售目标总金额的<span :class="isEdit?'edit':''">
      80%
    </span>{{ isEdit ? '（参2）' : '' }}；<br>②. 乙方本月的全品类实际订货总金额与上月提交的本月的销售预估总金额差异在<span :class="isEdit?'edit':''">
      -5%
    </span>{{ isEdit ? '（参3）' : '' }}之内的；<br> ③. 乙方本月单一产品系列实际订货金额不低于同期同产品系列销售预估的<span :class="isEdit?'edit':''">
      90%
    </span>{{ isEdit ? '（参4）' : '' }}；<br>================================================================<br>当预估为预算的90%以上时，返利提高到<span :class="isEdit?'edit':''">
      1%
    </span>{{ isEdit ? '（参5）' : '' }}
  </p>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.search-light .dialog-drag span,span{
  color: #ff0000;
}
span.edit{
  text-decoration: underline;
}
</style>>

