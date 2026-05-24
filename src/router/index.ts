import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import ProductAdmin from '@/views/admin/products.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/',
      component: CustomerLayout,
      children: [
        { path: '', name: 'home', component: () => import('@/views/Home.vue') },
        { path: 'products', name: 'products', component: () => import('@/views/Products.vue') },
        {
          path: 'checkout',
          name: 'cart',
          component: () => import('@/views/CartView.vue'),
          meta: { auth: true },
        },
        {
          path: 'products/:id',
          name: 'product-detail',
          component: () => import('@/views/ProductDetail.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      redirect: '/admin/dashboard',
      meta: {
        auth: true,
        role: ['admin'],
      },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: Dashboard,
        },
        {
          path: 'products',
          name: 'admin-products',
          component: ProductAdmin,
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuth = authStore.isAuthenticated
  const userRole = authStore.user?.role || 'customer'

  if (to.name === 'login') {
    if (isAuth) {
      return next(userRole === 'admin' ? { name: 'admin-dashboard' } : { name: 'home' })
    }
    return next()
  }

  if (to.meta.auth) {
    if (!isAuth) {
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }

    if (to.meta.role) {
      const allowedRoles = to.meta.role as string[]
      if (!allowedRoles.includes(userRole)) {
        return next({ name: 'home' })
      }
    }
  }

  next()
})

export default router
