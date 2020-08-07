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
                <span>新品申请管理</span>
            </div>
        </div>
        <div class="manege-content">
            
            <el-table
                :data="productList"
                style="width: 100%"
                border>
                <el-table-column
                    type="index"
                    label="ID"
                    sortable
                    align="center">
                </el-table-column>
                
                <el-table-column
                    prop="company"
                    label="公司名"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="address"
                    label="公司地址"
                    align="center">
                </el-table-column>
               
                <el-table-column
                    prop="dept"
                    label="部门"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="email"
                    label="邮箱"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="名字"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="phone"
                    label="电话"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="createTime_transfer"
                    label="创建时间"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="productid"
                    label="产品id"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="scene"
                    label="使用场景"
                    align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sceneType == 'image'">
                            <img
                                v-if="scope.row.scene != ''"
                                :src="scope.row.scene"
                                alt
                                style="height:100px;width:100px"
                                />
                            <img
                                v-else
                                src="thumbnail"
                                alt
                                style="height:100px;width:100px"
                                />
                        </div>
                        <div v-if="scope.row.sceneType == 'video'">
                            <video style="height:100px;width:100px"
                                 :src="scope.row.scene">
                            </video>
                        </div>
                    </template>
                </el-table-column>


                <!-- 1未审核 2 通过  3 不通过  -->
                <el-table-column
                    prop="status"
                    label="状态"
                    align="center">
                    <template slot-scope="scope">
                        <div class="status" v-if="scope.row.status == '1'">
                            未审核
                            <div class="checkbox">
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="accept(scope.$index, scope.row)">受理</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="refuse(scope.$index, scope.row)">拒绝</el-button>
                            </div>
                        </div>
                        <div class="status statusbg3" v-else-if="scope.row.status == '2'">通过</div>
                        <div class="status statusbg" v-else-if="scope.row.status == '3'">拒绝</div>

                    </template>
                </el-table-column>

                

                
            </el-table> 
            

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
// import CheckArticle from './CheckArticle.vue'
    export default {
        name: "productApplication",
        inject:['reload'],
        data(){
            return{
                nowpage:1,
                nowpageSize:10,
                currentPage:1,
                total:null,
                productList:[],  //新品商品的所有数据
                searchInput:'',//模糊查询的绑定值
            }
        },
        created(){
            
        },
        mounted(){
            this.getproductApplication()
        },
        methods: {
            // 受理
            accept(index,row){
                console.log('row',row.id)
                this.$confirm('此操作将受理此次申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var that = this
                    var mydata = {
                        id:row.id
                    }
                    this.$axios({
                        url: '/tryOut/acceptancey',
                        method: 'post',
                        data:mydata
                    }).then((res)=>{
                        
                        if(res.data.flag){
                            that.$message({
                                type: 'success',
                                message: '受理操作已完成'
                            }); 
                            that.reload()
                        }
                        
                        
                    }).catch((err)=>{
                        console.log(err)
                    })
                
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已撤消操作'
                    });      
                });
            },
            // 拒绝受理
            refuse(index,row){
                console.log('row',row.id)
                this.$confirm('此操作将拒绝此次申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var that = this
                    var mydata = {
                        id:row.id
                    }
                    this.$axios({
                        url: '/tryOut/acceptancen',
                        method: 'post',
                        data:mydata
                    }).then((res)=>{
                        
                        if(res.data.flag){
                            that.$message({
                                type: 'success',
                                message: '受理操作已完成'
                            }); 
                            that.reload()
                        }
                        
                        
                    }).catch((err)=>{
                        console.log(err)
                    })
                
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已撤消操作'
                    });      
                });
            },
            // 分页查询所有新品申请
            getproductApplication(){
                var that = this
                var mydata = {
                    page:this.currentPage,
                    size:this.nowpageSize,
                    status:''
                }
                this.$axios({
                    url: '/tryOut/select',
                    method: 'post',
                    data:mydata
                }).then((res)=>{
                    
                    if(res.data.flag){
                        that.total = res.data.data.total
                        var mydata = res.data.data.list
                        mydata.forEach(function(item,index){
                            item.createTime_transfer = that.createGoodsTime(item.createTime)
                            item.sceneType = that.filetype.matchFileSuffixType(item.scene)
                        })
                        that.productList = mydata;
                    }
                    console.log('分页查询所有新品申请',that.productList)
                    
                }).catch((err)=>{
                    console.log(err)
                })
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
                // console.log(`每页 ${val} 条`);
                this.currentPage = 1
                this.nowpageSize = val
                this.getproductApplication()
            },
            handleCurrentChange(val) {
                //  console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getproductApplication()
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
        display: flex;
        justify-content: flex-end;
        margin: 20px 0 20px 30px;
    }
    .status{
        display: flex;
        flex-direction: column;
    }

    .checkbox{
        display: flex;
        justify-content: flex-start;
    }

</style>



