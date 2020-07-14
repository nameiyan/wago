<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>用户管理</span>
            </div>
        </div>
        <div class="manege-content">
           
           <div class="searchtop">
                
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
                :data="UserList"
                style="width: 100%"
                border>
                <el-table-column
                    type="index"
                    label="ID"
                    sortable
                    align="center">
                </el-table-column>
                
                <el-table-column
                    prop="phone"
                    label="电话号码"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="nickname"
                    label="昵称"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="headimgurl"
                    label="头像"
                    align="center">
                    <template slot-scope="scope">
                        <img v-if="scope.row.headimgurl != ''" :src="scope.row.headimgurl" alt style="height:100px;width:100px" />
                        <img v-else src="../../assets/images/undefined.png" alt style="height:100px;width:100px" />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="channel"
                    label="渠道"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="distributor"
                    label="经常采购的经销商"
                    align="center">
                </el-table-column>

                
            </el-table> 
            <el-pagination
                @size-change='changeSize'
                @current-change='changePage'

                :page-size="nowpageSize"
                layout="total, prev, pager, next, jumper"
                :total='cardListtotal'>
            </el-pagination>
            
        </div>  
    </div>
</template>

<script>
    export default {
        name: "userMessage",
        data(){
            return{
                nowpage: 1,
                nowpageSize: 10,
                cardListtotal:null,  //总条数
                UserList:[],  //用户的数据
                searchInput:'',//模糊查询的绑定值
            }
        },
        
        created(){
           this.getuserMessage()
        },
        mounted(){
            
        },
        methods: {
            // 模糊查询
            searchFuzzy(){
                console.log('searchInput',this.searchInput)
                this.getuserMessage()
            },
            // 初始数据查询
            getuserMessage(){
                var that = this
                var mydata = {
                    currentPage:that.nowpage,
                    pageSize:that.nowpageSize,
                    queryString:that.searchInput
                }
                this.$axios({
                    url: '/user/selectUser',
                    method: 'post',
                    data: mydata,
                }).then((res)=>{
                    that.UserList = res.data.rows;
                    that.cardListtotal = res.data.total
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 分页的页数
            changePage(page) {
                this.nowpage = page;
                this.getuserMessage();
            },
            // 分页的每页有多少条数据
            changeSize(pagesize) {
                this.nowpageSize = pagesize;
                this.nowpage = 1;
                this.getuserMessage();
            },
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
        margin: 20px 0 20px 30px;
        display: flex;
        justify-content: flex-start;
    }
</style>
