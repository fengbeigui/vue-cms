<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item ',item.id == 0 ? 'mui-active' : '']"
            v-for="(item,index) in cates"
            :key="index"
            @tap="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
        <!-- 添加图片详情连接跳转router-link -->
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>

    </ul>
  </div>
</template>

<script>
//1 导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] // 图片列表的数组
    };
  },
  //方法调用
  created() {
    this.getAllCategory();
    // 默认进入页面，就主动请求 所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui(" .mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    //获取所有的图片分类
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          res.body.message.unshift({ title: "全部", id: 0 });
          this.cates = res.body.message;
        }
      });
    },
    // 根据 分类Id，获取图片列表
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
//移动端Web界面滚动性能报错信息[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
//使用全局样式样式去掉
* {
  touch-action: pan-y;
}
.photo-list {
  //去掉小点
  list-style: none;
  margin: 0;
  //左右有边距，给左右10px
  padding: 10px;
  //最下边图片会多出10px,给最外0解决
  padding-bottom: 0;
  li {
    background-color: #ccc;
    //居中对齐显示
    text-align: center;
    //给上下图片一个间距
    margin-bottom: 10px;
    //整体单个图片阴影
    box-shadow: 0 0 9px #999;
    //相对定位
    position: relative;
    img {
      //给真正图片百分百
      width: 100%;
      //图片下边距有阴影，可以这样去掉
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      //把字体颜色改成白色
      color: white;
      //居左对齐
      text-align: left;
      //绝对定位
      position: absolute;
      bottom: 0;
      //字体透明度
      background-color: rgba(0, 0, 0, 0.4);
      //设置对大高度
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>