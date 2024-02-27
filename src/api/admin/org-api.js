import { request } from '@/utils/request'
// 获取资源列表
export function getOrgList(params) {
  return request('POST', '/api/org/listOrgs', params)
}

export function orgSave(params) {
  return request('POST', '/api/org/orgSave', params, true)
}

export function getOrgTree(rootOrgId, treeType, isAdmin) {
  const orgId = rootOrgId || ''
  return request('GET', `/api/org/getOrgTree/${orgId}?treeType=${treeType}&isAdmin=${isAdmin}`)
}

export function orgRemove(params) {
  return request('POST', '/api/org/orgRemove', params, true)
}

// 组织选择
export function getAllOrgTree() {
  return request('POST', '/api/org/getAllOrgTree')
}

export function userSave(params) {
  return request('POST', '/api/org/userSave', params, true)
}

export function userRemove(params) {
  return request('POST', '/api/org/userRemove', params, true)
}

export function orgUserEdit(params) {
  return request('POST', '/api/org/orgUserEdit/' + params)
}

export function userMove(params) {
  return request('POST', '/api/org/userMove', params)
}

export function orgMove(params) {
  return request('POST', '/api/org/orgMove', params)
}

export function createHeadImg(userId) {
  return request('GET', `/api/org/user/createHeadImg/${userId}`)
}
