
import assembly from './assembly'
export default class MColumnsLayout extends assembly {
  constructor(
    formType = 'ColumnsLayout',
    fieldName = '',
    flexClass = 'flex1',
    i18nLabelKey = '分栏布局',
    name = '分栏布局'
  ) {
    super(formType, fieldName, flexClass, i18nLabelKey, name)
    this.showFrom = ['columns']
    this.columns = [
      {
        offset: 0,
        span: 8,
        formType: ''
      }, {
        offset: 0,
        span: 8,
        formType: ''
      }, {
        offset: 0,
        span: 8,
        formType: ''
      }
    ]
  }
}
