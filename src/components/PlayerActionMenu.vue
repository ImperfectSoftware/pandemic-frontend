<template>
  <div id="player-action-menu" v-on-clickaway="hidePlayerActionMenu"
    :class="{ 'd-none': playerActionMenu.hide }"
    :style="playerActionMenu.style">
    <div :class="playerActionMenu.noActionsClasses">
      You can't do anything with this player at this time.
    </div>
    <button v-for="city in playerActionMenu.getCities" :key="city.staticid">
      Get {{ city.name }} from {{ city.owner }}
    </button>
    <button v-for="city in playerActionMenu.giveCities" :key="city.staticid">
      Give {{ city.name }} to {{ playerActionMenu.playerName }}
    </button>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'

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
    }
  }
}
</script>
