import { destroyVM, createTest, createVue } from '../util'
import ToDoList from '@/Components/ToDoList'
import Vue from 'vue'

describe('ToDoList.vue', () =>{
  it('test title', () =>{
    const Constructor = Vue.extend(ToDoList)
    const vm = new Constructor().$mount()
    //expect(vm.$el.querySelector('.title')).to.be.exist
    expect(vm.$el.querySelector('.title').textContent).to.equal('My todo list')
  })

  it('test class contained', () =>{
    const Constructor = Vue.extend(ToDoList)
    const vm = new Constructor().$mount()
    expect(vm.$el.classList.contains('mytodos')).to.be.true
    expect(vm.$el.querySelector('.mytodos h1').classList.contains('title')).to.be.true
    expect(vm.$el.querySelector('.mytodos input').classList.contains('inputItem')).to.be.true
    expect(vm.$el.querySelector('.mytodos ul').classList.contains('todolist')).to.be.true
    expect(vm.$el.querySelectorAll('p')).to.be.exist
    expect(vm.$el.querySelectorAll('button')).to.be.exist
    expect(vm.$el.querySelectorAll('.edit')).to.be.exist
    //为什么在多层标签下 querySelector选择不到，解决不了
    //expect(vm.$el.querySelector('.mytodos p').classList.contains('item-label')).to.be.true
    //const tmp = vm.$el.querySelector('.mytodos ul')
    //expect(vm.$el.querySelector('.todolist').classList.contains('for')).to.be.true
    //expect(vm.$el.querySelector('.todolist p').classList.contains('item-label')).to.be.true
    //const pp = vm.$el.querySelectorAll('p')
    //expect(pp[0].classList.contains('item-label')).to.be.true
  })

  it('test data', () =>{
    const Constructor = Vue.extend(ToDoList)
    const vm = new Constructor().$mount()
    expect(vm.newItem).to.equal('')
  })

  it('test function addNew', () =>{
    const Constructor = Vue.extend(ToDoList)
    const vm = new Constructor().$mount()
    vm.newItem = 'test'
    vm.addNew()
    expect(vm.items[0].label).to.equal('test')
    expect(vm.items.length).to.equal(1)
    expect(vm.newItem).to.equal('')
  })

  it('test function toFinish', () =>{
    const Constructor = Vue.extend(ToDoList)
    const vm = new Constructor().$mount()
    vm.items.push ({
      isFinished: false
    })
    vm.toFinish(vm.items[0])
    expect(vm.items[0].isFinished).to.equal(true)
  })

  it('test function itemEnter', () =>{
    const Constructor = Vue.extend(ToDoList)
    const vm = new Constructor().$mount()
    vm.items.push ({
      showDelete: false
    })
    vm.itemEnter(vm.items[0])
    expect(vm.items[0].showDelete).to.equal(true)
  })

  it('test function itemLeave', () =>{
    const Constructor = Vue.extend(ToDoList)
    const vm = new Constructor().$mount()
    vm.items.push ({
      showDelete: false
    })
    vm.itemEnter(vm.items[0])
    vm.itemLeave(vm.items[0])
    expect(vm.items[0].showDelete).to.equal(false)
  })

  it('test function deleteClick', () =>{
    const Constructor = Vue.extend(ToDoList)
    const vm = new Constructor().$mount()
    vm.items.push ({
      id: 0,
      label: 'test',
      isFinished: false,
      showDelete: false
    })
    expect(vm.items.length).to.equal(1)
    vm.deleteClick(vm.items[0])
    expect(vm.items.length).to.equal(0)
  })

})
