<template>
    <div class="hj-home">
        <!-- 左侧导航栏 -->
        <div class="navigate">
            <div class="logo">
                <img src="../assets/images/logo.jpg" alt="">
            </div>
            <div class="outer">
                <el-scrollbar>
                    <div class="inner">
                         <el-col>
                        <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="rgb(255,255,255,0)"
                        text-color="#fff"
                        active-text-color="#FFFC00">
                        <!-- 销售名片管理 -->
                            <el-submenu index="1">
                                <template slot="title"><span>销售名片管理</span></template>
                                <el-menu-item index="1-1"  @click="goTo('/home/sellingCard')">
                                    <i class="el-icon-s-custom"></i>销售名片查看
                                </el-menu-item>
                                <el-menu-item index="1-2" @click="goTo('/home/sellingCard/addsellingCard')">
                                    <i class="el-icon-s-custom"></i>
                                    添加销售名片
                                </el-menu-item>
                            </el-submenu>
                        <!-- 商品管理 
                            <el-submenu index="2">
                                <template slot="title"><span>商品管理</span></template>
                                <el-menu-item index="2-1"  @click="goTo('/home/GoodsManage')">
                                    <i class="el-icon-coin"></i>商品管理
                                </el-menu-item>
                                <el-menu-item index="2-2" @click="goTo('/home/AddGoods')">
                                    <i class="el-icon-shopping-cart-full"></i>添加商品
                                </el-menu-item>
                            </el-submenu>-->
                         <!-- 文章管理 -->
                            <el-submenu index="3">
                                <template slot="title"><span>用电安全</span></template>
                                <el-menu-item index="3-1" @click="goTo('/home/Article')">
                                    <i class="el-icon-reading"></i>用电安全
                                </el-menu-item>
                                <el-menu-item index="3-2" @click="goTo('/home/Article/uploadVideo')">
                                    <i class="el-icon-reading"></i>上传视频
                                </el-menu-item>
                            </el-submenu>
                        <!-- 轮播图管理 carouselFigure-->
                             <el-submenu index="4">
                                <template slot="title"><span>轮播图管理</span></template>
                                <el-menu-item index="4-1" @click="goTo('/home/carouselFigure/carouselFigure')">
                                    <i class="el-icon-reading"></i>轮播图管理
                                </el-menu-item>
                                
                            </el-submenu>
                        <!-- 用户管理 userMessage-->
                            <el-submenu index="5">
                                <template slot="title"><span>用户管理</span></template>
                                <el-menu-item index="5-1" @click="goTo('/home/userMessage/userMessage')">
                                    <i class="el-icon-reading"></i>用户管理
                                </el-menu-item>
                                
                            </el-submenu>
                        <!-- 订单管理 
                            <el-submenu index="4">
                                <template slot="title"><span>订单管理</span></template>
                                <el-menu-item index="4-1" @click="goTo('/home/Ordering')">
                                    <i class="el-icon-reading"></i>订单管理
                                </el-menu-item>
                                <el-menu-item index="4-2" @click="goTo('/home/Ordering/AddOrder')">
                                    <i class="el-icon-reading"></i>添加订单
                                </el-menu-item>
                            </el-submenu>-->
                        <!-- 留言管理 
                            <el-submenu index="5">
                                <template slot="title"><span>意见反馈</span></template>
                                <el-menu-item index="5-1" @click="goTo('/home/MessageManage')">
                                    <i class="el-icon-reading"></i>意见反馈
                                </el-menu-item>
                                <el-menu-item index="5-2" @click="goTo('/home/AddMessage')">
                                    <i class="el-icon-reading"></i>添加意见反馈
                                </el-menu-item>
                            </el-submenu>-->
                         <!--     积分管理   pointManagement    -->
                            <!-- <el-submenu index="6">
                                <template slot="title"><span>积分管理</span></template>
                                <el-menu-item index="6-1" @click="goTo('/home/pointManagement')">
                                    <i class="el-icon-reading"></i>积分查询
                                </el-menu-item>
                                <el-menu-item index="6-2" @click="goTo('/home/changePoint')">
                                    <i class="el-icon-reading"></i>积分修改
                                </el-menu-item>
                            </el-submenu> -->
                        <!-- 权限管理 -->
                            <!-- <el-submenu index="1">
                                <template slot="title"><span>权限管理</span></template>
                                <el-menu-item index="1-1"  @click="goTo('/home/limitList')">
                                    <i class="el-icon-s-custom"></i>权限管理
                                </el-menu-item> -->
                                <!-- <el-menu-item index="1-2">
                                    <img src="../assets/images/roled.png" alt="" style="width:21px;height：19px">
                                    用户管理
                                </el-menu-item> -->
                            <!-- </el-submenu> -->
                        <!-- 商品管理 -->
                            <!-- <el-submenu index="2">
                                <template slot="title"><span>商品管理</span></template>
                                <el-menu-item index="2-1"  @click="goTo('/home/GoodsManage')">
                                    <i class="el-icon-coin"></i>商品管理
                                </el-menu-item>
                                <el-menu-item index="2-2" @click="goTo('/home/AddGoods')">
                                    <i class="el-icon-shopping-cart-full"></i>添加商品
                                </el-menu-item>
                            </el-submenu> -->
                           
                           
                            
                            <!-- 留言管理 -->
                            <!-- <el-submenu index="5">
                                <template slot="title"><span>留言管理</span></template>
                                <el-menu-item index="5-1" @click="goTo('/home/MessageManage')">
                                    <i class="el-icon-reading"></i>留言管理
                                </el-menu-item>
                                <el-menu-item index="5-2" @click="goTo('/home/AddMessage')">
                                    <i class="el-icon-reading"></i>添加留言
                                </el-menu-item>
                            </el-submenu> -->
                        </el-menu>
                    </el-col>
                   </div>
               </el-scrollbar>
            </div>
             
            </div>
        <!-- 右侧的内容 -->
        <div class="right">
            <!-- 右侧上部分的 -->
            <div class="right_top">
                <div class="header">
                    <div class="header-welcome">
                        <img src="../assets/images/catalogue.png" alt="" style="height:13px;width:17px;margin:0 20px 0 35px">
                        欢迎来到后台管理中心！
                    </div>
                    <div class="header-manage">
                        <div class="header-time flex">
                            <img src="../assets/images/time.png" alt="" style="height:15px;width:17px;margin:24px 15px">
                            <div><span style="margin-right:60px">{{ currentTime }}</span>    </div>
                        </div>
                        <div class="header-refresh flex" @click="refresh()">
                            <img src="../assets/images/refresh.png" alt="" style="height:13px;width:17px;margin:24px 15px">
                            <div>
                                <span style="margin-right:36px">刷新</span>
                            </div>
                        </div>
                        <div class="header-message flex">
                            <img src="../assets/images/message.png" alt="" style="height:18px;width:18px;margin:24px 15px">
                            <div>
                                <span style="margin-right:43px">消息</span>
                            </div>
                        </div>
                        <div class="header-maneger flex">
                            <img src="../assets/images/head.png" alt="" style="height:28px;width:29px;margin-right:15px;margin-top:17px">
                            <div>
                                <span style="margin-right:10px">{{ role }}</span>
                            </div>
                        </div>
                        <!-- <div>
                            <img src="../assets/images/down.png" alt="" style="margin:0 38px;height:7px;width:12px;line-height:60px">
                        </div> -->
                    </div>
                </div>
                <div class="title">
                    
                </div>
            </div>
            <el-main style="background:rgba(238,238,238,1);width:100%;height:100%">
                <router-view></router-view>
            </el-main>
        </div>
    </div>
