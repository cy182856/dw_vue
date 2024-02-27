import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/quote/list', params)
}
export function deleteQuote(params) {
  return request('POST', '/api/quote/delete', params, true)
}
export function deleteApply(params) {
  return request('POST', '/api/quote/deletereapply', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/quote/${id}`)
}
export function submitQuote(params) {
  return request('POST', '/api/quote/apply', params, true)
}
export function cancelProcess(taskId) {
  return request('GET', `/api/quote/applycancel/${taskId}`, null, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/quote/list', params)
}

