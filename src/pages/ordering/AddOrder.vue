<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>添加订单</span>
            </div>
        </div>
       <div class="manege-content">
           <el-form :model="form" :rules="rules" ref="form"   label-width="120px" style="padding:40px">
                <el-form-item label="用户ID" prop="consumer_id">
                    <el-input v-model="form.consumer_id" oninput="value = value.replace(/[^0-9]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="订单类型" prop="orderType">
                    <el-select v-model="form.orderType" placeholder="请选择订单类型">
                        <el-option label="一" value="1"></el-option>
                        <el-option label="二" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下单时间" prop="orderDate">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.orderDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                
                <el-form-item label="商品列表">
                    <div class="goodsList" id="ul1" v-for="(item,index) in form.orderGoodsList" :key="index">
                        <div>
                            <el-form-item label="商品ID">
                                <el-input v-model="item.goods_id" placeholder="请输入商品ID"></el-input>
                            </el-form-item>
                            <el-form-item label="购买数量">
                                <el-input-number v-model="item.number" @change="handleChange" :min="1" :max="100" label="购买数量"></el-input-number>
                            </el-form-item>
                        </div>
                    </div>
                    <el-button type="primary" @click="addgoodsMes()">添加商品信息</el-button>
                </el-form-item>
                <el-form-item label="金额" prop="price">
                    <el-input v-model="form.price" oninput="value = value.replace(/[^0-9]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="支付状态" prop="pay_status">
                    <el-switch v-model="form.pay_status"></el-switch>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item label="运输状态" prop="ship_status">
                    <el-select v-model="form.ship_status" placeholder="请选择运输状态">
                        <el-option label="未发货" value="1"></el-option>
                        <el-option label="已发货" value="2"></el-option>
                        <el-option label="已收货" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即添加</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>

<script type="text/javascript">

    export default {
        name: "AddOrder",
        data(){
            return{
                form: {
                    consumer_id:'',
                    orderType: '',
                    orderDate: '',
                    orderGoodsList:[
                            {goods_id:'',number:''}
                        ],
                    pay_status: false,
                    remark:'',
                    num:'',
                    price:''
                },
                goodsList:[
                    {order_id:'',goods_id:'',number:''}
                ],
                rules: {
                    consumer_id: [
                        { required: true, message: '请输入用户ID', trigger: 'blur' },
                    ],
                    orderType: [
                        { required: true, message: '请选择订单类型', trigger: 'blur' },
                    ],
                    orderDate:[
                        { required: true, message: '请选择下单时间', trigger: 'blur' },
                    ],
                    price:[
                        { required: true, message: '请输入订单金额', trigger: 'blur' },
                    ],
                    pay_status:[
                        { required: true, message: '请选择支付状态', trigger: 'blur' },
                    ]
                 },
                // cnt: 0
            }
        },
        
        created(){
           
        },
        mounted(){
            
        },
        methods: {
            onSubmit() {
                console.log('this.form',this.form)
                this.form.num = this.getstr()
                this.form.orderDate = this.changeTime(this.form.orderDate)
                // console.log('pay_status',this.form.pay_status)
                this.form.pay_status = this.form.pay_status == true ? '0' : (this.form.pay_status == false ? '1' : '2')
                // console.log('pay_status',this.form.pay_status)
                // /order/add
                var vm = this;
                this.$axios.post('/order/add',this.form).then(function (response) {
                    // console.log('response',vm.response)
                    vm.$router.push('/home/Ordering');
                })
                .catch(function (error) {
                    console.log('catch')
                });
            },
            add(){
                this.cnt++;
                // console.log('this.cnt',this.cnt)
                this.goodsList.push(this.newObjStory('1000','1','1','1'));
            },
            newObjStory(id,name,goods_id,number){
                var num = this.cnt
                // console.log('num',num)
                this.goodsList[num].id = id
                // console.log('this.goodsList',this.goodsList)
            },
            addgoodsMes(){
                var a = this.form.orderGoodsList
                var b = [{goods_id:'',number:''}]
                var c = a.concat(b)
                this.form.orderGoodsList = c
            },
            handleChange(value) {
                // console.log(value);
            },
            changeTime(time){
                time = Date.parse(time)
                return time
            },
            // 随机生成订单编号
            getstr(){
                var len = 11;
                /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    
                var maxLen = $chars.length;
                var str = '';
                for (var i = 0; i < len; i++) {
                    str += $chars.charAt(Math.floor(Math.random() * maxLen));
                }
                return str;
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
    .goodsList .el-form-item{
        height: 80px;
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
    .goodsList{
        border: 1px solid #eee;
        margin: 15px;
        padding: 15px;
    }
</style>
