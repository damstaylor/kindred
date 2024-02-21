import Vue from 'vue'
import Router from 'vue-router'
import LiveHome from './views/LiveHome.vue'
import LiveDetails from './views/LiveDetails.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/lives',
    },
    {
      path: '/lives',
      name: 'live-home',
      component: LiveHome,
    },
    {
      path: '/livedetails/:id',
      name: 'live-details',
      component: LiveDetails,
    },
  ],
})
export default router
