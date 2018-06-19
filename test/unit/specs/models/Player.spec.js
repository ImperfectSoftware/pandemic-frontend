import Player from '@/models/Player'

describe('Player.js', () => {
  let data = { actions_left: 2 , active: false, role: 'medic',
    username: 'john' }

  it("should know it's current location", () => {
    let player = Player.from(data)
    expect(player.location).to.eq('washington')
  })

  it("should know if the player is not active", () => {
    let player = Player.from(data)
    expect(player.isActive).to.eq(false)
  })

  it('should know if the player is active', () => {
    data.active = true
    let player = Player.from(data)
    expect(player.isActive).to.eq(true)
  })

  it("should know the player's role name", () => {
    let player = Player.from(data)
    expect(player.role).to.eq('medic')
  })

  it("should know the player's username", () => {
    let player = Player.from(data)
    expect(player.username).to.eq('john')
  })
})
