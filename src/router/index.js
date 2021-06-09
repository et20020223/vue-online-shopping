import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    /* webpackChunkName: "about"  '../views/About.vue'*/
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    redirect:'Login'
  },
]

const router = new VueRouter({
  routes
})

export default router
