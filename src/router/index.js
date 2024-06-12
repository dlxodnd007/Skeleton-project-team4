import { createRouter, createWebHistory } from 'vue-router';
<<<<<<< HEAD
=======
import Home from '@/pages/Home.vue';
import Category from '@/pages/Category.vue';
>>>>>>> 414cd1b4ab5dac0d88a7a6db27bdd0244aaa6f19
import Profile from '@/pages/Profile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
  ],
});

export default router;
