<template>
  <div v-if="notification.show" id="generic-notification">
    {{ notification.message }}
    <button class="btn btn-secondary" @click="close">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShareCardNotification',
  computed: {
    ...mapGetters({
      notification: 'genericNotification'
    })
  },
  methods: {
    close: function () {
      this.$store.dispatch('hideGenericNotification')
    }
  }
}
</script>
