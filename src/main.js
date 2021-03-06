// 入口文件
import Vue from 'vue'

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex';
Vue.use(Vuex)

//先把本地存储获取出来给car
//每次刚进入网站，肯定会调用main.js 在刚调用的时候，先从本地存储中，把购物车的数据读取出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: {  //this.$store.state.***
        //定义的一个购物车，将购物车中的商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，咱们可以暂时将这个商品对象，设计成这个样子
        //{id:商品的id，count:要购买的数量，price商品的单价，selected:false}
        // car: []
        car: car
    },
    mutations: { //this.$store.commit('方法的名称','按需传递唯一的参数')
        addToCar(state, goodsinfo) {
            //点击加入购物车，把商品信息，保存到store中的car上,
            //只能传入两个参数，第一个固定的写法，第二个数字，数组或者对象
            //分析：1 如果购物车中，之前就已经有这个对应的商品了，只需要更新数量就行了
            //2 如果没有，就直接把商品数据，push到car中即可,通过some找到就把它停止了？有可能传过来的是字符串，parseInt把它转成数字

            //一上来就假设在购物车中没有找到对应的商品
            var flag = false

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    //找到后使用return true终止后续的some循环
                    flag = true //如果没有这句的话，数量十加入购物车变成了二十
                    return true
                }
            })
            //如果最终循环完毕，得到的flag还是false,则把商品数据直接push到购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }

            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))

        },
        //不能跟addToCar共用，修改购物车中商品的数量值
        updateGoodsInfo(state, goodsinfo) {
            //分析
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品的最新的数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //根据ID 从store 中的购物车中删除对应的那条商品数据
        removeFormCar(state, id) {
            state.car.some((item ,i)=> {
                if (item.id == id) {

                    state.car.splice(i, 1)

                    return true;
                }
            })
            //将删除完毕后的，最新的购物车数据，同步到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id == info.id){
                    //selected商品的状态，重新定义（同步）
                    item.selected = info.selected
                }
            })
            //把最新的所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters: { //this.$store.getters.***
        //相当于计算  计算属性，也想当于filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var G = {}
            state.car.forEach(item => {
                //对应的键：值
                G[item.id] = item.count
            })
            return G
        },
        //选中的商品
        getGoodsSelected(state){
            var o ={}
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        //获取价格的总价
        getGoodsCountAndAmount(state){
            var s = {
                count:0, //勾选的数量
                amount:0 //勾选的总价
            }
            state.car.forEach(item=>{
                if(item.selected){
                    //把数量加起来
                    s.count += item.count
                    //总价等于单价的价格和数量程起来相加
                    s.amount += item.price * item.count

                }
            })
            //当循环完毕的时候，可以return s出这么一个对象
            return s ;
        }


    }
})



//导入时间插件
import moment from 'moment'
//定义全局的过滤器,如果直接调用是当前时间moment(dataStr)
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

//导入 MUI的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
/* import { Header, Swipe, SwipeItem, Button ,Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload); 
 */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'



// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, // 1.4 挂载路由对象到 VM 实例上
    store // 挂载store 状态管理对象
})