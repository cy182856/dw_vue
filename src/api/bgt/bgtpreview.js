import { request } from '@/utils/request'
export function getList(params) {
  return request('POST', '/api/bgt/preview/list', params)
}

