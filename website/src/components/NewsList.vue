<template>
  <div class="news">
    <NewsItem v-for="item of data" :data="item" />
  </div>
</template>
<script setup>
import NewsItem from './NewsItem.vue'
import data from '../data.json'

console.log(data)

</script>

<style lang="less" scoped>
.news {
  padding: 5vw 0;
}
</style>
