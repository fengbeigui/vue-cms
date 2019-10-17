<template>
  <div class="newsinfo-container">
    <!-- <h3>新闻详情,获取id的一种方法-- {{$route.params.id}}</h3> -->
    <!-- 大标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
      <span>点击:{{newsinfo.click}}次</span>
    </p>
    <hr />
    <!--  资讯详细内容，带html标签 -->
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
//1 导入评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //将URL地址中传递过来的id值，挂载到data上，方便以后调用
      //默认等于一个空对象 新闻对象
      newsinfo: {}
    };
  },
  //注册子组件
  components: {
    // 用来注册子组件的节点
    "comment-box": comment
  },
  //方法调用
  created() {
    this.getNewsInfo();
  },

  //发起ajax请求
  methods: {
    //获取新闻的详情
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        //console.log(res);

        if (res.body.status === 0) {
          //如果成功，获取新闻数组 默认0开始
          this.newsinfo = res.body.message[0];
        } else {
          Toast("获取新闻失败");
        }
      });
    }
  }
};
</script>

<style lang='scss' >
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    //两边对齐
    justify-content: space-between;
  }
  .content {
  }
}
</style>