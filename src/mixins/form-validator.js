// 1:提供全部校验方法 this.validator(ref) 传入需要校验的ref数组
// 1-2:单个校验： this.validator(ref) 传入单个ref
/* <div class="input">
  <el-input v-model="addDilogInfo.money" placeholder="请输入内容" @blur="validator('money')" />
  <span ref="money" data-roles="number" :data-value="addDilogInfo.money" class="message" />
  注: span需要绑定ref以及提供两个自定义参数 data-roles:校验规则(以逗号分隔，例：a,b,c);
      data-value: 需要校验的值，一般是input所绑定的值。
</div> */

/* <el-select clearable v-model="addDilogInfo.subject" placeholder="请选择" class="input" @change="(value) => {validator('aa', value)}">
<el-option
  v-for="item in subjectList"
  :key="item"
  :value="item"
/>
</el-select>
<span ref="aa" data-roles="required" :data-value="addDilogInfo.subject" class="message" /> */
// 2:validatorState:校验变量，可用于判断校验是否通过，从而禁用提交按键
// 3:提供单个提示自定义接口, 可以手动打开提示
// rules为校验规则列表
import i18n from '@/i18n/index.js'
const rules = {
  required: {
    type: 'required',
    regexp: /^\S/,
    meg: i18n.t('validator.msg9') // '内容不能为空'
  },
  number: {
    type: 'number',
    regexp: /^(0|([1-9]\d*))(\.\d+)?$/,
    meg: i18n.t('validator.msg1') // 请输入数字

  },
  negativeNumber: {
    type: 'negativeNumber',
    regexp: /^([-+])?\d+(\.[0-9]*)?$/,
    meg: i18n.t('validator.msg1') // 请输入数字(允许负数)
  },
  positiveInt: {
    type: 'positiveInt',
    regexp: /^\+?[1-9]\d*$/,
    meg: i18n.t('validator.msg2') // '请输入大于0的正整数！'
  },
  positiveIntAnd0: {
    type: 'positiveIntAnd0',
    regexp: /^[0-9]*$/,
    meg: i18n.t('validator.msg3') // '请输入正整数或0！'
  },
  character: {
    type: 'character',
    regexp: /^[A-Za-z]+$/,
    meg: i18n.t('validator.msg4') // '请输入字母！'
  },
  charNum: {
    type: 'charNum',
    regexp: /^[A-Za-z0-9]+$/,
    meg: i18n.t('validator.msg5') // '请输入英数字！'
  },
  charNumUnderline: {
    type: 'charNumUnderline',
    regexp: /^[0-9a-zA-Z_]{1,}$/,
    meg: i18n.t('validator.msg6') // '请输入英数字或下划线！'
  },
  email: {
    type: 'email',
    regexp: /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/,
    meg: i18n.t('validator.msg7') // '请输入正确的Email地址！'
  },
  password: {
    type: 'password',
    // regexp: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,}$/,  英数字+特殊字符
    // regexp: /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/, // 英文和数字
    regexp: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 英文大小写和数字
    meg: i18n.t('validator.msg8') // '密码必须8位以上，并包含英文和数字！'
  },
  mobile: {
    type: 'mobile',
    regexp: /^[1][0-9]{10}$/, // 1开头的11位数字
    meg: i18n.t('validator.msg10') // '手机号码格式错误！'
  }
}
export const formValidator = {
  data() {
    return {
      validatorState: true
    }
  },
  methods: {
    // @ref: string | array
    validator(ref, ...arg) {
      this.validatorState = true
      if (typeof ref === 'string') {
        if (arg.length > 0) {
          this.__validatorOne(ref, arg[0])
        } else {
          this.__validatorOne(ref)
        }
      } else {
        ref.forEach(item => {
          this.__validatorOne(item)
        })
      }
      return this.validatorState
    },
    validatorAll(startStr) {
      this.validatorState = true
      if (this.$refs) {
        for (const item in this.$refs) {
          const isValiRef = this.$refs[item] && (this.$refs[item]['className'] ? this.$refs[item].className === 'message' : this.$refs[item][0] ? this.$refs[item][0].className === 'message' : false)
          if (this.$refs[item] && isValiRef) {
            if (startStr) {
              if (item.startsWith(startStr)) {
                this.__validatorOne(item)
              }
            } else {
              this.__validatorOne(item)
            }
          }
        }
      }
      return this.validatorState
    },
    __validatorOne(ref, value) {
      const refs = this.$refs[ref]
      let span = refs
      if (refs && refs.length && refs.length > 0) {
        span = refs[0]
      }

      const strRoles = span.getAttribute('data-roles')
      value = value === undefined ? span.getAttribute('data-value') : value
      // value = value.trim()
      const ruleList = strRoles ? strRoles.split(',') : []
      let message = ''
      let lang = true
      if (value) {
        ruleList.forEach(dataRole => {
          if (rules[dataRole]) {
            lang = rules[dataRole].regexp.test(value)
            if (!lang) {
              message = rules[dataRole].meg
              return false
            }
          }
        })
      } else {
        if (ruleList.find(item => item === 'required')) {
          message = i18n.t('validator.msg9')
          lang = false
        }
      }
      // if (!value || value.trim() === '') {
      //   message = '内容不能为空！'
      //   lang = false
      // }
      span.innerText = message
      if (message) {
        span.style.display = 'block'
      }
      if (this.validatorState) {
        this.validatorState = lang
      }
    },
    setValidatorMessage(ref, message) {
      // this.validatorState = false
      const refs = this.$refs[ref]
      const span = refs
      if (refs && refs.length && refs.length > 0) {
        if (span[0].$refs[ref]) {
          span[0].$refs[ref].innerText = message
        } else {
          span[0].innerText = message
        }
      } else {
        span.innerText = message
      }
    },
    clearErrorMessage(startStr) {
      if (this.$refs) {
        for (const item in this.$refs) {
          if (this.$refs[item] && this.$refs[item].length > 0) {
            if (this.$refs[item][0].className === 'message') {
              if (startStr) {
                if (item.startsWith(startStr)) {
                  this.$refs[item][0].innerText = ''
                }
              } else {
                this.$refs[item][0].innerText = ''
              }
            }
          } else if (this.$refs[item]) {
            if (this.$refs[item].className === 'message') {
              if (startStr) {
                if (item.startsWith(startStr)) {
                  this.$refs[item].innerText = ''
                }
              } else {
                this.$refs[item].innerText = ''
              }
            }
          }
        }
      }
    }
  }
}
