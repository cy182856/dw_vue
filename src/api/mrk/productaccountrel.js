import { request, download } from '@/utils/request'
export function getAccountList(deptCode) {
  return request('POST', `/api/mrk/product/accountlist/${deptCode}`)
}

export function saveProductAccountRel(params) {
  return request('POST', '/api/mrk/product/saveProductAccountRel', params, true)
}

export function getWriteoffList(params) {
  return request('POST', '/api/mrk/product/writeofflist', params)
}

export function saveProductDeptRel(params) {
  return request('POST', '/api/mrk/product/saveProductDeptRel', params, true)
}

export function saveProductEanFlag(params) {
  return request('POST', '/api/mrk/product/saveProductEanFlag', params, true)
}

export function saveProductBagCharge(params) {
  return request('POST', '/api/mrk/product/saveProductBagCharge', params, true)
}

export function getDetail(id) {
  return request('GET', `/api/mrk/product/${id}`)
}

export function downloadFile(params) {
  return download('POST', '/api/mrk/product/download', params)
}
