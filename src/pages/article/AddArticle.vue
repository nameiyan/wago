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




            <input type='file' @change="update" ref='contentUpload' id='avatar-uploader'/>
            <input type='file' @change="updateVideo" ref='contentUpload' id='video-uploader'/>
            <quill-editor ref="myQuillEditor" 
                class="myQuillEditor"
                v-model="content" 
                :options="quillConfig" >
                <img id='contentPic'  :src='imgUrl'/>
            </quill-editor>



            




            <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>


// import { quillEditor } from 'vue-quill-editor'
import { quillEditor, Quill } from 'vue-quill-editor'
import {container, ImageExtend} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
// import quillConfig from '../../../config/quill-config' 
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



    export default {
        name: "AddArticle",
        components: {
            quillEditor
        },
        data(){
           return  {
                content:'<h1>555555555555555555555555<h1>',
                imgUrl:'',
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
                                console.log('上传视频')
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

            // 上传视频
            updateVideo(res,file){
                // 视频上传到腾讯云上
                var file = e.target.files[0];
                if (!file) return; // 分片上传文件
                var a = Math.random();
                cos.putObject(
                    {
                        Bucket,
                        Region,
                        // StorageClass: 'STANDARD',
                        Key: file.name,
                        Body: file,
                        onProgress: function(progressData, callback) {
                        
                        }
                    },
                    function(err, data) {
                        if(data.statusCode == 200){
                                Vue.prototype.$message({
                                    message: '上传成功',
                                    type: 'success'
                            })
                        }else{
                            Vue.prototype.$message({
                                    message: '上传失败',
                                    type: 'warning'
                            })
                        }
                    }
                );



                console.log('触发上传视频的方法1',res)
                console.log('触发上传视频的方法2',file)
                 // res为文件服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                // 如果上传成功
                if (res.code === 200) {
                    // 使用getSelection来获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入“video”或者“image”  第三个参数为服务器端返回的地址
                    quill.insertEmbed(length, "video", res.data);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                    console.log(this.content)
                } else {
                    this.$message.error("视频插入失败");
                }
                // loading动画消失
                this.quillUpdateImg = false;
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



            // quill
            update(){
                
                console.log('9999999999999999999999999999999999')

                let inputDOM = this.$refs.contentUpload;
                this.file = inputDOM.files[0];
                var formdata = new FormData();
                // console.log('111111111111',document.getElementById("avatar-uploader").files[0])
                formdata.append('imgFile',document.getElementById("avatar-uploader").files[0]);
                console.log('formdata',formdata)
                
                var that = this
                this.$axios({
                    url: that.actionUrl,
                    method: 'post',
                    data: formdata,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    that.imgUrl = re.data.data.url
                    // console.log(this.imgUrl )
                    let quill = that.$refs.myQuillEditor.quill;
                    // console.log(this.$refs.myQuillEditor,145)
                    const range = quill.getSelection();
                    if(range){
                        quill.insertEmbed(range.index, 'image',that.imgUrl); 
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
