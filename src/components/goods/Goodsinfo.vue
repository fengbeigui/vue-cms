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
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价：
            <del>￥{{goodsinfo.market_price}}</del> 销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>

          <div>
            <span>购买数量:<numbox></numbox></span>
            <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
             
              <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
              <input id="test" class="mui-input-numbox" type="number" value="5" />
              <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
          </div>

          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain>图文介绍</mt-button>
      </div>
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
      lunbotu: [],
      //声明一个默认给他空对象,表示获取到的商品的信息
      goodsinfo:{}
    };
  },
  //调用事件，和mounted()相似
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  //注册一下
  components: {
    swiper,
   
   
    
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
    },
    //获取商品的信息
    getGoodsInfo(){
      this.$http.get('api/goods/getinfo/'+this.id).then(res=>{
        if(res.body.status ===0){
          this.goodsinfo = res.body.message[0];
        }
      })
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
.now_price {
  color: red;
  font-size: 16px;
  //数字值 400 相当于 关键字 normal，700 等价于 bold
  font-weight: bold;
}
.mui-card-footer{
  //把父元素的flex去掉，就可以上下
  display: block;

  button{
    margin: 15px 0;
  }
}
</style>