import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)

import Layout from '@/components/Layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/pages/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/pages/404'), hidden: true },

  {
    path: '/',
    redirect: '/dashboard',
    hidden: true
  },

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    name: 'Dashboard',
    meta: { title: '仪表盘', icon: 'home' },
    children: [
      {
        path: 'index',
        component: () => import('@/pages/dashboard/index'),
        meta: { title: '乐园实况' }
      },
      {
        path: 'map',
        component: () => import('@/pages/dashboard/index'),
        meta: { title: '地图' }
      }
    ]
  },

  {
    path: '/explorer',
    component: Layout,
    redirect: '/explorer/destinations',
    name: 'explorer',
    meta: { title: '运营管理', icon: 'mdx' },
    children: [
      {
        path: 'destinations',
        name: 'destinations',
        component: () => import('@/pages/explorer/destinations'),
        meta: { title: '项目管理', icon: '' }
      },
      {
        path: 'schedules',
        name: 'schedules',
        component: () => import('@/pages/explorer/schedules'),
        meta: { title: '开放时间表', icon: '' }
      },
      {
        path: 'tickets',
        name: 'tickets',
        component: () => import('@/pages/explorer/tickets'),
        meta: { title: '售票量', icon: '' }
      }
    ]
  },

  {
    path: '/wait',
    component: Layout,
    redirect: '/wait/attractions',
    name: 'wait',
    meta: { title: '等候时间', icon: 'time' },
    children: [
      {
        path: 'attractions',
        name: 'attractions',
        component: () => import('@/pages/wait/attractions'),
        meta: { title: '游乐项目', icon: '' }
      },
      {
        path: 'attractions-id',
        name: 'attractions-id',
        component: () => import('@/pages/wait/attractions-id'),
        meta: { title: '项目详情', icon: '' }
      },
      {
        path: 'park',
        name: 'park',
        component: () => import('@/pages/wait/park'),
        meta: { title: '乐园', icon: '' }
      }
    ]
  },

  {
    path: '/simulation',
    component: Layout,
    redirect: '/simulation/oneday',
    name: 'simulation',
    meta: { title: '乐园模拟', icon: 'magic-kingdom' },
    children: [
      {
        path: 'oneday',
        name: 'oneday',
        component: () => import('@/pages/simulation/oneday'),
        meta: { title: '乐园的一天', icon: '' }
      },
      {
        path: 'plan',
        name: 'plan',
        component: () => import('@/pages/simulation/plan'),
        meta: { title: '路径规划', icon: '' }
      }
    ]
  },

  {
    path: '/forecast',
    component: Layout,
    redirect: '/pages/forecast/park',
    name: 'forecast',
    meta: { title: '客流预测', icon: 'business-excellence' },
    children: [
      {
        path: 'ticket',
        name: 'forecast-ticket',
        component: () => import('@/pages/forecast/ticket'),
        meta: { title: '售票量预测', icon: '' }
      },
      {
        path: 'flow',
        name: 'forecast-flow',
        component: () => import('@/pages/forecast/flow'),
        meta: { title: '客流量预测', icon: '' }
      },
      {
        path: 'park',
        name: 'forecast-park',
        component: () => import('@/pages/forecast/report'),
        meta: { title: '预测报告', icon: '' }
      },
      {
        path: 'atts',
        name: 'forecast-atts',
        component: () => import('@/pages/forecast/atts'),
        meta: { title: '等候时间预测', icon: '' }
      }
    ]
  },

  {
    path: '/timesguide',
    component: Layout,
    redirect: '/timesguide/task',
    name: 'timesguide',
    meta: { title: '乐园时间表', icon: 'security-notice' },
    children: [
      {
        path: 'timesguide',
        name: 'timesguide',
        component: () => import('@/pages/timesguide/timesguide'),
        meta: { title: '所有时间表', icon: '' }
      },
      {
        path: 'contribute',
        name: 'timesguide_contribute',
        component: () => import('@/pages/timesguide/contribute'),
        meta: { title: '贡献审核', icon: '' }
      },
      {
        path: 'exchange',
        name: 'timesguide_exchange',
        component: () => import('@/pages/timesguide/exchange'),
        meta: { title: '交易管理', icon: '' }
      },
      {
        path: 'users',
        name: 'timesguide_users',
        component: () => import('@/pages/timesguide/users'),
        meta: { title: '用户管理', icon: '' }
      },
      {
        path: 'voucher',
        name: 'timesguide_voucher',
        component: () => import('@/pages/timesguide/voucher'),
        meta: { title: '卡券管理', icon: '' }
      }
    ]
  },

  {
    path: '/fastpass',
    component: Layout,
    redirect: '/fastpass/task',
    name: 'fastpass',
    meta: { title: '快速通行证', icon: 'shdr-fastpass' },
    children: [
      {
        path: 'task',
        name: 'task',
        component: () => import('@/pages/fastpass/task'),
        meta: { title: '任务列表', icon: '' }
      },
      {
        path: 'record',
        name: 'record',
        component: () => import('@/pages/fastpass/record'),
        meta: { title: '领取记录', icon: '' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
