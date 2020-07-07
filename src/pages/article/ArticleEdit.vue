<template>
    <div class="no-msg top">


        <div class="manege-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="题目" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="ruleForm.author"></el-input>
                </el-form-item>
                <el-form-item label="文章类型">
                        <el-select v-model="value" clearable placeholder="请选择文章类型">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
           
            <div style="display:flex;justify-content:flex-end;padding:10px 0">
                <input type='file' @change="update" ref='contentUpload' id='avatar-uploader' />
            </div>
            <quill-editor ref="myQuillEditor" 
                class="myQuillEditor"
                v-model="content" 
                :options="quillConfig" >
                <img id='contentPic'  :src='imgUrl'/>
            </quill-editor>
            <el-button type="primary" @click="searchArticleName()">提交</el-button>
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
        name: "ArticleEdit",
        data(){
           return  {
                content: '',
                imgUrl:'',
                editorOption: {},
                quillOption: '',
                quillConfig:{},
                ruleForm: {
                    id:this.$store.state.articleEditData.id,
                    name: this.$store.state.articleEditData.name,
                    author: this.$store.state.articleEditData.author,
                    create_time: this.$store.state.articleEditData.create_time,
                },
                rules: {
                    name: [
                        { required: true, message: '请输入题目', trigger: 'blur' },
                    ],
                    author: [
                        { required: true, message: '请填写作者', trigger: 'blur' }
                    ]
                },
                myfilename:'',//通过文章内容获取的文章的名字
                options: [{
                    value: '1',
                    label: '记叙文'
                    }, {
                    value: '2',
                    label: '抒情文'
                    }, {
                    value: '3',
                    label: '议论文'
                    }, {
                    value: '4',
                    label: '说明文'
                    }, {
                    value: '5',
                    label: '应用文'
                    }, {
                    value: '6',
                    label: '其他'
                    }],
                category_id:this.$store.state.articleEditData.category_id == '1' ? '记叙文' : (this.$store.state.articleEditData.category_id == '2' ? '抒情文' : (this.$store.state.articleEditData.category_id == '3' ? '议论文' : 
                         (this.$store.state.articleEditData.category_id == '4' ? '说明文' : (this.$store.state.articleEditData.category_id == '5' ? '应用文' : '其他')))),
                value:this.$store.state.articleEditData.category_id,
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
            // console.log('this.$store.state.articleEditData.id',this.$store.state.articleEditData.id)
        },
        methods: {
            // 通过文件名称获取文章内容
            searchArticleContent(){
                var mydata = { 
                    id: this.$store.state.articleEditData.id
                }
                var vm = this;
                this.$axios({
                    url: '/safety/selectById',
                    method: 'post',
                    data: mydata
                }).then((re)=>{
                    console.log('返回数据1111', re.data)
                    if(re.data.flag){
                        
                    }
                    // vm.content = JSON.parse(re.data.data);
                    // console.log('返回数据2222',typeof vm.content)
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //上传文章内容提交获取文章名字
            searchArticleName(){
                var content = {
                    article:JSON.stringify(this.$refs.myQuillEditor._content)
                }
                var vm =this;
                this.$axios({
                    url: '/safety/upload',
                    method: 'post',
                    data: content
                }).then((re)=>{
                    console.log(' vm.myfilename', vm.myfilename)
                    vm.myfilename = re.data.data
                    vm.submit();
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 编辑后数据提交
            submit () {
                var mydata = {
                    id: this.ruleForm.id,
                    name: this.ruleForm.name,
                    author:this.ruleForm.author,
                    create_time:this.ruleForm.create_time,
                    update_time:Date.parse(new Date()),
                    fileName:this.myfilename,
                    category_id:this.value,
                }
                console.log('mydata',mydata)
                this.$axios({
                    url: '/article/update',
                    method: 'post',
                    data: mydata,
                }).then((re)=>{
                     this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    this.$router.push({name:'Article'})
                }).catch((err)=>{
                    console.log(err)
                })
            },
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
    
</style>
