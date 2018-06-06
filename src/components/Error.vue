<template>
  <div class="alert" :class="error.css" v-if="error.display">
    {{ error.message }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Error',
  computed: {
    ...mapGetters({ error: 'error' })
  }
}
</script>
