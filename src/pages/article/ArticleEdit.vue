<template>
    <div class="no-msg top">


        <div class="manege-content">


            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="题目" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="subtitle">
                    <el-input v-model="ruleForm.subtitle"></el-input>
                </el-form-item>
                <el-form-item label="文章类型" prop="typeid">
                        <el-select v-model="ruleForm.typeid" clearable placeholder="请选择文章类型">
                        <el-option
                            v-for="item in options"
                            :key="item.typeid"
                            :label="item.typeName"
                            :value="item.typeid">
                        </el-option>
                        
                    </el-select>
                </el-form-item>
                
                <el-form-item label="图片" prop="url">
                    
                    <div v-if="ruleForm.url.length > 0">
                        <img class="img" :src="ruleForm.url" alt="" style="height:100px;width:100px">
                    </div>
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
            </el-form>
           

           <!-- safetyContent -->
           <!-- <video autoplay src="https://fluploadvideo.oss-cn-beijing.aliyuncs.com/studio_course/20200714154033.mp4"></video>  -->



            

           
            <quill-editor ref="myQuillEditor" 
                class="myQuillEditor"
                v-model="content" 
                :options="quillConfig" >
                <img id='contentPic'  :src='imgUrl'/>
                <video id='contentVid' :src="videoUrl"></video>
            </quill-editor>
            <el-button type="primary" @click="searchArticleName()">提交</el-button>



             <div style="display:flex;justify-content:flex-end;padding:10px 0">
                <input type='file' @change="update" ref='contentUpload' id='avatar-uploader' />
                <input type='file' @change="updateVideo($event)" ref='videoUpload' id='video-uploader'/>
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



import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
import { quillEditor, Quill } from 'vue-quill-editor'
// import { container, ImageExtend } from 'quill-image-extend-module'

import { container, addQuillTitle } from 'quill-video-image-module'
import { ImageExtend, QuillWatch } from 'quill-video-image-module/quill-image-module'
import { VideoExtend, QuillVideoWatch } from 'quill-video-image-module/quill-video-module'

// import ImageResize from 'quill-image-resize-module'

// 引入video模块并注册
import video from 'quill-video-image-module/video'

Quill.register(video, true)

//   Quill.register('modules/ImageResize', ImageResize)
  Quill.register('modules/ImageExtend', ImageExtend)
  Quill.register('modules/VideoExtend', VideoExtend)
