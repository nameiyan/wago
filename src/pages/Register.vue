<template>
    <div class="hj-login">
        <div class="content">
            <p class="welcome">Hello,WelCome back !</p>
            <p class="title">后台管理中心</p>
   
        </div>
        <el-form class="hj-login-form"
            :ref="user"
            :model="user"
            :rules="rules"
            label-width="100px"
            >
                <!-- 用户名、密码、角色、邮箱、电话、地址、用户ID、是否停用 -->
                <el-form-item style='margin-top:30px' label="用户名" prop="userName" >
                    <el-input v-model="user.userName" placeholder="请输入用户名" class="hj-ipt"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="user.password" placeholder="请输入登录密码" class="hj-ipt"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="passwordcheck" placeholder="请输入再次登录密码" class="hj-ipt"></el-input>
                </el-form-item>

                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="user.roleId" placeholder="请选择角色类型" style="margin-top:3px;margin-right:3px;width:346px">
                        <el-option label="观察者" value="1"></el-option>
                        <el-option label="销售人员" value="2"></el-option>
                        <el-option label="售后人员" value="3"></el-option>
                        <el-option label="服务人员" value="4"></el-option>
                        <el-option label="产品管理人员" value="5"></el-option>
                        <el-option label="外勤人员" value="6"></el-option>
                        <el-option label="账号管理人员" value="7"></el-option>
                        <el-option label="测试角色" value="8"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="邮箱" prop="userEMail">
                    <el-input v-model="user.userEMail" placeholder="请输入邮箱" class="hj-ipt"></el-input>
                </el-form-item>

                <el-form-item label="电话" prop="userPhone">
                    <el-input v-model="user.userPhone" placeholder="请输入电话" class="hj-ipt"></el-input>
                </el-form-item>

                <!-- <el-form-item label="地址" prop="userAdress">
                    <el-input v-model="user.password" placeholder="请输入地址" class="hj-ipt"></el-input>
                </el-form-item> -->
            

                <el-button class="hj-btn" @click="register">注册</el-button>
                <el-button class="tologin" @click="tologin">已有账号，去登录</el-button>
        </el-form>
        <div class="bottom">
            <p>天津孚莱科技有限公司版权所有</p>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name: "Register",
    data() {
        return {
            value: '',
            options: [{ //用户角色选择
                    value: '1',
                    label: '观察者'
                    }, {
                    value: '2',
                    label: '销售人员'
                    }, {
                    value: '3',
                    label: '售后人员'
                    }, {
                    value: '4',
                    label: '服务人员'
                    }, {
                    value: '5',
                    label: '产品管理人员'
                    },{
                    value: '6',
                    label: '外勤人员'
                    },{
                    value: '7',
                    label: '账号管理人员'
                    },{
                    value: '8',
                    label: '测试角色'
                    }],
            passwordcheck:'',//用户密码再次输入的验证字段
            user:{
                    userName:"",
                    password:"",
                    userEMail:"",
                    userPhone:"",
                    userAdress:"",
                    roleId:'',
                    states:1
            },
             rules: {
                    userName: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入用户密码', trigger: 'blur' },
                    ],
                    roleId: [
                        { required: true, message: '请选择角色类型', trigger: 'change' }
                    ],
                    userEMail: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    ],
                    userPhone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' }
                    ],
                 },
        }
    },
    created(){
        
    },
    mounted () {
        
    },
    methods: {
        // 已有账号，跳转到登录页
        tologin:function(){
            this.$router.push({name:'Login'}) 
        },
        register:function(){
            // console.log('this',this)
            var uname = this.user.userName;
            var psd = this.user.password;
            var psd2 = this.passwordcheck;
            var roid = this.user.roleId;
            var email = this.user.userEMail;
            var phone = this.user.userPhone;

            if(uname != '' && psd != '' && psd2 != '' && roid != '' && email != '' && phone != ''){
                console.log(123)
                if(this.user.password != this.passwordcheck){//两次密码比较验证
                    this.$message.error("两次密码输入不一致！");
                    return false;
                }else if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){//邮箱验证
                     this.$message.error("请输入正确邮箱地址！");
                }else if(phone.length == 11){
                    //手机号正则表达式如下，适用于联通 电信 移动 手机号
                    var reg =/^[1][3,4,5,7,8][0-9]{9}$/;
                    if(!reg.test(phone)){
                        this.$message.error("您输入的手机号不正确，请重新输入！");
                        return false;
                    }else{
                        this.request();
                    }
                }
            }else{
                this.$message.error("请输入完整信息！");
            }
        },
        request:function(){
              var data = {
                userName:this.user.userName,
                password:this.user.password,
                roleId:this.user.roleId,
                userEMail:this.user.userEMail,
                userPhone:this.user.userPhone,
                // userAdress:this.user.userAdress,
                // states:1
            };
            var vm = this;
            this.$axios.post('/user/reg',data).then(function (response) {
                if(response.data.flag){
                    vm.$message.success('注册成功');
                    vm.$router.push({name:'Login'}) 
                }else{
                    var msg = response.data.message;
                    vm.$message.error(msg);
                }
            })
            .catch(function (error) {
                
            });
        }
    }
}
</script>

<style scoped>
    .welcome,.title{
        text-align: center;
        color: #fff;
        font-family: 'myfont-light';
        /* font-family: 'Arial Narrow', Arial, sans-serif; */
    }
    .welcome{
        font-size: 59px;
        padding-top: 172px;
    }
    .title{
        font-size: 36px;
        padding-top: 60px;
        
    }
    .tologin{
       margin-left: 58%;
       margin-top: 15px;
    }
    .hj-login {
        width: 100%;
        height: 100%;
        /* background-color: #e4ddf77a; */
         position: relative;
    }
    .content{
        width: 100%;
        height: 700px;
        /* background: violet; */
        background: url('../assets/images/header-bg.png') no-repeat;
        background-size: cover;
    }
    .hj-login-form {
        background-color: #fff;
        width: 521px;
        height: 655px;
        position: absolute;
        left: 50%;
        /* top: 34.1%; */
        margin-left: -260.5px;
        margin-top: -330px;
        border-radius: 8px;
        background-color:rgb(255, 255, 255,0.3);
        box-shadow:0 3px 5px 0  #ECF0F3;
    }
    .login{
        width: 414px;
        height: 44px;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 8px;
        box-shadow:1px 2px #CCCCCC inset;
        border-bottom: 1px solid #F7F7F7;
        display: flex;
        margin-left: 53px;
    }
    .login .login_name{
        width: 100px;
        line-height: 40px;
        padding-left: 15px;
    }
    .hj-ipt{
        border: none;
        height:40px;
        width:346px;
        outline: none;
        margin: 3px;
    }
    .login:first-child{
        margin-top: 45px;
    }
    .hj-ipt::-webkit-input-placeholder {
    /* WebKit browsers */
        color: #999999;
    }
    .hj-ipt::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999999;
    }
    .hj-ipt:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #999999;
    }
    .login img{
        height: 14px;
        width: 16px;
        line-height: 44px;
        margin: 14px 28px;
    }
    .bottom{
        color: #1C345F;
        font-size: 7px;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -100px;
    }
    
    .hj-btn{
        background: #47A6FF;
        color: #FFFFFF;
        width: 414px;
        height: 56px;
        border-radius: 8px;
        margin-left: 53px;
        font-size: 18px;
    }
    .role{
        width: 521px;
    }
</style>
