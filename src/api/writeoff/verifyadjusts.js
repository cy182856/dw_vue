import { request } from '@/utils/request'
import { download } from '../../utils/request'

export function getList(params) {
  return request('POST', '/api/verify/adjust/list', params)
}

export function getMonth(params) {
  return request('GET', '/api/crm/comm/current/month', params)
}

export function saveListApi(params) {
  return request('POST', '/api/verify/adjust/save', params)
}

// 下载月别模板
export function downloadMonthExcel(type, targetYm, params) {
  return download('POST', `/api/verify/adjust/month/download/${type}/${targetYm}`, params)
}

// 下载日别模板
export function downloadDayExcel(type, targetYm, params) {
  return download('POST', `/api/verify/adjust/day/download/${type}/${targetYm}`, params)
}

export function getDetailDetail(type, id) {
  return request('POST', `/api/verify/adjust/expend/${type}/${id}`)
}

// 固定费下载
export function downloadFixExcel(params) {
  return download('POST', '/api/verify/adjust/fix/download', params)
}

// 变动费下载
export function downloadChangeExcel(params) {
  return download('POST', '/api/verify/adjust/change/download', params)
}

// 系列别下载
export function downloadSerailExcel(params) {
  return download('POST', '/api/verify/adjust/serail/download', params)
}
