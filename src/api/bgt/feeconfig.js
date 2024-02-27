import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/feeconfig/list', params)
}
export function finAccount(id) {
  return request('POST', `/api/mrk/finaccount/list/${id}`)
}
export function finAccountType(deptCode, id) {
  return request('POST', `/api/mrk/finaccount/list/${deptCode}/type/${id}`)
}
export function downloadFile(configYear) {
  return download('POST', `/api/feeconfig/download/${configYear}`)
}
export function deleteList(configYear, params) {
  return request('POST', `/api/feeconfig/delete/${configYear}`, params, true)
}
export function saveListApi(configYear, params) {
  return request('POST', `/api/feeconfig/save/${configYear}`, params, true)
}
export function available(id) {
  return request('GET', `/api/feeconfig/available/${id}`)
}
