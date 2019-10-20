<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <shopcarNunbox
                  :initcount="$store.getters.getGoodsCount[item.id]"
                  :goodsid="item.id"
                ></shopcarNunbox>
                <!-- 如何从购物车中获取商品的数量 -->
                <!-- 1 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的id   作为对象的属性名 count值作为对象的属性值，这样 当把所有的商品循环一遍，就会得到一个对象：{88:2,89:1,90:4}  [item.id]中括号值取某个属性-->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                <!-- 给删除添加一个事件，由于它是a链接我们给个默认行为 需要传参，item.id是删除store里面的数据的；注意此处的i是用来删除goodslist里面的数据 -->
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选商品<span class="red">0</span>件,总价 <span class="red">￥0</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
          
        </div>
      </div>
      <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
  </div>
</template>

<script>
import shopcarNunbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [] //购物车中所有商品的数据
    };
  },
  components: {
    shopcarNunbox
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //获取购物车商品列表
    getGoodsList() {
      //1.获取到store 中所有的商品的ID,然后拼接出一个 用逗号分隔的字符串
      var idArr = [];

      this.$store.state.car.forEach(item => idArr.push(item.id));
      //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }

      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(res => {
          if (res.body.status === 0) {
            this.goodslist = res.body.message;
          }
        });
    },
    //点击删除，把商品从store 中根据传递的id删除，同是把当前组件中的goodslist中，对应要删除的那个商品，使用index 来删除
    remove(id, index) {
      this.goodslist.splice(index, 1);
      //调用main定义的方法
      this.$store.commit("removeFormCar", id);
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
  .jiesuan{
    display: flex;
    //左右贴边对齐
    justify-content: space-between;
    text-align:center;
    .red{
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>