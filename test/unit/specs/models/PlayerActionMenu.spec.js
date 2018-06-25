import PlayerActionMenu from '@/models/PlayerActionMenu'

describe('PlayerActionMenu.js', () => {
  it('initializes with default values', () => {
    let menu = new PlayerActionMenu()
    expect(menu.hide).to.eq(true)
    expect(menu.receiveCities.length).to.eq(0)
    expect(menu.giveCities.length).to.eq(0)
    expect(menu.playerUsername).to.eq('')
    expect(menu.position).to.eq('')
    expect(menu.cityStaticid).to.eq('')
    expect(menu.height).to.eq(310)
    expect(menu.width).to.eq(200)
    expect(menu.playerUsername).to.eq('')
    expect(menu.playerId).to.eq('')
    expect(menu.x).to.eq(0)
    expect(menu.y).to.eq(0)
  })

  it('can show a menu', () => {
    let game = { players: [ { username: 'John', id: 1 } ] }
    let data = {
      game: game,
      position: 0,
      cityStaticid: '1',
      windowHeight: 600,
      windowWidth: 800,
      pageX: 0,
      pageY: 0
    }
    let menu = new PlayerActionMenu()
    menu.showMenu(data)
    expect(menu.hide).to.eq(false)
    expect(menu.position).to.eq(0)
    expect(menu.playerUsername).to.eq('John')
    expect(menu.playerId).to.eq(1)
    expect(menu.cityStaticid).to.eq('1')
    expect(menu.windowHeight).to.eq(600)
    expect(menu.windowWidth).to.eq(800)
    expect(menu.x).to.eq(0)
    expect(menu.y).to.eq(0)
  })

  it('can update a menu', () => {
    let data = { receive_cities: [1], give_cities: [1] }
    let menu = new PlayerActionMenu()
    menu.updateMenu(data)
    expect(menu.receiveCities.length).to.eq(1)
    expect(menu.giveCities.length).to.eq(1)
  })

  it('knows the menu style', () => {
    let menu = new PlayerActionMenu()
    expect(menu.style.top).to.eq('0px')
    expect(menu.style.left).to.eq('0px')
    expect(menu.style.width).to.eq('200px')
    expect(menu.style.height).to.eq('310px')
  })

  it('knows the menu css classes', () => {
    let menu = new PlayerActionMenu()
    expect(menu.cssClasses).to.eq('btn btn-block btn-secondary shared-btn')
  })

  it('should display no actions text', () => {
    let menu = new PlayerActionMenu()
    expect(menu.noActionsClasses).to.eq('')
  })

  it('should not display no actions text', () => {
    let data = { receive_cities: [1], give_cities: [1] }
    let menu = new PlayerActionMenu()
    menu.updateMenu(data)
    expect(menu.noActionsClasses).to.eq('d-none')
  })
})
