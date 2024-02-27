import { request } from '@/utils/request'
// /api/auth/ajaxLogin 登录接口
export function login(params) {
  return request('POST', '/api/auth/ajaxLogin', params)
}
export function loginInfo() {
  return request('GET', '/api/auth/loginInfo')
}
export function logout() {
  return request('GET', '/api/auth/logout')
}
export function changePassword(params) {
  return request('POST', '/api/auth/changePassword', params)
}
export function setNewPassword(params) {
  return request('POST', '/api/auth/setNewPassword', params)
}
export function sendMail(userName) {
  return request('GET', `/api/auth/sendPasswordMail/${userName}`)
}
export function loginByToken(params) {
  return request('POST', '/api/auth/tokenLogin', params)
}
export function loginByCasTicket(ticket) {
  return request('GET', `/api/auth/casLogin?ticket=${ticket}`)
}
export function loginByMobile(params) {
  return request('POST', '/api/auth/mobileLogin', params)
}
export function loginByQr(code) {
  const params = { 'code': code }
  return request('POST', '/api/wxQrAuth/ajaxLogin', params, true, true)
}
export function sendVerifyCode(mobile) {
  const params = { 'mobile': mobile }
  return request('POST', '/api/auth/sendVerifyCode', params, false, true)
}
export function changeOrg(params) {
  return request('POST', `/api/auth/changeOrg/${params}`, null, true)
}
export function specailLink() {
  return request('GET', 'https://demo-bsind.huge-vision.com/dwreport/decision/login/cross/domain?fine_username=report_user&fine_password=123456&validity=-2')
}
