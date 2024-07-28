<script setup lang="ts">
import Head from './components/Head.vue'
import NewsList from './components/NewsList.vue'
import wx from '@/wx.jpg'

</script>

<template>
  <div class="root">
    <Head />
    <NewsList />
    <hr>
    <div style="text-align: center;">
      <p>
        网站内容均来自 X.com <br/>
        目的是为了接受最新的 前沿科技和人工智能相关的新闻 <br/>
        如果有问题请联系 <br/>
        <img :src="wx" alt="" width="300">
      </p>
    </div>
  </div>
</template>

<style lang="less" >

@media (min-width: 750px) {
  .root{
    width: 750px;
    margin: 0 auto;
  }
  html {
    font-size: 14px;
  }
}

</style>
