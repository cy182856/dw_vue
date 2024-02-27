import { request } from '@/utils/request'
import { download } from '../../utils/request'

export function getList(params) {
  return request('POST', '/api/est/adjust/list', params)
}

export function getMonth(params) {
  return request('GET', '/api/crm/comm/current/month', params)
}

export function saveListApi(params) {
  return request('POST', '/api/est/adjust/save', params)
}
export function getDetailDetail(type, id) {
  return request('POST', `/api/est/adjust/expend/${type}/${id}`)
}

// 下载月别模板
export function downloadMonthExcel(type, targetYm, params) {
  return download('POST', `/api/est/adjust/month/download/${type}/${targetYm}`, params)
}

// 下载日别模板
export function downloadDayExcel(type, targetYm, params) {
  return download('POST', `/api/est/adjust/day/download/${type}/${targetYm}`, params)
}

// 固定费下载
export function downloadFixExcel(params) {
  return download('POST', '/api/est/adjust/fix/download', params)
}

// 变动费下载
export function downloadChangeExcel(params) {
  return download('POST', '/api/est/adjust/change/download', params)
}

// 系列别下载
export function downloadSerailExcel(params) {
  return download('POST', '/api/est/adjust/serail/download', params)
}

// 固定费调整
export function saveFixdAdjust(params) {
  return request('POST', '/api/est/adjust/fixd/adjust', params)
}

// 无代理商下载
export function downloadNoCustExcel(params) {
  return download('POST', '/api/est/adjust/nocust/download', params)
}

// 删除
export function deleteListApi(params) {
  return request('POST', '/api/est/adjust/delete', params)
}
