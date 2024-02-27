import { download, request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/rebatebook/selectSx', params)
}
export function preActualDownload(params) {
  return download('POST', '/api/rebatebook/preActualDownload', params)
}

