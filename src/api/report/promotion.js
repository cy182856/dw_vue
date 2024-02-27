import { download } from '@/utils/request'
export function downloadList(params) {
  return download('', '/api/rpt/downloadTemplate', params)
}
export function downloadRawData(params) {
  return download('', '/api/rpt/downloadRawData', params)
}
export function downloadRPT005(params) {
  return download('', '/api/rpt/downloadRPT005', params)
}
export function downloadRPT006(params) {
  return download('', '/api/rpt/downloadRPT006', params)
}
export function downloadRPT009(params) {
  return download('', '/api/rpt/downloadRPT009', params)
}
export function downloadOperatingProfit(params) {
  return download('', '/api/rpt/downloadOperatingProfit', params)
}
export function promotionTempDownloadFixFee(params) {
  return download('POST', '/api/rpt/promotionTempDownloadFixFee', params)
}