<template>
  <li class="list-group-item mx-auto w-lg" :class="statusType">
    <span class='username'>{{ player.username }}</span>
  </li>
</template>

<script>
export default {
  name: 'PlayerLineItem',
  computed: {
    statusType: function () {
      return {
        ready: this.player.isReady,
        pending: this.player.isPending
      }
    }
  },
  props: [
    'player'
  ]
}
</script>
