<template>
    <div class="no-msg top">
        <div class="manege-content">



            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                
                <el-form-item label="题目" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>

                <el-form-item label="副标题" prop="subtitle">
                    <el-input v-model="ruleForm.subtitle"></el-input>
                </el-form-item>
                
                <el-form-item label="文章类型" prop="typeid">
                        <el-select v-model="ruleForm.value" clearable placeholder="请选择文章类型">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.typeName"
                            :value="item.typeid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="图片" prop="url">
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

                <el-form-item label="权重" prop="quan">
                   <el-input-number v-model="ruleForm.quan" :min="1" :max="10000000" size="mini"></el-input-number>
                </el-form-item>

                 <el-form-item label="视频">
                   <div  class="fromitem">
                        <input class="video" type='file' @change="updateVideo($event)"/>

                        <div v-if="videoShow" >
                            <video autoplay :src="videoUrl"></video> 
                            <span @click="deleteVideo(i)"><i class="el-icon-delete"></i></span>
                        </div>
                        <!-- {{ videoUrl }}
                        <video :src="videoUrl"></video>
                        <video controls autoplay>
                            <source :src="videoUrl" type="video/mp4">
                            Your browser does not support the video tag.
                        </video> -->

                   </div>
                </el-form-item>

            </el-form>

            <div>
              
            <el-button type="primary" @click="submit('ruleForm')" class="submit">提交</el-button>
            </div>
            
            
        </div>
    </div>
</template>

<script>

import OSS from 'ali-oss'

var client = new OSS.Wrapper({
    region: 'oss-cn-beijing',
    // LTAIo0TudvEE7jJB
    accessKeyId: 'LTAIo0TudvEE7jJB',
    // EgBSBhBPG3c1yWzE3KA4QSpVaFQt92
    accessKeySecret: 'EgBSBhBPG3c1yWzE3KA4QSpVaFQt92',
    bucket: 'fluploadvideo'
});

    export default {
        name: "AddArticle",
        data(){
           return  {
                
                content:'',
                imgUrl:'',   //富文本中图片的url
                videoUrl:'',//富文本中视频的url
                editorOption: {},
               
                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                imgName:'',        //图片的url
               

                ruleForm: {
                    title: '',
                    subtitle: '',
                    url:'',
                    value: '',    //文章分类的id
                    quan: 1,//计数器  权重
                },
                rules: {
                    title: [
                        { required: true, message: '请输入题目', trigger: 'blur' }
                    ],
                    subtitle: [
                        { required: true, message: '请填写副标题', trigger: 'blur' }
                    ]
                },
                myfilename:'',
                options: [],
                videoShow:false,     
           }
        },
         created(){
           
        },
        mounted:function(){
            this.getAllcategorize()
        },
        methods: {
            
            /**
            * 生成文件名
            * @returns
            */
            timestamp(){
                var time = new Date();
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                console.log(y);
                return ""+y+this.add0(m)+this.add0(d)+this.add0(h)+this.add0(mm)+this.add0(s);
            },
            add0(m){
                return m<10?'0'+m : m;
            },


            // 上传视频
            updateVideo(e){
                console.log('触发上传视频的方法',e)

                // 上传到腾讯云上

                var oFile=e.target.files[0];//获取文件流
                if (typeof (oFile) === 'undefined') {
                    return;
                }
                var val= e.target.value;
                var suffix = val.substr(val.indexOf("."));
                // console.log('suffix',suffix)
                var storeAs = "studio_course/" + this.timestamp() + suffix;
                // console.log('storeAs',storeAs)
                client.multipartUpload(storeAs, oFile).then(function (result) {

                }).catch(function (err) {
                    console.log(err);
                });

                

                // https://20200508-tvweb-1255674295.cos.ap-nanjing.myqcloud.com/

                // https://fluploadvideo.oss-cn-beijing.aliyuncs.com/studio_course/20200710165506.mp4
                // 显示视频
                this.videoShow = true
                this.videoUrl = this.aliurl + storeAs

               

                console.log('this.aliurl',this.aliurl)
                console.log('this.videoUrl',this.videoUrl)
                



            },

            // 查询全部分类
            getAllcategorize(){
                var that = this
                var mydata = {
                    page:1,
                    size:15
                }
                this.$axios({
                    url: '/type/select',
                    method: 'post',
                    data: mydata,
                }).then((res)=>{
                    console.log('查询分类',res.data.data.list)
                    that.options = res.data.data.list
                }).catch((err)=>{
                    console.log(err)
                })
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
                }).catch((err)=>{
                    console.log(err)
                })
            },

            //删除图片的方法
            delimgback(i){
                this.imgfilesback.splice(i, 1)
                this.imgsback.splice(i, 1)
            },
            // 删除图片的方法
            deleteVideo(){
                this.videoUrl = ''
            },
            // 数据提交
            submit (ruleForm) {
                console.log('that.ruleForm',ruleForm)
                // 获取当前时间戳
                var that = this
                var timestamp = (new Date()).valueOf();  
                var content = {
                    title:that.ruleForm.title,
                    subtitle:that.ruleForm.subtitle,
                    url:that.imgName,
                    typeid:that.ruleForm.value,
                    quan:that.ruleForm.quan,
                    safetyContent:this.videoUrl,
                    views:'',
                    createTime:timestamp
                }

                console.log('content',content)

                 this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios({
                            url: '/safety/add',
                            method: 'post',
                            data: content,
                        }).then(function (res) {
                             console.log('添加文章',res)
                            if(res.data.flag){
                                that.$message.success('文章添加成功！')
                                that.$router.push({name: 'Article'});
                            }else{
                                 that.$message.error(res.data.message)
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



            




         
        }
    }
</script>
<style>
   .el-scrollbar_wrap{
       overflow-x: hidden;
   }
   .ql-container{
        height: 700px !important;
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
    /*上传的图片的大小*/
    .img{
        height: 80px;
        width: 80px;
    }
    .submit{
        margin: 20px 50%;
    }
    .video{
        margin-top: 10px;
    }
    .fromitem{
        display: flex;
        flex-direction: column;
    }
</style>
