<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <hr />

    <!-- 缩略图区域 -->
    <!--  循环简单的缩略图click="$preview.open(index, list) -->
    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
        :key="item.src"
      />
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 导入评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      //把id存放到data,从路由中获取到的图片id
      id: this.$route.params.id,
      photoinfo: {}, //存储图片的详情
      list: [] //缩略图的数组
    };
  },
  // 注册 评论子组件
  components: {
    "cmt-box": comment
  },
  //页面一被执行的时候就立即调用
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    //获取图片的详情
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.photoinfo = res.body.message[0];
        }
      });
    },
    //获取缩略图
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          //循环每一个图片数据，补全图片的宽和高
          res.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          //把完整的数据保存到list中
          this.list = res.body.message;
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    //flex布局
    display: flex;
    //两边对齐
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>