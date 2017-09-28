var globalUrl = window.location.origin;
var staticUrl = 'http://static.xueba100.com/';
var pathName = '/activity-eqtest';
/**
 * 简易选择器
 */
function $(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    var length = elements.length;
    if (length == 0) {
        return {};
    } else if (length == 1) {
        return elements[0];
    }
    return Array.prototype.slice.call(elements);
}
/**
 * 封装addEventListener
 */
HTMLElement.prototype.on = function(eventName, callback, useCapture) {
        this.addEventListener(eventName, function(event) {
            callback.call(this, event);
        }, useCapture);
    }
    /**
     * requestAnimationFrame兼容
     * https://gist.github.com/paulirish/1579671
     */
;
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
/**
 * post请求封装
 */
function DoPost(url, json, callback) {
    var xhr = null;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                callback(data);
            } else if (xhr.status === 0) {
                //alert(xhr.responseText);
                Toast('网络被作业吓瘫痪噜，快检查一下!');
            }
            xhr = null;
        }
    }
    xhr.ontimeout = function() {
        Toast('服务器请求超时了,请刷新尝试!');
    };
    xhr.timeout = 12000;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(ParamData(json));
}
/**
 * 从location.search获取数据
 */
function GetUrlData(str) {
    if (!str) {
        return null; }
    var obj = {};
    var strArry = str.substring(1).split('&');
    for (var i = 0; i < strArry.length; i++) {
        var temp = strArry[i].split('=');
        obj[temp[0]] = temp[1];
    }
    return obj;
}
/**
 * 格式化数据
 * 传入json对象，返回字符串
 */
function ParamData(jsonObj) {
    if (!jsonObj) {
        return null; }
    var str = '';
    var arry = [];
    for (var item in jsonObj) {
        arry.push(item + '=' + jsonObj[item]);
    }
    str = arry.join('&');
    return str;
}
/**
 * 气泡提示
 * 传入字符串即可
 */
function Toast(str) {
    var timmer = null;
    var alertEl = document.createElement('div');
    alertEl.setAttribute('style', 'position: fixed;top: 5%;width: 100%;font-size: 16px;text-align: center;z-index:99999999;');
    alertEl.innerHTML = '<span style="display: inline-block;margin: 0 auto;padding: .35em 1em;color: #fff;background-color: rgba(0, 0, 0, 1);border-radius: 5px;">' + str + '</span>';
    document.body.appendChild(alertEl);
    window.clearTimeout(timmer);
    timmer = setTimeout(function() {
        document.body.removeChild(alertEl);
    }, 2000);
}
/**
 * 设备系统
 */
function DeviceOs() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return {
        android: isAndroid,
        ios: isiOS
    };
}
/**
 * cookie操作
 */
function cookie(name, value, days) {
    // if value is undefined, get the cookie value
    if (value === undefined) {
        var cookiestring = "; " + window.document.cookie;
        var cookies = cookiestring.split("; " + name + "=");
        if (cookies.length === 2) {
            return cookies.pop().split(";").shift();
        }
        return null;
    } else {
        // if value is a false boolean, we'll treat that as a delete
        if (value === false) {
            days = -1;
        }
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        window.document.cookie = name + "=" + value + expires + "; path=/";
    }
};
/*
 * 初始化loading 
 */
function initLoading() {
    var el = document.createElement('div');
    el.className = 'loading';
    el.innerHTML = '<div class="ball-pulse"><div></div><div></div><div></div></div>';
    document.querySelector('body').appendChild(el);
}
/*
 * 关闭loading 
 */
function closeLoading() {
    var el = document.querySelector('.loading');
    document.querySelector('body').removeChild(el);
}
/**
 * 显示
 */
HTMLElement.prototype.show = function(str) {
        this.style.display = 'block' || str;
    }
    /**
     * 隐藏
     */
HTMLElement.prototype.hide = function() {
        this.style.display = 'none';
    }
    /**
     * fadeIn，间显
     */
HTMLElement.prototype.fadeIn = function() {
        var timestamp = Date.now();
        var animateId = null;
        // 初始化
        var self = this;
        self.style.opacity = 0;
        self.style.display = 'block';
        // 触发
        animateId = requestAnimationFrame(_animate);
        // 动画
        function _animate() {
            var nowTimestamp = Date.now();
            var delay = nowTimestamp - timestamp;
            if (delay <= 300) {
                // 有待
                self.style.opacity = (delay / 300).toFixed(2);
                animateId = requestAnimationFrame(_animate);
            } else {
                self.style.opacity = 1;
                cancelAnimationFrame(animateId);
            }
        }
    }
    /**
     * fadeOut,间隐
     */
HTMLElement.prototype.fadeOut = function() {
        var timestamp = Date.now();
        var animateId = null;
        // 初始化
        var self = this;
        // 触发
        animateId = requestAnimationFrame(_animate);
        // 动画
        function _animate() {
            var nowTimestamp = Date.now();
            var delay = nowTimestamp - timestamp;
            if (delay <= 250) {
                self.style.opacity = (1 - (delay / 250)).toFixed(2);
                animateId = requestAnimationFrame(_animate);
            } else {
                self.style.opacity = 0;
                self.style.display = 'none';
                cancelAnimationFrame(animateId);
            }
        }
    }
    //填充模版
function tplSetData(model, id) {
    var reg = new RegExp("{(\\w+)}", "ig");
    var html = $(id).innerHTML;
    html = html.replace(reg, function(text, key) {
        return model[key] });
    return html;
}