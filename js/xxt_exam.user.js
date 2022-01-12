// ==UserScript==
// @name         超星考试小助手
// @namespace    https://greasyfork.org/zh-CN/users/714887-%E7%A8%8B%E9%B9%8F233
// @version      1.2.1
// @description  💯自动搜索尔雅考试答案，支持自动答题、自动切换题目.(图库接口搜集自网络，请勿相信任何可能出现的广告)
// @author       程鹏
// @icon         https://s3.ax1x.com/2020/12/08/r99FOK.jpg
// @homepage     http://ali.5luck.cn:99/
// @match        *://*.chaoxing.com/exam/test/reVersionTestStartNew*
// @match        *://*.edu.cn/exam/test/reVersionTestStartNew*
// @match        *://*.nbdlib.cn/exam/test/reVersionTestStartNew*
// @match        *://*.hnsyu.net/exam/test/reVersionTestStartNew*
// @updateURL    https://raw.fastgit.org/29438/img/main/js/xxt_exam.user.js
// @downloadURL  https://raw.fastgit.org/29438/img/main/js/xxt_exam.user.js  
// @connect      cx.icodef.com
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// @original-script https://greasyfork.org/scripts/373131
// @original-author wyn665817
// @original-license MIT
// ==/UserScript==

var setting = {
        time: 1E3
        ,none: 0 // 未找到答案或无匹配答案时执行默认操作，默认关闭
        ,jump: 1 // 答题完成后自动切换，默认开启
        ,copy: 0 // 自动复制答案到剪贴板，也可以通过手动点击按钮或答案进行复制，默认关闭
 
        // 非自动化操作
        ,hide: 0 // 不加载答案搜索提示框，键盘↑和↓可以临时移除和加载，默认关闭
        ,scale: 0 // 富文本编辑器高度自动拉伸，用于文本类题目，答题框根据内容自动调整大小，默认关闭
    },
    _self = unsafeWindow,
    $ = _self.jQuery,
    UE = _self.UE;
 
setting.notice = '题库接口来自网络,请勿相信任何可能出现的广告！<a href="https://www.5luck.cn/">👉官网</a>';
String.prototype.toCDB = function() {
    return this.replace(/\s/g, '').replace(/[\uff01-\uff5e]/g, function(str) {
        return String.fromCharCode(str.charCodeAt(0) - 65248);
    }).replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/。/g, '.');
};
 
// setting.time += Math.ceil(setting.time * Math.random()) - setting.time / 2;
setting.TiMu = [
    filterImg('.Cy_TItle .clearfix').replace(/\s*（\d+\.\d+分）$/, ''),
    $('[name^=type]:not([id])').val() || '-1',
    $('.cur a').text().trim() || '无',
    $('li .clearfix').map(function() {
        return filterImg(this);
    })
];
var maximize=$(
    '<div style="border: 2px dashed rgb(0, 0, 0); position: fixed; top: 0; right: 0; z-index: 99999; background-color: rgba(227,207,87); overflow-x: auto;display:none;">◻</div>'
).appendTo('body').click(function(){
    $(setting.div).css("display","block");
    GM_setValue("minimize","0");
    $(maximize).css("display","none");
});
 
