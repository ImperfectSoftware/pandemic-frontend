<template>
  <div id="map">
    <ShareCardNotification/>
    <WorldMap/>
    <ActionMenu/>
    <PlayerActionMenu/>
    <div v-if="game" class="container-fluid no-gutters">
      <div class="row">
        <div class="row players-summary">
          <div class="d-flex align-items-center p-2 radius-small text-left col-sm-6"
            v-for="(player, key) in game.players" :key="key"
            :class="player.selectedCss">
            <div class="d-inline p-2">
              <i :class="player.cssClass" class="fa fa-user"></i>
            </div>
            <div class="d-inline p-2">
              <div>{{player.username}}</div>
              <div>{{player.prettyRole}}</div>
              <div v-if="player.isActive">
                Actions left: {{game.actionsLeft}}
              </div>
            </div>
          </div>
        </div>
        <ul class="col col-sm-8 list-unstyled">
          <li v-for="city in currentPlayer.cityPlayerCards"
          :key="city.name" :class="city.cssClass"
          class="p-1 float-left">
            <span>{{ city.name }}</span>
            -
            <span>{{ city.population }}</span>
          </li>
          <li v-for="event in currentPlayer.eventPlayerCards" :key="event.name"
            class="p-1 float-left">
            <div>{{event.name}}</div>
          </li>
        </ul>
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
