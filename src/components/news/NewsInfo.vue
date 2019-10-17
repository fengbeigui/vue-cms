<template>
  <div>
    <!-- <h3>新闻详情,获取id的一种方法-- {{$route.params.id}}</h3> -->
    <h3>新闻详情,获取id写法----- {{id}}</h3>
  </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id //将URL地址中传递过来的id值，挂载到data上，方便以后调用

        }
    }
};
</script>

<style>
</style>