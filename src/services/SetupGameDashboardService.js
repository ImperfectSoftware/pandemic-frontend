import axios from '@/backend/vue-axios'
import store from '.././store'
import InvitationSubscription from '@/subscriptions/InvitationSubscription'
import errorHandler from '@/mixins/errorHandler'

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
    axios.get('/games')
      .then(request => this.displayGamesSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  displayInvitations () {
    axios.get('/invitations')
      .then(request => this.displayInvitationsSuccess(request.data))
      .catch(e => this.handleError(e))
  }

  displayGamesSuccess = (data) => {
    data.games.forEach((game) => {
      store.dispatch('pushGame', game)
    })
    store.dispatch('updateSelectedGame', store.getters.games[0])
  }

  displayInvitationsSuccess = (data) => {
    data.invitations.forEach((attributes) => {
      store.dispatch('pushInvitation', attributes)
    })
  }
}
Object.assign(SetupGameDashboardService.prototype, errorHandler)
