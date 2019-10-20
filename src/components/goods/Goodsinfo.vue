<template>
  <div class="goods-info-item">
    <!-- 来个小球 -->
    <!--  然后来个位移，使用transition -->
    <!-- 第二部使用钩子函数 -->
    <!-- 由于上面的小球在这个组件内，我们可以通过ref来获取到 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

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
            <!-- 事件的传递机制传递给numbox -->
            <span>
              购买数量:
              <numbox @getcount="getSelectedCount"></numbox>
            </span>

          </div>

          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
    <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
    <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
    <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
    <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->

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
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
//导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      //参数对象不带r;
      id: this.$route.params.id, //路由参数对象中的id挂载到data上 方便后期调用
      //轮播图的数据
      lunbotu: [],
      //声明一个默认给他空对象,表示获取到的商品的信息
      goodsinfo: {},
      //控制小球隐藏和显示的标识符
      ballFlag: false,
      //保存选中购物车的值，默认等于1
      selectedCount: 1
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
    numbox
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
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.goodsinfo = res.body.message[0];
        }
      });
    },
    //点击使用编程式导航跳转到图文介绍页面
    goDesc(id) {
      //[Vue warn]: Error in v-on handler: "ReferenceError: id is not defined" found in  说明没有传参数id
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    //点击跳转到评论页面
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    //点击添加到购物车
    addToShopCar() {
      //取反，点击显示,再次点击切换隐藏
      this.ballFlag = !this.ballFlag;
    },
    //三个钩子函数定义一下 beforeEnter  enter afterEnter
    //小球动画优化思路
    //1 先分析导致 动画 不准确的 本质原因：我们把小球位移的位置 已经局限在了某一分辨率下的   滚动条未滚动的情况下
    //2 只要分辨率和测试的时候不一样 或者 滚动条有一定的滚动距离后，问题就出现了
    //3 因此  我们经过分析，得到结论：不能把 位置的 横纵坐标 直接写死了  而是应该 根据不同的情况  动态计算这个坐标值
    //4 经过分析 得出解题思路  先得到 徽标的 横纵坐标，再得到 小球的横纵坐标，然后 让y值 求差，x 值也求差，得到的结果，就是横纵坐标要位移的距离
    //5  如何 获取 徽标和小球的位置？？？  domObject.getBoundingClientRect()
    beforeEnter(el) {
      //小球样式 0 0 点是数字那个位置
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      //获取小球在页面中的位置,上面定义了ref,这里可以通过this.$refs拿到小球
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //购物车的徽标，vue不推荐我们操作dom,不涉及数据，我们简单用下dom也是可以的
      //在App.vue的徽标哪里添加id="badge"；这边就能获取到了元素;再实现获取徽标在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      //实现拿到位置
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      //小球位移的终点,es6拼接字符串
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      //过渡的动效
      //el.style.transition = 'all 1s ease'
      el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
      //需要点击done
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    //选中的数量值,传一个count
    getSelectedCount(count) {
      //当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectedCount = count;
      //拿到传递过来的数字
      console.log('父组件拿到的数量值为:' + this.selectedCount);
      
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
.mui-card-footer {
  //把父元素的flex去掉，就可以上下
  display: block;

  button {
    margin: 15px 0;
  }
}

//小球样式
.ball {
  //初始
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background-color: red;

  //然后来个定位,绝对定位
  position: absolute;
  top: 390px;
  left: 146px;
  //层级
  z-index: 99;
}
</style>