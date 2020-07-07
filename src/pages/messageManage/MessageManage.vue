<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>意见反馈</span>
            </div>
        </div>
        <div class="manege-content">
            <div class="search" >
                <el-input style="height:50px;width:180px;margin:20px"
                    placeholder="请输入订单编号"
                    v-model=" unclearSearch"
                    clearable>
                </el-input>
                <el-button type="primary" plain @click="requireEva()" style="height:40px;width:100px;margin-top:20px">查询</el-button>
            </div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="id"
                    label="ID"
                    align="center"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="order_id"
                    label="订单编号"
                    align="center"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="consumer_id"   
                    label="用户编号"
                    align="center"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="goods_id"   
                    label="商品ID"
                    align="center"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="content"   
                    label="评价内容"
                    align="center"
                    width="200">
                    </el-table-column>
                    <!-- 商品评价 -->
                    <el-table-column
                    prop="describe"
                    align="center"
                    label="商品评价">
                        <template slot-scope="scope">
                            <el-rate
                                v-model="scope.row.describe"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                        </template>
                    </el-table-column>
                    <!-- 服务评价 -->
                    <el-table-column
                    prop="service"
                    align="center"
                    label="服务评价">
                        <template slot-scope="scope">
                            <el-rate
                                v-model="scope.row.service"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                        </template>
                    </el-table-column>
                    <!-- 物流评价 -->
                    <el-table-column
                    align="center"
                    prop="logistics"
                    label="物流评价">
                        <template slot-scope="scope">
                            <el-rate
                                v-model="scope.row.logistics"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
                totalMessage:'',
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
            // 查询所有意见
            getEvaluate() {
                var form = {
                    page:this.currentPage,
                    size:this.nowpageSize
                }
                var vm = this;
                this.$axios.get('/opinion/findAll',form).then(function (response) {
                    console.log('返回的意见反馈',response.data)
                    if(response.data.flag){
                        // console.log('查询成功',response.data.message)
                        vm.totalMessage = response.data.data.total,
                        vm.tableData = response.data.data.rows
                    }
                    
                })
                .catch(function (error) {
                    console.log('catch')
                });
            },
            // 删除评论
            handleDelete(index,row){
                console.log('row',row)
                console.log('row',typeof row.id)
                var evaid = JSON.stringify(row.id)
                console.log('row',typeof evaid)
                var form = '/evaluate/delete?id='+ row.id
                

                this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var vm = this;
                        this.$axios.post(form).then(function (response) {
                            vm.reload()
                        })
                        .catch(function (error) {
            
                        });
                        // 删除后再次查询商品
                        this.goodsMessage()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
               
            },
            // 评论查询
            requireEva(){
                var form = '/evaluate/findByOrderId?order_id='+ this.unclearSearch
                this.$axios.post(form).then(function (response) {
                        console.log('response',response)
                  })
                  .catch(function (error) {
       
                  });
            }
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
