import { download, request } from '@/utils/request'
export function getFinaceList(params) {
  return request('POST', '/api/writeoff/finance/list', params)
}
export function getFinaceSeeList(params) {
  return request('POST', '/api/writeoff/finance/see/list', params)
}
export function getFinanceDetailById(id) {
  return request('POST', `/api/writeoff/finance/getFinanceDetailById/${id}`)
}
export function downloadFileCsv(params) {
  return download('POST', '/api/writeoff/finance/downloadFileCsv', params)
}
export function downloadFileSeeCsv(params) {
  return download('POST', '/api/writeoff/finance/downloadFileSeeCsv', params)
}
export function getInvList(params) {
  return request('POST', '/api/writeoff/finance/getInvList', params)
}
export function handleSave(params) {
  return request('POST', '/api/writeoff/finance/handleSave', params)
}
export function dataStorageDeptSave(params) {
  return request('POST', '/api/writeoff/finance/dataStorageDeptSave', params)
}
export function handleApproval(params) {
  return request('POST', '/api/writeoff/finance/handleApproval', params)
}
export function handleRejected(params) {
  return request('POST', '/api/writeoff/finance/handleRejected', params)
}
export function downloadFixFee(params) {
  return download('POST', '/api/writeoff/finance/downloadFixFee', params)
}
export function billingDownloadFixFee(params) {
  return download('POST', '/api/writeoff/finance/billingDownloadFixFee', params)
}
export function invTempDownloadFixFee(params) {
  return download('POST', '/api/writeoff/finance/invTempDownloadFixFee', params)
}
export function reqPayDownload(params) {
  return request('POST', '/api/writeoff/apply/reqPayDownload', params)
}
export function reqPayDownloadSync(params) {
  return download('POST', '/api/writeoff/apply/reqPayDownloadSync', params)
}
