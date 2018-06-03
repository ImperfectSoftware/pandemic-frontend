<template>
  <li v-on:click="updateGameSelection" class="list-group-item mx-auto w-lg">
    <span>{{ game.name }}</span>#<span>{{ game.id }}</span>
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
