<template>
  <div id="share-card-notification" :class="notification.cssClasses">
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
import RespondToShareCardService from '@/services/RespondToShareCardService'

export default {
  name: 'ShareCardNotification',
  computed: {
    ...mapGetters({
      notification: 'sharedCardNotification',
      game: 'activeGame'
    })
  },
  methods: {
    respond: function (response) {
      RespondToShareCardService.call({
        notification: this.notification,
        response: response,
        game: this.game
      })
      this.$store.dispatch('hideSharedCardNotification')
    },
    close: function () {
      this.$store.dispatch('hideSharedCardNotification')
    }
  }
}
</script>
