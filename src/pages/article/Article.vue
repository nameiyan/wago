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
               <div>
                   <el-input style="height:50px;width:180px;margin:20px"
                        placeholder="请输入查询内容"
                        v-model=" unclearSearch"
                        clearable>
                    </el-input>
                    <el-button type="primary" plain @click="requireArticle()">查询</el-button>
               </div>
               <div>
                   <el-button type="primary" plain @click="addArticle()" class="toadd">添加文章</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="id"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="文章名"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="category_id"
                    label="分类"
                    width="100">
                     <template slot-scope="scope">
                         {{ scope.row.category_id == '1' ? '记叙文' : (scope.row.category_id == '2' ? '抒情文' : (scope.row.category_id == '3' ? '议论文' : 
                         (scope.row.category_id == '4' ? '说明文' : (scope.row.category_id == '5' ? '应用文' : '其他'))))}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="views"
                    label="浏览量"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="create_time_change"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="update_time_change"
                    label="修改时间">
                </el-table-column>
                <el-table-column label="操作">
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
             <el-dialog
                title=""
                ref='wany'
                :visible.sync="checkarticlevisible"
                width="70%"
                center>
                <CheckArticle :closeTable='closeTable' :articletable="articletable" @close="handleCheckclose"></CheckArticle>
            </el-dialog>
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
                nowpage:1,
                nowpageSize:10,
                currentPage:1,//分页的当前页
                articletableData:'',
                total:null,
                articletable:[],   //查看文章的数据
                checkarticlevisible:false,
                unclearSearch:''   //模糊查询
            }
        },
        created(){
            // this.adminName = sessionStorage.getItem('admin_name')
            this.requireArticle()
        },
         methods: {
            //  跳转到添加文章的页面
            addArticle(){
                this.$router.push({name: 'AddArticle'});
            },
            //  查询用电安全的数据(文章列表)
            requireArticle(){
                var param = {
                     currentPage:this.nowpage,
                     pageSize:this.nowpageSize,
                     queryString: this.unclearSearch
                };
                console.log('param',param)
                var vm = this;
                this.$axios.post('/safety/select',param).then(function (response) {
                    var articlelist = response.data.data.list;
                    vm.tableData = articlelist;
                    vm.total = response.data.data.total;
                    console.log('查询用电安全的数据',response.data.data.list);
                })
                .catch(function (error) {

                 });
             },
            //  时间的格式转换
            createGoodsTime(value){
                // console.log('value',value)
                var date = new Date(value);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var time = Y+M+D;
                return time;
            },
            
            //  改变排序
            changeSort(column){
                // console.log(column);
 
                //获取字段名称和排序类型
                var fieldName = column.prop;
                var sortingType = column.order;
        
                //如果字段名称为“创建时间”，将“创建时间”转换为时间戳，才能进行大小比较
                if(fieldName=="createTime"){
                    this.articletableData.map(item => {
                            item.createTime = this.$moment(item.createTime).valueOf();
                    });
                }
                    
                    
                //按照降序排序
                if(sortingType == "descending"){
                    this.articletableData = this.articletableData.sort((a, b) => b[fieldName] - a[fieldName]);
                }
                //按照升序排序
                else{
                    this.articletableData = this.articletableData.sort((a, b) => a[fieldName] - b[fieldName]);
                }
        
                //如果字段名称为“创建时间”，将时间戳格式的“创建时间”再转换为时间格式
                if(fieldName=="createTime"){
                    this.articletableData.map(item => {
                        item.createTime = this.$moment(item.createTime).format(
                            "YYYY-MM-DD"
                        );
                    });
                }
                // console.log(this.articletableData);
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
            // 删除文章
            handleDelete(index, row) {
                var vm = this
                var deldata = '/safety/delete';
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
                             method:'post',
                         }).then(function (response) {
                            console.log('response',response.data.flag)
                            if(response.data.flag){
                                // 删除后再次查询商品
                                vm.requireArticle()
                                vm.$message({
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
            // 分页
             handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                 this.nowpage = val;
                 this.requireArticle()
            }
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
        height: 50px;
        width: 120px;
        margin: 20px 60px 0 0;
    }
</style>
