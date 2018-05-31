<template>
  <div>
    <div class="alert" :class="alertClass" v-if="error">{{ error }}</div>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Friends List</h3>
        </div>
        <div class="col">
          <form v-if="!gameId" class="size-big form-inline"
            @submit.prevent="createGame">
            <button class="mx-auto size-big btn btn-secondary" type="submit">
              Create a new Game
            </button>
          </form>
          <template>
            <Invite v-if="gameId" :gameId="gameId"></Invite>
          </template>
        </div>
        <div class="col">
          <h3>Game History</h3>
        </div>
      </div>
    </div>
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
<style lang="sass">
    @import '../assets/scss/App.scss';
</style>
<style>
</style>
