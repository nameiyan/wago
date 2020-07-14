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

            </el-form>

            <div>

           
            <quill-editor ref="myQuillEditor" 
                class="myQuillEditor"
                v-model="content" 
                :options="quillConfig" >
                <img id='contentPic'  :src='imgUrl'/>
                <video id='contentVid' :src="videoUrl"></video>
            </quill-editor>
           


            




            <el-button type="primary" @click="submit('ruleForm')" class="submit">提交</el-button>
            </div>
            <input type='file' @change="update" ref='contentUpload' id='avatar-uploader'/>
            <input type='file' @change="updateVideo($event)" ref='videoUpload' id='video-uploader'/>
            <!--<img class="tempimg" :src="`https://20200508-tvweb-1255674295.cos.ap-nanjing.myqcloud.com/${item.qr_code}`"> -->
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
        name: "AddArticle",
        components: {
            quillEditor
        },
        data(){
           return  {
                content:'',
                imgUrl:'',   //富文本中图片的url
                videoUrl:'',//富文本中视频的url
                editorOption: {},
                quillOption: '',
                quillConfig:{},
                
                
                // quillOption: '',
                // quillConfig:{},

                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                imgName:'',        //图片的url
               

                ruleForm: {
                    title: '',
                    subtitle: '',
                    url:'',
                    value: '',    //文章分类的id
                    quan: 1,//计数器
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
                
           }
        },
         created(){
            // console.log(container, ImageExtend,886)
            this.actionUrl = '/tryOut/upload';
            this.quillConfig = {
			modules: {
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
				ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入 
					name: 'imgFile',  // 图片参数名
					size: 1,  // 可选参数 图片大小，单位为M，1M = 1024kb
					action: this.actionUrl,  // 服务器地址, 如果action为空，则采用base64插入图片
					// response 为一个函数用来获取服务器返回的具体图片地址
					// 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
					// 则 return res.data.url
					response: (res) => {
						return res.data.url
					},
					headers: (xhr) => {
					// xhr.setRequestHeader('myHeader','myValue')
                    },  // 可选参数 设置请求头部
                    start: () => {}, // 可选参数 自定义开始上传触发事件
                    end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
                    error: () => {}, // 可选参数 自定义网络错误触发的事件
                    change: () => {}, // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                    sizeError: () => {
                        alert('图片不能大于1M')
                    }
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
				 
				handlers: {
					'image': function (value) {  //劫持quill自身的文件上传，用原生替换
                        if (value) {
                            document.querySelector('#avatar-uploader').click()
                        } else {
                            this.quill.format('image', false);
                        }
                    },
                    // video: function() {
                    //     QuillVideoWatch.emit(this.quill.id)
                    //     console.log('this.quill.id',this.quill.id)
                    // },
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
                console.log('suffix',suffix)
                var storeAs = "studio_course/" + this.timestamp() + suffix;
                console.log('storeAs',storeAs)
                client.multipartUpload(storeAs, oFile).then(function (result) {

                }).catch(function (err) {
                    console.log(err);
                });

                let quill = this.$refs.myQuillEditor.quill;
                console.log(this.$refs.myQuillEditor,145)
                const range = quill.getSelection();

                // https://20200508-tvweb-1255674295.cos.ap-nanjing.myqcloud.com/

                // https://fluploadvideo.oss-cn-beijing.aliyuncs.com/studio_course/20200710165506.mp4
                this.videoUrl = "https://fluploadvideo.oss-cn-beijing.aliyuncs.com/" + storeAs
                console.log('this.videoUrl',this.videoUrl)
                if(range){
                    quill.insertEmbed(range.index,'video',this.videoUrl); 
                }
                quill.setSelection(quill.getSelection().index+1)


               



            },

            // quill   上传图片
            update(){
                
                console.log('9999999999999999999999999999999999')

                let inputDOM = this.$refs.contentUpload;
                this.file = inputDOM.files[0];
                var formdata = new FormData();
                // console.log('111111111111',document.getElementById("avatar-uploader").files[0])
                formdata.append('imgFile',document.getElementById("avatar-uploader").files[0]);
              
                
                var that = this
                this.$axios({
                    url: that.actionUrl,
                    method: 'post',
                    data: formdata,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{

                    console.log('re.data.data.url',re.data.data)
                    
                    that.imgUrl = re.data.data.url
                    // console.log(this.imgUrl )
                    let quill = that.$refs.myQuillEditor.quill;
                    const range = quill.getSelection();
                    if(range){
                        quill.insertEmbed(range.index, 'image',that.imgUrl); 
                    }  
                    quill.setSelection(quill.getSelection().index+1)

                    
                }).catch((err)=>{
                    console.log(err)
                })
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

            // 数据提交
            submit (ruleForm) {
                console.log('JSON.stringify(this.$refs.myQuillEditor._content)',this.$refs.myQuillEditor.value)
                // 获取当前时间戳
                var that = this
                var timestamp = (new Date()).valueOf();  
                var content = {
                    title:that.ruleForm.title,
                    subtitle:that.ruleForm.subtitle,
                    safetyContent:JSON.stringify(this.$refs.myQuillEditor.value),
                    url:that.imgName,
                    typeid:'123',
                    quan:that.ruleForm.quan,
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
</style>
