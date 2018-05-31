<template>
  <div>
    <form id="invites" class="form-inline mx-auto size-big"
      @submit.prevent="createInvite">
      <input v-model="username" type="text" id="inputUsername"
        class="form-control" placeholder="Username" required autofocus>
      <button class="btn btn-secondary" type="submit">Send Invite</button>
    </form>
    <br/>
    <ul class="invitees-list list-group">
      <InviteLineItem :username="currentUser.username" :status="'Ready'"/>
      <InviteLineItem v-for="player in players" :key="player.invitationId"
        :username="player.username" :status="player.status"/>
      <form id="start-game-id" :class="gameReadyToStart"
        @submit.prevent="startGame">
        <button class="mx-auto size-big btn btn-secondary" type="submit">
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
      let playersReadyToStart = this.players.filter(player => player.isReady)
      return { 'd-none': playersReadyToStart.length < 2 }
    }
  },
  components: {
    InviteLineItem
  },
  props: [
    'gameId'
  ],
  data: function () {
    return {
      username: '',
      players: []
    }
  },
  methods: {
    createInvite () {
      this.$http.post(
        `/games/${this.gameId}/invitations.json`,
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
        this.players.push(Player.from(data))
      }
    },
    createInviteFailed () {
    },
    startGame () {
      this.$http.put(`/games/${this.gameId}`)
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

<style lang="sass">
    @import '../assets/scss/App.scss';
</style>
<style>
</style>