setting.div = $(
    '<div style="border: 2px dashed rgb(0, 0, 0); width: 330px; position: fixed; top: 0; right: 0; z-index: 99999; background-color: rgba(227,207,87); overflow-x: auto;">' +
    '<span style="font-size: medium;"></span>' +
    '<div style="font-size: medium;width:70%;display: inline-block;">正在搜索答案...</div>'+
    '<div style="width:30%;display: inline-block;padding-right: 10px;box-sizing: border-box;text-align: right;"><minimize style="width:20px;font-size:16px;line-height: 12px;font-weight: bold;cursor: context-menu;user-select:none;">一</minimize></div>' +
    '<div id="cx-note" style="border-top: 1px solid #000;border-bottom: 1px solid #000;margin: 4px 0px;overflow: hidden;">' + setting.notice + '</div>' +
    '<button style="margin-right: 10px;">暂停答题</button>' +
    '<button style="margin-right: 10px;' + (setting.jump ? '' : ' display: none;') + '">点击停止本次切换</button>' +
    '<button style="margin-right: 10px;">重新查询</button>' +
    '<button style="margin-right: 10px; display: none;">复制答案</button>' +
    '<button>答题详情</button>' +
    '<div style="max-height: 200px; overflow-y: auto;">' +
    '<table border="1" style="font-size: 12px;">' +
    '<thead>' +
    '<tr>' +
    '<th colspan="2">' + ($('#randomOptions').val() == 'false' ? '' : '<font color="red">本次考试的选项为乱序 脚本会选择正确的选项</font>') + '</th>' +
    '</tr>' +
    '<tr>' +
    '<th style="width: 60%; min-width: 130px;">题目（点击可复制）</th>' +
    '<th style="min-width: 130px;">答案（点击可复制）</th>' +
    '</tr>' +
    '</thead>' +
    '<tfoot style="' + (setting.jump ? ' display: none;' : '') + '">' +
    '<tr>' +
    '<th colspan="2">已关闭 本次自动切换</th>' +
    '</tr>' +
    '</tfoot>' +
    '<tbody>' +
    '<tr>' +
    '<td colspan="2" style="display: none;"></td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>'
).appendTo('body').on('click', 'button, td', function() {
    var num = setting.$btn.index(this);
    if (num == -1) {
        GM_setClipboard($(this).text());
    } else if (num === 0) {
        if (setting.loop) {
            clearInterval(setting.loop);
            delete setting.loop;
            num = ['已暂停搜索', '继续答题'];
        } else {
            setting.loop = setInterval(findTiMu, setting.time);
            num = ['正在搜索答案...', '暂停答题'];
        }
        setting.$div.html(function() {
            return $(this).data('html') || num[0];
        }).removeData('html');
        $(this).html(num[1]);
    } else if (num == 1) {
        setting.jump = 0;
        setting.$div.html(function() {
            return arguments[1].replace('即将切换下一题', '未开启自动切换');
        });
        setting.div.find('tfoot').add(this).toggle();
    } else if (num == 2) {
        location.reload();
    } else if (num == 3) {
        GM_setClipboard(setting.div.find('td:last').text());
    } else if (num == 4) {
        ($('.leftCard .saveYl')[0] || $()).click();
    } else if (num == 5) {
        setting.tk_num++;
        GM_setValue('tk_num_1',setting.tk_num);
        setting.tk_num = GM_getValue('tk_num_1');
        console.log(setting.tk_num);
        parent.location.reload();
    }
}).on('click','minimize', function() {
    $(this).parent().parent().css("display","none");
    GM_setValue("minimize","1");
    $(maximize).css("display","block");
}).detach(setting.hide ? '*' : 'html');
 
if(GM_getValue("minimize")=="1"){
    $(setting.div).css("display","none");
    $(maximize).css("display","block");
}
 
setting.$btn = setting.div.children('button');
setting.$div = setting.div.children('div:eq(0)');
 
$(document).keydown(function(event) {
    if (event.keyCode == 38) {
        setting.div.detach();
    } else if (event.keyCode == 40) {
        setting.div.appendTo('body');
    }
});
 
