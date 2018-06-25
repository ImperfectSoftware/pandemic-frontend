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
    role: 'medic',
    username: 'john',
    cities: [city],
    events: [event]
  }

  it("should know it's location staticid", () => {
    let player = Player.from(data)
    expect(player.cityStaticid).to.eq('1')
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
