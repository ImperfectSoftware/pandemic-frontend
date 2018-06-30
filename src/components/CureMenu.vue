<template>
  <div id="cure-menu" v-on-clickaway="hideCureMenu"
    :class="cureMenu.displayCssClass" :style="cureMenu.style">
    <div v-if="game && game.isCurrentPlayerActive">
      <div v-for="city in game.activePlayer.cityPlayerCards"
        :key="city.staticid" class="cities-wrapper form-inline">
        <div class="city form-check form-check-inline">
          <div :class="city.rectangleCssClass"></div>
          <div class="city-name">{{ city.name }}</div>
          <div class="input-group">
            <div class="input-group-prepend ml-2">
              <input type="checkbox" class="form-check-input"
                :value="city.staticid" v-model="checkedCities">
            </div>
          </div>
        </div>
      </div>
      <button class="mt-2 btn btn-block btn-secondary" @click="cureDisease">
        Cure
      </button>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'

export default {
  name: 'CureMenu',
  mixins: [ clickaway ],
  computed: {
    ...mapGetters({
      game: 'activeGame',
      cureMenu: 'cureMenu'
    })
  },
  data: function () {
    return {
      checkedCities: []
    }
  },
  methods: {
    hideCureMenu: function () {
      this.$store.dispatch('hideCureMenu', event.target)
    },
    cureDisease: function (cityStaticid) {
      console.log(`cured ${this.checkedCities}`)
    }
  }
}
</script>
