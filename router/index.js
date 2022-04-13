import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home.vue'
// import Login from '../views/login/Login.vue'
// import Register from '../views/register/Register.vue'
// import Shop from '../views/shop/Shop.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    // 已经登陆跳转首页
    beforeEnter: (to, from, next) => {
      if (localStorage.isLogin === 'true') {
        next({ name: 'Register' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.isLogin === 'true') {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/Shop.vue')
  },
  {
    path: '/order-confirmation/:shopId',
    name: 'OrderConfirmation',
    component: () => import('../views/order/OrderConfirmation.vue')
  },
  {
    path: '/order-list',
    name: 'OrderList',
    component: () => import('../views/order/OrderList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (
    localStorage.isLogin === 'true' ||
    to.name === 'Login' ||
    to.name === 'Register'
  ) {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export default router
