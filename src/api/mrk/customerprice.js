import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/customerprice/list', params)
}
export function downloadFile(params) {
  return download('POST', '/api/customerprice/download', params)
}
