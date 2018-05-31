<template>
  <div>
    <form id="invites" class="form-inline mx-auto w-lg"
      @submit.prevent="createInvite">
      <input v-model="username" type="text" id="inputUsername"
        class="form-control w-md" placeholder="Username" required autofocus>
      <button class="btn btn-secondary w-sm" type="submit">Send Invite</button>
    </form>
    <br/>
    <ul class="invitees-list list-group">
      <InviteLineItem v-for="player in game.players" :key="player.invitationId"
        :username="player.username" :status="player.status"/>
      <form id="start-game-id" :class="gameReadyToStart"
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
import InviteLineItem from '@/components/InviteLineItem'

export default {
  name: 'Invite',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' }),
    gameReadyToStart: function () {
      return { 'd-none': !this.game.isReadyToStart }
    }
  },
  components: {
    InviteLineItem
  },
  props: [
    'game'
  ],
  watch: {
    game: function (previousGame, currentGame) {
      console.log(`Props changed from ${previousGame.id} to ${currentGame.id}`)
    }
  },
  data: function () {
    return {
      username: '',
      players: []
    }
  },
  methods: {
    createInvite () {
      this.$http.post(
        `/games/${this.game.id}/invitations.json`,
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
        this.game.players.push(Player.from({
          accepted: data.accepted,
          invitation_id: data.id,
          user_id: data.user.id,
          username: data.user.username
        }))
      }
    },
    createInviteFailed () {
    },
    startGame () {
      this.$http.put(`/games/${this.game.id}`)
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
