<template>
    <div class="hj-login">
        <div class="content">
            <p class="welcome">Hello,WelCome back !</p>
            <p class="title">后台管理中心</p>
   
        </div>
        <el-form class="hj-login-form" @keyup.enter="hjSubmite('user')" 
                ref="user"
                :model="user"
                :rules="rules2"
            >
                <div>
                    <div class="login" prop="name">
                        <img src="../assets/images/user.png" alt="">
                        <input type="text" placeholder="请输入登录账号" class="hj-ipt" v-model="user.username"/>
                    </div>
                    <div class="login" prop="pas">
                        <img src="../assets/images/pas.png" alt="">
                        <input type="password" placeholder="请输入登录账号" class="hj-ipt" v-model="user.password"/>
                    </div>
                    <div class="login">
                        <el-input type="text" v-model="user.code" placeholder="请输入验证码">
                        <template slot="prepend">验证码</template>
                        <template slot="append">
                        <div class="login-code"  @click="refreshCode">
                            <Identify :identifyCode="identifyCode"></Identify>
                        </div>
                        </template>
                    </el-input>
                    </div>
                   
                </div>
                    
                <el-button class="hj-btn" @click="hjSubmite('user')">登录</el-button>
                <!-- <el-button style="margin-left:50%;margin-top:15px" @click="toregiste">没有登录账号，请注册</el-button> -->
        </el-form>
        <div class="bottom">
            <p>天津孚莱科技有限公司版权所有</p>
        </div>
    </div>
</template>
<script>
    import Identify from '../components/Identify.vue'
    import {validateNull, validateLength, validateSpace, validateSpecial} from '../assets/javascript/validate.js';
    export default {
        name: "login",
        components: {
            Identify
        },
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    code: ""
                },
                identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
                identifyCode: '',
                rules2: {   // 表单验条件
                    name: [
                        {validator: validateNull, trigger: 'blur'},//表单验证填写（必填项不能为空）
                        {validator: validateLength, trigger: 'blur'},//表单验证填写（长度验证
                        {validator: validateSpace, trigger: 'blur'},//表单中出现空格验证
                        {validator: validateSpecial, trigger: 'blur'}// 表单中输入中出现特殊字符
                    ],
                    pas: [
                        {validator: validateNull, trigger: 'blur'},
                        {validator: validateLength, trigger: 'blur'},
                        {validator: validateSpace, trigger: 'blur'}
                    ],
                    code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
                }
            }
        },
        created(){
            
        },
        mounted () {
            // 初始化验证码
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        methods: {
            // // 跳转到注册页面
            // toregiste(){
            //     // console.log('1111111')
            //     this.$router.push({name:'Register'}) 
            // },
            // 重置验证码
            refreshCode () {
                this.identifyCode = ''
                this.makeCode(this.identifyCodes, 4)
            },
            makeCode (o, l) {
                for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
                }
            },
            randomNum (min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            // 提交登录信息
            hjSubmite(formName) {
                // 验证验证码
                 if (this.user.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
                    this.$message.error('请填写正确验证码')
                    this.refreshCode()
                    return
                }
                this.$refs.user.validate(valid => {
                    if (valid) {
                       var data = '/user/login?userName=' + this.user.username +'&userPassword=' + this.user.password;
                        
                        var vm = this;
                        this.$axios.post(data).then(function (response) {
                            var res = response;
                            var userId = res.data.data.userId;
                            var homeRole = res.data.data.roleId
                            console.log('用户角色id',homeRole)
                            // 存储token
                            var msn = res.data.message;
                            vm.$store.commit('changeToken',msn)   //存储token
                            vm.$store.commit('userId',userId)     //存储userId
                            window.localStorage.setItem('token', msn)   //将token存到本地
                            window.localStorage.setItem('userId', userId)    //将用户的userId存到本地
                            window.localStorage.setItem('homeRole', homeRole) //homeRole将用户的角色存储到本地
                            if(res.data.flag){
                                console.log('登录成功')
                                vm.$router.push({name:'limitList'}) 
                            }else{
                                this.$message.error('登录失败')
                                // this.$message.error("请输入正确用户名和密码！");
                            }
                        })
                        .catch(function (error) {
                           vm.$message.error("请输入正确用户名和密码！");
                        });
                    } else {
                        // 登录表单校验失败
                        this.$message.error("表单校验失败");
                    }
                });

                // this.$router.push({name: 'Home' });
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
        height: 380px;
        position: absolute;
        left: 50%;
        /* top: 34.1%; */
        margin-left: -260.5px;
        margin-top: -163px;
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
    .hj-ipt{
        border: none;
        height:40px;
        width: 414px;
        outline: none;
        margin: 3px;
    }
    .login:first-child{
        margin-top: 55px;
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
</style>
