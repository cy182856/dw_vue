import { request, download } from '@/utils/request'

export function getDictEntriesByTypeId(params) {
  return request('POST', '/api/base/getDictEntriesByTypeId', params)
}

export function getExecTask(taskId) {
  return request('GET', `/api/workflow/user/task/exec/${taskId}`)
}

export function getTasks(params) {
  return request('POST', '/api/workflow/user/tasks', params)
}

export function getRunnings(params) {
  return request('POST', '/api/workflow/user/runnings', params)
}

export function getFinished(params) {
  return request('POST', '/api/workflow/user/finished', params)
}

export function getProcessTrace(pid) {
  return request('GET', `/api/workflow/user/process/trace/${pid}`)
}

export function getBackActivity(params) {
  return request('GET', '/api/workflow/user/getBackActivity', params)
}

export function agreeTask(params) {
  return request('POST', '/api/workflow/user/agreeTask', params, true)
}

export function rejectTask(params) {
  return request('POST', '/api/workflow/user/rejectTask', params, true)
}

export function agreeTasks(params) {
  return request('POST', '/api/workflow/user/agreeTasks', params, true)
}

export function withdrawTask(params) {
  return request('POST', '/api/workflow/user/withdrawTask', params, true)
}

export function getScheduleListByParams(params) {
  return request('POST', '/api/schedule/list', params, false)
}

export function getScheduleList(params) {
  return request('POST', '/api/schedule/getlist', params, false, true)
}

export function saveSchedule(params) {
  const url = params.id ? '/api/schedule/edit' : '/api/schedule/save'
  return request('POST', url, params, true)
}

export function eventDrop(params) {
  return request('POST', '/api/schedule/eventDrop', params)
}

export function eventResize(params) {
  return request('POST', '/api/schedule/eventResize', params)
}

export function getExportItems(funcDiv) {
  return request('GET', `/api/${funcDiv}/DataExport/getFields`)
}
// 导出
export function exportData(funcDiv, fileType, params) {
  return download('POST', `/api/${funcDiv}/DataExport/${fileType}`, params)
}
// 变更履历
export function getUpdateHistory(funcDiv, identiferNum) {
  return request('GET', `/api/${funcDiv}/history/${identiferNum}`)
}
// 审批画面变更履历
export function getApproveHistory(funcDiv, identiferNum, id) {
  return request('GET', `/api/${funcDiv}/history/${identiferNum}/${id}`)
}
// 历史版本
export function getVersionHistory(funcDiv, identiferNum) {
  return request('GET', `/api/${funcDiv}/version/${identiferNum}`)
}
// 显示用户姓名
export function getUserName(userId) {
  return request('GET', `/api/base/user/${userId}/name`)
}
// 首页提醒显示
export function setShowDiv(params) {
  return request('POST', '/api/auth/setShowDiv', params)
}
// 页面配置项
export function getPageConfig(funcDiv, configKey) {
  const url = configKey ? `/api/crm/comm/${funcDiv}/pageconfig/${configKey}` : `/api/crm/comm/${funcDiv}/pageconfig`
  return request('GET', url)
}
// 业务编号对应名称
export function getFuncName(funcDiv, identiferNum) {
  return request('GET', `/api/crm/comm/${funcDiv}/${identiferNum}/name`)
}
// 主数据Code对应名称
export function getFuncNameByCode(funcDiv, code) {
  return request('GET', `/api/crm/comm/${funcDiv}/${code}/codename`)
}
// 当天活动、逾期活动
export function getDashboardEvents() {
  return request('POST', '/api/schedule/getEventlist', null)
}
// 我的潜在客户
export function getLeads(params) {
  return request('POST', '/api/lead/list', params)
}
export function getSalesopportunity(params) {
  return request('POST', '/api/salesopportunity/list', params)
}
export function getMergeData(funcDiv, params) {
  return request('POST', `/api/${funcDiv}/getMerge/detail`, params)
}

export function mergeData(funcDiv, params) {
  return request('POST', `/api/${funcDiv}/merge`, params, true)
}

// 下拉框内容取得
export function getSelectOptions(method, actionUrl, params) {
  return request(method, actionUrl, params)
}
export function addFavorites(params) {
  return request('POST', '/api/auth/setFavorites', params)
}
// 报表数据权限生成
export function getDacSeq(tableName) {
  return request('GET', `/api/crm/comm/dac/${tableName}`)
}
