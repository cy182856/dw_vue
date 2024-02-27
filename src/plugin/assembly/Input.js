
import assembly from './assembly'
export default class MInput extends assembly {
  constructor(
    formType = 'Input',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '输入框',
    name = '输入框',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'disabled', 'flexClass', 'dataRoles', 'isHide', 'append', 'maxlength', 'clearable'

    ]
    this.disabled = false
    this.dataRoles = ''
    this.isHide = false
    this.append = ''
    this.maxlength = 50
    this.clearable = true
  }
}
