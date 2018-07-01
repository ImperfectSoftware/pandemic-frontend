<template>
  <div id="map">
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
          </div>
          <div v-for="event in currentPlayer.eventPlayerCards" :key="event.name"
            class="p-1 float-left">
            <div>{{event.name}}</div>
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
          <div v-for="city in game.infectionDiscardPile" :key="city.name"
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
          <div v-for="event in game.eventDiscardPile" :key="event.name"
            class="p-1 float-left">
            <div>
              {{event.name}}
              <i v-if="currentPlayer.canTakeCard(event.name)"
                class="pl-2 btn fas fa-hand-rock"
                @click="takeEventCard(event.staticid)"></i>
            </div>
          </div>
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
  methods: {
    takeEventCard: function (staticid) {
      TakeEventCardService.call({ eventStaticid: staticid, game: this.game })
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
    PlayersInfo
  }
}
</script>
