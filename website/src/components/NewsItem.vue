<template>
  <article class="news-item">
    <!-- 
      头像:名称
          内容
    -->
    <div class="left">
      <img :src="data.author.photo" />
    </div>
    <div class="right">
      <!-- 名称 -->
      <div class="news-item__nickname">{{ data.author.name }}</div>
      <!-- 内容 -->
      <div class="news-item__content">
        {{ contentStr }}
        <img class="img" v-for="item of imgs" :src="item" :key="item" />
      </div>
      <div class="news-item__tools">
        {{ created_at }}
      </div>
    </div>
  </article>
</template>
<script setup>
import { defineProps, computed } from 'vue'
import moment from 'moment'

const { data } = defineProps({
  data: Object
})

const imgs = computed(() => {
  let list = []

  try {
    const imgs = data.jsonStr.itemContent.tweet_results.result.legacy.extended_entities.media
    for (const imgItem of imgs) {
      let fileName = imgItem.media_url_https.split('/').pop()
      list.push(fileName);
    }
  } catch (error) {

  }

  return list
})

const contentStr = computed(() => {
  let str = data.jsonStr.itemContent.tweet_results.result.legacy.full_text
  let arr = str.split('https://t.co/');
  if (arr.length) {
    return arr[0]
  }
  return str;
})

const created_at = computed(() => {
  try {
    return moment(data.jsonStr.itemContent.tweet_results.result.legacy.created_at).format('YYYY-MM-DD HH:mm')
  } catch (error) {
    console.log(error)
    return '--'
  }
})

</script>
<style lang="less" scoped>
.news-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee67;
  padding: 1rem 1.5rem;

  .right {
    flex: 1;
    padding: 0 2vw;

    .news-item__nickname {
      color: rgb(16, 49, 180);
      font-size: 14px;
    }

    .news-item__content {
      font-size: 14px;
      padding: 5px 0;

      img {
        width: 90%;
        border-radius: 10px;
        margin: 10px;
      }
    }

    .news-item__tools {
      font-size: 12px;
      color: #666;
    }
  }

  .left {
    width: 4rem;

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 5px;
    }
  }
}
</style>
