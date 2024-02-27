import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/product/list', params)
}
export function deleteProduct(params) {
  return request('POST', '/api/product/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/product/${id}`)
}
export function saveProduct(params) {
  return request('POST', '/api/product/save', params, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/product/list', params)
}
