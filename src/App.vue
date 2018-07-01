<template>
  <div id="app">
    <template v-if="currentUser">
      <Navbar></Navbar>
    </template>
    <div class="container-fluid no-gutters">
      <GenericNotification/>
      <router-view/>
    </div>
    <template v-if="currentUser">
      <!-- <Foot></Foot> -->
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'
import GenericNotification from '@/components/GenericNotification'

export default {
  name: 'App',
  components: {
    Navbar,
    Foot,
    GenericNotification
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.checkAuthentication()
  },
  updated () {
    this.checkAuthentication()
  },
  methods: {
    checkAuthentication () {
      if (!this.currentUser && this.$route.path !== '/') {
        this.$router.push('/?redirect=' + this.$route.path)
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'src/assets/scss/main.scss';
</style>
