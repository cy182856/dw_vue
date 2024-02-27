import { request, download } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/decision/list', params)
}
export function deleteDecision(params) {
  return request('POST', '/api/decision/delete', params, true)
}
export function getDetail(id) {
  return request('GET', `/api/decision/${id}`)
}
export function submitDecision(params) {
  return request('POST', '/api/decision/apply', params, true)
}
export function updateInstructItem(params) {
  return request('POST', '/api/decision/updateInstructItem', params, true)
}
export function cancelProcess(taskId) {
  return request('GET', `/api/decision/cancel/${taskId}`, null, true)
}
export function getPopList(params) {
  return request('POST', '/api/pop/decision/list', params)
}
export function downloadPDF(params) {
  return download('GET', `/api/decision/exportPdf/${params}`)
}
