<template>
  <li :data-task-id="taskData.id">
    <el-card shadow="hover">
      <div slot="header">
        <span class="task__title">
          {{taskData.title}}
        </span>
        <el-button @click="$emit('editTask', taskData)" class="task__edit-btn" icon="el-icon-edit" size="mini" circle></el-button>
      </div>
      <p>{{taskData.description}}</p>
      <el-tooltip v-if="taskData.date" effect="dark" placement="top" :content="taskData.date | date">
        <p>Due date: {{taskData.date | remaining}}</p>
      </el-tooltip>
    </el-card>
  </li>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TaskCard',
  props: {
    taskData: {
      type: Object,
      required: true
    }
  },
  filters: {
    date (val) {
      return moment(val).format('YYYY-MM-DD hh:mm:ss a')
    },
    remaining (val) {
      return moment(val).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'YYYY/MM/DD'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.task__title {
  float: left;
}
.task__edit-btn {
  float: right
}
</style>
