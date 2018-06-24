<template>
  <div id="player-action-menu" v-on-clickaway="hidePlayerActionMenu"
    :class="{ 'd-none': playerActionMenu.hide }"
    :style="playerActionMenu.style">
    <div :class="playerActionMenu.noActionsClasses">
      You can't do anything with this player at this time.
    </div>
    <button v-for="city in playerActionMenu.receiveCities" :key="city.staticid"
      :class="playerActionMenu.cssClasses"
      @click="receiveCity(city.staticid, playerActionMenu.playerId)">
      Get {{ city.name }} from {{ playerActionMenu.playerUsername }}
    </button>
    <button v-for="city in playerActionMenu.giveCities" :key="city.staticid"
      :class="playerActionMenu.cssClasses"
      @click="giveCity(city.staticid, playerActionMenu.playerId)">
      Give {{ city.name }} to {{ playerActionMenu.playerUsername }}
    </button>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import GiveCardsService from '@/services/GiveCardsService'

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
    receiveCity: function (cityStaticid, playerId) {
      console.log(cityStaticid)
      console.log(playerId)
    },
    giveCity: function (cityStaticid, playerId) {
      GiveCardsService.call({
        cityStaticid: cityStaticid,
        playerId: playerId,
        game: this.game
      })
    }
  }
}
</script>
