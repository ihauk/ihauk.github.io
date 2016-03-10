/**
 * 获取投递过程中sou站点、职位详情等的登陆参数
 * @param nextType
 * @returns {string}
 */
(function(ZPIDC){
    ZPIDC = ZPIDC || {};
    ZPIDC.applyjob = _applyjob = ZPIDC.applyjob || {};
    var _errMsg = {
        '0' : '登录成功!',
        '11' : '密码至少应包含 6 个字符！',
        '13' : '您的IP已经被列为黑名单！',
        '14' : '您的邮箱已经被列为黑名单！',
        '15' : '您的邮箱域名已经被列为黑名单',
        '21' : '登录过于频繁！',
        '22' : '账号不存在，请确认后重新输入',
        '23' : '您输入的密码与账号不匹配！',
        '30' : '未注册的Email地址！',
        '33' : '您的账户已经被冻结！',
        '34' : '您的账户已经被注销！',
        '35' : '您的账户已经被锁定！',
        '36' : '您的IP已经被锁定！',
        '37' : '用户名密码输入超过3次需要弹出验证码输入框!',//您的操作过于频繁，请输入验证码
        '38' : '请输入正确的验证码！',
        '51' : '手机登录失败！',
        //前端自定义错误信息 code  errormsg
        '$001' : '请输入账号！',
        '$002' : '登录名至少应包含 5 个字符！',
        '$003' : '请输入密码！',
        '$004' : '密码至少应包含 6 个字符！',
        '$005' : '请输入验证码！'
    };
    /**
     * 获取投递时的登陆框参数
     * @param nextType
     * @returns {string}
     */
    _applyjob.getApplyLoginData = function(nextType){
        var getDom = function(id){
            return document.getElementById(id) || null
        }
        var f = document.loginForm,
            l = f.loginname.value,
            p = f.password.value,
            v = f.validate.value,
            i = f.isautologin,
            l_html = getDom("loginnameErrCon"),
            p_html = getDom("passwordErrCon"),
            v_html = getDom("validateErrCon"),
            goto = true,data = '';

        if (l.trim() == "") {
            l_html.innerHTML = _errMsg.$001;
            goto && (goto = false)
        } else if(l.trim().length < 5){
            l_html.innerHTML = _errMsg.$002;
            goto && (goto = false)
        }else {
            l_html.innerHTML = "";
            data += "LoginName=" + l
        }
        if (p.trim() == "") {
            p_html.innerHTML = _errMsg.$003;
            goto && (goto = false)
        } else if(p.trim().length < 6){
            p_html.innerHTML = _errMsg.$004;
            goto && (goto = false)
        }else{
            p_html.innerHTML = "";
            data += "&Password=" + p
        }
        if(nextType == "apply"){
            if(getDom("validateLi").style.display == "block"){
                if (v.trim() == "") {
                    v_html.innerHTML = _errMsg.$005;
                    goto && (goto = false)
                } else {
                    v_html.innerHTML = "";
                    data += "&CheckCode=" + v
                }
            }else{
                //如果没有验证码怎么默认处理
                data += "&CheckCode=";
            }
        }else{
            if (v.trim() == "") {
                v_html.innerHTML = _errMsg.$005;
                goto && (goto = false)
            } else {
                v_html.innerHTML = "";
                data += "&CheckCode=" + v
            }
        }
        data += "&RememberMe=" + i.checked || 'false';
        //如果参数不全，则返回bool值false，如果全，则返回参数串data
        return goto ? data : goto;
    };
    /**
     * 投递过程登陆
     * @param data
     * @param fun
     */
    _applyjob.login = function(data,fun){
        /*data: {LoginName: $("#LoginName").val(),Password: $("#Password").val(),CheckCode: $("#CheckCode").val(),RememberMe: $("#RememberMe").get(0).checked},*/
        if(data){
            $.ajax({
                type: "get",
                data : data,
                dataType: "jsonp",
                url: "http://passport.zhaopin.com/account/loginhandler" ,
                success: function (data, textStatus) {
                    var code = data.ErrorCode,message = _errMsg[code];
                    fun(code + '' ,message);
                }, error: function () {
                    alert("登录失败，请重试");
                }, complete: function (XMLHttpRequest, textStatus) {
                    XMLHttpRequest = null;
                }
            });
        }
    };
    /**
     * 全站用户退出接口，fun为退出后的回调函数
     * @param fun
     */
    _applyjob.loginOut = function(fun){
        $.ajax({
            type: "post",
            url: "http://passport.zhaopin.com/account/logouthandler",
            dataType: "jsonp",
            success:function(data){
                var code = data.ErrorCode;
                if(typeof fun == 'function'){
                    fun(code+'');
                }
            },error: function () {
                //alert("注销失败，请重试");
            }, complete: function (XMLHttpRequest, textStatus) {
                XMLHttpRequest = null;
            }
        });
    }
    /**
     *  头部退出
     */
    _applyjob.LoginoutHeadHtml = function(fun){
        _applyjob.loginOut(function(code){
            if(code == '0'){
                _applyjob.LoginInHeadShowHtml();
                if(typeof fun == 'function'){
                    fun();
                }
                $("#login-o").hide();
                $("#login-u").show();
            }
        });
    };
    /**
     * 头部登陆
     * @constructor
     */
    _applyjob.LoginInHead = function(callBack){
        var _code = '0',_err = '',data = {
            "LoginName": $("#loginname").val(),
            "Password": $("#password").val(),
            "CheckCode": $("#newvalidate").val(),
            "RememberMe": $(".loginNformcb")[0].checked
        };
        var dealErr = function(code,errmsg){
            $(".errorstyle").hide();
            var _errorDom = $("#error4");

            switch(code){
                //登陆成功
                case "0":_applyjob.LoginInHeadShowHtml(callBack);break;
                //填写验证码，出现验证码输入框
                case "37":$("#yanzm").show();break;
                default :
                    if(typeof errmsg == 'string' && errmsg != ''){
                        $("#error4").text(errmsg).show();
                    }
                    break;
            }
            //如验证码不隐藏
            if($("#yanzm:hidden").length == 0){
                _applyjob.freshValidate('newvimg');
            }
        };
        if(data.LoginName.ztrim() == ''){
            _code = '5',_err = _errMsg.$001;
        }else if(data.LoginName.ztrim().length < 5){
            _code = '5',_err = _errMsg.$002;
        }else if(data.Password.ztrim() == ''){
            _code = '6',_err = _errMsg.$003;
        }else if(data.Password.ztrim().length < 6){
            _code = '6',_err = _errMsg.$004;
        }else if($("#yanzm:hidden").length == 0 && data.CheckCode.ztrim() == ''){
            _code = '7',_err = _errMsg.$005;
        }
        if(_code != '0'){
            dealErr(_code,_err);
        }else{
            _applyjob.login(data,dealErr);
        }
    };
    /**
     * 登陆后、退出刷新用户显示信息，根据JSShowname判断用户是否登陆，显示不同状态值
     *
     */
    _applyjob.LoginInHeadShowHtml = function(callBack){
        $("#loginNwid").hide();
        var c = _applyjob.GetCookie("JSShowname");
        if(c){
            $("#companyLoginregin").hide();
            $("#companyLogining").show();
            $("#personname").text(decodeURIComponent(c));
        }else{
            $("#companyLoginregin").show();
            $("#companyLogining").hide();
        }
        if(typeof callBack == 'function'){
            callBack();
        }
        if($("#login-u").length > 0){
            getLoginInfo();
        }
        //添加头index_industry.jsp的头和登陆板块同步
        if(window.zhaopinIndexLoginoutHTML && typeof zhaopinIndexLoginoutHTML.writeHTML == 'function'){
            zhaopinIndexLoginoutHTML.writeHTML();
        }
    };

    _applyjob.GetCookie = function(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) return  _applyjob.getCookieVal(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    };
    _applyjob.getCookieVal = function(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) endstr = document.cookie.length;
        return decodeURI(document.cookie.substring(offset, endstr));
    };
    _applyjob.freshValidate = function (domID) {
        //登陆时的验证码获取
        var imgDom = null,domID = typeof domID == 'string' ? domID : "vimg";
        imgDom = $("#"+domID)[0];
        if (imgDom && imgDom.nodeType == 1) imgDom.src = "http://passport.zhaopin.com/checkcode/img?r=" + Math.random()
    };
    _applyjob.applyMoreTenValidate = function (domID) {
        //超过10个时的投递验证码获取
        var imgDom = null,domID = typeof domID == 'string' ? domID : "vimg";
        imgDom = $("#"+domID)[0];
        if (imgDom && imgDom.nodeType == 1) imgDom.src = "http://my.zhaopin.com/myzhaopin/picturetimestamp.asp?t=" + (+new Date)
    };
})(window.ZPIDC);

