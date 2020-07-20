function wheel(wins, opts, runOpts) {
    //初始化窗口
    this.wininit(wins);
    //初始化图片尺寸 长度
    this.optsinit(opts, runOpts)
    //初始化按钮
    this.btninit(opts);
    //初始化时间
    this.timeinit(runOpts);
    //初始化运动类型
    this.runinit(runOpts);
    //获取窗口
    this.getwin(opts);
    //创建盒子
    this.getbox();
    //创建按钮
    this.getbtn()
    //自动播放
    this.autoplay();
    //点击播放
    this.onclickplay()
}

wheel.prototype = {
    //窗口元素初始化
    wininit(wins) {
        var wins = document.querySelector(wins)
        if (!(wins && wins.nodeType == 1)) {
            console.error("窗口元素not find")
            return;

        }
        this.wins = wins;
    },
    //图片数组尺寸初始化
    optsinit(opts, runOpts) {
        this.opts = opts;
        this.runOpts = runOpts;

        opts.img.push(opts.img[0])
        opts.links.push(opts.links[0])
        opts.imgColor.push(opts.imgColor[0])

        this.imgLength = opts.img.length
        if (this.imgLength == 0) {
            console.error("没有传入相应的轮播内容")
            return;
        }

        this.imgSize = opts.imgSize;
        if (!(this.imgSize instanceof Array)) {
            console.error("请传入合法的尺寸类型")
        }
        if (this.imgSize.length == 0) {
            this.imgSize[0] = document.documentElement.clientWidth;
            this.imgSize[1] = 400;
        }
        if (this.imgSize.some(function (val) {
            return val == 0
        })) {
            for (var i = 0; i < 2; i++) {
                if (this.imgSize[i] == 0) {
                    this.imgSize[i] = 500;
                }
            }
        }
    },

    //按钮初始化
    btninit(opts) {
        this.btnColor = opts.btnColor || "green";
        this.btnActive = opts.btnActive || "red";
        this.btnPos = opts.btnPos || ["center", "20"]
    },

    //时间初始化
    timeinit(runOpts) {
        this.runOpts = runOpts || {}
        this.time = 0;
        if (runOpts.time) {
            this.time = this.runOpts.time * 1000;
        } else {
            this.time = 5000;
        }
        this.eachtime = 0;
        if (this.runOpts.time) {
            this.eachtime = this.runOpts.eachtime * 1000;
        } else {
            this.eachtime = 2000;
        }
    },

    //运动初始化
    runinit(runOpts) {
        this.runStyle = "null";
        if (runOpts.runStyle == "linner" || runOpts.runStyle) {
            this.runStyle = Tween.Linera;
        } else if (runOpts.runStyle == "in") {
            this.runSTyle = Tween.Quad.easeIn;
        } else if (runOpts.runStyle == "out") {
            this.runSTyle = Tween.Quad.easeOut;
        }
    },
    //获取窗口
    getwin(opts) {
        this.wins.style.cssText = "width:100%;height:" + imgSize[1] + "px;position:relative;"
    },
    //创建盒子
    getbox() {
        var box = document.createElement("div")
        this.box = box
        this.box.style.cssText = "width:" + imgLength * 100 + "%;height:100%;border:1px solid red;"
        wins.appendChild(box)

        for (var i = 0; i < imgLength; i++) {
            var divList = document.createElement("div")
            this.divList = divList
            this.divList.style.cssText = `float:left;width:${100 / imgLength}%;height:100%;background:${opts.imgColor[i]};`

            var link = document.createElement("a");
            this.link = link
            this.link.href = opts.links[i];
            this.link.style.cssText = "width:" + imgSize[0] + "px;height:" + imgSize[1] + "px;display:block;margin:auto;background:url(" + opts.img[i] + ")no-repeat 0 0 "

            this.divList.appendChild(link);

            this.box.appendChild(divList);
        }
    },

    //创建按钮
    getbtn() {
        var btnBox = document.createElement("div");
        this.btnBox = btnBox
        this.btnBox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:" + this.btnPos[1] + "px"
        this.btns = []
        for (var i = 0; i < imgLength - 1; i++) {
            var bgcolor = i == 0 ? this.btnActive : this.btnColor
            var btn = document.createElement("div");
            btn.style.cssText = "width:10px;height:10px;background:" + btnColor + ";border-radius:50%;margin:0 10px;cursor:pointer;float:left";
            btnBox.appendChild(btn);
            this.btns.push(btn)
        }

        this.wins.appendChild(btnBox)
    },
    //自动播放
    autoplay() {
        var winW = parseInt(getComputedStyle(wins, null).width)
        this.winW = winW
        var num = 0;
        function move() {
            num++;
            if (num > this.btns.length - 1) {
                animate(this.box, {
                    "margin-left": -num * winW
                }, this.eachtime, this.runStyle, function () {
                    this.box.style.marginLeft = 0;
                })
                num = 0;
            } else {

                animate(this.box, {
                    "margin-left": -num * winW
                }, this.eachtime, this.runStyle)
            }
            for (i = 0; i < this.btns.length; i++) {
                this.btns[i].style.background = btnColor
            }
            this.btns[num].style.background = btnActive

        }
        this.t = setInterval(move, time)
    },
    //点击播放
    onclickplay() {

        for (let i = 0; i < btns.length; i++) {

            this.btns[i].onclick = function () {
                num = i
                for (var j = 0; j < this.btns.length; j++) {
                    this.btns[j].style.background = btnColor;
                }
                this.btns[num].style.background = btnActive;
                animate(this.box, {
                    "margin-left": -num * winW
                }, this.eachtime, this.runStyle)
            }

        }
    }
}