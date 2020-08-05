<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>添加销售名片</span>
            </div>
        </div>
        <div class="manege-content">
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">

                <el-form-item label="是否为分公司" >
                <!-- 1：分公司    2：总公司 -->
                    <el-radio v-model="ruleForm.cardStatus" label="1" @change="companyStatus($event)">是</el-radio>   
                    <el-radio v-model="ruleForm.cardStatus" label="2" @change="companyStatus($event)">否</el-radio>
                </el-form-item>

                <el-form-item label="姓名">
                    <el-input v-model="ruleForm.cardName"></el-input>
                </el-form-item>

                <el-form-item label="公司名称">
                    <el-input v-model="ruleForm.cardMingcheng"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="ruleForm.cardPassword"></el-input>
                </el-form-item>

                <el-form-item v-if="!zongshow" label="座机号">
                    <el-input v-model="ruleForm.cardPhone"></el-input>
                </el-form-item>

                <el-form-item v-if="zongshow" label="手机号">
                    <el-input v-model="ruleForm.cardPhone"></el-input>
                </el-form-item>

                <el-form-item label="微信号">
                    <el-input v-model="ruleForm.cardVx"></el-input>
                </el-form-item>

                <el-form-item label="地址">
                    <el-input v-model="ruleForm.cardAddress"></el-input>
                </el-form-item>

                <el-form-item label="负责区域">
                    <el-input v-model="ruleForm.cardResponsiblearea"></el-input>
                </el-form-item>
                
                <el-form-item label="权重">
                    <el-input-number v-model="ruleForm.cardQuan" @change="handleChange" size="small" :min="1" :max="999999" label="权重"></el-input-number>
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
                    cardPassword:'',
                    cardQuan:''
                },
                zongshow:false,   //显示总公司的座机
                
            }
        },
        
        created(){
           
        },
        mounted(){
            
        },
        methods: {
            // 总公司和分公司的手机号隐藏显示
            companyStatus(){
                console.log('ruleForm.cardStatus',this.ruleForm.cardStatus)
                if(this.ruleForm.cardStatus == 1){
                    // 座机号
                    this.zongshow = false
                    this.cardPhone = ''
                }else if(this.ruleForm.cardStatus == 2){
                    // 手机号
                    this.zongshow = true
                    this.cardPhone = ''
                }
            },
            submitForm(formName) {
                var that = this
                var mydata = that.ruleForm
                console.log('mydata',mydata)
                
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
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
                    // } else {
                    //     console.log('error submit!!');
                    //     return false;
                    // }
                // });
                
            },
            // 清除表单数据
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            // 权重
            handleChange(value) {
                console.log(value);
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
