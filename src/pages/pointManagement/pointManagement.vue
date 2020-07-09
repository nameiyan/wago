<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>积分管理</span>
            </div>
        </div>
         <div class="manege-content">
            
       </div>
    </div>
</template>

<script>
    export default {
        name: "pointManagement",
        data(){
            return{
              
            }
        },
        
        created(){
           
        },
        mounted(){
            // this.getOrderList();
        },
        methods: {
            
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
