import { request } from '@/utils/request'
export function getChiefApprovalList(params) {
  return request('POST', '/api/writeoff/approval/list', params)
}

export function getChiefApprovalDetail(params) {
  return request('POST', '/api/writeoff/approval/detail', params)
}

export function getApprovalRebateDetail(params) {
  return request('POST', '/api/writeoff/approval/rebate', params)
}

export function batchApprove(params) {
  return request('POST', '/api/writeoff/approval/batchApprove', params)
}

export function batchReject(params) {
  return request('POST', '/api/writeoff/approval/batchReject', params)
}

export function approve(params) {
  return request('POST', '/api/writeoff/approval/approve', params)
}

export function reject(params) {
  return request('POST', '/api/writeoff/approval/reject', params)
}

export function getWriteoffSum(params) {
  return request('POST', '/api/verify/adjust/writeoff/sum', params)
}
