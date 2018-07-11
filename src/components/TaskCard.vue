<template>
  <li :data-task-id="taskData.id">
    <el-card>
      <p slot="header">{{taskData.title}}</p>
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

</style>
