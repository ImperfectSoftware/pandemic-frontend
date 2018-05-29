import Vue from 'vue'
import Signin from '@/components/Signin'

describe('Sigin.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Signin)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('Please sign in').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
