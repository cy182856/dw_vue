
import assembly from './assembly'
export default class MDictAutoComplete extends assembly {
  constructor(
    formType = 'DictAutoComplete',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '可追加下拉框',
    name = '可追加下拉框',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'dictTypeId', 'dataRoles', 'flexClass']
    this.dictTypeId = ''
    this.dataRoles = ''
  }
}
