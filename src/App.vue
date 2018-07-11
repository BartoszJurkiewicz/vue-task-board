<template>
  <div id="app">
    <transition name="fade">
      <task-form v-if="formActive" :list-slug="listSlug" :task-prop="taskData" @formClose="formActive = false"/>
    </transition>
    <div class="tasks-lists__container">
      <tasks-list v-for="list in lists" :key="list.slug" :list="list" @addTask="addTask" @editTask="editTask" />
      <el-button @click="addList" class="add-list" icon="el-icon-circle-plus" circle></el-button>
    </div>
  </div>
</template>

<script>
import TasksList from './components/TasksList'

export default {
  name: 'app',
  components: { 
    TasksList,
    TaskForm: () => import('./components/TaskForm')
  },
  data () {
    return {
      formActive: false,
      listSlug: '',
      taskData: {}
    }
  },
  computed: {
    lists () { return this.$store.state.lists }
  },
  methods: {
    addList () {
      this.$store.dispatch('addList', Math.random().toString(36).substr(2, 5))
    },
    addTask (listSlug) {
      this.taskData = {}
      this.listSlug = listSlug
      this.formActive = true
    },
    editTask (task) {
      this.taskData = task
      this.formActive = true
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tasks-lists__container {
  display: flex;
}
.add-list {
  align-self: center;
  .el-icon-circle-plus {
    font-size: 2rem;
  }
}
.el-input__inner {
  text-align: center;
  font-size: 2rem;
}
</style>
