import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/est/approve/list', params)
}
export function getDetail(params) {
  return request('POST', '/api/est/approve/detail', params)
}
export function getDetailDetail(params) {
  return request('POST', '/api/est/apply/detail/expend', params)
}
export function getDetailList(params) {
  return request('POST', '/api/est/approve/detail/list', params)
}
export function applyApprove(params) {
  return request('POST', '/api/est/approve/agree/tasks', params)
}
export function rejectApprove(params) {
  return request('POST', '/api/est/approve/reject/tasks', params)
}
export function applyBatchApprove(params) {
  return request('POST', '/api/est/approve/batch/agree/tasks', params)
}
export function rejectBatchApprove(params) {
  return request('POST', '/api/est/approve/batch/reject/tasks', params)
}
