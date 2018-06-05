<template>
  <li class="list-group-item mx-auto w-lg" :class="{'accepted': accepted}">
    <div :class="{'d-none': !accepted}">Accepted</div>
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
      return { 'd-none': this.invitation && this.invitation.accepted }
    },
    accepted: function () {
      return this.invitation && this.invitation.accepted
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
      this.sendInviteRequest('accepted')
    },
    declineInvite () {
      this.sendInviteRequest('declined')
    },
    sendInviteRequest (value) {
      this.$http.put(
        `/games/${this.invitation.gameId}/invitations.json`,
        { status: value }
      )
        .then(request => this.updateInviteSuccess(request.data))
        .catch(() => this.updateInviteFailed())
    },
    updateInviteSuccess (data) {
      this.invitation.setAcceptedStatus(data.status)
      // create game here
    },
    updateInviteFailed () {
      console.log('Failed to update invitation')
    }
  }
}
</script>
