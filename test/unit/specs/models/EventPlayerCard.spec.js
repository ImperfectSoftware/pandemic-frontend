import EventPlayerCard from '@/models/EventPlayerCard'

describe('EventPlayerCard.js', () => {
  let data = { staticid: 1, name: 'Government Grant' }

  it('sets card staticid', () => {
    let card = EventPlayerCard.from(data)
    expect(card.staticid).to.eq(1)
  })

  it('sets card name', () => {
    let card = EventPlayerCard.from(data)
    expect(card.name).to.eq(data.name)
  })
})
