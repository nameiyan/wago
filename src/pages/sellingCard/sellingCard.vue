<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>销售名片</span>
            </div>
        </div>
        <div class="manege-content">
            <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort="{prop: 'date', order: 'descending'}"
                sortable="custom"
                border>
                <el-table-column
                    prop="item_id"
                    label="ID"
                    sortable
                    :sort-by="['item_id','item_name']"
                    width="80">
                </el-table-column>
                
                <el-table-column
                    prop="update_time_change"
                    label="最近修改时间"
                    width="130">
                </el-table-column>
                <el-table-column label="操作">
                    <!-- <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template> -->
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
            <!--编辑弹窗-->
            <el-dialog
                title="编辑商品"
                :visible.sync="updataVisible"
                width="70%"
                center>
                <GoodsEdit ref='waaan'   v-if='updataVisible'  :closeTable='closeTable' :table="table" @close="updataclose"></GoodsEdit>
            </el-dialog>
        </div>  
    </div>
</template>

<script>
    export default {
        name: "sellingCard",
        data(){
            return{
               
            }
        },
        
        created(){
           
        },
        mounted(){
            this.getsellData()
        },
        methods: {
            // 查询销售名片的数据
           getsellData(){
               console.log('查询销售名片的数据')
                var vm = this;
                var param = {
                    page:1,
                    size:10
                }
                this.$axios.get('/businessCard/findAll',param).then(function (response) {
                    console.log('分页查询商品',response)
                })
                .catch(function (error) {
                    
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
</style>
