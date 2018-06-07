<template>
  <li class="list-group-item mx-auto w-lg"
    :class="{'accepted': accepted, 'declined': declined, 'inactive': inactive}">
    <div :class="{'d-none': !accepted}">Accepted</div>
    <div :class="{'d-none': !declined}">Declined</div>
    <div>Invitation from {{ invitation.ownerUsername }}:</div>
    <div>
      <span>{{ invitation.gameName }} </span>
      #
      <span> {{ invitation.gameId }}</span>
    </div>
    <div :class="shouldHideMarks">
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
    ...mapGetters({ currentUser: 'currentUser' }),
    shouldHideMarks: function () {
      return { 'd-none': this.invitation.isAccepted() || this.invitation.isDeclined() }
    },
    accepted: function () {
      return this.invitation.isAccepted()
    },
    declined: function () {
      return this.invitation.isDeclined()
    },
    inactive: function () {
      return this.invitation.isInactive()
    }
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
