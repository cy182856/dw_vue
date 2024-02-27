
import assembly from './assembly'
export default class MTextarea extends assembly {
  constructor(
    formType = 'Textarea',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '文本框',
    name = '文本框',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'autosize', 'flexClass', 'dataRoles', 'rows',
      'disabled', 'maxlength'
    ]
    this.disabled = false
    this.dataRoles = ''
    this.autosize = ''
    this.rows = 4
    this.maxlength = '500'
  }
}
