import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/targetpolicy/list', params)
}
export function deleteTargetpolicy(params) {
  return request('POST', '/api/targetpolicy/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/targetpolicy/${id}`)
}
export function submitTargetPolicy(params) {
  return request('POST', '/api/targetpolicy/apply', params, true)
}
export function cancelProcess(taskId) {
  return request('GET', `/api/targetpolicy/cancel/${taskId}`, null, true)
}
export function startBatch(id) {
  return request('GET', `/api/targetpolicy/startbatch/${id}`, null, true)
}
