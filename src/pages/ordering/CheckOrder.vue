<template>
    <div style="padding:0 70px">
        <el-form ref="form" :model="tableorder" label-width="80px">
            <el-form-item label="ID">
                <p>{{ tableorder.id }}</p>
            </el-form-item>
            <el-form-item label="下单时间">
                <p>{{ tableorder.orderDate }}</p>
            </el-form-item>
            <el-form-item label="订单编号">
                <p>{{ tableorder.num }}</p>
            </el-form-item>
            <el-form-item label="订单类型">
                <p>{{ tableorder.orderType }}</p>
            </el-form-item>
            <el-form-item label="支付状态">
                <div style="display:flex;justify-content:flex-start;">
                    <p>{{ tableorder.pay_status == '1' ? '未支付' : (tableorder.pay_status == '2' ? '已支付' : '') }}</p>
                    <el-button @click="payEdit()" type="primary" icon="el-icon-edit" style="margin-left:50px;" circle></el-button>
                </div>
                <!-- 修改支付状态的盒子 -->
                <div class="ship" v-if="payVisible == true">
                    <span style="padding-right:20px">支付状态:</span>
                    <el-radio-group v-model="pay_status">
                        <el-radio :label="1">未支付</el-radio>
                        <el-radio :label="2">已支付</el-radio>
                    </el-radio-group>
                    <p slot="footer" class="dialog-footer">
                        <el-button @click="payVisible = false">取 消</el-button>
                        <el-button type="primary" @click="changepaystatus">确 定</el-button>
                    </p>
                </div>
            </el-form-item>
            <el-form-item label="运输状态" >
                <div style="display:flex;justify-content:flex-start;">   
                    <p>{{ tableorder.ship_status == '1' ? '未发货' :(tableorder.ship_status == '2' ? '已发货' : '已收货') }}</p>
                    <el-button @click="shipEdit()" type="primary" icon="el-icon-edit" style="margin-left:50px;" circle></el-button>
                </div>
                <!-- 修改运输状态的盒子 -->
                <div class="ship" v-if="shipVisible == true">
                    <span style="padding-right:20px">运输状态:</span>
                    <el-radio-group v-model="shipStatus">
                        <el-radio :label="1">未发货</el-radio>
                        <el-radio :label="2">已发货</el-radio>
                        <el-radio :label="3">已收货</el-radio>
                    </el-radio-group>
                    <p slot="footer" class="dialog-footer">
                        <el-button @click="shipVisible = false">取 消</el-button>
                        <el-button type="primary" @click="changeShipstatus">确 定</el-button>
                    </p>
                </div>
            </el-form-item>
            <!-- 地址 -->
            <el-from-item>
                
            </el-from-item>
            <el-form-item label="用户ID">
                <p>{{ tableorder.consumer_id }}</p>
            </el-form-item>
            <el-form-item label="备注">
                <p>{{ tableorder.remark }}</p>
            </el-form-item>
            <el-form-item label="金额">
                <p>{{ tableorder.price }}</p>
            </el-form-item>
            <el-form-item label="商品">
                <template>
                    <table border="1px" width="100%"  v-for="(item,index) in tableorder.orderGoodsList" :key="index">
                        <tr>
                            <th>商品ID :   {{ item.goods_id }}</th>
                            <th>购买数量 :   {{ item.number }}</th>
                        </tr>
                    </table>
                </template>
            </el-form-item>

        </el-form>
        
    </div>
</template>

<script>
    export default {
        name: "tableorder",
        props:["tableorder"],
        data(){
            return{
               shipVisible:false,
               ship:'',
               shipStatus:1,
               payVisible:false,
               payStatus:1
            }
        },
        
        created(){
           
        },
        mounted(){
           
        },
        methods: {
            // 根据用户查询地址
            getusersAddress(){
                var url = '/wago/address/select' 
                var mydata = {
                    userid:this.tableorder.consumer_id
                }
                var vm = this;
                this.$axios.post(url,).then(function (response) {
                    // console.log('response',vm.response)
                    // vm.$router.push('/home/Ordering');
                    vm.$message({
                        message: '支付状态修改成功',
                        type: 'success'
                        });
                    vm.payVisible = false;
                })
                .catch(function (error) {
                    console.log('catch')
                });
            },
            // 运输状态编辑
            shipEdit(){
                this.shipVisible = !this.shipVisible
            },
            // 支付状态
            payEdit(){
                console.log('tableorder',this.tableorder)
                this.payVisible = !this.payVisible
            },
            //修改支付状态
            changepaystatus(){
                this.tableorder.pay_status = this.payStatus
                var mydata = '/order/editPayStatus?orderId=' + this.tableorder.num + '&payStatus=' + this.shipStatus
                var vm = this;
                this.$axios.post(mydata).then(function (response) {
                    // console.log('response',vm.response)
                    // vm.$router.push('/home/Ordering');
                    vm.$message({
                        message: '支付状态修改成功',
                        type: 'success'
                        });
                    vm.payVisible = false;
                })
                .catch(function (error) {
                    console.log('catch')
                });
            },
            // 修改运输状态
            changeShipstatus(){
                this.tableorder.ship_status = this.shipStatus
                var mydata = '/order/editShipStatus?orderId=' + this.tableorder.num + '&shipStatus=' + this.shipStatus
                var vm = this;
                this.$axios.post(mydata).then(function (response) {
                    // console.log('response',vm.response)
                    // vm.$router.push('/home/Ordering');
                    vm.$message({
                        message: '运输状态修改成功',
                        type: 'success'
                    });
                    vm.shipVisible = false;
                })
                .catch(function (error) {
                    console.log('catch')
                });
            }
        }
    }
    
</script>
<style>
   
</style>
<style scoped>
    tr{
       height: 60px;
       
    }
    th{
        border: none;
    }
    .ship{
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px 30px;
        margin: 10px;
    }
    .dialog-footer{
        padding:10px;
        margin-left: 35%;
    }
</style>
