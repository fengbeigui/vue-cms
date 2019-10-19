<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <!-- 将来，谁使用此 轮播图组件，谁为我们传递 lunbotuList -->
      <!-- 此时，lunbotuList 应该是 父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    props:["lunbotuList"]
};
</script>

<style scoped lang="scss">
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: cyan;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>