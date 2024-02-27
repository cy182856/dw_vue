import * as types from './mutation-type'
import Vue from 'vue'
import { saveLoginStatus, saveCsrfToken } from '@/utils/storage'

const mutations = {
  [types.SET_LOGIN_STATUS](state, loginStatus) {
    state.loginStatus = loginStatus
    saveLoginStatus(loginStatus)
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_CSRF_TOKEN](state, csrfToken) {
    state.csrfToken = csrfToken
    saveCsrfToken(csrfToken)
  },
  [types.CHANGE_COLLAPSE](state, status) {
    state.isCollapse = status
  },
  [types.SET_DICT](state, dictType) {
    Vue.set(state.dictList, dictType.dictTypeId, dictType.dicts)
  },
  [types.CLEAR_DICT](state) {
    state.dictList = []
  },
  [types.SET_SEARCH_INFO](state, { path, searchParam }) {
    state.searchParams.set(path, searchParam)
  },
  [types.SET_USER_NAMES](state, { userId, userName }) {
    Vue.set(state.userNames, userId, userName)
  },
  [types.SET_FUNC_NAMES](state, { identiferNum, funcName }) {
    Vue.set(state.funcNames, identiferNum, funcName)
  },
  [types.SET_FUNC_NAMES_BY_CODE](state, { funcDiv, code, funcName }) {
    Vue.set(state.funcNamesByCode[funcDiv], code, funcName)
  },
  [types.SET_FUNC_NAMES_BY_CODE_FUNC](state, { funcDiv }) {
    Vue.set(state.funcNamesByCode, funcDiv, {})
  }
}
export default mutations
