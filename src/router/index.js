import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import GamesDashboard from '@/components/GamesDashboard'
import GameInstance from '@/components/GameInstance'
import Signout from '@/components/Signout'

Vue.use(Router)

export default new Router({
  mode: 'history', // <=
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/games',
      name: 'GamesDashboard',
      component: GamesDashboard
    },
    {
      path: '/games/:id',
      name: 'GameInstance',
      component: GameInstance
    },
    {
      path: '/signout',
      name: 'Signout',
      component: Signout
    }
  ]
})
