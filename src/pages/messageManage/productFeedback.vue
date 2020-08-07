<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>新品反馈</span>
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
                <el-button type="primary" plain @click="acceptList()" class="toadd">批量受理</el-button>
                <el-button type="primary" plain @click="refuseList()" class="toadd">批量拒绝</el-button>
                <el-button type="primary" plain @click="acceptAll()" class="toadd">
                    受理所有反馈
                </el-button>
            </div>
            <template>
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    border
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>

                    <el-table-column
                        type="index"
                        label="ID"
                        width="80"
                        align="center">
                    </el-table-column>

                    <el-table-column
                        prop="name"   
                        label="用户名"
                        align="center">
                    </el-table-column>

                    <el-table-column
                        prop="phone"   
                        label="电话"
                        align="center">
                    </el-table-column>

                    <el-table-column
                        prop="scene"   
                        label="应用场景"
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

                    <el-table-column
                        prop="satisfaction"
                        label="满意度"
                        align="center">
                        <template slot-scope="scope">
                            <div class="block">
                                <el-rate
                                    v-model="scope.row.satisfaction"
                                    :colors="colors"
                                    disabled>
                                </el-rate>
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
                                        @click="acceptOne(scope.$index, scope.row)">受理</el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="refuseOne(scope.$index, scope.row)">拒绝</el-button>
                                </div>
                            </div>
                            <div class="status statusbg3" v-else-if="scope.row.status == '2'">通过</div>
                            <div class="status statusbg" v-else-if="scope.row.status == '3'">拒绝</div>

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
        name: "productFeedback",
        inject:['reload'],
        data(){
            return{
                tableData: [],
                nowpage:1,
                nowpageSize:10,
                currentPage:1,
                total:null,
                idListAccept:[],   //受理列表
                idListRefuse:[],   //拒绝列表
                multipleSelection:[],
                colors: ['#99A9BF', '#F7BA2A', '#FF9900']
            }
        },
        
        created(){
            
        },
        mounted(){
           this.getEvaluate()
        },
        methods: {
            // 受理所有评价
            acceptAll(){
                this.$confirm('此操作将批量受理所有申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var vm = this;
                    this.$axios.post('/opinion/updateAllByStatus').then(function (res) {
                        if(res.data.flag){
                            vm.$message({
                                type: 'success',
                                message: '所有数据受理成功！'
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
            // 批量受理
            acceptList(){
                console.log('批量受理')
                console.log('this.',this.multipleSelection.length)
                if(this.multipleSelection.length < 1){
                    this.$message({
                        type: 'error',
                        message: '请选择批量处理的数据！'
                    }); 
                }else{
                    var li = []
                    this.multipleSelection.forEach(function(item,index){
                        li = li.concat(item.id)
                    })
                    this.idListAccept = li
                    this.accept()
                }
            },
            // 批量拒绝
            refuseList(){
                console.log('批量拒绝')
                if(this.multipleSelection.length < 1){
                    this.$message({
                        type: 'error',
                        message: '请选择批量处理的数据！'
                    }); 
                }else{
                    var li = []
                    this.multipleSelection.forEach(function(item,index){
                        li = li.concat(item.id)
                    })
                    this.idListRefuse = li
                    console.log('lililili',li)
                    this.refuse()
                }
            },
            // 多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log('this.multipleSelection',this.multipleSelection)
            },
            // 一条数据受理
            acceptOne(index,row){
                this.idListAccept[0] = row.id
                this.accept()
            },
            // 一条数据拒绝受理
            refuseOne(index,row){
                this.idListRefuse[0] = row.id
                this.refuse()
            },
            // 受理
            accept(){
                this.$confirm('此操作将受理此次申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var that = this
                    
                    this.$axios({
                        url: '/opinion/updateStatusy',
                        method: 'post',
                        data:that.idListAccept
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
            refuse(){
                this.$confirm('此操作将拒绝此次申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var that = this
                    
                    this.$axios({
                        url: '/opinion/updateStatusn',
                        method: 'post',
                        data:that.idListRefuse
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
            // 查询所有意见
            getEvaluate() {
                var form = {
                    page:this.currentPage,
                    size:this.nowpageSize,
                    status:""
                }
                console.log('form',form)
                var vm = this;
                this.$axios.post('/opinion/findStatusAll',form).then(function (res) {
                    console.log('意见反馈',res)
                    vm.total = res.data.data.total

                    var mydata = res.data.data.rows
                    mydata.forEach(function(item,index){
                        item.createTime_transfer = vm.createGoodsTime(item.createTime)
                        item.sceneType = vm.filetype.matchFileSuffixType(item.scene)
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
        justify-content: flex-end;
        margin: 0 30px 20px 0;
    }
    .toadd{
        height: 40px;
        width: 120px;
        margin: 20px 40px 0 0;
    }
</style>
