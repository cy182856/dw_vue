import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/est/apply/list', params)
}
export function getDetail(id) {
  return request('POST', `/api/est/apply/detail/${id}`)
}
export function applyCommit(params) {
  return request('POST', '/api/est/apply/commit', params)
}
export function applyBatchCommit(params) {
  return request('POST', '/api/est/apply/batch/commit', params)
}

export function getPromotionMonthList(params) {
  return request('POST', '/api/est/classified/list', params)
}

export function getPromotionMonthDetail(id) {
  return request('GET', `/api/est/classified/${id}`)
}

export function deletePromotionMonth(params) {
  return request('POST', `/api/est/classified/delete`, params, true)
}

export function createPromotionMonth(params) {
  return request('POST', `/api/est/classified/create`, params, true)
}

export function getSkuList(params) {
  return request('POST', `/api/est/classified/skulist`, params, true)
}

export function savePromotionMonth(id, params) {
  return request('POST', `/api/est/classified/save/${id}`, params, true)
}
