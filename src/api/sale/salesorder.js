import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/salesorder/list', params)
}
export function deleteSalesorder(params) {
  return request('POST', '/api/salesorder/delete', params, true)
}
export function deleteApply(params) {
  return request('POST', '/api/salesorder/deletereapply', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/salesorder/${id}`)
}
export function submitSalesorder(params) {
  return request('POST', '/api/salesorder/apply', params, true)
}
export function getDetailByQuote(id) {
  return request('GET', `/api/salesorder/getDetailFromQuote/${id}`)
}
export function cancelProcess(taskId) {
  return request('GET', `/api/salesorder/applycancel/${taskId}`, null, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/salesorder/list', params)
}
