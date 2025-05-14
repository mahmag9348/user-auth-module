import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/Auth/SignIn.vue'
import SignUp from '../components/Auth/SignUp.vue'
import UserDashboard from '../components/UserDashboard.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ 
      name: 'SignIn', 
      query: { redirect: to.fullPath }
    })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'UserDashboard' })
  } else {
    next()
  }
})

export default router
