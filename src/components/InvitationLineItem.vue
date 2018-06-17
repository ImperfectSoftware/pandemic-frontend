<template>
  <li class="list-group-item mx-auto w-lg"
    :class="{
      'accepted': invitation.isAccepted,
      'declined': invitation.isDeclined,
      'inactive': invitation.isInactive
    }">
    <div v-if="invitation.isAccepted">Accepted</div>
    <div v-if="invitation.isDeclined">Declined</div>
    <div>Invitation from {{ invitation.ownerUsername }}:</div>
    <div>
      <span>{{ invitation.gameName }} </span>
      #
      <span> {{ invitation.gameId }}</span>
    </div>
    <div v-if="invitation.isInactive">
      <span class="fa fa-check accept-mark float-left" @click="acceptInvite"/>
      <span class="fa fa-times decline-mark float-right"
        @click="declineInvite"/>
    </div>
  </li>
</template>

<script>
export default {
  name: 'InvitationLineItem',
  props: [
    'invitation'
  ],
  methods: {
    acceptInvite () {
      this.$store.dispatch('respondToInvite', {
        value: 'accepted',
        invitation: this.invitation
      })
    },
    declineInvite () {
      this.$store.dispatch('respondToInvite', {
        value: 'declined',
        invitation: this.invitation
      })
    }
  }
}
</script>
