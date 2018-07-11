<template>
  <div id="app">
    <div class="tasks-lists__container">
      <tasks-list v-for="list in lists" :key="list.slug" :list="list" />
    </div>
  </div>
</template>

<script>
import TasksList from './components/TasksList'

export default {
  name: 'app',
  components: { TasksList },
  computed: {
    lists () {
      return this.$store.state.lists
    }
  }
}
</script>

<style lang="scss">
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
</style>
