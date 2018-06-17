<template>
  <div class="container">
    <br>
    <Error/>
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
        <ul class="list-group">
          <GameHistoryLineItem v-for="game in games" :game="game"
            :key="game.id"/>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <form class="form-inline" @submit.prevent="createGame">
          <button class="mx-auto btn btn-secondary" type="submit">
            Create a new Game
          </button>
        </form>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SelectedGame from '@/components/SelectedGame'
import Error from '@/components/Error'
import GameHistoryLineItem from '@/components/GameHistoryLineItem'
import InvitationLineItem from '@/components/InvitationLineItem'

export default {
  name: 'Game',
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
    InvitationLineItem,
    Error
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
