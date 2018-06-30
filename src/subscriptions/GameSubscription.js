import router from '.././router'
import store from '.././store'

export default class GameSubscription {
  static from (consumer, game) {
    return new GameSubscription(consumer, game)
  }

  constructor (consumer, game) {
    this.channel = ''
    this.gameId = game.id
    this.game = game
    this.consumer = consumer
  }

  subscribe () {
    this.channel = this.consumer.subscriptions.create(
      { channel: 'GameChannel', id: this.gameId },
      {
        connected: this.connected,
        disconnected: this.disconnected,
        received: this.received,
        rejected: this.rejected
      }
    )
  }

  received = (data) => {
    if (data.player) {
      this.game.addPlayer(data.player)
    } else if (data.username) {
      this.game.handleInvitationResponse(data.user_id, data.status)
    } else if (data.game_started) {
      router.replace(`/games/${this.game.id}`)
    } else if (data.game_update) {
      store.dispatch('updateActiveGame', data.game)
    } else if (data.share_card_notification) {
      store.dispatch(`${data.payload.type}SharedCardNotification`, {
        payload: data.payload,
        currentPlayerUsername: store.getters.currentUser.username
      })
    }
  }

  connected () {
    console.log('connected')
  }

  disconnected () {
    console.warn(`Subscription for Game with id: ${this.gameId} was disconnected.`)
  }

  rejected () {
    console.warn('connection rejected')
  }
}
