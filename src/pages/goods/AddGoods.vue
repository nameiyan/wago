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
                    <el-input v-model="formLabelAlign.product.miaoshu" placeholder="请添加商品描述"></el-input>
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
    export default {
        name: "AddGoods",
        data(){
            return{
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
           
        },

        methods: {
            // 添加商品的提交按钮，提交所有数据
            addgoodsMessage(formLabelAlign){
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
                        miaoshu: that.formLabelAlign.product.miaoshu,
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
</style>
