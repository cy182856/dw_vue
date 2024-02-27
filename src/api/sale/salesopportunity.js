import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/salesopportunity/list', params)
}
export function deleteSalesopportunity(params) {
  return request('POST', '/api/salesopportunity/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/salesopportunity/${id}`)
}
export function saveSalesopportunity(params) {
  return request('POST', '/api/salesopportunity/save', params, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/salesopportunity/list', params)
}
