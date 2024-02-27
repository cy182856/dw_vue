import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/customer/list', params)
}
export function getDetail(id) {
  return request('GET', `/api/customer/${id}`)
}
export function customerSave(params) {
  return request('POST', '/api/customer/update', params, true)
}
export function customerDeptSave(submitObject) {
  return request('POST', '/api/customer/customerdeptsave', submitObject, true)
}
export function downloadFile(params) {
  return download('POST', '/api/customer/download', params)
}
export function getPopList(params) {
  return request('POST', '/api/customer/poplist', params)
}
export function getPopList2(params) {
  return request('POST', '/api/customer/searchcust', params)
}
export function getArea1List() {
  return request('POST', '/api/customer/area1/list')
}
export function getArea1AllList() {
  return request('POST', '/api/customer/area1/allList')
}

export function getArea2ListByArea1(area1) {
  return request('POST', `/api/customer/area2/list/${area1}`)
}
export function getArea2AllListByArea1(area1) {
  return request('POST', `/api/customer/area2/allList/${area1}`)
}
