import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProductDetail from '@/views/ProductDetail.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import ProductAdmin from '@/views/admin/products.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
   {
    path: '/',
    component: () => import('@/layouts/CustomerLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('../views/Home.vue') },
      { path: 'products', name: 'products', component: () => import('../views/Products.vue') },
      { path: 'checkout', name: 'cart', component: () => import('../views/CartView.vue'), meta: { auth: false }},
      { path: 'products/:id', name: 'product-detail', component: () => import('../views/ProductDetail.vue') },
    ]
  },
   {
    path:'/admin',
    component:AdminLayout,
    redirect: '/admin/dashboard',
    meta: {
      auth: true,
      role: ['admin'],
    },
    
    children: [
      {
        path:'dashboard',
        name: 'admin-dashboard',
        component:Dashboard,
      },
      {
        path:'products',
        name: 'admin-products',
        component:ProductAdmin,
      },
      {
         path: '/login',
         name: 'login',
        component: () => import('@/views/Login.vue')
     },
    ]
   }
  ],
})
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  const userRole = localStorage.getItem('userRole') || 'customer';

 
  if (to.name === 'login') {
    if (isAuth) return next({ name: 'admin-dashboard' });
    return next();
  }

  
  if (to.meta.auth) {
    if (!isAuth) {
      
      alert("Acesso negado! Redirecionando para o login...");
      return next({ name: 'login' });
    }

    
    if (to.meta.role) {
      const allowedRoles = to.meta.role as string[];
      if (!allowedRoles.includes(userRole)) {
        alert("Você não tem permissão de administrador!");
        return next({ name: 'home' }); 
      }
    }
  }

   
  next();
});
export default router






