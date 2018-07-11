<template>
  <ul class="tasks-list__list">
    <li class="list__title">{{list.name}}</li>
    <draggable :id="list.slug" v-model="tasks" :options="{group: 'tasks'}" @add="handleMove" class="tasks-list__draggable">
      <task-card v-for="task in tasks" :key="task.id" :task-data="task" class="list__card" />
    </draggable>
  </ul>
</template>

<script>
import draggable from 'vuedraggable'
import TaskCard from './TaskCard'

export default {
  name: 'TaskList',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    tasks: {
      get () {
        return this.$store.getters['_getListTasks'](this.list.slug)
      },
      set (tasks) {
        console.log('setting', tasks)
      }
    }
  },
  components: { draggable, TaskCard },
  methods: {
    handleMove (data) {
      console.log(data)
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
  padding: 2rem .4rem;
  margin-right: 2rem;
  border-radius: .6rem;
  background: rgba(0,0,0,.05);
}
.tasks-list__draggable {
  display: flex;
  flex-direction: column;
}
.list__title, .list__card {
  margin-bottom: 2rem;
}
.list__card {
  cursor: pointer
}
</style>
