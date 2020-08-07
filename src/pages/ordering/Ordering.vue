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
                <!--<div class="telephone_search">
                   <span style="width:125px">用户ID</span>
                   <el-input v-model="userId" placeholder="请输入用户ID"></el-input>
                   <el-button @click="search" type="primary" style="height:40px;width:80px;margin:20px 10px 0 30px">查询</el-button>
                </div> -->
            </div>

            

            <el-table
                :data="tableData"
                style="width: 90%;margin-left:5%"
                border>

                <el-table-column
                    type="index"
                    label="ID"
                    sortable
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="order.createTime"
                    align='center'
                    label="订单创建时间">
                </el-table-column>

                <el-table-column
                    prop="product.productName"
                    align='center'
                    label="产品名称">
                </el-table-column>
                
                <el-table-column
                    prop="product.thumbnail"
                    align='center'
                    label="产品图片"
                    width="140">
                    <template slot-scope="scope">
                        <img
                            v-if="scope.row.product.thumbnail != ''"
                            :src="scope.row.product.thumbnail"
                            alt
                            style="height:100px;width:100px"
                            />
                        <img
                            v-else
                            src="product.thumbnail"
                            alt
                            style="height:100px;width:100px"
                            />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="address.name"
                    align='center'
                    label="收货人">
                </el-table-column>

                <el-table-column
                    prop="address.phone"
                    align='center'
                    label="联系电话">
                </el-table-column>

                <el-table-column
                    prop="address.address"
                    label="地址"
                    align='center'
                    width="120">
                </el-table-column>

                <el-table-column
                    prop="order.remarks"
                    align='center'
                    label="备注">
                </el-table-column>

                <el-table-column
                    prop="order.expressnumber"
                    label="快递单号"
                    align='center'
                    width="130">
                    <template slot-scope="scope">
                        <span>{{ scope.row.order.expressnumber }}</span>
                        <el-button
                            v-if="scope.row.order.expressnumber == null"
                            size="mini"
                            type="success"
                            @click="showExpress(scope.$index, scope.row)">填写快递单号
                        </el-button>
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
        
            <!-- 填写快递单号 -->
            <el-dialog
                title="快递单号"
                :visible.sync="orderVisible"
                width="70%"
                center>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="快递单号">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addExpressnumber">立即添加</el-button>
                    </el-form-item>
                </el-form>
                
            </el-dialog>
       </div>
    </div>
</template>

<script>
    export default {
        name: "Ordering",
        inject:['reload'],
        data(){
            return{
                nowpage:1,
                nowpageSize:10,
                currentPage:1,
                total:null,
                tableData: [],
                orderVisible:false,
                form: {
                    name: ''
                },
                orderid:'',

                activeName: 'first',  //tab默认展示第一个tab里的内容
                checked: false,    //全选
                
                daterange:'',//日期范围
                orderCodeSearch:'',//订单编号
                telephone:'',   //用户手机号
                totalMessage:null,
                nowpage:1,
                nowpageSize:10,
                currentPage:1,
                goodsVisible:false,
                
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
                     page:this.currentPage,
                     size:this.nowpageSize
                };
                // console.log('param',param)
                var vm = this;
                this.$axios.post('/order/select',param).then(function (res) {
                    console.log('res',res)
                    if(res.data.flag){
                        vm.total = res.data.data.total,
                        vm.tableData = res.data.data.rows
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1
                this.nowpageSize = val
                this.getOrderList()
            },
            handleCurrentChange(val) {
                 console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getOrderList()
            },
            showExpress(index,row){
                this.orderVisible = true
                this.orderid = row.order.orderid
            },
            // 填写快递单号
            addExpressnumber(orderid){
                console.log('orderid',orderid)
                if(orderid == ''){
                    console.log('orderidddddddddddddd')
                    return
                }
                var param = {
                    orderid:this.orderid,
                    expressnumber:this.form.name,   // 发货时写,其他时候不用
                    status:"2"
                };
                console.log('param',param)
                var vm = this;
                this.$axios.post('/order/acceptance',param).then(function (res) {
                    console.log('res',res)
                    if(res.data.flag){
                        vm.$message({
                            type: 'success',
                            message: '提交成功!'
                        });
                        vm.orderVisible = false
                        vm.reload()
                    }

                })
                .catch(function (error) {
                    console.log('catch')
                });
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
