import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [
      {slug: 'main', name: 'Main'},
      {slug: 'list2', name: 'List #2'}
    ],
    tasks: [
      {id: 1, list: 'main', title: 'Task #1', description: 'Description for task#1', date: '2018-07-12 12:00:00', order: 0},
      {id: 2, list: 'main', title: 'Task #2', description: 'Description for task#2', date: '2018-06-20 19:30:00', order: 1},
      {id: 3, list: 'list2', title: 'Task #3', description: 'Description for task#3', date: '2018-07-08 16:22:00', order: 0}
    ]
  },
  mutations: {
    ADD_TASK: (state, task) => {
      state.tasks.push(task)
    },
    UPDATE_TASK: (state, updatedTask) => {
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id)
      Vue.set(state.tasks, taskIndex, updatedTask)
    },
    REMOVE_TASK: (state, taskId) => {
      console.log('removing task', taskId)
    },
    ADD_LIST: (state, listId) => {
      state.lists.push({slug: `${listId}`, name: 'List'})
    }
  },
  actions: {
    createTask: ({commit}, task) => {
      commit('ADD_TASK', task)
    },
    updateTask: ({commit}, updatedTask) => {
      commit('UPDATE_TASK', updatedTask)
    },
    removeTask: ({commit}, taskId) => {
      commit('REMOVE_TASK', taskId)
    },
    addList: ({commit}, listId) => {
      commit('ADD_LIST', listId)
    }
  },
  getters: {
    _getListTasks: state => listSlug => state.tasks.filter(task => task.list === listSlug),
    _getTaskById: state => taskId => state.tasks.find(task => task.id === Number(taskId))
  }
})
