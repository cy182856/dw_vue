import { request, download } from '@/utils/request'
export function findYm(id) {
  return request('GET', `/api/rebatebook/findYm/${id}`)
}
export function getList(params) {
  return request('POST', '/api/rebatebook/selectCustDataType', params)
}
export function getDetail(params) {
  return request('POST', '/api/rebatebook/selectDetailCustDataType', params)
}
export function downloadList(params) {
  return download('', '/api/rebatebook/downloadTemplate', params)
}

