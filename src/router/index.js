import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

const router = new Router({
    // mode:'history',
    routes: [

        {   // 登录页面
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/pages/Login'], resolve),
        },
        {   // 登录页面
            path: '/Register',
            name: 'Register',
            component: resolve => require(['@/pages/Register'], resolve),
        },
        {   // 主页
            path: '/',
            name: 'Home',
            component: resolve => require(['@/pages/Home'], resolve),
            //项目已通过审核列表
            redirect: {name: 'Article'},
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
             },
            children: [
                {   // 欢迎页面
                    path: '/home/welcome',
                    name: 'welcome',
                    component: resolve => require(['@/pages/welcome'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 销售名片管理    sellingCard
                {   
                    path: '/home/sellingCard',
                    name: 'sellingCard',
                    component: resolve => require(['@/pages/sellingCard/sellingCard'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 添加销售名片   addsellingCard
                {   
                    path: '/home/sellingCard/addsellingCard',
                    name: 'addsellingCard',
                    component: resolve => require(['@/pages/sellingCard/addsellingCard'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                {   // 权限管理
                    path: '/home/limitList',
                    name: 'limitList',
                    component: resolve => require(['@/pages/limit/limitList'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                //商品管理GoodsManage
                {   
                    path: '/home/GoodsManage',
                    name: 'GoodsManage',
                    component: resolve => require(['@/pages/goods/GoodsManage'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 添加商品AddGoods
                {   
                    path: '/home/AddGoods',
                    name: 'AddGoods',
                    component: resolve => require(['@/pages/goods/AddGoods'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                //文章管理-------用电安全
                {   
                    path: '/home/Article',
                    name: 'Article',
                    component: resolve => require(['@/pages/article/Article'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                //  查看用电安全类型 Articletype
                {
                    path: '/home/article/Articletype',
                    name: 'Articletype',
                    component: resolve => require(['@/pages/article/Articletype'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                
                 //  添加用电安全类型 AddArticletype
                 {
                    path: '/home/article/AddArticletype',
                    name: 'AddArticletype',
                    component: resolve => require(['@/pages/article/AddArticletype'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 文章编辑
                {
                    path: '/home/article/ArticleEdit',
                    name: 'ArticleEdit',
                    component: resolve => require(['@/pages/article/ArticleEdit'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                //添加文章   AddArticle
                {
                    path: '/home/article/AddArticle',
                    name: 'AddArticle',
                    component: resolve => require(['@/pages/article/AddArticle'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                
                // 轮播图管理   carouselFigure
                {
                    path: '/home/carouselFigure/carouselFigure',
                    name: 'carouselFigure',
                    component: resolve => require(['@/pages/carouselFigure/carouselFigure'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 添加轮播图   addCarouselFigure
                {
                    path: '/home/carouselFigure/addCarouselFigure',
                    name: 'addCarouselFigure',
                    component: resolve => require(['@/pages/carouselFigure/addCarouselFigure'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 用户管理   userMessage
                {
                    path: '/home/userMessage/userMessage',
                    name: 'userMessage',
                    component: resolve => require(['@/pages/userMessage/userMessage'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },

                // 订单管理
                {
                    path: '/home/Ordering',
                    name: 'Ordering',
                    component: resolve => require(['@/pages/Ordering/Ordering'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    }
                },
                //查看用户的所有商品CheckOrder
                {
                    path: '/home/CheckOrder',
                    name: 'CheckOrder',
                    component: resolve => require(['@/pages/Ordering/CheckOrder'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    }
                },
                //添加订单  AddArticle
                {
                    path: '/home/Ordering/AddOrder',
                    name: 'AddOrder',
                    component: resolve => require(['@/pages/Ordering/AddOrder'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 管理者管理  manager
                {
                    path: '/home/manager/manager',
                    name: 'manager',
                    component: resolve => require(['@/pages/manager/manager'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 规则说明管理  rules
                {
                    path: '/home/rules/rules',
                    name: 'rules',
                    component: resolve => require(['@/pages/rules/rules'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },

                // 留言管理MessageManage
                {
                    path: '/home/MessageManage',
                    name: 'MessageManage',
                    component: resolve => require(['@/pages/MessageManage/MessageManage'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 添加留言AddMessage
                {
                    path: '/home/AddMessage',
                    name: 'AddMessage',
                    component: resolve => require(['@/pages/MessageManage/AddMessage'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                     }
                },
                // 积分管理     pointManagement
                {
                    path: '/home/pointManagement',
                    name: 'pointManagement',
                    component: resolve => require(['@/pages/pointManagement/pointManagement'], resolve),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    }
                },
               
            ]
        }
    ]
})


// 进入页面前的路由判断
// router.beforeEach((to, from, next) => {

//     if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
//         var mytoken = store.state.token;
//         var localStorage =window.localStorage.getItem('token');

//         if(!mytoken && !localStorage){
//             next({
//             path: '/login',
//             query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }else{
//             next();
//         }
//     }else {
//       next();
//     }
//   });


 export default router;