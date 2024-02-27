export const loginStatus = state => state.loginStatus
export const userInfo = state => state.userInfo
export const csrfToken = state => state.csrfToken
export const isCollapse = state => state.isCollapse
export const dictList = state => state.dictList
export const menuList = state => state.userInfo ? state.userInfo.menuList : []
export const searchParams = state => state.searchParams
export const userNames = state => state.userNames
export const funcNames = state => state.funcNames
export const funcNamesByCode = state => state.funcNamesByCode
