<template>
    <div id="app" v-cloak>
        <router-view v-if="isShow"  :key='key' ></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        provide(){
            return{
                reload:this.reload
            }
        },
        computed:{
            key() {
                    return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
            }

        },
        data(){
            return{
                isShow:true
            }
        },
        methods:{
            reload(){
                this.isShow = false;
                this.$nextTick(function(){
                    this.isShow = true
                })
            }
        }
    }
</script>

<style>
.el-popup-parent--hidden{
    overflow: auto;
}
    [v-cloak]{ display:none}
    
    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        width: 100%;
        height: 100%;
        color: #666;
        /*overflow: hidden;*/
    }

    #app {
        width: 100%;
        height: 100%;
    }

    .table-box {
        border: 1px solid #cacaca;
        overflow: auto;
        /*margin: 4px 6px;*/
    }

    .table-box::-webkit-scrollbar { /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .table-box::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }

    .table-box::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #EDEDED;
    }

    .addPro .el-select {
        width: 100px;
    }
    .addPro .el-form-item__content{
        line-height: 20px;
    }
    [v-cloak] {
  display: none;
}
</style>
