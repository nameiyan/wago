<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>用户管理</span>
            </div>
        </div>
        <div class="manege-content">

            <!-- <div class="searchtop">
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

            </div> -->

            <!-- <el-table
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
            </el-table> -->
            <!-- <el-pagination
                @size-change='changeSize'
                @current-change='changePage'

                :page-size="nowpageSize"
                layout="total, prev, pager, next, jumper"
                :total='cardListtotal'>
            </el-pagination>  -->
            <!--编辑弹窗-->
            <!-- <el-dialog
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
                
                <el-form-item  label="是否为分公司" prop="cardStatus"> -->
                    <!-- 1：分公司    2：总公司 -->
                    <!-- <el-radio v-model="ruleForm.cardStatus" label="1">是</el-radio>   
                    <el-radio v-model="ruleForm.cardStatus" label="2">否</el-radio>
                </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog> -->
        </div>  
    </div>
</template>

<script>
    export default {
        name: "userMessage",
        data(){
            return{
               
            }
        },
        
        created(){
           this.getuserMessage()
        },
        mounted(){
            
        },
        methods: {
            getuserMessage(){
                console.log('1111111111111111111111')

                this.$axios({
                    url: '/user/selectUser',
                    method: 'post',
                    data: {
                        id:myid
                    }
                }).then((res)=>{
                    console.log('',)
                    // if(re.data.flag){
                    //     that.ruleForm = re.data.data;
                    //     that.content = JSON.parse(re.data.data.safetyContent)
                    // }
                    
                }).catch((err)=>{
                    console.log(err)
                })
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
