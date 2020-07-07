// import FileSaver from 'file-saver';
// import XLSX from 'xlsx';

export default {
    data() {
        return {
            screenHeight: 880,          //弹出窗口
            sleeveShow: false
        }
    },
    created() {
        //获取当前浏览器高度
        this.screenHeight = document.documentElement.clientHeight - 50;
        //绑定onresize事件实时更新窗口高度
        const _this = this;
        window.onresize = function () {
            console.log(_this.screenHeight)
            _this.screenHeight = document.documentElement.clientHeight - 50;
        };
    },
    computed: {

    },
    methods: {
        // 获取当前时间
        transDate(date) {
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return date.getFullYear() + "-" + month + "-" + currentDate;
        },
        //图片加载错误提示图;
        imgError(e) {
            e.target.src = './static/error.png'
        },
        //查看大图方法
        magnifier(url) {
            const h = this.$createElement;
            this.$msgbox({
                title: '图片查看',
                message: h('img', {
                    attrs: {
                        src: this.aliurl + url
                    },
                    style: {
                        width: '100%'
                    },
                    on: {
                        error(e) {
                            console.log(e);
                            e.target.src = './static/error.png'
                        }
                    }
                })
            })
        },
        msgChange(data, msg, text) {
            for (let i = 0; i < msg.lengt; i++) {
                if (data == msg[i]) {
                    return text[i];
                }
            }
        }
    },
    components: {
        // FileSaver,
        // XLSX
    }
}
