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
               
                <!-- 商品名称 -->
                <el-form-item prop='productName' label="商品名称" >
                    <el-input v-model="formLabelAlign.productName" placeholder="请添加商品名称"></el-input>
                </el-form-item>
                 <!-- 图片 -->
                <el-form-item prop='productImg' label="图片" >
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
                <!-- 开始时间 -->
                <el-form-item prop='startTime' label="开始时间" >
                     <div class="block">
                        <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <!-- 描述 -->
                <el-form-item prop='miaoshu' label="描述" >
                    <el-input v-model="formLabelAlign.miaoshu" placeholder="请添加商品描述"></el-input>
                </el-form-item>
                <!-- 积分 -->
                <el-form-item prop='jifen' label="积分" >
                    <el-input-number v-model="formLabelAlign.jifen" :min="1" :max="1000" label="描述文字"></el-input-number>
                </el-form-item>
                <!-- 是否为新产品 -->
                <el-form-item prop='newProduct' label="是否为新产品" >
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否</el-radio>
                </el-form-item>
                <!-- 数量 -->
                <el-form-item prop='num' label="数量" >
                    <el-input-number v-model="formLabelAlign.num"  :min="1" :max="10000" label="描述文字"></el-input-number>
                </el-form-item>
                
            </el-form>
            <el-button class="submit-goods-message" type="primary" @click="addgoodsMessage(formLabelAlign)">立即添加</el-button>
            <el-button @click="resetForm('formLabelAlign')">重置</el-button> 
       </div>
    </div>
</template>

<script>
    export default {
        name: "AddGoods",
        data(){
            return{
                labelPosition: 'right',
                formLabelAlign: {
                    productImg:"",
                    productName:"",
                    startTime:'',
                    endTime:'',
                    miaoshu:"",
                    jifen:"",
                    newProduct:'',
                    num:''//商品计数器的数量
                },
                 rules: {
                    productName: { required: true, message: '请输入产品名称', trigger: 'blur' },
                },
                imageUrl: '',//商品图片的路径
                // 选择时间的数据
                value1: '',
                value2: '',
                radio: '1', //是否为新产品   1、新产品
                /*  图片上传 */
                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                imglist:[],// 图片上传给后台返回的图片list
                // 图片上传的数据结束
            }
        },
        created(){
           
        },

        methods: {
            // 提交添加的商品数据
            addgoodsMessage(formLabelAlign){
                formLabelAlign.startTime = this.dateToMs(this.value1[0])
                formLabelAlign.endTime = this.dateToMs(this.value1[1])
                formLabelAlign.newProduct = this.radio
                formLabelAlign.productImg = this.imglist.url
                console.log('formLabelAlignformLabelAlign',formLabelAlign)

                var vm = this;
                this.$axios.post("/product/add", formLabelAlign).then(function(response) {
                    if(response.data.flag){
                         vm.$message({
                            type: 'success',
                            message: '添加商品成功!'
                        });
                        vm.$router.push({name: 'GoodsManage'});
                    }else{
                        vm.$message({
                            type: 'error',
                            message: '删除商品失败!'
                        });
                    }

                    
                })
                .catch(function(error) {});
            },
            // 中国标准时间转换成时间戳
            dateToMs(date){
                let result = new Date(date).getTime();
                return result;
            },
            // 表格重置，清空表格
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.value = '',
                this.imgsback = [];
            },
            
            /* 图片上传 */
            fileChangeback(e) {  // 加入图片
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
                // 图片上传给后台部分
                var file = _this.imgfilesback[0];
                let form = new FormData(); 
                form.append('imgFile',file);
                
                var vm = this;
                _this.$axios({
                    url: '/tryOut/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    // 单张上传图片的图片数据
                    vm.imglist = re.data.data;
                    // 上传多张图片时需要做push
                    // var imglist = vm.imglist;
                    // imglist.push(re.data.data) 
                    // vm.imglist = imglist;
                    console.log('vm.imglist',vm.imglist)
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //删除图片的方法
            delimgback(i){
                        this.imgfilesback.splice(i, 1)
                        this.imgsback.splice(i, 1)
                    },
                }
            }
</script>
<style>
    .goodsList .el-form-item{
        height: 80px;
    }
</style>
<style>
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
  
  .submit-goods-message{
      margin-left: 45%;
      margin-bottom: 30px;
  }
  /* 图片的大小 */
  .img{
        height: 120px;
        width: 120px;
        padding: 10px;
    }
</style>
