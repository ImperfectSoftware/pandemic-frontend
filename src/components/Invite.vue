<template>
  <div>
    <h3>Game Setup - {{ selectedGame.id }}</h3>
    <form id="invites" class="form-inline mx-auto w-lg"
      @submit.prevent="createInvite">
      <input v-model="username" type="text" id="inputUsername"
        class="form-control w-md" placeholder="Username" required autofocus>
      <button class="btn btn-secondary w-sm" type="submit">Send Invite</button>
    </form>
    <br/>
    <ul class="invitees-list list-group">
      <PlayerLineItem v-for="player in selectedGame.players" :key="player.invitationId"
        :player="player"/>
      <form id="start-game-id" :class="isReadyToStart"
        @submit.prevent="startGame">
        <button class="mx-auto w-lg btn btn-secondary" type="submit">
          Start Game
        </button>
      </form>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Player from '@/models/Player'
import PlayerLineItem from '@/components/PlayerLineItem'

export default {
  name: 'Invite',
  computed: {
    ...mapGetters({ currentUser: 'currentUser', selectedGame: 'selectedGame' }),
    isReadyToStart: function () {
      return { 'd-none': !this.selectedGame.isReadyToStart }
    }
  },
  components: {
    PlayerLineItem
  },
  data: function () {
    return {
      username: ''
    }
  },
  methods: {
    createInvite () {
      this.$http.post(
        `/games/${this.selectedGame.id}/invitations.json`,
        { username: this.username }
      )
        .then(request => this.createInviteSuccess(request.data))
        .catch(() => this.createInviteFailed())
    },
    createInviteSuccess (data) {
      if (data.error) {
        this.$parent.$emit(
          'alert',
          { message: data.error, alertClass: 'alert-warning' }
        )
      } else {
        this.$parent.$emit('alert', { message: false })
        this.selectedGame.players.push(Player.from({
          acceptedStatus: data.acceptedStatus,
          invitation_id: data.id,
          user_id: data.user.id,
          username: data.user.username
        }))
      }
    },
    createInviteFailed () {
    },
    startGame () {
      this.$http.put(`/games/${this.selectedGame.id}`)
        .then(request => this.startedGame(request.data))
        .catch((e) => this.startingGameFailed(e))
    },
    startedGame () {
      // TODO: add logic to redirect and start game
    },
    startingGameFailed (e) {
    }
  }
}
</script>
