<script>
export default {
  name: 'Signout',
  created () {
    delete localStorage.token
    this.$store.dispatch('signout')
    this.$router.push('/')
  }
}
</script>
