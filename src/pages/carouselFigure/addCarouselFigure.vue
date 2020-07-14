<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>轮播图</span>
            </div>
        </div>
        <div class="manege-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="img">
                        <div v-if='imgsback.length>0' class="flex">
                            <div class="img-box" v-for="(item, i) in imgsback" :key='i' >
                                <img class="img" :src="item" alt=""> <span @click="delimgback(i)"><i class="el-icon-delete"></i></span>
                            </div>
                        </div>
                        <div class="img-file" v-if='imgsback.length < sizeback'>
                        <input type="file" id='files' @change='fileChangeback($event)'>
                                <label for="files"></label>
                        </div>
                    </el-form-item>
                    
                    <el-form-item label="是否显示" prop="status">
                        <el-radio v-model="ruleForm.status" label="1">是</el-radio>
                        <el-radio v-model="ruleForm.status" label="2">否</el-radio>
                    </el-form-item>

                    <el-form-item label="渠道" prop="cannel">
                        <el-radio v-model="ruleForm.cannel" label="1">首页轮播图</el-radio>
                        <el-radio v-model="ruleForm.cannel" label="2">用电安全轮播图</el-radio>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="but" type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                    </el-form-item>
                </el-form>
        </div>  
    </div>
</template>

<script>
    export default {
        name: "addCarouselFigure",
        data(){
            return{
                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                imgName:'',        //图片的url

                ruleForm: {
                    img:'',
                    status:'1',
                    cannel:'1'
                },
                rules:{
                    img:[],
                    status:[],
                    cancel:[]
                }
            }
        },
        
        created(){
           
        },
        mounted(){
            
        },
        methods: {
            submitForm(formName) {
                this.ruleForm.img = this.imgName
                console.log('submitFormsubmitForm',this.ruleForm)
                var that = this
                if(this.ruleForm.img.length > 0){
                    this.$axios({
                        url: '/lunbotu/add',
                        method: 'post',
                        data: this.ruleForm,
                    }).then((res)=>{
                        that.$message.success('添加成功')
                        that.$router.push({name:'carouselFigure'})
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                   this.$message.error('图片未上传成功')
                }
               
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 上传图片与预览
            /* 图片上传 */
            fileChangeback(e) {  // 加入图片
                // 图片预览部分
                var that = this
                var event = event || window.event;
                var file = event.target.files
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();    // 使用 FileReader 来获取图片路径及预览效果
                    that.imgfilesback.push(file[i])
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    that.imgsback.push(e.target.result);   // base 64 图片地址形成预览                                 
                    };                 
                }

                // 图片上传给后台部分
                var file = that.imgfilesback[0];
                let form = new FormData(); 
                form.append('imgFile',file);
                console.log('form',form)
                this.$axios({
                    url: '/tryOut/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    that.imgName = re.data.data.url
                    console.log('that.imgName',that.imgName)
                    that.$message.success('图片上传成功')
                }).catch((err)=>{
                    console.log(err)
                })
            },

            //删除图片的方法
            delimgback(i){
                this.imgfilesback.splice(i, 1)
                this.imgsback.splice(i, 1)
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
    .img{
        height: 100px;
        width: 100px;
    }
    .but{
        margin-left: 40%;
    }
</style>
