import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Newpost from '../views/Newpost.vue'
import Profil from '../views/Profil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
  path: '/profil',
  name: 'Profil',
  component: Profil
  },
  {
  path: '/newpost',
  name: 'Newpost',
  component: Newpost
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
