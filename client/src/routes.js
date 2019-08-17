import AC from './components/async_load';

export default [{
  name: '首页',
  path: '/',
  exact: true,
  component: AC(() => import("./views/home"))
},{
  name: '详情页',
  path: '/detail/:id',
  exact: true,
  component: AC(() => import("./views/movie"))
},{
  name: '登录入口',
  path: '/admin/login',
  exact: true,
  component: AC(() => import("./views/admin/login"))
},{
  name: '管理员入口',
  path: '/admin/index',
  exact: true,
  component: AC(() => import("./views/admin/index"))
}];