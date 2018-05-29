import Vue from 'vue'
import Signin from '@/components/Signin'

describe('Sigin.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Signin)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.form-signin-heading').textContent)
      .to.equal('Please sign in')
  })
})
