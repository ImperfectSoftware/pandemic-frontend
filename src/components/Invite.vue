<template>
  <div>
    <form id="invites" class="form-inline mx-auto"
      @submit.prevent="createInvite">
      <input v-model="username" type="text" id="inputUsername"
        class="form-control" placeholder="Username" required autofocus>
      <button class="btn btn-secondary" type="submit">Send Invite</button>
    </form>
    <br/>
    <ul class="invitees-list list-unstyled">
      <InviteLineItem :username="currentUser.username" :status="'Ready'"/>
      <InviteLineItem v-for="player in players" :key="player.invitationId"
        :username="player.username" :status="'Pending'"/>
    </ul>
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
        console.log('emitting error...')
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
  form#invites {
    width: 300px;
  }
</style>
