
import formDesign from './formDesign.vue'
import showform from './ShowForms.vue'

const test = {}
test.install = function(Vue, options) {
  Vue.component(formDesign.name, formDesign)
  Vue.component(showform.name, showform)
}
export default test
