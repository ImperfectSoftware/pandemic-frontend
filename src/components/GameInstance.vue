<template>
  <div id="map">
    <WorldMap />
    <div v-if="game" class="list">
      <div class="card" v-for="(player, key) in game.players" :key="key">
        <div class="card-body" :class="{active: player === game.activePlayer}">
          <i :class="player.cssClass" class="fa fa-user"></i>
            {{player.username}}: {{player.prettyRole}}.
        </div>
      </div>
    </div>
    <div v-if="game">
      {{ game.activePlayer.username }} is taking their turn.
      Remaining actions: {{ 4 - game.actionsTaken }}.
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import WorldMap from '@/components/WorldMap'

export default {
  name: 'GameInstance',
  computed: {
    ...mapGetters({
      game: 'activeGame',
      player: 'activeGame && activeGame.activePlayer'
    })
  },
  created: function () {
    this.$store.dispatch('initializeStartedGame', this.$route.params.id)
  },
  components: {
    WorldMap
  }
}
</script>
