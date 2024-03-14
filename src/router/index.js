import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LogInView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/LibraryView.vue')
    },
    // {
    //   path: '/library/:id',
    //   name: 'book',
    //   component: () => import('@/views/LibraryView.vue')
    // },
    // {
    //   path: '/library?q=:q&view=:view',
    //   name: 'library',
    //   component: () => import('@/views/LibraryView.vue')
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicyView.vue')
    },
    {
      path: '/legal-conditions',
      name: 'legal-conditions',
      component: () => import('@/views/LegalConditionsView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPasswordView.vue')
    }
  ], 
  sensitive: true,
  strict: true,
})

export default router;
