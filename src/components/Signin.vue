<template>
  <div class="signin-wrapper border border-light">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <form class="form-signin" @submit.prevent="signin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control"
        placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword"
        class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Signin',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  data: function () {
    return {
      token: '',
      email: '',
      password: '',
      error: false
    }
  },
  updated () {
    this.checkAuthentication()
  },
  created () {
    this.checkAuthentication()
  },
  methods: {
    checkAuthentication () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/games')
      }
    },
    signin () {
      this.$http.post(
        '/authenticate',
        { email: this.email, password: this.password }
      )
        .then(request => this.signinSuccess(request))
        .catch(() => this.signinFailed())
    },
    signinSuccess (request) {
      if (!request.data.auth_token) {
        this.signinFailed()
        return
      }
      localStorage.token = request.data.auth_token
      this.$store.dispatch('signin') // <=
      this.error = false
      this.$router.replace(this.$route.query.redirect || '/games')
    },
    signinFailed () {
      this.error = 'Signin failed!'
      this.$store.dispatch('signout') // <=
      delete localStorage.token
    }
  }
}
</script>
