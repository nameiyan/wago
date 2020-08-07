<template>
    <div class="no-msg top">
        <div class="manege-content">



            <el-form label-width="100px" class="demo-ruleForm">
                
                <el-form-item label="规则名称">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                

                <!-- <el-form-item label="规则名称">
                        <el-select v-model="id" clearable placeholder="请选择规则名称">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> -->

            </el-form>

            <div>
           
            <quill-editor ref="myQuillEditor" 
                class="myQuillEditor"
                v-model="content" 
                :options="quillConfig" 
                
                >
                <!--@change="onEditorChange($event)" -->
                <!-- <img id='contentPic'  :src='imgUrl'/> -->
                <!-- <video id='contentVid' :src="videoUrl"></video> -->
                
            </quill-editor>
           


            
            </div>
            <div class="uploadbox">
                <!-- <input type='file' @change="update" ref='contentUpload' id='avatar-uploader'/> -->
                <!-- <input type='file' @change="updateVideo($event)" ref='videoUpload' id='video-uploader'/> -->
            </div>
            <el-button type="primary" @click="submit()" class="submit">提交</el-button>
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

import { quillEditor, Quill } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { container, addQuillTitle } from 'quill-video-image-module'
// import { ImageExtend, QuillWatch } from 'quill-video-image-module/quill-image-module'
// import { VideoExtend, QuillVideoWatch } from 'quill-video-image-module/quill-video-module'


// 图片拖拽上传
// import { ImageDrop } from 'quill-image-drop-module';

// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)

//quill图片可拖拽改变大小
// import ImageResize from 'quill-image-resize-module' // 引用，调整图片大小


// 引入video模块并注册
// import video from 'quill-video-image-module/video'

// Quill.register('modules/ImageExtend', ImageExtend)
// Quill.register('modules/VideoExtend', VideoExtend)
// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/imageResize', ImageResize)
// Quill.register(video, true)


//  import Quill from 'quill' 
//  let Parchment = Quill.import('parchment');
// // 设置行高为style 设置为class回显富文本时会失效   // class lineHeightAttributor
// extends Parchment.Attributor.Attribute {}  // Attribute // class
// lineHeightAttributor extends Parchment.Attributor.Class {}  // Class
// class lineHeightAttributor extends Parchment.Attributor.Style {}   //   tyle
   
   
   
//    let lineHeight = new lineHeightAttributor('lineHeight',
//    'line-height', {
//        scope: Parchment.Scope.INLINE,
//        whitelist: ['1', '1.1','1.2','1.3','1.4','1.5','1.6','1.7','1.8','1.9','2','2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8','2.9','3']
//    }); Quill.register({ "formats/lineHeight": lineHeight }, true);
//    export default lineHeight;





// 配置编辑器的字体
var fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];  
var Font = Quill.import('formats/font');  
Font.whitelist = fonts; //将字体加入到白名单 
Quill.register(Font, true);

