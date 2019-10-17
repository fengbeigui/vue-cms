<template>
  <div>
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120"></textarea>

    <!-- mt-button按钮是在main中添加的 -->
    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i ) in comments" :key="i">
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页数据
      comments: [] //定义所有的评论为空数据
    };
  },
  //调用
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      //评论请求
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(res => {
          if (res.body.status === 0) {
            //this.comments = res.body.message;
            //加载更多，每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接上新数据
            this.comments = this.comments.concat(res.body.message);
          } else {
            Toast("获取评论失败");
          }
        });
    },
    //加载更多事件功能
    getMore() {
      this.pageIndex++;
      this.getComments();
    }
  },
  //子组件想用这个id的话，需要props定义
  props: ["id"]
};
</script>

<style scoped lang="scss">
.cmt-container {
  font-size: 18px;
}
textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
}
.cmt-list {
  margin: 5px 0;
  .cmt-item {
    font-size: 13px;
  }
  .cmt-title {
    line-height: 30px;
    background-color: #ccc;
  }
  .cmt-body {
    line-height: 35px;
    //缩进
    text-indent: 2em;
  }
}
</style>