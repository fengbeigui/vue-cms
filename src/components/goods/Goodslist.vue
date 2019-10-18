<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodslist" :key="item.id">
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <!-- 添加加载更多按钮 -->
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    //data 是往自己组件内部，挂载一些私有数据的
    return {
      pageindex: 1, //分页的页数
      goodslist: [] //声明存放列表的空数组
    };
  },
  //只要页面一调用就立即获取我们的商品列表
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取商品列表
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(res => {
        if (res.body.status === 0) {
          //this.goodslist = res.body.message;
          //需要先拼接再赋值
          this.goodslist = this.goodslist.concat(res.body.message);
        }
      });
    },
    //获取更多的方法
    getMore() {
        //根据最新的页码值
        this.pageindex++;
        this.getGoodsList();
    }
  }
};
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  //给外面的父元素添加
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    //边框阴影
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          //贯穿线
          text-decoration: line-through;
        }
      }
      .sell {
      }
    }
  }
}
</style>