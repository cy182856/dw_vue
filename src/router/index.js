import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/404'
import TokenLogin from '@/views/TokenLogin.vue'
// import store from '@/store/index'
// import {getToken, getUserInfo} from '@/utils/storage'

Vue.use(Router)
const createRouter = () => new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: () => import('@/views/dashboard/Dashboard.vue')
        },
        {
          path: '/bd/customer',
          name: 'BdCustomer',
          component: () => import('@/views/bd/components/BdCustomer.vue')
        },
        {
          path: '/bd/adjust',
          name: 'BdAdjust',
          component: () => import('@/views/bd/components/BdAdjust.vue')
        },
        {
          path: '/bd/makeCreate',
          component: () => import('@/views/bd/BdMakeCreate.vue')
        },
        {
          path: '/bd/design',
          component: () => import('@/views/bd/BdDesign.vue')
        },
        {
          path: '/fee/promotion/motionEdit',
          component: () => import('@/views/fee/promotion/MotionEdit.vue')
        },
        {
          path: '/fee/promotion/motionDetail',
          component: () => import('@/views/fee/promotion/MotionDetail.vue')
        },
        {
          path: '/fee/promotion/motionApprove',
          component: () => import('@/views/fee/promotion/MotionApprove.vue')
        },
        {
          path: '/est/customer',
          name: 'EstCustomer',
          component: () => import('@/views/est/components/EstCustomer.vue')
        },
        {
          path: '/est/makeCreate',
          component: () => import('@/views/est/EstMakeCreate.vue')
        },
        {
          path: '/est/design',
          component: () => import('@/views/est/EstDesign.vue')
        },
        {
          path: '/pay/pre/motion/edit',
          component: () => import('@/views/pay/pre/motion/MotionEdit.vue')
        },
        {
          path: '/pay/pre/motion/detail',
          component: () => import('@/views/pay/pre/motion/MotionDetail.vue')
        },
        {
          path: '/pay/pre/contract/edit',
          component: () => import('@/views/pay/pre/contract/ContractEdit.vue')
        },
        {
          path: '/pay/pre/contract/detail',
          component: () => import('@/views/pay/pre/contract/ContractDetail.vue')
        },
        {
          path: '/pay/pre/promoter/edit',
          component: () => import('@/views/pay/pre/promoter/PromoterEdit.vue')
        },
        {
          path: '/pay/pre/promoter/detail',
          component: () => import('@/views/pay/pre/promoter/PromoterDetail.vue')
        },
        {
          path: '/pay/pay/motion/detail',
          component: () => import('@/views/pay/pay/motion/MotionDetail.vue')
        },
        {
          path: '/pay/pay/motion/edit',
          component: () => import('@/views/pay/pay/motion/MotionEdit.vue')
        },
        {
          path: '/pay/pay/contract/detail',
          component: () => import('@/views/pay/pay/contract/ContractDetail.vue')
        },
        {
          path: '/pay/pay/contract/edit',
          component: () => import('@/views/pay/pay/contract/ContractEdit.vue')
        },
        {
          path: '/pay/pay/advert/edit',
          component: () => import('@/views/pay/pay/advert/AdvertEdit.vue')
        },
        {
          path: '/pay/pay/advert/detail',
          component: () => import('@/views/pay/pay/advert/AdvertDetail.vue')
        },
        {
          path: '/pay/pay/promoter/edit',
          component: () => import('@/views/pay/pay/promoter/PromoterEdit.vue')
        },
        {
          path: '/pay/pay/promoter/detail',
          component: () => import('@/views/pay/pay/promoter/PromoterDetail.vue')
        },
        {
          path: '/pay/transfer/edit',
          component: () => import('@/views/pay/transfer/TransferEdit.vue')
        },
        {
          path: '/pay/transfer/detail',
          component: () => import('@/views/pay/transfer/TransferDetail.vue')
        },
        {
          path: '/pay/clear/edit',
          component: () => import('@/views/pay/clear/ClearEdit.vue')
        },
        {
          path: '/pay/clear/detail',
          component: () => import('@/views/pay/clear/ClearDetail.vue')
        },
        {
          path: '/pay/adjust/edit',
          component: () => import('@/views/pay/adjust/AdjustEdit.vue')
        },
        {
          path: '/pay/adjust/detail',
          component: () => import('@/views/pay/adjust/AdjustDetail.vue')
        },
        {
          path: '/mgt/generalApply/edit',
          component: () => import('@/views/mgt/generalApply/ApplyEdit.vue')
        },
        {
          path: '/mgt/generalApply/detail',
          component: () => import('@/views/mgt/generalApply/ApplyDetail.vue')
        },
        {
          path: '/contract/rebate/edit',
          component: () => import('@/views/contract/rebate/AdjustEdit.vue')
        },
        {
          path: '/contract/rebate/detail',
          component: () => import('@/views/contract/rebate/AdjustDetail.vue')
        },
        {
          path: '/contract/apply/edit',
          component: () => import('@/views/contract/apply/ApplyEdit.vue')
        },
        {
          path: '/contract/apply/detail',
          component: () => import('@/views/contract/apply/ApplyDetail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => {
        // 配置了单点登录
        if (process.env.VUE_APP_CAS_SERVER_LOGIN_URL) {
          return import('@/views/CasLogin.vue')
        } else {
          return import('@/views/Login.vue')
        }
      }
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: () => import('@/views/ChangePassword.vue')
    },
    {
      path: '/retrievePassword',
      name: 'RetrievePassword',
      component: () => import('@/views/RetrievePassword.vue')
    },
    {
      path: '/tokenlogin',
      name: 'TokenLogin',
      component: TokenLogin
    },
    {
      path: '/cassuccess',
      name: 'CasSuccess',
      component: () => import('@/views/CasSuccess.vue')
    },
    {
      path: '/',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push(to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }
/**
* 加载动态菜单和路由
*/
export function addDynamicMenuAndRoutes(menus) {
  // 添加动态路由
  // 添加动态路由前，重置默认路由，防止登出后路由不清空
  resetRouter()
  const dynamicRoutes = __addDynamicRoutes(menus)
  dynamicRoutes.push({
    path: '*',
    redirect: '/404'
  })
  // 动态路由添加到第一个路由的子路由中
  router.options.routes[0].children = dynamicRoutes
  router.addRoutes(router.options.routes)
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function __addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].resUrl && /\S/.test(menuList[i].resUrl)) {
      menuList[i].resUrl = menuList[i].resUrl.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].resUrl,
        component: null,
        name: menuList[i].resName,
        props: true,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      try {
        // 根据菜单URL动态加载vue组件
        let filePath = menuList[i].resFile
        if (filePath && /\S/.test(filePath)) { filePath = filePath.replace(/^\//, '') }
        route['component'] = resolve => require([`@/${filePath}`], resolve)
      } catch (e) { console.log(e) }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    __addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

export default router
