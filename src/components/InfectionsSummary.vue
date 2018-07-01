<template>
<div class="pl-2">
  <h2>Infections Summary</h2>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Infections</th>
        <th scope="col">Used</th>
        <th scope="col">Remaining</th>
      </tr>
    </thead>
    <tbody>
      <tr scope="row" v-for="color in game.diseaseColors" :key="color">
        <th scope="row"><div :class="game.diseaseCss(color)"></div></th>
        <td>{{ game.usedInfectionsFor(color) }}</td>
        <td>{{ game.remainingInfectionsFor(color) }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InfectionsSummary',
  computed: {
    ...mapGetters({
      game: 'activeGame'
    })
  }
}
</script>
