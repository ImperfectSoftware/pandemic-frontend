<template>
  <div class="game-history-line-item">
    <div :class="isOwner">
      <!-- TODO place owner styles below -->
    </div>
    <li @click="updateGameSelection" class="list-group-item mx-auto w-lg">
      <span>{{ game.name }}</span>
      #
      <span>{{ game.id }}</span>
    </li>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Invite',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' }),
    isOwner: function () {
      return { 'd-none': this.game.isOwner(this.currentUser) }
    },
    shoulHideMarks: function () {
      return { 'd-none': this.game.shoulHideMarks(this.currentUser) }
    }
  },
  props: [
    'game'
  ],
  data: function () {
    return {
    }
  },
  methods: {
    updateGameSelection () {
      this.$store.dispatch('updateSelectedGame', this.game.id)
    }
  }
}
</script>
