import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/details',
    name: 'details',
    component: () => import(/* webpackChunkName: "details" */ '../views/DetailView.vue')
  },
  {
    path: '/newuser',
    name: 'newuser',
    component: () => import(/* webpackChunkName: "newuser" */ '../views/NewUserView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
