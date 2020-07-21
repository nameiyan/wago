<template>
    <div class="no-msg top">
       <!-- <div class="manege-content">
           <div style="height:60px;background:red">
               <el-scrollbar style="height:100%">
                   <div style="wifth:70px;height:70px;border:solid"></div>
               </el-scrollbar>
           </div>
       </div> -->
       <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>类型查看</span>
            </div>
        </div>
        <div class="manege-content">
             <div class="search" >
               <!-- <div>
                   <el-input style="height:50px;width:180px;margin:20px"
                        placeholder="请输入查询文章名称"
                        v-model=" unclearSearch"
                        clearable>
                    </el-input>
                    <el-button type="primary" plain @click="requireArticle()">查询</el-button>
               </div> -->
                <el-button type="primary" plain @click="addType()" class="toadd">添加类型</el-button>
            </div>

            <el-table
                :data="tableData"
                border
                style="width: 100%">

                <el-table-column
                    type="index"
                    label="ID"
                    width="80"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="typeName"
                    label="类型"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="typeUrl"
                    label="图片"
                    align="center">
                    <template slot-scope="scope">
                        <img v-if="scope.row.typeUrl != ''" :src="scope.row.typeUrl" alt style="height:100px;width:100px" />
                        <img v-else src="../../assets/images/undefined.png" alt style="height:100px;width:100px" />
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
             <el-dialog
                title=""
                ref='wany'
                :visible.sync="checkarticlevisible"
                width="70%"
                center>

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="类型" prop="typeName">
                        <el-input v-model="ruleForm.typeName"></el-input>
                    </el-form-item>

                    <el-form-item label="图片" prop="typeUrl">
                        <div v-if="imgshow">
                            <img class="img" :src="ruleForm.typeUrl" alt="" style="height:100px;width:100px">
                        </div>
                            
                      
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

                    <el-form-item>
                        <el-button type="primary" @click="editsubmit('ruleForm')" class="editsubmit">提交</el-button>
                    </el-form-item>
                </el-form>

            </el-dialog>
       </div>
    </div>
</template>

<script>
    export default {
        name: "Articletype",
        inject:['reload'],
        data(){
            return{
                tableData: [],   //查看用电类型的数据列表
                nowpage: 1,
                nowpageSize: 15,
                total:null,
                checkarticlevisible:false,   //编辑弹框的删除
                originRowData:[],    //编辑的初始数据
                ruleForm:[],    ////编辑弹框的数据
                rules: {
                    typeName: [
                        { required: true, message: '请输入类型', trigger: 'blur' }
                    ],
                    
                },
                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                imgName:'',        //图片的url
                imgshow:true       //默认自修改之前的图片
            }
        },
        created(){
           
        },
        mounted(){
            this.typesearch()
        },
        methods: {
            // 编辑的数据提交
            editsubmit:function(){
                console.log('提交',this.ruleForm)
                console.log('编辑的初始数据',this.originRowData)
                this.ruleForm.typeUrl = this.imgName == '' ? this.originRowData.typeUrl : this.imgName
                var that = this;
                var param = this.ruleForm;

                console.log('param',param)


                if(param.typeName == ''){
                    that.$message.error('请输入类型名称')
                }else if(param.typeUrl == ''){
                    that.$message.success('请上传图片')
                }else{
                    this.$axios({
                        url:'/type/update',
                        data:param,
                        method:'post'
                    }).then(function (res) {
                        console.log('res',res)
                        if(res.data.flag){
                            that.$message.success('修改成功！')
                            that.reload()
                        }
                     })
                       .catch(function (error) {
                      });
                }

                
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
                console.log('form',form)
                this.$axios({
                    url: '/tryOut/upload',
                    method: 'post',
                    data: form,
                    headers: {'content-Type':'multipart/form-data'}
                }).then((re)=>{
                    that.imgName = re.data.data.url
                    console.log('that.imgName',that.imgName)
                    that.$message.success('图片上传成功')
                }).catch((err)=>{
                    console.log(err)
                })
            },

            //删除图片的方法
            delimgback(i){
                this.imgfilesback.splice(i, 1)
                this.imgsback.splice(i, 1)
            },
            // 编辑弹框
            handleEdit:function(index,row){
                console.log('编辑的信息',row)
                this.checkarticlevisible = true
                this.ruleForm = row
                this.originRowData = row
            },
            // 添加用电安全类型
            addType:function(){
                // console.log('添加')
                this.$router.push({name: 'AddArticletype'});
            },
            // 查询全部用电安全类型
            typesearch:function(){
                var that = this;
                var param = {
                    page:1,
                    size:15
                };

                // .post('/safety/findPage',param)
                this.$axios({
                   url:'/type/select',
                   data:param,
                   method:'post'
                }).then(function (res) {
                    that.tableData = res.data.data.list;
                    if(res.data.total < 1){
                        that.$message.error('暂无数据！')
                    }
                    
                })
                .catch(function (error) {

                 });
            },
            //  删除用电安全类型
             handleDelete:function(index,row){
                 var that = this;
                var param = {
                   typeid : row.typeid
                };
                  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios({
                            url:'/type/delete',
                            data:param,
                            method:'post'
                        }).then(function (res) {
                            console.log('res',res)
                            if(res.data.flag){
                                that.$message.success('删除成功！')
                                that.typesearch()
                            }
                            
                        }).catch(function (error) {

                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });



                console.log('row',row)
                

                
             }
        }
    }
</script>
<style>
  
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
    /*上传的图片的大小*/
    .img{
        height: 80px;
        width: 80px;
    }
    .submit{
        margin: 20px 45%;
    }
    .search{
        display: flex;
        justify-content: flex-end;
    }
    .toadd{
        margin: 20px 30px 20px 0;
    }
    .editsubmit{
        margin-left: 41%;
    }
</style>
