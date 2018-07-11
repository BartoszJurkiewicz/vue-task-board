<template>
  <ul class="tasks-list__list">
    <li class="list__title">
      <el-input v-model="listName" @change="handleTitleChange"/>
    </li>
    <draggable :id="list.slug" :data-list-slug="list.slug" v-model="tasks" :options="{group: 'tasks'}" @add="handleMove" class="tasks-list__draggable">
      <task-card v-for="task in tasks" :key="task.id" :task-data="task" class="list__card" @editTask="task => $emit('editTask', task)"/>
    </draggable>
    <li>
      <el-button @click="$emit('addTask', list.slug)">Add card</el-button>
    </li>
  </ul>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TaskList',
  components: { 
    draggable,
    TaskCard: () => import('./TaskCard')
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      listName: this.list.name
    }
  },
  computed: {
    tasks: {
      get () {
        let tasks = this.$store.getters['_getListTasks'](this.list.slug)
        return tasks.sort((a, b) => a.order - b.order)
      },
      set (tasks) {
        tasks.forEach((task, index) => {
          if(Number(task.order) !== index + 1) {
            this.handleMove(Object.assign({}, task, {order: index + 1}))
          }
        })
      }
    }
  },
  methods: {
    handleMove (moveData) {
      const taskId = moveData.id || moveData.item.dataset.taskId
      const task = this.$store.getters['_getTaskById'](taskId)
      const listSlug = this.list.slug || task.target.dataset.listSlug
      const newIndex = moveData.order || Number(moveData.newIndex) + 1
      this.$store.dispatch('updateTask', Object.assign({}, task, { list: listSlug, order: newIndex }))
    },
    handleTitleChange (val) {
      this.$store.dispatch('updateListTitle', Object.assign({}, this.list, {name: val}))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.tasks-list__list {
  display: flex;
  flex-direction: column;
  flex-basis: 20vw;
  min-width: 200px;
  padding: 2rem .4rem;
  margin-right: 2rem;
  border-radius: .6rem;
  background: rgba(0,0,0,.05);
}
.tasks-list__draggable {
  display: flex;
  flex-direction: column;
  min-height: 1rem;
}
.list__title, .list__card {
  margin-bottom: 2rem;
}
.list__card {
  cursor: pointer
}
</style>
