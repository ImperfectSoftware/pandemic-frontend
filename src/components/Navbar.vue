<template>
  <nav class="navbar navbar-dark bg-bookstore">
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

<style lang="scss" scoped>
.bg-bookstore {
  background: #605B56 !important;
}

.btn-signout {
  background-color: #837A75;
  border-color: #837A75;
  color: #fff;
}

.btn-signout:hover {
  background-color: darken(#837A75, 20%);
  border-color: darken(#837A75, 20%);
  color: #fff;
}
</style>
