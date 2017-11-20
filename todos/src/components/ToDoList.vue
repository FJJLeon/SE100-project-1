<template>
<div id= "mylist" class="mytodos">
  <h1 class = 'title' v-text="title"></h1>
  <input class = 'inputItem' v-model='newItem' v-on:keyup.enter = "addNew" placeholder="What to do?">
  <ul class="todolist">
    <li v-for = "item in items" class="editing: item == editedItem">
        <h3 v-on:mouseenter='itemEnter(item)' v-on:mouseleave='itemLeave(item)'
            v-if='item.showLabel'>
          <input type="checkbox" v-on:click='toFinish(item)'>
          <p class='item-label'
            v-on:dblclick='editItem(item)'
            v-bind:class="{'line-through' : item.isFinished}">{{item.label}}</p>
          <p class='item-status' v-if='item.isFinished'>finished</p>
          <button class='item-delete' v-if='item.showDelete' v-on:click='deleteClick(item)'>Delete</button>
        </h3>
        <input class="edit" type="text"
          v-model="item.label"
          v-if="item.showEdit"
          v-on:blur="doneEdit(item)"
          v-on:keyup.enter="doneEdit(item)"
          v-on:keyup.esc="cancelEdit(item)">
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
      editedItem: null,
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
        id: this.items.length + 1,
        label: this.newItem,
        isFinished: false,
        showDelete: false,
        showLabel: true,
        showEdit: false,
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
    },

    editItem: function (item) {
      if (this.editedItem != null) {//avoid dbclick two label
        this.doneEdit(this.editedItem)
      }
      this.before = item.label
      item.showLabel = false
      item.showEdit = true
      this.editedItem = item
    },
    doneEdit: function (item) {
      if (!this.editedItem) {
        return
      }
      this.editedItem = null
      //item.label = item.label.trim()
      if (!item.label) {
        this.deleteClick(item)
      }
      item.showLabel = true
      item.showEdit = false
    },
    cancelEdit: function (item) {
      this.editedItem = null
      item.label = this.before
      item.showLabel = true
      item.showEdit = false
    },
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
.inputItem {
  width: 500px;
  height: 40px;
  padding: 0 5px;
}
.finished{
  text-decoration:line-through;
}
.item-status {
  display: inline;
  background: green;
  color: white;
  padding: 0 5px;
  font-size: 15px;
}
.item-delete {
  display: inline;
  font-size: 14px;
  color: red;
  padding: 0 5px;
  cursor: pointer;
}
.item-label {
  display: inline;
}
.line-through {
  text-decoration: line-through;
}
.edit{
  width: 200px;
  height: 40px;
  padding: 0 5px;
  margin:15px;
}
h1, h2 {
  font-weight: normal;
}
h3 {
  height: 27px;
}
ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}
li {
  font-size:20px;
  display: flex;
  margin: 0 3px;
}
a {
  color: #42b983;
}

</style>
