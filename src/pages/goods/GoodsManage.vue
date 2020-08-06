<template>
  <div class="no-msg top">
    <div class="top-title">
      <div class="titlelist">
        <img src="../../assets/images/manege.png" alt height="19px" width="19px" />
        <span>商品管理</span>
      </div>
    </div>
    <div class="manege-content">
      <!-- 模糊查询 -->
      <div class="search">
        <!-- <template>
            <el-button type="primary" plain>查询新品</el-button>
        </template>-->
        <!-- 根据类型查询商品 -->
        <!-- <template>
          <el-select
            style="margin-left:30px"
            v-model="value"
            @change="change"
            clearable
            placeholder="请选择商品类型"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template> -->
        <!-- 模糊查询 -->
        <template>
          <el-input
            style="height:45px;width:200px;margin:20px"
            placeholder="请输入需要查询的标题"
            v-model=" unclearSearch"
            clearable
          ></el-input>
          <el-button class="searchBox" type="primary" plain @click="querySearch()">查询</el-button>
        </template>
      </div>


      <el-table
        :data="tableData2"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        sortable="custom"
        border
      >
        <!-- ID -->
        <el-table-column
          type="index"
          label="ID"
          align="center"
          sortable
          :sort-by="['productid']"
        ></el-table-column>
        <!-- 商品名称 -->
        <el-table-column 
                    prop="productName" 
                    label="商品名称"
                    align="center"
                    >
        </el-table-column>
        
        <el-table-column 
                    prop="title" 
                    label="标题"
                    align="center"
                    >
        </el-table-column>

        <el-table-column 
                    prop="subtitle" 
                    label="副标题"
                    align="center"
                    >
        </el-table-column>

        <!-- 图片 -->
        <el-table-column label="图片" align="center" width="150">
          <template slot-scope="scope">
            <img
              v-if="scope.row.thumbnail != ''"
              :src="scope.row.thumbnail"
              alt
              style="height:100px;width:100px"
            />
            <img
              v-else
              src="thumbnail"
              alt
              style="height:100px;width:100px"
            />
          </template>
        </el-table-column>

        <!-- 数量 -->
        <el-table-column
                    prop="num"
                    label="数量"
                    align="center"
                    >
        </el-table-column>

        <!-- 积分 -->
        <el-table-column 
                    prop="jifen" 
                    label="积分" 
                    align="center"
                    sortable
                  >
        </el-table-column>

        <!-- 描述 -->
        <el-table-column 
                    prop="miaoshu" 
                    label="描述" 
                    align="center"
                  >
        </el-table-column>

        <!-- 时间 -->
        <el-table-column
                label="时间"
                width="150"
                align="center">
              <template slot-scope="scope">
                  {{ scope.row.create_time_change }}
              </template>
        </el-table-column>
        
        <!-- newProduct  1积分商城，2新品，3专属礼品 -->
        <el-table-column
                    prop="newProduct"
                    label="商品类型"
                    align="center"
                  >
                  <template slot-scope="scope">
                    <div class="status" v-if="scope.row.newProduct == '1'">积分商城</div>
                    <div class="status statusbg" v-else-if="scope.row.newProduct == '2'">新品</div>
                    <div class="status statusbg3" v-else-if="scope.row.newProduct == '3'">专属礼品</div>
                  </template>
        </el-table-column>

         <!-- productStatus 0未开始 1新品开始，2新品结束-->
        <el-table-column
              prop="productstatus"
              label="活动状态"
              align="center"
            >
            <template slot-scope="scope">
              <div class="status" v-if="scope.row.productstatus == '0'">未开始</div>
              <div class="status statusbg3" v-else-if="scope.row.productstatus == '1'">新品开始</div>
              <div class="status statusbg" v-else-if="scope.row.productstatus == '2'">新品结束</div>
            </template>
        </el-table-column>

        <!--可兑换等级   zhuanduan   1   2

        zhuanduan等级对应的名称     zhuangrade-->
        <!-- zhuanduan等级对应的名称 -->
        <!--<el-table-column
                    prop="newProduct"
                    label="状态"
                    align="center">
              <template slot-scope="scope">
                  <div class="status" v-if="scope.row.newProduct == '1'">上架</div>
                  <div class="status statusbg1" v-else>已下架</div>
              </template>      
        </el-table-column>-->

        <!-- 状态 1上架 2 下架-->
        <el-table-column
                    prop="status"
                    label="状态"
                    align="center">
              <template slot-scope="scope">
                  <div @click="sellOff(scope.$index, scope.row)" class="status" v-if="scope.row.status == '1'">上架</div>
                  <div @click="sellOn(scope.$index, scope.row)" class="status statusbg1" v-else>已下架</div>
              </template>      
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="nowpageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalMessage"
      ></el-pagination>
      <!--编辑弹窗-->
      <el-dialog title="编辑商品" :visible.sync="updataVisible" width="70%" center>
        <GoodsEdit
          ref="waaan"
          v-if="updataVisible"
          :closeTable="closeTable"
          :table="table"
          @close="updataclose"
        ></GoodsEdit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import GoodsEdit from "./GoodsEdit.vue";
