<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>销售名片</span>
            </div>
        </div>
        <div class="manege-content">

            <div class="searchtop">

                <el-select @change="search" class="select" v-model="value" filterable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>

                <div class="search">
                     <el-input class="elinput" clearable
                        placeholder="请输入内容"
                        v-model="searchInput">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button @click="searchFuzzy" plain style="height:40px;margin-left:20px" type="primary" size="mini">查询</el-button>
                </div>

            </div>

            <el-table
                :data="cardList"
                style="width: 100%"
                border>
                <el-table-column
                    type="index"
                    label="ID"
                    sortable
                    width="60"
                    align="center">
                </el-table-column>
                
                <el-table-column
                    prop="cardMingcheng"
                    label="公司名称"
                    width="130"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="cardAddress"
                    label="公司地址"
                    width="130"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="cardName"
                    label="公司联系人名字"
                    width="100"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="cardPhone"
                    label="公司联系人电话"
                    width="130"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="cardResponsiblearea"
                    label="公司负责区域"
                    width="130"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="cardVx"
                    label="微信"
                    width="130"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="cardStatus"
                    label="是否为总公司"
                    width="80"
                    align="center">
                    
                    <template slot-scope="scope">
                         {{ scope.row.cardStatus == '1' ? '否' : (scope.row.cardStatus == '2' ? '是' : '')}}
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            <!--编辑弹窗-->
            <el-dialog
                title="编辑公司名片"
                :visible.sync="updataVisible"
                width="70%"
                center>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                     <el-form-item label="姓名" prop="cardName">
                        <el-input v-model="ruleForm.cardName"></el-input>
                    </el-form-item>

                    <el-form-item label="公司名称" prop="cardMingcheng">
                        <el-input v-model="ruleForm.cardMingcheng"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号" prop="cardPhone">
                        <el-input v-model="ruleForm.cardPhone"></el-input>
                    </el-form-item>

                    <el-form-item label="微信号" prop="cardVx">
                        <el-input v-model="ruleForm.cardVx"></el-input>
                    </el-form-item>

                    <el-form-item label="地址" prop="cardAddress">
                        <el-input v-model="ruleForm.cardAddress"></el-input>
                    </el-form-item>

                    <el-form-item label="负责区域" prop="cardResponsiblearea">
                        <el-input v-model="ruleForm.cardResponsiblearea"></el-input>
                    </el-form-item>
                
                <el-form-item  label="是否为分公司" prop="cardStatus">
                    <!-- 1：分公司    2：总公司 -->
                    <el-radio v-model="ruleForm.cardStatus" label="1">是</el-radio>   
                    <el-radio v-model="ruleForm.cardStatus" label="2">否</el-radio>
                </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>  
    </div>
</template>

