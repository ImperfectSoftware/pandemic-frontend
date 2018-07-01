<template>
<div class="flex-row pl-2 pt-2">
  <div class="d-flex col-sm-12" v-for="color in game.diseaseColors"
    :key="color">
    <Cures :color="color"/>
    <i class="btn pt-2 pl-3 fa fa-plus" @click="showCureMenu"></i>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import Cures from '@/components/cures/Cures'

export default {
  name: 'CureList',
  computed: {
    ...mapGetters({
      game: 'activeGame'
    })
  },
  methods: {
    showCureMenu: function () {
      this.$store.dispatch('showCureMenu', {
        pageX: event.pageX,
        pageY: event.pageY,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        citiesCount: this.game.activePlayer.cityPlayerCards.length,
        currentPlayer: this.currentPlayer,
        activePlayer: this.game.activePlayer
      })
    }
  },
  components: {
    Cures
  }
}
</script>
