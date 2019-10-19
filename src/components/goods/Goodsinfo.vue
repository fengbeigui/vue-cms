<template>
  <div class="goods-info-item">
    <!--   商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
    </div>

    <!-- 商品参数区 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
      <div class="mui-card-footer">页脚</div>
    </div>
  </div>
</template>

<script>
//导入轮播图组件
import swiper from "../subcomponents/swiper.vue";

export default {
  data() {
    return {
      //参数对象不带r;
      id: this.$route.params.id, //路由参数对象中的id挂载到data上 方便后期调用
      //轮播图的数据
      lunbotu: []
    };
  },
  //调用事件，和mounted()相似
  created() {
    this.getLunbotu();
  },
  //注册一下
  components: {
    swiper
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          //注意：先循环轮播图数组的没一项，为item添加img属性，因为轮播图组件中，只认识item.img,不认识item.src  遍历数组
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = res.body.message;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.goods-info-item {
  background-color: #eee;
  //解决头部白色塌陷部分
  overflow: hidden;
}
</style>