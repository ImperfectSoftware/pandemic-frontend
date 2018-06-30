import Player from '@/models/Player'

describe('Player.js', () => {
  let event = { staticid: '1', name: 'Government Grant' }
  let city = {
    staticid: '1',
    name: 'Miami',
    color: 'yellow',
    population: 20,
    density: 2
  }
  let data = {
    actions_left: 2,
    location_staticid: '1',
    active: false,
    role: 'operations_expert',
    pretty_role: 'Operations Expert',
    username: 'john',
    cities: [
      city
    ],
    events: [
      event
    ]
  }

  it("should know it's location staticid", () => {
    let player = Player.from(data)
    expect(player.cityStaticid).to.eq('1')
  })

  it("should know the player's role name", () => {
    let player = Player.from(data)
    expect(player.role).to.eq(data.role)
  })

  it("should know the player's username", () => {
    let player = Player.from(data)
    expect(player.username).to.eq('john')
  })

  it('knows the player cssClass', () => {
    let player = Player.from(data)
    expect(player.cssClass).to.eq('operations-expert')
  })

  it('displays role name without underscore', () => {
    let player = Player.from(data)
    expect(player.prettyRole).to.eq('operations expert')
  })

  it('knows if selectedCss should be active', () => {
    let player = Player.from(data)
    player.game = { activePlayer: player }
    expect(player.selectedCss).to.eq('active')
  })

  it('knows if selectedCss should not be active', () => {
    let player = Player.from(data)
    player.game = {}
    expect(player.selectedCss).to.eq('not-active')
  })

  it('knows if this player is active', () => {
    let player = Player.from(data)
    player.game = { activePlayer: player }
    expect(player.isActive).to.eq(true)
  })
})
