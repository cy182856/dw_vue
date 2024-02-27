import { download, request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/writeoff/apply/list', params)
}
export function batchSubmit(params) {
  return request('POST', '/api/writeoff/apply/batchSubmit', params)
}
export function send(params) {
  return request('POST', '/api/writeoff/apply/send', params)
}
export function comeBack(params) {
  return request('POST', '/api/writeoff/apply/comeBack', params)
}
export function getDetailById(id) {
  return request('POST', `/api/writeoff/apply/getDetailById/${id}`)
}
export function csvDownload(params) {
  return download('POST', '/api/writeoff/apply/csvDownload', params)
}
export function csvDownloadDept(params) {
  return download('POST', '/api/writeoff/apply/csvDownloadDept', params)
}
export function reqPayDownload(params) {
  return request('POST', '/api/writeoff/apply/reqPayDownload', params)
}
export function reqPayDownloadSync(params) {
  return download('POST', '/api/writeoff/apply/reqPayDownloadSync', params)
}

