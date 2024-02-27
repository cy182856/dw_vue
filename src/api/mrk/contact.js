import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/contact/list', params)
}
export function deleteContact(params) {
  return request('POST', '/api/contact/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/contact/${id}`)
}
export function saveContact(params) {
  return request('POST', '/api/contact/save', params, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/contact/list', params)
}
