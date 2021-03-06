import Vue from 'vue'
import VueRouter from 'vue-router'
//路由改造,根据需要来加载相应的路由,而不是一次性加载全部路由.
const Login = () =>import(/* webpackChunkName:"login_home_welcome" */ './components/login.vue')
//import Login from './components/login.vue'
const Home = () =>import(/* webpackChunkName:"login_home_welcome" */ './components/home.vue')
//import Home from './components/home.vue'
const Welcome = () =>import(/* webpackChunkName:"login_home_welcome" */ './components/welcom.vue')
//import Welcome from './components/welcom.vue'
const Users = () =>import(/* webpackChunkName:"user_rights_roles" */ './components/user/users.vue')
//import Users from './components/user/users.vue'
const Rights = () =>import(/* webpackChunkName:"user_rights_roles" */ './components/power/rights.vue')
//import Rights from './components/power/rights.vue'
const Roles = () =>import(/* webpackChunkName:"user_rights_roles" */ './components/power/roles.vue')
//import Roles from './components/power/roles.vue'
const Cate = () =>import(/* webpackChunkName:"cate_params" */ './components/goods/cate.vue')
//import Cate from './components/goods/cate.vue'
const Params = () =>import(/* webpackChunkName:"cate_params" */ './components/goods/params.vue')
//import Params from './components/goods/params.vue'
const List = () =>import(/* webpackChunkName:"list_add" */ './components/goods/list.vue')
//import List from './components/goods/list.vue'
const Add = () =>import(/* webpackChunkName:"list_add" */ './components/goods/Add.vue')
//import Add from './components/goods/Add.vue'
const Order = () =>import(/* webpackChunkName:"order_reports" */ './components/order/order.vue')
//import Order from './components/order/order.vue'
const Reports = () =>import(/* webpackChunkName:"order_reports" */'./components/reports/reports.vue')
//import Reports from './components/reports/reports.vue'
Vue.use(VueRouter)
//解决跳转相同路径报错的代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//路由配置
const router =  new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home',component: Home,redirect:'/welcome',children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:Users},
      {path:'/rights',component:Rights},
      {path:'/roles',component:Roles},
      {path:'/categories',component:Cate},
      {path:'/params',component:Params},
      {path:'/goods',component:List},
      {path:'/goods/add',component:Add},
      {path:'/orders',component:Order},
      {path:'/reports',component:Reports}
    ] }
  ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to表示想要访问的路径
  //from 表示从哪个路径来
  //next表示放行.
  if(to.path == "/login"){
    return next()
  }
  const tokenStr = window.sessionStorage.getItem("token")
  if(!tokenStr){
    return next("/login")
  }
  if(tokenStr&&to.path == "/welcome"){
    window.sessionStorage.setItem("activepath",to.path)
    return next()
  }
  next()
})
export default router
