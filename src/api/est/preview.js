import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/est/preview/list', params)
}

