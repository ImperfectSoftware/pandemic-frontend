<template>
  <div id="player-action-menu" v-on-clickaway="hidePlayerActionMenu"
    :class="{ 'd-none': playerActionMenu.hide }"
    :style="playerActionMenu.style">
    <div :class="playerActionMenu.noActionsClasses">
      You can't do anything with this player at this time.
    </div>
    <div v-if="playerActionMenu.hasReceiveCities" class="share-card">
      Get from {{ playerActionMenu.playerUsername }}
      <button v-for="city in playerActionMenu.receiveCities" :key="city.staticid"
        :class="playerActionMenu.cssClasses"
        @click="receiveCity(city.staticid, playerActionMenu.playerId)">
          {{ city.name }}
      </button>
    </div>
    <div v-if="playerActionMenu.hasGiveCities" class="share-card">
      Give to {{ playerActionMenu.playerUsername }}
      <button v-for="city in playerActionMenu.giveCities" :key="city.staticid"
        :class="playerActionMenu.cssClasses"
        @click="giveCity(city.staticid, playerActionMenu.playerId)">
        {{ city.name }}
      </button>
    </div>
    <div v-if="playerActionMenu.hasDispatcherLocations">
       Propose to move {{ playerActionMenu.playerUsername }}
      <button v-for="city in playerActionMenu.locations" :key="city.staticid"
        :class="playerActionMenu.cssClasses"
        @click="proposeMove(city.staticid, playerActionMenu.playerId)">
        to {{ city.name }}
      </button>
    </div>
    <div v-if="playerActionMenu.hasAirliftLocations">
       Propose to airlift {{ playerActionMenu.playerUsername }}
      <button v-for="city in playerActionMenu.airliftLocations"
        :key="city.staticid" :class="playerActionMenu.cssClasses"
        @click="airliftMove(city.staticid, playerActionMenu.playerId)">
        to {{ city.name }}
      </button>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import Facade from '@/Facade'

export default {
  name: 'PlayerActionMenu',
  mixins: [ clickaway ],
  computed: {
    ...mapGetters({
      game: 'activeGame',
      playerActionMenu: 'playerActionMenu'
    }),
    facade: function () {
      return new Facade()
    }
  },
  methods: {
    hidePlayerActionMenu: function () {
      this.$store.dispatch('hidePlayerActionMenu', event.target)
    },
    giveCity: function (cityStaticid, playerId) {
      this.facade.giveCity(cityStaticid, playerId)
    },
    receiveCity: function (cityStaticid, playerId) {
      this.facade.receiveCards(cityStaticid, playerId)
    },
    proposeMove: function (cityStaticid, playerId) {
      this.facade.proposeMove(cityStaticid, playerId)
    },
    airliftMove: function (cityStaticid, playerId) {
      this.facade.airlift(cityStaticid, playerId)
    }
  }
}
</script>
