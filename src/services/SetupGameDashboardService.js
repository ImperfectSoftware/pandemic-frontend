import axios from '@/backend/vue-axios'
import store from '.././store'
import InvitationSubscription from '@/subscriptions/InvitationSubscription'

export default class SetupGameDashboardService {
  static call () {
    new SetupGameDashboardService().call()
  }

  call () {
    store.dispatch('createConsumer')
    this.displayInvitations()
    this.displayGames()
    InvitationSubscription.from(
      store.getters.cableConsumer,
      store.getters.invitations,
      store.getters.currentUser.id
    ).subscribe()
  }

  displayGames () {
    axios.get('/games.json')
      .then(request => this.displayGamesSuccess(request.data))
      .catch((e) => this.displayGamesFailed(e))
  }

  displayGamesSuccess = (data) => {
    data.games.forEach((game) => {
      store.dispatch('pushGame', game)
    })
    store.dispatch('updateSelectedGame', store.getters.games[0])
  }

  displayGamesFailed = (e) => {
    console.log(e)
  }

  displayInvitations () {
    axios.get('/invitations')
      .then(request => this.displayInvitationsSuccess(request.data))
      .catch((e) => this.displayInvitationsFailed(e))
  }

  displayInvitationsSuccess = (data) => {
    data.invitations.forEach((attributes) => {
      store.dispatch('pushInvitation', attributes)
    })
  }

  displayInvitationsFailed = (e) => {
    console.log(e)
  }
}
