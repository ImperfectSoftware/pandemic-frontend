<template>
  <div id="map">
    <WorldMap />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import WorldMap from '@/components/WorldMap'

export default {
  name: 'GameInstance',
  computed: {
    ...mapGetters({
      activeGames: 'activeGames'
    })
  },
  created: function () {
    this.$store.dispatch('initializeStartedGame', this.$route.params.id)
  },
  components: {
    WorldMap
  }
}
</script>
