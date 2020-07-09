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
                   <el-input-number v-model="ruleForm.num" :min="1" :max="10000000" size="mini"></el-input-number>
                </el-form-item>

            </el-form>

            <div>
            
            <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
            
            <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>

import VueUeditorWrap from "vue-ueditor-wrap";

    export default {
        name: "AddArticle",
        components: {
            VueUeditorWrap
        },
        data(){
           return  {
                msg:'<h1>555555555555555555555555<h1>',
                myConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 240,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                    serverUrl: 'http://35.201.165.105:8000/controller.php',
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    UEDITOR_HOME_URL: '/static/UEditor/'

                },
                quillOption: '',
                quillConfig:{},

                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                imgName:'',        //图片的url
               

                ruleForm: {
                    title: '',
                    subtitle: '',
                    url:'',
                    value: '',    //文章分类的id
                    num: 1,//计数器
                },
                rules: {
                    title: [
                        { required: true, message: '请输入题目', trigger: 'blur' }
                    ],
                    subtitle: [
                        { required: true, message: '请填写副标题', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请上传图片', trigger: 'blur' }
                    ],
                    typeid:[
                        { required: true, message: '请上传选择分类', trigger: 'blur' }
                    ],
                },
                myfilename:'',
                options: [],
                
           }
        },
        mounted:function(){
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
                // 获取当前时间戳
                var that = this
                var timestamp = (new Date()).valueOf();  
                var content = {
                    title:that.ruleForm.title,
                    subtitle:that.ruleForm.subtitle,
                    safetyContent:that.msg,
                    url:that.imgName,
                    typeid:that.ruleForm.value,
                    quan:that.ruleForm.num,
                    views:'',
                    createTime:timestamp
                }

                console.log('content',content)

                 this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios({
                            url: '/article/add',
                            method: 'post',
                            data: content,
                        }).then(function (res) {
                             console.log('添加文章',re)
                    // that.$router.push({name: 'Article'});
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









            //内容上传
            uploadContent(){
                var content = {
                    article:JSON.stringify(this.$refs.myQuillEditor._content)
                }
                var vm =this;
                this.$axios({
                    url: '/article/upload',
                    method: 'post',
                    data: content
                }).then((re)=>{
                    // console.log('上传内容返回的文件名',re.data.data)
                    vm.myfilename = re.data.data
                    vm.submit();
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
