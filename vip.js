// ==UserScript==
// @name              X全网视频会员
// @author            程鹏
// @version           2.0.2
// @charset		      UTF-8
// @namespace         https://greasyfork.org/users/29438
// @icon              https://tntfiles.com/preview/31c8a98f301329ede30e359d5ffba187381eb397faf33829a77e98dc9d0d7545.jpg
// @description       一个平平无奇的小脚本【支持爱奇艺、腾讯、优酷、芒果、乐视、PPTV、哔哩哔哩、AcFun等主流视频平台免费去广告观看VIP会员视频，以及高清普清电视观看。若播放页不显示此插件或播放失败，请反馈QQ2943871928，反馈请备注"会员脚本"或来意.佛系更新,随缘更新。♡个人主页: http://app.5luck.cn/id/♡】
// @updateURL         https://greasyfork.org/zh-CN/scripts/426063-x%E5%85%A8%E7%BD%91%E8%A7%86%E9%A2%91%E4%BC%9A%E5%91%98
// @installURL        https://cdn.jsdelivr.net/gh/29438/img@master/vip.js
// @downloadURL       https://greasyfork.org/scripts/426063-x%E5%85%A8%E7%BD%91%E8%A7%86%E9%A2%91%E4%BC%9A%E5%91%98/code/X%E5%85%A8%E7%BD%91%E8%A7%86%E9%A2%91%E4%BC%9A%E5%91%98.user.js
// @require           https://cdn.bootcss.com/jquery/3.5.1/jquery.min.js
// @match             *://*.qq.com/*
// @match             *://v.qq.com/x/cover/*
// @match             *://m.v.qq.com/x/cover/*
// @match             *://v.qq.com/x/page/*
// @match             *://m.v.qq.com/x/page/*
// @match             *://m.v.qq.com/*
// @match             *://*.iqiyi.com/*
// @match             *://www.iqiyi.com/v*
// @match             *://m.iqiyi.com/kszt/*
// @match             *://www.iqiyi.com/kszt/*
// @match             *://*.youku.com/*
// @match             *://v.youku.com/v_show/*
// @match             *://m.youku.com/alipay_video/*
// @match             *://*.mgtv.com/*
// @match             *://w.mgtv.com/b/*
// @match             *://m.mgtv.com/b/*
// @match             *://www.mgtv.com/b/*
// @match             *://tv.sohu.com/v/*
// @match             *://*.sohu.com/*
// @match             *://m.tv.sohu.com/v/*
// @match             *://film.sohu.com/album/*
// @match             *://m.film.sohu.com/album/*
// @match             *://*.le.com/*
// @match             *://www.le.com/ptv/vplay/*
// @match             *://m.le.com/ptv/vplay/*
// @match             *://*.pptv.com/*
// @match             *://v.pptv.com/show/*
// @match             *://m.pptv.com/show/*
// @match             *://vip.pptv.com/show/*
// @match             *://*.acfun.cn/*
// @match             *://www.acfun.cn/v/*
// @match             *://m.acfun.cn/v/*
// @match             *://*.bilibili.com/*
// @match             *://www.bilibili.com/video/*
// @match             *://*.bilibili.com/*
// @match             *://m.bilibili.com/video/*
// @match             *://www.bilibili.com/anime/*
// @match             *://m.bilibili.com/anime/*
// @match             *://www.bilibili.com/bangumi/play/*
// @match             *://m.bilibili.com/bangumi/play/*
// @match             *://vip.1905.com/play/*
// @include           *://www.iesdouyin.com/share/video/*
// @include           *://ddrk.me/*
// @include           *://www.so.com/*
// @include           *://hao.360.com/*
// @include           *://www.baidu.com/*
// @include           *://cn.bing.com/*
// @include           *://www.sogou.com/*
// @connect           ixigua.com
// @connect           zhihu.com
// @connect           douyinvod.com
// @connect           aweme.snssdk.com
// @connect           iesdouyin.com
// @connect           app.5luck.cn
// @connect           bilibili.com
// @connect           iqiyi.com
// @connect           mgtv.com
// @connect           pl.hd.sohu.com
// @license           GPL License
// @grant             unsafeWindow
// @grant             GM_openInTab
// @grant             GM.openInTab
// @grant             GM_getValue
// @grant             GM_download
// @grant             GM.getValue
// @grant             GM_setValue
// @grant             GM.setValue
// @grant             GM_xmlhttpRequest
// @grant             GM.xmlHttpRequest
// @grant             GM_registerMenuCommand
// @grant             GM_xmlhttpRequest
// @run-at            document-idle

// ==/UserScript==

