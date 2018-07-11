<template>
  <div id="share-card-notification" :class="notification.cssClasses">
    {{ notification.message }}
    <button :class="notification.actionsCssClasses"
      @click="facade.respondToSharedCard(true)">
      <i class="fas fa-check"></i>
    </button>
    <button :class="notification.actionsCssClasses"
      @click="facade.respondToSharedCard(false)">
      <i class="fas fa-times"></i>
    </button>
    <button :class="notification.closeNotificationCssClasses" @click="close">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Facade from '@/Facade'

export default {
  name: 'ShareCardNotification',
  computed: {
    ...mapGetters({
      notification: 'sharedCardNotification',
      game: 'activeGame'
    }),
    facade: function () {
      return new Facade()
    }
  },
  methods: {
    close: function () {
      this.$store.dispatch('hideSharedCardNotification')
    }
  }
}
</script>
