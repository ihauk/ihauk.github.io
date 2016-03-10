var interval;
var tInterval = 60;
var newMob = "";
var cal = function (btnSend) {
    var getCodeBtn = $('#' + btnSend);
    getCodeBtn.val(tInterval + '秒后重发')
    if (tInterval > 0) {
        tInterval--;
    } else {
        window.clearInterval(interval);
        getCodeBtn.removeAttr("disabled");
        getCodeBtn.val("重发验证码");
        getCodeBtn.removeClass("f_array");
        newMob = "";
        tInterval = 60;
    }
}

var ZPSms = function () {
    this.iniBtn = function (btnSend) {
        if (tInterval < 60) {
            $("#" + btnSend).addClass("f_array");
            $("#" + btnSend).attr("disabled", "disabled");
        }
    }
    this.send = function (mob, url, btnSend, info) {
        var data = 'mobile=' + mob + '&businessType=C-Bind' + '&t=' + (+new Date());
        newMob = mob;
        //var url = 'http://i.zhaopin.com/Login/LoginApi/SendBindSms'
        var sta;
        $.ajax({
            async: false,
            url: url,
            data: data,
            dataType: "jsonp", //数据类型为jsonp  
            jsonp: "jsoncallback", //服务端用于接收callback调用的function名的参数  
            success: function (msg) {
                var info_yz = $("#" + info);
                var code = parseInt(msg.Code);
                var getCodeBtn = $('#' + btnSend);
                if (code > 0) {
                    getCodeBtn.addClass("f_array");
                    getCodeBtn.attr("disabled", "disabled");
                    interval = setInterval(function () {
                        cal(btnSend);
                    }, 1000);
                    info_yz.removeClass("tip-x-validate-error");
                    info_yz.html("验证码已发送，请查收短信！");
                    info_yz.css('display', 'block');

                } else {
                    newMob = "";
                    if (msg.Code == -3) {
                        info_yz.addClass("tip-x-validate-error");
                        info_yz.html("该手机号已被绑定，您可以更换绑定手机或暂不验证");
                        info_yz.css('display', 'block');
                    }
                    else {
                        info_yz.addClass("tip-x-validate-error");
                        info_yz.html(msg.Msg);
                        info_yz.css('display', 'block');
                    }
                }
            },
            error: function () {
                info_yz.addClass("tip-x-validate-error");
                info_yz.html("验证码发送异常！");
                info_yz.css('display', 'block');
            }
        });
    }

    this.findpasswordsend = function (mob, code ,url, btnSend, info) {
        var data = 'mobile=' + mob + '&code=' + code + '&t=' + (+new Date());
        newMob = mob;
        //var url = 'http://i.zhaopin.com/Login/LoginApi/SendBindSms'
        var sta;
        $.ajax({
            async: false,
            url: url,
            data: data,
            dataType: "jsonp", //数据类型为jsonp  
            jsonp: "jsoncallback", //服务端用于接收callback调用的function名的参数  
            success: function (msg) {
                var info_yz = $("#" + info);
                var code = parseInt(msg.Code);
                var getCodeBtn = $('#' + btnSend);
                if (code > 0) {
                    getCodeBtn.addClass("f_array");
                    getCodeBtn.attr("disabled", "disabled");
                    interval = setInterval(function () {
                        cal(btnSend);
                    }, 1000);
                    info_yz.removeClass("tip-x-validate-error");
                    info_yz.html("验证码已发送，请查收短信！");
                    info_yz.css('display', 'block');

                } else {
                    newMob = "";
                    if (msg.Code == -3) {
                        info_yz.addClass("tip-x-validate-error");
                        info_yz.html("该手机号已被绑定，您可以更换绑定手机或暂不验证");
                        info_yz.css('display', 'block');
                    }
                    else {
                        info_yz.addClass("tip-x-validate-error");
                        info_yz.html(msg.Msg);
                        info_yz.css('display', 'block');
                    }
                }
            },
            error: function () {
                info_yz.addClass("tip-x-validate-error");
                info_yz.html("验证码发送异常！");
                info_yz.css('display', 'block');
            }
        });
    }
    this.triggertime = function (btnSend) {
        interval = setInterval(function () {
            cal(btnSend);
        }, 1000);
    }
   

}