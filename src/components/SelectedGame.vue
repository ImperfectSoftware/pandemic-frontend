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
        @submit.prevent="facade.createInvitation(selectedGame.id, username)">
        <div class="input-group">
          <input v-model="username" type="text" id="inputUsername"
            class="form-control" placeholder="Username" required autofocus>
          <button class="btn btn-secondary input-group-addon" type="submit">
            <i class="fa fa-user-plus" aria-hidden="true"></i>
          </button>
        </div>
        <label class="pt-5">
          Select the number of epidemic cards: <span>{{epidemicCards}}</span>
        </label>
        <div>
          <span class="float-left">Easy</span>
          <span>Medium</span>
          <span class="float-right">Hard</span>
        </div>
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
        <form id="start-game-id" v-if="selectedGame.canBeStartedBy(currentUser)"
          @submit.prevent="facade.startGame(selectedGame.id, epidemicCards)">
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
import Facade from '@/Facade'

export default {
  name: 'SelectedGame',
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      selectedGame: 'selectedGame',
      games: 'games'
    }),
    facade: function () {
      return new Facade()
    }
  },
  components: {
    PlayerLineItem
  },
  data: function () {
    return {
      username: '',
      epidemicCards: '5'
    }
  }
}
</script>
