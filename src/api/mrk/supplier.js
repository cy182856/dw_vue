import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/supplier/list', params)
}
export function deleteSupplier(params) {
  return request('POST', '/api/supplier/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/supplier/${id}`)
}
export function submitSupplier(params) {
  return request('POST', '/api/supplier/apply', params, true)
}
export function cancelProcess(taskId) {
  return request('GET', `/api/supplier/cancel/${taskId}`, null, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/supplier/list', params)
}
export function deleteApply(params) {
  return request('POST', '/api/supplier/deletereapply', params, true)
}
