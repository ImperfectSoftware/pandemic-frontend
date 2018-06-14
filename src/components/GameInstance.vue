<template>
  <div id="map">
    <WorldMap/>
  </div>
</template>
<script>
import WorldMap from '@/components/WorldMap'

export default {
  name: 'GameInstance',
  components: {
    WorldMap
  }
}
</script>
