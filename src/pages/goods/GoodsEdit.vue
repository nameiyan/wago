<template>
    <div>
        <div style="margin: 20px;"></div>
        
        <table class="mytable" border="1px" width="100%" ref="table"  >
            
            <tr>
                <th>商品名称</th>
                <th class="weight">
                    <div class="borderinput">
                        <input v-model="product.productName" type="text" placeholder="请输入商品名称" class="inline-input" autofocus="autofocus">
                    </div>
                </th>
            </tr>
            <tr>
                <th>商品分类</th>
                <th class="weight" >
                    <!-- <div class="borderinput">
                        <input  type="text" v-model="table2.price" placeholder="请输入内容" class="inline-input" autofocus="autofocus">
                    </div> -->
                    <el-select v-model="product.newProduct" clearable placeholder="请选择商品类型">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </th>
            </tr>
            <!-- 数量 -->
            <tr>
                <th>数量</th>
                <th class="weight" >
                    <div class="borderinput">
                        <el-input-number size="small" v-model="product.num" 
                        :min="1" :max="99999999" label="请输入商品数量"></el-input-number>
                    </div>
                </th>
            </tr>
            <!-- 标题 -->
            <tr>
                <th>标题</th>
                <th class="weight" >
                    <div class="borderinput">
                        <input  type="text" v-model="product.title" placeholder="请输入内容" class="inline-input" autofocus="autofocus">
                        
                    </div>
                </th>
            </tr>
            <!-- 副标题 -->
            <tr>
                <th>副标题</th>
                <th class="weight" >
                    <div class="borderinput">
                        <input  type="text" v-model="product.subtitle" placeholder="请输入内容" class="inline-input" autofocus="autofocus">
                        
                    </div>
                </th>
            </tr>
            <!-- 商品描述 -->
            <tr>
                <th>商品描述</th>
                <th class="weight" style="height:600px">
                    <quill-editor ref="myQuillEditor" 
                        class="myQuillEditor"
                        v-model="product.miaoshu" 
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
                        
                    
                </th>
            </tr>
            <!-- 缩略图 -->
            <tr>
                <th>缩略图</th>
                <th class="weight" style="height:250px">
                   
                    <!-- <input  type="text" v-model="table2.price" placeholder="请输入内容" class="inline-input" autofocus="autofocus"> -->
                    
                        <!-- 图片展示 -->
                        <template > 
                            <template v-if="thumbnailshow">
                                <img class="tempimg" :src="product.thumbnail" style="width:150px;height:150px">
                                <el-button type="primary" class="but" @click="delimageLocation()">删除</el-button>
                            </template>
                            <!-- {{ table2.itemImgList }} -->
                            <!-- <div v-for="(item,i) in table2.itemImgList" :key="i">
                                <span>{{ item.fileName }}</span>
                                <img class="tempimg" :src="item.url" style="width:150px;height:150px">
                                <el-button type="primary" class="but" @click="delgroup(item,i)">删除</el-button>
                            </div> -->
                       </template>
                            <!-- <img v-if="imgShow" :src="table2.itemImgList" alt="" style="width:150px;height:150px"> -->
                        <div class="borderinput">
                            <!-- <input  type="text" v-model="table.fileName" placeholder="请输入内容" class="inline-input" autofocus="autofocus"> -->
                        </div>
                        <!-- 图片上传 -->
                        <div v-if='imgsback.length>0' class="flex">
                        <div class="img-box" v-for="(item, i) in imgsback" :key='i' >
                                    <img class="img" :src="item" alt="" style="height:150px;width:150px"> 
                                    <span @click="delimgback(i)"><i class="el-icon-delete"></i></span>
                            </div>
                        </div>
                        <div class="img-file" v-if='imgsback.length < sizeback'>
                            <input type="file" id='files' @change='fileChangeback($event)'>
                            <label for="files"></label>
                        </div>
                        
                </th>
            </tr>
            <!-- 抵扣积分 -->
            <tr>
                <th>抵扣积分</th>
                <th class="weight" >
                    <div class="borderinput">
                        <el-input-number size="small" v-model="product.jifen" 
                        :min="1" :max="99999999" label="请输入兑换商品抵扣积分"></el-input-number>
                    </div>
                </th>
            </tr>
            <!-- 商品状态 -->
            <tr>
                <th>商品状态</th>
                <th class="weight" >
                    <div class="borderinput">
                        <template>
                            <el-radio v-model="product.status" label="1">上架</el-radio>
                            <el-radio v-model="product.status" label="2">下架</el-radio>
                        </template>
                    </div>
                </th>
            </tr>
            <!-- 轮播图 -->
            <tr>
                <th>轮播图</th>
                <th class="weight" >
                    <div style="display:flex;juistify-conten:flex-start"> 
                        <!-- {{ table2.itemImgList }} -->
                        <div v-for="(item,i) in productImgList" :key="i">
                            <!-- <span>{{ item.url }}</span> -->
                            <img class="tempimg" :src="item.url" style="width:150px;height:150px">
                            <el-button type="primary" class="but" @click="delgroupC(item,i)">删除</el-button>
                        </div>
                    </div>
                        <!-- <img v-if="imgShow" :src="table2.itemImgList" alt="" style="width:150px;height:150px"> -->
                    <div class="borderinput">
                        <!-- <input  type="text" v-model="table.fileName" placeholder="请输入内容" class="inline-input" autofocus="autofocus"> -->
                    </div>
                    <!-- 图片上传 -->
                    <div v-if='imgsbackC.length>0' class="flex">
                    <div class="img-box" v-for="(item, i) in imgsbackC" :key='i' >
                                <img class="img" :src="item" alt="" style="height:150px;width:150px"> <span @click="delimgbackC(i)"><i class="el-icon-delete"></i></span>
                        </div>
                    </div>
                    <div class="img-file" v-if='imgsbackC.length < sizebackC'>
                        <input type="file" id='files' @change='fileChangebackC($event)'>
                        <label for="files"></label>
                    </div>
                </th>
            </tr>
           
            <tr>
                <th>商品参数</th>
                <!-- <th>
                    <div v-if="table2.itemCat.itemGroupList">
                        <span style="color:blue">{{ table2.itemCat.itemGroupList  }}</span>
                    <div v-for="(itemgrounp,indexgrounp) in table2.itemCat" :key="indexgrounp">
                        
                    </div>
                    </div>
                    
                </th> -->
                <th class="weight" >
                    <div>
                        <div>
                            <div class="goodsList" id="ul1" v-for="(item,index) in productParamList" :key="index">
                               <div style="display:flex;juistify-content:flex-start;margin-left:50px;margin-top:10px">
                                    <div>
                                        <el-input v-model="item.paramkey" style="width:200px" placeholder="请输入属性名"></el-input>
                                    </div> 
                                    <div>
                                        <el-input v-model="item.paramvalue" placeholder="请输入属性值"></el-input>
                                    </div>
                                    <el-button @click="deleteByid(item,index)" type="danger" icon="el-icon-delete" style="height:40px;margin-left:15px" circle></el-button>
                                </div>
                            </div>
                            <el-button @click="addgoodsMes()" style="margin-left:500px" type="primary" >添加商品属性</el-button>
                            
                        </div>
                   </div>
                </th>
            </tr>
            <!-- <tr>
                <th>简介</th>
                <th class="weight" >
                    <div class="borderinput">
                        <input  type="text" v-model="table2.introduce" placeholder="请输入内容" class="inline-input" autofocus="autofocus">
                    </div>
                </th>
            </tr> -->
            
            
        </table>
        <div slot="footer" class="w10 flex-center bottom-btn m-t-20">
            <el-button class="m-r-20" @click="cclose">取 消</el-button>
            <div style="margin-left:100px"></div>
            <el-button class="m-l-20" type="primary" @click="updatasure">确 定</el-button>
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
        props:['closeTable','table'],
        inject:['reload'],
        components: {
            quillEditor
        },
        data(){
            return{
                goodsList:[],  
                product:[], 
                productImgList:[],
                productParamList:[],
                thumbnailshow:true,   //原缩略图是否展示
                //缩略图
                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                // 轮播图
                imgsbackC: [],      // 图片预览地址
                imgfilesbackC: [],  // 图片原文件，上传到后台的数据
                sizebackC: 6 ,      // 限制上传数量
                carousei:0,   //轮播图上传的第几个
                options:  [{
                    value: '1',
                    label: '积分商城'
                    }, {
                    value: '2',
                    label: '新品'
                    }, {
                    value: '3',
                    label: '专属礼品'
                }],
                imgUrl:'',   //富文本中图片的url
                videoUrl:'',//富文本中视频的url
                
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
        mounted(){
            autotip:{
			      document.getElementsByClassName('ql-editor')[0].dataset.placeholder=''
			      for(let item of titleConfig){
			          let tip = document.querySelector('.quill-editor '+ item.Choice)
			          if (!tip) continue
			          tip.setAttribute('title',item.title)
			      }
			  }
            this.getGoodsMessage();
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
            updatasure(){
                var vm = this;
                this.productParamList.forEach(function(item,index){
                    item.productid = vm.table.productid
                })
                
                this.submitProduct()    //商品基本属性的修改提交
            },
            // 通过编辑按钮携带过来的productid查询该商品的所有信息
            getGoodsMessage(){
                var that = this
                var mydata = {
                    productid: that.table.productid
                }
                this.$axios.post('/product/selectById',mydata).then(function (res) {
                    console.log('aaaaaaaaaa',res)
                    if(res.data.flag){
                        that.goodsList = res.data.data
                        that.product = res.data.data.product   //基本信息
                        that.productImgList = res.data.data.productImgList    //轮播图
                        that.productParamList =  res.data.data.productParamList  //属性的键值对
                        that.createTable2()
                    }else{
                        
                    }
                    
                })
                .catch(function (error) {
                
                });
            },
            //深克隆编辑的数据
            createTable2(){
                var that = this
                var product = that.product
                var m = {};
                for(var k in product){
                    if(k == 'newProduct'){
                        m[k] = this.transfer_id(product[k])
                    }else if(k == 'status'){
                        m[k] = JSON.stringify(product[k])
                    }else{
                        m[k] = product[k]
                    }
                    
                }
                this.product = m;
            },
           
            //商品分类的options的value转换成label的方法
            transfer_id(number){
                var result = this.options.filter(item =>{
                    return item.value == number
                });
                // console.log('result[0].label',result[0])
                var end = result[0].label;
                return end
            },

            
           
            // 缩略图图片上传
            fileChangeback(e){
                this.imgShow = false
                // 图片预览部分
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
                var vm = this;
                vm.thumbnailshow = false

                // 图片上传部分
                var file = _this.imgfilesback[0];
                let form = new FormData(); 
                form.append('imgFile',file);
                
                
                _this.$axios({
                    url: '/tryOut/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    
                    vm.product.thumbnail = re.data.data.url
                    vm.$message({
                        type: 'success',
                        message: '缩略图上传成功'
                    })
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 删除原有的缩略图
            delimageLocation(){
                console.log('删除原有的缩略图')
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.thumbnailshow = false
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // 删除轮播图原有的图片
            delgroupC(item,i){
                var that = this

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 预览图片
                    var n = that.productImgList[i].imgid;
                    that.productImgList = that.productImgList.filter((item,index) =>{
                        return item.imgid != n;
                    } )
                    // 删除调接口
                    var mydata = {
                        imgId:n
                    }
                    this.$axios.post('/productImg/deleteImg',mydata)
                    .then(function (res) {
                        if(res.data.flag){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            that.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                        
                    })
                    .catch(function (error) {
                    
                    });
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // 轮播图图片上传
            fileChangebackC(e){
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
                // 图片上传部分
                var file = _this.imgfilesbackC[carousei];
                let form = new FormData(); 
                form.append('imgFile',file);
                
                var vm = this;
                _this.$axios({
                    url: '/tryOut/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    console.log('re.data.data',re.data.data)
                    var carousePic = {
                        filename:re.data.data.fileName,
                        url:re.data.data.url,
                        productid:vm.table.productid
                    }
                    vm.addCarousePic(carousePic)
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 请求后台添加轮播图的图片
            addCarousePic(carousePic){
                var that = this
                this.$axios.post('/productImg/add',carousePic)
                .then(function (res) {
                    console.log('res',res)
                    if(res.data.flag){
                        vm.$message({
                            type: 'success',
                            message: '图片添加成功!'
                        });
                    }else{
                        vm.$message({
                            type: 'error',
                            message: '图片添加失败!'
                        });
                    }
                    
                })
                .catch(function (error) {
                 
                });
            },
            
            // 添加商品的键值对
            addgoodsMes(){
                var a = this.productParamList;
                var b = {
                            paramkey:"",
                            paramvalue:""
                        }
                var c = a.concat(b)
                this.productParamList = c
            },
             // 删除键值对
            deleteByid(item,index){
                var list_i = index;
                var list = this.productParamList
                list = list.filter(function(item,index) {
                     return index != list_i
                });
                this.productParamList = list
            },
            // 请求接口提交属性键值对数据
            submitProductParamList(){
                var that = this
                var mydata = that.productParamList
                if(mydata.length < 1){
                    that.$message({
                        type: 'error',
                        message: '请填写商品参数'
                    })
                    
                }

                this.$axios.post('/productParam/add',mydata)
                .then(function (res) {
                    
                    if(res.data.flag){
                        that.$message({
                            type: 'success',
                            message: '商品修改成功'
                        })
                        
                        
                        setTimeout(function(){
                            that.closeTable();
                            // that.$router.push({name: 'GoodsManage' });
                            parent.location.reload()
                        },500)
                        
                      
                        

                    }
                })
                .catch(function (error) {
                
                });
            },
            // 商品基本属性的数据修改提交
            submitProduct(){
                var that = this
                var status = parseInt(that.product.status)
                var jifen = JSON.stringify(that.product.jifen)
                if(that.product.newProduct.length > 1){
                    //商品分类的options的label转换成value的方法
                    var result = that.options.filter(item =>{
                        return item.label == that.product.newProduct
                    });
                    that.product.newProduct = result[0].value;
                }

                var mydata = {
                    productid:that.product.productid,
                    productName: that.product.productName,
                    productstatus: that.product.productstatus,
                    miaoshu: that.product.miaoshu,
                    thumbnail: that.product.thumbnail,
                    jifen:jifen,
                    status:status,
                    newProduct: that.product.newProduct,
                    num: that.product.num,
                    title: that.product.title,
                    subtitle: that.product.subtitle
                }
                this.$axios.post('/product/update',mydata)
                .then(function (res) {
                    if(res.data.flag){
                        that.submitProductParamList()   //键值对修改提交
                    }
                   
                })
                .catch(function (error) {
                
                });
            },
             // 删除图片的方法
            delimgback(i){
                this.imgfilesback.splice(i, 1)
                this.imgsback.splice(i, 1)
            },
             // 取消
            cclose(){
                this.closeTable();
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
</style>
<style scoped>
    input{
        width:100%;
        text-align: center;
        border:none;
    }
    table,tr,th{
        border-collapse:collapse;
        border:1px solid #DCDFE6;
        text-align:center;
        height:70px;
        font-size:20px;
    }/* 边框会合并为一个单一的边框 */
    .weight{
        font-weight:400;
        font-size:20px;
    }
    .borderinput{
        height: 48px;
        width: 97%;
        margin-left: 1%;
    }
    .inline-input{
        outline:none;
        line-height: 46px;
    }
    .img{
        height: 80px;
        width: 80px;
        padding: 10px;
    }
    .flex{
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #ccc;
        padding: 15px;
    }
    .tempdes{
        display: inline-block;
    }
    .but{
        height: 40px;
        width: 80px;
        margin-top: 60px;
        margin-left: 20px;
    }
    .tempimg{
        height: 100px;
        width: 100px;
        margin-left: 20px;
    }
    .grounp_name{
        width: 200px;
        margin-bottom: 20px;
    }
    .mytable tr th:first-child{
        width: 140px;
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
