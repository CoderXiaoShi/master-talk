<template>
    <div class="head" :style="`background-image: url(/${state.banner})`">
        <p>
            <span>{{ state.name }}</span>
            <img class="master-photo" :src="state.photo" />
        </p>
    </div>
</template>
<script setup>
import { reactive } from 'vue'

import data from '@/assets/data.json'

const author = data[0].author

document.title = author.name
const state = reactive({
    banner: author.profile_banner_url,
    photo: author.photo
})

</script>
<style lang="less" scoped>
.head {
    height: 30vh;
    background-size: cover;
    width: 100vw;
    position: relative;

    p {
        position: absolute;
        margin: 0;
        bottom: -2vh;
        right: 0;
        display: flex;
        align-items: center;
        color: #fff;
        margin-right: 15px;

        span {
            padding-right: 10px;
            font-size: 22px;
        }

        .master-photo {
            width: 10vh;
            border-radius: 5px;
            height: 10vh;
        }
    }
}
</style>