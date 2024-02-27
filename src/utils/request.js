import axios from 'axios'
import store from '@/store/index'
import qs from 'qs'
import * as types from '@/store/mutation-type'
import { removeLoginStatus, savePreUrl } from '@/utils/storage'
import { MessageBox, Message, Loading } from 'element-ui'
import NProgress from 'nprogress'
import router from '@/router/index.js'
import i18n from '@/i18n/index.js'

let loadingInstance = null
const downTime = 300000
// 设置超时时间
axios.defaults.timeout = 300000
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 对外接口
export function request(method, url, params, isLoading = false, isForm = false) {
  if (isLoading) {
    loadingInstance = Loading.service({
      lock: true,
      text: i18n.t('comm.msg28'),
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  const contextPath = process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : ''
  url = contextPath + url
  if (method === 'GET') {
    // get请求是 axios.get('/user', {params: object})
    return get(url, { params })
  } else if (method === 'POST') {
    if (isForm) {
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      params = qs.stringify(params)
    } else {
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
    }
    return post(url, params)
  }
}

// 封装get方法
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

// 封装post方法
function post(url, params) {
  // console.log(QS.stringify(params))
  // let d
  // if (url.indexOf('budApplyHandson') > 0) {
  //   console.log('in')
  //   axios.defaults.headers.post['Content-Type'] = 'application/json'
  //   d = params
  // } else {
  //   axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  //   d = QS.stringify(params)
  // }
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
export function upload(url, formData) {
  const contextPath = process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : ''
  url = contextPath + url
  return new Promise((resolve, reject) => {
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
export function download(method, url, params) {
  const contextPath = process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : ''
  url = contextPath + url
  loadingInstance = Loading.service({
    lock: true,
    text: i18n.t('comm.msg28'),
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return new Promise((resolve, reject) => {
    axios.post(url, params, { responseType: 'blob', timeout: downTime }).then(res => {
      if (res.headers['content-disposition'] !== undefined) {
        const blob = new Blob([res.data], { type: 'application/octet-stream;charset=utf-8' })
        const content = res.headers['content-disposition']
        const index = content.indexOf('filename=')
        // 下载后文件名
        const fileName = content.substring(index + 9)

        // for IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, decodeURI(fileName))
        } else {
          // for Non-IE (chrome, firefox etc.)
          const downloadElement = document.createElement('a')
          const href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = decodeURI(fileName)
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
          window.URL.revokeObjectURL(href)
        }
      }
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

// 请求拦截(请求发出前处理请求)
axios.interceptors.request.use(
  config => {
    NProgress.start()
    if (config.method === 'post') {
      // 将token放入header
      const token = store.getters.csrfToken
      token && (config.headers['X-CSRF-TOKEN'] = token)
    }
    return config
  },
  error => {
    NProgress.start()
    return Promise.error(error)
  }
)
// 响应拦截器（处理响应数据）
axios.interceptors.response.use(
  async response => {
    // 这个地方可以由后台编辑状态码区分不同情况，做不同的逻辑处理
    if (response.config['responseType'] === 'blob' && response.headers['content-disposition'] === undefined) {
      response.data = await fileToJson(response.data)
    }
    const { message, messageId, messages, success } = response.data
    if (!success && (messageId || messages)) {
      if (messages && messages.length) {
        const html = messages.map(item => {
          const args = {}
          for (const key in item.arguments) {
            args[key] = i18n.t(item.arguments[key])
          }
          return '<p>' + i18n.t(item.messageId, args) + '</p>'
        }).join('')
        if (response.config.url.indexOf('/upload') === -1) {
          Message({
            type: 'error',
            dangerouslyUseHTMLString: true,
            message: html
          })
        }
        /* Message({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: html
        }) */
      } else {
        const args = {}
        if (response.data.arguments) {
          for (const key in response.data.arguments) {
            args[key] = i18n.t(response.data.arguments[key])
          }
        }
        if (response.config.url.indexOf('/upload') === -1) {
          Message({
            type: 'error',
            message: i18n.t(message, args)
            // message: '111'
          })
        }
        /* Message({
          type: 'error',
          message: i18n.t(messageId, args)
        }) */
      }
    } else {
      if (messageId) {
        if (response.config.url.indexOf('/upload') === -1) {
          Message({
            type: 'success',
            message: i18n.t(messageId)
          })
        }
        /* Message({
          type: 'success',
          message: i18n.t(messageId)
        }) */
      } else {
        if (loadingInstance) {
          if (response.config.url.indexOf('/upload') === -1) {
            Message({
              type: 'success',
              message: i18n.t('comm.success')
            })
          }
        }
      }
    }
    NProgress.done()
    loadingInstance && loadingInstance.close()
    loadingInstance = null
    // console.log(response)
    return response
  },
  error => {
    NProgress.done()
    loadingInstance && loadingInstance.close()
    loadingInstance = null
    // //请求失败，这个地方可以根据error.response.status统一处理一些界面逻辑，比如status为401未登录,可以进行重定向
    // router.replace({
    //     path: '/login',
    //     query: { redirect: router.currentRoute.fullPath }
    //    });
    if (error.response.status === 401) {
      const status = store.getters.loginStatus
      store.commit(types.SET_LOGIN_STATUS, 'no')
      store.commit(types.SET_CSRF_TOKEN, '')
      store.commit(types.SET_USER_INFO, {})
      removeLoginStatus()
      if (status !== 'no') {
        MessageBox.alert(i18n.t('comm.e0011'), i18n.t('comm.e0013'), {
          confirmButtonText: i18n.t('comm.certain'),
          callback: () => {
            savePreUrl(router.history.current.path)
            router.push('/login')
          }
        })
      }
    } else if (error.response.status === 403) {
      MessageBox.alert(i18n.t('comm.e0004'), i18n.t('comm.e0014'), {
        confirmButtonText: i18n.t('comm.certain')
      })
    } else if (error.response.status === 404) {
      MessageBox.alert(i18n.t('comm.e0005'), i18n.t('comm.e0015'), {
        confirmButtonText: i18n.t('comm.certain')
      })
    } else if (error.response.status === 500) {
      MessageBox.alert(i18n.t('comm.e0012'), i18n.t('comm.e0016'), {
        confirmButtonText: i18n.t('comm.certain')
      })
    } else {
      Message({
        type: 'error',
        message: i18n.t('comm.e0017')
      })
    }
    return Promise.reject(error)
  }
)
function fileToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = res => {
      const { result } = res.target // 得到字符串
      const data = JSON.parse(result) // 解析成json对象
      resolve(data)
    } // 成功回调
    reader.onerror = err => {
      reject(err)
    } // 失败回调
    reader.readAsText(new Blob([file]), 'utf-8') // 按照utf-8编码解析
  })
}
