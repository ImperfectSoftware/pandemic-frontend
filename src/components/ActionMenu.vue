<template>
  <div id="action-menu" v-on-clickaway="hideActionMenu"
    :class="{ 'd-none': actionMenu.hide }" :style="actionMenu.style">
    <h2>{{ actionMenu.cityName }}</h2>
    <div :class="actionMenu.noActionsClasses">
      No actions can be taken for this city at this time.
    </div>
    <button :class="actionMenu.driveCssClasses" @click="driveOrFerry">
      Drive/Ferry
    </button>
    <button :class="actionMenu.directFlightCssClasses"
      @click="directFlight">
      Direct Flight
    </button>
    <button :class="actionMenu.charterFlightCssClasses"
      @click="charterFlight">
      Charter Flight
    </button>
    <button :class="actionMenu.shuttleFlightCssClasses"
      @click="shuttleFlight">
      Shuttle Flight
    </button>
    <button :class="actionMenu.buildResearchStationCssClasses"
      @click="buildResearchStation">
      Add Research STA
    </button>
    <button :class="actionMenu.removeResearchStationCssClasses"
      @click="removeResearchStation">
      Remove Research STA
    </button>
    <button :class="actionMenu.discoverCureCssClasses">
      Discover Cure
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
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import DriveOrFerryService from '@/services/DriveOrFerryService'
import DirectFlightService from '@/services/DirectFlightService'
import CharterFlightService from '@/services/CharterFlightService'
import BuildResearchStationService from '@/services/BuildResearchStationService'
import ShuttleFlightService from '@/services/ShuttleFlightService'
import RemoveResearchStationService from '@/services/RemoveResearchStationService'
import TreatDiseaseService from '@/services/TreatDiseaseService'

export default {
  name: 'ActionMenu',
  mixins: [ clickaway ],
  computed: {
    ...mapGetters({
      game: 'activeGame',
      actionMenu: 'actionMenu'
    })
  },
  methods: {
    hideActionMenu: function () {
      this.$store.dispatch('hideActionMenu', event.target)
    },
    driveOrFerry: function () {
      DriveOrFerryService.call({ actionMenu: this.actionMenu, game: this.game })
    },
    directFlight: function () {
      DirectFlightService.call({ actionMenu: this.actionMenu, game: this.game })
    },
    charterFlight: function () {
      CharterFlightService.call({ actionMenu: this.actionMenu, game: this.game })
    },
    shuttleFlight: function () {
      ShuttleFlightService
        .call({ actionMenu: this.actionMenu, game: this.game })
    },
    buildResearchStation: function () {
      BuildResearchStationService
        .call({ actionMenu: this.actionMenu, game: this.game })
    },
    removeResearchStation: function () {
      RemoveResearchStationService
        .call({ actionMenu: this.actionMenu, game: this.game })
    },
    treatDisease: function (color) {
      TreatDiseaseService.call({
        actionMenu: this.actionMenu,
        game: this.game,
        color: color
      })
    }
  }
}
</script>
