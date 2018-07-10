<template>
  <div id="action-menu" v-on-clickaway="hideActionMenu" v-if="actionMenu.show"
    :style="actionMenu.style">
    <h2>{{ actionMenu.cityName }}</h2>
    <div :class="actionMenu.noActionsClasses">
      No actions can be taken for this city at this time.
    </div>
    <button :class="actionMenu.driveCssClasses" @click="facade.driveOrFerry()">
      Drive/Ferry
    </button>
    <button :class="actionMenu.directFlightCssClasses"
      @click="facade.directFlight()">
      Direct Flight
    </button>
    <button :class="actionMenu.charterFlightCssClasses"
      @click="facade.charterFlight()">
      Charter Flight
    </button>
    <button :class="actionMenu.shuttleFlightCssClasses"
      @click="facade.shuttleFlight()">
      Shuttle Flight
    </button>
    <button :class="actionMenu.buildResearchStationCssClasses"
      @click="facade.buildResearchStation()">
      Add Research STA
    </button>
    <button :class="actionMenu.useGovernmentGrantCssClasses"
      @click="facade.governmentGrant()">
      Add Research STA <i class="fas fa-university"></i>
    </button>
    <button :class="actionMenu.removeResearchStationCssClasses"
      @click="facade.removeResearchStation()">
      Remove Research STA
    </button>
    <button :class="actionMenu.treatBlueDiseaseCssClass"
      @click="treatDisease('blue')">
      Treat Blue<div class="disease-rectangle-blue"></div>
    </button>
    <button :class="actionMenu.treatYellowDiseaseCssClass"
      @click="treatDisease('yellow')">
      Treat Yellow<div class="disease-rectangle-yellow"></div>
    </button>
    <button :class="actionMenu.treatRedDiseaseCssClass"
      @click="treatDisease('red')">
      Treat Red<div class="disease-rectangle-red"></div>
    </button>
    <button :class="actionMenu.treatBlackDiseaseCssClass"
      @click="treatDisease('black')">
      Treat Black<div class="disease-rectangle-black"></div>
    </button>
    <div v-if="actionMenu.operationsExpertFlight">
      <div class="text-left mt-4">Operations Expert
        <i class="fas fa-toolbox"></i>
      </div>
      <div class="text-left">
        Select card to discard to move to this location:
      </div>
      <div v-for="city in game.activePlayer.cityPlayerCards"
        :key="city.radioKey" class="form-inline">
        <div class="city form-check form-check-inline">
          <div :class="city.rectangleCssClass"></div>
          <div class="city-name">{{ city.name }}</div>
          <div class="input-group">
            <div class="input-group-prepend ml-2">
              <input type="radio" class="form-check-input"
                :value="city.staticid" v-model="discarded">
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-block btn-secondary mt-3"
        @click="facade.moveOperationsExpert(discarded)">
        Discard
      </button>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import Facade from '@/Facade'

export default {
  name: 'ActionMenu',
  mixins: [ clickaway ],
  computed: {
    ...mapGetters({
      game: 'activeGame',
      actionMenu: 'actionMenu'
    }),
    facade: function () {
      return new Facade()
    }
  },
  data: function () {
    return {
      discarded: ''
    }
  },
  methods: {
    hideActionMenu: function () {
      this.$store.dispatch('hideActionMenu', event.target)
    },
    treatDisease: function (color) {
      this.facade.treatDisease(color)
    }
  }
}
</script>
