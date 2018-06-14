import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Game from '@/components/Game'
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
      name: 'Game',
      component: Game
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
