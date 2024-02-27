import { request } from '@/utils/request'

export function savePageConfig(params) {
  return request('POST', '/api/pageConfig/insert', params)
}

export function getPageConfigList(params) {
  return request('POST', '/api/pageConfig/list', params)
}

export function PageConfigRemove(params) {
  return request('POST', '/api/pageConfig/pageConfigRemove', params, true)
}
