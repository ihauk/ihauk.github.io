window.ZPIDC = new function () {
    var _me = this;
    _me.extend = function(sub,sup,params){
        var arg = Array.prototype.slice.call(arguments, 2);
        for(var key in params){
            sub[key] = params[key];
        }
        sup.apply(sub,arg);
        var f = new Function();
        f.prototype = sup.prototype;
        sub.supClass = sup.prototype;
        sub.prototype = new f();
        sub.prototype.constructor = sub;
    };
    _me.deepCopy = function(params){
        var me = this;
        for(var key in params){
            if(!me[key]){
                me[key] = params[key];
            }
        }
    };
    _me.copy = function(base,params){
        for(var key in params){
            //如果基础已经存在这个属性，就不用拷贝了
            if(base[key] !==  false && !base[key] && base[key] !== 0){
                base[key] = params[key];
            }
        }
    };
    _me.ifCopy = function(base,params){
        for(var key in params){
            base[key] = params[key];
        }
    };
    /**
     * 命名空间生成,使用方法：ZPIDC.ns("zp.layer.factory"),将生成js对象zp.layer.factory
     * @param objStr
     */
    _me.ns = function (objStr) {
        var nsArray = objStr.split('.');
        var sEval = "";
        var sNS = "";
        for (var i = 0; i < nsArray.length; i++) {
            if (i != 0) sNS += ".";
            sNS += nsArray[i];
            sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();";
        }
        if (sEval != "") eval(sEval);
    };
    _me.getAjax = function(){
        var a = null;
        try {
            a = new XMLHttpRequest();
        } catch (b) {
            for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0, h; h = c[d++];) {
                try {
                    a = new ActiveXObject(h);
                    break;
                } catch (e) {
                }
            }
        }
        return a;
    };
    _me.getCookieByKey = function(a) {
        var b = document.cookie;
        a += "=";
        var c = b.indexOf("; " + a);
        if (c == -1) {
            if (c = b.indexOf(a), c != 0) {
                return null;
            }
        } else {
            c += 2;
        }
        var d = document.cookie.indexOf(";", c);
        if (d == -1) {
            d = b.length;
        }
        return b.substring(c + a.length, d).replace(/\+/g, " ").urlDecode();
    };
    _me.addEvent = function(dom, eventType, callBack) {
        dom.addEventListener ? dom.addEventListener(eventType, callBack, !1)
            : dom.attachEvent && dom.attachEvent("on" + eventType, callBack);
    };
    //添加判断IE版本
    (function () {
        var isIE = !!window.ActiveXObject;
        var isIE6 = isIE && !window.XMLHttpRequest;
        var isIE8 = isIE && (document.documentMode == 8);
        var isIE7 = isIE && !isIE6 && !isIE8;
        if(isIE){
            var browser=navigator.appName
            var b_version=navigator.appVersion
            var version=b_version.split(";");
            var trim_Version=version[1].replace(/[ ]/g,"");
            isIE7 = isIE7 && (trim_Version == 'MSIE7.0' || document.documentMode==7) ;
        }
        _me.isIE = isIE;
        _me.isIE6 = isIE6;
        _me.isIE7 = isIE7;
        _me.isIE8 = isIE8;
    })();
};
ZPIDC.ns('ZPIDC.ValidateUtil');
ZPIDC.ValidateUtil = {
    //验证是否是邮件
    isEmail : function(mail) {
        var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(mail))
            return true;
        else {
            return false;
        }
    }
};
/*
 * 使用方式：“{0}课程已经开课{1}天”.format("汉语",“10”)
 * 使用方式："我是{name}，今年{age}了".format({name:"loogn",age:22});
 */
var spt = String.prototype;
spt.zformat= function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                } else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    } else {
        return this;
    }
},
spt.ztrim = function(){
    return this.replace(/^[\s\xa0\u3000]+|[\s\xa0\u3000]+$/g, "");
},
spt.ztrimL = function(){
    return this.replace(/^[\s\xa0\u3000]+/, "");
},
spt.ztrimR = function(){
    return this.replace(/[\s\xa0\u3000]+$/, "");
},
spt.zurlEncode = function () {
    return window.encodeURIComponent ? encodeURIComponent(this) : escape(this);
},
spt.zurlDecode = function () {
    return window.decodeURIComponent ? decodeURIComponent(this) : unescape(this);
},
spt.zrealLength = function () {
    return this.replace(/[^\x00-\xff]/g, "aa").length;
};
spt.zUpperFirstCase = function(){
    return this.replace(/\w/,function(){
        return arguments[0].toUpperCase();
    });
};
