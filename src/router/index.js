import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage')
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: () => import('../views/ContactPage.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      /*if (localStorage.getItem('index')) {
        next();
      } else {
        next({name: 'HomePage'});
      }*/
      next();
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
