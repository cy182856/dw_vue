import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/deduct/list', params)
}
export function getFinAccountList(deductYm) {
  return request('POST', `/api/deduct/accountlist/${deductYm}`)
}
export function downloadFile(params) {
  return download('POST', '/api/deduct/download/', params)
}
export function downloadSerialFile(params) {
  return download('POST', '/api/deduct/download/serial', params)
}
