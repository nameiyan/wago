<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>积分修改</span>
            </div>
        </div>
        <div class="manege-content">
            <el-form :model="point" ref="point" label-width="100px" class="demo-ruleForm">
                <el-form-item label="签到" prop="signed">
                    <el-input-number v-model="point.signed" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="分享:" prop="share">
                    <el-input-number v-model="point.share" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="扫二维码:" prop="scaning">
                   <el-input-number v-model="point.scaning" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="阅读文章:" prop="article">
                    <el-input-number v-model="point.article" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="阅读视频:" prop="video">
                    <el-input-number v-model="point.video" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="邀请好友:" prop="invite">
                    <el-input-number v-model="point.invite" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="完善资料:" prop="completeInformation">
                    <el-input-number v-model="point.completeInformation" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="产品评价:" prop="productEvaluation">
                    <el-input-number v-model="point.productEvaluation" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="新品适用反馈:" prop="feedback">
                    <el-input-number v-model="point.feedback" :min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item class="button">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交表单</el-button>
                </el-form-item>
            </el-form>


       </div>
    </div>
</template>

<script>
    export default {
        name: "changePoint",
        data(){
            return{
               point:{
                   signed:'0',
                   share:'0',
                   scaning:'0',
                   article:'0',
                   video:'0',
                   invite:'0',
                   completeInformation:'0',
                   productEvaluation:'0',
                   feedback:'0'
                }
            }
        },
        
        created(){
           
        },
        mounted(){
            // this.getOrderList();
        },
        methods: {
            // 提交表单
            submitForm(){
                console.log('point',this.point)
            },
            
        }
    }
    
</script>
<style>
    .no-msg .manege-content .el-pagination{
        padding: 15px 15px;
        margin-bottom: 150px;
        justify-content:flex-end !important;
    }
    .el-tabs__item{
        height: 50px;
        width: 120px;
        text-align: center;
        line-height: 50px;
    }
    .el-tabs__active-bar{
         width: 120px !important;
    }
    .el-input-number{
        margin-left: 5px;
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
        color: #606266;
        padding: 30px;
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
    
    .manege-content .button{
        margin-top: 30px;
        margin-left: 33%;
    }
</style>