// import quillConfig from '../../../config/quill-config' 



    export default {
        name: "ArticleEdit",
        data(){
           return  {


                dataList:'',    //从文章页面传递过来的数据  对应条
            //    图片上传
                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                imgName:'',        //图片的url
               
                content: '',
                imgUrl:'',
                videoUrl:'',//富文本中视频的url
                editorOption: {},
                quillOption: '',
                quillConfig:{},
                ruleForm: {
                    title: '',
                    subtitle: '',
                    url:'',
                    typeid: '',    //文章分类的id
                    quan: 1,//计数器
                },
                rules: {
                    title: [
                        { required: true, message: '请输入题目', trigger: 'blur' }
                    ],
                    subtitle: [
                        { required: true, message: '请填写副标题', trigger: 'blur' }
                    ],
                    typeid:[
                        { required: true, message: '请上传选择分类', trigger: 'blur' }
                    ],
                    url:[
                        { required: true, message: '请上传图片', trigger: 'blur' }
                    ],
                },
                myfilename:'',
                options: [],
               
           }
        },
        created(){
            // console.log('数据',this.$store.state.articleEditData)
            this.searchArticleContent()
            // console.log(container, ImageExtend,886)
            this.actionUrl = '/item/upload';
            this.quillConfig = {
			modules: {
				ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入 
					name: 'imgFile',  // 图片参数名
					size: 1,  // 可选参数 图片大小，单位为M，1M = 1024kb
					action: this.actionUrl,  // 服务器地址, 如果action为空，则采用base64插入图片
					// response 为一个函数用来获取服务器返回的具体图片地址
					// 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
					// 则 return res.data.url
					response: (res) => {
						return res.data
					},
					headers: (xhr) => {
					// xhr.setRequestHeader('myHeader','myValue')
					},  // 可选参数 设置请求头部
                },
                VideoExtend: {
                    loading: true,
                    name: 'img',
                    size: 100, // 可选参数 视频大小，单位为M，1M = 1024kb
                    action: 'https://fluploadvideo.oss-cn-beijing.aliyuncs.com/studio_course/', // 视频上传接口
                    headers: (xhr) => {
                        // set custom token(optional)
                    },
                    response: (res) => {
                        // video uploaded path
                        // custom your own
                        return res.data.url;
                    },
                    sizeError: () => {
                        alert('视频不能大于100M')
                    }
                },
				 toolbar: {
                     container:[
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{'header': 1}, {'header': 2}],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'script': 'sub'}, {'script': 'super'}],
                        [{'indent': '-1'}, {'indent': '+1'}],
                        [{'direction': 'rtl'}],
                        [{'size': ['small', false, 'large', 'huge']}],
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        [{'color': []}, {'background': []}],
                        [{'font': []}],
                        [{'align': []}],
                        ['clean'],
                        ['link', 'image', 'video']
                    ],
					handlers: {
						'image': function (value) {  //劫持quill自身的文件上传，用原生替换
                            if (value) {
                                document.querySelector('#avatar-uploader').click()
                            } else {
                                this.quill.format('image', false);
                            }
                        },
                        'video':function(value){
                        //当点击视频上传时，value会变为true
                        if (value) {
                            // 触发上传
                            document.querySelector('#video-uploader').click()
                            console.log('触发上传视频')
                        } else {
                            this.quill.format('video', false);
                        }
                    }
					}
				}
			}
		}
        },
        components: {
            quillEditor
        },
        computed: {
            
        },
        mounted(){
            this.getAllcategorize()
        },
        methods: {
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
                    // console.log('查询分类',res.data.data.list)
                    that.options = res.data.data.list
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 获取文章内容
            searchArticleContent(){
                
                var that =this;
                var myid = this.$store.state.articleEditData.id
                console.log('myid',myid)
                this.$axios({
                    url: '/safety/selectById',
                    method: 'post',
                    data: {
                        id:myid
                    }
                }).then((res)=>{
                    console.log('res',res)
                    if(res.data.flag){
                        that.ruleForm = res.data.data;
                        that.content = JSON.parse(res.data.data.safetyContent)
                    }
                    
                    console.log('re.data.data',re.data.data)
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
                // console.log('form',form)
                this.$axios({
                    url: '/tryOut/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    console.log('rererere',re)
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




            //编辑后上传数据
            searchArticleName(){
                // 获取当前时间戳
                var that = this
                var timestamp = (new Date()).valueOf();  
                var content = {
                    id:that.ruleForm.id,
                    title:that.ruleForm.title,
                    subtitle:that.ruleForm.subtitle,
                    safetyContent:JSON.stringify(this.$refs.myQuillEditor.value),
                    url:that.imgName != '' ? that.imgName : that.ruleForm.url,
                    typeid:that.ruleForm.typeid,
                    quan:that.ruleForm.quan,
                    views:'',
                    createTime:timestamp
                }
                console.log('that.ruleForm.typeid',that.ruleForm.typeid)
                console.log('that.imgName',that.imgName)
                this.$axios({
                    url: '/safety/update',
                    method: 'post',
                    data: content
                }).then((res)=>{
                   if(res.data.flag){
                        that.$message.success('文章添加成功！')
                        that.$router.push({name: 'Article'});
                   }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 编辑后数据提交
            // submit () {
            //     var mydata = {
            //         id: this.ruleForm.id,
            //         name: this.ruleForm.name,
            //         author:this.ruleForm.author,
            //         create_time:this.ruleForm.create_time,
            //         update_time:Date.parse(new Date()),
            //         fileName:this.myfilename,
            //         category_id:this.value,
            //     }
            //     console.log('mydata',mydata)
            //     this.$axios({
            //         url: '/article/update',
            //         method: 'post',
            //         data: mydata,
            //     }).then((re)=>{
            //          this.$message({
            //                 type: 'success',
            //                 message: '修改成功!'
            //             });
            //         this.$router.push({name:'Article'})
            //     }).catch((err)=>{
            //         console.log(err)
            //     })
            // },
            update(){
                let inputDOM = this.$refs.contentUpload;
                this.file = inputDOM.files[0];
                var formdata = new FormData();
                // console.log('111111111111',document.getElementById("avatar-uploader").files[0])
                formdata.append('imgFile',document.getElementById("avatar-uploader").files[0]);
                // console.log('formdata',formdata)
                this.$axios({
                    url: this.actionUrl,
                    method: 'post',
                    data: formdata,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    this.imgUrl = re.data.data.url
                    // console.log(this.imgUrl )
                    let quill = this.$refs.myQuillEditor.quill;
                    // console.log(this.$refs.myQuillEditor,145)
                    const range = quill.getSelection();
                    if(range){
                        quill.insertEmbed(range.index, 'image',this.imgUrl); 
                    }  
                    quill.setSelection(quill.getSelection().index+1)
                }).catch((err)=>{
                    console.log(err)
                })
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
</style>
