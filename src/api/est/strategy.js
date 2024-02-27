import { request, download } from '@/utils/request'
export function finAccount(id) {
  return request('POST', `/api/mrk/finaccount/list/${id}`)
}
export function finAccountType(deptCode, id) {
  return request('POST', `/api/mrk/finaccount/list/${deptCode}/type/${id}`)
}
export function getList(params) {
  return request('POST', '/api/est/setting/list', params)
}
export function saveListApi(params) {
  return request('POST', '/api/est/setting/save', params)
}
export function available(id) {
  return request('GET', `/api/est/setting/available/${id}`)
}
export function deleteList(params) {
  return request('POST', '/api/est/setting/delete', params)
}
export function downloadExcel() {
  return download('', '/api/est/setting/download')
}
export function downloadSalesExcel() {
  return download('', '/api/est/setting/sales/download')
}
