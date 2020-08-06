<template>
    <div class="no-msg top">
       <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>用户管理</span>
            </div>
        </div>
        <div class="manege-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入管理者名称"></el-input>
                </el-form-item>

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password1">
                    <el-input v-model="ruleForm.password1" placeholder="请再次输入密码"></el-input>
                </el-form-item>
               
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>

<script>
    export default {
        name: "addManager",
        data(){
            return{
                ruleForm: {
                    name:'',
                    username:'',
                    password:'',
                    password1:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入管理者名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    password1: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                   
                }
            }
        },
        created(){
            
        },
        mounted(){
            
        },
        methods: {
           submitForm(formName) {
               console.log('ruleForm',this.ruleForm)
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.ruleForm.password != this.ruleForm.password1){
                        this.$message({
                            message: '两次密码输入不一致,请重新输入密码！',
                            type: 'error'
                        })
                    }else{
                        var that = this
                        var mydata = {
                            username:this.ruleForm.username,
                            password:this.ruleForm.password,
                            name:this.ruleForm.name
                        }
                        that.$axios({
                            url: '/admin/add',
                            method: 'post',
                            data: mydata,
                        }).then((res)=>{
                            if(res.data.flag){
                                that.$message.success('添加管理者成功');
                                that.$router.push('/home/manager/manager');
                            }else{
                                that.$message.error('添加管理者失败,请重新添加')
                            }
                        }).catch(function(error) {
                            console.log('err')
                        })
                    }
                    // alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>

    .no-msg{
        font-size: 16px;
        width:100%;
        height: 100%;
    }
    .top{
        /*color: #f57866;*/
        color: #409EFF;
    }
    .manege-content{
        background: #fff;
        margin: 37px 35px;
        padding: 20px;
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
    .search{
        display: flex;
        justify-content: space-between;

    }
    .toadd{
        height: 40px;
        width: 120px;
        margin: 20px 40px 0 0;
    }

    
</style>



