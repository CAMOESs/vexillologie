import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/public/Home.vue'

import PublicLayout from '@/views/public/Layout.vue'
import About from '@/views/public/About.vue'
import Jeu from '@/views/public/Jeu.vue'

const routes = [
  {
    path: '/',
    name: 'PublicLayout',
    component: PublicLayout,
    children: [
      {path: '', name: 'home', component: Home},
      {path: '/:name', name: 'about', component: About},
      {path: '/jeu', name: 'jeu', component: Jeu},
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
