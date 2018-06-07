<template>
  <div class="game-history-line-item container">
    <li @click="updateGameSelection" class="list-group-item mx-auto w-lg"
      :class="{'selected-game': selected, 'not-selected-game': !selected}">
      <div class="row">
        <div class="col">
        </div>
        <div class="col-xs-1">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <span>{{ game.id }}</span>
        </div>
        <div class="col">
          <span>{{ game.name }}</span>
        </div>
        <div class="col-xs-1">
          <span :class="isNotOwner" class="fa fa-bookmark"
            aria-hidden="true">
          </span>
          <span :class="isOwner" class="fa fa-child"
            aria-hidden="true">
          </span>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Invite',
  computed: {
    ...mapGetters({ currentUser: 'currentUser', selectedGame: 'selectedGame' }),
    isOwner: function () {
      return { 'd-none': this.game.isOwner(this.currentUser) }
    },
    isNotOwner: function () {
      return { 'd-none': !this.game.isOwner(this.currentUser) }
    },
    shoulHideMarks: function () {
      return { 'd-none': this.game.shoulHideMarks(this.currentUser) }
    },
    selected: function () {
      return this.selectedGame === this.game
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
      this.$store.dispatch('updateSelectedGame', this.game)
    }
  }
}
</script>
