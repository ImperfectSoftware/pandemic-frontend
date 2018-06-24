<template>
  <div id="map">
    <WorldMap />
    <ActionMenu />
    <div v-if="game" class="container-fluid no-gutters">
      <div class="row">
        <div class="col col-sm-3">
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
        <div class="col col-sm-5">
          <div id="city-control">
            <h2>Control Center</h2>
          </div>
        </div>
        <div class="col col-sm-2">
          <div class="card">
            <div class="card-body">
              <h2>Player Cards</h2>
              <ul class="list-unstyled">
                <li v-for="city in currentPlayer.cityPlayerCards"
                  :key="city.name" :class="city.cssClass">
                  <div>{{ city.name }}</div>
                  <div>Population: {{ city.population }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col col-sm-2">
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
import ActionMenu from '@/components/ActionMenu'

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
    WorldMap,
    ActionMenu
  }
}
</script>
