<template>
  <li v-on:click="updateGameSelection" class="list-group-item mx-auto w-lg">
    <span>#{{ game.id }} </span>-<span> {{ game.createdDate }}</span>
  </li>
</template>

<script>

export default {
  name: 'Invite',
  props: [
    'game'
  ],
  data: function () {
    return {
    }
  },
  methods: {
    updateGameSelection () {
      this.$parent.$emit('changeSelectedGame', { game: this.game })
    }
  }
}
</script>
