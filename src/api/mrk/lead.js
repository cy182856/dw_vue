import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/lead/list', params)
}
export function deleteLead(params) {
  return request('POST', '/api/lead/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/lead/${id}`)
}
export function saveLead(params) {
  return request('POST', '/api/lead/save', params, true)
}
export function transfer(params) {
  return request('POST', '/api/lead/transfer', params, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/lead/list', params)
}
