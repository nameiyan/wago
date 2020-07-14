<template>
    <div class="no-msg top">
        <div class="top-title">
            <div class="titlelist">
                <img src="../../assets/images/manege.png" alt="" height="19px" width="19px">
                <span>积分管理</span>
            </div>
        </div>
         <div class="manege-content">
            <div class="search" >
                <div class="searchbox">
                    <el-input style="height:50px;width:200px;margin:20px"
                        placeholder="请输入查询文章名称"
                        v-model=" unclearSearch"
                        clearable>
                    </el-input>
                    <el-button class="but" type="primary" plain @click="search()">查询</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%" border>

                <el-table-column
                    label="ID"
                    prop="id"
                    align="center"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="名字"
                    align="center">
                </el-table-column>

                <el-table-column
                    prop="changejifen"
                    label="积分"
                    align="center">
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                       
                    </template>
                </el-table-column>

            </el-table>
             <!-- 分页 -->
            <el-pagination
                @size-change="changeSize"
                @current-change="changePage"
                :page-size="nowpageSize"
                 layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            <!-- 编辑积分规则 -->
             <el-dialog
                title=""
                ref='wany'
                :visible.sync="checkarticlevisible"
                width="70%"
                center>

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名字" prop="name">
                        <div>{{ ruleForm.name }}</div>
                    </el-form-item>

                    <el-form-item label="分数" prop="changejifen">
                        <el-input-number v-model="ruleForm.changejifen" :min="0" :max="1000" ></el-input-number>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="editsubmit('ruleForm')" class="editsubmit">提交</el-button>
                    </el-form-item>
                </el-form>

            </el-dialog>
       </div>
    </div>
</template>

<script>
    export default {
        name: "pointManagement",
        inject:['reload'],
        data(){
            return{
                tableData:[],
                nowpage: 1,
                nowpageSize: 10,
                total:null,
                unclearSearch:'',
                ruleForm:[],    ////编辑弹框的数据
                rules: {
                    typeName: [
                        { required: true, message: '请输入类型', trigger: 'blur' }
                    ],
                   
                },
                checkarticlevisible:false,//编辑躺狂是否显示
            }
        },
        
        created(){
           
        },
        mounted(){
            this.getPointList();
        },
        methods: {
            // 编辑部分的提交数据
            editsubmit:function(){
                var that = this;
                var param = {
                    id:this.ruleForm.id,
                    changejifen:this.ruleForm.changejifen
                };
                console.log('param',param)
                this.$axios({
                   url:'/jifen/updateJifenControl',
                   data:param,
                   method:'post'
                }).then(function (res) {
                    console.log('res',res)
                    if(res.data.flag){
                        that.$message.success('修改成功！')
                        that.checkarticlevisible = false
                        that.reload()
                    }
                })
                .catch(function (error) {

                 });
            },
            // 修改积分规则
            handleEdit:function(index,row){
                this.checkarticlevisible = true
                // 深克隆一下所要编辑行的数据
                var m = {};
                for(var k in row){
                     m[k] = row[k]
                }
                // console.log(m)
                this.ruleForm = m;

            },
            // 模糊查询
            search:function(){
                this.getPointList()
            },
            // 查询所有积分规则
            getPointList:function(){
                var that = this;
                var param = {
                    currentPage:this.nowpage,
                    pageSize:this.nowpageSize,
                    queryString:this.unclearSearch
                };

                this.$axios({
                   url:'/jifen/findPageJifenControl',
                   data:param,
                   method:'post'
                }).then(function (res) {
                    that.tableData = res.data.rows
                    that.total = res.data.total
                })
                .catch(function (error) {

                 });
            },
             // 分页的页数
            changePage(page) {
                 console.log('page',page)
                this.nowpage = page;
                this.getPointList();
            },
            // 分页的每页有多少条数据
            changeSize(pagesize) {
                
                this.nowpageSize = pagesize;
                this.nowpage = 1;
                this.getPointList();
            },
            // 分页结束
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
    .editsubmit{
        margin-left: 40%;
    }
</style>
