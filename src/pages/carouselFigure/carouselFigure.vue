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
                <span>用电安全</span>
            </div>
        </div>
        <div class="manege-content">
            <div class="search" >
                <el-button type="primary" plain @click="addCarouse()" class="toadd">添加轮播图</el-button>
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
                    prop="img"
                    label="图片"
                    align="center">
                    <template slot-scope="scope">
                        <img v-if="scope.row.img != ''" :src="scope.row.img" alt style="height:100px;width:100px" />
                        <img v-else src="../../assets/images/undefined.png" alt style="height:100px;width:100px" />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="cannel"
                    label="渠道"
                    align="center">
                    <template slot-scope="scope">
                        {{ scope.row.cannel == '1' ? '首页轮播图' : (scope.row.cannel == '2' ? '用电安全轮播图' : '')}}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="status"
                    label="是否显示"
                    align="center">
                    <template slot-scope="scope">
                        {{ scope.row.cannel == '1' ? '是' : (scope.row.cannel == '2' ? '否' : '')}}
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <!-- <el-button
                        size="mini"
                        @click="handleCheck(scope.$index, scope.row)">查看</el-button> -->
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="changeSize"
                @current-change="changePage"
                :page-size="nowpageSize"
                 layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
             <el-dialog
                title=""
                ref='wany'
                :visible.sync="checkarticlevisible"
                width="70%"
                center>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="img">

                        <div v-if="imgshow">
                            <img style="height:100px;width:100px" :src="ruleForm.img" alt="">
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
                    
                    <el-form-item label="是否显示" prop="status">
                        <el-radio v-model="ruleForm.status" label="1">是</el-radio>
                        <el-radio v-model="ruleForm.status" label="2">否</el-radio>
                    </el-form-item>

                    <el-form-item label="渠道" prop="cannel">
                        <el-radio v-model="ruleForm.cannel" label="1">首页轮播图</el-radio>
                        <el-radio v-model="ruleForm.cannel" label="2">用电安全轮播图</el-radio>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="but" type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
       </div>
    </div>
</template>

<script>
    export default {
        name: "carouselFigure",
        inject:['reload'],
        data(){
            return{
                tableData: [],
                nowpage: 1,
                nowpageSize: 10,
                total:null,
                checkarticlevisible:false,   //编辑的弹出框是否显示

                imgsback: [],      // 图片预览地址
                imgfilesback: [],  // 图片原文件，上传到后台的数据
                sizeback: 1 ,      // 限制上传数量
                imgName:'',        //图片的url

                ruleForm: {
                    img:'',
                    status:'1',
                    cannel:'1'
                },
                rules:{
                    img:[],
                    status:[],
                    cancel:[]
                },

                imgshow:true,     //编辑的图片是否显示
                originalData:[],    //原始数据
            }
        },
        created(){
            // this.adminName = sessionStorage.getItem('admin_name')
          
        },
        mounted(){
            this.getlist()
        },
        methods: {
            // 修改轮播图的数据提交
            submitForm(){
                var that = this
                console.log('this.ruleForm',this.ruleForm)
                var mydata = {
                    id:this.ruleForm.id,
                    img:this.imgName != '' ? this.imgName : this.ruleForm.img,
                    status:this.ruleForm.status,
                    cannel:this.ruleForm.cannel
                }
                console.log('mydata',mydata)
                this.$axios({
                    url: '/lunbotu/update',
                    method: 'post',
                    data: mydata,
                }).then((res)=>{
                    console.log('res',res)
                    if(res.data.flag){
                        that.checkarticlevisible = false
                        that.reload()
                    }
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 修改轮播图
            handleEdit(index,row){
                console.log('row',row)
                this.checkarticlevisible = true
                this.ruleForm.id = row.id
                this.ruleForm.status = JSON.stringify(row.status)
                this.ruleForm.cannel = JSON.stringify(row.cannel)
                this.ruleForm.img = row.img
            },
            // 跳转到添加轮播图的页面
            addCarouse:function(){
                this.$router.push({name:'addCarouselFigure'})
            },
            // 获取所有轮播图的数据
            getlist(){
                var that = this
                var mydata = {
                    page:this.nowpage,
                    size:this.nowpageSize
                }
                this.$axios({
                    url: '/lunbotu/selectByPage',
                    method: 'post',
                    data: mydata,
                }).then((res)=>{
                    console.log('res',res)
                    if(res.data.flag){
                        that.tableData = res.data.data.list
                        that.total = res.data.data.total
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 删除
            handleDelete(index,row){
                console.log('row',row)
                var that = this
                var mydata = {
                    id:row.id
                }
                console.log('mydata',mydata)
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        url: '/lunbotu/delete',
                        method: 'post',
                        data: mydata,
                    }).then((res)=>{
                        console.log('res',res)
                        if(res.data.flag){
                            that.$message.success('删除成功！')
                            that.reload()
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                
            },
             // 分页的页数
            changePage(page) {
                 console.log('page',page)
                this.nowpage = page;
                this.getlist();
            },
            // 分页的每页有多少条数据
            changeSize(pagesize) {
                this.nowpageSize = pagesize;
                this.nowpage = 1;
                this.getlist();
            },
            // 分页结束

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
                    that.imgshow = false
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
        }
    }
</script>
<style>
   .el-scrollbar_wrap{
       overflow-x: hidden;
   }
   .no-msg .manege-content .el-pagination{
        padding: 15px 15px;
        margin-bottom: 150px;
        justify-content:flex-end !important;
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
    .search{
        display: flex;
        justify-content: flex-end;

    }
    .toadd{
        height: 40px;
        width: 120px;
        margin: 20px 80px 20px 0;
    }
    .img{
        height: 100px;
        width: 100px;
    }
</style>
