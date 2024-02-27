import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/rebatebook/list', params)
}
export function getDetail(params) {
  return request('POST', '/api/rebatebook/detail', params)
}
export function configId(id) {
  return request('GET', `/api/rebateconfig/${id}`)
}
export function saveAssign(params) {
  return request('POST', '/api/rebatecustomer/save', params)
}
export function send(params) {
  return request('POST', '/api/rebatebook/send', params)
}
export function sendDataEmail(params) {
  return request('POST', '/api/rebatebook/sendEmail', params)
}
export function comeDataBack(params) {
  return request('POST', '/api/rebatebook/comeBack', params)
}
export function batchSubmit(params) {
  return request('POST', '/api/rebatebook/batchSubmit', params)
}
export function rptDownload(params) {
  return download('', '/api/rpt/download', params)
}
export function downloadTempFile(params) {
  return download('', '/api/rebatebook/downloadTempFile', params)
}
export function downloadFile(params) {
  return download('', '/api/rebatebook/downloadFile', params)
}
export function reqPayDownload(params) {
  return request('POST', '/api/rebatebook/reqPayDownload', params)
}
export function reqPayDownloadSync(params) {
  return download('POST', '/api/rebatebook/reqPayDownloadSync', params)
}

