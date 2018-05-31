<template>
  <div>
    <div class="alert w-md margin-auto" :class="alertClass" v-if="error">{{ error }}</div>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Friends List</h3>
        </div>
        <div class="col">
          <h3>Game Setup</h3>
          <form v-if="!game" class="w-sm form-inline"
            @submit.prevent="createGame">
            <button class="mx-auto w-sm btn btn-secondary" type="submit">
              Create a new Game
            </button>
          </form>
          <template>
            <Invite v-if="game" :game="game"></Invite>
          </template>
        </div>
        <div class="col">
          <h3>Game History</h3>
          <ul class="invitees-list list-group">
            <GameHistoryLineItem v-for="game in games" :id="game.id"
              :key="game.id"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Invite from '@/components/Invite'
import GameHistoryLineItem from '@/components/GameHistoryLineItem'
import GameModel from '@/models/Game'

export default {
  name: 'Game',
  components: {
    Invite,
    GameHistoryLineItem
  },
  created: function () {
    this.$http.get('/games.json')
      .then(request => this.displayGamesSuccess(request))
      .catch(() => this.displayGamesFailed())
    this.$on('alert', function (data) {
      this.error = data.message
      this.alertClass = data.alertClass
    })
    this.$on('changeSelectedGame', function (data) {
      this.game = this.games.find((game) => {
        return game.id === data.id
      })
    })
  },
  data: function () {
    return {
      game: '',
      error: false,
      alertClass: 'alert-danger',
      games: []
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
      this.game = GameModel.from({
        id: data.id,
        started: false,
        owner_id: data.owner_id,
        invites: []
      })
      this.games.push(this.game)
    },
    createGameFailed (e) {
      this.error = "We're sorry, something went wrong. Please try again later."
    },
    displayGamesSuccess (request) {
      request.data.games.forEach((game) => {
        this.games.push(GameModel.from(game))
      }, this)
    },
    displayGamesFailed (e) {
    }
  }
}
</script>
