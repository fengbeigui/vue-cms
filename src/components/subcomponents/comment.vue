<template>
  <div>
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120"></textarea>

    <!-- mt-button按钮是在main中添加的 -->
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item">
        <div class="cmt-title">第1楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2018-01-01 12:12:12</div>
        <div class="cmt-body">锄禾日当午</div>
      </div>

      <div class="cmt-item">
        <div class="cmt-title">第1楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2018-01-01 12:12:12</div>
        <div class="cmt-body">锄禾日当午</div>
      </div>

      <div class="cmt-item">
        <div class="cmt-title">第1楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2018-01-01 12:12:12</div>
        <div class="cmt-body">锄禾日当午</div>
      </div>
    </div>

    <mt-button type="danger" size="large">加载更多</mt-button>
  </div>
</template>

<script>
export default {};
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