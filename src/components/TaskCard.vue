<template>
  <li>
    <el-card>
      <p slot="header">{{taskData.title}}</p>
      <p>{{taskData.description}}</p>
    </el-card>
  </li>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    taskData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
