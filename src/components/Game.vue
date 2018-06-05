<template>
  <div>
    <div class="alert w-lg" :class="alertClass" v-if="error">{{ error }}</div>
    <div class="container">
      <div class="row">
        <div class="col">
        </div>
        <div class="col">
        </div>
        <div class="col">
          <form class="form-inline" @submit.prevent="createGame">
            <button class="mx-auto btn btn-secondary" type="submit">
              Create a new Game
            </button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ul class="list-group">
            <InvitationLineItem v-for="invite in invitations"
              :invitation="invite" :key="invite.id"/>
          </ul>
        </div>
        <div class="col w-lg">
          <Invite v-if="game" :game="game"></Invite>
        </div>
        <div class="col">
          <h3>Game History</h3>
          <ul class="list-group">
            <GameHistoryLineItem v-for="game in games" :game="game"
              :key="game.id"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Invite from '@/components/Invite'
import GameHistoryLineItem from '@/components/GameHistoryLineItem'
import InvitationLineItem from '@/components/InvitationLineItem'
import GameModel from '@/models/Game'
import InvitationModel from '@/models/Invitation'
import GameSubscription from '@/subscriptions/game-subscription'
import InvitationSubscription from '@/subscriptions/invitation-subscription'

export default {
  name: 'Game',
  computed: {
    ...mapGetters({
      cableConsumer: 'cableConsumer',
      currentUser: 'currentUser'
    })
  },
  components: {
    Invite,
    GameHistoryLineItem,
    InvitationLineItem
  },
  created: function () {
    this.$store.dispatch('createConsumer') // <=
    this.$http.get('/invitations')
      .then(request => this.displayInvitationsSuccess(request.data))
      .catch(() => this.displayInvitationsFailed())
    this.$http.get('/games.json')
      .then(request => this.displayGamesSuccess(request))
      .catch(() => this.displayGamesFailed())
    this.$on('alert', function (data) {
      this.error = data.message
      this.alertClass = data.alertClass
    })
    this.$on('changeSelectedGame', (data) => { this.game = data.game })
    InvitationSubscription
      .from(this.cableConsumer, this.invitations, this.currentUser.id)
      .subscribe()
  },
  data: function () {
    return {
      game: '',
      error: false,
      alertClass: 'alert-danger',
      games: [],
      invitations: []
    }
  },
  methods: {
    createGame () {
      this.$http.post('/games')
        .then(request => this.createGameSuccess(request.data))
        .catch(() => this.createGameFailed())
    },
    createGameSuccess (data) {
      this.error = false
      this.game = GameModel.from(data.game)
      this.games.unshift(this.game)
      this.subscribeToGameChannel(this.game)
    },
    createGameFailed (e) {
      this.error = "We're sorry, something went wrong. Please try again later."
    },
    displayGamesSuccess (request) {
      request.data.games.forEach((game) => {
        let gameFromModel = GameModel.from(game)
        this.games.push(gameFromModel)
        this.subscribeToGameChannel(gameFromModel)
      }, this)
    },
    displayInvitationsSuccess (data) {
      data.invitations.forEach((attributes) => {
        this.invitations.push(InvitationModel.from(attributes))
      }, this)
    },
    displayGamesFailed (e) {
    },
    displayInvitationsFailed (e) {
    },
    subscribeToGameChannel (game) {
      GameSubscription.from(this.cableConsumer, game).subscribe()
    }
  }
}
</script>
