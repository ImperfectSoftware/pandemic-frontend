<template>
  <div class="game-history-line-item">
    <div :class="isOwner">
      <!-- TODO place owner styles below -->
    </div>
    <li v-on:click="updateGameSelection" class="list-group-item mx-auto w-lg">
      <span>{{ game.name }}</span>
      #
      <span>{{ game.id }}</span>
    </li>

    <div :class="shoulHideMarks">
      <span class="fa fa-check accept-mark float-left"
        v-on:click="acceptInvite"/>
      <span class="fa fa-times decline-mark float-right"
        v-on:click="declineInvite"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Invite',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' }),
    isOwner: function () {
      return { 'd-none': this.game.isOwner(this.currentUser) }
    },
    shoulHideMarks: function () {
      return { 'd-none': this.game.shoulHideMarks(this.currentUser) }
    }
  },
  props: [
    'game'
  ],
  data: function () {
    return {
    }
  },
  methods: {
    updateGameSelection () {
      this.$parent.$emit('changeSelectedGame', { game: this.game })
    },
    acceptInvite () {
      this.sendInviteRequest(true)
    },
    declineInvite () {
      this.sendInviteRequest(false)
    },
    sendInviteRequest (value) {
      let player = this.game.getUserPlayer(this.currentUser)
      this.$http.put(
        `/games/${this.game.id}/invitations/${player.invitationId}.json`,
        { accepted: value }
      )
        .then(request => player.setAccepted(request.data.accepted))
        .catch(() => this.updateInviteFailed())
    },
    updateInviteFailed () {
      console.log('Failed to update invitation')
    }
  }
}
</script>
