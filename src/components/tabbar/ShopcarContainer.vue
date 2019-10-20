<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img
              :src="item.thumb_path"
            />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
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
          <div
            class="mui-card-content-inner"
          >这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shopcarNunbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist:[] //购物车中所有商品的数据
    };
  },
  components: {
    shopcarNunbox
  },
  created(){
    this.getGoodsList();
  },
  methods: {
    //获取购物车商品列表
    getGoodsList() {
      //1.获取到store 中所有的商品的ID,然后拼接出一个 用逗号分隔的字符串
      var idArr = [];

      this.$store.state.car.forEach(item => idArr.push(item.id));
      //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if(idArr.length<=0){
        return
      }

      this.$http.get("api/goods/getshopcarlist/" + idArr.join(","))
      .then(res=>{
            if(res.body.status ===0){
              this.goodslist = res.body.message;
            }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;

  .goods-list {
    .mui-card-content-inner {
      display: flex;
      //居中
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      .price {
        color: red;
        font-weight: 700;
      }
    }
  }
}
</style>