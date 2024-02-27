
import assembly from './assembly'
export default class MAttachment extends assembly {
  constructor(
    formType = 'Attachment',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '附件',
    name = '附件',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'flexClass',
      'funcDiv', 'disabled'
    ]
    this.disabled = false
    this.funcDiv = ''
  }
}
