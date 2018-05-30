<template>
  <div>
    <form id="invites" class="form-inline mx-auto size-big"
      @submit.prevent="createInvite">
      <input v-model="username" type="text" id="inputUsername"
        class="form-control" placeholder="Username" required autofocus>
      <button class="btn btn-secondary" type="submit">Send Invite</button>
    </form>
    <br/>
    <div class="invitees-list">
      <InviteLineItem :username="currentUser.username" :status="'Ready'"/>
      <InviteLineItem v-for="player in players" :key="player.invitationId"
        :username="player.username" :status="'Pending'"/>
      <form id="start-game-id" @submit.prevent="startGame">
        <button class="mx-auto size-big btn btn-secondary" type="submit">
          Start Game
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InviteLineItem from '@/components/InviteLineItem'

export default {
  name: 'Invite',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
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
        this.players.push({
          username: data.user.username,
          invitationId: data.id
        })
      }
    },
    createInviteFailed () {
    }
  }
}
</script>

<style>
  .size-big {
    width: 300px;
  }
</style>
