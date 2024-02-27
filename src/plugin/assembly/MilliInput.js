
import assembly from './assembly'
export default class MMilliInput extends assembly {
  constructor(
    formType = 'MilliInput',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '数字输入',
    name = '数字输入',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'flexClass', 'dataRoles', 'toFixedNum', 'append',
      'disabled'
    ]
    this.disabled = false
    this.dataRoles = ''
    this.toFixedNum = 0
    this.append = ''
  }
}
