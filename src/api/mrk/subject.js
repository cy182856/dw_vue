import { request } from '@/utils/request'
export function getFinAccountList(params) {
  return request('POST', '/api/mrk/finaccount/finaccountlist', params)
}

export function getDetail(id) {
  return request('GET', `/api/mrk/finaccount/${id}`)
}

export function saveFinAccount(params) {
  return request('POST', `/api/mrk/finaccount/save`, params, true)
}

export function getTreeListByDeptCode(deptCode) {
  return request('POST', `/api/mrk/finaccount/list/${deptCode}`)
}

export function finCateSave(submitObject) {
  return request('POST', '/api/mrk/finaccount/save/fincate', submitObject, true)
}
