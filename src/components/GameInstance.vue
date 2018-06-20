<template>
  <div id="map">
    <WorldMap />
    <div v-if="game" class="container shallow-gutters">
      <div class="row">
        <div class="column">
          <div class="card list" v-for="(player, key) in game.players"
            :key="key">
            <div class="card-body"
              :class="{active: player === game.activePlayer}">
              <i :class="player.cssClass" class="fa fa-user"></i>
                {{player.username}}: {{player.prettyRole}}.
            </div>
          </div>
          <div>
            {{ game.activePlayer.username }} is taking their turn.
            Remaining actions: {{ 4 - game.actionsTaken }}.
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-body">
              <h2>Player Cards</h2>
              <ul class="list-unstyled">
                <li v-for="city in currentPlayer.cities" :key="city.name"
                :class="city.cssClass">
                  <div>{{ city.name }}</div>
                  <div>Population: {{ city.population }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-body">
              <h2>Event Cards</h2>
              <ul class="list-unstyled">
                <li v-for="event in currentPlayer.events" :key="event.name">
                  <div>event.name</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
      currentUser: 'currentUser'
    }),
    currentPlayer: function () {
      if (this.game && this.currentUser) {
        return this.game.currentPlayer(this.currentUser.username)
      }
    }
  },
  created: function () {
    this.$store.dispatch('initializeStartedGame', this.$route.params.id)
  },
  components: {
    WorldMap
  }
}
</script>
