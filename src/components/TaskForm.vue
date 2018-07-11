<template>
  <div class="form-container">
    <el-form @submit.prevent="handleSubmit" :model="taskModel" :rules="validation" label-position="top" ref="taskForm">
      <el-form-item prop="title">
        <el-input v-model="taskModel.title" placeholder="Title" clearable/>
      </el-form-item>
      <el-form-item prop="list">
        <el-select v-model="taskModel.list" placeholder="List" clearable>
          <el-option v-for="list in lists" :key="list.slug" :value="list.slug" :label="list.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="description">
        <el-input v-model="taskModel.description" type="textarea" placeholder="Description" clearable/>
      </el-form-item>
      <el-form-item prop="date">
        <el-date-picker v-model="taskModel.date" placeholder="Date and time" type="datetime" clearable/>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-button @click.prevent="handleSubmit">Submit</el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click.prevent="$emit('formClose')">Cancel</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Notification } from 'element-ui'

export default {
  name: 'TaskForm',
  data () {
    return {
      taskModel: {
        title: '',
        list: '',
        description: '',
        date:  '',
      },
      validation: {
        title: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        list: [
          { required: true, message: 'This field is required', trigger: 'change' }
        ],
        description: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    lists () { return this.$store.state.lists },
    tasks () { return this.$store.state.tasks },
    listTasks () {
      return this.$store.getters['_getListTasks'](this.taskModel.list) 
    },
    taskData () {
      const listTasksByOrder = this.listTasks.sort((a, b) => a.order - b.order)
      const tasksById = this.tasks.sort((a, b) => a.id - b.id)
      return {
        id: tasksById.slice(-1)[0].id + 1,
        order: listTasksByOrder.slice(-1)[0].order + 1
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.taskForm.validate()
        .then(res => {
          this.$store.dispatch('createTask', Object.assign({}, this.taskModel, this.taskData))
          this.handleSuccess()
        })
        .catch(err => {
          console.log(err)
          this.handleError()  
        })
    },
    handleSuccess () {
      Notification.success({
        title: 'Success',
        message: 'Task created successfully',
        position: 'bottom-left'
      })
    },
    handleError () {
      Notification.error({
        title: 'Error',
        message: 'Please fill in the required fields',
        position: 'bottom-left'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.8);
  z-index: 3;
}
</style>
