import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/terminal/list', params)
}
export function getDetail(id) {
  return request('GET', `/api/terminal/${id}`)
}
export function terminalSave(params) {
  return request('POST', '/api/terminal/update', params, true)
}
export function terminalDeptSave(submitObject) {
  return request('POST', '/api/terminal/terminaldeptsave', submitObject, true)
}
