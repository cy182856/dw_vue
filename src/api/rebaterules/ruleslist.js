import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/rebateconfig/list', params)
}
export function bateName(params) {
  return request('GET', '/api/rebateconfig/findRebateName', params)
}
export function configId(id) {
  return request('GET', `/api/rebateconfig/${id}`)
}
export function editList(params) {
  return request('POST', '/api/rebateconfig/edit', params)
}