if (setting.scale) _self.UEDITOR_CONFIG.scaleEnabled = false;
$.each(UE.instants, function() {
    var key = this.key;
    this.ready(function() {
        this.destroy();
        UE.getEditor(key);
    });
});
setting.loop = setInterval(findTiMu, setting.time);
 
 
function fillAnswer(obj, tip) {
    var $input = $(':radio, :checkbox', '.Cy_ulBottom'),
        str = String(obj.answer).toCDB() || new Date().toString(),
        data = str.split(/#|\x01|\|/),
        opt = obj.opt || str,
        btn = $('.saveYl:contains(下一题)').offset();
    // $input.filter(':radio:checked').prop('checked', false);
    obj.code > 0 && $input.each(function(index) {
        if (this.value == 'true') {
            data.join().match(/(^|,)(正确|是|对|√|T|ri)(,|$)/) && this.click();
        } else if (this.value == 'false') {
            data.join().match(/(^|,)(错误|否|错|×|F|wr)(,|$)/) && this.click();
        } else {
            index = setting.TiMu[3][index].toCDB() || new Date().toString();
            index = $.inArray(index, data) + 1 || (setting.TiMu[1] == '1' && str.indexOf(index) + 1);
            Boolean(index) == this.checked || this.click();
        }
    }).each(function() {
        if (!/^A?B?C?D?E?F?G?$/.test(opt)) return false;
        Boolean(opt.match(this.value)) == this.checked || this.click();
    });
    if (setting.TiMu[1].match(/^[013]$/)) {
        tip = $input.is(':checked') || setting.none && (($input[Math.floor(Math.random() * $input.length)] || $()).click(), ' ');
    } else if (setting.TiMu[1].match(/^(2|[4-9]|1[08])$/)) {
        data = String(obj.answer).split(/#|\x01|\|/);
        tip = $('.Cy_ulTk textarea').each(function(index) {
            index = (obj.code > 0 && data[index]) || '';
            UE.getEditor(this.name).setContent(index.trim());
        }).length;
        tip = (obj.code > 0 && data.length == tip) || setting.none && ' ';
        setting.len = str.length * setting.time / 10;
    }
    if (tip == ' ') {
        tip = '已执行默认操作';
    } else if (tip) {
        tip = '自动答题已完成';
    } else if (tip === undefined) {
        tip = '该题型不支持自动答题';
    } else {
        tip = '未找到有效答案';
    }
    if (btn) {
        tip += setting.jump ? '，即将切换下一题' : '，未开启自动切换';
        setInterval(function() {
            if (!setting.jump) return;
            var mouse = document.createEvent('MouseEvents'),
                arr = [btn.left + Math.ceil(Math.random() * 80), btn.top + Math.ceil(Math.random() * 26)];
            mouse.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, arr[0], arr[1], false, false, false, false, 0, null);
            _self.event = $.extend(true, {}, mouse);
            delete _self.event.isTrusted;
            _self.getTheNextQuestion(1);
        }, setting.len || Math.ceil(setting.time * Math.random()) * 2);
    } else {
        setting.$btn.eq(1).hide();
        tip = '答题已完成，请自行查看答题详情';
    }
    setting.$div.data('html', tip).siblings('button:eq(0)').hide().click();
}
 
function findTiMu() {
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://cx.icodef.com/wyn-nb?v=2',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: 'question=' + encodeURIComponent(setting.TiMu[0]) + '&type=' + setting.TiMu[1] + '&id=' + $('#paperId').val(),
        timeout: setting.time,
        onload: function(xhr) {
            if (!setting.loop) {
            } else if (xhr.status == 200) {
                var obj = $.parseJSON(xhr.responseText) || {};
                obj.answer = obj.data;
                if (obj.code) {
                    var answer = String(obj.answer).replace(/&/g, '&amp;').replace(/<(?!img)/g, '&lt;'),
                        que = setting.TiMu[0].match('<img') ? setting.TiMu[0] : setting.TiMu[0].replace(/&/g, '&amp;').replace(/</g, '&lt');
                    obj.answer = /^http/.test(answer) ? '<img src="' + obj.answer + '">' : obj.answer;
                    setting.div.find('tbody').append(
                        '<tr>' +
                        '<td title="点击可复制">' + que + '</td>' +
                        '<td title="点击可复制">' + (/^http/.test(answer) ? obj.answer : '') + answer + '</td>' +
                        '</tr>'
                    );
                    setting.copy && GM_setClipboard(obj.answer);
                    setting.$btn.eq(3).show();
                    fillAnswer(obj);
                } else {
                    setting.$div.html(obj.answer || '服务器繁忙，正在重试...');
                }
                setting.div.children('span').html(obj.msg || '');
            } else if (xhr.status == 403) {
                var html = xhr.responseText.indexOf('{') ? '请求过于频繁，建议稍后再试' : $.parseJSON(xhr.responseText).data;
                setting.$div.data('html', html).siblings('button:eq(0)').click();
            } else {
                setting.$div.text('服务器异常，正在重试...');
            }
        },
        ontimeout: function() {
            setting.loop && setting.$div.text('服务器超时，正在重试...');
        }
    });
 
}
 
 
function filterImg(dom) {
    return $(dom).clone().find('img[src]').replaceWith(function() {
        return $('<p></p>').text('');
    }).end().find('iframe[src]').replaceWith(function() {
        return $('<p></p>').text('');
    }).end().text().trim();
}
