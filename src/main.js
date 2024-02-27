import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// 引入基础样式表
import '@/assets/css/reset.css'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.css'

// 引入i18n
import i18n from './i18n'
// 引入进度条样式库
import 'nprogress/nprogress.css'

// 引入字体图标css (字体图标的使用：iconfont icon-**）
import '@/assets/fonts/iconfont.css'

// 引入公共样式表
import '@/assets/css/common.scss'
// element重置样式
import '@/assets/css/eleReset.css'
// 自适应css
import '@/assets/css/media.css'

// 路由守卫与动态路由处理
import './permission.js'
import { saveContextPath } from '@/utils/storage'
import { preventReClick } from '@/plugin/directive.js'
// 引入elformdesign
import elformdesign from '@/plugin/index.js'
import { Attachement, ColumnElement, DictAutoComplete, DictCheckbox, DictRadio, DictSelect, DictWrite, ExportFieldsSelect, FormElement, MilliInput,
  ProcessDetail, TaskApprove, Upload, UpdateHis, UserOrgTree, VersionHis, MergeDialog, AutoCompleteByRemote, SelectByRemote, SelectFilterByRemote, TopBox, SearchCondition } from './components/index.js'

Vue.use(ElementUI)
// Vue.use(DictSelect)
Vue.use(Attachement).use(ColumnElement).use(DictAutoComplete).use(DictCheckbox).use(DictRadio).use(DictSelect).use(DictWrite).use(ExportFieldsSelect).use(FormElement).use(MilliInput).use(ProcessDetail)
  .use(TaskApprove).use(Upload).use(UpdateHis).use(UserOrgTree).use(VersionHis).use(MergeDialog).use(AutoCompleteByRemote).use(SelectByRemote).use(SelectFilterByRemote).use(TopBox).use(SearchCondition)
Vue.config.productionTip = false
Vue.use(elformdesign)
Vue.use(preventReClick)

const contextPath = process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : ''
saveContextPath(contextPath)
// 主题换色
import('../public/skin/theme' + (localStorage !== null && localStorage.getItem('theme') != null ? localStorage.getItem('theme') : 'Light') + '.scss')
new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

