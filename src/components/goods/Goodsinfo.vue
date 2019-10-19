<template>
  <div class="goods-info-item">
    <!--   商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
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
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
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