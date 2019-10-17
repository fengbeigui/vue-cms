<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" 
      v-for="(item,index) in newsList "
      :key="index">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis"></p>
            <span>发表时间:{{item.add_time | dateFormat}}</span>
            <span>点击:{{item.click}}次</span>
          </div>
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
//导入弹窗提示
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      //data上定义一个默认为空数组 新闻列表
      newsList: []
    };
  },
  //只定义没有调用，我们需要在生命周期created中调用
  created() {
      this.getNewsList();
  },
  methods: {
    //获取新闻列表
    getNewsList() {
      this.$http.get("api/getnewslist").then(res => {
        if (res.body.status === 0) {
          //如果没有失败 应该把数据保存到data上
          this.newsList = res.body.message;
        } else {
          Toast("获取新闻列表失败");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>