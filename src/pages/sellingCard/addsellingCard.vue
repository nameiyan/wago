<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>添加销售名片</span>
            </div>
        </div>
        <div class="manege-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="cardName">
                    <el-input v-model="ruleForm.cardName"></el-input>
                </el-form-item>

                <el-form-item label="公司名称" prop="cardMingcheng">
                    <el-input v-model="ruleForm.cardMingcheng"></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="cardPhone">
                    <el-input v-model="ruleForm.cardPhone"></el-input>
                </el-form-item>

                <el-form-item label="微信号" prop="cardVx">
                    <el-input v-model="ruleForm.cardVx"></el-input>
                </el-form-item>

                <el-form-item label="地址" prop="cardAddress">
                    <el-input v-model="ruleForm.cardAddress"></el-input>
                </el-form-item>

                <el-form-item label="负责区域" prop="cardResponsiblearea">
                    <el-input v-model="ruleForm.cardResponsiblearea"></el-input>
                </el-form-item>
                
                <el-form-item  label="是否为分公司" prop="cardStatus">
                <!-- 1：分公司    2：总公司 -->
                    <el-radio v-model="ruleForm.cardStatus" label="1">是</el-radio>   
                    <el-radio v-model="ruleForm.cardStatus" label="2">否</el-radio>
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
import {validateMobile} from '../../assets/javascript/validate.js';
    export default {
        name: "sellingCard",
        data(){
            return{
                //    表单
                ruleForm: {
                    cardName: '',
                    cardMingcheng: '',
                    cardPhone: '',
                    cardVx: '',
                    cardAddress: '',
                    cardResponsiblearea: '',
                    cardStatus: '1',
                },
                rules: {
                    cardName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到10 个字符', trigger: 'blur' }
                    ],
                    cardMingcheng: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    cardPhone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }   //手机号验证
                    ],
                    cardVx: [
                        { required: true, message: '请输入微信号', trigger: 'blur' },
                    ],
                    cardAddress: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                    ],
                    cardResponsiblearea: [
                        { required: true, message: '请输入负责区域', trigger: 'blur' },
                    ],
                    cardStatus: [
                        { required: true, message: '请选择是否为子公司', trigger: 'change' }
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
                var that = this
                var mydata = that.ruleForm
                console.log('mydata',mydata)
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios({
                            url:'/businessCard/add',
                            data:mydata,
                            method:'put'
                        }).then(function (res) {
                            console.log(res.data)
                            if(res.data.flag){
                                that.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                that.$router.push({name:'sellingCard'}) 
                            }else{
                                that.$message({
                                    type: 'error',
                                    message: '添加失败!'
                                });
                            }
                        })
                        .catch(function (error) {
                            
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            // 清除表单数据
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },




            // 分页的页数
            changePage(page) {
                console.log('page',page)
                this.nowpage = page;
                this.getsellData();
            },
            // 分页的每页有多少条数据
            changeSize(pagesize) {
                console.log('pagesize',pagesize)
                this.nowpageSize = pagesize;
                this.nowpage = 1;
                this.getsellData();
            },
           
              
        }
    }
    
</script>
<style>
    
</style>
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
        padding: 30px;
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
</style>
