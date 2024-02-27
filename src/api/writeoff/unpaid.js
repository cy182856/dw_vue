import { request, download } from '@/utils/request'
export function getUnpaidList(params) {
  return request('POST', '/api/writeoff/unpaid/list', params)
}

export function downloadFile(params) {
  return download('POST', '/api/writeoff/unpaid/download', params)
}
