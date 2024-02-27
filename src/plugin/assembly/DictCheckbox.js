
import assembly from './assembly'
export default class MDictCheckbox extends assembly {
  constructor(
    formType = 'DictCheckbox',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '复选框',
    name = '复选框',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'flexClass', 'dictTypeId',
      'disabled'
    ]
    this.dictTypeId = '11'
    this.disabled = false
  }
}
