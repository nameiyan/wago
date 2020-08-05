<template>
    <div>
        <div style="margin: 20px;"></div>
                <!-- product:{{ product }}, 
                productImgList:{{ productImgList }}, -->
                productParamList:{{ productParamList }},
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
                <th class="weight" >
                    <div class="borderinput">
                        <input  type="text" v-model="product.miaoshu" placeholder="请输入内容" class="inline-input" autofocus="autofocus">
                        
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

    export default {
        props:['closeTable','table'],
        inject:['reload'],
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
                ///////////////////////////////////////
                // table2:{
                   
                // },
                // value:'1',
                
                // imgfileName:'',   //图片文件名字
                // imgurl:'',              //图片url
                // imglist:[],// 图片上传给后台返回的图片list
                // imgShow:true,
                
                
            }
        },
        created(){
            
        },
        mounted(){
           this.getGoodsMessage();
        },
        methods: {
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
                this.$axios.post('/productParam/add',mydata)
                .then(function (res) {
                    if(res.data.flag){
                        that.$message({
                            type: 'success',
                            message: '商品修改成功'
                        })
                        
                        setTimeout(function () {
                            that.closeTable();
                            that.reload()
                        }, 1000)
                        

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
</style>
