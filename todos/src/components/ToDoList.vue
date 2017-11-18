<template>
<div id= "mylist">
  <h1 class = 'title' v-text="title"></h1>
  <input class = 'inputItem' v-model='newItem' v-on:keyup.enter = "addNew" placeholder="What to do?">
  <ul class="todolist">
    <li v-for = "item in items">
      <h3 v-on:mouseenter='itemEnter(item)' v-on:mouseleave='itemLeave(item)'>
        <input type="checkbox" v-on:click='toFinish(item)'>
        <p class='item-label' v-bind:class="{'line-through' : item.isFinished}">{{item.label}}</p>
        <p class='item-status' v-if='item.isFinished'>finished</p>
        <p class='item-delete' v-if='item.showDelete' v-on:click='deleteClick(item)'>Delete</p>
      </h3>
    </li>
  </ul>
</div>
</template>

<script>
import Store from './store' //导入store

export default {
  name: 'ToDoList',
  data () {
    return {
      title: 'My todo list',
      items:  Store.fetch(),
      newItem: '',
    }
  },
  watch: {
    items:　{
      handler: function (items) {
         Store.save(items)
      },
      deep: true
    }
  },
  methods:{
    addNew: function () {
      if (!this.newItem){
        return
      }
      this.items.push({
        id: this.items.size + 1,
        label: this.newItem,
        isFinished: false,
        showDelete: false
      })
      this.newItem = ''
    },
    toFinish: function (item) {
      item.isFinished = !item.isFinished
    },
    itemEnter:function (item) {
      item.showDelete = true
    },
    itemLeave:function (item) {
      item.showDelete = false
    },
    deleteClick:function (item) {
      this.items.splice(this.items.indexOf(item),1)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: Helvetica, sans-serif;
}
#mylist {
  width: 500px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.title {

}
.inputItem {
  width: 500px;
  height: 30px;
  padding: 0 5px;
}
.finished{
  text-decoration:line-through;
}
.item-status {
  display: inline;
  background: red;
  color: white;
  padding: 0 5px;
  font-size: 12px;
}
.item-delete {
  display: inline;
  text-decoration: underline;
  font-size: 12px;
  color: gray;
  cursor: pointer;
}
.item-label {
  display: inline;
}
.line-through {
  text-decoration: line-through;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}
li {
  font-size:20px;
  display: flex;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
