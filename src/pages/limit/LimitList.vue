<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>权限管理</span>
            </div>
        </div>
       <div class="manege-content">
           <div class="content-title">
               <div class="title-left">员工角色分配</div>
               <div class="title-right">
                   <div class="title">
                       角色权限设置
                   </div>
               </div>
           </div>
           <div class="content-box" style="display:flex">

                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo content-left"
                   >
                    <el-menu-item-group class="role" v-for="(item,index) in role" :key="index">
                        <template slot="title">{{ item.name }}</template>
                        <el-menu-item class="rolename" v-for="(i,cindex) in role[index].childrole" :key="cindex">
                            <p style="padding-left:39px" @click="changeRole(i)">{{ i.rolename }}</p>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-menu>


               <!-- 员工角色分配 -->
                <!-- <div class="content-left">
                    <router-link tag="div" class="role" v-for="(item,index) in role" :key="index" to="/">
                        <span>{{ item.name }}</span>
                        <router-link tag="div" to="/" class="rolename" v-for="(i,cindex) in role[index].childrole" :key="cindex">
                            <p>{{ i.rolename }}</p>
                        </router-link>
                    </router-link>
                </div> -->
                <!-- 角色权限设置 -->
                <div class="content-right">
                    <div class="role-content">
                        <div class="role-left">
                            <img src="../../assets/images/roleheader.png" alt="" style="height:51px;width:51px;margin-right: 20px;float:left">
                            <div class="roledes">
                                <span>{{ thisrole }}</span>
                                <div class="des">预设所有对象的查看列表及详情权限</div>
                            </div>
                        </div>
                        <div class="role-botton">
                                <div class="button" @click="recover()">恢复</div>
                                <div class="button" style="background:#00A0E9" @click="changelimitSure()">修改权限</div>
                        </div>
                    </div>
                    <div class="rolebox">
                        <div class="box">
                            <p style="margin-left:45px">人员管理<span>>></span></p>
                            <div class="checkbox">
                                <el-checkbox-group v-model="checkList" class="checkbox_p" v-for="(item,index) in limitList" :key="index">
                                    <span class="checkbox_span" v-if="item.type == '1'">
                                        <el-checkbox :label="item.id" :checked="roleLimit.indexOf(item.id) == '-1' ? false:  true ">{{ item.name }}</el-checkbox>
                                        <!-- {{ (item.id).indexOf(roleLimit) == '-1' ? 'true' : 'false' }} -->
                                    </span>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="box">
                            <p style="margin-left:45px">操作型权限<span>>></span></p>
                            <div class="checkbox">
                                <el-checkbox-group v-model="checkList2" class="checkbox_p" v-for="(item,index) in limitList" :key="index">
                                    <span class="checkbox_span" v-if="item.type == '2'">
                                        <el-checkbox :label="item.id" :checked="roleLimit.indexOf(item.id) == '-1' ? false:  true ">{{ item.name }}</el-checkbox>
                                    </span>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
import store from '../../store/index'
    export default {
        name: "LimitList",
        inject:['reload'],
        data(){
            return{
                // adminName:'',
                tabPosition: 'left',
                role:[
                    {name:"管理角色",childrole:[
                                    {rolename:"管理员",id:1},
                                    {rolename:"观察者",id:2}
                                    ]
                    },
                    {name:"销售角色",childrole:[
                                    {rolename:"销售人员",id:3},
                                    {rolename:"售后人员",id:4},
                                    {rolename:"服务人员",id:5},
                                    {rolename:"产品管理员",id:6}
                                    ]
                    },
                    {name:"未分类角色",childrole:[
                                    {rolename:"外勤人员",id:7},
                                    {rolename:"账号管理人员",id:8},
                                    {rolename:"测试角色",id:9}
                                    ]
                    }
                ],
                id:window.localStorage.getItem('userId'),
                status:'1',
                limitList:[],
                checkList: [],
                checkList2: [],
                thisrole:'管理员',
                roleLimit:[],
            }
        },
        mounted(){
            // this.adminName = sessionStorage.getItem('admin_name')
            // 获取用户权限
            this.requireLimite();
           
        },
         methods: {
            
            //  通过左侧导航栏点击改变角色
            changeRole(role){
                // console.log('role',role)
                this.thisrole = role.rolename;
            },
           
            // 查询登录用户的权限
            requireLimite(){
                var vm = this;
                var data = '/power/findAll?user_id=' + this.id;
                this.$axios.post(data).then(function (response) {
                    var res = response.data
                    vm.limitList = res.power; 
                    vm.roleLimit = response.data.power_ids
                })
                .catch(function (error) {
                    
                });
            },
            routeto(formName) {
                this.$router.push({name: 'Login'});
                // console.log("输出")
            },
            // 权限停用
            stop(){
                var ta = { 
                    user_id:'2',
                    status:'2'
                }
                var data = '/user/updateStatus?user_id=' + this.id +'&status=' + this.status;
                this.$axios.post(data).then(function (response) {
                     
                })
                .catch(function (error) {
                    
                });
            },
            // 用户权限恢复
            recover(){
                this.reload();
//                 var ta = { 
//                     user_id:'2',
//                     status:'1'
//                 }
//                 var data = '/user/updateStatus?user_id=' + this.id +'&status=' + this.status;
//                 this.$axios.post(data).then(function (response) {
                    
//                 })
//                 .catch(function (error) {
                    
//                 });    
            },
            //修改用户权限的确定提交
            changelimitSure(){
                var list = this.checkList.concat(this.checkList2)
                var data = '/power/addPower?user_id=' + this.id +'&power_ids=' + list;
                var vm = this;
                this.$axios.post(data).then(function (response) {
                    // console.log('response',response)
                    vm.reload();
                    vm.$message({
                            type: 'success',
                            message: '权限修改成功!'
                        });
                })
                .catch(function (error) {
                    
                });    
            },
             
        }
    }
