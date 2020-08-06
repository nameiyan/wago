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
                <span>管理者管理</span>
            </div>
        </div>
        <div class="manege-content">
            <div class="searchtop">
                
                <div class="search">
                     <div>
                   <el-button type="primary" plain @click="addManager()" class="toadd">添加管理者</el-button>
                </div>
                </div>

            </div>
            


            <el-table
                :data="UserList"
                style="width: 100%"
                border>
                <el-table-column
                    type="index"
                    label="ID"
                    sortable
                    align="center">
                </el-table-column>
                
                <el-table-column
                    prop="name"
                    label="管理员名称"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="username"
                    label="名称"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="password"
                    label="密码"
                    align="center">
                </el-table-column>

                 <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                       
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

                
            </el-table> 
            <el-pagination
                @size-change='changeSize'
                @current-change='changePage'

                :page-size="nowpageSize"
                layout="total, prev, pager, next, jumper"
                :total='cardListtotal'>
            </el-pagination>


           
       </div>
    </div>
</template>

<script>
// import CheckArticle from './CheckArticle.vue'
    export default {
        name: "manager",
        inject:['reload'],
        data(){
            return{
                nowpage: 1,
                nowpageSize: 10,
                cardListtotal:null,  //总条数
                UserList:[],  //用户的数据
                searchInput:'',//模糊查询的绑定值
            }
        },
        created(){
            
        },
        mounted(){
            this.getuserMessage()
        },
        methods: {
            // 删除管理员
            handleDelete(index,row){
                console.log('row',row)
                var that = this
                var mydata = {
                    id:row.id
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        url: '/admin/delete',
                        method: 'post',
                        data:mydata
                    }).then((res)=>{
                        if(res.data.flag){
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
            // 跳转到添加管理者的页面
            addManager(){
                this.$router.push({name:'addManager'})
            },
            // 分页查询所有管理员的信息
            getuserMessage(){
                var that = this
                this.$axios({
                    url: '/admin/selectAll',
                    method: 'post'
                }).then((res)=>{
                    console.log('分页查询所有管理员的信息',res.data.data)
                    if(res.data.flag){
                        that.UserList = res.data.data;
                    }
                    
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },



           // 模糊查询
            searchFuzzy(){
                console.log('searchInput',this.searchInput)
                this.getuserMessage()
            },
            
            // 分页的页数
            changePage(page) {
                this.nowpage = page;
                this.getuserMessage();
            },
            // 分页的每页有多少条数据
            changeSize(pagesize) {
                this.nowpageSize = pagesize;
                this.nowpage = 1;
                this.getuserMessage();
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
        margin: 20px 0 20px 30px;
    }
    .toadd{
        height: 40px;
        width: 120px;
        margin: 20px 40px 0 0;
    }

</style>



