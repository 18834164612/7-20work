// wins  要放入轮播图的窗口
// opts   json  实现轮播图的各种选项卡
//      img  数组   要包含轮播图图片的数组
//      links  数组  图片链接地址
//      imgColor Array图片的颜色，用于全屏显示的颜色拼接
//      imgSize  数组  第一个参数代表宽度   第二个参数代表高度
//         btnColor  String  按钮的颜色
//         btnActive String  获得焦点的按钮颜色
//         btnPose   数组  第一个参数代表的是x位置    y位置

function wheel(wins, opts, runOpts) {

    //参数初始化
    var wins = document.querySelector(wins)
    if (!(wins && wins.nodeType == 1)) {
        console.error("窗口元素not find")
        return;
    }
    //图片的地址添加一个
    opts.img.push(opts.img[0])
    //链接的地址添加一个
    opts.links.push(opts.links[0])
    //图片颜色添加一个
    opts.imgColor.push(opts.imgColor[0])

    var imgLength = opts.img.length
    if (imgLength == 0) {
        console.error("没有传入相应的轮播内容")
        return;
    }

    var imgSize = opts.imgSize;
    if (!(imgSize instanceof Array)) {
        console.error("请传入合法的尺寸类型")
    }
    if (imgSize.length == 0) {
        imgSize[0] = document.documentElement.clientWidth;
        imgSize[1] = 400;
    }
    if (imgSize.some(function (val) {
        return val == 0
    })) {
        for (var i = 0; i < 2; i++) {
            if (imgSize[i] == 0) {
                imgSize[i] = 500;
            }
        }
    }
    console.log(imgSize)
    var btnColor = opts.btnColor || "green";
    var btnActive = opts.btnActive || "red";
    var btnPos = opts.btnPos || ["center", "20"]

    var runOpts = runOpts || {}
    var time = 0;
    if (runOpts.time) {
        time = runOpts.time * 1000;
    } else {
        time = 5000;
    }
    var eachtime = 0;
    if (runOpts.time) {
        eachtime = runOpts.eachtime * 1000;
    } else {
        eachtime = 2000;
    }



    var runStyle = "null";
    if (runOpts.runStyle == "linner" || runOpts.runStyle) {
        runStyle = Tween.Linera;
    } else if (runOpts.runStyle == "in") {
        runSTyle = Tween.Quad.easeIn;
    } else if (runOpts.runStyle == "out") {
        runSTyle = Tween.Quad.easeOut;
    }


    //创建html结构和样式
    //1.win样式
    wins.style.cssText = "width:100%;height:" + imgSize[1] + "px;position:relative;"
    //2.添加容器
    var box = document.createElement("div")
    box.style.cssText = "width:" + imgLength * 100 + "%;height:100%;border:1px solid red;"
    wins.appendChild(box)
    //创建每一个轮播图

    for (var i = 0; i < imgLength; i++) {
        var divList = document.createElement("div")
        divList.style.cssText = `float:left;width:${100 / imgLength}%;height:100%;background:${opts.imgColor[i]};`

        var link = document.createElement("a");

        link.href = opts.links[i];
        link.style.cssText = "width:" + imgSize[0] + "px;height:" + imgSize[1] + "px;display:block;margin:auto;background:url(" + opts.img[i] + ")no-repeat 0 0 "

        divList.appendChild(link);

        box.appendChild(divList);
    }

    //创建按钮
    var btnBox = document.createElement("div");
    btnBox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:" + btnPos[1] + "px"
    var btns = []
    for (var i = 0; i < imgLength - 1; i++) {
        var bgcolor = i == 0 ? btnActive : btnColor
        var btn = document.createElement("div");
        btn.style.cssText = "width:10px;height:10px;background:" + btnColor + ";border-radius:50%;margin:0 10px;cursor:pointer;float:left";
        btnBox.appendChild(btn);
        btns.push(btn)
    }

    wins.appendChild(btnBox)

    //进行轮播
    var winW = parseInt(getComputedStyle(wins, null).width)
    console.log(winW)
    var num = 0;
    function move() {
        num++;
        if (num > btns.length - 1) {
            animate(box, {
                "margin-left": -num * winW
            }, eachtime, runStyle, function () {
                box.style.marginLeft = 0;
            })
            num = 0;
        } else {

            animate(box, {
                "margin-left": -num * winW
            }, eachtime, runStyle)
        }
        for (i = 0; i < btns.length; i++) {
            btns[i].style.background = btnColor
        }
        btns[num].style.background = btnActive

    }
    var t = setInterval(move, time)


    for (let i = 0; i < btns.length; i++) {

        btns[i].onclick = function () {
            num = i
            for (var j = 0; j < btns.length; j++) {
                btns[j].style.background = btnColor;
            }
            btns[num].style.background = btnActive;
            animate(box, {
                "margin-left": -num * winW
            }, eachtime, runStyle)
        }

    }
    //鼠标移入移出
    wins.onmouseover = function () {
        clearInterval(t)
    }
    wins.onmouseout = function () {
        t = setInterval(move, 3000)
    }

}