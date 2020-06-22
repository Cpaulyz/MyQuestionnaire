import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/login'
  },
  {
    path: '/customer/:paperId/complete',
    name: 'complete',
    component: () => import('../views/customer/afterSubmit/AfterSubmit'),
  },
  {
    path: '/customer/:paperId',
    name: 'customer',
    component: () => import('../views/customer/Customer')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('../views/editor/Editor'),
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: () => import('../views/editor/overview/Overview')
      },
      {
        path: 'create/:paperId',
        name: 'create',
        component: () => import('../views/editor/create/Create')
      },
      {
        path: 'monitor/:paperId',
        name: 'monitor',
        component: () => import('../views/editor/monitor/Monitor')
      },
      {
        path: 'paperlink/:paperId',
        name: 'paperlink',
        component: () => import('../views/editor/create/PaperLink')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
