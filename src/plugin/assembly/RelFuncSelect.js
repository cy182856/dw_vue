
import assembly from './assembly'
export default class MRelFuncSelect extends assembly {
  constructor(
    formType = 'RelFuncSelect',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '关联弹出框',
    name = '关联弹出框',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'flexClass', 'dataRoles',
      'disabled', 'relFunc'
    ]
    this.disabled = false
    this.dataRoles = ''
    this.relFunc = 'lead'
  }
}
