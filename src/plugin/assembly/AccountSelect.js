
import assembly from './assembly'
export default class MAccountSelect extends assembly {
  constructor(
    formType = 'AccountSelect',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '客户选择',
    name = '客户选择',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'flexClass', 'dataRoles', 'disabled'
    ]
    this.disabled = false
    this.dataRoles = ''
  }
}
