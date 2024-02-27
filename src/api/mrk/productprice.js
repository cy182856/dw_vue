import { request } from '@/utils/request'
export function getProductPriceList(params) {
  return request('POST', '/api/mrk/product/price/productpricelist', params)
}