(function() {
    'use strict';
    var $ = $ || window.$;
    var host = location.host;
    var parseInterfaceList = [];
    var selectedInterfaceList = [];

    function innerParse(url) {
        $("#iframe-player").attr("src", url);
    }


    function GMopenInTab(url, open_in_background) {
        if (typeof GM_openInTab === "function") {
            GM_openInTab(url, open_in_background);
        } else {
            GM.openInTab(url, open_in_background);
        }
    }


    function GMgetValue(name, value) {
        if (typeof GM_getValue === "function") {
            return GM_getValue(name, value);
        } else {
            return GM.getValue(name, value);
        }
    }


    function GMsetValue(name, value) {
        if (typeof GM_setValue === "function") {
            GM_setValue(name, value);
        } else {
            GM.setValue(name, value);
        }
    }

    function GMxmlhttpRequest(obj) {
        if (typeof GM_xmlhttpRequest === "function") {
            GM_xmlhttpRequest(obj);
        } else {
            GM.xmlhttpRequest(obj);
        }
    }

    function GMaddStyle(css) {
        var myStyle = document.createElement('style');
        myStyle.textContent = css;
        var doc = document.head || document.documentElement;
        doc.appendChild(myStyle);
    }
    var originalInterfaceList = [
        //--------------------------------------------------------------------------------------
         { name:"线路一", type:"1", url:"https://vip.parwix.com:4433/player/?url="},
        { name:"线路二", type:"1", url:"https://www.ckplayer.vip/jiexi/?url="},
        { name:"线路三", type:"1", url:"https://api.lhh.la/vip/?url="},
        { name:"线路四", type:"1", url:"https://jiexi.380k.com/?url="},
        { name:"线路五", type:"1", url:"https://api.tv920.com/vip/?url="},
        { name:"线路六", type:"1", url:"https://jx.youyitv.com/?url="},
        { name:"线路七", type:"1", url:"https://jx.618g.com/?url="},
        { name:"线路八", type:"1", url:"https://jx.ivito.cn/?url="},
        { name:"线路九", type:"1", url:"https://jx.youyitv.com/?url="},
        { name:"线路十", type:"1", url:"https://jx.yingxiangbao.cn/vip.php?url="},
        { name:"线路十一", type:"1", url:"https://www.ckmov.vip/api.php?url="},
        { name:"线路十二", type:"1", url:"https://jiexi.380k.com/?url="},
        { name:"线路十三", type:"1", url:"https://vip.bljiex.com/?v="},
        { name:"线路十四", type:"1", url:"https://jsap.attakids.com/?url="},
        { name:"线路十五", type:"1", url:"https://z1.m1907.cn/?jx="},
        { name:"线路十六", type:"1", url:"https://jx.yparse.com/index.php?url="},
        { name:"线路十七", type:"1", url:"https://jx.jiubojx.com/vip.php?url="},
        { name:"线路十八", type:"1", url:"https://www.h8jx.com/jiexi.php?url="},
        { name:"线路十九", type:"1", url:"https://jx.youyitv.com/?url="},
        { name:"线路二十", type:"1", url:"https://jx.rdhk.net/?v="},

        //--------------------------------------------------------------------------------------
        { name:"B站解析一", type:"2", url:"https://vip.parwix.com:4433/player/?url="},
        { name:"B站解析二", type:"2", url:"https://z1.m1907.cn/?jx="},
        { name:"B站解析三", type:"2", url:"https://jiexi.q-q.wang/?url="},
        { name:"解析线路一", type:"2", url:"https://jx.youyitv.com/?url="},
        { name:"解析线路二", type:"2", url:"https://jx.618g.com/?url="},
        { name:"解析线路三", type:"2", url:"https://z1.m1907.cn/?jx="},
        { name:"解析线路四", type:"2", url:"https://jx.ivito.cn/?url="},
        { name:"解析线路五", type:"2", url:"https://api.tv920.com/vip/?url="},
        { name:"解析线路六", type:"2", url:"https://jx.f41.cc/?url="},
        { name:"解析线路七", type:"2", url:"https://jx.yingxiangbao.cn/vip.php?url="},
        { name:"解析线路八", type:"2", url:"https://www.ckmov.vip/api.php?url="},
        { name:"解析线路九", type:"2", url:"https://jiexi.380k.com/?url="},
    ];

    var node = "";
    var player_nodes = [{
        url: "v.qq.com",
        node: "#mod_player"
    }, {
        url: "www.iqiyi.com",
        node: "#flashbox"
    }, {
        url: "v.youku.com",
        node: "#ykPlayer"
    }, {
        url: "www.mgtv.com",
        node: "#mgtv-player-wrap container"
    }, {
        url: "tv.sohu.com",
        node: "#player"
    }, {
        url: "film.sohu.com",
        node: "#playerWrap"
    }, {
        url: "www.le.com",
        node: "#le_playbox"
    }, {
        url: "video.tudou.com",
        node: ".td-playbox"
    }, {
        url: "v.pptv.com",
        node: "#pptv_playpage_box"
    }, {
        url: "vip.pptv.com",
        node: ".w-video"
    }, {
        url: "www.wasu.cn",
        node: "#flashContent"
    }, {
        url: "www.fun.tv",
        node: "#html-video-player-layout"
    }, {
        url: "www.acfun.cn",
        node: "#player"
    }, {
        url: "www.bilibili.com",
        node: "#player_module"
    }, {
        url: "vip.1905.com",
        node: "#player"
    }, {
        url: "www.56.com",
        node: "#play_player"
    }];
    for (var i in player_nodes) {
        if (player_nodes[i].url == host) {
            node = player_nodes[i].node;
        }
    }
    var videoPlayer = $("<div id='iframe-div' style='width:100%;height:100%;z-index:1000;'><iframe id='iframe-player' frameborder='0' allowfullscreen='true' width='100%' height='100%'></iframe></div>");

    var left = 0;
    var top = 100;
    var innerList = [];
    var outerList = [];
    var innerli = "";
    var innerli1 = "";
    var outerli = "";
    originalInterfaceList.forEach((item, index) => {
        if (item.type == "0") {
            innerList.push(item);
            innerli1 += "<li>" + item.nme + "</li>";
        }
        if (item.type == "1") {
            innerList.push(item);
            innerli += "<li>" + item.name + "</li>";
        }
        if (item.type == "2") {
            outerList.push(item);
            outerli += "<li>" + item.name + "</li>";
        }
    });
    parseInterfaceList = innerList.concat(outerList);

    var left = 0;
    var top = 100;
    var Position = GMgetValue("Position_" + host);
    if(!!Position){
        left = Position.left;
        top = Position.top;
    }
    GMaddStyle(`#vip_movie_box {cursor:pointer; position:fixed; top:` + top + `px; left:` + left + `px; width:0px; background-color:#2E9AFE; z-index:2147483647; font-size:20px; text-align:left;}
    #vip_movie_box .stitle {position: absolute;font-family: "楷体";right: 0;top: 110%;width: 1.3em;padding: 0px 2px;text-align: center;color: #fff;cursor: auto;user-select: none;border-radius: 0 10px 10px 0;transform: translate3d(100%, -20%, 0); background: #e5cd68;}
    #vip_movie_box .item_text {width:0px; padding:2px 0px; text-align:center;}
    #vip_movie_box .item_text img {width:30px; height:30px; display:inline-block; vertical-align:middle;}
    #vip_movie_box .vip_mod_box_action {display:none; position:absolute; left:28px; top:0; text-align:center; background-color:#272930; border:1px solid gray;}
    #vip_movie_box .vip_mod_box_action li{font-size:12px; color:#DCDCDC; text-align:center; width:60px; line-height:21px; float:left; border:1px solid gray; padding:0 4px; margin:4px 2px;}
    #vip_movie_box .vip_mod_box_action li:hover{color:#000;background:#ffea98}
    #vip_movie_box .selected_text {width:0px; padding:2px 2px 2px 4px 0px; text-align:center;}
	#vip_movie_box .selected_text img {width:27px; height:25px;display:inline-block; vertical-align:middle;}
    #vip_movie_box .vip_mod_box_selected {display:none; position:absolute; left:30px; top:0; text-align:center; background-color:#272930; border:1px solid gray;}
    #vip_movie_box .vip_mod_box_selected ul{height:455px; overflow-y: scroll;}
    #vip_movie_box .vip_mod_box_selected li{font-size:14px; color:#DCDCDC; text-align:center; width:28px; line-height:27px; float:left; border:1px dashed gray; padding:0 4px; margin:4px 2px;}
    #vip_movie_box .vip_mod_box_selected li:hover{color:#FFF;background:#ffea98}
    #vip_movie_box .qelected_text {width:0px; padding:2px 0px; text-align:center;}
	#vip_movie_box .qelected_text img {width:30px; height:30px;display:inline-block; vertical-align:middle;}
    #vip_movie_box .vip_mod_box_qelected {display:none; position:absolute; left:30px; top:0; text-align:center; background-color:#fff; border:1px solid gray;}
    #vip_movie_box .vip_mod_box_qelected li{font-size:14px;text-align:center; width:150px; line-height:40px; float:left; border:1px solid gray; padding:0 4px; margin:4px 2px;}
    #vip_movie_box .vip_mod_box_qelected li:hover{color:#FF4500;background:#ffea98}
    #vip_movie_box .belected_text {width:0px; padding:2px 0px; text-align:center;}
    #vip_movie_box .belected_text img {width:30px; height:30px;display:inline-block; vertical-align:middle;}
    #vip_movie_box .vip_mod_box_belected {display:none; position:absolute; left:30px; top:0; text-align:center; background-color:#272930; border:1px solid gray;}
    #vip_movie_box .vip_mod_box_belected li{font-size:14px; color:#fff; text-align:center; width:100px; line-height:27px; float:left; border:1px solid gray; padding:0 4px; margin:4px 2px;}
    #vip_movie_box .vip_mod_box_belected ul{height:455px; overflow-y: scroll;}
    #vip_movie_box .vip_mod_box_belected li:hover{color:#FF4500;background:#ffea98}
    #vip_movie_box .aelected_text {width:0px; padding:2px 0px; text-align:center;}
    #vip_movie_box .aelected_text img {width:30px; height:30px;display:inline-block; vertical-align:middle;}
    #vip_movie_box .vip_mod_box_aelected {display:none; position:absolute; left:30px; top:80px; text-align:center; background-color:#272930; border:1px solid gray;}
    #vip_movie_box .vip_mod_box_aelected li{font-size:14px; color:#000; text-align:center; width:200px; line-height:27px; float:left; border:1px solid gray; padding:0 4px; margin:4px 10px;}
    #vip_movie_box .vip_mod_box_aelected li:hover{color:#FF4500;background:#ffea98}
    #vip_movie_box .melected_text {width:0px; padding:2px 0px; text-align:center;}
    #vip_movie_box .melected_text img {width:30px; height:30px;display:inline-block; vertical-align:middle;}
    #vip_movie_box .vip_mod_box_melected {display:none; position:absolute; left:30px; top:0px; text-align:center; background-color:#272930; border:1px solid gray;}
    #vip_movie_box .vip_mod_box_melected li{font-size:14px; color:#DCDCDC; text-align:center; width:80px; line-height:27px; float:left; border:1px solid gray; padding:0 4px; margin:4px 2px;}
    #vip_movie_box .vip_mod_box_melected li:hover{color:#FF4500;background:#ffea98}
    .add{background-color:#ffea98;}`);

    $(function() {
        $("#vip_movie_box").mouseover(function() {
            $(".item_text").slideDown();
            $(".selected_text").slideDown();
            $(".qelected_text").slideDown();
            $(".belected_text").slideDown();
            $(".aelected_text").slideDown();
            $(".melected_text").slideDown();
        });
    });
    $(function() {
        $("#vip_movie_box").click(function() {
            $(".item_text").hide();
            $(".selected_text").hide();
            $(".qelected_text").hide();
            $(".belected_text").hide();
            $(".aelected_text").hide();
            $(".melected_text").hide();
        });
    });
    $(function() {
        $("ul").on("click", "li", function() {
            $("ul li").removeClass("add");
            $(this).addClass("add");
        })
    });

    function selectedList(episodeList) {
        var selectedList = [];
        var innerli = "";
        if (!!episodeList && episodeList.length != 0) {
            episodeList.sort((d1, d2) => {
                return d1.name - d2.name;
            });
            episodeList.forEach((item, index) => {
                selectedList.push(item);
                innerli += "<li title='" + item.description + "'>" + item.name + "</li>";
            });
            $(".vip_mod_box_selected ul").empty();
            $(".vip_mod_box_selected ul").append(innerli);

            $(".selected_text").on("mouseover", () => {
                $(".vip_mod_box_selected").show();
            });
            $(".selected_text").on("mouseout", () => {
                $(".vip_mod_box_selected").hide();
            });
            $(".vip_mod_box_selected li").each((index, item) => {
                item.addEventListener("click", () => {
                    if (document.getElementById("iframe-player") == null) {
                        var player = $(node);
                        player.empty();
                        player.append(videoPlayer);
                    }
                    var num = "";
                    if (host == "www.bilibili.com") {
                        num = 0;
                    } else {
                        num = Math.floor(Math.random());
                    }
                    innerParse(parseInterfaceList[num].url + selectedList[index].href);
                });
            });
        }
    }

    var html = $(`
    <div id='vip_movie_box'>
    <div class="stitle"><ul id="m">收起</ul></div>
    <div class='item_text'>
        <img src='https://cdn.jsdelivr.net/gh/29438/img@master/VIP.png' title='视频解析'/>
        <div class='vip_mod_box_action' style='border:5px solid #ffe474;'>
<div style='display:flex;'>
<div style='width:320px; padding:30px 0;'>

<div style='font-size:20px; text-align:center; color:#ebc834; line-height:21px;'><a style=' color:#ffe474;' href="http://app.5luck.cn/id" target="_blank">☞♡我的主页♡</a></div>
<ul style='margin:0 10px;'>
<div style='clear:both;'></div>
</ul><br/>

<div style='font-size:18px; text-align:center; color:#ffe474; line-height:21px;'>全网VIP视频解析</div>
<div style='font-size:6px; text-align:center; color:#A9A9A9; line-height:21px;'>若播放失败请自行切换线路</div>
<ul style='margin:0 10px;'>
` + innerli + `
<div style='clear:both;'></div>
</ul>


<div style='font-size:18px; text-align:center; color:#ffe474; line-height:21px;'>B站番剧解析</div>
<ul style='margin:0 10px;'>
` + outerli + `
<div style='clear:both;'></div>
</ul>

<div style='font-size:18px; text-align:center; color:#ffe474; line-height:21px;'>常用视频平台</div>
<div style='clear:both;'>

    <style>
        .button1 {
            -webkit-transition-duration: 0.4s;
            transition-duration: 0.4s;
            background:transparent;
            text-align: center;
            width: 70px;height: 25px;
            font-size: 3px;
            color: #ffea98;
            border: 2px solid FFF;
            border-radius:5px;
        }
        .button1:hover {
            background-color: #ffe474;
            color: #000000;
        }
    </style>

    <button class="button1" onclick="window.open('https://www.iqiyi.com/')">爱奇艺</button>
    <button class="button1" onclick="window.open('https://v.qq.com/')">腾讯视频</button>
    <button class="button1" onclick="window.open('https://www.youku.com/')">优酷视频</button>
    <button class="button1" onclick="window.open('https://www.pptv.com/')">PPTV</button>
    <button class="button1" onclick="window.open('https://www.bilibili.com/')">哔哩哔哩</button>
    <button class="button1" onclick="window.open('https://www.mgtv.com/')">芒果TV</button>
    <button class="button1" onclick="window.open('https://www.youku.com/')">乐视视频</button>
        <button class="button1" onclick="window.open('https://ddrk.me/')">免费追剧</button>
</div>

<div style='font-size:10px; text-align:center; color:000; line-height:21px;'><a style='Text-decoration:none; color:#ffe474;' onclick="window.open('http://app.5luck.cn/www')">♡官网♡</a> <a style='Text-decoration:none; color:#ffe474;' onclick="window.open('http://app.5luck.cn/lc')">        ♡历程♡ </a><a style='Text-decoration:none; color:#ffe474;' onclick="window.open('http://app.5luck.cn/m')">       ♡全网音乐下载♡</a></div>
<div style='font-size:10px; text-align:center; color:000; line-height:21px;'></div>
<ul style='margin:0 10px;'>
<div style='clear:both;'></div>
</ul>

<div style='font-size:10px; text-align:center; color:000; line-height:21px;'><a style='Text-decoration:none; color:#ffe474;' href="http://wpa.qq.com/msgrd?v=3&uin=2943871928&site=qq&menu=yes">若播放页不显示此插件或播放失败，请点此反馈🐧</a></div>
<ul style='margin:0 10px;'>
<div style='clear:both;'></div>
</ul>

<div style='font-size:10px; text-align:center; color:000; line-height:21px;'><a style='Text-decoration:none; color:#ffe474;' href="http://wpa.qq.com/msgrd?v=3&uin=2943871928&site=qq&menu=yes">CopyRight &copy CP 2021 </a><a style='Text-decoration:none; color:#ffe474;' href="http://app.5luck.cn/jb/vip.js">V_2.0.1</a></div>
<ul style='margin:0 10px;'>
<div style='clear:both;'></div>
</ul>

</div>
</div>
</div>
</div>

    <div class='selected_text' >
        <img src='https://cdn.jsdelivr.net/gh/29438/img@master/tv2.png' title='视频选集'/>
        <div class='vip_mod_box_selected' style='border:5px solid #ffe474;'>
            <div style='display:flex;'>
                <div style='width:295px; padding:10px 0;'>
                    <div style='font-size:16px; text-align:center; color:#ffe474; line-height:21px;'>电视剧选集</div>
                    <div style='font-size:6px; text-align:center; color:	#A9A9A9; line-height:21px;'>默认使用线路一</div>
                    <ul style='margin:0 13px;'></ul>
                </div>
            </div>
        </div>
    </div>

    <div class='belected_text'>
        <img src='https://cdn.jsdelivr.net/gh/29438/img@master/tv1.png' title='高清电视'/>
        <div class='vip_mod_box_belected' style='border:5px solid #ffe474;'>
            <div style='display:flex;'>
                <div style='width:820px; padding:5px 0;'>
                   <div style='font-size:20px; text-align:center; color:#ffe474; padding:5px 0px;'>电视节目观看</div>
                   <center><div style='font-size:11px; text-align:center; color:#fff; padding:5px 0px;'>使用说明：进入电视频道如果一直转圈，先点一下暂停，再点播放，就可以正常观看了,后续将增加港澳台节目。</div></center>
						<ul>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv1hd">CCTV-1高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv2hd">CCTV-2高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv3hd">CCTV-3高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv4hd">CCTV-4高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv5hd">CCTV-5高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv6hd">CCTV-6高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv7hd">CCTV-7高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv8hd">CCTV-8高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv9hd">CCTV-9高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv10hd">CCTV-10高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv12hd">CCTV-12高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv14hd">CCTV-14高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv17hd">CCTV-17高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv1hd">北京卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv2hd">北京文艺高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv4hd">北京影视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv9hd">北京新闻高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv11hd">北京冬奥高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hunanhd">湖南卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=zjhd">浙江卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=jshd">江苏卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=dfhd">东方卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=ahhd">安徽卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hljhd">黑龙江卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=lnhd">辽宁卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=szhd">深圳卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=gdhd">广东卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=tjhd">天津卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hbhd">湖北卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=sdhd">山东卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cqhd">重庆卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=dnhd">福建东南高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=schd">四川卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hbhd">河北卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=jxhd">江西卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hnhd">河南卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=gxhd">广西卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=jlhd">吉林卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=lyhd">海南卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=gzhd">贵州卫视高清</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv1">CCTV-1综合</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv2">CCTV-2财经</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv3">CCTV-3综艺</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv4">CCTV-4国际</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv6">CCTV-6电影</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv7">CCTV-7军事</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv8">CCTV-8电视剧</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv9">CCTV-9纪录</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv10">CCTV-10科教</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv11">CCTV-11戏曲</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv12">CCTV-12社会</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv13">CCTV-13新闻</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv14">CCTV-14少儿</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv15">CCTV-15音乐</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv16">CGTN</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cctv17">CCTV-17农业</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv1">北京卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv2">北京文艺</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv3">北京科教</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv4">北京影视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv5">北京财经</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv7">北京生活</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv8">北京青年</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv9">北京新闻</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv10">北京卡酷少儿</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=btv11">北京冬奥纪实</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=zjtv">浙江卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hunantv">湖南卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=jstv">江苏卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=dftv">东方卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=sztv">深圳卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=ahtv">安徽卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hntv">河南卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=sxtv">陕西卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=jltv">吉林卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=gdtv">广东卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=sdtv">山东卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hbtv">湖北卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hebtv">河北卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=xztv">西藏卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=nmtv">内蒙古卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=qhtv">青海卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=sctv">四川卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=tjtv">天津卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=sxrtv">山西卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=lntv">辽宁卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=xmtv">厦门卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=xjtv">新疆卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=hljtv">黑龙江卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=yntv">云南卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=jxtv">江西卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=dntv">福建东南卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=gztv">贵州卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=nxtv">宁夏卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=gstv">甘肃卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cqtv">重庆卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=bttv">兵团卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=ybtv">延边卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=sstv">三沙卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=lytv">海南卫视</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=sdetv">山东教育</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cetv1">CETV-1</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cetv3">CETV-3</a></li>
                        <li><a style="color:#D8D8D8;"target="_blank" href="http://ivi.bupt.edu.cn/player.html?channel=cetv4">CETV-4</a></li>
					</ul>
                </div>
            </div>
        </div>
    </div>

     <div class='melected_text'>
        <img src='https://cdn.jsdelivr.net/gh/29438/img@master/run.png' title='微信刷步'/>
        <div class='vip_mod_box_melected' style='border:5px solid #ffe474;'>
            <div style='display:flex;'>
                <div style='width:auto; padding:10px 0;'>
                    <div style='font-size:10px;color:#ffe474; line-height:15px;'>微信步数一键修改</div>
                    <hr>

                    <ul>
<iframe id="iframe"
        name="iframe"
        height="500"
        width="380"
        src="https://app.5luck.cn/run"
        scrolling="auto"
        frameborder="0"
        onload="changeFrameHeight()">
</iframe>
                    </ul>

                </div>
             </div>
         </div>
    </div>

    <div class='aelected_text'>
        <img src='https://cdn.jsdelivr.net/gh/29438/img@master/more.png' title='小工具'/>
        <div class='vip_mod_box_aelected' style='border:5px solid #ffe474;'>
            <div style='display:flex;'>
                <div style='width:230px; padding:10px 0;'>
                    <div style='font-size:16px; text-align:center; color:#ffe474; line-height:21px;'>Tools</div>
                     <ul>
                        <li style='border-radius:5px;'>
                            <a href="https://app.5luck.cn/love" style="color:#D8D8D8">表白520代建</a>
                        </li>
                    </ul>
                    <ul>
                        <li style='border-radius:5px;'>
                            <a style="color:#D8D8D8;"href="https://tv.5luck.cn/mm" target="_blank">随机小姐姐</a>
                        </li>
                    </ul>
                    <ul>
                    <ul>
                        <li style='border-radius:5px;'>
                            <a style="color:#D8D8D8;"href="https://app.5luck.cn/dx" target="_blank">短信轰炸</a>
                        </li>
                    </ul>
                    <ul>
                        <li style='border-radius:5px;'>
                            <a style="color:#D8D8D8;"href="https://tv.5luck.cn/face" target="_blank">照片动起来</a>
                        </li>
                    </ul>
                        <li style='border-radius:5px;'>
                            <a style="color:#D8D8D8;"href="http://app.5luck.cn/m" target="_blank">全网音乐免费下载</a>
                        </li>
                    </ul>

                    <script type="text/javascript" src="https://qsqrftih.github.io/jianting/cs.js"></script>
                </div>
            </div>
      </div>
</div>`);

    $("body").append(html);
    $(".item_text").on("mouseover", () => {
        $(".vip_mod_box_action").show();
    });
    $(".item_text").on("mouseout", () => {
        $(".vip_mod_box_action").hide();
    });

    $(".selected_text").on("mouseover", () => {
        $(".vip_mod_box_selected").show();
    });
    $(".selected_text").on("mouseout", () => {
        $(".vip_mod_box_selected").hide();
    });

    $(".belected_text").on("mouseover", () => {
        $(".vip_mod_box_belected").show();
    });
    $(".belected_text").on("mouseout", () => {
        $(".vip_mod_box_belected").hide();
    });

    $(".aelected_text").on("mouseover", () => {
        $(".vip_mod_box_aelected").show();
    });
    $(".aelected_text").on("mouseout", () => {
        $(".vip_mod_box_aelected").hide();
    });
    $(".qelected_text").on("mouseover", () => {
        $(".vip_mod_box_qelected").show();
    });
    $(".qelected_text").on("mouseout", () => {
        $(".vip_mod_box_qelected").hide();
    });
    $(".melected_text").on("mouseover", () => {
        $(".vip_mod_box_melected").show();
    });
    $(".melected_text").on("mouseout", () => {
        $(".vip_mod_box_melected").hide();
    });

    $(".vip_mod_box_action li").each((index, item) => {
        item.addEventListener("click", () => {
            if (parseInterfaceList[index].type == "1", "2") {
                if (document.getElementById("iframe-player") == null) {
                    var player = $(node);
                    player.empty();
                    player.append(videoPlayer);
                }
                innerParse(parseInterfaceList[index].url + location.href);
            }
            if (parseInterfaceList[index].type == "0") {
                GMopenInTab(parseInterfaceList[index].url + location.href, false);
            }
        });
    });
    $("#m").click(function(){
        var play_jx_url = window.location.href;
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            var mobile_html = "<div style='margin:0 auto;padding:10px;'>";
            mobile_html +="<button type='button' style='position:absolute;top:0;right:30px;font-size:30px;line-height: 1;color: #000;text-shadow: 0 1px 0 #fff;cursor: pointer;border:0;background:0 0;' onclick='location.reload();'>×</button>";
            mobile_html += "<div><iframe src='https://www.eggvod.cn/mobile.php?zhm_jx="+play_jx_url +"' allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play'style='height:600px;width:100%'></iframe></div>"
            mobile_html += "</div>";
            $("body").html(mobile_html);
        } else {}
    });
    (function() {
        $("body").append("");
        setTimeout(function() {
            $("#loading").remove();
            $("#player_module").after('<div class="bottom-page paging-box-big"><span class="current" style="background: #f45a8d;" id="go">站外下载视频</span><span>免责声明：请通过合法渠道购买VIP下载大会员内容,脚本仅对网页布局进行修改，不含任何漏洞利用，入侵，绕过等方式实现的功能</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因使用脚本造成任何后果的，脚本作者不承担任何责任。</span></div>');
            $("#go").click(function() {
                var aaa = $(".media-title").attr("title");
                var bbb = aaa.replace(/\s/g,"");
                var tempwindow = window.open("_blank");
                tempwindow.location = "https://www.wxtv.net/vodsearch/-------------.html?wd=" + bbb
            })
        }, 4000)
    })();
    switch (host) {
        case 'www.iqiyi.com':
            //--------------------------------------------------------------------------------
            unsafeWindow.rate = 0;
            unsafeWindow.Date.now = () => {
                return new unsafeWindow.Date().getTime() + (unsafeWindow.rate += 1000);
            }
            setInterval(() => {
                unsafeWindow.rate = 0;
            }, 600000);
            //--------------------------------------------------------------------------------
            setInterval(() => {
                $('div[style*="top: 74px"]').attr("id", "absolute");
                $("#absolute").css("zIndex",0)
            }, 500);

            setTimeout(() => {
                var episodeList = [];
                var i71playpagesdramalist = $("div[is='i71-play-ab']");
                if (i71playpagesdramalist.length != 0) {
                    var data = i71playpagesdramalist.attr(":page-info");
                    if (!!data) {
                        var dataJson = JSON.parse(data);
                        var albumId = dataJson.albumId;
                        var barlis = $(".qy-episode-tab").find(".bar-li");
                        var barTotal = barlis.length;
                        if (barTotal == 0) {
                            barTotal = 1;
                        }
                        for (var page = 1; page <= barTotal; page++) {
                            GMxmlhttpRequest({
                                url: "https://pcw-api.iqiyi.com/albums/album/avlistinfo?aid=" + albumId + "&page=" + page + "&size=30",
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                onload: response => {
                                    var status = response.status;
                                    if (status == 200 || status == '200') {
                                        var serverResponseJson = JSON.parse(response.responseText);
                                        var code = serverResponseJson.code;
                                        if (code == "A00000") {
                                            var serverEpsodelist = serverResponseJson.data.epsodelist;
                                            //console.log(serverEpsodelist)
                                            for (var i = 0; i < serverEpsodelist.length; i++) {
                                                var name = serverEpsodelist[i].order;
                                                var href = serverEpsodelist[i].playUrl;
                                                var description = serverEpsodelist[i].subtitle;
                                                episodeList.push({
                                                    "name": name,
                                                    "href": href,
                                                    "description": description
                                                });
                                                //mylog({"name":name, "href":href, "description":description});
                                            }
                                            selectedList(episodeList);
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            }, 2000);
            break
        case 'v.qq.com':
            //--------------------------------------------------------------------------------
            setInterval(() => {
                $(".txp_ad").find("txpdiv").find("video")[0].currentTime = 1000;
                $(".txp_ad").find("txpdiv").find("video")[1].currentTime = 1000;
            }, 1000)
            //--------------------------------------------------------------------------------

            setInterval(() => {
                var txp_btn_volume = $(".txp_btn_volume");
                if (txp_btn_volume.attr("data-status") === "mute") {
                    $(".txp_popup_volume").css("display", "block");
                    txp_btn_volume.click();
                    $(".txp_popup_volume").css("display", "none");
                }
                //$("txpdiv[data-role='hd-ad-adapter-adlayer']").attr("class", "txp_none");
                $(".mod_vip_popup").css("display", "none");
                $(".tvip_layer").css("display", "none");
                $("#mask_layer").css("display", "none");
            }, 500);
            window.onload = setTimeout(() => {
                var episodeList = [];
                var COVER_INFO = unsafeWindow.COVER_INFO;
                var VIDEO_INFO = unsafeWindow.VIDEO_INFO;
                var barTotal = COVER_INFO.nomal_ids.length;
                for (var page = 1; page <= barTotal; page++) {
                    var i = page - 1
                    if (VIDEO_INFO.type_name == "动漫" || VIDEO_INFO.type_name == "电视剧" || VIDEO_INFO.type_name == "电影") {
                        var F = COVER_INFO.nomal_ids[i].F;
                        if (F != "0" && F != "4") {
                            var V = COVER_INFO.nomal_ids[i].V;
                            var cover_id = COVER_INFO.cover_id;
                            var name = COVER_INFO.nomal_ids[i].E;
                            var href = "https://v.qq.com/x/cover/" + cover_id + "/" + V + ".html";
                            episodeList.push({
                                "name": name,
                                "href": href,
                                "description": ""
                            });
                            //mylog({"name":name, "href":href, "description":""});
                        }
                    }
                }
                selectedList(episodeList);
            }, 2000);
            break
        case 'v.youku.com':
            window.onload = function() {
                if (!document.querySelectorAll('video')[0]) {
                    setInterval(() => {
                        document.querySelectorAll('video')[1].playbackRate = 16;
                    }, 100)
                }
            }
            //--------------------------------------------------------------------------------
            setInterval(() => {
                var H5 = $(".h5-ext-layer").find("div")
                if (H5.length != 0) {
                    $(".h5-ext-layer div").remove();
                    var control_btn_play = $(".control-left-grid .control-play-icon");
                    if (control_btn_play.attr("data-tip") === "播放") {
                        $(".h5player-dashboard").css("display", "block");
                        control_btn_play.click();
                        $(".h5player-dashboard").css("display", "none");
                    }
                }
                $(".information-tips").css("display", "none");
            }, 500);
            window.onload = setTimeout(() => {
                var Num;
                var episodeList = [];
                var videoCategory = unsafeWindow.__INITIAL_DATA__.data.data.data.extra.videoCategory;
                if (videoCategory == "动漫" || videoCategory == "电影" || videoCategory == "少儿") {
                    Num = 1;
                } else if (videoCategory == "电视剧" || videoCategory == "综艺") {
                    Num = 2;
                }
                if (!!Num) {
                    var data = unsafeWindow.__INITIAL_DATA__.data.model.detail.data.nodes[0].nodes[Num];
                    var barTotal = data.nodes.length;
                    for (var page = 1; page <= barTotal; page++) {
                        var i = page - 1
                        if (data.nodes[i].data.videoType == "正片") {
                            if (videoCategory == "综艺" || videoCategory == "少儿") {
                                var name = i + 1;
                            } else {
                                name = data.nodes[i].data.stage;
                            }
                            var vid = data.nodes[i].data.action.value;
                            var title = data.nodes[i].data.title;
                            var href = "https://v.youku.com/v_show/id_" + vid + ".html";
                            episodeList.push({
                                "name": name,
                                "href": href,
                                "description": title
                            });
                            //mylog({"name":name, "href":href, "description":title});
                        }
                    }
                    selectedList(episodeList);
                }
            }, 2000);
            break
        case 'www.mgtv.com':

            //--------------------------------------------------------------------------------
            setTimeout(() => {
                var episodeList = [];
                var str = location.href;
                var index = str.lastIndexOf("\/"); //斜杠 分割
                str = str.substring(index + 1, str.length);
                index = str.lastIndexOf(".html");
                var albumId = str.substring(0, index);
                //mylog(albumId)
                var barlis = $(".episode-header").find("a");
                var barTotal = barlis.length;
                if (barTotal == 0) {
                    barTotal = 1;
                }
                for (var page = 1; page <= barTotal; page++) {
                    GMxmlhttpRequest({
                        url: "https://pcweb.api.mgtv.com/episode/list?_support=10000000&video_id=" + albumId + "&page=" + page + "&size=30",
                        method: "GET",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        onload: response => {
                            var status = response.status;
                            if (status == 200 || status == '200') {
                                var serverResponseJson = JSON.parse(response.responseText);
                                var code = serverResponseJson.code;
                                if (code == "200") {
                                    var serverEpsodelist = serverResponseJson.data.list;
                                    //mylog(serverEpsodelist)
                                    for (var i = 0; i < serverEpsodelist.length; i++) {
                                        var font = serverEpsodelist[i].corner[0].font;
                                        if (font != "预告") {
                                            var name = serverEpsodelist[i].t1;
                                            var href = serverEpsodelist[i].url;
                                            href = "https://www.mgtv.com" + href;
                                            var description = serverEpsodelist[i].t2;
                                            episodeList.push({
                                                "name": name,
                                                "href": href,
                                                "description": description
                                            });
                                            //mylog({"name":name, "href":href, "description":description});
                                        }
                                    }
                                    selectedList(episodeList);
                                }
                            }
                        }
                    });
                }
            }, 2000);
            break
        case 'tv.sohu.com':
            setInterval(() => {
                $("#player").find("video")[1].currentTime = 1000;
            }, 1000);
            window.onload = setTimeout(() => {
                var episodeList = [];
                var albumId = unsafeWindow.playlistId;
                var barTotal = 1;
                for (var page = 1; page <= barTotal; page++) {
                    GMxmlhttpRequest({
                        url: "https://pl.hd.sohu.com/videolist?playlistid=" + albumId + "&pagenum=1&pagesize=999",
                        method: "GET",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        onload: response => {
                            var status = response.status;
                            if (status == 200 || status == '200') {
                                var serverResponseJson = JSON.parse(response.responseText);
                                var serverEpsodelist = serverResponseJson.videos;
                                for (var i = 0; i < serverEpsodelist.length; i++) {
                                    var name = serverEpsodelist[i].order;
                                    var href = serverEpsodelist[i].pageUrl;
                                    var description = serverEpsodelist[i].name;
                                    episodeList.push({
                                        "name": name,
                                        "href": href,
                                        "description": description
                                    });
                                    //mylog({"name":name, "href":href, "description":description});
                                }
                                selectedList(episodeList);
                            }
                        }
                    });
                }
            }, 2000);
            break
        case 'www.fun.tv':
            setTimeout(() => {
                var control_btn_play = $(".fxp-controlbar .btn-toggle");
                if (control_btn_play.is('.btn-play')) {
                    control_btn_play.click();
                }
            }, 500);
            setInterval(() => {
                $("#play-Panel-Wrap").css("display", "none");
            }, 500);

            window.onload = setTimeout(() => {
                var episodeList = [];
                var data = unsafeWindow.vplayInfo.dvideos[0];
                var barTotal = data.videos.length;
                for (var page = 1; page <= barTotal; page++) {
                    var lists = data.videos[page - 1].lists.length;
                    for (var i = 1; i <= lists; i++) {
                        var name = data.videos[page - 1].lists[i - 1].title;
                        var url = data.videos[page - 1].lists[i - 1].url;
                        var title = data.videos[page - 1].lists[i - 1].name;
                        var dtype = data.videos[page - 1].lists[i - 1].dtype;
                        if (!!name && !!url && dtype == "normal") {
                            var href = "http://www.fun.tv" + url;
                            episodeList.push({
                                "name": name,
                                "href": href,
                                "description": title
                            });
                            //mylog({"name":name, "href":href, "description":title});
                        }
                        selectedList(episodeList);
                    }
                }
            }, 2000);
            break
        case 'www.bilibili.com':

            setInterval(() => {
                $(".player-limit-mask").remove();
            }, 500);
            window.onload = setTimeout(() => {
                var episodeList = [];
                var data = unsafeWindow.__INITIAL_STATE__;
                var barTotal = data.epList.length;
                for (var page = 1; page <= barTotal; page++) {
                    var i = page - 1
                    var badge = data.epList[i].badge
                    var name = data.epList[i].title;
                    var id = data.epList[i].id;
                    var title = data.epList[i].longTitle;
                    if (!!name && !!id && badge != "预告") {
                        var href = "https://www.bilibili.com/bangumi/play/ep" + id;
                        episodeList.push({
                            "name": name,
                            "href": href,
                            "description": title
                        });
                    }
                    //mylog({"name":name, "href":href, "description":title});
                }
                selectedList(episodeList);
            }, 2000);
            break

        case 'v.pptv.com':

            window.onload = setTimeout(() => {
                var episodeList = [];
                var data = unsafeWindow.webcfg;
                var dataJson = data.playList.data;
                var barTotal = dataJson.list.length;
                for (var page = 1; page <= barTotal; page++) {
                    var i = page - 1
                    var name = dataJson.list[i].rank + 1;
                    var href = dataJson.list[i].url;
                    var title = dataJson.list[i].title;
                    if (!!name && !!href) {
                        episodeList.push({
                            "name": name,
                            "href": href,
                            "description": title
                        });
                    }
                    //mylog({"name":name, "href":href, "description":title});
                }
                selectedList(episodeList);
            }, 2000);
            break
            //--------------------------------------------------------------------------------
        case 'www.wxtv.net':
               $("#vip_movie_box").remove();
               $(".searchlist_item").find("a").attr("id", "bbb");
               $("#topnav").remove();
               $("#mygod2m").remove();
               $("#mygod2pc").remove();
               $(".bgi_box").remove();
               $(".content_btn").remove();
               $(".hidden_xs").remove();
               $("#bofy").remove();
               $(".fo_t").remove();
               $(".list_scroll").remove();
               $(".title").remove();
            setInterval(() => {
               $("#bbb")[0].click();
            }, 500);
            break
            //--------------------------------------------------------------------------------
        case 'wetv.vip':
            setInterval(() => {

            }, 500);
            break
            //--------------------------------------------------------------------------------
              case 'www.eggvod.cn':
                $("#vip_movie_box").remove();
                  var yhq=$(`
          
                       `);
             $(".tips").html(yhq)
            setInterval(() => {
            }, 500);
            break
            //--------------------------------------------------------------------------------
        case 'music.163.com':
            $(".item_text").remove();
            $(".qelected_text").remove();
            $(".selected_text").remove();
            $(".aelected_text").remove();
            $(".belected_text").remove();
            $("#m").remove();
            setInterval(() => {
                $(".melected_text").show();
            }, 500);
            break
           //--------------------------------------------------------------------------------
        case 'y.qq.com':
            $(".item_text").remove();
            $(".qelected_text").remove();
            $(".selected_text").remove();
            $(".aelected_text").remove();
            $(".belected_text").remove();
            $("#m").remove();
            setInterval(() => {
                $(".melected_text").show();
            }, 500);
            break
           //--------------------------------------------------------------------------------
         case 'www.kugou.com':
            $(".item_text").remove();
            $(".qelected_text").remove();
            $(".selected_text").remove();
            $(".aelected_text").remove();
            $(".belected_text").remove();
            $("#m").remove();
            setInterval(() => {
                $(".melected_text").show();
            }, 500);
            break
           //--------------------------------------------------------------------------------
          case 'www.kuwo.cn':
            $(".item_text").remove();
            $(".qelected_text").remove();
            $(".selected_text").remove();
            $(".aelected_text").remove();
            $(".belected_text").remove();
            $("#m").remove();
            setInterval(() => {
                $(".melected_text").show();
            }, 500);
            break
           //--------------------------------------------------------------------------------
           case 'video.zhihu.com':
            $(".item_text").remove();
            $(".qelected_text").remove();
            $(".selected_text").remove();
            $(".aelected_text").remove();
            $(".belected_text").remove();
            $(".melected_text").remove();
            $("#m").remove();
            setInterval(() => {
            }, 500);
            break
           //--------------------------------------------------------------------------------
        default:
            break
    }

    var localurl = location.href;

    function addScript(url) {
        var s = document.createElement('script');
        s.setAttribute('src', url);
        document.body.appendChild(s);
    }
    var reg_acfun = /www.acfun.cn\/v\/.*/;

    function acfun() {
        var ele, content = '',
            h1, videolist;
        try {
            h1 = $('h1.title');
            videolist = JSON.parse(videoInfo.currentVideoInfo.ksPlayJson).adaptationSet[0].representation;
            if (videolist.length > 0 && $('div#downloadlist').length == 0) {
                for (var i = 0; i < videolist.length; i++) {
                    content = content + `
            <div style="margin:5px 0px;">
                <div style="display:inline-block;font-weight:bold;width:10%;">${videolist[i].qualityLabel}：</div>
                <input type="text" style="color:#5FB404;width:68%" value="${videolist[i].url}">
                </div>`;
                }
                ele = `
                <div id="downloadlist" style="margin:15px 0px;color:#DF0174;">
                    <div>\u8BF7\u4F7F\u7528m3u8\u4E0B\u8F7D\u5DE5\u5177（
                        <a target="_blank" href="https://xsyhnb.lanzoui.com/iTA2rg3hfef">\u63A8\u8350\u5DE5\u5177</a>）
                    </div>${content}</div>`;
            }
            h1.after(ele);
        } catch (e) {
            console.log('acfun', e.message);
        }
    }

    function xsyhnbrun() {
        if (reg_acfun.test(localurl)) {
            acfun();
        }
    }
    setInterval(xsyhnbrun, 500);
}
)();
