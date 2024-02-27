<template>
  <div class="el-input el-input--small">
    <input
      class="el-input__inner"
      style="text-align:right"
      type="text"
      :placeholder="placeholder"
      :value="value1"
      @input="input($event.target.value)"
      @blur="blur($event)"
      @focus="focus"
    >
  </div>
</template>
<script>
export default {
  name: 'IvAmountInput',
  model: {
    type: 'text',
    event: 'input'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'placeholder'],
  // data() {
  //   return {
  //     value1: ''
  //   }
  // },
  computed: {
    value1: {
      get() {
        return this.__format(this.value)
      },
      set(newValue) {
        this.value1 = newValue
      }
    }
  },
  watch: {
    value(newValue) {
      console.log('watch value:' + newValue)
      if (newValue) {
        this.value1 = this.__format(newValue + '')
      } else {
        this.value1 = newValue
      }
    }
  },
  // created() {
  //   const value = this.value
  //   this.value1 = value
  // },
  methods: {
    input(value) {
      console.log('input value:' + value, this.value1)
      this.value1 = value
      this.$emit('input', value)
    },
    blur(event) {
      console.log('blur value:' + this.value1)
      // console.log(this.value1)
      this.value1 = this.__format(this.value1)
      this.$emit('blur', event)
    },
    focus(event) {
      console.log('focus value:' + this.value, this.value1)
      this.value1 = this.value.toString().replace(/,/gi, '')
      this.$emit('focus', event)
      // console.log(this.value)
    },
    __format(num) {
      let reg = null
      if (num.indexOf('.') > -1) {
        reg = /(\d)(?=(\d{3})+\.)/g
        return (num + '').replace(reg, '$1,')
      } else {
        reg = /\d{1,3}(?=(\d{3})+$)/g
        return (num + '').replace(reg, '$&,')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
