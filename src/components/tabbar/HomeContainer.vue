<template>
  <div>
    <!-- 轮播图区域 -->
    <!-- 传:lunbotuList数组是子组件swiper那边传过来的 -->
      <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
//导入子组件
import swiper from "../subcomponents/swiper.vue";

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  //注册组件
  components:{
      swiper
  },
  methods: {
    //获取轮播图数据的方法
    getLunbotu() {
      //看api文档
      this.$http
        .get("api/getlunbo")
        .then(res => {
          //console.log(res.body);
          if (res.body.status === 0) {
            //成功的话
            this.lunbotuList = res.body.message;
            
          } else {
            //失败的话
            Toast("获取加载轮播图失败");
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border:none;
  img{
    width: 60px;
    height: 60px;
  }
   .mui-media-body{
     font-size: 13px;
   }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border:0;
}
</style>