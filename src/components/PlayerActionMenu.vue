<template>
  <div id="player-action-menu" v-on-clickaway="hidePlayerActionMenu"
    :class="{ 'd-none': playerActionMenu.hide }"
    :style="playerActionMenu.style">
    <div :class="playerActionMenu.noActionsClasses">
      You can't do anything with this player at this time.
    </div>
    <button v-for="city in playerActionMenu.receiveCities" :key="city.staticid"
      :class="playerActionMenu.cssClasses">
      Get {{ city.name }} from {{ city.ownerUsername }}
    </button>
    <button v-for="city in playerActionMenu.giveCities" :key="city.staticid"
      :class="playerActionMenu.cssClasses">
      Give {{ city.name }} to {{ currentUser.username }}
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
      playerActionMenu: 'playerActionMenu',
      currentUser: 'currentUser'
    })
  },
  methods: {
    hidePlayerActionMenu: function () {
      this.$store.dispatch('hidePlayerActionMenu', event.target)
    }
  }
}
</script>
