<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>添加商品</span>
            </div>
        </div>
       <div class="manege-content">
            <el-form :model="formLabelAlign" :rules="rules" ref="formLabelAlign" label-width="120px"   style="padding:30px;padding-right:50px">
                <el-form-item prop='productName' label="商品名称" >
                    <el-input v-model="formLabelAlign.product.productName" placeholder="请添加商品名称"></el-input>
                </el-form-item>

                <!--newProduct 1积分商城，2新品，3专属礼品 -->
                <el-form-item label="商品类型" prop="newProduct">
                    <el-select v-model="value" clearable placeholder="请选择商品类型">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                
                <!-- 数量  -->
                <el-form-item label="数量" prop="num">
                   <el-input-number size="small" v-model="formLabelAlign.product.num" 
                    :min="1" :max="99999999" label="请输入商品数量"></el-input-number>
                </el-form-item>
                
                <!-- 标题 -->
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formLabelAlign.product.title" placeholder="请添加商品标题"></el-input>
                </el-form-item>

                 <!-- 副标题 -->
                <el-form-item label="副标题" prop="subtitle">
                    <el-input v-model="formLabelAlign.product.subtitle" placeholder="请添加商品副标题"></el-input>
                </el-form-item>

                <!-- 描述 -->
                <el-form-item label="商品描述" prop="miaoshu">
                    <quill-editor ref="myQuillEditor" 
                        class="myQuillEditor"
                        v-model="content" 
                        :options="quillConfig"
                        >
                        <!--@change="onEditorChange($event)" -->
                        <img id='contentPic'  :src='imgUrl'/>
                        <video id='contentVid' :src="videoUrl"></video>
                        
                    </quill-editor>
                    <div class="uploadbox">
                        <input type='file' @change="update" ref='contentUpload' id='avatar-uploader'/>
                        <input type='file' @change="updateVideo($event)" ref='videoUpload' id='video-uploader'/>
                    </div>
                </el-form-item>

                <!-- 缩略图 -->
                <el-form-item label="缩略图" prop="thumbnail">
                    <div v-if='imgsback.length>0' class="flex">
                        <div class="img-box" v-for="(item, i) in imgsback" :key='i' >
                            <img class="img" :src="item" alt="" style="height:150px;width:150px"> <span @click="delimgback(i)"><i class="el-icon-delete"></i></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="img-file" v-if='imgsback.length < sizeback'>
                        <input type="file" id='files' @change='fileChangeback($event)'>
                        <label for="files"></label>
                    </div>
                </el-form-item>

                <!-- <el-form-item label="简介" prop="introduce">
                    <el-input v-model="formLabelAlign.introduce" placeholder="请添加商品简介"></el-input>
                </el-form-item> -->
                
                <!-- 积分  正数  需要加 -  -->
                <el-form-item label="抵扣积分" prop="jifen">
                    <el-input-number size="small" v-model="formLabelAlign.product.jifen" 
                        :min="1" :max="99999999" label="请输入兑换所需积分"></el-input-number>
                </el-form-item>
                
                <!-- 状态  -->
                <el-form-item label="状态" prop="status">
                   <template>
                        <el-radio v-model="formLabelAlign.product.status" label="1">上架</el-radio>
                        <el-radio v-model="formLabelAlign.product.status" label="2">下架</el-radio>
                    </template>
                </el-form-item>

                <!-- 商品状态  -->
                <el-form-item label="商品状态" prop="productStatus">
                   <template>
                        <el-radio v-model="formLabelAlign.product.productstatus" label="0">未开始</el-radio>
                        <el-radio v-model="formLabelAlign.product.productstatus" label="1">新品开始</el-radio>
                        <el-radio v-model="formLabelAlign.product.productstatus" label="2">新品结束</el-radio>
                    </template>
                </el-form-item>

                <!-- 轮播图 -->
                <el-form-item label="轮播图">
                    <div v-if='imgsbackC.length>0' class="flex">
                        <div class="img-box" v-for="(item, i) in imgsbackC" :key='i' >
                            <img class="img" :src="item" alt="" style="height:150px;width:150px"> 
                            <span @click="delimgbackC(i)"><i class="el-icon-delete"></i></span>
                        </div>
                    </div>
                    <div class="img-file" v-if='imgsbackC.length < sizebackC'>
                    <input type="file" id='files' @change='fileChangebackC($event)'>
                            <label for="files"></label>
                    </div>
                </el-form-item>

                <el-form-item label="商品参数：">
                   <div class="goodsList" id="ul1" v-for="(item,index) in formLabelAlign.productParamList" :key="index">
                        
                        <div style="display:flex;juistify-content:flex-start">
                            <el-form-item  label="属性名">
                                <el-input style="width:200px" v-model="item.paramkey" placeholder="请输入属性名"></el-input>
                            </el-form-item>
                            <el-form-item label="属性值">
                                <el-input v-model="item.paramvalue" placeholder="请输入属性值"></el-input>
                            </el-form-item>
                            <el-button @click="deleteByid(item,index)" type="danger" icon="el-icon-delete" style="height:40px;margin-left:15px" circle></el-button>
                        </div>
                        
                    </div>
                    <el-button style="margin-left:500px" type="primary" @click="addgoodsMes()">添加商品属性</el-button>
                        
                    
                </el-form-item>
                

            </el-form>
            <el-button class="submit-goods-message" type="primary" @click="addgoodsMessage(formLabelAlign)">立即添加</el-button>
         
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
import { ImageExtend, QuillWatch } from 'quill-video-image-module/quill-image-module'
import { VideoExtend, QuillVideoWatch } from 'quill-video-image-module/quill-video-module'


