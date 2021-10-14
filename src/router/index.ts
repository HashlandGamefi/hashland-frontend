import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/buy',
    name: 'Buy',
    component: () => import('../views/Buy/index.vue')
  },
  {
    path: '/nftmining',
    name: 'NFTmining',
    component: () => import('../views/NFTmining/index.vue')
  },
  {
    path: '/carddetails',
    name: 'CardDetails',
    component: () => import('../views/NFTmining/carddetails.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
