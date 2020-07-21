<template>
    <div class="no-msg top">
       <!-- <div class="manege-content">
           <div style="height:60px;background:red">
               <el-scrollbar style="height:100%">
                   <div style="wifth:70px;height:70px;border:solid"></div>
               </el-scrollbar>
           </div>
       </div> -->
       <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>添加类型</span>
            </div>
        </div>
        <div class="manege-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="类型" prop="typename">
                    <el-input v-model="ruleForm.typename"></el-input>
                </el-form-item>
                
                 <el-form-item label="图片">
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
            </el-form>
            <el-button type="primary" @click="submit('ruleForm')" class="submit">提交</el-button>
       </div>
    </div>
</template>

<script>
    export default {
        name: "AddArticletype",
        data(){
            return{
                 ruleForm: {
                    typename: '',
                    
                },
                rules: {
                        type: [
                            { required: true, message: '请输入用电安全类型', trigger: 'blur' }
                        ],
                        url: [
                            { required: true, message: '请选择图片', trigger: 'blur' }
                        ]
                    },
                    imgsback: [],      // 图片预览地址
                    imgfilesback: [],  // 图片原文件，上传到后台的数据
                    sizeback: 1 ,      // 限制上传数量
                    imgName:'',        //图片的url
            }
        },
        created(){
           
        },
        methods: {
            // 提交数据
            submit(ruleForm){
                var mydata = {
                    typeName:this.ruleForm.typename,
                    typeUrl:this.imgName
                }
                console.log('this.imgName',mydata)
                var that = this
                 this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios({
                            url: '/type/add',
                            method: 'post',
                            data: mydata,
                        }).then(function (res) {
                             console.log('添加文章',res.data)
                            if(res.data.flag){
                                that.$message.success('添加成功！')
                                that.$router.push({name: 'Articletype'});
                            }
                        })
                        .catch(function (error) {
                             console.log(err)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
               // 上传图片与预览
            /* 图片上传 */
            fileChangeback(e) {  // 加入图片
            console.log('111111111111111')
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
    }
    .top{
        /*color: #f57866;*/
        color: #409EFF;
    }
    .manege-content{
        background: #fff;
        margin: 37px 35px;
        padding: 40px;
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
    /*上传的图片的大小*/
    .img{
        height: 80px;
        width: 80px;
    }
    .submit{
        margin: 20px 45%;
    }
</style>
