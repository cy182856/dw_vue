
export default class assembly {
  constructor(formType, fieldName, flexClass, i18nLabelKey, name, showName) {
    this.id = formType + new Date().getTime()
    this.formType = formType
    this.fieldName = fieldName
    this.flexClass = flexClass
    this.i18nLabelKey = i18nLabelKey
    this.name = name
    this.showName = showName
  }
}