</template>

<script>
    import limitList  from './limit/limitList.vue';
    import GoodsManage from './goods/GoodsManage.vue';
    export default {
        name: "home",
        inject:['reload'],
        data() {
            return{
                timer: "",//定义一个定时器的变量
                currentTime: new Date(), // 获取当前时间
                role:''
            }
        },
        filters: {

        },
        watch: {

        },
        created() {
                var vm = this;
                vm.timer = setInterval(() => {
                        var y = new Date().getFullYear();
                        var m = vm.appendZero(new Date().getMonth() + 1);
                        var d = vm.appendZero(new Date().getDate());
                        var ho = vm.appendZero(new Date().getHours());
                        var mi = vm.appendZero(new Date().getMinutes());
                    //修改数据date
                    vm.currentTime = y + "/" + m + '/' + d + ' ' + ho + ':' + mi;
                }, 1000);
                this.gethomeRole();
        },
        methods: {
            // 通过localstore获取用户的角色
            gethomeRole(){
                var homeRole = window.localStorage.getItem('homeRole')
                this.role = homeRole == 1 ? '管理员' : (homeRole == '2' ? '观察者' : (homeRole == '3' ? '销售人员' : (homeRole == '4' ? '售后人员':
                    (homeRole == '5' ? '服务人员' :( homeRole == '6' ? '产品管理员' : (homeRole == '7' ? '外勤人员' :(homeRole == '8' ? '账号管理人员' :(homeRole == '9' ? '测试人员' :'')))))
                )));
            },
             //时间过滤加0
            appendZero(obj) {
                if (obj < 10) {
                    return "0" + obj;
                } else {
                    return obj;
                }
            },
            // 路由跳转
            goTo(path) {
                this.$router.replace(path);
            },
            // 顶部刷新按钮进行刷新
            refresh(){
                this.reload();
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
        },
        components:{
            limitList,
            GoodsManage
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        }
    }
</script>

<style>
    .el-submenu__title i {
        color: #fff !important;
    }
    /* .el-menu-item {
        background-color: red !important;
    } */
    .el-menu-item .is-active{
        background: yellow !important;
    }
    .el-main{
        padding:0
    }
    .el-scrollbar {
        height: 100%;
    }
    .el-scrollbar__wrap {
        overflow: scroll;
        width: 110%;
        height: 120%;
    }
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #eee;
        border-radius: 3px;
    }
    .inner .el-menu-item.is-active {
        /* background-color: rgba(0, 0, 0, 0.1) !important; */
        background-color: rgba(179,255,249,0.38) !important;
        border-left: 7px solid #fff;
    }
    .el-submenu>.el-submenu__title .el-submenu__icon-arrow{
    -webkit-transform: rotateZ(-90deg); 
    -ms-transform: rotate(-90deg);
    transform: rotateZ(-90deg); 
    }
    .el-menu-item i{
        color: #fff;
    }
