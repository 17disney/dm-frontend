import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

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
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/explorer',
    component: Layout,
    redirect: '/explorer/destinations',
    name: '资源管理',
    meta: { title: '资源管理', icon: 'example' },
    children: [
      {
        path: 'destinations',
        name: 'destinations',
        component: () => import('@/views/explorer/destinations'),
        meta: { title: '项目管理', icon: 'table' }
      },
      {
        path: 'schedules',
        name: 'schedules',
        component: () => import('@/views/explorer/schedules'),
        meta: { title: '项目时间表', icon: 'table' }
      }
    ]
  },

  {
    path: '/wait-count',
    component: Layout,
    redirect: '/wait-count/attractions',
    name: '等待统计',
    meta: { title: '等待时间', icon: 'example' },
    children: [
      {
        path: 'attractions',
        name: 'attractions',
        component: () => import('@/views/wait-count/attractions'),
        meta: { title: '游乐项目', icon: 'table' }
      },
      {
        path: 'attractions/:id',
        name: 'attractions-id',
        component: () => import('@/views/wait-count/attractions-id'),
        meta: { title: '项目详情', icon: 'table' }
      },
      {
        path: 'park',
        name: 'park',
        component: () => import('@/views/wait-count/park'),
        meta: { title: '乐园', icon: 'table' }
      }
    ]
  },

  {
    path: '/wait-countattractions/:id',
    name: 'attractions-id',
    component: () => import('@/views/wait-count/attractions-id'),
    meta: { title: '项目详情', icon: 'table' }
  },

  {
    path: '/flow',
    component: Layout,
    redirect: '/flow/ticket',
    name: '客流预测',
    meta: { title: '客流预测', icon: 'example' },
    children: [
      {
        path: 'ticket',
        name: 'ticket',
        component: () => import('@/views/flow/ticket'),
        meta: { title: '售票量', icon: 'table' }
      },
      {
        path: 'park',
        name: 'park',
        component: () => import('@/views/flow/park'),
        meta: { title: '乐园', icon: 'table' }
      }
    ]
  },

  // {
  //   path: '/ticket',
  //   component: Layout,
  //   redirect: '/flow/ticket',
  //   name: '售票量',
  //   meta: { title: '售票量', icon: 'example' },
  //   children: [
  //     {
  //       path: 'ticket',
  //       name: 'ticket',
  //       component: () => import('@/views/flow/ticket'),
  //       meta: { title: '售票量', icon: 'table' }
  //     },
  //     {
  //       path: 'park',
  //       name: 'park',
  //       component: () => import('@/views/flow/park'),
  //       meta: { title: '乐园', icon: 'table' }
  //     }
  //   ]
  // },

  {
    path: '/map',
    component: Layout,
    redirect: '/flow/ticket',
    name: '地图',
    meta: { title: '地图', icon: 'example' },
    children: [
      {
        path: 'ticket',
        name: 'ticket',
        component: () => import('@/views/flow/ticket'),
        meta: { title: '模拟入园', icon: 'table' }
      }

    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
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