// 图片拖拽上传
// import { ImageDrop } from 'quill-image-drop-module';

import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)

//quill图片可拖拽改变大小
// import ImageResize from 'quill-image-resize-module' // 引用，调整图片大小


// 引入video模块并注册
import video from 'quill-video-image-module/video'

Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/VideoExtend', VideoExtend)
// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/imageResize', ImageResize)
Quill.register(video, true)

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
        name: "AddGoods",
        components: {
            quillEditor
        },
        data(){
            return{
                content: '',
                imgUrl:'',   //富文本中图片的url
                videoUrl:'',//富文本中视频的url



                labelPosition: 'right',
                value: '1',  //商品的类型 newProduct
                formLabelAlign:{
                    product: {
                        productName: '',   //产品名称
                        productstatus: '0',   //产品状态     0未开始 1新品开始，2新品结束
                        miaoshu: '',    //描述
                        thumbnail: '',   //缩略图
                        jifen: '',
                        status: '1',
                        newProduct: '1',
                        num: 1,
                        title: '',
                        subtitle: ''
                    },
                    productImgList: [],
                    productParamList: [
                        {
                            paramkey:"",
                            paramvalue:""
                        }
                    ]
                },
                
                // 缩略图
                imgUrl:'',//图片上传的url  (老)
                imglist:[],// 图片上传的list
                // 图片上传方法2
                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                // 轮播图
                imglistC:[],   //轮播图图片上传的list
                imgsbackC: [],      // 图片预览地址
                imgfilesbackC: [],  // 图片原文件，上传到后台的数据
                sizebackC: 6 ,      // 限制上传数量
                carousei:0,   //轮播图上传的第几个
                options: [{
                    value: '1',
                    label: '积分商城'
                    }, {
                    value: '2',
                    label: '新品'
                    }, {
                    value: '3',
                    label: '专属礼品'
                    }],
                
                rules: {
                    productName: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                    ],
                    newProduct: [
                        { required: true, message: '请选择商品类型', trigger: 'blur' },
                    ],
                    thumbnail: [
                        { required: true, message: '请上传缩略图', trigger: 'blur' },
                    ],
                    productImgList: [
                        { required: true, message: '请上传商品轮播图', trigger: 'blur' },
                    ],
                   
                 }

            }
        },
        created(){
            this.actionUrl = '/tryOut/upload';
            this.quillConfig = {
                placeholder:'请输入...',
                
                modules: {
                    //图片拖拽上传
                    // imageDrop:true, 
                    imageResize: {},
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
                            [{'size':  ['10px', '12px', '14px', '16px' ,'18px', '20px', '22px', '24px', '26px', '32px', '48px']}],// 字体大小
                            // [{'size': fontSizeStyle.whitelist}],// 字体大小
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],//几级标题
                            [{'color': []}, {'background': []}],// 字体颜色，字体背景颜色
                            // [{'font': []}], //字体
                            [{ 'font': fonts }],       //字体，把上面定义的字体数组放进来
                            [{'align': []}], //对齐方式
                            ['clean'],//清除字体样式
                            ['link', 'image', 'video'], //上传图片、上传视频
                            
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
                            } else {
                                this.quill.format('video', false);
                            }
                        }
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
        },
        methods: {
            // 上传视频
            updateVideo(e){
                // console.log('触发上传视频的方法',e)

                // 上传到腾讯云上

                var oFile=e.target.files[0];//获取文件流
                if (typeof (oFile) === 'undefined') {
                    return;
                }
                var val= e.target.value;
                var suffix = val.substr(val.indexOf("."));
                var storeAs = "studio_course/" + this.timestamp() + suffix;
                client.multipartUpload(storeAs, oFile).then(function (result) {

                }).catch(function (err) {
                    console.log(err);
                });

                let quill = this.$refs.myQuillEditor.quill;
                const range = quill.getSelection();





                // https://20200508-tvweb-1255674295.cos.ap-nanjing.myqcloud.com/

                // https://fluploadvideo.oss-cn-beijing.aliyuncs.com/studio_course/20200710165506.mp4
                this.videoUrl = "https://fluploadvideo.oss-cn-beijing.aliyuncs.com/" + storeAs
                if(range){
                    quill.insertEmbed(range.index,'video',this.videoUrl); 
                    // quill.insertEmbed('inserthtml', inHtml);
                    // this.ueditor.execCommand('inserthtml', inHtml);
                }
                quill.setSelection(quill.getSelection().index+1)

                // console.log('quill',quill.editor)




            },

            // quill   上传图片
            update(){
                
                // console.log('9999999999999999999999999999999999')

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

                    // console.log('图片返回数据',re.data.data)
                    
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
            // 添加商品的提交按钮，提交所有数据
            addgoodsMessage(formLabelAlign){
                console.log('描述的内容',this.content)
                var that = this
                // 缩略图
                if(that.imglist.length < 1){
                    this.$message.error('请上传缩略图')
                    return
                }
                console.log('that.imglistlun',that.imglistlun)
                // 轮播图图片列表
                var imglistC = that.imglistC
                if(imglistC.length > 0){
                    imglistC.forEach(function(item, index) {
                        item.filename = item.fileName
                        delete item.fileName;
                    })
                }else{
                    this.$message.error('请上传轮播图')
                    return
                }
                console.log('that.formLabelAlign.productParamList',that.formLabelAlign.productParamList)
                var param = {
                    product: {
                        productName: that.formLabelAlign.product.productName,
                        productstatus: that.formLabelAlign.product.productstatus,
                        miaoshu: this.content,
                        thumbnail: that.imglist[0].url,
                        jifen: that.formLabelAlign.product.jifen,
                        status: that.formLabelAlign.product.status,
                        newProduct: that.value,
                        num: that.formLabelAlign.product.num,
                        title: that.formLabelAlign.product.title,
                        subtitle: that.formLabelAlign.product.subtitle
                    },
                    // 轮播图
                    productImgList: imglistC,
                    productParamList: that.formLabelAlign.productParamList
                };    
                //上传给后台的表格信息

                that.$axios({
                    url: '/product/add',
                    method: 'post',
                    data: param,
                }).then((res)=>{
                    if(res.data.flag){
                        that.$message.success('添加商品成功');
                        that.$router.push('/home/GoodsManage');
                    }else{
                        that.$message.error('添加商品失败')
                    }
                }).catch(function(error) {
                    console.log('err')
                })
            },
            

            // 轮播图上传图片与预览
            /* 图片上传 */
            fileChangebackC(e) {  // 加入图片
                var carousei = this.carousei++
                // 图片预览部分
                var _this = this
                var event = event || window.event;
                var file = event.target.files
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();    // 使用 FileReader 来获取图片路径及预览效果
                    _this.imgfilesbackC.push(file[i])
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    _this.imgsbackC.push(e.target.result);   // base 64 图片地址形成预览                                 
                    };                 
                }
                // 图片上传给后台部分
                var file = _this.imgfilesbackC[carousei];
                let form = new FormData(); 
                form.append('imgFile',file);
                
                var vm = this;
                _this.$axios({
                    url: '/tryOut/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    var imglist = vm.imglistC;
                    imglist.push(re.data.data) 
                    vm.imglistC = imglist;
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //删除图片的方法
            delimgbackC(i){
                this.imgfilesbackC.splice(i, 1)
                this.imgsbackC.splice(i, 1)
                this.carousei--
            },

        



           
            // 删除键值对
            deleteByid(item,index){
                var list_i = index;
                var list = this.formLabelAlign.productParamList
                list = list.filter(function(item,index) {
                     return index != list_i
                });
                this.formLabelAlign.productParamList = list
            },
            // 添加商品的键值对
            addgoodsMes(){
                var a = this.formLabelAlign.productParamList;
                var b = {
                            paramkey:"",
                            paramvalue:""
                        }
                var c = a.concat(b)
                this.formLabelAlign.productParamList = c
            },
            
            // 缩略图上传
            // 图片改变时触发该接口，该接口处理的是图片预览与图片上传(每次上传图片都触发该方法)
            fileChangeback(e) {  // 加入图片
                console.log('图片上传')
                var _this = this
                var event = event || window.event;
                var file = event.target.files
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();    // 使用 FileReader 来获取图片路径及预览效果
                    _this.imgfilesback.push(file[i])
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    _this.imgsback.push(e.target.result);   // base 64 图片地址形成预览                                 
                    };
                }
               
                // 图片上传给后台
                var file = _this.imgfilesback[0];
                let form = new FormData(); 
                form.append('imgFile',file);
                var vm = this;
                // 图片上传
                 this.$axios({
                    url: '/tryOut/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    vm.imgUrl = re.data.data.url
                    var imglist = vm.imglist;
                    imglist.push(re.data.data)
                    vm.imglist = imglist;
                    console.log('vm.imglist',vm.imglist)
                    // console.log('re.data',re.data.data)
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 缩略图删除图片的方法
            delimgback(i){
                this.imgfilesback.splice(i, 1)
                this.imgsback.splice(i, 1)
            },
           
            
            

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
        height:400px;
        overflow-y: auto;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
     .goodsList .el-form-item{
        height: 80px;
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
    .submit-goods-message{
        
        margin-left: 40%;
        margin-bottom: 50px;
    }
    .goodsList{
        /* border: 1px solid #eee; */
        /* margin: 15px; */
        /* padding: 15px; */
    }
    .grounp_name{
        width: 200px;
        margin-bottom: 20px;
    }
    .myQuillEditor{
        padding-top:60px;
        overflow: hidden;
        position: relative;
    }
    .uploadbox{
        visibility: hidden;
        display:none;
    }
</style>
