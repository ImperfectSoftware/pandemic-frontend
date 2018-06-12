<template>
  <li class="list-group-item mx-auto w-lg"
    :class="{
      'accepted': invitation.isAccepted(),
      'declined': invitation.isDeclined(),
      'inactive': invitation.isInactive()
    }">
    <div v-if="invitation.isAccepted()">Accepted</div>
    <div v-if="invitation.isDeclined()">Declined</div>
    <div>Invitation from {{ invitation.ownerUsername }}:</div>
    <div>
      <span>{{ invitation.gameName }} </span>
      #
      <span> {{ invitation.gameId }}</span>
    </div>
    <div v-if="invitation.shouldHideMarks()">
      <span class="fa fa-check accept-mark float-left" @click="acceptInvite"/>
      <span class="fa fa-times decline-mark float-right"
        @click="declineInvite"/>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InvitationLineItem',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  props: [
    'invitation'
  ],
  data: function () {
    return {
    }
  },
  methods: {
    acceptInvite () {
      this.respondToInviteRequest('accepted')
    },
    declineInvite () {
      this.respondToInviteRequest('declined')
    },
    respondToInviteRequest (value) {
      this.$http.put(
        `/games/${this.invitation.gameId}/invitations.json`,
        { status: value }
      )
        .then(request => this.updateInviteSuccess(request.data))
        .catch(() => this.updateInviteFailed())
    },
    updateInviteSuccess (data) {
      this.invitation.setAcceptedStatus(data.status)
      if (data.status === 'accepted') {
        this.$store.dispatch('unshiftGame', data.game)
      }
    },
    updateInviteFailed () {
      console.log('Failed to update invitation')
    }
  }
}
</script>
