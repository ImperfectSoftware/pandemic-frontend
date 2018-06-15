<template>
  <div>
    <div v-if="selectedGame.hasStarted">
      <div>Game
        <a :href="'/games/' + selectedGame.id">{{ selectedGame.name }}</a>
        already started.
      </div>
    </div>
    <div v-else>
      <form id="invites" v-if="selectedGame.isGameOwner(currentUser)"
        @submit.prevent="createInvite">
        <div class="input-group">
          <input v-model="username" type="text" id="inputUsername"
            class="form-control" placeholder="Username" required autofocus>
          <button class="btn btn-secondary input-group-addon" type="submit">
            <i class="fa fa-user-plus" aria-hidden="true"></i>
          </button>
        </div>
        <label>
          Select the number of epidemic cards: <span>{{epidemicCards}}</span>
        </label>
        <div class="slidecontainer">
          <input v-model="epidemicCards" type="range" min="4" max="6" value="5"
            class="slider" id="epidemic-cards-range">
        </div>
      </form>
      <div v-else>
        This game is getting setup by {{ selectedGame.ownerUsername() }}. It
        will start when other players have accepted the invitation and
        {{ selectedGame.ownerUsername() }} starts the Game.
      </div>
      <br/>
      <ul class="invitees-list list-group">
        <PlayerLineItem v-for="player in selectedGame.players"
          :key="player.invitationId" :player="player"/>
        <form id="start-game-id" v-if="selectedGame.canStartGame(currentUser)"
          @submit.prevent="startGame">
          <button class="mx-auto w-lg btn btn-secondary" type="submit">
            Start Game
          </button>
        </form>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerLineItem from '@/components/PlayerLineItem'

export default {
  name: 'SelectedGame',
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      selectedGame: 'selectedGame',
      games: 'games'
    })
  },
  components: {
    PlayerLineItem
  },
  data: function () {
    return {
      username: '',
      epidemicCards: '5'
    }
  },
  methods: {
    createInvite () {
      this.$store.dispatch(
        'createInvitation',
        { gameId: this.selectedGame.id, username: this.username }
      )
    },
    startGame () {
      this.$store.dispatch(
        'startGame',
        {
          game: this.selectedGame,
          nrOfEpidemicCards: this.epidemicCards
        }
      )
      this.$router.replace(`/games/${this.selectedGame.id}`)
    }
  }
}
</script>
