<template>
  <div id="player-action-menu" v-on-clickaway="hidePlayerActionMenu"
    :class="{ 'd-none': playerActionMenu.hide }"
    :style="playerActionMenu.style">
    <div :class="playerActionMenu.noActionsClasses">
      You can't do anything with this player at this time.
    </div>
    <div v-if="playerActionMenu.receiveCities.length !== 0" class="share-card">
      Get from {{ playerActionMenu.playerUsername }}
      <button v-for="city in playerActionMenu.receiveCities" :key="city.staticid"
        :class="playerActionMenu.cssClasses"
        @click="receiveCity(city.staticid, playerActionMenu.playerId)">
          {{ city.name }}
      </button>
    </div>
    <div v-if="playerActionMenu.giveCities.length !== 0" class="share-card">
      Give to {{ playerActionMenu.playerUsername }}
      <button v-for="city in playerActionMenu.giveCities" :key="city.staticid"
        :class="playerActionMenu.cssClasses"
        @click="giveCity(city.staticid, playerActionMenu.playerId)">
        {{ city.name }}
      </button>
    </div>
    <div v-if="playerActionMenu.locations.length !== 0">
       Propose to move {{ playerActionMenu.playerUsername }}
      <button v-for="city in playerActionMenu.locations" :key="city.staticid"
        :class="playerActionMenu.cssClasses"
        @click="proposeMove(city.staticid, playerActionMenu.playerId, false)">
        to {{ city.name }}
      </button>
    </div>
    <div v-if="playerActionMenu.airliftLocations.length !== 0">
       Propose to airlift {{ playerActionMenu.playerUsername }}
      <button v-for="city in playerActionMenu.airliftLocations"
        :key="city.staticid" :class="playerActionMenu.cssClasses"
        @click="proposeMove(city.staticid, playerActionMenu.playerId, true)">
        to {{ city.name }}
      </button>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import GiveCardsService from '@/services/GiveCardsService'
import ReceiveCardsService from '@/services/ReceiveCardsService'
import ProposeMoveService from '@/services/ProposeMoveService'

export default {
  name: 'PlayerActionMenu',
  mixins: [ clickaway ],
  computed: {
    ...mapGetters({
      game: 'activeGame',
      playerActionMenu: 'playerActionMenu'
    })
  },
  methods: {
    hidePlayerActionMenu: function () {
      this.$store.dispatch('hidePlayerActionMenu', event.target)
    },
    giveCity: function (cityStaticid, playerId) {
      GiveCardsService.call({
        cityStaticid: cityStaticid,
        playerId: playerId,
        game: this.game
      })
    },
    receiveCity: function (cityStaticid, playerId) {
      ReceiveCardsService.call({
        cityStaticid: cityStaticid,
        playerId: playerId,
        game: this.game
      })
    },
    proposeMove: function (cityStaticid, playerId, airlift) {
      ProposeMoveService.call({
        cityStaticid: cityStaticid,
        playerId: playerId,
        game: this.game,
        airlift: airlift
      })
    }
  }
}
</script>
