import * as types from './mutation-type.js'
import { login, loginInfo, logout, loginByToken, loginByMobile, loginByQr, changeOrg } from '@/api/login.js'
import { getDictEntriesByTypeId, getUserName, getFuncName, getFuncNameByCode } from '@/api/base.js'
import { addDynamicMenuAndRoutes } from '@/router/index'
import { refreshDict } from '@/api/admin/dict-api'
import { addFavorites } from '@/api/base'
import router from '../router'

export function clearUserInfo({ commit }) {
  commit(types.SET_USER_INFO, {})
}
export async function loginAction({ commit, getters }, params) {
  const res = await login(params)
  return _login(commit, getters, res)
}
export async function loginByMobileAction({ commit, getters }, params) {
  const res = await loginByMobile(params)
  return _login(commit, getters, res)
}
export async function loginByTokenAction({ commit, getters }, params) {
  const res = await loginByToken(params)
  return _login(commit, getters, res)
}
export async function loginByCasAction({ commit, getters }, params) {
  const res = await loginInfo()
  return _login(commit, getters, res)
}
export async function loginByQrAction({ commit, getters }, params) {
  const res = await loginByQr(params)
  return _login(commit, getters, res)
}
function _login(commit, getters, res) {
  if (res && res.success) {
    const { csrfToken, userInfo } = res.datas
    // 登陆状态为已登录
    commit(types.SET_LOGIN_STATUS, 'yes')
    commit(types.SET_CSRF_TOKEN, csrfToken)
    commit(types.SET_USER_INFO, userInfo)

    const routes = getters.menuList.concat(userInfo.routeList)
    // 解析菜单，并添加动态菜单
    addDynamicMenuAndRoutes(routes)

    // 清空业务字典前端缓存
    commit(types.CLEAR_DICT)

    return res
  } else {
    return res
  }
}
export async function loginInfoAction({ commit, getters }) {
  const res = await loginInfo()
  if (res && res.success) {
    const { csrfToken, userInfo } = res.datas
    commit(types.SET_CSRF_TOKEN, csrfToken)
    commit(types.SET_USER_INFO, userInfo)
    const routes = getters.menuList.concat(userInfo.routeList)
    // 解析菜单，并添加动态菜单
    addDynamicMenuAndRoutes(routes)
    return res
  } else {
    return res
  }
}
export async function changeOrgAction({ commit, getters }, params) {
  const res = await changeOrg(params)
  if (res && res.success) {
    commit(types.SET_CSRF_TOKEN, '')
    commit(types.SET_USER_INFO, {})
    const { csrfToken, userInfo } = res.datas
    commit(types.SET_CSRF_TOKEN, csrfToken)
    commit(types.SET_USER_INFO, userInfo)

    const routes = getters.menuList.concat(userInfo.routeList)
    // 解析菜单，并添加动态菜单
    addDynamicMenuAndRoutes(routes)
    router.push('/')
    return res
  } else {
    return res
  }
}
export async function logoutAction({ commit }) {
  const res = await logout()
  if (res && res.success) {
    commit(types.SET_LOGIN_STATUS, 'no')
    commit(types.SET_CSRF_TOKEN, '')
    commit(types.SET_USER_INFO, {})
    return res
  } else {
    return res
  }
}
export function fedLogoutAction({ commit }) {
  commit(types.SET_LOGIN_STATUS, 'no')
  commit(types.SET_CSRF_TOKEN, '')
  commit(types.SET_USER_INFO, {})
}
export async function getDicts({ commit, state }, dictTypeId) {
  if (dictTypeId in state.dictList) {
    return
  }
  // store里没有数据时，先放一个空的，防止同时向后台请求
  const dictTypeEmpty = {
    dictTypeId,
    dicts: []
  }
  commit(types.SET_DICT, dictTypeEmpty)

  const params = { dictTypeId }
  const res = await getDictEntriesByTypeId(params)
  if (res && res.success) {
    const dictType = {
      dictTypeId,
      dicts: res.datas.dicts
    }
    commit(types.SET_DICT, dictType)
  }
}

export async function getUserNames({ commit, state }, userId) {
  if (userId in state.userNames) {
    return
  }
  // store里没有数据时，先放一个空的，防止同时向后台请求
  commit(types.SET_USER_NAMES, { userId, userName: '' })

  const res = await getUserName(userId)
  if (res && res.success) {
    commit(types.SET_USER_NAMES, { userId, userName: res.datas.userName })
  }
}

export async function getFuncNamesByCode({ commit, state }, { funcDiv, code }) {
  if (!Object.keys(state.funcNamesByCode).includes(funcDiv)) {
    commit(types.SET_FUNC_NAMES_BY_CODE_FUNC, { funcDiv })
  }
  if (code in state.funcNamesByCode[funcDiv]) {
    return
  }
  // store里没有数据时，先放一个空的，防止同时向后台请求
  commit(types.SET_FUNC_NAMES_BY_CODE, { funcDiv, code, funcName: '' })

  const res = await getFuncNameByCode(funcDiv, code)
  if (res && res.success) {
    commit(types.SET_FUNC_NAMES_BY_CODE, { funcDiv, code, funcName: res.datas.name })
  }
}

export async function getFuncNames({ commit, state }, { funcDiv, identiferNum }) {
  if (identiferNum in state.funcNames) {
    return
  }
  // store里没有数据时，先放一个空的，防止同时向后台请求
  commit(types.SET_FUNC_NAMES, { identiferNum, funcName: '' })

  const res = await getFuncName(funcDiv, identiferNum)
  if (res && res.success) {
    commit(types.SET_FUNC_NAMES, { identiferNum, funcName: res.datas.name })
  }
}

export async function refreshDictAndClearStore({ commit }) {
  const res = await refreshDict()
  if (res && res.success) {
    commit(types.CLEAR_DICT)
  }
}

export function saveSearchParam({ commit }, { path, searchParam }) {
  commit(types.SET_SEARCH_INFO, { path, searchParam })
}

export async function addFavoritesAction({ commit, state }, params) {
  const res = await addFavorites(params)
  if (res && res.success) {
    const userInfo = state.userInfo
    if (!userInfo.attrs) {
      userInfo.attrs = params
    } else {
      userInfo.attrs.favorites = [...params.favorites]
    }
    commit(types.SET_USER_INFO, userInfo)
  }
  return res
}
