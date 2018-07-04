<template>
  <div class="container">
    <br>
    <div class="row">
      <div class="col-xl-3">
        <ul class="list-group">
          <InvitationLineItem v-for="invite in invitations"
            :invitation="invite" :key="invite.id"/>
        </ul>
      </div>
      <div class="col-xl-6">
        <SelectedGame v-if="selectedGame" :game="selectedGame"></SelectedGame>
      </div>
      <div class="col-xl-3">
        <ul class="list-group list-unstyled">
          <li class="pb-5">
            <form class="form-inline" @submit.prevent="createGame">
              <button class="mx-auto btn btn-block btn-secondary" type="submit">
                Create a new Game
              </button>
            </form>
          </li>
          <GameHistoryLineItem v-for="game in games" :game="game"
            :key="game.id"/>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SelectedGame from '@/components/SelectedGame'
import GameHistoryLineItem from '@/components/GameHistoryLineItem'
import InvitationLineItem from '@/components/InvitationLineItem'

export default {
  name: 'GamesDashboard',
  computed: {
    ...mapGetters({
      games: 'games',
      selectedGame: 'selectedGame',
      invitations: 'invitations'
    })
  },
  components: {
    SelectedGame,
    GameHistoryLineItem,
    InvitationLineItem
  },
  created: function () {
    this.$store.dispatch('setupGamesDashboard')
  },
  methods: {
    createGame () {
      this.$store.dispatch('createGame')
    }
  }
}
</script>
