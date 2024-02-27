
import assembly from './assembly'
export default class MDictRadio extends assembly {
  constructor(
    formType = 'DictRadio',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '单选按钮',
    name = '单选按钮',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'dictTypeId', 'dataRoles', 'flexClass']
    this.dictTypeId = ''
    this.dataRoles = ''
    this.rules = [
    ]
  }
}
