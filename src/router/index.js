import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
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
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
    meta:{requiresAuth:true},
    children:[
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/dashboard/Products.vue'),
        meta:{requiresAuth:true},
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/dashboard/Orders.vue'),
        meta:{requiresAuth:true},
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('../views/dashboard/Coupon.vue'),
        meta:{requiresAuth:true},
      },
    ]
  },
  {
    path: '/index',
    name:'index',
    component: () => import('../views/shopping/Index.vue'),
    children:[
      {
        path: 'products',
        name: 'shoppingProducts',
        component: () => import('../views/shopping/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'ProductDetail',
        component: () => import('../views/shopping/ProductDetail.vue'),
      },
    ]
  },
  {
    path: '*',
    redirect:'index'
  },
]

const router = new VueRouter({
  routes
})

export default router
