<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>留言管理</span>
            </div>
        </div>
        <div class="manege-content">
            <div class="search" >
                <!-- <el-input style="height:50px;width:180px;margin:20px"
                    placeholder="请输入订单编号"
                    v-model=" unclearSearch"
                    clearable>
                </el-input>
                <el-button type="primary" plain @click="requireEva()" style="height:40px;width:100px;margin-top:20px">查询</el-button>
                -->
            </div>
            <template>
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
                        prop="nickname"   
                        label="用户昵称"
                        align="center">
                    </el-table-column>

                    <el-table-column
                        prop="message"   
                        label="评价内容"
                        align="center">
                    </el-table-column>

                    <el-table-column
                        prop="title"   
                        label="文章标题"
                        align="center">
                    </el-table-column>

                    <el-table-column
                        prop="createTime_transfer"
                        label="创建时间"
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
                
            </template>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="nowpageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "MessageManage",
        inject:['reload'],
        data(){
            return{
                tableData: [],
                nowpage:1,
                nowpageSize:10,
                currentPage:1,
                total:null,
                // value:3.3
                unclearSearch:''
            }
        },
        
        created(){
            
        },
        mounted(){
           this.getEvaluate()
        },
        methods: {
            // 删除留言   
            handleDelete(indexer,row){
                console.log('rowwwwwwwwwwwwww',row)
                this.$confirm('此操作将受理此次申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var form = {
                        id:row.id
                    }
                    var vm = this;
                    this.$axios.post('/liuyan/delete',form).then(function (res) {
                        if(res.data.flag){
                            vm.$message({
                                type: 'success',
                                message: '留言删除成功！'
                            }); 
                            vm.reload()
                        }
                    })
                    .catch(function (error) {
                        console.log('catch')
                    });
                
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已撤消操作'
                    });      
                });






               
            },
            // 查询所有意见
            getEvaluate() {
                var form = {
                    currentPage:this.currentPage,
                    pageSize:this.nowpageSize
                }
                console.log('form',form)
                var vm = this;
                this.$axios.post('/liuyan/selectAllLiuYan',form).then(function (res) {
                    
                    vm.total = res.data.total

                    var mydata = res.data.rows
                    mydata.forEach(function(item,index){
                        item.createTime_transfer = vm.createGoodsTime(item.createTime)
                    })
                    vm.tableData = mydata
                    
                })
                .catch(function (error) {
                    console.log('catch')
                });
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
            handleSizeChange(val) {
                this.currentPage = 1
                this.nowpageSize = val
                this.getEvaluate()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getEvaluate()
            },
            
        }
    }
    
</script>
<style>
    .no-msg .manege-content .el-pagination{
        padding: 15px 15px;
        margin-bottom: 150px;
        justify-content:flex-end !important;
    }
    .el-tabs{
        background: #fff;
        padding: 0 30px;
    }
    .el-tabs__nav-scroll{
        height: 60px;
        line-height: 60px;
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
        padding: 30px;
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
        padding-left: 30px;
        display: flex;
        justify-content: flex-start;
    }
</style>
