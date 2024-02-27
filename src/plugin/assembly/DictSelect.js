
import assembly from './assembly'
export default class MDictSelect extends assembly {
  constructor(
    formType = 'DictSelect',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '下拉框',
    name = '下拉框',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'flexClass', 'dictTypeId', 'dataRoles', 'disabled', 'width', 'relParent']
    this.dictTypeId = ''
    this.dataRoles = ''
    this.disabled = false
    this.width = 0
    this.relParent = ''
  }
}
