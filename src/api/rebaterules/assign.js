import { download, request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/rebatecustomer/list', params)
}
export function custName(params) {
  return request('GET', '/api/customer/findAllCustType', params)
}
export function configId(id) {
  return request('GET', `/api/rebateconfig/${id}`)
}
export function saveAssign(params) {
  return request('POST', '/api/rebatecustomer/save', params)
}
export function rebateconfigGet(id) {
  return request('GET', `/api/rebateconfig/findByRebateCode/${id}`)
}
export function deleteAssign(params) {
  return request('POST', '/api/rebatecustomer/delete', params)
}
export function downloadFile(params) {
  return download('', '/api/rebatecustomer/download', params)
}
