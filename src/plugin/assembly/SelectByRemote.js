
import assembly from './assembly'
export default class MSelectByRemote extends assembly {
  constructor(
    formType = 'SelectByRemote',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '远程下拉框',
    name = '远程下拉框',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'actionUrl', 'clearable', 'disabled', 'params', 'method', 'relParent'
    ]
    this.disabled = false
    this.actionUrl = ''
    this.clearable = true
    this.params = ''
    this.method = 'POST'
    this.relParent
  }
}
