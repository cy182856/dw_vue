import { loadLoginStatus } from '@/utils/storage'
const state = {
  loginStatus: loadLoginStatus(), // 登录状态
  userInfo: null,
  isCollapse: false,
  csrfToken: '',
  dictList: {},
  searchParams: new Map(),
  userNames: {},
  funcNames: {},
  funcNamesByCode: {}
}
export default state
