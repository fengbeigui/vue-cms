<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item">
        <img :src="item.img" alt="">
      </mt-swipe-item>

    </mt-swipe>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
  data() {
    return {
      lunbotuList:[] //保存轮播图的数组
    };
  },
  created(){
    this.getLunbotu();
  },
  methods: {
    //获取轮播图数据的方法
    getLunbotu() {
      //看api文档
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(res => {
          //console.log(res.body);
          if(res.body.status === 0){
            //成功的话
            this.lunbotuList = res.body.message;
            Toast('获取加载轮播图ok')
          }else{
            //失败的话
              Toast('获取加载轮播图失败')
          }
        });
    }
  }
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