export default {
  name: "GoodsManage",
  inject:['reload'],
  components: {
    GoodsEdit
  },
  data() {
    return {
      totalMessage: null,
      nowpage: 1,
      nowpageSize: 10,
      currentPage: 1,
      tableData: [],//查回的原始数据
      tableData2:[], //对原始数据处理后的数据
      // 编辑弹框的数据
      updataVisible: false,
      table: [],
      unclearSearch: "",
      // goodstype:'',   //商品分类
      options: [
        {
          value: "1",
          label: "服饰"
        },
        {
          value: "2",
          label: "电子产品"
        },
        {
          value: "3",
          label: "家具用品"
        },
        {
          value: "4",
          label: "食品"
        },
        {
          value: "5",
          label: "其他"
        }
      ],
      value: ""
    };
  },

  created() {
    // this.adminName = sessionStorage.getItem('admin_name')
  },
  mounted() {
    this.goodsMessage();
  },
   watch:{
     $route (to, from) {
      this.$router.go(0)
    }
  },
  methods: {
    // 模糊查询
    querySearch(){
      this.goodsMessage()
    },
    // 上架的按钮   进行下架的操作
    sellOff(index, row){
      console.log('index',index)
      console.log('row',row.productid)
      var that = this
      this.$confirm('此操作将下架此商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var mydata = {
                  productid:row.productid
                };
                this.$axios.post('/product/down',mydata).then(function (res) {
                    // console.log('111111111111',res)
                    if(res.data.flag){
                        // 下架后
                        that.$message({
                            type: 'success',
                            message: '下架成功!'
                        });
                        that.goodsMessage()   //重新查询商品列表
                    }

                 })
                 .catch(function (error) {
                // console.log('321')
                 });
               
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已撤消操作'
                });      
            });
    },
    // 下架按钮点击   进行上架的操作
    sellOn(index, row){
        console.log('row',row.productid)
        var that = this
        this.$confirm('此操作将上架此商品, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  var mydata = {
                    productid:row.productid
                  };
                  this.$axios.post('/product/up',mydata).then(function (res) {
                      // console.log('111111111111',res)
                      if(res.data.flag){
                          // 下架后
                          that.$message({
                              type: 'success',
                              message: '上架成功!'
                          });
                          that.goodsMessage()   //重新查询商品列表
                      }

                   })
                   .catch(function (error) {
                  // console.log('321')
                   });
                
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已撤消操作'
                  });      
              });
    },
     // 分页查询所有商品   包括模糊查询
    goodsMessage() {
      var param = {
        currentPage: this.nowpage,
        pageSize: this.nowpageSize,
        queryString: this.unclearSearch
      };
    
      var vm = this;
      this.$axios.post("/product/select", param)
      .then(function(res) {
          if (res.data.flag) {
            vm.totalMessage = res.data.data.total;
            vm.tableData2 = res.data.data.list;
            // 时间格式转换
            vm.tableData2.forEach(function(item, index) {
                item.create_time_change = vm.createGoodsTime(item.createTime)
            })
          }
      })
      .catch(function(error) {});
    },
    // 分页的每页有多少条数据
    handleSizeChange(pagesize) {
      //  console.log(`每页 ${pagesize} 条`);
      this.nowpageSize = pagesize;
      this.nowpage = 1;
      this.goodsMessage();
    },
    // 当前页
    handleCurrentChange(page) {
      // console.log(`当前页: ${page}`);
      this.nowpage = page;
      this.goodsMessage();
    },
    
    // 商品创建时间的格式转换
    createGoodsTime(value) {
      // console.log('value',value)
      var date = new Date(value);
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var time = Y + M + D;
      return time;
    },
    // 删除一条商品
    handleDelete(index, row) {
        var that= this;
        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                var mydata = {
                  productid:row.productid
                };
                that.$axios.post('/product/delete',mydata).then(function (res) {
                    if(res.data.flag){
                        // 删除后再次查询商品
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.goodsMessage()
                    }
                    })
                    .catch(function (error) {
                    // console.log('321')
                    });
               
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });      
            });
       
    },
    // 编辑弹框关闭
    closeTable() {
      this.updataVisible = false;
    },
   
    
   
   
    // 编辑弹框展示
    handleEdit(index, row) {
      this.updataVisible = true;
      // console.log('编辑',index, row);
    
      // 传给编辑弹框的数据
      this.table = row;
    },
    // 编辑弹窗的关闭
    updataclose() {
      this.updataVisible = false;
    },
    
  }
};
</script>
<style>
.no-msg .manege-content .el-pagination {
  padding: 15px 15px;
  margin-bottom: 150px;
  justify-content: flex-end !important;
}
</style>
<style scoped>
.no-msg {
  font-size: 16px;
  width: 100%;
  height: 100%;
}
.top {
  /*color: #f57866;*/
  color: #409eff;
}
.manege-content {
  background: #fff;
  margin: 37px 35px;
}
.no-msg > .top-title {
  height: 66px;
  line-height: 66px;
  color: #00a0e9;
  padding-left: 32px;
  background: #fff;
}
.titlelist {
  width: 129px;
  border-bottom: 3px solid #47a6ff;
  text-align: center;
  align-items: center;
}
.titlelist img {
  /* display:inline-block; */
  vertical-align: middle;
}
.search{
  display: flex;
  justify-content: flex-start;
}

.status{
  height: 25px;
  width: 50px;
  background:#8BB63B;
  color: #fff;
  text-align: center;
  line-height: 25px;
  border-radius: 4px;
  font-size: 12px;
}
.statusbg1{
  background: #838383;
}
.statusbg{
  background: blue;
}
.statusbg3{
  background: red;
}
.searchBox{
  height: 40px;
  margin-top: 20px;
}
</style>
