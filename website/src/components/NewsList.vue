<template>
  <div class="news">
    <NewsItem v-for="item of data" :data="item" :key="item.rest_id" />
  </div>
</template>
<script setup>
import NewsItem from './NewsItem.vue'
import data from '@/assets/data.json'

</script>

<style lang="less" scoped>
.news {
  padding: 5vw 0;
}
</style>
