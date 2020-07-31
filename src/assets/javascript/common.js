import axios from 'axios'
import {post, fetch, patch, put} from '@/http/http.js'
// axios.defaults.baseURL = "http://192.168.3.40:8080/wago"
axios.defaults.baseURL = "https://fly.hemajia.net/wago"

export default {
    install(Vue, options) {

            // Vue.prototype.url = "http://192.168.1.135:8080/tuangou/",          //liang
            // Vue.prototype.url = "http://39.105.187.204:8080/tuangou/",          //正服务器路径
            // Vue.prototype.url = "http://192.168.1.100:82",          //测试服务器路径
            // Vue.prototype.url = "http://fly.hemajia.net/wago",     //http://fly.hemajia.net   服务器的路径
            Vue.prototype.$http = {post, fetch, patch, put},                   //axiox封装请求函数
            Vue.prototype.$axios = axios;
            Vue.prototype.$ali = {                                             //阿里云OSS key参数
                region: 'oss-cn-beijing',
                accessKeyId: 'LTAIcI5PIWHua6L5',
                accessKeySecret: 'K64ojjB8jKqgIcp69Hk9E6IEBeqW3s',
                bucket: 'tuangou-2'
            },
            // Vue.prototype.aliurl = 'https://tuangou-2.oss-cn-beijing.aliyuncs.com/', //阿里云拼接路径
            Vue.prototype.aliurl = 'https://fluploadvideo.oss-cn-beijing.aliyuncs.com/',   //添加文章的视频下载的阿里云的地址
            Vue.prototype._ajax = function (url, option, callback, hedas) {
                if (hedas == undefined) {
                    hedas = {}
                }
                post(Vue.prototype.url + url, option,hedas).then(resp => {
                    // console.log(url,resp);
                    if (resp.state == 1) {
                        callback(resp.data);
                    } else {
                        Vue.prototype.$message({
                            message: resp.message,
                            type: 'warning'
                        })
                    }
                }, error => {
                    Vue.prototype.$message({
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                })
            },
            // 因为使用次数太多, 对elementUI的message进行了二次封装
            Vue.prototype._message = function (type, msg) {
                let txt = '';
                switch (type) {
                    case 1:
                        txt = 'success';
                        break;
                    case 2:
                        txt = 'warning';
                        break;
                    case 3:
                        txt = 'error';
                        break;
                    default:
                        txt = 'info';
                }
                Vue.prototype.$message({
                    message: msg,
                    type: txt
                });
            },
            // 循环请求接口，外部判断
            Vue.prototype._ajaxAll = function (url, option, hedas, callback) {
                if (hedas == undefined) {
                    hedas = {}
                }
                post(Vue.prototype.url + url, option,hedas).then(resp => {
                    // if (resp.state == 1) {
                        // console.log(resp);
                        callback(resp);
                    // } else {
                    //     Vue.prototype.$message({
                    //         message: resp.message,
                    //         type: 'warning'
                    //     })
                    // }
                }, error => {
                    Vue.prototype.$message({
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                })
            },
            Vue.prototype.doPrint = function (id) {
                let newstr = document.getElementById(id).innerHTML;
                let oldstr = document.body.innerHTML;
                document.body.innerHTML = newstr;
                window.print();
                document.body.innerHTML = oldstr;
                window.location.reload();
            },
            Vue.prototype.formatDateTime = function (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                return y + '-' + m + '-' + d+' '+h+':'+minute;
            }
            // 时间处理
            
    }
}
