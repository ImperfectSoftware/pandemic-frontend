<template>
<div class="pl-2">
  <h2>Players Info</h2>
  <table class="table">
    <tbody>
      <tr scope="row" v-for="(player, key) in game.players" :key="key"
        :class="player.selectedCss">
        <th scope="row"><i :class="player.cssClass" class="fa fa-user"></i></th>
        <td>{{ player.username }}</td>
        <td>{{ player.prettyRole }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PlayersInfo',
  computed: {
    ...mapGetters({
      game: 'activeGame'
    })
  }
}
</script>
