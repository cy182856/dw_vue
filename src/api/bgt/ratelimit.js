import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/ratelimit/list', params)
}
export function save(params) {
  return request('POST', '/api/ratelimit/save', params, true)
}
export function getCustList(deptCode) {
  return request('POST', `/api/customer/treeList/${deptCode}`)
}
