import CityPlayerCard from '@/models/CityPlayerCard'

describe('CityPlayerCard.js', () => {
  let data = {
    staticid: '1',
    name: 'Miami',
    color: 'yellow',
    population: 20,
    density: 2
  }

  it('sets card staticid', () => {
    let card = CityPlayerCard.from(data)
    expect(card.staticid).to.eq('1')
  })

  it('sets card name', () => {
    let card = CityPlayerCard.from(data)
    expect(card.name).to.eq(data.name)
  })

  it('sets card population', () => {
    let card = CityPlayerCard.from(data)
    expect(card.population).to.eq(data.population)
  })

  it('sets card density', () => {
    let card = CityPlayerCard.from(data)
    expect(card.density).to.eq(data.density)
  })

  it('knows card css class', () => {
    let card = CityPlayerCard.from(data)
    expect(card.cssClass).to.eq('yellow-city')
  })
})
