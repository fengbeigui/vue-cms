<template>
  <div class="goods-list">
    <!-- vue-router编程式导航 -->

    <!-- 在网页中，有两种跳转方式： -->
    <!-- 方式1： 使用 a 标签 的形式叫做 标签跳转  -->
    <!-- 方式2： 使用 window.location.href 的形式，叫做 编程式导航 -->
    <!-- 通过点击事件，传参id的方式去获取实现跳转@click="goDetail(item.id) -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
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
    },
    //使用JS的形式路由导航
    goDetail(id) {
      //按照文档vue-router文档写的
      //可以打印console.log(this);出来看看

      // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
      // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
      // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址
      console.log(this);
      // 1. 最简单的
      // this.$router.push("/home/goodsinfo/" + id);
      // 2. 传递对象
       this.$router.push({ path: "/home/goodsinfo/" + id });
      // 3. 传递命名的路由,这个报一个警告，显示不了页面
      //this.$router.push({ name: 'Goodsinfo', params: { id } });
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