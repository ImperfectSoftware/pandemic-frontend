<template>
  <div id="map">
    <div class="game-won" v-if="game && game.won">
      <h2 class="game-won">
        Congratulations! You won the game!!!
        <i class="fas fa-trophy"></i>
      </h2>
    </div>
    <div class="game-lost" v-if="game && game.lost">
      <h2 class="game-lost">
        Womp womp womp... The game was lost.
        <i class="fas fa-bomb"></i>
      </h2>
    </div>
    <div id="resilient-population-cities" v-if="showDiscardedInfectionCities"
      class="p-4">
      <div class="resilient-population-cities-inner m-4 p-4">
        <div v-for="(city, index) in resilientPopulationCities" :key="index"
          class="form-inline">
            <div class="city form-check form-check-inline">
              <div :class="city.rectangleCssClass"></div>
              <div class="city-name">{{ city.name }}</div>
              <div class="input-group">
                <div class="input-group-prepend ml-2">
                  <input type="radio" class="form-check-input"
                    :value="city.staticid" v-model="discarded">
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-secondary btn-block mt-4"
            @click="discardInfectionCard">
            Discard Card
          </button>
      </div>
    </div>
    <div id="forecast" v-if="showForecast" class="p-4">
      <div class="p-2">Forecast: Cards will be flipped first to last.</div>
      <draggable v-model="forecast">
        <div v-for="(city, index) in forecast" :key="city.staticid"
          class="btn-pointer">
          <div class="forecast">
            <div class="float-left pl-2">{{index + 1}}</div>
            <div :class="`city-rectangle-${city.color} float-left ml-2 mt-2`"></div>
            {{city.name}}
            <i class="float-right pr-2 pt-1 fas fa-bars"></i>
          </div>
        </div>
      </draggable>
      <button class="mt-4 btn btn-secondary btn-block" @click="arrangeCards">
        Arrange
      </button>
    </div>
    <ShareCardNotification/>
    <WorldMap/>
    <ActionMenu/>
    <PlayerActionMenu/>
    <CureMenu/>
    <MovementProposalNotification/>
    <div v-if="game" class="text-left pl-2">
      {{game.activePlayer.username}} has {{game.actionsLeft}} actions left.
    </div>
    <div v-if="game" class="container-fluid no-gutters console">
      <div class="flex-row">
        <div class="wrapper">
          <h2>Player Cards</h2>
          <div v-if="currentPlayer.hasNoPlayerCards">
            You don't have any player cards.
          </div>
          <div v-for="city in currentPlayer.cityPlayerCards"
            :key="city.name" class="city">
            <div :class="city.rectangleCssClass"></div>
            <div :class="city.cssClass">{{ city.name }}</div>
            <i v-if="currentPlayer.hasTooManyCards" class="btn fas fa-trash-alt"
              @click="discardCard(city.compositeId)"></i>
          </div>
          <div v-for="event in currentPlayer.eventPlayerCards" :key="event.name"
            class="p-1 float-left">
            <div>
              {{event.name}}
              <i v-if="currentPlayer.hasTooManyCards" class="btn fas fa-trash-alt"
                @click="discardCard(event.compositeId)"></i>
              <i v-if="event.isUsable" class="btn fas fa-play"
               @click="useEvent(event)"></i>
            </div>
          </div>
        </div>
        <PlayersInfo/>
        <InfectionsSummary/>
        <CureList :currentPlayer="currentPlayer"/>
        <div class="wrapper">
          <h2>Infections</h2>
          <span>(Discard Pile)</span>
          <div v-if="game.isInfectionDiscardPileEmpty">
            No infection cards flipped yet...
          </div>
          <div v-for="(city, index) in game.infectionDiscardPile" :key="index"
            class="city">
            <div :class="city.rectangleCssClass"></div>
            <div :class="city.cssClass">{{ city.name }}</div>
          </div>
        </div>
        <div class="wrapper">
          <h2>Events</h2>
          <span>(Discard Pile)</span>
          <div v-if="game.isEventDiscardPileEmpty">
            No event cards discarded yet...
          </div>
          <div v-for="(event, index) in game.eventDiscardPile" :key="index"
            class="p-1 float-left">
            <div>
              {{event.name}}
              <i v-if="currentPlayer.canTakeCard(event.name)"
                class="pl-2 btn fas fa-hand-rock"
                @click="takeEventCard(event.staticid)"></i>
            </div>
          </div>
        </div>
        <div class="wrapper end-turn-buttons">
          <i class="fas fa-plus pr-4 btn-pointer"
            @click="flipCard"></i>
          <span class="fab fa-galactic-republic m-6 btn-pointer"
            @click="infect">
            <span v-if="game.skipInfections" class="quiet-night fas fa-moon"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ShareCardNotification from '@/components/ShareCardNotification'
import WorldMap from '@/components/WorldMap'
import ActionMenu from '@/components/ActionMenu'
import PlayerActionMenu from '@/components/PlayerActionMenu'
import PlayersInfo from '@/components/PlayersInfo'
import CureMenu from '@/components/CureMenu'
import CureList from '@/components/CureList'
import InfectionsSummary from '@/components/InfectionsSummary'
import MovementProposalNotification from '@/components/MovementProposalNotification'
import TakeEventCardService from '@/services/TakeEventCardService'
import DiscardCardService from '@/services/DiscardCardService'
import InfectionsService from '@/services/InfectionsService'
import FlipCardService from '@/services/FlipCardService'
import UseEventService from '@/services/UseEventService'
import draggable from 'vuedraggable'
import ForecastUpdateService from '@/services/ForecastUpdateService'
import DiscardInfectionService from '@/services/DiscardInfectionService'

export default {
  name: 'GameInstance',
  computed: {
    ...mapGetters({
      game: 'activeGame',
      currentUser: 'currentUser',
      showForecast: 'showForecast',
      showDiscardedInfectionCities: 'showDiscardedInfectionCities',
      resilientPopulationCities: 'resilientPopulationCities'
    }),
    forecast: {
      get () {
        return this.$store.getters.forecast
      },
      set (value) {
        this.$store.dispatch('updateForecast', value)
      }
    },
    currentPlayer: function () {
      if (this.game && this.currentUser) {
        return this.game.currentPlayer(this.currentUser.username)
      }
    }
  },
  created: function () {
    this.$store.dispatch('initializeStartedGame', this.$route.params.id)
  },
  data: function () {
    return {
      discarded: ''
    }
  },
  methods: {
    takeEventCard: function (staticid) {
      TakeEventCardService.call({ eventStaticid: staticid, game: this.game })
    },
    discardCard: function (compositeId) {
      DiscardCardService.call({ compositeId: compositeId, game: this.game })
    },
    flipCard: function () {
      FlipCardService.call({ game: this.game })
    },
    infect: function () {
      InfectionsService.call({ game: this.game })
    },
    useEvent: function (event) {
      UseEventService.call({ game: this.game, event: event })
    },
    arrangeCards: function () {
      ForecastUpdateService.call({ forecast: this.forecast, game: this.game })
    },
    discardInfectionCard: function () {
      DiscardInfectionService.call({
        game: this.game,
        cityStaticid: this.discarded
      })
    }
  },
  components: {
    WorldMap,
    ActionMenu,
    PlayerActionMenu,
    CureMenu,
    ShareCardNotification,
    MovementProposalNotification,
    InfectionsSummary,
    CureList,
    PlayersInfo,
    draggable
  }
}
</script>
