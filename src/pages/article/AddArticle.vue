<template>
    <div class="no-msg top">
        <div class="manege-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="题目" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="name">
                    <el-input v-model="ruleForm.author"></el-input>
                </el-form-item>
                <el-form-item label="文章类型" prop="category_id">
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

            <div>
            <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
            
            <el-button type="primary" @click="uploadContent()">提交</el-button>
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
                msg:'<h1>ssssssssssssssssssssss</h1>',
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
                ruleForm: {
                    name: '',
                    author: ''
                    },
                rules: {
                    name: [
                        { required: true, message: '请输入题目', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请填写作者', trigger: 'blur' }
                    ]
                },
                myfilename:'',
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
                value: '',
           }
        },
        methods: {
            showOne() {
                alert(this.msg);
            },
            // 数据提交
            submit () {
                var content = {
                    name: this.ruleForm.name,
                    author:this.ruleForm.author,
                    create_time:Date.parse(new Date()),
                    update_time:Date.parse(new Date()),
                    fileName:this.myfilename,
                    category_id:this.value,
                }
                this.$axios({
                    url: '/article/add',
                    method: 'post',
                    data: content,
                }).then((re)=>{
                //    console.log('re',re.data.message)
                    this.$router.push({name: 'Article'});
                }).catch((err)=>{
                    console.log(err)
                })
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
    
</style>
