import { download, request } from '@/utils/request'

export function getSalesOrderList(params) {
  return request('POST', '/api/salesorder/list', params)
}

export function save(params) {
  return request('POST', '/api/salesorder/save', params)
}

export function salesOrderDown(params) {
  return download('POST', '/api/salesorder/salesOrderDown', params)
}
