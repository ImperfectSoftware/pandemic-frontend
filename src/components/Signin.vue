<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="signin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signin',
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
      if (localStorage.token) {
        this.$router.replace(this.$route.query.redirect || '/games')
        this.$router.replace('/games')
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
      this.error = false
      this.$router.replace(this.$route.query.redirect || '/games')
    },
    signinFailed () {
      this.error = 'Signin failed!'
      delete localStorage.token
    }
  }
}
</script>
