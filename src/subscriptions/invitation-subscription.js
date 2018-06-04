import Invitation from '@/models/Invitation'

export default class InvitationSubscription {
  static from (consumer, invitations, userId) {
    return new InvitationSubscription(consumer, invitations, userId)
  }

  constructor (consumer, invitations, userId) {
    this.channel = ''
    this.consumer = consumer
    this.invitations = invitations
    this.userId = userId
  }

  subscribe () {
    this.channel = this.consumer.subscriptions.create(
      { channel: 'InvitationChannel', id: this.userId },
      {
        connected: this.connected,
        disconnected: this.disconnected,
        received: this.received,
        rejected: this.rejected
      }
    )
  }

  received = (data) => {
    console.log(data)
    this.invitations.unshift(Invitation.from(data))
    console.log(this.invitations)
  }

  connected () {
    console.log('Connected to Invitation!')
  }

  disconnected () {
    console.warn('Subscription invitation disconnected.')
  }

  rejected () {
    console.warn('Connection rejected.')
  }
}
