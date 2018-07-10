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
      <span class="fa fa-check accept-mark float-left"
        @click="facade.respondToInvite('accepted', invitation)"/>
      <span class="fa fa-times decline-mark float-right"
        @click="facade.respondToInvite('declined', invitation)"/>
    </div>
  </li>
</template>

<script>
import Facade from '@/Facade'

export default {
  name: 'InvitationLineItem',
  props: [
    'invitation'
  ],
  computed: {
    facade: function () {
      return new Facade()
    }
  }
}
</script>
