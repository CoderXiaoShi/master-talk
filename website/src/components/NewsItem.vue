<template>
  <article class="news-item">
    <!-- 
      头像:名称
          内容
    -->
    <div class="left">
      <img :src="master" />
    </div>
    <div class="right">
      <!-- 名称 -->
      <div class="news-item__nickname">Elon Musk</div>
      <!-- 内容 -->
      <div class="news-item__content">
        {{ data.content }}
        <!-- They should actually teach this in biz school
        <img :src="image01" /> -->
      </div>
      <div class="news-item__tools">
        2024-7-23 15:30
      </div>
      <!-- 
          互动区域
            发布时间
        -->
    </div>
  </article>
</template>
<script setup>
import master from '@/assets/master.png'
import image01 from '@/assets/image01.png'
import { defineProps } from 'vue'

defineProps({
  data: Object
})

</script>
<style lang="less" scoped>
.news-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee67;
  padding: 2vw 5vw;

  .right {
    flex: 1;
    padding: 0 2vw;

    .news-item__nickname {
      color: rgb(16, 49, 180);
    }

    .news-item__content {
      font-size: 14px;
      padding: 5px 0;

      img {
        width: 100%;
      }
    }

    .news-item__tools {
      font-size: 12px;
      color: #ccc;
    }
  }

  .left {
    width: 12vw;

    img {
      width: 12vw;
      height: 12vw;
      border-radius: 5px;
    }
  }
}
</style>
