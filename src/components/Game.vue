<template>
  <div>
    <div class="alert" :class="alertClass" v-if="error">{{ error }}</div>
    <h2>Games</h2>
    <form v-if="!gameId" id="newGame" class="form-inline" @submit.prevent="createGame">
      <button class="mx-auto newGame btn btn-secondary" type="submit">
        Create a new Game
      </button>
    </form>
    <hr>
    <template>
      <Invite v-if="gameId" :gameId="gameId"></Invite>
    </template>
  </div>
</template>

<script>
import Invite from '@/components/Invite'

export default {
  name: 'Game',
  components: {
    Invite
  },
  created: function () {
    this.$on('alert', function (data) {
      this.error = data.message
      this.alertClass = data.alertClass
    })
  },
  data: function () {
    return {
      gameId: '',
      error: false,
      alertClass: 'alert-danger'
    }
  },
  methods: {
    createGame () {
      this.$http.post('/games')
        .then(request => this.createGameSuccess(request))
        .catch(() => this.createGameFailed())
    },
    createGameSuccess (request) {
      this.error = false
      this.gameId = request.data.id
    },
    createGameFailed () {
      this.error = "We're sorry, something went wrong. Please try again later."
    }
  }
}
</script>

<style>
form#newGame .newGame {
  width: 300px;
}
</style>
