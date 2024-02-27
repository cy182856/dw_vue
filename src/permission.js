// 路由守卫以及动态路由处理
import router from '@/router/index'
import store from '@/store/index'
import { savePreUrl } from '@/utils/storage'

// import { Message } from 'element-ui'
router.beforeEach(async(to, from, next) => {
  // 如果是到登录页面的话，直接放行
  if (to.path === '/login' || to.path === '/tokenlogin' || to.path === '/caslogin' || to.path === '/cassuccess') {
    next()
  } else {
    // 判断该用户是否已经登录
    if (store.getters.loginStatus === 'yes') {
      // 该用户已经登入
      // 判断store当中是否存在userInfo,如果不存在，从服务器获取， 防止页面刷新后，store清空
      if (!(store.getters.userInfo)) {
        try {
          await store.dispatch('loginInfoAction')
          //  <!-- 目标部门、基础部门 一览页面通用-->
          if (!store.getters.dictList.Dept) {
            await store.dispatch('getDicts', 'Dept')
          }
          if (!store.getters.dictList.TARGETORG) {
            await store.dispatch('getDicts', 'TARGETORG')
          }
          next({ ...to })
        } catch (error) {
          next('/login')
        }
      } else {
        next()
      }
    } else {
      savePreUrl(to.fullPath)
      // 如果是token登录，则保存
      if (to.query.token) {
        next({ path: '/tokenlogin', query: to.query })
      } else {
        // 该用户未登录，跳转到登入页面
        next('/login')
      }
    }
  }
  // console.log(to)
  // console.log(from)
  // next()
})
