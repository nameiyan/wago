<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>添加意见反馈</span>
            </div>
        </div>
       <div class="manege-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="评价内容" prop="content">
                    <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item class="button">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>

<script type="text/javascript">

    export default {
        name: "AddOrder",
        data(){
            return{
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                ruleForm: {
                    content:''
                },
                rules: {
                    content: [
                        { required: true, message: '请输入评价内容', trigger: 'blur' },
                    ]
                }
            }
        },
        
        created(){
           
        },
        mounted(){
            
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var param = {
                            phone:'',
                            userid:'',
                            describe:this.ruleForm.content
                        };
                        console.log('param',param)
                        var vm = this;
                        this.$axios.put('/opinion/add',param).then(function (response) {
                            // vm.$router.push('/home/MessageManage')
                            // console.log('response',response)
                            if(response.data.flag){
                                vm.$router.push('/home/MessageManage')
                            }
                            vm.$message({
                                type: 'info',
                                message: response.data.message
                            }); 
                        })
                        .catch(function (error) {
                            console.log('catch')
                        });

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
<style>
    .no-msg .manege-content .el-pagination{
        padding: 15px 15px;
        margin-bottom: 150px;
        justify-content:flex-end !important;
    }
    .goodsList .el-form-item{
        height: 80px;
    }
</style>
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
        padding: 50px;
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
    .goodsList{
        border: 1px solid #eee;
        margin: 15px;
        padding: 15px;
    }
    .button{
        margin-left: 27%;
    }
</style>
