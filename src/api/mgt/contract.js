import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/contract/list', params)
}
export function deleteContract(params) {
  return request('POST', '/api/contract/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/contract/${id}`)
}
export function submitContract(params) {
  return request('POST', '/api/contract/apply', params, true)
}
export function editSaveContract(params) {
  return request('POST', '/api/contract/editSave', params, true)
}
export function updateInstructItem(params) {
  return request('POST', '/api/contract/updateInstructItem', params, true)
}
export function cancelProcess(taskId) {
  return request('GET', `/api/contract/cancel/${taskId}`, null, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/contract/list', params)
}
export function downloadPDF(params) {
  return download('GET', `/api/contract/exportPdf/${params}`)
}
export function cancelPrompt(params) {
  return request('POST', '/api/contract/cancelPrompt', params, true)
}
export function updateContractEndDate(params) {
  return request('POST', '/api/contract/updateContractEndDate', params, true)
}
