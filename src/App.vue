<template>
  <div id="app">
    <template v-if="currentUser">
      <Navbar></Navbar>
    </template>
    <div class="container-fluid">
      <router-view/>
      <template v-if="currentUser">
        <Foot></Foot>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

export default {
  name: 'App',
  components: {
    Navbar,
    Foot
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
