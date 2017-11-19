import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
    .to.equal('Welcome to Your Vue.js App')
  })

  it('test class be contained', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.classList.contains('hello')).to.be.true
    //const title = vm.$el.querySelector('.hello h1')
    //expect(title.classList.contains('hello-title')).to.be.true
    //const content = vm.$el.querySelector('.hello-content')
    //expect(content.classList.contains('hello-content')).to.be.true
  })
})
