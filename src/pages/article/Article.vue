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
               <div class="search_left">
                    <div>
                        <el-input style="height:50px;width:180px;margin:20px"
                                placeholder="请输入文章名称"
                                v-model=" unclearSearch"
                                clearable>
                            </el-input>
                            <el-button type="primary" plain @click="requireArticle()">查询</el-button>
                    </div>
                    <div class="selectbox">
                            <el-select v-model="value" 
                                @change="changeType" 
                                placeholder="请选择文章类型"
                                clearable>
                                <el-option 
                                    v-for="item in options"
                                    :key="item.typeid"
                                    :label="item.typeName"
                                    :value="item.typeid">
                                </el-option>
                            </el-select>
                    </div>
               </div>
               <div>
                   <el-button type="primary" plain @click="addArticle()" class="toadd">添加文章</el-button>
                   <!-- <el-button type="primary" plain @click="addVideo()" class="toadd">添加视频</el-button> -->
                </div>

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
                    prop="title"
                    label="文章名"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="subtitle"
                    label="描述"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="url"
                    label="图片"
                    align="center">
                    <template slot-scope="scope">
                        <img v-if="scope.row.url != ''" :src="scope.row.url" alt style="height:100px;width:100px" />
                        <img v-else src="../../assets/images/undefined.png" alt style="height:100px;width:100px" />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="quan"
                    label="权重"
                    align="center">
                </el-table-column>
                
                <el-table-column
                    prop="mytype"
                    label="类型"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="createTime_transfer"
                    label="时间"
                    align="center">

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
             <!-- <el-dialog
                title=""
                ref='wany'
                :visible.sync="checkarticlevisible"
                width="70%"
                center>
                <CheckArticle :closeTable='closeTable' :articletable="articletable" @close="handleCheckclose"></CheckArticle>
            </el-dialog> -->
       </div>
    </div>
</template>

<script>
import CheckArticle from './CheckArticle.vue'
    export default {
        name: "Article",
        components: {
            CheckArticle
        },
        data(){
            return{
                tableData: [],
                nowpage: 1,
                nowpageSize: 10,
                articletableData:'',
                total:null,
                articletable:[],   //查看文章的数据
                checkarticlevisible:false,
                unclearSearch:'',   //模糊查询
                options: [],   //用电安全的全部类型
                value: ''
            }
        },
        created(){
            // this.adminName = sessionStorage.getItem('admin_name')
            this.requireArticle()
        },
        mounted(){
            // 查询用电安全文章的全部类型
            this.getArticletype()
        },
        methods: {
            // 当文章类型的select发生变化时触发
            changeType(value){
                this.requireArticle(value)
            },
            // 查询用电安全文章的全部类型
            getArticletype(){
                var that = this;
                var param = {
                    page:1,
                    size:100
                };
                this.$axios({
                   url:'/type/select',
                   data:param,
                   method:'post'
                }).then(function (res) {
                    if(res.data.flag){
                        that.options = res.data.data.list
                    }
                })
                .catch(function (error) {

                 });
            },
            // 添加视频
            addVideo(){
                this.$router.push({name: 'uploadVideo'});
            },
            //  跳转到添加文章的页面
            addArticle(){
                this.$router.push({name: 'AddArticle'});
            },
            //  查询用电安全的数据(文章列表)
            requireArticle(typeid){
                var that = this;
                var param = {
                    page:that.nowpage,
                    size:that.nowpageSize,
                    string: that.unclearSearch,
                    typeid:typeid
                };

                // .post('/safety/findPage',param)
                this.$axios({
                   url:'/safety/findPage',
                   data:param,
                   method:'post'
                }).then(function (res) {
                    that.total = res.data.total;
                    that.tableData = res.data.rows;
                    console.log('用电安全',that.tableData)
                    if(res.data.total < 1){
                        that.$message.error('暂无数据！')
                    }
                    var mydata = that.tableData
                    mydata.forEach(function(item,index){
                        item.createTime_transfer = that.createGoodsTime(item.createTime)
                        item.mytype = that.transfertype(item.typeid)    //通过类型id查对应的文字
                  
                    })
                })
                .catch(function (error) {

                 });
             },
            // 文章的typeid转换成文字
            transfertype(typeid){
                var label = ''
                this.options.forEach(function(item, index) {
                   if(item.typeid == typeid){
                       label = item.typeName
                   }
                })
                return label
            },
            // 时间的格式转换
            createGoodsTime(value) {
                // console.log('value',value)
                var date = new Date(value);
                var Y = date.getFullYear() + "-";
                var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
                var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var time = Y + M + D;
                return time;
            },
            
            
            // 查看文章的弹框展示
            handleCheck(index,row) {
                this.checkarticlevisible = true;
                this.articletable = row;
                // console.log('row',row)
            },
            // 查看文章弹框的关闭
            handleCheckclose(){
                this.checkarticlevisible = false;
            },
            // 编辑弹框关闭
            closeTable(){
                 this.checkarticlevisible = false;
             },
            //  编辑文章按钮
            handleEdit(index, row) {
                // console.log(index, row);
                this.$store.commit('articleEditData',row)     //存储需要编辑的数据  （方法名称，唯一参数）
                this.$router.replace('/home/article/ArticleEdit');
            },
            // 用电安全(删除文章)
            handleDelete(index, row) {
                console.log('row',row)
                var that = this
                var id = {
                    id:row.id
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios({
                             url:'/safety/delete',
                             data:id,
                             method:'post'
                         }).then(function (res) {
                            console.log('resssssssssssssssssss',res)
                            if(res.data.flag){
                                // 删除后再次查询商品
                                that.requireArticle()
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
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

                // console.log(index, row);
               
            },
            routeto(formName) {
                this.$router.push({name: 'Login'});
                // console.log("输出")
            },
             // 分页的页数
            changePage(page) {
                //  console.log('page',page)
                this.nowpage = page;
                this.requireArticle();
            },
            // 分页的每页有多少条数据
            changeSize(pagesize) {
                
                this.nowpageSize = pagesize;
                this.nowpage = 1;
                this.requireArticle();
            },
            // 分页结束
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
        justify-content: space-between;

    }
    .toadd{
        height: 40px;
        width: 120px;
        margin: 20px 40px 0 0;
    }
    .search_left{
        display: flex;
        justify-content: flex-start;
    }
    .selectbox{
        margin: 20px 0 0 40px;
    }
</style>
