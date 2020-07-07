<template>
    <div>
        <div style="margin: 20px;"></div>
        <table border="1px" width="100%" ref="table"  >
            <tr>
                <th>商品名称</th>
                <th class="weight">
                    <div class="borderinput">
                        <input  type="text" v-model="table2.item_name" placeholder="请输入内容" class="inline-input" autofocus="autofocus">
                    </div>
                </th>
            </tr>
            <tr>
                <th>商品价格</th>
                <th class="weight" >
                    <div class="borderinput">
                        <input  type="text" v-model="table2.price" placeholder="请输入内容" class="inline-input" autofocus="autofocus">
                    </div>
                </th>
            </tr>
            <tr>
                <th>商品分类</th>
                <th class="weight" >
                    <!-- <div class="borderinput">
                        <input  type="text" v-model="table2.price" placeholder="请输入内容" class="inline-input" autofocus="autofocus">
                    </div> -->
                    <el-select v-model="table2.cat_id" clearable placeholder="请选择商品类型">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </th>
            </tr>
            <tr>
                <th>图片</th>
                <th class="weight" style="height:250px">
                    <!-- 图片展示 -->
                    <template > 
                        <!-- {{ table2.itemImgList }} -->
                        <div v-for="(item,i) in table2.itemImgList" :key="i">
                            <span>{{ item.fileName }}</span>
                            <img class="tempimg" :src="item.url" style="width:150px;height:150px">
                            <el-button type="primary" class="but" @click="delgroup(item,i)">删除</el-button>
                        </div>
                    </template>
                        <!-- <img v-if="imgShow" :src="table2.itemImgList" alt="" style="width:150px;height:150px"> -->
                    <div class="borderinput">
                        <!-- <input  type="text" v-model="table.fileName" placeholder="请输入内容" class="inline-input" autofocus="autofocus"> -->
                    </div>
                    <!-- 图片上传 -->
                    <div v-if='imgsback.length>0' class="flex">
                    <div class="img-box" v-for="(item, i) in imgsback" :key='i' >
                                <img class="img" :src="item" alt="" style="height:150px;width:150px"> <span @click="delimgback(i)"><i class="el-icon-delete"></i></span>
                        </div>
                    </div>
                    <div class="img-file" v-if='imgsback.length < sizeback'>
                        <input type="file" id='files' @change='fileChangeback($event)'>
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
                    <div v-if="table2.itemCat">
                        <div v-for="(itemgrounp,indexgrounp) in table2.itemCat.itemGroupList" :key="indexgrounp">
                            <div>
                                <div style="display:flex;juistify-content:flex-start;margin:10px">
                                    <span>分组名：</span>
                                    <el-input v-model="itemgrounp.group_name" placeholder="请输入分组名称" class="grounp_name"></el-input>
                                    <el-button @click="deleteBygroundid(itemgrounp,indexgrounp)" type="danger" icon="el-icon-delete" style="height:40px;margin-left:15px" circle></el-button>
                                </div>
                                <span style="display:flex;juistify-content:flex-start;margin-left:10px">商品属性：</span>
                                <div class="goodsList" id="ul1" v-for="(item,index) in table2.itemCat.itemGroupList[indexgrounp].itemKeyValueList" :key="index">
                                    
                                    <div style="display:flex;juistify-content:flex-start;margin-left:100px">
                                        <div>
                                            <el-input v-model="item.itemKey.key_name" style="width:200px" placeholder="请输入属性名"></el-input>
                                        </div>
                                        <div>
                                            <el-input v-model="item.itemValue.param_value" placeholder="请输入属性值"></el-input>
                                        </div>
                                        <el-button @click="deleteByid(indexgrounp,item,index)" type="danger" icon="el-icon-delete" style="height:40px;margin-left:15px" circle></el-button>
                                    </div>
                                </div>
                                <el-button @click="addgoodsMes(itemgrounp,indexgrounp)" style="margin-left:500px" type="primary" >添加商品属性</el-button>
                                
                            </div>
                            
                        </div>
                        <el-button style="margin:10px 0 0 480px" type="primary" @click="addgrounp()">添加分组</el-button>
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
                table2:{
                   
                },
                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 5 ,      // 限制上传数量
                imgfileName:'',   //图片文件名字
                imgurl:'',              //图片url
                imglist:[],// 图片上传给后台返回的图片list
                imgShow:true,
                options: [{         //商品的分类
                    value: '1',
                    label: '服饰'
                    }, {
                    value: '2',
                    label: '电子产品'
                    }, {
                    value: '3',
                    label: '家具用品'
                    }, {
                    value: '4',
                    label: '食品'
                    }, {
                    value: '5',
                    label: '其他'
                    }],
                
            }
        },
        created(){

        },
        mounted(){
           this.createTable2();
        },
        methods: {
            // 添加商品的键值对
            addgoodsMes(item,index){
                var a = this.table2.itemCat.itemGroupList[index].itemKeyValueList;
                var b = {
                        itemKey:{
                            key_name:""
                        },
                        itemValue:{
                            param_value:""
                        }
                    }
                var c = a.concat(b)
                this.table2.itemCat.itemGroupList[index].itemKeyValueList = c
            },
             // 删除键值对
            deleteByid(indexgrounp,item,index){
                 console.log('item',item)

                var list_i = index;
                var list = this.table2.itemCat.itemGroupList[indexgrounp].itemKeyValueList
                list = list.filter(function(item,index) {
                     return index != list_i
                });
                this.table2.itemCat.itemGroupList[indexgrounp].itemKeyValueList = list

                // 调接口删除详情组
                var vm = this;
                var gId = item.itemKey.key_id
                var url = '/item/deleteKey?keyId='+ gId;
                if(gId){
                    this.$axios.post(url).then(function (response) {
                        console.log('response',response)
                        if(response.data.flag){
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            vm.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                        
                    })
                    .catch(function (error) {
                    
                    });
                }
            },
             //添加分组
            addgrounp(){
                var a = this.table2.itemCat.itemGroupList;
                var b = {      //详情的分组
                        group_name:"",   //分组名称
                        cat_id:'',             //分类的id
                        itemKeyValueList:[    //详情的数据
                            {
                                itemKey:{
                                    key_name:""
                                },
                                itemValue:{
                                    param_value:""
                                }
                            }
                            ]
                    }
                var c = a.concat(b)
                this.table2.itemCat.itemGroupList = c
            },
            // 删除分组
            deleteBygroundid(itemgrounp,indexgrounp){
                console.log('itemgrounp',itemgrounp)
                var ground_i = indexgrounp;
                var groundlist = this.table2.itemCat.itemGroupList
                groundlist = groundlist.filter(function(item,index) {
                     return index != ground_i
                });
                this.table2.itemCat.itemGroupList = groundlist

                // 调接口删除详情组
                var vm = this;
                var gId = itemgrounp.group_id
                var url = '/item/deleteGroup?groupId='+ gId;
                if(gId){
                    this.$axios.post(url).then(function (response) {
                        console.log('response',response)
                        if(response.data.flag){
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            vm.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                        
                    })
                    .catch(function (error) {
                    
                    });
                }
                
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
            //商品分类的options的label转换成value的方法
            transfer_label(lab){
                var result = this.options.filter(item =>{
                    return item.label == lab;
                });
                if(result.length > 0){
                    var end = result[0].value;
                    return end
                }
            },

            // 删除图片
            delgroup(item,i){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 预览图片
                    var n = this.table2.itemImgList[i].img_id;
                    this.table2.itemImgList = this.table2.itemImgList.filter((item,index) =>{
                        return item.img_id != n;
                    } )
                    // 删除调接口
                    var vm = this;
                    var url = '/item/deleteImg?imgId=' + item.img_id;
                    this.$axios.post(url).then(function (response) {
                        console.log('response',response)
                        if(response.data.flag){
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            vm.$message({
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
            //深克隆编辑的数据
            createTable2(){
                var m = {};
                for(var k in this.table){
                    if(k != 'cat_id'){
                         m[k] = this.table[k]
                    }else{
                        m[k] = this.transfer_id(this.table[k])
                    }
                   
                }
                // console.log(m)
                this.table2 = m;
            },
            // 添加商品的提交按钮，提交所有数据
            updatasure(){
                this.uploadImg();

                var vm = this;
                this.table2.cat_id = this.transfer_label(this.table2.cat_id)//商品分类格式转换
                this.$axios.post('/item/update',this.table2).then(function (response) {
                    console.log('response',response)
                    if(response.data.flag){
                         vm.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        vm.cclose();
                        setTimeout(function(){
                            vm.$parent.$parent.goodsMessage()
                        },100)
                    }else{
                        vm.$message({
                            type: 'error',
                            message: '修改失败!'
                        });
                    }
                    
                })
                .catch(function (error) {
                 
                });
            },
            // 上传图片数据给后台
            uploadImg(){
                var vm = this
                var imglist = this.imglist;
                imglist.forEach(function(item,index){
                    item.item_id = vm.table2.item_id
                })
                if(imglist.length > 0){
                    this.$axios.post('/item/addImgs',imglist).then(function (response) {
                    
                    })
                    .catch(function (error) {
                    
                    });
                }
                
            },
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
                // 图片上传部分
                var file = _this.imgfilesback[0];
                let form = new FormData(); 
                form.append('imgFile',file);
                
                var vm = this;
                _this.$axios({
                    url: '/item/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    vm.imgurl = re.data.data.url
                    var imglist = vm.imglist;
                    imglist.push(re.data.data) 
                    vm.imglist = imglist;
                    console.log('vm.imglist',vm.imglist)
                }).catch((err)=>{
                    console.log(err)
                })
            },
             // 删除图片的方法
            delimgback(i){
                this.imgfilesback.splice(i, 1)
                this.imgsback.splice(i, 1)
            },
            // 图片上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
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
</style>
