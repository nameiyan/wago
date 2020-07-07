<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>订单管理</span>
            </div>
        </div>
        <div class="manege-content">
            <div class="top_searchbox">
                <!-- <div class="time_search">
                    <span>下单时间</span>
                    <el-date-picker
                        v-model="daterange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div> -->
                <!-- <div label="订单类型">
                    <el-select v-model="orderCodeSearch" placeholder="请选择订单类型">
                        <el-option label="区域一" value="1"></el-option>
                        <el-option label="区域二" value="2"></el-option>
                    </el-select>
                </div> -->
                <!-- <div class="order_code_search">
                   <span style="width:100px">订单编号</span>
                   <el-input v-model="orderCodeSearch" placeholder="请输入订单编号"></el-input>
                </div> -->
                <!-- 搜索 -->
                <div class="telephone_search">
                   <span style="width:125px">用户ID</span>
                   <el-input v-model="userId" placeholder="请输入用户ID"></el-input>
                   <el-button @click="search" type="primary" style="height:40px;width:80px;margin:20px 10px 0 30px">查询</el-button>
                </div>
            </div>

            

            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 90%;margin-left:5%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    label="全选"
                    type="selection"
                    align='center'
                    width="55">
                </el-table-column>
                <el-table-column
                    label="id"
                    align='center'
                    width="80">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="订单号"
                    align='center'
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="orderDate_change"
                    align='center'
                    label="订单时间">
                </el-table-column>
                <el-table-column
                    prop="orderGoodsList"
                    label="下单商品"
                    align='center'
                    width="100">
                    <template slot-scope="scope">
                        <div v-for="(item,index) in scope.row.orderGoodsList" :key="index">
                            {{ item.goods_id }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderType"
                    align='center'
                    label="订单类型">
                </el-table-column>
                <el-table-column
                    prop="price"
                    align='center'
                    label="商品价格">
                </el-table-column>
                <el-table-column
                    prop="pay_status"
                    align='center'
                    label="支付状态">
                    <!-- 已支付，未支付 -->
                    
                    <template slot-scope="scope">{{ scope.row.pay_status == '1' ? '未支付' : '已支付'}}</template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    align='center'
                    label="备注内容">
                </el-table-column>
                
                <el-table-column
                    prop="ship_status"
                    align='center'
                    label="运输状态">
                    <template slot-scope="scope">{{ scope.row.ship_status == '1' ? '未发货' : (scope.row.ship_status == '2' ? '已发货' :'已收货')}}</template>
                </el-table-column>
                 <el-table-column
                    prop="consumer_id"
                    align='center'
                    label="用户id">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">查看
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change='changeSize'
                @current-change='changePage'
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total='totalMessage'>
            </el-pagination>
            <!-- 商品查看 -->
            <!-- <el-dialog
                title="商品信息"
                :visible.sync="goodsVisible"
                width="70%"
                center>
                <CheckGoods :table="tablelist"></CheckGoods>
            </el-dialog> -->
            <!-- 订单查看 -->
            <el-dialog
                title="商品信息"
                :visible.sync="orderVisible"
                width="70%"
                center>
                <CheckOrder :tableorder="tableorderlist"></CheckOrder>
            </el-dialog>
       </div>
    </div>
</template>

<script>
import CheckOrder from './CheckOrder.vue'
    export default {
        name: "Ordering",
        inject:['reload'],
        components:{ CheckOrder},
        data(){
            return{
                activeName: 'first',  //tab默认展示第一个tab里的内容
                checked: false,    //全选
                tableData: [],
                daterange:'',//日期范围
                orderCodeSearch:'',//订单编号
                telephone:'',   //用户手机号
                totalMessage:null,
                nowpage:1,
                nowpageSize:10,
                currentPage:1,
                goodsVisible:false,
                orderVisible:false,
                tablelist:[],
                tableorderlist:[],
                userId:'',
            }
        },
        
        created(){
           
        },
        mounted(){
            this.getOrderList();
        },
        methods: {
            // 查看订单
            getOrderList(){
                var param = {
                     currentPage:this.nowpage,
                     pageSize:this.nowpageSize
                };
                // console.log('param',param)
                var vm = this;
                this.$axios.post('/order/select',param).then(function (response) {
                    console.log('response',response)
                    if(response.data.flag){
                        vm.totalMessage = response.data.data.total,
                        vm.tableData = response.data.data.list
                    }


                    // vm.totalMessage = response.data.total,
                    // vm.tableData = response.data.rows,
                    vm.tableData.forEach(function(item, index) {
                        item.orderDate_change = vm.createGoodsTime(item.orderDate)
                    })
                    // console.log('数据列表',response.data.rows)
                })
                .catch(function (error) {
                    console.log('catch')
                });
            },
            // 商品创建时间的格式转换
            createGoodsTime(value){
                var date = new Date(value);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var time = Y+M+D;
                return time;
            },
            changePage(page){
                 this.nowpage = page;
                 this.getOrderList()
            },
            changeSize(pagesize){
                 this.nowpageSize= pagesize;
                 this.nowpage =1;
                 this.getOrderList()
             },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 搜索
            search(){
                if(this.userId){
                    var param = '/order/findByUserId?consumer_id=' + this.userId
                    var formdata = {
                        currentPage:this.currentPage,
                        pageSize:this.nowpageSize,
                        queryString:""
                    }
                    var vm = this;
                    this.$axios({
                        url: param,
                        method: 'post',
                        data:formdata,
                        headers: {'Content-Type':'application/json;charset=UTF-8'}
                    }).then(function (response) {
                        // console.log('response',response.data.rows)
                        vm.totalMessage = response.data.total,
                        vm.tableData = response.data.rows,
                        vm.tableData.forEach(function(item, index) {
                            item.orderDate_change = vm.createGoodsTime(item.orderDate)
                        })
                    })
                    .catch(function (error) {
                        console.log('err')
                    });
                }else{
                    this.getOrderList()
                }
                


            //     this.$axios.post('/order/findByUserId?user_id=4').then(function (response) {
            //         console.log('response')
            //     })
            //     .catch(function (error) {
            //         console.log('errddddddddddddddddd')
            //     });

            //     var param = '/order/findByUserId?user_id=' + this.userId;
            //     console.log('param',param)
            //     var vm = this;
            // //     this.$axios.post(param).then(function (response) {
            // //         console.log('response',response)
            // //     })
            // //     .catch(function (error) {
            // //         console.log('err')
            // //     });
            //     var formdata = { user_id : this.userId}
            //     this.$axios({
            //         url: '/order/findByUserId',
            //         method: 'post',
            //         data: formdata,
            //         headers: {'content-Type':'application/json; charset=UTF-8'}
            //     }).then((re)=>{
                    
            //     }).catch((err)=>{
            //         console.log(err)
            //     })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 查看
            handleEdit(index,row){
                // console.log(index,row)
                this.orderVisible = true;
                this.tableorderlist = row
            },
            handleDelete(index,row){
                
                this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var vm = this;
                        var param = '/order/delete?orderId='+row.id;
                        console.log('param',param)
                        this.$axios({
                            url:param,
                            method: 'post',
                            headers: {'content-Type':'multipart/form-data'}
                        }).then(function (response) {
                            if(response.data.flag){
                                vm.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                vm.reload();
                            }else{
                                vm.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log('err')
                        });
                        
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });      
                    });

                    // this.$axios({
                    //         url:'/order/delete',
                    //         method: 'post',
                    //         data:param,
                    //         headers: {'content-Type':'multipart/form-data'}
                    //     }).then(function (response) {
                    //         if(response.data.flag){
                    //             vm.$message({
                    //                 type: 'success',
                    //                 message: '删除成功!'
                    //             });
                    //             vm.reload();
                    //         }else{
                    //             vm.$message({
                    //                 type: 'error',
                    //                 message: '删除失败!'
                    //             });
                    //         }
                    //     })
                    //     .catch(function (error) {
                    //         console.log('err')
                    //     });
               
               
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
    .el-tabs__item{
        height: 50px;
        width: 120px;
        text-align: center;
        line-height: 50px;
    }
    .el-tabs__active-bar{
         width: 120px !important;
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
        color: #606266;
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
    .top_searchbox{
        display: flex;
        justify-content:space-between;
        width: 94%;
        margin-left: 3%;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #eee;
        /* background: blue; */
    }
    .order_code_search,.telephone_search{
        display: flex;
        justify-content:flex-start;
    }
</style>
