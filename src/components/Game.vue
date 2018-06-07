<template>
  <div class="container">
    <Error/>
    <div class="row">
      <div class="col-xl-3">
        <ul class="list-group">
          <InvitationLineItem v-for="invite in invitations"
            :invitation="invite" :key="invite.id"/>
        </ul>
      </div>
      <div class="col-xl-6">
        <Invite v-if="selectedGame" :game="selectedGame"></Invite>
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
import Invite from '@/components/Invite'
import Error from '@/components/Error'
import GameHistoryLineItem from '@/components/GameHistoryLineItem'
import InvitationLineItem from '@/components/InvitationLineItem'
import InvitationSubscription from '@/subscriptions/InvitationSubscription'

export default {
  name: 'Game',
  computed: {
    ...mapGetters({
      cableConsumer: 'cableConsumer',
      currentUser: 'currentUser',
      games: 'games',
      selectedGame: 'selectedGame',
      invitations: 'invitations'
    })
  },
  components: {
    Invite,
    GameHistoryLineItem,
    InvitationLineItem,
    Error
  },
  created: function () {
    this.$store.dispatch('createConsumer') // <=
    this.$http.get('/invitations')
      .then(request => this.displayInvitationsSuccess(request.data))
      .catch((e) => this.displayInvitationsFailed(e))
    this.$http.get('/games.json')
      .then(request => this.displayGamesSuccess(request))
      .catch((e) => this.displayGamesFailed(e))
    this.$on('alert', function (data) {
      this.error = data.message
      this.alertClass = data.alertClass
    })
    InvitationSubscription
      .from(this.cableConsumer, this.invitations, this.currentUser.id)
      .subscribe()
  },
  data: function () {
    return {
      game: '',
      error: false,
      alertClass: 'alert-danger'
    }
  },
  methods: {
    createGame () {
      this.$http.post('/games')
        .then(request => this.createGameSuccess(request.data))
        .catch((e) => this.createGameFailed(e))
    },
    createGameSuccess (data) {
      this.error = false
      this.$store.dispatch('unshiftGame', data.game)
    },
    createGameFailed (e) {
      console.log(e)
      this.error = "We're sorry, something went wrong. Please try again later."
    },
    displayGamesSuccess (request) {
      request.data.games.forEach((game) => {
        this.$store.dispatch('pushGame', game)
      }, this)
      this.$store.dispatch('updateSelectedGame', this.games[0])
    },
    displayInvitationsSuccess (data) {
      data.invitations.forEach((attributes) => {
        this.$store.dispatch('pushInvitation', attributes)
      }, this)
    },
    displayGamesFailed (e) {
      console.log(e)
    },
    displayInvitationsFailed (e) {
      console.log(e)
    }
  }
}
</script>
