// ==UserScript==
// @name         蓝墨云班课助手
// @namespace    Me
// @version      3.4.4
// @description  蓝墨云班课助手
// @author       MeteorMo
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @require      https://cdn.bootcss.com/vue/2.5.16/vue.min.js
// @require      https://unpkg.com/element-ui/lib/index.js
// @require      https://greasyfork.org/scripts/438341-des%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86/code/DES%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86.js?version=1007407
// @require      https://cdn.bootcdn.net/ajax/libs/jquery.hotkeys/0.2.0/jquery.hotkeys.js
// @match        https://www.mosoteach.cn/web/*
// @include      https://www.mosoteach.cn/*
// @connect      eb28743a-0a36-4e14-a166-160855f57610.bspapp.com
// @connect      8cd42328-4ffe-47ef-b284-badb402920e3.bspapp.com
// @antifeature  payment
// ==/UserScript==

(function () {

    console.log("加载")
    function convertObj(data) {
		var _result = [];
		for (var key in data) {
			var value = data[key];
			if (value.constructor == Array) {
				value.forEach(function(_value) {
					_result.push(key + "=" + _value);
				});
			} else {
				_result.push(key + '=' + value);
			}
		}
		return _result.join('&');
	}

	function getJson(url) {
		var arr = url.split('?')[1].split('&')
		var theRequest = new Object();
		for (var i = 0; i < arr.length; i++) {
			var kye = arr[i].split("=")[0]
			var value = arr[i].split("=")[1]
			theRequest[kye] = value
		}
		return theRequest;
	}

	function getGroup(data, index = 0, group = []) {
		var need_apply = new Array();
		need_apply.push(data[index]);
		for (var i = 0; i < group.length; i++) {
			need_apply.push(group[i] + data[index]);
		}
		group.push.apply(group, need_apply);
		if (index + 1 >= data.length) return group;
		else return getGroup(data, index + 1, group);
	}

    GM_xmlhttpRequest({
        method: "POST",
        url: "https://8cd42328-4ffe-47ef-b284-badb402920e3.bspapp.com/http/zs",
        onload: res=> {
            window.zs=res.response
        },
        onerror:err=>{
            window.zs=""
            alret("服务器连接失败")
        }
    })
}
)();
