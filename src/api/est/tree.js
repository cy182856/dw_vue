import { request } from '@/utils/request'
export function treeListCustomer(id) {
  return request('POST', `/api/customer/treeList/${id}`)
}
export function treeListProduct(id) {
  return request('POST', `/api/mrk/product/treeList/${id}`)
}

