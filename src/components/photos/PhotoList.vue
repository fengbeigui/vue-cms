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
          >{{item.title}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//1 导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [] //所有分类的列表数组
    };
  },
  //方法调用
  created() {
    this.getAllCategory();
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
</style>