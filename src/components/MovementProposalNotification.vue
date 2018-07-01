<template>
  <div id="movement-proposal-notification" :class="notification.cssClasses">
    {{ notification.message }}
    <button :class="notification.actionsCssClasses" @click="respond(true)">
      <i class="fas fa-check"></i>
    </button>
    <button :class="notification.actionsCssClasses" @click="respond(false)">
      <i class="fas fa-times"></i>
    </button>
    <button :class="notification.closeNotificationCssClasses" @click="close">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import RespondToMovementProposalService from '@/services/RespondToMovementProposalService'

export default {
  name: 'MovementProposalNotification',
  computed: {
    ...mapGetters({
      notification: 'movementProposalNotification',
      game: 'activeGame'
    })
  },
  methods: {
    respond: function (response) {
      RespondToMovementProposalService.call({
        notification: this.notification,
        response: response,
        game: this.game
      })
      this.$store.dispatch('hideMovementProposalNotification')
    },
    close: function () {
      this.$store.dispatch('hideMovementProposalNotification')
    }
  }
}
</script>
