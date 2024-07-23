<template>
    <div class="head" 
        :style="`background-image: url(${head})`"
    >
        {{ head }}
        <!-- master -->
        <p>
            <span>
                Elon Musk
            </span>
            <img class="master-photo" :src="master" />
        </p>
    </div>
</template>
<script setup>
import head from '@/assets/image.png'
import master from '@/assets/master.png'

</script>
<style lang="less" scoped>
.head{
    height: 30vh;
    width: 100vw;
    position: relative;
    p{
        position: absolute;
        margin: 0;
        bottom: -2vh;
        right: 0;
        display: flex;
        align-items: center;
        color: #fff;
        margin-right: 15px;
        span{
            padding-right: 10px;
            font-size: 22px;
        }
        .master-photo{
            width: 10vh;
            border-radius: 5px;
            height: 10vh;
        }
    }
}
</style>