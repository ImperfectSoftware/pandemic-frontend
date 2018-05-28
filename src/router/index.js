import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/games',
      name: 'Game',
      component: Game
    }
  ]
})
