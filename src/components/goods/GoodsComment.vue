<template>
  <div>
    <!-- 需要路由里面的那个id传过来 -->
   <!--  query要用path来引入，params要用name来引入，接收参数都是类似的，分别是this.$route.query.name和this.$route.params.name -->
   <!-- query更加类似于我们ajax中get传参，params则类似于post -->
    <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
//导入组件
import cmtbox from "../subcomponents/comment.vue";
export default {
  data() {
    return {};
  },
  //注册组件
  components: {
    cmtbox
  }
};
</script>

<style>
</style>