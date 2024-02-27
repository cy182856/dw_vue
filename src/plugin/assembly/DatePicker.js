
import assembly from './assembly'
export default class MDatePicker extends assembly {
  constructor(
    formType = 'DatePicker',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '日期',
    name = '日期',
    showName = ''
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'fieldName', 'flexClass', 'disabled', 'dataRoles', 'dateType', 'dateFormat']
    this.disabled = false
    this.dataRoles = ''
    this.dateFormat = 'yyyy-MM-dd'
    this.dateType = 'date'
  }
}
