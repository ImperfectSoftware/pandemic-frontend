<template>
  <li class="list-group-item mx-auto size-big"
    :class="statusType">
    <span class='username'>{{ username }}</span>
  </li>
</template>

<script>
export default {
  name: 'InviteLineItem',
  computed: {
    statusType: function () {
      return {
        ready: this.status === 'Ready',
        pending: this.status === 'Pending'
      }
    }
  },
  props: {
    username: { default: '' },
    status: { default: 'Pending' }
  },
  data: function () {
    return {
    }
  }
}
</script>

<style lang="sass">
    @import '../assets/scss/App.scss';
</style>
