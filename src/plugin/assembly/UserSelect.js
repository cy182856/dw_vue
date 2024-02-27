
import assembly from './assembly'
export default class MTextarea extends assembly {
  constructor(
    formType = 'UserSelect',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '人员选择',
    name = '人员选择',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'flexClass', 'dataRoles',
      'disabled'
    ]
    this.disabled = false
    this.dataRoles = ''
  }
}
