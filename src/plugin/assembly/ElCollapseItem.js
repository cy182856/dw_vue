
import assembly from './assembly'
export default class MElCollapseItem extends assembly {
  constructor(
    formType = 'ElCollapseItem',
    i18nLabelKey = '折叠框',
    flexClass = 'flex1',
    showName = ''
  ) {
    super(formType, i18nLabelKey, flexClass, showName)
    this.showFrom = ['showName', 'i18nLabelKey', 'elCollapseItemType']
    this.fieldName = '折叠框'
    this.name = '折叠框'
    this.elCollapseItemType = 'config'
  }
}