<script>
import {validateMobile} from '../../assets/javascript/validate.js';
    export default {
        name: "sellingCard",
        data(){
            return{
               
                cardList:[],   //销售名片的所有信息
                cardListtotal:null,   //销售名片一共有多少条数据
                nowpage: 1,
                nowpageSize: 10,
            //    查询公司的选项
                options: [{
                    value: '1',
                    label: '全部公司'
                    }, {
                    value: '2',
                    label: '总公司'
                    }, {
                    value: '3',
                    label: '分公司'
                    }],
                value: '',   //查询公司的绑定值
                searchInput:'',    //输入框搜索
                // 编辑的数据开始
                updataVisible:false,   //编辑弹框的显示与隐藏
                //    表单
                ruleForm: {
                    cardName: '',
                    cardMingcheng: '',
                    cardPhone: '',
                    cardVx: '',
                    cardAddress: '',
                    cardResponsiblearea: '',
                    cardStatus: '1',
                },
                rules: {
                    cardName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到10 个字符', trigger: 'blur' }
                    ],
                    cardMingcheng: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    cardPhone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }   //手机号验证
                    ],
                    cardVx: [
                        { required: true, message: '请输入微信号', trigger: 'blur' },
                    ],
                    cardAddress: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                    ],
                    cardResponsiblearea: [
                        { required: true, message: '请输入负责区域', trigger: 'blur' },
                    ],
                    cardStatus: [
                        { required: true, message: '请选择是否为子公司', trigger: 'change' }
                    ],
                }
                // 编辑的数据结束
            }
        },
        
        created(){
           
        },
        mounted(){
            this.getallcompanyCard()
        },
        methods: {
            
            // 编辑公司名片的显示
            handleEdit(index,row){
                console.log('ssssssssss',row)
                this.updataVisible = true
                this.ruleForm = row
                this.ruleForm.cardStatus = JSON.stringify(this.ruleForm.cardStatus)
            },

            submitForm(formName) {
                var that = this
                var mydata = that.ruleForm
                console.log('mydata',mydata)
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios({
                            url:'/businessCard/updateById',
                            data:mydata,
                            method:'post'
                        }).then(function (res) {
                            if(res.data.flag){
                                that.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                that.updataVisible = false
                                that.$router.push({name:'sellingCard'}) 
                            }else{
                                that.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                });
                            }
                        })
                        .catch(function (error) {
                            
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            // 模糊查询
            searchFuzzy(){
                console.log('模糊查询')
                var that = this;
                if(that.searchInput.length < 1 ){
                    that.$message.error('请输入查询公司的名称')
                }else{
                    var param = {
                        currentPage:that.nowpage,
                        pageSize:that.nowpageSize,
                        queryString:that.searchInput
                    }
                    
                    console.log('that.nowpageSize', typeof that.nowpageSize)

                    this.$axios.post('/businessCard/findAll',param).then(function (res) {
                        console.log('模糊查询',res.data)
                        if(res.data.flag){
                            if(res.data.data.total == 0){
                                that.$message.error('暂无此公司')
                            }else{
                                that.cardList = res.data.data.rows
                                that.cardListtotal = res.data.data.total
                            }
                        }else{
                            that.$message.error('查询失败')
                        }
                      
                    })
                    .catch(function (error) {
                        that.$message.error('查询失败')
                    });
                }
               
            },
            // 公司查询
            search:function(val){
                if(val == '1'){
                    // 查询全部公司
                     this.getallcompanyCard()
                }else if(val == '2'){
                    // 查询总公司
                     this.getzongcompanyCard()
                }else if(val == '3'){
                    // 查询分公司
                     this.getsellData()
                }
            },
            // 分页的页数
            changePage(page) {
                console.log('page',page)
                this.nowpage = page;
                this.getsellData();
            },
            // 分页的每页有多少条数据
            changeSize(pagesize) {
                console.log('pagesize',pagesize)
                this.nowpageSize = pagesize;
                this.nowpage = 1;
                this.getsellData();
            },
            // 查询全部公司
            getallcompanyCard(){
                var that = this;
                var param = {
                    currentPage:that.nowpage,
                    pageSize:that.nowpageSize,
                    queryString:''
                }
                this.$axios.post('/businessCard/findAll',param).then(function (res) {
                    console.log('全部公司名片',res)
                    if(res.data.flag){
                        that.cardList = res.data.data.rows
                        that.cardListtotal = res.data.data.total
                    }else{
                        that.$message.error('查询失败')
                    }
                })
                .catch(function (error) {
                     that.$message.error('查询失败')
                });
            },
            // 查询总公司
            getzongcompanyCard(){
                 var that = this;
                var param = {
                    currentPage:that.nowpage,
                    pageSize:that.nowpageSize,
                    query:''
                }
                this.$axios.post('/businessCard/findZongCompany').then(function (res) {
                    console.log('总公司名片',res.data.data)
                    if(res.data.flag){
                        console.log('2222222')
                        that.cardList = []
                        that.cardList[0] = res.data.data
                        that.cardListtotal = 1
                    }else{
                        that.$message.error('查询失败')
                    }
                })
                .catch(function (error) {
                    that.$message.error('查询失败')
                });
            },
            // 分公司的数据
            getsellData(){
                var that = this;
                var param = {
                    currentPage:that.nowpage,
                    pageSize:that.nowpageSize,
                    query:''
                }
                this.$axios.post('/businessCard/findPage',param).then(function (res) {
                    console.log('分公司名片',res.data.data)
                    if(res.data.flag){
                        that.cardList = res.data.data.rows
                        that.cardListtotal = res.data.data.total
                    }else{
                        that.$message.error('查询失败')
                    }
                })
                .catch(function (error) {
                     that.$message.error('查询失败')
                });
           },
        //    删除每条的名片
           handleDelete(index,row){
                console.log('index',index)
                console.log('row',row.cardId)
                var that = this
                var mydata = {
                    cardId:row.cardId
                }
                console.log('mydata',mydata)
             
                this.$confirm('此操作将永久删除该公司, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios({
                            url:'/businessCard/delete',
                            data:{
                                cardId:row.cardId
                            },
                            method:'post'
                         }).then(function (res) {
                            console.log('删除',res)
                            if(res.data.flag){
                                // 删除成功后再次查询全部公司
                                that.getallcompanyCard()
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else{
                                that.$message({
                                    type: 'error',
                                    message: '删除成功!'
                                });
                            }
                         })
                        .catch(function (error) {
                            
                         });



                    //     this.$axios({
                    //         url:'/businessCard/delete',
                    //         method:'post',
                    //         data:mydata,
                    //         headers: {'Content-Type':'application/x-www-form-urlencoded'}
                    //     }).then(function (res) {
                    //         console.log('删除名片',res)
                    //         if(res.data.flag){
                                
                    //         }else{
                    //             that.$message.error('删除失败')
                    //         }
                    //     })
                    //     .catch(function (error) {
                            
                    //     });
                        
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                }
              
        }
    }
    
</script>
<style>

</style>
<style scoped>
    .no-msg{
        font-size: 16px;
        width:100%;
        height: 100%;
        overflow: hidden;

    }
    .top{
        /*color: #f57866;*/
        color: #409EFF;
       
    }
    .manege-content{
        background: #fff;
        margin: 37px 35px;
        padding: 30px;
        position: relative;
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
    .select{
        margin-bottom:10px
    }
    .searchtop{
        display: flex;
        justify-content: flex-start;
    }
    .search{
        margin-left: 30px;
        display: flex;
        justify-content: flex-start;
    }
</style>
