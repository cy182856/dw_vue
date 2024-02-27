import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/rebateledger/list', params)
}
export function deleteRebateledger(params) {
  return request('POST', '/api/rebateledger/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/rebateledger/${id}`)
}
export function saveRebateledger(params) {
  return request('POST', '/api/rebateledger/save', params, true)
}
export function getWhCnt(params) {
  return request('POST', '/api/rebateledger/getwhcnt', params)
}
export function getMoneylist(params) {
  return request('POST', '/api/rebateledger/moneylist', params)
}
export function getProductlist(params) {
  return request('POST', '/api/rebateledger/productlist', params)
}
export function manualrecordcash(params) {
  return request('POST', '/api/rebateledger/manualrecordcash', params, true)
}
export function manualrecordstock(params) {
  return request('POST', '/api/rebateledger/manualrecordstock', params, true)
}
