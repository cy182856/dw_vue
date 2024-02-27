import { request } from '@/utils/request'
import { download } from '../../utils/request'

export function getNBCProductList(params) {
  return request('POST', '/api/nbc/list', params)
}

// 下载模板
export function downloadExcel() {
  return download('POST', '/api/nbc/download')
}
