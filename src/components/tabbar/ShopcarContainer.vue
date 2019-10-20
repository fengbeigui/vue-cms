<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch ></mt-switch>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/3c1af9783bdc53ed843af5655ca92009.jpg?thumb=1&w=200&h=200&f=webp&q=90" >
            <div class="info">
              <h1>小米（mi）小米none 16G双网通版本</h1>
              <p>
                <span class="price">￥2199</span>
                <shopcarNunbox></shopcarNunbox>
                <a href="#">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import shopcarNunbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data(){
    return{

    }
  },
  components:{
      shopcarNunbox
  },

};
</script>

<style scoped lang="scss">
.shopcar-container{
  background-color: #eee;
  overflow: hidden;

  .goods-list{
    .mui-card-content-inner{
      display: flex;
      //居中
      align-items: center;
    }
    img{
      width: 60px;
      height: 60px;
    }
    h1{
      font-size: 13px;
    }
    .info{
      .price{
        color: red;
        font-weight: 700;
      }
    }
  }
}
</style>