import store from '@/store'

describe('actionsMenu.js', () => {
  it('hides the action menu', () => {
    store.dispatch('hideActionMenu', null)
    expect(store.getters.actionMenu.hide).to.eq(true)
  })
})
