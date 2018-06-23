<template>
  <div id="map">
    <div id="action-menu" v-on-clickaway="hideActionMenu"
      :class="{ 'd-none': actionMenu.hide }" :style="actionMenu.style">
      <h2>{{ actionMenu.cityName }}</h2>
      <div :class="actionMenu.noActionsClasses">
        No actions can be taken for this city at this time.
      </div>
      <ul class="list-unstyled">
        <li>
          <button :class="actionMenu.driveCssClasses" @click="driveOrFerry">
            Drive/Ferry
          </button>
          <button :class="actionMenu.directFlightCssClasses"
            @click="directFlight">
            Direct Flight
          </button>
          <button :class="actionMenu.charterFlightCssClasses"
            @click="charterFlight">
            Charter Flight
          </button>
          <button :class="actionMenu.shuttleFlightCssClasses">
            Shuttle Flight
          </button>
          <button :class="actionMenu.placeResearchStationCssClasses"
            @click="placeResearchStation">
            Add Research STA
          </button>
          <button :class="actionMenu.removeResearchStationCssClasses">
            Remove Research STA
          </button>
          <button :class="actionMenu.discoverCureCssClasses">
            Discover Cure
          </button>
        </li>
      </ul>
    </div>
    <WorldMap />
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
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import WorldMap from '@/components/WorldMap'
import DriveOrFerryService from '@/services/DriveOrFerryService'
import DirectFlightService from '@/services/DirectFlightService'
import CharterFlightService from '@/services/CharterFlightService'
import PlaceResearchStationService from '@/services/PlaceResearchStationService'

export default {
  name: 'GameInstance',
  mixins: [ clickaway ],
  computed: {
    ...mapGetters({
      game: 'activeGame',
      currentUser: 'currentUser',
      actionMenu: 'actionMenu'
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
  },
  methods: {
    hideActionMenu: function () {
      this.$store.dispatch('hideActionMenu', event.target)
    },
    driveOrFerry: function () {
      DriveOrFerryService.call({ actionMenu: this.actionMenu, game: this.game })
    },
    directFlight: function () {
      DirectFlightService.call({ actionMenu: this.actionMenu, game: this.game })
    },
    charterFlight: function () {
      CharterFlightService.call({ actionMenu: this.actionMenu, game: this.game })
    },
    placeResearchStation: function () {
      PlaceResearchStationService
        .call({ actionMenu: this.actionMenu, game: this.game })
    }
  }
}
</script>
