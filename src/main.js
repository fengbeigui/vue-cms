// 入口文件
import Vue from 'vue'

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex';
Vue.use(Vuex)
var store = new Vuex.Store({
    state: {  //this.$store.state.***
        //定义的一个购物车，将购物车中的商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，咱们可以暂时将这个商品对象，设计成这个样子
        //{id:商品的id，count:要购买的数量，price商品的单价，selected:false}
        car: []
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
                    return true
                }
            })
            //如果最终循环完毕，得到的flag还是false,则把商品数据直接push到购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }

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