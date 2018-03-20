import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

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
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/index',
    name: 'Dashboard',
    meta: { title: '仪表盘', icon: 'home' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '乐园实况' }
      },
      {
        path: 'map',
        component: () => import('@/views/dashboard/index'),
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
        component: () => import('@/views/explorer/destinations'),
        meta: { title: '项目管理', icon: '' }
      },
      {
        path: 'schedules',
        name: 'schedules',
        component: () => import('@/views/explorer/schedules'),
        meta: { title: '开放时间表', icon: '' }
      }
    ]
  },

  {
    path: '/wait-count',
    component: Layout,
    redirect: '/wait-count/attractions',
    name: 'wait',
    meta: { title: '等候时间', icon: 'time' },
    children: [
      {
        path: 'attractions',
        name: 'attractions',
        component: () => import('@/views/wait-count/attractions'),
        meta: { title: '游乐项目', icon: '' }
      },
      {
        path: 'attractions/:id',
        name: 'attractions-id',
        component: () => import('@/views/wait-count/attractions-id'),
        meta: { title: '项目详情', icon: '' }
      },
      {
        path: 'park',
        name: 'park',
        component: () => import('@/views/wait-count/park'),
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
        component: () => import('@/views/simulation/oneday'),
        meta: { title: '乐园的一天', icon: '' }
      },
      {
        path: 'plan',
        name: 'plan',
        component: () => import('@/views/simulation/plan'),
        meta: { title: '路径规划', icon: '' }
      }
    ]
  },

  {
    path: '/forecast',
    component: Layout,
    redirect: '/views/forecast',
    name: 'forecast',
    meta: { title: '模型管理', icon: 'business-excellence' },
    children: [
      {
        path: 'park',
        name: 'park',
        component: () => import('@/views/forecast/park'),
        meta: { title: '乐园', icon: '' }
      },
      {
        path: 'atts',
        name: 'atts',
        component: () => import('@/views/forecast/atts'),
        meta: { title: '项目', icon: '' }
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
        component: () => import('@/views/fastpass/task'),
        meta: { title: '任务列表', icon: '' }
      },
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/fastpass/record'),
        meta: { title: '领取记录', icon: '' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: '',
  //       name: '',
  //       component: () => import('@/views//index'),
  //       meta: { title: '', icon: '' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
