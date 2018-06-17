<template>
  <nav class="navbar navbar-dark bg-pandemic">
    <a class="navbar-brand" href="/">Pandemic</a>
    <span class="navbar-text">
      {{ currentUser.email }}
      <router-link to="/signout" class="btn btn-signout btn-sm">
        Signout
      </router-link>
    </span>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  }
}
</script>