</script>

<style scoped>
    .no-msg{
        font-size: 16px;
        width:100%;
        height: 100%;
        overflow: hidden;

    }
    .top{
        /*color: #f57866;*/
        color: #409EFF;
    }
    .manege-content{
        background: #fff;
        margin: 37px 35px;
        position: relative;
    }
    .no-msg>.top-title{
       height: 66px;
       line-height: 66px;
       color: #00A0E9;
       padding-left: 32px;
       background: #fff;
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
    /* 权限管理的内容部分 */
    .manege-content .content-title{
        display: flex;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-bottom: 1px solid #D2D2D2;
        font-size: 14px;
    }
    .title-left{
        width: 225px;
        color: #5C5C5C;
    }
    .content-title .title-right .title{
        color: #47A6FF;
        width: 225px;
        border-bottom: 3px solid #47A6FF;
        text-align: center;
    }
    /* 标题下左侧角色栏部分 */
    .manege-content .content-left{
        width: 225px;
        font-size: 14px;
        border-right: 1px solid #D2D2D2;
        padding-top: 30px;
        overflow: hidden;
    }
    .content-left .role span{
        color: #9B9B9B;
        margin-left: 34px;
        margin-top: 47px;
        height: 42px;
        line-height: 42px;
    }
    .content-left .role .rolename{
        color: #5C5C5C;
        padding-left:69px;
        height: 42px;
        line-height: 42px;
        width: 225px;
    }
    /* 标题下右侧权限设置部分 */
    .content-right{
       width: 100%;
    }
    .content-right .role-content{
        display: flex;
        align-content: space-between;
        width: 100%;
        padding: 45px;
    }
    .content-right .role-content .role-left{
        width: 50%;
    }
    .content-right .role-content .roledes span{
        font-size: 18px;
        color: #3C3C3C;
    }
    .content-right .role-content .roledes .des{
        color:#818181
    }
    .content-right .role-content .role-botton{
        display: flex;
        margin-right: 20px;
    }
    .content-right .role-content .role-botton .button{
        width:160px;
        height:47px;
        background:rgba(242,155,118,1);
        border-radius:3px;
        text-align: center;
        line-height: 47px;
        color: #fff;
        margin-right: 34px;
    }
    /* 人员管理的选择 */
    .manege-content .content-box{
        padding-bottom: 20px;
    }
    .content-right .rolebox{
        display: flex;
        flex-direction:row;
        flex-wrap: wrap;
    }
    .content-right .checkbox{
        display: flex;
        flex-wrap: wrap;
        width:600px;
        height:170px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(210,210,210,1);
        padding: 20px;
        /* align-content: flex-start; */
    }
    .rolebox .content-right .checkbox .checkbox_p{
        background: saddlebrown;
        display: flex;
    }
    .rolebox .box{
        margin: 0 16px 0 4px;
    }
    /* .rolebox .box p{
        height: 30px;
        line-height: 30px;
    } */
    .router-link-active span{
        color: red;
        background: #3C3C3C;
    }
    .rolename:active{
        background: rgba(232,246,255,1) !important;
    }
    .checkbox_span{
        margin: 20px;
        padding: 20px;
    }
    .checkbox_span .el-checkbox{
        width: 100px;
    }
</style>
