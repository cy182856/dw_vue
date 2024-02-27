import { request } from '@/utils/request'
export function getPaymentDateList(params) {
  return request('POST', '/api/finance/paymentdate/list', params)
}

export function getDetail(id) {
  return request('GET', `/api/finance/paymentdate/${id}`)
}

export function savePaymentDate(params) {
  return request('POST', '/api/finance/paymentdate/create', params, true)
}

export function updatePaymentDate(id, params) {
  return request('POST', `/api/finance/paymentdate/update/${id}`, params, true)
}

