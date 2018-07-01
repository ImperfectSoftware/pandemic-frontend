import City from '@/models/City'

describe('City.js', () => {
  let data = {
    staticid: '1',
    name: 'Miami',
    color: 'yellow',
    population: 20,
    density: 2
  }

  it('sets card staticid', () => {
    let card = City.from(data)
    expect(card.staticid).to.eq('1')
  })

  it('sets card name', () => {
    let card = City.from(data)
    expect(card.name).to.eq(data.name)
  })

  it('sets card population', () => {
    let card = City.from(data)
    expect(card.population).to.eq(data.population)
  })

  it('sets card density', () => {
    let card = City.from(data)
    expect(card.density).to.eq(data.density)
  })

  it('knows card css class', () => {
    let card = City.from(data)
    expect(card.cssClass).to.eq('yellow-city')
  })
})
