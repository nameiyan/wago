import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export default{
    install(Vue,options){
        // 判断是不是整数
        Vue.prototype.isNumber  = function(val){
            var reg=/^[0-9]+.?[0-9]*$/;
            if(!reg.test(val)) {
                this.$message({
                    message: '请输入数字',
                    type: 'warning'
                });
                return false;
            }else{
                return true;
            }

        }
        //获取当前时间
        Vue.prototype.getDate =function() {
            var now = new Date();

            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日

            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();           //秒

            var clock = year + "-";

            if(month < 10)
                clock += "0";

            clock += month + "-";

            if(day < 10)
                clock += "0";

            clock += day + " ";

            if(hh < 10)
                clock += "0";

            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm + ":";

            if (ss < 10) clock += '0';
            clock += ss;
            return(clock);
        }
        Vue.prototype.exportFunc=function(el, name) {
            if (this.chooseList.length == 0) {
                this.$message({
                    type: 'error',
                    message: '您没有选择打印的订单，请从左方挑选'
                });
            }else{
                let date = this.getDate(new Date());
                // 从表生成工作簿对象
                var wb = XLSX.utils.table_to_book(document.getElementById(el));
                // 得到二进制字符串作为输出
                var wbout = XLSX.write(wb, {
                    bookType: 'xlsx',
                    type: 'binary'
                });
                // wb是要导出的表格的json数据
                FileSaver.saveAs(new Blob([this.s2ab(wbout)], {
                    type: 'application/octet-stream'
                }), date + name + '.xlsx');
                // this.sleeveShow = false;
            }
        }
        Vue.prototype.exportFunc2=function(el, name) {
            let date = this.getDate(new Date());
            // 从表生成工作簿对象
            var wb = XLSX.utils.table_to_book(document.getElementById(el));
            // 得到二进制字符串作为输出
            var wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                type: 'binary'
            });
            // wb是要导出的表格的json数据
            FileSaver.saveAs(new Blob([this.s2ab(wbout)], {
                type: 'application/octet-stream'
            }), date + name + '.xlsx');
            // this.sleeveShow = false;
        }
        Vue.prototype.s2ab=function (s) {
            var cuf;
            var i;
            if (typeof ArrayBuffer !== 'undefined') {
                cuf = new ArrayBuffer(s.length);
                var view = new Uint8Array(cuf);
                for (i = 0; i !== s.length; i++) {
                    view[i] = s.charCodeAt(i) & 0xFF;
                }
                return cuf;
            } else {
                cuf = new Array(s.length);
                for (i = 0; i !== s.length; ++i) {
                    cuf[i] = s.charCodeAt(i) & oxFF;
                }
                return cuf;
            }
        }

    }
}
