import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import Wishlist from '../views/Wishlist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/wishlist/:code',
    name: 'Wishlist',
    component: Wishlist
  },
]

const router = new VueRouter({
  routes
})

export default router
