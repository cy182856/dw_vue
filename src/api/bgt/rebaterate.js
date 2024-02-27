import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/rebaterate/list', params)
}
export function downloadFile(bgtYear) {
  return download('POST', `/api/rebaterate/download/${bgtYear}`)
}
export function getListByCustName(custName) {
  return request('GET', `/api/customer/list/${custName}`)
}
