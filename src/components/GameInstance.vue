<template>
  <div id="map">
    <ShareCardNotification/>
    <WorldMap/>
    <ActionMenu/>
    <PlayerActionMenu/>
    <div v-if="game" class="container-fluid no-gutters">
      <div class="flex-row">
        <div class="cities-wrapper">
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
        <div class="flex-row players-summary">
          <div class="d-flex align-items-center radius-small text-left col-sm-12"
            v-for="(player, key) in game.players" :key="key"
            :class="player.selectedCss">
            <div class="d-inline">
              <i :class="player.cssClass" class="fa fa-user"></i>
            </div>
            <div class="d-inline">
              <div>{{player.username}} | {{player.prettyRole}}</div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="flex-row">
          <div class="col-sm-12 text-left">
            {{game.activePlayer.username}} has {{game.actionsLeft}} actions
            left.
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
    ActionMenu,
    PlayerActionMenu,
    ShareCardNotification
  }
}
</script>
