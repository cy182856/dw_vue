import { download, request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/finance/upload/list', params)
}
export function downloadFile(actYm) {
  return download('POST', `/api/finance/upload/download/${actYm}`)
}