// 引入富文本编辑栏的title提示
 // 标题
       const titleConfig=[
		    {Choice:'.ql-bold',title:'加粗'},
		    {Choice:'.ql-italic',title:'斜体'},
		    {Choice:'.ql-underline',title:'下划线'},
		    {Choice:'.ql-header',title:'段落格式'},
		    {Choice:'.ql-strike',title:'删除线'},
		    {Choice:'.ql-blockquote',title:'块引用'},
		    {Choice:'.ql-code',title:'插入代码'},
		    {Choice:'.ql-code-block',title:'插入代码段'},
		    {Choice:'.ql-font',title:'字体'},
		    {Choice:'.ql-size',title:'字体大小'},
		    {Choice:'.ql-list[value="ordered"]',title:'编号列表'},
		    {Choice:'.ql-list[value="bullet"]',title:'项目列表'},
		    {Choice:'.ql-direction',title:'文本方向'},
		    {Choice:'.ql-header[value="1"]',title:'h1'},
		    {Choice:'.ql-header[value="2"]',title:'h2'},
		    {Choice:'.ql-align',title:'对齐方式'},
		    {Choice:'.ql-color',title:'字体颜色'},
		    {Choice:'.ql-background',title:'背景颜色'},
		    {Choice:'.ql-image',title:'图像'},
		    {Choice:'.ql-video',title:'视频'},
		    {Choice:'.ql-link',title:'添加链接'},
		    {Choice:'.ql-formula',title:'插入公式'},
		    {Choice:'.ql-clean',title:'清除字体格式'},
		    {Choice:'.ql-script[value="sub"]',title:'下标'},
		    {Choice:'.ql-script[value="super"]',title:'上标'},
		    {Choice:'.ql-indent[value="-1"]',title:'向左缩进'},
		    {Choice:'.ql-indent[value="+1"]',title:'向右缩进'},
		    {Choice:'.ql-header .ql-picker-label',title:'标题大小'},
		    {Choice:'.ql-header .ql-picker-item[data-value="1"]',title:'标题一'},
		    {Choice:'.ql-header .ql-picker-item[data-value="2"]',title:'标题二'},
		    {Choice:'.ql-header .ql-picker-item[data-value="3"]',title:'标题三'},
		    {Choice:'.ql-header .ql-picker-item[data-value="4"]',title:'标题四'},
		    {Choice:'.ql-header .ql-picker-item[data-value="5"]',title:'标题五'},
		    {Choice:'.ql-header .ql-picker-item[data-value="6"]',title:'标题六'},
		    {Choice:'.ql-header .ql-picker-item:last-child',title:'标准'},
		    {Choice:'.ql-size .ql-picker-item[data-value="small"]',title:'小号'},
		    {Choice:'.ql-size .ql-picker-item[data-value="large"]',title:'大号'},
		    {Choice:'.ql-size .ql-picker-item[data-value="huge"]',title:'超大号'},
		    {Choice:'.ql-size .ql-picker-item:nth-child(2)',title:'标准'},
		    {Choice:'.ql-align .ql-picker-item:first-child',title:'居左对齐'},
		    {Choice:'.ql-align .ql-picker-item[data-value="center"]',title:'居中对齐'},
		    {Choice:'.ql-align .ql-picker-item[data-value="right"]',title:'居右对齐'},
		    {Choice:'.ql-align .ql-picker-item[data-value="justify"]',title:'两端对齐'}
		];




    export default {
        name: "addRules",
        components: {
            quillEditor
        },
        data(){
           return  {
                content:'', 
                name:'',
                
           }
        },
         created(){
            // console.log(container, ImageExtend,886)
            this.actionUrl = '/tryOut/upload';
            this.quillConfig = {
                placeholder:'请输入...',
                modules: {
                    //图片拖拽上传
                    // imageDrop:true, 
                    // imageResize: {},
                    //在富文本中修改图片的大小  
                   // 调整图片大小
					// imageResize: {
					// 	displayStyles: {
					// 		backgroundColor: 'black',
					// 		border: 'none',
					// 		color: 'white'
					// 	},
					// 	modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
					// },
                    toolbar: {
                        container:[
                            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                            ['blockquote', 'code-block'], //引用，代码块
                            [{'header': 1}, {'header': 2}],// 标题，键值对的形式；1、2表示字体大小
                            [{'list': 'ordered'}, {'list': 'bullet'}], //列表
                            [{'script': 'sub'}, {'script': 'super'}],// 上下标
                            [{'indent': '-1'}, {'indent': '+1'}],// 缩进
                            [{'direction': 'rtl'}],// 文本方向
                            [{'size':  ['12px', '14px', '16px' ,'18px']}],// 字体大小
                            // [{'size': fontSizeStyle.whitelist}],// 字体大小
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],//几级标题
                            [{'color': []}, {'background': []}],// 字体颜色，字体背景颜色
                            // [{'font': []}], //字体
                            [{ 'font': fonts }],       //字体，把上面定义的字体数组放进来
                            [{'align': []}], //对齐方式
                            ['clean'],//清除字体样式
                            // ['link', 'image', 'video'], //上传图片、上传视频
                            
                        ],
                        
                   
                    
                    handlers: {
                       
                    },
                    
                },
               
			}
		}
        },
        mounted:function(){
            autotip:{
			      document.getElementsByClassName('ql-editor')[0].dataset.placeholder=''
			      for(let item of titleConfig){
			          let tip = document.querySelector('.quill-editor '+ item.Choice)
			          if (!tip) continue
			          tip.setAttribute('title',item.title)
			      }
			  }
            // this.getAllcategorize()
        },
        methods: {
            onEditorChange(){
                console.log('this.content',this.content)
            },
             // 查询全部分类
            // getAllcategorize(){
            //     var that = this
            //     this.$axios({
            //         url: '/explain/getAll',
            //         method: 'post'
            //     }).then((res)=>{
            //         console.log('查询分类',res.data.data)
            //         if(res.data.flag){
            //             that.options = res.data.data
            //         }
                    
            //     }).catch((err)=>{
            //         console.log(err)
            //     })
            // },
            // 添加规则说明
            submit () {
                console.log('JSON.stringify(this.$refs.myQuillEditor._content)',this.$refs.myQuillEditor.value)
                // 获取当前时间戳
                var that = this
                var timestamp = (new Date()).valueOf();  
                var content = {
                    name:that.name,
                    context:JSON.stringify(this.$refs.myQuillEditor.value)
                }

                console.log('content',content)

               
                // alert('submit!');
                this.$axios({
                    url: '/explain/add',
                    method: 'post',
                    data: content,
                }).then(function (res) {
                     console.log('添加规则说明',res)
                    if(res.data.flag){
                        that.$message.success('规则添加成功！')
                        that.$router.push({name: 'rules'});
                    }
                })
                .catch(function (error) {
                     console.log(err)
                });
                   
               



            },


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
                // console.log(y);
                return ""+y+this.add0(m)+this.add0(d)+this.add0(h)+this.add0(mm)+this.add0(s);
            },
            add0(m){
                return m<10?'0'+m : m;
            },


            // 上传视频
            // updateVideo(e){
            //     // console.log('触发上传视频的方法',e)

            //     // 上传到腾讯云上

            //     var oFile=e.target.files[0];//获取文件流
            //     if (typeof (oFile) === 'undefined') {
            //         return;
            //     }
            //     var val= e.target.value;
            //     var suffix = val.substr(val.indexOf("."));
            //     var storeAs = "studio_course/" + this.timestamp() + suffix;
            //     client.multipartUpload(storeAs, oFile).then(function (result) {

            //     }).catch(function (err) {
            //         console.log(err);
            //     });

            //     let quill = this.$refs.myQuillEditor.quill;
            //     const range = quill.getSelection();





            //     // https://20200508-tvweb-1255674295.cos.ap-nanjing.myqcloud.com/

            //     // https://fluploadvideo.oss-cn-beijing.aliyuncs.com/studio_course/20200710165506.mp4
            //     // this.videoUrl = "https://fluploadvideo.oss-cn-beijing.aliyuncs.com/" + storeAs
            //     if(range){
            //         // quill.insertEmbed(range.index,'video',this.videoUrl); 
            //         // quill.insertEmbed('inserthtml', inHtml);
            //         // this.ueditor.execCommand('inserthtml', inHtml);
            //     }
            //     quill.setSelection(quill.getSelection().index+1)

            //     // console.log('quill',quill.editor)




            // },

            // quill   上传图片
            // update(){
                
            //     // console.log('9999999999999999999999999999999999')

            //     let inputDOM = this.$refs.contentUpload;
            //     this.file = inputDOM.files[0];
            //     var formdata = new FormData();
            //     // console.log('111111111111',document.getElementById("avatar-uploader").files[0])
            //     formdata.append('imgFile',document.getElementById("avatar-uploader").files[0]);
              
                
            //     var that = this
            //     this.$axios({
            //         url: that.actionUrl,
            //         method: 'post',
            //         data: formdata,
            //         headers: {'content-Type':'multipart/form-data'}
            //     }).then((re)=>{

            //         // console.log('图片返回数据',re.data.data)
                    
            //         that.imgUrl = re.data.data.url
            //         // console.log(this.imgUrl )
            //         let quill = that.$refs.myQuillEditor.quill;
            //         const range = quill.getSelection();
            //         if(range){
            //             quill.insertEmbed(range.index, 'image',that.imgUrl); 
            //         }  
            //         quill.setSelection(quill.getSelection().index+1)

            //     }).catch((err)=>{
            //         console.log(err)
            //     })
            // },

            // // 查询全部分类
            // getAllcategorize(){
            //     var that = this
            //     var mydata = {
            //         page:1,
            //         size:15
            //     }
            //     this.$axios({
            //         url: '/type/select',
            //         method: 'post',
            //         data: mydata,
            //     }).then((res)=>{
            //         // console.log('查询分类',res.data.data.list)
            //         that.options = res.data.data.list
            //     }).catch((err)=>{
            //         console.log(err)
            //     })
            // },

            // 上传图片与预览
            /* 图片上传 */
            // fileChangeback(e) {  // 加入图片
            //     // 图片预览部分
            //     var that = this
            //     var event = event || window.event;
            //     var file = event.target.files
            //     var leng=file.length;
            //     for(var i=0;i<leng;i++){
            //         var reader = new FileReader();    // 使用 FileReader 来获取图片路径及预览效果
            //         that.imgfilesback.push(file[i])
            //         reader.readAsDataURL(file[i]); 
            //         reader.onload =function(e){
            //         that.imgsback.push(e.target.result);   // base 64 图片地址形成预览                                 
            //         };                 
            //     }

            //     // 图片上传给后台部分
            //     var file = that.imgfilesback[0];
            //     let form = new FormData(); 
            //     form.append('imgFile',file);
            //     console.log('form',form)
            //     this.$axios({
            //         url: '/tryOut/upload',
            //         method: 'post',
            //         data: form,
            //         headers: {'content-Type':'multipart/form-data'}
            //     }).then((re)=>{
            //         that.imgName = re.data.data.url
            //         // console.log('that.imgName',that.imgName)
            //     }).catch((err)=>{
            //         console.log(err)
            //     })
            // },

            // //删除图片的方法
            // delimgback(i){
            //     this.imgfilesback.splice(i, 1)
            //     this.imgsback.splice(i, 1)
            // },

            


            




         
        }
    }
</script>
<style>
@import '../general/font';
   .el-scrollbar_wrap{
       overflow-x: hidden;
   }
   .ql-container{
        color:black
    }
    .el-scrollbar_wrap{
       overflow-x: hidden;
   }
   .ql-container{
         /* height: 700px !important; */
        color:black
    }
        .ql-toolbar.ql-snow{
        position: absolute;
        left: 0;
        top: 0;
    }
    .ql-editor{
        height:800px;
        overflow-y: auto;
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
        margin: 35px 45%;
    }
    .uploadbox{
        visibility: hidden;
        display:none;
    }
     .myQuillEditor{
        padding-top:60px;
        overflow: hidden;
        position: relative;
    }
</style>
