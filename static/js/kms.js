/**
 *   _____ _     _     _     _  ____  __  _____
 *  / ____| |   (_)   | |   | |/ /  \/  |/ ____|
 * | |    | |__  _ ___| |__ | ' /| \  / | (___
 * | |    | '_ \| / __| '_ \|  < | |\/| |\___ \
 * | |____| | | | \__ \ | | | . \| |  | |____) |
 *  \_____|_| |_|_|___/_| |_|_|\_\_|  |_|_____/
 * =================================================
 * ChishKMS's Javascript
 * Author: Chish & ohmyga
 * Link: https://kms.fchish.cn/
 * Github: https://github.com/ChishFoxcat
 * Last Update: 2021/12/05
 *
 * Copyright (c) 2021 ChishKMS All Rights Reserved.
 **/

/* 配置文件 */
var ChishKMSConfig = {
    // 起始年份
    // 这里是版权的起始年份 务必使用 int 类型数字
    year: 2021,

    // URL
    // 自动获取域名并组合成链接 如无需要 无需更改
    // 协议头://主机
    //url: document.location.protocol + '//' + window.location.host,
    url: "https://kms.fchish.cn",

    // KMS 服务状态提示信息
    kms_status: {
        // 正常运行的话
        up: {
            title: "Working :)", // 标题
            text: "当前 KMS 服务正常运行中..." //解释文字
        },
        // 非正常运行
        down: {
            title: "Down :(", // 标题
            text: "当前 KMS 服务出现故障..." // 解释文字
        },
        // 出现错误
        error: {
            title: "Error :(", // 标题
            text: "无法获取 KMS 服务状态..." // 解释文字
        }
    },

    // 链接
    link: {
        cmd: "https://pan.fchish.cn/index.php/s/BY6gFgoy7TxYTkd/download/ChishKMS.cmd", // KMS 激活脚本下载链接
        home: "https://fchish.cn/", // 主站链接
        status: "https://status.fchish.cn/" // 检测站链接
    },

    // 图片链接
    image: {
        pa: "./static/img/%E8%B6%B4.png", // 趴
        hi: "./static/img/hi.png", // HI!
        logo: "./static/img/ChishKMS.png"
    }
};

/* 暂存变量 */
var TempData = {
    // Date 实例
    date: new Date()
};

/* 核心组件 */
var ChishKMS = {
    // 获取底部版权年份
    getCopyYear: function () {
        let now_yaer = TempData.date.getFullYear(); // 当前年份

        // 这是一个三元表达式
        // 如果 `now_yaer`(当前年份) 等于 `ChishKMSConfig.year`(起始年份) 则直接显示当前年份 反之显示 `起始年份 - 当前年份`
        var copy_year = (now_yaer === ChishKMSConfig.year) ? now_yaer : hishKMSConfig.year + " - " + now_yaer

        // 获取 id 为 `copy-year` 的 dom
        // 就是将 `喵...` 替换为版权年份（因为不需要发起网络请求 是本地处理 所以根本没机会看见 `喵...` 除非 Js 没加载完或者监听了页面是否加载完成再执行）
        document.querySelector("#copy-year").innerHTML = copy_year;
    },

    // 获取 KMS 服务器状态
    getKmsStatus: function () {
        ChishKMSLibs.ajax({
            method: "GET",
            url: ChishKMSConfig.url + "/api/status",
            data: "time=" + TempData.date.getTime(),
            successFun: function (rawdata) {
                var data = JSON.parse(rawdata); // 实例化

                if (data.data.status === true) {
                    document.querySelector("#kms-status").innerHTML = ChishKMSConfig.kms_status.up.title;
                    document.querySelector("#kms-status").classList.add("up");

                    document.querySelector("#kms-status-text").innerHTML = ChishKMSConfig.kms_status.up.text;
                } else {
                    document.querySelector("#kms-status").innerHTML = ChishKMSConfig.kms_status.down.title;
                    document.querySelector("#kms-status").classList.add("down");

                    document.querySelector("#kms-status-text").innerHTML = ChishKMSConfig.kms_status.down.text;
                }
            },
            failFun: function (data) {
                document.querySelector("#kms-status").innerHTML = ChishKMSConfig.kms_status.error.text;
                document.querySelector("#kms-status").classList.add("down");

                document.querySelector("#kms-status-text").innerHTML = ChishKMSConfig.kms_status.error.text;

                console.warn("" + "\n" +
                    "[Error] 获取 KMS 服务状态失败" + "\n" +
                    "状态码：" + data.status + "\n" +
                    "返回内容：" + data.response);
            }
        });
    },

    // 初始化
    Init: function () {
        // 设置图片
        document.querySelector(".left-icon .icon").style.backgroundImage = "url('" + ChishKMSConfig.image.logo + "')";
        document.querySelector(".chish-orz").style.backgroundImage = "url('" + ChishKMSConfig.image.pa + "')";
        document.querySelector(".chish-hi.chish-kawaii").style.backgroundImage = "url('" + ChishKMSConfig.image.hi + "')";

        // 设置链接
        document.querySelector("#kms-download-link").href = ChishKMSConfig.link.cmd;
        document.querySelector("#kms-site-home-link").href = ChishKMSConfig.link.home;
        document.querySelector("#kms-status-link").href = ChishKMSConfig.link.status;
    },

    // 判断是否深色模式
    isDark: function () {
        if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // 如果不为深色模式则去掉 body 中的 kms-dark 类
            document.body.classList.remove("kms-dark");
        }

        var schemeGeter = window.matchMedia("(prefers-color-scheme: dark)");
        schemeGeter.addEventListener("change", function (scheme) {
            if (scheme.matches) {
                document.body.classList.add("kms-dark");
            } else {
                document.body.classList.remove("kms-dark");
            }
        });
    },
};

/* 核心库 */
var ChishKMSLibs = {
    ajax: function (obj) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        var method = obj.method.toUpperCase();
        if (method == "GET") {
            xhr.open(method, obj.url + "?" + obj.data, true);
            xhr.send(null);
        } else if (method == "POST") {
            xhr.open(method, obj.url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(obj.data);
        } else {
            console.error("The request method is incorrect, please choose one of GET / POST");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    obj.successFun(xhr.responseText);
                } else {
                    obj.failFun(xhr);
                }
            }
        };
    }
};

/* 手动执行所需运行的函数 */
// 咱知道这很蠢 但是咱只想到了这个方法 别骂惹别骂惹xwx
// 为了节目效果（？）将这些函数在页面资源全部加载完成后再执行所需函数（被敲）
window.addEventListener("load", function () {
    ChishKMS.getCopyYear();
});
// 获取状态就不等资源加载完 直接获取（好耶）
ChishKMS.getKmsStatus();
ChishKMS.Init(); // 初始化也是
ChishKMS.isDark();

/* 控制台版权信息 */
console.clear(); // 清空控制台
console.log("\n %c ⚙ Chish KMS %c https://kms.fchish.cn/ \n",
    "color: #ffffff; background: rgb(255, 165, 0); padding:5px 0; border-radius: 5px 0px 0px 5px;",
    "background:rgba(66, 66, 66, 0.85); padding:5px 0; border-radius: 0px 5px 5px 0px;");