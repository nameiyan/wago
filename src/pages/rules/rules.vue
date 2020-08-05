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
                <span>规则说明管理</span>
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
                :data="rulesList"
                style="width: 100%"
                border>
                <el-table-column
                    type="index"
                    label="ID"
                    sortable
                    align="center">
                </el-table-column>
                
                <el-table-column
                    prop="name"
                    label="规则说明名字"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="context"
                    label="规则内容"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="create_time_change"
                    label="创建时间"
                    align="center">
                </el-table-column>

            </el-table> 
            <el-pagination
                @size-change='changeSize'
                @current-change='changePage'
                :page-size="nowpageSize"
                layout="total, prev, pager, next, jumper"
                :total='rulesListtotal'>
            </el-pagination>


           
       </div>
    </div>
</template>

<script>
// import CheckArticle from './CheckArticle.vue'
    export default {
        name: "rules",
        data(){
            return{
                nowpage: 1,
                nowpageSize: 10,
                rulesListtotal:null,  //总条数
                rulesList:[],  //用户的数据
                searchInput:'',//模糊查询的绑定值
            }
        },
        created(){
            
        },
        mounted(){
            this.getuserMessage()
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
                    url: '/explain/getAll',
                    method: 'post'
                }).then((res)=>{
                    if(res.data.flag){
                        that.rulesList = res.data.data;
                        that.rulesListtotal = res.data.total
                        var rulesl = that.rulesList
                        rulesl.forEach(function(item, index) {
                            item.create_time_change = that.createGoodsTime(item.create_time)
                        })
                    }
                    
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 商品创建时间的格式转换
            createGoodsTime(value) {
            // console.log('value',value)
            var date = new Date(value);
            var Y = date.getFullYear() + "-";
            var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
            var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            var time = Y + M + D + '  ' + h + ':' + mm + ':' + s;
            return time;
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
        justify-content: space-between;

    }
    .toadd{
        height: 40px;
        width: 120px;
        margin: 20px 40px 0 0;
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