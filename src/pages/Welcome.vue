<template>
    <div class="no-msg top">
       <div class="manege-content">
           <div class="content-title">
               <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
           </div>
           <!-- 员工角色分配 -->
           <div class="content-left">
               
           </div>
           <!-- 角色权限设置 -->
           <div class="content-right">
               
           </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "welcome",
        data(){
            return{
                // adminName:'',
            }
        },
        created(){
            // this.adminName = sessionStorage.getItem('admin_name')
        },
         methods: {
            routeto(formName) {
                this.$router.push({name: 'Login'});
                console.log("输出")
            }
        }
    }
</script>

<style scoped>
    .no-msg{
        font-size: 16px;
        font-weight: bold;
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
    }
    
</style>
