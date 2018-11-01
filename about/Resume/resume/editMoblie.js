
var isExistsMob = false;
$("#mobileChange").click(function () {
    $.popupDiv({
        title: "修改手机", url: "http://my.zhaopin.com/MYZHAOPIN/person_mobile.asp?t=" + (+new Date()), success: function () {
            $("#newMobel").val(newMob);
            $("#newMobel").validate({
                rules: [{
                    text: "请输入正确的手机号",
                    rule: "empty"
                },
                    {
                        text: "请输入正确的手机号",
                        rule: function (s) {
                            if (/^[1][34578]\d{9}$/.test(s.val())) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    },

                {
                    text: "该手机号已存在，请重新输入",
                    rule: function (s) {
                        if (s.val() == $("#oldMoblie").text()) {
                            return false;
                        }
                        var data = 'userName=' + s.val() + '&t=' + (+new Date());
                        var url = 'http://i.zhaopin.com/Login/LoginApi/VerifyUser'
                        $.ajax({
                            type: "get",
                            async: false,
                            url: url,
                            data: data,
                            dataType: "jsonp", //数据类型为jsonp  
                            jsonp: "jsoncallback", //服务端用于接收callback调用的function名的参数  
                            beforeSend: function (XMLHttpRequest) {
                                isExistsMob = false;
                                $("#newMobel_warn").addClass("tip-x-validate-error").removeClass("tip-x-validate-valid").html('正在检测,请稍后...');
                            },
                            success: function (msg) {
                                var sta = parseInt(msg);
                                if (sta == 1) {
                                    isExistsMob = true;
                                    return true;
                                }
                                if (sta == 5 || sta == 6) {
                                    s.addClass("input-x-validate-error").removeClass("input-x-validate-valid");
                                    $("#newMobel_warn").addClass("tip-x-validate-error").removeClass("tip-x-validate-valid").html('该手机号已存在，请重新输入');

                                    isExistsMob = false;
                                    return false;
                                }
                            },

                            error: function () {
                                return false;
                            }
                        });
                        return true;
                    }

                }
                ],
                validText: "",
                tipTagId: "newMobel_warn"
            });
            $("#code_num").validate({
                rules: [{
                    text: "请输入验证码",
                    rule: "empty"
                }, {
                    text: "验证码为6位数字",
                    rule: "length",
                    min: 6,
                    max: 6
                }
                ],
                validText: "",
                tipTagId: "verify_code_info"
            });
        },
        buttons: {
            "提 交": function () {
                if (isExistsMob) {
                    $.validate("frmModifyMobile",
                    function () {
                        var param = "oldMoblie=" + $("#oldMoblie").text() + "&newMobile=" + $("#newMobel").val() + "&verifyCode=" + $("#code_num").val();
                        var url = 'http://i.zhaopin.com/usermaster/UsermasterManage/ChangeMobile';


                        $.ajax({
                            async: false,
                            url: url,
                            data: param,
                            dataType: "jsonp", //数据类型为jsonp  
                            jsonp: "jsoncallback", //服务端用于接收callback调用的function名的参数  
                            success: function (data) {
                                if (data.Code != "0") {
                                    var msg = data.Msg;
                                    if (data.Msg == "") {
                                        msg = "修改失败！";
                                    }
                                    var info_yz = $("#verify_code_info");
                                    info_yz.addClass("tip-x-validate-error");
                                    info_yz.html(msg);
                                    info_yz.css('display', 'block');
                                } else {
                                    window.clearInterval(interval);
                                    tInterval = 60;
                                    $("#mob").text($("#newMobel").val());
                                    // $("#contact_num0").val($("#newMobel").val());
                                    $("#ismobbind").removeClass("mobile_nobd");
                                    $("#ismobbind").addClass("mobile_bd");
                                    $("#ismobbind").text("已绑定")
                                    newMob = "";
                                    $.popupDiv({
                                        title: "修改手机",
                                        msg: "绑定成功!",
                                        buttons: {
                                            "关 闭": function () {
                                                $.popupClose();
                                            }
                                        }
                                    });

                                }

                            }
                        });

                    }, function () {

                    });
                }

                else {
                    $("#newMobel").trigger("blur");
                    $("#code_num").trigger("blur");
                }
            }
        },
        width: 414
    });
    return false;
});




//$("#mobileChange").click(function () {

//    $.popupDiv({
//        title: "修改手机", url: "http://my.zhaopin.com/MYZHAOPIN/person_mobile.asp?t=" + (+new Date()), success: function () {

//            $("#newMobel").validate({
//                rules: [{
//                    text: "请输入正确的手机号",
//                    rule: "empty"
//                },
//                    {
//                        text: "请输入正确的手机号",
//                        rule: function (s) {
//                            if (/^[1][34578]\d{9}$/.test(s.val())) {
//                                return true;
//                            } else {
//                                return false;
//                            }
//                        }
//                    },
//                {

//                    text: "该手机号已存在，请重新输入",
//                    rule: function (s) {

//                        var data = 'userName=' + s.val() + '&t=' + (+new Date());
//                        var url = 'http://i.zhaopin.com/Login/LoginApi/VerifyUser'
//                        var sta;
//                        $.ajax({
//                            type: "get",
//                            async: false,
//                            url: url,
//                            data: data,
//                            dataType: "jsonp", //数据类型为jsonp  
//                            jsonp: "jsoncallback", //服务端用于接收callback调用的function名的参数  
//                            success: function (msg) {
//                                sta = parseInt(msg);
//                                if (sta == 1)
//                                    moblefalg = true;
//                                else {
//                                    s.addClass("input-x-validate-error").removeClass("input-x-validate-valid");
//                                    $("#newMobel_warn").addClass("tip-x-validate-error").removeClass("tip-x-validate-valid").html('该手机号已存在，请重新输入');
//                                    moblefalg = false;
//                                }
//                            },
//                            error: function () {
//                                sta = -1;
//                            }
//                        });
//                        return true;

//                    }

//                }
//                ],
//                validText: "",
//                tipTagId: "newMobel_warn"
//            });
//            $("#code_num").validate({
//                rules: [{
//                    text: "请输入验证码",
//                    rule: "empty"
//                }, {
//                    text: "验证码为6位数字",
//                    rule: "length",
//                    min: 6,
//                    max: 6
//                }
//                ],
//                validText: "",
//                tipTagId: "verify_code_info"
//            });


//        },
//        buttons: {
//            "提 交": function () {
//                if (moblefalg) {
//                    $.validate("frmModifyMobile",
//                    function () {
//                        var param = "oldMoblie=" + $("#oldMoblie").text() + "&newMobile=" + $("#newMobel").val() + "&verifyCode=" + $("#code_num").val();
//                        var url = 'http://i.zhaopin.com/usermaster/UsermasterManage/ChangeMobile'

//                        $.ajax({
//                            async: false,
//                            url: url,
//                            data: param,
//                            dataType: "jsonp", //数据类型为jsonp  
//                            jsonp: "jsoncallback", //服务端用于接收callback调用的function名的参数  
//                            success: function (data) {
//                                if (data.Code != "0") {
//                                    var msg = data.Msg;
//                                    if (data.Msg == "") {
//                                        msg = "修改失败！";
//                                    }
//                                    $.popupDiv({
//                                        title: "修改手机",
//                                        msg: msg,
//                                        buttons: {
//                                            "关 闭": function () {
//                                                $.popupClose();
//                                            }
//                                        }
//                                    });
//                                } else {
//                                    window.clearInterval(interval);
//                                    tInterval = 60;
//                                    $("#mob").text($("#newMobel").val());
//                                    $("#ismobbind").removeClass("mobile_nobd");
//                                    $("#ismobbind").addClass("mobile_bd");
//                                    $("#ismobbind").text("已绑定")
//                                    $.popupDiv({
//                                        title: "修改手机",
//                                        msg: "绑定成功!",
//                                        buttons: {
//                                            "关 闭": function () {
//                                                $.popupClose();
//                                            }
//                                        }
//                                    });
//                                    //  $.popupClose();

//                                }



//                            }
//                        });

//                    }, function () {

//                    });
//                }
//                else {
//                    $("#newMobel").trigger("blur");
//                }
//            }
//        },
//        width: 414
//    });
//    return false;


//});
