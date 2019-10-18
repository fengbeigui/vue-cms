<template>
  <div class="goods-list">
    <div class="goods-item">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ca9b4f81af709935556bef9aa21a90e8.jpg"
        alt
      />
      <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥899</span>
          <span class="old">￥999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>

    <div class="goods-item">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/3c1af9783bdc53ed843af5655ca92009.jpg"
        alt
      />
      <h1 class="title">小米(Mi)D3300 administrator（18-55mm f/3.5-5.6G VRII）（黑色）</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥899</span>
          <span class="old">￥999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>

    <div class="goods-item">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9aab8a7fa9005ef918c9aa2d5f17c806.jpg"
        alt
      />
      <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥899</span>
          <span class="old">￥999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.goods-list{
    display:flex;
    flex-wrap:wrap;
    padding:7px;
    //给外面的父元素添加
    justify-content: space-between;

    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        //边框阴影
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width:100%;

        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    //贯穿线
                    text-decoration: line-through;
                }
            }
            .sell{}
        }
    }
}
</style>