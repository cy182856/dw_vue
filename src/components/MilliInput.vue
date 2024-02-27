<template>
  <div class="el-input el-input--small form-group" :class="{'is-disabled':disabled}">
    <template v-if="!appendIn">
      <input
        class="el-input__inner form-field"
        style="text-align:right"
        type="text"
        :placeholder="placeholder"
        :value="value1"
        :disabled="disabled"
        @input="input($event.target.value)"
        @blur="blur($event)"
        @focus="focus"
      >
      <span v-if="append !==undefined && append !==''">{{ append }}</span>
    </template>
    <template v-else>
      <input
        class="el-input__inner form-field solt_inner"
        style="text-align:right"
        type="text"
        :placeholder="placeholder"
        :value="value1"
        :disabled="disabled"
        @input="input($event.target.value)"
        @blur="blur($event)"
        @focus="focus"
      >
      <span v-if="(append !==undefined && append !=='')&&(disabled)" class="slot">{{ append }}</span>
      <span v-if="(append !==undefined && append !=='')&&(!disabled)" :class="percentClass">{{ append }}</span>
    </template>
    <!-- <template v-else>
      <el-input
        class="el-input__append"
        style="text-align:right"
        :placeholder="placeholder"
        :value="value1"
        :disabled="disabled"
        @input="input($event.target.value)"
        @blur="blur($event)"
        @focus="focus"
      >
        <template slot="append">
          {{ append }}
        </template>
      </el-input>
    </template> -->
  </div>
</template>
<script>
import { toFixed, regTest } from '@/utils/util'
export default {
  name: 'IvMilliInput',
  model: {
    type: 'text',
    event: 'input'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'placeholder', 'toFixedNum', 'disabled', 'append', 'appendIn'],
  data() {
    return {
      value1: '',
      isFocus: false,
      percentClass: 'slotcolor'
    }
  },
  watch: {
    value(newValue) {
      if (!isNaN(Number(newValue)) && newValue !== '' && newValue !== null && newValue !== undefined) {
        if (this.isCut && newValue && regTest(newValue, /^[0-9][0-9 | .]*[0-9]*$/)) {
          // newValue = Number(newValue).toFixed(this.toFixedNumCom)
          newValue = Number(newValue).toFixed(this.toFixedNum)
          this.$emit('input', newValue)
        }
        // this.value1 = this.__format(toFixed(newValue, this.toFixedNumCom))
        this.value1 = this.__format(toFixed(newValue, this.toFixedNum))
      } else {
        this.value1 = newValue
      }
    }
  },
  // watch: {
  //   value(newValue) {
  //     if (newValue) {
  //       this.value1 = this.__format(toFixed(newValue, this.toFixedNum))
  //     } else {
  //       this.value1 = newValue
  //     }
  //   }
  // },
  created() {
    // const value = this.value
    if (!isNaN(Number(this.value)) && this.value !== '' && this.value !== null && this.value !== undefined) {
      this.value1 = this.__format(toFixed(this.value, this.toFixedNum))
    }
  },
  methods: {
    input(value) {
      if (!this.isFocus) {
        this.$emit('input', value)
      }
      this.value1 = value
    },
    blur(event) {
      // 失去焦点%样式
      this.percentClass = 'slotcolor'
      this.isFocus = false
      let inputValue = this.value1 && this.value1.toString().replace(/,/gi, '')
      if (inputValue !== undefined && inputValue !== '') {
        if (this.toFixedNum) {
          if (this.toFixedNum === 0 || this.toFixedNum === '0') {
            inputValue = inputValue.substring(0, inputValue.indexOf('.'))
          } else {
            inputValue = toFixed(inputValue, this.toFixedNum)
          }
        }
      }
      if (regTest(this.value1, /^[0-9][0-9 | .]*[0-9]*$/)) {
        this.value1 = this.__format(inputValue)
      }
      this.$emit('input', inputValue)
      setTimeout(() => {
        this.$emit('blur', inputValue)
      }, 50)
    },
    focus(event) {
      this.isFocus = true
      this.value1 = this.value && this.value.toString().replace(/,/gi, '')
      this.$emit('focus', event)
      this.percentClass = 'slotcolor1'
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
// .el-input__append > .el-input__inner {
//   border-right: 0 !important;
//   border-top-right-radius: 0 !important;
//   border-bottom-right-radius: 0 !important;
// }
// .el-input__append > .el-input__inner .el-input-group__append {
//   background-color: #F5F7FA !important;
//   border-color: 1px solid #E4E7ED !important;
//   border-top-right-radius: 5px !important;
//   border-bottom-right-radius: 5px !important;
// }
// .el-input-group__append {
//   background-color: #F5F7FA !important;
//   border-color: 1px solid #E4E7ED !important;
//   border-top-right-radius: 5px !important;
//   border-bottom-right-radius: 5px !important;
// }
.form-group {
  position: relative;
  display: flex;
  width: 100%;
  box-shadow: 0px 2px 4px 0px rgb(28 29 84 / 15%);
  .el-input__inner{
    flex: 1;
  }
  .solt_inner {
    border-right: 0;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    box-shadow: 0px 0px 0px 0px rgb(28 29 84 / 15%) !important ;
  }
  .form-field {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
    margin-top: 0;
    margin-bottom: 0;
  }
  span {
    text-align: center;
    padding: 0px 10px;
    font-size: 12px;
    color: var(--group-color);
    background: var(--group-background);
    border: 1px solid var(--group-border);
  }
  .slot {
    height: 28px;
    line-height: 28px;
    text-align: center;
    padding: 0px 10px !important;
    font-size: 12px;
    color: var(--group-color);
    background-color: #F5F7FA !important;
    border-right: 1px solid #E4E7ED !important;
    border-top: 1px solid #E4E7ED !important;
    border-bottom: 1px solid #E4E7ED !important;
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
  .slotcolor1 {
    height: 28px;
    line-height: 28px;
    text-align: center;
    padding: 0px 10px !important;
    font-size: 12px;
    color: var(--group-color);
    background-color: #ffffff !important;
    border-right: 1px solid #409EFF !important;
    border-top: 1px solid #409EFF !important;
    border-bottom: 1px solid #409EFF !important;
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
  .slotcolor {
    height: 28px;
    line-height: 28px;
    text-align: center;
    padding: 0px 10px !important;
    font-size: 12px;
    color: var(--group-color);
    background-color: #ffffff !important;
    border-right: 1px solid #ccc !important;
    border-top: 1px solid #ccc !important;
    border-bottom: 1px solid #ccc !important;
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
}
.input_box > div .input .el-input__inner {
    width: 1%;
}
</style>