</style>
<style scoped>
    .hj-home{
        height: 100%;
        background:#FFFFFF;
        display: flex;
        overflow: hidden;
    }
    .logo{
        height: 163px;
        position: relative;
    }
    .logo img{
        height: 74px;
        width: 74px;
        border-radius: 50%;
        position: absolute;
        top: 49px;
        left: 50%;
        margin-left: -37px;
    }
    .navigate{
        width: 252px;
        height: 100%;
        background: -webkit-linear-gradient(#25C7FF, #3289CE 80%); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#25C7FF, #3289CE 80%); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#25C7FF , #3289CE 80%); /* Firefox 3.6 - 15 */
        background: linear-gradient(#25C7FF, #3289CE 80%); /* 标准的语法（必须放在最后） */
    }
    .right{
        width: 100%;
    }
   .header{
       display: flex;
       justify-content: space-between;
       width: 100%;
   }
   .right_top{
       display: flex;
       width: 100%;
       height: 60px;
       color: #636363;
       line-height: 60px;
   }
   .header-manage{
       display: flex;
   }
   .header-maneger{
       display: flex;
   }
   .title{
       height: 66px;
       line-height: 66px;
       color: #00A0E9;
       padding-left: 32px;
   }
   .titlelist{
        width: 129px;
        border-bottom: 3px solid #47A6FF;
        text-align: center;
        align-items: center;
   }
   .titlelist img{
        /* display:inline-block; */
        vertical-align:middle;
    }
    /* 消息小红点的展示 */
    .message-show{
        width:12px;
        height:12px;
        background:rgba(254,88,72,1);
        border-radius:50%;
        font-size:8px;
        font-family:Microsoft YaHei;
        font-weight:400;
        /* color:rgba(255,255,255,1); */
        line-height:50px;
        position: absolute;
        top: 20px;
        left: 25px;
    }
    .outer-container{
        overflow: hidden;
        height: 100%;
    }
</style>