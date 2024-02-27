import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/account/list', params)
}
export function deleteAccount(params) {
  return request('POST', '/api/account/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/account/${id}`)
}
export function submitAccount(params) {
  return request('POST', '/api/account/apply', params, true)
}
export function cancelProcess(taskId) {
  return request('GET', `/api/account/applycancel/${taskId}`, null, true)
}
export function deleteApply(params) {
  return request('POST', '/api/account/deletereapply', params, true)
}
export function getSuperiorAccount(superiorAccountNum) {
  return request('GET', `/api/crm/comm/superiorAccount/${superiorAccountNum}`)
}
export function getPopList(params) {
  return request('POST', '/api/pop/account/list', params)
}
