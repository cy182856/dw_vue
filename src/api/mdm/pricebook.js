import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/pricebook/list', params)
}
export function deletePricebook(params) {
  return request('POST', '/api/pricebook/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/pricebook/${id}`)
}
export function savePricebook(params) {
  return request('POST', '/api/pricebook/save', params, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/pricebook/list', params)
}
// 模板导出
export function downloadPriceBookTemplate() {
  return download('POST', '/api/pricebook/download/template')
}
