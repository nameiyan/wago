<template>
    <div>
        <div style="margin: 20px;"></div>
        <div width="90%" ref="articletable" :model="articletable" >
            <h1 class="title">题目：{{ articletable.name }}</h1>
            <div class="title_bar">
                <span style="margin-left:50px">作者：{{ articletable.author }}</span>
                <span style="margin-right:100px">创建时间：{{ articletable.create_time_change }}</span>
            </div>
            <div class="text" style="padding:30px">
                {{ articletable.fileName }}
                {{ content }}
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        props:['closeTable','articletable'],
        data(){
            return{
               content:'',
               articletable2:''
            }
        },
        created(){
            // this.getcontent();
        },
        mounted(){
           this.getcontent();
        },
        methods: {
            // 通过文件名获取文章内容
            getcontent(){
                // console.log('articletable',this.articletable)

                // var m = {};
                // for(var k in this.articletable){
                //     m[k] = this.articletable[k]
                // }
                // this.articletable2 = m;

                // console.log('articletable2',this.articletable2)
                var mydata = { 
                    fileName: this.articletable.fileName
                }
                var vm = this;
                this.$axios({
                    url: '/article/findArt',
                    method: 'post',
                    data: mydata
                }).then((re)=>{
                    console.log('返回数据1',typeof re.data.data)
                    vm.content = JSON.parse(re.data.data);
                    console.log('返回数据2',typeof vm.content)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>
<style scoped>
    .title{
        text-align: center;
    }
    .title_bar{
        display: flex;
        justify-content:space-between
    }
</style>
